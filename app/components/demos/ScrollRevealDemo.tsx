'use client';
import { motion } from 'framer-motion';

export function ScrollRevealDemo() {
    return (
        <div className="flex h-[300px] w-full flex-col items-center gap-6 overflow-y-auto rounded-2xl bg-stone-50 p-6 shadow-sm ring-1 ring-stone-200">
            <div className="w-full max-w-sm rounded-xl bg-white p-4 text-center text-xs font-medium text-stone-500 shadow-sm ring-1 ring-stone-100">
                Scroll down to reveal elements
            </div>

            {/* Element 1 */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mt-20 w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200"
            >
                <div className="mb-4 h-4 w-1/3 rounded-md bg-stone-200" />
                <div className="space-y-2">
                    <div className="h-2 w-full rounded-md bg-stone-100" />
                    <div className="h-2 w-5/6 rounded-md bg-stone-100" />
                </div>
            </motion.div>

            {/* Element 2 */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mt-12 w-full max-w-sm flex-row flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200"
            >
                <div className="h-12 w-12 shrink-0 rounded-full bg-stone-100" />
                <div className="flex flex-col justify-center gap-2 w-full">
                    <div className="h-3 w-1/2 rounded-md bg-stone-200" />
                    <div className="h-2 w-3/4 rounded-md bg-stone-100" />
                </div>
            </motion.div>

            <div className="my-12 w-full max-w-sm rounded-xl border border-dashed border-stone-200 p-4 text-center text-xs text-stone-400">
                Keep scrolling...
            </div>

            {/* Element 3 */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mb-12 w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200"
            >
                <div className="mb-4 h-4 w-1/3 rounded-md bg-stone-200" />
                <div className="h-16 w-full rounded-md bg-stone-100" />
            </motion.div>
        </div>
    );
}
