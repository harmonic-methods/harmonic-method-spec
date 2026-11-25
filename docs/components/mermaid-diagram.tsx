'use client';

import { useEffect, useId, useRef } from 'react';

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawId = useId();
  // useId produces strings like ":r0:" — strip colons for a valid HTML id
  const id = `mermaid-${rawId.replace(/:/g, '')}`;

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({ startOnLoad: false, theme: 'neutral' });

      if (!ref.current || cancelled) return;
      const { svg } = await mermaid.render(id, chart);
      if (!cancelled && ref.current) {
        ref.current.innerHTML = svg;
      }
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return <div ref={ref} className="my-6 overflow-x-auto" />;
}
