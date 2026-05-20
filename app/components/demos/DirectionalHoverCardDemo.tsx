"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, MouseEvent as ReactMouseEvent, useEffect } from 'react';

type Direction = 'top' | 'right' | 'bottom' | 'left';

export function DirectionalHoverCardDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [direction, setDirection] = useState<Direction>('left');
    const [isHovered, setIsHovered] = useState(false);
    const [autoPlayPhase, setAutoPlayPhase] = useState(0);

    const getDirection = (e: ReactMouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        const { width, height, left, top } = e.currentTarget.getBoundingClientRect();

        // Calculate center
        const cx = left + width / 2;
        const cy = top + height / 2;

        // Calculate relative coordinates and normalize
        const x = (e.clientX - cx) * (height / width);
        const y = (e.clientY - cy);

        // Determine angle
        const angle = Math.atan2(y, x) * (180 / Math.PI);

        if (angle >= -45 && angle < 45) return 'right';
        if (angle >= 45 && angle < 135) return 'bottom';
        if (angle >= -135 && angle < -45) return 'top';
        return 'left';
    };

    const handleMouseEnter = (e: ReactMouseEvent<HTMLDivElement>) => {
        setIsHovered(true);
        setDirection(getDirection(e));
    };

    const handleMouseLeave = (e: ReactMouseEvent<HTMLDivElement>) => {
        setIsHovered(false);
        setDirection(getDirection(e));
    };

    // Auto play logic for grid view
    useEffect(() => {
        if (!isPlaying || isHovered) return;

        const autoDirs: Direction[] = ['left', 'top', 'right', 'bottom'];
        const loop = setInterval(() => {
            setAutoPlayPhase(p => (p + 1) % 8);
        }, 1500);

        return () => clearInterval(loop);
    }, [isPlaying, isHovered]);

    const activeHover = isHovered || (isPlaying && autoPlayPhase % 2 === 0);
    const activeDir = isHovered ? direction : (['left', 'top', 'right', 'bottom'] as Direction[])[Math.floor(autoPlayPhase / 2) % 4];

    const variants = {
        initial: (dir: Direction) => {
            switch (dir) {
                case 'top': return { y: "-100%", x: 0 };
                case 'right': return { x: "100%", y: 0 };
                case 'bottom': return { y: "100%", x: 0 };
                case 'left': return { x: "-100%", y: 0 };
            }
        },
        animate: { x: 0, y: 0 },
        exit: (dir: Direction) => {
            switch (dir) {
                case 'top': return { y: "-100%", x: 0 };
                case 'right': return { x: "100%", y: 0 };
                case 'bottom': return { y: "100%", x: 0 };
                case 'left': return { x: "-100%", y: 0 };
            }
        }
    };

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-100 p-4 shadow-sm ring-1 ring-stone-200">
            <div
                className="relative w-64 h-40 bg-white rounded-xl shadow-md overflow-hidden border border-stone-200"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Background Base (e.g. Image or Pattern) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-stone-50 to-stone-200">
                    <svg className="w-12 h-12 text-stone-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-stone-400 font-medium text-sm">Portfolio Image</span>
                </div>

                {/* Overlay Panel */}
                <AnimatePresence custom={activeDir} initial={false}>
                    {activeHover && (
                        <motion.div
                            key="overlay"
                            custom={activeDir}
                            variants={variants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                            className="absolute inset-0 bg-indigo-600/95 backdrop-blur-sm p-6 flex flex-col justify-end text-white"
                        >
                            <h3 className="font-bold text-lg leading-tight mb-1">Project Apollo</h3>
                            <p className="text-xs text-indigo-200 line-clamp-2">A deep dive into spatial UI elements and directional awareness.</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider">View Case</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {/* Context Label for Demo visually */}
            <p className="absolute bottom-6 text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em]">{activeDir} edge detection</p>
        </div>
    );
}
