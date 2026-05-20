# Motion Guide Design Language

This document defines the intended visual and interaction language for the next Motion Guide interface. It should guide page redesigns, component decisions, and content density.

## Product Position

Motion Guide is not a marketing site and not a generic component gallery. It is a motion decision workspace: users come to identify an animation pattern, compare nearby options, and copy a useful implementation prompt.

The interface should feel like an index, studio wall, and product tool at the same time:

- indexed, because the user is searching a structured glossary;
- visual, because motion samples must carry the experience;
- quiet, because developers need to scan and decide quickly;
- sharp, because the brand should feel opinionated instead of flat.

## Design Theme

Working theme: **Motion Index**.

Core idea: a left-anchored motion reference desk with a sample wall. The page should feel less like a blog and more like a professional catalog of moving UI behaviors.

Do:

- Use strong left-side structure and generous left margin.
- Let animated samples become the primary visual material.
- Keep page copy short and functional.
- Prefer index labels, counters, lanes, and compact metadata.
- Use high contrast between motion samples and surrounding UI.

Avoid:

- Long explanatory paragraphs on overview pages.
- Centered marketing-page composition.
- Card grids where every card reads as an article.
- Decorative gradients that are not attached to actual motion samples.
- UI that relies on text to explain what the user should notice.

## Layout System

Primary desktop layout:

- Top nav stays minimal and shallow.
- Main pages use a left-side rail or strong left gutter.
- Content starts around 96-160px from the left edge on desktop.
- Important pages can use a two-zone layout:
  - left: index/navigation/context;
  - right: sample wall, decision panels, or selected detail.

Responsive behavior:

- On mobile, collapse the rail into a compact top section.
- Keep motion samples visible above long text.
- Avoid horizontal overflow from large display type.

Spacing rules:

- Never let content or rail text touch the browser edge.
- Cards and panels must have visible internal padding.
- Use page sections as full-width bands or clear columns; do not nest cards inside cards.
- Keep repeated item cards at 6-8px radius unless a component has a functional reason to be round.

Implementation note:

- Do not use a global `* { padding: 0; margin: 0; }` reset outside Tailwind/base layers if it overrides Tailwind utilities. This currently breaks card padding and makes pages look like raw text.

## Visual Style

Base direction:

- Editorial, technical, index-like.
- Restrained surfaces with one strong accent.
- Dark motion sample areas are acceptable, even if the surrounding app is light.

Recommended palette:

- Warm paper background: `#fffaf2` / `#fafafa`.
- Ink: `#1c1917` / near black.
- Muted text: stone gray scale.
- Primary accent: amber `#f59e0b`.
- Sample stage: near black `#11100e` / zinc-950.

Color usage:

- Amber should mark active motion, focus, or key brand moments.
- Do not flood the entire page with amber.
- Deep dark surfaces should frame motion previews, not large text-only areas.
- Avoid one-note beige pages; pair warm paper with black sample stages or crisp structural lines.

Texture:

- Subtle grid lines can support the index/workbench feeling.
- Grid must stay quiet enough that text remains readable.
- Avoid floating orbs, bokeh, decorative blobs, or purely atmospheric backgrounds.

## Typography

Use type as structure, not decoration.

Display:

- Large, short, confident phrases.
- Good examples: `Motion Guide`, `Name the motion`, `Choose by situation`.
- Avoid long hero sentences.

Body:

- Keep overview pages terse.
- Detail pages can contain guidance, but should be chunked into decision panels.
- Prefer labels and compact metadata for category, difficulty, timing, and risk.

Rules:

- Letter spacing should be 0 for large display text.
- Mono uppercase labels can use wide tracking, but only for short labels.
- Do not scale font size directly with viewport width.
- Text inside cards must not collide with borders or adjacent content.

## Motion Sample Presentation

Motion samples are the hero asset.

Sample cards should include:

- a dark or clearly bounded preview stage;
- one visible motion behavior;
- a compact label/category;
- one-line decision note or no body text;
- clear click target to the entry.

Sample cards should not:

- depend on long descriptions to communicate value;
- hide the animation in a tiny area;
- use demo components on backgrounds where they become invisible;
- resize when animation state changes.

When reusing existing demo components:

- Check contrast on the sample stage.
- Check that internal absolute positioning still works.
- Prefer dedicated preview variants when the full demo was designed for another background.

## Page Patterns

### Home

Goal: make the glossary feel visually distinct within 5 seconds.

Recommended structure:

- left rail or strong left gutter;
- short brand statement;
- search/filter as a command surface;
- motion sample wall;
- categories as lanes, not prose sections.

Keep:

- entry discovery;
- search;
- category/page/use-case filtering.

Reduce:

- explanatory hero copy;
- repeated descriptions in the grid;
- large centered empty space.

### Choose by Situation

Current issue: it reads like text cards.

Target pattern:

- scenario selector on the left;
- recommended motion chain on the right;
- each recommendation shown as visual step cards;
- short rationale and avoid note.

The user should feel they are choosing a workflow, not reading a document.

### Guides

Current issue: comparisons, recipes, and anti-patterns all look the same.

Target pattern:

- comparisons as side-by-side matrices;
- recipes as sequence/timeline cards;
- anti-patterns as warning panels with better alternatives;
- fewer paragraphs, more structured contrast.

### Entry Detail

Current issue: it behaves like documentation after the demo.

Target pattern:

- large preview stage first;
- decision summary near the demo;
- timing/easing/risk as compact tokens;
- prompts and code lower on the page;
- related alternatives visible near the decision area.

The entry page should answer: "Should I use this?" before "How do I implement this?"

## Interaction Principles

- Navigation should be predictable and quiet.
- Hover states should reveal affordance without moving layout.
- Motion should preview the pattern, not decorate the chrome.
- Search and filters must feel like tools, not form fields.
- Copy actions need immediate local feedback.
- Respect reduced motion for large or looping effects.

## Accessibility And Ergonomics

- Preserve keyboard navigation for search, filters, links, and tabs.
- Maintain visible focus states.
- Ensure text contrast on dark sample stages.
- Do not rely on motion alone to communicate state.
- Provide reduced-motion fallbacks for large page transitions, parallax, shimmer, or looping effects.

## Current Problems To Fix Before Redesign

- Global reset overrides Tailwind padding utilities, making panels look like raw text.
- Current pages mix two languages: light editorial pages and a dark concept page.
- Overview pages still have too much prose and too little visual hierarchy.
- Detail pages are too document-like for a motion-first product.
- Reusing full demo components in new dark cards can make animations invisible.
- `Choose` and `Guides` need distinct interaction patterns instead of identical card grids.

## Design Decision For Next Iteration

Use `/concept` as the exploratory direction, but do not copy it directly into production. It proves the stronger brand language: dark sample stages, left index structure, short labels, and motion-first cards. The production redesign should merge that strength with the current app's real search, filters, and content model.
