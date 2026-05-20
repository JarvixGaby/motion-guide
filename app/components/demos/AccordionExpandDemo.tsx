"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "What is Framer Motion?",
        answer: "Framer Motion is a production-ready motion library for React that makes creating animations incredibly simple and declarative."
    },
    {
        question: "How does the height animation work?",
        answer: "By using an AnimatePresence component and animating the height property from 0 to 'auto', we can smoothly animate the Accordion's expansion even without knowing the exact pixel height."
    },
    {
        question: "Can I use this for navigation?",
        answer: "Yes! Accordion menus are excellent for sidebar navigation, mobile menus, or anywhere you need to group related sub-items hierarchically."
    }
];

export function AccordionExpandDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        if (!isPlaying) {
            setOpenIndex(0);
            return;
        }
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % faqs.length;
            setOpenIndex(currentIndex);
        }, 2000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="relative flex min-h-64 h-auto w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                {faqs.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div key={index} className="border-b border-stone-100 last:border-b-0">
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                className="flex w-full items-center justify-between p-4 text-left focus:outline-none focus-visible:bg-stone-50 transition-colors hover:bg-stone-50/50"
                            >
                                <span className="font-medium text-stone-900">{faq.question}</span>
                                <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-stone-400"
                                >
                                    <ChevronDown className="h-5 w-5" />
                                </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-4 pb-4 pt-0 text-stone-600 text-sm leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
