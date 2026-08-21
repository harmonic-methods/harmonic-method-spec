/**
 * Conformance check for this repository's own artifacts.
 *
 * Validates every entity file in a system tree against the specs in `specs/`:
 * required fields, lifecycle enums, decision rationale, the agreement between a
 * child's back-reference and the directory it sits in, and reference
 * resolution. Also rejects vocabulary these specs do not define.
 *
 * Scope note: this checks the *entity* files. It does not check the rubric text
 * in `skills/` — a hand-edit to a dimension anchor is still unguarded here. The
 * reference implementation's fingerprint test catches canonical-side drift; the
 * local side of that gap is tracked in
 * harmonic-method/beats/rubric-parity/versions/v2-drift-guard/.
 *
 * Run with: npm run validate
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parse } from 'yaml';

import { checkCommitTrailers } from './commit-discipline.mjs';
import { normativeSkills, normativeText, digest, normativeItemCount } from './rubric-fingerprint.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * A tree given on the command line is resolved from the caller's directory; this
 * repository's own files are resolved from the tool. Without the split, pointing
 * the checker at a tree elsewhere would look for it inside this repository.
 */
const TARGET = process.argv[2];
const BASE = TARGET ? process.cwd() : ROOT;

let failures = 0;
const fail = (m) => { console.log(`  FAIL ${m}`); failures++; };
const readFrom = (base, p) => readFileSync(join(base, p), 'utf8');
const read = (p) => readFrom(ROOT, p);
const load = (p) => parse(read(p));
const ls = (p) => (existsSync(join(ROOT, p)) ? readdirSync(join(ROOT, p)) : []);
const treeRead = (p) => readFrom(BASE, p);
const treeLoad = (p) => parse(treeRead(p));
const treeLs = (p) => (existsSync(join(BASE, p)) ? readdirSync(join(BASE, p)) : []);

// Required fields, per the specs each entity is declared in.
const BEAT_REQ = ['id', 'title', 'coda', 'description', 'status'];
const BV_REQ = ['id', 'beat', 'title', 'summary', 'scope', 'status'];
const NOTE_REQ = ['id', 'type', 'content', 'attached_to'];
const REV_REQ = ['id', 'beat_version', 'title', 'description', 'status'];
const NOTE_TYPES = ['context', 'assumption', 'constraint', 'guidance', 'decision'];

const SEMVER = /^\d+\.\d+\.\d+$/;
const MANIFEST = 'specs/spec-set.yml';

/**
 * Every spec must parse — a machine-readable spec that does not is worthless —
 * and every spec must declare the same version as the manifest. The specs move
 * as a set, so an implementation pins one number rather than one per file. A
 * version living only in a comment is what this replaces: unparseable, and it
 * had gone stale in 55 files.
 */
function checkSpecs() {
  console.log('== specs ==');

  let setVersion;
  try {
    const m = load(MANIFEST);
    if (m?.manifest !== 'spec_set') fail(`${MANIFEST}: expected 'manifest: spec_set'`);
    setVersion = m?.spec_version;
    if (!SEMVER.test(String(setVersion))) fail(`${MANIFEST}: spec_version '${setVersion}' is not semver`);
  } catch (e) {
    fail(`${MANIFEST}: ${e.message}`);
  }

  const specs = ls('specs').map((f) => `specs/${f}`).filter((p) => p !== MANIFEST);
  let ok = 0;
  for (const p of specs) {
    let doc;
    try { doc = load(p); ok++; } catch (e) { fail(`${p}: ${e.message}`); continue; }
    if (doc?.spec_version === undefined) {
      fail(`${p}: no parsed 'spec_version' field — a version in a comment cannot be checked`);
    } else if (setVersion !== undefined && doc.spec_version !== setVersion) {
      fail(`${p}: spec_version '${doc.spec_version}' disagrees with ${MANIFEST} '${setVersion}'`);
    }
  }
  console.log(`  ${ok}/${specs.length} parsed, spec set ${setVersion ?? '(unknown)'}`);
}

/**
 * The dimension tables are canonical here, so an edit to one changes the
 * standard. A digest per rubric makes that edit impossible to make silently.
 * Anchor coverage is asserted separately, so the guard cannot pass over a
 * section that no longer contains a rubric at all.
 */
function checkRubricFingerprints() {
  console.log('== rubric fingerprints ==');
  let stored;
  try {
    const f = load('skills/fingerprints.yml');
    if (f?.manifest !== 'rubric_fingerprints') fail("skills/fingerprints.yml: expected 'manifest: rubric_fingerprints'");
    stored = f?.fingerprints ?? {};
  } catch (e) {
    return fail(`skills/fingerprints.yml: ${e.message}`);
  }

  const skills = normativeSkills();
  if (skills.length === 0) return fail('no skill carries a normative section');

  for (const skill of skills) {
    const section = normativeText(skill);
    const items = normativeItemCount(section);
    if (items < 3) {
      fail(`skills/${skill}: normative sections enumerate fewer than 3 items — a fingerprint over them would guard nothing`);
      continue;
    }
    const actual = digest(section);
    if (stored[skill] === undefined) {
      fail(`skills/fingerprints.yml: no digest recorded for '${skill}'`);
    } else if (stored[skill] !== actual) {
      fail(
        `skills/${skill}: rubric text changed — this edits the published standard.\n` +
        `       Do not update the digest first. Confirm the edit was intended, record the\n` +
        `       decision, decide whether the spec set version moves, then run: npm run fingerprint`,
      );
    } else {
      console.log(`  ${skill}  ${items} normative items, digest matches`);
    }
  }
  for (const recorded of Object.keys(stored)) {
    if (!skills.includes(recorded)) fail(`skills/fingerprints.yml: digest recorded for '${recorded}', which carries no normative section`);
  }
}

/**
 * The commit is the Revision, and a Revision belongs to exactly one Beat
 * Version. Nothing enforced that, and the rule was broken twice in one sitting
 * from the same cause — a script that failed partway while `git add -A` ran
 * anyway.
 */
function checkCommitDiscipline() {
  console.log('== commit discipline ==');
  let result;
  try { result = checkCommitTrailers(); } catch (e) { return fail(`git: ${e.message}`); }
  if (result.skipped) return console.log(`  skipped — ${result.skipped}`);
  for (const p of result.problems) fail(p);
  const excused = result.excused ? `, ${result.excused} excused` : '';
  if (result.problems.length === 0) console.log(`  ${result.checked} commit(s) each bind one Beat Version${excused}`);
}

/**
 * The tooling versions separately from the standard: a checker fix must never
 * bump what an implementation pins. Nothing kept the tooling version honest,
 * and it had drifted two releases behind the changelog.
 */
function checkToolingVersion() {
  console.log('== tooling version ==');
  let pkg;
  try { pkg = JSON.parse(read('package.json')); } catch (e) { return fail(`package.json: ${e.message}`); }
  const latest = read('CHANGELOG.md').match(/^## v(\d+\.\d+\.\d+)/m)?.[1];
  if (!latest) return fail('CHANGELOG.md: no "## vX.Y.Z" heading found');
  if (pkg.version !== latest) {
    fail(`package.json version '${pkg.version}' != newest CHANGELOG entry 'v${latest}'`);
  }
  console.log(`  package.json ${pkg.version}, newest changelog entry v${latest}`);
}

/**
 * Validates one system tree — this repository's own, or any tree given on the
 * command line.
 *
 * The root Coda's identifier is read from the tree rather than asserted. Only
 * this repository knows what its own should be, and demanding a particular value
 * would fail every tree but this one.
 */
function checkTree(root) {
  console.log(`== ${root}/ ==`);

  let coda;
  try { coda = treeLoad(`${root}/coda.yml`)?.coda; } catch (e) { fail(`${root}/coda.yml: ${e.message}`); }
  const codaId = coda?.id;
  if (codaId === undefined) fail(`${root}/coda.yml: a Coda with Beats beneath it needs an id for them to ladder to`);
  if (!coda?.statement) fail(`${root}/coda.yml: statement missing`);
  if (coda?.parent !== undefined) fail(`${root}/coda.yml: a root Coda omits parent`);

  const beatIds = new Set();
  const bvIds = new Set();
  const noteIds = new Set();
  const revIds = new Set();
  const bvRefs = [];

  for (const slug of treeLs(`${root}/beats`)) {
    const beatPath = `${root}/beats/${slug}/beat.yml`;
    if (!existsSync(join(BASE, beatPath))) { fail(`${root}/beats/${slug}/: no beat.yml`); continue; }

    let b;
    try { b = treeLoad(beatPath)?.beat; } catch (e) { fail(`${beatPath}: ${e.message}`); continue; }
    if (!b) { fail(`${beatPath}: no top-level 'beat' key`); continue; }

    for (const f of BEAT_REQ) if (b[f] === undefined) fail(`${beatPath}: missing required '${f}'`);
    if (!['open', 'closed'].includes(b.status)) fail(`${beatPath}: status '${b.status}' not in [open, closed]`);
    if (!b.coda?.statement) fail(`${beatPath}: coda.statement missing`);
    if (b.coda?.parent !== codaId) fail(`${beatPath}: coda.parent '${b.coda?.parent}' does not ladder to ${codaId}`);
    // A directory is the list; an inline field would be the second copy this
    // layout exists to remove.
    if (b.versions !== undefined) fail(`${beatPath}: inline 'versions' duplicates ./versions/`);
    if (b.notes !== undefined) fail(`${beatPath}: inline 'notes' duplicates ./notes/`);
    if (beatIds.has(b.id)) fail(`${beatPath}: duplicate beat id '${b.id}'`);
    beatIds.add(b.id);

    const versions = [];
    for (const vslug of treeLs(`${root}/beats/${slug}/versions`)) {
      const vDir = `${root}/beats/${slug}/versions/${vslug}`;
      const vPath = `${vDir}/version.yml`;
      if (!existsSync(join(BASE, vPath))) { fail(`${vDir}/: no version.yml`); continue; }

      let v;
      try { v = treeLoad(vPath)?.beat_version; } catch (e) { fail(`${vPath}: ${e.message}`); continue; }
      if (!v) { fail(`${vPath}: no top-level 'beat_version' key`); continue; }

      for (const f of BV_REQ) if (v[f] === undefined) fail(`${vPath}: missing required '${f}'`);
      if (!['active', 'delivered', 'withdrawn'].includes(v.status)) fail(`${vPath}: status '${v.status}' not in [active, delivered, withdrawn]`);
      if (v.beat !== b.id) fail(`${vPath}: declares beat '${v.beat}' but sits under ${b.id}`);
      if (v.notes !== undefined) fail(`${vPath}: Beat Versions carry no notes — attach to the Beat with beat_version`);
      if (v.revisions !== undefined) fail(`${vPath}: inline 'revisions' duplicates ./revisions/`);
      if (bvIds.has(v.id)) fail(`${vPath}: duplicate beat version id '${v.id}'`);
      bvIds.add(v.id);

      const revisions = [];
      for (const rf of treeLs(`${vDir}/revisions`)) {
        const rPath = `${vDir}/revisions/${rf}`;
        let r;
        try { r = treeLoad(rPath)?.revision; } catch (e) { fail(`${rPath}: ${e.message}`); continue; }
        if (!r) { fail(`${rPath}: no top-level 'revision' key`); continue; }

        for (const f of REV_REQ) if (r[f] === undefined) fail(`${rPath}: missing required '${f}'`);
        if (!['active', 'delivered', 'withdrawn'].includes(r.status)) fail(`${rPath}: status '${r.status}' not in [active, delivered, withdrawn]`);
        // specs/revision.yml: a Revision belongs to exactly one Beat Version.
        if (r.beat_version !== v.id) fail(`${rPath}: declares beat_version '${r.beat_version}' but sits under ${v.id}`);
        if (revIds.has(r.id)) fail(`${rPath}: duplicate revision id '${r.id}'`);
        revIds.add(r.id);
        revisions.push(r.id);
      }
      versions.push(`${v.id} ${v.status}${revisions.length ? ` [${revisions.join(' ')}]` : ''}`);
    }
    // Not a failure: specs/beat.yml does not require `versions`, and a Beat that
    // has been scored but not yet decomposed is the exact state the decomposition
    // gate governs. Rejecting it made that state unrepresentable and forced a
    // Beat and its first step to arrive together.
    const versionSummary = versions.length ? versions.join(', ') : '(none — not yet decomposed)';

    const notes = [];
    for (const nf of treeLs(`${root}/beats/${slug}/notes`)) {
      const nPath = `${root}/beats/${slug}/notes/${nf}`;
      let n;
      try { n = treeLoad(nPath)?.note; } catch (e) { fail(`${nPath}: ${e.message}`); continue; }
      if (!n) { fail(`${nPath}: no top-level 'note' key`); continue; }

      for (const f of NOTE_REQ) if (n[f] === undefined) fail(`${nPath}: missing required '${f}'`);
      if (!NOTE_TYPES.includes(n.type)) fail(`${nPath}: note type '${n.type}' is not in specs/note.yml`);
      if (n.type === 'decision' && !n.rationale) fail(`${nPath}: a decision Note requires rationale`);
      if (n.attached_to !== b.id) fail(`${nPath}: attached_to '${n.attached_to}' but sits under ${b.id}`);
      if (noteIds.has(n.id)) fail(`${nPath}: duplicate note id '${n.id}'`);
      noteIds.add(n.id);
      if (n.beat_version !== undefined) bvRefs.push({ nPath, ref: n.beat_version });
      notes.push(`${n.id} ${n.type}${n.beat_version ? ` →${n.beat_version}` : ''}`);
    }

    console.log(`  ${b.id}  ${slug}/`);
    console.log(`    versions: ${versionSummary}`);
    console.log(`    notes:    ${notes.join(', ') || '(none)'}`);
  }

  // Resolved last, so a Note may reference any Beat Version in the tree.
  for (const { nPath, ref } of bvRefs) {
    if (!bvIds.has(ref)) fail(`${nPath}: beat_version '${ref}' does not resolve`);
  }
}

/**
 * The method's word for the level above a Beat is "system"; "project" is the
 * reference implementation's. Drop and Movement are its entities too, and no
 * spec here defines them. Skills are excluded: they cite the reference
 * implementation's vocabulary deliberately.
 */
function checkVocabulary(roots) {
  console.log('== vocabulary ==');
  const stray = /\b(project|movement|drop)s?\b/i;
  const files = [
    ...ls('specs').map((f) => `specs/${f}`),
    ...roots.flatMap((root) => [
      `${root}/coda.yml`,
      ...ls(`${root}/beats`).flatMap((slug) => [
        `${root}/beats/${slug}/beat.yml`,
        ...ls(`${root}/beats/${slug}/notes`).map((f) => `${root}/beats/${slug}/notes/${f}`),
        ...ls(`${root}/beats/${slug}/versions`).flatMap((v) => [
          `${root}/beats/${slug}/versions/${v}/version.yml`,
          ...ls(`${root}/beats/${slug}/versions/${v}/revisions`).map(
            (f) => `${root}/beats/${slug}/versions/${v}/revisions/${f}`,
          ),
        ]),
      ]),
    ]),
  ];
  for (const p of files) {
    const m = read(p).match(stray);
    if (m) fail(`${p}: uses "${m[0]}" — not an entity these specs define`);
  }
  console.log(`  ${files.length} files checked`);
}

const COUNT_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

/**
 * How many dimensions or checks each instrument carries, as stated on the two
 * published surfaces.
 *
 * These are derivable facts sitting in prose no other check reaches, which is the
 * shape this repository keeps failing at. One had already gone stale: the
 * reconciliation instrument gained a ninth check and both surfaces still said
 * eight, so an agent consuming the specification was told the wrong number. The
 * instrument digests do not cover this — they guard an instrument's own text, not
 * prose about it. Count the enumerated items and assert the prose agrees.
 */
function checkPublishedCounts() {
  console.log('== published counts ==');
  const surfaces = [
    { path: 'README.md', find: (s) => `](skills/${s}/SKILL.md)` },
    { path: 'llms.txt', find: (s) => `- skills/${s}/SKILL.md:` },
  ];
  const skills = normativeSkills();
  for (const skill of skills) {
    const items = (read(`skills/${skill}/SKILL.md`).match(/^\d+\. \*\*/gm) ?? []).length;
    if (items < 1 || items >= COUNT_WORDS.length) {
      fail(`skills/${skill}: ${items} enumerated items — outside the range this check can state in words`);
      continue;
    }
    for (const { path, find } of surfaces) {
      const needle = find(skill);
      const line = read(path).split('\n').find((l) => l.includes(needle));
      if (line === undefined) { fail(`${path}: no line matching '${needle}'`); continue; }
      const stated = line.toLowerCase().match(new RegExp(`\\b(${COUNT_WORDS.slice(1).join('|')})\\b`))?.[1];
      if (stated === undefined) fail(`${path}: the line naming ${skill} states no count`);
      else if (COUNT_WORDS.indexOf(stated) !== items) {
        fail(`${path}: says '${stated}' where skills/${skill} enumerates ${items}`);
      }
    }
  }
  console.log(`  ${skills.length} instruments, counts agree across ${surfaces.length} published surfaces`);
}

/**
 * Retired altitude names, rejected on the normative surface only.
 *
 * The altitudes are portfolio, system, and beat. "Organization" was retired as an
 * altitude name because it answers who owns the work rather than how much is in
 * view, and the decision states it does not appear in the method — yet it
 * survived in one field description, which is exactly where a reader looks to
 * find out what a field accepts.
 *
 * Scoped to `specs/` on purpose, and narrower than the sweep in checkVocabulary:
 * the Notes recording a retirement have to be able to name the word they retire,
 * and an adopter's own tree is not measured against this repository's vocabulary
 * discipline.
 */
function checkRetiredAltitudes() {
  console.log('== retired altitudes ==');
  const retired = /\b(orgs?|organizations?)\b/i;
  const files = ls('specs').map((f) => `specs/${f}`);
  for (const p of files) {
    const m = read(p).match(retired);
    if (m) fail(`${p}: uses "${m[0]}" — a retired altitude name; the altitudes are portfolio, system, and beat`);
  }
  console.log(`  ${files.length} spec files checked`);
}

/**
 * Which checks travel, and which stay.
 *
 * A tree given on the command line is checked for the things the specs actually
 * require: fields, lifecycle values, decision rationale, the agreement between a
 * child's back-reference and the directory holding it, and reference resolution.
 *
 * Everything else is a discipline this repository keeps on itself and is NOT a
 * property of a conformant tree. The forbidden-vocabulary sweep is the clearest
 * case: it rejects words this repository declines to define, and an adopter is
 * entitled to a Beat about a project. Running it on their tree would fail them
 * for using ordinary English. The same reasoning excludes the instrument
 * digests, the version agreement, and the commit trailers.
 */
if (TARGET) {
  const target = TARGET.replace(/\/+$/, '');
  if (!existsSync(join(BASE, `${target}/coda.yml`))) {
    fail(`${target}/coda.yml not found — point this at a directory holding a system Coda`);
  } else {
    checkTree(target);
  }
} else {
  checkSpecs();
  checkRetiredAltitudes();
  checkRubricFingerprints();
  checkPublishedCounts();
  checkToolingVersion();
  checkCommitDiscipline();
  checkTree('harmonic-method');
  checkTree('examples');
  checkVocabulary(['harmonic-method', 'examples']);
}

console.log(failures === 0 ? '\nconformant' : `\n${failures} failure(s)`);
process.exit(failures === 0 ? 0 : 1);
