'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function SlideTransitionDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [tab, setTab] = useState(0);

    useEffect(() => {
        if (!isPlaying) {
            setTab(0);
            return;
        }
        const interval = setInterval(() => {
            setTab((prev) => (prev === 0 ? 1 : 0));
        }, 2000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">

            {/* Tab Header */}
            <div className="mb-4 flex gap-2 rounded-full bg-stone-100 p-1.5 ring-1 ring-stone-200/50">
                <div className={`flex min-w-[100px] items-center justify-center rounded-full px-6 py-2 text-sm font-medium transition-colors ${tab === 0 ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}>List</div>
                <div className={`flex min-w-[100px] items-center justify-center rounded-full px-6 py-2 text-sm font-medium transition-colors ${tab === 1 ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}>Map</div>
            </div>

            <div className="relative h-48 w-full max-w-[320px] overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-stone-200">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={tab}
                        initial={{ x: tab === 1 ? 320 : -320, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: tab === 1 ? -320 : 320, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="absolute inset-0 flex flex-col p-6"
                    >
                        {tab === 0 ? (
                            <div className="flex flex-col gap-4">
                                <div className="h-4 w-full rounded bg-stone-200" />
                                <div className="h-4 w-3/4 rounded bg-stone-200" />
                                <div className="h-4 w-5/6 rounded bg-stone-200" />
                                <div className="h-4 w-1/2 rounded bg-stone-200" />
                            </div>
                        ) : (
                            <div className="flex h-full w-full items-center justify-center rounded-lg bg-stone-200">
                                <div className="h-10 w-10 rounded-full bg-stone-400" />
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
