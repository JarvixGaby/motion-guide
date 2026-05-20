"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function AuroraBackgroundDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-900 shadow-sm ring-1 ring-stone-900 relative">
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0A0A0A] z-0">
                {/* Intense Blur Filter Layer over everything */}
                <div className="absolute inset-0 backdrop-blur-[80px]" />

                {isPlaying && (
                    <>
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen mix-blend-lighten opacity-60"
                            animate={{
                                scale: [1, 1.2, 1],
                                x: [0, 50, -20, 0],
                                y: [0, -30, 20, 0]
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-400 rounded-full mix-blend-screen mix-blend-lighten opacity-50"
                            animate={{
                                scale: [1, 1.3, 1],
                                x: [0, -60, 40, 0],
                                y: [0, 40, -50, 0]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-violet-600 rounded-full mix-blend-screen mix-blend-lighten opacity-40"
                            animate={{
                                scale: [1, 1.1, 1],
                                x: [0, 30, -30, 0],
                                y: [0, -40, 20, 0]
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        />
                    </>
                )}
            </div>

            {/* Simulated Dot Grid pattern overlying the aurora */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-8 bg-stone-950/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-stone-400 tracking-tight">Vibe Generation</h1>
                <p className="text-xs text-stone-300 font-medium mt-2">Mesmerizing blurred fields.</p>
            </div>
        </div>
    );
}
