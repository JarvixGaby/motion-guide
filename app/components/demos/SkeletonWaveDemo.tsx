"use client";
import { motion } from 'framer-motion';

export function SkeletonWaveDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div className="w-full max-w-sm flex flex-col gap-4 p-5 rounded-2xl border border-stone-100 shadow-sm bg-white overflow-hidden relative">
                {/* Content Blocks */}
                <div className="flex flex-col gap-3">
                    <div className="w-full h-32 rounded-xl bg-stone-100 mb-2 relative overflow-hidden">
                        {isPlaying && (
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 w-[150%]"
                                initial={{ x: "-100%" }}
                                animate={{ x: "200%" }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                            />
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-stone-100 shrink-0 relative overflow-hidden">
                            {isPlaying && (
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 w-[200%]"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "200%" }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="w-3/4 h-3 rounded-full bg-stone-100 relative overflow-hidden">
                                {isPlaying && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 w-[200%]"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "200%" }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                    />
                                )}
                            </div>
                            <div className="w-1/2 h-2.5 rounded-full bg-stone-50 relative overflow-hidden">
                                {isPlaying && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 w-[200%]"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "200%" }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
