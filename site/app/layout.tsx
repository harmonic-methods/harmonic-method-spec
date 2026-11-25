import { GoogleTagManager } from '@next/third-parties/google';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@fontsource-variable/inter';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/jetbrains-mono';

import { JsonLd, SITE_URL } from '@/components/json-ld';

import './global.css';

const SITE_NAME = 'Harmonic Methods';
const SITE_TAGLINE = 'Harmonic Methods — A Delivery Method Built for AI Coding Agents';
const SITE_DESCRIPTION =
  'Harmonic Methods — the delivery method built for AI coding agents and AI-native software delivery: Composition, Orchestration, and Portfolio frameworks for building software where intent is explicit, context is preserved, and people and agents stay aligned.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Harmonic Methods',
    default: SITE_TAGLINE,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'AI coding agents',
    'coding agents',
    'AI-native software delivery',
    'software development methodology',
    'managing AI coding agents',
    'context engineering',
    'Harmonic Methods',
    'Harmonic Composition',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Codazen',
  url: 'https://codazen.com',
  brand: {
    '@type': 'Brand',
    name: SITE_NAME,
    url: SITE_URL,
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <RootProvider search={{ options: { api: '/api/docs/search' } }}>
          {children}
          {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID} />
          )}
        </RootProvider>
      </body>
    </html>
  );
}
