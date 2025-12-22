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
  PaymentProcess :false,
  TalentHuntVideo : null,
  IDproof: null,

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



      TalentHuntVideo: (state, action) => {
      state.TalentHuntVideo = action.payload;
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


     IDproof: (state, action) => {
      state.IDproof = action.payload;
    },

     PaymentProcess: (state, action) => {
      state.PaymentProcess =  action.payload;
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
      const { id, formData, formFilled, videoWatched, quizCompleted, ScreenShot,PaymentProcess, TalentHuntVideo } = action.payload;
      state.id = id || state.id;
      state.formData = formData || state.formData;
      state.formFilled = formFilled !== undefined ? formFilled : state.formFilled;
      state.videoWatched = videoWatched !== undefined ? videoWatched : state.videoWatched;
      state.quizCompleted = quizCompleted !== undefined ? quizCompleted : state.quizCompleted;
      // state.ScreenShot = ScreenShot !== undefined ? ScreenShot : state.ScreenShot;
      state.PaymentProcess = PaymentProcess !== undefined ? PaymentProcess : state.PaymentProcess;
      state.TalentHuntVideo = TalentHuntVideo !== undefined ? TalentHuntVideo : state.TalentHuntVideo;

      // state.talentForm = talentForm || state.talentForm;
    }
  },
});

  // talentForm: {}
export const { ScreenShot, saveStudentScore , saveFormData, markVideoWatched, quizAttemptId, markQuizCompleted, resetAll, restoreFormData, updateFormData ,saveUserID, talentForm, rehydrateState , PaymentProcess , TalentHuntVideo ,IDproof } =
  playerSlice.actions;
export default playerSlice.reducer;