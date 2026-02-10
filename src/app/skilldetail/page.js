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
// import FormSubmittedModal from "../../components/modals/formSubmittedModal";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TalentFormPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { formFilled, id, videoWatched, quizCompleted, PaymentProcess } =
    useSelector((s) => s.playerReducer);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [showFinalPaymentDialog, setShowFinalPaymentDialog] = useState(false);
  console.log("student ki id", id);

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
    const checkPaymentStatus = async () => {
      try {
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
        } else {
          // Check payment status from backend API and show informative modal
          const studentId = localStorage.getItem("userId") || id;
          if (studentId) {
            setCurrentStudentId(studentId);

            const paymentStatusResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/payment-status/${studentId}`,
            );
            const paymentStatusData = await paymentStatusResponse.json();

            setPaymentStatus(paymentStatusData);
            setShowPaymentModal(true);
          }

          // If all checks pass, user can stay on skilldetail page
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        // Fallback to existing logic if API fails
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
        } else if (
          formFilled === true &&
          videoWatched === true &&
          quizCompleted == true &&
          PaymentProcess === false
        ) {
          router.push("/payment/" + id);
        }
      }
    };
    
    const timer = setTimeout(() => {
      checkPaymentStatus();
    }, 100);

    return () => clearTimeout(timer);
  }, [formFilled, videoWatched, quizCompleted, PaymentProcess, id, router]);

  const [step, setStep] = useState(1);

  useEffect(() => {
    const talentFormfilled = localStorage.getItem("talentFormfilled");

    if (formFilled && videoWatched && quizCompleted && talentFormfilled) {
      setShowModal(true);
    }
  }, [formFilled, videoWatched, quizCompleted]);

  const Submithandler = async (data) => {
    const studentId = localStorage.getItem("userId") || id;

    if (!studentId) {
      toast.error(
        "❌ User ID not found. Please complete the registration first.",
        {
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
        },
      );
      router.push("/talenthunt");
      return;
    }

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
      // Last step complete: show final payment + registration confirmation
      setShowFinalPaymentDialog(true);
    } else {
      toast.error(" Failed to submit form. Please try again.", {
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

  const handleFinalDialogClose = () => {
    setShowFinalPaymentDialog(false);
    router.push("https://www.instagram.com/indorecricketclub?igsh=MXZqa2J3d2VuN2U0dQ%3D%3D");
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
            <h1 className="text-3xl font-bold text-purplee">Cricket Profile</h1>
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
                            { value: "All Rounder", label: "All Rounder" },
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
                            {
                              value: "Right-hand Bat",
                              label: "Right-hand Bat",
                            },
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
                        <span className="text-gray-400 text-xs">
                          (Disabled)
                        </span>
                      ) : (
                        <span className="text-red-500 text-xs font-medium"></span>
                      )}
                      {watch("role") === "Batsman" ? (
                        <span className="text-gray-400 text-xs">
                          (Optional)
                        </span>
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
                            {
                              value: "Right Arm Fast",
                              label: "Right Arm Fast",
                            },
                            { value: "Left Arm Fast", label: "Left Arm Fast" },
                            {
                              value: "Right Arm Spin",
                              label: "Right Arm Spin",
                            },
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
                      Experience{" "}
                      <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Clock
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                      />
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
                      Team / Club Name{" "}
                      <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Users
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                      />
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
                    whileHover={{ scale: 1.05 }}
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

                      if (role === "Batsman" && !battingStyle)
                        await trigger("battingStyle");
                      else if (role === "Bowler" || role === "All-Rounder") {
                        if (!battingStyle) await trigger("battingStyle");
                        if (!bowlingStyle) await trigger("bowlingStyle");
                      } else if (role === "Wicket Keeper" && !battingStyle)
                        await trigger("battingStyle");

                      setStep(2);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purplee  text-white font-medium rounded-lg transition focus:outline-none focus:ring-2  focus:ring-offset-2"
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
                {/* <div className="relative">
                  <Video
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <input
                    {...register("videoLink")}
                    placeholder="Video Link (YouTube / Drive)"
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purplee outline-none"
                  />
                  {errors.videoLink && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.videoLink.message}
                    </p>
                  )}
                </div> */}

                <div className="relative">
                  <Video
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <input
                    {...register("videoLink")}
                    placeholder="Video Link (YouTube / Drive)"
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purplee outline-none"
                  />
                  {errors.videoLink && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.videoLink.message}
                    </p>
                  )}

                  {/* Video Note - Hindi + English */}
                  <div className=" p-2 ">
                    <p className="text-gray-700 text-xs font-bold">
                      <strong className = "text-red-400">Note :</strong> Upload your performance video link, video should not be more than 1 minute / अपना प्रदर्शन वीडियो लिंक अपलोड करें, वीडियो 1 मिनट से अधिक का नहीं होना चाहिए
                    </p>
                  </div>
                </div>

                {/* Upload Help Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center shadow-sm">
                  <h3 className="text-lg font-semibold text-purplee mb-2">
                    Talent Hunt Registration Guide 
                    
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                   To understand the complete Talent Hunt registration process, please watch this video. It explains the full process from start to end and helps clear all your doubts. / टैलेंट हंट रजिस्ट्रेशन की पूरी प्रक्रिया समझने के लिए कृपया यह वीडियो देखें। इसमें शुरू से अंत तक की पूरी प्रक्रिया समझाई गई है और आपके सभी संदेह दूर हो जाएंगे।
                    यह छोटा यूट्यूब गाइड देखें।
                  </p>
                  <motion.button
                    type="button"
                    onClick={() =>
                      window.open(
                        process.env.NEXT_PUBLIC_YT_SEARCH_URL,
                        "_blank",
                      )
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purplee text-white rounded-lg font-medium shadow-md  transition duration-200"
                  >
                    Watch Video
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.consent.message}
                  </p>
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
                    whileHover={{ scale: 1.05 }}
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

      {/* Payment status modal shown when user comes after payment */}
      {showPaymentModal && paymentStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 border border-gray-100 max-h-[90vh] overflow-y-auto">
            {paymentStatus.success && paymentStatus.data?.paymentDone ? (
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <CircleCheckBig className="text-green-600" size={32} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Successful 🎉
                </h2>
                <p className="text-sm text-gray-800 font-medium">
                  Your payment has been completed successfully.
                </p>
                <p className="text-sm text-gray-700">
                  आपका पेमेंट सफलतापूर्वक पूरा हो चुका है। अब आप अपना{" "}
                  <span className="font-semibold text-purplee">
                    Cricket Profile
                  </span>{" "}
                  फॉर्म भरें।
                </p>

                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="mt-4 inline-flex items-center justify-center rounded-lg bg-purplee px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-purplee/90 focus:outline-none focus:ring-2 focus:ring-purplee focus:ring-offset-1"
                >
                  Continue to Cricket Profile
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="h-14 w-14 rounded-full bg-red-100 flex items-center justify-center mb-2">
                  <Shield className="text-red-500" size={28} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Not Completed
                </h2>
                <p className="text-sm text-gray-600">
                  Abhi hamko aapka payment confirm nahi mila hai.
                  Kripya pehle payment complete karke phir Cricket Profile bharein.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowPaymentModal(false);
                    if (currentStudentId) {
                      router.push(`/payment/${currentStudentId}`);
                    } else {
                      router.push("/payment");
                    }
                  }}
                  className="mt-4 inline-flex items-center justify-center rounded-lg bg-purplee px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-purplee/90 focus:outline-none focus:ring-2 focus:ring-purplee focus:ring-offset-1"
                >
                  Go to Payment Page
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Final confirmation dialog after last step submit */}
      <Dialog open={showFinalPaymentDialog} onOpenChange={handleFinalDialogClose}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Registration Completed
            </DialogTitle>
            <DialogDescription className="sr-only">
              Your payment and profile have been submitted successfully
            </DialogDescription>
          </DialogHeader>

          <div className="bg-green-50 border border-green-100 rounded-xl p-6 flex flex-col items-center text-center space-y-2">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <CircleCheckBig className="text-green-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-green-700">
              Payment & Profile Submitted 🎉
            </h3>
            <p className="text-sm sm:text-base text-gray-800 font-medium">
              Your payment and Cricket Profile have been submitted successfully.
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              आपका पेमेंट और क्रिकेट प्रोफ़ाइल सफलतापूर्वक सबमिट हो चुका है।
              टैलेंट हंट टीम जल्द ही आपसे संपर्क करेगी।
            </p>
            <div className="mt-2 text-xs sm:text-sm text-gray-700 space-y-1">
              <p>
                If you are <span className="font-semibold">selected</span>, you will receive an acceptance email from the Talent Hunt team and your trial schedule will be shared on that email.
              </p>
              <p>
                If you are <span className="font-semibold">not selected</span>, you will also get a notification email from the Talent Hunt team.
              </p>
              <p className="text-[11px] sm:text-xs text-gray-600">
                यदि आप <span className="font-semibold">सेलेक्ट होते हैं</span> तो आपको टैलेंट हंट टीम की ओर से एक <span className="font-semibold">एक्सेप्टेंस ई‑मेल</span> आएगा, जिसमें आपके ट्रायल की पूरी डिटेल और शेड्यूल होगा।
              </p>
              <p className="text-[11px] sm:text-xs text-gray-600">
                और यदि आप <span className="font-semibold">सेलेक्ट नहीं होते</span> हैं तो उसके लिए भी आपको टैलेंट हंट टीम की तरफ से ई‑मेल द्वारा सूचना दी जाएगी।
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            You can now close this window or go back to the Indore Cricket Club website.
          </p>

          <DialogFooter className="mt-4">
            <button
              type="button"
              onClick={handleFinalDialogClose}
              className="w-full cursor-pointer py-3.5 px-4 bg-purplee text-white text-sm sm:text-base font-semibold rounded-xl shadow-md hover:shadow-lg transform transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Done & Go to Website <ArrowRight size={18} />
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <FormSubmittedModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onBack={() => router.push("https://indorecricketclub.com/")}
      /> */}
    </motion.main>
  );
};

export default TalentFormPage;
