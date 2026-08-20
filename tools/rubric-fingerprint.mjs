/**
 * Fingerprint over the published instruments' normative text.
 *
 * Dimensions, red flags, anchors, and check definitions are canonical in this
 * repository, so an edit to them changes the standard. Hashing the normative
 * sections of each instrument makes such an edit impossible to make silently:
 * the digest moves, the checker fails, and updating it is a deliberate line in
 * the diff.
 *
 * Covered: the sections that define what an instrument *concludes* — the scoring
 * scale, the dimension table, the checks, and the check rules. The instruments
 * are legitimately asymmetric: one scores against a shared scale, one carries
 * anchors per dimension, and one reports findings with no band at all. The guard
 * covers whichever of those sections an instrument actually has rather than
 * assuming one shape.
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

/**
 * Headings whose content is normative. Order is fixed so a digest is stable.
 * Adding an instrument with a differently named normative section means adding
 * it here — otherwise the instrument is published unguarded, which is how the
 * findings instrument was nearly shipped outside this guard entirely.
 */
const NORMATIVE_SECTIONS = [
  /^## Scoring scale/m,
  /^## The \w+ dimensions/m,
  /^## The checks/m,
  /^## Check rules/m,
];

/** An instrument is any skill carrying at least one normative section. */
export function normativeSkills() {
  return readdirSync(join(KIT_ROOT, 'skills'))
    .filter((name) => {
      let body;
      try { body = readFileSync(join(KIT_ROOT, 'skills', name, 'SKILL.md'), 'utf8'); } catch { return false; }
      return NORMATIVE_SECTIONS.some((p) => p.test(body));
    })
    .sort();
}

/** One section, from its heading to the next top-level heading. */
function section(body, pattern) {
  const start = body.search(pattern);
  if (start === -1) return null;
  const rest = body.slice(start);
  const next = rest.slice(1).search(/^## /m);
  return next === -1 ? rest : rest.slice(0, next + 1);
}

/**
 * The normative text of an instrument, concatenated in a fixed order. Returned
 * verbatim — normalizing whitespace here would let a reformat that changes
 * meaning pass unnoticed.
 */
export function normativeText(skill) {
  const body = readFileSync(join(KIT_ROOT, 'skills', skill, 'SKILL.md'), 'utf8');
  const parts = NORMATIVE_SECTIONS.map((p) => section(body, p)).filter((x) => x !== null);
  return parts.length === 0 ? null : parts.join('');
}

export function digest(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

/**
 * How many normative items the covered text enumerates: scoring anchors, and
 * numbered dimensions or checks. A section carrying none is not an instrument,
 * and fingerprinting it would guard nothing while reporting success.
 *
 * Counting both shapes is what lets one guard cover a band rubric and a findings
 * instrument. Counting only anchors would pass the band rubrics and reject the
 * findings instrument for not being one.
 */
export function normativeItemCount(text) {
  const anchors = (text.match(/^\s*[1-5] = /gm) ?? []).length;
  const enumerated = (text.match(/^\s*\d+\.\s+\*\*/gm) ?? []).length;
  return anchors + enumerated;
}
