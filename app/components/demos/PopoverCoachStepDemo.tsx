"use client";
import { motion } from 'framer-motion';

export function PopoverCoachStepDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  return (
    <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="absolute left-8 top-8 h-8 w-28 rounded-full bg-stone-100" />
      <div className="absolute right-8 top-8 h-8 w-20 rounded-full bg-stone-100" />
      <div className="relative flex h-24 w-56 items-center justify-center rounded-xl border border-stone-200 bg-stone-50">
        <span className="rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-white">Create project</span>
        <motion.div
          className="absolute left-1/2 top-full mt-4 w-56 -translate-x-1/2 rounded-xl border border-stone-200 bg-white p-4 shadow-xl"
          initial={false}
          animate={isPlaying ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.35, y: -8, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-stone-200 bg-white" />
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Step 1 of 3</p>
          <p className="mt-2 text-sm font-medium text-stone-800">Start with a workspace.</p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-stone-100">
            <motion.div
              className="h-full rounded-full bg-amber-400"
              animate={isPlaying ? { width: '33%' } : { width: '12%' }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
