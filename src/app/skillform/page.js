"use client";

import { nanoid } from "nanoid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { asyncTalentForm } from "../../store/actions/userAction";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillInfoValidator } from "../../components/validation/skillInfoValidator";

const TalentFormPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(skillInfoValidator),
    mode: "onChange",
  });
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { formFilled, id } = useSelector((s) => s.playerReducer);

  useEffect(() => {
    if (!formFilled) router.push("/talenthunt");
  }, [formFilled]);

  const Submithandler = (data) => {
    console.log(data);
    const newPlayer = { ...data, id: nanoid() };
    dispatch(asyncTalentForm(id, newPlayer));
    const existingPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    localStorage.setItem(
      "players",
      JSON.stringify([...existingPlayers, newPlayer])
    );
    alert("✅ Form Submitted Successfully!");
    reset();
    router.push("/");
  };

  const cricketFields = watch([
    "role",
    "battingStyle",
    "bowlingStyle",
    "level",
  ]);
  const performanceFields = watch(["highestScore", "bestBowling"]);

  return (
    // <div className="min-h-screen bg-gray-50 flex justify-center items-center mt-10 px-4 py-12">
    //   <form
    //     onSubmit={handleSubmit(Submithandler)}
    //     className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100"
    //   >
    //     {/* Header */}
    //     <div className="text-center mb-8">
    //       <h1 className="text-3xl font-semibold text-gray-800">

    //         Show Your Cricket Skills
    //       </h1>
    //       <p className="text-gray-500 mt-2 text-sm">
    //         Step {step} of 3 — Fill all details carefully
    //       </p>
    //     </div>

    //     {/* Progress Bar */}
    //     <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
    //       <div
    //         className={`h-full rounded-full transition-all duration-500 ${step === 1
    //             ? "w-1/3 bg-blue-600"
    //             : step === 2
    //               ? "w-2/3 bg-blue-600"
    //               : "w-full bg-blue-600"
    //           }`}
    //       ></div>
    //     </div>

    //     {/* Step 1 - Cricket Profile */}
    //     {step === 1 && (
    //       <section className="space-y-6">
    //         <h2 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-2">
    //           Cricket Profile
    //         </h2>
    //         <div className="space-y-6">
    //           <select
    //             {...register("role")}
    //             defaultValue=""
    //             className="input border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 w-full"
    //           >
    //             <option value="" disabled>
    //               Select your playing role
    //             </option>
    //             <option value="Batsman">Batsman</option>
    //             <option value="Bowler">Bowler</option>
    //             <option value="All-Rounder">All-Rounder</option>
    //             <option value="Wicket Keeper">Wicket Keeper</option>
    //           </select>
    //           {errors.role && (
    //             <p className="text-red-500 text-xs mt-1">
    //               {errors.role.message}
    //             </p>
    //           )}

    //           <select
    //             {...register("battingStyle")}
    //             defaultValue=""
    //             disabled={watch("role") === "Wicket Keeper" ? false : false} // ✅ always enabled for all except (no disable case here)
    //             className={`input border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 w-full ${watch("role") === "Wicket Keeper" ? "" : ""
    //               }`}
    //           >
    //             <option value="" disabled>
    //               Select your batting style
    //             </option>
    //             <option>Right-hand Bat</option>
    //             <option>Left-hand Bat</option>
    //           </select>

    //           {errors.battingStyle && (
    //             <p className="text-red-500 text-xs mt-1">
    //               {errors.battingStyle.message}
    //             </p>
    //           )}

    //           <select
    //             {...register("bowlingStyle")}
    //             defaultValue=""
    //             disabled={watch("role") === "Wicket Keeper"} // ❌ disable for wicket keeper
    //             className={`input border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 w-full ${watch("role") === "Wicket Keeper"
    //                 ? "bg-gray-100 cursor-not-allowed"
    //                 : ""
    //               }`}
    //           >
    //             <option value="" disabled>
    //               Select your bowling style
    //             </option>
    //             <option>Right Arm Fast</option>
    //             <option>Left Arm Fast</option>
    //             <option>Right Arm Spin</option>
    //             <option>Left Arm Spin</option>
    //           </select>
    //           {errors.bowlingStyle && (
    //             <p className="text-red-500 text-xs mt-1">
    //               {errors.bowlingStyle.message}
    //             </p>
    //           )}

    //           <select
    //             {...register("level", {
    //               onChange: () => trigger("level"),
    //             })}
    //             defaultValue=""
    //             className="input border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 w-full"
    //           >
    //             <option value="" disabled>
    //               Select your current Level
    //             </option>
    //             <option>School</option>
    //             <option>College</option>
    //             <option>Club</option>
    //             <option>District</option>
    //             <option>State</option>
    //           </select>
    //           {errors.level && (
    //             <p className="text-red-500 text-xs mt-1">
    //               {errors.level.message}
    //             </p>
    //           )}

    //           <input
    //             {...register("experience")}
    //             type="number"
    //             placeholder="Years of Experience"
    //             className="border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 w-full"
    //           />
    //           {errors.experience && (
    //             <p className="text-red-500 text-xs mt-1">
    //               {errors.experience.message}
    //             </p>
    //           )}

    //           <input
    //             {...register("teamName")}
    //             placeholder="Team / Club Name"
    //             className="border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 w-full"
    //           />
    //           {errors.teamName && (
    //             <p className="text-red-500 text-xs mt-1">
    //               {errors.teamName.message}
    //             </p>
    //           )}
    //         </div>

    //         <div className="flex justify-end pt-4">

    //           <button
    //             type="button"
    //             onClick={async () => {
    //               const role = watch("role");
    //               const battingStyle = watch("battingStyle");
    //               const bowlingStyle = watch("bowlingStyle");
    //               const level = watch("level");

    //               // Manual validation check before triggering
    //               if (!role || role.trim() === "") {
    //                 await trigger("role");
    //                 return;
    //               }
    //               if (!level || level.trim() === "") {
    //                 await trigger("level");
    //                 return;
    //               }

    //               // Check conditional fields based on role
    //               if (role === "Batsman") {
    //                 if (!battingStyle || battingStyle.trim() === "") {
    //                   await trigger("battingStyle");
    //                   return;
    //                 }
    //               } else if (role === "Bowler") {
    //                 if (!battingStyle || battingStyle.trim() === "") {
    //                   await trigger("battingStyle");
    //                   return;
    //                 }
    //                 if (!bowlingStyle || bowlingStyle.trim() === "") {
    //                   await trigger("bowlingStyle");
    //                   return;
    //                 }
    //               } else if (role === "All-Rounder") {
    //                 if (!battingStyle || battingStyle.trim() === "") {
    //                   await trigger("battingStyle");
    //                   return;
    //                 }
    //                 if (!bowlingStyle || bowlingStyle.trim() === "") {
    //                   await trigger("bowlingStyle");
    //                   return;
    //                 }
    //               } else if (role === "Wicket Keeper") {
    //                 if (!battingStyle || battingStyle.trim() === "") {
    //                   await trigger("battingStyle");
    //                   return;
    //                 }
    //               }

    //               // All validations passed
    //               setStep(2);
    //             }}
    //             className="px-6 py-2 rounded-lg text-white transition bg-blue-600 hover:bg-blue-700"
    //           >
    //             Next →
    //           </button>

    //         </div>
    //       </section>
    //     )}

    //     {/* Step 2 - Performance */}
    //     {step === 2 && (
    //       <section className="space-y-6">
    //         <h2 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-2">
    //           Performance / Stats
    //         </h2>
    //         <div className="space-y-6">
    //           <input
    //             {...register("highestScore")}
    //             type="number"
    //             placeholder="Highest Score"
    //             className="border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 w-full"
    //           />
    //           {errors.highestScore && (
    //             <p className="text-red-500 text-xs mt-1">
    //               {errors.highestScore.message}
    //             </p>
    //           )}
    //           <input
    //             {...register("bestBowling")}
    //             placeholder="Best Bowling (e.g. 5/23)"
    //             className="border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200 w-full"
    //           />
    //           {errors.bestBowling && (
    //             <p className="text-red-500 text-xs mt-1">
    //               {errors.bestBowling.message}
    //             </p>
    //           )}
    //         </div>
    //         <input
    //           {...register("tournaments")}
    //           placeholder="Tournaments Played"
    //           className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
    //         />
    //         {errors.tournaments && (
    //           <p className="text-red-500 text-xs mt-1">
    //             {errors.tournaments.message}
    //           </p>
    //         )}
    //         <textarea
    //           {...register("achievements")}
    //           placeholder="Achievements / Awards"
    //           className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
    //         />
    //         {errors.achievements && (
    //           <p className="text-red-500 text-xs mt-1">
    //             {errors.achievements.message}
    //           </p>
    //         )}

    //         <div className="flex justify-between pt-4">
    //           <button
    //             type="button"
    //             onClick={() => setStep(1)}
    //             className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
    //           >
    //             ← Back
    //           </button>
    //           <button
    //             type="button"
    //             onClick={async () => {
    //               const ok = await trigger(["highestScore", "bestBowling"]);
    //               if (ok) setStep(3);
    //             }}
    //             className="px-6 py-2 rounded-lg text-white transition bg-blue-600 hover:bg-blue-700"
    //           >
    //             Next →
    //           </button>
    //         </div>
    //       </section>
    //     )}

    //     {/* Step 3 - Media & Verification */}
    //     {step === 3 && (
    //       <section className="space-y-6">
    //         <h2 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-2">
    //           Media & Verification
    //         </h2>
    //         <input
    //           {...register("videoLink")}
    //           type="url"
    //           placeholder="Video Link (YouTube / Drive)"
    //           className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200"
    //         />
    //         <div className="flex items-center gap-2">
    //           <input type="checkbox" {...register("consent")} />
    //           <span className="text-gray-600 text-sm">
    //             I agree my data can be used for selection and promotion
    //           </span>
    //         </div>
    //         {errors.consent && (
    //           <p className="text-red-500 text-xs mt-1">
    //             {errors.consent.message}
    //           </p>
    //         )}

    //         <div className="flex justify-between pt-4">
    //           <button
    //             type="button"
    //             onClick={() => setStep(2)}
    //             className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 active:scale-95"
    //           >
    //             ← Back
    //           </button>
    //           <button
    //             type="submit"
    //             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition active:scale-95"
    //           >
    //             Submit Profile
    //           </button>
    //         </div>
    //       </section>
    //     )}
    //   </form>
    // </div>

    /* <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-12">
  <form
    onSubmit={handleSubmit(Submithandler)}
    className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100"
  >
  
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-blue-600">Player Registration Form</h1>
      <p className="text-gray-500 mt-2 text-sm">Step {step} of 3 — Fill all details carefully</p>
    </div>

    
    <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
      <div
        className={`h-full rounded-full transition-all duration-500 ${
          step === 1 ? "w-1/3 bg-blue-600" : step === 2 ? "w-2/3 bg-blue-600" : "w-full bg-blue-600"
        }`}
      />
    </div>


    {step === 1 && (
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-2">Cricket Profile</h2>

        
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <select
              {...register("role")}
              defaultValue=""
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select your playing role</option>
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-Rounder">All-Rounder</option>
              <option value="Wicket Keeper">Wicket Keeper</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </div>

          <div>
            <select
              {...register("battingStyle")}
              defaultValue=""
              disabled={watch("role") === "Wicket Keeper" ? false : false}  
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select your batting style</option>
              <option>Right-hand Bat</option>
              <option>Left-hand Bat</option>
            </select>
            {errors.battingStyle && <p className="text-red-500 text-xs mt-1">{errors.battingStyle.message}</p>}
          </div>
        </div>

  
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <select
              {...register("bowlingStyle")}
              defaultValue=""
              disabled={watch("role") === "Wicket Keeper"}  
              className={`w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                watch("role") === "Wicket Keeper" ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            >
              <option value="" disabled>Select your bowling style</option>
              <option>Right Arm Fast</option>
              <option>Left Arm Fast</option>
              <option>Right Arm Spin</option>
              <option>Left Arm Spin</option>
            </select>
            {errors.bowlingStyle && <p className="text-red-500 text-xs mt-1">{errors.bowlingStyle.message}</p>}
          </div>

          <div>
            <select
              {...register("level", { onChange: () => trigger("level") })}
              defaultValue=""
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select your current Level</option>
              <option>School</option>
              <option>College</option>
              <option>Club</option>
              <option>District</option>
              <option>State</option>
            </select>
            {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level.message}</p>}
          </div>
        </div>

        
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <input
              {...register("experience")}
              type="number"
              placeholder="Years of Experience"
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
            <small className="text-blue-500 text-xs mt-1">optional</small>
          </div>

          <div>
            <input
              {...register("teamName")}
              placeholder="Team / Club Name"
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.teamName && <p className="text-red-500 text-xs mt-1">{errors.teamName.message}</p>}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={async () => {
              const role = watch("role");
              const battingStyle = watch("battingStyle");
              const bowlingStyle = watch("bowlingStyle");
              const level = watch("level");

              if (!role || role.trim() === "") { await trigger("role"); return; }
              if (!level || level.trim() === "") { await trigger("level"); return; }

              if (role === "Batsman") {
                if (!battingStyle || battingStyle.trim() === "") { await trigger("battingStyle"); return; }
              } else if (role === "Bowler") {
                if (!battingStyle || battingStyle.trim() === "") { await trigger("battingStyle"); return; }
                if (!bowlingStyle || bowlingStyle.trim() === "") { await trigger("bowlingStyle"); return; }
              } else if (role === "All-Rounder") {
                if (!battingStyle || battingStyle.trim() === "") { await trigger("battingStyle"); return; }
                if (!bowlingStyle || bowlingStyle.trim() === "") { await trigger("bowlingStyle"); return; }
              } else if (role === "Wicket Keeper") {
                if (!battingStyle || battingStyle.trim() === "") { await trigger("battingStyle"); return; }
              }

              setStep(2);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next →
          </button>
        </div>
      </section>
    )}

    
    {step === 2 && (
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-2">Performance / Stats</h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <input
              {...register("highestScore")}
              type="number"
              placeholder="Highest Score"
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.highestScore && <p className="text-red-500 text-xs mt-1">{errors.highestScore.message}</p>}
          </div>

          <div>
            <input
              {...register("bestBowling")}
              placeholder="Best Bowling (e.g. 5/23)"
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.bestBowling && <p className="text-red-500 text-xs mt-1">{errors.bestBowling.message}</p>}
          </div>
        </div>

        <div>
          <input
            {...register("tournaments")}
            placeholder="Tournaments Played"
            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.tournaments && <p className="text-red-500 text-xs mt-1">{errors.tournaments.message}</p>}
        </div>

        <div>
          <textarea
            {...register("achievements")}
            placeholder="Achievements / Awards"
            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.achievements && <p className="text-red-500 text-xs mt-1">{errors.achievements.message}</p>}
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={async () => {
              const ok = await trigger(["highestScore", "bestBowling"]);
              if (ok) setStep(3);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Next →
          </button>
        </div>
      </section>
    )}

    
    {step === 3 && (
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-2">Media & Verification</h2>

        <div>
          <input
            {...register("videoLink")}
            type="url"
            placeholder="Video Link (YouTube / Drive)"
            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("consent")} />
          <span className="text-gray-600 text-sm">I agree my data can be used for selection and promotion</span>
        </div>
        {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent.message}</p>}

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Profile
          </button>
        </div>
      </section>
    )}
  </form>
</div> */

    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-12">
      <form
        onSubmit={handleSubmit(Submithandler)}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">
            Player Registration Form
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Step {step} of 3 — Fill all details carefully
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              step === 1
                ? "w-1/3 bg-blue-600"
                : step === 2
                ? "w-2/3 bg-blue-600"
                : "w-full bg-blue-600"
            }`}
          />
        </div>

        {/* Step 1 - Cricket Profile */}
        {step === 1 && (
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-2">
              Cricket Profile
            </h2>

            {/* Role + Batting */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Playing Role
                </label>
                <select
                  {...register("role")}
                  defaultValue=""
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select your playing role
                  </option>
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All-Rounder">All-Rounder</option>
                  <option value="Wicket Keeper">Wicket Keeper</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Batting Style
                </label>
                <select
                  {...register("battingStyle")}
                  defaultValue=""
                  disabled={watch("role") === "Wicket Keeper" ? false : false}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select your batting style
                  </option>
                  <option>Right-hand Bat</option>
                  <option>Left-hand Bat</option>
                </select>
                {errors.battingStyle && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.battingStyle.message}
                  </p>
                )}
              </div>
            </div>

            {/* Bowling + Level */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Bowling Style
                </label>
                <select
                  {...register("bowlingStyle")}
                  defaultValue=""
                  disabled={watch("role") === "Wicket Keeper"}
                  className={`w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    watch("role") === "Wicket Keeper"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <option value="" disabled>
                    Select your bowling style
                  </option>
                  <option>Right Arm Fast</option>
                  <option>Left Arm Fast</option>
                  <option>Right Arm Spin</option>
                  <option>Left Arm Spin</option>
                </select>
                {errors.bowlingStyle && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bowlingStyle.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Playing Level
                </label>
                <select
                  {...register("level", { onChange: () => trigger("level") })}
                  defaultValue=""
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select your current Level
                  </option>
                  <option>School</option>
                  <option>College</option>
                  <option>Club</option>
                  <option>District</option>
                  <option>State</option>
                </select>
                {errors.level && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.level.message}
                  </p>
                )}
              </div>
            </div>

            {/* Experience + Team */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Experience {" "}
                  <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  {...register("experience")}
                  type="number"
                  placeholder="Years of Experience"
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.experience && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.experience.message}
                  </p>
                )}
              </div>

              {/* <div>
            <input
              {...register("teamName")}
              placeholder="Team / Club Name (Optional)"
              className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.teamName && <p className="text-red-500 text-xs mt-1">{errors.teamName.message}</p>}
          </div> */}

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Team / Club Name{" "}
                  <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  {...register("teamName")}
                  placeholder="Team / Club Name"
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.teamName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.teamName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
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

                  if (role === "Batsman") {
                    if (!battingStyle || battingStyle.trim() === "") {
                      await trigger("battingStyle");
                      return;
                    }
                  } else if (role === "Bowler") {
                    if (!battingStyle || battingStyle.trim() === "") {
                      await trigger("battingStyle");
                      return;
                    }
                    if (!bowlingStyle || bowlingStyle.trim() === "") {
                      await trigger("bowlingStyle");
                      return;
                    }
                  } else if (role === "All-Rounder") {
                    if (!battingStyle || battingStyle.trim() === "") {
                      await trigger("battingStyle");
                      return;
                    }
                    if (!bowlingStyle || bowlingStyle.trim() === "") {
                      await trigger("bowlingStyle");
                      return;
                    }
                  } else if (role === "Wicket Keeper") {
                    if (!battingStyle || battingStyle.trim() === "") {
                      await trigger("battingStyle");
                      return;
                    }
                  }

                  setStep(2);
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next →
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-2">
              Performance / Stats
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                 <label className="block text-gray-700 text-sm font-medium mb-1">
                  Highest Score
                </label>
                <input
                  {...register("highestScore")}
                  type="number"
                  placeholder="(e.g. 105)"
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.highestScore && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.highestScore.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Best Bowling
                </label>
                <input
                  {...register("bestBowling")}
                  placeholder="(e.g. 5/23)"
                  className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.bestBowling && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bestBowling.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Tournaments Played
                </label>
              <input
                {...register("tournaments")}
                placeholder="(e.g. 5)"
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.tournaments && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.tournaments.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Achievements / Awards
                </label>
              <textarea
                {...register("achievements")}
                placeholder="eg. Best Batsman Award 2018"
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.achievements && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.achievements.message}
                </p>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={async () => {
                  const ok = await trigger(["highestScore", "bestBowling"]);
                  if (ok) setStep(3);
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Next →
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-2">
              Media & Verification
            </h2>

            <div>
              <input
                {...register("videoLink")}
                type="url"
                placeholder="Video Link (YouTube / Drive) (Optional)"
                className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
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

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit Profile
              </button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default TalentFormPage;
