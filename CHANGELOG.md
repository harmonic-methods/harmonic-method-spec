# Changelog

## v1.4.0 — 2026-08-21 (unreleased)

- **The checker enforces a release invariant.** The newest changelog entry either
  says `(unreleased)` or a tag exists for it. Caught a live case on its first run:
  `harmonic-method@1.3.0` was on the public registry while the entry still claimed
  to be unreleased and no `v1.3.0` tag existed. Now tagged.
  - The rule also **fixes an order**, found while building it rather than designed
    in: a branch removing the marker cannot pass its own check until the tag
    exists, and a tag should point at merged work — so tag first, then remove the
    marker. An unreleased entry owes no tag, so the rule permits exactly that
    sequence and no other.
- **Two rules no check can reach, written down instead.** A pre-publication review
  covers what *visibility* exposes, not what git tracks — this repository's own
  sweep reported clean while internal identifiers sat in a closed pull request's
  description (HM-N-061). And a command's exit code is the answer, not its piped
  output — three times in one sitting a pipeline returned zero for a failing run
  and `set -e` did not fire (HM-N-062).
- **The lock file agreed with the manifest again**, and the rule that prevents a
  recurrence is written down: never hand-edit a generated file, regenerate it. The
  manifest was renamed and its parser reclassified while the lock file kept the old
  name and classification — both internally valid, disagreeing with each other, and
  caught by a contributor reading the diff rather than by any check. Note that the
  miss is not the same as a replacement matching nothing: every replacement landed,
  but only one of several facts that had to change was replaced. See HM-N-065.
- **`specs/conformance.yml` (new)** — what conforming involves, and what an
  implementation declares. This repository claimed to be canonical while offering
  no statement of what conforming to it entails, so a conformance command would
  have had no referent and its failures would have been arguments about scope.
  - **The surface separates into three, not two.** What binds and can be
    compared: fields, which are required, permitted lifecycle values, and the
    identifiers each instrument scores. What binds and cannot be compared: the
    rules on each entity, the layout, the binding between a change and its step,
    the five functions. What binds nobody: everything else. The two-way split is a
    false choice — fold the uncomparable rules in and the command must ignore them
    while claiming coverage; fold them out and the method stops requiring what
    makes it a method. See HM-N-063.
  - **A declaration is written, never inferred.** Deriving a model from source
    means parsing a language, which would make the tool a tool for that language —
    and the method has to hold for an implementation in anything, or in nothing.
    Two links rather than one: a check compares the declaration to the specs, the
    implementation's own tests compare its behaviour to the declaration. See
    HM-N-064.
  - The surface is defined by what binds, not by where it lives. Adding a
    directory here does not silently enlarge what an implementation owes.
- **`HM-B-007`, nothing claims more than it can show (new capability, one step
  planned).** Nine recorded rules and four checks about holding this repository's
  claims to what it can demonstrate had accumulated under the capability that
  publishes the entity model, because that is where the checker lives.
  - **How it was recognized:** four consecutive increments scored only adequately
    on advancing that capability's outcome. No single score was wrong enough to
    act on; the pattern across four was. A dimension that keeps scoring three on
    unrelated work is a capability boundary in the wrong place, not bad luck.
  - **Nothing moved.** A Note records what was learned while a particular
    capability was being delivered, and reattaching it to a capability that did
    not exist then would say it arose from work that had not started. A repository
    whose purpose is that nothing claims more than it can show cannot begin by
    falsifying its own lineage. The cost — most of the reasoning filed elsewhere,
    connected only by subject — is the honest shape of a capability recognized
    late. See HM-N-068.
  - Scored 4.1 first time, with Harmonious the weak dimension for the second Beat
    in a row and the same cause: not naming the standing tension it sits inside.
    Here that tension is that what this repository publishes assesses without
    enforcing, while what it does to itself enforces a great deal — legitimate,
    and only while the two stay told apart in the tooling. Fixed before
    decomposition; 4.3 after.
- **A request's title and description are scanned for foreign identifiers.** The
  one surface no other check reaches is where this repository's only real leak
  went: a closed request carrying a private repository's name, a commit reference
  into it, and three identifiers from a system these specs do not define. The body
  was already supplied for the binding rule, so only the patterns were missing.
  Verified against the actual leaked text — it catches two of those three.
  - **It matches shapes, never names**, and that is a constraint rather than a
    choice: a check that runs in public cannot carry a list of client or
    repository names, because the list would be the worse leak. So a client's name
    will never be caught, nor a capability identifier whose shape collides with
    ours — the third identifier from that leak. HM-N-067 states all three gaps,
    because a check that exists invites the assumption that it suffices, and a
    false sense of cover removes the habit that was actually protecting anyone.
  - Fails rather than warns: a false positive costs a reworded sentence, a miss is
    permanent. See HM-BV-003.17.
- **The binding moved to where the Revision is.** `specs/revision.yml` defines a
  tracked change in a software medium as a change with a *linked request* — so
  binding work to its step one commit at a time was finer-grained than the entity
  being modelled, and the practice contradicted the specification it exists to
  demonstrate. Exactly one binding per request now; commits may carry the trailer
  and none requires it.
  - This removes real friction as a **consequence, not a compromise**. A
    contributor, an assistant, and a web editor were each failing a check for a
    convention none could discover from its message. The tempting fix was to
    soften the rule and move it into review, which would have traded away a
    discipline this repository has repeatedly watched decay when unenforced.
  - **The exception dissolved.** A commit had been excused by name for carrying
    two bindings; at the request altitude it is not a violation, so
    `tools/trailer-exceptions.txt` is deleted rather than shortened. An exception
    that disappears when a rule is stated correctly was never a concession — it
    was the rule being wrong, recorded as if the world were awkward.
  - Adds `CONTRIBUTING.md` and a request template carrying the line pre-filled,
    because a request body cannot be read from a clone and the requirement has to
    be discoverable before it is enforced. See HM-BV-003.16 and HM-N-066,
    superseding the commit-level half of HM-N-015.
- **Spec set 1.2.0.** Additive — the first spec set change since a tag exists, so
  the minor step is now a promise rather than a formality.

## v1.3.0 — 2026-08-21

- **The checker is now a publishable command.** `hm validate <path>`, with a
  second binary named for the package so that running it without installing
  resolves. `hm --version` prints the spec set version and the package version
  separately, because they move separately and only one is what conformance is
  declared against. The command dispatches to the checker rather than
  reimplementing it, so the two cannot diverge.
  - **Three names diverge on purpose**: the repository is named for the artifact,
    the package for the method, and the command for the identifier prefix every
    Beat, step and Note here already carries — an association a reader already
    has, rather than an invented abbreviation. The short name was taken on the
    registry, which only ruled it out as a package name: a binary name needs no
    registry uniqueness. A registry scope is reserved and
    deliberately not used for the command: a scope guarantees a name forever,
    which matters for what an implementation depends on and less for what a person
    types, and it lengthens the very form a standing constraint requires be kept
    comfortable. Owning a scope does not reserve the unscoped name — separate
    namespaces, and only the unscoped one can be taken by someone else. See
    HM-N-059.
  - **A real defect caught only by installing from a packed archive**: the parser
    both the command and the checker import at runtime was declared as a
    development dependency, so the package worked here and would have crashed on
    first use once installed. Verify a package by installing it, never by reading
    its manifest. See HM-N-060.
  - **Not published.** That needs credentials and is a release action. Scoring
    this step against its Coda returns only adequate for exactly that reason, and
    the shortfall is recorded rather than absorbed — a packaged command nobody can
    install is inert. Third time a mechanism has landed a cycle ahead of what
    makes it usable, after a pinnable version with nothing to pin and an entry
    claiming release with no tag. See HM-BV-006.2.
- **The checker takes a root.** `node tools/validate.mjs <path>` now checks any
  tree, not only this repository's. With no path it self-checks exactly as before.
  The front page no longer has to admit that the checker cannot check your tree.
  - **Deciding what does not travel was the substance.** Checked anywhere:
    required fields, lifecycle values, decision rationale, reference resolution,
    and each child's agreement with its directory — what the specs require.
    Not checked elsewhere: the forbidden-vocabulary sweep, the instrument
    digests, the version agreement, the commit trailers. Those are disciplines
    this repository keeps on itself, and running the vocabulary sweep on an
    adopter's tree would fail them for writing ordinary English. A repository may
    hold itself to more than it asks of others, and the tool has to tell the two
    apart or the stricter set silently becomes the standard. See HM-BV-006.1 and
    HM-N-058.
  - The root Coda's identifier is read from the tree rather than asserted; only
    this repository knows its own.
- **The checker stops requiring what the spec does not.** `specs/beat.yml` lists
  a Beat's planned steps as optional; the checker rejected any Beat carrying
  none. The effect was not cosmetic: the method requires a Beat to pass its
  quality check *before* being decomposed, and the tree could not hold a Beat in
  the state that gate governs — scored, not yet decomposed — so a Beat and its
  first step always had to arrive together and the gate could never be observed.
  An undecomposed Beat is now reported rather than rejected. Same class of
  divergence as an identifier the checker demanded while the spec never declared
  it. See HM-BV-003.14 and HM-N-057, on why a checker stricter than its spec is a
  defect in the checker.
- **`HM-B-006`, conformance anyone can execute (new Beat, not yet decomposed).**
  Scored 4.0 against the published Beat rubric, and the weak dimension —
  Harmonious at 3 — was fixed before decomposition rather than after: the Beat
  now names the standing constraint it is held against, that reading, applying,
  and vendoring must continue to install nothing. HM-N-056 draws that boundary:
  publishing a command is permitted, requiring it is not.
- **The published counts are now derived rather than trusted.** How many
  dimensions or checks each instrument carries is counted from the instrument and
  asserted against the front page and the agent-facing entry point. One had
  already gone stale — the reconciliation instrument carries nine checks and both
  surfaces said eight, so an agent was told the wrong number about the instrument
  it was about to apply. The instrument digests could not have caught it: they
  guard an instrument's own normative text, not prose written about it elsewhere.
  See HM-BV-003.15 and HM-N-061.
- **A retired altitude name is rejected on the normative surface.** A Note
  attaches to a portfolio, a system, or a Beat; one field description still
  offered an organization, four spec set versions after the decision retiring the
  word said it does not appear in the method. Corrected, and swept for. The sweep
  covers `specs/` only — the Notes recording a retirement have to be able to name
  the word they retire, which was verified by widening it and reading the six
  failures. See HM-N-062.
- **Conformance is stated normatively**, in a new spec file. What a claim covers
  — these specs and the instruments' normative sections — what it excludes, and
  the line between an allowed extension and a contradiction that fails on the
  implementation's side. The rule had lived only in the contributor guide, which
  is not the normative surface and is not what an implementation pins. This is
  also the prerequisite HM-BV-006.2 named and deferred: a check that reports
  conformance needs a published statement of which files are normative before it
  can mean anything. See HM-BV-006.3 and HM-N-064.
- **A bounded step's status is carried, not derived.** A Beat Version and a
  Revision each state their three values on the entity. An implementation may
  compute an extra label from its medium, but a value derived from a signal that
  exists in only one medium does not satisfy a field the method requires in every
  medium — a Revision whose evidence is a procedure document has no branch state
  to read. This makes explicit what the field already required, after a real
  implementation read it as satisfiable by derivation. See HM-N-063.
- **One fewer Note type.** The type for something believed but not verified is
  retired; four remain. It answered a question about confidence rather than about
  kind, where every other type names what a piece of knowledge is — and both
  instances here turned out to be background about how much evidence something
  rests on. The cost is recorded: there is now no type-level signal that a Note is
  unverified, and what would replace it — a status marking a claim as unsettled,
  not a confidence number — is named as owed rather than invented in the same
  step. This spec declares no Note status field at all, which is why the type slot
  was carrying lifecycle to begin with. See HM-BV-003.16 and HM-N-065.
- **Encoding is not normative, and the checker now says so.** No spec file
  defines a directory layout, a file format, or an identifier scheme, yet the
  checker enforces a layout on any tree it is pointed at — the third and largest
  instance of a checker stricter than its spec. Resolved by declaring the split
  rather than weakening the checker: the *relationships* the specs state are
  normative, the *encoding* is not, and the tree rules check one convention this
  repository uses and recommends. A method that holds for a procedure or a runbook
  cannot mandate a file format. See HM-BV-006.4 and HM-N-067.
- **Every enum declares whether additions are allowed.** Note types are open, so
  an implementation defining a further kind of knowledge is extending the method;
  the four status enums are closed, because an unknown status cannot be
  interpreted — a reader cannot tell whether it means done or dropped. An enum
  with no declaration is closed, and the checker requires the declaration rather
  than inferring it. See HM-N-066.
- **A conformance claim now has a shape, and a check.** The statement said what a
  claim covers and left the claim shapeless, so two implementations could both
  declare conformance and mean different things. A declaration requires the spec
  set version, who is claiming, and every known contradiction; extensions and
  vocabulary mappings are optional, because they do not change what a claim is
  worth. An empty divergence list is the strong claim — omitting the list is not
  the same as declaring it empty. `hm conformance <file>` checks the form, and
  reports an added value on a closed enum as a contradiction filed under the wrong
  heading. It cannot confirm behaviour, and says so. See HM-BV-006.5 and HM-N-069.
- **The published command is now checked to the extent that it runs.** It broke
  during the work above — a stray backtick, the entry point stopped parsing, and
  the self-check still reported conformant, because every rule reads files rather
  than running code. The command is the only part of this repository an adopter
  executes and was the one part nothing loaded. Deliberately shallow. See
  HM-N-070.
- **Note types narrow rather than multiply.** The enum closes and gains children:
  an implementation needing a finer kind sets an optional `subtype` under a
  published value instead of adding a fifth type. This reverses the openness
  granted earlier in this same cycle, on that decision's own argument — an unknown
  child still reports its parent, so a reader loses precision rather than
  classification, where an unknown sibling loses the classification outright. The
  type is now stated as the root: everything is context in the general sense. A
  `child_type` extension is classifiable, an added sibling still reports as a
  contradiction, and the checker points the second at the first. See HM-BV-003.17
  and HM-N-071.
- **No Note type is named for the category any more.** Rooting the hierarchy at
  context left `context` as both the category and one of its members, so filtering
  on it was ambiguous and only prose said which sense applied. The unspecialized
  type is now `background`; the set stays at four. `information` was the first
  candidate and had the same defect — all four types are information — which is
  worth naming, because the failure mode is reaching for the broadest noun to name
  the case with no distinguishing feature. The field keeps the name `type`. See
  HM-BV-003.18 and HM-N-072.
- **Lineage has to be legible, and Notes do not expire.** A Note is now required
  to be readable by everyone who can act on the entity it informs — an
  implementation may classify and restrict, but not let a Note be cited as lineage
  by a reader who cannot open it, and where a restriction forbids that the lineage
  is written at the readable level with the restricted material as evidence. No
  classification scheme is specified; the tiers vary by organization and
  regulation, and the bound holds under any of them. Expiry was considered and
  declined — it would contradict the Note's own first rule — with the difference
  between expiry and obligation-driven retention recorded so a future retention
  rule starts from it. See HM-BV-003.19, HM-N-073 and HM-N-074.
- **A dimension is never a type.** Twice a property any kind of knowledge can
  carry has been found in the kind slot — confidence, as a type for the
  unverified, and reach of consequence, as a tier named for how much a decision
  matters. The rule that catches the next one is now stated: kind is what the
  knowledge is, everything else is a dimension and belongs in its own field. The
  cost of the confusion is that two Notes then differ on two axes while appearing
  to differ on one, so every downstream filter inherits the ambiguity. See
  HM-BV-003.20 and HM-N-075.
- **Reach of consequence is designed and withheld.** An optional altitude value,
  widening only, was specified and then withdrawn once its vocabulary was tested
  against a host the altitudes do not contain — a person is not an altitude. Two
  workable shapes are recorded along with what settles the choice, which is a
  second host hierarchy to design against. Both reversals in this cycle came from
  deciding against a single case. See HM-N-076.
- **`HM-B-007`, knowledge that arrives before its subject (new Beat, not yet
  decomposed).** Three deferrals turned out to be one missing concept: disposable
  capture, a pending verification state, and the fact that a Note cannot be
  written until the entity it informs exists — which inverts the order work
  happens in. The promotion step is accountable work the method assigns to the
  Composer while the entity model does not contain it. Scored roughly 3.7 against
  the published Beat rubric, short of the reference threshold, and the weak
  dimension is Strategically Aligned — the system Coda speaks of reading the model
  and assessing against instruments and says nothing about the model being
  complete. Named rather than absorbed. See HM-N-077.
- **The system Coda promises sufficiency, and sufficiency is bounded.** A Beat
  opened to close a gap in the entity model scored short on Strategically Aligned,
  and the fault was in the Coda — it promised reading, naming and assessing, and
  said nothing about the model being adequate to the work brought to it. Widened,
  and deliberately to *sufficient* rather than *complete*: completeness is judged
  against everything imaginable, so promising it would make every conceivable gap
  strategically aligned by construction, which is how a strategic anchor becomes a
  mandate to accumulate primitives. A constraint records the bound — a gap earns a
  primitive only when someone met it in practice, silence that merely leaves room
  is the feature, and the burden sits on the addition. See HM-BV-003.21, HM-N-078
  and HM-N-079.
- **The seventh Beat dimension is renamed and rewritten.** `Business Outcome`
  becomes **`Outcome-Oriented`** (`outcomeOriented`), and the carve-out placing a
  score floor of about 3 on infrastructure and platform-quality Beats is deleted.
  The carve-out was an exclusion rather than a concession: against a threshold of 4
  on the average, six dimensions at Strong plus one at the sanctioned floor comes
  to 3.86, so that class of Beat could not pass however well written, and every
  remedy was forbidden in the same paragraph. The floor existed to compensate for
  wording — a VP, a CFO, a board, a budget line item — that a reliability
  guarantee cannot satisfy and that the method cannot assume of a procedure or an
  organizational practice. Removing the premise removes the need for the
  exemption. The rename follows because every other dimension is an adjective and
  this was the only noun phrase, and because de-commercialising the body while the
  name kept asserting what was removed would repeat an error already corrected
  twice this cycle. Merging into Clear was refused (legibility is not framing) and
  so was dropping it (nothing else asks whether the thing is stated as an outcome).
  Implementations deriving a literal union from the key break at compile time,
  which is the failure mode to prefer. See HM-BV-002.8 and HM-N-080.
- **A score now names the rubric that produced it.** Moving a dimension exposed a
  symmetrical gap: the front page named only one kind of staleness — whether a
  score predates the text it judged — and the reference implementation built
  exactly that half, hashing the thing scored and recording nothing about what
  scored it. So every result taken before a rubric change keeps reading as fresh
  against definitions that no longer exist. All three instruments now require the
  spec set version in the reported result, read from the manifest and copied
  nowhere; the conformance statement requires a recorded score to carry that
  version plus the state of what it judged, and to detect both kinds of staleness.
  Recording scores in the tree was proposed and refused — a score cannot hold a
  hash of its own file, an LLM score is not reproducible, and requiring one would
  mean a Beat could not be written without running a model. See HM-BV-002.9 and
  HM-N-081.
- **Spec set 1.2.0.** This is the number an implementation pins. The set gains a
  normative file and two rules making an existing requirement explicit, and loses
  one enum value. A removed value would be a major once a tag exists; none does
  and nothing has been released, so the set takes a minor step and this cycle's
  normative changes share one number rather than minting a second that nobody
  could have held.

## v1.2.1 — 2026-08-20

- **The delivered-marking lag is settled, and the rule that keeps it settled is
  written down.** HM-N-053 claimed the lag was bounded at one; it was two, because
  two release increments merged back to back and neither closed its predecessor —
  so the claim was already false when the first tag was cut. The bound is not a
  property of the lag but of a habit nobody had recorded. Closing the previous
  step now belongs in the **next substantive step's scope**, never in a step whose
  only purpose is bookkeeping — that is the regress HM-N-053 itself warned about,
  arriving disguised as diligence. See HM-BV-004.5 and HM-N-055.
- **No change to the spec set**, which stays at 1.1.0. Nothing normative moved.

## v1.2.0 — 2026-08-20

The direction of authority inverts, and two published paths move. Nothing here
was ever released — there is no tag in this repository — so the path and field
changes below break no existing consumer, and the spec set takes a minor step
rather than a major one. The major line stays available for the first change
that breaks something real. See HM-BV-003.11.

**Spec set 1.1.0.** This is the number an implementation pins.

- **The first releasable version stays in the 1.x line.** The work had been
  numbered as a major on the reasoning that two field values changed. Nothing
  could have been keying off them — no tag exists, so nothing was ever released,
  and the version was not machine-readable until this cycle. A promise that could
  not be made cannot be broken, so the spec set takes a minor step and the two
  unreleased entries dated the same day merge into this one. Once a tag exists
  this reasoning expires: a renamed field value is a major from then on. See
  HM-BV-003.11 and HM-N-045.
  - Separately a gap: the front page tells a reader to copy from a tag, and there
    is no tag to copy from. Creating one is a release action, not a change to the
    tree.
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
- **`skills/coda-alignment-check` (new)** — an instrument for the Conductor. Two
  instruments graded how well something is *written*; none asked whether what was
  decided is still true, which is the accountability the method singles out as
  most often unstaffed. Eight checks over a Coda chain: does it resolve, does each
  Coda serve the one above it, does the parent cover the child, is it a resolved
  state, is it specific enough to judge against, does anything recorded already
  contradict it, has it moved since it was anchored, and are the decisions under
  it still in force.
  - **It reports findings, not a score.** A chain with one broken link is broken,
    and an average would conceal which link — the same reason a portfolio-wide
    convergence reading was rejected. `cannot-determine` is its own category, so
    a missing input is never reported as agreement. See HM-N-046.
  - **The digest guard is generalized** to cover a findings instrument as well as
    a band rubric: normative-section detection is no longer specific to a
    dimension table, and the substance assertion counts enumerated checks as well
    as scoring anchors. Both existing digests were verified unchanged, proving the
    generalization did not quietly redefine what is covered. The new instrument
    was nearly published outside the guard entirely — `AGENTS.md` now says that
    adding an instrument with a new normative heading means registering it.
  - **Run against this repository's own chain immediately**, it returned two
    findings and exposed a gap in itself. Both findings were the same defect: the
    Beat's Coda and the system Coda each promised *scoring*, written when scoring
    was all this repository published, and neither covered an instrument that
    reconciles a chain. Both widened. The gap: all eight checks compared a Coda
    upward against its parent, and none looked down at the entity carrying it — so
    the instrument could not detect the divergence it had just surfaced. A ninth
    check closes it, and its digest was regenerated deliberately. See HM-N-048
    and HM-N-049.
  - **Each instrument now names the function it serves**, and the index states
    that the Producer and Promoter have none, deliberately. See HM-N-047.
- **A bounded step's status now says what happened to it.** A Beat Version and a
  Revision each carried `active` or `archived`, which collapsed the first
  question anyone asks about a past step: was it done, or dropped? Both now carry
  **`active`, `delivered`, or `withdrawn`**, with `archived` retired and no alias.
  The clearest case here is a Beat Version whose design was obsoleted before
  anything was built — it read "archived", indistinguishable from the twenty-six
  that shipped, and now reads `withdrawn`.
  - The binary was inherited from an implementation where it pairs with a label
    derived from source-control state, so `archived` never has to mean abandoned
    there. Copied without the derivation, the word carried meaning it cannot
    hold — and deriving it is unavailable, because a git-hosted system keeps no
    Revision record to derive from.
  - **A Beat keeps `open`/`closed`** and the asymmetry is deliberate: a durable
    capability is operated and retired, never delivered. A bounded step genuinely
    ends one of two ways, which is why a Beat Version and a Revision share an
    enum with each other and not with the thing they serve.
  - Three values, not four. Superseded, descoped and abandoned answer *why*, which
    is rationale and belongs in a decision Note.
  - Breaking, and shipped as a minor deliberately: no tag exists yet, so this is
    the last moment it costs a minor rather than a major. See HM-BV-003.13,
    HM-N-052, and HM-N-053 on the one-step lag this leaves.
- **The derivable-facts rule now extends past the checker's reach.** Two rules
  already governed restated facts inside the tree — a count goes in no prose
  because the directory answers it, and a version lives in one checked place.
  Both assumed the checker could reach the text. A pull request body cannot be
  reached, and a version and a commit count restated in one went stale within the
  hour, caught by a reader rather than by anything automatic. Outside the tree the
  rule is not "one authority" but "no copy". Recorded with a second rule from the
  same incident: a programmatic replacement asserts that it matched, and a remote
  surface is verified by reading it back — two silent no-op edits in one sitting
  earned it. See HM-BV-003.12, HM-N-050, and HM-N-051.
- **The criteria-scoring proposal is recorded as an open question.** An unmerged
  branch proposes computing a dimension's band from binary factual criteria
  instead of asking a reader to match a description to a band. It targets the
  failure the system Coda exists to prevent — that a band means the same thing
  wherever it is produced — but it is unvalidated, and changing how a band is
  computed changes what every score means. Filed as an assumption carrying its
  validation and refutation conditions, plus the context needed to act on it,
  rather than left in a branch drifting further from the specs each release. Two
  of that branch's own claims about the reference implementation were checked and
  found false and are named so they are not carried forward. No rubric text
  changed, so no digest moved. See HM-BV-002.7, HM-N-043, and HM-N-044.
- **The commit guard now actually runs in continuous integration.** The check
  skips a missing base ref by design, and the job checked out one commit deep —
  so the base was never present and the check skipped on every run while printing
  success. The job now fetches full history and passes the pull request's own
  base, and `HM_REQUIRE_BASE` turns a missing base into a failure rather than a
  skip. A guard allowed to skip silently where it is the enforcement is worse
  than an absent one, because its silence is indistinguishable from success. See
  HM-BV-003.10 and HM-N-042.
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
- **The spec set is now versioned machine-readably**, at **spec 1.1.0**. New
  `specs/spec-set.yml` holds the single authoritative version; every spec file
  declares it as a parsed `spec_version` field, replacing a YAML comment nothing
  could read; and `npm run validate` fails when any of them disagree. **Pin this
  number** — it is what conformance is declared against. Two `rubric:` field
  values changed with the check renames above, which would be breaking if
  anything had been able to pin the previous version; nothing could, because it
  lived in a comment. See HM-BV-003.5 and HM-N-029.
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
