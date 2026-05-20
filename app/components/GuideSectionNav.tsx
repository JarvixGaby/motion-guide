'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'situations', label: 'Situations' },
  { id: 'comparisons', label: 'Comparisons' },
  { id: 'recipes', label: 'Recipes' },
  { id: 'anti-patterns', label: 'Anti-patterns' },
];

export function GuideSectionNav() {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const observedSections = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    observedSections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-10 space-y-3 font-mono text-[11px] uppercase tracking-widest">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={() => setActiveSection(section.id)}
            className={[
              'block transition-colors',
              isActive ? 'text-stone-950' : 'text-stone-400 hover:text-stone-950',
            ].join(' ')}
          >
            {section.label}
          </a>
        );
      })}
    </div>
  );
}
