'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function StaggerListRevealDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsOpen(false);
            return;
        }
        const interval = setInterval(() => {
            setIsOpen((prev) => !prev);
        }, 2000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full justify-center overflow-hidden rounded-2xl bg-white pt-10 shadow-sm ring-1 ring-stone-200">
            <div className="relative w-48">

                {/* Mock Dropdown Trigger */}
                <div className="flex w-full items-center justify-between rounded-lg border border-stone-200 bg-stone-50 px-4 py-2 shadow-sm">
                    <div className="h-4 w-16 rounded bg-stone-300" />
                    <div className="h-2 w-2 rounded-full bg-stone-400" />
                </div>

                {/* List Items Cascading In */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                                visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
                            }}
                            className="absolute left-0 top-12 mt-2 flex w-full flex-col gap-1 rounded-xl border border-stone-200 bg-white p-2 shadow-lg"
                        >
                            {[1, 2, 3, 4].map((item) => (
                                <motion.li
                                    key={item}
                                    variants={{
                                        hidden: { opacity: 0, y: -10 },
                                        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
                                    }}
                                    className="flex items-center gap-2 rounded-md p-2 hover:bg-stone-50"
                                >
                                    <div className="h-4 w-4 rounded-sm bg-stone-200" />
                                    <div className={`h-3 rounded bg-stone-800 ${item % 2 === 0 ? 'w-16' : 'w-20'}`} />
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
