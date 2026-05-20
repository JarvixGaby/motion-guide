'use client';

import { useEffect, useState } from 'react';
import { LayoutGroup, motion } from 'framer-motion';

const options = ['Overview', 'Compare', 'Build'];

export function ActivePillSlideDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isPlaying) {
      setActiveIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % options.length);
    }, 1400);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-stone-50 p-4">
        <LayoutGroup>
          <div className="flex rounded-full border border-stone-200 bg-white p-1 shadow-sm">
            {options.map((option, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative min-w-0 flex-1 overflow-hidden rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-pill-slide-demo"
                      className="absolute inset-0 rounded-full bg-stone-950"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{option}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 rounded-xl border border-stone-200 bg-white p-4"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
            Selected mode
          </p>
          <p className="mt-2 font-display text-xl font-medium text-stone-900">
            {options[activeIndex]}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-stone-500">
            The moving pill shows continuity while the content below updates.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
