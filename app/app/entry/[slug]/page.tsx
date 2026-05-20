import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { entries } from '@/data/entries';
import { getEntrySignal } from '@/lib/entrySignal';
import { getEffectiveTuningPrompt } from '@/lib/promptQuality';
import { DifficultyBadge } from '@/components/DifficultyBadge';
import { RelatedEntries } from '@/components/RelatedEntries';
import { EntryReveal } from '@/components/EntryReveal';
import { EntryDemoPanel } from '@/components/EntryDemoPanel';
import { EntryBackLink } from '@/components/EntryBackLink';
import { EntryCodeExampleSection } from '@/components/EntryCodeExampleSection';
import { EntryConfigurationTipsSection } from '@/components/EntryConfigurationTipsSection';
import { EntryPromptTemplatesSection } from '@/components/EntryPromptTemplatesSection';
import { EntrySeenInSection } from '@/components/EntrySeenInSection';

export async function generateStaticParams() {
  return entries.map((entry) => ({
    slug: entry.slug,
  }));
}

export default function EntryPage({
  params,
}: {
  params: { slug: string };
}) {
  const entry = entries.find((e) => e.slug === params.slug);

  if (!entry) {
    notFound();
  }

  const relatedEntries = entries.filter((e) =>
    entry.relatedSlugs.includes(e.slug)
  );
  const primaryUse = entry.bestFor || entry.whenToUse[0] || entry.description;
  const primaryAvoid = entry.avoidWhen || entry.whenNotToUse[0] || 'Avoid when static UI would communicate the state more clearly.';
  const saferAlternative = entries.find((candidate) =>
    entry.alternatives?.includes(candidate.slug)
  );
  const riskLevel = entry.motionRisk?.some((risk) =>
    ['accessibility_sensitive', 'performance_sensitive', 'misleading_progress'].includes(risk)
  )
    ? 'High attention'
    : entry.motionRisk && entry.motionRisk.length > 0
      ? 'Use carefully'
      : 'Low risk';
  const entrySignal = getEntrySignal(entry);
  const tuningPrompt = getEffectiveTuningPrompt(entry);

  const needsReplay = entry.slug === 'blur-fade-in' || entry.slug === 'staggered-load';

  return (
    <div className="site-shell py-12">
      {/* Back Navigation */}
      <EntryReveal className="mb-8">
        <Suspense fallback={<span className="text-sm font-medium text-stone-500">Back to Dictionary</span>}>
          <EntryBackLink />
        </Suspense>
      </EntryReveal>

      {/* Index Header */}
      <section className="mb-20 grid gap-10 lg:grid-cols-[minmax(320px,0.48fr)_minmax(0,0.72fr)] lg:items-start">
        <EntryReveal className="lg:sticky lg:top-28" delay={0.04}>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400">{entry.category}</span>
            <DifficultyBadge difficulty={entry.difficulty} />
            <span className="rounded-full border border-stone-200 bg-white px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-stone-500">
              {entrySignal}
            </span>
          </div>
          <h1 className="mt-5 font-display text-5xl font-light leading-none tracking-normal text-stone-950">
            {entry.nameEn}
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-stone-600">
            {entry.decisionNote || entry.description}
          </p>

          <div className="mt-8 grid gap-px overflow-hidden rounded-[8px] border border-stone-200 bg-stone-200">
            <div className="bg-white/95 p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-600">Use</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{primaryUse}</p>
            </div>
            <div className="bg-white/95 p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-red-500">Avoid</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{primaryAvoid}</p>
            </div>
            <div className="grid gap-px bg-stone-200 sm:grid-cols-2">
              <div className="bg-white/95 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Safer Alternative</p>
                {saferAlternative ? (
                  <Link
                    href={`/entry/${saferAlternative.slug}`}
                    className="mt-2 inline-flex text-sm font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:text-stone-500"
                  >
                    {saferAlternative.nameEn}
                  </Link>
                ) : (
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">No safer default listed.</p>
                )}
              </div>
              <div className="bg-white/95 p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Risk Level</p>
                <p className="mt-2 text-sm font-medium text-stone-900">{riskLevel}</p>
              </div>
            </div>
          </div>

          {(entry.durationGuidance || entry.easingGuidance || entry.motionRisk?.length) && (
            <div className="mt-8 grid gap-px overflow-hidden rounded-[8px] border border-stone-200 bg-stone-200">
              {entry.durationGuidance && (
                <div className="bg-white/90 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Timing</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{entry.durationGuidance}</p>
                </div>
              )}
              {entry.easingGuidance && (
                <div className="bg-white/90 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Easing</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{entry.easingGuidance}</p>
                </div>
              )}
              {entry.motionRisk && entry.motionRisk.length > 0 && (
                <div className="bg-stone-950 p-4 text-white">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-amber-300">Risk</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.motionRisk.map((risk) => (
                      <span key={risk} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65">
                        {risk.replaceAll('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </EntryReveal>

        <EntryReveal delay={0.12}>
          <EntryDemoPanel slug={entry.slug} title={entry.nameEn} hasReplayButton={needsReplay} />
        </EntryReveal>
      </section>

      {/* What It Is */}
      <section className="mb-20 max-w-5xl sm:mb-28">
        <h2 className="mb-6 font-display text-2xl font-medium text-stone-900">
          What It Is
        </h2>
        <p className="text-lg text-stone-600 leading-relaxed font-light">{entry.description}</p>
      </section>

      {/* Decision Guidance */}
      {(entry.bestFor ||
        entry.avoidWhen ||
        entry.durationGuidance ||
        entry.easingGuidance ||
        entry.decisionNote ||
        entry.motionRisk?.length ||
        entry.alternatives?.length) && (
        <section className="mb-20 max-w-5xl sm:mb-28">
          <h2 className="mb-6 font-display text-2xl font-medium text-stone-900">
            Decision Guidance
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {entry.decisionNote && (
              <div className="md:col-span-2 rounded-2xl border border-stone-200 bg-white p-6">
                <p className="font-display text-xl font-light leading-relaxed text-stone-900">
                  {entry.decisionNote}
                </p>
              </div>
            )}
            {entry.bestFor && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-stone-400">Best For</h3>
                <p className="leading-relaxed text-stone-600">{entry.bestFor}</p>
              </div>
            )}
            {entry.avoidWhen && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-stone-400">Avoid When</h3>
                <p className="leading-relaxed text-stone-600">{entry.avoidWhen}</p>
              </div>
            )}
            {entry.durationGuidance && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-stone-400">Timing</h3>
                <p className="leading-relaxed text-stone-600">{entry.durationGuidance}</p>
              </div>
            )}
            {entry.easingGuidance && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-stone-400">Easing</h3>
                <p className="leading-relaxed text-stone-600">{entry.easingGuidance}</p>
              </div>
            )}
            {entry.motionRisk && entry.motionRisk.length > 0 && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-stone-400">Risk Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {entry.motionRisk.map((risk) => (
                    <span key={risk} className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-600">
                      {risk.replaceAll('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {entry.alternatives && entry.alternatives.length > 0 && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-stone-400">Alternatives</h3>
                <div className="flex flex-wrap gap-2">
                  {entries
                    .filter((candidate) => entry.alternatives?.includes(candidate.slug))
                    .map((candidate) => (
                      <Link
                        key={candidate.slug}
                        href={`/entry/${candidate.slug}`}
                        className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900"
                      >
                        {candidate.nameEn}
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* When to Use / When NOT to Use */}
      <section className="mb-20 sm:mb-28">
        <div className="grid gap-12 md:grid-cols-2 rounded-2xl bg-stone-50 p-8 sm:p-10 border border-stone-200">
          <div>
            <h3 className="mb-6 font-display text-xl font-medium text-stone-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-sm">✓</span>
              When to Use
            </h3>
            <ul className="space-y-4">
              {entry.whenToUse.map((item, index) => (
                <li key={index} className="flex gap-3 text-stone-600 leading-relaxed">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 font-display text-xl font-medium text-stone-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-500 text-sm">✕</span>
              When NOT to Use
            </h3>
            <ul className="space-y-4">
              {entry.whenNotToUse.map((item, index) => (
                <li key={index} className="flex gap-3 text-stone-600 leading-relaxed">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <EntryConfigurationTipsSection tips={entry.configTips} />
      <EntrySeenInSection seenIn={entry.seenIn} />
      <EntryPromptTemplatesSection
        promptV0={entry.promptV0}
        promptCursor={entry.promptCursor}
        promptCSS={tuningPrompt}
      />
      <EntryCodeExampleSection slug={entry.slug} code={entry.codeTailwind} />

      {/* Related Effects */}
      {relatedEntries.length > 0 && (
        <section className="mb-16 sm:mb-24">
          <RelatedEntries entries={relatedEntries} />
        </section>
      )}
    </div>
  );
}
