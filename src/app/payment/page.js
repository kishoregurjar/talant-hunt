
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {  ArrowRight} from "lucide-react";


export default function PaymentForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const onSubmit = (data) => {
    console.log(data);
    alert("✅ Payment Successful!");
    router.push("/skilldetail");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-30 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
        
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Scan & Pay
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Complete your Cricket Verse membership payment
          </p>
        </div>

      
        <div className="flex justify-center gap-3 mb-6">
          {["UPI", "Card", "Bank Transfer"].map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setPaymentMethod(method)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                paymentMethod === method
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-600 hover:bg-blue-50"
              }`}
            >
              {method}
            </button>
          ))}
        </div>

        {/* Conditional Payment Sections */}
        {paymentMethod === "UPI" && (
          <div className="text-center">
            <p className="text-gray-600 mb-3 text-sm">
              Scan the QR code below or enter UPI ID manually
            </p>
            <div className="flex justify-center mb-4">
              <Image
                src="/images/QR code.jpg"
                alt="UPI QR Code"
                width={180}
                height={180}
                className="rounded-lg border border-gray-200 shadow-sm"
              />
            </div>
            <input
              {...register("upiId")}
              type="text"
              placeholder="Enter your UPI ID (e.g. name@upi)"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
            <p className="text-xs text-gray-500 mt-3">
              Supported: Google Pay, PhonePe, Paytm, BHIM
            </p>
          </div>
        )}

        {paymentMethod === "Card" && (
          <div className="space-y-4">
            <input
              {...register("cardNumber")}
              type="text"
              placeholder="Card Number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="flex gap-4">
              <input
                {...register("expiry")}
                type="text"
                placeholder="MM/YY"
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                {...register("cvv")}
                type="text"
                placeholder="CVV"
                className="w-1/2 border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {paymentMethod === "Bank Transfer" && (
          <div className="space-y-4">
            <input
              {...register("accountNumber")}
              type="text"
              placeholder="Account Number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              {...register("ifsc")}
              type="text"
              placeholder="IFSC Code"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        )}

        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>

        {/* Action Button */}
        <button
          onClick={handleSubmit(onSubmit)}
          className=" inline-flex items-center justify-center gap-2 mt-8 px-6 py-3  text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium  rounded-lg text-lg transition-all shadow-sm hover:shadow-md"
        >
          Confirm Payment <ArrowRight size={14} />
        </button>

        <p className="text-center text-xs text-gray-500 mt-5">
          By proceeding, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms & Conditions
          </a>
        </p>
      </div>
      
    </div>
  );
}