import type { InferPageType } from 'fumadocs-core/source';

import { source } from '@/lib/source';

type Page = InferPageType<typeof source>;

const SITE_URL = 'https://harmonicmethods.com';

export const dynamic = 'force-static';

export async function GET() {
  const pages = source.getPages();

  const lines: string[] = [
    '# Harmonic Methods',
    '',
    '> The Harmonic Method is the delivery method built for AI coding agents — one method, named functions scoped by altitude, for AI-native software delivery, where agents carry out execution against an explicit, structured representation of intent while people own the destination, judgment, and review. It exists because once coding agents can write code faster than any human team, the bottleneck shifts upstream to clarity of intent, durable capability definitions, and preserved reasoning (context engineering).',
    '',
    '## Start here',
    '',
    `- [A Delivery Method Built for AI Coding Agents](${SITE_URL}/docs/ai-coding-agents.md): What AI coding agents need from a delivery method, how to manage them at scale, and what AI-native software delivery means.`,
    `- [Composition](${SITE_URL}/docs/composition.md): The founding area of the Harmonic Method — the methodology for AI-native software delivery within a single system.`,
    `- [Partnering with AI Agents](${SITE_URL}/docs/partnering-with-agents.md): How people and agents divide the work, and what structured context makes possible.`,
    '',
    '## Documentation',
    '',
    ...pages.map((page: Page) => {
      const description = page.data.description ?? '';
      return `- [${page.data.title}](${SITE_URL}${page.url}.md)${description ? `: ${description}` : ''}`;
    }),
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
