'use client';
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Lock } from 'lucide-react';

export function ErrorShakeDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const controls = useAnimation();
    const [hasError, setHasError] = useState(false);

    const triggerError = useCallback(async () => {
        setHasError(false);
        // Add small delay to reset the state visibly if tracking repeated clicks
        await new Promise(resolve => setTimeout(resolve, 50));
        setHasError(true);
        await controls.start({
            x: [0, -8, 8, -8, 8, 0],
            transition: { duration: 0.4, ease: "easeInOut" }
        });
    }, [controls]);

    useEffect(() => {
        if (isPlaying) {
            const timer = setTimeout(triggerError, 100);
            const interval = setInterval(triggerError, 2500);
            return () => {
                clearTimeout(timer);
                clearInterval(interval);
            };
        }
    }, [isPlaying, triggerError]);

    return (
        <div className="flex w-64 flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">Password</label>
                <motion.div animate={controls}>
                    <div className={`flex h-10 w-full items-center gap-2 rounded-xl border px-3 transition-colors ${hasError ? 'border-red-500 bg-red-50' : 'border-stone-200 bg-stone-50'
                        }`}>
                        <Lock className={`h-4 w-4 ${hasError ? 'text-red-500' : 'text-stone-400'}`} />
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className={`h-1.5 w-1.5 rounded-full transition-colors ${hasError ? 'bg-red-900' : 'bg-stone-900'}`} />
                            ))}
                        </div>
                    </div>
                </motion.div>
                <div className="h-4">
                    {hasError && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[10px] font-medium text-red-500"
                        >
                            Incorrect password
                        </motion.p>
                    )}
                </div>
            </div>
            <button
                onClick={triggerError}
                className="h-10 w-full rounded-xl bg-stone-900 text-xs font-medium text-white shadow-sm transition-colors hover:bg-stone-800"
            >
                Sign In
            </button>
        </div>
    );
}
