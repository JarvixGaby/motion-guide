"use client";
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ElasticSliderHandleDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const [value, setValue] = useState(42);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isPlaying || isDragging || shouldReduceMotion) return;

    const loop = window.setInterval(() => {
      setValue((current) => (current >= 68 ? 42 : current + 2));
    }, 90);

    return () => window.clearInterval(loop);
  }, [isPlaying, isDragging, shouldReduceMotion]);

  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Volume</span>
          <motion.span
            className="text-sm font-semibold text-stone-800"
            animate={{ opacity: isDragging ? 1 : 0.75, scale: isDragging ? 1.08 : 1 }}
          >
            {value}%
          </motion.span>
        </div>
        <div className="relative h-10 py-3">
          <div className="relative h-3 rounded-full bg-stone-200">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full bg-amber-400"
              animate={{ width: `${value}%` }}
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
            <motion.div
              className="pointer-events-none absolute top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-stone-950 shadow-lg"
              animate={{ left: `${value}%`, scaleX: isDragging ? 1.35 : 1, scaleY: isDragging ? 0.9 : 1 }}
              transition={{ type: 'spring', stiffness: 480, damping: 28 }}
            />
            <input
              aria-label="Try the elastic volume slider"
              type="range"
              min="0"
              max="100"
              value={value}
              onPointerDown={() => setIsDragging(true)}
              onPointerUp={() => setIsDragging(false)}
              onPointerCancel={() => setIsDragging(false)}
              onBlur={() => setIsDragging(false)}
              onChange={(event) => setValue(Number(event.target.value))}
              className="absolute -inset-x-1 -inset-y-4 cursor-grab opacity-0 active:cursor-grabbing"
            />
          </div>
        </div>
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">
          Drag the handle
        </p>
      </div>
    </div>
  );
}
