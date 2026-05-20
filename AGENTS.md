# AGENTS.md

> Single source of truth for all agent instructions.
> CLAUDE.md contains only: `See AGENTS.md for all agent instructions.`

---
## Meta Rule

Do not modify AGENTS.md unless the user explicitly instructs it.

Sections that must never be modified without explicit user instruction:
- Session Start
- Documentation System
- Plan Management
- Meta Rule itself

Sections that may be updated when project facts change:
- Tech Stack
- Commands
- Boundaries

When a task requires a new permanent document:
1. Create it in `docs/` following naming rules
2. Add it to `docs/index.md`
3. Do not add references to it in AGENTS.md

---

## Session Start

 On every session start:
  1. Read `AGENTS.md` first and treat it as the single source of truth for project instructions.

Read only when relevant:
- `docs/project-reflection.md` — before major decisions or architecture changes
- `docs/conversations/` — when historical context is needed
- `docs/index.md/` — when need to understand project structure and look up file
- `docs/active_plan.md` when continuing implementation, resuming work, or determining next development steps.
- `docs/context.md` when project background, current phase, constraints, or direction are needed.
- If `docs/active_plan.md` has content and the task is execution-related, resume from the last unchecked step and preserve the file until all listed steps are complete.

## Documentation System

### File Naming & Placement

| Type | Location | Naming |
|------|----------|--------|
| Core docs | `docs/` | lowercase, hyphen-separated |
| Conversation logs | `docs/conversations/` | `YYYY-MM-DD-[topic-slug].md` |
| Temp / spike files | `docs/` | prefix with `_` |

Never create documentation in project root except: `AGENTS.md`, `CLAUDE.md`, `README.md`  
Temp files are never indexed in `docs/index.md`

---

### Core Documents

### `docs/context.md`
Project snapshot for new sessions.  
Update when project phase or direction changes significantly.

### `docs/index.md`
Project structure Lists only stable, permanent documents.  
**Include:** core docs, key design docs, `project-reflection.md`  
**Exclude:** temp files, conversation logs, `active_plan.md`  
Update whenever a permanent doc is added or removed.

### `docs/project-reflection.md`
Records the "why" behind the project.  
When adding an entry, follow the format of the example entry in the file.

**✅ Update when:**
- Major technical decision made
- Design philosophy shifts
- Important user feedback received
- Market positioning adjusted
- Architecture changes
- Any "why did we do it this way" moment worth preserving

**⛔ Do not update for:**
- Routine bug fixes
- Standard feature additions
- Simple refactoring
- Dependency version bumps

### `docs/conversations/`
Manually triggered. When creating a log, follow the format in `docs/conversations/_example.md`

---

## Plan Management

On session start, read `docs/active_plan.md`.  
If it has content: resume from last unchecked step without asking user to re-explain context.  
After each completed step: check the box and update `Last updated` date.  
When all steps are done: clear `docs/active_plan.md`.

---

## Project Specifics

### Tech Stack

- App: Next.js 14 App Router, React 18, TypeScript 5.
- Styling: Tailwind CSS 4 with PostCSS and Autoprefixer.
- Motion: Framer Motion 11 plus focused CSS animation demos.
- Search: Fuse.js 7 client-side fuzzy search.
- Icons: lucide-react.
- Deployment: static export; hosting provider configuration is intentionally kept outside the public repository.
- Package manager/runtime: pnpm 10.33.0, Node.js 22+.
- Tooling: app checks run from `app/`; no root package manager workspace is required.

### Commands

Run app commands from `app/` unless noted.

- Install app dependencies: `pnpm install`
- Start development server: `pnpm dev`
- Typecheck: `pnpm typecheck`
- Build static site: `pnpm build`
- Build static export: `pnpm pages:build`
- Validate motion entry data: `pnpm validate:data`

### Boundaries

#### Never modify without explicit user instruction:

- `AGENTS.md` sections listed as protected in Meta Rule.
- Core motion entry data contract in `app/types/entry.ts`.
- Taxonomy semantics in `app/data/taxonomies.ts`.
- Canonical product positioning: Motion Guide is a functional motion decision dictionary, not a component library, generic visual gallery, decorative effects catalog, or code redistribution site.
- Functional motion scope: entries must be translatable into a clear product function such as feedback, navigation, input, onboarding/guidance, loading/state handling, data understanding, content comprehension, attention direction, spatial orientation, or meaningful content reveal. A visual effect does not need to explain the current UI state directly, but it must have a concrete reusable product use case, misuse risk, and alternatives. Pure atmosphere, brand texture, and visual gimmicks with no product function remain out of scope.
- Detail-page content quality: public fields such as `seenIn` must name real products or product contexts, not inspiration/source libraries. `promptCursor` must describe state, interaction, accessibility, reduced motion, and edge conditions when relevant. `codeTailwind` must be a usable illustrative example, not an empty function, placeholder shell, or comment-only snippet.
- Canonical design direction in `docs/design-language.md` and major design philosophy records in `docs/project-reflection.md`.

#### Confirm before modifying:

- Bulk changes to `app/data/entries.ts`, `app/data/guides.ts`, or generated/expanded catalog batches.
- Changes that add, remove, or rename motion categories, difficulty levels, media tiers, or motion risk tags.
- Changes to `motion-guide/SKILL.md`; keep it synchronized with website entry and guide changes.
- Deployment configuration outside the repository and `app/next.config.js`.
- Archived installation or app notes under `docs/app-archive/` and `scripts/app-archive/`.
