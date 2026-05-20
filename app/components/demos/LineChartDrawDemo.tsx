"use client";
import { motion } from 'framer-motion';

export function LineChartDrawDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-stone-50 p-5">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Revenue</p>
            <p className="mt-1 text-2xl font-semibold text-stone-900">$42.8k</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">+18%</span>
        </div>
        <svg viewBox="0 0 260 110" className="h-28 w-full overflow-visible">
          {[20, 50, 80].map((y) => (
            <line key={y} x1="0" x2="260" y1={y} y2={y} stroke="#e7e5e4" strokeWidth="1" />
          ))}
          <motion.path
            d="M4 88 C42 72, 54 50, 86 60 C120 70, 134 22, 166 34 C204 48, 218 18, 256 24"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="5"
            strokeLinecap="round"
            initial={false}
            animate={isPlaying ? { pathLength: 1, opacity: 1 } : { pathLength: 0.35, opacity: 0.45 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
        </svg>
      </div>
    </div>
  );
}
