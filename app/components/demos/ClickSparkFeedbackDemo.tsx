"use client";
import { motion } from 'framer-motion';

export function ClickSparkFeedbackDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  const sparks = Array.from({ length: 8 }, (_, index) => {
    const angle = (index / 8) * Math.PI * 2;
    return { x: Math.cos(angle) * 34, y: Math.sin(angle) * 34, angle };
  });

  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <button className="relative rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white">
        Save
        {sparks.map((spark, index) => (
          <motion.span
            key={index}
            className="absolute left-1/2 top-1/2 h-1 w-4 origin-left rounded-full bg-amber-400"
            style={{ rotate: `${spark.angle}rad` }}
            animate={isPlaying ? { x: spark.x, y: spark.y, opacity: [0, 1, 0], scaleX: [0.4, 1, 0.2] } : { x: 0, y: 0, opacity: 0, scaleX: 0.3 }}
            transition={{ duration: 0.55, repeat: isPlaying ? Infinity : 0, repeatDelay: 0.9, ease: 'easeOut' }}
          />
        ))}
      </button>
    </div>
  );
}
