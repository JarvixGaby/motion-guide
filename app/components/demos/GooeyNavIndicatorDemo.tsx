"use client";
import { motion } from 'framer-motion';

export function GooeyNavIndicatorDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="relative flex rounded-full bg-stone-100 p-1">
        <motion.span
          className="absolute bottom-1 top-1 w-24 rounded-full bg-stone-950"
          animate={isPlaying ? { x: [0, 96, 192], borderRadius: ['999px', '22px', '999px'] } : { x: 0 }}
          transition={{ duration: 1.3, repeat: isPlaying ? Infinity : 0, repeatType: 'reverse', ease: [0.16, 1, 0.3, 1] }}
        />
        {['Home', 'Work', 'About'].map((item) => (
          <span key={item} className="relative z-10 flex h-10 w-24 items-center justify-center text-sm font-medium text-stone-500 mix-blend-difference">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
