import type { Metadata } from 'next';
import { ExternalLink, Github } from 'lucide-react';
import { Sora, Outfit, Fira_Code } from 'next/font/google';
import { SiteHeader } from '@/components/SiteHeader';
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
        <SiteHeader />
        <main>{children}</main>
        <footer className="mt-32 py-12 border-t border-stone-200">
          <div className="site-shell flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <span className="font-display text-sm font-medium text-stone-900">Motion Guide</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="https://github.com/JarvixGaby/motion-guide"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-stone-500 transition-colors hover:text-stone-950"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href="https://x.com/JarvixGaby"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-stone-500 transition-colors hover:text-stone-950"
              >
                <ExternalLink className="h-3.5 w-3.5" />
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
