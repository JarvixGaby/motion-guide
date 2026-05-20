'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ButtonLoadingStateDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            setIsLoading(true);
            const timer = setTimeout(() => setIsLoading(false), 2000);
            return () => clearTimeout(timer);
        } else {
            setIsLoading(false);
        }
    }, [isPlaying]);

    return (
        <button
            onClick={() => setIsLoading(true)}
            disabled={isLoading}
            className="relative flex h-12 w-40 items-center justify-center rounded-xl bg-stone-900 text-sm font-medium text-white shadow-sm transition-all hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-900"
        >
            <AnimatePresence mode="popLayout" initial={false}>
                {isLoading ? (
                    <motion.div
                        key="spinner"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center"
                    >
                        <Loader2 className="h-5 w-5 animate-spin text-stone-300" />
                    </motion.div>
                ) : (
                    <motion.span
                        key="text"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        Save Changes
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
}
