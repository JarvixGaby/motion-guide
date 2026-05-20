"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

export function ConfettiBurstDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isExploding, setIsExploding] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsExploding(false);
            return;
        }
        triggerConfetti();
        const interval = setInterval(() => {
            triggerConfetti();
        }, 3500);
        return () => clearInterval(interval);
    }, [isPlaying]);

    const triggerConfetti = () => {
        setIsExploding(true);
        setTimeout(() => setIsExploding(false), 2000);
    };

    // Generate confetti pieces
    const pieces = Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 500, // random spread
        y: (Math.random() - 0.5) * 500 - 150, // mostly upwards
        rotation: Math.random() * 360,
        scale: Math.random() * 0.6 + 0.4,
        color: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'][Math.floor(Math.random() * 7)]
    }));

    return (
        <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-50 p-6 shadow-sm ring-1 ring-stone-200">
            <div className="flex flex-col items-center z-10 bg-white/50 backdrop-blur p-8 rounded-3xl shadow-sm border border-stone-200">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6 shadow-inner border-[4px] border-white">
                    <Trophy className="w-10 h-10 text-yellow-500 drop-shadow-sm" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">Goal Achieved!</h3>
                <p className="text-stone-500 mb-8 max-w-[250px] text-center text-sm">
                    You've successfully completed all your assigned tasks for the day.
                </p>
                <button
                    onClick={triggerConfetti}
                    className="px-8 py-3.5 bg-stone-900 text-white rounded-2xl font-medium shadow-md hover:bg-stone-800 transition-colors active:scale-95 outline-none focus:ring-4 focus:ring-stone-200"
                >
                    Celebrate
                </button>
            </div>

            {/* Confetti container */}
            <AnimatePresence>
                {isExploding && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
                        {pieces.map((piece) => (
                            <motion.div
                                key={piece.id}
                                initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
                                animate={{
                                    x: piece.x,
                                    y: piece.y,
                                    scale: piece.scale,
                                    rotate: piece.rotation + 360 * (Math.random() > 0.5 ? 1 : -1),
                                    opacity: [1, 1, 0] // fade out at the end
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 1.5 + Math.random() * 1.5,
                                    ease: "easeOut",
                                    opacity: { duration: 2.5, times: [0, 0.7, 1] }
                                }}
                                className="absolute w-3 h-3 rounded-[2px]"
                                style={{ backgroundColor: piece.color }}
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
