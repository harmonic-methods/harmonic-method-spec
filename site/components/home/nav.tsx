'use client';

import Link from 'next/link';
import { useState } from 'react';

import { BrandMark } from '@/components/brand-mark';

export type HomeNavLink = { label: string; href: string };

/** Sticky homepage nav. Client-side only for the mobile disclosure. */
export function HomeNav({ links }: { links: HomeNavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="hm-nav" aria-label="Primary">
      <div className="hm-nav__inner">
        <Link href="/" className="hm-brand" aria-label="The Harmonic Method — home">
          <BrandMark size={28} />
          <span className="hm-brand__name">The Harmonic Method</span>
        </Link>
        <div className={open ? 'hm-nav__links open' : 'hm-nav__links'} id="hm-nav-links">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link
            href="/docs/getting-started"
            className="cajon-btn cajon-btn--contained cajon-btn--sm"
            onClick={() => setOpen(false)}
          >
            Getting started
          </Link>
        </div>
        <button
          type="button"
          className="hm-menu-btn"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="hm-nav-links"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
