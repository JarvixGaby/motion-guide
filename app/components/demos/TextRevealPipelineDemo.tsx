"use client";
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function TextRevealPipelineDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        container: containerRef,
        target: textRef,
        offset: ["start 80%", "end 20%"]
    });

    useEffect(() => {
        if (!isPlaying || !containerRef.current) return;
        let pos = 0;
        let direction = 1;

        const interval = setInterval(() => {
            if (!containerRef.current) return;
            pos += 2 * direction;
            if (pos > 500) direction = -1;
            if (pos <= 0) direction = 1;
            containerRef.current.scrollTop = pos;
        }, 16);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const phrase = "Animation breathes life into static interfaces, transforming clicks into experiences.";
    const words = phrase.split(" ");

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div
                ref={containerRef}
                className="w-full max-w-sm h-56 overflow-y-scroll rounded-xl shadow-inner bg-stone-900 hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="h-[200px] flex items-center justify-center text-stone-500 font-medium text-xs tracking-widest uppercase">Scroll down</div>

                <div ref={textRef} className="px-8 py-12 flex flex-wrap gap-x-2 gap-y-1 justify-center">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
                        return (
                            <motion.span
                                key={i}
                                style={{ opacity }}
                                className="text-[22px] font-bold text-white tracking-tight"
                            >
                                {word}
                            </motion.span>
                        )
                    })}
                </div>

                <div className="h-[200px]" />
            </div>
        </div>
    );
}
