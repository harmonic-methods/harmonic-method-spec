# Beads interoperability example

This system shows how work items from a task tracker — specifically Beads, by
Steve Yegge — can be linked by stable IDs to Harmonic Beat Versions and Revisions
without false equivalence between the two systems' concepts.

## What Beads is

Beads is a git-backed, local-first issue tracker designed for AI agents (released
October 2025). It stores work items as JSON Lines in `.beads/issues.jsonl`, models
task dependencies as a directed acyclic graph (DAG), and provides `bd ready --json`
so an agent can query its next unblocked task. A bead is opened, executed, and
closed within an agent session or across a few.

## The critical distinction: bead ≠ Beat

A **Beads bead** is a session-scoped work item tracking a concrete task. It answers:
*what should the agent do next?*

A **Harmonic Beat** is a durable capability that persists and evolves through many
work increments, potentially over years. It answers: *what value does this system
deliver?*

Mapping bead → Beat would conflate a task with a capability — making a Beat appear
complete when a bead is done rather than when the durable capability the Beat names
is delivered. The right mapping is **bead → Revision**: both are tracked changes.

The decision note `notes/bead-is-not-a-beat.yml` (EX-N-010) states this once, with
rationale, so agents applying this pattern do not arrive at the wrong mapping
independently.

## The cross-reference pattern

Both sides carry a stable reference:

- The **bead's** title or description includes the Beat Version ID it executes:
  `"EX-BV-003.1: define and adopt cross-reference convention"`
- The **Revision's** `evidence` field names the bead by its Beads ID:
  `"Beads bead#42 — EX-BV-003.1: ..."`

The background note `notes/stable-id-cross-reference.yml` (EX-N-011) documents
this pattern and its limitations. The working Revision is at
`beats/work-item-linkage/versions/v1-cross-reference-convention/revisions/adopt-cross-reference-pattern.yml`.

The third-party reading of Beads against the Harmonic Method specs is at
`examples/declaration-beads-interop.yml`.

## Limitations

**Work-item durability.** Beads stores state in `.beads/issues.jsonl`. If that
directory is not committed and pushed to the shared repository, the bead reference
in a Revision's `evidence` field cannot be resolved by a future reader.

**No schema enforcement.** The validator checks that Revision fields are present
and correctly typed; it does not follow the string in `evidence` and verify that a
bead exists. The cross-reference is a convention, not a constraint.

**Advisory reference only.** A bead's title naming a Beat Version ID is a
convenience for the agent that opens it. The Beat Version's scope and status in
the repository tree are authoritative; the bead's title is not.

**Harmonica sync is future.** GitHub is the authority for all Harmonic artifacts
here. Read-only sync from this repository to a hosted Harmonica instance is being
developed separately; nothing in this example depends on it, and no Harmonica
records need to exist for the example to validate.

**One-to-many.** A single Beat Version may be executed by many beads across many
sessions. The example shows one Revision referencing one bead; the pattern
generalizes to multiple Revisions each naming a different bead.

## Clean-checkout commands

```bash
# Clone the repository
git clone https://github.com/harmonic-methods/harmonic-method-spec.git
cd harmonic-method-spec

# Install the checker
npm install

# Validate the full tree (examples/ included)
npm run validate

# Validate only the examples tree
node bin/hm.mjs validate examples

# Validate only this system's tree
node bin/hm.mjs validate examples/systems/agent-change-provenance

# Check the Beads interoperability declaration in isolation
node tools/conformance.mjs examples/declaration-beads-interop.yml
```

The validator prints `conformant` on success. CI runs `npm run validate` on every
push and pull request.
