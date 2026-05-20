'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ScaleOnPressDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isSimulatedPress, setIsSimulatedPress] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsSimulatedPress(false);
            return;
        }
        const interval = setInterval(() => {
            setIsSimulatedPress(true);
            setTimeout(() => setIsSimulatedPress(false), 150);
        }, 1500);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <motion.button
                animate={isSimulatedPress ? { scale: 0.95 } : { scale: 1 }}
                whileTap={{ scale: 0.95 }}
                className="min-w-[160px] rounded-xl bg-stone-900 px-10 py-4 text-base font-medium text-white shadow-sm hover:bg-stone-800"
            >
                Continue
            </motion.button>
        </div>
    );
}
