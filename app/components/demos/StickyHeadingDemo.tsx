"use client";
import { useRef, useEffect } from 'react';

export function StickyHeadingDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isPlaying || !containerRef.current) return;
        let pos = 0;
        let direction = 1;

        const interval = setInterval(() => {
            if (!containerRef.current) return;
            pos += 1.5 * direction;
            if (pos > 500) direction = -1;
            if (pos <= 0) direction = 1;
            containerRef.current.scrollTop = pos;
        }, 16);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const data = [
        { letter: 'A', items: ['Apple', 'Apricot', 'Avocado'] },
        { letter: 'B', items: ['Banana', 'Blackberry', 'Blueberry'] },
        { letter: 'C', items: ['Cherry', 'Coconut', 'Cranberry'] },
    ];

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div
                ref={containerRef}
                className="w-full max-w-[280px] h-56 overflow-y-scroll rounded-xl border border-stone-200 bg-stone-50 hide-scrollbar shadow-inner relative"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {data.map((group) => (
                    <div key={group.letter} className="relative pb-4">
                        <div className="sticky top-0 bg-stone-100/90 backdrop-blur px-4 py-1.5 border-y border-stone-200 z-10 font-bold text-stone-700 text-sm">
                            {group.letter}
                        </div>
                        <div className="px-4 py-2 flex flex-col gap-2 mt-2">
                            {group.items.map(item => (
                                <div key={item} className="p-3 bg-white rounded-lg shadow-sm text-sm text-stone-600 border border-stone-100 flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-400">
                                        {item[0]}
                                    </div>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
