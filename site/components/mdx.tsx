import defaultMdxComponents from 'fumadocs-ui/mdx';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import type { MDXComponents } from 'mdx/types';

import { ArticleMeta } from './article-meta';
import { FaqSection } from './faq-section';
import { JsonLd } from './json-ld';
import { MermaidDiagram } from './mermaid-diagram';
import { StarterKitDownload } from './starter-kit-download';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    pre: ({ title, ...props }) => (
      <CodeBlock {...props} title={title} aria-label={title}>
        <Pre {...props} />
      </CodeBlock>
    ),
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
