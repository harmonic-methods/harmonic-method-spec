/**
 * The coverage reading, done arithmetically.
 *
 * Illustrative, and deliberately not an instrument. `skills/coverage-reading`
 * is the instrument; this shows the same two questions answered by distance
 * rather than by reading, so the two can be compared where an adopter has
 * embeddings. Neither is authoritative over the other and they fail
 * differently — see the skill.
 *
 * Vectors are input, never computed here. No model, no network, no dependency:
 * an adopter produces vectors however they like and this does arithmetic on
 * them. Reading or running anything in this repository still installs nothing.
 *
 * No threshold is applied anywhere, on purpose. The published dimensions carry
 * no cutoff for "aligned enough" or "distinct enough", the method leaves scales
 * to implementations, and a number here would become one by being the only one
 * available. Rankings say where to look; whether that is room is a judgement.
 *
 *   node examples/coverage/coverage.mjs examples/coverage/vectors.json
 */
import { readFileSync } from 'node:fs';

const path = process.argv[2];
if (!path) {
  console.log('coverage: needs a path to a vectors file — see examples/coverage/README.md');
  process.exit(1);
}
const d = JSON.parse(readFileSync(path, 'utf8'));

const unit = (v) => { const n = Math.hypot(...v); return v.map((x) => x / n); };
const cos = (a, b) => { const u = unit(a); const w = unit(b); return u.reduce((s, x, i) => s + x * w[i], 0); };
const f = (x) => x.toFixed(3);
const nearest = (b) =>
  d.beats
    .filter((o) => o.id !== b.id)
    .map((o) => ({ id: o.id, c: cos(b.v, o.v) }))
    .reduce((m, s) => (s.c > m.c ? s : m));

console.log('\nFurthest from the system Coda — reaching outside the boundary\n');
for (const b of [...d.beats].sort((a, z) => cos(a.v, d.coda.v) - cos(z.v, d.coda.v))) {
  console.log(`  ${f(cos(b.v, d.coda.v))}  ${b.id}  ${b.label}`);
}

console.log('\nClosest to a sibling — covering ground already taken\n');
for (const b of [...d.beats].sort((a, z) => nearest(z).c - nearest(a).c)) {
  const n = nearest(b);
  console.log(`  ${f(n.c)}  ${b.id} ~ ${n.id}   ${b.label}`);
}

if (d.probe) {
  const a = cos(d.probe.v, d.coda.v);
  const n = nearest(d.probe);
  const further = d.beats.filter((b) => cos(b.v, d.coda.v) > a).length;
  const tighter = d.beats.filter((b) => nearest(b).c > n.c).length;
  console.log(`\nProbe — ${d.probe.label}\n`);
  console.log(`  alignment ${f(a)}: further out than ${further} of ${d.beats.length} existing Beats`);
  console.log(`  nearest   ${f(n.c)} (${n.id}): less crowded than ${tighter} of ${d.beats.length}`);
}

console.log('\nNo threshold is applied. Whether any of this is room is a judgement, not a number.\n');
