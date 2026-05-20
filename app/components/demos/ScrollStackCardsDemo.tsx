"use client";
import { motion, useReducedMotion } from 'framer-motion';

export function ScrollStackCardsDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  const cards = ['Discover', 'Compare', 'Choose'];
  const shouldReduceMotion = useReducedMotion();
  const active = isPlaying && !shouldReduceMotion;

  return (
    <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="relative h-40 w-64">
        {cards.map((card, index) => (
          <motion.div
            key={card}
            className="absolute left-0 top-0 flex h-28 w-full items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-5 shadow-sm"
            animate={{
              y: active ? index * 28 : index * 14,
              scale: active ? 1 - index * 0.04 : 1 - index * 0.02,
              opacity: 1 - index * 0.12,
            }}
            transition={{ duration: 0.55, delay: index * 0.06, repeat: active ? Infinity : 0, repeatType: 'reverse', ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-sm font-semibold text-stone-900">{card}</span>
            <span className="font-mono text-xs text-stone-400">0{index + 1}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
