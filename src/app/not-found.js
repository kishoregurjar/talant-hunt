"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SearchX, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-[#FEFEFF] p-4 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className=" w-full max-w-xl  p-6 sm:p-10 transition duration-300"
      >
        {/* Icon with small animation */}
        <motion.div
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex justify-center mb-4"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            className="h-14 w-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-sm"
          >
            <SearchX className="text-blue-600" size={30} />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-3xl md:text-4xl font-bold mb-3 text-center text-blue-700"
        >
          Page Not Found
        </motion.h1>

        {/* Sub text with cricket touch */}
        <motion.p
          initial={{ y: -6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.35 }}
          className="text-center text-gray-600 text-sm md:text-base mb-6"
        >
          Looks like this shot went outside the boundary 🏏. <br />
          The page you&apos;re trying to open doesn&apos;t exist or may have been moved.
        </motion.p>

    
        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium bg-white hover:bg-gray-50 hover:shadow-sm active:scale-95 transition"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          <button
            onClick={() => router.push("https://indorecricketclub.com/")}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition"
          >
            <Home size={16} />
            Go to Home
          </button>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
