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
The root Coda statement, and the context and decisions recorded at the root
itself — the bounds it holds, the ordering among them, what it has refused, what
would end it, any load-bearing assumption registered with the test that would
settle it, and the recorded decisions in which it declined work — what it turned
down, when, and why. Where the organization tracks proposals as their own
record, its resolved ones — accepted, declined, and withdrawn alike. If
available: the system Codas directly beneath it (for
Consequential and Discriminating), and whatever record the organization keeps
that a measure could be read from — knowledge Notes, renewal and contract
history, correspondence, support records (for classifying evidence provenance
under the check rules). If a named measure's warrant cannot be established from
what you were given, say so and report the asserted band rather than guessing.

## Scoring scale

1 = Critical gap — dimension is not addressed at all
2 = Weak — dimension is partially addressed with significant issues
3 = Adequate — dimension is addressed but could be stronger
4 = Strong — dimension is well-addressed with minor room for improvement
5 = Excellent — dimension is exemplary

## The six dimensions — score each 1-5

1. **Discriminating** (`discriminating`) — The Coda excludes. There are
   plausible, attractive, profitable things this organization will not do, and
   reading the statement tells you which. Where the record holds decisions
   declining work, read them: a statement that excludes on paper and an
   organization that has never refused anything are different findings, and only
   the record separates them.
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

- **Overall**: average of the six, one decimal, followed by the warrant band —
  `Overall 4.3 · warrant asserted`. Never combine them into one number.
- **Evidence**, in two lists: what you examined directly, and what you took on
  the statement's or the record's word. Name the band each measure reached and
  what carried it, and name any assumption whose test has lapsed.
- **Findings belonging elsewhere**: anything the check rules route to another
  function, named with the function it belongs to.
- **Verdict**: report pass/fail against whatever threshold the reader's
  implementation sets, and say that the threshold is an implementation choice
  rather than something this repository fixes.
- **Rewrite offer**: propose a revised statement that would score higher,
  clearly marked as a proposal for a human to ratify, never an automatic
  replacement.

## Check rules

- **Confirm the Coda has no parent before scoring it.** A Coda carrying one is
  not root, whatever its altitude, and belongs to `coda-quality-check`; say so
  and score nothing rather than scoring it here. Read `parent` from the Coda —
  its absence is the whole of what makes one root. These six ask what something
  at the top of a chain owes the parties outside it, and put to a Coda that
  serves one above it they do not become harsh, they become the wrong question:
  a Beat is not the thing that faces a market, and a reading saying it
  discriminates poorly is a verdict on the wrong subject that looks exactly like
  a verdict on the statement. The instrument built for it scores it there.
- Score each dimension independently with evidence from the Coda as written.
- Be specific in rationale — cite exact phrases from the statement.
- **Score every dimension over its full range, and report warrant separately.**
  Warrant is not a dimension, is not scored, and never enters the average. The
  scores measure how well formed the statement is; the warrant records what
  stands behind it. They are independent — a claim can be impeccably written and
  wholly unevidenced — and a reading that folds either into the other conceals
  both. Never cap, floor, or otherwise move a score to reflect warrant.

  | Warrant | What stands behind the measures the statement names |
  | --- | --- |
  | asserted | The organization states it. Nothing observable is offered. |
  | asserted, under test | Asserted, and every load-bearing assumption is registered at the root with what is assumed, the observation that would falsify it, who is accountable for looking, and by when. All four, or the band does not apply. |
  | comparable | Costly voluntary acts by third parties toward a comparable thing, with the comparable named and its disanalogy stated. Never available to Reciprocal. |
  | record | Read out of the organization's own record — Notes, correspondence, contract or renewal history. |
  | counterparty-observed | A costly voluntary act by the other party: renewal, expansion, referral, remaining where leaving was viable. |

  Report the band each named measure supports, and the reading's band as the
  lowest among the measures the value claim depends on. A measure may be
  qualitative and still reach the top band, provided it names its observer —
  without that clause the band demotes what matters most and counts worst.
- **An elapsed test with no reading recorded forfeits "under test"**, dropping to
  asserted, and the reading says which assumption lapsed. A commitment to look
  that was not kept is worse than an honest assertion, because it claimed the
  discipline without spending it.
- **Comparable warrant never reaches Reciprocal.** That dimension asks whether
  this exchange with this counterparty has turned extractive, and no evidence
  about a comparable arrangement answers it. Naming a flattering comparable is
  the easiest move available in this whole scheme; requiring the disanalogy is
  what makes the band falsifiable, and the exclusion is what keeps it from
  reaching the one dimension it cannot inform.
- **Route a distribution failure to the Promoter.** Where a measure is well
  formed and its evidence is absent because the thing has not been put in front
  of anyone, that is adoption rather than value modelling, and
  `specs/function.yml` gives adoption to the Promoter. Report it as a Promoter
  finding and say so. A low warrant read as a Producer deficiency invites a
  rewrite of the statement, when what is missing is distribution — two opposite
  responses, and the instrument that cannot tell them apart will keep
  recommending the wrong one.
- **Never stand in for the counterparty.** Do not simulate, roleplay, or estimate
  what the other party experiences and then score Reciprocal from it. Assessing
  their benefit from our side is the defect the dimension exists to catch, and
  producing it with reasoning attached makes it worse rather than better, because
  it converts an assertion into something that reads like a finding. Score what
  the Coda names and what the record shows; where neither reaches, say the
  evidence is absent and report the asserted band.
- Constructing the strongest case *against* the arrangement is permitted and
  useful — it yields hypotheses for someone to check. Report it as an open
  question, never as a verdict, and never let it move a score on its own.
- **Read only the active partition of Notes as standing evidence — one nothing
  supersedes.** `specs/note.yml` derives that partition from `supersedes`
  rather than storing it, so check every Note this reading would otherwise cite
  before relying on it. A superseded Note may still be cited as history — what
  the organization used to hold, and when it stopped — but it does not count
  toward a warrant band, a bound, an assumption under test, or a decline. A
  reading that skips this can score a reversed decision as if it still stood.
- **Read declined work as evidence for Discriminating, from wherever the
  organization already records decisions.** A recorded decline is behavioural
  rather than textual — what was refused rather than what is claimed — and it is
  the only evidence that separates a boundary being held from a boundary being
  described. It reaches the `record` band and no higher: it is the
  organization's own account of its own conduct, however contemporaneous.

  Demand no particular artifact for it. `specs/note.yml` says the method
  enumerates no subtypes and will not, and a decline is an ordinary decision —
  it will already be sitting in a decision Note or in the scope of a planned
  step, wherever that organization keeps such things. An instrument that
  required a dedicated record would be asking for a second copy of a decision
  already written down, which is the failure this method exists to prevent.
- **A decline counts only if it was recorded before the reading.** Contemporaneity
  is the whole of its evidential value: a refusal written down when it was made,
  by whoever made it, was costly and uninterested in any score. One assembled
  afterwards is a description of the statement wearing the clothes of conduct,
  and is worth less than the statement, which at least does not pretend. Where a
  decline's date or decider cannot be established, say so and do not count it.
- **Where the organization tracks proposals, read the rate and not only the
  fact.** A recorded decline on its own has a numerator and no base — five
  declines against six proposals is a boundary doing heavy work, five against
  five hundred is a boundary that stopped almost nothing, and the two read
  identically without something to count them against.
  `specs/proposal.yml` gives that base wherever an organization keeps one:
  report how many proposals against this Coda have resolved, and how many of
  those were `declined`. `withdrawn` proposals are reported alongside the
  count and never folded into it — nobody weighed those against the Coda and
  said no, and counting them as declines would credit the boundary for an
  attention span it did not spend. Where no such record exists, score
  Discriminating from whatever declines are available exactly as before; this
  is a sharper reading where the base exists, not a requirement that it does.
  The band this evidence reaches does not move because a base now exists — a
  resolved proposal is still the organization's own account of its own
  conduct, `record` and no higher.
- **Report Discriminating below 3 as a blocking finding** alongside the average,
  not instead of it. A Coda nothing can fail cannot be laddered to: every
  dimension in every rubric beneath it that measures service to the Coda above
  will score well against a statement that excludes nothing, so a weak score here
  silently inflates the whole chain. State it and offer the rewrite; do not
  withhold the other scores.
- Distinguish the payer from the beneficiary wherever the statement conflates
  them. Payment reveals what one party expected at the moment they committed;
  it is not evidence of what another party later received.
- **Score the statement together with the context recorded at the root, and say
  which carried each dimension.** A bound, an exclusion, an ordering or an ending
  condition kept as a decision at the root counts as stated, because it is part
  of what the organization holds itself to and an adopter inherits it. The same
  fact kept in a contributor document, an internal charter, or somebody's
  practice does not count, however reliably it is honoured — an organization is
  bounded by what it published, and the gap between the two is the finding.
  Report any dimension carried by the recorded context rather than by the
  statement, both because a reader deciding whether to rewrite the statement
  needs to know, and because a statement that carries none of them is thinner
  than its score will suggest.
- Score what is written; do not silently assume missing context. Never raise a
  score because the intent seems good.
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
