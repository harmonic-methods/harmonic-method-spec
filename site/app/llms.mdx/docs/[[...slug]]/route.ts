import { notFound } from 'next/navigation';

import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

// Static export model — markdown is generated at build time, one file per page.
export const dynamic = 'force-static';

interface RouteContext {
  params: Promise<{ slug?: string[] }>;
}

export async function GET(_req: Request, { params }: RouteContext) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const text = await getLLMText(page);

  return new Response(text, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
