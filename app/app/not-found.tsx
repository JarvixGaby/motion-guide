import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="animate-pulse-slow text-8xl font-bold text-zinc-800">404</div>
      <h1 className="mt-8 font-display text-3xl font-bold text-zinc-100">
        Animation Not Found
      </h1>
      <p className="mt-4 max-w-md text-zinc-400">
        This motion pattern is not in Motion Guide yet. Head back to explore the library.
      </p>
      <Link
        href="/"
        className="mt-8 flex items-center gap-2 rounded-lg bg-amber-warm px-6 py-3 font-medium text-zinc-900 transition-all hover:bg-amber-coral"
      >
        <Home className="h-5 w-5" />
        Back to Library
      </Link>
    </div>
  );
}
