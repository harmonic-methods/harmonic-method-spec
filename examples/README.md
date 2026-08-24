# Worked example

One conformant Beat, laid out exactly as `harmonic-method/` is — so what you read here is
what you would copy.

    coda.yml                                         EX-SYS-CODA
    beats/client-estimate-approval/beat.yml          EX-B-001
                                  /notes/            its typed knowledge
                                  /versions/v1-send-and-approve/version.yml
                                                     EX-BV-001.1
                                            .../revisions/    the changes executing it
                                  /downbeats/      an anchor taken at a boundary
    bars/<period>/bar.yml                          the cadence, a quarter over a fortnight

No file carries an inline child list — every directory is the list. Notes attach
to the Beat; `notes/approval-happens-in-system.yml` shows the optional
`beat_version` field naming the step a decision came from.

The step is executed by more than one Revision, which is the ordinary case rather
than a complication: `specs/beat-version.yml` types the field as a list, and
`specs/revision.yml` calls a Revision a change executing *part of* a step. The
relationship runs one way — a Revision belongs to exactly one Beat Version, and a
Beat Version takes as many Revisions as the work takes. One here has shipped and
one is still in review, so the directory also shows a step part-delivered, which
is why the status lives on each change rather than only on the step.

The cadence is here too: a quarter still open, one fortnight inside it that has
closed, and an anchor taken on the Beat at that fortnight's boundary. The anchor
reads in prose and names no scale, because the method leaves how convergence is
computed to the implementation and this engagement has none — and it separates
what was examined from what was taken on the record's word.

The example is deliberately non-software: an estimate approval flow is a
capability whose Revisions are procedure changes rather than pull requests, and
`revisions/record-the-approval.yml` cites a procedure section as its evidence.
The method does not assume code.
