# Contributing

Read [AGENTS.md](AGENTS.md) for how work is recorded here. This file covers only
what you need to open a change.

## One thing is required

Name the step your change executes, on a line of its own in the pull request
description:

    Beat-Version: HM-BV-<beat>.<step>

Steps live in `harmonic-method/beats/*/versions/`. Pick the one your change
serves. Exactly one — a change belongs to a single step, so a request spanning
two should be split into two.

Your commits need no trailer. The binding is on the request, because that is
where this method puts a tracked change: `specs/revision.yml` defines one as a
change with a linked request, not as each commit inside it.

## If no step fits

Open one. A step is a short file naming what the change delivers, what it
includes and excludes, and how you would know it is done — see any file under
`versions/` for the shape, and `specs/beat-version.yml` for the fields. A change
with no step to serve is usually two changes, or a step nobody has written down
yet.

If you would rather not, say so in the description and open it as a draft. Some
changes are better discussed before they are planned.

## Before you push

    npm install
    npm run validate

That checks this repository against its own specs. It will tell you it cannot
check the binding, which is correct — that one is checked when a request exists.

## What the checks will not do

They will not judge your prose, and they will not enforce the rules that are not
comparable — that decisions carry reasoning, that an entity is a directory. Those
bind as much as anything mechanical does. `specs/conformance.yml` says which is
which.
