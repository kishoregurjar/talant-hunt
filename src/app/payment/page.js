// "use client";

// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function PaymentForm() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [paymentMethod, setPaymentMethod] = useState("Card");
//   const router = useRouter(); 

//   const onSubmit = (data) => {
//     console.log(data);
//     alert("Payment submitted successfully!");
//     router.push("/skillform");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center  from-gray-100 to-gray mt-30 p-4">
//       <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-100 transition-all duration-300 hover:shadow-xl">
//         <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
//           Cricket Verse Payment
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Name & Email */}
//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Full Name</label>
//               <input
//                 {...register("name", { required: "Full name is required" })}
//                 type="text"
//                 placeholder="e.g. Virat Sharma"
//                 className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//               {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600">Email Address</label>
//               <input
//                 {...register("email", { required: "Email is required" })}
//                 type="email"
//                 placeholder="e.g. virat@gmail.com"
//                 className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//               {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
//             </div>
//           </div>

//           {/* Event & Plan */}
//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Select Event</label>
//               <select
//                 {...register("event", { required: "Select an event" })}
//                 className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               >
//                 <option value="">Select Event</option>
//                 <option value="T20 Tournament">T20 Tournament</option>
//                 <option value="One Day Match">One Day Match</option>
//                 <option value="Test Match">Test Match</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600">Membership Plan</label>
//               <select
//                 {...register("plan", { required: "Select a plan" })}
//                 className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               >
//                 <option value="">Select Plan</option>
//                 <option value="Monthly">Monthly – ₹499</option>
//                 <option value="Annual">Annual – ₹4999 (Save 20%)</option>
//               </select>
//             </div>
//           </div>

//           {/* Payment Method Buttons */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-3">Payment Method</label>
//             <div className="flex justify-between gap-3">
//               {["Card", "UPI", "Bank Transfer"].map((method) => (
//                 <button
//                   key={method}
//                   type="button"
//                   onClick={() => setPaymentMethod(method)}
//                   className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${
//                     paymentMethod === method
//                       ? "border-blue-600 text-blue-700 bg-blue-50 shadow-sm"
//                       : "border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-300"
//                   }`}
//                 >
//                   {method}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Conditional Payment Fields */}
//           {paymentMethod === "Card" && (
//             <div className="space-y-4">
//               <input
//                 {...register("cardNumber")}
//                 type="text"
//                 placeholder="Card Number"
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//               <div className="flex gap-4">
//                 <input
//                   {...register("expiry")}
//                   type="text"
//                   placeholder="MM/YY"
//                   className="w-1/2 border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 />
//                 <input
//                   {...register("cvv")}
//                   type="text"
//                   placeholder="CVV"
//                   className="w-1/2 border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 />
//               </div>
//             </div>
//           )}

//           {paymentMethod === "UPI" && (
//             <div className="text-center">
//               <input
//                 {...register("upiId")}
//                 type="text"
//                 placeholder="yourname@upi"
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//               <p className="text-gray-500 text-sm mt-3">
//                 Scan the QR code below to complete your payment
//               </p>
//               <img
//                 src="/images/QR code.jpg"
//                 alt="UPI QR"
//                 className="mx-auto mt-3 w-40 h-40 rounded-lg border border-gray-200 shadow-sm"
//               />
//             </div>
//           )}

//           {paymentMethod === "Bank Transfer" && (
//             <div className="space-y-4">
//               <input
//                 {...register("accountNumber")}
//                 type="text"
//                 placeholder="Account Number"
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//               <input
//                 {...register("ifsc")}
//                 type="text"
//                 placeholder="IFSC Code"
//                 className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               />
//             </div>
//           )}

//           {/* Pay Now Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
//           >
//             Pay Now
//           </button>
//         </form>

//         <p className="text-center text-xs text-gray-500 mt-6">
//           By proceeding, you agree to our{" "}
//           <a href="#" className="text-blue-600 hover:underline">
//             Terms & Conditions
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function PaymentForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const onSubmit = (data) => {
    console.log(data);
    alert("✅ Payment Successful!");
    router.push("/skillform");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-30 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Scan & Pay
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Complete your Cricket Verse membership payment
          </p>
        </div>

        {/* Payment Method Tabs */}
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg text-lg transition-all shadow-sm hover:shadow-md"
        >
          Confirm Payment →
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