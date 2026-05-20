'use client';
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

export function LongPressFeedbackDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isPressing, setIsPressing] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        if (!isPlaying) {
            requestAnimationFrame(() => {
                try {
                    controls.stop();
                    controls.set({ scale: 0, opacity: 0 });
                } catch (e) { }
            });
            setIsPressing(false);
            return;
        }

        // Simulate long press
        const simulatePress = async () => {
            setIsPressing(true);
            await controls.start({
                scale: 1,
                opacity: 0.15,
                transition: { duration: 1, ease: 'linear' }
            });
            // Flash success upon completion
            await controls.start({ opacity: 0, transition: { duration: 0.2 } });
            controls.set({ scale: 0 });
            setIsPressing(false);
        };

        const interval = setInterval(simulatePress, 2500);
        simulatePress();

        return () => clearInterval(interval);
    }, [isPlaying, controls]);

    return (
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <button className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-stone-200 bg-stone-50 text-stone-900 shadow-sm outline-none transition-colors hover:bg-stone-100">
                <motion.div
                    animate={controls}
                    initial={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 origin-center rounded-full bg-stone-900"
                />
                <span className="relative z-10 text-sm font-medium">Hold Me</span>
            </button>
        </div>
    );
}
