'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GripVertical } from 'lucide-react';

export function DragDropGhostDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsDragging(false);
            return;
        }

        const interval = setInterval(() => {
            setIsDragging(true);
            setTimeout(() => setIsDragging(false), 1500);
        }, 2500);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-50 p-6 shadow-sm ring-1 ring-stone-200">
            <div className="flex w-full max-w-[280px] flex-col gap-3">

                {/* Mock Static Item 1 */}
                <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                    <GripVertical className="h-4 w-4 text-stone-300" />
                    <div className="h-4 w-32 rounded bg-stone-200" />
                </div>

                {/* The Dragged Item context */}
                <div className="relative h-14 w-full">
                    {/* The Placeholder left behind */}
                    <div
                        className={`absolute inset-0 flex items-center gap-3 rounded-xl border-2 border-dashed border-stone-200 bg-stone-50/50 p-4 transition-opacity duration-300 ${isDragging ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div className="h-4 w-4 rounded-sm bg-stone-200" />
                        <div className="h-4 w-40 rounded bg-stone-200" />
                    </div>

                    {/* The Ghost being dragged */}
                    <motion.div
                        animate={
                            isDragging
                                ? {
                                    y: -24,
                                    x: 8,
                                    scale: 1.03,
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                                    rotate: 2
                                }
                                : {
                                    y: 0,
                                    x: 0,
                                    scale: 1,
                                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                                    rotate: 0
                                }
                        }
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="absolute inset-x-0 z-10 flex cursor-grab items-center gap-3 rounded-xl border border-stone-200 bg-white p-4"
                        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                    >
                        <GripVertical className="h-4 w-4 text-stone-400" />
                        <div className="h-4 w-40 rounded bg-stone-800" />
                    </motion.div>
                </div>

                {/* Mock Static Item 3 */}
                <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                    <GripVertical className="h-4 w-4 text-stone-300" />
                    <div className="h-4 w-36 rounded bg-stone-200" />
                </div>

            </div>
        </div>
    );
}
