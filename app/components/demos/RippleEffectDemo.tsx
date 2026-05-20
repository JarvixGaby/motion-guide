'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function RippleEffectDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const addRipple = (x: number, y: number) => {
        const newRipple = { x, y, id: Date.now() + Math.random() };
        setRipples((prev) => [...prev, newRipple]);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        addRipple(e.clientX - rect.left, e.clientY - rect.top);
    };

    useEffect(() => {
        if (!isPlaying || !buttonRef.current) return;
        let timeout: NodeJS.Timeout;
        const triggerRandomRipple = () => {
            if (buttonRef.current) {
                const { width, height } = buttonRef.current.getBoundingClientRect();
                // Random position within button
                const x = Math.random() * width;
                const y = Math.random() * height;
                addRipple(x, y);
            }
            timeout = setTimeout(triggerRandomRipple, 1200);
        };
        triggerRandomRipple();
        return () => clearTimeout(timeout);
    }, [isPlaying]);

    const handleAnimationComplete = (id: number) => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
    };

    return (
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <button
                ref={buttonRef}
                onClick={handleClick}
                className="relative overflow-hidden min-w-[160px] rounded-xl bg-stone-900 px-10 py-4 text-base font-medium text-white shadow-sm transition-colors hover:bg-stone-800"
            >
                <div className="relative z-10 flex items-center justify-center gap-2">
                    Tap anywhere
                </div>
                <AnimatePresence>
                    {ripples.map((ripple) => (
                        <motion.span
                            key={ripple.id}
                            initial={{ scale: 0, opacity: 0.4 }}
                            animate={{ scale: 4, opacity: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            onAnimationComplete={() => handleAnimationComplete(ripple.id)}
                            className="absolute z-0 rounded-full bg-white/30"
                            style={{
                                left: ripple.x,
                                top: ripple.y,
                                width: 100,
                                height: 100,
                                marginTop: -50,
                                marginLeft: -50,
                                pointerEvents: 'none',
                            }}
                        />
                    ))}
                </AnimatePresence>
            </button>
        </div>
    );
}
