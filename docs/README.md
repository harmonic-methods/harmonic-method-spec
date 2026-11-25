# Documentation application

This is the standalone Fumadocs application for the Harmonic Method. It keeps
the existing `/docs` URLs and builds using public npm dependencies. The marketing
homepage and its feature flags remain in the private website source repository.

## Develop and verify

Use Node.js 22 or later. From this directory:

```sh
npm ci
npm run dev
```

Open <http://localhost:3500/docs>. The app root redirects to the documentation;
it does not include the marketing homepage. No environment variables, private
registry access, analytics keys or feature-flag credentials are required.

Before opening a change:

```sh
npm run build
npm run typecheck
npx playwright install chromium
npm test
```

The browser tests start the production server themselves. Stop a development
server on the same port before running them. On a Linux machine without browser
libraries, use `npx playwright install --with-deps chromium`.

Edit pages in `content/docs/`, with `title` and `description` frontmatter and
sidebar ordering in the containing `meta.json`. Shared MDX renderers live in
`components/`. `app/theme.css` supplies the local styles needed by the imported
content, including its existing `cajon-*` classes; it imports no private theme
or UI package. The theme uses system fonts instead of private font assets.

The specification and instrument definitions in the parent directory remain
canonical. The extraction retains the existing documentation prose; broader
editorial reconciliation is separate work. In particular, some imported pages
still describe six quality dimensions and implementation-specific gates or
Note types. Compare against `../specs/` and `../skills/` when revising them.

## Deployment and eventual cutover

Deploy this directory as its own Next.js application: project root `docs`,
install `npm ci`, build `npm run build`, output `.next`. The committed workflow
checks the build and browser behavior; it does not deploy. Keep the canonical
public origin `https://harmonicmethods.com` when testing a preview deployment.

The extraction leaves the existing production application in place. Before
switching traffic, reconcile documentation edits made there after extraction.
Then configure the website or shared router to forward these paths to the docs
deployment, preserving the request path and query string:

| Paths | Purpose |
| --- | --- |
| `/docs`, `/docs/:path*`, `/docs.md` | HTML pages and per-page Markdown |
| `/docs-assets/:path*` | Isolated Next.js JavaScript and CSS assets |
| `/api/docs/search` | Documentation search |
| `/llms.txt`, `/llms-full.txt` | Documentation index and complete Markdown corpus |

The app rewrites its `/docs-assets/_next/` requests to Next.js's local asset
handler. It does not claim the website's `/_next/` namespace. The direct
`/llms.mdx/docs/...` handlers are internal implementations of the `.md` rewrites;
the public `.md` paths are the supported interface.

The app's `/sitemap.xml` lists only documentation pages. At cutover, have the
website's sitemap index include that sitemap at a dedicated public path, or
combine its entries with the website sitemap. The website retains ownership of
`/`, its favicon and robots policy. Test navigation, search, CSS and JavaScript
loading, canonical URLs, Markdown and unknown-page responses through the final
shared origin before removing the old documentation routes. Rolling back means
restoring routing to the existing application.

Do not publish the source monorepo's Git history to extract the docs. This app
was copied as a selected source snapshot; the website, private packages and
deployment credentials are not part of it. Repository publication is separate
from deploying an app whose rendered pages are already public.

## License

Copyright 2026 Codazen, Inc.

- Documentation prose, including `content/` and this guide: [CC BY 4.0](../LICENSE-CONTENT).
- Application code, configuration and styles: [Apache 2.0](../LICENSE).
- The Harmonic Method name and mark remain subject to [the trademark policy](../TRADEMARKS.md).

See the parent [README](../README.md#license) for the repository's licensing
boundary. The docs application has its own package and lockfile and is excluded
from the published checker package.
