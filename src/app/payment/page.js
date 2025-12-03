"use client";

import { useForm } from "react-hook-form";
import TermsModal from "../../components/modals/TermsModal.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Copy,
  Upload,
  Download,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  asynsQRScreeenShotUpload,
  asynsPaymentContinue,
} from "@/src/store/actions/userAction.js";
import {
  PaymentQR,
  downloadCanvasAsImage,
} from "../../components/paymentQR/page.js";

export default function PaymentForm() {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const router = useRouter();

  const [proofFile, setProofFile] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const {
    formFilled,
    videoWatched,
    id,
    quizAttemptId,
    quizCompleted,
    StudentScore,
    ScreenShot,
  } = useSelector((s) => s.playerReducer);
  const upiID = "indorecricketclub61537@sbi";
  const amount = "150";
  const canvasId = "talent-hunt-payment-QR";
  const upiURL = `upi://pay?pa=${upiID}&am=${amount}&cu=INR`;
  const transactionIdValue = watch("transactionId");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (formFilled === false) {
        router.push("/talenthunt");
      } else if (formFilled === true && videoWatched === false) {
        router.push("/video");
      } else if (
        formFilled === true &&
        videoWatched === true &&
        quizCompleted == false
      ) {
        router.push("/quiz");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [formFilled, videoWatched]);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiID);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
    console.log("Uploaded proof file:", proofFile);
    alert("✅ Payment Successful & Booking Confirmed!");
    router.push("/skilldetail");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setProofFile(file || null);
    setIsUploaded(false); // naya file
    localStorage.removeItem("screenshotUploaded");
  };

  const openFileDialog = () => {
    const input = document.getElementById("payment-proof-input");
    if (input) input.click();
  };

  const handleDownloadQR = () => {
    downloadCanvasAsImage(canvasId, "talent-hunt-payment-qr.png");
  };

  const uploadScreenshot = async () => {
    if (!proofFile || isUploading) return;

    try {
      setIsUploading(true);
      const ok = await dispatch(asynsQRScreeenShotUpload(proofFile)); // wait for upload
      if (ok) {
        localStorage.setItem("screenshotUploaded", "true");
        setIsUploaded(true); // success → “Uploaded” dikhao
      }
    } catch (error) {
      console.error("❌ Error while uploading screenshot:", error);
      alert("Upload failed, please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    // sirf browser me chale
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("screenshotUploaded");
    if (stored === "true") {
      setIsUploaded(true);
    }
  }, []);

  const PaymentContinueHandler = async () => {
    dispatch(asynsPaymentContinue(id, ScreenShot));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden mt-30">
        {/* HEADER */}
        <div className="flex items-start gap-4 p-4 ">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700">
              Talent Hunt Payment
            </h1>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 md:p-6 space-y-6"
        >
          {/* ---------- QR + UPLOAD RESPONSIVE GRID ---------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT: QR / PAYMENT BLOCK */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 h-full flex flex-col">
              <div className="flex flex-col items-center">
                {/* QR COMPONENT CALL */}
                <div className="mb-3">
                  <PaymentQR upiURL={upiURL} canvasId={canvasId} />
                </div>

                {/* UPI ID + COPY */}
                <div className="w-full mt-2">
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                    <div className="text-sm text-gray-700">Pay to:</div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[140px] sm:max-w-none">
                      {upiID}
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyUPI}
                      className="ml-3 relative text-gray-500 hover:text-gray-700"
                      title="Copy UPI ID"
                    >
                      <Copy className="text-gray-400" size={18} />

                      {copied && (
                        <span className="absolute -top-6 right-0 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-md shadow-md animate-fade">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Download QR + Amount (FULL WIDTH) */}
                  <div className="mt-4 space-y-3 w-full">
                    <button
                      type="button"
                      onClick={handleDownloadQR}
                      className="w-full flex justify-center items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50"
                    >
                      <Download className="text-gray-400" size={18} /> Download
                      QR
                    </button>

                    <div className="w-full rounded-lg bg-green-50 border border-green-200 py-3 text-center">
                      <div className="text-xs text-gray-600">
                        Payment Amount
                      </div>
                      <div className="text-xl font-semibold text-green-600">
                        ₹{amount}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  Choose your preferred UPI app or scan QR code.
                </p>
              </div>
            </div>

            {/* RIGHT: UPLOAD PAYMENT PROOF + TRANSACTION ID + BUTTONS + TERMS */}
            <div className=" rounded-lg border border-gray-200 p-4 flex flex-col h-full">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Upload className="text-gray-400" size={18} /> Upload Payment
                  Proof
                </h3>

                <input
                  id="payment-proof-input"
                  type="file"
                  {...register("paymentProof", { required: true })}
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Drop Zone */}
                <div className="border border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-blue-50/40 transition">
                  <div
                    className={`text-sm mb-3 border-gray-300 border-2 px-2 py-3 rounded-lg active:scale-98 ${
                      isUploaded
                        ? "text-green-700 bg-green-50 border-green-200 cursor-default"
                        : "text-black border-dashed hover:border-blue-400 cursor-pointer"
                    }`}
                    onClick={!isUploaded ? openFileDialog : undefined}
                  >
                    {isUploaded ? "✅ Screenshot uploaded" : "Click to upload"}
                  </div>

                  {/* If image selected → show preview */}
                  {proofFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={URL.createObjectURL(proofFile)}
                        alt="Preview"
                        className="h-20 w-auto rounded-md shadow border"
                      />

                      {!isUploaded ? (
                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={uploadScreenshot}
                            disabled={isUploading}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg inline-flex items-center gap-2"
                          >
                            {isUploading ? (
                              <>
                                <Loader2 size={16} className="animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              "Upload"
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setProofFile(null);
                              setIsUploaded(false);
                              localStorage.removeItem("screenshotUploaded");
                            }}
                            className="px-4 py-2 bg-red-400 hover:bg-red-400 text-white text-sm font-medium rounded-lg"
                          >
                            Clear
                          </button>
                        </div>
                      ) : (
                        <span className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg inline-flex items-center gap-2">
                          Uploaded <CheckCircle2 size={14} />
                        </span>
                      )}
                    </div>
                  ) : isUploaded ? (
                    <p className="text-xs text-gray-500 mt-3">
                      Your payment screenshot has been uploaded successfully
                      earlier. You can directly continue without uploading
                      again.
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-3">
                      Upload screenshot of your UPI transaction (PNG/JPG/WebP,
                      max 3MB)
                    </p>
                  )}
                </div>
              </div>

              {/* BUTTONS + TERMS pinned to bottom of right column */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    onClick={() => PaymentContinueHandler()}
                    disabled={!isUploaded}
                    className={`w-full sm:w-2/3 inline-flex items-center justify-center gap-2 px-6 py-3 
                      font-medium rounded-lg text-sm sm:text-base transition-all shadow-sm
                      ${
                        !isUploaded
                          ? "bg-blue-300 cursor-not-allowed opacity-50 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </div>

                <p className="text-center sm:text-left text-[11px] text-gray-500">
                  By proceeding, you agree to our{" "}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-blue-600 hover:underline"
                  >
                    Terms &amp; Conditions
                  </button>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Terms & Conditions modal (renders when `showTerms` is true) */}
      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />
    </div>
  );
}
