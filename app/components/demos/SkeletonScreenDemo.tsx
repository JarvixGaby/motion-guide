"use client";
export function SkeletonScreenDemo({ isPlaying = true }: { isPlaying?: boolean }) {
  return (
    <div className="w-80 relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      {/* Avatar */}
      <div className="h-16 w-16 rounded-full bg-stone-100" />

      {/* Name */}
      <div className="mt-4 h-6 w-32 rounded-lg bg-stone-100" />

      {/* Bio lines */}
      <div className="mt-4 space-y-2.5">
        <div className="h-4 w-full rounded-md bg-stone-100" />
        <div className="h-4 w-4/5 rounded-md bg-stone-100" />
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <div className="h-10 w-24 rounded-xl bg-stone-100" />
        <div className="h-10 w-24 rounded-xl bg-stone-100" />
      </div>

      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-stone-200/40 to-transparent"
        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
      />
    </div>
  );
}
