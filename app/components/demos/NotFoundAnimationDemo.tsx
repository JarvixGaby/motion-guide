"use client";
import { motion } from 'framer-motion'; import { useEffect, useState } from 'react';

export function NotFoundAnimationDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [isPlaying]);

    return (
        <div className="relative flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-stone-900 p-6 shadow-sm ring-1 ring-stone-200">
            {/* Background element */}
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay" />

            <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-2 mt-4 flex h-24 items-center justify-center">
                    <motion.div
                        animate={active ? {
                            x: [-1, 2, -1.5, 3, -1, 0, 0, 0, 0, 0],
                            y: [1, -1, 2, -1.5, 1, 0, 0, 0, 0, 0],
                            opacity: [1, 0.8, 1, 0.9, 1, 1, 1, 1, 1, 1],
                            skewX: [0, -5, 5, -2, 0, 0, 0, 0, 0, 0]
                        } : { x: 0, y: 0, opacity: 1, skewX: 0 }}
                        transition={{
                            repeat: Infinity,
                            duration: 4, // 1s active, 3s pause essentially
                            ease: "circInOut",
                        }}
                        className="text-8xl font-black leading-none tracking-tighter text-white mix-blend-screen"
                    >
                        404
                    </motion.div>
                    {/* Cyan glitch shadow */}
                    <motion.div
                        animate={active ? {
                            x: [2, -3, 1, -2, 2, 0, 0, 0, 0, 0],
                            opacity: [0, 0.6, 0, 0.8, 0, 0, 0, 0, 0, 0]
                        } : { x: 0, opacity: 0 }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "circInOut",
                            delay: 0.05
                        }}
                        className="absolute z-[-1] -ml-[3px] mt-[3px] text-8xl font-black leading-none tracking-tighter text-cyan-400 mix-blend-screen"
                    >
                        404
                    </motion.div>
                    {/* Magenta glitch shadow */}
                    <motion.div
                        animate={active ? {
                            x: [-2, 3, -1, 2, -2, 0, 0, 0, 0, 0],
                            opacity: [0, 0.6, 0, 0.8, 0, 0, 0, 0, 0, 0]
                        } : { x: 0, opacity: 0 }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "circInOut",
                            delay: -0.05
                        }}
                        className="absolute z-[-1] ml-[3px] -mt-[3px] text-8xl font-black leading-none tracking-tighter text-fuchsia-500 mix-blend-screen"
                    >
                        404
                    </motion.div>

                    <motion.div
                        animate={active ? { opacity: [0, 0.8, 0, 0.2, 0, 0, 0, 0, 0, 0] } : { opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="pointer-events-none absolute -bottom-4 -left-[10%] -top-4 z-20 w-[120%] bg-white/10 mix-blend-overlay"
                    />
                </div>

                <h3 className="mb-2 text-lg font-bold text-white">Page not found</h3>
                <p className="mb-4 max-w-[240px] text-center text-[13px] text-stone-400">
                    The item you're looking for couldn't be located.
                </p>

                <button className="min-w-[120px] rounded-xl bg-white px-6 py-2 text-sm font-medium text-stone-900 shadow-sm transition-colors hover:bg-stone-200">
                    Go Back
                </button>
            </div>
        </div>
    );
}
