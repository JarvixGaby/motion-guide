"use client";
export function SpinnerDemo({ isPlaying = true }: { isPlaying?: boolean }) {
  return (
    <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-stone-100 border-t-stone-900"
        style={{
          animationPlayState: isPlaying ? 'running' : 'paused'
        }}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
