// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { X, CheckCircle } from "lucide-react";

// export default function FormSubmittedModal({ open, onClose, onBack }) {
//     return (
//         <AnimatePresence>
//             {open && (
//                 <motion.div
//                     className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-2"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     onClick={onClose}
//                 >
//                     {/* Card with smooth pop animation */}
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9, y: 16 }}
//                         animate={{ opacity: 1, scale: 1, y: 0 }}
//                         exit={{ opacity: 0, scale: 0.9, y: 16 }}
//                         transition={{ duration: 0.25, ease: "easeOut" }}
//                         className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-6"
//                         onClick={(e) => e.stopPropagation()} // backdrop click se close, card click ignore
//                     >
//                         {/* Header */}
//                         <div className="flex items-start justify-between mb-4">
//                             <div className="flex items-center gap-2">
//                                 <div className="h-8 w-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
//                                     <CheckCircle className="text-green-600" size={18} />
//                                 </div>
//                                 <h2 className="text-lg md:text-xl font-semibold text-gray-900">
//                                     Registration Status
//                                 </h2>
//                             </div>

//                             <button
//                                 type="button"
//                                 onClick={onClose}
//                                 className="text-gray-400 hover:text-gray-600 transition"
//                                 aria-label="Close modal"
//                             >
//                                 <X size={18} />
//                             </button>
//                         </div>

//                         {/* Content */}
//                         <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5 text-center">
//                             <div className="flex flex-col items-center gap-4">
//                                 <CheckCircle className="text-green-600" size={48} />
//                                 <h3 className="text-lg md:text-xl font-semibold text-gray-900">
//                                     You have already registered!
//                                 </h3>
//                                 <p className="text-sm md:text-base text-gray-600">
//                                     You have successfully completed the registration process for the Talent Hunt. 
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Footer buttons */}
//                         <div className="mt-6 flex justify-end gap-3">
//                             <button
//                                 type="button"
//                                 onClick={onBack}
//                                 className="px-4 py-2 md:px-5 md:py-2.5 rounded-lg text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm active:scale-95 transition"
//                             >
//                                 Back
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={onClose}
//                                 className="px-4 py-2 md:px-5 md:py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm active:scale-95 transition"
//                             >
//                                 Close
//                             </button>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// }


"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function FormSubmittedModal({ open, onBack }) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    // Removed onClick={onClose} to prevent backdrop close
                >
                    {/* Card with smooth pop animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 16 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-6"
                        onClick={(e) => e.stopPropagation()} // Prevent card click from closing
                    >
                        {/* Header */}
                        <div className="flex items-start justify-center mb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center">
                                    <CheckCircle className="text-green-600" size={18} />
                                </div>
                                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                                    Registration Status
                                </h2>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5 text-center">
                            <div className="flex flex-col items-center gap-4">
                                <CheckCircle className="text-green-600" size={48} />
                                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                                    You have already registered!
                                </h3>
                                <p className="text-sm md:text-base text-gray-600">
                                    You have successfully completed the registration process for the Talent Hunt.
                                </p>
                            </div>
                        </div>

                        {/* Footer button */}
                        <div className="mt-6 flex justify-center">
                            <button
                                type="button"
                                onClick={onBack}
                                className="px-6 py-2.5 rounded-lg text-sm font-medium bg-purplee text-white hover:bg-purplee shadow-sm active:scale-95 transition"
                            >
                                Back to Home
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}