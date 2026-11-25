import Link from 'next/link';

const DOC_CARDS = [
  {
    tag: 'Overview',
    title: 'What the method is',
    blurb:
      'The problem it addresses, why "method" rather than "framework", and how the functions fit together.',
    cta: 'Read the overview →',
    href: '/docs/method/overview',
  },
  {
    tag: 'Foundation',
    title: 'Primitives',
    blurb:
      'Note, Coda, Beat, Beat Version, and Revision — the self-similar objects every function acts on.',
    cta: 'Explore the concepts →',
    href: '/docs/method/primitives',
  },
  {
    tag: 'Evaluation',
    title: 'The quality model',
    blurb: 'Assess a Coda, evaluate a Beat Version plan, and review how capabilities fit together.',
    cta: 'Review the model →',
    href: '/docs/method/quality',
  },
  {
    tag: 'Pathway',
    title: 'Getting started',
    blurb: 'Try a sample capability review, then apply the method to your own work.',
    cta: 'Begin here →',
    href: '/docs/getting-started',
  },
];

export function DocsGrid() {
  return (
    <section className="hm-section hm-section--alt" id="docs">
      <div className="hm-wrap">
        <div className="hm-shead">
          <span className="cajon-overline">Documentation</span>
          <h2>Everything needed to practise it</h2>
          <p>
            The method is published in full: its primitives, its quality model, and the structures
            the work is arranged against.
          </p>
        </div>
        <div className="cajon-card-grid">
          {DOC_CARDS.map((card) => (
            <Link key={card.title} href={card.href} className="cajon-concept-card">
              <div className="cajon-concept-card__tag">{card.tag}</div>
              <h3>{card.title}</h3>
              <p>{card.blurb}</p>
              <span className="cajon-card-link">{card.cta}</span>
            </Link>
          ))}
        </div>
        <div className="hm-section__foot">
          <Link href="/docs" className="cajon-btn cajon-btn--outlined cajon-btn--md">
            Browse all documentation →
          </Link>
        </div>
      </div>
    </section>
  );
}
