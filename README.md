# The Harmonic Method

The specification and agent skills for **the Harmonic Method** — a single
method for improving systems with explicit intent, preserved context, and
decision lineage. Open to practice with any tools.

The method defines five functions that act on intent — Composer, Orchestrator,
Conductor, Producer, Promoter — each scoped to an altitude rather than split
into separate frameworks. This repository covers those functions and the entity model
at system altitude: Coda, Beats, Beat Versions, Revisions, and Notes. The same primitives recur at beat/
track altitude (a discrete piece of work) and portfolio altitude (the set of
systems); altitude is recursion, not a different method, so these specs
and rubrics apply there too, unchanged.

Full documentation is at [harmonicmethods.com](https://harmonicmethods.com).
The website and documentation application lives in [site/](site/README.md),
alongside the specification; see that guide to run it locally or contribute.
Harmonica ([harmonica.io](https://harmonica.io)), by Codazen, is the reference
implementation.

Everything here is medium-agnostic. A capability might be a software feature, an
operational process, or an organizational practice; the change that delivers it
might be a pull request, a procedure document, or a runbook diff.

## Getting started

### Try the starter kit

Download `harmonic-method-starter-kit.zip` from a successful
[validation run on `main`](https://github.com/harmonic-methods/harmonic-method-spec/actions/workflows/validate.yml?query=branch%3Amain).
Unzip it and open `START HERE.md`. You can try the sample in your organization's
approved AI chat or open the folder in an approved desktop AI app with folder
access. Once you have the ZIP, the trial needs no Git setup or plugin.

If the artifact has expired, rerun the workflow or build the download locally with
`python3 tools/build-starter-kit.py /path/to/output`. The output also includes
the two Markdown attachments for the chat trial.

### 1. Score something, with nothing installed

    git clone https://github.com/harmonic-methods/harmonic-method-spec.git
    cd harmonic-method-spec

Then point any agent at a rubric and a file:

    Read skills/coda-quality-check/SKILL.md and score the Beat in
    examples/systems/client-commitments/beats/client-estimate-approval/beat.yml
    against it.

You get seven scores with rationale, the single highest-leverage improvement, and
a pass/fail against the reference threshold. Swap in your own Beat — or just a
paragraph describing a capability you are about to build — and the rubric still
applies.

### 2. Use a rubric where you already work

`SKILL.md` is portable markdown, so any agent can be told to read a file and
follow it. Native placement is an optimization, not a requirement:

| Agent | Where the file goes |
| --- | --- |
| Claude Code | `.claude/skills/coda-quality-check/SKILL.md` |
| Cursor, Windsurf | `.cursor/rules/` |
| GitHub Copilot | referenced from `.github/copilot-instructions.md` |
| Anything else | anywhere — "read this file and follow it" |

Copy from a tag rather than from `main`, so you know which spec version you are
holding, and re-copy to update.

### 3. Describe your own system

Copy [examples/](examples/) as the starting shape and rename it:

    harmonic-method/coda.yml                          where the system is headed
    harmonic-method/beats/<your-capability>/beat.yml   the capability itself

Write the Coda first, as a resolved future state rather than a task list — a Beat
without a Coda cannot be decomposed, by rule. Then add one Beat Version for the
next step and score it with `beat-version-quality-check` before any work starts.

One caveat going in: nothing here enforces anything — see
[What this is not](#what-this-is-not). The conformance checker will check your
tree, though. From a clone of this repository:

    node tools/validate.mjs /path/to/your/harmonic-method

The same check ships as a command, for anyone who would rather not clone:

    npx harmonic-method validate ./harmonic-method     # nothing to install
    hm validate ./harmonic-method                      # after a global install

The command is optional and always will be. Reading a spec, applying an
instrument, or vendoring any of it installs nothing.

If you build something that implements the method, declare what you conform to.
Copy [examples/declaration.yml](examples/declaration.yml) as the shape, keep it
with your implementation rather than here, and check it:

    hm conformance ./harmonic-method-declaration.yml

It requires the spec set version, who is claiming, and every contradiction you
know you carry. An empty divergence list is the strong claim, not the easy one —
it says nothing published here is contradicted, and one counter-example settles
it. What it cannot do is confirm your system behaves as you say; nothing readable
from outside can.

[examples/declaration-spec-kit.yml](examples/declaration-spec-kit.yml) applies
the same form to a real workflow built by someone else — GitHub's Spec Kit — as
a reading rather than a claim. Its maintainers have declared nothing, and the
file says so in the field the checker prints, because a qualification that lives
only in a comment does not survive being quoted. Read it for what a thorough
divergence list looks like against a system that genuinely diverges.

It checks what the specs require — fields, lifecycle values, decision rationale,
reference resolution, and that each child agrees with the directory holding it.
Where a cadence is recorded it also holds the two rules a tree can hold — a
parent Bar contains its children in time, and Bars sharing a parent do not
overlap — and reports any period that closed with no anchor taken against it.
That last one is reported and never failed: a system whose cadence predates its
adoption of anchors is behind, not malformed.
It does not apply the disciplines this repository keeps on itself, so a Beat of
yours may use any vocabulary it likes.

The layout it reads is a convention, not a condition of conformance. The specs
define no encoding, so a directory tree, a database, or a set of issue records
all conform if the required fields are present and the relationships hold — this
checker reads one of those, because a checker has to read something.

## The model

A **Coda** is the outcome an entity exists to serve, written as a resolved
future state. Codas nest — portfolio, system, Beat — so every step of work
ladders up to strategy.

A **Capability Beat**, or **Beat** for short, is a durable capability. The full
name keeps the musical word from reading as a unit of time: a Beat sets no
delivery interval and outlasts any period it is worked in. It is never rewritten
wholesale; it evolves through **Beat Versions**, each a bounded, testable step
toward the Coda. A
Beat Version is delivered by one or more **Revisions**, the tracked changes that
actually execute it. **Notes** carry the typed knowledge — background,
constraints, guidance, decisions — that explains why any of it is the way it is.
Those four are a hierarchy rather than a list: a Note *is* context, and the type
names how far it specializes. No type is called context, so the word for all four
never doubles as one of them. An implementation needing a finer kind narrows one
of the four rather than adding a fifth nobody else can read.

Cadence makes reconciliation routine. A **Bar** is the recurring period work is
planned and delivered within, and Bars nest — a quarter over its fortnights —
so a longer cadence needs no second entity. Crossing a Bar's boundary is the
occasion for a **Downbeat** on each capability in view: an immutable anchor
recording the outcome it was converging toward and how far it had got. Drift is
then measurable rather than remembered. The instant a Bar ends is its **Cutoff**:
a window includes its start and excludes its Cutoff, so one Bar's Cutoff and the
next Bar's start are the same instant and no moment belongs to both. The
Conductor's **Tie off** follows it — the ceremony that settles every unfinished
item in the Bar before the Bar is closed; an item that continues into the next
Bar is *tied across* it — and the Downbeat comes after that.

Cutting across all of it are the five **functions** — Composer, Orchestrator,
Conductor, Producer, Promoter. They are accountabilities rather than titles: one
person may hold several, an agent may hold one under a named person's
accountability, and the set does not change with altitude. Nothing instantiates
a function and no entity carries one as a field; naming them is what makes it
possible to say which of the five nobody is currently holding.

| Spec | Entity |
| --- | --- |
| [specs/coda.yml](specs/coda.yml) | the strategic outcome an entity serves |
| [specs/portfolio.yml](specs/portfolio.yml) | a grouping of Systems and Portfolios, nesting without limit |
| [specs/system.yml](specs/system.yml) | the altitude where Beats attach |
| [specs/beat.yml](specs/beat.yml) | a durable capability |
| [specs/proposal.yml](specs/proposal.yml) | a candidate capability, weighed and not yet one |
| [specs/beat-version.yml](specs/beat-version.yml) | a planned step in a Beat's evolution |
| [specs/revision.yml](specs/revision.yml) | a tracked change executing a Beat Version |
| [specs/note.yml](specs/note.yml) | typed knowledge attached to what it informs |
| [specs/bar.yml](specs/bar.yml) | the recurring period work is planned within |
| [specs/downbeat.yml](specs/downbeat.yml) | an immutable anchor of where a capability stood |
| [specs/function.yml](specs/function.yml) | the five accountabilities the work is held through |
| [specs/conformance.yml](specs/conformance.yml) | what conforming involves, and what an implementation declares |
| [specs/spec-set.yml](specs/spec-set.yml) | the version of the set above, which an implementation pins |

## The instruments

Four skills assess work against the published definitions. Each serves one
function, and each is written to be read literally by an agent.

| Instrument | Function | What it asks |
| --- | --- | --- |
| [coda-quality-check](skills/coda-quality-check/SKILL.md) | Composer | Is this Beat, System, or Portfolio well defined? Seven dimensions, 1-5: Distinctive, Harmonious, Substantial, Durable, Clear, Strategically Aligned, Outcome-Oriented. |
| [beat-version-quality-check](skills/beat-version-quality-check/SKILL.md) | Orchestrator | Is this plan well formed? Six dimensions, 1-5: Scoped, Directional, Testable, Traceable, Assignable, Risk-aware. |
| [coda-alignment-check](skills/coda-alignment-check/SKILL.md) | Conductor | Is what we decided still true? Nine checks over a Coda chain, reported as findings rather than a score. |
| [root-coda-quality-check](skills/root-coda-quality-check/SKILL.md) | Producer | Is the statement everything ladders to worth laddering to? Six dimensions, 1-5: Discriminating, Attributed, Reciprocal, Bounded, Generative, Consequential — reported with a warrant band that is not one of them. |

[coverage-reading](skills/coverage-reading/SKILL.md) serves the Composer over a
whole system rather than one entity: which parts of the system Coda nothing
serves, which capabilities cover ground already taken, and which sit outside the
Coda altogether. It adds no dimension — overlap with siblings and service to the
Coda are already two of the seven above, and this applies them across the set.
It reports where the space is and never how much, because a capacity figure
rises whenever the Coda is widened and no capability is added.
[examples/coverage/](examples/coverage/) shows the same two questions answered
arithmetically where an adopter has embeddings; the two disagree usefully.

Five skills produce rather than assess, and none defines any judgement of its
own — which is what keeps a production aid from becoming a second standard.

[beat-composing](skills/beat-composing/SKILL.md) serves the Composer: give it a
paragraph describing a capability and it drafts the Coda and the Beat, asks for
what it is missing rather than inventing it, scores its own draft with the Beat
rubric above — read as written, never paraphrased — and revises from that score
and from what you say back.

[beat-clarifying](skills/beat-clarifying/SKILL.md) serves the Composer too, for
the moment revision stops helping: it turns the dimensions that scored low into
the few questions their author actually has to answer, each with a proposed
default to accept or correct. Revision fixes what is badly written;
clarification asks for what nobody has decided.

[beat-version-composing](skills/beat-version-composing/SKILL.md) serves the
Orchestrator: give it an existing, scored Beat and a description of what should
happen next and it drafts the step — reading the gap between the Beat's current
state and its Coda before writing anything, so the step it proposes is the
highest-impact one available rather than whichever is easiest to describe. It
requires a Beat already stand on its own; where none exists it points at
beat-composing rather than drafting one itself. It scores with the plan-quality
rubric above, unmodified, and revises the same two-loop way every producing
skill here does.

[downbeat-taking](skills/downbeat-taking/SKILL.md) serves the Conductor: it takes
an anchor on one capability, freezing the outcome it was converging toward and
how far it had got, so later drift is measurable rather than remembered. It
carries no scale, because the method leaves how convergence is computed to the
implementation, and it separates what it examined from what it took on the
record's word.

[root-coda-composing](skills/root-coda-composing/SKILL.md) serves the Producer:
it drafts the statement at the top of the chain, starting from who benefits and
who pays rather than from where the organization is headed, because a destination
is only checkable once the ledgers it is measured on exist. It will not speak for
the counterparty and will not settle what an organization is for — that answer
belongs to whoever is accountable for it, and the draft is a proposal until they
adopt it.

The Producer's instrument scores the root Coda rather than computing Value
Velocity, which is what had kept the slot empty: a rate needs a realized figure,
and the figure is not available at the moment anyone needs the judgement. What is
available is the statement the rate would be measured against — whose benefit is
claimed, on what evidence, inside what bounds — so the instrument asks whether
that statement can be failed, and leaves the arithmetic to the implementation as
every other instrument here does.

Discriminating is the one dimension with evidence outside the text: the decisions
in which the organization declined work. A statement that excludes and an
organization that has never refused anything read identically, and only conduct
separates them. The instrument reads those decisions from wherever they are
already kept — it names no artifact, because `specs/note.yml` enumerates no
subtypes and a decline is an ordinary decision that will already be written down.
A decline counts only if it was recorded before the reading, and a Coda with none
is reported as having untested exclusions rather than failed. Where an
organization tracks proposals as their own record (`specs/proposal.yml`), the
instrument reads the rate rather than only the fact: how many resolved against
this Coda, how many of those were declined — a decline read without that base
cannot tell a boundary doing heavy work from one that stopped almost nothing.
`withdrawn` proposals are reported alongside the count and never folded into
it, since nobody weighed those and said no. The band a decline reaches does
not move for having a base to sit against — a resolved proposal is still the
organization's own account of its own conduct.

How well a statement is written and what stands behind it are separate readings,
so the instrument reports a score and a warrant band and never combines them. The
band records what the measures rest on — an assertion, an assumption registered
with the test that would settle it, evidence about a comparable, the
organization's own record, or a costly voluntary act by the other party — and it
does not enter the average. An earlier version capped two dimensions by that
evidence instead, which put the ceiling on a six-dimension average at 4.0 and
made a gate out of a score. That is the defect a score floor on one class of
Beats had already been removed for, and repeating it is recorded rather than
quietly fixed.

Its dimensions are not the Beat's read at a higher altitude. Every other rubric
measures service to the Coda above, and a root Coda has none, so the dimension
carrying the most weight elsewhere has no referent here and no rewording gives it
one. These six score the statement's own properties and its relation outward, to
the parties it serves and the alternatives they hold.

The Promoter still has no instrument, deliberately: adoption rests on the newest
and thinnest evidence of the five, and should not carry more apparatus than the
others until that changes.

The dimension definitions and anchors are canonical here, so a score means the
same thing wherever it is produced. Each instrument tells the reader not to
paraphrase them, because that is how a definition quietly stops meaning the same
thing. A digest over each one's normative text fails the conformance check if any
of it is edited without acknowledgement.

## Laying out a system

    harmonic-method/coda.yml                                    the root Coda
    harmonic-method/notes/*.yml                                 what the root is held to
    harmonic-method/proposals/<slug>/proposal.yml               a candidate, weighed and not yet a Beat
    harmonic-method/proposals/<slug>/notes/*.yml                its deliberation
    harmonic-method/beats/<slug>/beat.yml                       a Beat
    harmonic-method/beats/<slug>/notes/*.yml                    its knowledge
    harmonic-method/beats/<slug>/versions/<v>/version.yml       a planned step
    harmonic-method/beats/<slug>/versions/<v>/revisions/*.yml   the changes executing it
    harmonic-method/beats/<slug>/revisions/*.yml               changes with no planned step
    harmonic-method/beats/<slug>/downbeats/*.yml                anchors taken on it
    harmonic-method/bars/<slug>/bar.yml                         a period of the cadence

One rule all the way down: an entity is a directory, its children are
subdirectories, and no file carries an inline child list. Notes attach to the
entity whose knowledge they are, which is the root itself for the bounds a system
holds, the ordering among them, and what would end the effort — published, so an
adopter inherits the constraints along with the specification, and so the
instrument scoring the root reads the organization rather than only its
direction. Notes attach to the Beat rather than to a Beat Version — a version ends, the knowledge it
produced does not — and may name the version they arose from.

A Note is preserved rather than overwritten. Retiring one is a new decision
Note whose `supersedes` names it — nothing is ever written onto the Note being
closed. Which Notes still stand is read off that reference rather than stored
anywhere: a Note nothing supersedes is active, a Note something supersedes is
not, and superseding the superseder does not reopen what it closed.

A Revision names its Beat directly and its Beat Version only when there is
one — a change that could not wait for a planning increment is orphaned
rather than unattached, sitting beside `versions/` instead of inside one. It
still carries its own reasoning and moves through the same status values as
any other. A later, properly planned step does not adopt an orphan by
editing it after delivery; it cites the orphan's id in its own prose, the
same way a decision cites what it supersedes.

- [examples/](examples/) — one conformant Beat in this layout, deliberately
  non-software.
- [harmonic-method/](harmonic-method/) — this repository described in its own vocabulary. Real
  capabilities, real work in flight, real decisions.

To check a tree against the specs — required fields, lifecycle enums, reference
resolution, decision rationale:

    npm install
    npm run validate                                  # this repository
    node tools/validate.mjs /path/to/your/tree         # yours

That is the only thing here with a dependency, and it is for contributors. Using
this repository — reading the specs, applying a rubric, vendoring the files — installs
nothing.

## What this is not

This repository **assesses but does not enforce**. It records no scores, gates nothing,
and keeps no audit trail — there is no history of who changed a Beat or when,
and a score produced here cannot tell you whether it predates the text it judged
or the rubric that judged it. Those properties belong to a system of record —
which has to detect both kinds of staleness, not just the first. Use these specs to apply the
method wherever you already work, or to self-review before anything is tracked;
don't present its output as an official Check to anyone who would rely on it as
one.

## License

Copyright 2026 Codazen, Inc.

- **The method** — `specs/`, `skills/`, `examples/`, `harmonic-method/`, and the
  documentation — is licensed under [CC-BY-4.0](LICENSE-CONTENT). Practice it,
  adapt it, build on it; attribute it.
- **The tooling** — `tools/` and the application code, configuration, and styles
  in `site/` — is licensed under [Apache-2.0](LICENSE). Documentation prose,
  including `site/content/`, remains under CC-BY-4.0.

Neither grants any right to the marks. See [TRADEMARKS.md](TRADEMARKS.md) before
naming a product, service, or credential with them.
