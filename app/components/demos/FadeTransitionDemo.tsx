'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function FadeTransitionDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        if (isPlaying) {
            const timer = setInterval(() => {
                setActiveTab((prev) => (prev === 0 ? 1 : 0));
            }, 1500);
            return () => clearInterval(timer);
        }
    }, [isPlaying]);

    return (
        <div className="flex w-64 flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div className="flex gap-2 rounded-xl bg-stone-100 p-1">
                {['Overview', 'Settings'].map((tab, i) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(i)}
                        className={`relative flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${activeTab === i ? 'text-stone-900' : 'text-stone-500 hover:text-stone-700'
                            }`}
                    >
                        {activeTab === i && (
                            <motion.div
                                layoutId="activeTabIndicator"
                                className="absolute inset-0 rounded-lg bg-white shadow-sm ring-1 ring-stone-200/50"
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{tab}</span>
                    </button>
                ))}
            </div>
            <div className="relative h-20 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex h-full items-center justify-center rounded-xl border border-dashed border-stone-200 bg-stone-50"
                    >
                        <span className="text-xs text-stone-400">Content for {activeTab === 0 ? 'Overview' : 'Settings'}</span>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
