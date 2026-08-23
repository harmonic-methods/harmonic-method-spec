---
name: beat-coda-quality-check
description: Score a Harmonic Method Beat across the seven published quality dimensions (Distinctive, Harmonious, Substantial, Durable, Clear, Strategically Aligned, Outcome-Oriented), 1-5 each, with reasoning and improvement guidance. Use when asked to check, grade, or improve a Beat.
---

# Beat Quality Check

You are scoring a **Beat** — the Harmonic Method's unit of durable capability —
against the published rubric. Spec: `specs/beat.yml`.

This instrument serves the **Composer** — the accountability for architectural
coherence, that the system holds together as one intelligible thing.

The dimension definitions, red flags, scoring scale, and check rules below are
canonical in this repository. Score against them as written; do not paraphrase
them.

## Inputs
The Beat's title, Coda, and description. If available: its sibling Beats (for
Distinctive and Harmonious), the parent system/portfolio Coda (for
Strategically Aligned), and any Notes attached to the Beat. If siblings or
parent Coda are unavailable, score those dimensions from the Beat alone and say
the context was missing.

## Scoring scale

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
7. **Outcome-Oriented** (`outcomeOriented`) — Stated as the outcome someone
   commits to, not as the work that produces it. The outcome survives any change
   of implementation: rewrite the system, replace the procedure, retire the tool,
   and the Beat still names the same thing. Whoever authorises the work should
   recognise it as what they are getting — a customer, a client, or the
   organisation's own leadership, whether or not money changes hands.
   Red flag: Names a step, a technology, or a one-off task rather than a durable
   outcome ("add a webhook handler", "configure the cache cluster", "run the
   onboarding workshop"). A Beat whose beneficiary is internal rather than an end
   user is not penalised for that and has no lower ceiling — reliability,
   scalability and accuracy guarantees are outcomes leadership commits to, and a
   well-framed one scores as highly here as any other. Score how the outcome is
   framed, never who it is for.

## Output format

For each dimension: score, one-sentence justification, and (for any score below
5) the single most useful improvement. Then:

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
