import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

export async function GET() {
  const pages = source.getPages();
  const sections: string[] = [];

  for (const page of pages) {
    // Clean Markdown (JSX/exports/frontmatter stripped), same pipeline as the
    // per-page .md routes — keeps the full corpus consistent and LLM-legible.
    const text = await getLLMText(page);
    if (text) sections.push(text.trim());
  }

  return new Response(sections.join('\n\n---\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
