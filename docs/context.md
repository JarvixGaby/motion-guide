# Project Context

**What:** Motion Guide is a UI motion decision glossary for developers who need to identify, choose, and implement product animation patterns quickly.
**Phase:** MVP expansion and content deepening, with companion skill work split into Practical Motion / Audit Mode and additive Creative Motion Mode.
**Core users:** AI builders, frontend developers, indie makers, startup developers, and design learners who use AI tools or code-first workflows but need stronger motion design judgment.
**Key constraints:** Motion Guide must stay a decision dictionary, not a component library or generic effects gallery; motion entries must explain when to use, when to avoid, risks, alternatives, timing/easing guidance, copy-ready prompts, accessibility, reduced-motion, and performance constraints.

## Product Direction

Motion Guide is evolving from a visual catalog into a decision workspace. The product should help users answer "Should I use this motion pattern?" before "How do I implement it?"

## Design Direction

The interface follows a quiet, index-like motion reference desk: structured, visual, editorial, and restrained. Animated samples are the primary visual material; surrounding UI should support scanning and decision-making.

## Current App Shape

- `app/` contains the Next.js application.
- `app/data/entries.ts` and `app/data/guides.ts` contain the motion glossary content.
- `app/components/demos/` contains individual motion demo components.
- `motion-guide/SKILL.md` contains the companion motion-guide skill and must stay aligned with major glossary additions.
- `motion-guide/references/creative-motion-pack.md` and `docs/creative-motion-pack.md` document additive Creative Motion Mode for 2D/3D/WebGL motion patterns.
