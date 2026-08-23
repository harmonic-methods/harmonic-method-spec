---
name: beat-composing
description: Draft a conformant Harmonic Method Beat and its Coda from a plain description of a capability, then score the draft against the published Beat rubric and report what would raise it. Use when asked to compose, write, draft, create, or start a Beat — or when someone has described something they want to build and needs it expressed as a capability rather than a task.
---

# Beat Composing

You are drafting a **Beat** — a durable capability — and the **Coda** it serves,
from whatever the person in front of you can already say about it. Specs:
`specs/beat.yml` and `specs/coda.yml`.

This serves the **Composer** — the accountability for architectural coherence:
what the system is for, what belongs inside it, and where its boundaries fall.

**Read the two specs before drafting.** They carry the fields, which are
required, the lifecycle values, and the rules. This file does not restate any of
them, deliberately: a second copy of a field list is a copy that goes stale, and
the specs are the source. If a spec and this file ever disagree, the spec wins.

This produces a draft. It records nothing, gates nothing, and scores nothing
that anyone else can see — see **What this is not** at the end, and say so to
the person you hand the draft to.

## Inputs

Whatever exists. A paragraph is enough; a sentence is usually enough to start
asking about. Useful when available: what the system as a whole is for, the
Coda the new one should ladder to, sibling Beats already defined, and any
constraints or decisions already recorded as Notes.

You do **not** need a file tree, a repository, or any tooling. The medium may be
software, an operational process, or an organizational practice, and nothing
here may assume code.

## What you produce

A Beat and its Coda, conformant to the two specs, in whatever encoding the
person is using — the specs define none. Plus a score and the reasoning behind
it, from the published rubric rather than from your own judgement.

## Drafting order

**The Coda first, always.** `specs/coda.yml` carries a rule that a Beat without
a Coda cannot be decomposed, so a Beat drafted before its Coda is a Beat you
cannot take the next step on. Writing it first also does the harder work early:
most descriptions of a capability are descriptions of an activity, and you find
that out when you try to state the resolved end of it.

1. **Separate the outcome from the activity.** Ask what is true once this has
   succeeded, and keep asking until the answer is a state rather than a set of
   steps. "Approvals are faster" is a direction. "Every estimate a client
   receives is approved or declined in one place, with who decided and when
   recorded against the engagement" is a resolved state. The second can settle
   whether a given piece of work advances it; the first cannot.
2. **Ladder it.** Point the Coda at the one above it. If you were not given a
   parent, say so in the draft rather than inventing one — an unladdered Coda is
   an honest gap, and a fabricated parent is a false record.
3. **Name the capability, not the work.** The title says what the system can do,
   in words a person paying for it would recognize. "Fix approvals" is a task and
   dates immediately; "Client estimate approval" is a capability and survives
   every change to how it works.
4. **Draw the boundary.** What is inside this capability, what is next to it, and
   what belongs to a neighbour. Say what it excludes — a Beat that excludes
   nothing usually has swallowed one beside it.
5. **Leave the steps out.** How it gets built is a Beat Version, later. If your
   draft contains a sequence, you are writing the plan and not the capability.

## Asking rather than assuming

You will be short of facts. Two moves are legitimate and one is not.

Ask, when the answer changes the draft and the person can give it: the parent
outcome, where the boundary falls against an existing capability, who the
capability is for. Batch these — a list of questions is easier to answer than an
interrogation.

Mark it unresolved, when the answer is not available yet: write the assumption
into the draft in plain words, flagged, so a reader meets it where it matters.
An assumption a reader can see is a question that has been asked.

Do not invent. A confident sentence about a system you have not seen is the one
failure this instrument can introduce into a record whose whole purpose is that
things are recoverable later. If you do not know, one of the two moves above
applies.

## Scoring the draft

Score the finished draft with **`skills/beat-coda-quality-check/SKILL.md`** —
read that file and follow it as written. Do not reproduce its dimensions, its
anchors, or its thresholds here, and do not score from memory of them. It is
canonical; this file is not, and a score produced from a paraphrase does not
mean what a score means anywhere else.

Report the result it tells you to report. Then take the single improvement it
identifies, apply it, and score once more so the person sees what changed. Stop
after that second pass — a draft iterated until it scores well against a rubric
an agent is also applying is measuring the agent, not the Beat. What remains is
for a person to answer.

If the draft scores poorly on the same dimension twice, say so plainly and say
what you think is missing. That is usually a sign the capability is drawn at the
wrong altitude, and a person needs to redraw it rather than a rewording fixing
it.

## Output format

- The Coda, then the Beat, ready to be pasted or saved as they stand.
- Every assumption you marked, as a list, each phrased as the question a person
  could answer.
- The score, exactly as the quality instrument specifies it, including the spec
  set version it requires you to report.
- What changed between the first and second pass, in a sentence.

## Working rules

- Read `specs/beat.yml` and `specs/coda.yml` in the version you are working
  against. Do not rely on this file for what a Beat contains.
- Restate no dimension, anchor, red flag, or threshold from the quality
  instrument. Point at it.
- Nothing here is medium-specific. If a draft assumes a codebase, a ticket, or a
  deployment, and the person never said so, that is an invention.
- One Beat per run. Two capabilities in one draft is the boundary problem this
  instrument exists to surface, not an efficiency.
- Never set a status other than what `specs/beat.yml` permits, and never invent
  an identifier scheme — ask what the person uses, or leave the field marked.

## What this is not

This drafts and assesses. It does not record, gate, or approve anything, and the
score it reports is not a Check that anyone else can rely on — there is no audit
trail, and nothing here can tell whether a score predates the text it judged.
Those belong to a system of record. Say this when you hand over the draft; a
score presented as more than it is, is worse than no score.
