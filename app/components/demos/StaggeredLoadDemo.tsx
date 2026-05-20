'use client';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
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

const items = ['Overview', 'Analytics', 'Settings', 'Profile'];

export function StaggeredLoadDemo({ isPlaying = true, replayKey = 0 }: { isPlaying?: boolean; replayKey?: number }) {
  return (
    <motion.div
      key={replayKey}
      variants={containerVariants}
      initial="hidden"
      animate={isPlaying ? "visible" : "hidden"}
      className="grid w-80 grid-cols-2 gap-4 rounded-2xl bg-stone-50 p-6 shadow-sm ring-1 ring-stone-200"
    >
      {items.map((item) => (
        <motion.div
          key={item}
          variants={itemVariants}
          className="flex h-16 items-center justify-center text-center rounded-xl bg-white text-xs font-semibold text-stone-700 shadow-sm ring-1 ring-stone-200/50"
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}
