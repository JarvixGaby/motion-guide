'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function EntryBackLink() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const isFromGuides = from?.startsWith('/guides');
  const href = isFromGuides && from ? from : '/';
  const label = isFromGuides ? 'Back to Guides' : 'Back to Dictionary';

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}
