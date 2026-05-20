"use client";
import { motion } from 'framer-motion';

export function LottieLoadingLoopDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-900 p-4 shadow-sm ring-1 ring-stone-200">
            <div className="relative w-24 h-24 flex items-center justify-center">
                {isPlaying && (
                    <>
                        {/* Custom vector loop simulating a branded Lottie animation */}
                        <motion.div
                            className="absolute inset-0 border-[3px] border-indigo-500 rounded-lg"
                            animate={{
                                rotate: [0, 90, 180, 270, 360],
                                borderRadius: ["20%", "50%", "50%", "20%", "20%"]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute inset-0 border-[3px] border-emerald-400 rounded-lg"
                            animate={{
                                rotate: [360, 270, 180, 90, 0],
                                scale: [1, 0.6, 1, 0.6, 1],
                                borderRadius: ["50%", "20%", "50%", "20%", "50%"]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                            animate={{
                                scale: [0.8, 1.2, 0.8],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </>
                )}
            </div>
            {/* Context label */}
            <div className="absolute bottom-4 text-xs text-stone-500 font-medium">Custom Vector Loop (Lottie Approx.)</div>
        </div>
    );
}
