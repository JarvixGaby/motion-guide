'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Library' },
  { href: '/guides', label: 'Guides' },
];

function isActivePath(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/' || pathname.startsWith('/entry/');
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200/60 bg-[#fffaf2]/85 backdrop-blur-md">
      <div className="site-shell">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-6 sm:gap-8">
            <Link href="/" className="group flex items-center gap-3 sm:gap-4">
              <div className="h-6 w-6 rounded-sm bg-stone-900 transition-transform duration-500 group-hover:rotate-90" />
              <span className="font-display text-lg font-medium tracking-wide text-stone-900">Motion Guide</span>
            </Link>
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className="relative rounded-full px-3.5 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="site-header-active-tab"
                        className="absolute inset-0 rounded-full border border-stone-300 bg-white/70 shadow-sm"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 420, damping: 34, mass: 0.7 }
                        }
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? 'text-stone-700' : 'text-stone-500 hover:text-stone-900'}`}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <a
              href="https://github.com/JarvixGaby/motion-guide"
              target="_blank"
              rel="noreferrer"
              aria-label="Motion Guide on GitHub"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/70 px-3.5 font-mono text-[11px] uppercase tracking-widest text-stone-600 shadow-sm transition-colors hover:border-stone-900 hover:bg-stone-950 hover:text-white"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://x.com/JarvixGaby"
              target="_blank"
              rel="noreferrer"
              aria-label="JarvixGaby on X"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/70 px-3.5 font-mono text-[11px] uppercase tracking-widest text-stone-600 shadow-sm transition-colors hover:border-stone-900 hover:bg-stone-950 hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              X
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
