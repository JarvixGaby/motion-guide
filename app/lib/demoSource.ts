import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { isWeakCodeExample } from '@/lib/promptQuality';

let demoSourceCache: Record<string, string | null> | null = null;

function loadDemoSourceMap() {
  const demosDir = join(process.cwd(), 'components', 'demos');
  const indexSource = readFileSync(join(demosDir, 'index.ts'), 'utf8');
  const importMap = new Map<string, string>();

  for (const match of Array.from(indexSource.matchAll(/import \{ (\w+) \} from '\.\/([^']+)'/g))) {
    importMap.set(match[1], `${match[2]}.tsx`);
  }

  const sourceBySlug: Record<string, string | null> = {};
  for (const match of Array.from(indexSource.matchAll(/'([^']+)': (\w+)/g))) {
    const [, slug, componentName] = match;
    const fileName = importMap.get(componentName);
    if (!fileName) {
      sourceBySlug[slug] = null;
      continue;
    }

    sourceBySlug[slug] = readFileSync(join(demosDir, fileName), 'utf8').trim();
  }

  return sourceBySlug;
}

export function getEffectiveCodeExample(slug: string, code: string) {
  if (!isWeakCodeExample(code)) {
    return {
      code,
      source: 'entry' as const,
    };
  }

  demoSourceCache ??= loadDemoSourceMap();
  const demoSource = demoSourceCache[slug];

  return {
    code: demoSource || code,
    source: demoSource ? ('demo' as const) : ('entry' as const),
  };
}
