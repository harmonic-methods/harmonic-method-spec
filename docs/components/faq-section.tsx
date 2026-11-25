import { JsonLd, faqPageSchema, type FaqEntry } from './json-ld';

/**
 * Renders an accessible FAQ list and its FAQPage JSON-LD from a single source.
 * Generating both from one `entries` array guarantees the structured data
 * matches the visible answers — a mismatch is an answer-engine penalty.
 */
export function FaqSection({
  entries,
  label = 'Frequently asked questions',
}: {
  entries: FaqEntry[];
  label?: string;
}) {
  return (
    <>
      <ul className="cajon-faq-list" aria-label={label}>
        {entries.map((entry) => (
          <li className="cajon-faq-item" key={entry.question}>
            <div className="cajon-faq-question">{entry.question}</div>
            <div className="cajon-faq-answer">
              <p>{entry.answer}</p>
            </div>
          </li>
        ))}
      </ul>
      <JsonLd data={faqPageSchema(entries)} />
    </>
  );
}
