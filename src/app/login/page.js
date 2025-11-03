"use client";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { saveFormData, restoreFormData, updateFormData } from "../../store/PlayerSlice";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { useEffect } from "react";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  // Watch all form fields
  const formData = watch();

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    // Only save if at least one field has a value
    if (Object.values(formData).some(value => value !== undefined && value !== "")) {
      localStorage.setItem("tempFormData", JSON.stringify(formData));
    }
  }, [formData]);

  // Load saved form data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("tempFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach(key => {
          // Set form values from saved data
          if (parsedData[key] !== "") {
            setValue(key, parsedData[key]);
          }
        });
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }, [setValue]);

  // Warn user before leaving the page if form has data
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Check if any form field has a value
      const hasData = Object.values(formData).some(value => value !== undefined && value !== "");
      if (hasData) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
        return ""; // Required for other browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formData]);

  const onSubmit = (data) => {
    // Get existing players from localStorage
    const existingPlayers = JSON.parse(localStorage.getItem("players")) || [];

    // Check if we have temporary form data with an existing ID
    let playerId = data.id;
    const tempFormData = localStorage.getItem("tempFormData");
    
    // If no ID in current data but we have temp data with an ID, use that ID
    if (!playerId && tempFormData) {
      try {
        const parsedTempData = JSON.parse(tempFormData);
        if (parsedTempData.id) {
          playerId = parsedTempData.id;
          data.id = playerId;
        }
      } catch (e) {
        console.error("Failed to parse temp form data", e);
      }
    }
    
    // If still no ID, generate one
    if (!playerId) {
      playerId = nanoid();
      data.id = playerId;
    }

    // Check if player with this ID already exists
    const playerExists = existingPlayers.some(player => player.id === playerId);

    // Update existing player or add new one
    let updatedPlayers = [];
    if (playerExists) {
      // Update existing player data
      updatedPlayers = existingPlayers.map(player => 
        player.id === playerId ? {...data} : player
      );
    } else {
      // Add new player
      updatedPlayers = [...existingPlayers, data];
    }

    // Save back to localStorage
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
    
    // Clear temporary form data
    localStorage.removeItem("tempFormData");

    // Dispatch to redux store
    if (!playerExists) {
      dispatch(saveFormData(data));
    } else {
      dispatch(updateFormData(data));
    }

    // Redirect
    router.push("/video");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 p-6 ">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-4xl border border-blue-100 p-10 mt-30 transition duration-500 hover:-translate-y-1 hover:shadow-blue-200">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Player Registration Form
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-gray-700">Full Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
            <input
              {...register("phone", {
                required: "Phone number is required",
                minLength: { value: 10, message: "Must be 10 digits" },
                maxLength: { value: 10, message: "Must be 10 digits" },
              })}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
            <input
              {...register("dob", { required: "Date of Birth is required" })}
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>

          {/* Permanent Address */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">Permanent Address</label>
            <textarea
              {...register("permanentAddress", { required: "Permanent address is required" })}
              placeholder="Enter your permanent address"
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
            {errors.permanentAddress && (
              <p className="text-red-500 text-sm">{errors.permanentAddress.message}</p>
            )}
          </div>

          {/* Current Address */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">Current Address</label>
            <textarea
              {...register("currentAddress", { required: "Current address is required" })}
              placeholder="Enter your current address"
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            ></textarea>
            {errors.currentAddress && (
              <p className="text-red-500 text-sm">{errors.currentAddress.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="px-10 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Continue
            </button>
          </div>
        </form>
      </div>


    </main>
  );
}