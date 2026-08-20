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
import { rubricSkills, rubricText, digest, anchorCount } from './rubric-fingerprint.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

let failures = 0;
const fail = (m) => { console.log(`  FAIL ${m}`); failures++; };
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const load = (p) => parse(read(p));
const ls = (p) => (existsSync(join(ROOT, p)) ? readdirSync(join(ROOT, p)) : []);

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

  const skills = rubricSkills();
  if (skills.length === 0) return fail('no rubric skill carries a dimension section');

  for (const skill of skills) {
    const section = rubricText(skill);
    const anchors = anchorCount(section);
    if (anchors === 0) {
      fail(`skills/${skill}: normative sections carry no scoring anchors — a fingerprint over them would guard nothing`);
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
      console.log(`  ${skill}  ${anchors} anchors, digest matches`);
    }
  }
  for (const recorded of Object.keys(stored)) {
    if (!skills.includes(recorded)) fail(`skills/fingerprints.yml: digest recorded for '${recorded}', which is not a rubric skill`);
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

/** Validates one system tree. Used for both `harmonic-method/` and `examples/`. */
function checkTree(root, codaId) {
  console.log(`== ${root}/ ==`);

  let coda;
  try { coda = load(`${root}/coda.yml`)?.coda; } catch (e) { fail(`${root}/coda.yml: ${e.message}`); }
  if (coda?.id !== codaId) fail(`${root}/coda.yml: id '${coda?.id}' != '${codaId}'`);
  if (!coda?.statement) fail(`${root}/coda.yml: statement missing`);
  if (coda?.parent !== undefined) fail(`${root}/coda.yml: a root Coda omits parent`);

  const beatIds = new Set();
  const bvIds = new Set();
  const noteIds = new Set();
  const revIds = new Set();
  const bvRefs = [];

  for (const slug of ls(`${root}/beats`)) {
    const beatPath = `${root}/beats/${slug}/beat.yml`;
    if (!existsSync(join(ROOT, beatPath))) { fail(`${root}/beats/${slug}/: no beat.yml`); continue; }

    let b;
    try { b = load(beatPath)?.beat; } catch (e) { fail(`${beatPath}: ${e.message}`); continue; }
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
    for (const vslug of ls(`${root}/beats/${slug}/versions`)) {
      const vDir = `${root}/beats/${slug}/versions/${vslug}`;
      const vPath = `${vDir}/version.yml`;
      if (!existsSync(join(ROOT, vPath))) { fail(`${vDir}/: no version.yml`); continue; }

      let v;
      try { v = load(vPath)?.beat_version; } catch (e) { fail(`${vPath}: ${e.message}`); continue; }
      if (!v) { fail(`${vPath}: no top-level 'beat_version' key`); continue; }

      for (const f of BV_REQ) if (v[f] === undefined) fail(`${vPath}: missing required '${f}'`);
      if (!['active', 'archived'].includes(v.status)) fail(`${vPath}: status '${v.status}' not in [active, archived]`);
      if (v.beat !== b.id) fail(`${vPath}: declares beat '${v.beat}' but sits under ${b.id}`);
      if (v.notes !== undefined) fail(`${vPath}: Beat Versions carry no notes — attach to the Beat with beat_version`);
      if (v.revisions !== undefined) fail(`${vPath}: inline 'revisions' duplicates ./revisions/`);
      if (bvIds.has(v.id)) fail(`${vPath}: duplicate beat version id '${v.id}'`);
      bvIds.add(v.id);

      const revisions = [];
      for (const rf of ls(`${vDir}/revisions`)) {
        const rPath = `${vDir}/revisions/${rf}`;
        let r;
        try { r = load(rPath)?.revision; } catch (e) { fail(`${rPath}: ${e.message}`); continue; }
        if (!r) { fail(`${rPath}: no top-level 'revision' key`); continue; }

        for (const f of REV_REQ) if (r[f] === undefined) fail(`${rPath}: missing required '${f}'`);
        if (!['active', 'archived'].includes(r.status)) fail(`${rPath}: status '${r.status}' not in [active, archived]`);
        // specs/revision.yml: a Revision belongs to exactly one Beat Version.
        if (r.beat_version !== v.id) fail(`${rPath}: declares beat_version '${r.beat_version}' but sits under ${v.id}`);
        if (revIds.has(r.id)) fail(`${rPath}: duplicate revision id '${r.id}'`);
        revIds.add(r.id);
        revisions.push(r.id);
      }
      versions.push(`${v.id} ${v.status}${revisions.length ? ` [${revisions.join(' ')}]` : ''}`);
    }
    if (versions.length === 0) fail(`${root}/beats/${slug}/: no versions — a Beat with no planned step is not in flight`);

    const notes = [];
    for (const nf of ls(`${root}/beats/${slug}/notes`)) {
      const nPath = `${root}/beats/${slug}/notes/${nf}`;
      let n;
      try { n = load(nPath)?.note; } catch (e) { fail(`${nPath}: ${e.message}`); continue; }
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
    console.log(`    versions: ${versions.join(', ')}`);
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

checkSpecs();
checkRubricFingerprints();
checkToolingVersion();
checkCommitDiscipline();
checkTree('harmonic-method', 'HM-CODA');
checkTree('examples', 'EX-SYS-CODA');
checkVocabulary(['harmonic-method', 'examples']);

console.log(failures === 0 ? '\nconformant' : `\n${failures} failure(s)`);
process.exit(failures === 0 ? 0 : 1);
