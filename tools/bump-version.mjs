/**
 * Moves the spec set version everywhere it is required to agree: the manifest
 * and every parsed `spec_version` field it repeats.
 *
 * This exists because the hand-rolled version has been done by hand five times
 * in one development cycle (1.2.0 through 1.7.0), each time as a
 * sed-and-assert-the-count dance run manually. AGENTS.md already states the
 * rule this script enforces mechanically: when editing text with a script,
 * assert that every replacement matched. A replacement that finds nothing
 * changes nothing and reports nothing — this refuses to run rather than do
 * that silently.
 *
 * Run with: npm run bump-version -- 1.8.0
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { KIT_ROOT } from './rubric-fingerprint.mjs';

const next = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(next ?? '')) {
  console.error('usage: npm run bump-version -- <x.y.z>');
  process.exit(1);
}

const manifestPath = join(KIT_ROOT, 'specs/spec-set.yml');
const current = readFileSync(manifestPath, 'utf8').match(/^spec_version: (\S+)$/m)?.[1];
if (!current) {
  console.error(`${manifestPath}: no parsed 'spec_version' field found`);
  process.exit(1);
}
if (current === next) {
  console.error(`spec-set.yml is already at ${next} — nothing to bump`);
  process.exit(1);
}

const pattern = new RegExp(`^(\\s*)spec_version: ${current.replace(/\./g, '\\.')}$`, 'm');

const targets = [
  ...readdirSync(join(KIT_ROOT, 'specs')).filter((f) => f.endsWith('.yml')).map((f) => join('specs', f)),
  ...readdirSync(join(KIT_ROOT, 'examples')).filter((f) => f.endsWith('.yml')).map((f) => join('examples', f)),
];

let changed = 0;
for (const rel of targets) {
  const path = join(KIT_ROOT, rel);
  const text = readFileSync(path, 'utf8');
  if (!pattern.test(text)) continue;
  writeFileSync(path, text.replace(pattern, `$1spec_version: ${next}`));
  changed++;
}

if (changed === 0) {
  console.error(`no file under specs/ or examples/ matched spec_version: ${current} — asserted count would be 0`);
  process.exit(1);
}

console.log(`spec_version ${current} -> ${next} in ${changed} file(s)`);
console.log('Run `npm run validate` to confirm agreement, then `npm run fingerprint` only if a guarded rubric changed.');
