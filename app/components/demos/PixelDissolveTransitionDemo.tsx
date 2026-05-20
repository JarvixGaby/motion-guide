"use client";
import { motion } from 'framer-motion';

export function PixelDissolveTransitionDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="relative grid h-36 w-64 grid-cols-8 overflow-hidden rounded-2xl bg-stone-950 p-4">
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">Preview</div>
        {Array.from({ length: 32 }, (_, index) => (
          <motion.span
            key={index}
            className="bg-amber-400"
            animate={isPlaying ? { opacity: [1, 0], scale: [1, 0.4] } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: (index % 8) * 0.035 + Math.floor(index / 8) * 0.045, repeat: isPlaying ? Infinity : 0, repeatDelay: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
}
