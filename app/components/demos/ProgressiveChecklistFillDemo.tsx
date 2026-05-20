"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ProgressiveChecklistFillDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isPlaying) {
            setProgress(0);
            return;
        }

        let isMounted = true;
        const runSequence = async () => {
            if (!isMounted) return;
            setProgress(0);
            await new Promise(r => setTimeout(r, 1000));
            if (!isMounted) return;
            setProgress(1);
            await new Promise(r => setTimeout(r, 1000));
            if (!isMounted) return;
            setProgress(2);
            await new Promise(r => setTimeout(r, 1000));
            if (!isMounted) return;
            setProgress(3);
            await new Promise(r => setTimeout(r, 2500));
            if (!isMounted) return;
            setProgress(0);
        };

        const loop = setInterval(runSequence, 5500);
        runSequence();

        return () => {
            isMounted = false;
            clearInterval(loop);
        };
    }, [isPlaying]);

    const tasks = ["Create account", "Verify email", "Set up profile"];

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div className="w-full max-w-sm bg-stone-50 rounded-2xl shadow-sm border border-stone-100 p-6 flex flex-col gap-6 relative">

                {/* Master Progress */}
                <div className="flex flex-col gap-2 relative z-10">
                    <div className="flex justify-between items-center text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                        <span>Setup Progress</span>
                        <span>{Math.round((progress / 3) * 100)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden shrink-0">
                        <motion.div
                            className="h-full bg-emerald-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(progress / 3) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4 relative z-10">
                    {tasks.map((task, i) => {
                        const isDone = progress > i;
                        return (
                            <div key={i} className="flex items-center gap-4 group">
                                <motion.div
                                    className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors duration-300 ${isDone ? 'bg-emerald-500 border-emerald-500' : 'border-stone-300 bg-white'}`}
                                >
                                    <AnimatePresence>
                                        {isDone && (
                                            <motion.svg
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-3"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </motion.svg>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                                <span className={`text-sm font-medium transition-colors duration-300 relative ${isDone ? 'text-stone-400' : 'text-stone-700'}`}>
                                    {task}
                                    {/* Strikethrough line */}
                                    {isDone && (
                                        <motion.div
                                            className="absolute top-[50%] left-0 h-[1.5px] bg-stone-300 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </span>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    );
}
