"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

export function NoSearchResultsDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [query, setQuery] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setHasSearched(false);
            setQuery('');
            return;
        }

        const sequence = async () => {
            setHasSearched(false);
            setQuery('');
            await new Promise(r => setTimeout(r, 500));
            setQuery('obscure data');
            setHasSearched(true);
        };
        sequence();
        const interval = setInterval(sequence, 4000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setHasSearched(true);
        }
    };

    return (
        <div className="relative flex h-64 w-full flex-col items-center justify-start overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">

            <form onSubmit={handleSearch} className="w-full max-w-sm relative z-20 mb-6">
                <div className="relative flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-stone-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setHasSearched(false);
                        }}
                        placeholder="Search for something obscure..."
                        className="w-full h-14 pl-12 pr-4 bg-white border border-stone-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all font-medium text-stone-900 placeholder:font-normal"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 px-4 py-2 bg-stone-900 text-white rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
                    >
                        Search
                    </button>
                </div>
            </form>

            <AnimatePresence mode="wait">
                {hasSearched ? (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col items-center text-center max-w-sm mt-4 transform scale-90"
                    >
                        <div className="relative w-16 h-16 flex items-center justify-center mb-4">
                            <motion.div
                                animate={{
                                    x: [-12, 12, -12],
                                    rotateZ: [-15, 15, -15]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2.5,
                                    ease: "easeInOut"
                                }}
                                className="text-stone-300 drop-shadow-sm"
                            >
                                <Search className="w-12 h-12 stroke-[1.5]" />
                            </motion.div>

                            {/* Contextual question marks floating up */}
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.5, y: 10, x: i === 1 ? 0 : i === 0 ? -20 : 20 }}
                                    animate={{ opacity: [0, 1, 0], scale: 1, y: -40 }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                        delay: i * 0.6,
                                        ease: "easeOut"
                                    }}
                                    className="absolute top-0 text-stone-400 font-bold text-xl mix-blend-multiply"
                                >
                                    ?
                                </motion.div>
                            ))}
                        </div>

                        <h3 className="text-lg font-semibold text-stone-900 mb-1">No results for "{query}"</h3>
                        <p className="text-stone-500 mb-4 leading-relaxed text-xs">
                            We couldn't find anything matching your search. Try checking for typos or using broader terms.
                        </p>

                        <button
                            onClick={() => { setQuery(''); setHasSearched(false); }}
                            className="px-6 py-2.5 bg-stone-200 text-stone-700 rounded-xl font-medium hover:bg-stone-300 transition-colors text-sm"
                        >
                            Clear Search
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center text-center max-w-sm mt-8 opacity-40"
                    >
                        <Search className="w-16 h-16 stroke-[1.5] text-stone-400 mb-4" />
                        <p className="text-stone-500 font-medium">Type something to search</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
