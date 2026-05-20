export function EntrySeenInSection({ seenIn }: { seenIn: string[] }) {
  if (seenIn.length === 0) return null;

  return (
    <section className="mb-20 sm:mb-28">
      <h3 className="mb-6 font-display text-xl font-medium text-stone-900">
        You've Seen It In
      </h3>
      <div className="flex flex-wrap gap-2">
        {seenIn.map((brand) => (
          <span
            key={brand}
            className="rounded-full border border-stone-200 bg-stone-100 px-4 py-1.5 text-sm text-stone-600"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
