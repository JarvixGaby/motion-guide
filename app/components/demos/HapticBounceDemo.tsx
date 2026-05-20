'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function HapticBounceDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsPressed(false);
            return;
        }
        const interval = setInterval(() => {
            setIsPressed(true);
            setTimeout(() => setIsPressed(false), 250);
        }, 1500);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <motion.button
                animate={isPressed ? { scale: 0.85 } : { scale: 1 }}
                whileTap={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="min-w-[160px] rounded-xl bg-stone-900 px-10 py-4 text-base font-medium text-white shadow-sm hover:bg-stone-800"
            >
                Add to Cart
            </motion.button>
        </div>
    );
}
