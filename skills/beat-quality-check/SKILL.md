---
name: beat-quality-check
description: Score a Harmonic Composition Beat across the seven published quality dimensions (Distinctive, Harmonious, Substantial, Durable, Clear, Strategically Aligned, Business Outcome), 1-5 each from binary criteria, with reasoning and improvement guidance. Use when asked to check, grade, or improve a Beat.
---

# Beat Quality Check

You are scoring a **Beat** — the Harmonic Composition unit of durable capability —
against the published rubric. Spec: `specs/beat.yml` (v1.1.0).

The dimension definitions, red flags, and check rules below follow the
reference implementation's canonical rubric for a Beat's *definition*, named
`beat_coda_quality`. Score against them as written; do not paraphrase them.

**The scoring method below is the kit's own, and is ahead of canonical.** The
reference implementation still asks the model for a per-dimension number
directly. Its decision record commits to criteria-based scoring, but that has
not shipped. See `notes/criteria-scoring-is-kit-originated.yml`.

**On the name.** That rubric was `beat_quality` until the reference
implementation renamed it for what it grades. The plain name has been reclaimed
for a different check — a *realization* reading that asks whether the capability
is actually so, not whether it is well defined. This skill mirrors the
definition check only. When reconciling against canonical, read
`beat_coda_quality`; reading `beat_quality` now gets you the wrong rubric.

## Inputs
The Beat's title, Coda, and description. If available: its sibling Beats (for
Distinctive and Harmonious), the parent system/organization Coda (for
Strategically Aligned), and any Notes attached to the Beat. If siblings or
parent Coda are unavailable, score those dimensions from the Beat alone and say
the context was missing.

## Scoring: answer criteria, compute the band

Do not pick a number. "Score this 1-5" is read differently by different models —
and by the same model twice — so a holistic band cannot carry the kit's Coda,
which is that a 4 here means a 4 there. You answer factual questions; arithmetic
produces the score.

This is a deliberate divergence from the reference implementation, which still
asks its model to name the number. Canonical's own decision record
(`N-4E09-3024`) reaches the same conclusion and specifies the same mapping; the
kit has adopted it first. A band produced here is therefore not
reproducible against a canonical check run today.

For each dimension:

1. Derive 3-4 binary criteria from that dimension's definition and red flag
   below. Each must be factual and observable in the Beat as written —
   answerable by anyone reading the same text, not a matter of taste.
2. Answer each YES, NO, or CANNOT_DETERMINE. Use CANNOT_DETERMINE only when the
   input needed is genuinely absent (no sibling Beats supplied, no parent Coda),
   never when the answer is merely unflattering.
3. Take the success rate over the criteria you could answer:
   `ratio = yes / (yes + no)`. CANNOT_DETERMINE is excluded from the
   denominator — it neither helps nor hurts — and is reported separately.
4. Map the ratio to the dimension's band:

       ratio < 0.20 → 1        ratio < 0.60 → 3        ratio >= 0.80 → 5
       ratio < 0.40 → 2        ratio < 0.80 → 4

Report the criteria and their answers alongside the band. The trace is the
evidence: a band with nothing behind it is the holistic guess this method
exists to remove.

The kit publishes the method and the dimension definitions the criteria are
derived from, not a fixed criteria list. Two runs may therefore phrase criteria
differently while landing on the same band — the dimension definitions and the
band mapping are what must agree. Should the reference implementation ship its
own per-dimension criteria wording, that wording will still not be mirrored
here: it is authored against its own entities, and this kit is a translation.

## What a band means

1 = Critical gap — dimension is not addressed at all
2 = Weak — dimension is partially addressed with significant issues
3 = Adequate — dimension is addressed but could be stronger
4 = Strong — dimension is well-addressed with minor room for improvement
5 = Excellent — dimension is exemplary

## The seven dimensions — score each 1-5

1. **Distinctive** (`distinctive`) — Outcome-first, minimal semantic overlap
   with sibling Beats.
   Red flag: Sounds like another Beat, or describes an activity rather than a
   capability.
2. **Harmonious** (`harmonious`) — Works in concert with other Beats; shares
   cross-cutting Notes and constraints.
   Red flag: Isolated silo with no relationship to the rest of the system.
3. **Substantial** (`substantial`) — Represents a meaningful capability, not a
   minor task or bug fix.
   Red flag: Could be a work item inside another Beat instead of its own Beat.
4. **Durable** (`durable`) — Designed to evolve through Beat Versions toward its
   resolved Coda, not a one-shot deliverable.
   Red flag: No room for progressive delivery; fully defined in a single pass;
   or the description is pinned to specific child/pipeline entity instances
   (named Beat Versions, Revision IDs, or the release grouping it ships in)
   instead of the durable capability — such references go stale as the
   relationship graph changes (a knowledge Note ID cited for audit traceability
   is fine — that is not a drifting relationship).
5. **Clear** (`clear`) — A human reads the title and description and immediately
   understands the value.
   Red flag: Jargon-heavy, ambiguous scope, missing "why", or names specific
   child/related entity instances (Beat Version numbers, Revision IDs, or
   release grouping names) that belong in structured relationships rather than
   the description (a knowledge Note ID cited for audit traceability is fine).
6. **Strategically Aligned** (`strategicallyAligned`) — Serves the direction set
   by the Coda above it (in the reference implementation, the project's stated
   strategy).
   Red flag: Nice-to-have that doesn't connect to stated objectives.
7. **Business Outcome** (`businessOutcome`) — Expressed at VP/CFO/board level —
   the outcome survives any implementation rewrite and justifies a standalone
   budget line item. Infrastructure and platform quality Beats (reliability, scalability,
   accuracy guarantees) are a valid distinct category: their buyer is internal
   leadership rather than an end user, so a score of ~3/5 is an expected and
   acceptable floor for this class — it signals indirect value, not a quality
   defect. Do not suggest restructuring or folding an infrastructure Beat into
   another Beat.
   Red flag: Describes a specific implementation step, technology, or one-off
   internal task rather than a durable business outcome (e.g. "add Stripe
   webhook handler", "configure Redis cluster"). When a Beat covers
   infrastructure or platform quality and scores ~3/5, this is expected — do NOT
   recommend restructuring, folding it into another Beat, or converting it to a
   constraint Note, as those remedies destroy audit traceability for a
   legitimate category of work.

## Output format

For each dimension: the criteria with their YES / NO / CANNOT_DETERMINE
answers, the resulting ratio and band, a one-sentence justification, and (for
any band below 5) the single most useful improvement. Then:

- **Overall**: average of the seven, one decimal.
- **Verdict**: the reference implementation treats >= 4 as passing; report
  pass/fail against that threshold and note it is an implementation choice.
- **Rewrite offer**: if the overall is below 4, propose a revised title, Coda,
  and description that would pass — clearly marked as a proposal for a human to
  ratify, never an automatic replacement.

## Check rules

- Score each dimension independently with evidence from the Beat content.
- Be specific in rationale — cite exact phrases from the Beat title/description.
- **Descriptions describe the entity, not its relationships:** a Beat
  description that names the specific child or pipeline entity instances it
  contains or sits in — child Beat Version numbers/IDs, Revision IDs, or the
  release grouping it ships in — is a Clarity AND Durability defect, because
  those references go stale when the relationship graph changes. Those
  relationships live in structured fields, not prose. (Referencing a stable
  knowledge record —
  a decision/constraint/context Note ID for audit traceability — is fine; that
  is not a drifting pipeline relationship.) This does NOT penalize judging
  Distinctive/Harmonious against the sibling Beats list — those dimensions are
  graded against the provided sibling graph, not against names written into the
  description.
- Suggestions must be actionable — "rewrite the title to lead with the outcome"
  not "improve clarity".
- If a parent Coda or stated strategy is provided, Strategically Aligned must
  reference its specific goals.
- If no parent Coda or strategy exists, score Strategically Aligned as 3 with a
  suggestion to define one.
- **Terminology (hard requirement):** When suggesting that a Beat should be
  broken into increments or that work should be planned in stages, always use
  "Beat Version" — NEVER "Revision." Revisions track individual changes that
  execute a Beat Version (one per change artifact — a pull request, a procedure
  document, a runbook diff); Beat Versions are the shippable planning increments
  of a Beat. Writing "create a Revision" in a Beat quality suggestion is always
  wrong.
- Score the Beat as written; do not silently assume missing context.
- Never raise a score because the intent seems good — Clear means written-down
  clear.
- This skill assesses; it does not enforce. Gates, approvals, and recorded
  lineage are the responsibility of the system of record.
