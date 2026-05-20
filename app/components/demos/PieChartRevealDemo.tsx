"use client";
import { motion } from 'framer-motion';

export function PieChartRevealDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  const circumference = 2 * Math.PI * 42;

  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="flex items-center gap-6 rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90">
          <circle cx="60" cy="60" r="42" fill="none" stroke="#e7e5e4" strokeWidth="18" />
          {[0.45, 0.3, 0.18].map((value, index) => (
            <motion.circle
              key={index}
              cx="60"
              cy="60"
              r="42"
              fill="none"
              stroke={['#f59e0b', '#0f172a', '#94a3b8'][index]}
              strokeWidth="18"
              strokeLinecap="round"
              strokeDasharray={`${circumference * value} ${circumference}`}
              strokeDashoffset={-circumference * [0, 0.47, 0.79][index]}
              initial={false}
              animate={isPlaying ? { opacity: 1, pathLength: 1 } : { opacity: 0.45, pathLength: 0.45 }}
              transition={{ duration: 0.7, delay: index * 0.14, ease: 'easeOut' }}
            />
          ))}
        </svg>
        <div className="space-y-3">
          {['Core', 'Growth', 'Ops'].map((item, index) => (
            <div key={item} className="flex items-center gap-2 text-sm text-stone-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ['#f59e0b', '#0f172a', '#94a3b8'][index] }} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
