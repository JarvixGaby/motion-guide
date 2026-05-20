"use client";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export function LiquidSwipeActionDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const x = useMotionValue(0);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isAutoAnimating, setIsAutoAnimating] = useState(false);

    // Dynamic styles based on drag distance
    const deleteOpacity = useTransform(x, [0, -60, -120], [0, 1, 1]);
    const deleteScale = useTransform(x, [0, -60], [0.5, 1]);

    // Auto play when `isPlaying` (like hovering over the grid item)
    useEffect(() => {
        if (!isPlaying) {
            x.set(0);
            setIsDeleted(false);
            setIsAutoAnimating(false);
            return;
        }

        setIsAutoAnimating(true);
        let time = 0;
        const loop = setInterval(() => {
            time += 0.05;
            // Simulate a swipe left then release
            if (time < Math.PI) {
                x.set(-Math.abs(Math.sin(time)) * 140);
            } else if (time >= Math.PI && time < 4.5) {
                // rest
                x.set(0);
            } else {
                time = 0; // reset
            }
        }, 30);

        return () => clearInterval(loop);
    }, [isPlaying, x]);

    const handleDragEnd = () => {
        if (x.get() < -110) {
            // Trigger delete
            setIsDeleted(true);
            setTimeout(() => {
                setIsDeleted(false);
                x.set(0);
            }, 2000);
        }
    };

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-100 p-4 shadow-sm ring-1 ring-stone-200 relative">
            <div className="w-full max-w-sm rounded-xl overflow-hidden relative border border-stone-200 bg-red-500 shadow-sm">

                {/* The Action Background (Red Delete) */}
                <div className="absolute inset-y-0 right-0 w-1/2 flex items-center justify-end pr-6">
                    <motion.div
                        style={{ opacity: deleteOpacity, scale: deleteScale }}
                        className="flex flex-col items-center justify-center text-white"
                    >
                        <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </motion.div>
                </div>

                {/* The Draggable List Item */}
                <motion.div
                    drag={isAutoAnimating ? false : "x"}
                    dragConstraints={{ left: -140, right: 0 }}
                    dragElastic={0.4}
                    whileTap={isAutoAnimating ? {} : { cursor: "grabbing" }}
                    onDragEnd={handleDragEnd}
                    style={{ x }}
                    animate={isDeleted ? { x: -500, opacity: 0 } : (isAutoAnimating ? {} : { opacity: 1 })}
                    transition={isDeleted ? { duration: 0.3 } : { type: "spring", stiffness: 300, damping: 25 }}
                    className="w-full bg-white px-6 py-4 flex items-center gap-4 cursor-grab shadow-[2px_0_10px_rgba(0,0,0,0.1)] relative z-10"
                >
                    <div className="w-12 h-12 bg-stone-100 rounded-full flex-shrink-0 flex items-center justify-center text-stone-400">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between w-full mb-1">
                            <h4 className="font-bold text-stone-900 text-sm">Design Sync</h4>
                            <span className="text-xs text-stone-400">10:30 AM</span>
                        </div>
                        <p className="text-xs text-stone-500 line-clamp-1 h-4">Swipe me left to reveal the delete action permanently.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
