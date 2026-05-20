import { PageType, UseCase } from '@/data/taxonomies';

export type Difficulty = 'paste_go' | 'needs_tweaking' | 'custom_build';
export type MediaTier = 1 | 2 | 3;
export type MotionRisk =
  | 'distraction'
  | 'feels_slow'
  | 'overdesigned'
  | 'accessibility_sensitive'
  | 'performance_sensitive'
  | 'misleading_progress';

export interface AnimationEntry {
  id: number;
  slug: string;
  nameEn: string;
  aliasesEn: string[];
  category: string;
  difficulty: Difficulty;
  mediaTier: MediaTier;
  description: string;
  whenToUse: string[];
  whenNotToUse: string[];
  configTips?: string[];
  seenIn: string[];
  pageTypes: PageType[];     // Which page types this animation suits
  useCases: UseCase[];       // What scenarios this animation is used for
  bestFor?: string;
  avoidWhen?: string;
  durationGuidance?: string;
  easingGuidance?: string;
  motionRisk?: MotionRisk[];
  alternatives?: string[];
  decisionNote?: string;
  promptV0: string;
  promptCursor: string;
  promptCSS: string;
  codeTailwind: string;
  relatedSlugs: string[];
}
