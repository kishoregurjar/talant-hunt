
import { nanoid } from "@reduxjs/toolkit";
import axios from "../utils/axiosConfig"
import axios2 from "../../app/api/axiosconfig";
import { saveFormData, markVideoWatched, markQuizCompleted ,saveUserID  ,saveStudentScore ,talentForm, rehydrateState ,quizAttemptId} from "../PlayerSlice";






export const asyncUserPersonalInfo = (user) => async (dispatch, getState) => {
 
      try {
   

    const res = await axios.post("/student/create-talent-hunt-student", user);
    console.log("Response:", res.data);
    localStorage.setItem('userId', res.data.data._id);
    dispatch(saveFormData(res.data.data))
    dispatch(saveUserID(res.data.data._id))
    return true
   

  } catch (error) {

    if (error.response) {
      const status = error.response.status;

      if (status === 400) {
        alert(" This user already exists. Please try with a different email or phone number.");
      } else {
        console.log(`Error ${status}: ${error.response.data.message || "Something went wrong"}`);
      }
    } else {
      // Network or unknown error
      alert("🚫 Network error. Please check your internet connection.");
    }

    console.error("Error while submitting user data:", error);
  }
    
return false
      
};


export const asyncUserVideoWatched = (userId) => async (dispatch, getState) => {

console.log("video watch student id ", userId)

try{
      const res = await axios.put(`student/mark-video-watched?studentId=${userId}`);
      dispatch(markVideoWatched());
}catch(error){
console.log("error in marking video watched", error)
      dispatch(markVideoWatched());

}

    

  
}

export const asyncRenderQuiz = (userId) => async (dispatch, getState) => {



try{
      const res = await axios.get(`student/get-randome-quize?studentId=${userId}`);
      console.log("quiz data ", res.data)
      dispatch(quizAttemptId(res.data.attemptId));
      return res.data.questions;
}catch(error){
console.log("error in loading quiz data", error)
}

    

  
}






export const asyncSubmitQuiz = (attemptId, studentId,  answers) => async (dispatch, getState) => {
  try {
    console.log("Submitting quiz with:", { attemptId, studentId });

    const res = await axios.post("/student/submit-quize", {
      "attemptId": attemptId,
      "studentId": studentId,
      "answers" : answers
    });

    console.log(" Quiz submitted successfully:", res.data);
    dispatch(saveStudentScore(res.data.score));
  
dispatch(markQuizCompleted());
    return res.data.score; 
  } catch (error) {
    console.error("Error submitting quiz data:", error.response?.data || error.message);
    
    // Optionally alert user if API returns a specific message
    if (error.response && error.response.status === 400) {
      alert(error.response.data?.message || "Bad Request: Quiz submission failed.");
    }

    return null;
  }
};


export const rehydrateStoreFromBackend = () => async (dispatch, getState) => {
  try {
    // Check if we have a user ID stored in localStorage
    const storedUserId = localStorage.getItem('userId');
  
    
    if (storedUserId) {
 
      const res = await axios.get(`student/get-talent-hunt-student-by-id?studentId=${storedUserId}`);
      console.log("individual student" , res.data.data);
      
      if (res.status >= 200 && res.status < 300) {
        const userData = res.data.data;
        
        
        dispatch(rehydrateState({
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
          
        }));
        
        console.log("Redux store successfully rehydrated from backend");
        return { success: true, data: userData, rehydrated: true };
      }
    } 
    
  
  } catch (error) {
    console.error("Error rehydrating store from backend:", error);
    return { success: false, error: error.message, rehydrated: true };
  }
};

