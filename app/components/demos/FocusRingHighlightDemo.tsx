"use client";
import { motion } from 'framer-motion';

export function FocusRingHighlightDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="grid w-full max-w-sm gap-3">
        {['Profile name', 'Team URL', 'Invite members'].map((label, index) => {
          const active = isPlaying && index === 1;
          return (
            <div key={label} className="relative rounded-xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-xs font-medium text-stone-400">{label}</p>
              <div className="mt-2 h-3 w-2/3 rounded-full bg-stone-200" />
              <motion.div
                className="pointer-events-none absolute -inset-1 rounded-2xl border-2 border-amber-400"
                initial={false}
                animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
              <motion.div
                className="pointer-events-none absolute -inset-3 rounded-[20px] border border-amber-300"
                initial={false}
                animate={active ? { opacity: [0, 0.5, 0], scale: [0.94, 1.06, 1.12] } : { opacity: 0 }}
                transition={{ duration: 1.4, repeat: isPlaying ? Infinity : 0 }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
