"use client";
import { useSelector, useDispatch } from "react-redux";
import { markVideoWatched } from "../../store/PlayerSlice";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  asyncUserVideoWatched,
  asyncRenderQuiz,
} from "../../store/actions/userAction";
import { motion } from "framer-motion";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";

export default function VideoPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { TalentHuntVideoTwo } = useSelector((state) => state.playerReducer);
  const { formFilled, formData, id, videoWatched ,quizCompleted } = useSelector(
    (state) => state.playerReducer
  );
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  

  console.log("Form Filled Status:", formFilled);

   useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (formFilled === false) {
        router.push("/talenthunt");
      } else if (formFilled === true && videoWatched === false) {
        router.push("/video");
      }else if(formFilled === true && videoWatched === true && quizCompleted === false){
        router.push("/quiz");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [formFilled, videoWatched,quizCompleted ]);



  const onEnded = () => {
    setEnded(true);
    localStorage.setItem("videoWatched2", "true");
    // dispatch(asyncUserVideoWatched(id));
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  if (loading) {
    return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-5  border-dotted border-[#352E74] mx-auto"></div>
          <p className="mt-4 text-gray-600 uppercase font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  const onSubmit = () => {
    // router.push("/quiz");
     router.push("/payment/" + id)
      // onClick={() => router.push("/payment/" + id)}
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center  bg-gray-100 p-0 md:p-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="relative bg-gray-100 md:rounded-2xl px-1 py-5 md:p-8 w-full max-w-4xl text-center 
        border border-gray-100 mt-0 md:mt-30 md:shadow-xl "
      >
        {/* Title */}
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-purplee mb-4 tracking-tight"
        >
       About Talent Hunt
        </motion.h2>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed"
        >
      Watch the complete video carefully to understand the full Talent Hunt registration process. Stay attentive till the end to proceed further.
        </motion.p>

        {/* Video Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative overflow-hidden rounded-1xl  border border-gray-200 bg-gray-50"
        >
          <video
            ref={videoRef}
            // src="/video/video.mp4"
            src={TalentHuntVideoTwo}
            autoPlay
            muted
            playsInline
            controls={false}
            onEnded={onEnded}
            className="w-full h-auto rounded-2xl object-cover"
          />

          {/* Custom Mute/Unmute Button */}
          <motion.button
            onClick={toggleMute}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-1 rounded-full shadow-lg transition-all duration-200"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>
        </motion.div>

        {/* Action Button */}
        <motion.button
          disabled={!ended}
          onClick={onSubmit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={
            ended
              ? {
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                }
              : {}
          }
          whileTap={ended ? { scale: 0.95 } : {}}
          className={` inline-flex items-center gap-2 mt-8 px-3 py-1.5 md:px-6 md:py-3 rounded-lg font-semibold shadow-md transform transition-all duration-300 ease-in-out ${
            ended
              ? "bg-purplee text-white hover:bg-purplee hover:shadow-lg active:scale-95 active:bg-purplee"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
      
          {ended ? (
            <>
              Proceed to Quiz <ArrowRight size={14} />
            </>
          ) : (
            "Watch Complete Video"
          )}
        </motion.button>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-gray-500 mt-6 italic"
        >
          Powered by <span className="text-purplee font-medium">ICC</span> •
          Learn. Play. Excel.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
