const SEAMS = [
  ['Strategy', 'Product'],
  ['Product', 'Engineering'],
  ['Engineering', 'Execution'],
  ['Humans', 'Agents'],
] as const;

export function Problem() {
  return (
    <section className="hm-section" id="problem">
      <div className="hm-wrap">
        <div className="hm-problem">
          <div>
            <span className="cajon-overline">The problem it addresses</span>
            <h2>Software work fails at the seams.</h2>
            <p className="hm-prose">
              Strategic intent decays every time work is handed off. That accumulated loss is
              decision debt: the gap between what an organization meant to build and what it can
              still account for having built.
            </p>
            <p className="hm-prose">
              The method addresses the seams directly, by naming the functions that act on intent
              and making the quality bar checkable at the moment work is created.
            </p>
          </div>
          <div className="hm-seams">
            {SEAMS.map(([from, to], index) => (
              <div key={from}>
                <div className="hm-seam">
                  <span className="hm-seam__from">{from}</span>
                  <span className="hm-seam__arrow" aria-hidden="true">
                    →
                  </span>
                  <span>{to}</span>
                </div>
                {index < SEAMS.length - 1 && <div className="hm-seam__gap" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
