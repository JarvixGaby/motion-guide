'use client';
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Loader2, ArrowDown } from 'lucide-react';

export function PullToRefreshDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const controls = useAnimation();
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            requestAnimationFrame(() => {
                try { controls.set({ y: 0 }); } catch (e) { }
            });
            setIsRefreshing(false);
            return;
        }

        const simulatePull = async () => {
            setIsRefreshing(false);
            // Pull down gesture
            await controls.start({ y: 64, transition: { duration: 0.8, ease: 'easeOut' } });
            setIsRefreshing(true);
            // Wait for the simulated network request to finish
            await new Promise((r) => setTimeout(r, 1200));
            // Snap back to top
            await controls.start({ y: 0, transition: { type: 'spring', bounce: 0, duration: 0.4 } });
        };

        const interval = setInterval(simulatePull, 3500);
        simulatePull();

        return () => clearInterval(interval);
    }, [isPlaying, controls]);

    return (
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <div className="relative flex h-full w-full max-w-[240px] flex-col overflow-hidden rounded-xl border border-stone-200 bg-stone-50">

                {/* Refresh Indicator Layer (Hidden behind content layer until pulled) */}
                <div className="absolute top-0 flex w-full justify-center pt-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: isRefreshing ? 1 : 0.5,
                            scale: 1,
                            rotate: isRefreshing ? 360 : 0
                        }}
                        transition={{ rotate: { repeat: isRefreshing ? Infinity : 0, duration: 1, ease: 'linear' } }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-stone-200 text-stone-600"
                    >
                        {isRefreshing ? (
                            <Loader2 className="h-4 w-4" />
                        ) : (
                            <ArrowDown className="h-4 w-4" />
                        )}
                    </motion.div>
                </div>

                {/* Content Layer that slides down */}
                <motion.div
                    animate={controls}
                    className="relative z-10 flex h-full flex-col gap-3 bg-white p-4 shadow-sm"
                >
                    <div className="h-10 rounded-lg bg-stone-100" />
                    <div className="h-10 rounded-lg bg-stone-100" />
                    <div className="h-10 rounded-lg bg-stone-100" />
                    <div className="h-10 rounded-lg bg-stone-100" />
                </motion.div>

            </div>
        </div>
    );
}
