#!/usr/bin/env node
/**
 * Fetches all web pages from BigCommerce and populates config.stencil.json
 * customLayouts.page with the correct URL-to-template mappings.
 *
 * Usage:
 *   node scripts/sync-custom-layouts.js <API_ACCESS_TOKEN>
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const STORE_HASH = '2y1g1tdlub';
const TOKEN = process.argv[2];
const CONFIG_PATH = path.join(__dirname, '..', 'config.stencil.json');

if (!TOKEN) {
  console.error('Usage: node scripts/sync-custom-layouts.js <API_ACCESS_TOKEN>');
  process.exit(1);
}

function fetchPages(page = 1, accumulated = []) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.bigcommerce.com',
      path: `/stores/${STORE_HASH}/v2/pages?limit=250&page=${page}`,
      headers: {
        'X-Auth-Token': TOKEN,
        'Accept': 'application/json',
      },
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`BC API returned ${res.statusCode}: ${data}`));
          return;
        }
        const pages = JSON.parse(data);
        const all = accumulated.concat(pages);
        // BC returns fewer than 250 when done
        if (pages.length < 250) {
          resolve(all);
        } else {
          resolve(fetchPages(page + 1, all));
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching pages from BigCommerce...');
  const pages = await fetchPages();
  console.log(`Found ${pages.length} total pages.`);

  const layoutMap = {};
  let customCount = 0;

  for (const p of pages) {
    const tmpl = p.custom_template || '';
    // Only care about custom page templates
    if (!tmpl.includes('pages/custom/page/')) continue;

    const filename = tmpl.replace(/^.*pages\/custom\/page\//, '');
    const url = p.url.startsWith('/') ? p.url : '/' + p.url;
    // Ensure trailing slash
    const normalizedUrl = url.endsWith('/') ? url : url + '/';

    if (!layoutMap[filename]) layoutMap[filename] = [];
    layoutMap[filename].push(normalizedUrl);
    customCount++;
  }

  console.log(`\nFound ${customCount} pages with custom templates:`);
  for (const [tmpl, urls] of Object.entries(layoutMap)) {
    console.log(`  ${tmpl} → ${urls.join(', ')}`);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  config.customLayouts.page = layoutMap;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  console.log(`\nWrote config.stencil.json`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
