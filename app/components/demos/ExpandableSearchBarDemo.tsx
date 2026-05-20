"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export function ExpandableSearchBarDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isPlaying) {
            setIsExpanded(false);
            setSearchValue("");
            return;
        }

        const loop = setInterval(() => {
            setIsExpanded(true);
            setTimeout(() => {
                setSearchValue("Motion Guide");
            }, 600);
            setTimeout(() => {
                setSearchValue("");
                setIsExpanded(false);
            }, 2500);
        }, 4000);

        return () => clearInterval(loop);
    }, [isPlaying]);

    useEffect(() => {
        if (isExpanded && inputRef.current) {
            inputRef.current.focus({ preventScroll: true });
        }
    }, [isExpanded]);

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-900 p-4 shadow-sm ring-1 ring-stone-900">
            <motion.div
                layout
                initial={false}
                animate={{
                    width: isExpanded ? 240 : 48,
                    backgroundColor: isExpanded ? "#fff" : "#292524", // white : stone-800
                }}
                transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 25
                }}
                className="h-12 rounded-full overflow-hidden flex shadow-lg border border-stone-700/50"
            >
                {/* Search Icon / Toggle Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="h-12 w-12 shrink-0 flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
                >
                    <svg
                        className={`w-5 h-5 transition-colors duration-300 ${isExpanded ? 'text-stone-500' : 'text-stone-300'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

                {/* Input Field (conditionally rendered or styled) */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.input
                            ref={inputRef}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Find animations..."
                            className="bg-transparent h-full w-full outline-none text-stone-900 placeholder:text-stone-400 text-sm font-medium pr-4"
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
