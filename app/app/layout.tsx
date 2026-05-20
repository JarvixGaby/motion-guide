import type { Metadata } from 'next';
import Link from 'next/link';
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
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="mt-32 py-12 border-t border-stone-200">
          <div className="site-shell flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <span className="font-display text-sm font-medium text-stone-900">Motion Guide</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Skill-first UI motion guidance</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
