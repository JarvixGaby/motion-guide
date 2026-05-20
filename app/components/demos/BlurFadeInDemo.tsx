'use client';
import { motion } from 'framer-motion';

export function BlurFadeInDemo({ isPlaying = true, replayKey = 0 }: { isPlaying?: boolean; replayKey?: number }) {
  return (
    <motion.div
      key={replayKey}
      initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
      animate={isPlaying ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0, filter: 'blur(10px)', y: 10 }}
      transition={{
        duration: 0.8,
        ease: 'easeOut',
        repeat: isPlaying ? Infinity : 0,
        repeatDelay: 1.5
      }}
      className="flex w-80 flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-stone-200"
    >
      <h3 className="font-display text-lg font-bold text-stone-900">
        Content Revealed
      </h3>
      <p className="mt-2 text-xs text-stone-500">
        Fading in from blur to sharp focus
      </p>
    </motion.div>
  );
}
