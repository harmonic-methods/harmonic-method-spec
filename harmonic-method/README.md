# The kit as a system

This directory is the kit described in its own vocabulary. The Beats, Beat
Versions, and Notes here are not illustrations — they are the actual
capabilities this repository delivers, the actual work in flight against them,
and the actual decisions behind it.

A directory like this one holds a **system**: the level `specs/coda.yml` places
between an organization and a Beat. "Project" is the reference implementation's
word for roughly the same level; it does not appear in these specs.

It is called `harmonic-method/` rather than `system/` so it reads as an instance rather
than as a missing entity spec sitting beside `specs/`, and it is deliberately
not hidden — decision lineage exists to be found, and `rg` skips dot-directories
unless asked. Adopters use the same name in their own repositories.

## Layout

    coda.yml                                    the system Coda
    beats/<slug>/beat.yml                       specs/beat.yml
    beats/<slug>/notes/*.yml                    specs/note.yml
    beats/<slug>/versions/<v>/version.yml       specs/beat-version.yml
    beats/<slug>/versions/<v>/revisions/*.yml   specs/revision.yml

One rule, all the way down: an entity is a directory, and its children are
subdirectories of it. So no file carries an inline `notes:`, `versions:`, or
`revisions:` list — the directory *is* the list. The spec requires none of
them, each child already carries its own back-reference, and a second copy of
the same fact is a thing to keep in sync.

A `revisions/` directory appears only where a Revision exists; an empty one
would not survive a commit anyway.

Notes attach to the **Beat**, never to a Beat Version, and may name the Beat
Version they arose from via the optional `beat_version` field. A version gets
archived; the knowledge it produced does not.

The system Coda is a root Coda and omits `parent`. The organization Coda above
it belongs to the publisher and is deliberately not asserted here.

## What this deliberately is not

It records no scores, and there is deliberately no `checks/` directory beside
`notes/` and `versions/`. The rubrics in `skills/` assess but do not enforce,
nothing here is a gate, and no `check` entity is specified. A score committed
next to a Beat would also have no way to signal that it predates the text it
judged — it would look authoritative while quietly going stale.

It has no audit trail either: no history of who changed a Beat or when. Both
belong to a system of record; this is a published spec artifact, not one.

To see the rubrics applied, score any `beat.yml` with `skills/beat-coda-quality-check`
and any file under a `versions/` directory with `skills/beat-version-quality-check`.
