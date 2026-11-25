import type { InferPageType } from 'fumadocs-core/source';
import { remark } from 'remark';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdx from 'remark-mdx';
import { SKIP, visit } from 'unist-util-visit';

import type { source } from '@/lib/source';

type Page = InferPageType<typeof source>;

// MDX nodes that carry no Markdown content — drop them entirely.
const DROP_TYPES = new Set([
  'mdxjsEsm', // import / export statements (incl. `export const … = […]`)
  'mdxFlowExpression', // `{…}` block expressions
  'mdxTextExpression', // `{…}` inline expressions
  'yaml', // frontmatter
  'toml',
]);

// JSX wrappers (`<div>`, `<p>`, `<FaqSection/>`…) — unwrap so the Markdown
// prose nested inside them survives, then drop the wrapper itself.
const UNWRAP_TYPES = new Set(['mdxJsxFlowElement', 'mdxJsxTextElement']);

interface NodeWithChildren {
  type: string;
  children: NodeWithChildren[];
}

function stripMdx() {
  return (tree: unknown) => {
    visit(tree as Parameters<typeof visit>[0], (node, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      const p = parent as unknown as NodeWithChildren;
      const children = (node as Partial<NodeWithChildren>).children ?? [];
      // Unwrap JSX elements: replace each with its children, then re-visit in
      // place so nested JSX (and any now-exposed nodes) are handled too.
      if (UNWRAP_TYPES.has(node.type)) {
        p.children.splice(index, 1, ...children);
        return index;
      }
      // Remove content-free MDX/ESM/frontmatter nodes outright.
      if (DROP_TYPES.has(node.type)) {
        p.children.splice(index, 1);
        return [SKIP, index];
      }
    });
  };
}

const processor = remark()
  .use(remarkFrontmatter, ['yaml'])
  .use(remarkMdx)
  .use(stripMdx);

/** Convert raw MDX source into clean Markdown (JSX/exports/frontmatter stripped). */
export async function mdxToMarkdown(raw: string): Promise<string> {
  const file = await processor.process(raw);
  return String(file).trim();
}

/** Clean Markdown for a docs page: `# Title` + URL + description + processed body. */
export async function getLLMText(page: Page): Promise<string> {
  // Fumadocs embeds this text in the compiled collection. No runtime filesystem
  // scan or private monorepo files are needed in the deployment.
  const body = await mdxToMarkdown(await page.data.getText('processed'));
  const title = page.data.title ?? '';
  const description = page.data.description ?? '';
  const header = `# ${title}\nURL: ${page.url}${description ? `\n\n> ${description}` : ''}`;

  return `${header}\n\n${body}\n`;
}
