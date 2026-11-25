const ALTITUDES = [
  {
    altitude: 'Capability Beat or track',
    unit: 'A discrete piece of work',
    question: 'Is this capability distinct, coherent, and aimed at the Coda?',
  },
  {
    altitude: 'System',
    unit: 'A system',
    question: 'Does this system earn its keep, evaluated exactly as a Beat would be?',
  },
  {
    altitude: 'Portfolio',
    unit: 'The set of systems',
    question:
      'Which capabilities exist, where do they overlap, and does the set advance strategic intent?',
  },
];

export function Altitude() {
  return (
    <section className="hm-section" id="altitude">
      <div className="hm-wrap">
        <div className="hm-shead">
          <span className="cajon-overline">Altitude</span>
          <h2>The same functions, at every altitude</h2>
          <p>
            Altitude is a property of the work, not of the role. Because the primitives are
            self-similar, altitude is recursion rather than a special case — only the unit of work
            changes.
          </p>
        </div>
        <div className="hm-table-scroll">
          <table className="hm-table">
            <thead>
              <tr>
                <th scope="col">Altitude</th>
                <th scope="col">Unit of work</th>
                <th scope="col">The question at this altitude</th>
              </tr>
            </thead>
            <tbody>
              {ALTITUDES.map((row) => (
                <tr key={row.altitude}>
                  <td>{row.altitude}</td>
                  <td>{row.unit}</td>
                  <td>{row.question}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="hm-note">
          Test for correct abstraction: each function&rsquo;s definition must be writable without
          naming a specific altitude.
        </p>
      </div>
    </section>
  );
}
