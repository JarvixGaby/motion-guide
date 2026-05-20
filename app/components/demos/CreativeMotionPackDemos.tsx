'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type DemoProps = { isPlaying?: boolean };

type Variant =
  | 'floating-product-object'
  | 'interactive-3d-card-stack'
  | 'orbital-feature-system'
  | 'aurora-shader-background'
  | 'morphing-gradient-blob'
  | 'particle-network-field'
  | 'data-stream-tunnel'
  | 'animated-knowledge-graph'
  | 'tool-call-timeline'
  | 'svg-path-drawing'
  | 'kinetic-headline-reveal'
  | 'ai-thinking-orb';

const cards = ['Research', 'Agent', 'Deploy'];
const nodes = [
  { x: 50, y: 28, label: 'Core' },
  { x: 25, y: 48, label: 'Docs' },
  { x: 72, y: 50, label: 'Tools' },
  { x: 42, y: 73, label: 'Users' },
  { x: 83, y: 28, label: 'API' },
];

function CreativeMotionVisual({ variant, isPlaying = false }: { variant: Variant; isPlaying?: boolean }) {
  const [activeCard, setActiveCard] = useState(1);
  const [tilt, setTilt] = useState({ x: -8, y: 0 });
  const animate = isPlaying ? { opacity: [0.55, 1, 0.55], scale: [1, 1.04, 1] } : { opacity: 0.85, scale: 1 };

  useEffect(() => {
    if (!isPlaying || variant !== 'interactive-3d-card-stack') return;

    const loop = window.setInterval(() => {
      setActiveCard((card) => (card + 1) % cards.length);
    }, 1700);

    return () => window.clearInterval(loop);
  }, [isPlaying, variant]);

  if (variant === 'floating-product-object') {
    return (
      <button
        type="button"
        aria-label="Tilt the floating product object"
        className="group relative cursor-grab rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-amber-300 active:cursor-grabbing"
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          setTilt({ x: y * -18, y: x * 22 });
        }}
        onPointerLeave={() => setTilt({ x: -8, y: 0 })}
      >
        <motion.div
          className="relative h-40 w-56 rounded-3xl border border-white/15 bg-white/10 p-4 text-left shadow-2xl backdrop-blur"
          animate={isPlaying ? { rotateX: tilt.x, rotateY: tilt.y, y: [0, -8, 0] } : { rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ duration: isPlaying ? 5 : 0.25, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="h-4 w-24 rounded-full bg-amber-300/70" />
          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="col-span-2 h-20 rounded-2xl bg-white/15" />
            <div className="space-y-2">
              <div className="h-5 rounded bg-white/20" />
              <div className="h-5 rounded bg-white/10" />
              <div className="h-5 rounded bg-white/10" />
            </div>
          </div>
          <div className="mt-3 h-3 rounded-full bg-white/10" />
        </motion.div>
        <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
          Move pointer to tilt
        </span>
      </button>
    );
  }

  if (variant === 'interactive-3d-card-stack') {
    return (
      <div className="relative h-52 w-72">
        {cards.map((card, index) => {
          const isActive = index === activeCard;
          return (
            <motion.button
              key={card}
              type="button"
              onClick={() => setActiveCard(index)}
              onFocus={() => setActiveCard(index)}
              onMouseEnter={() => setActiveCard(index)}
              className="absolute left-8 top-6 h-28 w-44 rounded-2xl border border-white/15 bg-white/10 p-4 text-left shadow-xl outline-none backdrop-blur transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-amber-300"
              animate={{
                x: index * 26 + (isActive ? 18 : 0),
                y: index * 14 + (isActive ? -10 : 0),
                rotate: index * 4 - 4 + (isActive ? 2 : 0),
                scale: isActive ? 1.08 : 0.96,
                zIndex: isActive ? 10 : index,
              }}
              transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            >
              <div className="text-xs font-mono uppercase tracking-widest text-amber-200">{card}</div>
              <div className="mt-5 h-3 rounded bg-white/30" />
              <div className="mt-2 h-3 w-2/3 rounded bg-white/15" />
              {isActive && <div className="mt-3 text-[10px] uppercase tracking-widest text-white/45">Selected</div>}
            </motion.button>
          );
        })}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
          Hover or click a card
        </div>
      </div>
    );
  }

  if (variant === 'orbital-feature-system') {
    return (
      <div className="relative h-52 w-52 rounded-full border border-white/10">
        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/80 blur-sm" />
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <motion.div
            key={item}
            className="absolute left-1/2 top-1/2 h-10 w-10 rounded-full border border-white/15 bg-white/10 backdrop-blur"
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 12 + item, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `${44 + item * 3}px ${44 + item * 2}px`, transform: `rotate(${item * 60}deg) translateX(82px)` }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'aurora-shader-background') {
    return (
      <div className="relative h-56 w-full overflow-hidden rounded-3xl bg-stone-950">
        <motion.div className="absolute -left-12 top-8 h-40 w-56 rounded-full bg-cyan-400/50 blur-3xl" animate={animate} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-4 right-0 h-48 w-64 rounded-full bg-violet-500/50 blur-3xl" animate={isPlaying ? { x: [-20, 20, -20], opacity: [0.35, 0.7, 0.35] } : { opacity: 0.5 }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,.55))]" />
      </div>
    );
  }

  if (variant === 'morphing-gradient-blob') {
    return <motion.div className="h-44 w-44 bg-gradient-to-br from-amber-300 via-rose-300 to-violet-400 blur-sm" animate={isPlaying ? { borderRadius: ['44% 56% 62% 38%', '64% 36% 42% 58%', '44% 56% 62% 38%'], rotate: [0, 8, 0] } : { borderRadius: '44% 56% 62% 38%' }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />;
  }

  if (variant === 'particle-network-field' || variant === 'animated-knowledge-graph') {
    return (
      <svg viewBox="0 0 100 100" className="h-56 w-full overflow-visible">
        <line x1="50" y1="28" x2="25" y2="48" stroke="rgba(255,255,255,.25)" />
        <line x1="50" y1="28" x2="72" y2="50" stroke="rgba(255,255,255,.25)" />
        <line x1="25" y1="48" x2="42" y2="73" stroke="rgba(255,255,255,.18)" />
        <line x1="72" y1="50" x2="83" y2="28" stroke="rgba(255,255,255,.18)" />
        {nodes.map((node, index) => (
          <motion.g key={node.label} initial={false} animate={isPlaying ? { opacity: [0.45, 1, 0.45] } : { opacity: 0.9 }} transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.2 }}>
            <circle cx={node.x} cy={node.y} r={variant === 'animated-knowledge-graph' ? 5 : 3} fill={index === 0 ? '#fcd34d' : 'rgba(255,255,255,.72)'} />
            {variant === 'animated-knowledge-graph' && <text x={node.x + 7} y={node.y + 1} fill="rgba(255,255,255,.72)" fontSize="4">{node.label}</text>}
          </motion.g>
        ))}
      </svg>
    );
  }

  if (variant === 'data-stream-tunnel') {
    return (
      <div className="relative h-56 w-full overflow-hidden rounded-3xl border border-white/10 bg-stone-950">
        {[0, 1, 2, 3, 4].map((row) => (
          <motion.div key={row} className="absolute left-8 h-px w-56 bg-gradient-to-r from-transparent via-amber-300 to-transparent" style={{ top: `${30 + row * 32}px` }} animate={isPlaying ? { x: [-160, 220] } : { x: 0 }} transition={{ duration: 2.8, repeat: Infinity, delay: row * 0.22, ease: 'linear' }} />
        ))}
        <div className="absolute inset-y-0 left-12 w-px bg-white/10" />
        <div className="absolute inset-y-0 right-12 w-px bg-white/10" />
      </div>
    );
  }

  if (variant === 'tool-call-timeline') {
    const steps = ['Search', 'Read', 'Validate', 'Write'];
    return (
      <div className="w-72 space-y-3">
        {steps.map((step, index) => (
          <motion.div key={step} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3" animate={isPlaying ? { opacity: index < 3 ? 1 : [0.45, 1, 1] } : { opacity: 1 }} transition={{ duration: 1, delay: index * 0.25 }}>
            <span className="h-3 w-3 rounded-full bg-emerald-300" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/70">{step}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (variant === 'svg-path-drawing') {
    return (
      <svg viewBox="0 0 260 120" className="h-48 w-full">
        <motion.path d="M18 88 C 54 18, 86 18, 116 76 S 184 96, 230 24" fill="none" stroke="#fcd34d" strokeWidth="7" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isPlaying ? { pathLength: 1 } : { pathLength: 1 }} transition={{ duration: 2.2, ease: 'easeInOut' }} />
      </svg>
    );
  }

  if (variant === 'kinetic-headline-reveal') {
    return (
      <div className="text-center font-display text-5xl font-light leading-none text-white">
        {['Make', 'Motion', 'Matter'].map((word, index) => (
          <motion.span key={word} className="mx-1 inline-block" animate={isPlaying ? { y: [24, 0], opacity: [0, 1] } : { y: 0, opacity: 1 }} transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}>{word}</motion.span>
        ))}
      </div>
    );
  }

  return (
    <div className="relative flex h-56 w-full items-center justify-center">
      <motion.div className="h-36 w-36 rounded-full bg-gradient-to-br from-cyan-300 via-violet-400 to-amber-300 blur-sm" animate={isPlaying ? { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] } : { scale: 1 }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="absolute bottom-6 rounded-full border border-white/10 bg-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/65">Searching docs</div>
    </div>
  );
}

function DemoFrame({ variant, isPlaying }: { variant: Variant; isPlaying?: boolean }) {
  return (
    <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-950 p-6 shadow-sm ring-1 ring-stone-900">
      <CreativeMotionVisual variant={variant} isPlaying={isPlaying} />
    </div>
  );
}

export function FloatingProductObjectDemo(props: DemoProps) { return <DemoFrame variant="floating-product-object" {...props} />; }
export function Interactive3DCardStackDemo(props: DemoProps) { return <DemoFrame variant="interactive-3d-card-stack" {...props} />; }
export function OrbitalFeatureSystemDemo(props: DemoProps) { return <DemoFrame variant="orbital-feature-system" {...props} />; }
export function AuroraShaderBackgroundDemo(props: DemoProps) { return <DemoFrame variant="aurora-shader-background" {...props} />; }
export function MorphingGradientBlobDemo(props: DemoProps) { return <DemoFrame variant="morphing-gradient-blob" {...props} />; }
export function ParticleNetworkFieldDemo(props: DemoProps) { return <DemoFrame variant="particle-network-field" {...props} />; }
export function DataStreamTunnelDemo(props: DemoProps) { return <DemoFrame variant="data-stream-tunnel" {...props} />; }
export function AnimatedKnowledgeGraphDemo(props: DemoProps) { return <DemoFrame variant="animated-knowledge-graph" {...props} />; }
export function ToolCallTimelineDemo(props: DemoProps) { return <DemoFrame variant="tool-call-timeline" {...props} />; }
export function SvgPathDrawingDemo(props: DemoProps) { return <DemoFrame variant="svg-path-drawing" {...props} />; }
export function KineticHeadlineRevealDemo(props: DemoProps) { return <DemoFrame variant="kinetic-headline-reveal" {...props} />; }
export function AiThinkingOrbDemo(props: DemoProps) { return <DemoFrame variant="ai-thinking-orb" {...props} />; }
