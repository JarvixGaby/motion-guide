"use client";
import { motion, useReducedMotion } from 'framer-motion';

export function StaggeredMenuOpenDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const active = isPlaying && !shouldReduceMotion;

  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="w-full max-w-xs rounded-2xl border border-stone-200 bg-stone-50 p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-stone-900">Menu</span>
          <motion.span animate={{ rotate: active ? 90 : 0 }} className="text-stone-400">→</motion.span>
        </div>
        <div className="space-y-2">
          {['Dashboard', 'Reports', 'Settings', 'Help'].map((item, index) => (
            <motion.div
              key={item}
              className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-stone-700 shadow-sm"
              animate={active ? { x: 0, opacity: 1 } : { x: -18, opacity: 0.35 }}
              transition={{ duration: 0.28, delay: index * 0.06, ease: 'easeOut' }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
