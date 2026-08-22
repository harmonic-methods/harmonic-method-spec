---
name: coda-alignment-check
description: Reconcile a Harmonic Method Coda chain — whether each Coda still serves the one above it, is written as a resolved state, is reachable, and has moved since it was last anchored. Reports findings, not a score. Use when asked whether intent and reality still agree, to check alignment or harmonization, or before relying on a Coda that has not been read in a while.
---

# Coda Alignment Check

You are reconciling a **Coda chain** against what is actually true. Specs:
`specs/coda.yml`, `specs/downbeat.yml`.

This instrument serves the **Conductor** — the accountability that decisions
stay in force. The other two published instruments ask how well something is
*written*: `beat-coda-quality-check` grades a capability's definition, and
`beat-version-quality-check` grades a plan. This one asks a different kind of
question: **is what we decided still true?** Answer it factually. Do not
convert it into a score.

## Inputs

The Coda being checked and every Coda above it, up to the root. Also, when
available: the entity the Coda belongs to (its title and description), its
sibling Codas, the Notes attached to that entity, and the most recent Downbeat
taken on it.

Say which inputs were missing. A check you could not perform is
`cannot-determine`, never `pass` — an unanswered question reported as agreement
is the failure this instrument exists to prevent.

## The checks

Answer each **pass**, **diverged**, or **cannot-determine**, and cite the exact
text that decided it.

1. **Chain resolves** — every `parent` reference in the chain points at a Coda
   that exists.
   Diverged when: a parent names a Coda that cannot be found, or the chain
   loops.

2. **Child serves parent** — achieving the child's resolved state advances the
   parent's.
   Diverged when: the child could be fully achieved and leave the parent no
   closer. State which clause of the parent goes unserved.

3. **Parent covers child** — the child claims no ground the parent does not.
   Diverged when: the child promises something outside the parent's stated
   scope. This is the mirror of check 2 and catches the opposite error: a
   capability that has outgrown the altitude it sits at. Report it as a finding
   about the pair, not about the child — the correct repair may be to widen the
   parent.

4. **Resolved state, not a plan** — each Coda states where the entity has
   arrived, not what will be done to get there.
   Diverged when: it reads as a task list, a sequence, or a set of
   deliverables. Steps belong to a Beat Version.

5. **Specific enough to judge against** — each Coda can settle whether a given
   piece of work advances it.
   Diverged when: it would accept any work in its general direction. A Coda
   nothing can fail is not a Coda.

6. **Nothing recorded contradicts it** — no constraint, decision, or deferral
   attached to the entity makes part of the Coda unreachable.
   Diverged when: a Note rules out something the Coda promises. Name both. This
   is the most commonly missed divergence: the Coda and the Note were each
   correct when written, and no one read them together afterward.

7. **Unmoved since it was anchored** — if a Downbeat exists, the Coda has not
   changed since the reading was taken.
   Diverged when: the anchored record of the Coda differs from the Coda now.
   That is drift, and it means every convergence reading taken against the old
   statement measures progress toward something no longer intended.
   Cannot-determine when: no Downbeat exists. Say so — an unanchored Coda has
   no drift because nothing has been measured, which is not the same as being
   current.

8. **Decisions still in force** — the decisions the Coda rests on have not been
   superseded without it being revisited.
   Diverged when: a Note supersedes another that the Coda depended on, and the
   Coda still reflects the superseded position.

9. **Coda still describes its entity** — the Coda covers what the entity has
   actually become, not only what it was when the Coda was written.
   Diverged when: the entity now delivers something its own Coda does not
   promise. Checks 2 and 3 compare a Coda against the Coda above it, which
   cannot see this: a Coda can serve its parent perfectly and still have been
   outgrown by the work beneath it. Read the entity's description and its Beat
   Versions, not only its Coda. This is the most likely divergence in a system
   that is still growing, because a Coda is written once and the work keeps
   arriving.

## Output format

- **Findings**, most consequential first. For each: the check, its answer, the
  entities involved, the text that decided it, and what would resolve it.
- **Cannot-determine**, listed separately with the input that was missing.
- **Clean chain** — if nothing diverged, say so plainly and name how many checks
  ran. Do not manufacture a finding to appear thorough.

Report no overall band, percentage, or average. Alignment does not aggregate: a
chain with one broken link is broken, and a summary number would hide which link.
This is the same reason a single convergence reading across a portfolio was
rejected — averaging conceals the only thing worth knowing.

## Check rules

- Cite text. A finding without the phrase that produced it cannot be checked by
  the person receiving it.
- Judge the Coda as written, not as intended. If the intent is evident but
  absent from the text, that is a check 5 finding.
- A Coda you would have written differently is not a finding. Only report
  divergence against the parent, the record, or the anchor.
- Read Notes before reporting check 2 or 3. A child that looks unserving often
  has a constraint explaining why, and a Coda that looks over-claiming often has
  a decision deferring the part in question — which is a check 6 finding instead.
- When check 2 and check 3 both diverge on the same pair, report once and say the
  altitude is wrong: the child neither serves nor fits its parent.
- Prefer naming the repair over prescribing it. Widening a parent Coda and
  narrowing a child are both legitimate answers to the same finding, and which
  is right depends on judgment the reader has and you do not.
- **Name the version you reconciled against.** Read `spec_version` from
  `specs/spec-set.yml` and report it with the findings. A finding set is a claim
  about a chain measured against these checks, and the checks move — this
  instrument has already gained one since it was published, so a finding set with
  no version attached cannot be told apart from one produced against a shorter
  list. If the spec set is not available to you, say the version is unknown rather
  than guessing or omitting it. Do not copy the version into this file or any
  other — read it where it lives.
- This skill assesses; it does not enforce, and it records nothing. A reconciled
  chain is a reading taken at a moment, not a durable claim — the durable record
  of one is a Downbeat.
