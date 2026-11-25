import { expect, test } from '@playwright/test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
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

test('the retired metaphor page redirects to useful glossary definitions', async ({ page, request }) => {
  for (const [oldPath, destination] of [
    ['/docs/method/metaphor', '/docs/glossary'],
    ['/docs/method/metaphor.md', '/docs/glossary.md'],
  ]) {
    const redirect = await request.get(oldPath, { maxRedirects: 0 });
    expect(redirect.status()).toBe(308);
    expect(redirect.headers().location).toBe(destination);
    const response = await request.get(oldPath);
    expect(response.ok()).toBeTruthy();
    expect(await response.text()).toContain('A Coda and the Capability Beats that serve it.');
  }
  await page.goto('/docs/glossary');
  await expect(page.getByRole('link', { name: 'The metaphor', exact: true })).toHaveCount(0);
  await expect(page.locator('a[href*="/docs/method/metaphor"]')).toHaveCount(0);
  await expect(page.locator('article')).toContainText('a System Note provides context shared across its capabilities');
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).not.toContain('/docs/method/metaphor');
  const search = await request.get('/api/docs/search?query=metaphor');
  expect(await search.text()).not.toContain('/docs/method/metaphor');
});

test('the PR walkthrough provides real screenshots, copyable prompts and matching example files', async ({ page, request }) => {
  await page.goto('/docs/implementation/create-a-pull-request');
  await expect(page.locator('h1')).toHaveText('Create a pull request with an AI assistant');
  await expect(page.locator('article pre')).toHaveCount(6);
  await expect(page.locator('article a[href="https://github.com/harmonic-methods/harmonic-method-spec/pull/87"]')).toBeVisible();
  for (const image of await page.locator('article img').all()) {
    const url = await image.getAttribute('src');
    expect(url).toBeTruthy();
    expect((await request.get(url!)).ok()).toBeTruthy();
  }
  const exampleRoot = join(process.cwd(), '../tutorials/estimate-approval');
  for (const file of readdirSync(exampleRoot, { recursive: true }).map(String).filter((file) => /\.(md|mjs|yml|json|html)$/.test(file))) {
    const response = await request.get(`/downloads/estimate-approval/${file}`);
    expect(response.ok(), file).toBeTruthy();
    expect(await response.body(), file).toEqual(readFileSync(join(exampleRoot, file)));
  }
  expect((await request.get('/downloads/estimate-approval.zip')).ok()).toBeTruthy();
  const legacy = await request.get('/docs/method/delivery', { maxRedirects: 0 });
  expect(legacy.status()).toBe(308);
  expect(legacy.headers().location).toBe('/docs/implementation/plan-beat-versions');
  await page.goto('/docs/glossary');
  for (const term of ['Project', 'Track', 'Work Item', 'Drop', 'Claim', 'Layer']) {
    await expect(page.locator('.cajon-glossary-term').filter({ hasText: new RegExp(`^${term}$`) })).toHaveCount(0);
  }
});

test('published file links resolve to source paths and generated attachments contain canonical content', async ({ page, request }) => {
  const repoRoot = join(process.cwd(), '..');
  for (const file of contentFiles) {
    const text = readFileSync(join(contentRoot, file), 'utf8');
    for (const match of text.matchAll(/https:\/\/github\.com\/harmonic-methods\/harmonic-method-spec\/(?:blob|tree)\/main\/([^\s)#"<>]+)/g)) {
      expect(existsSync(join(repoRoot, match[1])), `${file}: ${match[1]}`).toBeTruthy();
    }
  }
  await page.goto('/docs/getting-started');
  await expect(page.locator('article').getByRole('link', { name: 'START_HERE.md', exact: true })).toHaveAttribute('href', 'https://github.com/harmonic-methods/harmonic-method-spec/blob/main/starter-kit/START_HERE.md');
  const review = await request.get('/downloads/starter-kit/review-a-capability.md');
  expect(review.ok()).toBeTruthy();
  const reviewText = await review.text();
  for (const file of ['skills/coda-quality-check/SKILL.md', ...['spec-set', 'coda', 'beat', 'system', 'portfolio'].map((name) => `specs/${name}.yml`)]) {
    expect(reviewText).toContain(readFileSync(join(repoRoot, file), 'utf8').trimEnd());
  }
  const sample = await request.get('/downloads/starter-kit/sample-capability.md');
  expect(sample.ok()).toBeTruthy();
  expect(await sample.text()).toContain(readFileSync(join(repoRoot, 'examples/systems/client-commitments/beats/client-estimate-approval/beat.yml'), 'utf8').trimEnd());
});

test('read docs and follow a documentation link with working assets', async ({ page }) => {
  const failures: string[] = [];
  page.on('pageerror', (error) => failures.push(error.message));
  page.on('response', (response) => {
    if (response.url().includes('/_next/') && !response.ok()) failures.push(response.url());
  });
  await page.goto('/docs');
  const specification = page.getByRole('link', { name: 'Specification on GitHub', exact: true }).filter({ visible: true }).first();
  await expect(specification).toBeVisible();
  await expect(specification).toHaveAttribute('href', 'https://github.com/harmonic-methods/harmonic-method-spec');
  await expect(page.getByRole('heading', { name: 'The Harmonic Method', exact: true })).toBeVisible();
  await page.screenshot({ path: test.info().outputPath('docs-desktop.png'), fullPage: true });
  await page.locator('article').getByRole('link', { name: 'Getting started', exact: true }).click();
  await expect(page).toHaveURL(/\/docs\/getting-started$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.harmonicmethods.com/docs/getting-started');
  await expect(page.locator('#walkthrough')).toBeVisible();
  await expect(page.locator('html')).toHaveClass(/light|dark/);
  expect(failures).toEqual([]);
});

test('the merged overview preserves bookmarks and Markdown exports', async ({ page, request }) => {
  for (const [oldPath, destination] of [
    ['/docs/method/overview', '/docs'],
    ['/docs/method/overview.md', '/docs.md'],
  ]) {
    const response = await request.get(oldPath, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(destination);
  }
  await page.goto('/docs/method/overview#challenges-and-benefits');
  await expect(page).toHaveURL('/docs#challenges-and-benefits');
  await expect(page.locator('#challenges-and-benefits')).toBeInViewport();
  await expect(page.locator('article')).toContainText('More efficient token usage is an intended benefit.');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.harmonicmethods.com/docs');
  const markdown = await request.get('/docs/method/overview.md');
  expect(markdown.headers()['content-type']).toContain('text/markdown');
  expect(await markdown.text()).toContain('Common challenges and intended benefits');
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).not.toContain('/docs/method/overview');
  const index = await request.get('/llms.txt');
  expect(await index.text()).not.toContain('/docs/method/overview');
});

test('six roles explain decision boundaries and practice tags lead to their definitions', async ({ page, request }) => {
  await page.goto('/docs/method/listening');
  const tags = page.getByRole('navigation', { name: 'Practice responsibilities' });
  await expect(tags).toContainText('Accountable');
  await expect(tags).toContainText('Supporting');
  await tags.getByRole('link', { name: 'Conductor', exact: true }).click();
  await expect(page).toHaveURL('/docs/method/roles#conductor');
  await expect(page.locator('#conductor')).toContainText('Conductor — leads day-to-day execution');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Harmonic Method Roles');
  await expect(page.getByRole('navigation', { name: 'Practice responsibilities' })).toHaveCount(0);
  await page.locator('#director').scrollIntoViewIfNeeded();
  await expect(page.locator('#director')).toBeInViewport();
  const article = page.locator('article');
  await expect(article).toContainText('Composer defines the systems and capabilities that serve it');
  await expect(article).toContainText('Producer can decline an investment that fits strategy but costs too much.');
  await article.getByRole('link', { name: 'See published skills and recommended role-specific skills' }).click();
  await expect(page).toHaveURL('/docs/method/tooling#role-skills');
  await expect(article).toContainText('No dedicated Director skill yet');
  await expect(article).toContainText('No dedicated Promoter skill yet');
  const markdown = await request.get('/docs/method/listening.md');
  expect(await markdown.text()).toContain('Accountable: Conductor');
  expect(await markdown.text()).toContain('Supporting: Composer, Orchestrator');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/docs/method/roles');
  await expect(page.locator('#director')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.screenshot({ path: test.info().outputPath('roles-mobile-dark.png'), fullPage: true });
});

test('copy-ready instructions preserve plain text and Markdown on the clipboard', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/docs/getting-started');
  const prompt = page.getByRole('figure', { name: 'Prompt: Review a document', exact: true });
  await prompt.getByRole('button', { name: 'Copy Text', exact: true }).click();
  const expected = 'Follow the Harmonic Method rubric in review-a-capability.md to assess the proposed capability in the other attachment. Cite the document in your reasons and recommend the single most useful improvement. Flag missing context instead of making it up.';
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(expected);
  await expect(prompt.getByRole('button', { name: 'Copied Text', exact: true })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  const pre = prompt.locator('pre');
  expect(await pre.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBeTruthy();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await page.goto('/docs/appendix/llm-setup');
  const reviewer = page.getByRole('figure', { name: 'Reusable reviewer instructions', exact: true });
  await reviewer.getByRole('button', { name: 'Copy Text', exact: true }).click();
  const markdown = [
    '## Capability review',
    '',
    'When I ask for a capability review, read and follow the supplied Harmonic Method skill and its referenced specifications.',
    '',
    '- Use its published dimensions, scoring anchors, and output format.',
    '- Cite evidence from the document.',
    '- If a required file or context is missing, identify it and ask for it instead of inventing it.',
    '- Recommend the single most useful improvement.',
  ].join('\n');
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(markdown);
  const exported = await page.request.get('/docs/appendix/llm-setup.md');
  // The exported fence is nested under a numbered step, which adds list indentation.
  expect((await exported.text()).replace(/^ {3}/gm, '')).toContain(markdown);
  await page.goto('/docs/getting-started/capture-notes');
  await expect(page.getByRole('navigation', { name: 'Practice responsibilities' })).toHaveCount(0);
  const notes = page.getByRole('figure', { name: 'Prompt: Draft Notes from a recap', exact: true });
  const blankLines = notes.locator('pre .line').filter({ hasText: /^\s*$/ });
  expect(await blankLines.count()).toBeGreaterThanOrEqual(4);
  expect(await blankLines.evaluateAll((lines) => lines.every((line) => line.getBoundingClientRect().height >= 16))).toBeTruthy();
  await notes.getByRole('button', { name: 'Copy Text', exact: true }).click();
  const notesSource = readFileSync(join(contentRoot, 'getting-started/capture-notes.mdx'), 'utf8');
  const notesPrompt = notesSource.match(/```text[^\n]*\n([\s\S]*?)\n```/)?.[1];
  expect(notesPrompt).toBeTruthy();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(notesPrompt);
  await page.goto('/docs/getting-started/define-a-beat');
  const template = page.getByRole('figure', { name: 'Template: Capability Beat draft', exact: true });
  await template.getByRole('button', { name: 'Copy Text', exact: true }).click();
  const draftSource = readFileSync(join(contentRoot, 'getting-started/define-a-beat.mdx'), 'utf8');
  const draftTemplate = draftSource.match(/```markdown[^\n]*\n([\s\S]*?)\n```/)?.[1];
  expect(draftTemplate).toBeTruthy();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(draftTemplate);
  await page.screenshot({ path: test.info().outputPath('copy-instructions-mobile.png'), fullPage: true });
});

test('Getting started includes the sample review and a walkthrough leading to implementation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Getting started' }).click();
  await expect(page).toHaveURL(/\/docs\/getting-started$/);
  const article = page.locator('article');
  await expect(article.getByRole('heading', { level: 2 }).first()).toContainText('Start with the basics');
  await expect(page.getByRole('navigation', { name: 'Practice responsibilities' })).toHaveCount(0);
  await article.getByRole('link', { name: 'Set up your AI assistant', exact: true }).click();
  await expect(page).toHaveURL('/docs/appendix/llm-setup');
  for (const provider of ['Microsoft', 'Anthropic', 'OpenAI', 'Google']) {
    await expect(article.getByRole('link', { name: `${provider} instructions` })).toBeVisible();
  }
  await expect(article.getByRole('heading', { name: 'Use a skill without installing anything' })).toBeVisible();
  await expect(article.getByRole('heading', { name: 'Save a reusable skill or assistant' })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL('/docs/getting-started');
  await expect(page.locator('#starter-kit')).toContainText('Start with the basics');
  await expect(page.locator('article')).toContainText('START_HERE.md');
  await expect(page.locator('article')).toContainText('pending public release');
  await expect(page.locator('article pre')).toContainText([
    'review-a-capability.md',
    'skills/coda-quality-check/SKILL.md',
  ]);
  await expect(page.locator('article').getByRole('heading', { level: 3 })).toHaveText([
    /^1\. Try the sample review/,
    /^2\. Choose one initiative/,
    /^Work with documents$/,
    /^Use a repository$/,
  ]);
  const paths = article.locator('.cajon-card-grid a');
  await expect(paths.first()).toHaveAttribute('aria-label', 'Work with documents');
  await expect(paths.first()).toContainText('Recommended starting point');
  await article.getByRole('link', { name: 'Work with documents', exact: true }).click();
  await expect(page).toHaveURL('/docs/getting-started/capture-notes');
  await expect(article.locator('#save-documents')).toBeVisible();
  const repoSave = article.locator('details#save-repository');
  await expect(repoSave).not.toHaveAttribute('open');
  await repoSave.locator('summary').click();
  await expect(repoSave).toContainText('working-notes.md');
  await page.goto('/docs/getting-started');
  await article.getByRole('link', { name: 'Use a repository', exact: true }).click();
  await expect(page).toHaveURL('/docs/implementation/use-a-repository');
  await expect(article).toContainText('The conformance checker is separate from the ZIP');
  await expect(article).toContainText('npx harmonic-method validate ./harmonic-method');
  await article.getByRole('link', { name: 'Copy the persistent agent instructions' }).click();
  await expect(page).toHaveURL('/docs/appendix/llm-setup#repository-instructions');
  await expect(article.getByRole('figure', { name: 'Instructions: Use the Harmonic Method in a repository' })).toBeVisible();
  await page.goto('/docs/getting-started');
  await expect(page.locator('article #steps')).toHaveCount(0);
  await page.screenshot({ path: test.info().outputPath('starter-kit-desktop.png'), fullPage: true });
  const lessons = [
    ['Capture Notes', '/docs/getting-started/capture-notes'],
    ['Define a Coda', '/docs/getting-started/define-a-coda'],
    ['Define a Capability Beat', '/docs/getting-started/define-a-beat'],
    ['Run a Coda check', '/docs/getting-started/run-a-coda-check'],
    ['Plan Beat Versions and deliver Revisions', '/docs/implementation/plan-beat-versions'],
  ];
  for (const [title, path] of lessons) {
    await article.getByRole('link', { name: new RegExp(`^${title}$`, 'i') }).click();
    await expect(page).toHaveURL(path);
    await expect(article.getByRole('heading', { name: title, exact: true, level: 1 })).toBeVisible();
    await expect(article.getByRole('heading', { name: /Worked example/ })).toBeVisible();
    await expect(article.locator('#save-documents')).toBeVisible();
    await expect(article.locator('details#save-repository')).toHaveCount(1);
    if (title === 'Capture Notes') {
      await expect(article.locator('pre')).toContainText('Draft Harmonic Method Notes');
      await expect(article.getByRole('row', { name: /Decision Start with one team/ })).toBeVisible();
    }
    if (title === 'Define a Capability Beat') {
      await expect(article.getByRole('heading', { level: 2 })).toHaveText([
        /^Before you start/,
        /^1\. Start a draft/,
        /^2\. Fill in the draft/,
        /^Worked example/,
        /^3\. Review and save the draft/,
        /^4\. Take the draft into a quality check/,
      ]);
      await expect(article.getByRole('row', { name: /^Parent System Coda/ })).toContainText('without chasing a status update');
      await expect(article).toContainText('“Parent” means the larger outcome this capability supports.');
      await expect(article.getByRole('figure', { name: 'Template: Capability Beat draft' })).toBeVisible();
    }
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
  expect(await index.text()).toContain('https://www.harmonicmethods.com/docs/composition/beats.md');
  const corpus = await request.get('/llms-full.txt');
  expect(await corpus.text()).toContain('Capability Beat');
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).toContain('https://www.harmonicmethods.com/docs/composition/beats');
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
  await expect(page.getByRole('heading', { name: 'An illustrative delivery workflow' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.goto('/docs/method/roles#promoter');
  await expect(page.locator('#promoter')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.screenshot({ path: test.info().outputPath('docs-mobile-dark.png'), fullPage: true });
});
