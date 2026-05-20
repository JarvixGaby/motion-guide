# Creative Motion Pack Reference

Use this reference when Creative Motion Mode is active: the user explicitly asks for 2D/3D/WebGL/shader/particle motion, or the product context is a brand-forward landing page, portfolio, marketing hero, product showcase, storytelling experience, or AI/system visualization.

Creative Motion Pack is additive, but it still obeys Motion Guide's decision gate. Do not generate effects as decoration alone. Every recommendation must include product intent, when-not-to-use guidance, performance budget, accessibility constraints, and a reduced-motion fallback.

## Agent Decision Flow

1. Confirm Creative Mode is justified by user request or product context.
2. Choose the simplest technique that expresses the intent: CSS/SVG before Canvas, Canvas before WebGL, WebGL/three.js only when depth, shaders, or many particles are core to the experience.
3. Name the selected pattern slug and the product intent it serves.
4. State at least one alternative or no-motion/lighter-motion option.
5. Include reduced-motion and low-end-device fallback.
6. Keep critical content available without motion.

## Patterns

### 3D Product Showcase

#### `floating-product-object`

**Intent:** Make a product artifact tangible in a hero or showcase.

**Use for:** SaaS/product heroes, AI tool landing pages, device or dashboard mockups, launch pages, portfolio case studies.

**Avoid when:** The product has no meaningful object to show; the page is documentation, checkout, admin, or mobile-first content where the object delays reading.

**Technique fit:** CSS 3D for simple panels; three.js/React Three Fiber for true geometry, lighting, and camera depth; pre-rendered image/video for safer fallback.

**Performance:** Target 60fps, low-poly geometry, capped device pixel ratio, lazy-loaded scene, static poster before hydration.

**Accessibility:** Keep copy/CTA independent of the object. Do not convey essential value only through rotation.

**Reduced motion:** Static product image or one short opacity/scale reveal.

**Prompt cue:** “Use `floating-product-object` only if the product artifact is recognizable; include static poster and mobile fallback.”

#### `interactive-3d-card-stack`

**Intent:** Add spatial browsing to a small set of cards without hiding their meaning.

**Use for:** Portfolio cards, case studies, feature collections, templates, curated examples.

**Avoid when:** Users need fast comparison across many items, cards contain dense copy, or hover/tilt destabilizes hit targets.

**Technique fit:** CSS transform/perspective for most cases; R3F only for real depth/camera behavior.

**Performance:** Transform/opacity only, limited shadows/blur, active-card cap, no heavy per-card loops.

**Accessibility:** Preserve linear DOM/focus order and stable keyboard states.

**Reduced motion:** Static layered cards with focus/selected states.

**Prompt cue:** “Use depth to clarify grouping; never make card reading depend on tilt.”

#### `orbital-feature-system`

**Intent:** Show multiple capabilities connected to a central platform, product, agent, or idea.

**Use for:** AI platforms, developer tools, automation suites, ecosystem overviews, feature hero sections.

**Avoid when:** There are too many nodes, labels need immediate reading, or orbit implies false relationships.

**Technique fit:** CSS/SVG for 4-8 nodes; Canvas/three.js for larger or spatial systems.

**Performance:** Slow constant speed, one shared animation clock, pause offscreen, static mobile fallback.

**Accessibility:** Provide equivalent static feature list.

**Reduced motion:** Static radial layout or feature grid.

**Prompt cue:** “Explain what the center represents and why each orbiting item belongs there.”

### Shader / Atmosphere

#### `aurora-shader-background`

**Intent:** Create calm, premium, futuristic atmosphere behind a brand or hero section.

**Use for:** AI/creative tools, premium SaaS, launch pages, immersive brand moments.

**Avoid when:** It sits behind long text, dense controls, dashboards, financial/medical data, or low-contrast content.

**Technique fit:** CSS gradients for simple atmosphere; WebGL fragment shader for richer procedural fields.

**Performance:** Low opacity, reduced resolution, capped frame rate, pause hidden/offscreen, no high-frequency flashing.

**Accessibility:** Text contrast must pass without depending on the shader color at any frame.

**Reduced motion:** Static gradient image or blurred color field.

**Prompt cue:** “Keep aurora subordinate to the content and provide static gradient fallback.”

#### `morphing-gradient-blob`

**Intent:** Add organic brand warmth or state ambience with a lightweight 2D accent.

**Use for:** Onboarding, empty states, hero accents, education, creator tools, gentle AI states.

**Avoid when:** It crosses text/controls, competes with CTA, or creates animated blur on low-end devices.

**Technique fit:** CSS border-radius/transform, SVG filters, Canvas, or light shader.

**Performance:** Prefer transform and color interpolation; avoid large animated blur/filter stacks.

**Accessibility:** Decorative only unless paired with explicit text.

**Reduced motion:** Static blob or fixed gradient accent.

**Prompt cue:** “Use slow breathing motion; do not let the blob become the interface.”

#### `particle-network-field`

**Intent:** Suggest networks, collaboration, distributed systems, or intelligence through connected points.

**Use for:** AI agents, collaboration, security/network, infrastructure, knowledge products.

**Avoid when:** It is generic tech wallpaper, particle count is high on mobile, or relationships are not part of the product story.

**Technique fit:** Canvas for most fields; WebGL for large particle counts.

**Performance:** Device-based particle cap, throttled pointer interaction, offscreen pause, no layout work in animation loop.

**Accessibility:** No content or navigation should depend on moving nodes.

**Reduced motion:** Static constellation/network illustration.

**Prompt cue:** “Tie nodes to a real product metaphor such as agents, users, files, or services.”

### Data / System Visualization

#### `data-stream-tunnel`

**Intent:** Express directional data movement, ingestion, telemetry, retrieval, or transformation.

**Use for:** Data platforms, observability, AI retrieval, ETL, build/deploy systems, real-time analytics storytelling.

**Avoid when:** The product has no flow/pipeline concept or motion implies real-time guarantees that do not exist.

**Technique fit:** SVG/CSS for simple arrows/lanes; Canvas/WebGL/three.js for depth and volume.

**Performance:** Capped particles, instancing for WebGL, reduced mobile resolution, no fullscreen high-density loops.

**Accessibility:** Pair with labels explaining source, transformation, and destination.

**Reduced motion:** Static pipeline diagram with directional arrows.

**Prompt cue:** “Make the flow legible before making it cinematic.”

#### `animated-knowledge-graph`

**Intent:** Reveal relationships between documents, concepts, agents, recommendations, or entities.

**Use for:** Knowledge bases, AI memory, research tools, recommendation systems, entity graphs, planning maps.

**Avoid when:** A simple list is clearer, relationships are fabricated, or graph motion keeps running after comprehension.

**Technique fit:** SVG/Canvas for moderate graphs; WebGL for large graphs.

**Performance:** Stabilize layout before reveal, limit animated nodes, pause physics after settling.

**Accessibility:** Provide list/table alternative and keyboard-accessible node details.

**Reduced motion:** Static graph snapshot or expandable relationship list.

**Prompt cue:** “Animate reveal and focus transitions; avoid perpetual graph jitter.”

#### `tool-call-timeline`

**Intent:** Make AI agent, automation, build, or diagnostic steps understandable as truthful sequential activity.

**Use for:** AI assistants, CI/build pipelines, workflow automation, diagnostic tools, deployment/status screens.

**Avoid when:** Operations are private, unobservable, instant, or would expose sensitive internal data.

**Technique fit:** CSS/Framer Motion/SVG; Canvas only for dense traces.

**Performance:** Animate state changes only; avoid loops for completed work.

**Accessibility:** Use semantic status text, careful live regions, and timestamps where useful.

**Reduced motion:** Instant step-state changes with icons and status copy.

**Prompt cue:** “Prefer accountable step states over decorative thinking animation.”

### Kinetic Typography

#### `svg-path-drawing`

**Intent:** Reveal a meaningful line: logo, signature, route, diagram, path, or process.

**Use for:** Brand intros, map/path explanation, education, editorial storytelling, diagram reveals.

**Avoid when:** Text must be read immediately, the path is decorative only, or the SVG is too complex.

**Technique fit:** SVG stroke-dasharray/dashoffset with CSS or Framer Motion.

**Performance:** Keep paths simple; run once; avoid huge SVG filters.

**Accessibility:** Provide final state and text alternative for meaningful diagrams.

**Reduced motion:** Render completed path immediately.

**Prompt cue:** “Use only when the drawing process communicates construction, route, or authorship.”

#### `kinetic-headline-reveal`

**Intent:** Give one primary message a launch/editorial moment.

**Use for:** Campaign hero, launch page, portfolio intro, product story chapter, editorial feature.

**Avoid when:** Users need immediate reading, the page is documentation/admin/forms, or every heading would animate.

**Technique fit:** CSS, Framer Motion, GSAP, or SVG text.

**Performance:** One headline, short duration, avoid per-letter blur/filter cost.

**Accessibility:** Text must exist in DOM and be readable without animation.

**Reduced motion:** Static headline or simple opacity reveal.

**Prompt cue:** “Animate hierarchy and emphasis, not every character by default.”

### AI / Tech Expression

#### `ai-thinking-orb`

**Intent:** Communicate AI presence, listening, processing, reasoning, or generation as ambient state.

**Use for:** AI assistants, voice interfaces, agent dashboards, model generation screens, creative tools.

**Avoid when:** Precise progress, errors, or tool-call accountability are needed; avoid implying sentience or false capability.

**Technique fit:** CSS/SVG for simple orbs; Canvas/WebGL for audio-reactive or particle forms.

**Performance:** Lightweight loop, pause inactive/offscreen, avoid high-frequency blur/noise.

**Accessibility:** Pair with truthful text such as “Searching docs” or “Generating draft.”

**Reduced motion:** Static orb plus status text or subtle opacity state.

**Prompt cue:** “Use orb for ambient state; use `tool-call-timeline` for accountable work.”

## Output Template

```markdown
### Motion Decision
- Mode: Creative Motion
- Pattern: `<slug>`
- Product intent: ...
- Why this fits: ...
- Avoid / downgrade if: ...

### Implementation Constraints
- Technique family: CSS/SVG/Canvas/WebGL/three.js/R3F
- Performance budget: target 60fps; low-end fallback: ...
- Accessibility: ...
- Reduced motion: ...
- Alternative: ...
```
