/* eslint-disable no-console */
/**
 * Automated accessibility audit using Lighthouse (axe-core under the hood).
 *
 * - Uses your system-installed Chrome/Edge (no downloads).
 * - Discovers category and product URLs by scraping home then category pages.
 * - Always scans: home, category, product, team landing.
 * - Add extra pages via: EXTRA_URLS=http://localhost:3000/team/mariann-saether,...
 * - Writes per-page HTML + JSON reports under a11y-report/.
 * - Exits non-zero if any accessibility audit fails.
 *
 * Usage:
 *   npx stencil start   (in another terminal)
 *   npm run a11y
 *   EXTRA_URLS=http://localhost:3000/team/mariann-saether npm run a11y
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const OUT_DIR = path.resolve(__dirname, '..', 'a11y-report');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const PRODUCT_PATTERNS = [
    /<a[^>]+class="[^"]*card-figure__link[^"]*"[^>]+href="([^"#?]+)"/i,
    /<a[^>]+href="([^"#?]+)"[^>]+class="[^"]*card-figure__link[^"]*"/i,
    /href="([^"#?]+\/products?\/[^"#?]+)"/i,
];

const CATEGORY_PATTERNS = [
    /<a[^>]+class="[^"]*navPages-action[^"]*"[^>]+href="([^"#?]+)"/i,
    /<a[^>]+href="([^"#?]+)"[^>]+class="[^"]*navPages-action[^"]*"/i,
    /href="([^"#?]+\/categories\/[^"#?]+)"/i,
];

const EXCLUDE_PATHS = /(login|cart|account|search|wishlist|contact|blog|sitemap|^\/?$)/i;

async function main() {
    const lighthouse = (await import('lighthouse')).default;
    const chromeLauncher = await import('chrome-launcher');

    let installations = [];
    try { installations = chromeLauncher.Launcher.getInstallations(); } catch (e) { /* ignore */ }
    if (installations.length === 0) {
        throw new Error('No Chrome/Edge installation found. Install Chrome or Microsoft Edge.');
    }
    const edge = installations.find((p) => /msedge/i.test(p));
    const chromePath = edge || installations[0];
    console.log(`Using browser: ${chromePath}`);

    const chrome = await chromeLauncher.launch({
        chromePath,
        chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
    });

    try {
        // --- URL discovery ---
        const homeHtml = await fetchText(`${BASE_URL}/`);

        const category = pickFirstHref(homeHtml, CATEGORY_PATTERNS, { excludePaths: EXCLUDE_PATHS });

        // Try homepage first, fall back to category page for product links
        // (Kokatat homepage is Contentful-driven, cards aren't in initial HTML)
        let product = pickFirstHref(homeHtml, PRODUCT_PATTERNS);
        if (!product && category) {
            console.log('No product found on homepage — checking category page...');
            try {
                const catHtml = await fetchText(absolute(category));
                product = pickFirstHref(catHtml, PRODUCT_PATTERNS);
            } catch (e) {
                console.warn(`Could not fetch category page for product discovery: ${e.message}`);
            }
        }

        // Extra URLs from env: EXTRA_URLS=http://localhost:3000/foo,http://localhost:3000/bar
        const extraTargets = process.env.EXTRA_URLS
            ? process.env.EXTRA_URLS.split(',').map((u, i) => ({ label: `extra-${i + 1}`, url: u.trim() })).filter((t) => t.url)
            : [];

        const targets = [
            { label: 'home',     url: `${BASE_URL}/` },
            { label: 'category', url: absolute(category) },
            { label: 'product',  url: absolute(product) },
            { label: 'team',     url: `${BASE_URL}/team` },
            ...extraTargets,
        ];

        console.log('\nDiscovered URLs:');
        targets.forEach((t) => console.log(`  ${t.label.padEnd(10)} = ${t.url || '(none)'}`));
        console.log('');

        // --- Audit ---
        const summary = [];
        for (const t of targets) {
            if (!t.url) {
                console.warn(`[${t.label}] skipped — no URL discovered`);
                summary.push({ ...t, skipped: true, score: null, failed: [] });
                continue;
            }
            console.log(`[${t.label}] auditing ${t.url}`);
            const runnerResult = await lighthouse(t.url, {
                port: chrome.port,
                output: ['html', 'json'],
                logLevel: 'error',
                onlyCategories: ['accessibility'],
            });

            const [htmlReport, jsonReport] = runnerResult.report;
            const safeLabel = t.label.replace(/[^a-z0-9-]/gi, '-');
            fs.writeFileSync(path.join(OUT_DIR, `${safeLabel}.html`), htmlReport);
            fs.writeFileSync(path.join(OUT_DIR, `${safeLabel}.json`), jsonReport);

            const lhr = runnerResult.lhr;
            const score = Math.round((lhr.categories.accessibility.score || 0) * 100);
            const failed = Object.values(lhr.audits)
                .filter((a) => a.score !== null && a.score < 1
                    && a.scoreDisplayMode !== 'manual' && a.scoreDisplayMode !== 'notApplicable')
                .map((a) => ({ id: a.id, title: a.title, items: ((a.details && a.details.items) || []).length }));
            console.log(`  score: ${score}/100, failing audits: ${failed.length}`);
            failed.forEach((f) => console.log(`    - ${f.id} (${f.items} nodes): ${f.title}`));
            summary.push({ ...t, safeLabel, skipped: false, score, failed });
        }

        fs.writeFileSync(path.join(OUT_DIR, 'index.html'), renderIndex(summary));

        const totalFailures = summary.reduce((n, s) => n + (s.failed ? s.failed.length : 0), 0);
        console.log(`\nReports written to ${OUT_DIR}`);
        console.log(`Open: ${path.join(OUT_DIR, 'index.html')}`);
        console.log(`Total failing accessibility audits across pages: ${totalFailures}`);
        if (totalFailures > 0) process.exitCode = 1;
    } finally {
        await chrome.kill();
    }
}

function absolute(href) {
    if (!href) return null;
    try { return new URL(href, BASE_URL).toString(); } catch (e) { return null; }
}

function pickFirstHref(html, patterns, opts = {}) {
    const exclude = opts.excludePaths;
    for (const re of patterns) {
        const flags = re.flags.includes('g') ? re.flags : `${re.flags}g`;
        const globalRe = new RegExp(re.source, flags);
        let m;
        while ((m = globalRe.exec(html)) !== null) {
            const href = m[1];
            if (!href) continue;
            if (exclude) {
                try {
                    const p = new URL(href, BASE_URL).pathname;
                    if (exclude.test(p)) continue;
                } catch (e) { /* ignore */ }
            }
            return href;
        }
    }
    return null;
}

function fetchText(url) {
    return new Promise((resolve, reject) => {
        const lib = url.startsWith('https') ? require('https') : require('http');
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            },
        };
        lib.get(url, options, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchText(new URL(res.headers.location, url).toString()).then(resolve, reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`GET ${url} -> ${res.statusCode}`));
            }
            let data = '';
            res.setEncoding('utf8');
            res.on('data', (c) => { data += c; });
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function renderIndex(summary) {
    const rows = summary.map((s) => `
        <tr>
          <td>${s.label}</td>
          <td><a href="${s.url || '#'}" target="_blank" rel="noopener">${s.url || '(skipped)'}</a></td>
          <td>${s.skipped ? '—' : `${s.score}/100`}</td>
          <td>${s.skipped ? '—' : s.failed.length}</td>
          <td>${s.skipped ? '' : `<a href="./${s.safeLabel || s.label}.html">html</a> · <a href="./${s.safeLabel || s.label}.json">json</a>`}</td>
        </tr>`).join('');
    return `<!doctype html><html><head><meta charset="utf-8"><title>Accessibility audit</title>
      <style>
        body{font-family:system-ui,sans-serif;max-width:900px;margin:2rem auto;padding:0 1rem}
        table{border-collapse:collapse;width:100%}
        th,td{border:1px solid #ddd;padding:.5rem .75rem;text-align:left}
        th{background:#f3f3f3}
      </style></head><body>
      <h1>Accessibility audit</h1>
      <p>Base URL: <code>${BASE_URL}</code></p>
      <p>Generated: ${new Date().toISOString()}</p>
      <table>
        <thead><tr><th>Page</th><th>URL</th><th>Score</th><th>Failing audits</th><th>Reports</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </body></html>`;
}

main().catch((err) => {
    console.error(err);
    process.exit(2);
});
