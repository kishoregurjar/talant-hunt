"use client";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { asyncUserPersonalInfo } from "../../store/actions/userAction";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../../components/validation/formvalidation";
import { State, City } from "country-state-city";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { formData } = useSelector((state) => state.playerReducer);
  const [loading, setLoading] = useState(true);
  const statesList = State.getStatesOfCountry("IN");


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm(
    {
      resolver: zodResolver(personalInfoSchema),
      defaultValues: formData || {},
    }
  );

  const formWatchData = watch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {

      const formValues = { ...formData };

      if (formValues.id) {
        delete formValues.id;
      }


      const hasFormValues = Object.values(formValues).some(
        value => value !== null && value !== undefined && value !== ''
      );

      if (hasFormValues) {

        reset(formValues, {
          keepDefaultValues: false
        });
      }
    }
  }, [formData, reset]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const hasData = Object.values(formWatchData).some(value => value !== undefined && value !== "");
      if (hasData) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formWatchData]);

  const onSubmit = async (data) => {
    console.log(data)
    await dispatch(asyncUserPersonalInfo(data));


    router.push("/video");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    //     <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 p-6 ">
    //       <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-4xl border border-blue-100 p-10 mt-30 transition duration-500 hover:-translate-y-1 hover:shadow-blue-200">
    //         <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
    //           Player Registration Form
    //         </h1>

    //         <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //           {/* Full Name */}
    //           <div className="col-span-1">
    //             <label className="block mb-1 font-medium text-gray-700">Full Name</label>
    //             <input
    //               {...register("name")}
    //               placeholder="Enter your full name"
    //               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    //             />
    //             {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
    //           </div>

    //           {/* Email */}
    //           <div className="col-span-1">
    //             <label className="block mb-1 font-medium text-gray-700">Email</label>
    //             <input
    //               {...register("email")}
    //               type="email"
    //               placeholder="Enter your email"
    //               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    //             />
    //             {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
    //           </div>

    //           {/* Phone */}
    //           <div>
    //             <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
    //             <input
    //               {...register("phone")}
    //               type="tel"
    //               placeholder="Enter your phone number"
    //               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    //             />
    //             {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
    //           </div>

    //           {/* Gender */}
    //           <div>
    //             <label className="block mb-1 font-medium text-gray-700">Gender</label>
    //             <select
    //               {...register("gender")}
    //               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    //             >
    //               <option value="">Select Gender</option>
    //               <option value="Male">Male</option>
    //               <option value="Female">Female</option>
    //               <option value="Other">Other</option>
    //             </select>
    //             {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
    //           </div>


    // <div>
    //   <label className="block mb-1 font-medium text-gray-700">Date of Birth</label>
    //   <div className="grid grid-cols-3 gap-3">
    //     {/* Month */}
    //     <select
    //       {...register("dob.month")}
    //       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    //       defaultValue=""
    //     >
    //       <option value="">Month</option>
    //       <option value="January">January</option>
    //       <option value="February">February</option>
    //       <option value="March">March</option>
    //       <option value="April">April</option>
    //       <option value="May">May</option>
    //       <option value="June">June</option>
    //       <option value="July">July</option>
    //       <option value="August">August</option>
    //       <option value="September">September</option>
    //       <option value="October">October</option>
    //       <option value="November">November</option>
    //       <option value="December">December</option>
    //     </select>

    //     {/* Day */}
    //     <input
    //       {...register("dob.day")}
    //       type="number"
    //       placeholder="Day"
    //       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    //       min="1"
    //       max="31"
    //     />

    //     {/* Year */}
    //     <input
    //       {...register("dob.year")}
    //       type="number"
    //       placeholder="Year"
    //       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    //       min="1900"
    //       max={new Date().getFullYear()}
    //     />
    //   </div>
    //   {errors.dob && (
    //     <p className="text-red-500 text-sm mt-1">
    //       {errors.dob.message ||
    //         errors.dob?.month?.message ||
    //         errors.dob?.day?.message ||
    //         errors.dob?.year?.message}
    //     </p>
    //   )}
    // </div>





    // {/* Permanent Address (object) */}
    // <div className="md:col-span-2">
    //   <label className="block mb-1 font-medium text-gray-700">Permanent Address</label>
    //   <input
    //     {...register("address.address")}
    //     placeholder="Apartment, suite, etc."
    //     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    //   />
    //   {errors.address?.address && (
    //     <p className="text-red-500 text-sm">{errors.address.address.message}</p>
    //   )}
    // </div>

    // {/* City / State / Zip - same row */}
    // <div className="md:col-span-2 grid grid-cols-3 gap-3">
    //   <div>
    //     <label className="block mb-1 font-medium text-gray-700">City</label>
    //     <input
    //       {...register("address.city")}
    //       placeholder="City"
    //       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    //     />
    //     {errors.address?.city && (
    //       <p className="text-red-500 text-sm">{errors.address.city.message}</p>
    //     )}
    //   </div>

    //   <div>
    //     <label className="block mb-1 font-medium text-gray-700">State</label>
    //     <select
    //       {...register("address.state")}
    //       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    //       defaultValue=""
    //     >
    //       <option value="">Select state</option>
    //       {statesList.map((s) => (
    //         <option key={s.code || s.name} value={s.name}>
    //           {s.name}
    //         </option>
    //       ))}
    //     </select>
    //     {errors.address?.state && (
    //       <p className="text-red-500 text-sm">{errors.address.state.message}</p>
    //     )}
    //   </div>

    //   <div>
    //     <label className="block mb-1 font-medium text-gray-700">Zip</label>
    //     <input
    //       {...register("address.zip")}
    //       placeholder="Zip code"
    //       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    //     />
    //     {errors.address?.zip && (
    //       <p className="text-red-500 text-sm">{errors.address.zip.message}</p>
    //     )}
    //   </div>
    // </div>



    //           {/* Submit Button */}
    //           <div className="md:col-span-2 flex justify-center mt-4">
    //             <button
    //               type="submit"
    //               className="px-10 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
    //             >
    //                Save & Continue
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </main>

    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-4xl border border-gray-200 mt-30 p-6 sm:p-10 transition duration-300 hover:shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Player Registration Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-gray-700">Full Name</label>
            <input
              {...register("name")}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Gender</label>
            <select
              {...register("gender")}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Date of Birth</label>
            <div className="grid grid-cols-3 gap-3">
              {/* Month */}
              <select
                {...register("dob.month")}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                defaultValue=""
              >
                <option value="">Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>

              {/* Day */}
              <input
                {...register("dob.day")}
                type="number"
                placeholder="Day"
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                min="1"
                max="31"
              />

              {/* Year */}
              <input
                {...register("dob.year")}
                type="number"
                placeholder="Year"
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dob.message ||
                  errors.dob?.month?.message ||
                  errors.dob?.day?.message ||
                  errors.dob?.year?.message}
              </p>
            )}
          </div>

          {/* Permanent Address */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">Permanent Address</label>
            <input
              {...register("address.address")}
              placeholder="Apartment, suite, etc."
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.address?.address && (
              <p className="text-red-500 text-sm">{errors.address.address.message}</p>
            )}
          </div>

          {/* City / State / Zip */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block mb-1 font-medium text-gray-700">City</label>
              <input
                {...register("address.city")}
                placeholder="City"
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.address?.city && (
                <p className="text-red-500 text-sm">{errors.address.city.message}</p>
              )}
            </div>

            <div className="relative overflow-visible">
              <label className="block mb-1 font-medium text-gray-700">State</label>
              <select
                {...register("address.state")}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none relative z-50"
                defaultValue=""
              >
                <option value="">Select state</option>
                {statesList.map((s) => (
                  <option key={s.code || s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              {errors.address?.state && (
                <p className="text-red-500 text-sm">{errors.address.state.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Zip</label>
              <input
                {...register("address.zip")}
                placeholder="Zip code"
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              {errors.address?.zip && (
                <p className="text-red-500 text-sm">{errors.address.zip.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="px-10 py-3 bg-blue-600 text-white rounded-lg font-semibold 
             shadow-md hover:bg-blue-700 hover:shadow-lg 
             active:scale-95 active:bg-blue-800 
             transition-transform transition-colors duration-200 ease-in-out"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </main>

  );
}












