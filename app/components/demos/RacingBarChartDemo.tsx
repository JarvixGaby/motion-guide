"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialData = [
    { id: '1', label: 'React', color: 'bg-sky-500' },
    { id: '2', label: 'Vue', color: 'bg-emerald-500' },
    { id: '3', label: 'Svelte', color: 'bg-orange-500' },
    { id: '4', label: 'Angular', color: 'bg-red-600' }
];

const frames = [
    [
        { id: '1', width: 80, score: 95 },
        { id: '2', width: 60, score: 72 },
        { id: '3', width: 40, score: 48 },
        { id: '4', width: 30, score: 36 }
    ],
    [
        { id: '1', width: 85, score: 98 },
        { id: '2', width: 75, score: 88 },
        { id: '4', width: 60, score: 70 },
        { id: '3', width: 45, score: 52 }
    ],
    [
        { id: '2', width: 95, score: 110 },
        { id: '1', width: 90, score: 105 },
        { id: '3', width: 70, score: 80 },
        { id: '4', width: 65, score: 75 }
    ],
    [
        { id: '2', width: 100, score: 120 },
        { id: '3', width: 90, score: 108 },
        { id: '1', width: 85, score: 106 },
        { id: '4', width: 70, score: 82 }
    ],
];

export function RacingBarChartDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        if (!isPlaying) {
            setFrameIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setFrameIndex((prev) => (prev + 1) % frames.length);
        }, 1500);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const currentFrameState = frames[frameIndex].map((frameItem, i) => {
        const baseItem = initialData.find(d => d.id === frameItem.id)!;
        return {
            ...baseItem,
            width: frameItem.width,
            score: frameItem.score,
            rank: i // Target Y position based on current sorted array index
        };
    });

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div className="w-full max-w-sm h-48 relative border-l border-b border-stone-200 pb-2 pl-2">
                <AnimatePresence>
                    {currentFrameState.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={false}
                            animate={{
                                y: item.rank * 42, // spacing
                                width: `${item.width}%`
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 80,
                                damping: 20
                            }}
                            className={`absolute left-0 h-8 rounded-r-md flex items-center justify-between px-3 min-w-[100px] shadow-sm ${item.color}`}
                        >
                            <span className="text-white text-xs font-bold tracking-wider">{item.label}</span>
                            <span className="text-white/90 text-[10px] font-mono font-bold tabular-nums">{item.score}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
