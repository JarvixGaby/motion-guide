"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const tabs = ['Overview', 'Integrations', 'Billing', 'Settings'];

export function TabUnderlineSlideDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [activeTab, setActiveTab] = useState('Overview');

    useEffect(() => {
        if (!isPlaying) {
            setActiveTab('Overview');
            return;
        }
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % tabs.length;
            setActiveTab(tabs[currentIndex]);
        }, 1500);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <div className="flex space-x-2 border-b border-stone-200">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none ${activeTab === tab ? 'text-stone-900' : 'text-stone-500 hover:text-stone-700'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="tab-underline-slide"
                                className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-stone-900"
                                initial={false}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
