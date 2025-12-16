"use client";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { asyncUserPersonalInfo } from "../../store/actions/userAction";
import { motion } from "framer-motion";
import CustomSelect from "../../components/CustomSelect";
import FormSubmittedModal from "../../components/modals/formSubmittedModal";

import {
  Camera,
  User,
  CircleCheckBig,
  Mail,
  Phone,
  MapPin,
  Calendar,
  VenusAndMars,
  Home,
  ShieldX,
  ArrowRight,
  Navigation,
  ChevronDown,
  Landmark,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoValidator } from "../../components/validation/personalInfoValidator";
import { State } from "country-state-city";
import { toast } from "react-toastify";

export default function talenthunt() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { formData, formFilled, videoWatched, quizCompleted } = useSelector(
    (state) => state.playerReducer
  );
  const talentFormfilled = localStorage.getItem("talentFormfilled");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const statesList = State.getStatesOfCountry("IN");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
  } = useForm({
    resolver: zodResolver(personalInfoValidator),
    defaultValues: formData || {},
  });

  const formWatchData = watch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);



useEffect(() => {
  const talentFormfilled = localStorage.getItem("talentFormfilled");

  if (
    formFilled &&
    videoWatched &&
    quizCompleted &&  
    talentFormfilled
  ) {
    setShowModal(true);
  }
}, [formFilled, videoWatched, quizCompleted, talentFormfilled]);

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      const formValues = { ...formData };
      if (formValues.id) delete formValues.id;

      const hasFormValues = Object.values(formValues).some(
        (value) => value !== null && value !== undefined && value !== ""
      );
      if (hasFormValues) reset(formValues, { keepDefaultValues: false });
    }
  }, [formData, reset]);






  const onSubmit = async (data) => {
    console.log(data);

    if (
      formFilled === true &&
      videoWatched === false &&
      quizCompleted === false
    ) {
      router.push("/video");
      return;
    } else if (
      formFilled === true &&
      videoWatched === true &&
      quizCompleted === false
    ) {
      router.push("/quiz");
      return;
    } else if (
      formFilled === true &&
      videoWatched === true &&
      quizCompleted === true
    ) {
      router.push("/payment");
      return;
    }

    try {
      setSubmitting(true);
      const result = await dispatch(asyncUserPersonalInfo(data));
      console.log("Result:", result);
      if (result) {
        toast.success("Personal information saved successfully!", {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,

          icon: (
            <span className="text-purplee text-xl   font-bold">
              <CircleCheckBig />
            </span>
          ),
        });

        setLoading(false);
        router.push("/video");  


        
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center   bg-[#FEFEFF] p-4 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white md:rounded-2xl rounded-xl shadow-xl  w-full max-w-4xl border border-gray-200 mt-30 p-4 sm:p-10 transition duration-300 "
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          // className="text-3xl md:text-4xl font-bold mb-8 text-center text-blue-700 "
          className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#352E74] "
        >
          Player Registration Form
        </motion.h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-5"
        >
          {/* Full Name */}
          <div>
            <label className="block mb-1 text-m font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                {...register("name")}
                type="text"
                placeholder="Virat Kohli"
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purplee outline-none"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-m font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                {...register("email")}
                placeholder="virat.kohli18@example.com"
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purplee  outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-m font-medium text-gray-700">
              Phone Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                {...register("phone")}
                type="number"
                placeholder="9876543210"
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purplee  outline-none"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-1 text-m font-medium text-gray-700">
              Gender
            </label>
            <Controller
              name="gender"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <CustomSelect
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "  Other" },
                  ]}
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder="Select your Gender"
                  icon={VenusAndMars}
                  error={errors.level?.message}
                />
              )}
            />
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-m font-medium text-gray-700">
              Date of Birth
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3  gap-3">
              <div className="relative col-span-1">
                <Calendar
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  {...register("dob.day")}
                  type="number"
                  placeholder="Day"
                  min="1"
                  max="31"
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purplee outline-none"
                />
                
              </div>
             
              <div>
 

  <Controller
    name="dob.month"
    control={control}
    defaultValue=""
    render={({ field }) => (
      <CustomSelect
        options={[
          { value: "January", label: "January" },
          { value: "February", label: "February" },
          { value: "March", label: "March" },
          { value: "April", label: "April" },
          { value: "May", label: "May" },
          { value: "June", label: "June" },
          { value: "July", label: "July" },
          { value: "August", label: "August" },
          { value: "September", label: "September" },
          { value: "October", label: "October" },
          { value: "November", label: "November" },
          { value: "December", label: "December" },
        ]}
        value={field.value || ""}
        onChange={field.onChange}
        placeholder="Month"
                    icon={Calendar}

        // error={errors?.dob?.month?.message}
      />
    )}
  />

  {errors?.dob?.month && (
    <p className="text-red-500 text-sm">
      {errors.dob.month.message}
    </p>
  )}
</div>


              <div className=" relative">
                <Calendar
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <input
                  {...register("dob.year")}
                  type="number"
                  placeholder="Year"
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full pl-10 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purplee outline-none"
                />
              </div>
            </div>
            {/* {errors.dob && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dob.message ||
                  errors.dob?.day?.message ||
                  errors.dob?.month?.message ||
                  errors.dob?.year?.message}
              </p>
            )} */}
          </div>



          {/* Address */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-m font-medium text-gray-700">
              Permanent Address
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                {...register("address.address")}
                placeholder="House no., street, locality"
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purplee outline-none"
              />
            </div>
            {errors.address?.address && (
              <p className="text-red-500 text-sm">
                {errors.address.address.message}
              </p>
            )}
          </div>

          {/* City, State, Zip */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <MapPin
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                {...register("address.city")}
                placeholder="City"
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purplee outline-none"
              />
              {errors.address?.city && (
                <p className="text-red-500 text-sm">
                  {errors.address.city.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Navigation
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <ChevronDown
                className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                size={18}
              />

              <Controller
                name="address.state"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    options={statesList.map((s) => ({
                      value: s.name,
                      label: s.name,
                    }))}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select State"
                    icon={Navigation}
                    // error={errors.address?.state?.message}
                  />
                )}
              />
              {errors.address?.state && (
                <p className="text-red-500 text-sm">
                  {errors.address.state.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Landmark
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />
              <input
                {...register("address.zip")}
                placeholder="Zip code"
                className="w-full pl-10 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purplee outline-none"
              />
              {errors.address?.zip && (
                <p className="text-red-500 text-sm">
                  {errors.address.zip.message}
                </p>
              )}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="md:col-span-2 bg-gray-50 border border-gray-200 p-4 rounded-lg mt-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Terms & Conditions
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm mb-3">
              <li>
                I confirm that all the details provided are accurate and true.
              </li>
              <li>
                I understand that false information may lead to
                disqualification.
              </li>
              <li>
                I consent to the use of my data for registration and
                verification.
              </li>
            </ul>
            <div className="flex items-start">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must agree to the Terms & Conditions",
                })}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-purplee"
              />
              <label className="ml-2 text-sm text-gray-700">
                I have read and agree to the Terms & Conditions.
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">
                {errors.terms.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="md:col-span-2 flex justify-center mt-4"
          >
            <motion.button
              type="submit"
              disabled={submitting}
              className={`inline-flex items-center gap-2 px-6 py-3 bg-purplee cursor-pointer text-white rounded-lg font-semibold shadow-md active:scale-95 transition-transform duration-200 ease-in-out
                ${
                  submitting
                    ? "opacity-60 cursor-not-allowed "
                    : " hover:shadow-lg active:scale-95"
                }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <span className="inline-block h-4 w-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  Saving...
                </span>
              ) : formFilled ? (
                <>
                  Next <ArrowRight size={14} />
                </>
              ) : (
                "Save and Continue"
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>

      <FormSubmittedModal
  open={showModal}
  onClose={() => setShowModal(false)}
  onBack={() => router.push("https://indorecricketclub.com/about/")}
/>
    </motion.main>
  );
}
