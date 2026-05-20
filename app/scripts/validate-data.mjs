import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const entriesSource = readFileSync(join(root, 'data/entries.ts'), 'utf8');
const demosSource = readFileSync(join(root, 'components/demos/index.ts'), 'utf8');
const taxonomiesSource = readFileSync(join(root, 'data/taxonomies.ts'), 'utf8');

function fail(message) {
  failures.push(message);
}

function uniqueMatches(source, regex) {
  return [...source.matchAll(regex)].map((match) => match[1]);
}

function parseConstArray(name) {
  const match = taxonomiesSource.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const;`));
  if (!match) return [];
  return uniqueMatches(match[1], /'([^']+)'/g);
}

function parseArrayLiteral(block, field) {
  const match = block.match(new RegExp(`${field}: \\[([\\s\\S]*?)\\]`));
  if (!match) return [];
  return uniqueMatches(match[1], /'([^']+)'/g);
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

const failures = [];
const entryBlocks = entriesSource
  .split(/\n  \{\n/)
  .slice(1)
  .map((block) => `  {\n${block.split(/\n  \},?/)[0]}\n  }`);

const entries = entryBlocks.map((block) => {
  const id = block.match(/id: (\d+),/)?.[1];
  const slug = block.match(/slug: '([^']+)'/)?.[1];
  const category = block.match(/category: '([^']+)'/)?.[1];
  return {
    id,
    slug,
    category,
    pageTypes: parseArrayLiteral(block, 'pageTypes'),
    useCases: parseArrayLiteral(block, 'useCases'),
    relatedSlugs: parseArrayLiteral(block, 'relatedSlugs'),
    alternatives: parseArrayLiteral(block, 'alternatives'),
  };
});

const ids = entries.map((entry) => entry.id).filter(Boolean);
const slugs = entries.map((entry) => entry.slug).filter(Boolean);
const slugSet = new Set(slugs);
const demoKeys = uniqueMatches(demosSource, /'([^']+)': [A-Za-z0-9_]+Demo/g);
const demoSet = new Set(demoKeys);
const categories = new Set(parseConstArray('CATEGORIES'));
const pageTypes = new Set(parseConstArray('PAGE_TYPES'));
const useCases = new Set(parseConstArray('USE_CASES'));

for (const duplicate of findDuplicates(ids)) fail(`Duplicate entry id: ${duplicate}`);
for (const duplicate of findDuplicates(slugs)) fail(`Duplicate entry slug: ${duplicate}`);
for (const duplicate of findDuplicates(demoKeys)) fail(`Duplicate demo registry key: ${duplicate}`);

for (const entry of entries) {
  if (!entry.id) fail(`Missing id for entry near slug ${entry.slug ?? '(unknown)'}`);
  if (!entry.slug) fail(`Missing slug for entry id ${entry.id ?? '(unknown)'}`);
  if (entry.category && !categories.has(entry.category)) fail(`${entry.slug}: invalid category "${entry.category}"`);
  for (const pageType of entry.pageTypes) {
    if (!pageTypes.has(pageType)) fail(`${entry.slug}: invalid pageType "${pageType}"`);
  }
  for (const useCase of entry.useCases) {
    if (!useCases.has(useCase)) fail(`${entry.slug}: invalid useCase "${useCase}"`);
  }
  for (const related of [...entry.relatedSlugs, ...entry.alternatives]) {
    if (!slugSet.has(related)) fail(`${entry.slug}: references missing entry "${related}"`);
  }
  if (entry.slug && !demoSet.has(entry.slug)) fail(`${entry.slug}: missing demoRegistry entry`);
}

for (const demoKey of demoKeys) {
  if (!slugSet.has(demoKey)) fail(`demoRegistry key has no entry: ${demoKey}`);
}

if (failures.length > 0) {
  console.error(`Data validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Data validation passed for ${entries.length} entries and ${demoKeys.length} demos.`);
