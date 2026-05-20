"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function TextDecodeRevealDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const targetText = "SYSTEM_AUTHORIZED";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+><?";

    const [displayText, setDisplayText] = useState("");
    const [isTriggered, setIsTriggered] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setDisplayText(targetText);
            setIsTriggered(false);
            return;
        }

        const loop = setInterval(() => {
            setIsTriggered(t => !t);
        }, 4000); // 4 second overall loop

        setIsTriggered(true);

        return () => clearInterval(loop);
    }, [isPlaying]);

    useEffect(() => {
        if (!isTriggered) {
            setDisplayText(""); // Hide text when not triggered
            return;
        }

        let iteration = 0;
        const maxIterations = 20; // How many scrambles before solving completely

        const interval = setInterval(() => {
            setDisplayText((prev) => {
                return targetText
                    .split("")
                    .map((char, index) => {
                        // Reveal correct character from left to right as iterations progress
                        if (index < iteration / (maxIterations / targetText.length)) {
                            return targetText[index];
                        }
                        // Otherwise, return random matrix character
                        if (targetText[index] === " ") return " ";
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("");
            });

            if (iteration >= maxIterations) {
                clearInterval(interval);
            }

            iteration += 1;
        }, 40); // Scramble speed (fast)

        return () => clearInterval(interval);
    }, [isTriggered, targetText, characters]);

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-900 p-4 shadow-inner ring-1 ring-stone-800">
            <div className="relative w-full max-w-sm h-32 flex items-center justify-center border border-emerald-500/20 rounded-lg bg-emerald-950/20">
                <AnimatePresence>
                    {isTriggered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="font-mono text-xl md:text-2xl font-bold tracking-widest text-emerald-400"
                        >
                            {displayText}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Decorative scanning line */}
                {isTriggered && (
                    <motion.div
                        className="absolute inset-x-0 h-[2px] bg-emerald-400/50 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                    />
                )}
            </div>
        </div>
    );
}
