"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ImageLazyLoadFadeDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsLoaded(false);
            return;
        }
        setIsLoaded(false);
        const timer = setTimeout(() => setIsLoaded(true), 1200);

        // Loop it every 3.5 seconds
        const loop = setInterval(() => {
            setIsLoaded(false);
            setTimeout(() => setIsLoaded(true), 1200);
        }, 3500);

        return () => {
            clearTimeout(timer);
            clearInterval(loop);
        };
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div className="relative w-48 h-48 rounded-xl overflow-hidden bg-stone-100 flex items-center justify-center shadow-inner">
                {/* Low res blur / skeleton placeholder */}
                <AnimatePresence>
                    {!isLoaded && (
                        <motion.div
                            className="absolute inset-0 bg-stone-200/50 backdrop-blur-md z-10 flex items-center justify-center"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-stone-400 text-xs tracking-widest uppercase font-medium">Loading...</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* High res image */}
                <motion.img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Abstract art"
                    className="object-cover w-full h-full"
                    initial={{ filter: "blur(10px)", scale: 1.05 }}
                    animate={{
                        filter: isLoaded ? "blur(0px)" : "blur(10px)",
                        scale: isLoaded ? 1 : 1.05
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}
