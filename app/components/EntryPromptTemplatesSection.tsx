import { PromptTemplate } from '@/components/PromptTemplate';

export function EntryPromptTemplatesSection({
  promptV0,
  promptCursor,
  promptCSS,
}: {
  promptV0: string;
  promptCursor: string;
  promptCSS: string;
}) {
  return (
    <section className="mb-20 sm:mb-28">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-medium text-stone-900">
          AI Implementation Prompts
        </h2>
        <p className="mt-2 font-light text-stone-500">
          Move from a fast scaffold to production details, then tune timing and edge states.
        </p>
      </div>
      <PromptTemplate
        promptV0={promptV0}
        promptCursor={promptCursor}
        promptCSS={promptCSS}
      />
    </section>
  );
}
