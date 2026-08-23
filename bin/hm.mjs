#!/usr/bin/env node
/**
 * The Harmonic Method command line.
 *
 * Two subcommands. Two binary names point here: one matching the package so
 * that running it without installing works, and a short one for anyone who
 * installs it.
 *
 * This command is optional by constraint, not by accident. Reading the specs,
 * applying an instrument, and vendoring any of it install nothing, and that has
 * to stay true — only verification may require a runtime, and only for whoever
 * chooses to verify.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import { parse } from 'yaml';

const HERE = join(dirname(fileURLToPath(import.meta.url)), '..');
const readHere = (p) => readFileSync(join(HERE, p), 'utf8');

/** Both streams, labelled. Only one of them is what conformance is declared against. */
function versions() {
  const spec = parse(readHere('specs/spec-set.yml'))?.spec_version ?? '(unknown)';
  const pkg = JSON.parse(readHere('package.json')).version ?? '(unknown)';
  return { spec, pkg };
}

const USAGE = `hm — verify a tree against the Harmonic Method

  hm validate <path>       check a directory holding a system Coda
  hm conformance <file>    check a conformance declaration
  hm --version             print the spec set and package versions
  hm --help                this

The spec set version is what an implementation pins. The package version is this
command's own, and the two move separately.

The conformance check reads a declaration and reports whether the claim is well
formed — a version named, every divergence pointing at something real, nothing
filed as an extension that is a contradiction under another name. It cannot tell
you whether the implementation behaves as it claims; no file can.

Nothing here is required to use the method: the specs, the instruments, and the
worked example are files, and reading or vendoring them installs nothing.`;

const [cmd, ...rest] = process.argv.slice(2);

if (cmd === '--version' || cmd === '-v') {
  const { spec, pkg } = versions();
  console.log(`spec set ${spec}\npackage  ${pkg}`);
  process.exit(0);
}

if (!cmd || cmd === '--help' || cmd === '-h' || cmd === 'help') {
  console.log(USAGE);
  process.exit(cmd ? 0 : 1);
}

if (cmd === 'conformance') {
  const file = rest[0];
  if (!file) {
    console.log('hm conformance: needs a path to a declaration file\n\n' + USAGE);
    process.exit(1);
  }
  const c = spawnSync(process.execPath, [join(HERE, 'tools/conformance.mjs'), file], { stdio: 'inherit' });
  process.exit(c.status ?? 1);
}

if (cmd !== 'validate') {
  console.log(`hm: unknown command '${cmd}'\n\n${USAGE}`);
  process.exit(1);
}

const target = rest[0];
if (!target) {
  console.log('hm validate: needs a path to a directory holding a system Coda\n\n' + USAGE);
  process.exit(1);
}

// The checker is the single implementation; this dispatches to it rather than
// reimplementing the rules, so the command and the self-check cannot diverge.
const r = spawnSync(process.execPath, [join(HERE, 'tools/validate.mjs'), target], { stdio: 'inherit' });
process.exit(r.status ?? 1);
