"use client";
export function ShimmerLoaderDemo({ isPlaying = true }: { isPlaying?: boolean }) {
  return (
    <div className="w-80 relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-3/4 rounded-md bg-stone-100" />
        <div className="h-4 w-full rounded-md bg-stone-100" />
        <div className="h-4 w-5/6 rounded-md bg-stone-100" />
        <div className="h-4 w-2/3 rounded-md bg-stone-100" />
      </div>

      {/* Shimmer animation */}
      <div
        className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-stone-200/40 to-transparent"
        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
      />
    </div>
  );
}
