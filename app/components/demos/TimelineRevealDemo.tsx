"use client";
import { motion } from 'framer-motion';

export function TimelineRevealDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  const items = ['Brief', 'Prototype', 'Launch'];

  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="relative w-full max-w-sm">
        <div className="absolute left-4 top-3 h-[calc(100%-1.5rem)] w-px bg-stone-200" />
        <motion.div
          className="absolute left-4 top-3 w-px bg-amber-400"
          animate={{ height: isPlaying ? 'calc(100% - 1.5rem)' : '30%' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item}
              className="relative flex gap-4"
              animate={isPlaying ? { opacity: 1, x: 0 } : { opacity: index === 0 ? 1 : 0.45, x: index === 0 ? 0 : -8 }}
              transition={{ duration: 0.35, delay: index * 0.16 }}
            >
              <span className={`relative z-10 mt-1 h-8 w-8 rounded-full border-4 border-white ${isPlaying || index === 0 ? 'bg-amber-400' : 'bg-stone-200'}`} />
              <div className="flex-1 rounded-xl border border-stone-200 bg-stone-50 p-3">
                <p className="text-sm font-semibold text-stone-800">{item}</p>
                <p className="mt-1 text-xs text-stone-400">Milestone {index + 1}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
