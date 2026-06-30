#!/usr/bin/env node
/**
 * csv-to-axe-json.js
 *
 * Converts a Deque FireEyes / axe CSV export to the universal axe JSON format
 * for import into Deque DevTools Server 4.x.
 *
 * Usage:
 *   node scripts/csv-to-axe-json.js <input.csv> [output-dir]
 *
 * Produces one JSON file per unique URL found in the CSV, named after the page path.
 * Rows with status "closed" are included but flagged; filter them out with --open-only.
 *
 * Flags:
 *   --open-only   Skip rows where Status is "closed"
 *   --help        Show this message
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// CSV parser — handles quoted fields, embedded newlines, and escaped quotes ("")
//
// Two-pass approach to survive FireEyes CSV quirks:
//
// Pass 1 (line grouping): physical lines are re-grouped by data row ID.
//   Each data row starts with a numeric ID at column 0 (e.g. "619693,").
//   Lines that don't match are either the header (pre-first-ID) or continuation
//   lines from multi-line unquoted HTML fields — they get appended to the
//   previous group.  This prevents embedded newlines in unquoted HTML from
//   creating orphan rows.
//
// Pass 2 (fixed-quoting parser): a " character only triggers quote mode when
//   it is the VERY FIRST character of a new field (field === '').  A " in the
//   middle of an already-started field is treated as a literal character.
//   This prevents HTML attribute quotes (class="foo") or prose quotes
//   ("real" world.) from corrupting the quoting state machine and swallowing
//   subsequent columns/rows.
// ---------------------------------------------------------------------------
function parseCSV(text) {
  // --- Pass 1: group physical lines by row ID ---
  const lines     = text.split(/\r?\n/);
  const regrouped = [];
  let   curGroup  = null;

  for (const line of lines) {
    if (/^\d+,/.test(line)) {
      if (curGroup !== null) regrouped.push(curGroup);
      curGroup = line;
    } else if (curGroup === null) {
      regrouped.push(line);   // header / pre-data
    } else {
      curGroup += '\n' + line; // continuation of current data row
    }
  }
  if (curGroup !== null) regrouped.push(curGroup);

  // --- Pass 2: parse with field-start-only quoting ---
  const rows  = [];
  let   row   = [];
  let   field = '';
  let   inQ   = false;
  const joined = regrouped.join('\n');
  let   i      = 0;

  while (i < joined.length) {
    const c = joined[i];
    const n = joined[i + 1];

    if (inQ) {
      if (c === '"' && n === '"') { field += '"'; i += 2; }   // escaped ""
      else if (c === '"')         { inQ = false;  i++;  }     // close quote
      else                        { field += c;   i++;  }
    } else {
      if      (c === '"' && field === '') { inQ = true;  i++;  }   // open quote — only at field start
      else if (c === '"')                 { field += c;  i++;  }   // literal " mid-field
      else if (c === ',')                 { row.push(field); field = ''; i++; }
      else if (c === '\r' && n === '\n')  { row.push(field); field = ''; rows.push(row); row = []; i += 2; }
      else if (c === '\n')                { row.push(field); field = ''; rows.push(row); row = []; i++; }
      else                                { field += c; i++; }
    }
  }
  // flush last field/row
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }

  // drop empty trailing rows
  while (rows.length && rows[rows.length - 1].every(f => f === '')) rows.pop();

  return rows;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function stripHtml(html) {
  return (html || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}

function mapImpact(weight) {
  const w = (weight || '').toLowerCase().trim();
  return { critical: 'critical', serious: 'serious', moderate: 'moderate', minor: 'minor' }[w] || 'moderate';
}

// "6/29/2026 2:53:12 PM" → ISO 8601
function parseDate(raw) {
  if (!raw) return new Date().toISOString();
  const d = new Date(raw);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

// "Success Criterion 4.1.2 Name, Role, Value" → ["wcag412", "wcag2aa"]
function buildTags(wcagLevel, wcagCriteria, category) {
  const tags = [];
  if (wcagLevel) {
    const lvl = wcagLevel.trim().toLowerCase();
    if (lvl === 'a')  tags.push('wcag2a');
    if (lvl === 'aa') tags.push('wcag2a', 'wcag2aa');
  }
  if (wcagCriteria) {
    const m = wcagCriteria.match(/(\d+\.\d+\.\d+)/);
    if (m) tags.push('wcag' + m[1].replace(/\./g, ''));
  }
  if (category) tags.push(category.toLowerCase().trim());
  return [...new Set(tags)];
}

// Normalize URL for grouping (strip trailing slash, lowercase scheme+host)
function normalizeUrl(raw) {
  try {
    const u = new URL(raw);
    return u.protocol + '//' + u.hostname.toLowerCase() + u.pathname.replace(/\/$/, '') + (u.search || '');
  } catch {
    return raw.trim().replace(/\/$/, '');
  }
}

// Safe filename from URL
function urlToFilename(url) {
  try {
    const u = new URL(url);
    const base = u.hostname.replace(/^www\./, '');
    const pathname = u.pathname.replace(/\/$/, '');
    const slug = (base + pathname)
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
    return (slug || 'unknown') + '.json';
  } catch {
    // Relative path or unparseable — sanitize the raw string
    const slug = url.replace(/[^a-zA-Z0-9.-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
    return (slug || 'unknown') + '.json';
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const rawArgs  = process.argv.slice(2);
  const openOnly = rawArgs.includes('--open-only');
  const args     = rawArgs.filter(a => !a.startsWith('--'));

  if (rawArgs.includes('--help') || args.length === 0) {
    console.log([
      '',
      '  Usage: node scripts/csv-to-axe-json.js <input.csv> [output-dir]',
      '',
      '  Options:',
      '    --open-only   Exclude rows where Status is "closed"',
      '    --help        Show this message',
      '',
    ].join('\n'));
    process.exit(0);
  }

  const inputFile = args[0];
  const outputDir = args[1] || path.dirname(inputFile);

  if (!fs.existsSync(inputFile)) {
    console.error(`\n  Error: file not found — ${inputFile}\n`);
    process.exit(1);
  }

  console.log(`\n  Reading: ${inputFile}`);
  const content = fs.readFileSync(inputFile, 'utf8');
  const rows    = parseCSV(content);

  if (rows.length < 2) {
    console.error('  Error: CSV has no data rows.\n');
    process.exit(1);
  }

  // Map header names → column indices
  const headers = rows[0];
  const col = {};
  headers.forEach((h, i) => { col[h.trim()] = i; });

  // Required columns check
  const required = ['URL', 'Id', 'Category', 'Description', 'Severity', 'Weight', 'Selector', 'Created date'];
  const missing  = required.filter(c => col[c] === undefined);
  if (missing.length) {
    console.error(`  Error: missing expected columns: ${missing.join(', ')}\n`);
    process.exit(1);
  }

  const g = (row, name) => (row[col[name]] || '').trim();

  // Group issues by URL
  const byUrl   = new Map();
  let skipped   = 0;
  let dataRows  = rows.slice(1);

  for (const row of dataRows) {
    if (row.length < required.length) { skipped++; continue; }

    const rawUrl = g(row, 'URL');
    if (!rawUrl || !/^https?:\/\//i.test(rawUrl)) { skipped++; continue; }
    const url    = normalizeUrl(rawUrl);
    const status = g(row, 'Status').toLowerCase();
    if (openOnly && status === 'closed') { skipped++; continue; }

    const isNeedsReview = g(row, 'Severity').toLowerCase() === 'needs review';
    const ruleId        = g(row, 'Category') || 'unknown';
    const createdAt     = parseDate(g(row, 'Created date'));

    const issue = {
      issueId:      g(row, 'Id') || `csv-${Math.random().toString(36).slice(2, 9)}`,
      ruleId,
      description:  g(row, 'Description'),
      help:         g(row, 'Description'),
      helpUrl:      g(row, 'Help'),
      impact:       mapImpact(g(row, 'Weight')),
      isExperimental: false,
      isManual:     g(row, 'Manual?').toLowerCase() === 'true',
      summary:      stripHtml(g(row, 'Additional Information')),
      selector:     g(row, 'Selector') ? [g(row, 'Selector')] : [],
      source:       g(row, 'Element source code'),
      tags:         buildTags(g(row, 'WCAG 2 Level'), g(row, 'WCAG 2 Success Criteria'), ruleId),
      createdAt,
      testUrl:      url,
      needsReview:  isNeedsReview,
      status,
    };

    if (!byUrl.has(url)) byUrl.set(url, []);
    byUrl.get(url).push(issue);
  }

  if (byUrl.size === 0) {
    console.error('  Error: no valid issues found after filtering.\n');
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const written       = [];
  const usedFilenames = new Map(); // basename → count, for deduplication

  for (const [url, issues] of byUrl) {
    const violations   = issues.filter(i => !i.needsReview);
    const review       = issues.filter(i => i.needsReview);
    const scanStart    = issues.reduce((min, i) => i.createdAt < min ? i.createdAt : min, issues[0].createdAt);
    const scanEnd      = issues.reduce((max, i) => i.createdAt > max ? i.createdAt : max, issues[0].createdAt);

    // Build failedRules: one entry per unique ruleId, with a nodes array
    const ruleMap = new Map();
    for (const issue of violations) {
      if (!ruleMap.has(issue.ruleId)) {
        ruleMap.set(issue.ruleId, {
          id:          issue.ruleId,
          description: issue.description,
          help:        issue.help,
          helpUrl:     issue.helpUrl,
          impact:      issue.impact,
          tags:        issue.tags,
          nodes:       [],
        });
      }
      ruleMap.get(issue.ruleId).nodes.push({
        issueId:        issue.issueId,
        html:           issue.source,
        impact:         issue.impact,
        target:         issue.selector,
        failureSummary: issue.summary,
        any:            [],
        all:            [],
        none:           [],
      });
    }

    const issueSummary = {
      critical:    issues.filter(i => i.impact === 'critical').length,
      serious:     issues.filter(i => i.impact === 'serious').length,
      moderate:    issues.filter(i => i.impact === 'moderate').length,
      minor:       issues.filter(i => i.impact === 'minor').length,
      needsReview: review.length,
    };

    const output = {
      url,
      axeVersion:           '4.x',
      standard:             'WCAG 2.2 A',
      testingStartDate:     scanStart,
      testingEndDate:       scanEnd,
      bestPracticesEnabled: false,
      experimentalEnabled:  false,
      issueSummary,
      failedRules:          Array.from(ruleMap.values()),
      needsReview:          review.map(i => ({
        issueId:     i.issueId,
        ruleId:      i.ruleId,
        description: i.description,
        help:        i.help,
        helpUrl:     i.helpUrl,
        impact:      i.impact,
        isManual:    i.isManual,
        summary:     i.summary,
        selector:    i.selector,
        source:      i.source,
        tags:        i.tags,
        createdAt:   i.createdAt,
        testUrl:     i.testUrl,
        needsReview: true,
      })),
      allIssues: issues.map(({ status, ...rest }) => rest),   // drop internal status field
      source: {
        productName:          'Deque FireEyes',
        productComponentName: 'web-ui',
        productVersion:       '4.0.0',
      },
      testDetails: {
        testId:               `csv-import-${Date.now()}`,
        startDate:            scanStart,
        endDate:              scanEnd,
        engine:               'axe-core',
        axeVersion:           '4.x',
        standard:             'WCAG 2.2 A',
        bestPracticesEnabled: false,
        experimentalEnabled:  false,
      },
    };

    const baseFilename = urlToFilename(url);
    const rawBase      = baseFilename.replace(/\.json$/, '');
    const base         = rawBase.length > 80 ? rawBase.slice(0, 80) : rawBase;
    const count        = usedFilenames.get(base) || 0;
    usedFilenames.set(base, count + 1);
    const filename   = count === 0 ? `${base}.json` : `${base}__${count + 1}.json`;
    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');

    written.push({
      filename,
      total:      issues.length,
      violations: violations.length,
      review:     review.length,
      rules:      ruleMap.size,
    });
  }

  // Summary table
  const col1 = Math.max(...written.map(w => w.filename.length), 8);
  console.log(`\n  ${'File'.padEnd(col1)}  Issues   Violations  Needs Review  Rules`);
  console.log(`  ${'─'.repeat(col1)}  ───────  ──────────  ────────────  ─────`);
  for (const w of written) {
    console.log(
      `  ${w.filename.padEnd(col1)}` +
      `  ${String(w.total).padStart(5)}` +
      `    ${String(w.violations).padStart(8)}` +
      `    ${String(w.review).padStart(10)}` +
      `    ${String(w.rules).padStart(3)}`
    );
  }
  if (skipped) console.log(`\n  ${skipped} row(s) skipped (empty, malformed, or filtered by --open-only).`);
  console.log(`\n  Output: ${outputDir}\n`);
}

main();
