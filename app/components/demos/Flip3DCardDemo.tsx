"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Flip3DCardDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsFlipped(false);
            return;
        }

        const loop = setInterval(() => {
            setIsFlipped(prev => !prev);
        }, 2500);

        return () => clearInterval(loop);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-100 p-4 shadow-sm ring-1 ring-stone-200 perspective-1000">
            <div
                className="w-56 h-48 relative cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ perspective: 1000 }}
            >
                {/* 
                    The inner container that holds both Front and Back faces
                    and actually performs the 3D rotation.
                 */}
                <motion.div
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
                    className="w-full h-full relative"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* FRONT FACE */}
                    <div
                        className="absolute inset-0 w-full h-full rounded-2xl bg-white shadow-md border border-stone-200 p-6 flex flex-col items-center justify-center gap-4 backface-hidden"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-lg text-stone-900">Pro Plan</h3>
                            <p className="text-stone-500 text-xs mt-1">Click to view features</p>
                        </div>
                    </div>

                    {/* BACK FACE */}
                    <div
                        className="absolute inset-0 w-full h-full rounded-2xl bg-indigo-600 shadow-md border border-indigo-500 p-6 flex flex-col justify-center text-white backface-hidden"
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    >
                        <h3 className="font-bold text-lg mb-4 border-b border-indigo-400 pb-2">Features Included:</h3>
                        <ul className="space-y-2 text-sm text-indigo-100">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Unlimited Projects</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />24/7 Support</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Custom Domain</li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
