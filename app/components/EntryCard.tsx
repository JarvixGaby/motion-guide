'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { AnimationEntry } from '@/types/entry';
import { getEntrySignal } from '@/lib/entrySignal';
import { DifficultyBadge } from './DifficultyBadge';

export function EntryCard({ entry, DemoComponent }: {
  entry: AnimationEntry;
  DemoComponent: React.ComponentType<{ isPlaying?: boolean }>;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const entrySignal = getEntrySignal(entry);

  return (
    <motion.div
      className="editorial-card group relative flex h-full flex-col gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Absolute overlay link to handle navigation without wrapping interactive nested buttons */}
      <Link
        href={`/entry/${entry.slug}`}
        className="absolute inset-0 z-10 block h-full w-full"
        aria-label={`View ${entry.nameEn} details`}
      />

      {/* Demo preview area (clicks intercepted by relative overlay) */}
      <div className="relative flex aspect-[1.18] w-full items-center justify-center overflow-hidden rounded-sm border border-stone-200 bg-stone-950 transition-colors duration-700 group-hover:bg-stone-900 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.22),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="relative flex h-full w-full items-center justify-center scale-75 transform transition-transform duration-700 ease-out group-hover:scale-90">
          <DemoComponent isPlaying={isHovered} />
        </div>
      </div>

      {/* Entry info */}
      <div className="flex flex-col gap-2.5 px-1">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-2xl font-medium leading-tight text-stone-900 transition-colors duration-300 group-hover:text-stone-500">
            {entry.nameEn}
          </h3>
          <div className="pt-1.5 relative z-20 pointer-events-none">
            {/* Keeping it under the anchor overlay is fine since it's non-interactive, but setting pointer-events-none removes any conflict */}
            <DifficultyBadge difficulty={entry.difficulty} />
          </div>
        </div>
        <p className="line-clamp-1 text-sm leading-relaxed text-stone-500">
          {entry.decisionNote || entry.description}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
          {entrySignal}
        </p>
      </div>
    </motion.div>
  );
}
