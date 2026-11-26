import { createMDX } from 'fumadocs-mdx/next';
import { fileURLToPath } from 'node:url';

const withMDX = createMDX();

const retiredDocs = [
  ['/docs/composition', '/docs'],
  ['/docs/composition/key-concepts', '/docs/method/primitives'],
  ['/docs/composition/notes', '/docs/method/primitives#note'],
  ['/docs/composition/coda', '/docs/method/primitives#coda'],
  ['/docs/composition/beats', '/docs/method/primitives#beat'],
  ['/docs/composition/beat-versions', '/docs/method/primitives#beat-versions'],
  ['/docs/composition/beat-arc', '/docs/implementation/plan-beat-versions'],
  ['/docs/composition/quality-gates', '/docs/method/quality#dimensions'],
  ['/docs/composition/example', '/docs/implementation/scheduling-example'],
  ['/docs/orchestration', '/docs/method/coordination'],
  ['/docs/portfolio', '/docs/method/value#portfolio'],
];

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
      ...retiredDocs.flatMap(([source, destination]) => [
        { source, destination, permanent: true },
        { source: `${source}.md`, destination: `${destination.split('#')[0]}.md`, permanent: true },
      ]),
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
