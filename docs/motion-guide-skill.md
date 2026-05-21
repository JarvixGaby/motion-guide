# Motion Guide Skill

`motion-guide` is the installable skill package in this repository. It is the primary product surface; the website is a companion browser and demo.

## Install Paths

### `npx skills`

```bash
npx skills add JarvixGaby/motion-guide-skill
```

Install only for Codex:

```bash
npx skills add JarvixGaby/motion-guide-skill -a codex
```

### Codex

```bash
mkdir -p ~/.codex/skills
ln -s "$PWD/motion-guide" ~/.codex/skills/motion-guide
```

Start a new session after installing so the skill loader can discover it.

### Other Markdown Skill Runtimes

Copy the `motion-guide/` folder into the runtime's skills directory. Keep `SKILL.md`, `agents/openai.yaml`, and `references/` together.

## Package Shape

```txt
motion-guide/
  SKILL.md
  agents/openai.yaml
  references/
    motion-database.md
    creative-motion-pack.md
```

## Expected Agent Behavior

When active, the skill should help an agent preserve:

1. `use motion`, `reduce motion`, or `no motion`.
2. Selected Motion Guide pattern slug, or a reason no pattern applies.
3. Product reason for the motion, not just the visual style.
4. Concrete when-not-to-use warnings.
5. Duration, easing, accessibility, reduced-motion, focus/screen-reader behavior, and performance constraints.
6. Manual or automated verification notes.

## Ecosystem Strategy

Motion Guide can be published into two compatible ecosystems:

- **OpenAI/Codex-style skills**: keep `SKILL.md` concise, maintain `agents/openai.yaml`, and keep detailed references in `references/`.
- **skills.sh / `npx skills`**: keep `motion-guide/` as a top-level skill folder with a valid `SKILL.md`, then publish the repository publicly so users can install by owner/repo.

For discoverability, use GitHub topics such as `agent-skills`, `codex-skills`, `claude-skills`, `frontend`, `ui-motion`, `animation`, and `accessibility`.
