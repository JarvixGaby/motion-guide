"use client";
import { motion, useReducedMotion } from 'framer-motion';

export function BubbleMenuExpandDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  const items = ['Edit', 'Share', 'Pin'];
  const shouldReduceMotion = useReducedMotion();
  const active = isPlaying && !shouldReduceMotion;

  return (
    <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="relative h-40 w-56">
        {items.map((item, index) => {
          const x = [-72, 0, 72][index];
          return (
            <motion.div
              key={item}
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-stone-100 text-[11px] font-semibold text-stone-700 shadow-sm"
              animate={active ? { x, y: -50, opacity: 1, scale: 1 } : { x: 0, y: 0, opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              {item}
            </motion.div>
          );
        })}
        <motion.button
          aria-label="Open action menu"
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-stone-950 text-2xl text-white shadow-xl"
          animate={{ rotate: active ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >
          +
        </motion.button>
      </div>
    </div>
  );
}
