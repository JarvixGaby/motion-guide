"use client";
import { motion } from 'framer-motion';

export function DockProximityScaleDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  const scales = isPlaying ? [1, 1.28, 1.62, 1.28, 1] : [1, 1, 1, 1, 1];

  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="flex h-20 items-end gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-5 pb-4">
        {scales.map((scale, index) => (
          <motion.div
            key={index}
            className="h-10 w-10 rounded-xl bg-stone-950 shadow-sm"
            animate={{ scale, y: scale > 1 ? -8 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>
    </div>
  );
}
