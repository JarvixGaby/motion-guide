"use client";
import { motion, useReducedMotion } from 'framer-motion';

export function FolderOpenRevealDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const active = isPlaying && !shouldReduceMotion;

  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="relative h-36 w-56">
        <div className="absolute left-5 top-2 h-8 w-24 rounded-t-xl bg-amber-300" />
        <div className="absolute bottom-0 h-28 w-full rounded-2xl bg-amber-400 shadow-lg" />
        <motion.div
          className="absolute bottom-3 left-5 right-5 rounded-xl bg-white p-3 shadow-md"
          animate={active ? { y: -34, opacity: 1 } : { y: 8, opacity: 0.55 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold text-stone-800">Project brief</p>
          <div className="mt-2 space-y-1.5">
            <div className="h-2 rounded-full bg-stone-200" />
            <div className="h-2 w-2/3 rounded-full bg-stone-200" />
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-0 h-28 w-full origin-bottom rounded-2xl bg-amber-500"
          animate={{ rotateX: active ? -28 : 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 800 }}
        />
      </div>
    </div>
  );
}
