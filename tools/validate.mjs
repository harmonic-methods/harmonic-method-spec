/**
 * Conformance check for this repository's own artifacts.
 *
 * Validates every entity file in a system tree against the specs in `specs/`:
 * required fields, lifecycle enums, decision rationale, the agreement between a
 * child's back-reference and the directory it sits in, and reference
 * resolution. Also rejects vocabulary these specs do not define.
 *
 * Encoding note: the specs define no layout, so the tree rules below — an entity
 * is a directory, its children are subdirectories, no inline child list — read
 * one concrete encoding this repository uses and recommends. They are not
 * conformance requirements; see `encoding` on the surface in
 * specs/conformance.yml. A tree encoded some other way is not non-conformant, it
 * is simply not what this checker reads.
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
import { spawnSync, execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parse } from 'yaml';

import { checkBinding, checkPublicSurface } from './commit-discipline.mjs';
import { checkDeclaration } from './conformance.mjs';
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
/**
 * The Note types, read from the spec rather than restated beside it.
 *
 * The failure message this feeds says a type "is not in specs/note.yml", so the
 * list had better come from there. It was a hand-written copy until a rename
 * moved the value in both places, which is the moment a restated fact goes
 * wrong — one of the two edits is always the one that gets forgotten.
 *
 * Read on demand and never at module load, and returns null rather than throwing
 * when the spec will not parse. A checker that dies on a malformed spec file
 * gives an adopter a stack trace where checkSpecs would have given them the line
 * and the reason, so the diagnostic is left to the check that owns it and the
 * type comparison simply stands down.
 */
let noteTypesCache;
function noteTypes() {
  if (noteTypesCache !== undefined) return noteTypesCache;
  let values = null;
  try {
    const t = load('specs/note.yml')?.fields?.type?.type ?? '';
    const parsed = (t.match(/\[(.*)\]/)?.[1] ?? '').split(',').map((v) => v.trim()).filter(Boolean);
    if (parsed.length > 0) values = parsed;
  } catch { /* checkSpecs reports the parse failure with the line and the reason */ }
  noteTypesCache = values;
  return values;
}

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
 * A changelog entry claiming a release is a claim about the world, and the tag is
 * the only part of it a tree can check. Either the newest entry says it is
 * unreleased, or a tag exists for it.
 *
 * The marker is the escape hatch by design: an entry still being drafted on a
 * branch has no tag yet and must not fail. Removing the marker is the act of
 * claiming release, and that is when the tag becomes owed.
 */
function checkReleaseInvariant() {
  console.log('== release invariant ==');
  const heading = read('CHANGELOG.md').split('\n').find((l) => /^## v\d+\.\d+\.\d+/.test(l));
  if (!heading) return fail('CHANGELOG.md: no "## vX.Y.Z" heading found');
  const version = heading.match(/^## v(\d+\.\d+\.\d+)/)[1];

  if (/\(unreleased\)/i.test(heading)) {
    console.log(`  v${version} is marked unreleased — no tag owed`);
    return;
  }

  let tags;
  try {
    tags = execFileSync('git', ['tag', '--list', `v${version}`], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    // Same reasoning as the commit check: a shallow clone is not a defect, but a
    // silent skip where this is enforced would repeat the failure it exists for.
    if (process.env.HM_REQUIRE_BASE) return fail(`cannot read tags to confirm v${version}, and HM_REQUIRE_BASE is set — fetch tags`);
    return console.log('  skipped — tags unavailable');
  }
  if (tags !== `v${version}`) {
    fail(`CHANGELOG.md claims v${version} released, but no tag v${version} exists — tag it, or mark the entry (unreleased)`);
  } else {
    console.log(`  v${version} released and tagged`);
  }
}

/**
 * A change is bound to the step it executes. The Revision spec puts a tracked
 * change in a software medium at a request with a linked change, so the binding
 * belongs on the request rather than on each commit inside it.
 */
function checkBindingDiscipline() {
  console.log('== binding ==');
  let r;
  try { r = checkBinding(); } catch (e) { return fail(`binding: ${e.message}`); }
  if (r.skipped) return console.log(`  skipped — ${r.skipped}`);
  for (const p of r.problems ?? []) fail(p);
  if (r.bound) console.log(`  ${r.where} binds ${r.bound}`);
}

/**
 * A request description is the one surface here no other check reaches, and the
 * only real leak this repository has had went through it.
 */
function checkPublicSurfaceHygiene() {
  console.log('== public surface ==');
  let r;
  try { r = checkPublicSurface(); } catch (e) { return fail(`public surface: ${e.message}`); }
  if (r.skipped) return console.log(`  skipped — ${r.skipped}`);
  for (const p of r.problems) fail(p);
  if (r.problems.length === 0) console.log(`  ${r.scanned.join(' and ')} carry no foreign identifiers`);
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
      const types = noteTypes();
      if (types && !types.includes(n.type)) fail(`${nPath}: note type '${n.type}' is not in specs/note.yml`);
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
 * Every enum on the normative surface declares whether an implementation may add
 * to it.
 *
 * The conformance statement classifies an added value by that declaration, so an
 * enum that omits it leaves the classification unanswerable — and the question is
 * easy to miss when adding a field, because nothing about writing an enum prompts
 * it. Closed is the safe default, so this demands the declaration rather than
 * inferring one: the decision belongs where the enum is defined, made by whoever
 * knows whether the set is meant to be complete.
 *
 * Both halves are demanded, because they are different questions. Whether the set
 * may be widened and whether a published value may be narrowed have different
 * answers on the same enum: Note types are closed to siblings and open to
 * children, and every status enum is closed to both.
 */
function checkEnumDeclarations() {
  console.log('== enum declarations ==');
  const before = failures;
  let n = 0;
  for (const f of ls('specs')) {
    let doc;
    try { doc = load(`specs/${f}`); } catch { continue; }
    for (const [name, field] of Object.entries(doc?.fields ?? {})) {
      if (typeof field?.type !== 'string' || !field.type.startsWith('enum')) continue;
      n++;
      for (const key of ['additions', 'children']) {
        const d = field[key];
        if (d === undefined) {
          fail(`specs/${f}: field '${name}' is an enum with no '${key}' declaration — say 'allowed' or 'none'`);
        } else if (d !== 'allowed' && d !== 'none') {
          fail(`specs/${f}: field '${name}' declares ${key} '${d}' — expected 'allowed' or 'none'`);
        }
      }
    }
  }
  if (failures === before) console.log(`  ${n} enums, each declaring whether additions and children are allowed`);
}

/**
 * Every declaration shipped here stays valid against the rules it illustrates.
 * One that no longer passes teaches the wrong shape to everyone who starts from
 * it.
 *
 * This read one path by name until a second declaration arrived, and the second
 * one would have shipped unchecked — the failure this repository names in
 * HM-B-007, an artifact published beside a check that does not reach it. The
 * directory is the list here for the same reason it is everywhere else.
 *
 * Note what is NOT asserted: how many declarations there are, or what any of
 * them claims. A reading of somebody else's system and the fictional worked
 * example are both declarations, and the rules that judge a claim's form do not
 * care which is which.
 */
function checkExampleDeclarations() {
  console.log('== example declarations ==');
  const files = ls('examples').filter((f) => /^declaration.*\.yml$/.test(f)).sort();
  if (files.length === 0) {
    return fail('examples/: no declaration found — the shape an implementation copies has to ship');
  }
  for (const f of files) {
    const p = `examples/${f}`;
    const problems = checkDeclaration(join(ROOT, p));
    for (const m of problems) fail(`${p}: ${m}`);
    if (problems.length === 0) console.log(`  ${f}  well-formed against the declaration rules`);
  }
}

/**
 * The published command parses and dispatches.
 *
 * Nothing checked this, and it broke exactly once during the work that added the
 * second subcommand: a stray backtick closed a template literal, the entry point
 * stopped parsing, and the self-check still printed conformant — because every
 * rule here reads files the command never loads. The command is the only part of
 * this repository an adopter runs, so it is the last place that gap should exist.
 *
 * Deliberately shallow. It asserts the module loads and that the two streams are
 * reported, not what any subcommand does — those have their own checks, and a
 * smoke test that grows into a second test suite stops being run.
 */
function checkCommandRuns() {
  console.log('== command ==');
  const bin = join(ROOT, 'bin/hm.mjs');
  if (!existsSync(bin)) return fail('bin/hm.mjs: not found');
  const parsed = spawnSync(process.execPath, ['--check', bin], { encoding: 'utf8' });
  if (parsed.status !== 0) return fail(`bin/hm.mjs does not parse: ${(parsed.stderr ?? '').split('\n')[0]}`);
  const v = spawnSync(process.execPath, [bin, '--version'], { encoding: 'utf8' });
  if (v.status !== 0) return fail(`bin/hm.mjs --version exited ${v.status}`);
  if (!/spec set \d+\.\d+\.\d+/.test(v.stdout) || !/package\s+\d+\.\d+\.\d+/.test(v.stdout)) {
    return fail(`bin/hm.mjs --version did not report both streams: ${JSON.stringify(v.stdout)}`);
  }
  console.log('  parses, and --version reports both streams');
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
  checkEnumDeclarations();
  checkRetiredAltitudes();
  checkRubricFingerprints();
  checkPublishedCounts();
  checkToolingVersion();
  checkCommandRuns();
  checkReleaseInvariant();
  checkBindingDiscipline();
  checkPublicSurfaceHygiene();
  checkTree('harmonic-method');
  checkTree('examples');
  checkExampleDeclarations();
  checkVocabulary(['harmonic-method', 'examples']);
}

console.log(failures === 0 ? '\nconformant' : `\n${failures} failure(s)`);
process.exit(failures === 0 ? 0 : 1);
