"use client";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useEffect, useRef, useState } from "react";

export function TiltParallaxCardDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInteracting, setIsInteracting] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

    // Map mouse position to degree rotations (-15 to 15 degrees)
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    useEffect(() => {
        if (!isPlaying || isInteracting) return;

        // Auto-play the tilt effect
        let time = 0;
        const loop = setInterval(() => {
            time += 0.03;
            x.set(Math.cos(time) * 0.4);
            y.set(Math.sin(time) * 0.4);
        }, 16);

        return () => {
            clearInterval(loop);
            if (!isInteracting) {
                x.set(0);
                y.set(0);
            }
        };
    }, [isPlaying, isInteracting, x, y]);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        setIsInteracting(true);
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        // Normalized values (-0.5 to 0.5)
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsInteracting(false);
        x.set(0);
        y.set(0);
    };

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-100 p-4 shadow-sm ring-1 ring-stone-200 perspective-1000">
            {/* The container that preserves 3D and applies the tilt */}
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-64 h-40 max-w-sm rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl overflow-visible flex items-center justify-center"
            >
                {/* Internal floating elements (Z translated physically in 3D space) */}
                <div
                    style={{ transform: "translateZ(50px)" }}
                    className="absolute inset-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm pointer-events-none"
                />

                <div style={{ transform: "translateZ(75px)" }} className="pointer-events-none flex flex-col items-center">
                    <svg className="w-10 h-10 text-white mb-2 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="text-white font-bold tracking-widest uppercase drop-shadow-lg text-xs font-mono">Premium Pass</span>
                </div>

                {/* Simulated shiny gloss that tracks the mouse subtly */}
                <motion.div
                    className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
                    style={{
                        background: useMotionTemplate`radial-gradient(150px circle at calc(50% + ${useTransform(x, v => v * 100)}%) calc(50% + ${useTransform(y, v => v * 100)}%), white, transparent 60%)`
                    }}
                />
            </motion.div>
        </div>
    );
}
