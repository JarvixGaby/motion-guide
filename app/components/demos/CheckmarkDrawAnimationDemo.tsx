'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function CheckmarkDrawAnimationDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsSuccess(false);
            return;
        }
        const interval = setInterval(() => {
            setIsSuccess((prev) => !prev);
        }, 1500);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-stone-50">

                {/* Expanding Success Bubble */}
                <motion.div
                    animate={isSuccess ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-sm"
                >
                    {/* Drawing SVG Path */}
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <motion.path
                            initial={{ pathLength: 0 }}
                            animate={isSuccess ? { pathLength: 1 } : { pathLength: 0 }}
                            transition={{ delay: 0.2, type: 'tween', ease: 'easeOut', duration: 0.5 }}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </motion.div>

            </div>
        </div>
    );
}
