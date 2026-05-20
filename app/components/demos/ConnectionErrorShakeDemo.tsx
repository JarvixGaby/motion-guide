"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServerCrash } from 'lucide-react';

export function ConnectionErrorShakeDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isShaking, setIsShaking] = useState(false);
    const [attempts, setAttempts] = useState(0);

    const handleConnect = () => {
        setAttempts(a => a + 1);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500); // 0.5s match animation duration
    };

    useEffect(() => {
        if (!isPlaying) {
            setAttempts(0);
            setIsShaking(false);
            return;
        }
        const interval = setInterval(() => {
            handleConnect();
            setTimeout(() => setAttempts(0), 1000);
        }, 1500);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="relative flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">

            <motion.div
                animate={isShaking ? { x: [-10, 10, -8, 8, -5, 5, -2, 2, 0] } : {}}
                transition={{ duration: 0.5 }}
                className="relative flex w-full max-w-xs flex-col items-center overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-md scale-90"
            >
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 relative">
                    <ServerCrash className="w-8 h-8" />
                    <AnimatePresence>
                        {attempts > 0 && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                key={attempts}
                                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white"
                            >
                                {attempts}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <h3 className="text-xl font-bold text-stone-900 mb-2">Connection Failed</h3>
                <p className="text-stone-500 mb-8 text-sm leading-relaxed">
                    We couldn't reach the server. Please check your internet connection or try again later.
                </p>

                <div className="w-full space-y-3">
                    <button
                        onClick={handleConnect}
                        className="w-full py-3 bg-stone-900 text-white rounded-xl font-medium shadow-sm hover:bg-stone-800 transition-colors focus:ring-4 focus:ring-stone-200 outline-none"
                    >
                        Try Again
                    </button>
                    <button
                        onClick={() => setAttempts(0)}
                        className="w-full py-3 bg-white text-stone-600 border border-stone-200 rounded-xl font-medium hover:bg-stone-50 transition-colors"
                    >
                        Cancel
                    </button>
                </div>

                {/* Subtle red flash border on error */}
                <motion.div
                    animate={isShaking ? { opacity: [0, 1, 0] } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 border-2 border-red-500 rounded-2xl pointer-events-none"
                />
            </motion.div>

        </div>
    );
}
