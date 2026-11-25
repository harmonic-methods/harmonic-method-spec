import Link from 'next/link';

import { BrandMark } from '@/components/brand-mark';

const FOOTER_COLUMNS = [
  {
    heading: 'The method',
    links: [
      { label: 'Overview', href: '/docs/method/overview' },
      { label: 'The five functions', href: '/docs/method/roles' },
      { label: 'Primitives', href: '/docs/method/primitives' },
      { label: 'The quality model', href: '/docs/method/quality' },
      { label: 'The metaphor', href: '/docs/method/metaphor' },
    ],
  },
  {
    heading: 'Docs',
    links: [
      { label: 'All documentation', href: '/docs' },
      { label: 'Getting started', href: '/docs/getting-started' },
      { label: 'Glossary', href: '/docs/glossary' },
      { label: 'FAQ', href: '/docs/faq' },
    ],
  },
  {
    heading: 'More',
    links: [
      { label: 'AI coding agents', href: '/docs/ai-coding-agents' },
      { label: 'Comparisons', href: '/docs/comparisons' },
      { label: 'About', href: '/docs/about' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="hm-footer">
      <div className="hm-footer__inner">
        <div className="hm-footer__top">
          <div>
            <Link href="/" className="hm-footer__brand">
              <BrandMark size={26} onDark />
              <span>The Harmonic Method</span>
            </Link>
            <p className="hm-footer__blurb">
              The Harmonic Method — one method for building software where intent is explicit,
              durable, and preserved across handoffs.
            </p>
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <div className="hm-fcol" key={column.heading}>
              <h4>{column.heading}</h4>
              {column.links.map((link) => (
                <Link key={link.label} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="hm-footer__bottom">
          <p className="hm-footer__legal">
            The Harmonic Method&trade; is stewarded by{' '}
            <a href="https://codazen.com" target="_blank" rel="noopener noreferrer">
              Codazen, Inc.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
