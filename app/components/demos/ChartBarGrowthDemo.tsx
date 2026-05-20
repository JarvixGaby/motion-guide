"use client";
import { motion } from 'framer-motion';

export function ChartBarGrowthDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const data = [30, 70, 45, 90, 65, 85, 40];

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div className="flex items-end gap-3 h-32 w-full max-w-sm justify-between px-6 border-b border-stone-200 pb-2">
                {data.map((val, i) => (
                    <div key={i} className="relative w-8 bg-stone-50 rounded-t-lg h-full flex items-end justify-center overflow-hidden">
                        {isPlaying && (
                            <motion.div
                                className="w-full bg-indigo-500 rounded-t-lg absolute bottom-0"
                                initial={{ height: 0 }}
                                animate={{ height: `${val}%` }}
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15
                                }}
                            />
                        )}
                        {!isPlaying && <div className="w-full bg-indigo-500 rounded-t-lg absolute bottom-0" style={{ height: `${val}%` }} />}

                        {/* Fake label below axis */}
                        <div className="absolute -bottom-6 text-[10px] text-stone-400 font-medium">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
