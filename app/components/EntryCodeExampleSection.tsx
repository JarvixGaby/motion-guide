import { CodeBlock } from '@/components/CodeBlock';
import { getEffectiveCodeExample } from '@/lib/demoSource';

export function EntryCodeExampleSection({ slug, code }: { slug: string; code: string }) {
  const example = getEffectiveCodeExample(slug, code);

  return (
    <section className="mb-16 sm:mb-24">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-stone-900">
          {example.source === 'demo' ? 'Reference Implementation' : 'Code Example (Tailwind CSS)'}
        </h2>
        <p className="mt-2 font-light text-stone-500">
          {example.source === 'demo'
            ? 'The same implementation approach used by the live preview, kept compact enough to inspect and adapt.'
            : 'A focused implementation sketch you can adapt to your product state.'}
        </p>
      </div>
      <CodeBlock code={example.code} language="tsx" />
    </section>
  );
}
