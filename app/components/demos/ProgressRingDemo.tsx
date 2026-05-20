"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ProgressRingDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isPlaying) {
            setProgress(0);
            return;
        }
        const timer = setInterval(() => {
            setProgress(p => {
                if (p >= 100) return 0;
                return p + Math.floor(Math.random() * 15 + 10);
            });
        }, 350);
        return () => clearInterval(timer);
    }, [isPlaying]);

    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const clampedProgress = Math.min(100, Math.max(0, progress));
    const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

    return (
        <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <div className="flex flex-col items-center bg-white p-10 rounded-3xl shadow-sm border border-stone-200">

                <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                    {/* Background Ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                        <circle
                            cx="64"
                            cy="64"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-stone-100"
                        />
                        {/* Animated Progress Ring */}
                        <motion.circle
                            cx="64"
                            cy="64"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeLinecap="round"
                            className="text-blue-500 drop-shadow-sm"
                            style={{ strokeDasharray: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </svg>

                    <div className="text-xl font-bold text-stone-900 tabular-nums">
                        {clampedProgress}%
                    </div>
                </div>

                <p className="text-stone-500 font-medium text-sm">Uploading file...</p>
            </div>
        </div>
    );
}
