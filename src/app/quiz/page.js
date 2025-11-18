
"use client";
import { useSelector, useDispatch } from "react-redux";
import { markQuizCompleted } from "../../store/PlayerSlice";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { asyncUserQuizWatched ,asyncRenderQuiz  } from "../../store/actions/userAction";
import { motion } from "framer-motion";
import { asyncSubmitQuiz } from "../../store/actions/userAction";

import {
  ArrowRight
} from "lucide-react";


// const questions = [
//   {
//     q: "Who holds the record for the highest individual score in an ODI match? (किस खिलाड़ी के नाम एकदिवसीय मैच में सर्वाधिक व्यक्तिगत स्कोर का रिकॉर्ड है?)",
//     options: [
//       "Virat Kohli (विराट कोहली)",
//       "Rohit Sharma (रोहित शर्मा)",
//       "Chris Gayle (क्रिस गेल)",
//       "Sachin Tendulkar (सचिन तेंदुलकर)",
//     ],
//     ans: "Rohit Sharma (रोहित शर्मा)",
//   },
//   {
//     q: "In which year did India win its first T20 World Cup? (भारत ने अपना पहला टी20 विश्व कप किस वर्ष जीता था?)",
//     options: [
//       "2007 (२००७)",
//       "2011 (२०११)",
//       "2015 (२०१५)",
//       "2003 (२००३)",
//     ],
//     ans: "2007 (२००७)",
//   },
//   {
//     q: "Which bowler has taken the most wickets in Test cricket? (टेस्ट क्रिकेट में सबसे अधिक विकेट किस गेंदबाज़ ने लिए हैं?)",
//     options: [
//       "Shane Warne (शेन वॉर्न)",
//       "James Anderson (जेम्स एंडरसन)",
//       "Muttiah Muralitharan (मुथैया मुरलीधरन)",
//       "Anil Kumble (अनिल कुंबले)",
//     ],
//     ans: "Muttiah Muralitharan (मुथैया मुरलीधरन)",
//   },
//   {
//     q: "Which Indian cricketer is known as the 'Captain Cool'? (कौन सा भारतीय क्रिकेटर 'कैप्टन कूल' के नाम से प्रसिद्ध है?)",
//     options: [
//       "Virat Kohli (विराट कोहली)",
//       "Rohit Sharma (रोहित शर्मा)",
//       "MS Dhoni (एम. एस. धोनी)",
//       "Rahul Dravid (राहुल द्रविड़)",
//     ],
//     ans: "MS Dhoni (एम. एस. धोनी)",
//   },
//   {
//     q: "Which country won the 2019 ICC Cricket World Cup? (किस देश ने 2019 आईसीसी क्रिकेट विश्व कप जीता था?)",
//     options: [
//       "India (भारत)",
//       "England (इंग्लैंड)",
//       "Australia (ऑस्ट्रेलिया)",
//       "New Zealand (न्यूज़ीलैंड)",
//     ],
//     ans: "England (इंग्लैंड)",
//   },
// ];

export default function QuizPage() {
  const { formFilled, videoWatched, id , quizAttemptId , quizCompleted , StudentScore} = useSelector((s) => s.playerReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState([]); 
  const [score , setScore]= useState()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (formFilled === false) {
        router.push("/talenthunt");
      } else if (formFilled === true && videoWatched === false) {
        router.push("/video");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [formFilled, videoWatched]);


useEffect(() => {
  const fetchQuestions = async () => {
    if ( formFilled && videoWatched) {
      try {
        const fiveQuestions = await dispatch(asyncRenderQuiz(id));
        setQuestions(fiveQuestions); 
           setLoading(false);
       
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    }
  };

  fetchQuestions();
}, [formFilled, videoWatched, dispatch ,id]);

// useEffect(() => {
//     const timer = setTimeout(() => {
//         //     setLoading(false);
//       if (formFilled === false) {
//         router.push("/talenthunt");
//       } else if (formFilled === true && videoWatched === false) {
//         router.push("/video");
//       } else if (formFilled === true && videoWatched === true) {
//         router.push("/quiz");
//       }
//     }, 100);
//     return () => clearTimeout(timer);
//   }, [formFilled, videoWatched, router]);



// useEffect(() => {
//   console.log(answers);  // Ab updated state dikhega
// }, [answers]);

  // useEffect(() => {
  //   if (!loading && submitted && formFilled && formData && formData.id) {
  //     const existingPlayers = JSON.parse(localStorage.getItem("players")) || [];
  //     const playerIndex = existingPlayers.findIndex((p) => p.id === formData.id);
  //     if (playerIndex !== -1) {
  //       const updatedPlayers = [...existingPlayers];
  //       updatedPlayers[playerIndex] = { ...formData, quizCompleted: true };
  //       localStorage.setItem("players", JSON.stringify(updatedPlayers));
  //     }
  //   }
  // }, [submitted, formFilled, formData, loading]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (Object.keys(selected).length > 0 && !submitted) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [selected, submitted]);

 



  const handleOptionChange = (index, selectedOption) => {
    if (submitted) return;
  
    const updatedSelected = { ...selected, [index]: selectedOption };
    setSelected(updatedSelected);
  
    const questionId = questions[index].id;
  
    // Check if the question already exists in the answers array
    setAnswers((prevAnswers) => {
      const existingIndex = prevAnswers.findIndex((ans) => ans.questionId === questionId);
  
      if (existingIndex !== -1) {
        // If it exists → update the selectedOption
        const updated = [...prevAnswers];
        updated[existingIndex].selectedOption = selectedOption;
        return updated;
      } else {
        // If not → add new entry
        return [...prevAnswers, { questionId, selectedOption }];
      }
    });
  };



  const handleSubmit = () => {
    const score = dispatch(asyncSubmitQuiz(quizAttemptId, id,answers));
    setScore(score)
    setSubmitted(true);
    // router.push("/payment");
  };

  // const score = questions.filter((q, i) => selected[i] === q.ans).length;

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
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-4xl bg-white shadow-xl rounded-2xl mt-15 p-4 md:p-8 border border-gray-100"
      >
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-3xl font-bold text-center text-blue-700 mb-8"
        >
          Cricket Knowledge Quiz
        </motion.h2>

        <div className="space-y-8">
          { questions && questions.length > 0 ? (  questions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:shadow-md transition-all"
            >
              <p className="font-semibold text-m text-gray-800 mb-4">
                {i + 1}. {q.q}
              </p>

       


<div className="grid grid-cols-2 gap-3">
  {q.options.map((opt) => (
    <label
      key={opt}
      className={`p-3 text-sm rounded-lg cursor-pointer border transition-all 
        ${
          selected[i] === opt
            ? "bg-blue-50 border-blue-600 text-blue-700 font-medium" // selected state
            : "bg-white border-gray-300 hover:border-blue-400 hover:bg-gray-100"
        }`}
    >
      <input
        type="radio"
        name={`q-${i}`}
        checked={selected[i] === opt}
        onChange={() => handleOptionChange(i, opt)}
        disabled={submitted} // disables input after submit
        className="mr-2 accent-blue-600"
      />
      {opt}
    </label>
  ))}
</div>
            </motion.div>
          ))):( 
            

quizCompleted == true ? (
  <h1 className="text-center text-gray-600">
    You have already completed the quiz.
  </h1>
) : (
  <h1 className="text-center text-gray-600">
    Loading quiz questions...
  </h1>
)
       

)}













        </div>

        {questions && questions.length > 0 && !submitted ? (
          <motion.button
            onClick={handleSubmit}
            // disabled={Object.keys(selected).length < questions.length}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`mt-8 w-full py-3 rounded-lg font-semibold text-white shadow-md transition-all ${
              Object.keys(selected).length < questions.length
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Submit Answers
          </motion.button>
        ) : (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mt-10 text-center bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-sm"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Quiz Completed
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              You scored{" "}
              <span className="font-bold text-blue-600">{StudentScore}</span> out of{" "}
              <span className="font-bold">5</span>
            </p>
            <motion.button
              onClick={() => router.push("/payment")}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >

             {quizCompleted ? <>Next <ArrowRight size={14} /></> : "Finish"}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
