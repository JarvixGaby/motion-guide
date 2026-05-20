export const situations = [
  {
    name: 'Form submission',
    primary: 'button-loading-state',
    alternatives: ['spinner', 'toast-notification', 'success-screen-transition'],
    reason: 'Keep the user anchored to the action they just took, then confirm the result without forcing a page-level transition.',
    avoid: 'Avoid full-screen loading for small form actions unless the whole page is blocked.',
  },
  {
    name: 'List or feed loading',
    primary: 'skeleton-screen',
    alternatives: ['shimmer-loader', 'staggered-load', 'empty-state-illustration'],
    reason: 'Skeletons preserve layout context and make the wait feel shorter than an isolated spinner.',
    avoid: 'Avoid skeletons when the final layout is unpredictable or the fetch usually completes instantly.',
  },
  {
    name: 'Search flow',
    primary: 'expandable-search-bar',
    alternatives: ['spinner', 'no-search-results-animation', 'staggered-load'],
    reason: 'Search needs fast input affordance, lightweight loading feedback, and a graceful zero-result state.',
    avoid: 'Avoid decorative search animations on search-first pages where the input should always be visible.',
  },
  {
    name: 'File upload',
    primary: 'progress-bar',
    alternatives: ['indeterminate-progress-bar', 'toast-notification', 'error-cross-draw'],
    reason: 'Uploads need measurable progress when possible, then clear success or retry feedback.',
    avoid: 'Avoid fake percentage progress if the system cannot estimate completion.',
  },
  {
    name: 'Onboarding guidance',
    primary: 'spotlight-coach-mark',
    alternatives: ['popover-coach-step', 'focus-ring-highlight', 'step-indicator-motion'],
    reason: 'Guide attention only when the next action is important enough to interrupt the normal interface.',
    avoid: 'Avoid highlighting many elements at once or repeating the same tour after acknowledgement.',
  },
  {
    name: 'Analytics reveal',
    primary: 'line-chart-draw',
    alternatives: ['chart-bar-growth', 'pie-chart-reveal', 'number-ticker'],
    reason: 'Data motion should clarify what changed: trend shape, category comparison, distribution, or headline metric.',
    avoid: 'Avoid animating every chart on dense dashboards or delaying access to values users need immediately.',
  },
  {
    name: 'Long-form reading',
    primary: 'scroll-progress-bar',
    alternatives: ['sticky-heading', 'tracing-beam-progress', 'scroll-reveal'],
    reason: 'Reading progress should orient users without competing with the content itself.',
    avoid: 'Avoid scroll progress bars on short pages or apps with multiple nested scroll containers.',
  },
  {
    name: 'Playful click feedback',
    primary: 'click-spark-feedback',
    alternatives: ['ripple-effect', 'scale-on-press', 'confetti-burst'],
    reason: 'Small tactile bursts can make playful actions feel responsive without showing a full notification.',
    avoid: 'Avoid spark effects for serious, destructive, or high-frequency actions.',
  },
  {
    name: 'Expressive navigation',
    primary: 'card-nav-expand',
    alternatives: ['staggered-menu-open', 'gooey-nav-indicator', 'dock-proximity-scale'],
    reason: 'Expressive navigation should still preserve clear selected state and stable targets.',
    avoid: 'Avoid blob or dock effects when users need dense, predictable enterprise navigation.',
  },
  {
    name: 'Range input tuning',
    primary: 'elastic-slider-handle',
    alternatives: ['progress-bar', 'scale-on-press', 'password-strength-gauge'],
    reason: 'A slider can use motion to make value changes feel tactile while keeping the exact value readable.',
    avoid: 'Avoid elastic handles when users need high-precision numeric entry.',
  },
  {
    name: 'Grouped content reveal',
    primary: 'folder-open-reveal',
    alternatives: ['accordion-expand', 'bubble-menu-expand', 'card-nav-expand'],
    reason: 'A reveal motion should clarify the relationship between a compact container and the content inside it.',
    avoid: 'Avoid metaphorical reveals when the grouping is not real or when content should be immediately visible.',
  },
  {
    name: 'Creative hero or product showcase',
    primary: 'floating-product-object',
    alternatives: ['interactive-3d-card-stack', 'aurora-shader-background', 'kinetic-headline-reveal'],
    reason: 'Creative hero motion should make the product, message, or atmosphere more tangible instead of adding a generic visual effect.',
    avoid: 'Avoid abstract 3D, particles, or headline effects when users need dense reading, form completion, checkout, or admin work.',
  },
  {
    name: 'AI or system activity visualization',
    primary: 'tool-call-timeline',
    alternatives: ['ai-thinking-orb', 'data-stream-tunnel', 'animated-knowledge-graph'],
    reason: 'Expose truthful observable activity first, then use ambient AI expression only as a supporting state.',
    avoid: 'Avoid vague thinking loops when precise progress, errors, privacy, or accountable tool states matter.',
  },
  {
    name: 'Error feedback',
    primary: 'form-validation-error',
    alternatives: ['error-shake', 'connection-error-shake', 'offline-state-indicator'],
    reason: 'Errors should point to the exact fix before using broad page-level motion.',
    avoid: 'Avoid playful motion for destructive, financial, or security-sensitive failures.',
  },
];

export const comparisons = [
  {
    title: 'Skeleton Screen vs Shimmer Loader',
    entries: ['skeleton-screen', 'shimmer-loader'],
    guidance: 'Use skeleton for layout context; add shimmer only when the placeholder would otherwise feel static during a longer wait.',
  },
  {
    title: 'Spinner vs Progress Bar',
    entries: ['spinner', 'progress-bar'],
    guidance: 'Use spinner for short or unknown waits; use progress bar when completion is measurable or the wait is long.',
  },
  {
    title: 'Toast vs Success Screen',
    entries: ['toast-notification', 'success-screen-transition'],
    guidance: 'Use toast for non-blocking confirmation; use a success screen when completion changes the user journey.',
  },
  {
    title: 'Ripple vs Scale vs Haptic Bounce',
    entries: ['ripple-effect', 'scale-on-press', 'haptic-bounce'],
    guidance: 'Use scale for quiet button feedback, ripple for material-style surfaces, and haptic bounce for playful mobile-first actions.',
  },
  {
    title: 'Fade vs Shared Element Transition',
    entries: ['fade-transition', 'shared-element-transition'],
    guidance: 'Use fade for simple state changes; use shared element transitions when preserving object continuity matters.',
  },
  {
    title: 'Active Pill Slide vs Tab Underline',
    entries: ['active-pill-slide', 'tab-underline-slide', 'fade-transition'],
    guidance: 'Use active pill slide for segmented controls and filter chips, tab underline for navigation tabs, and fade for the content change that follows selection.',
  },
  {
    title: 'Popover Coach Step vs Focus Ring Highlight',
    entries: ['popover-coach-step', 'focus-ring-highlight', 'spotlight-coach-mark'],
    guidance: 'Use popover coach step when text guidance is needed, focus ring highlight when the control only needs attention, and spotlight coach mark when the whole surrounding UI should recede.',
  },
  {
    title: 'Line Chart Draw vs Pie Chart Reveal',
    entries: ['line-chart-draw', 'pie-chart-reveal', 'chart-bar-growth'],
    guidance: 'Use line chart draw for trends, pie chart reveal for simple distribution, and chart bar growth when category comparison must be more precise.',
  },
  {
    title: 'Notification Dot vs Toast',
    entries: ['notification-dot-pulse', 'toast-notification', 'badge-count-animation'],
    guidance: 'Use notification dot pulse for ambient newness, toast for readable confirmation, and badge count animation when the number itself matters.',
  },
  {
    title: 'Click Spark vs Ripple',
    entries: ['click-spark-feedback', 'ripple-effect', 'scale-on-press'],
    guidance: 'Use click spark for playful reward, ripple for material-style surface feedback, and scale on press for quiet universal tactility.',
  },
  {
    title: 'Gooey Nav vs Active Pill vs Dock',
    entries: ['gooey-nav-indicator', 'active-pill-slide', 'dock-proximity-scale'],
    guidance: 'Use gooey nav for playful route selection, active pill for product controls, and dock proximity scale for compact icon launchers.',
  },
  {
    title: 'Bubble Menu vs Card Nav',
    entries: ['bubble-menu-expand', 'card-nav-expand', 'staggered-menu-open'],
    guidance: 'Use bubble menu for a few compact actions, card nav for destination groups with context, and staggered menu for short link lists.',
  },
  {
    title: 'Folder Reveal vs Accordion',
    entries: ['folder-open-reveal', 'accordion-expand', 'popover-coach-step'],
    guidance: 'Use folder reveal when the storage/grouping metaphor is real, accordion for normal disclosure, and popover when the content is guidance rather than nested material.',
  },
  {
    title: 'Creative Atmosphere vs Product Explanation',
    entries: ['aurora-shader-background', 'morphing-gradient-blob', 'floating-product-object'],
    guidance: 'Use atmosphere when mood supports the message; use product objects when users need to understand what the product is. Do not let background motion carry critical meaning.',
  },
  {
    title: 'AI Orb vs Tool Timeline',
    entries: ['ai-thinking-orb', 'tool-call-timeline', 'indeterminate-progress-bar'],
    guidance: 'Use an orb for ambient presence, a timeline for observable agent work, and indeterminate progress for unknown waits without fabricated detail.',
  },
  {
    title: 'Particle Network vs Knowledge Graph',
    entries: ['particle-network-field', 'animated-knowledge-graph', 'orbital-feature-system'],
    guidance: 'Use particle networks for subtle system atmosphere, knowledge graphs for real relationships, and orbital systems for high-level feature ecosystems.',
  },
  {
    title: 'Scroll Stack vs Timeline',
    entries: ['scroll-stack-cards', 'timeline-reveal', 'stagger-list-reveal'],
    guidance: 'Use scroll stack for short narrative sequences, timeline reveal for dated or milestone order, and stagger list reveal for ordinary unordered content.',
  },
];

export const recipes = [
  {
    title: 'Form Submit Feedback Chain',
    entries: ['button-loading-state', 'spinner', 'toast-notification', 'success-screen-transition'],
    summary: 'Disable the submitted button, show local progress, then confirm with a toast or success view depending on task importance.',
  },
  {
    title: 'List Loading Chain',
    entries: ['skeleton-screen', 'shimmer-loader', 'staggered-load', 'empty-state-illustration'],
    summary: 'Show structure while data loads, hand off to staggered content reveal, and handle the empty result without feeling broken.',
  },
  {
    title: 'Search Experience Chain',
    entries: ['expandable-search-bar', 'spinner', 'no-search-results-animation', 'staggered-load'],
    summary: 'Make search available, indicate fast querying, then distinguish result reveal from a true no-result state.',
  },
  {
    title: 'Upload Chain',
    entries: ['progress-bar', 'indeterminate-progress-bar', 'checkmark-draw-animation', 'error-cross-draw'],
    summary: 'Prefer real progress, fall back to indeterminate motion only when progress is unknown, then show clear completion or retry feedback.',
  },
  {
    title: 'Onboarding Chain',
    entries: ['popover-coach-step', 'focus-ring-highlight', 'step-indicator-motion', 'progressive-checklist-fill'],
    summary: 'Explain the current step, highlight the exact control, show sequence progress, and make completion visibly accumulate.',
  },
  {
    title: 'Analytics Reveal Chain',
    entries: ['number-ticker', 'line-chart-draw', 'chart-bar-growth', 'timeline-reveal'],
    summary: 'Reveal the headline metric, draw the trend, compare categories, and then show the ordered milestones behind the change.',
  },
  {
    title: 'Expressive Landing Interaction Chain',
    entries: ['target-cursor-lock', 'click-spark-feedback', 'pixel-dissolve-transition', 'logo-loop-marquee'],
    summary: 'Use target-aware hover, tactile click reward, a stylized reveal, and ambient social proof only on pages where personality is part of the product.',
  },
  {
    title: 'Compact Navigation Chain',
    entries: ['card-nav-expand', 'staggered-menu-open', 'active-pill-slide'],
    summary: 'Expose grouped destinations with card nav, use short staggered lists for compact menus, and preserve selected state with an active indicator.',
  },
  {
    title: 'Product Story Scroll Chain',
    entries: ['scroll-progress-bar', 'scroll-stack-cards', 'timeline-reveal'],
    summary: 'Orient the reader with scroll progress, reveal a short stacked sequence, then use a timeline when the order becomes milestone-based.',
  },
  {
    title: 'Creative Product Story Chain',
    entries: ['kinetic-headline-reveal', 'floating-product-object', 'interactive-3d-card-stack', 'svg-path-drawing'],
    summary: 'Open with one strong message, make the product tangible, reveal feature depth only when it preserves scanning, and use path drawing for meaningful journeys or diagrams.',
  },
  {
    title: 'AI System Explanation Chain',
    entries: ['tool-call-timeline', 'animated-knowledge-graph', 'data-stream-tunnel', 'ai-thinking-orb'],
    summary: 'Show accountable tool states first, explain relationships when they are the product value, reserve flow visuals for real pipelines, and keep AI orbs as ambient status only.',
  },
  {
    title: 'Interactive Choice Chain',
    entries: ['scale-on-press', 'active-pill-slide', 'fade-transition'],
    summary: 'Give the tap a small press response, slide the selected pill to preserve state continuity, then fade the content into the newly selected result.',
  },
];

export const antiPatterns = [
  {
    title: 'Endless Spinner',
    problem: 'A spinner that runs for long waits without explaining what is happening.',
    better: ['skeleton-screen', 'progress-bar', 'offline-state-indicator'],
  },
  {
    title: 'Fake Progress Bar',
    problem: 'A determinate bar that advances without real progress data and then stalls near the end.',
    better: ['indeterminate-progress-bar', 'spinner'],
  },
  {
    title: 'Slow Modal Entrance',
    problem: 'A modal that feels theatrical when the user expects immediate task focus.',
    better: ['modal-enter-exit', 'fade-transition'],
  },
  {
    title: 'Aggressive Hover Motion',
    problem: 'Cards jump, tilt, or shift so much that scanning a grid becomes unstable.',
    better: ['hover-lift-effect', 'directional-hover-card'],
  },
  {
    title: 'No Reduced Motion Fallback',
    problem: 'Large parallax, blur, or looping motion runs for every user regardless of accessibility preferences.',
    better: ['fade-transition', 'scroll-reveal'],
  },
  {
    title: 'Pulsing Everything',
    problem: 'Several notification dots, hotspots, or focus rings pulse at the same time and make the interface feel noisy.',
    better: ['notification-dot-pulse', 'focus-ring-highlight', 'toast-notification'],
  },
  {
    title: 'Chart Theater',
    problem: 'Every chart animates on every refresh, delaying the values users opened the dashboard to inspect.',
    better: ['line-chart-draw', 'chart-bar-growth', 'data-tweening'],
  },
  {
    title: 'Generic Tech Wallpaper',
    problem: 'Particles, shaders, or 3D objects are added because they look futuristic, but they do not explain the product and can hurt readability or performance.',
    better: ['aurora-shader-background', 'particle-network-field', 'floating-product-object'],
  },
  {
    title: 'Fabricated System Graph',
    problem: 'A graph, orbit, or data tunnel implies relationships, flows, or real-time activity that the product does not actually have.',
    better: ['animated-knowledge-graph', 'tool-call-timeline', 'data-stream-tunnel'],
  },
  {
    title: 'Custom Cursor Everywhere',
    problem: 'A custom target cursor or proximity dock is applied to ordinary product controls and slows down basic navigation.',
    better: ['target-cursor-lock', 'dock-proximity-scale', 'hover-lift-effect'],
  },
  {
    title: 'Hidden Primary Actions',
    problem: 'A bubble menu hides the most important action behind an unlabeled floating button.',
    better: ['bubble-menu-expand', 'button-loading-state', 'card-nav-expand'],
  },
  {
    title: 'Over-Staggered Menus',
    problem: 'Every menu item waits for a long sequence before the user can scan or use navigation.',
    better: ['staggered-menu-open', 'drawer-sidebar-slide', 'fade-transition'],
  },
];
