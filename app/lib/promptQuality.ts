import { AnimationEntry } from '@/types/entry';

export function isWeakCodeExample(code: string) {
  return /export function \w+\(\) \{\}/.test(code) || code.trim().length < 180;
}

export function isWeakTuningPrompt(prompt: string) {
  return prompt.trim().split(/\s+/).length < 18;
}

export function getEffectiveTuningPrompt(entry: AnimationEntry) {
  if (!isWeakTuningPrompt(entry.promptCSS)) {
    return entry.promptCSS;
  }

  const risks = entry.motionRisk?.map((risk) => risk.replaceAll('_', ' ')).join(', ') || 'none';
  const avoid = entry.avoidWhen || entry.whenNotToUse[0] || 'Use a simpler static state when motion does not clarify the interaction.';
  const timing = entry.durationGuidance || 'Keep the motion short enough to support the task without making the interface feel slower.';
  const easing = entry.easingGuidance || 'Use ease-out for entrance/feedback motion and avoid dramatic bounce unless the interaction is playful.';

  return `Tune the ${entry.nameEn} motion for production UI. Keep the core purpose: ${entry.decisionNote || entry.description}

Timing: ${timing}
Easing: ${easing}
Avoid: ${avoid}
Risk checks: ${risks}

Implementation requirements:
- Respect prefers-reduced-motion with a static or instant fallback.
- Prevent layout shift while the motion runs.
- Keep focus, keyboard interaction, and screen-reader state unchanged.
- Test fast repeat interactions, interrupted transitions, and loading/error edge cases.
- Prefer transform and opacity over layout-heavy animation unless the pattern requires height or path changes.`;
}
