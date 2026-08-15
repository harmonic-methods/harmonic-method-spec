# Working in this repository

This kit publishes a method and the agent skills that apply it. What lands here
gets read by other agents as instruction, so precision matters more than speed.

## Before proposing any change

    npm install && npm run validate

It must print `conformant`. CI runs the same check on every push and pull
request.

## Layout

- An entity is a directory; its children are subdirectories. No file carries an
  inline `notes:`, `versions:`, or `revisions:` list — the directory *is* the
  list, so there is nothing to keep in sync.
- Notes attach to a Beat, never to a Beat Version. Use the optional
  `beat_version` field to record which step a Note came from. A version gets
  archived; the knowledge it produced does not.
- A system's entities live in `harmonic/`, visible rather than hidden. Adopters
  use the same name in their own repositories.
- There is no `checks/` directory, by design. The kit assesses without recording.

## Vocabulary

The method's word for the level above a Beat is **system**. "Project", "Drop",
and "Movement" belong to the reference implementation and are not defined here —
the validator rejects them in entity files. Prefer block form in YAML: inside a
flow mapping, `type: enum [a, b]` terminates the value early.

## The rubrics are mirrored, not owned

`skills/beat-quality-check` and `skills/plan-quality-check` mirror canonical
rubric definitions in the Harmonica reference implementation. They are a
deliberate translation — different vocabulary, medium-agnostic — not a copy.

Do not edit a dimension, red flag, or anchor here without checking it against
canonical — by opening canonical, every time. **Nothing catches this drift on
either side.** The reference implementation has no fingerprint test over its
dimension tables; its rubric tests assert a dimension count and a handful of
named red flags, and no test reads the anchors at all. An earlier version of
this file promised a canonical-side guard that does not exist. Re-checking by
hand is the whole mechanism.

`skills/plan-quality-check` also runs a scoring method canonical has not
shipped. Parity there is by decision record, not by code — see
`harmonic/beats/rubric-parity/notes/criteria-scoring-is-kit-originated.yml`.

Do not copy the skills into `.claude/skills/` or any other agent's directory
either. That is a second copy to keep in sync, which is the failure this
repository already had once. Point your agent at the file in `skills/`.

## Recording work

Substantive work gets a Beat Version under the Beat it serves; decisions get a
Note with its rationale. The reasoning behind past choices lives in
`harmonic/beats/*/notes/` — read it before reversing one.

**Do not write Revision files here.** In a git-hosted system the commit is the
Revision. Bind the change to its plan by naming the Beat Version in the commit
message instead:

    Add fingerprint guard over canonical rubric

    Beat-Version: K-BV-002.2

`specs/revision.yml` still defines the entity, and `examples/` keeps one, because
a Revision is the only record that exists when the change artifact is a procedure
document rather than a commit.

## Where things are explained

- `README.md` — for humans: what the method is and how to apply it.
- `llms.txt` — for agents *consuming* the kit: what it contains.
- This file — for agents *contributing* to the kit: how to work in it.

Keep them non-overlapping. Three documents describing the same thing is exactly
the drift this repository exists to prevent.
