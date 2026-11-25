import { createMDX } from 'fumadocs-mdx/next';
import { fileURLToPath } from 'node:url';

const withMDX = createMDX();

export default withMDX({
  reactStrictMode: true,
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
  // The private website and this app can share an origin without sharing chunks.
  assetPrefix: '/docs-assets',
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/docs-assets/_next/:path*', destination: '/_next/:path*' },
        { source: '/docs/:path*.md', destination: '/llms.mdx/docs/:path*' },
        { source: '/docs.md', destination: '/llms.mdx/docs' },
      ],
    };
  },
});
