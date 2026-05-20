import { AnimationEntry } from '@/types/entry';

/**
 * Motion Guide Animation Entries
 * 
 * IMPLEMENTATION POLICY:
 * - Tier 1 (P1): Use CSS animations and Framer Motion only
 * - Tier 2 (P2): Use Remotion only if CSS/Framer Motion cannot achieve the effect
 * - Tier 3 (P3): Full Remotion video generation (future)
 * 
 * This policy minimizes resource usage while maintaining high-quality demos.
 */

export const entries: AnimationEntry[] = [
  {
    id: 1,
    slug: 'skeleton-screen',
    nameEn: 'Skeleton Screen',
    aliasesEn: [
      'skeleton loader',
      'gray placeholder',
      'loading placeholder',
      'shimmer card',
      'content placeholder',
      'loading skeleton',
    ],
    category: 'Waiting & Loading',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description:
      'A placeholder UI that mimics the shape and layout of your actual content before it loads. Shows gray blocks where text, images, and UI elements will appear, reducing perceived waiting time.',
    whenToUse: [
      'Loading content that takes 1-3 seconds (longer than a spinner feels appropriate)',
      'Dashboard cards, social feeds, or list views where layout is predictable',
      'First-time app loads where users need context about what\'s coming',
      'Mobile apps where network speed varies significantly',
    ],
    whenNotToUse: [
      'Instant data fetches under 300ms (unnecessary visual noise)',
      'Unpredictable layouts where skeleton won\'t match real content',
      'Error states (skeleton implies success is coming)',
    ],
    configTips: [
      'Match skeleton block dimensions to your actual content layout for seamless transition',
      'Adjust shimmer opacity and speed to match your design system (lighter themes need higher opacity)',
      'Use CSS custom properties for colors so skeleton adapts to light/dark mode automatically',
      'Time the fade-out animation (300-400ms) to coincide with content fade-in for smooth handoff',
    ],
    seenIn: ['LinkedIn', 'Facebook', 'YouTube', 'Notion'],
    pageTypes: ['Dashboard', 'Social Feed', 'E-commerce', 'Blog', 'Admin Panel'],
    useCases: ['Data Loading', 'Content Refresh', 'List Population'],
    bestFor: 'Loading predictable card, feed, table, or dashboard layouts where users benefit from seeing the shape of incoming content.',
    avoidWhen: 'Avoid for instant fetches, unknown layouts, or states that might fail instead of resolving to real content.',
    durationGuidance: 'Best for waits around 700ms to 3s; fade out in 250-400ms when real content appears.',
    easingGuidance: 'Use linear shimmer motion, then ease-out for the content handoff.',
    motionRisk: ['feels_slow', 'accessibility_sensitive'],
    alternatives: ['spinner', 'progress-bar', 'pulse-placeholder'],
    decisionNote: 'Choose skeletons when layout context matters more than showing generic activity.',
    promptV0: `Add a skeleton loading animation to my card. Show gray placeholder blocks for avatar, name, and text lines. Include a subtle shimmer effect that sweeps across.`,
    promptCursor: `Build a SkeletonCard component with TypeScript and Tailwind CSS. Props: isLoading (boolean), children (ReactNode). When isLoading is true, render a skeleton layout with animated shimmer using CSS @keyframes and linear-gradient background. The shimmer should move horizontally across gray placeholder blocks. Support dark mode via dark: classes. Use framer-motion to fade between skeleton and loaded states.`,
    promptCSS: `Create a skeleton loader using only HTML and CSS. Use div elements with gray background-color (#e0e0e0) to represent content blocks. Add a shimmer effect by layering a linear-gradient that animates from left to right using @keyframes and background-position. Make it loop infinitely with a 2-second duration. No JavaScript required.`,
    codeTailwind: `export function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 p-6">
      {/* Avatar */}
      <div className="h-16 w-16 rounded-full bg-zinc-800" />
      
      {/* Name */}
      <div className="mt-4 h-6 w-32 rounded bg-zinc-800" />
      
      {/* Bio lines */}
      <div className="mt-3 space-y-2">
        <div className="h-4 w-full rounded bg-zinc-800" />
        <div className="h-4 w-4/5 rounded bg-zinc-800" />
      </div>
      
      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <div className="h-10 w-24 rounded bg-zinc-800" />
        <div className="h-10 w-24 rounded bg-zinc-800" />
      </div>
      
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}`,
    relatedSlugs: ['shimmer-loader', 'pulse-placeholder', 'blur-fade-in'],
  },
  {
    id: 2,
    slug: 'shimmer-loader',
    nameEn: 'Shimmer / Sweep Loader',
    aliasesEn: [
      'shimmer effect',
      'sweep animation',
      'shine loader',
      'loading shimmer',
      'scanning effect',
      'wave loader',
    ],
    category: 'Waiting & Loading',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description:
      'An animated highlight that sweeps horizontally across placeholder content, creating the illusion of activity and reducing perceived wait time. Often combined with skeleton screens.',
    whenToUse: [
      'Enhancing skeleton screens to show the system is working',
      'Loading states longer than 1 second where a static placeholder feels dead',
      'Card layouts, list items, or table rows during data fetch',
      'When you want to indicate "processing" rather than "broken"',
    ],
    whenNotToUse: [
      'Very fast loads under 500ms (shimmer may not complete a full cycle)',
      'When the content area is extremely narrow (shimmer won\'t be visible)',
      'Accessibility-critical contexts where animation might cause issues',
    ],
    configTips: [
      'Adjust shimmer gradient opacity (via-white/10 to via-white/20) to ensure visibility against your background color',
      'Fine-tune animation duration (1.5-2.5s) - faster feels urgent, slower feels relaxed',
      'Use CSS easing functions (ease-out or ease-in-out) for more natural motion',
      'Consider respecting prefers-reduced-motion media query for accessibility',
    ],
    seenIn: ['Facebook', 'LinkedIn', 'Medium', 'Slack'],
    pageTypes: ['Dashboard', 'Social Feed', 'E-commerce', 'Blog', 'Admin Panel'],
    useCases: ['Data Loading', 'Content Refresh', 'List Population'],
    bestFor: 'Making an existing placeholder feel alive during medium-length content loading.',
    avoidWhen: 'Avoid if the placeholder is tiny, the load is instant, or the interface already has many looping animations.',
    durationGuidance: 'A 1.5-2.5s sweep usually feels calm; faster cycles can make loading feel urgent.',
    easingGuidance: 'Linear or very soft ease-in-out sweeps work best because the motion is decorative and continuous.',
    motionRisk: ['accessibility_sensitive', 'overdesigned'],
    alternatives: ['skeleton-screen', 'pulse-placeholder', 'indeterminate-progress-bar'],
    decisionNote: 'Use shimmer as an enhancer to skeletons, not as the whole loading strategy.',
    promptV0: `Add a shimmer loading effect. Create an animated highlight that sweeps left to right across the content while loading.`,
    promptCursor: `Create a Shimmer component using Tailwind CSS. Implement a sweeping highlight effect using a linear gradient animated with CSS keyframes. The gradient should move horizontally from translateX(-100%) to translateX(100%) over 2 seconds. Use bg-gradient-to-r from transparent via white/10 to transparent. Apply overflow-hidden to the parent container. Make it reusable as a wrapper component that accepts children.`,
    promptCSS: `Build a pure CSS shimmer animation. Use @keyframes to animate a pseudo-element (::before or ::after) that contains a linear-gradient. The gradient should have three color stops: transparent, white with low opacity, transparent. Animate the transform: translateX() property from -100% to 100%. Set animation duration to 1.5-2s with infinite iteration. Apply to a relative-positioned container.`,
    codeTailwind: `export function ShimmerLoader({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) {
  if (!isLoading) return <>{children}</>;
  
  return (
    <div className="relative overflow-hidden rounded-lg bg-zinc-900 p-6">
      {/* Content skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-3/4 rounded bg-zinc-800" />
        <div className="h-4 w-full rounded bg-zinc-800" />
        <div className="h-4 w-5/6 rounded bg-zinc-800" />
      </div>
      
      {/* Shimmer animation */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}`,
    relatedSlugs: ['skeleton-screen', 'pulse-placeholder', 'staggered-load'],
  },
  {
    id: 3,
    slug: 'spinner',
    nameEn: 'Spinner / Loading Circle',
    aliasesEn: [
      'loading spinner',
      'loading circle',
      'loading wheel',
      'circular loader',
      'rotating loader',
      'loading indicator',
    ],
    category: 'Waiting & Loading',
    difficulty: 'paste_go',
    mediaTier: 1,
    description:
      'A circular animated icon that rotates continuously, signaling that a process is underway. The most universally recognized loading indicator.',
    whenToUse: [
      'Button loading states (disable button, show spinner inside)',
      'Short wait times under 2 seconds where layout isn\'t important',
      'Centered loading for full-page or modal content',
      'Action confirmation (e.g., "Saving..." with spinner)',
    ],
    whenNotToUse: [
      'Long waits over 3 seconds (use progress bar or skeleton instead)',
      'When users need to understand what percentage is complete',
      'List or grid layouts where skeleton screen provides better context',
    ],
    seenIn: ['GitHub', 'Gmail', 'Vercel', 'Stripe Dashboard'],
    pageTypes: ['Dashboard', 'Landing Page', 'E-commerce', 'Social Feed', 'Chat Interface', 'Blog', 'Admin Panel', 'Portfolio', 'SaaS App', 'Mobile App', 'Documentation', 'Form/Survey'],
    useCases: ['Data Loading', 'Form Submission', 'File Upload', 'Authentication'],
    bestFor: 'Short, unknown waits where the interface cannot show layout or percentage progress.',
    avoidWhen: 'Avoid for waits over 3s, visible list loading, or operations where users need completion confidence.',
    durationGuidance: 'Rotate in 700-1000ms per cycle; if it remains visible past 2-3s, pair it with explanatory text.',
    easingGuidance: 'Use linear rotation so the loop feels stable and does not imply progress jumps.',
    motionRisk: ['feels_slow', 'misleading_progress'],
    alternatives: ['skeleton-screen', 'progress-bar', 'indeterminate-progress-bar'],
    decisionNote: 'Choose a spinner only when you need the smallest possible loading signal.',
    promptV0: `Create a loading spinner - a rotating circular ring that spins continuously. Make it 24px and easy to drop into buttons.`,
    promptCursor: `Build a Spinner component using Tailwind CSS. Create a circular border with border-4, make the top border transparent to create a ring shape, and animate rotation using animate-spin. Export as a reusable component with size variants (sm: 16px, md: 24px, lg: 32px). Accept className prop for custom styling. Include proper aria-label for screen readers.`,
    promptCSS: `Create a CSS-only loading spinner. Use a div with border-radius: 50%, a solid border, and one transparent border side to create a ring shape. Animate using @keyframes with transform: rotate(360deg). Set animation duration to 0.8-1s with linear easing and infinite iteration. Make it 24px × 24px by default.`,
    codeTailwind: `export function Spinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-3',
    lg: 'h-8 w-8 border-4',
  };
  
  return (
    <div
      className={\`\${sizeClasses[size]} animate-spin rounded-full border-zinc-700 border-t-amber-warm \${className}\`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}`,
    relatedSlugs: ['progress-bar', 'typing-dots', 'pulse-placeholder'],
  },
  {
    id: 4,
    slug: 'progress-bar',
    nameEn: 'Progress Bar',
    aliasesEn: [
      'loading bar',
      'progress indicator',
      'completion bar',
      'percentage bar',
      'loading progress',
    ],
    category: 'Waiting & Loading',
    difficulty: 'paste_go',
    mediaTier: 1,
    description:
      'A horizontal bar that fills from left to right, showing the percentage of a task that\'s complete. Gives users a sense of how much longer they need to wait.',
    whenToUse: [
      'File uploads or downloads where progress is trackable',
      'Multi-step forms or onboarding flows ("Step 2 of 5")',
      'Data processing with measurable completion (e.g., import progress)',
      'Any wait over 3 seconds where percentage completion is known',
    ],
    whenNotToUse: [
      'When you don\'t know actual progress (use indeterminate spinner instead)',
      'Very fast operations under 1 second',
      'When the progress is unpredictable or could move backwards',
    ],
    seenIn: ['YouTube', 'Stripe Checkout', 'GitHub Actions', 'Notion Import'],
    pageTypes: ['Dashboard', 'E-commerce', 'Admin Panel', 'SaaS App', 'Mobile App', 'Form/Survey'],
    useCases: ['File Upload', 'Form Submission', 'Data Loading'],
    bestFor: 'Uploads, imports, setup flows, and long tasks where the app can measure completion.',
    avoidWhen: 'Avoid when progress is unknown or the system may stall near the end.',
    durationGuidance: 'Animate width changes in 200-400ms; for multi-second tasks, update with real measured increments.',
    easingGuidance: 'Ease-out individual width updates, but never fake smooth motion that hides actual task state.',
    motionRisk: ['misleading_progress', 'feels_slow'],
    alternatives: ['spinner', 'indeterminate-progress-bar', 'progress-ring'],
    decisionNote: 'Choose a progress bar when the user needs confidence about how much work remains.',
    promptV0: `Create a progress bar that shows completion percentage. The bar should fill from left to right with smooth transitions. Display the percentage number.`,
    promptCursor: `Build a ProgressBar component with TypeScript. Props: progress (number 0-100), showLabel (boolean), variant ('primary' | 'success' | 'error'). Use Tailwind to create a background track (bg-zinc-800) and a colored fill bar that animates width using transition-all. The fill width should be calculated as width: \`\${progress}%\`. Add rounded corners and optional percentage label. Support dark mode.`,
    promptCSS: `Create a progress bar with pure CSS and minimal HTML. Use two nested divs: outer div as the track (background-color: #ddd, height: 8px, border-radius: 4px), inner div as the fill (background-color: #4caf50, height: 100%). The inner div's width represents progress and should be set inline (e.g., width: 65%). Add transition: width 0.3s ease for smooth updates.`,
    codeTailwind: `export function ProgressBar({ 
  progress, 
  showLabel = true,
  variant = 'primary' 
}: { 
  progress: number; 
  showLabel?: boolean;
  variant?: 'primary' | 'success' | 'error';
}) {
  const colors = {
    primary: 'bg-amber-warm',
    success: 'bg-green-500',
    error: 'bg-red-500',
  };
  
  return (
    <div className="w-full">
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className={\`h-full transition-all duration-300 ease-out \${colors[variant]}\`}
          style={{ width: \`\${Math.min(100, Math.max(0, progress))}%\` }}
        />
      </div>
      {showLabel && (
        <div className="mt-2 text-right text-sm text-zinc-400">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
}`,
    relatedSlugs: ['spinner', 'typing-dots', 'skeleton-screen'],
  },
  {
    id: 5,
    slug: 'typing-dots',
    nameEn: 'Typing Dots (AI Reply)',
    aliasesEn: [
      'typing indicator',
      'three dots',
      'ellipsis animation',
      'thinking dots',
      'AI loading',
      'chat typing',
    ],
    category: 'Waiting & Loading',
    difficulty: 'paste_go',
    mediaTier: 1,
    description:
      'Three animated dots that pulse sequentially, indicating that an AI or person is typing a response. Creates anticipation and confirms the system is processing.',
    whenToUse: [
      'AI chat interfaces while the model generates a response',
      'Messaging apps to show someone is typing',
      'Conversational UIs where response time is 2-10 seconds',
      'After user submits a question and waits for an answer',
    ],
    whenNotToUse: [
      'Non-conversational contexts (use spinner or progress instead)',
      'When response time is instant or under 1 second',
      'Loading large data sets (use skeleton or progress bar)',
    ],
    seenIn: ['ChatGPT', 'Claude', 'iMessage', 'Slack', 'WhatsApp'],
    pageTypes: ['Chat Interface', 'SaaS App', 'Mobile App'],
    useCases: ['Content Reveal'],
    promptV0: `Add a typing indicator with three dots that pulse in sequence. Show it when AI or user is typing a response.`,
    promptCursor: `Create a TypingDots component with 3 spans that animate sequentially. Use Tailwind CSS and animation-delay to stagger the opacity animation. Each dot should be a rounded circle (w-2 h-2 rounded-full bg-zinc-400). Apply an opacity animation that fades from 30% to 100% over 1.4s, with delays of 0s, 0.2s, 0.4s for the three dots. Make it loop infinitely.`,
    promptCSS: `Build typing dots with pure CSS. Create 3 span elements, each with border-radius: 50%, width: 6px, height: 6px, background-color: #999. Use @keyframes to animate opacity from 0.3 to 1. Apply animation-delay of 0s, 0.2s, 0.4s to create the sequential effect. Duration: 1.4s, infinite iteration, ease-in-out timing.`,
    codeTailwind: `export function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      <div className="h-2 w-2 animate-typing-dots rounded-full bg-zinc-400" style={{ animationDelay: '0s' }} />
      <div className="h-2 w-2 animate-typing-dots rounded-full bg-zinc-400" style={{ animationDelay: '0.2s' }} />
      <div className="h-2 w-2 animate-typing-dots rounded-full bg-zinc-400" style={{ animationDelay: '0.4s' }} />
    </div>
  );
}

// Add to globals.css:
// @keyframes typing-dots {
//   0%, 60%, 100% { opacity: 0.3; }
//   30% { opacity: 1; }
// }`,
    relatedSlugs: ['spinner', 'pulse-placeholder', 'blur-fade-in'],
  },
  {
    id: 6,
    slug: 'pulse-placeholder',
    nameEn: 'Pulse Placeholder',
    aliasesEn: [
      'pulsing loader',
      'breathing animation',
      'pulse effect',
      'fade pulse',
      'loading pulse',
    ],
    category: 'Waiting & Loading',
    difficulty: 'paste_go',
    mediaTier: 1,
    description:
      'A gentle fade-in-fade-out animation applied to placeholder content, creating a "breathing" effect. Softer and more subtle than shimmer.',
    whenToUse: [
      'Loading states where shimmer feels too aggressive',
      'Image placeholders before the real image loads',
      'Empty avatar circles in user lists during fetch',
      'Minimalist designs where subtlety is key',
    ],
    whenNotToUse: [
      'When you need to convey percentage progress',
      'Very short loads under 500ms (pulse cycle may not complete)',
      'Contexts where skeleton or shimmer provides better layout context',
    ],
    seenIn: ['Twitter/X', 'Instagram', 'Figma', 'Linear'],
    pageTypes: ['Portfolio', 'Blog', 'Social Feed', 'E-commerce'],
    useCases: ['Data Loading', 'Content Refresh'],
    promptV0: `Create pulsing placeholders for images or text blocks. They should gently fade in and out with a breathing effect while loading.`,
    promptCursor: `Build a PulsePlaceholder component using Tailwind's animate-pulse utility. Create a simple div with bg-zinc-800 and rounded corners. The built-in animate-pulse class will handle the opacity animation. Accept size and shape props (circle, square, rectangle). For custom timing, override the pulse animation in tailwind.config with a 2s duration instead of default 1.5s.`,
    promptCSS: `Create a pulsing placeholder with CSS. Use a div with background-color: #ddd. Add @keyframes pulse with two steps: 0% { opacity: 1; } and 50% { opacity: 0.5; }. Apply animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite. This creates a smooth breathing effect. No JavaScript needed.`,
    codeTailwind: `export function PulsePlaceholder({ 
  shape = 'rectangle',
  className = '' 
}: { 
  shape?: 'circle' | 'square' | 'rectangle';
  className?: string;
}) {
  const shapes = {
    circle: 'rounded-full aspect-square',
    square: 'rounded-lg aspect-square',
    rectangle: 'rounded-lg',
  };
  
  return (
    <div
      className={\`animate-pulse-slow bg-zinc-800 \${shapes[shape]} \${className}\`}
      aria-label="Loading content"
    />
  );
}`,
    relatedSlugs: ['skeleton-screen', 'shimmer-loader', 'blur-fade-in'],
  },
  {
    id: 7,
    slug: 'blur-fade-in',
    nameEn: 'Blur Fade-in',
    aliasesEn: [
      'blur to clear',
      'focus fade',
      'blur reveal',
      'defocus animation',
      'blur transition',
    ],
    category: 'Waiting & Loading',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description:
      'Content fades in while simultaneously transitioning from blurred to sharp focus, creating a cinematic reveal effect. More sophisticated than a simple fade.',
    whenToUse: [
      'Hero images or headline text on page load',
      'Card content after skeleton screen completes',
      'Gallery images loading progressively',
      'When you want a premium, polished feel for content reveals',
    ],
    whenNotToUse: [
      'Frequent, repetitive content updates (can feel heavy)',
      'Accessibility contexts where blur might cause readability issues',
      'Performance-constrained environments (blur is GPU-intensive)',
    ],
    configTips: [
      'Adjust blur intensity (filter: blur(8px-12px)) - higher values create more drama but may hurt readability mid-transition',
      'Combine with scale or translateY for added depth (e.g., initial scale: 0.95)',
      'Set duration to 0.4-0.6s - shorter feels snappy, longer feels luxurious',
      'Add will-change: filter, opacity to hint browser for GPU optimization',
    ],
    seenIn: ['Linear', 'Vercel', 'Apple Marketing Pages', 'Stripe'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Content Reveal'],
    promptV0: `Make my content fade in from blurred to sharp focus when it loads. Create a cinematic reveal effect for hero sections.`,
    promptCursor: `Create a BlurFadeIn component using framer-motion. Use the motion.div element with initial, animate, and transition props. Initial state: { opacity: 0, filter: 'blur(10px)' }. Animate state: { opacity: 1, filter: 'blur(0px)' }. Transition: { duration: 0.5, ease: 'easeOut' }. Wrap any content that should blur-fade in. Optionally add a delay prop for staggering multiple elements.`,
    promptCSS: `Build a blur fade-in using CSS animations. Create @keyframes blur-fade-in with three steps: 0% { opacity: 0; filter: blur(10px); }, 100% { opacity: 1; filter: blur(0); }. Apply animation: blur-fade-in 0.6s ease-out forwards. For better performance, consider using will-change: opacity, filter. Note: Requires browser support for filter property.`,
    codeTailwind: `'use client';
import { motion } from 'framer-motion';

export function BlurFadeIn({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: 'easeOut' 
      }}
    >
      {children}
    </motion.div>
  );
}`,
    relatedSlugs: ['staggered-load', 'skeleton-screen', 'pulse-placeholder'],
  },
  {
    id: 8,
    slug: 'staggered-load',
    nameEn: 'Staggered Item Load',
    aliasesEn: [
      'stagger animation',
      'sequential load',
      'cascading reveal',
      'stagger reveal',
      'item cascade',
      'sequential animation',
    ],
    category: 'Waiting & Loading',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description:
      'List items or grid cards appear one after another with a small delay between each, creating a cascading reveal effect. Adds rhythm and polish to content-heavy pages.',
    whenToUse: [
      'Dashboard cards that load all at once but should feel orchestrated',
      'Search results or filtered lists appearing on screen',
      'Gallery grids or product catalogs',
      'Feature sections on marketing pages',
    ],
    whenNotToUse: [
      'More than 20-30 items (long stagger becomes annoying)',
      'Time-critical data where instant display is important',
      'Paginated content that users scroll through quickly',
    ],
    configTips: [
      'Set stagger delay between 0.05s-0.15s per item - 0.1s is a good default for most grids',
      'Limit staggering to first 10-15 items if list is very long (use instant reveal for rest)',
      'Adjust initial y-offset (10px-30px) based on item size - larger cards need more travel',
      'Use ease-out timing function for more natural deceleration as items settle',
    ],
    seenIn: ['Linear', 'Notion', 'Vercel Dashboard', 'Stripe'],
    pageTypes: ['Dashboard', 'E-commerce', 'Portfolio', 'Blog'],
    useCases: ['List Population', 'Search Results', 'Content Reveal'],
    promptV0: `Make my grid cards appear one by one with a staggered fade-in effect. Each item should slide up slightly with a small delay between them.`,
    promptCursor: `Create a StaggeredGrid component using framer-motion. Wrap the grid in a motion.div with staggerChildren: 0.1 in the transition prop. Each child item should be a motion.div with initial={{ opacity: 0, y: 20 }} and animate={{ opacity: 1, y: 0 }}. The parent container should have variants for container and item to enable staggering. Duration: 0.4s per item, ease: easeOut.`,
    promptCSS: `Implement staggered animation with CSS animation-delay. Create @keyframes fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }. Apply animation: fade-up 0.4s ease-out forwards to each item. Use nth-child selectors to add incremental delay: .item:nth-child(1) { animation-delay: 0s; }, .item:nth-child(2) { animation-delay: 0.1s; }, etc. Set initial opacity: 0 on items.`,
    codeTailwind: `'use client';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export function StaggeredGrid({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}`,
    relatedSlugs: ['blur-fade-in', 'skeleton-screen', 'shimmer-loader'],
  },
  {
    id: 69,
    slug: 'number-ticker',
    nameEn: 'Number Ticker / Counting Animation',
    aliasesEn: ['counting numbers', 'number scroll', 'animated counter', 'odometer', 'ticking numbers', 'number increment'],
    category: 'Data & Content Visualization',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'Numbers actively counting up from zero to their final value. Makes data updates feel dynamic and draws attention to key metrics.',
    whenToUse: [
      'KPI dashboards when numbers load or refresh',
      'Milestone celebrations (e.g., reaching 1M users)',
      'E-commerce stats like total sales or active users',
      'Checkout pages showing total price calculation'
    ],
    whenNotToUse: [
      'Data tables with many numbers (can cause motion sickness)',
      'Values that change extremely frequently (use simple text replacement)',
      'Negative or error values where animation feels inappropriately celebratory'
    ],
    configTips: [
      'Use tabular-nums CSS to prevent horizontal jitter during counting',
      'Use an ease-out timing function so counting slows down as it reaches the target',
      'Format output with commas or currency symbols (Intl.NumberFormat)'
    ],
    seenIn: ['Stripe', 'Vercel', 'Notion HQ Dashboard', 'Apple Fitness'],
    pageTypes: ['Dashboard', 'Landing Page', 'SaaS App'],
    useCases: ['Data Loading', 'Content Reveal'],
    promptV0: `Add a number counting animation for my stats card. The number should count up from 0 to the target value smoothly over 2 seconds.`,
    promptCursor: `Build an AnimatedCounter component that accepts a 'value' prop (number). Use framer-motion's useSpring and useTransform hooks to animate the number from 0 to 'value'. The text should use font-variant-numeric: tabular-nums to prevent jitter. Format the ongoing number using Intl.NumberFormat. Make the animation ease-out over 2 seconds.`,
    promptCSS: `Create a CSS-property driven number counter. Use @property to define a custom integer property --num. Animate --num from 0 to target value. Note: CSS-only counting has limited browser support; typically requires JS or simple translation of a vertical number strip (odometer effect).`,
    codeTailwind: `'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export function AnimatedCounter({ value }: { value: number }) {
  const springValue = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });
  const displayValue = useTransform(springValue, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    springValue.set(value);
  }, [springValue, value]);

  return (
    <motion.span className="tabular-nums text-4xl font-bold tracking-tight text-white">
      {displayValue}
    </motion.span>
  );
}`,
    relatedSlugs: ['chart-bar-growth']
  },
  {
    id: 70,
    slug: 'scroll-reveal',
    nameEn: 'Scroll Reveal / Fade-Up on Scroll',
    aliasesEn: ['fade up on scroll', 'scroll fade in', 'scroll animation', 'reveal animation', 'scroll trigger', 'enter viewport'],
    category: 'Scroll & Navigation',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'Elements remain hidden until they enter the browser viewport, then smoothly fade in and slide up into position. Makes scrolling feel like an active discovery process.',
    whenToUse: [
      'Feature sections on long marketing landing pages',
      'About pages introducing team members or values',
      'Article content to pace the reading experience',
      'To prevent the user from being overwhelmed by a dense page'
    ],
    whenNotToUse: [
      'Critical navigation or header elements',
      'Dense data dashboards or tables',
      'Content that requires immediate reading upon fast scroll'
    ],
    configTips: [
      'Set viewport margin to trigger somewhat before the element is fully visible (e.g., once 20% is in view)',
      'Add slight stagger delay (0.1s) to adjacent elements revealing simultaneously',
      'Only run the animation once (triggerOnce: true) so it doesn\'t re-trigger when scrolling up'
    ],
    seenIn: ['Apple', 'Stripe', 'Linear', 'Arc Browser'],
    pageTypes: ['Landing Page', 'Portfolio', 'Blog'],
    useCases: ['Content Reveal'],
    promptV0: `Make my landing page sections fade in and slide up smoothly as I scroll down the page.`,
    promptCursor: `Create a FadeInOnScroll wrapper component using framer-motion. Use the 'whileInView' prop combined with 'initial' to trigger animation when the element enters the viewport. Set viewport={{ once: true, margin: "-100px" }}. The animation should change opacity from 0 to 1 and translateY from 20px to 0. Accept a 'delay' prop for staggering.`,
    promptCSS: `Create a scroll reveal effect using the standard IntersectionObserver API in vanilla JS. When an element intersects, add a class 'is-visible'. Define CSS: .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; } and .fade-up.is-visible { opacity: 1; transform: translateY(0); }.`,
    codeTailwind: `'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function ScrollReveal({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.7, 
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98] // custom smooth ease out
      }}
    >
      {children}
    </motion.div>
  );
}`,
    relatedSlugs: ['staggered-load']
  },
  {
    id: 71,
    slug: 'pulsing-hotspot',
    nameEn: 'Pulsing Hotspot',
    aliasesEn: ['ping dot', 'notification dot', 'attention marker', 'beacon', 'unseen badge', 'onboarding dot'],
    category: 'Onboarding & Tours',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A small circular dot that softly pulses outwards like a sonar ping. Gently draws user attention to unread items or new un-clicked features.',
    whenToUse: [
      'To highlight a newly released feature without obtrusive modals',
      'Over a notification bell icon representing unread alerts',
      'As a spatial marker in an interactive map or image guide',
      'Guiding users to the next necessary step in onboarding'
    ],
    whenNotToUse: [
      'On more than 2 elements at once on the same screen (causes panic/clutter)',
      'For critical errors or destructive actions (use bolder red styles instead)',
      'If the user has already acknowledged the feature'
    ],
    configTips: [
      'Use the brand primary color or an accent color like amber/blue',
      'Position absolutely relative to the icon/text it is highlighting (e.g., top-right corner)',
      'Keep the dot small (e.g., 8-12px) so it doesn\'t break layout'
    ],
    seenIn: ['Slack', 'Figma', 'Linear', 'Discord'],
    pageTypes: ['Dashboard', 'SaaS App', 'Mobile App'],
    useCases: ['Content Reveal', 'Data Loading'],
    promptV0: `Add a pulsing blue dot hotspot to the top right of my notification bell icon to indicate unread status.`,
    promptCursor: `Create a PulseHotspot component using Tailwind CSS 'animate-ping'. Have an outer colored ring with 'animate-ping absolute inset-0 rounded-full opacity-75' and an inner solid dot with 'relative inline-flex rounded-full'. Size both at w-3 h-3. Wrap them in a relative container so it can be absolutely positioned over other icons.`,
    promptCSS: `Create a CSS pulsing dot. Use HTML: <span class="hotspot"><span class="ping"></span><span class="dot"></span></span>. CSS: .ping { position: absolute; width:100%; height:100%; border-radius:50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; } @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }.`,
    codeTailwind: `export function PulsingHotspot({ colorClass = 'bg-blue-500' }: { colorClass?: string }) {
  return (
    <span className="relative flex h-3 w-3">
      {/* The pulsing ring */}
      <span 
        className={\`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 \${colorClass}\`} 
      />
      {/* The solid core dot */}
      <span 
        className={\`relative inline-flex h-3 w-3 rounded-full \${colorClass}\`} 
      />
    </span>
  );
}

// Usage relative to an icon:
// <div className="relative">
//   <BellIcon className="h-6 w-6" />
//   <div className="absolute -top-1 -right-1">
//     <PulsingHotspot colorClass="bg-red-500" />
//   </div>
// </div>`,
    relatedSlugs: ['pulse-placeholder']
  },
  {
    id: 16,
    slug: 'button-loading-state',
    nameEn: 'Button Loading State',
    aliasesEn: ['loading button', 'submit button spinner', 'button progress'],
    category: 'Action Feedback',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A button that transitions into a loading state upon being clicked, usually by replacing text with a spinner or adding a spinner next to the text while disabling further clicks.',
    whenToUse: [
      'Form submissions',
      'Saving data',
      'Async actions that take >300ms'
    ],
    whenNotToUse: [
      'Instant client-side actions',
      'Navigation links'
    ],
    configTips: [
      'Disable the button while loading to prevent double submissions',
      'Ensure the button does not resize when the text swaps to a spinner'
    ],
    seenIn: ['Stripe', 'Vercel', 'Linear'],
    pageTypes: ['Form/Survey', 'Dashboard', 'SaaS App'],
    useCases: ['Form Submission', 'Authentication'],
    bestFor: 'Preventing duplicate submissions while keeping feedback anchored to the control the user clicked.',
    avoidWhen: 'Avoid for instant local toggles, links, or actions where disabling the button would hide available recovery.',
    durationGuidance: 'Show only after roughly 250-300ms to avoid flashing on fast actions; keep width stable throughout.',
    easingGuidance: 'Use a quick ease-out opacity or icon swap; the spinner itself should rotate linearly.',
    motionRisk: ['feels_slow'],
    alternatives: ['spinner', 'toast-notification', 'success-screen-transition'],
    decisionNote: 'Choose button loading for async actions whose feedback belongs exactly where the user acted.',
    promptV0: `Create a submit button that shows a loading spinner when clicked and disables itself.`,
    promptCursor: `Build a Button component with an 'isLoading' prop. When true, show a spinner icon (lucide-react) and disable the button. Maintain the button's width so it doesn't shrink when text is replaced by the spinner.`,
    promptCSS: `Use CSS classes .btn-loading. Hide text and show a pseudo-element spinner.`,
    codeTailwind: `export function ButtonLoading() {}`,
    relatedSlugs: ['spinner']
  },
  {
    id: 28,
    slug: 'fade-transition',
    nameEn: 'Fade Transition',
    aliasesEn: ['opacity fade', 'fade in out', 'crossfade'],
    category: 'Page & View Transitions',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A smooth opacity transition between two states, pages, or components to prevent jarring instant visual changes.',
    whenToUse: [
      'Navigating between tabs',
      'Opening/closing simple modals',
      'Revealing deferred content'
    ],
    whenNotToUse: [
      'High-energy interactions that need spatial awareness (use slides instead)'
    ],
    configTips: [
      'Keep it short: 150ms-200ms is standard for UI fades'
    ],
    seenIn: ['Apple', 'Vercel'],
    pageTypes: ['Landing Page', 'Dashboard', 'Mobile App'],
    useCases: ['Content Reveal', 'Data Loading'],
    bestFor: 'Simple state changes where spatial direction is not meaningful.',
    avoidWhen: 'Avoid when users need to understand where an item moved from or where the next view came from.',
    durationGuidance: 'Use 120-220ms for interface state changes and up to 300ms for larger view swaps.',
    easingGuidance: 'Ease-out for entering content; ease-in for exits; crossfades should stay subtle.',
    motionRisk: ['overdesigned'],
    alternatives: ['slide-transition', 'shared-element-transition', 'blur-fade-in'],
    decisionNote: 'Choose fade when the best motion is the one users barely notice.',
    promptV0: `Add a fade transition when switching between these tabs.`,
    promptCursor: `Use AnimatePresence and motion.div from framer-motion to fade between components mounted/unmounted.`,
    promptCSS: `transition: opacity 0.2s ease;`,
    codeTailwind: `export function FadeTransition() {}`,
    relatedSlugs: ['blur-fade-in']
  },
  {
    id: 39,
    slug: 'error-shake',
    nameEn: 'Error Shake',
    aliasesEn: ['shake animation', 'horizontal wiggle', 'password incorrect'],
    category: 'Empty & Error States',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A quick horizontal shaking motion applied to an element (like an input field) to indicate invalid input or an error, mimicking a head shake.',
    whenToUse: [
      'Incorrect password entry',
      'Form validation failure (empty required field)',
      'Declined payment'
    ],
    whenNotToUse: [
      'System-wide crashes (too playful/annoying)',
      'Success states'
    ],
    configTips: [
      'Pair with a red border and a clear text error message',
      'Keep it fast (around 300ms total)'
    ],
    seenIn: ['Apple iOS', 'Stripe Checkout'],
    pageTypes: ['Form/Survey', 'Landing Page', 'SaaS App'],
    useCases: ['Form Submission', 'Authentication'],
    promptV0: `Make the password input shake left and right if it's incorrect.`,
    promptCursor: `Create an animation using framer-motion that translates x left and right rapidly 3-4 times on error.`,
    promptCSS: `@keyframes shake { ... }`,
    codeTailwind: `export function ErrorShake() {}`,
    relatedSlugs: []
  },
  {
    id: 47,
    slug: 'toast-notification',
    nameEn: 'Toast Notification',
    aliasesEn: ['snackbar', 'alert popup', 'slide-in notification'],
    category: 'Status & Confirmation',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A small, non-obtrusive popup that slides in (usually from the bottom or top right) to provide brief feedback about an operation, then disappears.',
    whenToUse: [
      'Success confirmations (e.g., "Settings saved")',
      'Non-critical errors',
      'Copy to clipboard success'
    ],
    whenNotToUse: [
      'Critical errors requiring user action (use a modal/dialog instead)',
      'Lengthy text'
    ],
    configTips: [
      'Auto-dismiss after 3-5 seconds',
      'Allow users to dismiss it manually',
      'Animate both the entrance (slide in) and exit (fade out)'
    ],
    seenIn: ['Vercel', 'Figma', 'Notion'],
    pageTypes: ['Dashboard', 'Admin Panel', 'SaaS App'],
    useCases: ['Form Submission', 'Content Refresh'],
    bestFor: 'Non-blocking success, copy, save, or lightweight error feedback that should not interrupt the current task.',
    avoidWhen: 'Avoid for critical decisions, destructive confirmations, or messages that require detailed reading.',
    durationGuidance: 'Enter in 180-300ms, stay for 3-5s, and exit in 150-250ms.',
    easingGuidance: 'Use ease-out on entry and ease-in on exit; keep vertical travel short.',
    motionRisk: ['distraction'],
    alternatives: ['success-screen-transition', 'modal-enter-exit', 'offline-state-indicator'],
    decisionNote: 'Choose toast when feedback should be seen but not answered.',
    promptV0: `Add a toast notification that slides in from the bottom right when I click save.`,
    promptCursor: `Build a Toast component using framer-motion that slides in (y: 50 -> 0) and fades out after 3 seconds.`,
    promptCSS: `transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);`,
    codeTailwind: `export function ToastNotificationDemo() {}`,
    relatedSlugs: []
  },
  {
    id: 17,
    slug: 'ripple-effect',
    nameEn: 'Ripple Effect',
    aliasesEn: ['material ripple', 'click wave', 'touch feedback'],
    category: 'Action Feedback',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A circular wave that expands from the point of contact when a user clicks or taps an element, providing immediate spatial feedback.',
    whenToUse: [
      'Text buttons and filled buttons',
      'List items in a mobile app',
      'Card surfaces that are clickable'
    ],
    whenNotToUse: [
      'Small iconic buttons where the ripple obscures the icon',
      'Links inline within text paragraphs'
    ],
    configTips: [
      'Ensure the ripple color has low opacity (e.g., black or white at 10-20% opacity)',
      'Clip the ripple to the container with overflow-hidden'
    ],
    seenIn: ['Google/Material Design', 'Android OS', 'YouTube'],
    pageTypes: ['Mobile App', 'Dashboard', 'Form/Survey'],
    useCases: ['Form Submission', 'Authentication'],
    promptV0: `Add a material design ripple effect to this button that starts where I click.`,
    promptCursor: `Create a RippleButton component. On click or pointer down, get the mouse coordinates relative to the button, create a span element at that position with absolute positioning, and animate its scale from 0 to 4 and opacity from 0.5 to 0 over 600ms. Remove the element after animation.`,
    promptCSS: `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`,
    codeTailwind: `export function RippleEffectDemo() {}`,
    relatedSlugs: ['scale-on-press', 'haptic-bounce']
  },
  {
    id: 18,
    slug: 'haptic-bounce',
    nameEn: 'Haptic Bounce',
    aliasesEn: ['spring bounce', 'tap scale', 'press feedback', 'jelly button'],
    category: 'Action Feedback',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'A physical-feeling spring animation that rapidly shrinks an element on press and bounces it back on release, mimicking a tactile physical button.',
    whenToUse: [
      'Primary call-to-action buttons',
      'Interactive cards or app icons',
      'When you want the UI to feel lively and responsive'
    ],
    whenNotToUse: [
      'Destructive actions',
      'Hyperlinks in text blocks'
    ],
    configTips: [
      'Scale down to around 0.95 or 0.97 - not too much or it feels broken',
      'Use a spring physics curve with high stiffness (400) and moderate damping (30)'
    ],
    seenIn: ['Spotify', 'Apple iOS', 'Duolingo'],
    pageTypes: ['Mobile App', 'Landing Page', 'SaaS App'],
    useCases: ['Form Submission', 'Authentication'],
    promptV0: `Make this button bounce like a spring when pressed and released.`,
    promptCursor: `Wrap the button in a framer-motion motion.button element. Add whileTap={{ scale: 0.95 }} and transition={{ type: "spring", stiffness: 400, damping: 17 }}.`,
    promptCSS: `transform: scale(0.95); transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);`,
    codeTailwind: `export function HapticBounceDemo() {}`,
    relatedSlugs: ['scale-on-press', 'ripple-effect']
  },
  {
    id: 19,
    slug: 'scale-on-press',
    nameEn: 'Scale on Press',
    aliasesEn: ['press down', 'shrink on click', 'button press'],
    category: 'Action Feedback',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A simpler, non-spring version of tactile feedback where an element scales down slightly and instantly when pressed.',
    whenToUse: [
      'Secondary buttons',
      'Icon buttons',
      'Interfaces where pure CSS is preferred over heavy animation libraries'
    ],
    whenNotToUse: [
      'Large structural components'
    ],
    configTips: [
      'Scale down to 0.95 or 0.98 using a fast duration (e.g., 75ms or 100ms)'
    ],
    seenIn: ['GitHub', 'Vercel', 'Notion'],
    pageTypes: ['Dashboard', 'Admin Panel', 'Documentation'],
    useCases: ['Form Submission', 'Content Refresh'],
    promptV0: `Make the button shrink slightly when I click it.`,
    promptCursor: `Add Tailwind classes active:scale-95 transition-transform duration-100 to the button.`,
    promptCSS: `.btn:active { transform: scale(0.95); transition: transform 0.1s; }`,
    codeTailwind: `export function ScaleOnPressDemo() {}`,
    relatedSlugs: ['haptic-bounce', 'hover-lift-effect']
  },
  {
    id: 20,
    slug: 'long-press-feedback',
    nameEn: 'Long Press Feedback',
    aliasesEn: ['hold to action', 'press and hold', 'fill on hold'],
    category: 'Action Feedback',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'A visual indicator (like a filling ring or background) that shows the progress of a long-press action before it executes.',
    whenToUse: [
      'Destructive actions (e.g., "Hold to delete")',
      'Recording audio/video',
      'Revealing hidden secondary menus'
    ],
    whenNotToUse: [
      'Standard navigation',
      'Primary positive actions where speed is important'
    ],
    configTips: [
      'Provide clear visual growth (like a radial progress bar or growing circle)',
      'Set the required hold duration between 500ms and 1500ms'
    ],
    seenIn: ['Instagram (recording)', 'iOS Home Screen', 'Telegram'],
    pageTypes: ['Mobile App', 'Social Feed', 'Chat Interface'],
    useCases: ['Form Submission', 'File Upload'],
    promptV0: `Create a button that requires the user to hold it for 1 second. Show a ring filling up while they hold it.`,
    promptCursor: `Build a LongPressButton component. Use onPointerDown to start a timeout and a framer-motion animation that scales an inner circle. Use onPointerUp and onPointerLeave to clear the timeout and reset the animation.`,
    promptCSS: `transition: width 1s linear;`,
    codeTailwind: `export function LongPressFeedbackDemo() {}`,
    relatedSlugs: ['button-loading-state']
  },
  {
    id: 21,
    slug: 'pull-to-refresh',
    nameEn: 'Pull-to-Refresh',
    aliasesEn: ['swipe down to reload', 'refresh indicator', 'pull gesture'],
    category: 'Action Feedback',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'A gesture-driven reveal of a loading indicator when a user scrolls past the top edge of a content area, triggering a data refresh.',
    whenToUse: [
      'Mobile web apps or PWAs',
      'Feeds and lists that update frequently',
      'Touch-first interfaces'
    ],
    whenNotToUse: [
      'Desktop-heavy interfaces (use a refresh button instead)',
      'Static pages'
    ],
    configTips: [
      'Map the user pull distance directly to the indicator rotation/scale before the threshold is met',
      'Snap to a spinning state once the refresh is triggered'
    ],
    seenIn: ['Twitter', 'Chrome Mobile', 'Instagram'],
    pageTypes: ['Social Feed', 'Mobile App', 'E-commerce'],
    useCases: ['Content Refresh', 'Data Loading', 'List Population'],
    promptV0: `Add a mobile-style pull-to-refresh indicator at the top of this list.`,
    promptCursor: `Create a PullToRefresh wrapper. Use Framer Motion's useMotionValue and useTransform to track drag-down distance. Show a spinner that rotates as pulled, and spin infinitely when refresh function fires.`,
    promptCSS: `overscroll-behavior-y: contain;`,
    codeTailwind: `export function PullToRefreshDemo() {}`,
    relatedSlugs: ['spinner', 'swipe-gesture-hint']
  },
  {
    id: 22,
    slug: 'swipe-gesture-hint',
    nameEn: 'Swipe Gesture Hint',
    aliasesEn: ['swipe to action', 'list item swipe', 'slide hint'],
    category: 'Action Feedback',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'A subtle, bouncing horizontal nudge on a list item indicating that it can be swiped to reveal hidden actions (like delete or archive).',
    whenToUse: [
      'Mobile-first list views',
      'Email or message inboxes',
      'Task lists'
    ],
    whenNotToUse: [
      'Desktop applications without touch support',
      'Items where a visible actions menu (e.g., "...") is present and sufficient'
    ],
    configTips: [
      'Play the hint animation only once upon first entering the view',
      'Move the item slightly (e.g., 20px) to reveal the background action color momentarily'
    ],
    seenIn: ['Apple Mail', 'Gmail', 'Todoist'],
    pageTypes: ['Mobile App', 'Chat Interface', 'Dashboard'],
    useCases: ['Content Reveal', 'List Population'],
    promptV0: `Make the list item wiggle to the left briefly to show it can be swiped.`,
    promptCursor: `Add a framer-motion initial animation that translates x to -20px and back to 0 immediately on mount with a spring transition, revealing a red background behind it.`,
    promptCSS: `@keyframes swipe-hint { 0% { transform: translateX(0); } 50% { transform: translateX(-20px); } 100% { transform: translateX(0); } }`,
    codeTailwind: `export function SwipeGestureHintDemo() {}`,
    relatedSlugs: ['error-shake', 'pull-to-refresh']
  },
  {
    id: 23,
    slug: 'toggle-switch-animation',
    nameEn: 'Toggle Switch Animation',
    aliasesEn: ['switch sliding', 'checkbox toggle', 'on off animation'],
    category: 'Action Feedback',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A sliding thumb across a pill-shaped track, communicating a change in binary state (on/off) with color transitions.',
    whenToUse: [
      'Settings and preference menus',
      'Enabling/disabling features'
    ],
    whenNotToUse: [
      'Multi-state selections (use radio buttons or segmented controls)',
      'Forms requiring an explicit "Submit" button to save'
    ],
    configTips: [
      'Animate both the position of the thumb and the background color of the track',
      'Add a slight stretch/squish to the thumb during motion for a playful feel'
    ],
    seenIn: ['iOS Settings', 'Vercel', 'Tailwind UI'],
    pageTypes: ['Admin Panel', 'SaaS App', 'Dashboard'],
    useCases: ['Form Submission'],
    promptV0: `Create an animated toggle switch component.`,
    promptCursor: `Build a Radix UI or headless UI style Switch. Use framer-motion layout prop on the thumb circle for smooth sliding, and animate the background color of the track container.`,
    promptCSS: `.thumb { transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1); }`,
    codeTailwind: `export function ToggleSwitchAnimationDemo() {}`,
    relatedSlugs: ['haptic-bounce']
  },
  {
    id: 24,
    slug: 'like-heart-animation',
    nameEn: 'Like / Heart Animation',
    aliasesEn: ['favorite burst', 'heart beat', 'like button interaction'],
    category: 'Action Feedback',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'An expressive animation heavily scaling and expanding a heart or star icon, sometimes accompanied by mini confetti or a splash ring.',
    whenToUse: [
      'Social feeds',
      'Favoriting items in e-commerce',
      'Commenting systems'
    ],
    whenNotToUse: [
      'Corporate or highly formal enterprise software',
      'Utility toggles'
    ],
    configTips: [
      'Use a multi-step keyframe: scale back slightly, scale up past 100%, then snap to 100%',
      'Change color from gray outline to solid brand color (e.g., Red or Pink)'
    ],
    seenIn: ['Twitter/X', 'Instagram', 'TikTok'],
    pageTypes: ['Social Feed', 'E-commerce', 'Blog'],
    useCases: ['Form Submission'],
    promptV0: `Create a heart icon button that does a little bouncy scale animation when clicked and turns red.`,
    promptCursor: `Build a LikeButton. On click, apply a framer-motion keyframe animation to the heart icon: scale: [1, 0.8, 1.2, 1] over 0.4s. Switch the fill color and stroke simultaneously.`,
    promptCSS: `@keyframes heart-burst { 0% { transform: scale(1); } 25% { transform: scale(0.8); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }`,
    codeTailwind: `export function LikeHeartAnimationDemo() {}`,
    relatedSlugs: ['haptic-bounce', 'confetti-burst']
  },
  {
    id: 25,
    slug: 'copy-confirmation-flash',
    nameEn: 'Copy Confirmation Flash',
    aliasesEn: ['copy flash', 'clipboard success', 'flash green', 'background flash'],
    category: 'Action Feedback',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A rapid, transient background color change (usually to green or a brand color) on an element that was just copied to the clipboard, providing unmistakable visual confirmation.',
    whenToUse: [
      'Copy to clipboard code blocks',
      'API key fields',
      'Share links'
    ],
    whenNotToUse: [
      'Standard text selection',
      'Large container elements where a full flash is overwhelming'
    ],
    configTips: [
      'Flash to a success color (like emerald-500/20) then fade back to transparent',
      'Keep the flash very fast (100ms in) and the fade-out slower (500ms out) to mimic a camera flash'
    ],
    seenIn: ['Vercel', 'Tailwind Docs', 'Stripe Docs'],
    pageTypes: ['Documentation', 'Dashboard', 'Admin Panel'],
    useCases: ['Form Submission', 'Content Reveal'],
    promptV0: `Make this code block flash green momentarily when I click the copy button.`,
    promptCursor: `Add a 'copied' state. Use framer-motion to animate the background color of the container to rgba(16, 185, 129, 0.2) and immediately back to transparent over 0.6s when copied is true.`,
    promptCSS: `@keyframes flash-success { 0% { background-color: rgba(16, 185, 129, 0.3); } 100% { background-color: transparent; } }`,
    codeTailwind: `export function CopyConfirmationFlashDemo() {}`,
    relatedSlugs: ['toast-notification', 'checkmark-draw-animation']
  },
  {
    id: 26,
    slug: 'drag-drop-ghost',
    nameEn: 'Drag & Drop Ghost',
    aliasesEn: ['drag item', 'floating ghost', 'drag placeholder'],
    category: 'Action Feedback',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'When dragging an item, the original item remains lowered in opacity as a placeholder while a slightly scaled-up, shadowed ghost follows the pointer.',
    whenToUse: [
      'Kanban boards and task lanes',
      'Reorderable lists',
      'File upload queues or asset managers'
    ],
    whenNotToUse: [
      'Non-draggable items',
      'Static lists where users cannot change order',
      'Dense tables where the ghost would hide nearby rows'
    ],
    configTips: [
      'Keep the source slot visible with a dashed placeholder or 30-50% opacity',
      'Scale the dragged ghost only to 1.02-1.06 so it feels lifted without changing hit expectations',
      'Use a stronger shadow while dragging, then return quickly on drop',
      'Pair with keyboard reorder controls for accessibility'
    ],
    seenIn: ['Linear', 'Notion', 'Trello'],
    pageTypes: ['Dashboard', 'SaaS App', 'Admin Panel'],
    useCases: ['List Population', 'Form Submission'],
    bestFor: 'Showing that an item is actively being moved while preserving its original list position and drop target.',
    avoidWhen: 'Avoid it when the item is only clickable, when order cannot change, or when the dragged preview would cover critical nearby data.',
    durationGuidance: '120-180ms lift on drag start, direct pointer tracking while dragging, 160-240ms settle on drop.',
    easingGuidance: 'Use a stiff spring for lift/drop and no delayed easing for pointer tracking.',
    motionRisk: ['accessibility_sensitive', 'performance_sensitive'],
    alternatives: ['hover-lift-effect', 'swipe-gesture-hint', 'liquid-swipe-action'],
    decisionNote: 'Use Drag & Drop Ghost when the user is rearranging real items; use Hover Lift when you only need to show clickability.',
    promptV0: `Create a reorderable task list item that lifts into a shadowed drag ghost while the original slot remains visible as a dashed placeholder. On release, settle the item back into the list quickly.`,
    promptCursor: `Build a DragDropGhost component for a reorderable list. Use a drag library such as dnd-kit or framer-motion Reorder. While dragging, keep the source slot visible, scale the active item to about 1.04, raise its shadow, set cursor: grabbing, and restore it with a short spring on drop. Add keyboard reorder controls and reduced-motion fallback.`,
    promptCSS: `.drag-ghost {
  transform: scale(1.04);
  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.16);
  cursor: grabbing;
  transition: transform 140ms ease-out, box-shadow 140ms ease-out;
}
.drag-placeholder {
  opacity: .45;
  border: 2px dashed rgb(214 211 209);
}`,
    codeTailwind: `'use client';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';

export function DragDropGhost({ isDragging = false }: { isDragging?: boolean }) {
  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
        Review roadmap
      </div>

      <div className="relative h-14">
        <div className="absolute inset-0 rounded-xl border-2 border-dashed border-stone-200 bg-stone-50 opacity-60" />
        <motion.div
          animate={
            isDragging
              ? { y: -18, x: 8, scale: 1.04, boxShadow: '0 18px 32px rgba(15,23,42,.16)' }
              : { y: 0, x: 0, scale: 1, boxShadow: '0 1px 2px rgba(15,23,42,.08)' }
          }
          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
          className="absolute inset-x-0 flex cursor-grab items-center gap-3 rounded-xl border border-stone-200 bg-white p-4"
        >
          <GripVertical className="h-4 w-4 text-stone-400" aria-hidden />
          <span className="text-sm font-medium text-stone-800">Update pricing copy</span>
        </motion.div>
      </div>
    </div>
  );
}`,
    relatedSlugs: ['hover-lift-effect', 'swipe-gesture-hint', 'liquid-swipe-action']
  },
  {
    id: 27,
    slug: 'hover-lift-effect',
    nameEn: 'Hover Lift Effect',
    aliasesEn: ['hover elevate', 'card lift', '3d hover'],
    category: 'Action Feedback',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A card or button smoothly translates upwards by a few pixels and increases its shadow cast, creating the illusion of moving closer to the user on hover.',
    whenToUse: [
      'Interactive cards in a grid',
      'Pricing tiers',
      'Feature showcases on landing pages'
    ],
    whenNotToUse: [
      'Dense data tables',
      'Inline text links'
    ],
    configTips: [
      'Lift by -4px or -6px (translate-y-[-4px])',
      'Transition shadow from sm to md or lg',
      'Use a 200-300ms ease-out timing function'
    ],
    seenIn: ['Stripe', 'Vercel', 'Linear'],
    pageTypes: ['Landing Page', 'Dashboard', 'Portfolio'],
    useCases: ['Content Reveal'],
    promptV0: `Make this card lift up slightly and cast a bigger shadow when I hover over it.`,
    promptCursor: `Add Tailwind classes: hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out.`,
    promptCSS: `.card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); transition: all 0.3s ease; }`,
    codeTailwind: `export function HoverLiftEffectDemo() {}`,
    relatedSlugs: ['scale-on-press', 'drag-drop-ghost']
  },
  {
    id: 29,
    slug: 'slide-transition',
    nameEn: 'Slide Transition',
    aliasesEn: ['slide in', 'slide out', 'drawer slide', 'swipe navigation'],
    category: 'Page & View Transitions',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A view or component enters the screen by sliding linearly from an edge, providing spatial context about where the user is navigating to.',
    whenToUse: [
      'Mobile app screen navigation (pushing a new view)',
      'Carousels and image galleries',
      'Wizard steps in a form'
    ],
    whenNotToUse: [
      'Flipping between unrelated top-level tabs (use Fade instead)',
      'Replacing small inline text'
    ],
    configTips: [
      'Couple the slide with a subtle fade-in (opacity 0 to 1) to soften the edge',
      'Use a slightly bouncy spring to make the slide feel physical'
    ],
    seenIn: ['iOS Navigation', 'Instagram', 'Typeform'],
    pageTypes: ['Mobile App', 'Form/Survey', 'Dashboard'],
    useCases: ['Content Reveal', 'Form Submission'],
    promptV0: `Transition between these two steps by sliding out to the left and sliding in from the right.`,
    promptCursor: `Use AnimatePresence. new view: initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }}.`,
    promptCSS: `transform: translateX(100%); transition: transform 0.4s ease-out;`,
    codeTailwind: `export function SlideTransitionDemo() {}`,
    relatedSlugs: ['fade-transition']
  },
  {
    id: 30,
    slug: 'modal-enter-exit',
    nameEn: 'Modal Enter / Exit',
    aliasesEn: ['dialog popup', 'alert drop', 'modal scale in'],
    category: 'Page & View Transitions',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A combination of a fading background overlay and a modal window that scales and fades into the center of the viewport.',
    whenToUse: [
      'Confirmations and alerts',
      'Editing details in a dashboard',
      'Sign-in prompts'
    ],
    whenNotToUse: [
      'Full-page takeovers (use slide instead)'
    ],
    configTips: [
      'Modal should initial from scale 0.95 and opacity 0',
      'Backsplash should fade in (opacity 0 to 0.5) over 200ms'
    ],
    seenIn: ['Twitter', 'Notion', 'Linear'],
    pageTypes: ['Dashboard', 'Admin Panel', 'SaaS App'],
    useCases: ['Form Submission', 'Authentication'],
    bestFor: 'Focused decisions, compact editing flows, and confirmations that should preserve page context.',
    avoidWhen: 'Avoid for long workflows, full-page forms, or navigation that deserves its own route.',
    durationGuidance: 'Backdrop fade around 150-220ms; modal scale/fade around 180-260ms.',
    easingGuidance: 'Use ease-out or a restrained spring on entry; avoid bouncy exits for serious tasks.',
    motionRisk: ['distraction', 'accessibility_sensitive'],
    alternatives: ['drawer-sidebar-slide', 'fade-transition', 'slide-transition'],
    decisionNote: 'Choose modal motion when the interaction should pause the page without feeling like a new page.',
    promptV0: `Animate this popup modal. The background should fade to dark, and the modal card should scale up slightly and fade in exactly in the middle.`,
    promptCursor: `Use AnimatePresence. Backdrop motion.div: initial={{ opacity: 0 }}, animate={{ opacity: 1 }}. Modal motion.div: initial={{ scale: 0.95, opacity: 0 }}, animate={{ scale: 1, opacity: 1 }}. Ensure they both exit cleanly.`,
    promptCSS: `transform: scale(0.95); opacity: 0; transition: all 0.2s ease-out;`,
    codeTailwind: `export function ModalEnterExitDemo() {}`,
    relatedSlugs: ['fade-transition']
  },
  {
    id: 31,
    slug: 'stagger-list-reveal',
    nameEn: 'Stagger List Reveal',
    aliasesEn: ['list cascade', 'stagger drop', 'menu items reveal'],
    category: 'Page & View Transitions',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'When opening a dropdown menu or a list, the items appear sequentially from top to bottom, drawing the eye down the list.',
    whenToUse: [
      'Dropdown menus (Context menues, Select boxes)',
      'Sidebar navigation items loading',
      'Command palettes (Comboboxes)'
    ],
    whenNotToUse: [
      'Lists with more than 10 items (takes too long)',
      'Data-heavy tables'
    ],
    configTips: [
      'Keep the stagger delay extremely short (0.03s - 0.05s) to stay snappy',
      'Items should translate from y: -10px to y: 0 to feel like they are unrolling'
    ],
    seenIn: ['Linear Command Palette', 'Radix UI Primitives', 'Vercel Navbar'],
    pageTypes: ['Dashboard', 'SaaS App', 'Mobile App'],
    useCases: ['Content Reveal', 'List Population'],
    promptV0: `Make the items in this dropdown menu cascade in one by one from top to bottom really fast.`,
    promptCursor: `Wrap the menu items in a parent motion.ul with animate "open" variants: { transition: { staggerChildren: 0.05 } }. Each motion.li should have variants: { hidden: { y: -10, opacity: 0 }, open: { y: 0, opacity: 1 } }.`,
    promptCSS: `li:nth-child(1) { animation-delay: 0.05s; } li:nth-child(2) { animation-delay: 0.1s; }`,
    codeTailwind: `export function StaggerListRevealDemo() {}`,
    relatedSlugs: ['staggered-load']
  },
  {
    id: 46,
    slug: 'checkmark-draw-animation',
    nameEn: 'Checkmark Draw Animation',
    aliasesEn: ['success check', 'svg draw', 'check circle'],
    category: 'Status & Confirmation',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'An SVG checkmark that progressively draws itself from left to right inside a circle, confirming a successful action.',
    whenToUse: [
      'Payment success screens',
      'Form submission successes',
      'Task completion'
    ],
    whenNotToUse: [
      'Routine toggles (too dramatic)',
      'Indeterminate states'
    ],
    configTips: [
      'Use SVG dasharray and dashoffset manipulation to draw the path',
      'Animate the circle scaling up, then draw the checkmark after a 100ms delay'
    ],
    seenIn: ['Stripe Checkout', 'Apple Pay', 'LottieAnimations'],
    pageTypes: ['E-commerce', 'Form/Survey', 'Mobile App'],
    useCases: ['Form Submission', 'Content Reveal'],
    promptV0: `Add a success checkmark that looks like it is being drawn with a pen.`,
    promptCursor: `Create an SVG checkmark. Use framer-motion's motion.path element with initial={{ pathLength: 0 }} and animate={{ pathLength: 1 }} over 0.5s with a spring transition.`,
    promptCSS: `stroke-dasharray: 100; stroke-dashoffset: 100; animation: draw 0.5s forwards;`,
    codeTailwind: `export function CheckmarkDrawAnimationDemo() {}`,
    relatedSlugs: ['toast-notification', 'like-heart-animation']
  },
  {
    id: 64,
    slug: 'tooltip-fade-nudge',
    nameEn: 'Tooltip Fade & Nudge',
    aliasesEn: ['tooltip pop', 'label nudge', 'info popover'],
    category: 'Onboarding & Tours',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A tiny popover label that slides exactly 4-8px outwards from its anchor element while fading in. Used to label icon-only buttons.',
    whenToUse: [
      'Icon-only action buttons (e.g., Share, Delete, Edit)',
      'Glossary definition hovers',
      'Charts where hovering over a bar reveals exact metrics'
    ],
    whenNotToUse: [
      'Critical form instructions (put them inline instead)',
      'Mobile apps (tooltips don\'t work well on touch)'
    ],
    configTips: [
      'Initial state should be tucked slightly against the anchor (e.g., y: 4px for a top tooltip)',
      'Use an instant/very fast duration (100-150ms) to ensure it appears before the user moves away'
    ],
    seenIn: ['Radix UI', 'Linear', 'Notion'],
    pageTypes: ['Dashboard', 'SaaS App', 'Admin Panel'],
    useCases: ['Content Reveal'],
    promptV0: `Add a tooltip to this icon that drops down slightly and fades in when I hover over the icon.`,
    promptCursor: `Build a Tooltip component wrapping the child. On mouse enter, show a motion.div absolute positioned tooltip. animate={{ opacity: 1, y: 0 }}, initial={{ opacity: 0, y: -4 }}, duration 0.15s.`,
    promptCSS: `.tooltip { opacity: 0; transform: translateY(-4px); transition: all 0.15s; } .container:hover .tooltip { opacity: 1; transform: translateY(0); }`,
    codeTailwind: `export function TooltipFadeNudgeDemo() {}`,
    relatedSlugs: ['modal-enter-exit']
  },
  {
    id: 32,
    slug: 'shared-element-transition',
    nameEn: 'Shared Element Transition',
    aliasesEn: ['hero transition', 'image expansion', 'magic move'],
    category: 'Page & View Transitions',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'An element (like an image or card) seamlessly animates from its position in a list view into its final position in a detail view, bridging the context between two states.',
    whenToUse: [
      'Image galleries opening to full screen',
      'App store cards expanding into detail pages',
      'Profile avatars moving to header banners'
    ],
    whenNotToUse: [
      'Simple form steps',
      'Where the element drastically changes aspect ratio (can look distorted)'
    ],
    configTips: [
      'Use Framer Motion layoutId for effortless shared element transitions',
      "Animate other surrounding content fading out quickly so they don't clash with the moving element"
    ],
    seenIn: ['iOS App Store', 'Framer Sites', 'Google Photos'],
    pageTypes: ['Mobile App', 'Portfolio'],
    useCases: ['Content Reveal'],
    promptV0: `Create a shared element transition where clicking a card makes the image grow smoothly to cover the top of the detail page.`,
    promptCursor: `Use framer-motion <motion.div layoutId="hero-image"> on both the thumbnail in the list and the header image in the detail view. Wrap the routing/state change in an <AnimatePresence>.`,
    promptCSS: `/* Not recommended in pure CSS across routes; use View Transitions API if available. */`,
    codeTailwind: `export function SharedElementTransitionDemo() {}`,
    relatedSlugs: ['slide-transition']
  },
  {
    id: 33,
    slug: 'drawer-sidebar-slide',
    nameEn: 'Drawer / Sidebar Slide',
    aliasesEn: ['offcanvas menu', 'side panel', 'slide over'],
    category: 'Page & View Transitions',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A panel that slides in from the left or right edge of the screen, pushing content or overlapping it with a dark backdrop.',
    whenToUse: [
      'Mobile navigation menus',
      'Filtering and sorting options',
      'Detail inspection panels in dense dashboards'
    ],
    whenNotToUse: [
      'Quick confirmations (use Modal or Toast)'
    ],
    configTips: [
      'Slide in from the right for details/actions, from the left for global navigation',
      'Include a swipe-to-dismiss gesture for mobile users'
    ],
    seenIn: ['Linear', 'Stripe Dashboard', 'Shopify'],
    pageTypes: ['Dashboard', 'E-commerce', 'Mobile App'],
    useCases: ['Data Loading', 'Form Submission'],
    promptV0: `Add a sidebar drawer that slides in from the right when clicking the edit button. Include a dark backdrop.`,
    promptCursor: `Create a Drawer component using headless UI or framer-motion. Animate x from "100%" to "0%" and backdrop opacity from 0 to 0.5.`,
    promptCSS: `transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);`,
    codeTailwind: `export function DrawerSidebarSlideDemo() {}`,
    relatedSlugs: ['slide-transition', 'modal-enter-exit']
  },
  {
    id: 34,
    slug: 'tab-underline-slide',
    nameEn: 'Tab Underline Slide',
    aliasesEn: ['magic tab', 'sliding indicator', 'nav highlight'],
    category: 'Page & View Transitions',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A highlighting background or underline that smoothly glides from the currently selected tab to the newly clicked tab, reinforcing spatial relationship.',
    whenToUse: [
      'Top-level navigation bars',
      'Segmented controls',
      'Pricing plan toggles (Monthly/Yearly)'
    ],
    whenNotToUse: [
      'Vertical menus with varying heights'
    ],
    configTips: [
      'Use layoutId in framer-motion to make the underline easily glide between isolated DOM elements',
      'Keep the animation snappy (150-250ms)'
    ],
    seenIn: ['Vercel', 'Apple.com', 'Stripe'],
    pageTypes: ['Dashboard', 'SaaS App', 'Landing Page'],
    useCases: ['Content Reveal'],
    promptV0: `Create a tab bar where the active underline smoothly slides over to the tab I just clicked.`,
    promptCursor: `Build a Tabs component. The active tab should render a <motion.div layoutId="underline" className="absolute bottom-0 w-full h-0.5 bg-black" />.`,
    promptCSS: `/* Complex without fixed widths. Usually requires JS to compute left offset and width. */`,
    codeTailwind: `export function TabUnderlineSlideDemo() {}`,
    relatedSlugs: ['toggle-switch-animation']
  },
  {
    id: 35,
    slug: 'accordion-expand',
    nameEn: 'Accordion Expand',
    aliasesEn: ['collapse expand', 'height transition', 'dropdown text'],
    category: 'Page & View Transitions',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A panel that smoothly grows in height to reveal hidden content, pushing the elements below it smoothly downwards.',
    whenToUse: [
      'FAQ sections',
      'Complex forms with optional sections',
      'Collapsible sidebars'
    ],
    whenNotToUse: [
      'Primary content that all users must read'
    ],
    configTips: [
      'Animate grid-template-rows from 0fr to 1fr for performant pure CSS height animation',
      'Rotate the chevron icon 180deg during expansion'
    ],
    seenIn: ['Tailwind UI', 'Stripe', 'Notion'],
    pageTypes: ['Landing Page', 'Documentation', 'Form/Survey'],
    useCases: ['Content Reveal'],
    promptV0: `Add an accordion section for FAQs. When clicking the question, the answer should slide down smoothly.`,
    promptCursor: `Create an AccordionItem. Use framer-motion AnimatePresence. When open, animate the container's height from 0 to "auto" with opacity 1. Add overflow-hidden.`,
    promptCSS: `display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease; /* Inner wrapper needs overflow: hidden */`,
    codeTailwind: `export function AccordionExpandDemo() {}`,
    relatedSlugs: ['drawer-sidebar-slide']
  },
  {
    id: 36,
    slug: 'parallax-scroll',
    nameEn: 'Parallax Scroll',
    aliasesEn: ['background speed', 'depth scroll', 'layered scroll'],
    category: 'Page & View Transitions',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'Background elements move at a different speed than foreground elements while scrolling, creating an illusion of 3D depth and immersion.',
    whenToUse: [
      'Marketing landing pages',
      'Editorial feature stories',
      'Hero sections with rich photography'
    ],
    whenNotToUse: [
      'Data-heavy dashboards',
      'If it causes text readability issues'
    ],
    configTips: [
      'Keep the speed difference subtle (e.g., background moves 20-30% slower than foreground)',
      'Use hardware-accelerated transforms (translate3D) rather than background-position'
    ],
    seenIn: ['Apple', 'Stripe', 'Nike'],
    pageTypes: ['Landing Page', 'Portfolio'],
    useCases: ['Content Reveal'],
    promptV0: `Add a parallax scrolling effect to my hero image, so it moves slower than the rest of the page.`,
    promptCursor: `Use framer-motion useScroll and useTransform hooks. Map the scrollY value to a y-translation value for the background image layer.`,
    promptCSS: `/* For simple parallax: */ .container { perspective: 1px; overflow-x: hidden; overflow-y: auto; } .bg { transform: translateZ(-1px) scale(2); }`,
    codeTailwind: `export function ParallaxScrollDemo() {}`,
    relatedSlugs: ['scroll-reveal']
  },
  {
    id: 37,
    slug: 'empty-state-illustration',
    nameEn: 'Empty State Illustration',
    aliasesEn: ['zero state', 'no data styling', 'floating illustration'],
    category: 'Empty & Error States',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A softly animated graphic (like a floating ghost or swaying box) accompanied by friendly text suggesting the next action when a list or dashboard is empty.',
    whenToUse: [
      'New user unpopulated dashboards',
      'Empty inboxes or task lists',
      'Cleared notifications'
    ],
    whenNotToUse: [
      'Brief loading states'
    ],
    configTips: [
      'Apply a slow, continuous vertical floating animation to the illustration (y: -5 to 5 over 3s)',
      'Include a prominent Call-to-Action button to help users populate the space'
    ],
    seenIn: ['Notion', 'Dropbox', 'Linear'],
    pageTypes: ['Dashboard', 'SaaS App', 'Mobile App'],
    useCases: ['Data Loading'],
    promptV0: `Create a beautiful empty state component with a softly floating icon for when a user has no projects yet.`,
    promptCursor: `Build an EmptyState component. Animate the main SVG illustration with a continuous loop using framer motion: animate={{ y: [-5, 5] }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" }}.`,
    promptCSS: `@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`,
    codeTailwind: `export function EmptyStateIllustrationDemo() {}`,
    relatedSlugs: ['404-animation']
  },
  {
    id: 38,
    slug: '404-animation',
    nameEn: '404 Animation',
    aliasesEn: ['page not found', 'lost page effect', 'broken link state'],
    category: 'Empty & Error States',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'A playful loop or glitch effect applied to a 404 number or illustration to reduce the frustration of hitting a dead end.',
    whenToUse: [
      'Not Found pages',
      'Deleted content routes'
    ],
    whenNotToUse: [
      'Hard system failures or 500 errors'
    ],
    configTips: [
      'Can be a subtle glitch effect on text, or a character looking around',
      'Always provide a clear "Back to Home" button'
    ],
    seenIn: ['GitHub', 'Dribbble', 'Figma'],
    pageTypes: ['Landing Page', 'SaaS App', 'Portfolio'],
    useCases: ['Content Reveal'],
    promptV0: `Create a creative 404 page where the 404 text has a slight, occasional glitch or floating animation.`,
    promptCursor: `Build a NotFound component. Apply a glitch CSS animation or a slow rotational drift using framer-motion.`,
    promptCSS: `/* Too complex for inline, usually involves text-shadow manipulations */`,
    codeTailwind: `export function NotFoundAnimationDemo() {}`,
    relatedSlugs: ['empty-state-illustration']
  },
  {
    id: 72,
    slug: 'first-run-pulse',
    nameEn: 'First Run Onboarding Pulse',
    aliasesEn: ['tutorial highlight', 'focus ring ring', 'onboarding glow'],
    category: 'Empty & Error States',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: "A glowing, pulsating ring around a specific UI element intended to draw a brand new user's attention to the first action they should take.",
    whenToUse: [
      'First-time logins',
      'Introducing a brand new core feature in a dense UI'
    ],
    whenNotToUse: [
      'Everyday use',
      'On multiple elements concurrently'
    ],
    configTips: [
      'Similar to pulsing-hotspot but larger, acting as an outline shadow (box-shadow or ring-offset)',
      'Fade it out completely once clicked'
    ],
    seenIn: ['Intercom', 'Slack', 'Canva'],
    pageTypes: ['SaaS App', 'Dashboard', 'Admin Panel'],
    useCases: ['Content Reveal'],
    promptV0: `Add a pulsing glow effect around my "Create Project" button that flashes infinitely to draw a new user's eyes.`,
    promptCursor: `Add Tailwind classes ring-4 ring-blue-500/50 animate-pulse to the target element. For a spreading ring, use an absolute pseudo element scaling up and fading out.`,
    promptCSS: `box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7); animation: pulse-ring 2s infinite;`,
    codeTailwind: `export function FirstRunPulseDemo() {}`,
    relatedSlugs: ['pulsing-hotspot']
  },
  {
    id: 73,
    slug: 'offline-state-indicator',
    nameEn: 'Offline State Indicator',
    aliasesEn: ['no internet bar', 'disconnected toast', 'wifi off animated'],
    category: 'Empty & Error States',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A bar or toast that slides down from the top of the interface natively indicating the application has lost internet connection, remaining fixed until connection is restored.',
    whenToUse: [
      'Progressive Web Apps (PWAs)',
      'Real-time collaborative tools'
    ],
    whenNotToUse: [
      "Static websites where offline doesn't break current reading"
    ],
    configTips: [
      'Use a muted dark/gray or orange tone, not full destructive red',
      'Animate sliding down from y: -100%'
    ],
    seenIn: ['Figma', 'Slack', 'WhatsApp Web'],
    pageTypes: ['SaaS App', 'Mobile App', 'Dashboard'],
    useCases: ['Data Loading'],
    promptV0: `Create an offline notification bar that slides down from the top of the screen when the internet disconnects.`,
    promptCursor: `Build an OfflineBanner component fixed to top-0. use AnimatePresence. initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }}.`,
    promptCSS: `transform: translateY(-100%); transition: transform 0.4s ease; /* apply class .is-offline to slide to 0 */`,
    codeTailwind: `export function OfflineIndicatorDemo() {}`,
    relatedSlugs: ['toast-notification']
  },
  {
    id: 74,
    slug: 'no-search-results-animation',
    nameEn: 'No Search Results Animation',
    aliasesEn: ['empty search', 'magnifying glass shake', 'not found search'],
    category: 'Empty & Error States',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'An animation (often a magnifying glass looking back and forth) that plays when a search query returns zero results, softening the frustrating dead end.',
    whenToUse: [
      'Global command palettes',
      'E-commerce search returning nothing',
      'Directory queries'
    ],
    whenNotToUse: [
      'As a replacement for helpful "Did you mean X?" text'
    ],
    configTips: [
      'Animate the icon gently rotating left and right, pausing in between',
      'Keep it visually distinct from a 404 page'
    ],
    seenIn: ['Raycast', 'Algolia Search', 'Stripe Docs Search'],
    pageTypes: ['Dashboard', 'E-commerce', 'Documentation'],
    useCases: ['Data Loading', 'Content Reveal'],
    promptV0: `Add an empty search state where a magnifying glass icon gently looks left and right.`,
    promptCursor: `Build a NoResults component. Animate a lucide-react Search icon rotating -15deg then +15deg on a loop.`,
    promptCSS: `@keyframes search-look { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-15deg); } 75% { transform: rotate(15deg); } }`,
    codeTailwind: `export function NoSearchResultsDemo() {}`,
    relatedSlugs: ['empty-state-illustration']
  },
  {
    id: 43,
    slug: 'connection-error-shake',
    nameEn: 'Connection Error Shake',
    aliasesEn: ['failed connection', 'timeout error', 'red error pulse'],
    category: 'Empty & Error States',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A more aggressive, persistent pulsing or shaking error state specifically denoting that a system failure or timeout occurred.',
    whenToUse: [
      'Failed API fetches on critical dashboard widgets',
      'Payment gateways failing to connect'
    ],
    whenNotToUse: [
      'User-side validation errors (use Error Shake instead)'
    ],
    configTips: [
      'Pair with a "Retry" button that has its own loading spinner state',
      'Apply a subtle red flash to the container border'
    ],
    seenIn: ['Vercel', 'AWS Console'],
    pageTypes: ['Dashboard', 'SaaS App', 'Admin Panel'],
    useCases: ['Data Loading'],
    promptV0: `Create a widget error state that shows a softly pulsing red exclamation icon indicating the data failed to load.`,
    promptCursor: `Build an ErrorWidget state. Use a red AlertCircle icon with Tailwind animate-pulse.`,
    promptCSS: `animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;`,
    codeTailwind: `export function ConnectionErrorShakeDemo() {}`,
    relatedSlugs: ['error-shake', 'offline-state-indicator']
  },
  {
    id: 44,
    slug: 'form-validation-error',
    nameEn: 'Form Validation Error',
    aliasesEn: ['inline error slide', 'text validation hint', 'error message reveal'],
    category: 'Empty & Error States',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'Small red helper text that gracefully slides down from underneath an input field the moment the user tabs away with an invalid entry.',
    whenToUse: [
      'Sign up forms',
      'Checkouts',
      'Settings configurations'
    ],
    whenNotToUse: [
      'Waiting until final submit (validate inline when possible)'
    ],
    configTips: [
      'Animate height from 0 to auto, and opacity from 0 to 1',
      'Use a very fast duration (150ms)'
    ],
    seenIn: ['Stripe Checkout', 'Linear Login', 'Shopify'],
    pageTypes: ['Form/Survey', 'Landing Page', 'Dashboard'],
    useCases: ['Form Submission', 'Authentication'],
    promptV0: `Make the inline red error message slide down smoothly under an input field when validation fails.`,
    promptCursor: `Use AnimatePresence for the error text paragraph. initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}. Add overflow-hidden.`,
    promptCSS: `max-height: 0; opacity: 0; transition: max-height 0.2s, opacity 0.2s; /* swap max-height on error */`,
    codeTailwind: `export function FormValidationErrorDemo() {}`,
    relatedSlugs: ['error-shake']
  },
  {
    id: 45,
    slug: 'confetti-burst',
    nameEn: 'Confetti Burst',
    aliasesEn: ['celebration burst', 'success fireworks', 'particle explosion'],
    category: 'Status & Confirmation',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'A joyful explosion of colorful particles from the center or edges of the screen to celebrate a major user milestone.',
    whenToUse: [
      'Completing onboarding',
      'Reaching inbox zero',
      'Making a first sale'
    ],
    whenNotToUse: [
      'Routine, frequent actions'
    ],
    configTips: [
      'Use a specialized library like canvas-confetti for performant particle physics',
      'Trigger immediately upon the success state rendering'
    ],
    seenIn: ['Linear (Inbox Zero)', 'Stripe (1st Payment)', 'Mailchimp (Sent)'],
    pageTypes: ['Dashboard', 'SaaS App', 'Mobile App'],
    useCases: ['Form Submission', 'Content Reveal'],
    promptV0: `Add a celebration confetti burst that shoots from the bottom of the screen when I click complete.`,
    promptCursor: `Install canvas-confetti. Create a trigger that fires confetti({ particleCount: 100 }) upon a success state boolean changing to true.`,
    promptCSS: `/* Not practical in pure CSS */`,
    codeTailwind: `export function ConfettiBurstDemo() {}`,
    relatedSlugs: ['like-heart-animation']
  },
  {
    id: 48,
    slug: 'error-cross-draw',
    nameEn: 'Error Cross Draw',
    aliasesEn: ['red x draw', 'failed svg path', 'cancel draw'],
    category: 'Status & Confirmation',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'The inverse of a checkmark draw; a red X SVG that sharply draws its two crossing lines to confirm a failure or rejection.',
    whenToUse: [
      'Failed payments',
      'Access denied screens',
      'Processing failures'
    ],
    whenNotToUse: [
      'Form validation (too dramatic for a simple typo)'
    ],
    configTips: [
      'Draw the first diagonal, then the second diagonal staggered slightly',
      'Use a sharper, faster ease than the checkmark (e.g., easeIn)'
    ],
    seenIn: ['Apple iOS', 'Stripe'],
    pageTypes: ['E-commerce', 'Dashboard', 'SaaS App'],
    useCases: ['Form Submission', 'Authentication'],
    promptV0: `Animate a red X drawing itself like a pen when a payment fails.`,
    promptCursor: `Create an SVG with two crossing <path> lines. Use framer-motion pathLength property to animate them from 0 to 1 sequentially.`,
    promptCSS: `stroke-dasharray: 50; stroke-dashoffset: 50; animation: drawX 0.3s forwards;`,
    codeTailwind: `export function ErrorCrossDrawDemo() {}`,
    relatedSlugs: ['checkmark-draw-animation']
  },
  {
    id: 49,
    slug: 'badge-count-animation',
    nameEn: 'Badge Count Animation',
    aliasesEn: ['notification counter pop', 'badge update', 'number pop'],
    category: 'Status & Confirmation',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'When a notification badge value increments, the number scales up and down bouncy, and occasionally the badge itself pulses.',
    whenToUse: [
      'Shopping cart total increasing',
      'New unread messages arriving in a nav bar'
    ],
    whenNotToUse: [
      'If the number changes extremely rapidly (use Number Ticker)'
    ],
    configTips: [
      'Use framer-motion AnimatePresence mode="wait" to slide the old number up and bring the new number in from the bottom'
    ],
    seenIn: ['iOS App Icons', 'Discord', 'Slack'],
    pageTypes: ['Dashboard', 'Mobile App', 'E-commerce'],
    useCases: ['Content Refresh'],
    promptV0: `Make my notification badge pop and bounce slightly when the number increases.`,
    promptCursor: `Combine a scale keyframe animation on the badge container with a slide transition on the number text inside an AnimatePresence block.`,
    promptCSS: `@keyframes badge-pop { 0% { transform: scale(1); } 50% { transform: scale(1.3); } 100% { transform: scale(1); } }`,
    codeTailwind: `export function BadgeCountAnimationDemo() {}`,
    relatedSlugs: ['pulsing-hotspot', 'number-ticker']
  },
  {
    id: 50,
    slug: 'progress-ring',
    nameEn: 'Progress Ring',
    aliasesEn: ['circular progress', 'radial loader', 'donut fill'],
    category: 'Status & Confirmation',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A circular SVG ring that visually fills its stroke perimeter based on a percentage value, moving smoothly as progress updates.',
    whenToUse: [
      'File uploads where exact percentage is known but horizontal space is tight',
      'Daily goal completions (e.g., fitness rings)',
      'Time remaining in a countdown'
    ],
    whenNotToUse: [
      'Indeterminate waiting states (use Spinner instead)'
    ],
    configTips: [
      'Calculate the SVG circle circumference (2 * Math.PI * radius) and animate the stroke-dashoffset',
      'Add a smooth transition class to the circle so it glides between percentages'
    ],
    seenIn: ['Apple Fitness', 'Vercel Deployment', 'Linear issues'],
    pageTypes: ['Dashboard', 'Mobile App', 'Portfolio'],
    useCases: ['Data Loading', 'Form Submission'],
    promptV0: `Create a circular progress ring that fills up visually based on a given percentage.`,
    promptCursor: `Build an SVG component. Calculate circumference. Set strokeDasharray to circumference. Set strokeDashoffset to circumference - (percent / 100) * circumference. Add tailwind class transition-all duration-500 ease-out to the circle element.`,
    promptCSS: `/* Requires JS to update the exact stroke-dashoffset variable */`,
    codeTailwind: `export function ProgressRingDemo() {}`,
    relatedSlugs: ['spinner']
  },
  {
    id: 51,
    slug: 'success-screen-transition',
    nameEn: 'Success Screen Transition',
    aliasesEn: ['success takeover', 'green screen slide', 'completion view'],
    category: 'Status & Confirmation',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'A dramatic transition where, upon completing a major flow, the entire screen or container slides over or fades into a dedicated success view.',
    whenToUse: [
      'Completing a long multi-step wizard',
      'Successful checkout and payment',
      'Account creation completion'
    ],
    whenNotToUse: [
      'Minor setting saves (use Toast instead)'
    ],
    configTips: [
      'Often paired with a Checkmark Draw Animation and Confetti',
      'Should block the user from navigating back into the form flow'
    ],
    seenIn: ['Stripe Checkout', 'Shopify', 'Typeform'],
    pageTypes: ['E-commerce', 'Form/Survey', 'SaaS App'],
    useCases: ['Form Submission'],
    promptV0: `When the form is submitted, fade the form out and slide a success screen up from the bottom taking over the view.`,
    promptCursor: `Wrap the form and success view in an AnimatePresence. Form exits with opacity 0, Success enters from y: 50 opacity 0.`,
    promptCSS: `/* Managed by routing and wrapper classes */`,
    codeTailwind: `export function SuccessScreenTransitionDemo() {}`,
    relatedSlugs: ['checkmark-draw-animation', 'slide-transition']
  },
  {
    id: 9,
    slug: 'indeterminate-progress-bar',
    nameEn: 'Indeterminate Progress Bar',
    aliasesEn: ['infinite loader', 'unknown progress', 'looping bar'],
    category: 'Waiting & Loading',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A loading bar where the indicator continually bounces back and forth or cycles infinitely, showing that a process is working but the exact completion time is unknown.',
    whenToUse: ['Network requests with unknown length', 'Query processing in databases'],
    whenNotToUse: ['File uploads with known file sizes (use determinant progress)'],
    configTips: ['Animate the transform-origin or left/right properties of an inner bar in an infinite loop'],
    seenIn: ['Google Material Design', 'Android OS'],
    pageTypes: ['Dashboard', 'Admin Panel'],
    useCases: ['Data Loading', 'Form Submission'],
    promptV0: `Create an indeterminate progress bar.`,
    promptCursor: `Create an Indeterminate Progress Bar.`,
    promptCSS: `animation: indeterminate 1.5s infinite linear;`,
    codeTailwind: `export function IndeterminateProgressBarDemo() {}`,
    relatedSlugs: ['progress-bar', 'spinner']
  },
  {
    id: 10,
    slug: 'image-lazy-load-fade',
    nameEn: 'Image Lazy Load Fade',
    aliasesEn: ['smooth image load', 'fade in image'],
    category: 'Waiting & Loading',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'Images load as low-res blurs or empty blocks and gently crossfade into their full high-resolution versions instead of popping in jarringly line-by-line.',
    whenToUse: ['Image-heavy galleries', 'E-commerce product grids'],
    whenNotToUse: ['Critical text content or SVGs that load instantly'],
    configTips: ['Keep the fallback background a soft gray or extract the dominant color of the image'],
    seenIn: ['Medium', 'Pinterest', 'Unsplash'],
    pageTypes: ['Blog', 'Portfolio', 'E-commerce'],
    useCases: ['Data Loading', 'Content Reveal'],
    promptV0: `Add a lazy loading fade effect to all images on this grid.`,
    promptCursor: `Add a lazy loading fade effect to all images on this grid.`,
    promptCSS: `transition: opacity 0.5s ease;`,
    codeTailwind: `export function ImageLazyLoadFadeDemo() {}`,
    relatedSlugs: ['blur-fade-in']
  },
  {
    id: 11,
    slug: 'content-placeholder',
    nameEn: 'Content Placeholder',
    aliasesEn: ['text blocks', 'wireframe loader', 'gray boxes'],
    category: 'Waiting & Loading',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'Static, non-animated geometric shapes representing where text or images will render. Simpler than a skeleton screen, often used on lower-end devices or ultra-fast loads.',
    whenToUse: ['When fetch time is extremely fast but layout shift must be avoided'],
    whenNotToUse: ['Long loaders > 1s (prefer animated skeletons)'],
    configTips: ['Match the exact height and width of the final rendered content'],
    seenIn: ['News sites', 'Wikipedia mobile'],
    pageTypes: ['Dashboard', 'Blog'],
    useCases: ['Content Refresh'],
    promptV0: `Create static gray box placeholders for a list.`,
    promptCursor: `Create static gray box placeholders for a list.`,
    promptCSS: `background-color: #f0f0f0;`,
    codeTailwind: `export function ContentPlaceholderDemo() {}`,
    relatedSlugs: ['skeleton-screen']
  },
  {
    id: 12,
    slug: 'lottie-loading-loop',
    nameEn: 'Lottie Loading Loop',
    aliasesEn: ['animated illustration loader', 'custom spinner', 'branded loader'],
    category: 'Waiting & Loading',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A highly customized, vector-based animation (often exported from After Effects via Lottie) that serves as a branded loading state.',
    whenToUse: ['Brand-heavy landing pages', 'Splash screens on app launch'],
    whenNotToUse: ['Inline buttons or dense data tables (too dominant)'],
    configTips: ['Keep the JSON file size small (<100kb)', 'Ensure the loop is seamless'],
    seenIn: ['Duolingo', 'Uber', 'Headspace'],
    pageTypes: ['Landing Page', 'Mobile App'],
    useCases: ['Data Loading'],
    promptV0: `Embed a Lottie animation file in a React component and set it to loop.`,
    promptCursor: `Embed a Lottie animation file in a React component and set it to loop.`,
    promptCSS: `/* Relies on Lottie web player JS */`,
    codeTailwind: `export function LottieLoadingLoopDemo() {}`,
    relatedSlugs: ['spinner']
  },
  {
    id: 13,
    slug: 'countdown-timer',
    nameEn: 'Countdown Timer',
    aliasesEn: ['time remaining', 'ticking clock', 'launch countdown'],
    category: 'Waiting & Loading',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'Numbers that accurately count down to zero, building anticipation or imposing a limit.',
    whenToUse: ['Event ticket reservations', 'Product launch pages', 'Action undo windows (e.g., "Undo in 5s")'],
    whenNotToUse: ['Processes where the exact completion time cannot be calculated'],
    configTips: ['Use monospaced numbers (tabular-nums) so the layout doesn\'t jump every second'],
    seenIn: ['Ticketmaster', 'Gmail Undo Send'],
    pageTypes: ['Landing Page', 'E-commerce'],
    useCases: ['Form Submission'],
    promptV0: `Add a 10 second countdown timer.`,
    promptCursor: `Add a 10 second countdown timer.`,
    promptCSS: `font-variant-numeric: tabular-nums;`,
    codeTailwind: `export function CountdownTimerDemo() {}`,
    relatedSlugs: ['number-ticker']
  },
  {
    id: 14,
    slug: 'buffering-animation',
    nameEn: 'Buffering Animation',
    aliasesEn: ['video buffer', 'stream loading', 'spinning dots'],
    category: 'Waiting & Loading',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'Often an overlapping circle array or a dotted spinner indicating that a media stream has paused to download more data.',
    whenToUse: ['Video players', 'Audio players', 'Live streams'],
    whenNotToUse: ['Standard API data fetching'],
    configTips: ['Keep it slightly translucent so it doesn\'t completely block the paused frame of the video'],
    seenIn: ['YouTube', 'Netflix', 'Spotify'],
    pageTypes: ['Dashboard', 'Blog'],
    useCases: ['Data Loading'],
    promptV0: `Create a buffering spinner like YouTube's.`,
    promptCursor: `Create a buffering spinner like YouTube's.`,
    promptCSS: `animation: buffer-spin 1s linear infinite;`,
    codeTailwind: `export function BufferingAnimationDemo() {}`,
    relatedSlugs: ['spinner']
  },
  {
    id: 15,
    slug: 'skeleton-wave',
    nameEn: 'Skeleton Wave',
    aliasesEn: ['wave loader', 'skeleton pulse'],
    category: 'Waiting & Loading',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'Similar to a shimmer loader, but animates a soft gradient wave that sweeps diagonally across multiple skeleton blocks sequentially.',
    whenToUse: ['Complex dashboard layouts with many distinct sections loading at once'],
    whenNotToUse: ['Single line text loads'],
    configTips: ['Coordinate the wave animation delay across adjacent elements to make the wave travel continuously'],
    seenIn: ['Facebook', 'LinkedIn'],
    pageTypes: ['Dashboard', 'Social Feed'],
    useCases: ['Data Loading'],
    promptV0: `Create a skeleton loader with a wave effect.`,
    promptCursor: `Create a skeleton loader with a wave effect.`,
    promptCSS: `animation: skeleton-wave 1.5s infinite;`,
    codeTailwind: `export function SkeletonWaveDemo() {}`,
    relatedSlugs: ['skeleton-screen', 'shimmer-loader']
  },
  {
    id: 75,
    slug: 'chart-bar-growth',
    nameEn: 'Chart Bar Growth',
    aliasesEn: ['bar chart animate in', 'rising bars', 'graph load'],
    category: 'Data & Content Visualization',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'Bar charts that animate from a height of zero up to their final data value upon entering the screen, making the data feel impactful.',
    whenToUse: ['Analytics dashboards', 'Financial reports', 'Poll results'],
    whenNotToUse: ['Charts that update extremely frequently (real-time stock tickers)'],
    configTips: ['Stagger the bars so they rise sequentially from left to right', 'Use a spring ease so they slightly overshoot their target and bounce back'],
    seenIn: ['Stripe Dashboard', 'Vercel Analytics', 'Apple Health'],
    pageTypes: ['Dashboard', 'Admin Panel'],
    useCases: ['Content Reveal', 'Data Loading'],
    promptV0: `Animate these vertical bar chart columns to grow from bottom to top sequentially.`,
    promptCursor: `Animate these vertical bar chart columns to grow from bottom to top sequentially.`,
    promptCSS: `transform-origin: bottom; animation: grow-up 1s ease-out;`,
    codeTailwind: `export function ChartBarGrowthDemo() {}`,
    relatedSlugs: ['staggered-load']
  },
  {
    id: 76,
    slug: 'data-tweening',
    nameEn: 'Data Tweening',
    aliasesEn: ['line chart morph', 'value interpolation', 'path transition'],
    category: 'Data & Content Visualization',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'When filtering or changing datasets, SVG lines or pie slices seamlessly morph from one shape to the next instead of snapping instantly.',
    whenToUse: ['Switching between time ranges (1W to 1M) on line charts', 'Filtering data in pie/donut charts'],
    whenNotToUse: ['When the two datasets share no common axes or context'],
    configTips: ['Use d3.js or framer-motion path interpolation to animate the \'d\' attribute of SVG paths'],
    seenIn: ['Robinhood', 'Coinbase', 'Figma Analytics'],
    pageTypes: ['Dashboard', 'SaaS App'],
    useCases: ['Content Refresh'],
    promptV0: `Animate an SVG line chart transitioning smoothly between two different data arrays.`,
    promptCursor: `Animate an SVG line chart transitioning smoothly between two different data arrays.`,
    promptCSS: `/* Cannot be done purely in CSS, requires JS path interpolation */`,
    codeTailwind: `export function DataTweeningDemo() {}`,
    relatedSlugs: ['chart-bar-growth']
  },
  {
    id: 77,
    slug: 'racing-bar-chart',
    nameEn: 'Racing Bar Chart',
    aliasesEn: ['bar chart race', 'leaderboard animation', 'rank swap'],
    category: 'Data & Content Visualization',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A horizontal bar chart representing timeseries data where the bars continually sort themselves on the Y-axis as their X-values increase/decrease over time.',
    whenToUse: ['Visualizing ranking changes over time (e.g., most popular languages per year)', 'Gamified leaderboards'],
    whenNotToUse: ['Static data sets'],
    configTips: ['Use FLIP (First, Last, Invert, Play) animation techniques or Framer Motion layout animations to handle the Y-axis sorting smoothly'],
    seenIn: ['DataIsBeautiful Reddit', 'Flourish'],
    pageTypes: ['Dashboard', 'Blog'],
    useCases: ['Content Refresh'],
    promptV0: `Create a racing bar chart where items physically swap vertical positions as their values overtake each other.`,
    promptCursor: `Create a racing bar chart where items physically swap vertical positions as their values overtake each other.`,
    promptCSS: `/* Complex React/Layout animation needed */`,
    codeTailwind: `export function RacingBarChartDemo() {}`,
    relatedSlugs: ['chart-bar-growth']
  },
  {
    id: 78,
    slug: 'parallax-background',
    nameEn: 'Parallax Background',
    aliasesEn: ['parallax hero', 'background scroll delay', 'depth scrolling'],
    category: 'Scroll & Navigation',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A background image or layer that moves vertically at a slower rate than the foreground content as the user scrolls, creating a 3D depth effect.',
    whenToUse: ['Landing page hero sections', 'Long editorial articles'],
    whenNotToUse: ['Text-heavy application UIs (can cause slight nausea/distraction)'],
    configTips: ['Use Framer Motion useScroll and useTransform for performant JS parallax, or CSS background-attachment: fixed for simple implementations'],
    seenIn: ['Apple Product Pages', 'Stripe'],
    pageTypes: ['Landing Page', 'Portfolio', 'Blog'],
    useCases: ['Content Reveal'],
    promptV0: `Add a parallax scroll effect to the hero image so it moves slower than the text.`,
    promptCursor: `Add a parallax scroll effect to the hero image so it moves slower than the text.`,
    promptCSS: `background-attachment: fixed; background-position: center;`,
    codeTailwind: `export function ParallaxBackgroundDemo() {}`,
    relatedSlugs: ['scroll-reveal']
  },
  {
    id: 56,
    slug: 'sticky-heading',
    nameEn: 'Sticky Heading',
    aliasesEn: ['sticky header', 'pinned section header', 'scroll spy'],
    category: 'Scroll & Navigation',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'As the user scrolls down a list, the category header sticks to the top of the viewport until pushed out by the next category header.',
    whenToUse: ['Alphabetical contact lists', 'Long settings menus with grouped sections', 'Documentation sidebars'],
    whenNotToUse: ['Short lists where context is never lost'],
    configTips: ['Use CSS position: sticky and top: 0', 'Add a solid background color or backdrop-blur to the header so list items don\'t bleed through'],
    seenIn: ['iOS Settings', 'Instagram Feed', 'Notion'],
    pageTypes: ['Mobile App', 'Dashboard', 'Documentation'],
    useCases: ['Content Reveal'],
    promptV0: `Make these section headers stick to the top of the screen while scrolling through their respective lists.`,
    promptCursor: `Make these section headers stick to the top of the screen while scrolling through their respective lists.`,
    promptCSS: `position: sticky; top: 0; z-index: 10;`,
    codeTailwind: `export function StickyHeadingDemo() {}`,
    relatedSlugs: []
  },
  {
    id: 79,
    slug: 'text-reveal-pipeline',
    nameEn: 'Text Reveal Pipeline',
    aliasesEn: ['scroll scrub text', 'opacity fill text', 'karaoke scroll text'],
    category: 'Scroll & Navigation',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'Large typographic paragraphs where the text color or opacity transitions from faded to solid exactly mapped to the user\'s scroll position.',
    whenToUse: ['Making a bold, philosophical statement on a landing page', 'Pacing the reader through a key value proposition'],
    whenNotToUse: ['Body paragraphs or functional reading'],
    configTips: ['Map scrollYProgress to an array of word indices to turn them solid one by one as the user scrolls'],
    seenIn: ['Linear', 'Chronicle', 'Apple'],
    pageTypes: ['Landing Page', 'Portfolio'],
    useCases: ['Content Reveal'],
    promptV0: `Make this paragraph of text fade in word-by-word tied to the user's scroll position.`,
    promptCursor: `Make this paragraph of text fade in word-by-word tied to the user's scroll position.`,
    promptCSS: `/* Requires JS Scroll Observer for complex scrub mapping */`,
    codeTailwind: `export function TextRevealPipelineDemo() {}`,
    relatedSlugs: ['scroll-reveal']
  },
  {
    id: 80,
    slug: 'horizontal-scroll-gallery',
    nameEn: 'Horizontal Scroll Gallery',
    aliasesEn: ['carousel scroll', 'side scroll tracker', 'horizontal section'],
    category: 'Scroll & Navigation',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A section of the page where vertical scrolling temporarily translates into horizontal scrolling to reveal a gallery of cards or images, before continuing vertically.',
    whenToUse: ['Showcasing features, portfolios, or timelines sequentially without taking up massive vertical space'],
    whenNotToUse: ['If the content contains its own vertical scrolling (e.g., long text boxes)'],
    configTips: ['Use a sticky container whose height is equal to the total width of the horizontal items, mapping window vertical scroll to the translateX of the gallery track'],
    seenIn: ['Awwwards Winners', 'Apple Mac Pro page'],
    pageTypes: ['Landing Page', 'Portfolio'],
    useCases: ['Content Reveal'],
    promptV0: `Create a horizontal scroll section pinned to the viewport.`,
    promptCursor: `Create a horizontal scroll section pinned to the viewport.`,
    promptCSS: `/* Complex layout: height is set to width of tracked items, position sticky on inner container */`,
    codeTailwind: `export function HorizontalScrollGalleryDemo() {}`,
    relatedSlugs: []
  },
  {
    id: 81,
    slug: 'spotlight-coach-mark',
    nameEn: 'Spotlight / Coach Mark',
    aliasesEn: ['feature highlight', 'onboarding tooltip', 'darkroom spotlight'],
    category: 'Onboarding & Tours',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'The entire screen dims with a dark overlay, except for a highlighted "cutout" over a specific UI element, paired with an explanatory tooltip.',
    whenToUse: ['First-time user onboarding tours', 'Highlighting a massive UI layout change'],
    whenNotToUse: ['Every single time a user logs in', 'For extremely obvious UI buttons'],
    configTips: ['Use a mix-blend-mode or SVG mask to "punch a hole" in the dark overlay overlaying the target element\'s bounding box relative to the viewport'],
    seenIn: ['Framer', 'Slack onboarding', 'Arc Browser'],
    pageTypes: ['Dashboard', 'SaaS App', 'Mobile App'],
    useCases: ['Content Reveal', 'Content Reveal'],
    promptV0: `Create an onboarding spotlight that darkens the page but leaves a bright circular cutout over a specific button.`,
    promptCursor: `Create an onboarding spotlight that darkens the page but leaves a bright circular cutout over a specific button.`,
    promptCSS: `box-shadow: 0 0 0 9999px rgba(0,0,0,0.8); border-radius: 50%;`,
    codeTailwind: `export function SpotlightCoachMarkDemo() {}`,
    relatedSlugs: ['tooltip-fade-nudge', 'pulsing-hotspot']
  },
  {
    id: 82,
    slug: 'progressive-checklist-fill',
    nameEn: 'Progressive Checklist Fill',
    aliasesEn: ['onboarding steps', 'task completion list', 'strikethrough list'],
    category: 'Onboarding & Tours',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'As a user completes onboarding tasks, list items animate a strikethrough, a checkmark draws itself, and the entire item fades into a completed state, often filling a master progress bar.',
    whenToUse: ['Getting Started guides', 'Setup wizards', 'Complex multi-stage profile completions'],
    whenNotToUse: ['Simple stateless to-do lists'],
    configTips: ['Animate the expansion of the next uncompleted task automatically when the current one is checked off'],
    seenIn: ['Stripe Setup', 'Shopify Admin', 'Linear Issue Checklists'],
    pageTypes: ['Dashboard', 'Admin Panel', 'SaaS App'],
    useCases: ['Content Reveal', 'Form Submission'],
    promptV0: `Animate a setup checklist where checking an item crosses the text out and partially fills a progress bar above.`,
    promptCursor: `Animate a setup checklist where checking an item crosses the text out and partially fills a progress bar above.`,
    promptCSS: `transition: text-decoration-color 0.3s;`,
    codeTailwind: `export function ProgressiveChecklistFillDemo() {}`,
    relatedSlugs: ['checkmark-draw-animation', 'progress-bar']
  },
  // --- BATCH 4: Aesthetic & Premium Micro-Interactions ---
  {
    id: 83,
    slug: 'hover-glare-card',
    nameEn: 'Spotlight Glare Card',
    aliasesEn: ['mouse gradient hover', 'radial spotlight card', 'glassmorphism hover'],
    category: 'Data & Content Visualization',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A glossy card element where a soft, radial gradient spotlight perfectly tracks the user\'s mouse position over the surface, creating a physical "glare" effect.',
    whenToUse: ['Pricing tables', 'Premium feature grids (Bento grids)', 'SaaS landing pages'],
    whenNotToUse: ['High-density data tables', 'Text-heavy documentation'],
    configTips: ['Use a mouse move event listener to map clientX/clientY to the background radial-gradient coordinates'],
    seenIn: ['Vercel', 'Linear', 'TailwindUI Premium'],
    pageTypes: ['Landing Page', 'Portfolio'],
    useCases: ['Content Reveal'],
    promptV0: `Create a dark card that tracks the mouse hover. A soft white radial gradient should follow the mouse underneath the card's translucent border.`,
    promptCursor: `Create a dark card that tracks the mouse hover. A soft white radial gradient should follow the mouse underneath the card's translucent border.`,
    promptCSS: `background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%);`,
    codeTailwind: `export function HoverGlareCardDemo() {}`,
    relatedSlugs: ['tilt-parallax-card', 'spotlight-coach-mark']
  },
  {
    id: 54,
    slug: 'meteor-border-button',
    nameEn: 'Animated Gradient Border',
    aliasesEn: ['meteor border', 'moving border glow', 'rotating border'],
    category: 'Action Feedback',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'A button or card where a vibrant gradient beam continuously travels around its perimeter, similar to a meteor running along a track.',
    whenToUse: ['Primary Call-to-Action (CTA) buttons', 'Upgrading to "Pro" tier sections'],
    whenNotToUse: ['Secondary or destructive buttons', 'Inside busy UI components'],
    configTips: ['Use a conic-gradient spinning in the background, masked to only show at the 1px border gap'],
    seenIn: ['Aceternity UI', 'Magic UI', 'AI Generation buttons'],
    pageTypes: ['Landing Page', 'SaaS App'],
    useCases: ['Form Submission'],
    promptV0: `Create a dark button with a glowing border. A conic gradient should spin infinitely in the background, but only be visible through the 2px padding simulating the border.`,
    promptCursor: `Create a dark button with a glowing border. A conic gradient should spin infinitely in the background, but only be visible through the 2px padding simulating the border.`,
    promptCSS: `animation: spin 3s linear infinite; background: conic-gradient(from var(--angle), #ff0000, #0000ff);`,
    codeTailwind: `export function MeteorBorderButtonDemo() {}`,
    relatedSlugs: ['hover-lift-effect', 'ripple-effect']
  },
  {
    id: 84,
    slug: 'magnetic-button',
    nameEn: 'Magnetic Snap Button',
    aliasesEn: ['cursor attraction', 'sticky button hover'],
    category: 'Scroll & Navigation',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'When the mouse gets close to this button, the entire button (and its text) physically pulls towards the cursor, as if magnetized. It snaps back playfully when the mouse leaves.',
    whenToUse: ['Minimalist portfolio navigation', 'Hamburger menu icons', 'Floating Action Buttons (FABs)'],
    whenNotToUse: ['Dense forms', 'Standard native-feeling applications'],
    configTips: ['Map mouse coordinates to X/Y transforms within a specific radius, divided by a friction coefficient (e.g. / 2)'],
    seenIn: ['Awwwards Sites', 'Creative Portfolios'],
    pageTypes: ['Portfolio', 'Landing Page'],
    useCases: ['Content Reveal'],
    promptV0: `Write a React component for a magnetic button. As the mouse moves over it, the x and y transform of the button should follow the cursor slightly.`,
    promptCursor: `Write a React component for a magnetic button. As the mouse moves over it, the x and y transform of the button should follow the cursor slightly.`,
    promptCSS: `transform: translate(calc(var(--x) * 0.2px), calc(var(--y) * 0.2px));`,
    codeTailwind: `export function MagneticButtonDemo() {}`,
    relatedSlugs: ['hover-lift-effect', 'scale-on-press']
  },
  {
    id: 85,
    slug: 'text-decode-reveal',
    nameEn: 'Cypher / Matrix Text Reveal',
    aliasesEn: ['hacker text', 'random character scramble', 'evervault card'],
    category: 'Page & View Transitions',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'Text does not simply fade in; instead, it aggressively scrambles through random characters or numbers before locking into the intended legible English phrase.',
    whenToUse: ['Revealing API keys or secure data', 'AI generation completion states', 'Developer-focused brands'],
    whenNotToUse: ['Paragraphs of text', 'Conservative corporate sites'],
    configTips: ['Use a setInterval that updates characters to random math symbols or letters, progressively keeping the correct front characters locked'],
    seenIn: ['Evervault', 'Framer Templates', 'Cyberpunk aesthetics'],
    pageTypes: ['Dashboard', 'Landing Page'],
    useCases: ['Content Reveal'],
    promptV0: `Create a text component that scrambles through random symbols for 1 second before resolving to the target word from left to right.`,
    promptCursor: `Create a text component that scrambles through random symbols for 1 second before resolving to the target word from left to right.`,
    promptCSS: `font-family: monospace;`,
    codeTailwind: `export function TextDecodeRevealDemo() {}`,
    relatedSlugs: ['typing-dots', 'number-ticker']
  },
  {
    id: 86,
    slug: 'aurora-background',
    nameEn: 'Aurora / Mesh Gradient',
    aliasesEn: ['moving blobs background', 'animated mesh', 'fluid colors'],
    category: 'Empty & Error States',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'A deeply blurred, slow-moving set of vibrant gradient blobs (mesh gradient) that simulates the aurora borealis or viscous fluid, often set behind text or empty states.',
    whenToUse: ['Hero section backgrounds', 'Login screens empty space', 'Waiting or "generating" states'],
    whenNotToUse: ['Behind complex data tables', 'If performance is highly constrained (heavy blurred elements can be GPU intensive on mobile)'],
    configTips: ['Use absolute positioned divs with intense blur (e.g., blur-[120px]) and animate their translation and scale infinitely.'],
    seenIn: ['Stripe', 'Linear', 'Apple Siri UI'],
    pageTypes: ['Landing Page', 'Form/Survey'],
    useCases: ['Content Reveal'],
    promptV0: `Create an animated aurora background using 3 heavily blurred, overlapping CSS circles (cyan, magenta, yellow) that slowly drift and change size.`,
    promptCursor: `Create an animated aurora background using 3 heavily blurred, overlapping CSS circles (cyan, magenta, yellow) that slowly drift and change size.`,
    promptCSS: `filter: blur(100px); animation: drift 10s infinite alternate;`,
    codeTailwind: `export function AuroraBackgroundDemo() {}`,
    relatedSlugs: ['shimmer-loader', 'image-lazy-load-fade']
  },
  {
    id: 87,
    slug: 'tracing-beam-progress',
    nameEn: 'Tracing Beam Scroll',
    aliasesEn: ['svg line scroll', 'glowing sidebar indicator'],
    category: 'Scroll & Navigation',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A side navigation or progress bar where a glowing "beam" of light physically traces a curved SVG path downwards as the user scrolls, matching their vertical progression.',
    whenToUse: ['Lengthy technical documentation', 'Story-driven landing pages (Timelines)'],
    whenNotToUse: ['Short pages', 'Pages with no distinct structural sections'],
    configTips: ['Map scrollYProgress to an SVG path\'s stroke-dashoffset or to the top positioning of a glowing div element inside a relative track'],
    seenIn: ['Aceternity UI', 'Next.js Conf Pages'],
    pageTypes: ['Documentation', 'Blog'],
    useCases: ['List Population', 'Content Reveal'],
    promptV0: `Create a vertical timeline where scrolling maps directly to a glowing gradient beam traveling down a long SVG curve on the left side of the screen.`,
    promptCursor: `Create a vertical timeline where scrolling maps directly to a glowing gradient beam traveling down a long SVG curve on the left side of the screen.`,
    promptCSS: `stroke-dasharray: 1000; transition: stroke-dashoffset 0.1s;`,
    codeTailwind: `export function TracingBeamProgressDemo() {}`,
    relatedSlugs: ['parallax-scroll', 'sticky-heading']
  },
  {
    id: 88,
    slug: 'tilt-parallax-card',
    nameEn: '3D Tilt Parallax Card',
    aliasesEn: ['floating card tilt', 'mouse tracking 3d', 'hover depth'],
    category: 'Data & Content Visualization',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'Cards that literally tilt on their X and Y axes in response to mouse movement. Internal elements (like a logo or image) often move at a faster rate to simulate true 3D depth.',
    whenToUse: ['Physical product representations (e.g. Credit Cards)', 'Premium feature show-offs'],
    whenNotToUse: ['Cards that contain heavy interaction like form inputs or carousels'],
    configTips: ['Use Framer Motion\'s useMouse, map coordinates to rotationX and rotationY (-15deg to 15deg), and apply translateZ to child elements.'],
    seenIn: ['Apple Pay Promos', 'Discord server boosts', 'GitHub Wrap-up'],
    pageTypes: ['Landing Page', 'Portfolio'],
    useCases: ['Content Reveal'],
    promptV0: `Create a card that tilts in 3D space based on mouse position. Add a transform: translateZ(50px) to the text inside so it seems to float above the card background.`,
    promptCursor: `Create a card that tilts in 3D space based on mouse position. Add a transform: translateZ(50px) to the text inside so it seems to float above the card background.`,
    promptCSS: `transform-style: preserve-3d; perspective: 1000px;`,
    codeTailwind: `export function TiltParallaxCardDemo() {}`,
    relatedSlugs: ['hover-glare-card', 'hover-lift-effect']
  },
  {
    id: 89,
    slug: 'liquid-wave-transition',
    nameEn: 'Liquid / Wave Transition',
    aliasesEn: ['water drop reveal', 'circle clip-path transition'],
    category: 'Page & View Transitions',
    difficulty: 'needs_tweaking',
    mediaTier: 3,
    description: 'A full page transition that begins as a small circle at the user\'s click coordinate, rapidly expanding outward like a liquid ripple to overtake the screen and reveal the new view.',
    whenToUse: ['Entering highly immersive states (e.g., full-screen image viewer, games)', 'Navigating to an opposite-themed page (Light to Dark mode switch)'],
    whenNotToUse: ['Fast, utilitarian navigation (e.g., switching simple tabs)'],
    configTips: ['Animate a CSS clip-path: circle(0% at x y) expanding to circle(150% at x y) upon click.'],
    seenIn: ['Material Design v3', 'Concept apps', 'Creative agency websites'],
    pageTypes: ['Mobile App', 'Landing Page'],
    useCases: ['Content Reveal', 'Data Loading'],
    promptV0: `Create a full screen overlay transition using clip-path: circle() that animates from a pinpoint to covering the entire viewport dynamically.`,
    promptCursor: `Create a full screen overlay transition using clip-path: circle() that animates from a pinpoint to covering the entire viewport dynamically.`,
    promptCSS: `clip-path: circle(10px at 50% 50%); transition: clip-path 0.5s ease-in-out;`,
    codeTailwind: `export function LiquidWaveTransitionDemo() {}`,
    relatedSlugs: ['shared-element-transition', 'ripple-effect']
  },
  // --- BATCH 5: High-Fidelity & Real-World Interaction Forms ---
  {
    id: 93,
    slug: 'dynamic-island-expand',
    nameEn: 'Dynamic Island Expand',
    aliasesEn: ['capsule expand', 'notch animation', 'status pill morph'],
    category: 'Status & Confirmation',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A top-anchored capsule that fluidly morphs into a larger notification card, accommodating new UI controls, and smoothly reverts to a resting pill shape.',
    whenToUse: ['System-level background tasks', 'Music player mini-status', 'Toast notification alternatives'],
    whenNotToUse: ['Complex forms', 'Critical blocking alerts'],
    configTips: ['Use Framer Motion `layout` prop on the container to automatically interpolate width, height, and border-radius.'],
    seenIn: ['iOS 16+', 'Vercel Deployment Status', 'Premium Web Dashboards'],
    pageTypes: ['Mobile App', 'Dashboard'],
    useCases: ['Content Reveal', 'Data Loading'],
    promptV0: `Create a black pill-shaped div that uses framer-motion layout to seamlessly expand into a larger rounded rectangle card when clicked.`,
    promptCursor: `Create a black pill-shaped div that uses framer-motion layout to seamlessly expand into a larger rounded rectangle card when clicked.`,
    promptCSS: `transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);`,
    codeTailwind: `export function DynamicIslandExpandDemo() {}`,
    relatedSlugs: ['modal-enter-exit', 'accordion-expand']
  },
  {
    id: 62,
    slug: 'directional-hover-card',
    nameEn: 'Directional Hover Card',
    aliasesEn: ['mouse-aware reveal', 'edge detection hover', 'smart overlay'],
    category: 'Data & Content Visualization',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A picture or content card that detects the exact edge (top, right, bottom, left) the mouse cursor enters from, and slides an information overlay in from that specific direction. It exits out the same edge the mouse leaves.',
    whenToUse: ['Rich portfolio image galleries', 'E-commerce product grids'],
    whenNotToUse: ['Text-heavy informative tables', 'Mobile-first designs lacking hover states'],
    configTips: ['Calculate the angle of the mouse entry relative to the center of the element to determine which of the 4 quadrants the mouse crossed.'],
    seenIn: ['Creative Agency Portfolios', 'Awwwards Winners'],
    pageTypes: ['Portfolio', 'Landing Page'],
    useCases: ['Content Reveal'],
    promptV0: `Create a card that detects mouse entry direction using trigonometry and slides an overlay div in from that corresponding side.`,
    promptCursor: `Create a card that detects mouse entry direction using trigonometry and slides an overlay div in from that corresponding side.`,
    promptCSS: `transform: translateX(-100%); transition: transform 0.3s;`,
    codeTailwind: `export function DirectionalHoverCardDemo() {}`,
    relatedSlugs: ['hover-lift-effect', 'slide-transition']
  },
  {
    id: 91,
    slug: 'floating-label-input',
    nameEn: 'Animated Floating Label',
    aliasesEn: ['material input float', 'placeholder to label', 'input focus animation'],
    category: 'Action Feedback',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A modernized input field where the placeholder text gracefully shrinks, changes color, and floats to the top edge of the input boundary when focused or filled.',
    whenToUse: ['Registration forms', 'Login screens', 'Compact data entry layouts'],
    whenNotToUse: ['Extremely dense enterprise data tables where vertical space is tightly constrained'],
    configTips: ['Use the `:focus-within` and `:not(:placeholder-shown)` CSS pseudo-classes to trigger the translation and scaling of the absolute-positioned label.'],
    seenIn: ['Material Design', 'Moden SaaS Forms', 'Stripe Checkout'],
    pageTypes: ['Form/Survey', 'Landing Page'],
    useCases: ['Form Submission'],
    promptV0: `Create a text input field where the label floats up and shrinks slightly when the input is focused or has a value.`,
    promptCursor: `Create a text input field where the label floats up and shrinks slightly when the input is focused or has a value.`,
    promptCSS: `transform: translateY(-50%) scale(0.8); transition: all 0.2s ease-out;`,
    codeTailwind: `export function FloatingLabelInputDemo() {}`,
    relatedSlugs: ['form-validation-error', 'success-screen-transition']
  },
  {
    id: 92,
    slug: 'password-strength-gauge',
    nameEn: 'Fluid Password Strength Gauge',
    aliasesEn: ['security meter', 'elastic progress bar', 'password feedback'],
    category: 'Action Feedback',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A smooth, interpolating bar that physically stretches and continuously shifts color from red (weak) to yellow (fair) to green (strong) as the user types.',
    whenToUse: ['User registration', 'Password reset forms', 'Security setting pages'],
    whenNotToUse: ['Standard non-sensitive data inputs'],
    configTips: ['Use Framer Motion to animate the `width` and `backgroundColor` of a single div simultaneously.'],
    seenIn: ['Auth0', 'GitHub Signup', '1Password'],
    pageTypes: ['Dashboard', 'Landing Page'],
    useCases: ['Form Submission'],
    promptV0: `Create a password strength indicator line that animates its width and color from red (20%) to yellow (50%) to green (100%) based on input character count.`,
    promptCursor: `Create a password strength indicator line that animates its width and color from red (20%) to yellow (50%) to green (100%) based on input character count.`,
    promptCSS: `transition: width 0.3s ease, background-color 0.3s ease;`,
    codeTailwind: `export function PasswordStrengthGaugeDemo() {}`,
    relatedSlugs: ['progress-bar', 'form-validation-error']
  },
  {
    id: 65,
    slug: 'expandable-search-bar',
    nameEn: 'Expandable Search Input',
    aliasesEn: ['magic search icon', 'collapsing input', 'icon to field'],
    category: 'Scroll & Navigation',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'Initially just a circular search magnifying glass icon. Upon interaction, it elastically unravels horizontally into a full active text input field.',
    whenToUse: ['Minimalist headers', 'Mobile navigation bars', 'Secondary toolbars'],
    whenNotToUse: ['Search-centric pages (like Google or E-commerce catalogs) where the search bar must always be fully visible'],
    configTips: ['Animate the width of the container from `40px` (icon size) to `100%` / `300px` within a layout group.'],
    seenIn: ['Apple.com', 'Notion', 'Various minimal blogs'],
    pageTypes: ['Blog', 'Portfolio'],
    useCases: ['Search Results', 'Content Reveal'],
    promptV0: `Build a circular button with a search icon that cleanly expands into a 250px wide text input upon clicking.`,
    promptCursor: `Build a circular button with a search icon that cleanly expands into a 250px wide text input upon clicking.`,
    promptCSS: `width: 40px; transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);`,
    codeTailwind: `export function ExpandableSearchBarDemo() {}`,
    relatedSlugs: ['dynamic-island-expand', 'accordion-expand']
  },
  {
    id: 66,
    slug: 'morphing-svg-icon',
    nameEn: 'Morphing SVG Icon',
    aliasesEn: ['path tweening icon', 'play to pause animation', 'hamburger to cross'],
    category: 'Action Feedback',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'A seamless vertex-to-vertex transformation between two distinct icons (e.g., Play -> Pause, Menu -> Close), fluidly shifting shapes rather than just a hard cut swap.',
    whenToUse: ['Media players', 'Hamburger menus', 'Interactive toggle buttons'],
    whenNotToUse: ['When icons have drastically different structural nodes that result in chaotic spaghetti morphs'],
    configTips: ['Ensure SVG paths have the same number of data points, or rely on Framer Motion\'s powerful cross-morph capabilities for simpler SVGs.'],
    seenIn: ['YouTube App', 'Spotify UI', 'Material Navigation'],
    pageTypes: ['Mobile App', 'Dashboard'],
    useCases: ['Content Refresh', 'Data Loading'],
    promptV0: `Use framer-motion to animate an SVG path 'd' attribute smoothly from a play triangle to two vertical pause bars.`,
    promptCursor: `Use framer-motion to animate an SVG path 'd' attribute smoothly from a play triangle to two vertical pause bars.`,
    promptCSS: `No pure CSS equivalent without third-party SMIL; rely on React Framer Motion.`,
    codeTailwind: `export function MorphingSvgIconDemo() {}`,
    relatedSlugs: ['toggle-switch-animation', 'data-tweening']
  },
  {
    id: 67,
    slug: 'flip-3d-card',
    nameEn: '180° 3D Card Flip',
    aliasesEn: ['flashcard turn', 'two-sided card', 'flip reveal'],
    category: 'Data & Content Visualization',
    difficulty: 'paste_go',
    mediaTier: 2,
    description: 'A card that physically turns around in 3D space along its Y or X axis to reveal content on its "back" side, like a flashcard or a playing card.',
    whenToUse: ['Pricing tiers (Monthly vs Annual)', 'Flashcard study aids', 'Staff bio cards (front picture, back bio)'],
    whenNotToUse: ['Primary navigation flows', 'Forms that users frequently edit'],
    configTips: ['Use CSS `preserve-3d` on the container, and `backface-visibility: hidden` on both the absolute positioned front and back panels.'],
    seenIn: ['Duolingo', 'Stripe Connect', 'Interactive courses'],
    pageTypes: ['Landing Page', 'Form/Survey'],
    useCases: ['Content Reveal'],
    promptV0: `Create a React component card that flips 180 degrees horizontally to show its back side when clicked, using preserve-3d and backface-visibility.`,
    promptCursor: `Create a React component card that flips 180 degrees horizontally to show its back side when clicked, using preserve-3d and backface-visibility.`,
    promptCSS: `transform: rotateY(180deg); transform-style: preserve-3d; backface-visibility: hidden;`,
    codeTailwind: `export function Flip3DCardDemo() {}`,
    relatedSlugs: ['tilt-parallax-card', 'slide-transition']
  },
  {
    id: 68,
    slug: 'liquid-swipe-action',
    nameEn: 'Fluid Swipe-to-Action',
    aliasesEn: ['stretchy delete swipe', 'elastic list item', 'mobile swipe menu'],
    category: 'Action Feedback',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A list item that can be dragged horizontally with high elasticity. Dropping it reveals under-the-fold action buttons (like Delete/Archive) with an elastic rubber-band snap.',
    whenToUse: ['Mobile-first list views (Emails, Tasks)', 'Heavy editing interfaces'],
    whenNotToUse: ['Desktop grids where a mouse hover menu is vastly superior and standard'],
    configTips: ['Map Framer Motion `drag="x"` coordinates to an elastic spring, scaling the revealed icons based on drag distance.'],
    seenIn: ['Apple Mail (iOS)', 'Telegram/WhatsApp Chats', 'Todoist'],
    pageTypes: ['Mobile App', 'Dashboard'],
    useCases: ['Content Refresh', 'Content Reveal'],
    promptV0: `Build a mobile-style list item that can be dragged left using framer-motion drag constraints, revealing a colored Delete background underneath.`,
    promptCursor: `Build a mobile-style list item that can be dragged left using framer-motion drag constraints, revealing a colored Delete background underneath.`,
    promptCSS: `touch-action: pan-y; overflow-x: hidden;`,
    codeTailwind: `export function LiquidSwipeActionDemo() {}`,
    relatedSlugs: ['drag-drop-ghost', 'pull-to-refresh']
  },
  {
    id: 90,
    slug: 'active-pill-slide',
    nameEn: 'Active Pill Slide',
    aliasesEn: ['segmented control slide', 'selected pill animation', 'active chip transition'],
    category: 'Page & View Transitions',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A rounded active background that glides from one segmented option or filter chip to another, making the selected state feel continuous instead of abruptly changing.',
    whenToUse: [
      'Segmented controls such as Overview / Compare / Build',
      'Filter chips where only one option is active',
      'Mode switchers that update nearby content'
    ],
    whenNotToUse: [
      'Large navigation menus with long labels or wrapping text',
      'Multi-select filters where several chips can be active at once',
      'Cases where the content change is more important than the selected control'
    ],
    configTips: [
      'Use a shared layout element for the active background so it travels between buttons',
      'Keep the motion short, usually 160-240ms, so selection feels immediate',
      'Pair it with a subtle fade transition in the content region'
    ],
    seenIn: ['Linear', 'Vercel', 'Apple Settings'],
    pageTypes: ['Dashboard', 'SaaS App', 'Mobile App', 'Documentation'],
    useCases: ['Content Reveal', 'Search Results'],
    bestFor: 'Showing which option is currently selected in a compact control while preserving spatial continuity.',
    avoidWhen: 'Avoid it for normal links, long side navigation, or multi-select controls where a moving single indicator would misrepresent state.',
    durationGuidance: '160-240ms is usually enough; slower movement makes simple selection feel heavy.',
    easingGuidance: 'Use a soft spring or a fast ease-out curve so the pill lands crisply without bouncing too much.',
    motionRisk: ['overdesigned', 'accessibility_sensitive'],
    alternatives: ['tab-underline-slide', 'fade-transition', 'toggle-switch-animation'],
    decisionNote: 'Use Active Pill Slide when the selected container itself should move; use Tab Underline Slide when only navigation emphasis should move.',
    promptV0: `Create a segmented control with three options. When I click an option, animate a rounded active background so it slides under the selected label, then fade the content below to match the new selection.`,
    promptCursor: `Build an ActivePillSlide component with Framer Motion. Render each option as a relative button. Inside the active button, render a motion.span with layoutId="active-pill" positioned absolute inset-0 behind the label. Use a LayoutGroup and update activeIndex on click.`,
    promptCSS: `/* Pure CSS needs fixed option widths or JS-calculated translateX. Prefer a shared layout animation in React. */`,
    codeTailwind: `import { LayoutGroup, motion } from 'framer-motion';

export function ActivePillSlide() {
  const [active, setActive] = useState('Overview');
  const options = ['Overview', 'Compare', 'Build'];

  return (
    <LayoutGroup>
      <div className="flex rounded-full bg-stone-100 p-1">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setActive(option)}
            className="relative rounded-full px-4 py-2 text-sm"
          >
            {active === option && (
              <motion.span
                layoutId="active-pill"
                className="absolute inset-0 rounded-full bg-stone-950"
              />
            )}
            <span className="relative z-10">{option}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}`,
    relatedSlugs: ['tab-underline-slide', 'fade-transition', 'scale-on-press']
  },
  {
    id: 102,
    slug: 'popover-coach-step',
    nameEn: 'Popover Coach Step',
    aliasesEn: ['guided popover', 'tour step card', 'onboarding popover', 'product tour bubble'],
    category: 'Onboarding & Tours',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'A small anchored popover that explains one interface element at a time and shows progress through a guided setup or product tour.',
    whenToUse: [
      'First-run flows where the next action is not obvious',
      'Feature launches that need one focused explanation',
      'Setup wizards where users need local context before proceeding'
    ],
    whenNotToUse: [
      'Interfaces where the user already clicked an obvious control',
      'Long tours that explain every part of the page',
      'Dense mobile screens where the popover blocks the actual task'
    ],
    configTips: [
      'Anchor the popover to a real UI element and keep the pointer visually connected',
      'Show step count only when there are multiple steps',
      'Keep entrance under 300ms so the guidance feels responsive'
    ],
    seenIn: ['Linear', 'Notion', 'Intercom'],
    pageTypes: ['SaaS App', 'Dashboard', 'Admin Panel', 'Documentation'],
    useCases: ['Authentication', 'Content Reveal'],
    bestFor: 'Explaining one unfamiliar control while keeping the user oriented in the actual interface.',
    avoidWhen: 'Avoid it when the tour becomes a lecture or the popover hides the element it is explaining.',
    durationGuidance: '180-280ms entrance with no looping motion; users should read the content, not watch the container.',
    easingGuidance: 'Use a fast ease-out with a small y-offset or scale, then stay still.',
    motionRisk: ['distraction', 'accessibility_sensitive'],
    alternatives: ['spotlight-coach-mark', 'tooltip-fade-nudge', 'focus-ring-highlight'],
    decisionNote: 'Use Popover Coach Step when guidance needs text and context; use Spotlight Coach Mark when attention is the main job.',
    promptV0: `Create a guided onboarding popover anchored below a primary button. Animate it in with a short fade and upward slide, include "Step 1 of 3", one sentence of guidance, and a small progress line.`,
    promptCursor: `Build a PopoverCoachStep component with an anchored absolute popover. Animate opacity, y, and scale with Framer Motion. Keep the arrow attached to the target and include reduced-motion support by disabling the transform animation.`,
    promptCSS: `opacity: 0; transform: translateY(-8px) scale(.96); transition: opacity .24s ease-out, transform .24s cubic-bezier(.16,1,.3,1);`,
    codeTailwind: `export function PopoverCoachStep({ open }: { open: boolean }) {
  return (
    <div className="relative inline-flex">
      <button className="rounded-full bg-stone-950 px-4 py-2 text-white">Create project</button>
      {open && (
        <div className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-xl border bg-white p-4 shadow-xl">
          <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t bg-white" />
          <p className="font-mono text-xs uppercase text-stone-400">Step 1 of 3</p>
          <p className="mt-2 text-sm text-stone-700">Start by creating your first workspace.</p>
        </div>
      )}
    </div>
  );
}`,
    relatedSlugs: ['spotlight-coach-mark', 'tooltip-fade-nudge', 'pulsing-hotspot']
  },
  {
    id: 103,
    slug: 'focus-ring-highlight',
    nameEn: 'Focus Ring Highlight',
    aliasesEn: ['animated focus ring', 'field highlight', 'guided outline', 'attention ring'],
    category: 'Onboarding & Tours',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'An animated outline that briefly surrounds the exact control the user should notice or use next.',
    whenToUse: [
      'Guiding users to a newly available field',
      'Drawing attention after validation or setup progress',
      'Highlighting a changed setting without covering the UI'
    ],
    whenNotToUse: [
      'Every focus state in a form',
      'Critical accessibility focus indicators that should remain stable',
      'Multiple simultaneous highlights'
    ],
    configTips: [
      'Do not replace the browser focus ring; layer this as additional guidance',
      'Use one or two pulses, then settle to a static outline',
      'Keep enough contrast between the ring and surrounding surface'
    ],
    seenIn: ['Stripe Dashboard', 'Airtable', 'GitHub'],
    pageTypes: ['SaaS App', 'Admin Panel', 'Form/Survey', 'Dashboard'],
    useCases: ['Form Submission', 'Content Reveal'],
    bestFor: 'Pointing to the next input or control without adding a tooltip or blocking interaction.',
    avoidWhen: 'Avoid it as a permanent decorative outline; it should resolve quickly after it attracts attention.',
    durationGuidance: '250ms ring entrance, optional 1-1.4s single pulse; stop after acknowledgement.',
    easingGuidance: 'Ease-out for the ring, linear opacity fade for the pulse.',
    motionRisk: ['distraction', 'accessibility_sensitive'],
    alternatives: ['popover-coach-step', 'pulsing-hotspot', 'tooltip-fade-nudge'],
    decisionNote: 'Use Focus Ring Highlight when the UI itself can explain the next step and only needs attention.',
    promptV0: `Add an animated amber focus ring around the "Team URL" field when the setup reaches that step. The ring should fade in, pulse once, and then stay as a quiet outline.`,
    promptCursor: `Create a FocusRingHighlight wrapper that renders children and an absolutely positioned motion.div ring. Animate opacity and scale when active. Do not remove native focus-visible styles.`,
    promptCSS: `box-shadow: 0 0 0 2px #f59e0b; animation: focus-pulse 1.2s ease-out 1;`,
    codeTailwind: `export function FocusRingHighlight({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div className="relative rounded-xl">
      {children}
      {active && <div className="pointer-events-none absolute -inset-1 rounded-2xl border-2 border-amber-400" />}
    </div>
  );
}`,
    relatedSlugs: ['pulsing-hotspot', 'spotlight-coach-mark', 'form-validation-error']
  },
  {
    id: 104,
    slug: 'step-indicator-motion',
    nameEn: 'Step Indicator Motion',
    aliasesEn: ['wizard progress steps', 'stepper animation', 'checkout steps', 'progress stepper'],
    category: 'Onboarding & Tours',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A horizontal or vertical stepper where the active dot, connecting line, and label animate as users move through a multi-step flow.',
    whenToUse: [
      'Checkout flows',
      'Account setup or onboarding sequences',
      'Multi-step forms where progress affects user confidence'
    ],
    whenNotToUse: [
      'Single-page forms with no real sequence',
      'Flows where users can jump freely between many sections',
      'Tiny mobile headers where the indicator competes with navigation'
    ],
    configTips: [
      'Animate completed line length before changing the next label emphasis',
      'Use numbers or icons only if the sequence has stable steps',
      'Keep the active step visible above the fold on mobile'
    ],
    seenIn: ['Shopify Checkout', 'Typeform', 'Airbnb'],
    pageTypes: ['E-commerce', 'Form/Survey', 'SaaS App', 'Mobile App'],
    useCases: ['Form Submission', 'Authentication'],
    bestFor: 'Showing progress through a known sequence where completion reduces user uncertainty.',
    avoidWhen: 'Avoid it for exploratory navigation or long workflows where exact step count changes.',
    durationGuidance: '200-450ms per transition; line fill and dot activation should feel like one movement.',
    easingGuidance: 'Use ease-out for progress fill and a light spring for the active dot.',
    motionRisk: ['feels_slow', 'accessibility_sensitive'],
    alternatives: ['progressive-checklist-fill', 'progress-bar', 'active-pill-slide'],
    decisionNote: 'Use Step Indicator Motion for fixed multi-step flows; use Progress Bar when the process is continuous instead of discrete.',
    promptV0: `Create a three-step checkout indicator. When the user advances, animate the connecting line to the next circle, then highlight the new active step and label.`,
    promptCursor: `Build a StepIndicatorMotion component with an activeStep prop. Animate the progress line width and each step circle scale/color. Keep labels readable and expose aria-current on the active step.`,
    promptCSS: `transition: width .35s ease-out, background-color .2s ease-out, transform .2s ease-out;`,
    codeTailwind: `export function StepIndicator({ activeStep }: { activeStep: number }) {
  return (
    <ol className="relative flex justify-between">
      <div className="absolute left-6 right-6 top-6 h-1 bg-stone-200" />
      <div className="absolute left-6 top-6 h-1 bg-amber-400 transition-all" style={{ width: activeStep > 1 ? '50%' : '0%' }} />
      {[1, 2, 3].map((step) => (
        <li key={step} aria-current={activeStep === step ? 'step' : undefined} className="relative z-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border bg-white">{step}</span>
        </li>
      ))}
    </ol>
  );
}`,
    relatedSlugs: ['progressive-checklist-fill', 'progress-bar', 'active-pill-slide']
  },
  {
    id: 105,
    slug: 'line-chart-draw',
    nameEn: 'Line Chart Draw',
    aliasesEn: ['chart line reveal', 'svg path draw', 'trend line animation', 'analytics line draw'],
    category: 'Data & Content Visualization',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A chart line that draws along its path to reveal trend direction and make the data feel progressively discovered.',
    whenToUse: [
      'Analytics cards where the trend matters more than each exact point',
      'First reveal of a dashboard section',
      'Reports where a single metric trajectory needs emphasis'
    ],
    whenNotToUse: [
      'Live charts that update every second',
      'Dense dashboards where many charts would animate at once',
      'Charts where exact values must be inspected immediately'
    ],
    configTips: [
      'Use SVG pathLength or stroke-dashoffset instead of animating layout',
      'Keep axes and labels static while the line draws',
      'Avoid repeating the draw after the user has already seen the data'
    ],
    seenIn: ['Stripe Dashboard', 'Amplitude', 'Linear Insights'],
    pageTypes: ['Dashboard', 'SaaS App', 'Admin Panel'],
    useCases: ['Content Reveal', 'Data Loading'],
    bestFor: 'Introducing one important trend without making the whole chart feel delayed.',
    avoidWhen: 'Avoid it for rapid monitoring screens or repeated chart refreshes.',
    durationGuidance: '700-1200ms for first reveal; under 500ms for small sparklines.',
    easingGuidance: 'Ease-out so the line starts decisively and settles at the final point.',
    motionRisk: ['feels_slow', 'accessibility_sensitive'],
    alternatives: ['chart-bar-growth', 'data-tweening', 'number-ticker'],
    decisionNote: 'Use Line Chart Draw when trend shape is the story; use Number Ticker when the final number is the story.',
    promptV0: `Create an analytics card where the line chart path draws from left to right on first reveal while axes and labels stay visible.`,
    promptCursor: `Build a LineChartDraw component using an SVG path. Animate pathLength from 0 to 1 with Framer Motion, respect prefers-reduced-motion, and do not animate the axis labels.`,
    promptCSS: `stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw-line .9s ease-out forwards;`,
    codeTailwind: `export function LineChartDraw({ active = true }: { active?: boolean }) {
  return (
    <figure className="rounded-2xl border border-stone-200 bg-white p-5">
      <figcaption className="mb-4 flex items-center justify-between text-sm">
        <span className="font-medium text-stone-800">Activation trend</span>
        <span className="font-mono text-xs text-emerald-600">+18%</span>
      </figcaption>
      <svg viewBox="0 0 260 110" className="w-full text-amber-500" aria-label="Activation trend line chart">
        <path d="M4 88 C42 72,54 50,86 60 C120 70,134 22,166 34 C204 48,218 18,256 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" pathLength={1} className={active ? '[stroke-dasharray:1] [stroke-dashoffset:0] transition-[stroke-dashoffset] duration-700 ease-out' : '[stroke-dasharray:1] [stroke-dashoffset:1]'} />
      </svg>
    </figure>
  );
}`,
    relatedSlugs: ['chart-bar-growth', 'data-tweening', 'number-ticker']
  },
  {
    id: 106,
    slug: 'pie-chart-reveal',
    nameEn: 'Pie Chart Reveal',
    aliasesEn: ['donut chart reveal', 'radial segment animation', 'chart slice reveal', 'distribution reveal'],
    category: 'Data & Content Visualization',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A pie or donut chart whose segments draw in sequence so users can understand distribution before reading the legend.',
    whenToUse: [
      'Small distribution summaries',
      'Dashboard cards with three to five categories',
      'Reports where segment proportion is the main takeaway'
    ],
    whenNotToUse: [
      'Charts with many tiny slices',
      'Financial or scientific contexts where exact comparison matters',
      'Repeated refreshes where animation hides changed values'
    ],
    configTips: [
      'Limit segment count and label the values outside the animation',
      'Animate the largest segment first when hierarchy matters',
      'Use reduced motion to show final segments immediately'
    ],
    seenIn: ['Google Analytics', 'Figma Admin', 'HubSpot'],
    pageTypes: ['Dashboard', 'Admin Panel', 'SaaS App'],
    useCases: ['Content Reveal', 'Data Loading'],
    bestFor: 'Revealing a simple distribution where the relative slice sizes matter at a glance.',
    avoidWhen: 'Avoid it when a bar chart would make comparison more accurate.',
    durationGuidance: '500-900ms total; each segment should appear quickly enough that the chart does not feel gated.',
    easingGuidance: 'Use ease-out for each segment and stagger by 80-160ms.',
    motionRisk: ['misleading_progress', 'accessibility_sensitive'],
    alternatives: ['chart-bar-growth', 'line-chart-draw', 'progress-ring'],
    decisionNote: 'Use Pie Chart Reveal for distribution; use Chart Bar Growth when category comparison must be more precise.',
    promptV0: `Create a donut chart card where three segments reveal one after another, with a static legend beside the chart.`,
    promptCursor: `Build a PieChartReveal component with SVG circles using strokeDasharray and strokeDashoffset. Animate each segment pathLength with a short stagger and skip animation for reduced motion.`,
    promptCSS: `stroke-dasharray: 45 100; transition: stroke-dashoffset .6s ease-out;`,
    codeTailwind: `export function PieChartReveal({ active = true }: { active?: boolean }) {
  const segments = [
    { label: 'Team', color: 'stroke-amber-500', value: 42, offset: 0 },
    { label: 'Self serve', color: 'stroke-stone-900', value: 34, offset: -42 },
    { label: 'Partner', color: 'stroke-stone-300', value: 24, offset: -76 },
  ];

  return (
    <div className="flex items-center gap-5 rounded-2xl border border-stone-200 bg-white p-5">
      <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90" aria-label="Customer mix donut chart">
        {segments.map((segment, index) => (
          <circle key={segment.label} cx="60" cy="60" r="42" fill="none" strokeWidth="18" strokeDasharray={\`\${segment.value} 100\`} strokeDashoffset={segment.offset} className={\`\${segment.color} transition-opacity duration-500 \${active ? 'opacity-100' : 'opacity-20'}\`} style={{ transitionDelay: \`\${index * 120}ms\` }} />
        ))}
      </svg>
      <div className="space-y-2 text-sm text-stone-600">
        {segments.map((segment) => <div key={segment.label}>{segment.label}: {segment.value}%</div>)}
      </div>
    </div>
  );
}`,
    relatedSlugs: ['chart-bar-growth', 'progress-ring', 'data-tweening']
  },
  {
    id: 107,
    slug: 'timeline-reveal',
    nameEn: 'Timeline Reveal',
    aliasesEn: ['milestone reveal', 'timeline animation', 'process timeline', 'roadmap reveal'],
    category: 'Data & Content Visualization',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A vertical or horizontal timeline that reveals milestones in order, connecting each event with a drawing line or staggered item entrance.',
    whenToUse: [
      'Project roadmaps',
      'Order tracking and delivery status',
      'Case studies or process explanations'
    ],
    whenNotToUse: [
      'Feeds where chronological order is not important',
      'Long histories with dozens of events',
      'Pages where users need to scan all entries immediately'
    ],
    configTips: [
      'Draw the connector line before or alongside each milestone',
      'Keep each item entrance subtle; the sequence already creates motion',
      'Stop animation after the timeline has been revealed once'
    ],
    seenIn: ['Linear Changelog', 'Shopify Order Tracking', 'GitHub Actions'],
    pageTypes: ['Documentation', 'SaaS App', 'E-commerce', 'Portfolio'],
    useCases: ['Content Reveal', 'Content Refresh'],
    bestFor: 'Making ordered milestones feel connected and progressive.',
    avoidWhen: 'Avoid it for unordered cards or large archive pages.',
    durationGuidance: '120-180ms stagger per milestone, with total reveal under 1.2s for short timelines.',
    easingGuidance: 'Ease-out for item entrance; linear or ease-out for the connector line.',
    motionRisk: ['feels_slow', 'accessibility_sensitive'],
    alternatives: ['stagger-list-reveal', 'step-indicator-motion', 'scroll-reveal'],
    decisionNote: 'Use Timeline Reveal when sequence and causality matter; use Stagger List Reveal for unordered content.',
    promptV0: `Create a vertical timeline where the connector line draws down and each milestone card fades in from the left as it becomes active.`,
    promptCursor: `Build a TimelineReveal component with static milestone content and an animated connector. Stagger item opacity/x animations and disable the stagger under prefers-reduced-motion.`,
    promptCSS: `animation: timeline-item .24s ease-out both; animation-delay: calc(var(--index) * 120ms);`,
    codeTailwind: `export function TimelineReveal() {
  const items = ['Brief', 'Prototype', 'Launch'];
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-px bg-stone-200" />
      {items.map((item) => <div key={item} className="relative pl-12">{item}</div>)}
    </div>
  );
}`,
    relatedSlugs: ['stagger-list-reveal', 'scroll-reveal', 'step-indicator-motion']
  },
  {
    id: 108,
    slug: 'notification-dot-pulse',
    nameEn: 'Notification Dot Pulse',
    aliasesEn: ['unread badge pulse', 'status dot pulse', 'alert dot animation', 'notification ping'],
    category: 'Status & Confirmation',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A small status dot that pulses briefly to announce a new unread item or changed state without opening a full notification.',
    whenToUse: [
      'Unread messages or alerts',
      'Background status changes that need lightweight attention',
      'Navigation badges where the count is less important than newness'
    ],
    whenNotToUse: [
      'Critical errors that need explicit text',
      'Always-on decorative badges',
      'Multiple nav items pulsing at the same time'
    ],
    configTips: [
      'Pulse only when the status changes, then settle to a static dot',
      'Pair the dot with accessible text or an aria-label',
      'Use restrained scale and opacity so it does not feel like an alarm'
    ],
    seenIn: ['Slack', 'Discord', 'Linear'],
    pageTypes: ['SaaS App', 'Chat Interface', 'Dashboard', 'Mobile App'],
    useCases: ['Content Refresh', 'Search Results'],
    bestFor: 'Calling attention to a new status while preserving the user current task.',
    avoidWhen: 'Avoid it when the update requires action or explanation.',
    durationGuidance: '800-1400ms pulse, one to three repetitions after the event.',
    easingGuidance: 'Ease-out scale with fading opacity for the outer ring.',
    motionRisk: ['distraction', 'accessibility_sensitive'],
    alternatives: ['badge-count-animation', 'toast-notification', 'pulsing-hotspot'],
    decisionNote: 'Use Notification Dot Pulse for ambient newness; use Toast Notification when the user needs to read what happened.',
    promptV0: `Add a small red unread dot to the Alerts nav item. When a new alert arrives, pulse an outer ring twice, then leave the dot static.`,
    promptCursor: `Build a NotificationDotPulse component with an inner static dot and an outer motion span. Animate scale and opacity on event, and include aria-label text for unread state.`,
    promptCSS: `animation: notification-ping 1.1s ease-out 2;`,
    codeTailwind: `export function NotificationDotPulse() {
  return (
    <span className="relative inline-flex h-3 w-3" aria-label="New notification">
      <span className="absolute h-3 w-3 animate-ping rounded-full bg-red-500 opacity-40" />
      <span className="relative h-3 w-3 rounded-full bg-red-500" />
    </span>
  );
}`,
    relatedSlugs: ['badge-count-animation', 'toast-notification', 'pulsing-hotspot']
  },
  {
    id: 109,
    slug: 'loading-ellipsis',
    nameEn: 'Loading Ellipsis',
    aliasesEn: ['typing ellipsis', 'three dot loader', 'generating dots', 'thinking dots'],
    category: 'Status & Confirmation',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'Three small dots that rise, fade, or pulse in sequence to show a short text-like process is still active.',
    whenToUse: [
      'AI reply generation',
      'Chat typing indicators',
      'Small inline operations where a spinner would feel too heavy'
    ],
    whenNotToUse: [
      'Long waits without explanation',
      'Measurable operations such as uploads',
      'Page-level loading where layout context matters'
    ],
    configTips: [
      'Use it inline with a short verb like "Generating" or "Thinking"',
      'Keep the cycle under one second so it feels conversational',
      'Switch to progress or explanatory text if the wait exceeds a few seconds'
    ],
    seenIn: ['ChatGPT', 'iMessage', 'Intercom'],
    pageTypes: ['Chat Interface', 'SaaS App', 'Mobile App'],
    useCases: ['Data Loading', 'Content Refresh'],
    bestFor: 'Short conversational waits where the system is composing or preparing a response.',
    avoidWhen: 'Avoid it for data loads where the user needs structure or completion progress.',
    durationGuidance: '600-900ms loop; pair with fallback text for waits longer than 3 seconds.',
    easingGuidance: 'Use ease-in-out for dot y movement and opacity.',
    motionRisk: ['feels_slow', 'accessibility_sensitive'],
    alternatives: ['typing-dots', 'spinner', 'indeterminate-progress-bar'],
    decisionNote: 'Use Loading Ellipsis for inline conversational work; use Spinner for generic short operations.',
    promptV0: `Create an inline "Generating reply" indicator with three animated dots that bounce in sequence beside the label.`,
    promptCursor: `Build a LoadingEllipsis component that maps three dots with staggered y and opacity animation. Add role="status" and a screen-reader label.`,
    promptCSS: `animation: dot-bounce .7s ease-in-out infinite; animation-delay: calc(var(--index) * 120ms);`,
    codeTailwind: `export function LoadingEllipsis() {
  return (
    <span role="status" aria-label="Generating reply" className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 text-sm text-stone-600">
      <span>Generating reply</span>
      <span className="inline-flex gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-500 [animation-duration:700ms]" style={{ animationDelay: \`\${i * 120}ms\` }} />
        ))}
      </span>
    </span>
  );
}`,
    relatedSlugs: ['typing-dots', 'spinner', 'indeterminate-progress-bar']
  },
  {
    id: 110,
    slug: 'scroll-progress-bar',
    nameEn: 'Scroll Progress Bar',
    aliasesEn: ['reading progress bar', 'page progress indicator', 'scroll depth bar', 'article progress'],
    category: 'Scroll & Navigation',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A thin bar that fills as the user scrolls through a page, showing current reading or completion depth.',
    whenToUse: [
      'Long articles or documentation pages',
      'Step-by-step guides where users need completion feedback',
      'Single-page case studies or landing sections'
    ],
    whenNotToUse: [
      'Short pages where progress is obvious',
      'Apps with many nested scroll containers',
      'Dashboards where scrolling is not the primary task'
    ],
    configTips: [
      'Bind progress to the main document scroll, not every small panel',
      'Keep the bar thin and fixed near the top of the viewport',
      'Do not use fake progress; compute it from scroll distance'
    ],
    seenIn: ['Medium', 'Notion Docs', 'Stripe Docs'],
    pageTypes: ['Blog', 'Documentation', 'Landing Page', 'Portfolio'],
    useCases: ['Content Reveal', 'List Population'],
    bestFor: 'Helping users understand their position in long reading or guide pages.',
    avoidWhen: 'Avoid it when the page has several independent scroll areas or progress would be ambiguous.',
    durationGuidance: 'Progress should track scroll immediately; use only a tiny smoothing transition under 100ms.',
    easingGuidance: 'Linear mapping from scroll position to width; avoid springy lag.',
    motionRisk: ['misleading_progress', 'accessibility_sensitive'],
    alternatives: ['sticky-heading', 'tracing-beam-progress', 'progress-bar'],
    decisionNote: 'Use Scroll Progress Bar for reading depth; use Progress Bar for task completion.',
    promptV0: `Add a thin fixed reading progress bar at the top of a documentation page that fills based on how far the user has scrolled.`,
    promptCursor: `Build a ScrollProgressBar component that listens to document scroll, computes scrollTop / (scrollHeight - innerHeight), and sets transform scaleX. Clean up the listener and support reduced motion.`,
    promptCSS: `transform-origin: left; transform: scaleX(var(--scroll-progress)); transition: transform 80ms linear;`,
    codeTailwind: `export function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-stone-200">
      <div className="h-full origin-left bg-amber-400" style={{ transform: \`scaleX(\${progress})\` }} />
    </div>
  );
}`,
    relatedSlugs: ['sticky-heading', 'tracing-beam-progress', 'progress-bar']
  },
  {
    id: 111,
    slug: 'click-spark-feedback',
    nameEn: 'Click Spark Feedback',
    aliasesEn: ['click spark', 'tap burst', 'particle click feedback', 'spark burst'],
    category: 'Action Feedback',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A short burst of tiny particles or rays emitted from the click point to make a lightweight action feel tactile.',
    whenToUse: ['Playful primary actions', 'Gamified completion moments', 'Canvas or creative tools where click location matters'],
    whenNotToUse: ['Serious financial or destructive actions', 'High-frequency controls that users click repeatedly', 'Dense enterprise screens where sparks add noise'],
    configTips: ['Emit from the pointer position rather than the button center when possible', 'Keep the burst under 600ms', 'Use one color from the brand palette instead of random confetti colors'],
    seenIn: ['Creative coding tools', 'Game dashboards', 'Gamified onboarding'],
    pageTypes: ['Landing Page', 'Portfolio', 'Mobile App', 'SaaS App'],
    useCases: ['Form Submission', 'Content Reveal'],
    bestFor: 'Adding a small celebratory response to a successful click without showing a full toast or success screen.',
    avoidWhen: 'Avoid it when the action requires calm trust or when the user may click many times in a row.',
    durationGuidance: '300-600ms, no loop. The burst should be gone before the user starts the next action.',
    easingGuidance: 'Ease-out for particle travel and opacity fade.',
    motionRisk: ['distraction', 'overdesigned', 'accessibility_sensitive'],
    alternatives: ['ripple-effect', 'scale-on-press', 'confetti-burst'],
    decisionNote: 'Use Click Spark Feedback when the click itself deserves a tiny reward; use Ripple Effect for quieter material feedback.',
    promptV0: `Add a small click spark burst to a playful Save button. On click, emit 6-10 short amber rays from the click point and fade them out within half a second.`,
    promptCursor: `Build a ClickSparkFeedback component that records pointer coordinates on click, renders short absolutely positioned spark spans, animates them outward with opacity fade, and removes them after 600ms. Respect prefers-reduced-motion by skipping particles.`,
    promptCSS: `animation: click-spark .45s ease-out forwards;`,
    codeTailwind: `'use client';
import { useState } from 'react';

export function ClickSparkFeedback() {
  const [sparks, setSparks] = useState<number[]>([]);

  function handleClick() {
    const createdAt = Date.now();
    setSparks((items) => [...items, createdAt]);
    window.setTimeout(() => setSparks((items) => items.filter((id) => id !== createdAt)), 600);
  }

  return (
    <button onClick={handleClick} className="relative overflow-visible rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white">
      Save
      {sparks.map((id) => (
        <span key={id} className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-amber-400" />
      ))}
    </button>
  );
}`,
    relatedSlugs: ['ripple-effect', 'scale-on-press', 'confetti-burst']
  },
  {
    id: 112,
    slug: 'target-cursor-lock',
    nameEn: 'Target Cursor Lock',
    aliasesEn: ['target cursor', 'cursor lock corners', 'focus target cursor', 'crosshair target'],
    category: 'Action Feedback',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A custom cursor frame that snaps or eases around interactive targets, making selectable elements feel physically acquired.',
    whenToUse: ['Game-like menus', 'Creative portfolios', 'Spatial interfaces where hover targeting is part of the experience'],
    whenNotToUse: ['Standard forms and dashboards', 'Touch-first interfaces', 'Any UI where replacing the cursor hurts usability'],
    configTips: ['Keep the native pointer semantics intact', 'Only lock onto large targets with clear hover states', 'Disable for coarse pointers and reduced motion'],
    seenIn: ['Game launchers', 'Interactive portfolios', 'Spatial menus'],
    pageTypes: ['Portfolio', 'Landing Page', 'SaaS App'],
    useCases: ['Content Reveal'],
    bestFor: 'Making a small set of large interactive targets feel precise and game-like.',
    avoidWhen: 'Avoid it for productivity interfaces where a custom cursor slows users down.',
    durationGuidance: '150-300ms lock movement; the frame should feel attached, not laggy.',
    easingGuidance: 'Use a spring or fast ease-out with mild damping.',
    motionRisk: ['distraction', 'accessibility_sensitive', 'performance_sensitive'],
    alternatives: ['hover-lift-effect', 'focus-ring-highlight', 'magnetic-button'],
    decisionNote: 'Use Target Cursor Lock for experiential hover targeting; use Focus Ring Highlight for normal product guidance.',
    promptV0: `Create a target cursor frame that eases around large menu cards on hover, using four corner brackets and disabling the effect on touch devices.`,
    promptCursor: `Build a TargetCursorLock component that tracks hovered target bounds, animates a fixed overlay frame to those bounds, and hides under prefers-reduced-motion or pointer: coarse.`,
    promptCSS: `transition: transform .22s cubic-bezier(.16,1,.3,1), width .22s, height .22s;`,
    codeTailwind: `'use client';
import { useState } from 'react';

export function TargetCursorFrame() {
  const [active, setActive] = useState(0);
  const items = ['Docs', 'Billing', 'Team'];

  return (
    <div className="relative inline-flex gap-3 rounded-2xl border border-stone-200 bg-white p-3">
      <div className="pointer-events-none absolute top-3 h-12 w-24 rounded-xl border-2 border-amber-400 transition-transform duration-200 ease-out" style={{ transform: \`translateX(\${active * 108}px)\` }} />
      {items.map((item, index) => (
        <button key={item} onMouseEnter={() => setActive(index)} className="relative h-12 w-24 rounded-xl bg-stone-50 text-sm font-medium text-stone-700">
          {item}
        </button>
      ))}
    </div>
  );
}`,
    relatedSlugs: ['focus-ring-highlight', 'hover-lift-effect', 'magnetic-button']
  },
  {
    id: 113,
    slug: 'pixel-dissolve-transition',
    nameEn: 'Pixel Dissolve Transition',
    aliasesEn: ['pixel transition', 'pixel reveal', 'block dissolve', 'mosaic transition'],
    category: 'Page & View Transitions',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A grid of pixel blocks dissolves or expands to reveal new content, giving a digital transition a chunky, retro feel.',
    whenToUse: ['Portfolio project reveals', 'Game-like UI transitions', 'Image or card hover reveals where style is part of the brand'],
    whenNotToUse: ['Routine app navigation', 'Forms or settings pages', 'Content that users need to read immediately'],
    configTips: ['Keep the grid small enough to avoid expensive DOM work', 'Stagger by row or distance from pointer', 'Use it for one featured transition, not every page change'],
    seenIn: ['Game menus', 'Creative portfolios', 'Interactive case studies'],
    pageTypes: ['Portfolio', 'Landing Page', 'Blog'],
    useCases: ['Content Reveal'],
    bestFor: 'Stylized content reveals where a hard cut would feel too plain and brand personality matters.',
    avoidWhen: 'Avoid it for high-frequency navigation or productivity workflows.',
    durationGuidance: '400-800ms depending on grid size; keep hover previews closer to 400ms.',
    easingGuidance: 'Use ease-out on each pixel and short staggered delays.',
    motionRisk: ['overdesigned', 'performance_sensitive', 'accessibility_sensitive'],
    alternatives: ['fade-transition', 'liquid-wave-transition', 'shared-element-transition'],
    decisionNote: 'Use Pixel Dissolve Transition for stylized reveals; use Fade Transition for standard product navigation.',
    promptV0: `Create a card hover transition where a grid of square pixels dissolves outward to reveal the image underneath.`,
    promptCursor: `Build a PixelDissolveTransition component that overlays a CSS grid of square cells over content. On reveal, stagger opacity/scale of each cell and skip the grid animation for reduced motion.`,
    promptCSS: `animation: pixel-out .45s ease-out both; animation-delay: calc(var(--index) * 24ms);`,
    codeTailwind: `export function PixelDissolveTransition({ revealed = false }: { revealed?: boolean }) {
  return (
    <div className="relative h-40 overflow-hidden rounded-2xl bg-stone-950">
      <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-white">Project preview</div>
      <div className="absolute inset-0 grid grid-cols-8">
        {Array.from({ length: 32 }, (_, index) => (
          <span key={index} className={\`bg-amber-400 transition duration-500 ease-out \${revealed ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}\`} style={{ transitionDelay: \`\${(index % 8) * 30 + Math.floor(index / 8) * 45}ms\` }} />
        ))}
      </div>
    </div>
  );
}`,
    relatedSlugs: ['fade-transition', 'liquid-wave-transition', 'shared-element-transition']
  },
  {
    id: 114,
    slug: 'logo-loop-marquee',
    nameEn: 'Logo Loop Marquee',
    aliasesEn: ['logo loop', 'brand marquee', 'infinite logo strip', 'partner logo carousel'],
    category: 'Data & Content Visualization',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A seamless horizontal loop of logos or small items that communicates breadth without asking users to interact.',
    whenToUse: ['Partner logo strips', 'Integration lists', 'Technology stack showcases'],
    whenNotToUse: ['Critical navigation', 'Long text content', 'Pages where constant motion competes with reading'],
    configTips: ['Duplicate the item set to create a seamless loop', 'Pause on hover when items are clickable', 'Keep opacity low if the marquee is secondary proof'],
    seenIn: ['Vercel', 'Linear', 'Integration marketplaces'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Content Reveal', 'List Population'],
    bestFor: 'Showing many small recognizable items without creating a heavy grid.',
    avoidWhen: 'Avoid it when users need to inspect each logo or read labels carefully.',
    durationGuidance: 'Slow continuous loop, usually 18-40s for a full cycle depending on item count.',
    easingGuidance: 'Linear only; eased marquee loops visibly stutter.',
    motionRisk: ['distraction', 'accessibility_sensitive'],
    alternatives: ['horizontal-scroll-gallery', 'stagger-list-reveal', 'scroll-progress-bar'],
    decisionNote: 'Use Logo Loop Marquee for ambient social proof; use a static grid when inspection matters.',
    promptV0: `Create a seamless partner logo marquee that scrolls slowly from right to left, duplicates the logo set for a continuous loop, and pauses on hover.`,
    promptCursor: `Build a LogoLoopMarquee component with duplicated item arrays and a linear CSS transform animation. Add motion-reduce fallback to show a static wrapping grid.`,
    promptCSS: `animation: marquee 28s linear infinite;`,
    codeTailwind: `export function LogoLoopMarquee() {
  const logos = ['Slack', 'GitHub', 'Figma', 'Notion'];

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white py-5">
      <div className="flex w-max animate-[marquee_22s_linear_infinite] gap-4 px-4 motion-reduce:animate-none">
        {[...logos, ...logos].map((logo, index) => (
          <span key={\`\${logo}-\${index}\`} className="flex h-12 w-28 items-center justify-center rounded-xl border border-stone-200 bg-stone-50 text-sm font-semibold text-stone-500">
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}`,
    relatedSlugs: ['horizontal-scroll-gallery', 'stagger-list-reveal', 'scroll-reveal']
  },
  {
    id: 115,
    slug: 'gooey-nav-indicator',
    nameEn: 'Gooey Nav Indicator',
    aliasesEn: ['gooey nav', 'blob nav indicator', 'liquid active nav', 'gooey menu highlight'],
    category: 'Scroll & Navigation',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A soft blob-like active indicator that morphs between navigation items, making the selected route feel continuous and playful.',
    whenToUse: ['Small tab bars', 'Playful landing navigation', 'Segmented navigation with short labels'],
    whenNotToUse: ['Long sidebars', 'Enterprise navigation with many destinations', 'Multi-select filters'],
    configTips: ['Use it for three to five items only', 'Keep the active state readable without relying on blend modes', 'Avoid excessive blob stretching that makes the selected item ambiguous'],
    seenIn: ['Creative portfolios', 'Campaign microsites', 'Experimental nav bars'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Content Reveal', 'Search Results'],
    bestFor: 'A playful nav where the active selection should feel like one continuous moving object.',
    avoidWhen: 'Avoid it when navigation clarity matters more than personality.',
    durationGuidance: '180-360ms; route changes should still feel immediate.',
    easingGuidance: 'Use a spring or ease-out with slight shape morphing.',
    motionRisk: ['overdesigned', 'accessibility_sensitive'],
    alternatives: ['active-pill-slide', 'tab-underline-slide', 'dock-proximity-scale'],
    decisionNote: 'Use Gooey Nav Indicator when nav personality matters; use Active Pill Slide for cleaner product UI.',
    promptV0: `Create a three-item nav where a dark rounded blob slides and subtly morphs under the active item when clicked.`,
    promptCursor: `Build a GooeyNavIndicator component with a single animated active background. Animate x, width, and borderRadius; keep labels accessible and readable without mix-blend reliance.`,
    promptCSS: `transition: transform .28s cubic-bezier(.16,1,.3,1), border-radius .28s ease-out;`,
    codeTailwind: `'use client';
import { useState } from 'react';

export function GooeyNavIndicator() {
  const [active, setActive] = useState(0);
  const items = ['Home', 'Work', 'About'];

  return (
    <nav className="relative flex rounded-full bg-stone-100 p-1">
      <span className="absolute bottom-1 top-1 w-24 rounded-full bg-stone-950 transition-[transform,border-radius] duration-300 ease-out" style={{ transform: \`translateX(\${active * 96}px)\`, borderRadius: active === 1 ? 18 : 999 }} />
      {items.map((item, index) => (
        <button key={item} onClick={() => setActive(index)} className={\`relative z-10 h-10 w-24 text-sm font-medium transition-colors \${active === index ? 'text-white' : 'text-stone-600'}\`}>
          {item}
        </button>
      ))}
    </nav>
  );
}`,
    relatedSlugs: ['active-pill-slide', 'tab-underline-slide', 'magnetic-button']
  },
  {
    id: 116,
    slug: 'dock-proximity-scale',
    nameEn: 'Dock Proximity Scale',
    aliasesEn: ['mac dock scale', 'proximity dock', 'magnifying dock', 'icon dock hover'],
    category: 'Scroll & Navigation',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A row of icons scales based on pointer proximity, creating a magnifying dock effect for compact navigation.',
    whenToUse: ['Creative toolbars', 'Launcher-style navigation', 'Small icon sets where pointer exploration is expected'],
    whenNotToUse: ['Touch-first navigation', 'Dense admin sidebars', 'Critical controls that must keep stable hit targets'],
    configTips: ['Keep hit areas stable even as icons scale visually', 'Limit the number of dock items', 'Disable proximity scaling for coarse pointers'],
    seenIn: ['macOS Dock', 'Creative tools', 'Launcher interfaces'],
    pageTypes: ['Portfolio', 'SaaS App', 'Dashboard'],
    useCases: ['Content Reveal'],
    bestFor: 'Compact icon navigation where hover exploration is part of the interface character.',
    avoidWhen: 'Avoid it when users need precise stable targets or when the UI is primarily touch-driven.',
    durationGuidance: '100-220ms response to pointer movement; no delayed animation.',
    easingGuidance: 'Use spring-like response with damping, or direct distance mapping with light smoothing.',
    motionRisk: ['distraction', 'accessibility_sensitive'],
    alternatives: ['scale-on-press', 'magnetic-button', 'gooey-nav-indicator'],
    decisionNote: 'Use Dock Proximity Scale for compact icon launchers; use Scale on Press for ordinary button feedback.',
    promptV0: `Create a macOS-style icon dock where nearby icons grow as the cursor approaches, while the clickable hit area stays stable.`,
    promptCursor: `Build a DockProximityScale component that maps pointer x distance to icon scale with a max scale around 1.7. Keep buttons accessible and disable scaling on coarse pointers.`,
    promptCSS: `transform: scale(var(--dock-scale)); transition: transform .16s ease-out;`,
    codeTailwind: `'use client';
import { useState } from 'react';

export function DockProximityScale() {
  const [active, setActive] = useState<number | null>(null);
  const items = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="flex h-20 items-end gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4 pb-4" onMouseLeave={() => setActive(null)}>
      {items.map((item, index) => {
        const distance = active === null ? 3 : Math.abs(active - index);
        const scale = distance === 0 ? 1.55 : distance === 1 ? 1.25 : 1;
        return (
          <button key={item} onMouseEnter={() => setActive(index)} className="h-10 w-10 rounded-xl bg-stone-950 text-xs font-semibold text-white transition-transform duration-150 ease-out" style={{ transform: \`scale(\${scale}) translateY(\${scale > 1 ? -6 : 0}px)\` }}>
            {item}
          </button>
        );
      })}
    </div>
  );
}`,
    relatedSlugs: ['scale-on-press', 'magnetic-button', 'gooey-nav-indicator']
  },
  {
    id: 117,
    slug: 'elastic-slider-handle',
    nameEn: 'Elastic Slider Handle',
    aliasesEn: ['elastic slider', 'spring slider handle', 'stretchy slider', 'snapping range input'],
    category: 'Action Feedback',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'A slider handle that stretches or springs as the value changes, making range input feel responsive without hiding the exact value.',
    whenToUse: ['Volume and brightness controls', 'Pricing or quantity sliders', 'Creative tool controls where drag feedback matters'],
    whenNotToUse: ['Precise scientific or financial inputs', 'Dense forms with many sliders', 'Controls where handle motion would obscure the value'],
    configTips: ['Keep the hit target stable even if the visible handle stretches', 'Show the numeric value near the control', 'Disable spring exaggeration for keyboard changes'],
    seenIn: ['iOS controls', 'Creative editors', 'Audio settings panels'],
    pageTypes: ['SaaS App', 'Dashboard', 'Mobile App', 'Form/Survey'],
    useCases: ['Form Submission', 'Content Refresh'],
    bestFor: 'Giving range controls tactile drag feedback while preserving a readable value.',
    avoidWhen: 'Avoid it when users need exact numeric precision more than tactile feedback.',
    durationGuidance: '100-220ms response to value changes; long spring tails make the value feel imprecise.',
    easingGuidance: 'Use a damped spring or fast ease-out, never a bouncy loop.',
    motionRisk: ['misleading_progress', 'accessibility_sensitive'],
    alternatives: ['progress-bar', 'scale-on-press', 'password-strength-gauge'],
    decisionNote: 'Use Elastic Slider Handle when drag feedback helps control confidence; use a plain input when precision matters more.',
    promptV0: `Create a range slider where the handle subtly stretches while dragging and snaps back when released. Keep the value label visible and stable.`,
    promptCursor: `Build an ElasticSliderHandle component with a stable range input hit area and a visual handle that scales on drag. Use a damped spring, keep aria-valuenow accurate, and disable exaggerated motion for reduced motion.`,
    promptCSS: `transform: translateX(var(--value)) scaleX(var(--drag-scale)); transition: transform .16s ease-out;`,
    codeTailwind: `export function ElasticSliderHandle({ value }: { value: number }) {
  return (
    <div className="relative h-3 rounded-full bg-stone-200">
      <div className="absolute h-full rounded-full bg-amber-400" style={{ width: \`\${value}%\` }} />
      <div className="absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-stone-950" style={{ left: \`\${value}%\` }} />
    </div>
  );
}`,
    relatedSlugs: ['progress-bar', 'scale-on-press', 'password-strength-gauge']
  },
  {
    id: 118,
    slug: 'bubble-menu-expand',
    nameEn: 'Bubble Menu Expand',
    aliasesEn: ['floating action menu', 'radial bubble menu', 'speed dial menu', 'fab expand'],
    category: 'Page & View Transitions',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'A compact primary action expands into several nearby circular options, revealing secondary actions without navigating away.',
    whenToUse: ['Floating action buttons with a few related actions', 'Mobile toolbars with limited space', 'Creation menus such as Post / Upload / Scan'],
    whenNotToUse: ['Menus with many items or long labels', 'Critical actions that need explanation', 'Desktop layouts where a normal toolbar is clearer'],
    configTips: ['Limit to three to five actions', 'Preserve keyboard order and focus management', 'Use labels or tooltips when icons are not universally understood'],
    seenIn: ['Material speed dial', 'Mobile creation menus', 'Creative editing tools'],
    pageTypes: ['Mobile App', 'SaaS App', 'Dashboard'],
    useCases: ['Content Reveal', 'Form Submission'],
    bestFor: 'Revealing a small set of related actions from a compact trigger.',
    avoidWhen: 'Avoid it when hidden actions are primary or when users need to compare many options.',
    durationGuidance: '180-350ms with a short stagger; the menu should feel immediate.',
    easingGuidance: 'Use ease-out or a lightly damped spring for each bubble.',
    motionRisk: ['overdesigned', 'accessibility_sensitive'],
    alternatives: ['drawer-sidebar-slide', 'staggered-menu-open', 'popover-coach-step'],
    decisionNote: 'Use Bubble Menu Expand for compact secondary actions; use Drawer Slide when the menu needs labels and structure.',
    promptV0: `Create a floating action button that expands into three circular action buttons above it, with a short stagger and labels for accessibility.`,
    promptCursor: `Build a BubbleMenuExpand component with an open state. Animate option buttons from the trigger position to their final positions, manage focus when opening, and close on Escape/outside click.`,
    promptCSS: `transform: translate(var(--x), var(--y)) scale(1); transition: transform .24s cubic-bezier(.16,1,.3,1), opacity .18s;`,
    codeTailwind: `export function BubbleMenuExpand({ open }: { open: boolean }) {
  const actions = ['Scan', 'Upload', 'Note'];

  return (
    <div className="relative inline-flex">
      <div className="absolute bottom-full left-1/2 mb-3 flex -translate-x-1/2 gap-2">
        {actions.map((action, index) => (
          <button key={action} className={\`h-12 w-12 rounded-full border border-stone-200 bg-white text-[10px] font-semibold text-stone-700 shadow-sm transition duration-200 \${open ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-75 opacity-0'}\`} style={{ transitionDelay: \`\${index * 45}ms\` }}>
            {action}
          </button>
        ))}
      </div>
      <button aria-expanded={open} className="h-14 w-14 rounded-full bg-stone-950 text-xl font-semibold text-white shadow-lg">
        +
      </button>
    </div>
  );
}`,
    relatedSlugs: ['drawer-sidebar-slide', 'staggered-menu-open', 'tooltip-fade-nudge']
  },
  {
    id: 119,
    slug: 'card-nav-expand',
    nameEn: 'Card Nav Expand',
    aliasesEn: ['card navigation panel', 'expandable nav cards', 'mega menu cards', 'nav card reveal'],
    category: 'Scroll & Navigation',
    difficulty: 'needs_tweaking',
    mediaTier: 1,
    description: 'A navigation item expands into card-like panels that expose nested destinations with more context than a plain dropdown.',
    whenToUse: ['Product nav with grouped destinations', 'Documentation or SaaS headers with feature families', 'Navigation where each destination benefits from a short description'],
    whenNotToUse: ['Simple sites with only a few links', 'Mobile-only navigation without room for panels', 'Menus that must open instantly under heavy use'],
    configTips: ['Keep panels aligned to the trigger so the source is obvious', 'Animate height/opacity but avoid layout jump in the header', 'Ensure hover and keyboard activation behave consistently'],
    seenIn: ['Stripe', 'Vercel', 'Documentation hubs'],
    pageTypes: ['Landing Page', 'SaaS App', 'Documentation'],
    useCases: ['Content Reveal', 'Search Results'],
    bestFor: 'Helping users choose among nested navigation options with short contextual cards.',
    avoidWhen: 'Avoid it when the nav is simple enough for direct links.',
    durationGuidance: '220-380ms for panel reveal; individual cards can stagger by 40-70ms.',
    easingGuidance: 'Use ease-out for panel height and a subtle stagger for card opacity/y.',
    motionRisk: ['feels_slow', 'accessibility_sensitive'],
    alternatives: ['staggered-menu-open', 'accordion-expand', 'drawer-sidebar-slide'],
    decisionNote: 'Use Card Nav Expand when navigation needs context; use Staggered Menu Open for a simpler menu list.',
    promptV0: `Create a header nav item that expands into three destination cards with titles and short descriptions. Animate the panel height and stagger the cards in.`,
    promptCursor: `Build a CardNavExpand component with keyboard-accessible disclosure behavior. Animate panel height/opacity and card y/opacity, keep focus trapped only if it behaves like a menu.`,
    promptCSS: `max-height: var(--open-height); opacity: 1; transition: max-height .28s ease-out, opacity .2s ease-out;`,
    codeTailwind: `export function CardNavExpand({ open }: { open: boolean }) {
  const links = [
    ['Analytics', 'Track conversion and product usage'],
    ['Automations', 'Trigger workflows from events'],
    ['Integrations', 'Connect your existing stack'],
  ];

  return (
    <div className="relative inline-block">
      <button aria-expanded={open} className="rounded-full px-4 py-2 text-sm font-medium text-stone-800">Product</button>
      {open && (
        <div className="absolute left-0 top-full mt-3 grid w-80 gap-3 rounded-2xl border border-stone-200 bg-white p-3 shadow-xl">
          {links.map(([title, body]) => (
            <a key={title} href="#" className="rounded-xl border border-stone-200 bg-stone-50 p-3 transition hover:-translate-y-0.5 hover:bg-white">
              <span className="block text-sm font-semibold text-stone-900">{title}</span>
              <span className="mt-1 block text-xs leading-relaxed text-stone-500">{body}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}`,
    relatedSlugs: ['staggered-menu-open', 'accordion-expand', 'drawer-sidebar-slide']
  },
  {
    id: 120,
    slug: 'folder-open-reveal',
    nameEn: 'Folder Open Reveal',
    aliasesEn: ['folder reveal', 'file folder open', 'nested content reveal', 'folder peel open'],
    category: 'Page & View Transitions',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A folder-like container opens to reveal nested content, using a familiar file metaphor to communicate grouping and disclosure.',
    whenToUse: ['File managers and document collections', 'Project cards that reveal contained assets', 'Educational or onboarding interfaces that introduce grouped resources'],
    whenNotToUse: ['Generic cards with no folder metaphor', 'Content that should be visible immediately', 'Serious enterprise pages where the metaphor feels childish'],
    configTips: ['Use the folder metaphor only when grouping is real', 'Keep the opened content readable, not hidden behind the flap', 'Pair the motion with a clear expanded state'],
    seenIn: ['macOS Finder metaphors', 'Document apps', 'Project dashboards'],
    pageTypes: ['Dashboard', 'SaaS App', 'Documentation', 'Portfolio'],
    useCases: ['Content Reveal', 'List Population'],
    bestFor: 'Revealing grouped nested content through a familiar storage metaphor.',
    avoidWhen: 'Avoid it when the content is not actually grouped or when the metaphor would slow comprehension.',
    durationGuidance: '250-450ms for flap and content reveal together.',
    easingGuidance: 'Use ease-out with a slight 3D rotation for the flap; avoid elastic wobble.',
    motionRisk: ['overdesigned', 'accessibility_sensitive'],
    alternatives: ['accordion-expand', 'popover-coach-step', 'pixel-dissolve-transition'],
    decisionNote: 'Use Folder Open Reveal when the folder metaphor clarifies grouping; use Accordion Expand for ordinary disclosure.',
    promptV0: `Create a project folder card that opens on click to reveal two documents inside. Use a subtle folder flap rotation and slide the documents upward.`,
    promptCursor: `Build a FolderOpenReveal component with an expanded state. Animate the folder front flap with rotateX and reveal children with y/opacity. Preserve semantic button disclosure attributes.`,
    promptCSS: `transform: rotateX(-24deg); transform-origin: bottom; transition: transform .32s ease-out;`,
    codeTailwind: `export function FolderOpenReveal({ open }: { open: boolean }) {
  return (
    <button aria-expanded={open} className="relative h-36 w-56 rounded-2xl text-left">
      <span className="absolute left-5 top-1 h-8 w-24 rounded-t-xl bg-amber-300" />
      <span className="absolute inset-x-0 bottom-0 h-28 rounded-2xl bg-amber-400 shadow-lg" />
      <span className={\`absolute bottom-4 left-5 right-5 rounded-xl bg-white p-3 text-sm font-medium text-stone-800 shadow transition duration-300 \${open ? '-translate-y-8 opacity-100' : 'translate-y-2 opacity-60'}\`}>
        Q2 Research
      </span>
      <span className={\`absolute inset-x-0 bottom-0 h-28 origin-bottom rounded-2xl bg-amber-500 transition-transform duration-300 \${open ? '[transform:perspective(800px)_rotateX(-24deg)]' : ''}\`} />
    </button>
  );
}`,
    relatedSlugs: ['accordion-expand', 'staggered-menu-open', 'pixel-dissolve-transition']
  },
  {
    id: 121,
    slug: 'scroll-stack-cards',
    nameEn: 'Scroll Stack Cards',
    aliasesEn: ['scroll stack', 'stacked cards scroll', 'scroll narrative cards', 'overlapping card stack'],
    category: 'Scroll & Navigation',
    difficulty: 'needs_tweaking',
    mediaTier: 2,
    description: 'A stack of overlapping cards separates or advances as the user scrolls, turning ordered content into a spatial sequence.',
    whenToUse: ['Step-by-step explainers', 'Case study sections', 'Feature walkthroughs with a clear order'],
    whenNotToUse: ['Unordered card grids', 'Dense reading pages', 'Lists where users need to scan many items quickly'],
    configTips: ['Use it for short sequences only', 'Keep scroll progress predictable and reversible', 'Provide a reduced-motion layout that shows all cards normally'],
    seenIn: ['Apple product pages', 'Interactive case studies', 'Product walkthroughs'],
    pageTypes: ['Landing Page', 'Portfolio', 'Documentation'],
    useCases: ['Content Reveal', 'List Population'],
    bestFor: 'Helping users understand ordered content as a sequence while scrolling.',
    avoidWhen: 'Avoid it for large collections or pages where scrolling should remain purely functional.',
    durationGuidance: 'Tie movement to scroll position; avoid long independent animations.',
    easingGuidance: 'Use scroll-linked linear mapping or very light smoothing.',
    motionRisk: ['performance_sensitive', 'accessibility_sensitive', 'feels_slow'],
    alternatives: ['timeline-reveal', 'stagger-list-reveal', 'scroll-progress-bar'],
    decisionNote: 'Use Scroll Stack Cards for short ordered narratives; use Stagger List Reveal for ordinary lists.',
    promptV0: `Create a section of three stacked cards that separate as the user scrolls, explaining Discover, Compare, and Choose in sequence.`,
    promptCursor: `Build a ScrollStackCards section using scroll progress to map each card y/scale. Keep DOM order semantic and provide a reduced-motion fallback that renders cards as a normal vertical list.`,
    promptCSS: `transform: translateY(calc(var(--scroll-progress) * 40px)) scale(var(--card-scale));`,
    codeTailwind: `export function ScrollStackCards({ progress = 0.6 }: { progress?: number }) {
  const cards = ['Discover', 'Compare', 'Choose'];

  return (
    <section className="relative h-72 rounded-2xl border border-stone-200 bg-stone-50 p-6">
      {cards.map((card, index) => (
        <article key={card} className="absolute left-6 right-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-transform duration-300" style={{ transform: \`translateY(\${index * 28 + progress * index * 20}px) scale(\${1 - index * 0.04})\`, zIndex: cards.length - index }}>
          <p className="font-mono text-xs text-stone-400">0{index + 1}</p>
          <h3 className="mt-2 text-lg font-semibold text-stone-900">{card}</h3>
        </article>
      ))}
    </section>
  );
}`,
    relatedSlugs: ['timeline-reveal', 'stagger-list-reveal', 'scroll-progress-bar']
  },
  {
    id: 122,
    slug: 'staggered-menu-open',
    nameEn: 'Staggered Menu Open',
    aliasesEn: ['staggered menu', 'menu item reveal', 'sequential nav open', 'animated menu list'],
    category: 'Page & View Transitions',
    difficulty: 'paste_go',
    mediaTier: 1,
    description: 'A menu opens by revealing its items one after another, making the list structure readable without feeling like a sudden block of links.',
    whenToUse: ['Mobile nav menus', 'Command groups with a short list', 'Settings menus where item grouping matters'],
    whenNotToUse: ['Very long menus', 'Menus opened dozens of times per session', 'Critical actions where delay hurts task speed'],
    configTips: ['Keep the stagger under 70ms per item', 'Do not stagger more than six to eight visible items', 'Ensure keyboard focus can move immediately after open'],
    seenIn: ['Mobile app menus', 'Command palettes', 'Settings panels'],
    pageTypes: ['Mobile App', 'SaaS App', 'Dashboard', 'Admin Panel'],
    useCases: ['Content Reveal', 'Search Results'],
    bestFor: 'Making a compact menu feel structured and readable as it opens.',
    avoidWhen: 'Avoid it for long or frequently used menus where speed matters more than reveal.',
    durationGuidance: '180-320ms total for short menus; cap item stagger at 40-70ms.',
    easingGuidance: 'Use fast ease-out y/opacity transitions.',
    motionRisk: ['feels_slow', 'accessibility_sensitive'],
    alternatives: ['drawer-sidebar-slide', 'card-nav-expand', 'accordion-expand'],
    decisionNote: 'Use Staggered Menu Open for short structured menus; use Drawer Slide for larger navigation surfaces.',
    promptV0: `Create a compact menu where four items slide and fade in sequentially when opened. Keep the whole open animation under 300ms.`,
    promptCursor: `Build a StaggeredMenuOpen component with open state and semantic menu items. Animate item opacity/y with short stagger, but keep focus behavior immediate and support reduced motion.`,
    promptCSS: `animation: menu-item-in .22s ease-out both; animation-delay: calc(var(--index) * 50ms);`,
    codeTailwind: `export function StaggeredMenuOpen({ open }: { open: boolean }) {
  const items = ['Dashboard', 'Reports', 'Settings', 'Help'];

  return (
    <nav aria-hidden={!open} className="w-64 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
      {items.map((item, index) => (
        <a key={item} href="#" className={\`block rounded-xl px-4 py-3 text-sm font-medium text-stone-700 transition duration-200 \${open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'}\`} style={{ transitionDelay: \`\${index * 45}ms\` }}>
          {item}
        </a>
      ))}
    </nav>
  );
}`,
    relatedSlugs: ['drawer-sidebar-slide', 'card-nav-expand', 'accordion-expand']
  }
,
  {
    id: 123,
    slug: 'floating-product-object',
    nameEn: 'Floating Product Object',
    aliasesEn: ['3D product hero', 'floating dashboard mockup', 'product object rotation', '3D device showcase'],
    category: 'Creative Motion',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'A 3D or pseudo-3D hero artifact such as a device mockup, dashboard panel, model object, app window, package, or product surface that slowly rotates or drifts. Use it when the product has a recognizable object and the hero needs to make that product tangible.',
    whenToUse: ['Product contexts: SaaS hero, AI tool landing, portfolio case study, launch page, hardware/software showcase.', 'Choose it when the product intent matches 3D Product Showcase rather than generic decoration.', 'Start with a still product artifact; add shallow rotation only if it reinforces materiality.'],
    whenNotToUse: ['Avoid abstract spinning cubes when the product has no object to show. Avoid on dense documentation pages, checkout flows, admin pages, or mobile pages where it delays content.'],
    configTips: ['Technical fit: three.js, React Three Fiber, CSS 3D, or pre-rendered video depending on complexity.', 'Performance: Target 60fps. Keep geometry simple, cap pixel ratio on mobile, lazy-load the scene, and provide a static poster fallback.', 'Accessibility: Do not encode critical product meaning only in rotation. Keep copy and CTA readable.', 'Reduced motion: Static product image or one non-looping fade/scale reveal.'],
    seenIn: ['Motion Guide Creative Motion Pack'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Brand Expression', 'Product Storytelling', 'System Visualization', 'Creative Motion'],
    bestFor: 'SaaS hero, AI tool landing, portfolio case study, launch page, hardware/software showcase.',
    avoidWhen: 'Avoid abstract spinning cubes when the product has no object to show. Avoid on dense documentation pages, checkout flows, admin pages, or mobile pages where it delays content.',
    durationGuidance: 'Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.',
    easingGuidance: 'Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.',
    motionRisk: ['performance_sensitive', 'accessibility_sensitive', 'overdesigned'],
    alternatives: ['interactive-3d-card-stack', 'aurora-shader-background', 'morphing-gradient-blob'],
    decisionNote: 'Start with a still product artifact; add shallow rotation only if it reinforces materiality.',
    promptV0: 'Design a Floating Product Object for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely.',
    promptCursor: 'Design a Floating Product Object for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Include implementation notes for React/Next.js boundaries when relevant.',
    promptCSS: 'Design a Floating Product Object for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Prefer CSS/SVG first; escalate to Canvas, three.js, or WebGL only when the product intent requires it.',
    codeTailwind: `export function MotionDecisionChecklist() {
  const steps = [
    'Confirm product intent',
    'Choose the simplest implementation family',
    'Set performance caps and mobile fallback',
    'Add reduced-motion behavior',
    'Verify accessibility and readable content',
  ];

  return steps;
}`,
    relatedSlugs: ['interactive-3d-card-stack', 'orbital-feature-system', 'tilt-parallax-card'],
  },
  {
    id: 124,
    slug: 'interactive-3d-card-stack',
    nameEn: 'Interactive 3D Card Stack',
    aliasesEn: ['3D card stack', 'depth card stack', 'tilt card gallery', 'spatial card browser'],
    category: 'Creative Motion',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'Layered cards use depth, hover tilt, drag, or scroll movement to show a group of features, templates, examples, or portfolio items. It adds spatial browsing while preserving scannability.',
    whenToUse: ['Product contexts: Portfolio grids, case studies, template galleries, product feature sets, pricing/plan comparison highlights.', 'Choose it when the product intent matches 3D Product Showcase rather than generic decoration.', 'Use depth to clarify grouping, not to hide information.'],
    whenNotToUse: ['Avoid when users need quick comparison across many items, when cards contain dense text, or when hover/tilt makes hit targets unstable.'],
    configTips: ['Technical fit: CSS transforms for light stacks; React Three Fiber only when real depth, lighting, or camera movement is necessary.', 'Performance: Prefer transform and opacity. Limit active cards, avoid expensive shadows or blur, and disable depth effects on low-end devices.', 'Accessibility: Keep keyboard focus order linear. Do not move focused elements away from the pointer or screen-reader order.', 'Reduced motion: Static layered cards with a simple focus outline or instant selected state.'],
    seenIn: ['Motion Guide Creative Motion Pack'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Brand Expression', 'Product Storytelling', 'System Visualization', 'Creative Motion'],
    bestFor: 'Portfolio grids, case studies, template galleries, product feature sets, pricing/plan comparison highlights.',
    avoidWhen: 'Avoid when users need quick comparison across many items, when cards contain dense text, or when hover/tilt makes hit targets unstable.',
    durationGuidance: 'Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.',
    easingGuidance: 'Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.',
    motionRisk: ['performance_sensitive', 'accessibility_sensitive', 'overdesigned'],
    alternatives: ['card-nav-expand', 'hover-lift-effect', 'tilt-parallax-card'],
    decisionNote: 'Use depth to clarify grouping, not to hide information.',
    promptV0: 'Design a Interactive 3D Card Stack for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely.',
    promptCursor: 'Design a Interactive 3D Card Stack for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Include implementation notes for React/Next.js boundaries when relevant.',
    promptCSS: 'Design a Interactive 3D Card Stack for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Prefer CSS/SVG first; escalate to Canvas, three.js, or WebGL only when the product intent requires it.',
    codeTailwind: `export function MotionDecisionChecklist() {
  const steps = [
    'Confirm product intent',
    'Choose the simplest implementation family',
    'Set performance caps and mobile fallback',
    'Add reduced-motion behavior',
    'Verify accessibility and readable content',
  ];

  return steps;
}`,
    relatedSlugs: ['floating-product-object', 'tilt-parallax-card', 'flip-3d-card'],
  },
  {
    id: 125,
    slug: 'orbital-feature-system',
    nameEn: 'Orbital Feature System',
    aliasesEn: ['orbiting feature nodes', 'radial feature system', 'platform orbit', 'ecosystem orbit'],
    category: 'Creative Motion',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'Feature nodes, icons, or modules orbit around a central product concept to suggest platform breadth, ecosystem structure, agent orchestration, or multiple capabilities connected to one core.',
    whenToUse: ['Product contexts: AI platforms, developer tools, automation suites, ecosystem pages, feature overview sections.', 'Choose it when the product intent matches 3D Product Showcase rather than generic decoration.', 'Treat orbit as a storytelling overview, then give users static detail below.'],
    whenNotToUse: ['Avoid when feature labels must be read quickly, when there are more than 6-8 nodes, or when orbiting implies relationships that do not exist.'],
    configTips: ['Technical fit: CSS/SVG for simple orbits; Canvas or three.js for many nodes or depth.', 'Performance: Keep orbit speed slow and constant. Pause offscreen. Avoid many independent timers.', 'Accessibility: Provide a static feature list with the same content. Do not rely on orbit position for meaning.', 'Reduced motion: Static radial layout or grouped feature grid.'],
    seenIn: ['Motion Guide Creative Motion Pack'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Brand Expression', 'Product Storytelling', 'System Visualization', 'Creative Motion'],
    bestFor: 'AI platforms, developer tools, automation suites, ecosystem pages, feature overview sections.',
    avoidWhen: 'Avoid when feature labels must be read quickly, when there are more than 6-8 nodes, or when orbiting implies relationships that do not exist.',
    durationGuidance: 'Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.',
    easingGuidance: 'Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.',
    motionRisk: ['performance_sensitive', 'accessibility_sensitive', 'overdesigned'],
    alternatives: ['animated-knowledge-graph', 'card-nav-expand', 'scroll-stack-cards'],
    decisionNote: 'Treat orbit as a storytelling overview, then give users static detail below.',
    promptV0: 'Design a Orbital Feature System for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely.',
    promptCursor: 'Design a Orbital Feature System for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Include implementation notes for React/Next.js boundaries when relevant.',
    promptCSS: 'Design a Orbital Feature System for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Prefer CSS/SVG first; escalate to Canvas, three.js, or WebGL only when the product intent requires it.',
    codeTailwind: `export function MotionDecisionChecklist() {
  const steps = [
    'Confirm product intent',
    'Choose the simplest implementation family',
    'Set performance caps and mobile fallback',
    'Add reduced-motion behavior',
    'Verify accessibility and readable content',
  ];

  return steps;
}`,
    relatedSlugs: ['floating-product-object', 'particle-network-field', 'animated-knowledge-graph'],
  },
  {
    id: 126,
    slug: 'aurora-shader-background',
    nameEn: 'Aurora Shader Background',
    aliasesEn: ['aurora gradient', 'shader background', 'animated gradient field', 'futuristic gradient background'],
    category: 'Creative Motion',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'A soft animated gradient field creates premium, calm, or futuristic atmosphere behind a hero or brand section. It should support mood while staying behind the content hierarchy.',
    whenToUse: ['Product contexts: AI tools, creative software, premium SaaS, launch pages, brand moments.', 'Choose it when the product intent matches Shader / Atmosphere rather than generic decoration.', 'Use the aurora as a restrained background layer, not the main content.'],
    whenNotToUse: ['Avoid behind long text, dense controls, financial or medical dashboards, or any page where contrast and reading speed matter more than atmosphere.'],
    configTips: ['Technical fit: CSS gradients for simple versions; WebGL fragment shader for high-quality procedural motion.', 'Performance: Keep opacity low, reduce resolution, cap frame rate or pause when hidden, and avoid fullscreen high-frequency noise.', 'Accessibility: Maintain text contrast independently of the shader. Avoid rapid hue shifts and flashing.', 'Reduced motion: Static gradient image or single blurred color field.'],
    seenIn: ['Motion Guide Creative Motion Pack'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Brand Expression', 'Product Storytelling', 'System Visualization', 'Creative Motion'],
    bestFor: 'AI tools, creative software, premium SaaS, launch pages, brand moments.',
    avoidWhen: 'Avoid behind long text, dense controls, financial or medical dashboards, or any page where contrast and reading speed matter more than atmosphere.',
    durationGuidance: 'Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.',
    easingGuidance: 'Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.',
    motionRisk: ['performance_sensitive', 'accessibility_sensitive', 'overdesigned'],
    alternatives: ['morphing-gradient-blob', 'parallax-background', 'floating-product-object'],
    decisionNote: 'Use the aurora as a restrained background layer, not the main content.',
    promptV0: 'Design a Aurora Shader Background for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely.',
    promptCursor: 'Design a Aurora Shader Background for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Include implementation notes for React/Next.js boundaries when relevant.',
    promptCSS: 'Design a Aurora Shader Background for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Prefer CSS/SVG first; escalate to Canvas, three.js, or WebGL only when the product intent requires it.',
    codeTailwind: `export function MotionDecisionChecklist() {
  const steps = [
    'Confirm product intent',
    'Choose the simplest implementation family',
    'Set performance caps and mobile fallback',
    'Add reduced-motion behavior',
    'Verify accessibility and readable content',
  ];

  return steps;
}`,
    relatedSlugs: ['morphing-gradient-blob', 'particle-network-field', 'aurora-background'],
  },
  {
    id: 127,
    slug: 'morphing-gradient-blob',
    nameEn: 'Morphing Gradient Blob',
    aliasesEn: ['gradient blob', 'organic blob accent', 'breathing blob', 'morphing shape'],
    category: 'Creative Motion',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'An organic 2D shape shifts color, scale, or contour to add warmth and identity. It is lighter than a full shader scene and works well as a supporting accent.',
    whenToUse: ['Product contexts: Onboarding, empty states, hero accent, AI thinking atmosphere, educational or creator products.', 'Choose it when the product intent matches Shader / Atmosphere rather than generic decoration.', 'Use slow breathing motion; do not let the blob cross text or controls.'],
    whenNotToUse: ['Avoid when blob movement competes with form fields, charts, code blocks, or primary CTA reading.'],
    configTips: ['Technical fit: CSS border-radius animation, SVG filters, Canvas, or lightweight shader.', 'Performance: Prefer CSS transform/filter limits; avoid large animated blurs on low-end devices.', 'Accessibility: Keep it decorative and hidden from assistive tech if it carries no content.', 'Reduced motion: Static blob or fixed gradient accent.'],
    seenIn: ['Motion Guide Creative Motion Pack'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Brand Expression', 'Product Storytelling', 'System Visualization', 'Creative Motion'],
    bestFor: 'Onboarding, empty states, hero accent, AI thinking atmosphere, educational or creator products.',
    avoidWhen: 'Avoid when blob movement competes with form fields, charts, code blocks, or primary CTA reading.',
    durationGuidance: 'Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.',
    easingGuidance: 'Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.',
    motionRisk: ['performance_sensitive', 'accessibility_sensitive', 'overdesigned'],
    alternatives: ['aurora-shader-background', 'pulse-placeholder', 'parallax-background'],
    decisionNote: 'Use slow breathing motion; do not let the blob cross text or controls.',
    promptV0: 'Design a Morphing Gradient Blob for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely.',
    promptCursor: 'Design a Morphing Gradient Blob for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Include implementation notes for React/Next.js boundaries when relevant.',
    promptCSS: 'Design a Morphing Gradient Blob for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Prefer CSS/SVG first; escalate to Canvas, three.js, or WebGL only when the product intent requires it.',
    codeTailwind: `export function MotionDecisionChecklist() {
  const steps = [
    'Confirm product intent',
    'Choose the simplest implementation family',
    'Set performance caps and mobile fallback',
    'Add reduced-motion behavior',
    'Verify accessibility and readable content',
  ];

  return steps;
}`,
    relatedSlugs: ['aurora-shader-background', 'ai-thinking-orb', 'liquid-wave-transition'],
  },
  {
    id: 128,
    slug: 'particle-network-field',
    nameEn: 'Particle Network Field',
    aliasesEn: ['particle network', 'constellation field', 'connected nodes background', 'network particle system'],
    category: 'Creative Motion',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'Connected points suggest collaboration, intelligence, distributed systems, or data relationships. It can be ambient or interactive, but should remain subtle.',
    whenToUse: ['Product contexts: AI agents, network/security products, collaboration tools, infrastructure platforms, knowledge systems.', 'Choose it when the product intent matches Shader / Atmosphere rather than generic decoration.', 'Tie node behavior to a product metaphor such as agents, documents, or users.'],
    whenNotToUse: ['Avoid as a generic tech background with no connection to the product story. Avoid high particle counts on mobile.'],
    configTips: ['Technical fit: Canvas for most cases; WebGL when particle count or effects require GPU acceleration.', 'Performance: Cap particles by viewport/device, throttle pointer interactions, pause offscreen, and avoid continuous layout work.', 'Accessibility: Do not make links/content depend on moving nodes. Avoid flashing connections.', 'Reduced motion: Static constellation or low-opacity network illustration.'],
    seenIn: ['Motion Guide Creative Motion Pack'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Brand Expression', 'Product Storytelling', 'System Visualization', 'Creative Motion'],
    bestFor: 'AI agents, network/security products, collaboration tools, infrastructure platforms, knowledge systems.',
    avoidWhen: 'Avoid as a generic tech background with no connection to the product story. Avoid high particle counts on mobile.',
    durationGuidance: 'Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.',
    easingGuidance: 'Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.',
    motionRisk: ['performance_sensitive', 'accessibility_sensitive', 'overdesigned'],
    alternatives: ['animated-knowledge-graph', 'aurora-shader-background', 'morphing-gradient-blob'],
    decisionNote: 'Tie node behavior to a product metaphor such as agents, documents, or users.',
    promptV0: 'Design a Particle Network Field for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely.',
    promptCursor: 'Design a Particle Network Field for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Include implementation notes for React/Next.js boundaries when relevant.',
    promptCSS: 'Design a Particle Network Field for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Prefer CSS/SVG first; escalate to Canvas, three.js, or WebGL only when the product intent requires it.',
    codeTailwind: `export function MotionDecisionChecklist() {
  const steps = [
    'Confirm product intent',
    'Choose the simplest implementation family',
    'Set performance caps and mobile fallback',
    'Add reduced-motion behavior',
    'Verify accessibility and readable content',
  ];

  return steps;
}`,
    relatedSlugs: ['animated-knowledge-graph', 'orbital-feature-system', 'ai-thinking-orb'],
  },
  {
    id: 129,
    slug: 'data-stream-tunnel',
    nameEn: 'Data Stream Tunnel',
    aliasesEn: ['data flow tunnel', 'pipeline stream', 'telemetry tunnel', 'ingestion flow'],
    category: 'Creative Motion',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'Directional flow through space—particles, lines, or panels moving from source to destination—communicates ingestion, pipelines, telemetry, search, or transformation.',
    whenToUse: ['Product contexts: Data platforms, observability, AI retrieval, ETL, build/deploy systems, real-time analytics.', 'Choose it when the product intent matches Data / System Visualization rather than generic decoration.', 'Make direction and transformation legible before making it cinematic.'],
    whenNotToUse: ['Avoid if the product does not process flows, or if movement implies real-time guarantees the product cannot provide.'],
    configTips: ['Technical fit: CSS/SVG for simple flows; Canvas/WebGL/three.js for depth and particle density.', 'Performance: Use capped particle counts, instancing for WebGL, and reduced resolution on mobile.', 'Accessibility: Pair with labels or copy explaining what flows from where to where.', 'Reduced motion: Static pipeline diagram with directional arrows.'],
    seenIn: ['Motion Guide Creative Motion Pack'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Brand Expression', 'Product Storytelling', 'System Visualization', 'Creative Motion'],
    bestFor: 'Data platforms, observability, AI retrieval, ETL, build/deploy systems, real-time analytics.',
    avoidWhen: 'Avoid if the product does not process flows, or if movement implies real-time guarantees the product cannot provide.',
    durationGuidance: 'Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.',
    easingGuidance: 'Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.',
    motionRisk: ['performance_sensitive', 'accessibility_sensitive', 'overdesigned'],
    alternatives: ['tool-call-timeline', 'timeline-reveal', 'line-chart-draw'],
    decisionNote: 'Make direction and transformation legible before making it cinematic.',
    promptV0: 'Design a Data Stream Tunnel for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely.',
    promptCursor: 'Design a Data Stream Tunnel for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Include implementation notes for React/Next.js boundaries when relevant.',
    promptCSS: 'Design a Data Stream Tunnel for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Prefer CSS/SVG first; escalate to Canvas, three.js, or WebGL only when the product intent requires it.',
    codeTailwind: `export function MotionDecisionChecklist() {
  const steps = [
    'Confirm product intent',
    'Choose the simplest implementation family',
    'Set performance caps and mobile fallback',
    'Add reduced-motion behavior',
    'Verify accessibility and readable content',
  ];

  return steps;
}`,
    relatedSlugs: ['tool-call-timeline', 'animated-knowledge-graph', 'particle-network-field'],
  },
  {
    id: 130,
    slug: 'animated-knowledge-graph',
    nameEn: 'Animated Knowledge Graph',
    aliasesEn: ['knowledge graph animation', 'node link reveal', 'entity graph motion', 'relationship graph'],
    category: 'Creative Motion',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'Nodes and links reveal relationships among documents, concepts, users, agents, or recommendations. It is most useful when relationships are the product value.',
    whenToUse: ['Product contexts: Knowledge bases, AI memory, recommendation systems, research tools, entity graphs, agent planning.', 'Choose it when the product intent matches Data / System Visualization rather than generic decoration.', 'Animate to reveal relationships, not to keep the graph in perpetual motion.'],
    whenNotToUse: ['Avoid for small lists, pure decoration, or graphs whose structure is fabricated and might mislead users.'],
    configTips: ['Technical fit: SVG or Canvas for moderate graphs; WebGL for large node counts.', 'Performance: Limit animated nodes, stabilize layout before reveal, pause physics after settling.', 'Accessibility: Provide an equivalent list/table summary and keyboard-accessible node details.', 'Reduced motion: Static graph snapshot or expandable relationship list.'],
    seenIn: ['Motion Guide Creative Motion Pack'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Brand Expression', 'Product Storytelling', 'System Visualization', 'Creative Motion'],
    bestFor: 'Knowledge bases, AI memory, recommendation systems, research tools, entity graphs, agent planning.',
    avoidWhen: 'Avoid for small lists, pure decoration, or graphs whose structure is fabricated and might mislead users.',
    durationGuidance: 'Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.',
    easingGuidance: 'Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.',
    motionRisk: ['performance_sensitive', 'accessibility_sensitive', 'overdesigned'],
    alternatives: ['tool-call-timeline', 'folder-open-reveal', 'timeline-reveal'],
    decisionNote: 'Animate to reveal relationships, not to keep the graph in perpetual motion.',
    promptV0: 'Design a Animated Knowledge Graph for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely.',
    promptCursor: 'Design a Animated Knowledge Graph for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Include implementation notes for React/Next.js boundaries when relevant.',
    promptCSS: 'Design a Animated Knowledge Graph for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Prefer CSS/SVG first; escalate to Canvas, three.js, or WebGL only when the product intent requires it.',
    codeTailwind: `export function MotionDecisionChecklist() {
  const steps = [
    'Confirm product intent',
    'Choose the simplest implementation family',
    'Set performance caps and mobile fallback',
    'Add reduced-motion behavior',
    'Verify accessibility and readable content',
  ];

  return steps;
}`,
    relatedSlugs: ['particle-network-field', 'orbital-feature-system', 'data-stream-tunnel'],
  },
  {
    id: 131,
    slug: 'tool-call-timeline',
    nameEn: 'Tool Call Timeline',
    aliasesEn: ['agent timeline', 'tool use timeline', 'workflow trace', 'automation timeline'],
    category: 'Creative Motion',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'Sequential operations such as search, read, transform, validate, write, deploy, or review become visible so agent and automation activity is understandable without pretending to reveal hidden reasoning.',
    whenToUse: ['Product contexts: AI agents, build pipelines, diagnostic tools, workflow automation, assistant products.', 'Choose it when the product intent matches Data / System Visualization rather than generic decoration.', 'Prefer truthful discrete states over decorative “thinking” loops.'],
    whenNotToUse: ['Avoid when operations are instant, private, security-sensitive, or not actually observable.'],
    configTips: ['Technical fit: CSS, Framer Motion, and SVG are usually enough; Canvas only for dense traces.', 'Performance: Animate only state changes. Avoid looping loaders for completed steps.', 'Accessibility: Use semantic status text and live-region discipline for important updates.', 'Reduced motion: Instant step-state changes with icons and timestamps.'],
    seenIn: ['Motion Guide Creative Motion Pack'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Brand Expression', 'Product Storytelling', 'System Visualization', 'Creative Motion'],
    bestFor: 'AI agents, build pipelines, diagnostic tools, workflow automation, assistant products.',
    avoidWhen: 'Avoid when operations are instant, private, security-sensitive, or not actually observable.',
    durationGuidance: 'Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.',
    easingGuidance: 'Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.',
    motionRisk: ['performance_sensitive', 'accessibility_sensitive', 'overdesigned'],
    alternatives: ['timeline-reveal', 'progressive-checklist-fill', 'indeterminate-progress-bar'],
    decisionNote: 'Prefer truthful discrete states over decorative “thinking” loops.',
    promptV0: 'Design a Tool Call Timeline for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely.',
    promptCursor: 'Design a Tool Call Timeline for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Include implementation notes for React/Next.js boundaries when relevant.',
    promptCSS: 'Design a Tool Call Timeline for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Prefer CSS/SVG first; escalate to Canvas, three.js, or WebGL only when the product intent requires it.',
    codeTailwind: `export function MotionDecisionChecklist() {
  const steps = [
    'Confirm product intent',
    'Choose the simplest implementation family',
    'Set performance caps and mobile fallback',
    'Add reduced-motion behavior',
    'Verify accessibility and readable content',
  ];

  return steps;
}`,
    relatedSlugs: ['data-stream-tunnel', 'ai-thinking-orb', 'timeline-reveal'],
  },
  {
    id: 132,
    slug: 'svg-path-drawing',
    nameEn: 'SVG Path Drawing',
    aliasesEn: ['stroke draw', 'line drawing animation', 'route path reveal', 'signature draw'],
    category: 'Creative Motion',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'A logo, signature, diagram, map route, or process line is revealed by animating stroke progress. It works when the line itself communicates construction, journey, or authorship.',
    whenToUse: ['Product contexts: Brand intro, route/path explanation, diagram reveal, education, editorial storytelling.', 'Choose it when the product intent matches Kinetic Typography rather than generic decoration.', 'Use it as a reveal of a meaningful line, not a default text animation.'],
    whenNotToUse: ['Avoid for long body text, important instructions, or logos that must appear instantly for recognition.'],
    configTips: ['Technical fit: SVG stroke-dasharray/stroke-dashoffset, CSS, or Framer Motion.', 'Performance: Keep paths simple, avoid huge SVGs, and run once rather than looping.', 'Accessibility: Provide final visible state and text alternative for meaningful diagrams.', 'Reduced motion: Render the completed path immediately.'],
    seenIn: ['Motion Guide Creative Motion Pack'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Brand Expression', 'Product Storytelling', 'System Visualization', 'Creative Motion'],
    bestFor: 'Brand intro, route/path explanation, diagram reveal, education, editorial storytelling.',
    avoidWhen: 'Avoid for long body text, important instructions, or logos that must appear instantly for recognition.',
    durationGuidance: 'Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.',
    easingGuidance: 'Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.',
    motionRisk: ['performance_sensitive', 'accessibility_sensitive', 'overdesigned'],
    alternatives: ['line-chart-draw', 'text-reveal-pipeline', 'fade-transition'],
    decisionNote: 'Use it as a reveal of a meaningful line, not a default text animation.',
    promptV0: 'Design a SVG Path Drawing for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely.',
    promptCursor: 'Design a SVG Path Drawing for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Include implementation notes for React/Next.js boundaries when relevant.',
    promptCSS: 'Design a SVG Path Drawing for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Prefer CSS/SVG first; escalate to Canvas, three.js, or WebGL only when the product intent requires it.',
    codeTailwind: `export function MotionDecisionChecklist() {
  const steps = [
    'Confirm product intent',
    'Choose the simplest implementation family',
    'Set performance caps and mobile fallback',
    'Add reduced-motion behavior',
    'Verify accessibility and readable content',
  ];

  return steps;
}`,
    relatedSlugs: ['kinetic-headline-reveal', 'line-chart-draw', 'tracing-beam-progress'],
  },
  {
    id: 133,
    slug: 'kinetic-headline-reveal',
    nameEn: 'Kinetic Headline Reveal',
    aliasesEn: ['headline reveal', 'kinetic typography', 'word reveal', 'launch headline animation'],
    category: 'Creative Motion',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'Words or letters animate to create a launch, editorial, or campaign moment. It should amplify a single primary message rather than decorate every heading.',
    whenToUse: ['Product contexts: Launch hero, campaign page, portfolio intro, product story chapter, editorial feature.', 'Choose it when the product intent matches Kinetic Typography rather than generic decoration.', 'Animate the message hierarchy, not every character just because it is possible.'],
    whenNotToUse: ['Avoid in dense SaaS dashboards, documentation, forms, or pages where users need immediate text access.'],
    configTips: ['Technical fit: CSS, Framer Motion, GSAP, or SVG text depending on typographic complexity.', 'Performance: Limit to one headline, keep duration under about 900ms, and avoid expensive blur per letter.', 'Accessibility: Ensure text exists in DOM and is readable without animation.', 'Reduced motion: Static headline or simple opacity reveal.'],
    seenIn: ['Motion Guide Creative Motion Pack'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Brand Expression', 'Product Storytelling', 'System Visualization', 'Creative Motion'],
    bestFor: 'Launch hero, campaign page, portfolio intro, product story chapter, editorial feature.',
    avoidWhen: 'Avoid in dense SaaS dashboards, documentation, forms, or pages where users need immediate text access.',
    durationGuidance: 'Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.',
    easingGuidance: 'Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.',
    motionRisk: ['performance_sensitive', 'accessibility_sensitive', 'overdesigned'],
    alternatives: ['text-reveal-pipeline', 'fade-transition', 'scroll-reveal'],
    decisionNote: 'Animate the message hierarchy, not every character just because it is possible.',
    promptV0: 'Design a Kinetic Headline Reveal for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely.',
    promptCursor: 'Design a Kinetic Headline Reveal for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Include implementation notes for React/Next.js boundaries when relevant.',
    promptCSS: 'Design a Kinetic Headline Reveal for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Prefer CSS/SVG first; escalate to Canvas, three.js, or WebGL only when the product intent requires it.',
    codeTailwind: `export function MotionDecisionChecklist() {
  const steps = [
    'Confirm product intent',
    'Choose the simplest implementation family',
    'Set performance caps and mobile fallback',
    'Add reduced-motion behavior',
    'Verify accessibility and readable content',
  ];

  return steps;
}`,
    relatedSlugs: ['svg-path-drawing', 'text-reveal-pipeline', 'text-decode-reveal'],
  },
  {
    id: 134,
    slug: 'ai-thinking-orb',
    nameEn: 'AI Thinking Orb',
    aliasesEn: ['AI orb', 'thinking indicator', 'agent status orb', 'generative status object'],
    category: 'Creative Motion',
    difficulty: 'custom_build',
    mediaTier: 2,
    description: 'An abstract status object pulses, breathes, morphs, or responds to audio/tool activity to communicate processing, listening, generating, or system presence in an AI product.',
    whenToUse: ['Product contexts: AI assistant, voice interface, agent dashboard, model generation screen, creative tool.', 'Choose it when the product intent matches AI / Tech Expression rather than generic decoration.', 'Use the orb for ambient state; use timelines or progress for accountable work.'],
    whenNotToUse: ['Avoid as a replacement for precise progress, errors, or tool-call states. Avoid if it implies sentience or capability the product does not have.'],
    configTips: ['Technical fit: CSS/SVG for simple orbs; Canvas/WebGL for audio-reactive or particle-based forms.', 'Performance: Keep loops lightweight, pause when inactive, and avoid high-frequency blur/noise.', 'Accessibility: Pair with truthful status text such as “Searching docs” or “Generating draft”.', 'Reduced motion: Static orb plus text state or subtle opacity change.'],
    seenIn: ['Motion Guide Creative Motion Pack'],
    pageTypes: ['Landing Page', 'Portfolio', 'SaaS App'],
    useCases: ['Brand Expression', 'Product Storytelling', 'System Visualization', 'Creative Motion'],
    bestFor: 'AI assistant, voice interface, agent dashboard, model generation screen, creative tool.',
    avoidWhen: 'Avoid as a replacement for precise progress, errors, or tool-call states. Avoid if it implies sentience or capability the product does not have.',
    durationGuidance: 'Keep loops slow and ambient; use one-shot reveals when the motion is introducing content or explaining a process.',
    easingGuidance: 'Use restrained ease-out/ease-in-out curves for UI-adjacent motion; reserve continuous linear motion for flows, orbits, and ambient fields.',
    motionRisk: ['performance_sensitive', 'accessibility_sensitive', 'overdesigned'],
    alternatives: ['tool-call-timeline', 'typing-dots', 'indeterminate-progress-bar'],
    decisionNote: 'Use the orb for ambient state; use timelines or progress for accountable work.',
    promptV0: 'Design a AI Thinking Orb for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely.',
    promptCursor: 'Design a AI Thinking Orb for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Include implementation notes for React/Next.js boundaries when relevant.',
    promptCSS: 'Design a AI Thinking Orb for this product context. First explain the product intent, when not to use it, performance budget, accessibility constraints, and reduced-motion fallback. Then propose the simplest implementation family that can express the idea safely. Prefer CSS/SVG first; escalate to Canvas, three.js, or WebGL only when the product intent requires it.',
    codeTailwind: `export function MotionDecisionChecklist() {
  const steps = [
    'Confirm product intent',
    'Choose the simplest implementation family',
    'Set performance caps and mobile fallback',
    'Add reduced-motion behavior',
    'Verify accessibility and readable content',
  ];

  return steps;
}`,
    relatedSlugs: ['tool-call-timeline', 'morphing-gradient-blob', 'particle-network-field'],
  }
];
