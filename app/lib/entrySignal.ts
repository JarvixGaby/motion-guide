import { AnimationEntry } from '@/types/entry';

export function getEntrySignal(entry: AnimationEntry) {
  const risks = entry.motionRisk ?? [];

  if (
    risks.includes('overdesigned') ||
    risks.includes('distraction') ||
    risks.includes('feels_slow')
  ) {
    return 'Use sparingly';
  }

  if (
    entry.difficulty === 'custom_build' ||
    entry.mediaTier === 3 ||
    risks.includes('accessibility_sensitive') ||
    risks.includes('performance_sensitive')
  ) {
    return 'Advanced';
  }

  if (entry.difficulty === 'paste_go' && entry.mediaTier <= 2) {
    return 'Recommended default';
  }

  return 'Context dependent';
}
