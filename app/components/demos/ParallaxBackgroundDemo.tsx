"use client";
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxBackgroundDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: containerRef });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    useEffect(() => {
        if (!isPlaying || !containerRef.current) return;
        let pos = 0;
        let direction = 1;

        const interval = setInterval(() => {
            if (!containerRef.current) return;
            pos += 1.5 * direction;
            if (pos > 600) direction = -1;
            if (pos <= 0) direction = 1;
            containerRef.current.scrollTop = pos;
        }, 16);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div
                ref={containerRef}
                className="w-full max-w-sm h-56 overflow-y-scroll rounded-xl shadow-inner relative bg-stone-900 hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="absolute inset-0 w-full h-[150%] z-0 overflow-hidden pointer-events-none">
                    <motion.img
                        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Hero Parallax"
                        className="w-full h-full object-cover opacity-50 absolute top-[-25%]"
                        style={{ y: yBg }}
                    />
                </div>

                <div className="relative z-10 p-8 h-[800px] flex flex-col items-center pt-24">
                    <h2 className="text-3xl font-bold text-white mb-4 text-center tracking-tight">Hero Section</h2>
                    <p className="text-white/80 text-center text-sm max-w-[250px] mb-64">
                        The background image scrolls slightly slower than this foreground text, creating depth.
                    </p>

                    <div className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-full border border-white/50">
                        <h3 className="font-bold text-stone-800">Content Block</h3>
                        <p className="text-stone-500 text-xs mt-2">This grounds the scrolling experience by moving at normal speed.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
