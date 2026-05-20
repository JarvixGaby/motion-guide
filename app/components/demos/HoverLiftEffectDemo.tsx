'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function HoverLiftEffectDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsHovered(false);
            return;
        }

        const interval = setInterval(() => {
            setIsHovered(true);
            setTimeout(() => setIsHovered(false), 1000);
        }, 2000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-stone-50 p-6 shadow-sm ring-1 ring-stone-200 perspective-1000">
            <motion.div
                animate={isHovered ? { y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' } : { y: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex w-48 flex-col gap-4 rounded-xl border border-stone-200 bg-white p-5 cursor-pointer"
                onMouseEnter={() => !isPlaying && setIsHovered(true)}
                onMouseLeave={() => !isPlaying && setIsHovered(false)}
            >
                <div className="h-10 w-10 rounded-full bg-stone-200" />
                <div className="h-4 w-3/4 rounded bg-stone-800" />
                <div className="h-3 w-1/2 rounded bg-stone-300" />
            </motion.div>
        </div>
    );
}
