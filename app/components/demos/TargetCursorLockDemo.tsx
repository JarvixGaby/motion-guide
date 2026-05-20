"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const targets = [
  { label: 'Docs', x: -74, y: -43 },
  { label: 'Billing', x: 74, y: -43 },
  { label: 'Team', x: -74, y: 43 },
  { label: 'API', x: 74, y: 43 },
];

export function TargetCursorLockDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTarget = targets[activeIndex];

  useEffect(() => {
    if (!isPlaying) return;

    const loop = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % targets.length);
    }, 1500);

    return () => window.clearInterval(loop);
  }, [isPlaying]);

  return (
    <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="relative grid grid-cols-2 gap-5">
        {targets.map((target, index) => (
          <button
            key={target.label}
            type="button"
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            className="flex h-16 w-28 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 text-sm font-medium text-stone-600 transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            {target.label}
          </button>
        ))}
      </div>
      <motion.div
        className="pointer-events-none absolute h-20 w-32 rounded-2xl border-2 border-amber-400"
        animate={{ x: activeTarget.x, y: activeTarget.y, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      >
        <span className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-amber-400" />
        <span className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-amber-400" />
        <span className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-amber-400" />
        <span className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-amber-400" />
      </motion.div>
      <p className="absolute bottom-5 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
        Hover / focus a target
      </p>
    </div>
  );
}
