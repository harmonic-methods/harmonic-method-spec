import { createRelativeLink } from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLd, SITE_URL } from '@/components/json-ld';
import { getMDXComponents } from '@/components/mdx';
import { RoleTags } from '@/components/role-tags';
import { source } from '@/lib/source';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: page.data.title,
    description: page.data.description,
    url: `${SITE_URL}${page.url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Harmonic Methods',
      url: SITE_URL,
    },
  };

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <JsonLd data={articleSchema} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <RoleTags accountable={page.data.accountableRoles} supporting={page.data.supportingRoles} />
      <DocsBody className="hm-docs-content">
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const url = page.url;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: page.data.title,
      description: page.data.description,
      url: `${SITE_URL}${url}`,
      siteName: 'Harmonic Methods',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
    },
  };
}
