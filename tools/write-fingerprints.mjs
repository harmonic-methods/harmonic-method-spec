/** Regenerates skills/fingerprints.yml. Run only after confirming an edit was intended. */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { KIT_ROOT, rubricSkills, rubricText, digest } from './rubric-fingerprint.mjs';

const path = join(KIT_ROOT, 'skills/fingerprints.yml');
const header = readFileSync(path, 'utf8').split('fingerprints:')[0];
const body = rubricSkills().map((s) => `  ${s}: ${digest(rubricText(s))}`).join('\n');
writeFileSync(path, `${header}fingerprints:\n${body}\n`);
console.log('skills/fingerprints.yml regenerated');
