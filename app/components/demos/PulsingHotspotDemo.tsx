'use client';
import { Bell } from 'lucide-react';

export function PulsingHotspotDemo() {
    return (
        <div className="flex w-full items-center justify-center p-12">
            <div className="flex gap-12 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-200">

                {/* Left item: Normal icon */}
                <div className="flex flex-col items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-sm font-medium text-stone-400 shadow-sm ring-1 ring-stone-200/50 transition-colors hover:bg-stone-200">
                        IN
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400">Normal</span>
                </div>

                {/* Middle item: Static badge */}
                <div className="flex flex-col items-center gap-3">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-sm font-medium text-stone-400 shadow-sm ring-1 ring-stone-200/50 transition-colors hover:bg-stone-200">
                        MSG
                        <div className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-white">
                            3
                        </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400">Static</span>
                </div>

                {/* Right item: Pulsing hotspot */}
                <div className="flex flex-col items-center gap-3">
                    <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-500 shadow-sm ring-1 ring-stone-200/50 transition-colors hover:bg-stone-200">
                        <Bell className="h-5 w-5" />

                        {/* The Hotspot */}
                        <div className="absolute right-2.5 top-2.5">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm ring-2 ring-white"></span>
                            </span>
                        </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400">Pulsing</span>
                </div>

            </div>
        </div>
    );
}
