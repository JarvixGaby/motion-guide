'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

type PromptType = 'v0' | 'cursor' | 'css';

const tabLabels: Record<PromptType, string> = {
  v0: 'Quick Prompt',
  cursor: 'Production Prompt',
  css: 'Tuning Prompt',
};

export function PromptTemplate({
  promptV0,
  promptCursor,
  promptCSS,
}: {
  promptV0: string;
  promptCursor: string;
  promptCSS: string;
}) {
  const [activeTab, setActiveTab] = useState<PromptType>('v0');
  const [copied, setCopied] = useState(false);

  const prompts = {
    v0: promptV0,
    cursor: promptCursor,
    css: promptCSS,
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompts[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100/50 rounded-full border border-stone-200/60">
          {(Object.keys(tabLabels) as PromptType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${activeTab === tab
                ? 'bg-white text-stone-900 shadow-sm border border-stone-200/50'
                : 'text-stone-500 hover:text-stone-900 hover:bg-white/50 border border-transparent'
                }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-2.5 text-sm font-medium text-stone-600 shadow-sm transition-all hover:bg-stone-50 hover:text-stone-900 group"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 text-stone-400 transition-colors group-hover:text-stone-600" />
              Copy Prompt
            </>
          )}
        </button>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-50">
        <div className="p-6 sm:p-8 min-h-[120px] flex items-center">
          <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-stone-700 w-full break-words">
            {prompts[activeTab]}
          </p>
        </div>
      </div>
    </div>
  );
}
