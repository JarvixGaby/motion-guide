'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

function highlightCode(code: string): string {
  // First, escape HTML entities
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Then, apply a much safer replacement using simple string splits or safer regexes.
  // Using a simpler series of replacements that don't overlap dangerously.
  return escaped
    // Comments
    .replace(/\/\*[\s\S]*?\*\//g, '<span class="text-stone-400 italic">$&</span>')
    .replace(/\/\/.*/g, '<span class="text-stone-400 italic">$&</span>')
    // Strings (matches single, double, backtick strings not containing tags)
    .replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-stone-600">$&</span>')
    // Keywords
    .replace(/\b(export|function|const|let|var|if|else|return|import|from|as|className|style|interface|type|async|await)\b/g, '<span class="text-stone-900 font-semibold">$&</span>')
    // JSX tags (simple start tags)
    .replace(/&lt;([A-Z][a-zA-Z0-9]*)/g, '&lt;<span class="text-stone-900 font-medium">$1</span>')
    .replace(/&lt;([a-z][a-zA-Z0-9\-]*)/g, '&lt;<span class="text-stone-700">$1</span>')
    // Numbers (only matching standalone numbers, avoiding hyphenated or alphanumeric combinations)
    .replace(/(?<![-a-zA-Z])\b(\d+)\b(?![-a-zA-Z])/g, '<span class="text-stone-900">$&</span>');
}

export function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlighted = highlightCode(code);

  return (
    <div className="group relative">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1.5 opacity-0 text-[11px] font-medium text-stone-600 shadow-sm transition-all hover:bg-stone-50 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-emerald-500" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-3 w-3 text-stone-500" />
            Copy
          </>
        )}
      </button>
      <pre className="overflow-x-auto rounded-2xl border border-stone-200 bg-stone-50 p-6 text-[13px] sm:text-sm">
        <code
          className="font-mono text-stone-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}
