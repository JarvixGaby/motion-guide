"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function DrawerSidebarSlideDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsOpen(false);
            return;
        }
        const interval = setInterval(() => {
            setIsOpen(true);
            setTimeout(() => setIsOpen(false), 2000);
        }, 3000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="relative flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">

            {/* Mock App Header */}
            <div className="absolute top-0 left-0 right-0 h-14 bg-white border-b border-stone-200 flex items-center px-4 justify-between z-0">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 hover:bg-stone-100 rounded-lg transition-colors text-stone-600 focus:outline-none focus:ring-2 focus:ring-stone-400"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div className="w-24 h-4 bg-stone-200 rounded-full" />
                <div className="w-8 h-8 rounded-full bg-stone-200" />
            </div>

            <div className="flex flex-col items-center text-center space-y-4 max-w-xs mt-10">
                <div className="text-stone-500 font-medium">Dashboard</div>
                <p className="text-sm text-stone-400">Click the menu icon in the top left or the button below to open the sidebar drawer.</p>
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 bg-stone-800 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-stone-700 transition"
                >
                    Open Drawer
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm z-10"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                            className="absolute top-0 left-0 bottom-0 w-64 bg-white shadow-2xl z-20 flex flex-col"
                        >
                            <div className="p-4 flex items-center justify-between border-b border-stone-100">
                                <span className="font-semibold text-stone-900">Navigation</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 hover:bg-stone-100 rounded-md transition-colors text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-4 space-y-1 flex-grow">
                                {['Home', 'Profile', 'Settings', 'Analytics', 'Help'].map((item, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                        key={item}
                                        className="px-3 py-2.5 hover:bg-stone-50 rounded-lg cursor-pointer text-stone-700 text-sm font-medium transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-stone-100 text-xs text-stone-400">
                                v1.0.0
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
