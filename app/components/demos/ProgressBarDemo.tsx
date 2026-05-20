'use client';
import { useEffect, useState } from 'react';

export function ProgressBarDemo({ isPlaying = true }: { isPlaying?: boolean }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="w-80 space-y-3 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
      <div className="h-2 w-full overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full bg-stone-900 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-right text-xs font-semibold text-stone-500 tabular-nums">{progress}%</div>
    </div>
  );
}
