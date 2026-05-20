'use client';

import Link from 'next/link';
import { ArrowRight, Command, Layers3, MousePointer2, Sparkles } from 'lucide-react';
import { entries } from '@/data/entries';

const featuredSlugs = [
  'skeleton-screen',
  'button-loading-state',
  'toast-notification',
  'shared-element-transition',
  'progress-bar',
  'spotlight-coach-mark',
];

const lanes = [
  { label: 'Load', slug: 'skeleton-screen' },
  { label: 'Act', slug: 'button-loading-state' },
  { label: 'Confirm', slug: 'toast-notification' },
  { label: 'Move', slug: 'shared-element-transition' },
];

function findEntry(slug: string) {
  return entries.find((entry) => entry.slug === slug);
}

function MotionPreview({ slug }: { slug: string }) {
  if (slug === 'skeleton-screen') {
    return (
      <div className="w-72 space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/10">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />
            </div>
            <div className="relative h-3 w-2/3 overflow-hidden rounded-full bg-white/10">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="relative h-20 overflow-hidden rounded-[4px] bg-white/10">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slug === 'button-loading-state') {
    return (
      <div className="flex h-32 w-72 items-center justify-center">
        <div className="flex items-center gap-3 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-950 shadow-[0_0_45px_rgba(245,158,11,0.35)]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-stone-950/25 border-t-stone-950" />
          Saving
        </div>
      </div>
    );
  }

  if (slug === 'toast-notification') {
    return (
      <div className="flex h-40 w-72 items-end justify-end">
        <div className="animate-[fade-up_1.8s_ease-out_infinite] rounded-[6px] border border-white/15 bg-white px-4 py-3 text-stone-950 shadow-2xl">
          <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Saved</p>
          <p className="mt-1 text-sm font-medium">Prompt copied</p>
        </div>
      </div>
    );
  }

  if (slug === 'shared-element-transition') {
    return (
      <div className="relative h-44 w-72">
        <div className="absolute left-0 top-8 h-24 w-24 rounded-[6px] border border-white/10 bg-white/10" />
        <div className="absolute right-0 top-0 h-44 w-44 animate-pulse rounded-[10px] border border-amber-300/40 bg-amber-300/20 shadow-[0_0_60px_rgba(245,158,11,0.22)]" />
        <div className="absolute left-20 top-20 h-px w-32 bg-gradient-to-r from-white/10 via-amber-300 to-white/10" />
      </div>
    );
  }

  if (slug === 'progress-bar') {
    return (
      <div className="w-72 space-y-5">
        <div className="flex items-end justify-between">
          <span className="font-display text-4xl font-medium text-white">72%</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">Upload</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[72%] rounded-full bg-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.55)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-44 w-72">
      <div className="absolute inset-8 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300" />
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-amber-300/60" />
    </div>
  );
}

function DemoTile({ slug, scale = 'normal' }: { slug: string; scale?: 'normal' | 'large' }) {
  const entry = findEntry(slug);

  if (!entry) return null;

  return (
    <Link
      href={`/entry/${slug}`}
      className={`group relative overflow-hidden rounded-[6px] border border-white/10 bg-zinc-950 text-white shadow-2xl shadow-stone-950/20 ${
        scale === 'large' ? 'min-h-[360px]' : 'min-h-[250px]'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(245,158,11,0.28),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(14,165,233,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_42%)]" />
      <div className="relative flex h-full min-h-[inherit] flex-col">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">{entry.category}</span>
          <ArrowRight className="h-4 w-4 text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-amber-300" />
        </div>
        <div className="flex flex-1 items-center justify-center overflow-hidden p-7">
          <div className="transition-transform duration-500 group-hover:scale-105">
            <MotionPreview slug={slug} />
          </div>
        </div>
        <div className="relative border-t border-white/10 px-4 py-4">
          <h3 className="font-display text-xl font-medium leading-tight">{entry.nameEn}</h3>
          <p className="mt-2 line-clamp-1 text-sm text-white/45">{entry.decisionNote || entry.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function ConceptPage() {
  return (
    <div className="min-h-screen bg-[#11100e] text-[#f7f1e8]">
      <div className="grid min-h-screen lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden border-r border-white/10 lg:block">
          <div className="sticky top-20 flex h-[calc(100vh-5rem)] flex-col justify-between px-8 py-10">
            <div>
              <div className="mb-12 h-10 w-10 rounded-[6px] bg-[#f59e0b]" />
              <nav className="space-y-6 font-mono text-[11px] uppercase tracking-widest text-white/42">
                <a href="#index" className="block text-[#f7f1e8]">Index</a>
                <a href="#lanes" className="block transition-colors hover:text-[#f7f1e8]">Lanes</a>
                <a href="#samples" className="block transition-colors hover:text-[#f7f1e8]">Samples</a>
              </nav>
            </div>
            <div className="space-y-4 border-t border-white/10 pt-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/35">Visual demo</p>
              <p className="max-w-[10rem] text-sm leading-relaxed text-white/50">
                Dense, quiet, and motion-first.
              </p>
            </div>
          </div>
        </aside>

        <main className="px-5 py-10 sm:px-10 lg:px-14 xl:px-20">
          <section id="index" className="grid min-h-[calc(100vh-8rem)] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.72fr)] lg:items-center">
            <div>
              <div className="mb-8 inline-flex items-center gap-3 border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-white/45">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                Motion decision system
              </div>
              <h1 className="font-display text-[4.5rem] font-semibold leading-[0.88] tracking-normal text-[#f7f1e8] sm:text-[7rem] xl:text-[9.5rem]">
                Name the
                <span className="block text-[#f59e0b]">motion.</span>
              </h1>
              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                <div className="border-t border-white/15 pt-4">
                  <Command className="mb-4 h-5 w-5 text-amber-300" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Search</p>
                </div>
                <div className="border-t border-white/15 pt-4">
                  <Layers3 className="mb-4 h-5 w-5 text-amber-300" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Compare</p>
                </div>
                <div className="border-t border-white/15 pt-4">
                  <MousePointer2 className="mb-4 h-5 w-5 text-amber-300" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Copy</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <DemoTile slug="skeleton-screen" scale="large" />
              <div className="grid grid-cols-2 gap-4">
                <DemoTile slug="button-loading-state" />
                <DemoTile slug="toast-notification" />
              </div>
            </div>
          </section>

          <section id="lanes" className="border-y border-white/10 py-10">
            <div className="grid gap-px overflow-hidden rounded-[6px] border border-white/10 bg-white/10 md:grid-cols-4">
              {lanes.map((lane, index) => {
                const entry = findEntry(lane.slug);
                return (
                  <Link key={lane.slug} href={`/entry/${lane.slug}`} className="group bg-[#11100e] p-6 transition-colors hover:bg-[#181612]">
                    <div className="mb-16 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">
                        0{index + 1}
                      </span>
                      <ArrowRight className="h-4 w-4 text-white/25 transition-transform group-hover:translate-x-1 group-hover:text-amber-300" />
                    </div>
                    <p className="font-display text-3xl font-light text-[#f7f1e8]">{lane.label}</p>
                    <p className="mt-3 line-clamp-1 text-sm text-white/38">{entry?.nameEn}</p>
                  </Link>
                );
              })}
            </div>
          </section>

          <section id="samples" className="py-14">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-display text-5xl font-light tracking-normal text-[#f7f1e8]">Samples</h2>
              <Link href="/" className="hidden font-mono text-[11px] uppercase tracking-widest text-white/35 transition-colors hover:text-[#f7f1e8] sm:block">
                Current home
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featuredSlugs.map((slug) => (
                <DemoTile key={slug} slug={slug} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
