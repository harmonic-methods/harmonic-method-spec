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
- A system's entities live in `harmonic-method/`, visible rather than hidden. Adopters
  use the same name in their own repositories.
- There is no `checks/` directory, by design. The kit assesses without recording.

## Versions

`specs/spec-set.yml` holds the one version of the normative surface. Every spec
file repeats it as a parsed `spec_version` field and `npm run validate` fails on
disagreement, so change it in the manifest and the specs together. An
implementation pins that number.

`package.json` versions the checker, on its own cadence — a checker fix must
never bump what an implementation pins. The validator asserts it matches the
newest `## vX.Y.Z` changelog heading.

Do not write a spec version anywhere else. Not into an instance file's header
comment, not into a skill body, not into prose. Fifty-five files used to, and
every one went stale on the same day.

## Vocabulary

`specs/function.yml` declares `concept:` rather than `entity:`. Nothing
instantiates a Function and no entity carries one as a field, so the checker
parses it and stops there — there is no tree to validate. Keep that distinction
if another non-instantiable concept is ever added.

The method's word for the level above a Beat is **system**. "Project", "Drop",
and "Movement" belong to the reference implementation and are not defined here —
the validator rejects them in entity files. Prefer block form in YAML: inside a
flow mapping, `type: enum [a, b]` terminates the value early.

## This repository is canonical

This repository is the source of truth for two things: the **entity
primitives** — the fields, required-ness, lifecycle enums, and rules in
`specs/` — and the **rubric dimensions, red flags, and anchors** in `skills/`.
Harmonica is the reference implementation. It conforms to this repository at a
pinned tag; it does not define what it conforms to.

Harmonica stays canonical for what a published standard has no business
fixing: its own TypeScript literal unions (which derive compile-time
exhaustiveness checks), its gate thresholds, and everything it computes —
scores, drift, similarity, coherence.

So editing a dimension, anchor, red flag, field, or enum here **changes the
standard**. It is a decision Note plus a version bump, never a tidy-up, and
every implementation has to follow it.

Distinguish two cases when comparing against an implementation:

- An **extension** is allowed. Harmonica defines entities this repository does
  not — Teamspace, Movement, Drop, Deliverable, Work Item, Track, Check,
  Notebook — and may score dimensions the method omits. None of that is a
  conformance problem.
- A **contradiction** is a conformance failure, and it fails on the
  implementation's side: a required field it lacks, an enum value it renamed, a
  dimension whose anchor text differs from the one published here.

A digest over each rubric's normative sections — the scoring scale, the
dimension table, and the check rules — makes an edit to any of them fail the
check. When it fails, do not regenerate first. Confirm the edit was intended,
record the decision, decide whether the spec set version moves, and only then:

    npm run fingerprint

The digest that preceded this one was described as shipped in a Beat Version
summary and had never been built, and real drift went undetected behind the
claim. Verify a new rule by making it fail before trusting it.

Do not copy the skills into `.claude/skills/` or any other agent's directory
either. That is a second copy to keep in sync, which is the failure this
repository already had once. Point your agent at the file in `skills/`.

## Recording work

Substantive work gets a Beat Version under the Beat it serves; decisions get a
Note with its rationale. The reasoning behind past choices lives in
`harmonic-method/beats/*/notes/` — read it before reversing one.

**Do not write Revision files here.** In a git-hosted system the commit is the
Revision. Bind the change to its plan by naming the Beat Version in the commit
message instead:

    Add fingerprint guard over canonical rubric

    Beat-Version: K-BV-002.2

Exactly one `Beat-Version:` trailer per commit. A Revision belongs to exactly
one Beat Version, and the commit is the Revision — so a commit carrying two
trailers is a non-conformant Revision, and a change spanning two Beat Versions
is two commits. When a Beat Version's work has merged, set its status to
`archived`; nothing computes that for you here.

`specs/revision.yml` still defines the entity, and `examples/` keeps one, because
a Revision is the only record that exists when the change artifact is a procedure
document rather than a commit.

## Where things are explained

- `README.md` — for humans: what the method is and how to apply it.
- `llms.txt` — for agents *consuming* the kit: what it contains.
- This file — for agents *contributing* to the kit: how to work in it.

Keep them non-overlapping. Three documents describing the same thing is exactly
the drift this repository exists to prevent.
