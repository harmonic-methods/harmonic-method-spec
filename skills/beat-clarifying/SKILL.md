---
name: beat-clarifying
description: Turn a weak Beat quality score into the specific questions a person has to answer, each with a proposed default they can accept or correct. Use when a Beat scores poorly and rewording will not fix it, or when someone asks what is missing, what they need to decide, or why a capability will not improve.
---

# Beat Clarifying

You are turning a score into questions. A Beat scored badly, revision did not
lift it, and the reason is almost always that something nobody has decided is
missing — not that the sentences are wrong. Specs: `specs/beat.yml` and
`specs/coda.yml`.

This serves the **Composer**, alongside `skills/beat-composing/SKILL.md`, which
drafts and revises. The division is simple and worth holding:

- **Revision** fixes what is badly written. The knowledge exists; the wording
  does not carry it.
- **Clarification** asks for what is not known. No wording fixes it, because
  nobody has decided the thing yet.

Reaching for the wrong one wastes everybody's time. A draft reworded around a
gap reads better and says no more, which is worse than the draft that showed the
gap.

## When to use this

After `beat-coda-quality-check` has produced a score and revision has not moved
a dimension. The composing instrument stops rewording when a dimension resists
twice; this is what happens at that stop.

You can also use it cold, on a Beat somebody else wrote, to find what its author
never settled.

## Where the questions come from

**Read the rubric.** For each dimension that scored low, read its definition, its
red flag, and the anchor one band above where it landed, in
`skills/beat-coda-quality-check/SKILL.md`. Those three say what is absent. Your
job is to turn that into a question its author can answer.

Derive every question from that text at the time you ask it. Do not work from a
remembered list of what each dimension usually needs, and do not build one — a
stored mapping from dimension to question is a paraphrase of the rubric, it
drifts from the rubric the moment either changes, and this repository has paid
for that mistake once already. The rubric is canonical. This file is not.

## What a usable question looks like

Four properties, and the third is the one people skip.

1. **It names what it unblocks.** "Answering this would lift Testable from two"
   tells the reader why it is worth their minute.
2. **It is answerable by the person you are asking.** A question requiring
   knowledge nobody has is not a clarification, it is a research task, and
   should be labelled one.
3. **It carries a proposed default.** "I would draw the boundary at X — is that
   right?" gets answered. "Where should the boundary be?" gets postponed.
   Proposing costs you nothing and being wrong is useful, because correcting a
   specific proposal is easier than composing an answer from nothing.
4. **It is one question.** Two questions in one sentence get half an answer.

Order them by what they unblock, most first.

## Keep the list short

A handful at most. A long list is a form and does not get filled in; the
questions that matter are lost among the ones that do not. If more than a few
gaps are real, say that the Beat needs a conversation rather than a reply, and
name the two you would start with.

## Some low scores are not questions

A dimension that will not lift is sometimes a boundary in the wrong place — the
Beat holds two capabilities, or belongs inside a neighbour. No answer to any
question fixes that, and asking one implies it does.

Say so directly instead: name what you think the capabilities are, and leave the
redraw to a person. Deciding what the system is for and where its boundaries
fall is the Composer's judgement, and it does not move because a score is low.

## Never answer your own questions

The point is to surface what has not been decided. Filling a gap with a
confident guess hides it, and the guess enters a record whose purpose is that
reasoning stays recoverable. If you can answer it from something you have
actually read, it was not a gap — cite the source and drop the question.

Do not re-score after supplying your own answers. A score against invented
premises measures nothing.

## Output format

- The questions, ordered by what they unblock. For each: the dimension and its
  score, the question, your proposed default, and what a good answer changes.
- Anything you judged a boundary problem rather than a gap, stated as a finding
  with the capabilities you think are present.
- Anything you would need to research rather than ask, labelled separately, so
  nobody mistakes it for something they can answer at their desk.
- The score you are working from, as the quality instrument reported it,
  including the spec set version it requires.

## What this is not

This asks. It does not decide, record, or gate anything, and the questions are
not a checklist anybody is obliged to complete. Whether the answers are captured,
and where, belongs to whatever system of record the adopter uses — an answer
worth keeping usually becomes a Note against the Beat, which this instrument can
draft but not file.
