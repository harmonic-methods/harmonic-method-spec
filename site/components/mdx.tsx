import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

import { ArticleMeta } from './article-meta';
import { FaqSection } from './faq-section';
import { JsonLd } from './json-ld';
import { MermaidDiagram } from './mermaid-diagram';
import { StarterKitDownload } from './starter-kit-download';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ArticleMeta,
    FaqSection,
    JsonLd,
    MermaidDiagram,
    StarterKitDownload,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
