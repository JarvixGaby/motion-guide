# Creative Motion Pack

Creative Motion Pack extends Motion Guide beyond practical UI motion into additive 2D, 3D, WebGL, shader, and generative motion patterns. It is for moments where motion is part of product communication, not just interface feedback.

The pack does **not** turn Motion Guide into a component library or visual effects gallery. Each pattern remains a decision tool: what product intent it serves, when to avoid it, what constraints apply, and how an AI coding agent should scope implementation.

## When To Use Creative Mode vs Practical Mode

| Situation | Use Practical Motion | Use Creative Motion |
|---|---|---|
| Forms, checkout, admin, dense dashboards | Yes | Usually no |
| Loading, feedback, validation, navigation | Yes | Only if brand/story is explicit |
| Landing hero, portfolio, product showcase | Sometimes | Yes, if motion clarifies the story |
| AI/agent/status visualization | Yes for simple states | Yes for expressive system metaphors |
| Data/system explanation | Yes for charts/timelines | Yes for graphs, flows, spatial storytelling |

Use Creative Mode when the product goal is brand expression, storytelling, atmosphere, product explanation, or memorable showcase. Keep Practical Mode as the default for task-heavy interfaces.

## Creative Pattern Specifications

### 3D Product Showcase

#### Floating Product Object (`floating-product-object`)

A floating product object is a 3D or pseudo-3D hero artifact: device mockup, dashboard panel, model object, app window, package, or product surface that slowly rotates or drifts. Use it when the product has a recognizable visual object and the hero needs to make the product tangible.

**Product contexts:** SaaS hero, AI tool landing, portfolio case study, launch page, hardware/software showcase.

**When not to use:** Avoid abstract spinning cubes when the product has no object to show. Avoid on dense documentation pages, checkout flows, admin pages, or mobile pages where it delays content.

**Technical requirements:** three.js, React Three Fiber, CSS 3D, or pre-rendered video depending on complexity.

**Performance:** Target 60fps. Keep geometry simple, cap pixel ratio on mobile, lazy-load the scene, and provide a static poster fallback.

**Accessibility:** Do not encode critical product meaning only in rotation. Keep copy and CTA readable.

**Reduced-motion fallback:** Static product image or one non-looping fade/scale reveal.

**Implementation guidance:** Start with a still product artifact; add shallow rotation only if it reinforces materiality.

#### Interactive 3D Card Stack (`interactive-3d-card-stack`)

An interactive 3D card stack uses layered depth, hover tilt, drag, or scroll movement to show a group of features, templates, examples, or portfolio items. It adds spatial browsing while preserving scannability.

**Product contexts:** portfolio grids, case studies, template galleries, product feature sets, pricing/plan comparison highlights.

**When not to use:** Avoid when users need quick comparison across many items, when cards contain dense text, or when hover/tilt makes hit targets unstable.

**Technical requirements:** CSS transforms for light stacks; React Three Fiber only when real depth, lighting, or camera movement is necessary.

**Performance:** Prefer transform/opacity. Limit active cards, avoid expensive shadows/blur, and disable depth effects on low-end devices.

**Accessibility:** Keep keyboard focus order linear. Do not move focused elements away from the pointer or screen-reader order.

**Reduced-motion fallback:** Static layered cards with a simple focus outline or instant selected state.

**Implementation guidance:** Use depth to clarify grouping, not to hide information.

#### Orbital Feature System (`orbital-feature-system`)

An orbital feature system places feature nodes, icons, or modules around a central product concept. It suggests platform breadth, ecosystem, agent orchestration, or multiple capabilities connected to one core.

**Product contexts:** AI platforms, developer tools, automation suites, ecosystem pages, feature overview sections.

**When not to use:** Avoid when feature labels must be read quickly, when there are more than 6-8 nodes, or when orbiting implies relationships that do not exist.

**Technical requirements:** CSS/SVG for simple orbits; Canvas/three.js for many nodes or depth.

**Performance:** Keep orbit speed slow and constant. Pause offscreen. Avoid many independent timers.

**Accessibility:** Provide a static feature list with the same content. Do not rely on orbit position for meaning.

**Reduced-motion fallback:** Static radial layout or grouped feature grid.

**Implementation guidance:** Treat orbit as a storytelling overview, then give users static detail below.

### Shader / Atmosphere

#### Aurora Shader Background (`aurora-shader-background`)

An aurora shader background is a soft animated gradient field that creates premium, calm, or futuristic atmosphere behind a hero or brand section. It should support mood while staying behind the content hierarchy.

**Product contexts:** AI tools, creative software, premium SaaS, launch pages, brand moments.

**When not to use:** Avoid behind long text, dense controls, financial/medical dashboards, or any page where contrast and reading speed matter more than atmosphere.

**Technical requirements:** CSS gradients for simple versions; WebGL fragment shader for high-quality procedural motion.

**Performance:** Keep opacity low, reduce resolution, cap frame rate or pause when hidden, and avoid fullscreen high-frequency noise.

**Accessibility:** Maintain text contrast independently of the shader. Avoid rapid hue shifts and flashing.

**Reduced-motion fallback:** Static gradient image or single blurred color field.

**Implementation guidance:** Use the aurora as a restrained background layer, not the main content.

#### Morphing Gradient Blob (`morphing-gradient-blob`)

A morphing gradient blob is an organic 2D shape that shifts color, scale, or contour to add warmth and identity. It is lighter than a full shader scene and works well as a supporting accent.

**Product contexts:** onboarding, empty states, hero accent, AI thinking atmosphere, educational or creator products.

**When not to use:** Avoid when blob movement competes with form fields, charts, code blocks, or primary CTA reading.

**Technical requirements:** CSS border-radius animation, SVG filters, Canvas, or lightweight shader.

**Performance:** Prefer CSS transform/filter limits; avoid large animated blurs on low-end devices.

**Accessibility:** Keep it decorative and hidden from assistive tech if it carries no content.

**Reduced-motion fallback:** Static blob or fixed gradient accent.

**Implementation guidance:** Use slow breathing motion; do not let the blob cross text or controls.

#### Particle Network Field (`particle-network-field`)

A particle network field uses connected points to suggest collaboration, intelligence, distributed systems, or data relationships. It can be ambient or interactive, but should remain subtle.

**Product contexts:** AI agents, network/security products, collaboration tools, infrastructure platforms, knowledge systems.

**When not to use:** Avoid as a generic tech background with no connection to the product story. Avoid high particle counts on mobile.

**Technical requirements:** Canvas for most cases; WebGL when particle count or effects require GPU acceleration.

**Performance:** Cap particles by viewport/device, throttle pointer interactions, pause offscreen, and avoid continuous layout work.

**Accessibility:** Do not make links/content depend on moving nodes. Avoid flashing connections.

**Reduced-motion fallback:** Static constellation or low-opacity network illustration.

**Implementation guidance:** Tie node behavior to a product metaphor such as agents, documents, or users.

### Data / System Visualization

#### Data Stream Tunnel (`data-stream-tunnel`)

A data stream tunnel shows directional flow through space: particles, lines, or panels moving from source to destination. It communicates ingestion, pipelines, telemetry, search, or transformation.

**Product contexts:** data platforms, observability, AI retrieval, ETL, build/deploy systems, real-time analytics.

**When not to use:** Avoid if the product does not process flows, or if movement implies real-time guarantees the product cannot provide.

**Technical requirements:** CSS/SVG for simple flows; Canvas/WebGL/three.js for depth and particle density.

**Performance:** Use capped particle counts, instancing for WebGL, and reduced resolution on mobile.

**Accessibility:** Pair with labels or copy explaining what flows from where to where.

**Reduced-motion fallback:** Static pipeline diagram with directional arrows.

**Implementation guidance:** Make direction and transformation legible before making it cinematic.

#### Animated Knowledge Graph (`animated-knowledge-graph`)

An animated knowledge graph reveals nodes and links to explain relationships among documents, concepts, users, agents, or recommendations. It is most useful when relationships are the product value.

**Product contexts:** knowledge bases, AI memory, recommendation systems, research tools, entity graphs, agent planning.

**When not to use:** Avoid for small lists, pure decoration, or graphs whose structure is fabricated and might mislead users.

**Technical requirements:** SVG or Canvas for moderate graphs; WebGL for large node counts.

**Performance:** Limit animated nodes, stabilize layout before reveal, pause physics after settling.

**Accessibility:** Provide an equivalent list/table summary and keyboard-accessible node details.

**Reduced-motion fallback:** Static graph snapshot or expandable relationship list.

**Implementation guidance:** Animate to reveal relationships, not to keep the graph in perpetual motion.

#### Tool Call Timeline (`tool-call-timeline`)

A tool call timeline visualizes sequential operations: search, read, transform, validate, write, deploy, or review. It makes agent and automation activity understandable without pretending to reveal hidden reasoning.

**Product contexts:** AI agents, build pipelines, diagnostic tools, workflow automation, assistant products.

**When not to use:** Avoid when operations are instant, private, security-sensitive, or not actually observable.

**Technical requirements:** CSS/Framer Motion/SVG are usually enough; Canvas only for dense traces.

**Performance:** Animate only state changes. Avoid looping loaders for completed steps.

**Accessibility:** Use semantic status text and live-region discipline for important updates.

**Reduced-motion fallback:** Instant step-state changes with icons and timestamps.

**Implementation guidance:** Prefer truthful discrete states over decorative “thinking” loops.

### Kinetic Typography

#### SVG Path Drawing (`svg-path-drawing`)

SVG path drawing reveals a logo, signature, diagram, map route, or process line by animating stroke progress. It works when the line itself communicates construction, journey, or authorship.

**Product contexts:** brand intro, route/path explanation, diagram reveal, education, editorial storytelling.

**When not to use:** Avoid for long body text, important instructions, or logos that must appear instantly for recognition.

**Technical requirements:** SVG stroke-dasharray/stroke-dashoffset, CSS, or Framer Motion.

**Performance:** Keep paths simple, avoid huge SVGs, and run once rather than looping.

**Accessibility:** Provide final visible state and text alternative for meaningful diagrams.

**Reduced-motion fallback:** Render the completed path immediately.

**Implementation guidance:** Use it as a reveal of a meaningful line, not a default text animation.

#### Kinetic Headline Reveal (`kinetic-headline-reveal`)

A kinetic headline reveal animates words or letters to create a launch, editorial, or campaign moment. It should amplify a single primary message rather than decorate every heading.

**Product contexts:** launch hero, campaign page, portfolio intro, product story chapter, editorial feature.

**When not to use:** Avoid in dense SaaS dashboards, documentation, forms, or pages where users need immediate text access.

**Technical requirements:** CSS, Framer Motion, GSAP, or SVG text depending on typographic complexity.

**Performance:** Limit to one headline, keep duration under about 900ms, and avoid expensive blur per letter.

**Accessibility:** Ensure text exists in DOM and is readable without animation.

**Reduced-motion fallback:** Static headline or simple opacity reveal.

**Implementation guidance:** Animate the message hierarchy, not every character just because it is possible.

### AI / Tech Expression

#### AI Thinking Orb (`ai-thinking-orb`)

An AI thinking orb is an abstract status object that pulses, breathes, morphs, or responds to audio/tool activity. It communicates processing, listening, generating, or system presence in an AI product.

**Product contexts:** AI assistant, voice interface, agent dashboard, model generation screen, creative tool.

**When not to use:** Avoid as a replacement for precise progress, errors, or tool-call states. Avoid if it implies sentience or capability the product does not have.

**Technical requirements:** CSS/SVG for simple orbs; Canvas/WebGL for audio-reactive or particle-based forms.

**Performance:** Keep loops lightweight, pause when inactive, and avoid high-frequency blur/noise.

**Accessibility:** Pair with truthful status text such as “Searching docs” or “Generating draft”.

**Reduced-motion fallback:** Static orb plus text state or subtle opacity change.

**Implementation guidance:** Use the orb for ambient state; use timelines or progress for accountable work.

## Creative Motion Risks

- **Effect-gallery drift:** adding visual effects because they are impressive rather than because they support product intent.
- **Performance debt:** large shaders, high particle counts, animated blur, or unpaused loops.
- **Readability loss:** motion behind text or controls that reduces contrast and attention.
- **Misleading metaphor:** graphs, orbits, and flows that imply false relationships or capabilities.
- **Accessibility gaps:** vestibular-sensitive movement, no reduced-motion fallback, or motion-only meaning.

## Framework Recommendations

- **CSS / SVG:** First choice for kinetic typography, simple blobs, path drawing, and lightweight cards.
- **Framer Motion / GSAP:** Good for sequenced UI reveals and scroll/storytelling choreography.
- **Canvas:** Good for particle networks, moderate graph animation, and lightweight generative visuals.
- **three.js / React Three Fiber:** Use for real 3D product objects, camera movement, lighting, and spatial scenes.
- **WebGL shaders:** Reserve for atmosphere or effects where CSS/Canvas cannot achieve the visual quality within budget.

Always start with the simplest technique that can express the product intent, then escalate to 3D/WebGL only when depth, particles, or shader qualities are core to the experience.
