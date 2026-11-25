import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <header className="hm-hero" id="hero">
      <div className="hm-hero__inner">
        <div>
          <span className="hm-hero__eyebrow">The Harmonic Method</span>
          <h1>Build software where intent survives the handoff.</h1>
          <p className="hm-hero__lead">
            Keep intent explicit and durable across handoffs from strategy to product, product to
            engineering, and people to agents.
          </p>
          <div className="hm-hero__actions">
            <Link href="/docs" className="cajon-btn cajon-btn--contained cajon-btn--lg">
              Read the docs
            </Link>
            <Link href="/docs/method/roles" className="cajon-btn cajon-btn--outlined cajon-btn--lg">
              See the five functions →
            </Link>
          </div>
        </div>
        <div className="hm-hero__mark">
          <Image
            src="/brand/fo-mark-depth-deep-reverse.svg"
            alt=""
            width={340}
            height={340}
            priority
          />
        </div>
      </div>
    </header>
  );
}
