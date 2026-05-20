import { antiPatterns, comparisons, recipes, situations } from '@/data/guides';
import { entries } from '@/data/entries';
import { GuidesInteractive } from '@/components/GuidesInteractive';
import { GuideSectionNav } from '@/components/GuideSectionNav';

export default function GuidesPage() {
  const entryNames = Object.fromEntries(entries.map((entry) => [entry.slug, entry.nameEn]));
  const situationRows = situations.map((situation) => ({
    title: situation.name,
    body: `${situation.reason} Avoid: ${situation.avoid}`,
    entries: [situation.primary, ...situation.alternatives],
  }));
  const comparisonRows = comparisons.map((comparison) => ({
    title: comparison.title,
    body: comparison.guidance,
    entries: comparison.entries,
  }));
  const recipeRows = recipes.map((recipe) => ({
    title: recipe.title,
    body: recipe.summary,
    entries: recipe.entries,
  }));
  const antiPatternRows = antiPatterns.map((pattern) => ({
    title: pattern.title,
    body: pattern.problem,
    entries: pattern.better,
    label: 'Avoid',
  }));

  return (
    <div className="site-shell py-14">
      <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)]">
          <p className="font-mono text-[11px] uppercase tracking-widest text-stone-400">Motion Guides</p>
          <h1 className="mt-4 font-display text-5xl font-light leading-none tracking-normal text-stone-950">
            Decide. Express. Audit.
          </h1>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-stone-500">
            Choose by situation, compare close effects, build practical or creative motion chains, and avoid overdesigned motion.
          </p>
          <GuideSectionNav />
        </aside>

        <div>
          <GuidesInteractive
            situations={situationRows}
            comparisons={comparisonRows}
            recipes={recipeRows}
            antiPatterns={antiPatternRows}
            entryNames={entryNames}
          />
        </div>
      </div>
    </div>
  );
}
