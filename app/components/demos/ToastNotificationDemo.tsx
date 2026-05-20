'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export function ToastNotificationDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (isPlaying) {
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 2000);
            const interval = setInterval(() => {
                setShowToast(false);
                setTimeout(() => setShowToast(true), 200);
                setTimeout(() => setShowToast(false), 2200);
            }, 3500);
            return () => {
                clearTimeout(timer);
                clearInterval(interval);
            };
        } else {
            setShowToast(false);
        }
    }, [isPlaying]);

    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-stone-50/50">
            <button
                onClick={() => {
                    setShowToast(false);
                    setTimeout(() => setShowToast(true), 100);
                }}
                className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-stone-700 shadow-sm transition-colors hover:bg-stone-50"
            >
                Save Profile
            </button>

            <div className="absolute bottom-4 right-4 z-50">
                <AnimatePresence>
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-3 pr-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
                        >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500 shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-stone-900">Successfully saved</span>
                                <span className="text-[10px] text-stone-500">Your profile has been updated.</span>
                            </div>
                            <button
                                onClick={() => setShowToast(false)}
                                className="ml-2 mt-0.5 text-stone-400 hover:text-stone-600 transition-colors"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
