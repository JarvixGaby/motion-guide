"use client";
import { motion } from 'framer-motion';

export function StepIndicatorMotionDemo({ isPlaying = false }: { isPlaying?: boolean }) {
  const activeStep = isPlaying ? 2 : 1;

  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      <div className="w-full max-w-sm">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-6 right-6 top-1/2 h-1 -translate-y-1/2 rounded-full bg-stone-100" />
          <motion.div
            className="absolute left-6 top-1/2 h-1 -translate-y-1/2 rounded-full bg-amber-400"
            animate={{ width: activeStep === 2 ? 'calc(50% - 1.5rem)' : '0%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />
          {[1, 2, 3].map((step) => {
            const active = step <= activeStep;
            return (
              <motion.div
                key={step}
                className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold ${
                  active ? 'border-amber-400 bg-amber-400 text-stone-950' : 'border-stone-200 bg-white text-stone-400'
                }`}
                animate={active ? { scale: 1 } : { scale: 0.92 }}
                transition={{ duration: 0.25 }}
              >
                {step}
              </motion.div>
            );
          })}
        </div>
        <div className="mt-8 rounded-xl bg-stone-50 p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Setup</p>
          <p className="mt-2 text-sm font-medium text-stone-800">{activeStep === 2 ? 'Invite your team' : 'Create account'}</p>
        </div>
      </div>
    </div>
  );
}
