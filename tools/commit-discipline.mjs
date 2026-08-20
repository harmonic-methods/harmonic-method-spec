/**
 * Commit discipline over the branch's own commits.
 *
 * A Revision belongs to exactly one Beat Version, and in a git-hosted system the
 * commit is the Revision — so a commit carrying two `Beat-Version:` trailers is
 * a non-conformant Revision, and a change spanning two Beat Versions is two
 * commits. This check exists because that mistake was made twice in one sitting,
 * both times from the same cause, and nothing caught it.
 *
 * Scope: commits on this branch but not on the base. Commits made before the
 * discipline was written are not retroactively judged.
 *
 * Exceptions live in `trailer-exceptions.txt`, one commit per line with a
 * reason. A defect already in history is recorded rather than rewritten — the
 * same principle that keeps old trailers un-rewritten. The file is meant to stay
 * short; a growing one is the smell, not the fix.
 */
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = process.env.HM_BASE_REF ?? 'main';

// stderr is discarded: an absent base ref is a soft skip, and git's own
// diagnostic on the way there would read as a crash.
const git = (args) =>
  execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

function exceptions() {
  const p = join(ROOT, 'tools/trailer-exceptions.txt');
  if (!existsSync(p)) return new Map();
  const out = new Map();
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const [sha, ...reason] = t.split(/\s+/);
    out.set(sha, reason.join(' '));
  }
  return out;
}

/**
 * Returns {skipped} when the base is unreachable — a shallow clone or a fork
 * without the base branch should not be reported as a discipline failure.
 *
 * Except where skipping would defeat the point: set HM_REQUIRE_BASE and an
 * absent base becomes a failure. Continuous integration sets it, because a
 * guard allowed to skip silently in the one place it is enforced reports
 * success while guarding nothing.
 */
export function checkCommitTrailers() {
  let range;
  try {
    git(['rev-parse', '--verify', BASE]);
    range = `${BASE}..HEAD`;
  } catch {
    if (process.env.HM_REQUIRE_BASE) {
      return { problems: [`base ref '${BASE}' not present, and HM_REQUIRE_BASE is set — fetch enough history to resolve it`], checked: 0 };
    }
    return { skipped: `base ref '${BASE}' not present` };
  }

  const shas = git(['rev-list', '--no-merges', range]).split('\n').filter(Boolean);
  const allowed = exceptions();
  const problems = [];

  for (const sha of shas) {
    const body = git(['log', '-1', '--format=%B', sha]);
    const trailers = body.split('\n').filter((l) => /^Beat-Version:\s*\S/.test(l));
    const short = sha.slice(0, 7);
    const subject = git(['log', '-1', '--format=%s', sha]);

    const excused = [...allowed.keys()].find((k) => sha.startsWith(k));
    if (excused) continue;

    if (trailers.length > 1) {
      problems.push(
        `${short} carries ${trailers.length} Beat-Version trailers — a Revision belongs to one Beat Version: "${subject}"`,
      );
    } else if (trailers.length === 0) {
      problems.push(`${short} carries no Beat-Version trailer — bind the change to its plan: "${subject}"`);
    }
  }
  return { checked: shas.length, excused: allowed.size, problems };
}
