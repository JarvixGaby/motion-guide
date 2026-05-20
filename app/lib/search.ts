import Fuse from 'fuse.js';
import { AnimationEntry } from '@/types/entry';

const fuseOptions = {
  keys: [
    { name: 'nameEn', weight: 2 },
    { name: 'aliasesEn', weight: 1.5 },
    { name: 'description', weight: 1 },
    { name: 'category', weight: 0.8 },
    { name: 'seenIn', weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};

export function initializeSearch(entries: AnimationEntry[]) {
  return new Fuse(entries, fuseOptions);
}

export function searchEntries(query: string, entries: AnimationEntry[]): AnimationEntry[] {
  if (!query.trim()) return [];

  const results = initializeSearch(entries).search(query);
  return results.slice(0, 8).map(result => result.item);
}
