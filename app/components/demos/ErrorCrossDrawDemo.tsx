"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ErrorCrossDrawDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isError, setIsError] = useState(false);

    return (
        <div className="flex h-[400px] w-full items-center justify-center p-8 bg-stone-50 rounded-xl relative">
            <div className="flex flex-col items-center">
                <button
                    onClick={() => setIsError(true)}
                    className="mb-12 px-6 py-2.5 bg-white border border-stone-200 shadow-sm rounded-xl text-stone-700 font-medium hover:bg-stone-50 hover:text-stone-900 transition-colors focus:outline-none focus:ring-4 focus:ring-stone-200"
                >
                    Trigger Error
                </button>

                <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center relative overflow-hidden border-[4px] border-white">
                    <AnimatePresence>
                        {isError && (
                            <motion.div
                                className="absolute inset-0 bg-red-500"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        )}
                    </AnimatePresence>

                    <AnimatePresence onExitComplete={() => setIsError(false)}>
                        {isError && (
                            <svg className="w-16 h-16 z-10 text-white" viewBox="0 0 50 50">
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                                    stroke="currentColor"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    fill="transparent"
                                    d="M16 16 L34 34"
                                />
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                                    stroke="currentColor"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    fill="transparent"
                                    d="M34 16 L16 34"
                                />
                            </svg>
                        )}
                    </AnimatePresence>

                    {!isError && (
                        <div className="text-stone-300 w-16 h-16 rounded-full border-[3px] border-dashed border-stone-200" />
                    )}
                </div>

                <AnimatePresence>
                    {isError && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6 flex flex-col items-center gap-4"
                        >
                            <h3 className="text-xl font-bold text-stone-900">Payment Failed</h3>
                            <button
                                onClick={() => setIsError(false)}
                                className="text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors px-4 py-2 rounded-lg hover:bg-stone-200/50"
                            >
                                Reset
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
