import Link from 'next/link';

// Composition owns the Composer function; Orchestration owns both Orchestrator
// and Conductor; Portfolio owns the Producer. Promoter has no docs section yet,
// so it points at the overview and says so in its call to action.
const FUNCTIONS = [
  {
    verb: 'Establishes intent',
    role: 'Composer',
    blurb:
      'Defines what must become true and why, and the constraints that bound it. Owns the North Star and the definition of the work.',
    href: '/docs/composition',
    cta: 'Read the function →',
  },
  {
    verb: 'Turns intent into structure',
    role: 'Orchestrator',
    blurb:
      'Sequencing, dependencies, and assignment of performers. Agents are first-class performers here, not tools.',
    href: '/docs/orchestration',
    cta: 'Read the function →',
  },
  {
    verb: 'Holds coherence during execution',
    role: 'Conductor',
    blurb:
      'Real-time judgment when reality diverges from the plan. Detects drift and reanchors the work to intent.',
    href: '/docs/orchestration',
    cta: 'Read the function →',
  },
  {
    verb: 'Owns value',
    role: 'Producer',
    blurb: 'Decides whether the work earns its keep: what gets funded, and what gets made.',
    href: '/docs/portfolio',
    cta: 'Read the function →',
  },
  {
    verb: 'Carries the work to its audience',
    role: 'Promoter',
    blurb:
      'Owns whether the work is known, understood, and taken up by the people it was made for.',
    href: '/docs',
    cta: 'Read the overview →',
  },
];

export function Functions() {
  return (
    <section className="hm-section hm-section--alt" id="functions">
      <div className="hm-wrap">
        <div className="hm-shead">
          <span className="cajon-overline">Structure of the method</span>
          <h2>The functions that act on intent</h2>
          <p>
            The functions are constant. What varies is the altitude at which a given function is
            scoped. They are functions, not headcount — in a small organization one person may hold
            three of them.
          </p>
        </div>
        <div className="hm-fn-grid">
          {FUNCTIONS.map((fn) => (
            <Link key={fn.role} className="hm-fn-card" href={fn.href}>
              <span className="hm-fn-card__verb">{fn.verb}</span>
              <span className="hm-fn-card__role">{fn.role}</span>
              <p>{fn.blurb}</p>
              <span className="cajon-card-link">{fn.cta}</span>
            </Link>
          ))}
        </div>
        <div className="cajon-callout">
          The diagnostic value of the method is not in creating new job titles. It is in revealing
          which function is currently unowned — unowned functions are where decision debt
          accumulates.
        </div>
      </div>
    </section>
  );
}
