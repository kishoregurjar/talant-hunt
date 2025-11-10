"use client";
import { useSelector, useDispatch } from "react-redux";
import { markVideoWatched } from "../../store/PlayerSlice";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { asyncUserVideoWatched } from "../../store/actions/userAction";
import { motion } from "framer-motion";

export default function VideoPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { formFilled, formData, id } = useSelector((state) => state.playerReducer);
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);


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

 
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!ended) {
        e.preventDefault();
        e.returnValue = ""; 
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [ended]);

  const onEnded = () => {
    setEnded(true);
    
    dispatch(asyncUserVideoWatched(id));

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br bg-gray-100 p-4 md:p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative bg-white shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-4xl text-center 
        border border-gray-100 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-100 mt-16"
      >

        {/* Title */}
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-blue-700 mb-4 tracking-tight"
        >
          Watch Trial Video
        </motion.h2>

        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed"
        >
          Watch the full video carefully to unlock your quiz. Stay focused till the end
        </motion.p>

        {/* Video Section — untouched */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-gray-50"
        >
          <video
            ref={videoRef}
            src="/video/video.mp4"
            autoPlay
            controls={false}
            onEnded={onEnded}
            className="w-full h-auto rounded-2xl object-cover"
          />
        </motion.div>

        {/* Action Button */}
        <motion.button
          disabled={!ended}
          onClick={() => router.push("/quiz")}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          whileHover={ended ? { scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" } : {}}
          whileTap={ended ? { scale: 0.95 } : {}}
          className={`mt-8 px-10 py-3 rounded-lg font-semibold shadow-md transform transition-all duration-300 ease-in-out ${ended
              ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95 active:bg-blue-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {ended ? "Proceed to Quiz →" : "Watch Complete Video"}
        </motion.button>


        {/* Footer */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-gray-500 mt-6 italic"
        >
          Powered by <span className="text-blue-600 font-medium">ICC</span> • Learn. Play. Excel.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}