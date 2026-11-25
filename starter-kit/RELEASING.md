# Publish the starter kit

The [Publish starter kit workflow](../.github/workflows/publish-starter-kit.yml)
builds the same ZIP as the preview workflow and publishes it as a GitHub Release
asset from `main`. Each release identifies the spec set and source commit. It
has its own tag and leaves the repository's latest release designation alone.

1. Review the ZIP from the validation run for the intended commit on `main`.
2. Once the repository is public, run **Publish starter kit** from `main` in
   GitHub Actions. The workflow verifies that the ZIP can be downloaded without
   signing in and that the bytes match what it built.
3. Set the website's `STARTER_KIT_DOWNLOAD_URL` to the verified download URL
   from the run summary, then rebuild the site. The release notes include
   the spec set, source commit, and SHA-256 checksum.

Keep earlier releases available so links continue to work and readers can
retrieve the kit that matches the version they used.
