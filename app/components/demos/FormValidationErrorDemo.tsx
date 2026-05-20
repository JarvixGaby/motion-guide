"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function FormValidationErrorDemo({ isPlaying = false }: { isPlaying?: boolean }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const validateEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setErrorMsg("Email address is required");
            setStatus('error');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMsg("Please enter a valid email address");
            setStatus('error');
        } else {
            setStatus('success');
            setErrorMsg('');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    useEffect(() => {
        if (!isPlaying) {
            setEmail('');
            setStatus('idle');
            return;
        }

        const loop = async () => {
            setEmail('');
            setStatus('idle');

            await new Promise(r => setTimeout(r, 800));
            setEmail('invalid-email');
            setErrorMsg("Please enter a valid email address");
            setStatus('error');

            await new Promise(r => setTimeout(r, 1500));
        };

        loop();
        const interval = setInterval(loop, 3000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="relative flex h-64 w-full items-center justify-center rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
            <div className="w-full max-w-sm scale-90">
                <div className="mb-6 text-center">
                    <h3 className="mb-2 text-xl font-bold text-stone-900">Subscribe</h3>
                    <p className="text-sm text-stone-500">Enter your email to join our newsletter.</p>
                </div>

                <form onSubmit={validateEmail} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                            Email Address
                        </label>
                        <div className="relative">
                            <motion.div
                                animate={status === 'error' ? { x: [-5, 5, -5, 5, -3, 3, 0] } : {}}
                                transition={{ duration: 0.4 }}
                            >
                                <input
                                    id="email"
                                    type="text"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (status === 'error') setStatus('idle');
                                    }}
                                    className={`w-full h-12 px-4 rounded-xl border-2 font-medium text-stone-900 outline-none transition-all ${status === 'error'
                                        ? 'border-red-500 bg-red-50/50 focus:border-red-600 focus:ring-4 focus:ring-red-500/10'
                                        : status === 'success'
                                            ? 'border-green-500 bg-green-50/50 focus:border-green-600'
                                            : 'border-stone-200 bg-white focus:border-stone-400 focus:ring-4 focus:ring-stone-400/10'
                                        }`}
                                    placeholder="you@example.com"
                                />
                            </motion.div>

                            <AnimatePresence>
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute right-4 top-3.5 text-red-500 pointer-events-none"
                                    >
                                        <AlertCircle className="w-5 h-5" />
                                    </motion.div>
                                )}
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute right-4 top-3.5 text-green-500 pointer-events-none"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <AnimatePresence>
                            {status === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: -5, height: 0 }}
                                    className="text-sm font-medium text-red-500"
                                >
                                    {errorMsg}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition-colors shadow-sm focus:ring-4 focus:ring-stone-200 outline-none"
                    >
                        {status === 'success' ? 'Subscribed!' : 'Subscribe'}
                    </button>
                </form>
            </div>
        </div>
    );
}
