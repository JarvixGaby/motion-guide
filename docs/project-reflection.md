# Motion Guide - Project Reflection

> Public decision log for the product direction.
> Last updated: 2026-05-20

---

## 2026-05-20: Skill-First Public Repository

### Context

Motion Guide started as a web motion glossary, but its strongest product surface is the installable AI-agent skill. The website remains useful as a browser, demo, and documentation surface, but the repository should be organized around the skill package.

### Decision

- Position Motion Guide as a skill-first project.
- Keep `motion-guide/SKILL.md` and `motion-guide/references/` as the core distributable package.
- Keep the Next.js site as a companion demo for browsing motion patterns and explaining how the skill changes agent output.
- Avoid publishing deployment-specific configuration and one-off internal planning artifacts in the public repository.
- Support both OpenAI/Codex-style skill metadata and `npx skills` installation.

### Reasoning

AI coding agents often add motion without product intent, reduced-motion handling, or implementation restraint. Motion Guide is most useful when it becomes part of the agent workflow: deciding whether motion should exist before code is written, and constraining implementation when motion is appropriate.

### Impact

- README leads with skill installation and usage.
- `/skills` is the public demo page for the skill.
- `motion-guide/agents/openai.yaml` provides UI metadata for compatible skill surfaces.

---

## 2026-05-12: Practical And Creative Motion Modes

### Context

The project needs to support both practical product UI motion and more expressive motion for product storytelling, launch pages, and system visualization.

### Decision

Motion Guide uses two modes:

- **Practical Motion Mode**: the default mode for product UI, dashboards, forms, checkout, admin tools, and routine workflows.
- **Creative Motion Mode**: an opt-in mode for brand-forward, immersive, 2D, 3D, WebGL, shader, particle, data, and system-visualization work.

### Reasoning

Practical motion should reduce confusion, clarify state, and improve feedback. Creative motion can be valuable, but only when it supports product communication and includes accessibility, performance, and reduced-motion constraints.

### Impact

- `motion-guide/SKILL.md` contains both practical and creative decision gates.
- `motion-guide/references/creative-motion-pack.md` keeps creative patterns separate from ordinary UI motion.

---

## 2026-05-08: Functional Motion Scope

### Context

Motion Guide should not become a generic effects catalog or component library.

### Decision

Every entry must map to a product function such as feedback, navigation, input, onboarding/guidance, loading/state handling, data understanding, content comprehension, attention direction, spatial orientation, or meaningful content reveal.

### Reasoning

A motion pattern is useful only when an agent can explain where it helps, when it harms, and how to implement it safely.

### Impact

- Entries include when-to-use, when-not-to-use, risks, alternatives, accessibility notes, reduced-motion behavior, and implementation prompts.
- Pure atmosphere and visual gimmicks remain out of scope unless tied to a concrete product communication goal.
