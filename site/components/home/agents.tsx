const SPEC_URL = 'https://github.com/harmonic-methods/harmonic-method-spec';

const SPEC_BLURB =
  'The specification and agent skills: the entity specs, the quality rubrics, and the skills that apply them. Open to practise with any tools.';

function Spec({ released }: { released: boolean }) {
  const tag = <div className="cajon-concept-card__tag">Open source</div>;

  // Until the repository is public and tagged there is nothing to link to, so
  // the card describes the specification without an outbound link.
  if (!released) {
    return (
      <div className="cajon-concept-card">
        {tag}
        <h3>The Harmonic Method specification</h3>
        <p>{SPEC_BLURB} Not yet publicly released.</p>
      </div>
    );
  }

  return (
    <a href={SPEC_URL} target="_blank" rel="noopener noreferrer" className="cajon-concept-card">
      {tag}
      <h3>The Harmonic Method specification</h3>
      <p>{SPEC_BLURB}</p>
      <span className="cajon-card-link">View on GitHub →</span>
    </a>
  );
}

export function Agents({ specReleased }: { specReleased: boolean }) {
  return (
    <section className="hm-section" id="agents">
      <div className="hm-wrap">
        <div className="hm-shead">
          <span className="cajon-overline">Agents and tooling</span>
          <h2>Rubrics that name the function they serve</h2>
          {/* Three instruments, not one per function. The specification states
           * the two absences rather than filling them, on the grounds that an
           * instrument built to complete the set would imply evidence that is
           * not there — so this copy must not imply a complete set either. */}
          <p>
            Three published rubrics, each naming the function it serves: the Beat rubric for the
            Composer, the Beat Version rubric for the Orchestrator, and Coda reconciliation for the
            Conductor. The Producer and the Promoter have none — a stated gap rather than a filled
            one. Each rubric assesses; none of them enforces, and the judgment stays with whoever
            holds the function.
          </p>
        </div>
        <div className="cajon-card-grid">
          <Spec released={specReleased} />
          {/* Harmonica has no public page yet, so this card carries no link. */}
          <div className="cajon-concept-card">
            <div className="cajon-concept-card__tag">Platform</div>
            <h3>Harmonica</h3>
            <p>
              The reference implementation, for teams that want the method operated rather than
              assembled.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
