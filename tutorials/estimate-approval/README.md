# Estimate approval status

A fictional, read-only implementation of the Harmonic Method getting-started example.

The files under `harmonic-method/` connect a shared outcome to one capability, a decision, and a bounded plan. `status.test.mjs` verifies the plan's display rules; `index.html` shows the result. The example supplies records directly. It is not a production approval or authorization service.

From this directory:

```sh
node --test status.test.mjs
python3 -m http.server 3510 --bind 127.0.0.1
```

Open http://127.0.0.1:3510. Stop the server with Ctrl-C.

From the spec repository root, install its dependencies, then validate the example:

```sh
npm install
node tools/validate.mjs tutorials/estimate-approval/harmonic-method
```

Expected behavior: no recorded approver decision is Pending; the designated approver's decision is Approved or Declined; another actor's decision leaves Pending; an unknown outcome or missing approver displays Unavailable. The last fixture demonstrates an ignored decision by another actor.

The sample Beat Version stays active while its PR is unmerged. This repository uses the PR as the tracked Revision, so there is no duplicate Revision YAML file. A `Beat-Version:` trailer in this repository's PR body identifies the root plan that delivers this teaching example; the nested `DEMO-*` records illustrate the adoption workflow.

Scope deliberately excludes approval entry, authentication, sending estimates, notifications and production integration. Review those separately before adapting this example to a real application.
