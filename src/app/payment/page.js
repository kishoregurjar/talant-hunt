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
FileCheck 
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

// Import Shadcn Dialog components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function PaymentForm() {
  const {
    register,
    handleSubmit,
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
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { formFilled, videoWatched, id, quizCompleted, ScreenShot, formData } =
    useSelector((s) => s.playerReducer);

  const upiID = "indorecricketclub61537@sbi";
  const amount = "150";
  const canvasId = "talent-hunt-payment-QR";
  const upiURL = `upi://pay?pa=${upiID}&am=${amount}&cu=INR`;

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
  }, [formFilled, videoWatched, quizCompleted, router]);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiID);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
    console.log("Uploaded proof file:", proofFile);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setProofFile(file || null);
    setIsUploaded(false);
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
      const ok = await dispatch(asynsQRScreeenShotUpload(proofFile));
      if (ok) {
        localStorage.setItem("screenshotUploaded", "true");
        setIsUploaded(true);
      }
    } catch (error) {
      console.error("❌ Error while uploading screenshot:", error);
      alert("Upload failed, please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("screenshotUploaded");
    if (stored === "true") {
      setIsUploaded(true);
    }
  }, []);

  const PaymentContinueHandler = async () => {
    dispatch(asynsPaymentContinue(id, ScreenShot));
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    router.push("/skilldetail");
  };

  const getFormattedDate = () => {
    return new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden mt-30">
        {/* HEADER */}
        <div className="flex items-start gap-4 p-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-purplee">
              Talent Hunt Payment
            </h1>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 md:p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT: QR / PAYMENT BLOCK */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 h-full flex flex-col">
              <div className="flex flex-col items-center">
                <div className="mb-3">
                  <PaymentQR upiURL={upiURL} canvasId={canvasId} />
                </div>

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
                        <span className="absolute -top-6 right-0 bg-purplee text-white text-[10px] px-2 py-0.5 rounded-md shadow-md animate-fade">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>

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

            {/* RIGHT: UPLOAD PAYMENT PROOF */}
            <div className="rounded-lg border border-gray-200 p-4 flex flex-col h-full">
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

                <div className="border border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-blue-50/40 transition">
                  <div
                    className={`text-sm mb-3 flex items-center justify-center border-gray-300 border-2 px-2 py-3 rounded-lg active:scale-98 ${
                      isUploaded
                        ? "text-green-700 bg-green-50 border-green-200 cursor-default"
                        : "text-black border-dashed hover:border-purplee cursor-pointer"
                    }`}
                    onClick={!isUploaded ? openFileDialog : undefined}
                  >
                    {isUploaded ? (
                      <span className="flex items-center text-center gap-2">
                        <FileCheck
                          size={22}                                      
                          className="text-green-600"
                        />
                        Screenshot uploaded
                      </span>
                    ) : (
                      "Click to upload"
                    )}
                  </div>

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
                            className="px-4 py-2 bg-purplee cursor-pointer disabled:bg-purplee disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg inline-flex items-center gap-2"
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
                            className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white text-sm font-medium rounded-lg"
                          >
                            Clear
                          </button>
                        </div>
                      ) : (
                        <span className="px-4 py-2 bg-purplee text-white text-sm font-medium rounded-lg inline-flex items-center gap-2">
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

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  {/* FIXED: type="button" prevents form blocking */}
                  <button
                    type="button"
                    onClick={PaymentContinueHandler}
                    disabled={!isUploaded}
                    className={`w-full sm:w-2/3 inline-flex items-center justify-center gap-2 px-6 py-3 
                      font-medium rounded-lg text-sm sm:text-base transition-all shadow-sm
                      ${
                        !isUploaded
                          ? "bg-purplee cursor-not-allowed opacity-50 text-white"
                          : "bg-purplee  text-white"
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
                    className="text-purplee hover:underline"
                  >
                    Terms &amp; Conditions
                  </button>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Terms & Conditions modal */}
      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />

      {/* Shadcn Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent
          // className="sm:max-w-md max-h-[90vh] overflow-y-auto"
          className="sm:max-w-md max-h-[90vh] overflow-y-auto no-scrollbar"
          onWheel={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Payment Confirmation
            </DialogTitle>
            <DialogDescription className="sr-only">
              Your payment has been processed successfully
            </DialogDescription>
          </DialogHeader>

          {/* Success Banner - IMPROVED VISIBILITY */}
          <div className="bg-green-50 border border-green-100 rounded-xl p-6 flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="text-green-600 h-8 w-8" />
            </div>

            <h3 className="text-xl font-bold text-green-700 mb-4">
              Payment Successful!
            </h3>

            {/* Made this text much larger and darker for immediate visibility */}
            <p className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug mb-2">
              Your payment has been processed successfully.
            </p>

            <p className="text-sm sm:text-base text-gray-600 font-medium">
              You will receive a confirmation email shortly.
            </p>
          </div>

          {/* Details Sections */}
          <div className="space-y-4 mt-4">
            {/* Registration Details */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Registration Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-900 text-right max-w-[60%] break-words">
                    {formData?.name || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium text-gray-900 text-right max-w-[60%] break-all">
                    {formData?.email || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium text-gray-900 text-right">
                    {formData?.phone || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Payment Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-gray-900 text-right">
                    {getFormattedDate()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200">
                  <span className="font-medium text-gray-900">Amount Paid</span>
                  <span className="text-lg font-bold text-green-600">
                    ₹{amount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            Please check your inbox for further instructions.
          </p>

          <DialogFooter className="mt-4">
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full py-3.5 px-4 bg-purplee  text-white text-sm sm:text-base font-semibold rounded-xl shadow-md hover:shadow-lg transform transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Confirm & Continue <ArrowRight size={18} />
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
