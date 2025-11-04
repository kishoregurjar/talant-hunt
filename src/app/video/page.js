"use client";
import { useSelector, useDispatch } from "react-redux";
import { markVideoWatched } from "../../store/PlayerSlice";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function VideoPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { formFilled, formData } = useSelector((state) => state.playerReducer);
  const [ended, setEnded] = useState(false);
  const videoRef = useRef(null);

  // Redirect if user hasn't filled the form
  useEffect(() => {
    if (!formFilled) router.push("/");
  }, [formFilled]);

  // Save form data to localStorage when component mounts
  // This ensures that even if user refreshes the page during video, form data is preserved
  useEffect(() => {
    if (formFilled && formData && formData.id) {
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
  }, [formFilled, formData]);

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
    dispatch(markVideoWatched());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-3xl text-center transform transition-all duration-500 hover:-translate-y-1 hover:shadow-blue-200 mt-30">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
           Watch Training Video
        </h2>

        <div className="relative">
          <video
            ref={videoRef}
            src="/video/video.mp4"
            autoPlay
            controls={false}
            onEnded={onEnded}
            className="w-full max-w-2xl rounded-xl shadow-md border border-gray-200"
          />

          {/* Overlay message when video not ended */}
          {!ended && (
            <p className="text-gray-500 text-sm mt-3">
              Watch the complete video to unlock the next section. 
              Please do not close this tab.
            </p>
          )}
        </div>

        <button
          disabled={!ended}
          onClick={() => router.push("/quize")}
          className={`mt-8 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
            ended
              ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {ended ? "Proceed to Quiz ➡️" : "Video Incomplete"}
        </button>
      </div>
    </div>
  );
}