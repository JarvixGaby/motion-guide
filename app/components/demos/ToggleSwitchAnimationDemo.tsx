'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ToggleSwitchAnimationDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setIsOn(false);
            return;
        }

        const interval = setInterval(() => {
            setIsOn((prev) => !prev);
        }, 1500);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const toggleSwitch = () => setIsOn(!isOn);

    return (
        <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <button
                onClick={toggleSwitch}
                className={`relative flex h-8 w-14 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 ${isOn ? 'bg-stone-900' : 'bg-stone-200'
                    }`}
                aria-checked={isOn}
                role="switch"
            >
                <span className="sr-only">Toggle setting</span>
                <motion.div
                    animate={{ x: isOn ? 24 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="h-6 w-6 rounded-full bg-white shadow-sm"
                />
            </button>
        </div>
    );
}
