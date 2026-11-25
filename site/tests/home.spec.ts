import { expect, test } from '@playwright/test';
import { encryptOverrides } from 'flags';

test('homepage loads its assets and links to the docs without optional credentials', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', (response) => {
    if (/\/(?:_next|brand)\//.test(response.url()) && !response.ok()) errors.push(response.url());
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Build software where intent survives the handoff.');
  await expect(page.locator('#blog, #videos, #community, #agents')).toHaveCount(0);
  await expect(page.locator('#functions .hm-fn-card__role')).toHaveText([
    'Director', 'Composer', 'Orchestrator', 'Conductor', 'Producer', 'Promoter',
  ]);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/harmonicmethods\.com\/?$/);
  for (const image of await page.locator('.hm-home img:visible').all()) {
    await expect(image).toHaveJSProperty('complete', true);
    expect(await image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  }
  await page.screenshot({ path: test.info().outputPath('homepage-desktop.png'), fullPage: true });
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Docs', exact: true }).click();
  await expect(page).toHaveURL(/\/docs$/);
  await page.getByRole('link', { name: 'The Harmonic Method Docs', exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).toContain('<loc>https://harmonicmethods.com</loc>');
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('https://harmonicmethods.com/sitemap.xml');
  expect(errors).toEqual([]);
});

test('mobile menu opens and follows the method link in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/dark/);
  const menu = page.getByRole('button', { name: 'Toggle menu' });
  const method = page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'The method', exact: true });
  await expect(method).not.toBeVisible();
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(method).toBeVisible();
  await method.click();
  await expect(page).toHaveURL(/\/docs$/);
  await expect(page.getByRole('heading', { name: 'The Harmonic Method', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.screenshot({ path: test.info().outputPath('method-mobile-dark.png'), fullPage: true });
});

test('signed flags control sections while newsletter requires a real action', async ({ page, context }) => {
  const value = await encryptOverrides({
    'homepage-blog-section': true,
    'homepage-videos-section': true,
    'homepage-community-section': true,
    'homepage-tooling-section': true,
    'homepage-newsletter-section': true,
    'harmonic-method-spec-released': true,
  });
  await context.addCookies([{ name: 'vercel-flag-overrides', value, url: 'http://127.0.0.1:3500' }]);
  await page.goto('/');
  for (const id of ['blog', 'videos', 'community', 'agents']) await expect(page.locator(`#${id}`)).toBeVisible();
  await expect(page.getByRole('link', { name: /The Harmonic Method specification/ })).toHaveAttribute('href', 'https://github.com/harmonic-methods/harmonic-method-spec');
  await expect(page.getByRole('button', { name: 'Subscribe' })).toHaveCount(0);
});
