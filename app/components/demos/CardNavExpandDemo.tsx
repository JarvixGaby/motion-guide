"use client";
import { motion, useReducedMotion } from 'framer-motion';

export function CardNavExpandDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const active = isPlaying && !shouldReduceMotion;

  return (
    <div className="flex h-64 w-full items-start justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
        <div className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3">
          <span className="text-sm font-semibold text-stone-900">Product</span>
          <motion.span animate={{ rotate: active ? 180 : 0 }} className="text-stone-400">⌄</motion.span>
        </div>
        <motion.div
          className="grid gap-3 overflow-hidden p-3"
          animate={{ height: active ? 142 : 0, opacity: active ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {['Overview', 'Templates', 'Integrations'].map((item) => (
            <div key={item} className="rounded-xl border border-stone-200 bg-white p-3">
              <p className="text-sm font-medium text-stone-800">{item}</p>
              <div className="mt-2 h-2 w-2/3 rounded-full bg-stone-100" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
