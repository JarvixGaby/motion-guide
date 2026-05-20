# Motion Guide Demo App

The companion website for the Motion Guide skill.

## Setup

Use Node.js 22+ and pnpm 10.

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Quality Checks

```bash
pnpm typecheck
pnpm build
pnpm validate:data
```

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Fuse.js for client-side fuzzy search
- lucide-react icons

## Current Features

- 114 motion entries across loading, action feedback, transitions, empty/error states, status confirmation, data visualization, scroll/navigation, onboarding, and creative motion.
- Live CSS and Framer Motion demos.
- Fuzzy search with category, page type, and use case filters.
- Entry detail pages with live demos, decision guidance, usage notes, prompt templates, code snippets, and related effects.
- Guides page for comparisons, motion recipes, and anti-patterns.
- Skills page for installation guidance and skill-output demo cases.
- Responsive light editorial interface.

## Data Integrity

Run `pnpm validate:data` after changing entries, demo registration, taxonomies, or guide references. The validator checks unique ids/slugs, taxonomy values, related links, alternatives, and demo coverage.
