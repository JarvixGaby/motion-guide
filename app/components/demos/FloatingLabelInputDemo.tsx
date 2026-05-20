"use client";
import { useState, useEffect } from 'react';

export function FloatingLabelInputDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [value, setValue] = useState("");
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        if (!isPlaying) {
            setValue("");
            setFocused(false);
            return;
        }

        const loop = setInterval(() => {
            setFocused(true);
            setTimeout(() => {
                setValue("user@example.com");
            }, 600);
            setTimeout(() => {
                setValue("");
                setFocused(false);
            }, 2000);
        }, 3000);

        return () => clearInterval(loop);
    }, [isPlaying]);

    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
            <div className="relative w-full max-w-sm">
                <input
                    type="text"
                    id="email_input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder=" " // crucial for :placeholder-shown trick physically, though we're using react state here for stronger control
                    className={`block w-full rounded-xl border bg-transparent px-4 pb-2.5 pt-5 text-sm text-stone-900 focus:outline-none focus:ring-0 peer transition-colors ${focused ? 'border-indigo-500' : 'border-stone-300'} ${(value || focused) ? 'shadow-inner' : ''}`}
                />
                <label
                    htmlFor="email_input"
                    className={`absolute left-4 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 cursor-text
                        ${focused ? 'text-indigo-500' : 'text-stone-500'}
                        ${(value || focused) ? 'font-medium' : ''}
                    `}
                    // We manually override translate if value exists in case placeholder-shown is flaky in pure react state
                    style={{
                        transform: (value || focused) ? 'translateY(-14px) scale(0.75)' : 'translateY(0px) scale(1)',
                        top: (value || focused) ? '20px' : '15px'
                    }}
                >
                    Email Address
                </label>
            </div>
        </div>
    );
}
