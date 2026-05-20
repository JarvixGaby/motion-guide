import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, TerminalSquare } from 'lucide-react';

const installCommands = [
  {
    label: 'skills.sh',
    command: 'npx skills add JarvixGaby/motion-guide',
  },
  {
    label: 'Codex only',
    command: 'npx skills add JarvixGaby/motion-guide -a codex',
  },
];

const outcomes = [
  {
    icon: CheckCircle2,
    title: 'Pattern selection',
    text: 'Maps vague animation requests to named motion patterns, nearby alternatives, and no-motion decisions.',
  },
  {
    icon: ShieldCheck,
    title: 'Safer implementation',
    text: 'Adds reduced-motion, focus, screen-reader, duration, easing, and performance constraints before code ships.',
  },
  {
    icon: Sparkles,
    title: 'Practical plus creative',
    text: 'Handles ordinary product UI and expressive 2D, 3D, WebGL, shader, data, and system-visualization moments.',
  },
];

const cases = [
  {
    prompt: 'The backend only exposes started/completed/failed, but the UI asks for an 8-second 0-100% progress bar.',
    generic: 'Reject fake progress and show an indeterminate loader.',
    guided: 'Use indeterminate-progress-bar with staged status text, screen-reader announcement, and a no-fake-percentage rule.',
    pattern: 'indeterminate-progress-bar',
  },
  {
    prompt: 'A PR adds full-screen translateY and blur on every route transition, with no reduced-motion support.',
    generic: 'Reduce the movement and add reduced-motion handling.',
    guided: 'Use opacity-only transition for frequent navigation and bypass risky transforms under reduced motion.',
    pattern: 'fade-transition',
  },
  {
    prompt: 'After clicking Pay now, authorization is pending, but the request asks for confetti and a bouncing button.',
    generic: 'Avoid celebration until payment succeeds.',
    guided: 'Use button-loading-state plus honest authorization copy; reserve celebration for confirmed completion only.',
    pattern: 'button-loading-state',
  },
  {
    prompt: 'A dense operations dashboard wants gooey navigation, bounce, and dramatic animated table rows.',
    generic: 'Keep dashboard motion subtle.',
    guided: 'Prefer static hierarchy, focus states, and restrained opacity changes; reject personality-heavy motion in precision tools.',
    pattern: 'no-motion / reduce-motion',
  },
  {
    prompt: 'A product launch hero needs memorable AI-system motion without becoming an unrelated visual effect.',
    generic: 'Create an animated AI background.',
    guided: 'Choose tool-call-timeline, animated-knowledge-graph, or particle-network-field only when it explains product behavior.',
    pattern: 'creative-motion-mode',
  },
  {
    prompt: 'A filterable grid replays staggered card animations every time the user changes filters.',
    generic: 'Shorten the animation.',
    guided: 'Use first-load-only reveal, group-level fade, or instant result updates with result-count announcement.',
    pattern: 'stagger-list-reveal alternative',
  },
];

export default function SkillsPage() {
  return (
    <div className="site-shell py-14 sm:py-20">
      <section className="grid gap-12 border-b border-stone-200 pb-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.55fr)] lg:items-end">
        <div>
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-16 bg-stone-900" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-stone-500">
              Installable agent skill
            </span>
          </div>
          <h1 className="display-tight font-display text-[4rem] font-medium leading-[0.94] text-stone-950 sm:text-[6rem] lg:text-[7.5rem]">
            Motion Guide
            <span className="block text-stone-400">Skill</span>
          </h1>
          <p className="mt-8 max-w-2xl font-display text-2xl font-light leading-snug text-stone-700">
            A UI motion decision skill for coding agents. It helps agents decide when to animate,
            when to reduce motion, and when no motion is the better product choice.
          </p>
        </div>

        <div className="border-l border-stone-300 pl-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-stone-500">Primary install</p>
          <div className="mt-4 space-y-3">
            {installCommands.map((item) => (
              <div key={item.label} className="rounded-[8px] border border-stone-200 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-stone-500">
                  <TerminalSquare className="h-3.5 w-3.5" />
                  {item.label}
                </div>
                <code className="block overflow-x-auto whitespace-nowrap rounded bg-stone-950 px-3 py-2 font-mono text-xs text-stone-100">
                  {item.command}
                </code>
              </div>
            ))}
          </div>
          <Link
            href="/"
            className="group mt-6 inline-flex items-center gap-3 rounded-full border border-stone-300 bg-white/80 px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-stone-700 shadow-sm transition-colors hover:border-stone-900 hover:bg-stone-950 hover:text-white"
          >
            Browse motion library
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="grid gap-px overflow-hidden rounded-[8px] border border-stone-200 bg-stone-200 my-14 md:grid-cols-3">
        {outcomes.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="bg-white p-6">
              <Icon className="h-5 w-5 text-stone-900" />
              <h2 className="mt-5 font-display text-2xl font-medium text-stone-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">{item.text}</p>
            </div>
          );
        })}
      </section>

      <section>
        <div className="mb-8 flex items-end justify-between border-t border-stone-300 pt-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-stone-500">Demo cases</p>
            <h2 className="mt-3 font-display text-4xl font-light text-stone-900">How the skill changes output</h2>
          </div>
          <span className="hidden font-mono text-[11px] uppercase tracking-widest text-stone-400 sm:inline">
            decision layer, not effects gallery
          </span>
        </div>

        <div className="grid gap-6">
          {cases.map((item, index) => (
            <article
              key={item.prompt}
              className="grid gap-px overflow-hidden rounded-[8px] border border-stone-200 bg-stone-200 lg:grid-cols-[0.82fr_1fr_1fr]"
            >
              <div className="bg-stone-950 p-5 text-white">
                <p className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                  Case {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-4 text-sm leading-6 text-white/75">{item.prompt}</p>
              </div>
              <div className="bg-white p-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Generic answer</p>
                <p className="mt-4 text-sm leading-6 text-stone-600">{item.generic}</p>
              </div>
              <div className="bg-emerald-50 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-700">Motion Guide</p>
                  <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] text-emerald-800 ring-1 ring-emerald-200">
                    {item.pattern}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-stone-700">{item.guided}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
