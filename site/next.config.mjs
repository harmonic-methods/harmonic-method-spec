import { createMDX } from 'fumadocs-mdx/next';
import { fileURLToPath } from 'node:url';

const withMDX = createMDX();

export default withMDX({
  reactStrictMode: true,
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
  async redirects() {
    return [
      { source: '/docs/method/overview', destination: '/docs', permanent: true },
      { source: '/docs/method/overview.md', destination: '/docs.md', permanent: true },
      { source: '/docs/method/metaphor', destination: '/docs/glossary', permanent: true },
      { source: '/docs/method/metaphor.md', destination: '/docs/glossary.md', permanent: true },
      { source: '/docs/method/delivery', destination: '/docs/implementation/plan-beat-versions', permanent: true },
      { source: '/docs/method/delivery.md', destination: '/docs/implementation/plan-beat-versions.md', permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/docs/:path*.md', destination: '/llms.mdx/docs/:path*' },
        { source: '/docs.md', destination: '/llms.mdx/docs' },
      ],
    };
  },
});
