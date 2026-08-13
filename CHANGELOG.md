# Changelog

## v1.0.0 — 2026-08-11

Dimension definitions reconciled against the reference implementation's canonical
`beat_quality` and `plan_quality` rubric prompts. All specs promoted from
`0.1.0-draft` to `1.0.0`.

- **beat-quality-check**: added the missing seventh dimension, **Business
  Outcome**. The rubric scored six dimensions; the canonical rubric has seven.
- **beat-quality-check**: replaced the paraphrased 1/5 anchors with the canonical
  per-dimension description + red flag and the canonical shared 1-5 scale.
  Harmonious in particular was inverted — the kit failed a Beat for conflicting
  or overlapping with siblings; canonical fails it for being an isolated silo.
- **beat-quality-check**: added the canonical check rules the kit omitted —
  descriptions-describe-the-entity-not-its-relationships, the "no strategy →
  score Strategically Aligned 3" rule, and the Beat Version vs Revision
  terminology requirement.
- **plan-quality-check**: replaced the paraphrased anchors with the canonical
  verbatim 1-5 anchors, descriptions, and red flags for all six dimensions.
  Assignable had lost its sizing basis entirely (one person or pair, 1-2 weeks).
- **plan-quality-check**: added the canonical inputs contract (description and
  Scope are the canonical source of what gets done), the deprecated
  `assumption` Note-type rule, and the baseline Beat Version rule.
- **Threshold**: stated as `>= 4` (the reference implementation's
  `BEAT_QUALITY_MIN_SCORE` / `PLAN_QUALITY_MIN_SCORE`), described as an
  implementation choice rather than "configurable".
- **specs/beat.yml**: `quality.dimensions` extended to seven.
- **specs/revision.yml**: fixed a YAML syntax error. `status: {type: enum
  [active, archived], required: true}` does not parse — inside a flow mapping
  `[` and `,` are structural, so the value terminates early. Converted to the
  block form the other specs use. This was the only spec file in the repo that
  failed to parse, which made it the one file a machine-readable spec set could
  least afford to break.
- **harmonic/**: added the kit's own system — the Beats this repository
  delivers, their planned steps, and the Notes recording why each choice was
  made, all laddering to a root system Coda. Each Beat owns a directory whose
  `versions/` and `notes/` subdirectories are those lists, so no inline field
  duplicates them. Not `project/`: that is the reference implementation's word,
  while `specs/coda.yml` attaches Codas to an organization, a system, or a Beat.
  Not `system/` either, which read like a missing entity spec beside `specs/`,
  and not a hidden `.harmonic/` — lineage that `rg` skips by default is lineage
  nobody finds. Adopters use `harmonic/` in their own repositories too.
- **specs/note.yml**: Notes no longer attach to a Beat Version. `attached_to`
  narrows to an Org, system, or Beat, and a new optional `beat_version` field
  records which step a Note arose from. This resolves a contradiction — the Note
  spec claimed Beat Versions as an attachment point while `beat-version.yml`
  defined no `notes` field — in the direction the method already leans: a
  version gets archived, the knowledge it produced does not.
- **Scoped and renamed to Harmonic Composition.** The kit ships one member of
  the Harmonic Methods family — the founding framework, covering a single system
  — not the family itself. Harmonic Orchestration and Harmonic Portfolio
  Management are named as out of scope rather than implied to be included.
- **Removed `specs/downbeat.yml`.** Downbeat appears nowhere in the Harmonic
  Composition documentation, so shipping it here asserted a scope the framework
  does not claim. Composition's primitives are Coda, Beat, Beat Version,
  Revision, and Note. If Downbeat belongs to Orchestration or Portfolio
  Management, it belongs in that framework's kit.
- **Revisions removed from `harmonic/`.** In a git-hosted system the commit is
  the Revision: of its three jobs, pointing at the artifact is circular, holding
  the reasoning is what a commit message does, and only binding the change to a
  Beat Version was a real gap — now closed by naming the Beat Version in the
  commit message. `specs/revision.yml` stays, since Revision is a Composition
  primitive, and `examples/` keeps one, because a Revision is the only record
  that exists when the artifact is a procedure document rather than a commit.
- **README.md**: points to harmonicmethods.com for full documentation.
- **README.md**: added a three-step Getting started section — score something
  with nothing installed, place a rubric in whichever agent you already use, lay
  out your own system from the worked example — ahead of the entity model, since
  a newcomer wants to do something before learning vocabulary. The scoring
  invocation moved there rather than being repeated in the rubrics section.
- **CI**: `.github/workflows/validate.yml` runs the conformance check on every
  push and pull request. Without it the checker is opt-in, and an unenforced
  check becomes an unrun one.
- **AGENTS.md / CLAUDE.md**: working instructions for agents contributing to the
  repository — validate before proposing, the layout and vocabulary rules, and
  the warning that the rubrics are mirrored rather than owned. AGENTS.md is
  vendor-neutral and CLAUDE.md only points at it. The three explanatory files
  are split by audience — README for humans, llms.txt for agents consuming the
  kit, AGENTS.md for agents changing it — so they do not become three copies.
- **LICENSE / LICENSE-CONTENT**: the repository now carries the licenses
  TRADEMARKS.md already referred to — CC-BY-4.0 for the method (specs, skills,
  examples, the system, and the documentation) and Apache-2.0 for `tools/`.
  Until now the content was, by default, all rights reserved, which contradicted
  the stated invitation to practice and extend the method freely.
- **tools/validate.mjs**: a conformance check over every entity file in both
  `system/` and `examples/` — required fields, lifecycle enums, decision
  rationale, each child's back-reference matching its directory, reference
  resolution, and vocabulary the kit does not define. Adds a private
  `package.json` with one dev dependency and a `.gitignore`; consumers still
  install nothing. It does not check the rubric prose in `skills/`.
- **README.md**: replaced the one-line placeholder with the repository's front
  door — orientation, the entity model, a spec table, both rubrics and their
  dimensions, a copyable scoring invocation, the system layout rule, and an
  explicit statement of what the kit does not do. This closes K-BV-004.1, whose
  scope it was written against.
- **Beat Versions are directories too**, each holding `version.yml` and an
  optional `revisions/`. `revisions: list<revision>` was already a field of
  beat_version and `specs/revision.yml` already existed, so Revisions were a
  specced child entity with nowhere to live — the same gap Notes had. The
  containment rule now holds at every level rather than breaking one step down.
  Deliberately excluded: a `checks/` directory. No check entity is specified,
  two recorded constraints say the kit assesses without recording, and a stored
  score cannot signal that it predates the text it judged.
- **examples/**: restructured to mirror `system/` exactly, so the worked example
  is what a reader would copy. Fixed two defects in it along the way — its Notes
  were missing the required `id`, and its scope cited "Movement data", an entity
  of the reference implementation that no spec here defines.
- **specs/beat-version.yml**: added a required `summary` field. The plan rubric
  scores the Beat Version's prose, but the entity defined only `title` and
  `scope` — so the rubric was citing a `description` field the spec never had.
  Scoped, Testable, and Risk-aware now cite `summary` and `scope`.

Adapted rather than copied, where the canonical text was stale or referenced
things this kit does not define:

- **plan-quality-check**: the canonical anchors call the scored object a
  "Revision" throughout, left over from when plan_quality graded Revisions. The
  kit scores a Beat Version — and `specs/revision.yml` defines a Revision as a
  tracked change *executing* a Beat Version — so the anchors now say "Beat
  Version." Genuine references to child Revisions are unchanged.
- **plan-quality-check**: canonical's baseline rule exempts "Scoped and
  Incremental"; there is no Incremental dimension in the rubric. Reduced to
  Scoped.
- **Both skills**: "the Drop it ships in" became "the release grouping it ships
  in" — the kit defines no Drop entity. The rule itself is unchanged.
- **beat-quality-check**: Harmonious's red flag said "no relationship to the
  rest of the project"; the method's word for that level is system.
- **beat-quality-check**: Strategically Aligned pointed at `project.strategy`, a
  field of the reference implementation rather than of this kit. Restated
  against the parent Coda, with the implementation's field named as an aside.
- **beat-quality-check**: the Revision terminology rule described Revisions as
  PR-level entities, "one per pull request." Restated as one per change artifact
  (pull request, procedure document, runbook diff) to match
  `specs/revision.yml`'s medium-agnostic definition.
- **beat-quality-check**: Business Outcome's "survives any UI rewrite" became
  "survives any implementation rewrite," and "a legitimate category of agency
  work" dropped "agency" — the kit covers operational and organizational work,
  not only software delivered by an agency.
- **plan-quality-check**: canonical forbids recommending `assumption`-typed
  Notes as deprecated, but `specs/note.yml` still defines `assumption` as a
  valid type. Restated so the check grades whether an assumption carries an
  explicit validation state, and defers to whichever convention the system of
  record uses.
- **plan-quality-check**: role-specific anchor wording ("a developer knows",
  "a QA engineer could write test cases") generalized to the owner and to
  whoever verifies the work.

## v0.1.0-draft — 2026-08-11

Initial skeleton: entity specs (Coda, Beat, Beat Version, Revision, Note,
Downbeat), two quality skills (beat-quality-check, plan-quality-check), one
worked example. Dimension definitions pending reconciliation against the
reference implementation's canonical rubric prompts before v1.0.0.
