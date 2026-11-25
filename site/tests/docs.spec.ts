import { expect, test } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const contentRoot = join(process.cwd(), 'content/docs');
const contentFiles = readdirSync(contentRoot, { recursive: true })
  .map(String)
  .filter((path) => path.endsWith('.mdx'));
const documentPaths = contentFiles.map((path) => {
  const slug = path.replaceAll('\\', '/').replace(/(^|\/)index\.mdx$/, '').replace(/\.mdx$/, '');
  return `/docs${slug ? `/${slug}` : ''}`;
});

test('every imported document renders and local links point to included pages', async ({ request }) => {
  for (const [index, path] of documentPaths.entries()) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const raw = readFileSync(join(contentRoot, contentFiles[index]), 'utf8');
    for (const match of raw.matchAll(/(?:href=["']|\]\()([^"'\s)#]+)/g)) {
      if (match[1].startsWith('/docs')) {
        expect(documentPaths, `${path} links to ${match[1]}`).toContain(match[1].replace(/\/$/, ''));
      }
    }
  }
});

test('read docs and follow a documentation link with working assets', async ({ page }) => {
  const failures: string[] = [];
  page.on('pageerror', (error) => failures.push(error.message));
  page.on('response', (response) => {
    if (response.url().includes('/_next/') && !response.ok()) failures.push(response.url());
  });
  await page.goto('/docs');
  await expect(page.getByRole('heading', { name: 'The Harmonic Method', exact: true })).toBeVisible();
  await page.screenshot({ path: test.info().outputPath('docs-desktop.png'), fullPage: true });
  await page.locator('article').getByRole('link', { name: 'Getting started', exact: true }).click();
  await expect(page).toHaveURL(/\/docs\/getting-started$/);
  await expect(page.locator('#walkthrough')).toBeVisible();
  await expect(page.locator('html')).toHaveClass(/light|dark/);
  expect(failures).toEqual([]);
});

test('Getting started includes the sample review and a walkthrough leading to implementation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Getting started' }).click();
  await expect(page).toHaveURL(/\/docs\/getting-started$/);
  await expect(page.locator('#starter-kit')).toContainText('Try the open spec kit');
  await expect(page.locator('article')).toContainText('START_HERE.md');
  await expect(page.locator('article')).toContainText('pending public release');
  await expect(page.locator('article blockquote')).toContainText([
    'review-a-capability.md',
    'skills/coda-quality-check/SKILL.md',
  ]);
  await expect(page.locator('article').getByRole('heading', { level: 3 })).toHaveText([
    /^Review one document in chat/,
    /^Work with a local folder/,
    /^Continue after the sample review/,
  ]);
  await expect(page.locator('article #steps')).toHaveCount(0);
  await page.screenshot({ path: test.info().outputPath('starter-kit-desktop.png'), fullPage: true });
  const article = page.locator('article');
  const lessons = [
    ['Capture Notes', '/docs/getting-started/capture-notes'],
    ['Define a Coda', '/docs/getting-started/define-a-coda'],
    ['Define a Beat', '/docs/getting-started/define-a-beat'],
    ['Run a Coda check', '/docs/getting-started/run-a-coda-check'],
    ['Plan Beat Versions and deliver Revisions', '/docs/implementation/plan-beat-versions'],
  ];
  for (const [title, path] of lessons) {
    await article.getByRole('link', { name: new RegExp(`^${title}$`, 'i') }).click();
    await expect(page).toHaveURL(path);
    await expect(article.getByRole('heading', { name: title, exact: true, level: 1 })).toBeVisible();
    await expect(article.getByRole('heading', { name: /Worked example/ })).toBeVisible();
  }
});

test('search finds documentation through the isolated API', async ({ request }) => {
  const response = await request.get('/api/docs/search?query=Coda');
  expect(response.ok()).toBeTruthy();
  const results = await response.json();
  expect(results.length).toBeGreaterThan(0);
  expect(results.some((result: { url: string }) => result.url.startsWith('/docs/'))).toBeTruthy();
});

test('readers can search and open a result', async ({ page }) => {
  await page.goto('/docs');
  await page.locator('button[data-search-full]:visible').click();
  const response = page.waitForResponse((response) => response.url().includes('/api/docs/search?'));
  await page.getByRole('combobox', { name: 'Search', exact: true }).fill('Coda');
  expect((await response).ok()).toBeTruthy();
  const result = page.getByRole('dialog').getByRole('option').first();
  await expect(result).toBeVisible();
  await result.click();
  await expect(page).toHaveURL(/\/docs\/.+/);
  await expect(page.getByRole('combobox', { name: 'Search', exact: true })).not.toBeVisible();
});

test('Markdown exports and sitemap retain public document URLs', async ({ request }) => {
  for (const path of ['/docs.md', '/docs/getting-started.md', '/docs/getting-started/run-a-coda-check.md', '/docs/method/apply-to-an-initiative.md', '/docs/method/quality.md', '/docs/composition/beats.md']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(response.headers()['content-type']).toContain('text/markdown');
    const body = await response.text();
    expect(body).toMatch(/^# /);
    expect(body).not.toContain('className=');
    if (path === '/docs/getting-started.md') expect(body).toContain('START_HERE.md');
  }
  const index = await request.get('/llms.txt');
  expect(await index.text()).toContain('https://harmonicmethods.com/docs/composition/beats.md');
  const corpus = await request.get('/llms-full.txt');
  expect(await corpus.text()).toContain('Capability Beat');
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).toContain('https://harmonicmethods.com/docs/composition/beats');
});

test('unknown docs and Markdown return 404', async ({ request }) => {
  for (const path of ['/docs/does-not-exist', '/docs/does-not-exist.md']) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test('docs remain readable on mobile in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/docs/composition/beat-arc');
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(page.getByRole('heading', { name: 'The three states' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.goto('/docs/method/roles#promoter');
  await expect(page.locator('#promoter')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.screenshot({ path: test.info().outputPath('docs-mobile-dark.png'), fullPage: true });
});
