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
  const { TalentHuntVideo } = useSelector((state) => state.playerReducer);
  const { formFilled, formData, id, videoWatched } = useSelector(
    (state) => state.playerReducer,
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
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [formFilled]);

  const onEnded = () => {
    setEnded(true);
    dispatch(asyncUserVideoWatched(id));
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  // Better buffering - preload more data
  useEffect(() => {
    if (videoRef.current) {
      // Optimize video buffering
      videoRef.current.setAttribute('preload', 'auto');
      videoRef.current.setAttribute('x-webkit-airplay', 'allow');
    }
  }, []);

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
    router.push("/quiz");
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
        border border-gray-100 mt-25 md:mt-25 lg:mt-23  md:shadow-xl "
      >
        {/* Title */}
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-purplee mb-4 tracking-tight"
        >
          About ICC
        </motion.h2>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed"
        >
          Please watch the club-related video carefully to understand the training environment, facilities, and guidelines / कृपया क्लब से संबंधित वीडियो ध्यान से देखें, ताकि ट्रेनिंग माहौल, सुविधाओं और नियमों की जानकारी मिल सके 
        </motion.p>

        {/* Video Section */}
        {/* <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative overflow-hidden rounded-1xl  border border-gray-200 bg-gray-50"
        >
          <video
            ref={videoRef}
            // src="/video/video.mp4"
            src={TalentHuntVideo}
            autoPlay
            muted
            playsInline
            controls={false}
            onEnded={onEnded}
            className="w-full h-auto rounded-2xl object-cover"
          />

          
          <motion.button
            onClick={toggleMute}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-1 rounded-full shadow-lg transition-all duration-200"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>
        </motion.div> */}

        {/* <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative overflow-hidden rounded-2xl border border-gray-200 bg-red-500 w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto"
        >
          
          <div className="w-full flex items-center justify-center">
            <video
              ref={videoRef}
              src={TalentHuntVideo}
              autoPlay
              muted
              playsInline
              controls={false}
              onEnded={onEnded}
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
            />
          </div>

         
          <motion.button
            onClick={toggleMute}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all duration-200"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX size={16} className="sm:w-5 sm:h-5" />
            ) : (
              <Volume2 size={16} className="sm:w-5 sm:h-5" />
            )}
          </motion.button>
        </motion.div> */}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative overflow-hidden rounded-2xl border border-gray-200  w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto"
        >
          {/* Responsive Video Container */}
          <div className="w-full flex justify-center">
            {/* 🔥 Video Wrapper (matches video size) */}
            <div className="relative inline-block">
              <video
                ref={videoRef}
                src={TalentHuntVideo}
                autoPlay
                muted
                playsInline
                preload="auto"
                controls={false}
                onEnded={onEnded}
                className="max-w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                style={{ backgroundColor: '#000' }}
              />

              {/* ✅ Mute Button — ALWAYS on video */}
              <motion.button
                onClick={toggleMute}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-1.5 sm:p-2 rounded-full shadow-lg transition-all duration-200"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX size={16} className="sm:w-5 sm:h-5" />
                ) : (
                  <Volume2 size={16} className="sm:w-5 sm:h-5" />
                )}
              </motion.button>
            </div>
          </div>
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
