---
name: coverage-reading
description: Read a whole system rather than one entity — which parts of the system Coda have no capability serving them, which capabilities cover ground already taken, and which sit outside the Coda entirely. Use when asked whether a set of Beats hangs together, where there is room for more, or why a system nobody can explain still works.
---

# Coverage Reading

You are reading a **set**, not an entity. Every other instrument here takes one
Beat, one plan, or one chain; this one takes the system Coda and every Beat
beneath it, and reports how the ground is covered.

This serves the **Composer**, whose stated failure is exactly this shape: the
system still functions and nobody can explain it as a whole, capabilities
overlap, boundaries blur, and every new piece of work needs archaeology before
it can start. No per-entity score detects that — a set of individually excellent
Beats can be an unnavigable system.

**This defines nothing new.** Two dimensions published in
`skills/beat-coda-quality-check/SKILL.md` already carry everything needed:
*Distinctive*, which is about overlap with sibling Beats, and *Strategically
Aligned*, which is about serving the Coda above. Read that file for what they
mean. This instrument applies them across the set instead of one at a time, and
adds no dimension, no scale, and no threshold of its own.

## Inputs

The system Coda, and every Beat beneath it with its own Coda and description.
Notes and Beat Versions where available — a Beat's steps often reveal what it
actually covers, which its description may not.

Say what you did not have. A reading over some of the Beats is a reading of that
subset, and should say so rather than presenting itself as a reading of the
system.

## Start with the Coda, decomposed

Break the system Coda into its separable claims — the distinguishable things
that would each have to be true for it to be satisfied. Do this before looking
at any Beat, so the shape of the outcome is not fitted to the work that exists.

Then map each Beat to the claims it serves. That mapping is the reading, and
three things fall out of it.

## What the mapping shows

**A claim with no Beat.** Located white space: ground the outcome promises and
nothing currently covers. Say which claim, and say what a capability serving it
would have to do.

Not automatically work. A claim may be deliberately unserved — too early, owned
elsewhere, or waiting on something. Report it as a gap and let a person say
which.

**A claim with several Beats.** Where overlap pressure lives. Read those Beats
against *Distinctive* as published and say whether they genuinely divide the
claim between them or duplicate it. Two Beats on one claim is common and often
correct; two Beats saying the same thing in different words is the boundary
problem.

**A Beat serving no claim.** The most informative finding, and the most often
misread. It means one of two things and you should say which you think it is:

- the Beat does not belong to this system, or
- **the Coda is behind the system** — the work has moved and the outcome was
  written once.

The second is far more common in a system that is still growing. Report it as a
finding about the pair rather than about the Beat, the way the reconciliation
instrument reports a child claiming ground its parent does not: the repair may
be to widen the Coda, and that is a person's decision.

## Do not report a capacity

Never say how many more Beats would fit. It is the number everyone wants and it
cannot be honestly produced: it depends on where the boundary is drawn, and the
boundary is a sentence somebody can edit. A capacity figure is also the one
output that would be gamed, because widening the Coda raises it without a single
capability being added.

Report where the space is, not how much. "Nothing serves the third claim" is
actionable. "Room for four more Beats" is an invitation to fill it.

## If a vector reading is available

Where the adopter has embeddings for their Coda and Beats, `examples/coverage/`
shows the same reading done arithmetically — one ranking by distance from the
Coda, one by distance to the nearest sibling. Use it as a second opinion, never
as the answer.

**Where the two disagree, say so and say which you trust.** They fail
differently, and the disagreement is the most useful thing either produces:

- Cosine similarity measures topical proximity, not service. A Beat can serve an
  outcome in entirely different vocabulary and look distant; a Beat can be
  lexically close and strategically irrelevant. You can read entailment and the
  arithmetic cannot.
- You gloss. Two Beats that read differently can cover identical ground, and
  arithmetic notices the overlap you talked yourself past.

A measure also names what produced it. If you report a number from a vector
reading, name the model and dimension it came from, the way a score names the
spec set version — a distance from one model is not comparable with a distance
from another.

## Output format

- **Claims of the Coda**, each with the Beats serving it, in the Coda's own
  order. Empty claims marked.
- **Findings**, most consequential first: unserved claims, duplicated ground,
  and Beats outside the Coda — each naming the entities involved, citing the
  text that decided it, and saying what would resolve it.
- **What you could not determine**, listed separately with the input missing.
- Where a vector reading was used: the model and dimension, and every place the
  two readings disagreed.

## Working rules

- Restate no dimension, anchor, red flag or threshold. Read the published
  instrument and follow it as written; if this file and that one ever disagree,
  that one wins.
- Report structure, never a count of remaining capacity.
- A Beat outside the Coda is a finding about the pair. Do not recommend deleting
  a Beat because an outcome written a year ago does not mention it.
- One system per reading. A reading across two systems averages away the
  boundary that makes each of them a system.
- An unanswered question is `cannot-determine`, never a pass. A claim you could
  not tell was served is not a claim that is served.

## What this is not

This reads and reports. It records nothing, gates nothing, and orders no work —
whether a gap gets filled, and whether a Coda gets widened, belongs to the
people accountable for the system. Say that when you hand the reading over. A
coverage reading presented as a backlog is the fastest way to turn a diagnosis
into busywork.
