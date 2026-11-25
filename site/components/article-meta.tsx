import type { ReactNode } from 'react';

export interface ArticleMetaItem {
  label: string;
  value: ReactNode;
}

/**
 * Byline / metadata block for article-style pages (e.g. Origins).
 * Pure renderer —
 * styling lives in app/global.css (`.hm-article-meta`).
 */
export function ArticleMeta({ items }: { items: ArticleMetaItem[] }) {
  return (
    <div className="hm-article-meta" role="region" aria-label="Article metadata">
      {items.map((item) => (
        <div className="hm-meta-field" key={item.label}>
          <span className="hm-meta-label">{item.label}</span>
          <span className="hm-meta-value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
