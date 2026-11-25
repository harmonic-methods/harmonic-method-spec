# Try the Harmonic Method

Start with a review of a proposed capability. The review gives you a score and
reason for each dimension, an overall verdict, and a practical next edit.

Use your organization's approved AI workspace and only documents it permits you
to process there. With either option below, that workspace may process file
contents in the cloud.

## Review one document in chat

1. Attach `review-a-capability.md` and `sample-capability.md` to a new chat.
2. Paste this prompt.

   > Follow the Harmonic Method rubric in review-a-capability.md to assess the
   > proposed capability in the other attachment. Cite the document in your
   > reasons and recommend the single most useful improvement. Flag missing
   > context instead of making it up.

To use your own document, attach it in place of `sample-capability.md`. A brief
describing an ongoing capability works well. Include the outcome it serves if
you have it so the review can assess strategic alignment.

## Work with files in a folder

If your approved desktop AI app cannot open a local folder, use
[Review one document in chat](#review-one-document-in-chat) in an approved
workspace that allows attachments.

1. Open this unzipped folder in your approved desktop AI app. Grant access to
   this folder.
2. Paste this prompt.

   > Read skills/coda-quality-check/SKILL.md and follow it to review the
   > capability in sample-capability.md. Read the referenced specs, report the
   > rubric's results, and recommend the single most useful improvement.
   > Leave the source files as they are.

To review your own files, put copies in `your-files/` and replace
`sample-capability.md` in the prompt with the path to the file you want reviewed.

| What you want to do next | Skill to ask the assistant to read |
| --- | --- |
| Turn a rough idea into a capability and a clear outcome | `skills/beat-composing/SKILL.md` |
| Review the plan for the next step | `skills/beat-version-quality-check/SKILL.md` |
| Check whether decisions still support the intended outcome | `skills/coda-alignment-check/SKILL.md` |

## Choose how to save your work

After trying the sample, choose one initiative and follow the shared guides at
[Getting started](https://harmonicmethods.com/docs/getting-started).

- **Work with documents (recommended).** Save Notes, the System Coda, a
  Capability Beat draft and its review in a document or Markdown files. The
  guides explain what to save at each step. No Git setup is required.
- **Use a repository.** Give a coding agent access to this kit's specs, skills
  and examples. Follow [the repository guide](https://harmonicmethods.com/docs/implementation/use-a-repository)
  to create structured records under `harmonic-method/`, validate them with the
  separately available checker, review the changes and commit through your
  team's normal process. Initial unattached capture stays in a working document.

You can move confirmed document content into repository records later. Optional
[assistant and AGENTS.md instructions](https://harmonicmethods.com/docs/appendix/llm-setup#method-instructions)
help keep the method available for recurring work.

Treat the review as advice. Decisions and approvals stay with the people
responsible for the work.

The Harmonic Method is by Codazen, Inc. See [LICENSE-CONTENT](LICENSE-CONTENT)
and [TRADEMARKS.md](TRADEMARKS.md).
