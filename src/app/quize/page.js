"use client";
import { useSelector, useDispatch } from "react-redux";
import { markQuizCompleted } from "../../store/PlayerSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { asyncUserQuizWatched } from "../../store/actions/userAction";

const questions = [
  {
    q: "Who holds the record for the highest individual score in an ODI match?",
    options: ["Virat Kohli", "Rohit Sharma", "Chris Gayle", "Sachin Tendulkar"],
    ans: "Rohit Sharma",
  },
  {
    q: "In which year did India win its first T20 World Cup?",
    options: ["2007", "2011", "2015", "2003"],
    ans: "2007",
  },
  {
    q: "Which bowler has taken the most wickets in Test cricket?",
    options: ["Shane Warne", "James Anderson", "Muttiah Muralitharan", "Anil Kumble"],
    ans: "Muttiah Muralitharan",
  },
  {
    q: "Which bowler has taken the most wickets in Test cricket?",
    options: ["Shane Warne", "James Anderson", "Muttiah Muralitharan", "Anil Kumble"],
    ans: "Muttiah Muralitharan",
  },
  {
    q: "Which bowler has taken the most wickets in Test cricket?",
    options: ["Shane Warne", "James Anderson", "Muttiah Muralitharan", "Anil Kumble"],
    ans: "Muttiah Muralitharan",
  },
];

export default function QuizPage() {
  const { formFilled, videoWatched, formData } = useSelector((s) => s.playerReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait a bit to ensure rehydration is complete
    const timer = setTimeout(() => {
      setLoading(false);
      if (formFilled === false) {
        router.push("/talenthunt");
      } else if (formFilled === true && videoWatched === false) {
        router.push("/video");
      }
    }, 100); // Small delay to ensure rehydration

    return () => clearTimeout(timer);
  }, [formFilled, videoWatched]);


  useEffect(() => {
    if (!loading && submitted && formFilled && formData && formData.id) {
      const existingPlayers = JSON.parse(localStorage.getItem("players")) || [];

      // Find and update the player with quiz completion status
      const playerIndex = existingPlayers.findIndex(player => player.id === formData.id);

      if (playerIndex !== -1) {
        const updatedPlayers = [...existingPlayers];
        // Completely replace player data with updated data
        updatedPlayers[playerIndex] = {
          ...formData,
          quizCompleted: true
        };

        localStorage.setItem("players", JSON.stringify(updatedPlayers));
      }
    }
  }, [submitted, formFilled, formData, loading]);


  useEffect(() => {
    const handleBeforeUnload = (e) => {
      
      if (Object.keys(selected).length > 0 && !submitted) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
        return ""; // Required for other browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [selected, submitted]);

  const handleOptionChange = (i, opt) => {
    if (!submitted) setSelected({ ...selected, [i]: opt });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Pass the formData.id to the async action
    dispatch(asyncUserQuizWatched(formData.id));
  };

  const score = questions.filter((q, i) => selected[i] === q.ans).length;

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

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl mt-30 p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Cricket Knowledge Quiz
        </h2>

        <div className="space-y-8">
          {questions.map((q, i) => (
            <div
              key={i}
              className="p-5 border border-gray-200 rounded-xl bg-gray-50 hover:shadow-md transition-all"
            >
              <p className="font-semibold text-lg text-gray-800 mb-4">
                {i + 1}. {q.q}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {q.options.map((opt) => (
                  <label
                    key={opt}
                    className={`p-3 text-sm rounded-lg cursor-pointer border transition-all ${selected[i] === opt
                        ? "bg-blue-50 border-blue-500 text-blue-700 font-medium"
                        : "bg-white border-gray-300 hover:border-blue-400 hover:bg-gray-100"
                      }`}
                  >
                    <input
                      type="radio"
                      name={`q-${i}`}
                      checked={selected[i] === opt}
                      onChange={() => handleOptionChange(i, opt)}
                      disabled={submitted}
                      className="mr-2 accent-blue-600"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selected).length < questions.length}
            className={`mt-8 w-full py-3 rounded-lg font-semibold text-white shadow-md transition-all ${Object.keys(selected).length < questions.length
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            Submit Answers
          </button>
        ) : (
          <div className="mt-10 text-center bg-gray-50 border border-gray-200 rounded-xl p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Quiz Completed
            </h3>

            <p className="text-gray-700 mb-6 text-lg">
              You scored{" "}
              <span className="font-bold text-blue-600">{score}</span> out of{" "}
              <span className="font-bold">{questions.length}</span>
            </p>

            <button
              onClick={() => router.push("/payment")}
              className="bg-blue-600 text-white px-10 py-3 rounded-lg font-semibold 
             shadow-md hover:bg-blue-700 hover:shadow-lg 
             active:scale-95 active:bg-blue-800 
             transition-transform transition-colors duration-200 ease-in-out"
            >
              Finish
            </button>

          </div>
        )}
      </div>
    </div>

  );
}
