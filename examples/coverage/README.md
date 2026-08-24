# A coverage reading, done arithmetically

`skills/coverage-reading/SKILL.md` is the instrument. This is the same two
questions answered by distance rather than by reading, so an adopter who has
embeddings can compare the two.

    node coverage.mjs vectors.json

## What it answers

Two questions, both of them already published as dimensions of the Beat rubric
and neither of them invented here:

- **How far is each Beat from the system Coda?** *Strategically Aligned*, as a
  distance. A Beat that reaches outside the outcome sits far from it.
- **How close is each Beat to its nearest sibling?** *Distinctive*, as a
  distance. A Beat covering ground already taken sits close to whoever took it.

The two close from opposite directions, which is the whole point. Fill the
interior and Beats crowd each other; reach for open ground and you leave the
outcome. In the fixture here `HA-B-001` and `HA-B-003` sit at 0.990 — one is the
appointment, the other is being told when it changes, and the second is arguably
the delivery of the first rather than a capability beside it. Meanwhile
`HA-B-004` and `HA-B-005` are perfectly distinct and barely aligned at all.

## What it is not

**Not an instrument.** It computes nothing the published dimensions do not
already describe, and it decides nothing. The instrument is the skill; this is a
worked illustration of the arithmetic behind it.

**Not a measurement.** The vectors in `vectors.json` are three-dimensional and
placed by hand for a system that does not exist. No model produced them. Three
dimensions because the geometry is legible at three and invisible at a thousand
— you can nearly picture the cap and the crowding.

**Not a capacity.** No threshold is applied and no count of remaining Beats is
produced. Where the boundary falls is a sentence somebody can edit, so a
capacity figure rises whenever the Coda is widened, without a single capability
being added. Rankings say where to look.

## Using it on real vectors

Replace `vectors.json`. The shape is a Coda and a list of Beats, each with an
`id`, a `label`, and a `v` array of any length; an optional `probe` is a
candidate scored against the existing set. Vectors are normalised here, so they
need not arrive as unit vectors.

Three things to know before trusting the numbers:

- **Cosine measures topical proximity, not service.** A Beat can serve an
  outcome in entirely different vocabulary and look distant. This is why the
  skill reads and this only ranks.
- **Embedding spaces are anisotropic.** Similarities between any two texts from
  one corpus cluster in a narrow band, so absolute values mean little and only
  the ordering is informative. Centre on the corpus mean before comparing across
  systems.
- **A distance names its model.** Numbers from two models are not comparable,
  the same way a score names the spec set version it was produced under.

Nothing here installs. Vectors are input; producing them is the adopter's, and
this file does arithmetic on numbers somebody else computed.
