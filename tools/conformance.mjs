#!/usr/bin/env node
/**
 * Checks a conformance declaration against the specs this checker ships.
 *
 * What this does NOT do, stated first because the name invites the wrong
 * reading: it does not verify that an implementation behaves as it claims. It
 * reads a declaration and reports whether the claim is well formed and
 * internally consistent — that a version is named, that every divergence points
 * at something real, and that nothing filed as an extension is a contradiction
 * wearing the other label. Whether the implementation then does what it says is
 * a question about the implementation, and no file can answer it.
 *
 * That narrower job is still worth doing. The failure this guards against is a
 * claim vague enough that nobody can be wrong about it.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { parse } from 'yaml';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SEMVER = /^\d+\.\d+\.\d+$/;
const EXTENSION_KINDS = ['entity', 'field', 'child_type', 'enum_value', 'dimension', 'computed'];
const ALTITUDES = ['portfolio', 'system', 'beat'];
const DIVERGENCE_KEYS = ['spec', 'field', 'published', 'actual'];

const specFiles = () => readdirSync(join(ROOT, 'specs'));
const loadSpec = (f) => parse(readFileSync(join(ROOT, 'specs', f), 'utf8'));

/** Entity and concept names the specs declare, plus the altitudes, as mapping targets. */
function primitives() {
  const names = new Set(ALTITUDES);
  for (const f of specFiles()) {
    let d;
    try { d = loadSpec(f); } catch { continue; }
    if (typeof d?.entity === 'string') names.add(d.entity);
    if (typeof d?.concept === 'string') names.add(d.concept);
  }
  return names;
}

/** Every enum the specs declare, keyed `<file-stem>.<field>`, with its additions rule. */
function enums() {
  const found = new Map();
  for (const f of specFiles()) {
    let d;
    try { d = loadSpec(f); } catch { continue; }
    for (const [name, field] of Object.entries(d?.fields ?? {})) {
      if (typeof field?.type === 'string' && field.type.startsWith('enum')) {
        const values = (field.type.match(/\[(.*)\]/)?.[1] ?? '').split(',').map((v) => v.trim()).filter(Boolean);
        found.set(`${f.replace(/\.yml$/, '')}.${name}`, {
          additions: field.additions, children: field.children, values,
        });
      }
    }
  }
  return found;
}

export function checkDeclaration(path) {
  const out = [];
  const fail = (m) => out.push(m);

  let doc;
  try { doc = parse(readFileSync(path, 'utf8')); } catch (e) { return [`${e.message}`]; }

  const d = doc?.declaration;
  if (d === undefined || d === null || typeof d !== 'object' || Array.isArray(d)) {
    return ["no 'declaration' mapping at the root"];
  }

  const setVersion = parse(readFileSync(join(ROOT, 'specs/spec-set.yml'), 'utf8'))?.spec_version;
  if (d.spec_version === undefined) {
    fail("no 'spec_version' — a claim with no version attached is not a claim");
  } else if (!SEMVER.test(String(d.spec_version))) {
    fail(`spec_version '${d.spec_version}' is not semver`);
  } else if (String(d.spec_version) !== String(setVersion)) {
    fail(`declared against spec set ${d.spec_version}; this checker ships ${setVersion}, so it cannot judge that claim`);
  }

  if (typeof d.implementation !== 'string' || d.implementation.trim() === '') {
    fail("no 'implementation' — a declaration says who is claiming");
  }

  if (!Array.isArray(d.divergences)) {
    fail("no 'divergences' list — an empty list is the strong claim, and omitting it is not the same as making it");
  } else {
    const files = new Set(specFiles());
    d.divergences.forEach((v, i) => {
      const at = `divergences[${i}]`;
      for (const k of DIVERGENCE_KEYS) {
        if (v?.[k] === undefined) fail(`${at}: missing '${k}'`);
      }
      if (v?.spec !== undefined && !files.has(String(v.spec))) {
        fail(`${at}: spec '${v.spec}' is not a file in specs/`);
      }
    });
  }

  // The pointed rule. An added value on a closed enum is the move a declaration
  // would most plausibly be used to disguise, so it is named as such rather than
  // reported as an unknown kind.
  const known = enums();
  (Array.isArray(d.extensions) ? d.extensions : []).forEach((e, i) => {
    const at = `extensions[${i}]`;
    if (!EXTENSION_KINDS.includes(e?.kind)) {
      fail(`${at}: kind '${e?.kind}' is not one of ${EXTENSION_KINDS.join(', ')}`);
      return;
    }
    if (e.kind === 'child_type') {
      if (e?.enum === undefined || e?.parent === undefined || e?.value === undefined) {
        fail(`${at}: a child type names its 'enum', its 'parent', and its 'value'`);
        return;
      }
      const spec = known.get(String(e.enum));
      if (spec === undefined) {
        fail(`${at}: enum '${e.enum}' is not declared in specs/`);
      } else if (spec.children !== 'allowed') {
        fail(`${at}: '${e.enum}' declares children none, so '${e.value}' cannot narrow it — declare it under divergences`);
      } else if (!spec.values.includes(String(e.parent))) {
        fail(`${at}: '${e.parent}' is not a value of '${e.enum}' — a child narrows a published value`);
      } else if (spec.values.includes(String(e.value))) {
        fail(`${at}: '${e.value}' is already a published value of '${e.enum}' — a child is a new name under one, not a restatement of another`);
      }
      return;
    }
    if (e.kind !== 'enum_value') {
      if (e?.name === undefined) fail(`${at}: missing 'name'`);
      return;
    }
    if (e?.enum === undefined || e?.value === undefined) {
      fail(`${at}: an added enum value names its 'enum' and its 'value'`);
      return;
    }
    const spec = known.get(String(e.enum));
    if (spec === undefined) {
      fail(`${at}: enum '${e.enum}' is not declared in specs/`);
    } else if (spec.additions !== 'allowed') {
      const hint = spec.children === 'allowed'
        ? " — it allows children, so narrow a published value instead, or declare this under divergences"
        : ' — declare it under divergences';
      fail(`${at}: '${e.enum}' declares additions none, so adding '${e.value}' is a contradiction, not an extension${hint}`);
    } else if (spec.values.includes(String(e.value))) {
      fail(`${at}: '${e.value}' is already a published value of '${e.enum}' — an addition widens the set, it does not restate it`);
    }
  });

  const prims = primitives();
  (Array.isArray(d.mappings) ? d.mappings : []).forEach((m, i) => {
    const at = `mappings[${i}]`;
    if (m?.theirs === undefined || m?.ours === undefined) {
      fail(`${at}: a mapping names 'theirs' and 'ours'`);
    } else if (!prims.has(String(m.ours))) {
      fail(`${at}: '${m.ours}' is not a primitive these specs declare`);
    }
  });

  return out;
}

const invokedDirectly = process.argv[1] && process.argv[1].endsWith('conformance.mjs');
if (invokedDirectly) {
  const target = process.argv[2];
  if (!target) {
    console.log('conformance: needs a path to a declaration file');
    process.exit(1);
  }
  if (!existsSync(target)) {
    console.log(`conformance: ${target} not found`);
    process.exit(1);
  }
  const failures = checkDeclaration(target);
  console.log('== declaration ==');
  for (const f of failures) console.log(`  FAIL ${f}`);
  if (failures.length === 0) {
    const d = parse(readFileSync(target, 'utf8')).declaration;
    const n = d.divergences.length;
    console.log(`  ${d.implementation}, spec set ${d.spec_version}, ${n} divergence(s) declared`);
    console.log('\nwell-formed');
    console.log('This checks the claim, not the implementation. Whether the behaviour matches is not knowable from here.');
  } else {
    console.log(`\n${failures.length} failure(s)`);
  }
  process.exit(failures.length === 0 ? 0 : 1);
}
