"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function LiquidWaveTransitionDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [view, setView] = useState<'A' | 'B'>('A');

    useEffect(() => {
        if (!isPlaying) {
            setView('A');
            return;
        }

        const loop = setInterval(() => {
            setView(prev => prev === 'A' ? 'B' : 'A');
        }, 3000);

        return () => clearInterval(loop);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 relative cursor-pointer" onClick={() => setView(v => v === 'A' ? 'B' : 'A')}>

            {/* View A - Light Mode Minimalist */}
            <div className="absolute inset-0 w-full h-full bg-stone-50 flex items-center justify-center flex-col z-0">
                <div className="w-16 h-16 bg-stone-200 rounded-full mb-4 animate-pulse flex items-center justify-center">
                    <span className="text-stone-400 font-bold">A</span>
                </div>
                <h2 className="text-xl font-bold text-stone-800">Light View</h2>
                <p className="text-sm text-stone-500 mt-2">Click anywhere to trigger the wave.</p>
            </div>

            {/* View B - Dark Mode Premium (Clipped over View A) */}
            <AnimatePresence>
                {view === 'B' && (
                    <motion.div
                        key="viewB"
                        className="absolute inset-0 w-full h-full bg-indigo-600 flex items-center justify-center flex-col z-10"
                        // The CSS circle path starts small and expands to cover 150% of the screen (guaranteeing no empty corners)
                        initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0.8 }}
                        animate={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
                        exit={{ clipPath: "circle(0% at 50% 50%)", transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] } }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }} // smooth ease out
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center text-white"
                        >
                            <span className="font-bold">B</span>
                        </motion.div>
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="text-xl font-bold text-white tracking-tight"
                        >
                            Dark Mode Wave
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.35 }}
                            className="text-sm text-indigo-200 mt-2"
                        >
                            Seamlessly flooding the viewport.
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
