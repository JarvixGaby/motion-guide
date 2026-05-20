"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function DynamicIslandExpandDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsExpanded(false);
            return;
        }

        const loop = setInterval(() => {
            setIsExpanded(prev => !prev);
        }, 2000);

        return () => clearInterval(loop);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-start justify-center overflow-hidden rounded-2xl bg-stone-50 pt-8 shadow-sm ring-1 ring-stone-200 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <motion.div
                layout
                initial={false}
                animate={{
                    width: isExpanded ? 320 : 120,
                    height: isExpanded ? 160 : 36,
                    borderRadius: isExpanded ? 32 : 18
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-black origin-top flex flex-col overflow-hidden text-white"
            >
                {/* Compact State (Always visible but shifts layout) */}
                <motion.div layout className="flex w-full h-[36px] items-center justify-center shrink-0">
                    <AnimatePresence mode="popLayout">
                        {!isExpanded && (
                            <motion.div
                                key="compact-content"
                                initial={{ opacity: 0, filter: "blur(4px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(4px)", scale: 0.8 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-medium">System Active</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Expanded State Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            key="expanded-content"
                            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col px-6 pb-6 pt-2 h-full justify-between"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold">Background Sync</span>
                                        <span className="text-xs text-stone-400">Downloading updates...</span>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <div className="h-10 flex-1 rounded-xl bg-white/10 flex items-center justify-center text-xs font-bold text-stone-300">Pause</div>
                                <div className="h-10 flex-1 rounded-xl bg-white/10 flex items-center justify-center text-xs font-bold text-white">Details</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
