# Public release and site cutover

Repository visibility, the starter-kit download, the checker package, and the
website are separate releases. Complete preparation before changing an audience
or routing production traffic. This guide does not authorize those operations.

## Prepare the final source

- Review and merge the intended changes, including any concurrent onboarding
  work. Inspect open requests rather than assuming the newest preview is `main`.
- Record the chosen merged commit in the release evidence. Run the checks below
  on that commit and review its own Vercel build, not another branch's preview.
- Reconcile any intervening edits in the old website. The standalone application
  under `site/` is the target; the old application is retained for rollback.
- Verify the licensing boundary in [README.md](README.md#license), the content
  license, font licenses, and [TRADEMARKS.md](TRADEMARKS.md). Confirm permission
  to publish all source, examples and brand assets.

## Review everything visibility exposes

Before making the repository public, review the repository description, all
branches and tags, reachable Git history, issue and pull request titles and
bodies, comments, closed request diffs, workflow logs and retained artifacts,
and any release attachments. Read [AGENTS.md](AGENTS.md) for the public-surface
rule. Source scanning alone does not cover these surfaces.

Run a secret scan of history and the final working tree. Treat its result as a
pattern check, not proof that client names, private reasoning or unpublished
material are absent. Review those manually. If a credential is discovered,
revoke it and review its historical exposure before publishing.

The preparation sweep found a comment on
[PR #2](https://github.com/harmonic-methods/harmonic-method-spec/pull/2#issuecomment-5304712837)
containing identifiers from another system. Resolve that comment before
publication, then read it back. Do not copy the identifiers into public release
notes. Historical diffs, logs, artifacts and names still require manual review;
the identifier check only covers known shapes.

## Verify locally

From the repository root:

```sh
npm ci
npm run validate
npm pack --dry-run
python3 tools/build-starter-kit.py /tmp/harmonic-method-release-kit
python3 -m zipfile --test /tmp/harmonic-method-release-kit/harmonic-method-starter-kit.zip
```

Inspect the npm manifest: include the checker, canonical specs, skills and
licenses; exclude the site, local environment files, credentials and private
working material. Extract the ZIP, open `START_HERE.md`, and exercise both the
attachment trial and folder trial in an approved AI workspace. Confirm that
the output reports the spec set and the required rubric results.

From `site/`, using the Node major in `.nvmrc`:

```sh
npm ci
npm run build
npm run typecheck
npx playwright install chromium
npm test
npm audit
```

Review audit findings rather than applying forced major upgrades during launch.
The preparation audit reported a low-severity KaTeX advisory through Mermaid;
track remediation or document acceptance after assessing the rendered content.
The site's diagrams are supplied by repository authors, not uploaded by visitors.

## Publish the repository and downloads

1. Confirm the historical review and final checks are complete before changing
   repository visibility. Verify anonymous access after publication.
2. Choose a stable spec source tag from merged work. Keep the spec-set stream
   separate from the checker's package version. Follow the tag-before-changelog
   rule in [AGENTS.md](AGENTS.md); do not label unreleased checker changes as
   already shipped.
3. Follow [starter-kit/RELEASING.md](starter-kit/RELEASING.md). The manual workflow
   refuses a non-public repository and verifies an anonymous ZIP download against
   the archive it built. Retain the source commit, checksum and download URL.
4. Set `STARTER_KIT_DOWNLOAD_URL` on the target website to that verified URL and
   rebuild. Check the rendered download link and ZIP without signing in. Keep
   older download URLs available.
5. Enable `harmonic-method-spec-released` only after anonymous source access and
   the intended tag are verified. Confirm that the rendered GitHub link appears.
6. If publishing the checker to npm is part of this launch, separately verify
   package ownership, release contents and version availability. Test the
   documented `npx harmonic-method` path from a clean directory after publication.
   A GitHub source release does not publish the npm package.

## Verify the target deployment

The intended Vercel project is `harmonic-methods-site` under the Codazen team,
with `site` as its root. Read back the root directory, Git production branch,
runtime, build settings and deployment source commit. Review the READY production
candidate built with production settings before assigning the custom domain.
Preserve preview protection; do not disable it to make testing easier.

Provision only the integrations being released. Keep blog, video and community
flags off until their material and destinations exist. A newsletter needs a real
subscription endpoint. Scope analytics to production. Verify flags against the
target project; existing keys do not prove the intended values were provisioned.

Check desktop and mobile navigation, assets, light/dark mode, docs search,
unknown-route 404s, `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`,
`/docs.md`, and a nested `/docs/...md` page. Check canonical URLs against
`https://harmonicmethods.com` and revisit the rendered starter download and
repository link with production settings. Reconcile the pending-release wording
in Getting started and the root README when public downloads are available.

## Cut over and retain rollback

Before cutover, record the current custom-domain assignment, DNS records and
previous production deployment. Verify who controls the domain and TLS; do not
infer the current routing from a project name. Keep the old application intact.

Assign the custom domain to the verified new deployment, then repeat the public
smoke checks anonymously through `https://harmonicmethods.com`. Confirm TLS,
redirects and canonical URLs, and check runtime errors. If critical routes or
downloads fail, restore the recorded domain assignment and DNS as applicable,
then verify the restored site. Do not retire the old application or its workflow
until the new production site has been verified and the rollback window agreed.
