"use client";
import { useSelector, useDispatch } from "react-redux";
import { markVideoWatched } from "../../store/PlayerSlice";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { asyncUserVideoWatched } from "../../store/actions/userAction";

export default function VideoPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { formFilled, formData, id } = useSelector((state) => state.playerReducer);
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  // Redirect if user hasn't filled the form
  useEffect(() => {
    // Wait a bit to ensure rehydration is complete
    const timer = setTimeout(() => {
      setLoading(false);
      if (formFilled === false) {
        router.push("/talenthunt");
      }
    }, 100); // Small delay to ensure rehydration

    return () => clearTimeout(timer);
  }, [formFilled]);

  // Save form data to localStorage when component mounts
  // This ensures that even if user refreshes the page during video, form data is preserved
  useEffect(() => {
    if (!loading && formFilled && formData && formData.id) {
      const existingPlayers = JSON.parse(localStorage.getItem("players")) || [];

      // Find and update the player with video watched status
      const playerIndex = existingPlayers.findIndex(player => player.id === formData.id);

      if (playerIndex !== -1) {
        const updatedPlayers = [...existingPlayers];
        // Completely replace player data with updated data
        updatedPlayers[playerIndex] = {
          ...formData,
          videoWatched: true
        };

        localStorage.setItem("players", JSON.stringify(updatedPlayers));
      }
    }
  }, [formFilled, formData, loading]);

  // Warn user before leaving the page during video watching
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!ended) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
        return ""; // Required for other browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [ended]);

  const onEnded = () => {
    setEnded(true);
    // Pass the formData.id to the async action
    dispatch(asyncUserVideoWatched(id));
    // dispatch(asyncUserVideoWatched(formData.id));
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
  

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br bg-gray-100 p-6">
      <div className="relative bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-3xl text-center 
      border border-gray-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-100 mt-16">

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-4 tracking-tight">
          Watch Trial Video
        </h2>

        <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
          Watch the full video carefully to unlock your quiz. Stay focused till the end
        </p>

        {/* Video Section — untouched */}
        <div className="relative overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-gray-50">
          <video
            ref={videoRef}
            src="/video/video.mp4"
            autoPlay
            controls={false}
            onEnded={onEnded}
            className="w-full h-auto rounded-2xl object-cover"
          />
        </div>

        {/* Action Button */}
        <button
          disabled={!ended}
          onClick={() => router.push("/quize")}
          className={`mt-8 px-10 py-3 rounded-lg font-semibold shadow-md transform transition-all duration-300 ease-in-out ${ended
              ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95 active:bg-blue-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {ended ? "Proceed to Quiz ➡️" : "Watch Complete Video"}
        </button>


        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6 italic">
          Powered by <span className="text-blue-600 font-medium">ICC</span> • Learn. Play. Excel.
        </p>
      </div>
    </div>

  );
}