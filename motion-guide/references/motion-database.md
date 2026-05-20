# Motion Pattern Database

Reference for Motion Guide's 114 UI animation patterns, generated from the current website glossary data and organized by category for agent use.

Source of truth: `app/data/entries.ts` and `app/data/guides.ts`. When website data changes, regenerate or update this reference together with `motion-guide/SKILL.md`.

## Table of Contents

- [Waiting & Loading](#waiting-loading) (15 patterns)
- [Action Feedback](#action-feedback) (20 patterns)
- [Page & View Transitions](#page-view-transitions) (16 patterns)
- [Empty & Error States](#empty-error-states) (9 patterns)
- [Status & Confirmation](#status-confirmation) (10 patterns)
- [Data & Content Visualization](#data-content-visualization) (12 patterns)
- [Scroll & Navigation](#scroll-navigation) (13 patterns)
- [Onboarding & Tours](#onboarding-tours) (7 patterns)
- [Creative Motion](#creative-motion) (12 patterns)

## How To Use This Reference

1. Start with the product situation, not the visual effect.
2. Compare alternatives before selecting a pattern.
3. Use `When not to use`, `Risks`, and `Decision note` to decide whether to reduce or reject motion.
4. Use the implementation prompts/snippets in `app/data/entries.ts` when code-level detail is required; this reference stays compact for agent selection.

## Evaluation-Backed Decision Rules

Motion Guide's largest practical improvements come from pattern mapping, accessibility/reduced-motion coverage, and implementation readiness. Apply these reusable rules across the database:

| Situation | Prefer | Avoid |
|---|---|---|
| Unmeasurable progress | `indeterminate-progress-bar`, staged status text, `button-loading-state` | Fake deterministic progress bars |
| Pending payment or async authorization | Calm loading/status feedback | Confetti, bounce, or celebration before true completion |
| AI/tool activity | `tool-call-timeline` primary, `ai-thinking-orb` ambient only | Abstract thinking motion as the only status |
| Explanation needed | `popover-coach-step` | Attention-only outlines or focus rings |
| Dense enterprise/ops surfaces | Stable indicators, subtle non-spatial fades | Bounce, gooey nav, all-card 3D, dramatic route transitions |
| Repeated large-list filtering | Instant update or group-level fade | Per-item stagger across many results |
| Routine analytics | Selective `line-chart-draw`, `chart-bar-growth`, `pie-chart-reveal` when meaningful | Dramatic chart animation on every visit |
| Long-form mobile reading | `scroll-progress-bar`, mostly static supporting art | Multiple parallax layers competing with text |
| Simple press feedback | CSS transform/opacity | Adding a motion library for a trivial effect |
| Frequent route transitions | Opacity-only fade, hard reduced-motion bypass | Blur, large `x/y` travel, delayed navigation |
| Large/filterable grids | First-load-only capped reveal, immediate filtering | Container-wide stagger replayed across all results |
| Coach/tour implementation | Labelled/described popover semantics and focus-safe demo controls | Flattening explanatory coach UI into a single decorative image |

## Category Overview

| Category | Count | Common decision use |
|---|---:|---|
| Waiting & Loading | 15 | Waiting, progress, background work, perceived performance |
| Action Feedback | 20 | Buttons, forms, press states, direct manipulation feedback |
| Page & View Transitions | 16 | Navigation, route changes, modal/surface transitions, continuity |
| Empty & Error States | 9 | No data, validation, offline/error recovery and attention |
| Status & Confirmation | 10 | Success, notifications, ongoing status and alerts |
| Data & Content Visualization | 12 | Charts, counters, timelines, comprehension and reveal |
| Scroll & Navigation | 13 | Scrolling, sticky context, spatial movement, section progress |
| Onboarding & Tours | 7 | Guidance, first-run education, next-step emphasis |
| Creative Motion | 12 | Brand-forward, storytelling, 2D/3D/WebGL, AI/system visualization |

---

## Waiting & Loading

### `skeleton-screen` — Skeleton Screen

**Best for:** Loading predictable card, feed, table, or dashboard layouts where users benefit from seeing the shape of incoming content.

**Use when:**
- Loading content that takes 1-3 seconds (longer than a spinner feels appropriate)
- Dashboard cards, social feeds, or list views where layout is predictable
- First-time app loads where users need context about what's coming
- Mobile apps where network speed varies significantly

**When not to use:**
- Instant data fetches under 300ms (unnecessary visual noise)
- Unpredictable layouts where skeleton won't match real content
- Error states (skeleton implies success is coming)

**Timing:** Best for waits around 700ms to 3s; fade out in 250-400ms when real content appears.  
**Easing:** Use linear shimmer motion, then ease-out for the content handoff.  
**Risks:** `feels_slow`, `accessibility_sensitive`  
**Alternatives:** `spinner`, `progress-bar`, `pulse-placeholder`  
**Decision note:** Choose skeletons when layout context matters more than showing generic activity.

### `shimmer-loader` — Shimmer / Sweep Loader

**Best for:** Making an existing placeholder feel alive during medium-length content loading.

**Use when:**
- Enhancing skeleton screens to show the system is working
- Loading states longer than 1 second where a static placeholder feels dead
- Card layouts, list items, or table rows during data fetch
- When you want to indicate "processing" rather than "broken"

**When not to use:**
- Very fast loads under 500ms (shimmer may not complete a full cycle)
- When the content area is extremely narrow (shimmer won't be visible)
- Accessibility-critical contexts where animation might cause issues

**Timing:** A 1.5-2.5s sweep usually feels calm; faster cycles can make loading feel urgent.  
**Easing:** Linear or very soft ease-in-out sweeps work best because the motion is decorative and continuous.  
**Risks:** `accessibility_sensitive`, `overdesigned`  
**Alternatives:** `skeleton-screen`, `pulse-placeholder`, `indeterminate-progress-bar`  
**Decision note:** Use shimmer as an enhancer to skeletons, not as the whole loading strategy.

### `spinner` — Spinner / Loading Circle

**Best for:** Short, unknown waits where the interface cannot show layout or percentage progress.

**Use when:**
- Button loading states (disable button, show spinner inside)
- Short wait times under 2 seconds where layout isn't important
- Centered loading for full-page or modal content
- Action confirmation (e.g., "Saving..." with spinner)

**When not to use:**
- Long waits over 3 seconds (use progress bar or skeleton instead)
- When users need to understand what percentage is complete
- List or grid layouts where skeleton screen provides better context

**Timing:** Rotate in 700-1000ms per cycle; if it remains visible past 2-3s, pair it with explanatory text.  
**Easing:** Use linear rotation so the loop feels stable and does not imply progress jumps.  
**Risks:** `feels_slow`, `misleading_progress`  
**Alternatives:** `skeleton-screen`, `progress-bar`, `indeterminate-progress-bar`  
**Decision note:** Choose a spinner only when you need the smallest possible loading signal.

### `progress-bar` — Progress Bar

**Best for:** Uploads, imports, setup flows, and long tasks where the app can measure completion.

**Use when:**
- File uploads or downloads where progress is trackable
- Multi-step forms or onboarding flows ("Step 2 of 5")
- Data processing with measurable completion (e.g., import progress)
- Any wait over 3 seconds where percentage completion is known

**When not to use:**
- When you don't know actual progress (use indeterminate spinner instead)
- Very fast operations under 1 second
- When the progress is unpredictable or could move backwards

**Timing:** Animate width changes in 200-400ms; for multi-second tasks, update with real measured increments.  
**Easing:** Ease-out individual width updates, but never fake smooth motion that hides actual task state.  
**Risks:** `misleading_progress`, `feels_slow`  
**Alternatives:** `spinner`, `indeterminate-progress-bar`, `progress-ring`  
**Decision note:** Choose a progress bar when the user needs confidence about how much work remains.

### `typing-dots` — Typing Dots (AI Reply)

**Best for:** Three animated dots that pulse sequentially, indicating that an AI or person is typing a response. Creates anticipation and confirms the system is processing.

**Use when:**
- AI chat interfaces while the model generates a response
- Messaging apps to show someone is typing
- Conversational UIs where response time is 2-10 seconds
- After user submits a question and waits for an answer

**When not to use:**
- Non-conversational contexts (use spinner or progress instead)
- When response time is instant or under 1 second
- Loading large data sets (use skeleton or progress bar)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `pulse-placeholder` — Pulse Placeholder

**Best for:** A gentle fade-in-fade-out animation applied to placeholder content, creating a "breathing" effect. Softer and more subtle than shimmer.

**Use when:**
- Loading states where shimmer feels too aggressive
- Image placeholders before the real image loads
- Empty avatar circles in user lists during fetch
- Minimalist designs where subtlety is key

**When not to use:**
- When you need to convey percentage progress
- Very short loads under 500ms (pulse cycle may not complete)
- Contexts where skeleton or shimmer provides better layout context

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `blur-fade-in` — Blur Fade-in

**Best for:** Content fades in while simultaneously transitioning from blurred to sharp focus, creating a cinematic reveal effect. More sophisticated than a simple fade.

**Use when:**
- Hero images or headline text on page load
- Card content after skeleton screen completes
- Gallery images loading progressively
- When you want a premium, polished feel for content reveals

**When not to use:**
- Frequent, repetitive content updates (can feel heavy)
- Accessibility contexts where blur might cause readability issues
- Performance-constrained environments (blur is GPU-intensive)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `staggered-load` — Staggered Item Load

**Best for:** List items or grid cards appear one after another with a small delay between each, creating a cascading reveal effect. Adds rhythm and polish to content-heavy pages.

**Use when:**
- Dashboard cards that load all at once but should feel orchestrated
- Search results or filtered lists appearing on screen
- Gallery grids or product catalogs
- Feature sections on marketing pages

**When not to use:**
- More than 20-30 items (long stagger becomes annoying)
- Time-critical data where instant display is important
- Paginated content that users scroll through quickly

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `indeterminate-progress-bar` — Indeterminate Progress Bar

**Best for:** A loading bar where the indicator continually bounces back and forth or cycles infinitely, showing that a process is working but the exact completion time is unknown.

**Use when:**
- Network requests with unknown length
- Query processing in databases

**When not to use:**
- File uploads with known file sizes (use determinant progress)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `image-lazy-load-fade` — Image Lazy Load Fade

**Best for:** Images load as low-res blurs or empty blocks and gently crossfade into their full high-resolution versions instead of popping in jarringly line-by-line.

**Use when:**
- Image-heavy galleries
- E-commerce product grids

**When not to use:**
- Critical text content or SVGs that load instantly

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `content-placeholder` — Content Placeholder

**Best for:** Static, non-animated geometric shapes representing where text or images will render. Simpler than a skeleton screen, often used on lower-end devices or ultra-fast loads.

**Use when:**
- When fetch time is extremely fast but layout shift must be avoided

**When not to use:**
- Long loaders > 1s (prefer animated skeletons)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `lottie-loading-loop` — Lottie Loading Loop

**Best for:** A highly customized, vector-based animation (often exported from After Effects via Lottie) that serves as a branded loading state.

**Use when:**
- Brand-heavy landing pages
- Splash screens on app launch

**When not to use:**
- Inline buttons or dense data tables (too dominant)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `countdown-timer` — Countdown Timer

**Best for:** Numbers that accurately count down to zero, building anticipation or imposing a limit.

**Use when:**
- Event ticket reservations
- Product launch pages
- Action undo windows (e.g., "Undo in 5s")

**When not to use:**
- Processes where the exact completion time cannot be calculated

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `buffering-animation` — Buffering Animation

**Best for:** Often an overlapping circle array or a dotted spinner indicating that a media stream has paused to download more data.

**Use when:**
- Video players
- Audio players
- Live streams

**When not to use:**
- Standard API data fetching

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `skeleton-wave` — Skeleton Wave

**Best for:** Similar to a shimmer loader, but animates a soft gradient wave that sweeps diagonally across multiple skeleton blocks sequentially.

**Use when:**
- Complex dashboard layouts with many distinct sections loading at once

**When not to use:**
- Single line text loads

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

---

## Action Feedback

### `button-loading-state` — Button Loading State

**Best for:** Preventing duplicate submissions while keeping feedback anchored to the control the user clicked.

**Use when:**
- Form submissions
- Saving data
- Async actions that take >300ms

**When not to use:**
- Instant client-side actions
- Navigation links

**Timing:** Show only after roughly 250-300ms to avoid flashing on fast actions; keep width stable throughout.  
**Easing:** Use a quick ease-out opacity or icon swap; the spinner itself should rotate linearly.  
**Risks:** `feels_slow`  
**Alternatives:** `spinner`, `toast-notification`, `success-screen-transition`  
**Decision note:** Choose button loading for async actions whose feedback belongs exactly where the user acted.

### `ripple-effect` — Ripple Effect

**Best for:** A circular wave that expands from the point of contact when a user clicks or taps an element, providing immediate spatial feedback.

**Use when:**
- Text buttons and filled buttons
- List items in a mobile app
- Card surfaces that are clickable

**When not to use:**
- Small iconic buttons where the ripple obscures the icon
- Links inline within text paragraphs

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `haptic-bounce` — Haptic Bounce

**Best for:** A physical-feeling spring animation that rapidly shrinks an element on press and bounces it back on release, mimicking a tactile physical button.

**Use when:**
- Primary call-to-action buttons
- Interactive cards or app icons
- When you want the UI to feel lively and responsive

**When not to use:**
- Destructive actions
- Hyperlinks in text blocks

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `scale-on-press` — Scale on Press

**Best for:** A simpler, non-spring version of tactile feedback where an element scales down slightly and instantly when pressed.

**Use when:**
- Secondary buttons
- Icon buttons
- Interfaces where pure CSS is preferred over heavy animation libraries

**When not to use:**
- Large structural components

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `long-press-feedback` — Long Press Feedback

**Best for:** A visual indicator (like a filling ring or background) that shows the progress of a long-press action before it executes.

**Use when:**
- Destructive actions (e.g., "Hold to delete")
- Recording audio/video
- Revealing hidden secondary menus

**When not to use:**
- Standard navigation
- Primary positive actions where speed is important

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `pull-to-refresh` — Pull-to-Refresh

**Best for:** A gesture-driven reveal of a loading indicator when a user scrolls past the top edge of a content area, triggering a data refresh.

**Use when:**
- Mobile web apps or PWAs
- Feeds and lists that update frequently
- Touch-first interfaces

**When not to use:**
- Desktop-heavy interfaces (use a refresh button instead)
- Static pages

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `swipe-gesture-hint` — Swipe Gesture Hint

**Best for:** A subtle, bouncing horizontal nudge on a list item indicating that it can be swiped to reveal hidden actions (like delete or archive).

**Use when:**
- Mobile-first list views
- Email or message inboxes
- Task lists

**When not to use:**
- Desktop applications without touch support
- Items where a visible actions menu (e.g., "...") is present and sufficient

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `toggle-switch-animation` — Toggle Switch Animation

**Best for:** A sliding thumb across a pill-shaped track, communicating a change in binary state (on/off) with color transitions.

**Use when:**
- Settings and preference menus
- Enabling/disabling features

**When not to use:**
- Multi-state selections (use radio buttons or segmented controls)
- Forms requiring an explicit "Submit" button to save

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `like-heart-animation` — Like / Heart Animation

**Best for:** An expressive animation heavily scaling and expanding a heart or star icon, sometimes accompanied by mini confetti or a splash ring.

**Use when:**
- Social feeds
- Favoriting items in e-commerce
- Commenting systems

**When not to use:**
- Corporate or highly formal enterprise software
- Utility toggles

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `copy-confirmation-flash` — Copy Confirmation Flash

**Best for:** A rapid, transient background color change (usually to green or a brand color) on an element that was just copied to the clipboard, providing unmistakable visual confirmation.

**Use when:**
- Copy to clipboard code blocks
- API key fields
- Share links

**When not to use:**
- Standard text selection
- Large container elements where a full flash is overwhelming

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `drag-drop-ghost` — Drag & Drop Ghost

**Best for:** Showing that an item is actively being moved while preserving its original list position and drop target.

**Use when:**
- Kanban boards and task lanes
- Reorderable lists
- File upload queues or asset managers

**When not to use:**
- Non-draggable items
- Static lists where users cannot change order
- Dense tables where the ghost would hide nearby rows

**Timing:** 120-180ms lift on drag start, direct pointer tracking while dragging, 160-240ms settle on drop.  
**Easing:** Use a stiff spring for lift/drop and no delayed easing for pointer tracking.  
**Risks:** `accessibility_sensitive`, `performance_sensitive`  
**Alternatives:** `hover-lift-effect`, `swipe-gesture-hint`, `liquid-swipe-action`  
**Decision note:** Use Drag & Drop Ghost when the user is rearranging real items; use Hover Lift when you only need to show clickability.

### `hover-lift-effect` — Hover Lift Effect

**Best for:** A card or button smoothly translates upwards by a few pixels and increases its shadow cast, creating the illusion of moving closer to the user on hover.

**Use when:**
- Interactive cards in a grid
- Pricing tiers
- Feature showcases on landing pages

**When not to use:**
- Dense data tables
- Inline text links

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `meteor-border-button` — Animated Gradient Border

**Best for:** A button or card where a vibrant gradient beam continuously travels around its perimeter, similar to a meteor running along a track.

**Use when:**
- Primary Call-to-Action (CTA) buttons
- Upgrading to "Pro" tier sections

**When not to use:**
- Secondary or destructive buttons
- Inside busy UI components

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `floating-label-input` — Animated Floating Label

**Best for:** A modernized input field where the placeholder text gracefully shrinks, changes color, and floats to the top edge of the input boundary when focused or filled.

**Use when:**
- Registration forms
- Login screens
- Compact data entry layouts

**When not to use:**
- Extremely dense enterprise data tables where vertical space is tightly constrained

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `password-strength-gauge` — Fluid Password Strength Gauge

**Best for:** A smooth, interpolating bar that physically stretches and continuously shifts color from red (weak) to yellow (fair) to green (strong) as the user types.

**Use when:**
- User registration
- Password reset forms
- Security setting pages

**When not to use:**
- Standard non-sensitive data inputs

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `morphing-svg-icon` — Morphing SVG Icon

**Best for:** A seamless vertex-to-vertex transformation between two distinct icons (e.g., Play -> Pause, Menu -> Close), fluidly shifting shapes rather than just a hard cut swap.

**Use when:**
- Media players
- Hamburger menus
- Interactive toggle buttons

**When not to use:**
- When icons have drastically different structural nodes that result in chaotic spaghetti morphs

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `liquid-swipe-action` — Fluid Swipe-to-Action

**Best for:** A list item that can be dragged horizontally with high elasticity. Dropping it reveals under-the-fold action buttons (like Delete/Archive) with an elastic rubber-band snap.

**Use when:**
- Mobile-first list views (Emails, Tasks)
- Heavy editing interfaces

**When not to use:**
- Desktop grids where a mouse hover menu is vastly superior and standard

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `click-spark-feedback` — Click Spark Feedback

**Best for:** Adding a small celebratory response to a successful click without showing a full toast or success screen.

**Use when:**
- Playful primary actions
- Gamified completion moments
- Canvas or creative tools where click location matters

**When not to use:**
- Serious financial or destructive actions
- High-frequency controls that users click repeatedly
- Dense enterprise screens where sparks add noise

**Timing:** 300-600ms, no loop. The burst should be gone before the user starts the next action.  
**Easing:** Ease-out for particle travel and opacity fade.  
**Risks:** `distraction`, `overdesigned`, `accessibility_sensitive`  
**Alternatives:** `ripple-effect`, `scale-on-press`, `confetti-burst`  
**Decision note:** Use Click Spark Feedback when the click itself deserves a tiny reward; use Ripple Effect for quieter material feedback.

### `target-cursor-lock` — Target Cursor Lock

**Best for:** Making a small set of large interactive targets feel precise and game-like.

**Use when:**
- Game-like menus
- Creative portfolios
- Spatial interfaces where hover targeting is part of the experience

**When not to use:**
- Standard forms and dashboards
- Touch-first interfaces
- Any UI where replacing the cursor hurts usability

**Timing:** 150-300ms lock movement; the frame should feel attached, not laggy.  
**Easing:** Use a spring or fast ease-out with mild damping.  
**Risks:** `distraction`, `accessibility_sensitive`, `performance_sensitive`  
**Alternatives:** `hover-lift-effect`, `focus-ring-highlight`, `magnetic-button`  
**Decision note:** Use Target Cursor Lock for experiential hover targeting; use Focus Ring Highlight for normal product guidance.

### `elastic-slider-handle` — Elastic Slider Handle

**Best for:** Giving range controls tactile drag feedback while preserving a readable value.

**Use when:**
- Volume and brightness controls
- Pricing or quantity sliders
- Creative tool controls where drag feedback matters

**When not to use:**
- Precise scientific or financial inputs
- Dense forms with many sliders
- Controls where handle motion would obscure the value

**Timing:** 100-220ms response to value changes; long spring tails make the value feel imprecise.  
**Easing:** Use a damped spring or fast ease-out, never a bouncy loop.  
**Risks:** `misleading_progress`, `accessibility_sensitive`  
**Alternatives:** `progress-bar`, `scale-on-press`, `password-strength-gauge`  
**Decision note:** Use Elastic Slider Handle when drag feedback helps control confidence; use a plain input when precision matters more.

---

## Page & View Transitions

### `fade-transition` — Fade Transition

**Best for:** Simple state changes where spatial direction is not meaningful.

**Use when:**
- Navigating between tabs
- Opening/closing simple modals
- Revealing deferred content

**When not to use:**
- High-energy interactions that need spatial awareness (use slides instead)

**Timing:** Use 120-220ms for interface state changes and up to 300ms for larger view swaps.  
**Easing:** Ease-out for entering content; ease-in for exits; crossfades should stay subtle.  
**Risks:** `overdesigned`  
**Alternatives:** `slide-transition`, `shared-element-transition`, `blur-fade-in`  
**Decision note:** Choose fade when the best motion is the one users barely notice.

### `slide-transition` — Slide Transition

**Best for:** A view or component enters the screen by sliding linearly from an edge, providing spatial context about where the user is navigating to.

**Use when:**
- Mobile app screen navigation (pushing a new view)
- Carousels and image galleries
- Wizard steps in a form

**When not to use:**
- Flipping between unrelated top-level tabs (use Fade instead)
- Replacing small inline text

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `modal-enter-exit` — Modal Enter / Exit

**Best for:** Focused decisions, compact editing flows, and confirmations that should preserve page context.

**Use when:**
- Confirmations and alerts
- Editing details in a dashboard
- Sign-in prompts

**When not to use:**
- Full-page takeovers (use slide instead)

**Timing:** Backdrop fade around 150-220ms; modal scale/fade around 180-260ms.  
**Easing:** Use ease-out or a restrained spring on entry; avoid bouncy exits for serious tasks.  
**Risks:** `distraction`, `accessibility_sensitive`  
**Alternatives:** `drawer-sidebar-slide`, `fade-transition`, `slide-transition`  
**Decision note:** Choose modal motion when the interaction should pause the page without feeling like a new page.

### `stagger-list-reveal` — Stagger List Reveal

**Best for:** When opening a dropdown menu or a list, the items appear sequentially from top to bottom, drawing the eye down the list.

**Use when:**
- Dropdown menus (Context menues, Select boxes)
- Sidebar navigation items loading
- Command palettes (Comboboxes)

**When not to use:**
- Lists with more than 10 items (takes too long)
- Data-heavy tables

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `shared-element-transition` — Shared Element Transition

**Best for:** An element (like an image or card) seamlessly animates from its position in a list view into its final position in a detail view, bridging the context between two states.

**Use when:**
- Image galleries opening to full screen
- App store cards expanding into detail pages
- Profile avatars moving to header banners

**When not to use:**
- Simple form steps
- Where the element drastically changes aspect ratio (can look distorted)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `drawer-sidebar-slide` — Drawer / Sidebar Slide

**Best for:** A panel that slides in from the left or right edge of the screen, pushing content or overlapping it with a dark backdrop.

**Use when:**
- Mobile navigation menus
- Filtering and sorting options
- Detail inspection panels in dense dashboards

**When not to use:**
- Quick confirmations (use Modal or Toast)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `tab-underline-slide` — Tab Underline Slide

**Best for:** A highlighting background or underline that smoothly glides from the currently selected tab to the newly clicked tab, reinforcing spatial relationship.

**Use when:**
- Top-level navigation bars
- Segmented controls
- Pricing plan toggles (Monthly/Yearly)

**When not to use:**
- Vertical menus with varying heights

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `accordion-expand` — Accordion Expand

**Best for:** A panel that smoothly grows in height to reveal hidden content, pushing the elements below it smoothly downwards.

**Use when:**
- FAQ sections
- Complex forms with optional sections
- Collapsible sidebars

**When not to use:**
- Primary content that all users must read

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `parallax-scroll` — Parallax Scroll

**Best for:** Background elements move at a different speed than foreground elements while scrolling, creating an illusion of 3D depth and immersion.

**Use when:**
- Marketing landing pages
- Editorial feature stories
- Hero sections with rich photography

**When not to use:**
- Data-heavy dashboards
- If it causes text readability issues

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `text-decode-reveal` — Cypher / Matrix Text Reveal

**Best for:** Text does not simply fade in; instead, it aggressively scrambles through random characters or numbers before locking into the intended legible English phrase.

**Use when:**
- Revealing API keys or secure data
- AI generation completion states
- Developer-focused brands

**When not to use:**
- Paragraphs of text
- Conservative corporate sites

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `liquid-wave-transition` — Liquid / Wave Transition

**Best for:** A full page transition that begins as a small circle at the user's click coordinate, rapidly expanding outward like a liquid ripple to overtake the screen and reveal the new view.

**Use when:**
- Entering highly immersive states (e.g., full-screen image viewer, games)
- Navigating to an opposite-themed page (Light to Dark mode switch)

**When not to use:**
- Fast, utilitarian navigation (e.g., switching simple tabs)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `active-pill-slide` — Active Pill Slide

**Best for:** Showing which option is currently selected in a compact control while preserving spatial continuity.

**Use when:**
- Segmented controls such as Overview / Compare / Build
- Filter chips where only one option is active
- Mode switchers that update nearby content

**When not to use:**
- Large navigation menus with long labels or wrapping text
- Multi-select filters where several chips can be active at once
- Cases where the content change is more important than the selected control

**Timing:** 160-240ms is usually enough; slower movement makes simple selection feel heavy.  
**Easing:** Use a soft spring or a fast ease-out curve so the pill lands crisply without bouncing too much.  
**Risks:** `overdesigned`, `accessibility_sensitive`  
**Alternatives:** `tab-underline-slide`, `fade-transition`, `toggle-switch-animation`  
**Decision note:** Use Active Pill Slide when the selected container itself should move; use Tab Underline Slide when only navigation emphasis should move.

### `pixel-dissolve-transition` — Pixel Dissolve Transition

**Best for:** Stylized content reveals where a hard cut would feel too plain and brand personality matters.

**Use when:**
- Portfolio project reveals
- Game-like UI transitions
- Image or card hover reveals where style is part of the brand

**When not to use:**
- Routine app navigation
- Forms or settings pages
- Content that users need to read immediately

**Timing:** 400-800ms depending on grid size; keep hover previews closer to 400ms.  
**Easing:** Use ease-out on each pixel and short staggered delays.  
**Risks:** `overdesigned`, `performance_sensitive`, `accessibility_sensitive`  
**Alternatives:** `fade-transition`, `liquid-wave-transition`, `shared-element-transition`  
**Decision note:** Use Pixel Dissolve Transition for stylized reveals; use Fade Transition for standard product navigation.

### `bubble-menu-expand` — Bubble Menu Expand

**Best for:** Revealing a small set of related actions from a compact trigger.

**Use when:**
- Floating action buttons with a few related actions
- Mobile toolbars with limited space
- Creation menus such as Post / Upload / Scan

**When not to use:**
- Menus with many items or long labels
- Critical actions that need explanation
- Desktop layouts where a normal toolbar is clearer

**Timing:** 180-350ms with a short stagger; the menu should feel immediate.  
**Easing:** Use ease-out or a lightly damped spring for each bubble.  
**Risks:** `overdesigned`, `accessibility_sensitive`  
**Alternatives:** `drawer-sidebar-slide`, `staggered-menu-open`, `popover-coach-step`  
**Decision note:** Use Bubble Menu Expand for compact secondary actions; use Drawer Slide when the menu needs labels and structure.

### `folder-open-reveal` — Folder Open Reveal

**Best for:** Revealing grouped nested content through a familiar storage metaphor.

**Use when:**
- File managers and document collections
- Project cards that reveal contained assets
- Educational or onboarding interfaces that introduce grouped resources

**When not to use:**
- Generic cards with no folder metaphor
- Content that should be visible immediately
- Serious enterprise pages where the metaphor feels childish

**Timing:** 250-450ms for flap and content reveal together.  
**Easing:** Use ease-out with a slight 3D rotation for the flap; avoid elastic wobble.  
**Risks:** `overdesigned`, `accessibility_sensitive`  
**Alternatives:** `accordion-expand`, `popover-coach-step`, `pixel-dissolve-transition`  
**Decision note:** Use Folder Open Reveal when the folder metaphor clarifies grouping; use Accordion Expand for ordinary disclosure.

### `staggered-menu-open` — Staggered Menu Open

**Best for:** Making a compact menu feel structured and readable as it opens.

**Use when:**
- Mobile nav menus
- Command groups with a short list
- Settings menus where item grouping matters

**When not to use:**
- Very long menus
- Menus opened dozens of times per session
- Critical actions where delay hurts task speed

**Timing:** 180-320ms total for short menus; cap item stagger at 40-70ms.  
**Easing:** Use fast ease-out y/opacity transitions.  
**Risks:** `feels_slow`, `accessibility_sensitive`  
**Alternatives:** `drawer-sidebar-slide`, `card-nav-expand`, `accordion-expand`  
**Decision note:** Use Staggered Menu Open for short structured menus; use Drawer Slide for larger navigation surfaces.

---

## Empty & Error States

### `error-shake` — Error Shake

**Best for:** A quick horizontal shaking motion applied to an element (like an input field) to indicate invalid input or an error, mimicking a head shake.

**Use when:**
- Incorrect password entry
- Form validation failure (empty required field)
- Declined payment

**When not to use:**
- System-wide crashes (too playful/annoying)
- Success states

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `empty-state-illustration` — Empty State Illustration

**Best for:** A softly animated graphic (like a floating ghost or swaying box) accompanied by friendly text suggesting the next action when a list or dashboard is empty.

**Use when:**
- New user unpopulated dashboards
- Empty inboxes or task lists
- Cleared notifications

**When not to use:**
- Brief loading states

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `404-animation` — 404 Animation

**Best for:** A playful loop or glitch effect applied to a 404 number or illustration to reduce the frustration of hitting a dead end.

**Use when:**
- Not Found pages
- Deleted content routes

**When not to use:**
- Hard system failures or 500 errors

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `first-run-pulse` — First Run Onboarding Pulse

**Best for:** A glowing, pulsating ring around a specific UI element intended to draw a brand new user's attention to the first action they should take.

**Use when:**
- First-time logins
- Introducing a brand new core feature in a dense UI

**When not to use:**
- Everyday use
- On multiple elements concurrently

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `offline-state-indicator` — Offline State Indicator

**Best for:** A bar or toast that slides down from the top of the interface natively indicating the application has lost internet connection, remaining fixed until connection is restored.

**Use when:**
- Progressive Web Apps (PWAs)
- Real-time collaborative tools

**When not to use:**
- Static websites where offline doesn't break current reading

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `no-search-results-animation` — No Search Results Animation

**Best for:** An animation (often a magnifying glass looking back and forth) that plays when a search query returns zero results, softening the frustrating dead end.

**Use when:**
- Global command palettes
- E-commerce search returning nothing
- Directory queries

**When not to use:**
- As a replacement for helpful "Did you mean X?" text

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `connection-error-shake` — Connection Error Shake

**Best for:** A more aggressive, persistent pulsing or shaking error state specifically denoting that a system failure or timeout occurred.

**Use when:**
- Failed API fetches on critical dashboard widgets
- Payment gateways failing to connect

**When not to use:**
- User-side validation errors (use Error Shake instead)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `form-validation-error` — Form Validation Error

**Best for:** Small red helper text that gracefully slides down from underneath an input field the moment the user tabs away with an invalid entry.

**Use when:**
- Sign up forms
- Checkouts
- Settings configurations

**When not to use:**
- Waiting until final submit (validate inline when possible)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `aurora-background` — Aurora / Mesh Gradient

**Best for:** A deeply blurred, slow-moving set of vibrant gradient blobs (mesh gradient) that simulates the aurora borealis or viscous fluid, often set behind text or empty states.

**Use when:**
- Hero section backgrounds
- Login screens empty space
- Waiting or "generating" states

**When not to use:**
- Behind complex data tables
- If performance is highly constrained (heavy blurred elements can be GPU intensive on mobile)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

---

## Status & Confirmation

### `toast-notification` — Toast Notification

**Best for:** Non-blocking success, copy, save, or lightweight error feedback that should not interrupt the current task.

**Use when:**
- Success confirmations (e.g., "Settings saved")
- Non-critical errors
- Copy to clipboard success

**When not to use:**
- Critical errors requiring user action (use a modal/dialog instead)
- Lengthy text

**Timing:** Enter in 180-300ms, stay for 3-5s, and exit in 150-250ms.  
**Easing:** Use ease-out on entry and ease-in on exit; keep vertical travel short.  
**Risks:** `distraction`  
**Alternatives:** `success-screen-transition`, `modal-enter-exit`, `offline-state-indicator`  
**Decision note:** Choose toast when feedback should be seen but not answered.

### `checkmark-draw-animation` — Checkmark Draw Animation

**Best for:** An SVG checkmark that progressively draws itself from left to right inside a circle, confirming a successful action.

**Use when:**
- Payment success screens
- Form submission successes
- Task completion

**When not to use:**
- Routine toggles (too dramatic)
- Indeterminate states

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `confetti-burst` — Confetti Burst

**Best for:** A joyful explosion of colorful particles from the center or edges of the screen to celebrate a major user milestone.

**Use when:**
- Completing onboarding
- Reaching inbox zero
- Making a first sale

**When not to use:**
- Routine, frequent actions

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `error-cross-draw` — Error Cross Draw

**Best for:** The inverse of a checkmark draw; a red X SVG that sharply draws its two crossing lines to confirm a failure or rejection.

**Use when:**
- Failed payments
- Access denied screens
- Processing failures

**When not to use:**
- Form validation (too dramatic for a simple typo)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `badge-count-animation` — Badge Count Animation

**Best for:** When a notification badge value increments, the number scales up and down bouncy, and occasionally the badge itself pulses.

**Use when:**
- Shopping cart total increasing
- New unread messages arriving in a nav bar

**When not to use:**
- If the number changes extremely rapidly (use Number Ticker)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `progress-ring` — Progress Ring

**Best for:** A circular SVG ring that visually fills its stroke perimeter based on a percentage value, moving smoothly as progress updates.

**Use when:**
- File uploads where exact percentage is known but horizontal space is tight
- Daily goal completions (e.g., fitness rings)
- Time remaining in a countdown

**When not to use:**
- Indeterminate waiting states (use Spinner instead)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `success-screen-transition` — Success Screen Transition

**Best for:** A dramatic transition where, upon completing a major flow, the entire screen or container slides over or fades into a dedicated success view.

**Use when:**
- Completing a long multi-step wizard
- Successful checkout and payment
- Account creation completion

**When not to use:**
- Minor setting saves (use Toast instead)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `dynamic-island-expand` — Dynamic Island Expand

**Best for:** A top-anchored capsule that fluidly morphs into a larger notification card, accommodating new UI controls, and smoothly reverts to a resting pill shape.

**Use when:**
- System-level background tasks
- Music player mini-status
- Toast notification alternatives

**When not to use:**
- Complex forms
- Critical blocking alerts

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `notification-dot-pulse` — Notification Dot Pulse

**Best for:** Calling attention to a new status while preserving the user current task.

**Use when:**
- Unread messages or alerts
- Background status changes that need lightweight attention
- Navigation badges where the count is less important than newness

**When not to use:**
- Critical errors that need explicit text
- Always-on decorative badges
- Multiple nav items pulsing at the same time

**Timing:** 800-1400ms pulse, one to three repetitions after the event.  
**Easing:** Ease-out scale with fading opacity for the outer ring.  
**Risks:** `distraction`, `accessibility_sensitive`  
**Alternatives:** `badge-count-animation`, `toast-notification`, `pulsing-hotspot`  
**Decision note:** Use Notification Dot Pulse for ambient newness; use Toast Notification when the user needs to read what happened.

### `loading-ellipsis` — Loading Ellipsis

**Best for:** Short conversational waits where the system is composing or preparing a response.

**Use when:**
- AI reply generation
- Chat typing indicators
- Small inline operations where a spinner would feel too heavy

**When not to use:**
- Long waits without explanation
- Measurable operations such as uploads
- Page-level loading where layout context matters

**Timing:** 600-900ms loop; pair with fallback text for waits longer than 3 seconds.  
**Easing:** Use ease-in-out for dot y movement and opacity.  
**Risks:** `feels_slow`, `accessibility_sensitive`  
**Alternatives:** `typing-dots`, `spinner`, `indeterminate-progress-bar`  
**Decision note:** Use Loading Ellipsis for inline conversational work; use Spinner for generic short operations.

---

## Data & Content Visualization

### `number-ticker` — Number Ticker / Counting Animation

**Best for:** Numbers actively counting up from zero to their final value. Makes data updates feel dynamic and draws attention to key metrics.

**Use when:**
- KPI dashboards when numbers load or refresh
- Milestone celebrations (e.g., reaching 1M users)
- E-commerce stats like total sales or active users
- Checkout pages showing total price calculation

**When not to use:**
- Data tables with many numbers (can cause motion sickness)
- Values that change extremely frequently (use simple text replacement)
- Negative or error values where animation feels inappropriately celebratory

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `chart-bar-growth` — Chart Bar Growth

**Best for:** Bar charts that animate from a height of zero up to their final data value upon entering the screen, making the data feel impactful.

**Use when:**
- Analytics dashboards
- Financial reports
- Poll results

**When not to use:**
- Charts that update extremely frequently (real-time stock tickers)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `data-tweening` — Data Tweening

**Best for:** When filtering or changing datasets, SVG lines or pie slices seamlessly morph from one shape to the next instead of snapping instantly.

**Use when:**
- Switching between time ranges (1W to 1M) on line charts
- Filtering data in pie/donut charts

**When not to use:**
- When the two datasets share no common axes or context

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `racing-bar-chart` — Racing Bar Chart

**Best for:** A horizontal bar chart representing timeseries data where the bars continually sort themselves on the Y-axis as their X-values increase/decrease over time.

**Use when:**
- Visualizing ranking changes over time (e.g., most popular languages per year)
- Gamified leaderboards

**When not to use:**
- Static data sets

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `hover-glare-card` — Spotlight Glare Card

**Best for:** A glossy card element where a soft, radial gradient spotlight perfectly tracks the user's mouse position over the surface, creating a physical "glare" effect.

**Use when:**
- Pricing tables
- Premium feature grids (Bento grids)
- SaaS landing pages

**When not to use:**
- High-density data tables
- Text-heavy documentation

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `tilt-parallax-card` — 3D Tilt Parallax Card

**Best for:** Cards that literally tilt on their X and Y axes in response to mouse movement. Internal elements (like a logo or image) often move at a faster rate to simulate true 3D depth.

**Use when:**
- Physical product representations (e.g. Credit Cards)
- Premium feature show-offs

**When not to use:**
- Cards that contain heavy interaction like form inputs or carousels

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `directional-hover-card` — Directional Hover Card

**Best for:** A picture or content card that detects the exact edge (top, right, bottom, left) the mouse cursor enters from, and slides an information overlay in from that specific direction. It exits out the same edge the mouse leaves.

**Use when:**
- Rich portfolio image galleries
- E-commerce product grids

**When not to use:**
- Text-heavy informative tables
- Mobile-first designs lacking hover states

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `flip-3d-card` — 180° 3D Card Flip

**Best for:** A card that physically turns around in 3D space along its Y or X axis to reveal content on its "back" side, like a flashcard or a playing card.

**Use when:**
- Pricing tiers (Monthly vs Annual)
- Flashcard study aids
- Staff bio cards (front picture, back bio)

**When not to use:**
- Primary navigation flows
- Forms that users frequently edit

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `line-chart-draw` — Line Chart Draw

**Best for:** Introducing one important trend without making the whole chart feel delayed.

**Use when:**
- Analytics cards where the trend matters more than each exact point
- First reveal of a dashboard section
- Reports where a single metric trajectory needs emphasis

**When not to use:**
- Live charts that update every second
- Dense dashboards where many charts would animate at once
- Charts where exact values must be inspected immediately

**Timing:** 700-1200ms for first reveal; under 500ms for small sparklines.  
**Easing:** Ease-out so the line starts decisively and settles at the final point.  
**Risks:** `feels_slow`, `accessibility_sensitive`  
**Alternatives:** `chart-bar-growth`, `data-tweening`, `number-ticker`  
**Decision note:** Use Line Chart Draw when trend shape is the story; use Number Ticker when the final number is the story.

### `pie-chart-reveal` — Pie Chart Reveal

**Best for:** Revealing a simple distribution where the relative slice sizes matter at a glance.

**Use when:**
- Small distribution summaries
- Dashboard cards with three to five categories
- Reports where segment proportion is the main takeaway

**When not to use:**
- Charts with many tiny slices
- Financial or scientific contexts where exact comparison matters
- Repeated refreshes where animation hides changed values

**Timing:** 500-900ms total; each segment should appear quickly enough that the chart does not feel gated.  
**Easing:** Use ease-out for each segment and stagger by 80-160ms.  
**Risks:** `misleading_progress`, `accessibility_sensitive`  
**Alternatives:** `chart-bar-growth`, `line-chart-draw`, `progress-ring`  
**Decision note:** Use Pie Chart Reveal for distribution; use Chart Bar Growth when category comparison must be more precise.

### `timeline-reveal` — Timeline Reveal

**Best for:** Making ordered milestones feel connected and progressive.

**Use when:**
- Project roadmaps
- Order tracking and delivery status
- Case studies or process explanations

**When not to use:**
- Feeds where chronological order is not important
- Long histories with dozens of events
- Pages where users need to scan all entries immediately

**Timing:** 120-180ms stagger per milestone, with total reveal under 1.2s for short timelines.  
**Easing:** Ease-out for item entrance; linear or ease-out for the connector line.  
**Risks:** `feels_slow`, `accessibility_sensitive`  
**Alternatives:** `stagger-list-reveal`, `step-indicator-motion`, `scroll-reveal`  
**Decision note:** Use Timeline Reveal when sequence and causality matter; use Stagger List Reveal for unordered content.

### `logo-loop-marquee` — Logo Loop Marquee

**Best for:** Showing many small recognizable items without creating a heavy grid.

**Use when:**
- Partner logo strips
- Integration lists
- Technology stack showcases

**When not to use:**
- Critical navigation
- Long text content
- Pages where constant motion competes with reading

**Timing:** Slow continuous loop, usually 18-40s for a full cycle depending on item count.  
**Easing:** Linear only; eased marquee loops visibly stutter.  
**Risks:** `distraction`, `accessibility_sensitive`  
**Alternatives:** `horizontal-scroll-gallery`, `stagger-list-reveal`, `scroll-progress-bar`  
**Decision note:** Use Logo Loop Marquee for ambient social proof; use a static grid when inspection matters.

---

## Scroll & Navigation

### `scroll-reveal` — Scroll Reveal / Fade-Up on Scroll

**Best for:** Elements remain hidden until they enter the browser viewport, then smoothly fade in and slide up into position. Makes scrolling feel like an active discovery process.

**Use when:**
- Feature sections on long marketing landing pages
- About pages introducing team members or values
- Article content to pace the reading experience
- To prevent the user from being overwhelmed by a dense page

**When not to use:**
- Critical navigation or header elements
- Dense data dashboards or tables
- Content that requires immediate reading upon fast scroll

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `parallax-background` — Parallax Background

**Best for:** A background image or layer that moves vertically at a slower rate than the foreground content as the user scrolls, creating a 3D depth effect.

**Use when:**
- Landing page hero sections
- Long editorial articles

**When not to use:**
- Text-heavy application UIs (can cause slight nausea/distraction)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `sticky-heading` — Sticky Heading

**Best for:** As the user scrolls down a list, the category header sticks to the top of the viewport until pushed out by the next category header.

**Use when:**
- Alphabetical contact lists
- Long settings menus with grouped sections
- Documentation sidebars

**When not to use:**
- Short lists where context is never lost

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `text-reveal-pipeline` — Text Reveal Pipeline

**Best for:** Large typographic paragraphs where the text color or opacity transitions from faded to solid exactly mapped to the user's scroll position.

**Use when:**
- Making a bold, philosophical statement on a landing page
- Pacing the reader through a key value proposition

**When not to use:**
- Body paragraphs or functional reading

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `horizontal-scroll-gallery` — Horizontal Scroll Gallery

**Best for:** A section of the page where vertical scrolling temporarily translates into horizontal scrolling to reveal a gallery of cards or images, before continuing vertically.

**Use when:**
- Showcasing features, portfolios, or timelines sequentially without taking up massive vertical space

**When not to use:**
- If the content contains its own vertical scrolling (e.g., long text boxes)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `magnetic-button` — Magnetic Snap Button

**Best for:** When the mouse gets close to this button, the entire button (and its text) physically pulls towards the cursor, as if magnetized. It snaps back playfully when the mouse leaves.

**Use when:**
- Minimalist portfolio navigation
- Hamburger menu icons
- Floating Action Buttons (FABs)

**When not to use:**
- Dense forms
- Standard native-feeling applications

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `tracing-beam-progress` — Tracing Beam Scroll

**Best for:** A side navigation or progress bar where a glowing "beam" of light physically traces a curved SVG path downwards as the user scrolls, matching their vertical progression.

**Use when:**
- Lengthy technical documentation
- Story-driven landing pages (Timelines)

**When not to use:**
- Short pages
- Pages with no distinct structural sections

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `expandable-search-bar` — Expandable Search Input

**Best for:** Initially just a circular search magnifying glass icon. Upon interaction, it elastically unravels horizontally into a full active text input field.

**Use when:**
- Minimalist headers
- Mobile navigation bars
- Secondary toolbars

**When not to use:**
- Search-centric pages (like Google or E-commerce catalogs) where the search bar must always be fully visible

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `scroll-progress-bar` — Scroll Progress Bar

**Best for:** Helping users understand their position in long reading or guide pages.

**Use when:**
- Long articles or documentation pages
- Step-by-step guides where users need completion feedback
- Single-page case studies or landing sections

**When not to use:**
- Short pages where progress is obvious
- Apps with many nested scroll containers
- Dashboards where scrolling is not the primary task

**Timing:** Progress should track scroll immediately; use only a tiny smoothing transition under 100ms.  
**Easing:** Linear mapping from scroll position to width; avoid springy lag.  
**Risks:** `misleading_progress`, `accessibility_sensitive`  
**Alternatives:** `sticky-heading`, `tracing-beam-progress`, `progress-bar`  
**Decision note:** Use Scroll Progress Bar for reading depth; use Progress Bar for task completion.

### `gooey-nav-indicator` — Gooey Nav Indicator

**Best for:** A playful nav where the active selection should feel like one continuous moving object.

**Use when:**
- Small tab bars
- Playful landing navigation
- Segmented navigation with short labels

**When not to use:**
- Long sidebars
- Enterprise navigation with many destinations
- Multi-select filters

**Timing:** 180-360ms; route changes should still feel immediate.  
**Easing:** Use a spring or ease-out with slight shape morphing.  
**Risks:** `overdesigned`, `accessibility_sensitive`  
**Alternatives:** `active-pill-slide`, `tab-underline-slide`, `dock-proximity-scale`  
**Decision note:** Use Gooey Nav Indicator when nav personality matters; use Active Pill Slide for cleaner product UI.

### `dock-proximity-scale` — Dock Proximity Scale

**Best for:** Compact icon navigation where hover exploration is part of the interface character.

**Use when:**
- Creative toolbars
- Launcher-style navigation
- Small icon sets where pointer exploration is expected

**When not to use:**
- Touch-first navigation
- Dense admin sidebars
- Critical controls that must keep stable hit targets

**Timing:** 100-220ms response to pointer movement; no delayed animation.  
**Easing:** Use spring-like response with damping, or direct distance mapping with light smoothing.  
**Risks:** `distraction`, `accessibility_sensitive`  
**Alternatives:** `scale-on-press`, `magnetic-button`, `gooey-nav-indicator`  
**Decision note:** Use Dock Proximity Scale for compact icon launchers; use Scale on Press for ordinary button feedback.

### `card-nav-expand` — Card Nav Expand

**Best for:** Helping users choose among nested navigation options with short contextual cards.

**Use when:**
- Product nav with grouped destinations
- Documentation or SaaS headers with feature families
- Navigation where each destination benefits from a short description

**When not to use:**
- Simple sites with only a few links
- Mobile-only navigation without room for panels
- Menus that must open instantly under heavy use

**Timing:** 220-380ms for panel reveal; individual cards can stagger by 40-70ms.  
**Easing:** Use ease-out for panel height and a subtle stagger for card opacity/y.  
**Risks:** `feels_slow`, `accessibility_sensitive`  
**Alternatives:** `staggered-menu-open`, `accordion-expand`, `drawer-sidebar-slide`  
**Decision note:** Use Card Nav Expand when navigation needs context; use Staggered Menu Open for a simpler menu list.

### `scroll-stack-cards` — Scroll Stack Cards

**Best for:** Helping users understand ordered content as a sequence while scrolling.

**Use when:**
- Step-by-step explainers
- Case study sections
- Feature walkthroughs with a clear order

**When not to use:**
- Unordered card grids
- Dense reading pages
- Lists where users need to scan many items quickly

**Timing:** Tie movement to scroll position; avoid long independent animations.  
**Easing:** Use scroll-linked linear mapping or very light smoothing.  
**Risks:** `performance_sensitive`, `accessibility_sensitive`, `feels_slow`  
**Alternatives:** `timeline-reveal`, `stagger-list-reveal`, `scroll-progress-bar`  
**Decision note:** Use Scroll Stack Cards for short ordered narratives; use Stagger List Reveal for ordinary lists.

---

## Onboarding & Tours

### `pulsing-hotspot` — Pulsing Hotspot

**Best for:** A small circular dot that softly pulses outwards like a sonar ping. Gently draws user attention to unread items or new un-clicked features.

**Use when:**
- To highlight a newly released feature without obtrusive modals
- Over a notification bell icon representing unread alerts
- As a spatial marker in an interactive map or image guide
- Guiding users to the next necessary step in onboarding

**When not to use:**
- On more than 2 elements at once on the same screen (causes panic/clutter)
- For critical errors or destructive actions (use bolder red styles instead)
- If the user has already acknowledged the feature

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `tooltip-fade-nudge` — Tooltip Fade & Nudge

**Best for:** A tiny popover label that slides exactly 4-8px outwards from its anchor element while fading in. Used to label icon-only buttons.

**Use when:**
- Icon-only action buttons (e.g., Share, Delete, Edit)
- Glossary definition hovers
- Charts where hovering over a bar reveals exact metrics

**When not to use:**
- Critical form instructions (put them inline instead)
- Mobile apps (tooltips don't work well on touch)

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `spotlight-coach-mark` — Spotlight / Coach Mark

**Best for:** The entire screen dims with a dark overlay, except for a highlighted "cutout" over a specific UI element, paired with an explanatory tooltip.

**Use when:**
- First-time user onboarding tours
- Highlighting a massive UI layout change

**When not to use:**
- Every single time a user logs in
- For extremely obvious UI buttons

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `progressive-checklist-fill` — Progressive Checklist Fill

**Best for:** As a user completes onboarding tasks, list items animate a strikethrough, a checkmark draws itself, and the entire item fades into a completed state, often filling a master progress bar.

**Use when:**
- Getting Started guides
- Setup wizards
- Complex multi-stage profile completions

**When not to use:**
- Simple stateless to-do lists

**Timing:** Not specified  
**Easing:** Not specified  
**Risks:** None listed  
**Alternatives:** None listed  
**Decision note:** Not specified

### `popover-coach-step` — Popover Coach Step

**Best for:** Explaining one unfamiliar control while keeping the user oriented in the actual interface.

**Use when:**
- First-run flows where the next action is not obvious
- Feature launches that need one focused explanation
- Setup wizards where users need local context before proceeding

**When not to use:**
- Interfaces where the user already clicked an obvious control
- Long tours that explain every part of the page
- Dense mobile screens where the popover blocks the actual task

**Timing:** 180-280ms entrance with no looping motion; users should read the content, not watch the container.  
**Easing:** Use a fast ease-out with a small y-offset or scale, then stay still.  
**Risks:** `distraction`, `accessibility_sensitive`  
**Alternatives:** `spotlight-coach-mark`, `tooltip-fade-nudge`, `focus-ring-highlight`  
**Decision note:** Use Popover Coach Step when guidance needs text and context; use Spotlight Coach Mark when attention is the main job.

### `focus-ring-highlight` — Focus Ring Highlight

**Best for:** Pointing to the next input or control without adding a tooltip or blocking interaction.

**Use when:**
- Guiding users to a newly available field
- Drawing attention after validation or setup progress
- Highlighting a changed setting without covering the UI

**When not to use:**
- Every focus state in a form
- Critical accessibility focus indicators that should remain stable
- Multiple simultaneous highlights

**Timing:** 250ms ring entrance, optional 1-1.4s single pulse; stop after acknowledgement.  
**Easing:** Ease-out for the ring, linear opacity fade for the pulse.  
**Risks:** `distraction`, `accessibility_sensitive`  
**Alternatives:** `popover-coach-step`, `pulsing-hotspot`, `tooltip-fade-nudge`  
**Decision note:** Use Focus Ring Highlight when the UI itself can explain the next step and only needs attention.

### `step-indicator-motion` — Step Indicator Motion

**Best for:** Showing progress through a known sequence where completion reduces user uncertainty.

**Use when:**
- Checkout flows
- Account setup or onboarding sequences
- Multi-step forms where progress affects user confidence

**When not to use:**
- Single-page forms with no real sequence
- Flows where users can jump freely between many sections
- Tiny mobile headers where the indicator competes with navigation

**Timing:** 200-450ms per transition; line fill and dot activation should feel like one movement.  
**Easing:** Use ease-out for progress fill and a light spring for the active dot.  
**Risks:** `feels_slow`, `accessibility_sensitive`  
**Alternatives:** `progressive-checklist-fill`, `progress-bar`, `active-pill-slide`  
**Decision note:** Use Step Indicator Motion for fixed multi-step flows; use Progress Bar when the process is continuous instead of discrete.

---

## Creative Motion

### `floating-product-object` — Floating Product Object

**Best for:** SaaS hero, AI tool landing, portfolio case study, launch page, hardware/software showcase.

**Use when:**
- Product contexts: SaaS hero, AI tool landing, portfolio case study, launch page, hardware/software showcase.
- Choose it when the product intent matches 3D Product Showcase rather than generic decoration.
- Start with a still product artifact; add shallow rotation only if it reinforces materiality.

**When not to use:**
- Avoid abstract spinning cubes when the product has no object to show. Avoid on dense documentation pages, checkout flows, admin pages, or mobile pages where it delays content.

**Timing:** Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.  
**Easing:** Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.  
**Risks:** `performance_sensitive`, `accessibility_sensitive`, `overdesigned`  
**Alternatives:** `interactive-3d-card-stack`, `aurora-shader-background`, `morphing-gradient-blob`  
**Decision note:** Start with a still product artifact; add shallow rotation only if it reinforces materiality.

### `interactive-3d-card-stack` — Interactive 3D Card Stack

**Best for:** Portfolio grids, case studies, template galleries, product feature sets, pricing/plan comparison highlights.

**Use when:**
- Product contexts: Portfolio grids, case studies, template galleries, product feature sets, pricing/plan comparison highlights.
- Choose it when the product intent matches 3D Product Showcase rather than generic decoration.
- Use depth to clarify grouping, not to hide information.

**When not to use:**
- Avoid when users need quick comparison across many items, when cards contain dense text, or when hover/tilt makes hit targets unstable.

**Timing:** Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.  
**Easing:** Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.  
**Risks:** `performance_sensitive`, `accessibility_sensitive`, `overdesigned`  
**Alternatives:** `card-nav-expand`, `hover-lift-effect`, `tilt-parallax-card`  
**Decision note:** Use depth to clarify grouping, not to hide information.

### `orbital-feature-system` — Orbital Feature System

**Best for:** AI platforms, developer tools, automation suites, ecosystem pages, feature overview sections.

**Use when:**
- Product contexts: AI platforms, developer tools, automation suites, ecosystem pages, feature overview sections.
- Choose it when the product intent matches 3D Product Showcase rather than generic decoration.
- Treat orbit as a storytelling overview, then give users static detail below.

**When not to use:**
- Avoid when feature labels must be read quickly, when there are more than 6-8 nodes, or when orbiting implies relationships that do not exist.

**Timing:** Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.  
**Easing:** Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.  
**Risks:** `performance_sensitive`, `accessibility_sensitive`, `overdesigned`  
**Alternatives:** `animated-knowledge-graph`, `card-nav-expand`, `scroll-stack-cards`  
**Decision note:** Treat orbit as a storytelling overview, then give users static detail below.

### `aurora-shader-background` — Aurora Shader Background

**Best for:** AI tools, creative software, premium SaaS, launch pages, brand moments.

**Use when:**
- Product contexts: AI tools, creative software, premium SaaS, launch pages, brand moments.
- Choose it when the product intent matches Shader / Atmosphere rather than generic decoration.
- Use the aurora as a restrained background layer, not the main content.

**When not to use:**
- Avoid behind long text, dense controls, financial or medical dashboards, or any page where contrast and reading speed matter more than atmosphere.

**Timing:** Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.  
**Easing:** Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.  
**Risks:** `performance_sensitive`, `accessibility_sensitive`, `overdesigned`  
**Alternatives:** `morphing-gradient-blob`, `parallax-background`, `floating-product-object`  
**Decision note:** Use the aurora as a restrained background layer, not the main content.

### `morphing-gradient-blob` — Morphing Gradient Blob

**Best for:** Onboarding, empty states, hero accent, AI thinking atmosphere, educational or creator products.

**Use when:**
- Product contexts: Onboarding, empty states, hero accent, AI thinking atmosphere, educational or creator products.
- Choose it when the product intent matches Shader / Atmosphere rather than generic decoration.
- Use slow breathing motion; do not let the blob cross text or controls.

**When not to use:**
- Avoid when blob movement competes with form fields, charts, code blocks, or primary CTA reading.

**Timing:** Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.  
**Easing:** Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.  
**Risks:** `performance_sensitive`, `accessibility_sensitive`, `overdesigned`  
**Alternatives:** `aurora-shader-background`, `pulse-placeholder`, `parallax-background`  
**Decision note:** Use slow breathing motion; do not let the blob cross text or controls.

### `particle-network-field` — Particle Network Field

**Best for:** AI agents, network/security products, collaboration tools, infrastructure platforms, knowledge systems.

**Use when:**
- Product contexts: AI agents, network/security products, collaboration tools, infrastructure platforms, knowledge systems.
- Choose it when the product intent matches Shader / Atmosphere rather than generic decoration.
- Tie node behavior to a product metaphor such as agents, documents, or users.

**When not to use:**
- Avoid as a generic tech background with no connection to the product story. Avoid high particle counts on mobile.

**Timing:** Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.  
**Easing:** Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.  
**Risks:** `performance_sensitive`, `accessibility_sensitive`, `overdesigned`  
**Alternatives:** `animated-knowledge-graph`, `aurora-shader-background`, `morphing-gradient-blob`  
**Decision note:** Tie node behavior to a product metaphor such as agents, documents, or users.

### `data-stream-tunnel` — Data Stream Tunnel

**Best for:** Data platforms, observability, AI retrieval, ETL, build/deploy systems, real-time analytics.

**Use when:**
- Product contexts: Data platforms, observability, AI retrieval, ETL, build/deploy systems, real-time analytics.
- Choose it when the product intent matches Data / System Visualization rather than generic decoration.
- Make direction and transformation legible before making it cinematic.

**When not to use:**
- Avoid if the product does not process flows, or if movement implies real-time guarantees the product cannot provide.

**Timing:** Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.  
**Easing:** Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.  
**Risks:** `performance_sensitive`, `accessibility_sensitive`, `overdesigned`  
**Alternatives:** `tool-call-timeline`, `timeline-reveal`, `line-chart-draw`  
**Decision note:** Make direction and transformation legible before making it cinematic.

### `animated-knowledge-graph` — Animated Knowledge Graph

**Best for:** Knowledge bases, AI memory, recommendation systems, research tools, entity graphs, agent planning.

**Use when:**
- Product contexts: Knowledge bases, AI memory, recommendation systems, research tools, entity graphs, agent planning.
- Choose it when the product intent matches Data / System Visualization rather than generic decoration.
- Animate to reveal relationships, not to keep the graph in perpetual motion.

**When not to use:**
- Avoid for small lists, pure decoration, or graphs whose structure is fabricated and might mislead users.

**Timing:** Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.  
**Easing:** Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.  
**Risks:** `performance_sensitive`, `accessibility_sensitive`, `overdesigned`  
**Alternatives:** `tool-call-timeline`, `folder-open-reveal`, `timeline-reveal`  
**Decision note:** Animate to reveal relationships, not to keep the graph in perpetual motion.

### `tool-call-timeline` — Tool Call Timeline

**Best for:** AI agents, build pipelines, diagnostic tools, workflow automation, assistant products.

**Use when:**
- Product contexts: AI agents, build pipelines, diagnostic tools, workflow automation, assistant products.
- Choose it when the product intent matches Data / System Visualization rather than generic decoration.
- Prefer truthful discrete states over decorative “thinking” loops.

**When not to use:**
- Avoid when operations are instant, private, security-sensitive, or not actually observable.

**Timing:** Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.  
**Easing:** Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.  
**Risks:** `performance_sensitive`, `accessibility_sensitive`, `overdesigned`  
**Alternatives:** `timeline-reveal`, `progressive-checklist-fill`, `indeterminate-progress-bar`  
**Decision note:** Prefer truthful discrete states over decorative “thinking” loops.

### `svg-path-drawing` — SVG Path Drawing

**Best for:** Brand intro, route/path explanation, diagram reveal, education, editorial storytelling.

**Use when:**
- Product contexts: Brand intro, route/path explanation, diagram reveal, education, editorial storytelling.
- Choose it when the product intent matches Kinetic Typography rather than generic decoration.
- Use it as a reveal of a meaningful line, not a default text animation.

**When not to use:**
- Avoid for long body text, important instructions, or logos that must appear instantly for recognition.

**Timing:** Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.  
**Easing:** Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.  
**Risks:** `performance_sensitive`, `accessibility_sensitive`, `overdesigned`  
**Alternatives:** `line-chart-draw`, `text-reveal-pipeline`, `fade-transition`  
**Decision note:** Use it as a reveal of a meaningful line, not a default text animation.

### `kinetic-headline-reveal` — Kinetic Headline Reveal

**Best for:** Launch hero, campaign page, portfolio intro, product story chapter, editorial feature.

**Use when:**
- Product contexts: Launch hero, campaign page, portfolio intro, product story chapter, editorial feature.
- Choose it when the product intent matches Kinetic Typography rather than generic decoration.
- Animate the message hierarchy, not every character just because it is possible.

**When not to use:**
- Avoid in dense SaaS dashboards, documentation, forms, or pages where users need immediate text access.

**Timing:** Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.  
**Easing:** Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.  
**Risks:** `performance_sensitive`, `accessibility_sensitive`, `overdesigned`  
**Alternatives:** `text-reveal-pipeline`, `fade-transition`, `scroll-reveal`  
**Decision note:** Animate the message hierarchy, not every character just because it is possible.

### `ai-thinking-orb` — AI Thinking Orb

**Best for:** AI assistant, voice interface, agent dashboard, model generation screen, creative tool.

**Use when:**
- Product contexts: AI assistant, voice interface, agent dashboard, model generation screen, creative tool.
- Choose it when the product intent matches AI / Tech Expression rather than generic decoration.
- Use the orb for ambient state; use timelines or progress for accountable work.

**When not to use:**
- Avoid as a replacement for precise progress, errors, or tool-call states. Avoid if it implies sentience or capability the product does not have.

**Timing:** Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.  
**Easing:** Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.  
**Risks:** `performance_sensitive`, `accessibility_sensitive`, `overdesigned`  
**Alternatives:** `tool-call-timeline`, `typing-dots`, `indeterminate-progress-bar`  
**Decision note:** Use the orb for ambient state; use timelines or progress for accountable work.

---
