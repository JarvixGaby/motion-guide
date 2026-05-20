'use client';

import { demoRegistry } from '@/components/demos';
import { DemoStage } from '@/components/DemoStage';

export function EntryDemoPanel({
  slug,
  title,
  hasReplayButton,
}: {
  slug: string;
  title: string;
  hasReplayButton: boolean;
}) {
  const DemoComponent = demoRegistry[slug];

  if (!DemoComponent) return null;

  return (
    <DemoStage title={title} hasReplayButton={hasReplayButton}>
      <DemoComponent isPlaying={true} />
    </DemoStage>
  );
}
