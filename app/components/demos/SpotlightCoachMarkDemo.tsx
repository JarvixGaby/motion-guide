"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function SpotlightCoachMarkDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [showSpotlight, setShowSpotlight] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setShowSpotlight(false);
            return;
        }

        const loop = setInterval(() => {
            setShowSpotlight(true);
            setTimeout(() => setShowSpotlight(false), 2500);
        }, 3500);

        setShowSpotlight(true);
        setTimeout(() => setShowSpotlight(false), 2500);

        return () => clearInterval(loop);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200 relative">
            <div className="flex gap-4 relative z-0">
                <div className="w-24 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-[10px] uppercase font-bold text-stone-400 tracking-wider">Cancel</div>
                {/* Target Element */}
                <div className="w-24 h-10 rounded-lg bg-indigo-500 flex items-center justify-center text-[10px] uppercase font-bold text-white tracking-wider shadow-md">
                    New Feature
                </div>
            </div>

            <AnimatePresence>
                {showSpotlight && (
                    <motion.div
                        className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Huge shadow trick to create the masked spotlight cutout */}
                        <motion.div
                            className="absolute rounded-lg"
                            initial={{
                                width: 200, height: 200,
                                left: "50%", top: "50%",
                                x: "-50%", y: "-50%",
                                borderRadius: "100%",
                                boxShadow: "0 0 0 0px rgba(0,0,0,0.6)"
                            }}
                            animate={{
                                width: 104, height: 48, // slightly larger than 96x40 target button
                                left: "50%", top: "50%",
                                x: "4px", // perfectly shifts it 56px right of center (since x: -50% would be -52px)
                                y: "-50%",
                                borderRadius: "12px",
                                boxShadow: "0 0 0 9999px rgba(0,0,0,0.75)"
                            }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
                        />

                        {/* Tooltip Popup */}
                        <motion.div
                            className="absolute left-[50%] top-[65%] bg-white px-5 py-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex flex-col gap-1 w-56 ml-2"
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            style={{ x: "-0%" }} // Positioned below the button
                        >
                            <h4 className="text-[13px] font-bold text-stone-800 mb-0.5">Try the new feature</h4>
                            <p className="text-[11px] text-stone-500 leading-relaxed">It's powerful and helps you do more with less effort. Give it a spin!</p>
                            {/* Tooltip pointer arrow */}
                            <div className="absolute -top-2 left-10 w-4 h-4 bg-white rotate-45 rounded-sm shadow-sm" style={{ clipPath: "polygon(-10% -10%, 110% -10%, 110% 110%)" }} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
