# Changelog

## v2.0.0 — 2026-08-20 (unreleased)

**Breaking.** Two published paths change, and the direction of authority
inverts.

- **This repository is now canonical** for the entity primitives and for the
  rubric dimensions, red flags, and anchors. An implementation conforms at a
  pinned tag; it stays canonical only for its own type declarations, its gate
  thresholds, and everything it computes. AGENTS.md is rewritten accordingly, and `rubric-parity`'s Beat
  description — which asserted mirroring — is corrected. See HM-BV-002.4 and
  HM-N-025. The conformance test on the implementation's side is not built yet;
  until it is, this is declared rather than enforced.
- **`skills/beat-quality-check` → `skills/beat-coda-quality-check`** and
  **`skills/plan-quality-check` → `skills/beat-version-quality-check`**,
  following the reference implementation's renames of `beat_quality` and
  `plan_quality`, both of which survive there only as deprecated aliases. The
  `rubric:` fields in `specs/beat.yml` and `specs/beat-version.yml` follow.
  **No dimension, anchor, red flag, or check rule changed** — the Beat rubric's
  seven dimensions and the Beat Version rubric's six are byte-identical. Anyone
  who vendored either skill at its old path, including the `.claude/skills/`
  placement README recommends, must re-copy. See HM-BV-002.3 and HM-N-027.
- **The Beat Version rubric stays at six dimensions.** The reference
  implementation scores a seventh, `completeness`, which probes a codebase for
  how much of the planned capability exists. The method omits it: it is not
  medium-agnostic, and more importantly it does not belong in a rubric that
  scores how well a plan is *written*. Every other dimension can be scored the
  moment the plan exists, which is when the rubric is meant to be used; a
  dimension measuring what has been built cannot, and mixing them makes a score
  depend on when it was run. Assessing realized-against-planned belongs to a
  cadence anchor. See HM-BV-002.6 and HM-N-036, superseding HM-N-028.
- **Instructional text names no specific implementation.** The contributor guide
  explained conformance in one product's vocabulary and used its entity names as
  the examples of an allowed extension — which made a conformance rule unreadable
  to the very audience it exists for. It now speaks of an implementation
  generically. The README and `llms.txt` keep one attribution line each, and the
  trademark notice keeps the marks: provenance and legal notice are not
  instruction. See HM-N-035.
- **This repository stops calling itself a kit.** The word appeared about thirty
  times in present tense, including as the title of both entry points and the
  opening line of the contributor guide. It was accurate for a starter set of
  files and became misleading for a conformance target. The replacement names
  both halves — this repository publishes the specification and ships the tooling
  to apply it — because the normative specs sit alongside a checker, a worked
  example, and two skills, and not separating them was deliberate. The package
  `name` becomes `harmonic-method-spec`. Historical entries and archived Beat
  Version prose keep the word, which was true when written. See HM-BV-004.3 and
  HM-N-041.
  - Not included: renaming the repository on the host, renaming a local clone,
    and choosing the published command-line package name. A repository name and
    an invocable command name are not the same thing, and the latter belongs with
    the tooling.
- **`specs/bar.yml` and `specs/downbeat.yml` (new)** — the cadence entities, and
  the Conductor's structural instrument. The method already named the
  accountability that decisions stay in force and the discipline of routine
  reconciliation, but published nothing to make the routine regular. A **Bar** is
  the recurring period work is planned and delivered within, attaching at
  portfolio or system altitude; a **Downbeat** is an immutable, additive anchor
  recording where one capability stood and what it was converging toward.
  - **Bars nest temporally** via an optional `parent`, so a quarter groups its
    fortnights without a second entity. Phrase, BarGroup, BarSet, and Period
    were all weighed; the first three collide with words the method already
    spends, and Period — the one clean word — would cap the cadence at exactly
    two levels while every other hierarchy here recurses. See HM-N-039.
  - **The cadence spans two altitudes by design**: one shared clock, many
    readings. A portfolio-wide convergence number would average away the only
    thing worth knowing, and a per-capability clock is not a cadence at all. See
    HM-N-038.
  - How a convergence reading is computed stays with the implementation, on the
    same line every other computed value follows.
- **`specs/coda.yml` gains `id`**, required when another Coda's `parent`
  references it. Instances already carried one and the checker already required
  it while the spec never declared it — the same class of gap as a version
  living in a comment. Coda also stays an `entity` rather than becoming a
  `concept`: an earlier proposal here is withdrawn, because Coda instances exist,
  are addressable, and point at each other, and Note settles the analogy —
  attaching to a host is not the same as not existing. See HM-N-040.
- **The Conductor's discipline names both instruments.** Notes carry what was
  decided; Bars and Downbeats make the checking regular. No other function text
  changed.
- **The altitude above a system is a `portfolio`.** `specs/coda.yml` placed an
  *organization* there while `specs/function.yml` and the README said
  *portfolio* — two normative files naming one altitude differently. Portfolio
  wins and organization leaves the method: altitude is recursion, and a
  portfolio contains portfolios while an organization does not. An altitude
  answers how much work is in view; an organization answers who owns it, which is
  a different axis. Tenancy, ownership, and legal structure are now explicitly
  unspecified — an implementation adding a boundary above portfolio altitude is
  extending the method, not diverging from it. No rubric text changed, so no
  digest moved. See HM-BV-003.7 and HM-N-037.
- **Identifiers move from `K-` to `HM-`.** All 159 across 57 files. `K-` stood
  for "kit", which this repository has outgrown. The worked example keeps `EX-`,
  because an adopter picks their own prefix. Commit trailers written before this
  change name `K-` Beat Versions; substitute `HM-` and they resolve. History was
  deliberately not rewritten — a trailer records what was named at the time. See
  HM-BV-003.6 and HM-N-034.
- **The spec set is now versioned machine-readably**, at **spec 2.0.0**. New
  `specs/spec-set.yml` holds the single authoritative version; every spec file
  declares it as a parsed `spec_version` field, replacing a YAML comment nothing
  could read; and `npm run validate` fails when any of them disagree. **Pin this
  number** — it is what conformance is declared against. The bump to 2.0.0 is
  breaking: the `rubric:` field values changed with the check renames above, so
  anything keying off `beat_quality` or `plan_quality` breaks. See HM-BV-003.5
  and HM-N-029.
- **The tooling now versions separately from the standard.** `package.json`
  covers the checker, on its own cadence, so a checker fix never bumps what an
  implementation pins. It had drifted two releases behind the changelog; the
  validator now asserts it matches the newest changelog heading, and caught that
  on its first run.
- **The spec version is removed from 55 instance-file headers and both skill
  bodies.** They named a version in a comment, which would have gone stale on
  this release — and a stale version comment does worse than misinform, it
  asserts conformance to a spec the file was never checked against. Headers now
  name the spec and stop. See HM-N-030.
- **The rubric drift guard is built.** `skills/fingerprints.yml` holds a digest
  per rubric over the sections that define what a score means — the scoring
  scale, the dimension table, and the check rules — and `npm run validate` fails
  when any of them change, with a message that names what to verify before
  regenerating rather than presenting regeneration as the fix. `npm run
  fingerprint` regenerates deliberately. The checker also asserts the covered
  text still contains scoring anchors, which caught a real gap on its first run:
  the original design covered only the dimension table, leaving the Beat Coda
  rubric's shared scoring scale entirely unguarded. Every rule was verified by
  making it fail. See HM-BV-002.5, HM-N-032, and HM-N-033.
- **HM-BV-002.2 is archived unbuilt.** Its design assumed the definitions lived
  elsewhere, which the inverted direction of authority made obsolete. The gap it
  named — nothing catching an edit on this side — is what replaced it.
- **Correction**: the drift guard described as shipped in HM-BV-002.2's summary
  was never built — no fingerprint, hash, or snapshot over either dimension
  table exists in the reference implementation. The summary now says so. Real
  drift went undetected behind that claim. See HM-N-026.

## v1.2.0 — 2026-08-20

Adds the method's accountability model and renames the instance directory. See
HM-BV-005.1 and HM-BV-003.4.

- **specs/function.yml** (new): the five functions — Composer, Orchestrator,
  Conductor, Producer, Promoter — each with what it owns, how it fails, and its
  discipline, plus the rules that govern them. Declares `concept:` rather than
  `entity:`: nothing instantiates a Function, and no entity spec gains a field
  naming one. Promoter is newly named; the other four are unchanged in
  substance. Value Velocity is named as the Producer's instrument and defined in
  one line, with its computation left to the implementation.
- **README.md / llms.txt**: corrected from four functions to five, and both now
  list `specs/function.yml`. README gains a paragraph on functions as
  accountabilities rather than titles.
- **`harmonic/` renamed to `harmonic-method/`**, in this repository and as the
  recommended name in an adopter's. The old name was chosen while the method was
  still called Harmonic Composition and read as a bare adjective afterward. Path
  references updated in README.md, llms.txt, AGENTS.md, examples/README.md, the
  instance directory's README, `tools/validate.mjs`, and the CI workflow comment.
  The historical entries below keep the path as it was at each release.
- **harmonic-method/beats/method-vocabulary/notes/single-method-not-a-family.yml**:
  removed the attribution of the single-method rename to a "canonical org-level
  Harmonic Method notebook". No such notebook exists in the reference
  implementation, so the clause was a false claim about provenance and was
  removed rather than superseded. The decision it documents is unchanged. See
  HM-N-023 for why that is a removal and the four-to-five function change is a
  supersession.
- **No spec, rubric, or entity-field changes.** Beat, Beat Version, Revision,
  Note, and Coda are untouched, and every dimension and anchor in both skills is
  byte-identical.

## v1.1.0 — 2026-08-17

Renamed from Harmonic Composition Kit to Harmonic Method Kit, following the
organization-level collapse of the three-framework structure (Harmonic
Composition, Harmonic Orchestration, Harmonic Portfolio Management) into one
named method — the Harmonic Method — with four functions (Composer,
Orchestrator, Conductor, Producer) scoped by altitude rather than split across
frameworks. See HM-BV-003.3.

- **package.json / package-lock.json**: `name` changed to
  `harmonic-method-kit`.
- **README.md / llms.txt**: title and framing updated. Dropped "founding
  framework of the Harmonic Methods family" and the enumeration of Harmonic
  Orchestration and Harmonic Portfolio Management as separate frameworks;
  added a line naming the four functions and stating that beat/track and
  portfolio altitude reuse this kit's same primitives rather than needing a
  separate kit. Clone URL updated to `harmonic-method-kit.git`.
- **specs/*.yml**: header comment on every spec file changed from
  "Harmonic Composition spec" to "Harmonic Method spec". No field, type, or
  rule changes — the entity model is unchanged.
- **skills/beat-quality-check, skills/plan-quality-check**: `description`
  frontmatter and body prose changed from "Harmonic Composition Beat[...]" to
  "Harmonic Method Beat[...]". No dimension, anchor, or scoring-rule changes.
- **harmonic/coda.yml and every Beat Coda that named the framework**:
  "Harmonic Composition" replaced with "the Harmonic Method" in prose.
- **harmonic/beats/method-vocabulary/notes/commits-are-revisions.yml**: "a
  Composition primitive" corrected to "a Harmonic Method primitive".

Not renamed: the "Harmonic Composition" language in the v1.0.0 entry below
describes what was true at that release and stays as written — a changelog
records history, not the current name.

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
  `harmonic/` and `examples/` — required fields, lifecycle enums, decision
  rationale, each child's back-reference matching its directory, reference
  resolution, and vocabulary the kit does not define. Adds a private
  `package.json` with one dev dependency and a `.gitignore`; consumers still
  install nothing. It does not check the rubric prose in `skills/`.
- **README.md**: replaced the one-line placeholder with the repository's front
  door — orientation, the entity model, a spec table, both rubrics and their
  dimensions, a copyable scoring invocation, the system layout rule, and an
  explicit statement of what the kit does not do. This closes HM-BV-004.1, whose
  scope it was written against.
- **Beat Versions are directories too**, each holding `version.yml` and an
  optional `revisions/`. `revisions: list<revision>` was already a field of
  beat_version and `specs/revision.yml` already existed, so Revisions were a
  specced child entity with nowhere to live — the same gap Notes had. The
  containment rule now holds at every level rather than breaking one step down.
  Deliberately excluded: a `checks/` directory. No check entity is specified,
  two recorded constraints say the kit assesses without recording, and a stored
  score cannot signal that it predates the text it judged.
- **examples/**: restructured to mirror `harmonic/` exactly, so the worked example
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
