"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function MorphingSvgIconDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isPlayingState, setIsPlayingState] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsPlayingState(false);
            return;
        }

        const loop = setInterval(() => {
            setIsPlayingState(prev => !prev);
        }, 1500);

        return () => clearInterval(loop);
    }, [isPlaying]);

    // Using SVG path morphing via Framer Motion. 
    // Both states must have the same number of path commands (ideally).
    // Or we can rely on Framer Motion's smart morphing if SVGs are simple enough.
    // For play to pause, a common trick is animating one polygon into two rectangles.
    // However, to keep it simple and robust, we can morph two lines that make up the play triangle.

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <button
                onClick={() => setIsPlayingState(!isPlayingState)}
                className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 hover:bg-indigo-100 transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-100 outline-none shadow-sm"
            >
                <motion.svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="currentColor"
                >
                    {/* 
                         We use two SVG paths that make up the top and bottom halves of the Play triangle, 
                         which then morph into the left and right Pause bars.
                     */}
                    <motion.path
                        initial={false}
                        animate={{
                            d: isPlayingState
                                ? "M9 6h4v20H9z" // Left Pause Bar
                                : "M10 6L24 16L10 16z" // Top half of Play Triangle
                        }}
                        transition={{ duration: 0.4, ease: "anticipate" }}
                    />
                    <motion.path
                        initial={false}
                        animate={{
                            d: isPlayingState
                                ? "M19 6h4v20h-4z" // Right Pause Bar
                                : "M10 26L24 16L10 16z" // Bottom half of Play Triangle
                        }}
                        transition={{ duration: 0.4, ease: "anticipate" }}
                    />
                </motion.svg>
            </button>
        </div>
    );
}
