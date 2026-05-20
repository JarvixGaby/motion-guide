"use client";
export function PulsePlaceholderDemo({ isPlaying = true }: { isPlaying?: boolean }) {
  return (
    <div className="w-80 space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      {/* Avatar placeholder */}
      <div
        className="h-16 w-16 animate-pulse-slow rounded-full bg-stone-100"
        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
      />

      {/* Text placeholders */}
      <div className="space-y-3">
        <div
          className="h-4 w-2/3 animate-pulse-slow rounded-md bg-stone-100"
          style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
        />
        <div
          className="h-4 w-full animate-pulse-slow rounded-md bg-stone-100"
          style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
        />
        <div
          className="h-4 w-3/4 animate-pulse-slow rounded-md bg-stone-100"
          style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
        />
      </div>
    </div>
  );
}
