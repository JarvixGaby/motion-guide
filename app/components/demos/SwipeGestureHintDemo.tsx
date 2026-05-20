'use client';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export function SwipeGestureHintDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const controls = useAnimation();

    useEffect(() => {
        if (!isPlaying) {
            requestAnimationFrame(() => {
                try { controls.set({ x: 0 }); } catch (e) { }
            });
            return;
        }

        const playHint = async () => {
            await new Promise((r) => setTimeout(r, 600));
            // Nudge to reveal destructive action
            await controls.start({
                x: -48,
                transition: { type: 'spring', stiffness: 400, damping: 25 }
            });
            await new Promise((r) => setTimeout(r, 300));
            // Snap back into place
            await controls.start({
                x: 0,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
            });
        };

        const interval = setInterval(playHint, 2500);
        playHint();

        return () => clearInterval(interval);
    }, [isPlaying, controls]);

    return (
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <div className="w-full max-w-[280px] overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
                <div className="relative">

                    {/* Background Action (Hidden Menu) */}
                    <div className="absolute inset-0 flex items-center justify-end bg-red-500 px-5">
                        <Trash2 className="h-5 w-5 text-white" />
                    </div>

                    {/* Foreground List Item that slides */}
                    <motion.div
                        animate={controls}
                        className="relative flex items-center gap-4 bg-white p-4 shadow-sm"
                    >
                        <div className="h-10 w-10 shrink-0 rounded-full bg-stone-100" />
                        <div className="flex w-full flex-col gap-2">
                            <div className="h-3 w-3/4 rounded bg-stone-200" />
                            <div className="h-2 w-1/2 rounded bg-stone-100" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
