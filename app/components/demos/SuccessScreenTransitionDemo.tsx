"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, CreditCard } from 'lucide-react';

export function SuccessScreenTransitionDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [status, setStatus] = useState<'form' | 'loading' | 'success'>('form');

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setStatus('loading');
        setTimeout(() => setStatus('success'), 1200);
    };

    useEffect(() => {
        if (!isPlaying) {
            setStatus('form');
            return;
        }

        const runLoop = async () => {
            setStatus('form');
            await new Promise(r => setTimeout(r, 600));
            handleSubmit();
            await new Promise(r => setTimeout(r, 2000));
        };
        runLoop();
        const interval = setInterval(runLoop, 4000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">

            <div className="w-full max-w-sm relative h-[340px]">
                <AnimatePresence mode="wait">

                    {status === 'form' && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex flex-col rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-stone-700" />
                                </div>
                                <h3 className="text-xl font-bold text-stone-900">Payment Details</h3>
                            </div>

                            <div className="space-y-4 mb-auto">
                                <div className="h-12 w-full bg-stone-50 rounded-xl border border-stone-200" />
                                <div className="flex gap-4">
                                    <div className="h-12 w-1/2 bg-stone-50 rounded-xl border border-stone-200" />
                                    <div className="h-12 w-1/2 bg-stone-50 rounded-xl border border-stone-200" />
                                </div>
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="w-full py-3.5 bg-stone-900 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-stone-800 transition shadow-sm focus:ring-4 focus:ring-stone-200 outline-none mt-6"
                            >
                                <span>Pay $49.00</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )}

                    {status === 'loading' && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white p-8 rounded-3xl shadow-sm border border-stone-200 flex flex-col items-center justify-center"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-12 h-12 border-[4px] border-stone-100 border-t-stone-900 rounded-full mb-6"
                            />
                            <p className="font-medium text-stone-500 text-sm">Processing securely...</p>
                        </motion.div>
                    )}

                    {status === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 bg-[#059669] p-8 rounded-3xl shadow-lg flex flex-col items-center justify-center text-white"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                                className="w-20 h-20 bg-white text-[#059669] rounded-full flex items-center justify-center mb-6 shadow-md"
                            >
                                <Check className="w-10 h-10 stroke-[3]" />
                            </motion.div>
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl font-bold mb-2"
                            >
                                Payment Successful
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-green-50 text-center mb-8 text-sm"
                            >
                                A receipt has been sent to your email.
                            </motion.p>
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                onClick={() => setStatus('form')}
                                className="px-8 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition-colors text-sm"
                            >
                                Done
                            </motion.button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
