"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';

export function OfflineIndicatorDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [isOffline, setIsOffline] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    const handleReconnect = useCallback(() => {
        setIsChecking(true);
        setTimeout(() => {
            setIsChecking(false);
            setIsOffline(false);
            if (isPlaying) {
                setTimeout(() => setIsOffline(true), 2000);
            }
        }, 1500);
    }, [isPlaying]);

    useEffect(() => {
        if (!isPlaying) {
            setIsOffline(false);
            return;
        }
        setIsOffline(true);
        const interval = setInterval(() => {
            handleReconnect();
        }, 5000); // Attempt reconnect every 5s automatically if playing
        return () => clearInterval(interval);
    }, [isPlaying, handleReconnect]);

    return (
        <div className="relative flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-stone-100 p-6 shadow-sm ring-1 ring-stone-200">

            {/* Mock App Interface */}
            <div className="absolute top-0 left-0 right-0 h-14 bg-white border-b border-stone-200 flex items-center px-4 justify-between" />

            <div className="flex flex-col items-center text-center max-w-sm mt-12 z-0">
                <h3 className="text-xl font-semibold text-stone-900 mb-2">Application Area</h3>
                <p className="text-stone-500 mb-8 leading-relaxed">
                    Toggle the offline state below to see how the application reacts to a loss of connectivity.
                </p>

                <button
                    onClick={() => !isOffline && setIsOffline(true)}
                    className={`px-6 py-2.5 rounded-xl font-medium shadow-sm transition-colors ${isOffline ? 'bg-stone-200 text-stone-400 cursor-not-allowed' : 'bg-stone-900 text-white hover:bg-stone-800'
                        }`}
                >
                    Simulate Disconnect
                </button>
            </div>

            <AnimatePresence>
                {isOffline && (
                    <motion.div
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="absolute top-0 left-0 right-0 bg-stone-900 text-white px-4 py-3 flex items-center justify-between shadow-md z-50"
                    >
                        <div className="flex items-center space-x-3">
                            <WifiOff className="w-5 h-5 text-stone-400" />
                            <div>
                                <p className="text-sm border-b-0 border-transparent font-medium m-0 flex">No internet connection</p>
                            </div>
                        </div>

                        <button
                            onClick={handleReconnect}
                            disabled={isChecking}
                            className="flex items-center space-x-2 text-sm font-medium text-stone-300 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-stone-800"
                        >
                            <motion.div
                                animate={{ rotate: isChecking ? 360 : 0 }}
                                transition={{ duration: 1, repeat: isChecking ? Infinity : 0, ease: "linear" }}
                            >
                                <RefreshCw className="w-4 h-4" />
                            </motion.div>
                            <span>{isChecking ? 'Reconnecting...' : 'Retry'}</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOffline && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-stone-100/50 backdrop-blur-[1px] z-10 pointer-events-none"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
