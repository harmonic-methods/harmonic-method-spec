---
name: downbeat-taking
description: Take a Downbeat on a Harmonic Method Beat — an immutable anchor recording the outcome the capability was converging toward and how far it had got, so later drift is measurable rather than remembered. Use when asked to take, record, or freeze a reading on a capability, at a cadence boundary or before a decision.
---

# Taking a Downbeat

You are producing a **Downbeat** — an immutable anchor recording where one
capability honestly stood at a moment. Spec: `specs/downbeat.yml`. If a cadence
boundary occasioned it, also `specs/bar.yml`.

This serves the **Conductor** — the accountability that decisions stay in force,
and that the gap between what was decided and what is actually true gets
surfaced while correcting it is cheap.

**Read the spec before taking one.** It carries the fields, which are required,
and the rules. This file does not restate them: a second copy of a field list is
a copy that goes stale. If this file and the spec ever disagree, the spec wins.

An anchor is only worth taking if it can later be wrong. Everything below exists
to keep it that way.

## Inputs

The Beat and its Coda; its Beat Versions and their state; whatever evidence you
can actually examine of what has been delivered; the most recent Downbeat on
this Beat, if there is one; and the Bar whose boundary occasioned this reading,
if one did.

Say which of these you did not have. A reading taken without sight of the last
anchor cannot report drift, and should say so rather than imply there was none.

## Do not invent a scale

`specs/downbeat.yml` states that the method requires a reading be taken and
preserved, and that **how it is computed and on what scale is an
implementation's**. So:

- If the adopter has a scale, use theirs and name it in the reading.
- If they do not, write the reading in prose and say plainly that it is prose.
- Never introduce a number this repository does not define.

The temptation is a tidy one-to-five, because every other instrument here has
one. Resist it. A reading that looks like a score invites comparison against
readings from systems that mean something else by the same number, and the
method left the scale open deliberately rather than by omission.

## Freeze the Coda, do not summarize it

`coda_state` exists so that a later reader can detect the Coda has changed since.
A summary cannot do that — a Coda can be rewritten in a way any faithful summary
survives unchanged, and then the drift the anchor exists to expose is invisible.

Copy the Coda as it stands, word for word.

## Separate what you saw from what you were told

A Downbeat records where a capability *honestly* stood, and honesty here has a
specific meaning: the record and the reality can differ, in both directions.

- A record can **lag**: work has shipped and the step still reads as in flight.
- A record can **lead**: a step reads as delivered and its work never landed.

Both happen, and neither is visible from a status field alone. So split the
reading. Say what you examined directly — the artifacts, the changes, the
evidence a Revision points at — and say what you are taking on the record's word.
A reading built only from status fields is a reading of the record, not of the
capability, and it should say so in those words rather than presenting itself as
a reading of the thing.

Where you cannot tell, write that you cannot tell. An anchor with an honest gap
in it is evidence. An anchor that smoothed the gap over is not.

## Who answers for it

`taken_by` is a person, or an agent operating under a named person's
accountability. Ask whose. Do not sign an anchor with your own name alone and do
not leave the field to be filled in later — an anchor nobody answers for is not
evidence, and the point of freezing a reading is that someone stood behind it at
the time.

## Report the drift

If a prior Downbeat exists, compare its `coda_state` against the Coda now. A Coda
that has changed since the last anchor is the signal the Conductor exists to
surface, and it means every convergence reading taken against the old statement
measured progress toward something no longer intended. Say so prominently; it
matters more than the new reading.

If no prior anchor exists, say that drift cannot be computed rather than that
there is none. An unanchored capability has no drift because nothing has been
measured, which is not the same as being on course.

## Output format

- The Downbeat, conformant to the spec, ready to be stored wherever the adopter
  keeps records.
- What the reading rests on, in two lists: examined, and taken on the record's
  word.
- Anything you could not determine, and what you would have needed.
- Drift since the last anchor, or a plain statement that there is no anchor to
  compare against.
- Whose scale the reading uses, or that it is prose.

## Working rules

- Never edit an existing Downbeat. If the last reading was wrong, take a new one
  and say what it corrects. Editing one destroys the evidence it exists to
  provide, which is the first rule the spec states.
- Never grade. A Downbeat carries no quality score, and a reading that arrives
  with one has become a different instrument.
- One capability per anchor. Asked to take a reading across several, take
  several — a single number across a portfolio averages away the only thing
  worth knowing.
- A Downbeat is not a plan. If you find yourself writing what should happen next,
  stop: that is a Beat Version, and a different instrument drafts it.

## What this is not

This produces an anchor and hands it over. It stores nothing, and this repository
keeps no history — whether the anchor is retained, and whether it stays
unaltered, belongs to whatever system of record the adopter uses. Say that when
you hand it over. An immutable record that nobody is storing is a contradiction
worth naming out loud rather than leaving the reader to discover.
