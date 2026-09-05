#!/usr/bin/env node
// Regenerates docs/index.md from data/outputs.json, and detects any dwg7 repo
// that now has GitHub Pages enabled but isn't yet in outputs.json or
// excluded.json — those need a human/AI curation decision, not a guess.
//
// Usage: node scripts/build.mjs
// Env:   GITHUB_TOKEN (optional, raises the API rate limit)

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUTPUTS_PATH = join(REPO_ROOT, 'data', 'outputs.json');
const EXCLUDED_PATH = join(REPO_ROOT, 'data', 'excluded.json');
const INDEX_PATH = join(REPO_ROOT, 'docs', 'index.md');
const NEW_REPOS_PATH = join(REPO_ROOT, '.build-new-repos.json');

const ORG = 'dwg7';

async function fetchOrgRepos() {
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const repos = [];
  let page = 1;
  for (;;) {
    const res = await fetch(
      `https://api.github.com/orgs/${ORG}/repos?per_page=100&page=${page}`,
      { headers }
    );
    if (!res.ok) throw new Error(`GitHub API error ${res.status}: ${await res.text()}`);
    const batch = await res.json();
    repos.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }
  return repos;
}

async function isLive(repo) {
  try {
    const res = await fetch(`https://dwg7.github.io/${repo}/`, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

function renderIndex(outputs) {
  const items = outputs
    .map((o) => `- **[${o.repo}](${o.repo}/)** — ${o.blurb}`)
    .join('\n');
  const today = new Date().toISOString().slice(0, 10);
  return `---
title: DWG7 — UN Open GIS Initiative
---

# DWG7

DWG7 is a domain working group of the [UN Open GIS Initiative](https://unopengis.org/).
This page links to outputs currently published under \`dwg7.github.io\`.

## Selected outputs

${items}

More projects are listed in the [dwg7 organization](https://github.com/dwg7).

---

This list is refreshed periodically. Last updated: ${today}.
`;
}

async function main() {
  const outputs = JSON.parse(readFileSync(OUTPUTS_PATH, 'utf8'));
  const excluded = JSON.parse(readFileSync(EXCLUDED_PATH, 'utf8'));
  const known = new Set([...outputs.map((o) => o.repo), ...excluded.map((e) => e.repo)]);

  const orgRepos = await fetchOrgRepos();
  const pagesRepos = orgRepos.filter((r) => r.has_pages).map((r) => r.name);

  const newRepos = [];
  for (const repo of pagesRepos) {
    if (known.has(repo)) continue;
    const live = await isLive(repo);
    newRepos.push({ repo, live });
  }

  writeFileSync(INDEX_PATH, renderIndex(outputs));
  writeFileSync(NEW_REPOS_PATH, JSON.stringify(newRepos, null, 2));

  console.log(`Rendered docs/index.md with ${outputs.length} entries.`);
  if (newRepos.length > 0) {
    console.log(
      `Found ${newRepos.length} repo(s) with Pages enabled but no curation decision yet: ` +
        newRepos.map((r) => r.repo).join(', ')
    );
  } else {
    console.log('No new undecided repos found.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
