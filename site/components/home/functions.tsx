import Link from 'next/link';

const FUNCTIONS = [
  {
    verb: 'Establishes intent',
    role: 'Composer',
    blurb:
      'Defines what must become true and why, and the constraints that bound it. Owns the North Star and the definition of the work.',
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
    verb: 'Holds coherence during execution',
    role: 'Conductor',
    blurb:
      'Real-time judgment when reality diverges from the plan. Detects drift and reanchors the work to intent.',
    href: '/docs/method/roles#conductor',
  },
  {
    verb: 'Owns value',
    role: 'Producer',
    blurb: 'Decides whether the work earns its keep: what gets funded, and what gets made.',
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
          <h2>Five functions that act on intent</h2>
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
              <span className="cajon-card-link">Read the function →</span>
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
