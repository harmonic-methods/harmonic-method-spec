---
name: plan-quality-check
description: Score a Harmonic Composition Beat Version plan across the six published plan-quality dimensions (Scoped, Directional, Testable, Traceable, Assignable, Risk-aware), 1-5 each from binary criteria, with reasoning and improvement guidance. Use when asked to check, grade, or improve a plan or Beat Version before work begins.
---

# Plan Quality Check

You are scoring a **Beat Version** — a planned step in a Beat's evolution —
against the published rubric. Spec: `specs/beat-version.yml` (v1.1.0).

The dimension definitions, red flags, scoring anchors, and check rules below
follow the reference implementation's canonical `plan_quality` rubric prompt.
Score against them as written; do not paraphrase them.

**The scoring method below is the kit's own, and is ahead of canonical.** The
reference implementation still asks the model for a per-dimension number
directly, scored holistically against these same anchors. Its decision record
commits to criteria-based scoring, but that has not shipped. See
`notes/criteria-scoring-is-kit-originated.yml`.

This is NOT a build quality check (that evaluates the change itself). This
evaluates how well the Beat Version *definition* is written — is it a good,
clear, executable unit of work?

## Inputs
The Beat Version's title, summary, and Scope; its parent Beat (title, Coda,
description); sibling Beat Versions; the parent Coda or strategy; and any
attached Notes (constraints and decisions matter most here).

The Beat Version's summary and Scope are the canonical source of what gets done.
Score against them — not against any external task list, work-item breakdown, or
ticket tracker.

A good Beat Version:
- Targets 1-2 weeks of work with explicit scope boundaries in its summary and
  Scope
- Delivers standalone value without depending on future Beat Versions
- Has clear scope boundaries that prevent creep
- Is traceable to its parent Beat with documented decisions
- Can be assigned to one person or pair end-to-end

## Scoring: answer criteria, compute the band

Do not pick a number. "Score this 1-5" is read differently by different models —
and by the same model twice — so a holistic band cannot carry the kit's Coda,
which is that a 4 here means a 4 there. You answer factual questions; arithmetic
produces the score.

This is a deliberate divergence from the reference implementation, which still
asks its model to name the number. Canonical's own decision record
(`N-4E09-3024`) reaches the same conclusion and specifies the same mapping; the
kit has adopted it first. A band produced here is therefore not reproducible
against a canonical check run today.

For each dimension:

1. Derive 3-4 binary criteria from that dimension's definition, red flag, and
   anchors below. Each must be factual and observable in the Beat Version as
   written — answerable by anyone reading the same text, not a matter of taste.
2. Answer each YES, NO, or CANNOT_DETERMINE. Use CANNOT_DETERMINE only when the
   input needed is genuinely absent (no parent Beat supplied, no Notes
   provided), never when the answer is merely unflattering.
3. Take the success rate over the criteria you could answer:
   `ratio = yes / (yes + no)`. CANNOT_DETERMINE is excluded from the
   denominator — it neither helps nor hurts — and is reported separately.
4. Map the ratio to the dimension's band:

       ratio < 0.20 → 1        ratio < 0.60 → 3        ratio >= 0.80 → 5
       ratio < 0.40 → 2        ratio < 0.80 → 4

Report the criteria and their answers alongside the band. The trace is the
evidence: a band with nothing behind it is the holistic guess this method
exists to remove.

The per-dimension anchors below do two jobs here: they say what each band looks
like, and they are the richest source for the criteria you derive — an anchor
that names an observable property ("explicit in/out boundaries", "one owner,
1-2 weeks") converts to a criterion directly. In canonical they are still scored
against holistically; the anchor text is shared, the use made of it is not.

The kit publishes the method and the dimension definitions the criteria are
derived from, not a fixed criteria list. Two runs may therefore phrase criteria
differently while landing on the same band — the dimension definitions, anchors,
and band mapping are what must agree. Should the reference implementation ship
its own per-dimension criteria wording, that wording will still not be mirrored
here: it is authored against its own entities, and this kit is a translation.

## What a band means

1 = Critical gap — dimension is not addressed at all
2 = Weak — dimension is partially addressed with significant issues
3 = Adequate — dimension is addressed but could be stronger
4 = Strong — dimension is well-addressed with minor room for improvement
5 = Excellent — dimension is exemplary

## The six dimensions — score each 1-5

1. **Scoped** (`scoped`) — Clear external boundaries in the summary and Scope —
   what's in, what's out — and internal cohesion across the deliverables
   described. Prevents creep and makes estimation reliable.
   Red flag: Scope restates the Beat Coda, has no explicit in/out boundaries, or
   the described deliverables don't cohere into a single shippable increment.
   Naming specific child or pipeline entity instances in the summary (its own
   Revision IDs, sibling Beat Version numbers, or the release grouping it ships
   in) is also a scope defect — those references drift as the graph changes; a
   knowledge Note ID cited for traceability is fine.
   Scoring anchors:
     1 = No scope defined, or scope is just the Beat description copied
         verbatim. No boundaries. Described deliverables are an unrelated
         grab-bag.
     2 = Vague scope like "improve payments." Some implicit boundaries but
         nothing explicit. Deliverables are loosely related.
     3 = Scope describes the change but boundaries are implicit. Most described
         deliverables fit but some feel tangential.
     4 = Clear scope with explicit in/out boundaries. Every described deliverable
         clearly belongs. Whoever picks it up knows exactly what to build and
         what to defer.
     5 = Precise scope with explicit in/out list and tight internal cohesion.
         Every described deliverable is essential — nothing extraneous. Could be
         used as a contract.

2. **Directional** (`directional`) — Advances the Beat toward its resolved Coda.
   Each Beat Version should make measurable progress toward the conclusive
   expression, not just ship isolated work.
   Red flag: Ships work that doesn't move the Beat closer to its Coda, or the
   connection between the Beat Version and the Coda is unclear.
   Scoring anchors:
     1 = No discernible connection to the Beat Coda. The work could belong to a
         different Beat entirely.
     2 = Loosely related to the Coda but the Beat Version doesn't clearly advance
         toward it. Tangential improvements.
     3 = Addresses part of the Coda but the most impactful aspects are deferred.
         Progress is visible but indirect.
     4 = Clear advancement toward the Coda. After this Beat Version ships, the
         Beat is measurably closer to its resolved state.
     5 = Directly targets the highest-impact gap between current state and Coda.
         The Beat Version is the obvious next step toward resolution.

3. **Testable** (`testable`) — Has clear acceptance criteria in the summary and
   Scope that can be verified without ambiguity.
   Red flag: No way to tell when the Beat Version is "done" without asking the
   author what they meant.
   Scoring anchors:
     1 = No acceptance criteria. "Done" is undefined. Only the author knows what
         success looks like.
     2 = Vague criteria like "payments work better." Could be tested but
         passing/failing is subjective.
     3 = Some testable criteria exist but gaps remain. Core functionality is
         verifiable; edge cases are undefined.
     4 = Clear criteria for all major scenarios. Someone who did not write the
         plan could derive the verification steps from it.
     5 = Comprehensive criteria including edge cases, error scenarios, and
         performance expectations. Tests write themselves.

4. **Traceable** (`traceable`) — Connected to its parent Beat, with Notes
   documenting the decisions and assumptions that informed the scope.
   Red flag: Orphaned Beat Version with no context — unclear why this scope was
   chosen or what constraints apply.
   Scoring anchors:
     1 = No connection to Beat context. No Notes. No rationale for why this scope
         was chosen.
     2 = Linked to Beat but no supporting Notes. Decisions and assumptions are in
         someone's head, not recorded.
     3 = Some Notes exist but gaps in the decision trail. Why certain things were
         included/excluded is unclear.
     4 = Well-documented with relevant Notes. Key decisions, assumptions, and
         constraints are recorded.
     5 = Full audit trail. Every scoping decision has a Note. Someone new to the
         work could understand the "why" completely.

5. **Assignable** (`assignable`) — Sized and described so one person or pair can
   own it end-to-end within 1-2 weeks.
   Red flag: Too large for one owner (needs a team), too vague to estimate, or
   requires expertise in too many domains.
   Scoring anchors:
     1 = Requires a full team. Spans multiple domains with no clear owner. Months
         of work disguised as one Beat Version.
     2 = Could be assigned but would take 4+ weeks. Too large for meaningful
         progress tracking.
     3 = Assignable to one person for ~2-3 weeks. Slightly oversized but
         manageable with some splitting.
     4 = Right-sized for one person or pair. 1-2 weeks of focused work with clear
         deliverables.
     5 = Perfectly scoped. One owner could start immediately with no questions
         and deliver within the estimated effort.

6. **Risk-aware** (`riskAware`) — Surfaces unknowns, blockers, and dependencies
   as Notes (decisions, assumptions, constraints) or directly in the summary
   rather than hiding them. A Beat Version that scores well elsewhere but has
   undocumented assumptions is a planning landmine.
   Red flag: Undocumented assumptions, unacknowledged dependencies, or uncertain
   areas left unaddressed in both Notes and the summary.
   Scoring anchors:
     1 = No risks acknowledged. Assumptions are implicit and untested.
         Dependencies are undocumented.
     2 = Some risks mentioned informally but not captured as Notes or in the
         summary.
     3 = Key risks are documented but not all assumptions are surfaced.
         Dependencies listed but validation plan is unclear.
     4 = Assumptions filed as Notes (with validation status) or called out in the
         summary. Dependencies documented.
     5 = Comprehensive risk surface. Every assumption has a Note or explicit
         mention in the summary, dependencies are explicit with mitigation
         plans, and uncertain areas have a stated approach. No hidden landmines.

## Output format

Same shape as the Beat check: per-dimension criteria with their answers, the
resulting ratio and band, a justification, and the top improvement; overall
average of the six, one decimal; pass/fail against the reference >= 4 threshold
(an implementation choice); and, below threshold, a proposed revision marked for
human ratification.

Dimension order: scoped, directional, testable, traceable, assignable, riskAware.

## Check rules

- Score each dimension independently with evidence from the Beat Version content.
- Be specific in rationale — cite exact phrases from the Beat Version's title,
  summary, and Scope.
- Compare the Beat Version scope against the parent Beat Coda — does the Beat
  Version carve out a clear subset?
- **The summary describes the increment, not its relationships:** a Beat Version
  summary that enumerates the specific child or pipeline entity instances it
  contains or sits in — its own Revision IDs, sibling Beat Version numbers, or
  the release grouping it ships in — is a Scoped defect; those references drift
  as the graph changes. The parent Beat, target release grouping, and child
  Revisions are tracked as structured relationships, not prose. (Referencing a
  stable knowledge record — e.g. a decision/constraint/context Note ID for
  traceability — is fine and encouraged; that is not a drifting
  pipeline-position relationship.)
- Evaluate Notes for traceability — decisions, constraints, and low-confidence
  context should be recorded. Assumptions count as recorded when they carry an
  explicit validation state; note that the reference implementation has
  deprecated its `assumption` Note type in favor of context/constraint/guidance/
  decision with an unvalidated status, so match whichever convention the system
  of record uses rather than demanding a specific type.
- A Beat Version can score well with zero attached Notes if its summary and
  Scope are precise and self-contained.
- Suggestions must be actionable — "add explicit scope boundaries for what's
  deferred to v2" not "improve scope".
- A baseline Beat Version (v1 representing work that already exists) should be
  evaluated differently: Scoped is less relevant; Traceable and Testable still
  matter.
- This skill assesses; it does not enforce. The first-Revision gate belongs to
  the system of record.
