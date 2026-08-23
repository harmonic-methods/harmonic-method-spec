# Working in this repository

This repository publishes the specification of a method and the agent skills that
apply it. What lands here
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
  delivered or withdrawn; the knowledge it produced outlives either.
- A system's entities live in `harmonic-method/`, visible rather than hidden. Adopters
  use the same name in their own repositories.
- There is no `checks/` directory, by design. This repository assesses without
  recording.

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

The spec set stays in the 1.x line while the method is stabilizing, so a change
breaking a permitted value takes a minor step. What would cost a major is a
consumer who can be broken, not a tag — a tag may exist only to hold a package
name. Ask what depends on a version before deciding what a change to it costs.

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
The reference implementation conforms to this repository at a pinned tag; it
does not define what it conforms to, and neither does any other implementation.

An implementation stays canonical for what a published standard has no business
fixing: its own type declarations (which may derive compile-time exhaustiveness
checks), its gate thresholds, and everything it computes — scores, drift,
similarity, coherence.

So editing a dimension, anchor, red flag, field, or enum here **changes the
standard**. It is a decision Note plus a version bump, never a tidy-up, and
every implementation has to follow it.

Distinguish two cases when comparing against an implementation:

- An **extension** is allowed. An implementation will define entities this
  repository does not — release groupings, commercial containers, work items,
  check records — and may score dimensions the method omits. None of that is a
  conformance problem.
- A **contradiction** is a conformance failure, and it fails on the
  implementation's side: a required field it lacks, an enum value it renamed, a
  dimension whose anchor text differs from the one published here.

A digest over each instrument's normative sections — the scoring scale, the
dimension table, the checks, and the check rules — makes an edit to any of them
fail the check. Adding an instrument whose normative section has a new heading
means adding that heading to `NORMATIVE_SECTIONS` in
`tools/rubric-fingerprint.mjs`, or the instrument ships unguarded. When it fails, do not regenerate first. Confirm the edit was intended,
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

    Beat-Version: HM-BV-002.2

Exactly one `Beat-Version:` trailer per **pull request**, in its description. A
Revision belongs to exactly one Beat Version, and `specs/revision.yml` puts a
tracked change at the request rather than at each commit inside it — so a request
*executing* two steps is two requests. Commits may carry the trailer; nothing
requires it. The check runs where a request exists, which is why a local run
reports that it cannot see one.

Executing, not touching. The check reads the description and never the diff, so a
request may edit any number of Beat Version files — closing the previous step in
the next substantive step's scope, which [HM-N-055] asks for, edits two of them —
and the trailer names the one step the request carries out. Nothing bounds the
other direction either: a step is delivered by as many Revisions as the work
takes, and several requests naming the same step is the ordinary case rather than
a split that was missed. See [HM-N-097].

When a Beat Version's work has merged, set its status to `delivered`. If it left
flight without shipping — superseded, descoped, dropped — set `withdrawn` and say
why in a decision Note. Nothing computes either for you here.

This always lags by one: the commit that marks a step delivered belongs to a step
of its own, which stays `active` until it merges in turn. Keep the lag at one by
putting "mark the previous step delivered" in the **next substantive step's
scope**. Do not create a step whose only purpose is bookkeeping — that is the
regress, and skipping the habit for two cycles is how a backlog starts.

Keep derivable facts out of prose the checker cannot reach — a pull request body,
a commit message, an issue. No commit counts, no file counts, no versions: a
command answers each of them, and a stale number there is caught by a reader or
not at all. Inside the tree a restatement is fine where a check enforces
agreement; outside it, there is no check. Prose whose purpose is to state the
fact — a changelog entry naming a version — is the authority, not a copy.

When editing text with a script, assert that every replacement matched. A
replacement that finds nothing changes nothing and reports nothing. For a remote
surface, verify by reading it back rather than by trusting what was sent.

Read a command's exit code, not its piped output. A pipeline reports its last
stage, so `npm run validate | tail` returns zero on a failing run and `set -e`
will not fire.

The newest changelog entry either says `(unreleased)` or has a tag. Removing the
marker is the act of claiming release, and `npm run validate` will then demand
the tag — so **tag first, then remove the marker**. A branch that removes it
before the tag exists cannot pass its own check, and the tag should point at
merged work rather than at a branch.

Before making this repository public, sweep what visibility exposes and not only
what git tracks: pull request descriptions and comments, commit messages, issue
text, closed pull request diffs, branch names, and the repository description.

A request's title and description are scanned for identifier shapes from systems
these specs do not define. It matches shapes and never names — a list of names in
a public check would be the leak — so a client's name is never caught, and neither
is a capability identifier whose shape collides with ours. Describe what happened
instead of citing the record it happened in.

`specs/revision.yml` still defines the entity, and `examples/` keeps one, because
a Revision is the only record that exists when the change artifact is a procedure
document rather than a commit.

## Where things are explained

- `README.md` — for humans: what the method is and how to apply it.
- `llms.txt` — for agents *consuming* the specification: what it contains.
- This file — for agents *contributing* to it: how to work in it.

Keep them non-overlapping. Three documents describing the same thing is exactly
the drift this repository exists to prevent.
