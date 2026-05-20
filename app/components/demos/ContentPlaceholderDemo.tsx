"use client";

export function ContentPlaceholderDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    // Static gray boxes without animation (unlike Skeleton which animates)
    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div className="w-full max-w-[280px] flex flex-col gap-4 p-5 rounded-2xl border border-stone-100 shadow-sm bg-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-100 shrink-0" />
                    <div className="flex flex-col gap-2 w-full">
                        <div className="w-3/4 h-3 rounded-full bg-stone-100" />
                        <div className="w-1/2 h-2.5 rounded-full bg-stone-50" />
                    </div>
                </div>
                <div className="w-full h-24 rounded-xl bg-stone-50 flex items-center justify-center">
                    <span className="text-stone-300 text-[10px] uppercase tracking-widest font-bold">Image Placeholder</span>
                </div>
            </div>
        </div>
    );
}
