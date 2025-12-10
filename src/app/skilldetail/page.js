"use client";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { asyncTalentForm } from "../../store/actions/userAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillInfoValidator } from "../../components/validation/skillInfoValidator";
import { motion, AnimatePresence } from "framer-motion";
import CustomSelect from "../../components/CustomSelect";
import { toast } from "react-toastify";

import {
  Medal,
  Shield,
  Clock,
  Users,
  Target,
  Trophy,
  Video,
  CircleCheckBig,
  CheckSquare,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";

const TalentFormPage = () => {
const dispatch = useDispatch();
const router = useRouter();
const { formFilled, id, videoWatched, quizCompleted, PaymentProcess } = useSelector((s) => s.playerReducer);
  const [loading, setLoading] = useState(true);

const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
    control,
  } = useForm({
    resolver: zodResolver(skillInfoValidator),
    mode: "onChange",
  });

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
      }else if (formFilled === true &&
        videoWatched === true &&
        quizCompleted == true && PaymentProcess === false) {
        router.push("/payment");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [formFilled, videoWatched, quizCompleted, PaymentProcess, router]);


  const [step, setStep] = useState(1);

  
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    
    const handlePopState = (e) => {
      window.history.pushState(null, '', window.location.href);
    };
    
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      return 'Navigation is disabled while filling out this form.';
    };

    // Add event listeners
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup function
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const Submithandler = async (data) => {
    // Get the student ID from localStorage or Redux store
    const studentId = localStorage.getItem("userId") || id;
    
    if (!studentId) {
      toast.error("❌ User ID not found. Please complete the registration first.", {
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
      
                icon: (
                  <span className="text-red-500 text-xl   font-bold">
                    <ShieldX />
                  </span>
                ),
              });
      router.push("/talenthunt");
      return;
    }

    // Dispatch the action to submit cricket details
    const success = await dispatch(asyncTalentForm(studentId, data));

    if (success) {
      toast.success(" Form Submitted Successfully!", {
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
      reset();
      router.push("https://indorecricketclub.com/");
    } else {
      toast.error(" Failed to submit form. Please try again." , {
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
      
                icon: (
                  <span className="text-red-500 text-xl   font-bold">
                    <ShieldX />
                  </span>
                ),
              });
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white md:rounded-2xl rounded-xl shadow-xl w-full max-w-4xl mt-30 p-4 md:p-8 transition duration-300 hover:shadow-lg"
      >
        <form
          onSubmit={handleSubmit(Submithandler)}
          className="w-full max-w-4xl bg-white rounded-2xl    gap-5 "
        >
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-purplee">
              Cricket Profile
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-500 mt-2 text-sm"
            >
              Step {step} of 2 — Fill all details carefully
            </motion.p>
          </motion.div>

          {/* STEP 1 — Cricket Profile */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.section
                key="step1"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >


                {/* Role + Batting Style */}
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Role */}
                  <div>
                    <label className="block text-gray-700 text-m font-medium mb-1">
                      Playing Role
                    </label>
                    <Controller
                      name="role"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CustomSelect
                          options={[
                            { value: "Batsman", label: "Batsman" },
                            { value: "Bowler", label: "Bowler" },
                            { value: "All-Rounder", label: "All-Rounder" },
                            { value: "Wicket Keeper", label: "Wicket Keeper" },
                          ]}
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="Select your playing role"
                          icon={Medal}
                          error={errors.role?.message}
                        />
                      )}
                    />
                  </div>

                  {/* Batting Style */}
                  <div>
                    <label className="block text-gray-700 text-m font-medium mb-1">
                      Batting Style
                    </label>
                    <Controller
                      name="battingStyle"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CustomSelect
                          options={[
                            { value: "Right-hand Bat", label: "Right-hand Bat" },
                            { value: "Left-hand Bat", label: "Left-hand Bat" },
                          ]}
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="Select your batting style"
                          icon={Target}
                          error={errors.battingStyle?.message}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Bowling Style + Level */}
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Bowling Style */}
                  <div>
                    <label className="block text-gray-700 text-m font-medium mb-1">
                      Bowling Style{" "}
                      {watch("role") === "Wicket Keeper" ? (
                        <span className="text-gray-400 text-xs">(Disabled)</span>
                      ) : (
                        <span className="text-red-500 text-xs font-medium"></span>
                      )}
                      {watch("role") === "Batsman" ? (
                        <span className="text-gray-400 text-xs">(Optional)</span>
                      ) : (
                        <span className="text-red-500 text-xs font-medium"></span>
                      )}
                    </label>
                    <Controller
                      name="bowlingStyle"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CustomSelect
                          options={[
                            { value: "Right Arm Fast", label: "Right Arm Fast" },
                            { value: "Left Arm Fast", label: "Left Arm Fast" },
                            { value: "Right Arm Spin", label: "Right Arm Spin" },
                            { value: "Left Arm Spin", label: "Left Arm Spin" },
                          ]}
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="Select your bowling style"
                          icon={Shield}
                          disabled={watch("role") === "Wicket Keeper"}
                          error={errors.bowlingStyle?.message}
                        />
                      )}
                    />
                  </div>

                  {/* Level */}
                  <div>
                    <label className="block text-gray-700 text-m font-medium mb-1">
                      Playing Level
                    </label>
                    <Controller
                      name="level"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CustomSelect
                          options={[
                            { value: "School", label: "School" },
                            { value: "College", label: "College" },
                            { value: "Club", label: "Club" },
                            { value: "District", label: "District" },
                            { value: "State", label: "State" },
                          ]}
                          value={field.value || ""}
                          onChange={field.onChange}
                          placeholder="Select your current level"
                          icon={Trophy}
                          error={errors.level?.message}
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Experience + Team */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-gray-700 text-m font-medium mb-1">
                      Experience <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        {...register("experience")}
                        type="number"
                        placeholder="Years of Experience"
                        className="w-full pl-10 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purplee outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-m font-medium mb-1">
                      Team / Club Name <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input
                        {...register("teamName")}
                        placeholder="Team / Club Name"
                        className="w-full pl-10 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purplee outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* NEXT BUTTON */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-end pt-4"
                >
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      const role = watch("role");
                      const battingStyle = watch("battingStyle");
                      const bowlingStyle = watch("bowlingStyle");
                      const level = watch("level");

                      if (!role || role.trim() === "") {
                        await trigger("role");
                        return;
                      }
                      if (!level || level.trim() === "") {
                        await trigger("level");
                        return;
                      }

                      if (role === "Batsman" && !battingStyle) await trigger("battingStyle");
                      else if (role === "Bowler" || role === "All-Rounder") {
                        if (!battingStyle) await trigger("battingStyle");
                        if (!bowlingStyle) await trigger("bowlingStyle");
                      } else if (role === "Wicket Keeper" && !battingStyle)
                        await trigger("battingStyle");

                      setStep(2);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purplee  text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Next <ArrowRight size={16} />
                  </motion.button>
                </motion.div>
              </motion.section>
            )}

            {/* STEP 2 — Media & Verification */}
            {step === 2 && (
              <motion.section
                key="step2"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >


                <div className="relative">
                  <Video className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    {...register("videoLink")}

                    placeholder="Video Link (YouTube / Drive)"
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purplee outline-none"
                  />
                  {errors.videoLink && <p className="text-red-500 text-xs mt-1">{errors.videoLink.message}</p>}
                </div>

                {/* Upload Help Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center shadow-sm">
                  <h3 className="text-lg font-semibold text-purplee mb-2">
                    How to Upload Your Cricket Video
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Not sure how to upload your cricket video? Watch this quick YouTube guide.
                  </p>
                  <motion.button
                    type="button"
                    onClick={() =>
                     window.open(process.env.NEXT_PUBLIC_YT_SEARCH_URL, "_blank")
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purplee text-white rounded-lg font-medium shadow-md  transition duration-200"
                  >
                     Watch Tutorial
                  </motion.button>
                </div>

                {/* Consent */}
                <div className="flex items-center gap-2">
                  {/* <CheckSquare className="text-blue-600 " size={18} /> */}
                  <input type="checkbox" {...register("consent")} />
                  <span className="text-gray-600 text-sm">
                    I agree my data can be used for selection and promotion
                  </span>
                </div>
                {errors.consent && (
                  <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>
                )}

                {/* Buttons */}
                <div className="flex justify-between pt-4">
                  <motion.button
                    type="button"
                    onClick={() => setStep(1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg transition focus:ring-2 focus:ring-gray-300"
                  >
                    <ArrowLeft size={16} /> Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05,  }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purplee text-white font-medium rounded-lg transition focus:ring-2 "
                  >
                    Submit Profile <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </motion.main>

  );
};

export default TalentFormPage;
