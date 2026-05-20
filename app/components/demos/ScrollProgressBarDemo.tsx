"use client";
import { motion } from 'framer-motion';

export function ScrollProgressBarDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
        <div className="h-2 bg-stone-200">
          <motion.div
            className="h-full bg-amber-400"
            animate={isPlaying ? { width: ['12%', '82%'] } : { width: '28%' }}
            transition={{ duration: 1.2, repeat: isPlaying ? Infinity : 0, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        </div>
        <div className="space-y-3 p-5">
          <div className="h-4 w-3/4 rounded-full bg-stone-300" />
          <div className="h-3 w-full rounded-full bg-stone-200" />
          <div className="h-3 w-5/6 rounded-full bg-stone-200" />
          <div className="h-3 w-2/3 rounded-full bg-stone-200" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="h-16 rounded-xl bg-white" />
            <div className="h-16 rounded-xl bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
