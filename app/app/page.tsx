'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { EntryCard } from '@/components/EntryCard';
import { PageType, UseCase, Category } from '@/data/taxonomies';
import { entries } from '@/data/entries';
import { demoRegistry } from '@/components/demos';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HomePage() {
  const reduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedPageType, setSelectedPageType] = useState<PageType | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

  // Apply filters to entries
  const filteredEntries = entries.filter(entry => {
    const matchesCategory = !selectedCategory || entry.category === selectedCategory;
    const matchesPageType = !selectedPageType || entry.pageTypes.includes(selectedPageType);
    const matchesUseCase = !selectedUseCase || entry.useCases.includes(selectedUseCase);
    return matchesCategory && matchesPageType && matchesUseCase;
  });

  return (
    <div className="site-shell py-14 sm:py-20">
      {/* Hero Section */}
      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20"
      >
        <div className="mb-8 flex items-center gap-4">
          <span className="h-px w-16 bg-stone-900" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-stone-500">
            {entries.length} motion patterns
          </span>
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.65fr)] lg:items-end">
          <div>
            <h1 className="display-tight font-display text-[4.5rem] font-medium leading-[0.92] text-stone-950 sm:text-[6.5rem] lg:text-[8.5rem]">
              Motion
              <span className="block text-stone-400">Guide</span>
            </h1>
          </div>
          <div className="border-l border-stone-300 pl-6">
            <p className="max-w-md font-display text-2xl font-light leading-snug text-stone-700">
              Pick the right motion by product intent — from practical UI feedback to expressive 2D/3D/WebGL moments.
            </p>
            <div className="mt-8 grid grid-cols-4 gap-3 font-mono text-[10px] uppercase tracking-widest text-stone-500">
              <span className="border-t border-stone-300 pt-3">Loading</span>
              <span className="border-t border-stone-300 pt-3">Feedback</span>
              <span className="border-t border-stone-300 pt-3">Creative</span>
              <span className="border-t border-stone-300 pt-3">Audit</span>
            </div>
            <Link
              href="/skills"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-stone-300 bg-white/80 px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-stone-700 shadow-sm transition-colors hover:border-stone-900 hover:bg-stone-950 hover:text-white"
            >
              Install the skill
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        <div className="mt-14">
          <SearchBar
            entries={entries}
            selectedCategory={selectedCategory}
            selectedPageType={selectedPageType}
            selectedUseCase={selectedUseCase}
            onCategoryChange={setSelectedCategory}
            onPageTypeChange={setSelectedPageType}
            onUseCaseChange={setSelectedUseCase}
          />
        </div>
        <div className="mt-8 grid gap-px overflow-hidden rounded-[8px] border border-stone-200 bg-stone-200 sm:grid-cols-[1.15fr_1fr_1fr_1fr_1fr]">
          <div className="bg-stone-950 p-5 text-white">
            <p className="font-mono text-[10px] uppercase tracking-widest text-amber-300">Decision Guides</p>
            <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-white/70">
              Compare practical, creative, and audit choices before implementing motion.
            </p>
          </div>
          {[
            { href: '/guides#situations', label: 'By Situation', note: 'Start from the user moment' },
            { href: '/guides#comparisons', label: 'Compare Options', note: 'Pick between similar patterns' },
            { href: '/guides#recipes', label: 'Motion Recipes', note: 'Compose multi-state flows' },
            { href: '/guides#anti-patterns', label: 'Avoid Misuse', note: 'Check risky choices' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex min-h-28 flex-col justify-between bg-white/90 p-5 transition-colors hover:bg-white"
            >
              <span className="font-display text-lg font-medium text-stone-900">{item.label}</span>
              <span className="mt-4 flex items-center justify-between gap-4 text-sm text-stone-500">
                {item.note}
                <ArrowRight className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-stone-900" />
              </span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Entry Grid */}
      <div className="mb-8 flex items-end justify-between border-t border-stone-300 pt-6">
        <h2 className="font-display text-3xl font-light text-stone-900">Library</h2>
        <span className="font-mono text-[11px] uppercase tracking-widest text-stone-400">
          {filteredEntries.length} shown
        </span>
      </div>
      <motion.div
        variants={reduceMotion ? undefined : containerVariants}
        initial={reduceMotion ? false : 'hidden'}
        animate={reduceMotion ? undefined : 'visible'}
        className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3"
      >
        {filteredEntries.map((entry) => {
          const DemoComponent = demoRegistry[entry.slug];
          return (
            <motion.div key={entry.slug} variants={reduceMotion ? undefined : itemVariants}>
              <EntryCard entry={entry} DemoComponent={DemoComponent} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* No Results Message */}
      {filteredEntries.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center"
        >
          <p className="text-lg text-stone-600">No animations match your filters.</p>
          <p className="mt-2 text-sm text-stone-500">Try adjusting or clearing your filters.</p>
        </motion.div>
      )}
    </div>
  );
}
