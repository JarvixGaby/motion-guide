'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export function LikeHeartAnimationDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsLiked(false);
            return;
        }
        const interval = setInterval(() => {
            setIsLiked((prev) => !prev);
        }, 1500);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-50 transition-colors hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
                aria-label={isLiked ? "Unlike" : "Like"}
            >
                <motion.div
                    animate={
                        isLiked
                            ? { scale: [1, 1.3, 0.9, 1.1, 1] }
                            : { scale: 1 }
                    }
                    transition={{ duration: 0.4 }}
                >
                    <Heart
                        className={`h-8 w-8 transition-colors duration-200 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-stone-300'
                            }`}
                    />
                </motion.div>
            </button>
        </div>
    );
}
