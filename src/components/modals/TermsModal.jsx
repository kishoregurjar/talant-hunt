// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { X, ShieldCheck } from "lucide-react";
// import { useEffect } from "react";

// export default function TermsModal({ open, onClose }) {

//   // 🔒 BACKGROUND SCROLL LOCK
//   useEffect(() => {
//     if (open) {
//       document.body.style.overflow = "hidden";
//       document.body.style.touchAction = "none";
//     } else {
//       document.body.style.overflow = "";
//       document.body.style.touchAction = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//       document.body.style.touchAction = "";
//     };
//   }, [open]);

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           className="fixed inset-0 z-[100] flex items-start md:items-center justify-center bg-black/40 backdrop-blur-[2px] p-3 sm:p-4 overflow-hidden"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose}
//         >
//           {/* Card */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.96, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.96, y: 20 }}
//             transition={{ duration: 0.25, ease: "easeOut" }}
//             onClick={(e) => e.stopPropagation()}
//             className="
//               w-full
//               max-w-2xl
//               bg-white
//               rounded-2xl
//               shadow-xl
//               border border-gray-200
//               flex flex-col
//               max-h-[90vh]
//             "
//           >
//             {/* Header */}
//             <div className="flex items-start justify-between gap-3 px-4 py-4 md:px-6 border-b border-gray-200">
//               <div className="flex items-center gap-2">
//                 <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
//                   <ShieldCheck className="text-blue-600" size={18} />
//                 </div>
//                 <h2 className="text-base md:text-lg font-semibold text-gray-900 leading-snug">
//                   Payment Terms & Conditions (भुगतान से संबंधित नियम एवं शर्तें)
//                 </h2>
//               </div>

//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="text-gray-400 hover:text-gray-600 transition mt-1"
//                 aria-label="Close terms and conditions"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             {/* Scrollable Content (ONLY MODAL CONTENT SCROLLS) */}
//             <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
//               <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
//                 <ul className="list-disc list-inside text-sm md:text-[15px] text-gray-800 space-y-3">
//                   <li>
//                     A payment of <strong>₹149</strong> is mandatory to complete the registration process.
//                     <br />
//                     <span className="text-gray-600">
//                       (रजिस्ट्रेशन प्रक्रिया पूरी करने के लिए ₹149 का भुगतान
//                       अनिवार्य है।)
//                     </span>
//                   </li>

//                   <li>
//                     This fee is only for registration/processing and does{" "}
//                     <strong>not guarantee selection or admission</strong>.
//                     <br />
//                     <span className="text-gray-600">
//                       (यह शुल्क केवल रजिस्ट्रेशन/प्रोसेसिंग के लिए है, इससे चयन या
//                       प्रवेश की कोई गारंटी नहीं देता है।)
//                     </span>
//                   </li>

//                   <li>
//                     Once paid, the amount is <strong>non-refundable and non-transferable</strong>. in any case.{" "}

//                     <br />
//                     <span className="text-gray-600">
//                       (एक बार भुगतान करने के बाद यह राशि किसी भी स्थिति में वापस
//                       नहीं की जाएगी और न ही ट्रांसफर की जा सकती है।)
//                     </span>
//                   </li>

//                   <li>
//                     Payments must be made only through the official <strong>QR code, UPI ID, or account details</strong>.provided here.{" "}

//                     <br />
//                     <span className="text-gray-600">
//                       (भुगतान केवल यहाँ दिए गए आधिकारिक QR कोड, UPI ID या अकाउंट
//                       डिटेल्स के माध्यम से ही करें।)
//                     </span>
//                   </li>

//                   <li>
//                    Please ensure correct payment details while paying. The academy is not responsible for wrong or failed transfers due to user error.
//                     <br />
//                     <span className="text-gray-600">
//                       (कृपया भुगतान करते समय सही भुगतान विवरण सुनिश्चित करें। उपयोगकर्ता की त्रुटि के कारण गलत या असफल स्थानांतरण के लिए अकैडमी जिम्मेदार नहीं है।)
//                     </span>
//                   </li>

//                   <li>
//                     In case of technical issues or duplicate payment, the matter must be reported within <strong>48 hours </strong> with valid transaction proof.

//                     <br />
//                     <span className="text-gray-600">
//                       (तकनीकी समस्याओं या डुप्लिकेट भुगतान के मामले में, मामले को वैध लेनदेन प्रमाण के साथ 48 घंटे के भीतर रिपोर्ट किया जाना चाहिए।)
//                     </span>
//                   </li>

//                   <li>
//                     The academy reserves the right to cancel or reject any registration found to be incorrect or against academy rules{" "}
//                     <strong>without refund</strong>.
//                       <span className="text-gray-600">
//                       (अकैडमी किसी भी पंजीकरण को गलत या अकैडमी नियमों के विरुद्ध पाए जाने पर बिना रिफंड के रद्द या अस्वीकार करने का अधिकार सुरक्षित रखती है।)
//                     </span>

//                   </li>

//                   <li>
//                     Successful payment confirmation is required to proceed further
//                        <span className="text-gray-600">
//                       (आगे बढ़ने के लिए सफल भुगतान की पुष्टि आवश्यक है।)
//                     </span>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="px-4 py-4 md:px-6 border-t border-gray-200 flex justify-end">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 md:px-5 md:py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm active:scale-95 transition"
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }



"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";
import { useEffect, useCallback } from "react";

export default function TermsModal({ open, onClose }) {
  // 🔥 PERFECT SCROLL LOCK - NO EXCEPTIONS
  useEffect(() => {
    if (!open) return;

    // Save scroll position
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Lock body COMPLETELY
    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: "0",
      right: "0",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      margin: "0",
      touchAction: "none",
    });

    // Lock html element bhi
    Object.assign(document.documentElement.style, {
      overflow: "hidden",
      height: "100%",
    });

    return () => {
      // PERFECT RESTORE
      const restoreScrollY = parseInt(document.body.style.top || "0") * -1;
      Object.assign(document.body.style, {
        position: "",
        top: "",
        left: "",
        right: "",
        width: "",
        height: "",
        overflow: "",
        margin: "",
        touchAction: "",
      });

      Object.assign(document.documentElement.style, {
        overflow: "",
        height: "",
      });

      window.scrollTo(0, restoreScrollY);
    };
  }, [open]);

  // Prevent background scroll events
  const preventScroll = useCallback(
    (e) => {
      if (open) {
        e.preventDefault();
        return false;
      }
    },
    [open],
  );

  useEffect(() => {
    if (open) {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [open, preventScroll]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* FULL SCREEN OVERLAY - NO SCROLL POSSIBLE */}
          <motion.div
            className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* MODAL CARD */}
          <motion.div
            className="fixed inset-0 z-[100000] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] pointer-events-auto flex flex-col bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-4 p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Payment Terms & Conditions
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      (भुगतान से संबंधित नियम एवं शर्तें)
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all -m-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Content (ONLY MODAL CONTENT SCROLLS) */}
              <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-5">
                  <ul className="list-disc list-inside text-sm md:text-[15px] text-gray-800 space-y-3">
                    <li>
                      A payment of <strong>₹149</strong> is mandatory to
                      complete the registration process.
                      <br />
                      <span className="text-gray-600">
                        (रजिस्ट्रेशन प्रक्रिया पूरी करने के लिए ₹149 का भुगतान
                        अनिवार्य है।)
                      </span>
                    </li>

                    <li>
                      This fee is only for registration/processing and does{" "}
                      <strong>not guarantee selection or admission</strong>.
                      <br />
                      <span className="text-gray-600">
                        (यह शुल्क केवल रजिस्ट्रेशन/प्रोसेसिंग के लिए है, इससे
                        चयन या प्रवेश की कोई गारंटी नहीं देता है।)
                      </span>
                    </li>

                    <li>
                      Once paid, the amount is{" "}
                      <strong>non-refundable and non-transferable</strong>. in
                      any case. <br />
                      <span className="text-gray-600">
                        (एक बार भुगतान करने के बाद यह राशि किसी भी स्थिति में
                        वापस नहीं की जाएगी और न ही ट्रांसफर की जा सकती है।)
                      </span>
                    </li>

                    <li>
                      Payments must be made only through the official{" "}
                      <strong>QR code, UPI ID, or account details</strong>
                      .provided here. <br />
                      <span className="text-gray-600">
                        (भुगतान केवल यहाँ दिए गए आधिकारिक QR कोड, UPI ID या
                        अकाउंट डिटेल्स के माध्यम से ही करें।)
                      </span>
                    </li>

                    <li>
                      Please ensure correct payment details while paying. The
                      academy is not responsible for wrong or failed transfers
                      due to user error.
                      <br />
                      <span className="text-gray-600">
                        (कृपया भुगतान करते समय सही भुगतान विवरण सुनिश्चित करें।
                        उपयोगकर्ता की त्रुटि के कारण गलत या असफल स्थानांतरण के
                        लिए अकैडमी जिम्मेदार नहीं है।)
                      </span>
                    </li>

                    <li>
                      In case of technical issues or duplicate payment, the
                      matter must be reported within <strong>48 hours </strong>{" "}
                      with valid transaction proof.
                      <br />
                      <span className="text-gray-600">
                        (तकनीकी समस्याओं या डुप्लिकेट भुगतान के मामले में, मामले
                        को वैध लेनदेन प्रमाण के साथ 48 घंटे के भीतर रिपोर्ट किया
                        जाना चाहिए।)
                      </span>
                    </li>

                    <li>
                      The academy reserves the right to cancel or reject any
                      registration found to be incorrect or against academy
                      rules <strong>without refund</strong>.
                      <span className="text-gray-600">
                        (अकैडमी किसी भी पंजीकरण को गलत या अकैडमी नियमों के
                        विरुद्ध पाए जाने पर बिना रिफंड के रद्द या अस्वीकार करने
                        का अधिकार सुरक्षित रखती है।)
                      </span>
                    </li>

                    <li>
                      Successful payment confirmation is required to proceed
                      further
                      <span className="text-gray-600">
                        (आगे बढ़ने के लिए सफल भुगतान की पुष्टि आवश्यक है।)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-4 md:px-6 border-t border-gray-200 flex justify-end">
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
        </>
      )}
    </AnimatePresence>
  );
}
