"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function TracingBeamProgressDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        container: containerRef,
        target: contentRef,
        offset: ["start start", "end end"]
    });

    // Animate the height of the glowing beam
    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        if (!isPlaying || !containerRef.current) return;
        let pos = 0;
        let direction = 1;

        const interval = setInterval(() => {
            if (!containerRef.current) return;
            pos += 2 * direction;
            if (pos > 600) direction = -1; // Max scroll distance
            if (pos <= 0) direction = 1;
            containerRef.current.scrollTop = pos;
        }, 16);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div
                ref={containerRef}
                className="w-full max-w-sm h-56 overflow-y-scroll rounded-xl shadow-inner border border-stone-100 bg-stone-50 overflow-x-hidden relative flex hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* SVG Rail and Tracing Beam container (Left Sidebar) */}
                <div className="w-16 h-full absolute left-0 top-0 hidden md:flex flex-col items-center pt-8">
                    {/* The static rail line */}
                    <div className="w-px h-[1000px] bg-stone-200 absolute top-8 left-8 z-0"></div>

                    {/* The animated dynamic beam */}
                    <div className="absolute top-8 left-8 w-px h-[1000px] z-10 flex flex-col items-center pointer-events-none">
                        <motion.div
                            style={{ height: y1 }}
                            className="w-full bg-gradient-to-b from-transparent via-indigo-500 to-cyan-400 opacity-80"
                        />
                        {/* Beam Head (The glowing tip) */}
                        <motion.div
                            className="w-2 h-2 rounded-full bg-cyan-400 absolute -bottom-1 -left-[3.5px] shadow-[0_0_15px_rgba(34,211,238,1)]"
                            style={{
                                top: y1
                            }}
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div ref={contentRef} className="pl-6 md:pl-20 pr-6 py-8 w-full h-[1500px]">
                    <div className="sticky top-8 font-bold text-stone-300 uppercase tracking-[0.2em] text-[10px] mb-8">Navigation Node</div>
                    <h3 className="text-xl font-bold text-stone-800 mb-4">Tracing Beam Scroll</h3>
                    <p className="text-sm text-stone-500 leading-relaxed max-w-[200px]">
                        As you scroll down the container, the vibrant cyan and indigo gradient beam physical traces your path down the guide rail on the left.
                    </p>
                </div>

            </div>
        </div>
    );
}
