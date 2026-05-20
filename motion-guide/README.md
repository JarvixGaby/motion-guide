# Motion Guide Skill

Motion Guide is an installable AI-agent skill for product UI motion decisions. It helps coding agents decide whether motion should exist, choose the right functional or expressive motion pattern, and implement or review motion with accessibility, reduced-motion, timing, easing, and performance constraints.

## Install

### `npx skills`

```bash
npx skills add JarvixGaby/motion-guide
```

Install only for Codex:

```bash
npx skills add JarvixGaby/motion-guide -a codex
```

List skills in the repository:

```bash
npx skills add JarvixGaby/motion-guide --list
```

### Codex / OpenAI-Style Skill Surfaces

Copy or symlink this folder into your skills directory:

```bash
mkdir -p ~/.codex/skills
ln -s "$PWD/motion-guide" ~/.codex/skills/motion-guide
```

The optional `agents/openai.yaml` file provides UI metadata for skill lists and chips.

### Other Markdown Skill Runtimes

Keep `SKILL.md` as the entrypoint and preserve the `references/` folder next to it:

```txt
motion-guide/
  SKILL.md
  agents/openai.yaml
  references/
    motion-database.md
    creative-motion-pack.md
```

For runtimes that use a different skills directory, copy this folder into that location and start a new agent session.

## When To Use

Use Motion Guide whenever an AI coding agent is designing, adding, changing, suggesting, or reviewing UI motion.

Example prompts:

```text
Use $motion-guide to improve this dashboard loading state.
```

```text
Use $motion-guide to review this PR for fake progress, missing reduced-motion, and unnecessary animation dependencies.
```

```text
Use $motion-guide to choose between skeleton, spinner, and progress bar for this import screen.
```

```text
Use $motion-guide to design a creative WebGL hero motion, but keep it product-intent driven and include reduced-motion fallback.
```

## What It Changes

Without a motion-specific skill, coding agents often add generic fades, bounces, stutters, confetti, or decorative effects without product justification. Motion Guide turns motion into a decision workflow:

1. detect the product context;
2. gate whether motion is needed;
3. select a Motion Guide pattern or recommend no motion;
4. constrain implementation for accessibility and performance;
5. verify the result.

The skill can recommend:

- `use motion` when motion improves feedback, orientation, state comprehension, loading confidence, input clarity, onboarding, data understanding, content reveal, or explicit brand/storytelling intent;
- `reduce motion` when a lighter transition or static state is safer;
- `no motion` when animation adds delay, distraction, misleading progress, accessibility risk, or product confusion.

## Package Contents

- `SKILL.md` - compact behavior guide loaded by the agent.
- `agents/openai.yaml` - UI metadata for OpenAI/Codex-style skill surfaces.
- `references/motion-database.md` - full 114-pattern Motion Guide reference.
- `references/creative-motion-pack.md` - optional creative/expressive motion mode for 2D, 3D, WebGL, shader, particle, data, and system visualization contexts.

## Expected Agent Behavior

A good Motion Guide-assisted answer or implementation should preserve these decisions internally:

1. `use motion`, `reduce motion`, or `no motion`.
2. Selected Motion Guide pattern slug, or a reason no pattern applies.
3. Product reason for the motion, not just visual style.
4. One or more when-not-to-use warnings.
5. Duration, easing, accessibility, reduced-motion, focus/screen-reader behavior, and performance constraints.
6. Manual or automated verification notes.

For normal coding tasks, the agent should keep the user-facing summary concise and avoid dumping the full checklist unless asked for a detailed audit.

## Source of Truth

The website data remains the source of truth for pattern content:

- `app/data/entries.ts`
- `app/data/guides.ts`

When entries or guides change, update:

- `motion-guide/SKILL.md`
- `motion-guide/references/motion-database.md`
- `motion-guide/references/creative-motion-pack.md`

## Verification

Before publishing package changes:

```bash
cd app
pnpm validate:data
pnpm typecheck
```

Also verify `SKILL.md` frontmatter remains valid YAML, its `description` stays below 1024 characters, and links to `references/` still resolve.
