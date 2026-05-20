"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const items = [
    { id: '1', title: 'Mountain Retreat', subtitle: 'Escape to nature', color: 'bg-stone-200', text: 'Peaceful cabin surrounded by pine trees.' },
    { id: '2', title: 'Sunny Beach', subtitle: 'Relax by the ocean', color: 'bg-stone-300', text: 'White sand and crystal clear water.' },
    { id: '3', title: 'City Lights', subtitle: 'Urban exploration', color: 'bg-stone-400', text: 'Vibrant nightlife and modern architecture.' },
];

export function SharedElementTransitionDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        if (!isPlaying) {
            setSelectedId(null);
            return;
        }

        let index = 0;
        const interval = setInterval(() => {
            setSelectedId((currentSelectedId) => {
                if (currentSelectedId) {
                    return null;
                }

                const nextId = items[index].id;
                index = (index + 1) % items.length;
                return nextId;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <div className="w-full max-w-sm grid gap-4 relative z-0">
                {items.map(item => (
                    <motion.div
                        key={item.id}
                        layoutId={`card-${item.id}`}
                        onClick={() => setSelectedId(item.id)}
                        className={`p-4 rounded-xl cursor-pointer ${item.color} shadow-sm hover:shadow-md transition-shadow`}
                    >
                        <motion.h3 layoutId={`title-${item.id}`} className="font-medium text-stone-900">
                            {item.title}
                        </motion.h3>
                        <motion.p layoutId={`subtitle-${item.id}`} className="text-sm text-stone-600 mt-1">
                            {item.subtitle}
                        </motion.p>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 bg-white/40 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setSelectedId(null)}
                    >
                        {items.filter(item => item.id === selectedId).map(item => (
                            <motion.div
                                key="modal"
                                layoutId={`card-${item.id}`}
                                className={`w-full max-w-sm rounded-2xl overflow-hidden ${item.color} shadow-xl relative cursor-default`}
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="relative flex min-h-[200px] flex-col justify-end p-6">
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white/80 rounded-full transition-colors text-stone-700 backdrop-blur-md"
                                    >
                                        <X className="w-4 h-4" />
                                    </motion.button>
                                    <motion.h3 layoutId={`title-${item.id}`} className="text-2xl font-bold text-stone-900">
                                        {item.title}
                                    </motion.h3>
                                    <motion.p layoutId={`subtitle-${item.id}`} className="text-stone-700 font-medium mt-1">
                                        {item.subtitle}
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ delay: 0.1 }}
                                        className="mt-4 pt-4 border-t border-black/10 text-stone-800 leading-relaxed text-sm"
                                    >
                                        {item.text}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
