import Link from 'next/link';

const FUNCTIONS = [
  {
    verb: 'Owns strategic direction',
    role: 'Director',
    blurb:
      'Sets direction and tests whether its assumptions still hold as needs and conditions change.',
    href: '/docs/method/roles#director',
  },
  {
    verb: 'Defines the system and its intent',
    role: 'Composer',
    blurb:
      'Defines coherent systems, capabilities, outcomes, and constraints that serve the strategic direction.',
    href: '/docs/method/roles#composer',
  },
  {
    verb: 'Turns intent into structure',
    role: 'Orchestrator',
    blurb:
      'Sequencing, dependencies, and assignment of performers. Agents are first-class performers here, not tools.',
    href: '/docs/method/roles#orchestrator',
  },
  {
    verb: 'Leads day-to-day execution',
    role: 'Conductor',
    blurb:
      'Coordinates people and agents, resolves blockers, and keeps decisions in force within agreed boundaries.',
    href: '/docs/method/roles#conductor',
  },
  {
    verb: 'Owns investment and value',
    role: 'Producer',
    blurb: 'Judges value against cost and decides what to fund, continue, reshape, or stop.',
    href: '/docs/method/roles#producer',
  },
  {
    verb: 'Carries the work to its audience',
    role: 'Promoter',
    blurb:
      'Owns whether the work is known, understood, and taken up by the people it was made for.',
    href: '/docs/method/roles#promoter',
  },
];

export function Functions() {
  return (
    <section className="hm-section hm-section--alt" id="functions">
      <div className="hm-wrap">
        <div className="hm-shead">
          <span className="cajon-overline">Structure of the method</span>
          <h2>Six Harmonic Method roles</h2>
          <p>
            Each role carries a distinct accountability at the scope of the work.
            One person may hold several roles.
          </p>
        </div>
        <div className="hm-fn-grid">
          {FUNCTIONS.map((fn) => (
            <Link key={fn.role} className="hm-fn-card" href={fn.href}>
              <span className="hm-fn-card__verb">{fn.verb}</span>
              <span className="hm-fn-card__role">{fn.role}</span>
              <p>{fn.blurb}</p>
              <span className="cajon-card-link">Read the role →</span>
            </Link>
          ))}
        </div>
        <div className="cajon-callout">
          The diagnostic value of the method is not in creating new job titles. It is in revealing
          which role is currently unowned — unowned accountabilities are where decision debt
          accumulates.
        </div>
      </div>
    </section>
  );
}
