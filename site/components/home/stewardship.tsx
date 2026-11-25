import Image from 'next/image';

const CODAZEN_URL = 'https://codazen.com';

// The strip sits on --cajon-color-bg-paper, which is white in light and #16253a
// in dark, so both lockups ship and home.css shows the right one per theme.
const WORDMARK = { width: 103, height: 22 };

export function Stewardship() {
  return (
    <section className="hm-logos" aria-label="Stewardship">
      <div className="hm-wrap">
        <div className="hm-logos__inner">
          <span className="hm-logos__cap">Stewarded by</span>
          <a
            className="hm-logo"
            href={CODAZEN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Codazen"
          >
            <Image
              className="hm-logo__mark hm-logo__mark--light"
              src="/brand/codazen-wordmark-primary-black.svg"
              alt=""
              {...WORDMARK}
            />
            <Image
              className="hm-logo__mark hm-logo__mark--dark"
              src="/brand/codazen-wordmark-primary-white.svg"
              alt=""
              {...WORDMARK}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
