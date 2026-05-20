import Link from 'next/link';
import { AnimationEntry } from '@/types/entry';

export function RelatedEntries({ entries }: { entries: AnimationEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <div className="space-y-6 mt-8">
      <h3 className="font-display text-2xl font-medium text-stone-900">
        Related Effects
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/entry/${entry.slug}`}
            className="group block rounded-2xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm"
          >
            <h4 className="font-display text-lg font-medium text-stone-900 transition-colors duration-300 group-hover:text-stone-600">
              {entry.nameEn}
            </h4>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-500">
              {entry.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
