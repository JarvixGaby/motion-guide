import { Difficulty } from '@/types/entry';

const badgeConfig = {
  paste_go: {
    label: 'Ready to Use',
    dots: '●○○',
  },
  needs_tweaking: {
    label: 'Customize',
    dots: '●●○',
  },
  custom_build: {
    label: 'Requires Setup',
    dots: '●●●',
  },
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const config = badgeConfig[difficulty];
  
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">
      <span className="text-stone-300">{config.dots}</span>
      <span>{config.label}</span>
    </div>
  );
}
