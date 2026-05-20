'use client';
import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyConfirmationFlashDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const controls = useAnimation();
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsCopied(false);
            requestAnimationFrame(() => {
                try { controls.set({ backgroundColor: 'rgba(255, 255, 255, 1)' }); } catch (e) { }
            });
            return;
        }

        const simulateCopy = async () => {
            setIsCopied(true);
            // Flash success color (emerald-500/10) almost instantly
            await controls.start({
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                transition: { duration: 0.1 }
            });
            // Fade back to white slowly
            await controls.start({
                backgroundColor: 'rgba(255, 255, 255, 1)',
                transition: { duration: 0.8, ease: 'easeOut' }
            });
            await new Promise((r) => setTimeout(r, 600));
            setIsCopied(false);
        };

        const interval = setInterval(simulateCopy, 2800);
        simulateCopy();

        return () => clearInterval(interval);
    }, [isPlaying, controls]);

    return (
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-stone-50 p-6 shadow-sm ring-1 ring-stone-200">
            <motion.div
                animate={controls}
                initial={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
                className="flex items-center gap-4 rounded-lg border border-stone-200 px-4 py-3 shadow-sm bg-white"
            >
                <code className="font-mono text-xs text-stone-600 tracking-wider">npm install framer-motion</code>
                <button
                    className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-stone-100"
                    aria-label="Copy code"
                >
                    {isCopied ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                    ) : (
                        <Copy className="h-4 w-4 text-stone-400" />
                    )}
                </button>
            </motion.div>
        </div>
    );
}
