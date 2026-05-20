'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ModalEnterExitDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsOpen(false);
            return;
        }
        const interval = setInterval(() => {
            setIsOpen((prev) => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            {/* Underlay Dashboard Mock */}
            <div className="grid grid-cols-2 gap-4 opacity-30">
                <div className="h-24 w-24 rounded-xl bg-stone-200" />
                <div className="h-24 w-24 rounded-xl bg-stone-200" />
            </div>

            <AnimatePresence>
                {isOpen && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        {/* Backdrop Fade */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm"
                        />

                        {/* Modal Scale In */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            className="relative z-10 flex w-48 flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-stone-200"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 mb-2">
                                <div className="h-5 w-5 rounded-full bg-red-400" />
                            </div>
                            <div className="h-4 w-24 rounded bg-stone-800" />
                            <div className="h-3 w-32 rounded bg-stone-300" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
