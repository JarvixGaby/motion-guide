'use client';

import { useId } from 'react';
import { LayoutGroup } from 'framer-motion';
import { demoRegistry } from '@/components/demos';

export function MiniDemoPreview({
  slug,
  label,
  compact = false,
}: {
  slug: string;
  label: string;
  compact?: boolean;
}) {
  const layoutScopeId = useId();
  const DemoComponent = demoRegistry[slug];

  if (!DemoComponent) return null;

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-[8px] border border-stone-200 bg-stone-950 ${compact ? 'h-36' : 'h-44'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.2),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_48%)]" />
      <div className={`relative flex h-full w-full items-center justify-center ${compact ? 'scale-[0.48]' : 'scale-[0.56]'}`}>
        <LayoutGroup id={layoutScopeId}>
          <DemoComponent isPlaying={true} />
        </LayoutGroup>
      </div>
      <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/25 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-white/55 backdrop-blur">
        {label}
      </span>
    </div>
  );
}
