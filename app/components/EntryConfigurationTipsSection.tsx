export function EntryConfigurationTipsSection({ tips }: { tips?: string[] }) {
  if (!tips || tips.length === 0) return null;

  return (
    <section className="mb-20 sm:mb-28">
      <h3 className="mb-6 font-display text-xl font-medium text-stone-900">
        Configuration Tips
      </h3>
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
        <ul className="space-y-4">
          {tips.map((tip, index) => (
            <li key={index} className="flex gap-4 text-stone-600 leading-relaxed">
              <span className="mt-0.5 font-mono text-stone-400">{String(index + 1).padStart(2, '0')}</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
