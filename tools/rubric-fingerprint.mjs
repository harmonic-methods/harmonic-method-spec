/**
 * Fingerprint over the published rubric dimension tables.
 *
 * The dimensions, red flags, and anchors are canonical in this repository, so an
 * edit to them changes the standard. Hashing the dimension section of each
 * rubric makes such an edit impossible to make silently: the digest moves, the
 * checker fails, and updating the digest is a deliberate line in the diff.
 *
 * Covered: the sections that define what a score *means* — the scoring scale,
 * the dimension table, and the check rules. The two rubrics are legitimately
 * asymmetric here: the Beat Coda rubric scores against one shared scale, while
 * the Beat Version rubric carries anchors per dimension. Both shapes are
 * faithful to what they mirror, so the guard covers whichever sections a rubric
 * actually has rather than assuming one layout.
 *
 * Not covered: the title, the inputs contract, and the output format. Those
 * carry shared style wording that churns for unrelated reasons, and a guard that
 * fails often trains the reflex of bumping the digest without reading the change.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const KIT_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Rubric skills are those carrying a dimension section. */
export function rubricSkills() {
  return readdirSync(join(KIT_ROOT, 'skills'))
    .filter((name) => {
      try {
        return /^## The \w+ dimensions/m.test(readFileSync(join(KIT_ROOT, 'skills', name, 'SKILL.md'), 'utf8'));
      } catch {
        return false;
      }
    })
    .sort();
}

/** Headings whose content defines what a score means. Order is fixed so the digest is stable. */
const NORMATIVE_SECTIONS = [/^## Scoring scale/m, /^## The \w+ dimensions/m, /^## Check rules/m];

/** One section, from its heading to the next top-level heading. */
function section(body, pattern) {
  const start = body.search(pattern);
  if (start === -1) return null;
  const rest = body.slice(start);
  const next = rest.slice(1).search(/^## /m);
  return next === -1 ? rest : rest.slice(0, next + 1);
}

/**
 * The normative text of a rubric, concatenated in a fixed order. Returned
 * verbatim — normalizing whitespace here would let a reformat that changes
 * meaning pass unnoticed.
 */
export function rubricText(skill) {
  const body = readFileSync(join(KIT_ROOT, 'skills', skill, 'SKILL.md'), 'utf8');
  const parts = NORMATIVE_SECTIONS.map((p) => section(body, p)).filter((x) => x !== null);
  return parts.length === 0 ? null : parts.join('');
}

export function digest(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

/**
 * A section that carries no scoring anchors is not a rubric, and fingerprinting
 * it would guard nothing while still reporting success.
 */
export function anchorCount(section) {
  return (section.match(/^\s*[1-5] = /gm) ?? []).length;
}
