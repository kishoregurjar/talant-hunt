"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";

export default function TermsModal({ open, onClose }) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    {/* Card with smooth pop animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 16 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200  p-6 md:p-6"
                        onClick={(e) => e.stopPropagation()} // backdrop click se close, card click ignore
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                                    <ShieldCheck className="text-blue-600" size={18} />
                                </div>
                                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                                    Terms &amp; Conditions
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition"
                                aria-label="Close terms and conditions"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content – same style as image: light gray box with bullets */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
                            <ul className="list-disc list-inside text-sm md:text-[15px] text-gray-800 space-y-1.5">
                                <li>
                                    The registration payment is <strong>non-refundable</strong> under all circumstances.
                                </li>

                                <li>
                                    Making the payment does <strong>not guarantee selection</strong>. Your selection will depend entirely on your on-field performance and evaluation.
                                </li>

                                <li>
                                    The payment collected is strictly a <strong>registration and administrative fee</strong> for participating in the Talent Hunt.
                                </li>
 
                                <li>
                                    Any false or misleading information may lead to disqualification without refund.
                                </li>

                                <li>
                                    By completing the registration, you consent to the use of your details for verification and event management purposes.
                                </li>
                            </ul>


                            <p className="mt-4 text-xs md:text-sm text-gray-500">
                                These terms apply to your registration for the Talent Hunt and
                                related activities. By continuing, you accept these terms.
                            </p>
                        </div>

                        {/* Footer button */}
                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 md:px-5 md:py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm active:scale-95 transition"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
