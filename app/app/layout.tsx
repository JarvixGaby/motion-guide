import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { Sora, Outfit, Fira_Code } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Motion Guide - UI Motion Skill and Decision Library',
  description: 'Install the Motion Guide skill and browse product-safe UI motion patterns for AI coding agents.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${outfit.variable} ${firaCode.variable}`}>
      <body>
        <nav className="sticky top-0 z-50 border-b border-stone-200/60 bg-[#fffaf2]/85 backdrop-blur-md">
          <div className="site-shell">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center gap-6 sm:gap-8">
                <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
                  <div className="h-6 w-6 rounded-sm bg-stone-900 transition-transform duration-500 group-hover:rotate-90" />
                  <span className="font-display text-lg font-medium tracking-wide text-stone-900">Motion Guide</span>
                </Link>
                <div className="flex items-center gap-4 sm:gap-5">
                  <Link
                    href="/"
                    className="font-mono text-[11px] uppercase tracking-widest text-stone-500 transition-colors hover:text-stone-900"
                  >
                    Library
                  </Link>
                  <Link
                    href="/guides"
                    className="rounded-full border border-stone-300 bg-white/70 px-3.5 py-2 font-mono text-[11px] uppercase tracking-widest text-stone-700 shadow-sm transition-colors hover:border-stone-400 hover:bg-white hover:text-stone-950"
                  >
                    Guides
                  </Link>
                  <Link
                    href="/skills"
                    className="font-mono text-[11px] uppercase tracking-widest text-stone-500 transition-colors hover:text-stone-900"
                  >
                    Skill
                  </Link>
                </div>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <a
                  href="https://github.com/JarvixGaby/motion-guide"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Motion Guide on GitHub"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white/70 text-stone-600 shadow-sm transition-colors hover:border-stone-900 hover:bg-stone-950 hover:text-white"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://x.com/JarvixGaby"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="JarvixGaby on X"
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-stone-300 bg-white/70 px-3 font-mono text-[11px] uppercase tracking-widest text-stone-600 shadow-sm transition-colors hover:border-stone-900 hover:bg-stone-950 hover:text-white"
                >
                  X
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="mt-32 py-12 border-t border-stone-200">
          <div className="site-shell flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <span className="font-display text-sm font-medium text-stone-900">Motion Guide</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="https://github.com/JarvixGaby/motion-guide"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] uppercase tracking-widest text-stone-500 transition-colors hover:text-stone-950"
              >
                GitHub
              </a>
              <a
                href="https://x.com/JarvixGaby"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] uppercase tracking-widest text-stone-500 transition-colors hover:text-stone-950"
              >
                X
              </a>
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                Skill-first UI motion guidance
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
