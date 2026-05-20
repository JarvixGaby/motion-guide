"use client";
import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function HorizontalScrollGalleryDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        container: containerRef,
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    useEffect(() => {
        if (!isPlaying || !containerRef.current) return;
        let pos = 0;
        let direction = 1;

        const interval = setInterval(() => {
            if (!containerRef.current) return;
            pos += 2 * direction;
            if (pos > 800) direction = -1;
            if (pos <= 0) direction = 1;
            containerRef.current.scrollTop = pos;
        }, 16);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div
                ref={containerRef}
                className="w-full max-w-sm h-56 overflow-y-scroll rounded-xl shadow-inner border border-stone-200 bg-stone-50 hide-scrollbar relative"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="h-[150px] flex items-center justify-center text-stone-400 font-bold uppercase tracking-widest text-[10px]">Scroll Down ↓</div>

                {/* 
                  The trick for horizontal scroll: 
                  Container has a large height (e.g. 800px) so the user can scroll vertically for a long time.
                  Inside, there's a sticky element that holds the horizontal track.
                */}
                <div ref={targetRef} className="h-[1000px] relative">
                    <div className="sticky top-0 flex h-56 items-center overflow-hidden bg-stone-900 border-y border-stone-800">
                        <motion.div style={{ x }} className="flex gap-4 px-8 w-max">
                            {[1, 2, 3, 4, 5].map((card) => (
                                <div key={card} className="w-56 h-36 bg-stone-800 rounded-xl shrink-0 shadow-2xl border border-stone-700 flex flex-col justify-end p-4 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-50 mix-blend-overlay" />
                                    <span className="text-white font-bold relative z-10">Gallery Item {card}</span>
                                    <span className="text-white/50 text-xs font-medium relative z-10">Horizontal scroll</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                <div className="h-[150px] flex items-center justify-center text-stone-400 font-bold uppercase tracking-widest text-[10px]">End of Gallery</div>
            </div>
        </div>
    );
}
