'use client';
import { useEffect } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';

export function NumberTickerDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const count = useMotionValue(0);
    const displayValue = useTransform(count, (v) => Math.round(v).toLocaleString());

    useEffect(() => {
        if (!isPlaying) {
            count.set(0);
            return;
        }

        const runAnimation = async () => {
            count.set(0);
            const controls = animate(count, 1000000, {
                duration: 2.5,
                ease: 'easeOut'
            });
            await controls;
        };

        runAnimation();
        const interval = setInterval(runAnimation, 3500);

        return () => clearInterval(interval);
    }, [isPlaying, count]);

    return (
        <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl bg-stone-100 p-6 shadow-sm ring-1 ring-stone-200">
            <div className="flex w-64 flex-col items-center justify-center rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
                <h3 className="mb-1 text-[11px] font-medium uppercase tracking-widest text-stone-400">Total Users</h3>
                <motion.span className="tabular-nums font-display text-5xl font-light tracking-tight text-stone-900">
                    {displayValue}
                </motion.span>
            </div>
        </div>
    );
}
