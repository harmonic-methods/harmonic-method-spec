---
name: beat-version-composing
description: Draft a conformant Harmonic Method Beat Version — a planned step in a Beat's evolution — from a description of what should happen next, score the draft against the published plan-quality rubric, and revise it from that score and from the author's feedback until they are satisfied. Use when asked to plan, scope, or draft a Beat Version, a step, or an increment of a capability that already exists as a Beat.
---

# Beat Version Composing

You are drafting a **Beat Version** — a planned, bounded step in an existing
Beat's evolution toward its Coda — from whatever the person in front of you can
already say about what should happen next. Spec: `specs/beat-version.yml`.

This serves the **Orchestrator** — the accountability that work moves:
sequencing, coordination, and the handoffs between everyone and everything
doing it.

**Read the spec before drafting.** It carries the fields, which are required,
the lifecycle values, and the rules. This file does not restate any of them,
deliberately: a second copy of a field list is a copy that goes stale, and the
spec is the source. If the spec and this file ever disagree, the spec wins.

This produces a draft. It records nothing, gates nothing, and scores nothing
that anyone else can see — see **What this is not** at the end, and say so to
the person you hand the draft to.

## Inputs

**A Beat that already exists**, unlike the sibling instrument that drafts one
from nothing. `specs/beat.yml` and the reference gate on it both assume a Beat
is decomposed into steps only once it stands on its own — if no Beat exists
yet, or it has never been scored, say so and point at
`skills/beat-composing/SKILL.md` rather than drafting a step for a capability
that is not yet settled. Drafting a good step on top of an unstable Beat
inherits the instability; fixing the Beat is not this instrument's job.

Beyond that: whatever exists. A sentence about what should happen next is
enough to start asking about. Useful when available: the Beat's Coda and
description, its sibling Beat Versions — delivered, active, and withdrawn — so
you know what ground is already covered and what remains, and any Notes
already attached to the Beat (constraints and decisions matter most here).

You do **not** need a file tree, a repository, or any tooling. The medium may
be software, an operational process, or an organizational practice, and
nothing here may assume code.

## What you produce

A Beat Version, conformant to the spec, in whatever encoding the person is
using — the spec defines none. Plus a score and the reasoning behind it, from
the published rubric rather than from your own judgement.

The summary and scope you draft are the plan, not a pointer to one kept
elsewhere. `skills/beat-version-quality-check/SKILL.md` scores them as the
canonical source of what gets done — never against an external task list, a
work-item breakdown, or a ticket tracker — so a draft that says "see the ticket
for details" has not drafted a plan.

## Drafting order

**Read the gap before writing the step.** Look at the Beat's Coda and its
existing Beat Versions together, and find what stands between where the Beat
is now and its resolved state. A step drafted without this is easy to write
and easy to get wrong: it slices off whatever is easiest to describe rather
than whatever closes the most ground.

1. **Say what this step delivers, as a step toward the Coda, not as work.**
   Draft the summary so that a reader who has never seen the Beat can tell
   what becomes true once this ships, and why that particular thing was chosen
   next. If the connection to the Coda takes explaining, the step is probably
   not the highest-impact one available.
2. **Draw the boundary before describing the work inside it.** Say what is in
   scope and, just as plainly, what is deferred. A scope that only lists
   inclusions is not a boundary — it is a description with no edges, and
   nothing stops the next person from reading their own work into it.
3. **State how it would be checked, not just what it does.** Write acceptance
   criteria a person who did not write the plan could act on directly. If the
   only way to know this step is finished is to ask its author, it is not
   finished being planned yet.
4. **Size it to one owner.** A step for one person or pair, deliverable in
   roughly one to two weeks, is the target. If the draft does not fit, split
   it into more than one step rather than shrinking the boundary to fit a
   size — a boundary drawn to hit a duration rather than to cohere is the same
   defect as one with no edges, arrived at from the other direction.
5. **Put what could go wrong in the open.** An assumption nobody has tested, a
   dependency on something not yet built, a decision made informally — name
   each one plainly in the summary or as a Note, rather than letting it stay
   something only you know. A plan that scores well everywhere else and hides
   its landmines is more dangerous than one that shows them.
6. **Leave the how out of scope where it belongs to a Revision.** The plan
   says what this step delivers and how it would be verified, not the literal
   sequence of changes that will execute it — that is a Revision's to carry,
   later, possibly more than one. If the draft is naming which pull request or
   commit does which part, it has started writing the Revision rather than
   the step.
7. **Name knowledge, not position.** A decision or constraint Note is worth
   citing for traceability. A specific Revision id, a sibling Beat Version
   number, or the release grouping this ships in is not — those drift as the
   graph changes, and the summary is not the place structured relationships
   belong.

**If what is being asked for is a record of work that already happened**, this
is not a Beat Version to draft. `specs/downbeat.yml` is explicit that a
Downbeat "is not a Beat Version" and "records what was true, not what is
intended" — a baseline is exactly that record, and belongs to
`skills/downbeat-taking/SKILL.md`, not here. Say so, and point at that
instrument instead of drafting a plan for something that has already
happened.

## Asking rather than assuming

You will be short of facts. Two moves are legitimate and one is not.

Ask, when the answer changes the draft and the person can give it: what
acceptance looks like, who would own this and for how long, what is
deliberately being deferred to a later step. Batch these — a list of
questions is easier to answer than an interrogation.

Mark it unresolved, when the answer is not available yet: write the assumption
into the draft in plain words, flagged, so a reader meets it where it matters
— an untested assumption about load, a dependency on work not yet started, a
sizing guess nobody has validated. An assumption a reader can see is a
question that has been asked.

Do not invent. A confident acceptance criterion for a capability you have not
seen, or a boundary drawn to sound complete rather than because you were told
where it falls, is the one failure this instrument can introduce into a plan
whose whole purpose is that someone else can act on it without asking you what
you meant. If you do not know, one of the two moves above applies.

## Scoring the draft

Score the finished draft with **`skills/beat-version-quality-check/SKILL.md`**
— read that file and follow it as written. Do not reproduce its dimensions,
its anchors, or its thresholds here, and do not score from memory of them. It
is canonical; this file is not, and a score produced from a paraphrase does
not mean what a score means anywhere else.

Report the result it tells you to report. The reference implementation gates
the first Revision on a passing score here — an implementation choice, not a
method requirement, but reason enough to take the score seriously before
handing the draft on.

## Revising the draft

A draft you cannot argue with is not much use, so this instrument revises. Two
loops, with different limits, and the difference between them is the point.

**Your own loop is bounded at one.** Take the single improvement the score
identifies, apply it, score again, and show what moved. Then stop revising on
your own initiative. A draft iterated until it scores well against a rubric
the same agent is applying measures the agent, not the plan — the number goes
up and nothing has been learned.

**The person's loop is not bounded.** Once they have the draft and the score,
revise as many times as they direct. They are the authority on the work and
you are not; a limit on their iteration would be this instrument overruling
the person it exists to serve. After each revision, re-score and report what
changed — including anything that got worse, because a change that lifts one
dimension often costs another, and they should see that rather than discover
it.

Where their instruction and the score disagree, follow the person and say
plainly that you did, naming the dimension it costs. They may know something
the rubric cannot see. What you must not do is quietly split the difference,
which leaves a draft that satisfies neither and a record of why that satisfies
nobody.

If a dimension resists two revisions, say so and stop rewording it. A
dimension that will not lift is usually the wrong shape of step rather than a
sentence in the wrong order, and that is redrawn by a person, not reworded by
you.

**This revises a draft, not a record.** While the step is still shaping and
nothing has shipped against it, redraft freely. Once a Revision has delivered
against it, rewriting the summary or scope to say something different from
what the work was actually held to is the same failure `specs/revision.yml`
already names for an orphaned change: it makes the record say something that
was not true at the time. If you are handed a Beat Version with delivered
Revisions and asked to change what it planned, say that this instrument
drafts and does not amend records, and that a new Beat Version is usually the
right vehicle for what comes next.

## Output format

- The Beat Version, ready to be pasted or saved as it stands.
- Every assumption you marked, as a list, each phrased as the question a
  person could answer.
- The score, exactly as the quality instrument specifies it, including the
  spec set version it requires you to report.
- What changed at each revision and what it cost, in a sentence each — yours
  and theirs alike, so the sequence of the draft is legible without
  re-reading it.

## Working rules

- Read `specs/beat-version.yml` in the version you are working against. Do
  not rely on this file for what a Beat Version contains.
- Restate no dimension, anchor, red flag, or threshold from the quality
  instrument. Point at it.
- Nothing here is medium-specific. If a draft assumes a codebase, a ticket, or
  a deployment, and the person never said so, that is an invention.
- One Beat Version per run. Two steps in one draft is the boundary problem
  this instrument exists to surface, not an efficiency.
- Never name a specific Revision id, sibling Beat Version number, or release
  grouping in the summary or scope — cite a knowledge Note instead. The
  quality instrument scores the first as a defect, and drafting it in is
  handing the person a score you could have avoided costing them.
- Never set a status other than what `specs/beat-version.yml` permits, and
  never invent an identifier scheme — ask what the person uses, or leave the
  field marked.

## What this is not

This drafts and assesses. It does not record, gate, or approve anything, and
the score it reports is not a Check that anyone else can rely on — there is no
audit trail, and nothing here can tell whether a score predates the plan it
judged. Those belong to a system of record. Say this when you hand over the
draft; a score presented as more than it is, is worse than no score.
