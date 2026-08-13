# Harmonic Composition Kit

Machine-readable specs and agent skills for **Harmonic Composition** — the
founding framework of the Harmonic Methods family, for improving systems with
explicit intent, preserved context, and decision lineage. Open to practice with
any tools.

Composition covers a single system: Coda, Beats, Beat Versions, Revisions, and
Notes. Harmonic Orchestration (across systems and agents) and Harmonic Portfolio
Management (across the wider landscape) are separate frameworks in the family and
are not covered here.

Full documentation is at [harmonicmethods.com](https://harmonicmethods.com).
Harmonica ([harmonica.io](https://harmonica.io)), by Codazen, is the reference
implementation.

Everything here is medium-agnostic. A capability might be a software feature, an
operational process, or an organizational practice; the change that delivers it
might be a pull request, a procedure document, or a runbook diff.

## Getting started

### 1. Score something, with nothing installed

    git clone https://github.com/harmonic-methods/composition-kit.git
    cd composition-kit

Then point any agent at a rubric and a file:

    Read skills/beat-quality-check/SKILL.md and score the Beat in
    examples/beats/client-estimate-approval/beat.yml against it.

You get seven scores with rationale, the single highest-leverage improvement, and
a pass/fail against the reference threshold. Swap in your own Beat — or just a
paragraph describing a capability you are about to build — and the rubric still
applies.

### 2. Use a rubric where you already work

`SKILL.md` is portable markdown, so any agent can be told to read a file and
follow it. Native placement is an optimization, not a requirement:

| Agent | Where the file goes |
| --- | --- |
| Claude Code | `.claude/skills/beat-quality-check/SKILL.md` |
| Cursor, Windsurf | `.cursor/rules/` |
| GitHub Copilot | referenced from `.github/copilot-instructions.md` |
| Anything else | anywhere — "read this file and follow it" |

Copy from a tag rather than from `main`, so you know which spec version you are
holding, and re-copy to update.

### 3. Describe your own system

Copy [examples/](examples/) as the starting shape and rename it:

    harmonic/coda.yml                          where the system is headed
    harmonic/beats/<your-capability>/beat.yml   the capability itself

Write the Coda first, as a resolved future state rather than a task list — a Beat
without a Coda cannot be decomposed, by rule. Then add one Beat Version for the
next step and score it with `plan-quality-check` before any work starts.

Two caveats going in. The conformance checker below is currently kit-internal: it
hardcodes this repository's own roots, so it will not check your tree yet. And
nothing here enforces anything — see [What this is not](#what-this-is-not).

## The model

A **Coda** is the outcome an entity exists to serve, written as a resolved
future state. Codas nest — organization, system, Beat — so every step of work
ladders up to strategy.

A **Beat** is a durable capability. It is never rewritten wholesale; it evolves
through **Beat Versions**, each a bounded, testable step toward the Coda. A
Beat Version is delivered by one or more **Revisions**, the tracked changes that
actually execute it. **Notes** carry the typed knowledge — context, constraints,
guidance, decisions — that explains why any of it is the way it is.

| Spec | Entity |
| --- | --- |
| [specs/coda.yml](specs/coda.yml) | the strategic outcome an entity serves |
| [specs/beat.yml](specs/beat.yml) | a durable capability |
| [specs/beat-version.yml](specs/beat-version.yml) | a planned step in a Beat's evolution |
| [specs/revision.yml](specs/revision.yml) | a tracked change executing a Beat Version |
| [specs/note.yml](specs/note.yml) | typed knowledge attached to what it informs |

## The rubrics

Two skills score work against the published quality dimensions. Both are written
to be read literally by an agent.

- [skills/beat-quality-check](skills/beat-quality-check/SKILL.md) — scores a
  Beat 1-5 across seven dimensions: Distinctive, Harmonious, Substantial,
  Durable, Clear, Strategically Aligned, Business Outcome.
- [skills/plan-quality-check](skills/plan-quality-check/SKILL.md) — scores a
  Beat Version plan 1-5 across six: Scoped, Directional, Testable, Traceable,
  Assignable, Risk-aware.

The dimension definitions and anchors mirror the reference implementation's
canonical rubrics, so a score here means what a score there means. Both skills
tell the reader not to paraphrase the anchors, because that is how a rubric
quietly stops meaning the same thing.

## Laying out a system

    harmonic/coda.yml                                    the system Coda
    harmonic/beats/<slug>/beat.yml                       a Beat
    harmonic/beats/<slug>/notes/*.yml                    its knowledge
    harmonic/beats/<slug>/versions/<v>/version.yml       a planned step
    harmonic/beats/<slug>/versions/<v>/revisions/*.yml   the changes executing it

One rule all the way down: an entity is a directory, its children are
subdirectories, and no file carries an inline child list. Notes attach to the
Beat rather than to a Beat Version — a version gets archived, the knowledge it
produced does not — and may name the version they arose from.

- [examples/](examples/) — one conformant Beat in this layout, deliberately
  non-software.
- [harmonic/](harmonic/) — this repository described in its own vocabulary. Real
  capabilities, real work in flight, real decisions.

To check a tree against the specs — required fields, lifecycle enums, reference
resolution, decision rationale:

    npm install && npm run validate

That is the only thing here with a dependency, and it is for contributors. Using
the kit — reading the specs, applying a rubric, vendoring the files — installs
nothing.

## What this is not

The kit **assesses but does not enforce**. It records no scores, gates nothing,
and keeps no audit trail — there is no history of who changed a Beat or when,
and a score produced here cannot tell you whether it predates the text it
judged. Those properties belong to a system of record. Use the kit to apply the
method wherever you already work, or to self-review before anything is tracked;
don't present its output as an official Check to anyone who would rely on it as
one.

## License

Copyright 2026 Codazen, Inc.

- **The method** — `specs/`, `skills/`, `examples/`, `harmonic/`, and the
  documentation — is licensed under [CC-BY-4.0](LICENSE-CONTENT). Practice it,
  adapt it, build on it; attribute it.
- **The tooling** — `tools/` — is licensed under [Apache-2.0](LICENSE).

Neither grants any right to the marks. See [TRADEMARKS.md](TRADEMARKS.md) before
naming a product, service, or credential with them.
