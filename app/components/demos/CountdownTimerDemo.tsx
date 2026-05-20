"use client";
import { useState, useEffect } from 'react';

export function CountdownTimerDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [timeLeft, setTimeLeft] = useState(10); // 10 seconds

    useEffect(() => {
        if (!isPlaying) {
            setTimeLeft(10);
            return;
        }

        setTimeLeft(10);

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    // Reset after a delay to loop the demo
                    setTimeout(() => setTimeLeft(10), 2000);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div className="flex flex-col items-center justify-center bg-stone-900 rounded-2xl p-8 shadow-2xl min-w-[220px]">
                <p className="text-stone-400 text-[10px] mb-3 uppercase tracking-[0.2em] font-bold">Launching In</p>
                <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-mono tabular-nums text-white font-medium tracking-tight">00</span>
                        <span className="text-[9px] text-stone-500 uppercase font-semibold mt-1">Min</span>
                    </div>
                    <span className="text-stone-600 text-3xl pb-4">:</span>
                    <div className="flex flex-col items-center">
                        {/* Use AnimatePresence or just a strict layout to avoid jumping. Tabular-nums handles it usually. */}
                        <span className="text-4xl font-mono tabular-nums text-white font-medium tracking-tight">
                            {timeLeft.toString().padStart(2, '0')}
                        </span>
                        <span className="text-[9px] text-stone-500 uppercase font-semibold mt-1">Sec</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
