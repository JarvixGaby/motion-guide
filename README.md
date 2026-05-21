# motion-guide skills

[中文说明](README.zh-CN.md)

Motion Guide is an installable AI-agent skill for product-safe UI motion decisions.

It helps coding agents choose when to animate, when to reduce motion, and when no motion is the better product choice. The skill turns vague animation requests into named patterns, alternatives, implementation constraints, accessibility checks, reduced-motion behavior, performance guardrails, and review criteria.

The skill package is the primary product. The website is a companion browser and demo for humans.

## What The Skill Contains

- 114 practical UI motion patterns.
- A creative motion pack for expressive 2D, 3D, WebGL, shader, particle, data, and system-visualization moments.
- Decision rules for when not to animate.
- Accessibility, reduced-motion, performance, and dependency constraints.
- Implementation review criteria for AI-generated frontend diffs.
- A companion website for browsing and comparing the same decision space:
  - Hosted site: <https://motion-guide.pages.dev/>
  - Install section: <https://motion-guide.pages.dev/#install-the-skill>

Motion Guide is not a component library and not a decorative effects gallery. It is a decision layer for product motion.

## Install

Install with the open `skills` CLI:

```bash
npx skills add JarvixGaby/motion-guide
```

### With Codex Skills

Copy or symlink the skill package into your Codex skills directory:

```bash
mkdir -p ~/.codex/skills
ln -s "$PWD/motion-guide" ~/.codex/skills/motion-guide
```

Start a new agent session so the skill loader can discover it.

## Usage

Use Motion Guide when an agent is designing, adding, changing, suggesting, or reviewing UI motion.

Example prompts:

```text
Use /motion-guide to improve this dashboard loading state.
```

```text
Use /motion-guide to review this PR for fake progress, missing reduced-motion, and unnecessary animation dependencies.
```

```text
Use /motion-guide to choose between skeleton, spinner, and progress bar for this import screen.
```

```text
Use /motion-guide to design a creative WebGL hero motion, but keep it product-intent driven and include a reduced-motion fallback.
```

The skill may recommend:

- `use motion` when motion improves feedback, orientation, loading confidence, input clarity, onboarding, data understanding, content reveal, or brand/storytelling intent;
- `reduce motion` when a lighter transition or static state is safer;
- `no motion` when animation would add delay, distraction, misleading progress, accessibility risk, or product confusion.

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

## License

MIT. See [LICENSE](LICENSE).
