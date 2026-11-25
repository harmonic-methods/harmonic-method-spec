import Link from 'next/link';

export function Cta() {
  return (
    <section className="hm-cta">
      <h2>Start with the destination.</h2>
      <p>
        Read the method in full, and see how a Coda, its Beats, and the Notes behind them keep
        intent intact across the life of a system.
      </p>
      <div className="hm-cta__actions">
        <Link href="/docs" className="cajon-btn cajon-btn--contained cajon-btn--lg">
          Read the docs
        </Link>
        <Link href="/docs/getting-started" className="cajon-btn cajon-btn--outlined cajon-btn--lg">
          Getting started →
        </Link>
      </div>
    </section>
  );
}
