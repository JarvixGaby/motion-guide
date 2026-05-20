"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, useEffect, useState } from "react";

export function HoverGlareCardDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isInteracting, setIsInteracting] = useState(false);

    useEffect(() => {
        if (!isPlaying || isInteracting) return;

        // Auto-play glare animation when in grid view or not being hovered in detail view
        let time = 0;
        const loop = setInterval(() => {
            time += 0.05;
            // Orbit path slightly offset
            const x = 128 + Math.cos(time) * 80;
            const y = 80 + Math.sin(time) * 40;
            mouseX.set(x);
            mouseY.set(y);
        }, 16);

        return () => clearInterval(loop);
    }, [isPlaying, isInteracting, mouseX, mouseY]);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        setIsInteracting(true);
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-900 p-4 shadow-sm ring-1 ring-stone-900">
            <div
                className="group relative w-64 h-40 max-w-sm rounded-xl border border-white/10 bg-stone-900 px-8 py-6 shadow-2xl overflow-hidden cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setIsInteracting(false)}
            >
                {/* The Glare / Spotlight Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl transition duration-300"
                    style={{
                        opacity: isPlaying ? 1 : 0,
                        background: useMotionTemplate`
                            radial-gradient(
                            200px circle at ${mouseX}px ${mouseY}px,
                            rgba(255,255,255,0.15),
                            transparent 80%
                            )
                        `,
                    }}
                />

                {/* Simulated Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2 pointer-events-none">
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-2 shadow-inner">
                        <svg className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="text-white font-bold tracking-tight text-sm">Premium Feature</h3>
                    <p className="text-stone-400 text-[10px] text-center w-4/5 leading-relaxed">Hover to reveal the radiant spotlight effect.</p>
                </div>
            </div>
        </div>
    );
}
