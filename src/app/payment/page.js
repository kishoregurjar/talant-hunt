"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ArrowRight, Copy, Upload, Download } from "lucide-react";
import { useState } from "react";
import { asynsQRScreeenShotUpload } from "@/src/store/actions/userAction.js";
import {
  PaymentQR,
  downloadCanvasAsImage,
} from "../../components/paymentQR/page.js";

export default function PaymentForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const [proofFile, setProofFile] = useState(null);
  const upiID = "indorecricketclub61537@sbi";
  const amount = "150";
  const canvasId = "talent-hunt-payment-QR";
  const upiURL = `upi://pay?pa=${upiID}&am=${amount}&cu=INR`;

  const onSubmit = (data) => {
    console.log("Form data:", data);
    console.log("Uploaded proof file:", proofFile);
    alert("✅ Payment Successful & Booking Confirmed!");
    router.push("/skilldetail");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setProofFile(file || null);
  };

  const openFileDialog = () => {
    const input = document.getElementById("payment-proof-input");
    if (input) input.click();
  };

  const handleDownloadQR = () => {
    downloadCanvasAsImage(canvasId, "talent-hunt-payment-qr.png");
  };

 

  const uploadScreenshot = async () => {
    if (!proofFile) {
      alert("Please upload payment screenshot first!");
      return;
    }
    await dispatch(asynsQRScreeenShotUpload(proofFile));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl overflow-hidden mt-30">
        {/* HEADER */}
        <div className="flex items-start gap-4 p-4 border-b border-gray-100">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700">
              Talent Hunt Payment
            </h1>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* ---------- QR / PAYMENT BLOCK ---------- */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 ">
            <div className="flex flex-col items-center">
              {/* QR COMPONENT CALL */}
              <div className="mb-3">
                <PaymentQR upiURL={upiURL} canvasId={canvasId} />
              </div>

              {/* UPI ID + COPY */}
              <div className="w-full mt-2">
                <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                  <div className="text-sm text-gray-700">Pay to:</div>
                  <div className="text-sm font-medium text-gray-900">
                    {upiID}
                  </div>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(upiID)}
                    className="ml-3 text-gray-500 hover:text-gray-700"
                    title="Copy UPI ID"
                  >
                    <Copy className="text-gray-400" size={18} />
                  </button>
                </div>

                {/* Download QR + Amount (FULL WIDTH) */}
                <div className="mt-4 space-y-3 w-full">
                  <button
                    type="button"
                    onClick={handleDownloadQR} 
                    className="w-full flex justify-center items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50"
                  >
                    <Download className="text-gray-400" size={18} /> Download QR
                  </button>

                  <div className="w-full rounded-lg bg-green-50 border border-green-200 py-3 text-center">
                    <div className="text-xs text-gray-600">Payment Amount</div>
                    <div className="text-xl font-semibold text-green-600">
                      ₹{amount}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Choose your preferred UPI app or scan QR code.
              </p>
            </div>
          </div>

          {/* ---------- UPLOAD PAYMENT PROOF BLOCK ---------- */}
          <div className="pt-2 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Upload className="text-gray-400" size={18} /> Upload Payment
              Proof
            </h3>

            <input
              id="payment-proof-input"
              type="file"
              {...register("paymentProof", {required: true})}
              accept="image/png,image/jpeg,image/jpg,image/webp"
              className="hidden"
              onChange={handleFileChange}
            
            />

            {/* Drop Zone */}
            <div
              
              className="border  border-gray-300 rounded-xl p-6 text-center cursor-pointer  hover:bg-blue-50/40 transition"
            >
              <div
                className="text-sm text-black mb-3 border-gray-300 border-2 border-dashed  px-2 py-3 rounded-lg active:scale-98 hover:border-blue-400 "
                onClick={openFileDialog}
              >
                Drag &amp; drop or click to upload
              </div>

              {/* If image selected → show preview */}
              {proofFile ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={URL.createObjectURL(proofFile)}
                    alt="Preview"
                    className="h-20 w-auto rounded-md shadow border"
                  />

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => uploadScreenshot()}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg"
                    >
                      Upload
                    </button>

                    <button
                      type="button"
                      onClick={() => setProofFile(null)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-xs text-gray-500 mt-3">
                    Upload screenshot of your UPI transaction (PNG/JPG/WebP, max
                    3MB)
                  </p>
                </>
              )}
            </div>

            {/* Transaction ID input */}
            <div className="mt-5">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Transaction ID / UTR / UPI Ref No{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                {...register("transactionId", {required: true})}
                placeholder="Enter 12 digit Transaction/UTR/Ref No"
                className="w-full border border-gray-300  rounded-lg px-4 py-2 text-sm
             focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              {errors.transactionId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.transactionId.message}
                </p>
              )}

              <p className="text-[11px] text-gray-500 mt-2">
                Please enter the 12 digit number shown in your UPI payment
                receipt.
              </p>
            </div>
          </div>

          {/* ---------- ACTION BUTTONS ---------- */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
             
              className="w-full sm:w-2/3 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm sm:text-base transition-shadow shadow-sm"
            >
              Confirm Payment <ArrowRight size={16} />
            </button>
          </div>

          <p className="text-center text-[11px] text-gray-500 mt-3">
            By proceeding, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms &amp; Conditions
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
