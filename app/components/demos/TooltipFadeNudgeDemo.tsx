'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

export function TooltipFadeNudgeDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsHovered(false);
            return;
        }
        const interval = setInterval(() => {
            setIsHovered((prev) => !prev);
        }, 1500);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-stone-50 p-6 shadow-sm ring-1 ring-stone-200">
            <div className="relative flex items-center justify-center">

                {/* Anchor element */}
                <button
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${isHovered ? 'bg-stone-200' : 'bg-white shadow-sm ring-1 ring-stone-200'
                        }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Info className="h-5 w-5 text-stone-500" />
                </button>

                {/* Tooltip Nudging Upwards */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: -4, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -2, scale: 0.95 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className="absolute -top-10 flex items-center justify-center rounded bg-stone-900 px-3 py-1.5 text-xs font-medium text-white shadow-md z-10"
                        >
                            Info
                            {/* Tooltip Arrow pointing down */}
                            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-stone-900" />
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
