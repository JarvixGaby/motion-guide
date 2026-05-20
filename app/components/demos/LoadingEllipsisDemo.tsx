"use client";
import { motion } from 'framer-motion';

export function LoadingEllipsisDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-stone-700">Generating reply</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                className="h-1.5 w-1.5 rounded-full bg-stone-700"
                animate={isPlaying ? { y: [0, -5, 0], opacity: [0.35, 1, 0.35] } : { y: 0, opacity: 0.4 }}
                transition={{ duration: 0.7, repeat: isPlaying ? Infinity : 0, delay: index * 0.12 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
