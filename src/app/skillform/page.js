"use client";

import { nanoid } from "nanoid";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {asyncTalentForm} from "../../store/actions/userAction"
import { useEffect } from "react";
// import { saveFormData } from "../../store/PlayerSlice";

const TalentFormPage = () => {
  const dispatch = useDispatch();
  const { formData , formFilled,   id} = useSelector((s) => s.playerReducer);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { register, handleSubmit, reset, watch } = useForm();

    useEffect(() => {
      if (!formFilled) router.push("/talenthunt");
    }, [formFilled]);

  const Submithandler = (data) => {
    console.log(data);
    const newPlayer = { ...data, id: nanoid() };
    console.log(newPlayer)
  dispatch(asyncTalentForm(id, newPlayer))
    // const existingPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    // localStorage.setItem("players", JSON.stringify([...existingPlayers, newPlayer]));
    alert("✅ Form Submitted Successfully!");
    reset();
    router.push("/");
  };

  const cricketFields = watch(["role", "battingStyle", "bowlingStyle", "level"]);
  const performanceFields = watch(["highestScore", "bestBowling"]);

  const isCricketComplete = cricketFields.every((v) => v && v.trim() !== "");
  const isPerformanceComplete = performanceFields.every((v) => v && v.trim() !== "");

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center mt-10 px-4 py-12">
      <form
        onSubmit={handleSubmit(Submithandler)}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Show Your Cricket Skills</h1>
          <p className="text-gray-500 mt-2 text-sm">Step {step} of 3 — Fill all details carefully</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              step === 1 ? "w-1/3 bg-blue-600" : step === 2 ? "w-2/3 bg-blue-600" : "w-full bg-blue-600"
            }`}
          ></div>
        </div>

        {/* Step 1 - Cricket Profile */}
        {step === 1 && (
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-2">
               Cricket Profile
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <select {...register("role")} className="input border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200">
                <option value="">Playing Role</option>
                <option>Batsman</option>
                <option>Bowler</option>
                <option>All-Rounder</option>
                <option>Wicket Keeper</option>
              </select>
              <select {...register("battingStyle")} className="input border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200">
                <option value="">Batting Style</option>
                <option>Right-hand Bat</option>
                <option>Left-hand Bat</option>
              </select>
              <select {...register("bowlingStyle")} className="input border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200">
                <option value="">Bowling Style</option>
                <option>Right Arm Fast</option>
                <option>Left Arm Spin</option>
              </select>
              <select {...register("level")} className="input border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200">
                <option value="">Current Level</option>
                <option>School</option>
                <option>College</option>
                <option>Club</option>
                <option>District</option>
                <option>State</option>
              </select>
              <input {...register("experience")} type="number" placeholder="Years of Experience" className="border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200" />
              <input {...register("teamName")} placeholder="Team / Club Name" className="border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200" />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                disabled={!isCricketComplete}
                onClick={() => setStep(2)}
                className={`px-6 py-2 rounded-lg text-white transition ${
                  isCricketComplete
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Next →
              </button>
            </div>
          </section>
        )}

        {/* Step 2 - Performance */}
        {step === 2 && (
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-2">
            Performance / Stats
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <input {...register("highestScore")} type="number" placeholder="Highest Score" className="border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200" />
              <input {...register("bestBowling")} placeholder="Best Bowling (e.g. 5/23)" className="border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200" />
            </div>
            <textarea {...register("tournaments")} placeholder="Tournaments Played" className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200" />
            <textarea {...register("achievements")} placeholder="Achievements / Awards" className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200" />

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
              >
                ← Back
              </button>
              <button
                type="button"
                disabled={!isPerformanceComplete}
                onClick={() => setStep(3)}
                className={`px-6 py-2 rounded-lg text-white transition ${
                  isPerformanceComplete
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Next →
              </button>
            </div>
          </section>
        )}

        {/* Step 3 - Media & Verification */}
        {step === 3 && (
          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-2">
               Media & Verification
            </h2>
            <input {...register("videoLink")} type="url" placeholder="Video Link (YouTube / Drive)" className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-200" />
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("consent")} />
              <span className="text-gray-600 text-sm">
                I agree my data can be used for selection and promotion
              </span>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
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




