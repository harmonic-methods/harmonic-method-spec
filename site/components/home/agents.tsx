import { HARMONICA_URL, SPEC_REPOSITORY_URL } from '@/lib/links';

const SPEC_BLURB =
  'The specification and agent skills: the entity specs, the quality rubrics, and the skills that apply them. Open to practice with any tools.';

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
    <a href={SPEC_REPOSITORY_URL} target="_blank" rel="noopener noreferrer" className="cajon-concept-card">
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
          <p>
            Agents can draft a capability, check a plan, reconcile a Coda chain, or assess a root
            Coda. The published instruments make the reasoning visible so the person accountable
            for the work can decide what to do with it.
          </p>
        </div>
        <div className="cajon-card-grid">
          <Spec released={specReleased} />
          <a href={HARMONICA_URL} id="harmonica-home" target="_blank" rel="noopener noreferrer" className="cajon-concept-card">
            <div className="cajon-concept-card__tag">Platform</div>
            <h3>Harmonica</h3>
            <p>
              The reference implementation, for teams that want the method operated rather than
              assembled.
            </p>
            <span className="cajon-card-link">Learn more at Codazen →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
