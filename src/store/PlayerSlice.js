"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
id: null,
  formData: null,
  formFilled: false,
  videoWatched: false,
  quizAttemptId: null,
  quizCompleted: false,
  StudentScore : 0,
  ScreenShot : null,
  PaymentProcess :false
  // talentForm: {}
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    saveFormData: (state, action) => {
      state.formData = action.payload;
      state.formFilled = true;
    },

    markVideoWatched: (state) => {
      state.videoWatched = true
    },

  

    saveUserID: (state, action) => {
      state.id = action.payload;
    },

    quizAttemptId: (state, action) => {
      state.quizAttemptId = action.payload;
    },

    saveStudentScore: (state, action) => {
      state.StudentScore = action.payload;
    },
    
    markQuizCompleted: (state) => {
      state.quizCompleted = true;
    },

 ScreenShot: (state, action) => {
      state.ScreenShot = action.payload;
    },

     PaymentProcess: (state, action) => {
      state.ScreenShot =  action.payload;
    },

    resetAll: (state) => {
      return initialState;
    },

    restoreFormData: (state, action) => {
      state.formData = action.payload;
      state.formFilled = true;
    },
   
    updateFormData: (state, action) => {
      if (state.formData) {
        state.formData = { ...state.formData, ...action.payload };
      } else {
        state.formData = action.payload;
        state.formFilled = true;
      }
    },
    talentForm: (state, action) => {
      state.talentForm = action.payload;
    },

    rehydrateState: (state, action) => {
      const { id, formData, formFilled, videoWatched, quizCompleted, ScreenShot} = action.payload;
      state.id = id || state.id;
      state.formData = formData || state.formData;
      state.formFilled = formFilled !== undefined ? formFilled : state.formFilled;
      state.videoWatched = videoWatched !== undefined ? videoWatched : state.videoWatched;
      state.quizCompleted = quizCompleted !== undefined ? quizCompleted : state.quizCompleted;
      state.ScreenShot = ScreenShot !== undefined ? ScreenShot : state.ScreenShot;

      // state.talentForm = talentForm || state.talentForm;
    }
  },
});

export const { ScreenShot,  saveStudentScore , saveFormData, markVideoWatched, quizAttemptId, markQuizCompleted, resetAll, restoreFormData, updateFormData ,saveUserID, talentForm, rehydrateState , PaymentProcess} =
  playerSlice.actions;
export default playerSlice.reducer;