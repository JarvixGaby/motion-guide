# Motion Guide

[![skills.sh](https://skills.sh/b/JarvixGaby/motion-guide)](https://skills.sh/JarvixGaby/motion-guide)

Motion Guide is an installable AI-agent skill for product-safe UI motion.

It helps coding agents decide whether motion should exist, choose an appropriate functional or expressive motion pattern, and implement or review that motion with timing, easing, accessibility, reduced-motion, performance, and misuse constraints.

The skill is the primary product. The website is a companion browser and demo.

## Install

### With `npx skills`

Install with the open `skills` CLI:

```bash
npx skills add JarvixGaby/motion-guide
```

Install only for Codex:

```bash
npx skills add JarvixGaby/motion-guide -a codex
```

Use `--list` to inspect installable skills in the repo:

```bash
npx skills add JarvixGaby/motion-guide --list
```

### With Codex Skills

Copy or symlink the skill package into your Codex skills directory:

```bash
mkdir -p ~/.codex/skills
ln -s "$PWD/motion-guide" ~/.codex/skills/motion-guide
```

Start a new Codex session so the skill loader can discover it. Then invoke it explicitly with `$motion-guide`, or let it trigger when a task involves UI motion.

### With Other Skill-Compatible Agents

Any agent that supports Markdown skills can use the package:

```txt
motion-guide/
  SKILL.md
  agents/openai.yaml
  references/
    motion-database.md
    creative-motion-pack.md
```

Keep `SKILL.md` as the entrypoint. The `references/` files are loaded only when the agent needs the full pattern database or creative motion reference.

## Usage

Use Motion Guide when an agent is designing, adding, changing, suggesting, or reviewing UI motion.

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
Use $motion-guide to design a creative WebGL hero motion, but keep it product-intent driven and include a reduced-motion fallback.
```

The skill may recommend:

- `use motion` when motion improves feedback, orientation, loading confidence, input clarity, onboarding, data understanding, content reveal, or brand/storytelling intent;
- `reduce motion` when a lighter transition or static state is safer;
- `no motion` when animation would add delay, distraction, misleading progress, accessibility risk, or product confusion.

## What The Skill Contains

- 114 practical UI motion patterns.
- A creative motion pack for expressive 2D, 3D, WebGL, shader, particle, data, and system-visualization moments.
- Decision rules for when not to animate.
- Accessibility, reduced-motion, performance, and dependency constraints.
- Implementation review criteria for AI-generated frontend diffs.

Motion Guide is not a component library and not a decorative effects gallery. It is a decision layer for product motion.

## Website Demo

The companion site helps humans browse the same decision space:

- Hosted site: <https://motion-guide.pages.dev/>
- Skill demo: <https://motion-guide.pages.dev/skills>

Use the site to search motion patterns, compare similar choices, and see why the skill changes AI-agent output. The source of truth remains the skill package and its references.

## Repository Structure

- `motion-guide/` - installable skill package.
- `motion-guide/SKILL.md` - skill entrypoint.
- `motion-guide/agents/openai.yaml` - UI metadata for OpenAI/Codex-style skill surfaces.
- `motion-guide/references/` - full motion pattern references.
- `app/` - optional Next.js demo site.
- `docs/` - public product notes and content model.

## Local Demo Development

The demo app lives in `app/`.

```bash
cd app
pnpm install
pnpm dev
```

Useful checks:

```bash
cd app
pnpm typecheck
pnpm validate:data
pnpm build
```

Use Node.js 22+ and pnpm 10.

## Publishing To Skill Ecosystems

Motion Guide can live in both major skill distribution paths:

- **OpenAI/Codex skill package**: keep `motion-guide/SKILL.md`, `references/`, and `agents/openai.yaml` valid and concise.
- **skills.sh / `npx skills`**: keep the skill as a top-level folder with a valid `SKILL.md`, then publish this repo publicly so users can install it with `npx skills add owner/repo`.

For discoverability, use GitHub topics such as `agent-skills`, `codex-skills`, `claude-skills`, `ui-motion`, `frontend`, `animation`, and `accessibility`.

## License

MIT. See [LICENSE](LICENSE).
