export const SITE_URL = 'https://www.harmonicmethods.com';

/**
 * Server-rendered JSON-LD <script> block. Emitted into the page markup so
 * search crawlers and AI answer engines can read structured data without
 * executing JavaScript. Next.js documents this exact pattern for JSON-LD.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export interface FaqEntry {
  question: string;
  /** Plain-text answer. Must match the answer shown on the page (AEO requires it). */
  answer: string;
}

export function faqPageSchema(entries: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };
}
