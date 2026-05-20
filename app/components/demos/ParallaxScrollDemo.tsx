"use client";
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ParallaxScrollDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        container: containerRef,
    });

    // Background moves slower
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    // Foreground shape moves faster
    const yShape = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
    // Top text moves slightly down
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    useEffect(() => {
        if (!isPlaying || !containerRef.current) return;
        const speed = 1.5;
        let pos = 0;
        let direction = 1;

        const interval = setInterval(() => {
            if (!containerRef.current) return;
            pos += speed * direction;
            if (pos > 800) direction = -1;
            if (pos <= 0) direction = 1;
            containerRef.current.scrollTop = pos;
        }, 16);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            {/* Scrollable Container */}
            <div
                ref={containerRef}
                className="w-full max-w-sm h-56 overflow-y-scroll rounded-xl shadow-lg relative bg-stone-900 hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* Parallax Background */}
                <motion.div
                    className="absolute inset-0 w-full h-[150%] z-0 origin-top pointer-events-none"
                    style={{ y: yBg }}
                >
                    {/* Subtle grid pattern for background to make movement visible */}
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(circle at center, white 1.5px, transparent 1px)', backgroundSize: '32px 32px' }}
                    />
                </motion.div>

                {/* Scroll Content */}
                <div className="relative z-10 p-8 h-[1000px] flex flex-col justify-start">
                    {/* Decorative Image Container */}
                    <motion.div
                        className="relative w-48 h-40 mt-8 rounded-2xl overflow-hidden shadow-xl"
                        style={{ y: yText }}
                    >
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 h-[150%] bg-cover bg-center"
                            style={{
                                top: '-25%',
                                backgroundImage: "url('https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                            <h2 className="text-lg font-bold text-white mb-1">Explore</h2>
                            <p className="text-white/70 text-xs">Scroll to reveal</p>
                        </div>
                    </motion.div>

                    {/* Floating Floating Element */}
                    <motion.div
                        className="w-32 h-32 ml-auto mt-20 mb-[200px] relative"
                        style={{ y: yShape }}
                    >
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-4">
                            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-3">
                                <span className="text-white text-xl font-light">01</span>
                            </div>
                            <span className="text-xs text-white/80 font-medium tracking-wider uppercase">Depth</span>
                        </div>
                    </motion.div>

                    <div className="mt-auto bg-stone-800/90 backdrop-blur-xl border border-stone-700/50 p-6 rounded-2xl shadow-2xl mb-12">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            <h3 className="font-semibold text-white text-sm">Parallax Effect</h3>
                        </div>
                        <p className="text-xs text-stone-400 leading-relaxed">
                            Different scroll speeds create the illusion of depth. Foreground moves fast, background moves slow.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
