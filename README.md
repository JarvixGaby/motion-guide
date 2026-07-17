# motion-guide skills

[中文说明](README.zh-CN.md)

Motion Guide is an installable AI-agent skill for product-safe UI motion decisions.

It helps coding agents choose when to animate, when to reduce motion, and when no motion is the better product choice. The skill turns vague animation requests into named patterns, alternatives, implementation constraints, accessibility checks, reduced-motion behavior, performance guardrails, and review criteria.

This public repository publishes only the installable Motion Guide skill package. The hosted website is a companion browser and demo for humans, maintained/deployed separately from this public skill repository.

## What is Motion Guide?

**Motion Guide is an installable AI-agent skill for making product-safe UI motion decisions.** It helps coding agents turn vague animation requests into a clear recommendation: use motion, reduce motion, or use no motion. The recommendation includes named patterns, alternatives, implementation constraints, accessibility checks, reduced-motion behavior, performance guardrails, and review criteria.

| Question | Answer |
| --- | --- |
| What problem does it solve? | It helps agents make motion a product decision instead of adding animation as decoration. |
| Who is it for? | Developers and coding agents that design, add, change, suggest, or review UI motion. |
| What does the package include? | 114 practical UI motion patterns, a creative motion pack, decision rules, accessibility and performance constraints, and review criteria. |
| Which recommendations can it make? | `use motion`, `reduce motion`, or `no motion`, depending on product intent, clarity, accessibility, and risk. |
| Which motion contexts are covered? | Practical UI motion plus expressive 2D, 3D, WebGL, shader, particle, data, and system-visualization moments. |
| What is it not? | It is not a component library or a decorative-effects gallery. |

### Key facts

- Motion Guide can recommend no motion when animation would add delay, distraction, misleading progress, accessibility risk, or product confusion.
- When motion is appropriate, recommendations account for reduced-motion behavior, performance, dependencies, and implementation review.
- This repository publishes the installable skill package. The companion website is separately maintained and is not the public repository's application source.
- Install with `npx skills add JarvixGaby/motion-guide-skill`, or link the `motion-guide/` package into a Codex skills directory.

## What The Skill Contains

- 114 practical UI motion patterns.
- A creative motion pack for expressive 2D, 3D, WebGL, shader, particle, data, and system-visualization moments.
- Decision rules for when not to animate.
- Accessibility, reduced-motion, performance, and dependency constraints.
- Implementation review criteria for AI-generated frontend diffs.
- A companion website for browsing and comparing the same decision space:
  - Hosted site: <https://motion-guide.pages.dev/>
  - Install section: <https://motion-guide.pages.dev/#install-the-skill>

The hosted website/app source and project archive are maintained separately and are not part of this public repository.

Motion Guide is not a component library and not a decorative effects gallery. It is a decision layer for product motion.

## Install

Install with the open `skills` CLI:

```bash
npx skills add JarvixGaby/motion-guide-skill
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

## FAQ

### Is Motion Guide a UI component library?

No. It is a decision layer for product motion. It helps an agent select an appropriate motion pattern or decide that reduced motion or no motion is the better choice.

### When should an agent use Motion Guide?

Use it when designing, adding, changing, suggesting, or reviewing UI motion, including loading states, onboarding, data visualization, and product-focused creative motion.

### Does Motion Guide support accessibility and reduced motion?

Yes. Its decision and implementation guidance includes accessibility checks and reduced-motion behavior alongside performance and dependency constraints.

### Can it recommend not animating something?

Yes. It can recommend no motion when animation would create delay, distraction, false progress, accessibility risk, or user confusion.

### Is the hosted Motion Guide website part of this repository?

No. This public repository contains the installable skill package. The hosted companion website and its application source are maintained separately.

## License

MIT. See [LICENSE](LICENSE).
