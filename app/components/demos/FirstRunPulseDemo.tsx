"use client";
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Layers } from 'lucide-react';

export function FirstRunPulseDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    return (
        <div className="relative flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-stone-50 p-6 shadow-sm ring-1 ring-stone-200">

            {/* Conceptual Dashboard Context */}
            <div className="w-full max-w-md bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full opacity-80 backdrop-blur-sm scale-[0.98]">
                <div className="h-14 border-b border-stone-100 flex items-center px-4 justify-between bg-stone-50/50">
                    <div className="w-24 h-4 bg-stone-200 rounded-full" />
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-stone-200" />
                    </div>
                </div>

                <div className="flex-1 p-6 flex flex-col">
                    <div className="w-48 h-6 bg-stone-200 rounded-md mb-8" />
                    <div className="space-y-4 mb-auto">
                        <div className="w-full h-16 bg-stone-50 rounded-xl border border-stone-100 flex items-center px-4">
                            <div className="w-8 h-8 rounded-md bg-stone-200 mr-4" />
                            <div className="w-32 h-3 bg-stone-200 rounded-full" />
                        </div>
                        <div className="w-full h-16 bg-stone-50 rounded-xl border border-stone-100 flex items-center px-4">
                            <div className="w-8 h-8 rounded-md bg-stone-200 mr-4" />
                            <div className="w-24 h-3 bg-stone-200 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop overlay to focus attention */}
            <div className="absolute inset-0 bg-stone-900/5 backdrop-blur-[1px] flex items-center justify-center pointer-events-none z-10" />

            <div className="absolute z-20 flex flex-col items-center w-full max-w-md pt-12">
                <div className="mb-6 text-center bg-white p-5 rounded-2xl shadow-xl border border-stone-200 max-w-[280px] transform translate-y-2">
                    <h3 className="font-semibold text-stone-900 mb-1.5 text-lg">Welcome! 👋</h3>
                    <p className="text-sm text-stone-500">Your first step is to connect a data source so we can start analyzing.</p>
                </div>

                <div className="relative group mt-2">
                    {/* Pulsing layers */}
                    {[1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={isPlaying ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 0 }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                delay: i === 1 ? 0 : 1,
                                ease: "easeOut"
                            }}
                            className="pointer-events-none absolute inset-0 rounded-xl bg-blue-500"
                        />
                    ))}
                    <button className="relative flex items-center space-x-2 rounded-xl bg-blue-600 px-6 py-3.5 font-medium text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-700">
                        <Layers className="h-5 w-5" />
                        <span>Connect Data Source</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
