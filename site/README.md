# Website and documentation

This standalone Next.js/Fumadocs application serves the Harmonic Methods
homepage at `/` and documentation at `/docs`. It builds using public npm
dependencies, without access to the original monorepo or its private packages.

## Develop and verify

Use Node.js 26.x (the major in `.nvmrc`). From this directory:

```sh
npm ci
npm run dev
```

Open <http://localhost:3500> or <http://localhost:3500/docs>. No environment
variables or private registry access are required for development or CI.

Before opening a change:

```sh
npm run build
npm run typecheck
npx playwright install chromium
npm test
```

The browser tests start the production server themselves. Stop a development
server on the same port before running them. On Linux without browser libraries,
use `npx playwright install --with-deps chromium`.

Edit the homepage in `app/page.tsx` and `components/home/`, and its layout in
`app/home.css`. Edit documentation in `content/docs/`, with `title` and
`description` frontmatter and sidebar ordering in the containing `meta.json`.
Shared MDX renderers live in `components/`. `app/theme.css` supplies local styles
for both surfaces, including the existing `cajon-*` classes. Fonts are self-hosted
from public Fontsource packages, whose bundled licenses apply to those fonts.

Practice pages can declare `accountableRoles` and `supportingRoles` arrays in
frontmatter using the names in `lib/roles.ts`. Accountable tags name who answers
for applying the practice; supporting tags name contributors. These tags link to
the role definitions and appear in Markdown exports. The content schema rejects
unknown names, duplicates, multiple accountable roles, and roles assigned to both
groups on one page. Use an accountable tag only when one role clearly owns the
practice. Omit page-level tags on general orientation or mixed-practice pages;
explain distinct responsibilities inline instead. Tags do not designate the
page's author or maintainer.

Use the existing `CalloutContainer`, `CalloutTitle` and `CalloutDescription`
MDX components sparingly for advice readers could otherwise miss. Types `info`,
`idea` (tip) and `warning` provide styled treatments. Put an explicit Info, Tip
or Warning label in the title, and use child content so titles survive Markdown
export. Prefer at most one new callout on a page; keep ordinary explanations
in the body text.

Introduce **Capability Beat** or **Capability Beats** at first mention on a
standalone page, with natural wording such as “a Capability Beat, or Beat for
short.” Use the shorter form afterward. Keep editorial naming instructions out
of reader-facing prose. Keep compound terms such
as **Beat Version**, entity fields, identifiers and routes unchanged.

Put copy-ready prompts, commands and reusable examples in fenced code blocks
with a descriptive `title`. The shared renderer supplies a copy button. Use
`text` for plain instructions or `markdown` for content with headings and lists;
copying preserves the source syntax and line breaks. Text and Markdown blocks
wrap long lines for readability. Keep explanatory quotations as quotations.

The specification and instrument definitions in the parent directory remain
canonical. The imported documentation has been reconciled for Beat quality
dimensions,
Note types, and the distinction between assessment and enforcement. Broader
editorial review remains separate work. Compare against `../specs/` and
`../skills/` when revising. Follow [the release runbook](../RELEASING.md) before
repository publication or production cutover.

## Optional services

Copy `.env.example` to `.env.local` only if configuring these integrations:

- Google Tag Manager loads only when `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID` is set.
- Homepage section flags retain their existing Vercel keys. Without a server-side
  `FLAGS` SDK key or `VERCEL_OIDC_TOKEN`, they resolve to false locally. A linked
  Vercel deployment can use its project OIDC identity. `FLAGS_SECRET` supports
  the protected Flags Explorer discovery endpoint and overrides.
- Blog, video and community sections contain placeholder material and stay off
  until real content and destinations are provided. Opening the source does not
  make those sections ready to publish.
- The newsletter additionally needs `NEXT_PUBLIC_NEWSLETTER_ACTION`, an actual
  subscription endpoint; the form stays hidden without it even if its flag is on.
- The specification link retains its separate release flag until the repository
  is publicly reachable. Source inclusion does not change repository visibility.
- Set `STARTER_KIT_DOWNLOAD_URL` to the verified HTTPS ZIP URL from the
  **Publish starter kit** workflow and rebuild the site to show the download
  link. Leave it unset until a kit has been published.

Credentials belong in local environment files or the deployment's secret store.
Only `.env.example`, with empty values, is committed. No subscriber data or
service credentials are included in this application.

## Deployment and eventual cutover

Deploy this directory as one Next.js application: project root `site`, install
`npm ci`, build `npm run build`, output `.next`. The committed workflow runs
checks and does not deploy. The canonical public origin stays
`https://harmonicmethods.com`; previews should retain that canonical origin.

The [harmonic-methods-site Vercel project](https://vercel.com/codazen/harmonic-methods-site)
is linked to this repository under the Codazen team, with `site` as the root and
Node.js selected by the package engine, matching CI. Git integration supplies
branch previews and production builds from `main`. Review changes on their
branch preview before merging or moving any custom domain.

The app owns the homepage, docs, brand assets, robots policy and sitemap. It
uses ordinary `/_next/` assets and keeps `/api/docs/search` for docs search.
The `.md` rewrites, `/llms.txt` and `/llms-full.txt` remain available. There is
no proxy boundary between website and docs and no second deployment to maintain.

The current production application stays in place during review. Before
cutover, reconcile intervening homepage and documentation edits, provision any
optional service settings on the target deployment, and test navigation,
search, assets, light/dark mode, canonical URLs, Markdown and missing-page
responses on the preview. Switch the domain to the new deployment only after
those checks pass. Rollback restores the domain to the existing deployment.
Retire the old app and deployment workflow after the new deployment is verified.

The app is copied as selected source files, without the original monorepo's Git
history or private libraries. Publishing this repository is separate from
deploying the rendered site.

## License

Copyright 2026 Codazen, Inc.

- Documentation prose, including `content/` and this guide: [CC BY 4.0](../LICENSE-CONTENT).
- Website and documentation application code, configuration and styles: [Apache 2.0](../LICENSE).
- Brand assets, names and marks remain subject to [the trademark policy](../TRADEMARKS.md).

See the parent [README](../README.md#license) for the repository licensing
boundary. The site has its own package and lockfile and is excluded from the
published checker package.

### Estimate approval walkthrough assets

The runnable source lives in `tutorials/estimate-approval/`. After changing it, run `python3 tools/build-estimate-example.py` from the repository root to refresh the downloadable files and ZIP. The docs browser suite checks that served source files match the example. PR screenshots in `site/public/images/walkthrough/` are historical captures; the walkthrough links their source commit.

### Links to method files

Link named tracked files and skills to their GitHub source; use the current source on `main` for general method references and the recorded merged commit for walkthrough examples. Keep paths inside commands and copyable prompts literal. Filenames for documents a reader creates are examples, not links to a file in this repository.

`review-a-capability.md` and `sample-capability.md` are generated chat attachments, not tracked source files. The site build and dev hooks run `tools/build-doc-file-downloads.py`, which uses the canonical kit builder to expose them at `/downloads/starter-kit/`. Do not hand-edit these generated downloads.
