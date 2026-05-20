"use client";
export function TypingDotsDemo({ isPlaying = true }: { isPlaying?: boolean }) {
  return (
    <div className="flex h-14 w-28 items-center justify-center gap-1.5 rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
      <div
        className="h-2 w-2 animate-typing-dots rounded-full bg-stone-300"
        style={{ animationDelay: '0s', animationPlayState: isPlaying ? 'running' : 'paused' }}
      />
      <div
        className="h-2 w-2 animate-typing-dots rounded-full bg-stone-400"
        style={{ animationDelay: '0.2s', animationPlayState: isPlaying ? 'running' : 'paused' }}
      />
      <div
        className="h-2 w-2 animate-typing-dots rounded-full bg-stone-800"
        style={{ animationDelay: '0.4s', animationPlayState: isPlaying ? 'running' : 'paused' }}
      />
    </div>
  );
}
