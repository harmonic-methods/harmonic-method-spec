# Worked example

One conformant Beat, laid out exactly as `harmonic/` is — so what you read here is
what you would copy.

    coda.yml                                         EX-SYS-CODA
    beats/client-estimate-approval/beat.yml          EX-B-001
                                  /notes/            its typed knowledge
                                  /versions/v1-send-and-approve/version.yml
                                                     EX-BV-001.1
                                            .../revisions/    EX-R-001

No file carries an inline child list — every directory is the list. Notes attach
to the Beat; `notes/approval-happens-in-system.yml` shows the optional
`beat_version` field naming the step a decision came from.

The example is deliberately non-software: an estimate approval flow is a
capability whose Revisions are procedure changes rather than pull requests, and
`revisions/record-the-approval.yml` cites a procedure section as its evidence.
The method does not assume code.
