---
name: coda-quality-check
description: Score a Harmonic Method Coda that has a parent — a Beat's, a System's, or a Portfolio's — across the seven published quality dimensions (Distinctive, Harmonious, Substantial, Durable, Clear, Strategically Aligned, Outcome-Oriented), 1-5 each, with reasoning and improvement guidance. Use when asked to check, grade, or improve a Beat, a System, or a Portfolio.
---

# Coda Quality Check

You are scoring a **Coda that has a parent**, together with the entity carrying
it — a Beat, a System, or a Portfolio. Specs: `specs/coda.yml`, and
`specs/beat.yml`, `specs/system.yml` or `specs/portfolio.yml` for whichever
entity carries the Coda.

This instrument serves the **Composer** — the accountability for architectural
coherence, that the system holds together as one intelligible thing.

The dimension definitions, red flags, scoring scale, and check rules below are
canonical in this repository. Score against them as written; do not paraphrase
them.

## What selects this instrument

The presence of a parent, never the altitude. A Coda with nothing above it is
root, and `root-coda-quality-check` scores it instead — its six dimensions
replace the ones here whose referent is the Coda above, which a root Coda does
not have. That instrument's own account of the split is the fuller one.

So a System Coda is scored here when a Portfolio holds it and there when
nothing does. The entity did not change; its position did.

## One instrument, three altitudes

Every dimension below asks the same question at each altitude, against a
different set of neighbours and a different set of children:

| | Beat | System | Portfolio |
| --- | --- | --- | --- |
| Its siblings | the other Beats in its System | the other children under its Portfolio | the other children under its Portfolio |
| What sits beneath it | Beat Versions | Beats | Systems and Portfolios |
| Its parent | the System's Coda | the Portfolio's Coda | the Portfolio's Coda |

Read "sibling" and "what sits beneath" through that table rather than assuming
one altitude. Where an anchor names a Beat below, it names the Beat case of a
question the other two altitudes are asked in the same words.

## Inputs
The entity's title, Coda, and description. If available: its sibling entities
(for Distinctive and Harmonious), the immediate parent Coda and relevant
ancestors (for Strategically Aligned), and applicable Notes. If sibling or
parent context is unavailable, score from the available evidence and say
which context was missing. Disclose any material context you had to omit.

## Scoring scale

1 = Critical gap — dimension is not addressed at all
2 = Weak — dimension is partially addressed with significant issues
3 = Adequate — dimension is addressed but could be stronger
4 = Strong — dimension is well-addressed with minor room for improvement
5 = Excellent — dimension is exemplary

## The seven dimensions — score each 1-5

1. **Distinctive** (`distinctive`) — Outcome-first, minimal semantic overlap
   with its siblings.
   Red flag: Sounds like a sibling, or describes an activity rather than what
   the entity is for.
2. **Harmonious** (`harmonious`) — Works in concert with its siblings; shares
   cross-cutting Notes and constraints.
   Red flag: Isolated silo with no relationship to the rest of the tree.
3. **Substantial** (`substantial`) — Represents a meaningful whole, not a minor
   task or bug fix.
   Red flag: Could sit inside a sibling rather than stand on its own — a work
   item inside another Beat, a Beat inside another System, a System inside
   another Portfolio.
4. **Durable** (`durable`) — Designed to evolve through what sits beneath it
   toward its resolved Coda, not a one-shot deliverable.
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
   and the Coda still names the same thing. Whoever authorises the work should
   recognise it as what they are getting — a customer, a client, or the
   organisation's own leadership, whether or not money changes hands. Above the
   Beat the outcome is what the grouping exists to produce, which is never the
   sum of its children restated as a list.
   Red flag: Names a step, a technology, or a one-off task rather than a durable
   outcome ("add a webhook handler", "configure the cache cluster", "run the
   onboarding workshop"), or — above the Beat — enumerates what sits beneath
   instead of saying what holding them together achieves. An entity whose
   beneficiary is internal rather than an end user is not penalised for that and
   has no lower ceiling — reliability, scalability and accuracy guarantees are
   outcomes leadership commits to, and a well-framed one scores as highly here as
   any other. Score how the outcome is framed, never who it is for.

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

- **Confirm the Coda has a parent before scoring it.** A Coda with none is root
  and belongs to `root-coda-quality-check`; say so and score nothing rather than
  scoring it here. Two of these dimensions measure service to the Coda above,
  and against an absent parent they do not degrade into a low score — they
  become unanswerable, and an unanswerable dimension averaged in as though it
  were answered produces a number that reads as a judgement and is not one.
- Score each dimension independently with evidence from the entity's content.
- For **Distinctive**, compare the outcomes promised by sibling entities.
  Shared subject matter alone is insufficient evidence of duplication. If
  two siblings promise the same outcome to the people they serve, cite the
  overlapping promise and identify where a clearer boundary would help.
- Report one score per published dimension. If a complete set of scores
  cannot be produced, name the dimensions still unscored and withhold the
  overall score and verdict.
- Be specific in rationale — cite exact phrases from the title/description.
- **Descriptions describe the entity, not its relationships:** a description
  that names the specific child or pipeline entity instances it contains or sits
  in — child Beat Version numbers/IDs, Revision IDs, or the release grouping it
  ships in — is a Clarity AND Durability defect, because those references go
  stale when the relationship graph changes. Those relationships live in
  structured fields, not prose. (Referencing a stable knowledge record —
  a decision/constraint/context Note ID for audit traceability — is fine; that
  is not a drifting pipeline relationship.) This does NOT penalize judging
  Distinctive/Harmonious against the sibling list — those dimensions are graded
  against the provided sibling graph, not against names written into the
  description.
- Suggestions must be actionable — "rewrite the title to lead with the outcome"
  not "improve clarity".
- For **Strategically Aligned**, state which goals of the immediate parent
  the entity serves and cite any applicable constraints or refusals in
  the Coda chain. Use a stated strategy where it is the only available
  alignment context and identify that basis for the score.
- **Terminology (hard requirement):** When suggesting that the entity be broken
  down or that work be planned in stages, name the altitude directly beneath it
  — a Beat decomposes into **Beat Versions**, a System into **Beats**, a
  Portfolio into **Systems** — and NEVER "Revision" for any of them. Revisions
  track individual changes that execute a Beat Version (one per change artifact
  — a pull request, a procedure document, a runbook diff); they are not a
  planning increment at any altitude. Writing "create a Revision" in a quality
  suggestion is always wrong. Naming the wrong altitude's child is the same
  error one level up: a System does not decompose into Beat Versions.
- Score the entity as written; do not silently assume missing context.
- Never raise a score because the intent seems good — Clear means written-down
  clear.
- **Name the version you scored against.** Read `spec_version` from
  `specs/spec-set.yml` and report it with the result. A score is a claim about an
  entity measured against a rubric, and rubrics move — without the version a
  later reader cannot tell whether the score predates the definitions that
  produced it, and two scores cannot be compared at all. If the spec set is not
  available to you, say the version is unknown rather than guessing or omitting
  it: an unversioned score is usable now and worthless later. Do not copy the
  version into this file or any other — read it where it lives.
- **Name the altitude you scored.** A score carries the entity it judged, and
  the same seven dimensions asked of a Portfolio and of a Beat are not
  interchangeable results. Report which one it was.
- This skill assesses; it does not enforce. Gates, approvals, and recorded
  lineage are the responsibility of the system of record.
