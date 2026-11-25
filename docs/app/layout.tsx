import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { SITE_URL } from '@/components/json-ld';

import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | The Harmonic Method',
    default: 'The Harmonic Method — Documentation',
  },
  description: 'The Harmonic Method: explicit intent, preserved context, and decision lineage.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider search={{ options: { api: '/api/docs/search' } }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
