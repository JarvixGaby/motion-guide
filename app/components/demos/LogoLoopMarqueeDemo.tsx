"use client";
import { motion } from 'framer-motion';

export function LogoLoopMarqueeDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  const logos = ['React', 'Next', 'Tailwind', 'Motion', 'Vercel'];

  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 py-6">
        <motion.div
          className="flex w-max gap-4 px-4"
          animate={isPlaying ? { x: ['0%', '-50%'] } : { x: '0%' }}
          transition={{ duration: 6, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div key={`${logo}-${index}`} className="flex h-14 w-28 items-center justify-center rounded-xl border border-stone-200 bg-white text-sm font-semibold text-stone-500">
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
