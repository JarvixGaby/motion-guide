"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent, useState, useEffect } from "react";

export function MagneticButtonDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const ref = useRef<HTMLButtonElement>(null);
    const [isInteracting, setIsInteracting] = useState(false);

    // Mouse relative to the center of the button
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth snapping back
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    useEffect(() => {
        if (!isPlaying || isInteracting) return;

        let time = 0;
        const loop = setInterval(() => {
            time += 0.05;
            // Move in a small figure-8 pattern
            const autoX = Math.sin(time) * 30;
            const autoY = Math.sin(time * 2) * 15;
            x.set(autoX);
            y.set(autoY);
        }, 16);

        return () => {
            clearInterval(loop);
            if (!isInteracting) {
                x.set(0);
                y.set(0);
            }
        };
    }, [isPlaying, isInteracting, x, y]);

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        setIsInteracting(true);
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();

        // Calculate center
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Weak pull (divide by friction factor)
        x.set(middleX * 0.3);
        y.set(middleY * 0.3);
    };

    const handleMouseLeave = () => {
        setIsInteracting(false);
        x.set(0);
        y.set(0);
    };

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200 relative group">
            {/* Invisible expanded hit area around the button to cast a wider net for the magnetic pull */}
            <div className="p-12">
                <motion.button
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ x: springX, y: springY }}
                    className={`relative flex h-16 w-40 items-center justify-center rounded-full bg-stone-900 border border-stone-800 text-white font-bold tracking-wider shadow-xl transition-shadow outline-none focus-visible:ring-4 focus-visible:ring-stone-200 ${isPlaying ? 'shadow-2xl' : 'group-hover:shadow-2xl'}`}
                >
                    {/* The text inside also moves, but slightly faster for a 3D parallax effect */}
                    <motion.span
                        style={{ x: useTransform(springX, v => v * 0.5), y: useTransform(springY, v => v * 0.5) }}
                        className="pointer-events-none"
                    >
                        Hover Me
                    </motion.span>
                </motion.button>
            </div>

            <p className="absolute bottom-6 text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em]">Magnetic Snapping</p>
        </div>
    );
}
