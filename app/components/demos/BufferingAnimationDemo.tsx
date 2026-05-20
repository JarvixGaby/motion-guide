"use client";
import { motion } from 'framer-motion';

export function BufferingAnimationDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-900 p-4 shadow-sm ring-1 ring-stone-900">
            {/* Simulating a video player background */}
            <div className="relative w-full h-full rounded-xl bg-stone-800 flex items-center justify-center overflow-hidden shadow-inner">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />

                {isPlaying && (
                    <motion.div
                        className="relative w-12 h-12 flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    >
                        {Array.from({ length: 8 }).map((_, i) => (
                            <motion.span
                                key={i}
                                className="absolute top-0 w-2.5 h-2.5 bg-white rounded-full bg-opacity-80 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                style={{
                                    originY: "24px", // Half of the 48px wrapper
                                    rotate: i * 45,
                                }}
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: (i * 1.5) / 8,
                                    ease: "linear"
                                }}
                            />
                        ))}
                    </motion.div>
                )}

                <div className="absolute bottom-4 left-6 flex items-center gap-4 w-full pr-12">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                        <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-1" />
                    </div>
                    <div className="flex-1 h-1 bg-white/20 rounded-full">
                        <div className="w-1/3 h-full bg-red-500 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
