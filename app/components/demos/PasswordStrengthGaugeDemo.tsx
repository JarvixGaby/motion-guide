"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function PasswordStrengthGaugeDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!isPlaying) {
            setPassword("");
            return;
        }

        const typed = "Tr0ub4dor&3";
        let index = 0;

        const loop = setInterval(() => {
            if (index <= typed.length) {
                setPassword(typed.substring(0, index));
                index++;
            } else {
                clearInterval(loop);
                setTimeout(() => setPassword(""), 1000);
            }
        }, 200);

        const restartLoop = setInterval(() => {
            index = 0;
            setPassword("");
        }, 4000);

        return () => {
            clearInterval(loop);
            clearInterval(restartLoop);
        };
    }, [isPlaying]);

    // Calculate strength based on length (simplified for demo)
    const strength = Math.min(100, (password.length / 10) * 100);

    // Determine color
    const getColor = (str: number) => {
        if (str === 0) return "#e5e7eb"; // stone-200
        if (str < 40) return "#ef4444"; // red-500
        if (str < 80) return "#eab308"; // yellow-500
        return "#10b981"; // emerald-500
    };

    const getLabel = (str: number) => {
        if (str === 0) return "Enter password";
        if (str < 40) return "Weak";
        if (str < 80) return "Fair";
        return "Strong";
    };

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div className="w-full max-w-xs flex flex-col gap-3">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                />

                {/* The Gauge */}
                <div className="flex flex-col gap-1.5 px-1">
                    <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            animate={{
                                width: `${strength}%`,
                                backgroundColor: getColor(strength)
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        />
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-stone-400 font-medium">Security</span>
                        <motion.span
                            key={getLabel(strength)}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-bold uppercase tracking-wider"
                            style={{ color: strength === 0 ? "#9ca3af" : getColor(strength) }}
                        >
                            {getLabel(strength)}
                        </motion.span>
                    </div>
                </div>
            </div>
        </div>
    );
}
