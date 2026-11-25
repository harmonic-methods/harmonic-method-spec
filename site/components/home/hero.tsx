import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <header className="hm-hero" id="hero">
      <div className="hm-hero__inner">
        <div>
          <span className="hm-hero__eyebrow">The Harmonic Method</span>
          <h1>Systems where intent survives the handoff.</h1>
          <p className="hm-hero__lead">
            A method for building and operating software that humans and agents run together.
          </p>
          <div className="hm-hero__actions">
            {/* Use the documentation until the repository is publicly reachable. */}
            <Link href="/docs" className="cajon-btn cajon-btn--contained cajon-btn--lg">
              Read the specification
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
