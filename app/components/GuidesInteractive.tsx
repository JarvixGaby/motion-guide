'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, GitCompare, Info, ListChecks, Workflow } from 'lucide-react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { MiniDemoPreview } from '@/components/MiniDemoPreview';

type GuideGroup = {
  title: string;
  body: string;
  entries: string[];
  tone?: 'light' | 'dark';
  label?: string;
};

type GuidesInteractiveProps = {
  situations: GuideGroup[];
  comparisons: GuideGroup[];
  recipes: GuideGroup[];
  antiPatterns: GuideGroup[];
  entryNames: Record<string, string>;
};

function entryHref(slug: string, section: string) {
  return `/entry/${slug}?from=${encodeURIComponent(`/guides#${section}`)}`;
}

function SectionHeader({
  icon: Icon,
  title,
  tooltip,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tooltip: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <Icon className="h-5 w-5 text-amber-500" />
      <h2 className="font-display text-3xl font-light text-stone-900">{title}</h2>
      <div className="group relative">
        <button
          type="button"
          aria-label={`${title} explanation`}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-white/75 text-stone-400 transition-colors hover:border-stone-300 hover:text-stone-900 focus-visible:text-stone-900"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
        <div className="pointer-events-none absolute left-1/2 top-9 z-20 w-[min(18rem,calc(100vw-3rem))] -translate-x-1/2 rounded-[8px] border border-stone-200 bg-white px-4 py-3 text-sm leading-relaxed text-stone-600 opacity-0 shadow-lg shadow-stone-900/10 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
          {tooltip}
        </div>
      </div>
    </div>
  );
}

function EntrySelector({
  slugs,
  section,
  activeSlug,
  onSelect,
  entryNames,
  dark = false,
  chain = false,
  groupId,
}: {
  slugs: string[];
  section: string;
  activeSlug: string;
  onSelect: (slug: string) => void;
  entryNames: Record<string, string>;
  dark?: boolean;
  chain?: boolean;
  groupId: string;
}) {
  return (
    <LayoutGroup id={groupId}>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {slugs.map((slug, index) => {
          const isActive = slug === activeSlug;
          return (
            <div key={slug} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSelect(slug)}
                className={[
                  'relative overflow-hidden rounded-full border px-3 py-1.5 text-xs transition-colors',
                  dark
                    ? isActive
                      ? 'border-amber-300 text-stone-950'
                      : 'border-white/10 bg-white/5 text-white/65 hover:border-amber-300 hover:text-amber-200'
                    : isActive
                      ? 'border-stone-950 text-white'
                      : 'border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300 hover:text-stone-950',
                ].join(' ')}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-guide-chip"
                    className={dark ? 'absolute inset-0 bg-amber-300' : 'absolute inset-0 bg-stone-950'}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative z-10">{entryNames[slug] ?? slug}</span>
              </button>
              {chain && index < slugs.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-stone-300" />}
            </div>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

function GuideRows({
  section,
  items,
  entryNames,
  previewLabel = 'Preview',
  dark = false,
  chain = false,
}: {
  section: string;
  items: GuideGroup[];
  entryNames: Record<string, string>;
  previewLabel?: string;
  dark?: boolean;
  chain?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(items.map((item) => [item.title, item.entries[0]]))
  );

  return (
    <div className="grid gap-px overflow-hidden rounded-[8px] border border-stone-200 bg-stone-200">
      {items.map((item) => {
        const activeSlug = selected[item.title] ?? item.entries[0];
        const activeName = entryNames[activeSlug] ?? activeSlug;
        return (
          <article key={item.title} className="grid gap-px bg-stone-200 lg:grid-cols-[260px_minmax(0,1fr)_280px]">
            <div className={dark ? 'bg-stone-950 p-6 text-white' : 'bg-white/95 p-6'}>
              {item.label && (
                <p className={dark ? 'font-mono text-[10px] uppercase tracking-widest text-amber-300' : 'font-mono text-[10px] uppercase tracking-widest text-amber-600'}>
                  {item.label}
                </p>
              )}
              <h3 className={`font-display text-xl font-medium leading-tight ${item.label ? 'mt-4' : ''} ${dark ? 'text-white' : 'text-stone-950'}`}>
                {item.title}
              </h3>
              <EntrySelector
                slugs={item.entries}
                section={section}
                activeSlug={activeSlug}
                onSelect={(slug) => setSelected((current) => ({ ...current, [item.title]: slug }))}
                entryNames={entryNames}
                dark={dark}
                chain={chain}
                groupId={`${section}-${item.title}`}
              />
            </div>
            <div className={dark ? 'bg-stone-950 p-6 text-white' : 'bg-white/95 p-6'}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeSlug}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className={`max-w-3xl text-lg font-light leading-relaxed ${dark ? 'text-white/65' : 'text-stone-700'}`}>
                    {item.body}
                  </p>
                  <Link
                    href={entryHref(activeSlug, section)}
                    className={`mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors ${dark ? 'text-amber-200 hover:text-white' : 'text-stone-500 hover:text-stone-950'}`}
                  >
                    Open {activeName}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className={dark ? 'bg-stone-950 p-4' : 'bg-white/95 p-4'}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeSlug}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MiniDemoPreview slug={activeSlug} label={previewLabel} compact />
                </motion.div>
              </AnimatePresence>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function GuidesInteractive({
  situations,
  comparisons,
  recipes,
  antiPatterns,
  entryNames,
}: GuidesInteractiveProps) {
  const reduceMotion = useReducedMotion();
  const sectionMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-12% 0px -18% 0px' },
        transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <>
      <motion.section id="situations" className="mb-16 scroll-mt-28" {...sectionMotion}>
        <SectionHeader
          icon={Workflow}
          title="Situations"
          tooltip="Start here when you know the user moment. Pick the primary motion for that situation, then use alternatives only when the context changes."
        />
        <GuideRows section="situations" items={situations} entryNames={entryNames} />
      </motion.section>

      <motion.section id="comparisons" className="mb-16 scroll-mt-28" {...sectionMotion}>
        <SectionHeader
          icon={GitCompare}
          title="Comparisons"
          tooltip="Use this when two effects look close. The goal is choosing one pattern, not building a sequence."
        />
        <GuideRows section="comparisons" items={comparisons} entryNames={entryNames} previewLabel="Selected" />
      </motion.section>

      <motion.section id="recipes" className="mb-16 scroll-mt-28" {...sectionMotion}>
        <SectionHeader
          icon={ListChecks}
          title="Motion Recipes"
          tooltip="Use this for a workflow with several states. Follow the chain from first user action to final feedback."
        />
        <GuideRows section="recipes" items={recipes} entryNames={entryNames} previewLabel="Step" chain />
      </motion.section>

      <motion.section id="anti-patterns" className="scroll-mt-28" {...sectionMotion}>
        <SectionHeader
          icon={AlertTriangle}
          title="Anti-patterns"
          tooltip="Use this as a pre-flight check. If your current motion matches the problem, switch to one of the safer alternatives."
        />
        <GuideRows section="anti-patterns" items={antiPatterns} entryNames={entryNames} previewLabel="Better" />
      </motion.section>
    </>
  );
}
