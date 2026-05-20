# Motion Guide Content Model

Each animation entry should help a developer make a decision, not only recognize an effect.

## Required Entry Fields

- `slug`: stable URL identifier.
- `nameEn`: user-facing motion name.
- `aliasesEn`: search terms and alternate names.
- `category`: one value from `data/taxonomies.ts`.
- `difficulty`: `paste_go`, `needs_tweaking`, or `custom_build`.
- `mediaTier`: `1`, `2`, or `3`.
- `description`: plain-language explanation of what the motion does.
- `whenToUse`: concrete use cases.
- `whenNotToUse`: concrete anti-patterns.
- `seenIn`: real products or product categories where the pattern is recognizable.
- `pageTypes` and `useCases`: taxonomy-backed discovery metadata.
- `promptV0`, `promptCursor`, `promptCSS`: prompt templates currently displayed as Quick Prompt, Production Prompt, and Tuning Prompt.
- `codeTailwind`: implementation-oriented snippet.
- `relatedSlugs`: related entries that exist in the data set.

## Decision Guidance Fields

Use these fields for high-value entries and add them gradually across the catalog.

- `bestFor`: the primary product situation where this motion is the right default.
- `avoidWhen`: the clearest reason not to use it.
- `durationGuidance`: practical timing range and visibility threshold.
- `easingGuidance`: recommended easing behavior.
- `motionRisk`: risk tags such as `feels_slow`, `distraction`, `overdesigned`, `accessibility_sensitive`, `performance_sensitive`, or `misleading_progress`.
- `alternatives`: slugs for patterns users should compare before choosing.
- `decisionNote`: one sentence that tells the user why this pattern should or should not be chosen.

## Writing Rules

- Prefer product situations over abstract phrasing.
- Include timing numbers whenever possible.
- Make anti-patterns specific enough that a developer can recognize the mistake.
- Keep prompt templates copy-ready.
- Every slug reference must point to an existing entry.
- Run `pnpm validate:data` before committing content changes.
