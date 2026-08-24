---
name: root-coda-quality-check
description: Score a root Coda — the one at the top of the chain, with no parent above it — across the six published dimensions (Discriminating, Attributed, Reciprocal, Bounded, Generative, Consequential), 1-5 each, with reasoning, evidence provenance, and improvement guidance. Use when asked to check, grade, or improve the Coda a whole portfolio hangs from.
---

# Root Coda Quality Check

You are scoring a **root Coda** — the Coda at the top of the chain, identified by
having no parent. Spec: `specs/coda.yml`.

This instrument serves the **Producer** — the accountability for the relationship
between what is spent and what it is worth, and for whether the work should
continue at its current shape and cost.

The dimension definitions, red flags, scoring scale, and check rules below are
canonical in this repository. Score against them as written; do not paraphrase
them.

## Why these dimensions and not the Beat's

Every other rubric here measures fit to a parent, and the load-bearing dimension
is service to the Coda above. A root Coda has nothing above it, so that dimension
cannot be asked and no rewording rescues it. These six are self-anchoring: they
score the statement's own properties and its relation *outward* — to the parties
it claims to serve and the ecosystem it competes in — rather than *upward*.

This is why a root Coda is not scored with the Beat rubric at a higher altitude.
The altitude recursion holds for the entity; it does not hold for a dimension
whose referent is absent.

## Inputs
The root Coda statement. If available: the system Codas directly beneath it (for
Consequential and Discriminating), and whatever record the organization keeps
that a measure could be read from — knowledge Notes, renewal and contract
history, correspondence, support records (for classifying evidence provenance
under the check rules). If a named measure's provenance cannot be established
from what you were given, say so and apply the asserted ceiling rather than
guessing.

## Scoring scale

1 = Critical gap — dimension is not addressed at all
2 = Weak — dimension is partially addressed with significant issues
3 = Adequate — dimension is addressed but could be stronger
4 = Strong — dimension is well-addressed with minor room for improvement
5 = Excellent — dimension is exemplary

## The six dimensions — score each 1-5

1. **Discriminating** (`discriminating`) — The Coda excludes. There are
   plausible, attractive, profitable things this organization will not do, and
   reading the statement tells you which.
   Red flag: nothing could fail it — every proposal anyone might bring would
   ladder to it. Also: a statement of capture rather than creation. Better terms,
   a larger share of the same exchange, or a stronger negotiating position
   redistribute what already exists between the parties; they are not a claim to
   have created anything, and a Coda that sounds like value while describing
   capture belongs at 2 or below on this dimension.
2. **Attributed** (`attributed`) — Every claim of value names its holder and its
   measure, on both sides of the exchange and to the same standard. The party who
   pays and the party who benefits are distinguished where they differ.
   Red flag: value in the passive voice — "creates value", "drives outcomes" —
   with no holder. A holder named with no measure. A measure that is ours wearing
   the counterparty's name. Or a single beneficiary asserted where the payer,
   the user, and the budget holder are plainly three different parties.
3. **Reciprocal** (`reciprocal`) — The exchange runs both ways and the statement
   says how it would be known to have stopped. The counterparty's benefit is
   stated in their terms, and a condition is named under which the arrangement
   would be judged to have turned extractive.
   Red flag: benefit to the counterparty asserted and assessed entirely by us.
   No stated condition that would count as evidence against the relationship.
   Dependence treated as an asset — a counterparty who cannot leave generates no
   signal, so a Coda that counts switching cost as a strength has described the
   loss of its own instrument as a gain.
4. **Bounded** (`bounded`) — States what must stay true as ranges rather than
   ambitions, and states which one gives when two of them conflict.
   Red flag: everything is an aspiration and nothing is a floor. Or floors are
   listed with no ordering among them, which leaves every real trade to be argued
   at the moment it is least affordable. A single number where a range belongs is
   also a defect: a bound that can be overshot as well as undershot is not
   expressed by a target.
5. **Generative** (`generative`) — Provides for its own succession: what is
   defended for the next thing, and the condition under which the current thing
   ends.
   Red flag: implies perpetuity. No ending condition, and no protected share for
   what comes next — which in practice funds succession out of surplus, meaning
   never, because every other claim on the surplus reports sooner.
6. **Consequential** (`consequential`) — Says what is lost if this organization
   is absent, in terms the parties outside it would recognize.
   Red flag: describes what the organization does rather than what its absence
   would cost. Claims of uniqueness standing in for consequence — being unlike
   the alternatives is not the same as being the one whose removal costs
   something, and only the second is worth defending.

## Output format

For each dimension: score, one-sentence justification, and (for any score below
5) the single most useful improvement. Then:

- **Overall**: average of the six, one decimal.
- **Evidence**, in two lists: what you examined directly, and what you took on
  the statement's or the record's word. Name the provenance tier applied to each
  measure and any ceiling it imposed.
- **Verdict**: report pass/fail against whatever threshold the reader's
  implementation sets, and say that the threshold is an implementation choice
  rather than something this repository fixes.
- **Rewrite offer**: propose a revised statement that would score higher,
  clearly marked as a proposal for a human to ratify, never an automatic
  replacement.

## Check rules

- Score each dimension independently with evidence from the Coda as written.
- Be specific in rationale — cite exact phrases from the statement.
- **Cap the score by the provenance of the evidence.** A measure is only worth
  what its source can bear, and the ceiling applies to Attributed and Reciprocal:

  | Provenance | Ceiling |
  | --- | --- |
  | Asserted — the organization states it | 2 |
  | Inferred from record — read out of Notes, correspondence, contract or renewal history | 4 |
  | Counterparty-observed — a costly voluntary act by the other party: renewal, expansion, referral, remaining where leaving was viable | 5 |

  A measure may be qualitative and still reach the top tier, provided it names
  its observer. Without that clause the cap quietly demotes everything that
  matters most and counts worst — trust, standing, the counterparty's own
  position — which is the failure the Producer exists to prevent rather than
  cause.
- **Never stand in for the counterparty.** Do not simulate, roleplay, or estimate
  what the other party experiences and then score Reciprocal from it. Assessing
  their benefit from our side is the defect the dimension exists to catch, and
  producing it with reasoning attached makes it worse rather than better, because
  it converts an assertion into something that reads like a finding. Score what
  the Coda names and what the record shows; where neither reaches, say the
  evidence is absent and apply the asserted ceiling.
- Constructing the strongest case *against* the arrangement is permitted and
  useful — it yields hypotheses for someone to check. Report it as an open
  question, never as a verdict, and never let it move a score on its own.
- **Report Discriminating below 3 as a blocking finding** alongside the average,
  not instead of it. A Coda nothing can fail cannot be laddered to: every
  dimension in every rubric beneath it that measures service to the Coda above
  will score well against a statement that excludes nothing, so a weak score here
  silently inflates the whole chain. State it and offer the rewrite; do not
  withhold the other scores.
- Distinguish the payer from the beneficiary wherever the statement conflates
  them. Payment reveals what one party expected at the moment they committed;
  it is not evidence of what another party later received.
- Score the Coda as written; do not silently assume missing context. Never raise
  a score because the intent seems good.
- Suggestions must be actionable — "name the range and which bound gives first"
  not "strengthen the constraints".
- **Name the version you scored against.** Read `spec_version` from
  `specs/spec-set.yml` and report it with the result. A score is a claim about an
  entity measured against a rubric, and rubrics move — without the version a
  later reader cannot tell whether the score predates the definitions that
  produced it, and two scores cannot be compared at all. If the spec set is not
  available to you, say the version is unknown rather than guessing or omitting
  it: an unversioned score is usable now and worthless later. Do not copy the
  version into this file or any other — read it where it lives.
- This skill assesses; it does not enforce. Gates, approvals, and recorded
  lineage are the responsibility of the system of record.
