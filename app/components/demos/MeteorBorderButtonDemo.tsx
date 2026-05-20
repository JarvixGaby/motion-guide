"use client";
import { motion } from "framer-motion";

export function MeteorBorderButtonDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    return (
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-stone-900 p-4 shadow-sm ring-1 ring-stone-900 relative">

            {/* Dark Premium Button Wrapper with Meteor Border */}
            <div className="relative group rounded-full overflow-hidden p-[2px] bg-stone-800 focus-within:ring-2 focus-within:ring-indigo-500 w-48 flex items-center justify-center">

                {/* 
                  The spinning gradient background that acts as the "border".
                  We hide the center using the inner button's background.
                */}
                <motion.div
                    className="absolute z-0 aspect-square w-[250%] opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{ rotate: [0, 360] }}
                    transition={{ ease: "linear", duration: 3, repeat: Infinity }}
                    style={{
                        background: "conic-gradient(from 0deg, transparent 0 340deg, white 360deg)",
                    }}
                />

                <button className="relative z-10 flex items-center gap-2 rounded-full bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-stone-800 w-full group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <span className="relative z-20 bg-gradient-to-br from-white to-stone-400 bg-clip-text text-transparent">
                        Upgrade to Pro
                    </span>
                    <svg className="w-4 h-4 text-stone-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>

            <p className="absolute bottom-6 text-xs text-stone-500 font-medium tracking-wide">Hover to intensify the glow</p>
        </div>
    );
}
