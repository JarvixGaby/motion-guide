"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

export function BadgeCountAnimationDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isPlaying) {
            setCount(0);
            return;
        }
        const interval = setInterval(() => {
            setCount(c => (c > 5 ? 0 : c + 1));
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="relative flex h-64 w-full items-center justify-center rounded-2xl bg-stone-50 p-6 shadow-sm ring-1 ring-stone-200">
            <div className="flex flex-col items-center">

                <div className="flex gap-4 mb-20 bg-white p-2 rounded-2xl shadow-sm border border-stone-200">
                    <button
                        onClick={() => setCount(c => Math.max(0, c - 1))}
                        className="px-6 py-2 bg-stone-50 rounded-xl text-stone-700 font-medium hover:bg-stone-200 transition-colors focus:outline-none"
                    >
                        Decrease
                    </button>
                    <button
                        onClick={() => setCount(c => c + 1)}
                        className="px-6 py-2 bg-stone-900 rounded-xl text-white font-medium shadow-sm hover:bg-stone-800 transition-colors focus:outline-none"
                    >
                        Increase
                    </button>
                </div>

                <div className="relative p-5 bg-white rounded-3xl shadow-md border border-stone-200">
                    <Bell className="w-8 h-8 text-stone-700" />

                    <AnimatePresence>
                        {count > 0 && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold rounded-full min-w-[28px] h-[28px] flex items-center justify-center px-2 shadow-sm border-[3px] border-white overflow-hidden"
                            >
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                        key={count}
                                        initial={{ y: 15, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -15, opacity: 0 }}
                                        transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                                        className="inline-block"
                                    >
                                        {count}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
