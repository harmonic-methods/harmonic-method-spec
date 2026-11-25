import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

import { BrandMark } from '@/components/brand-mark';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="hm-docs-brand">
          <BrandMark size={24} />
          <span className="hm-docs-brand__name">The Harmonic Method</span>
          <span className="hm-docs-brand__docs">Docs</span>
        </span>
      ),
      // The lockup links to the site root.
      url: '/',
    },
  };
}
