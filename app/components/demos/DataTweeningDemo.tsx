"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const paths = [
    "M 0 100 Q 50 20 100 80 T 200 60 T 300 110 T 400 40",
    "M 0 60 Q 50 120 100 40 T 200 90 T 300 20 T 400 100",
    "M 0 120 Q 50 10 100 100 T 200 30 T 300 120 T 400 60"
];

export function DataTweeningDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [pathIndex, setPathIndex] = useState(0);

    useEffect(() => {
        if (!isPlaying) {
            setPathIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setPathIndex((prev) => (prev + 1) % paths.length);
        }, 1500);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div className="w-full max-w-sm h-40 bg-stone-50 rounded-xl relative overflow-hidden border border-stone-100 flex flex-col">
                <div className="p-4 flex justify-between items-center border-b border-stone-100 bg-white">
                    <span className="text-xs font-semibold text-stone-600 uppercase tracking-widest">Active Users</span>
                    <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Live Interpolation</span>
                </div>
                <div className="flex-1 relative w-full flex items-center justify-center pt-4">
                    <svg viewBox="0 0 400 150" className="w-[120%] h-full stroke-indigo-500 overflow-visible" fill="none">
                        <motion.path
                            d={paths[pathIndex]}
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={false}
                            animate={{ d: paths[pathIndex] }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                        {/* Data point glowing dots */}
                        <motion.circle
                            r="6"
                            fill="white"
                            strokeWidth="3"
                            className="stroke-indigo-500 drop-shadow-md"
                            cx="200"
                            animate={{
                                // Rough approximate middle points for visualization
                                cy: pathIndex === 0 ? 60 : pathIndex === 1 ? 90 : 30
                            }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                    </svg>

                    {/* Fake grid lines */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between py-6 px-4">
                        <div className="w-full border-t border-stone-200 border-dashed" />
                        <div className="w-full border-t border-stone-200 border-dashed" />
                        <div className="w-full border-t border-stone-200 border-dashed" />
                    </div>
                </div>
            </div>
        </div>
    );
}
