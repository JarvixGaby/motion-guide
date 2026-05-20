"use client";
import { motion } from 'framer-motion';

export function NotificationDotPulseDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="grid grid-cols-3 gap-5">
        {['Inbox', 'Tasks', 'Alerts'].map((label, index) => (
          <div key={label} className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50">
            <span className="text-xs font-medium text-stone-500">{label}</span>
            {index === 2 && (
              <div className="absolute right-3 top-3">
                <span className="absolute h-3 w-3 rounded-full bg-red-500" />
                <motion.span
                  className="absolute h-3 w-3 rounded-full bg-red-500"
                  animate={isPlaying ? { scale: [1, 2.4], opacity: [0.45, 0] } : { scale: 1, opacity: 0 }}
                  transition={{ duration: 1.2, repeat: isPlaying ? Infinity : 0, ease: 'easeOut' }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
