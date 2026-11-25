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
  await expect(page.getByRole('heading', { name: 'A connected approach to software delivery' })).toBeVisible();
  await page.screenshot({ path: test.info().outputPath('docs-desktop.png'), fullPage: true });
  await page.locator('a.cajon-method-card[href="/docs/composition"]').click();
  await expect(page).toHaveURL(/\/docs\/composition$/);
  await expect(page.locator('article')).toContainText('Composition');
  await expect(page.locator('html')).toHaveClass(/light|dark/);
  expect(failures).toEqual([]);
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
  for (const path of ['/docs.md', '/docs/composition.md', '/docs/composition/beats.md']) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    expect(response.headers()['content-type']).toContain('text/markdown');
    const body = await response.text();
    expect(body).toMatch(/^# /);
    expect(body).not.toContain('className=');
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
  await page.screenshot({ path: test.info().outputPath('docs-mobile-dark.png'), fullPage: true });
});
