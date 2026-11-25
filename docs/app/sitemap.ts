import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/components/json-ld';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({ url: `${SITE_URL}${page.url}` }));
}
