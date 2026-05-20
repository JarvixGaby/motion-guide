"use client";
import { motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';

export function EmptyStateIllustrationDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    return (
        <div className="relative flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <div className="flex flex-col items-center text-center max-w-sm relative z-10 w-full bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-stone-200">
                <motion.div
                    animate={isPlaying ? { y: [-8, 8] } : { y: 0 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 3,
                        ease: "easeInOut"
                    }}
                    className="mb-4 text-stone-300 drop-shadow-sm"
                >
                    <FolderOpen className="w-24 h-24 stroke-[1]" />
                </motion.div>

                <h3 className="text-lg font-semibold text-stone-900 mb-2">No projects found</h3>
                <p className="text-stone-500 mb-6 leading-relaxed text-xs">
                    Start by creating a new one to organize your work.
                </p>

                <button className="px-6 py-2.5 bg-stone-900 text-white rounded-xl font-medium shadow-sm hover:bg-stone-800 transition-colors w-full">
                    Create New Project
                </button>
            </div>

            {/* Decorative background blobs to give depth */}
            <motion.div
                animate={isPlaying ? { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] } : { scale: 1, opacity: 0.1 }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-48 h-48 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl z-0"
            />
            <motion.div
                animate={isPlaying ? { scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] } : { scale: 1, opacity: 0.1 }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-stone-300 rounded-full mix-blend-multiply filter blur-3xl z-0"
            />
        </div>
    );
}
