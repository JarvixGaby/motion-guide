"use client";
import { motion } from 'framer-motion';

export function IndeterminateProgressBarDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div className="relative h-1.5 w-64 overflow-hidden rounded-full bg-stone-100">
                {isPlaying && (
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-stone-800 rounded-full"
                        initial={{ x: "-100%", width: "50%" }}
                        animate={{ x: "200%" }}
                        transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    />
                )}
            </div>
        </div>
    );
}
