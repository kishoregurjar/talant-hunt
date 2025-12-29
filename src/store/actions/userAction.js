import { nanoid } from "@reduxjs/toolkit";
import { ScreenShot, talentForm  ,PaymentProcess , TalentHuntVideo ,IDproof ,TalentHuntVideoTwo} from "../PlayerSlice.js";
import axios from "../utils/axiosConfig";
import {
  ShieldX,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  saveFormData,
  markVideoWatched,
  markQuizCompleted,
  saveUserID,
  saveStudentScore,
  rehydrateState,
  quizAttemptId,
} from "../PlayerSlice";

export const asyncUserPersonalInfo = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/student/create-talent-hunt-student", user);
    console.log("Response:", res.data);
    localStorage.setItem("userId", res.data.data._id);
    dispatch(saveFormData(res.data.data));
    dispatch(saveUserID(res.data.data._id));
    dispatch(TalentHuntVideo(res.data.data.talentHuntVideo));
    console.log("TalentHuntVideo stored in Redux:", res.data.data.talentHuntVideo);
  localStorage.setItem("TalentHuntVideo", res.data.data.talentHuntVideo);


    return true;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;

      if (status === 400) {


toast.error("This user already exists. Please try with a different email or phone number.",  {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,

          icon: (
            <span className="text-red-500 text-xl   font-bold">
              <ShieldX />
            </span>
          ),
        });


        // alert(
        //   " This user already exists. Please try with a different email or phone number."
        // );
        
      } else {
        console.log(
          `Error ${status}: ${
            error.response.data.message || "Something went wrong"
          }`
        );
      }
    } else {
      // Network or unknown error
      alert("🚫 Network error. Please check your internet connection.");
    }

    console.error("Error while submitting user data:", error);
  }

  return false;
};

export const asyncUserVideoWatched = (userId) => async (dispatch, getState) => {
  console.log("video watch student id ", userId);

  try {
    const res = await axios.put(
      `student/mark-video-watched?studentId=${userId}`
    );
    dispatch(markVideoWatched());
  } catch (error) {
    console.log("error in marking video watched", error);
    dispatch(markVideoWatched());
  }
};

export const asyncRenderQuiz = (userId) => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      `student/get-randome-quize?studentId=${userId}`
    );
    console.log("quiz data ", res.data);
    dispatch(quizAttemptId(res.data.attemptId));
    return res.data.questions;
  } catch (error) {
    console.log("error in loading quiz data", error);
  }
};

export const asyncSubmitQuiz =
  (attemptId, studentId, answers) => async (dispatch, getState) => {
    try {
      console.log("Submitting quiz with:", { attemptId, studentId });

      const res = await axios.post("/student/submit-quize", {
        attemptId: attemptId,
        studentId: studentId,
        answers: answers,
      });

      console.log(" Quiz submitted successfully:", res.data.talentHuntVideo_two);
      dispatch(saveStudentScore(res.data.score));
       dispatch(TalentHuntVideoTwo(res.data.talentHuntVideo_two));
      localStorage.setItem("TalentHuntVideoTwo", res.data.talentHuntVideo_two);
      dispatch(markQuizCompleted());
      return res.data.score;
    } catch (error) {
      console.error(
        "Error submitting quiz data:",
        error.response?.data || error.message
      );

      // Optionally alert user if API returns a specific message
      if (error.response && error.response.status === 400) {
        alert(
          error.response.data?.message || "Bad Request: Quiz submission failed."
        );
      }

      return null;
    }
  };

export const asynsQRScreeenShotUpload = (file) => async (dispatch) => {
  try {
    const formData = new FormData();

    formData.append("image", file);

    const { data } = await axios.post(
      `/student/upload-payment-scereenshot`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(ScreenShot(data.data.imageUrl));
  // localStorage.setItem("screenShotUrl", JSON.stringify(data.data.imageUrl));

    
    console.log("✅ Upload response:", data);
    return data.success;
  } catch (error) {
    console.error("❌ Error while uploading screenshot:", error);
  }
};

export const asynsIdProofUpload = (file) => async (dispatch) => {
  try {
    const formData = new FormData();

    formData.append("image", file);

    const { data } = await axios.post(
     `/student/upload-payment-scereenshot`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Assuming we store it in redux or localStorage
    dispatch(IDproof(data.data.imageUrl));
    // localStorage.setItem("idProofUrl", data.data.imageUrl);
    
    console.log("✅ ID Proof Upload response:", data);
    return data.success;
  } catch (error) {
    console.error("❌ Error while uploading ID proof:", error);
  }
};

export const asynsPaymentContinue =
  (studentId, imageUrl) => async (dispatch) => {
    try {
      const { data } = await axios.post("student/save-payment-screenshot", {
        studentId: studentId,
        imageUrl: imageUrl,
      });

      console.log("✅ Payment Continue response:", data);
      // dispatch(PaymentProcess(data.data.payment));
      dispatch(PaymentProcess(true));

    } catch (error) {
      console.error("❌ Error while Payment Continue:", error);
    }
  };

export const asyncTalentForm = (studentId, cricketDetails) => async (dispatch) => {
  try {
    const payload = {
      studentId,
      "playingRole": cricketDetails.role,
      "battingStyle": cricketDetails.battingStyle,
      "bowlingStyle": cricketDetails.bowlingStyle,
      "playingLevel": cricketDetails.level,
      "experience": cricketDetails.experience || "",
      "teamName": cricketDetails.teamName || "",
      "videoLink": cricketDetails.videoLink || "",
      "consent": cricketDetails.consent || false
    };

    const res = await axios.post("/student/add-cricet-details", payload);
    console.log("Cricket details submitted successfully:", res.data);
    dispatch(talentForm(res.data.data));
    localStorage.setItem("talentFormfilled", JSON.stringify(true));
    return true;
  } catch (error) {
    console.error("Error submitting cricket details:", error);
    if (error.response) {
      console.log(`Error ${error.response.status}: ${error.response.data.message || "Something went wrong"}`);
    } else {
      alert("🚫 Network error. Please check your internet connection.");
    }
    return false;
  }
};

export const rehydrateStoreFromBackend = () => async (dispatch, getState) => {
  try {
    const storedUserId = localStorage.getItem("userId");
    const screenShotUrl = localStorage.getItem("screenShotUrl");
    const TalentHuntVideo = localStorage.getItem("TalentHuntVideo");
 const TalentHuntVideoTwo = localStorage.getItem("TalentHuntVideoTwo");   
 

    if (storedUserId) {
      const res = await axios.get(
        `student/get-talent-hunt-student-by-id?studentId=${storedUserId}`
      );
      console.log("individual student", res.data.data);

      if (res.status >= 200 && res.status < 300) {
        const userData = res.data.data;

        dispatch(
          rehydrateState({
            id: userData._id,
            formData: {
              name: userData.name || "",
              email: userData.email || "",
              phone: userData.phone || "",
              gender: userData.gender || "",
              dob: userData.dob || {},
              address: userData.address || {},
            },
            formFilled: userData.formFilled,
            videoWatched: userData.videoWatched,
            quizCompleted: userData.quizCompleted,
            PaymentProcess: userData.payment,
            // ScreenShot: screenShotUrl,
            TalentHuntVideo: TalentHuntVideo,
            TalentHuntVideoTwo: TalentHuntVideoTwo
          })
        );

        console.log("Redux store successfully rehydrated from backend");
        return { success: true, data: userData, rehydrated: true };
      }
    }
  } catch (error) {
    console.error("Error rehydrating store from backend:", error);
    return { success: false, rehydrated: false };
  }
};



export const asyncGetStudentById = (studentId) => async (dispatch, getState) => {
  try {
    const res = await axios.get(`/student/get-talent-hunt-student-by-id?studentId=${studentId}`);
    console.log("Student data:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching student:", error);
    return null;
  }
};





