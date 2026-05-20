'use client';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';

export function DemoStage({
  children,
  title,
  hasReplayButton = false
}: {
  children: React.ReactNode;
  title: string;
  hasReplayButton?: boolean;
}) {
  const [key, setKey] = useState(0);

  const handleReplay = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-medium text-stone-900">Live Demo</h3>
        {hasReplayButton && (
          <button
            onClick={handleReplay}
            className="flex items-center gap-2 rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-600 transition-all hover:bg-stone-200 hover:text-stone-900"
            aria-label="Replay animation"
          >
            <RotateCcw className="h-4 w-4" />
            Replay
          </button>
        )}
      </div>
      <div
        key={key}
        className="flex min-h-[400px] items-center justify-center rounded-2xl border border-stone-200 bg-stone-100 p-12 overflow-hidden relative"
      >
        {children}
      </div>
    </div>
  );
}
