import { nanoid } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig"
import { saveFormData, markVideoWatched, markQuizCompleted ,saveUserID ,talentForm, rehydrateState} from "../PlayerSlice";

// New function to rehydrate Redux store from backend on page refresh
export const rehydrateStoreFromBackend = () => async (dispatch, getState) => {
  try {
    // Check if we have a user ID stored in localStorage
    const storedUserId = localStorage.getItem('userId');
    const storedFormId = localStorage.getItem('formId');
    
    if (storedUserId) {
      // Fetch user data by user ID
      const res = await axios.get(`/users/${storedUserId}`);
      
      if (res.status >= 200 && res.status < 300) {
        const userData = res.data;
        
        // Dispatch comprehensive rehydration action
        dispatch(rehydrateState({
          id: userData.id,
          formData: userData.formData,
          formFilled: userData.formFilled,
          videoWatched: userData.videoWatched,
          quizCompleted: userData.quizCompleted,
          talentForm: userData.talentForm
        }));
        
        console.log("Redux store successfully rehydrated from backend");
        return { success: true, data: userData, rehydrated: true };
      }
    } else if (storedFormId) {
      // If we don't have user ID, try to find user by form ID
      const res = await axios.get(`/users`);
      
      if (res.status >= 200 && res.status < 300) {
        const users = res.data;
        const user = users.find(u => u.formData.id === storedFormId);
        
        if (user) {
          // Dispatch comprehensive rehydration action
          dispatch(rehydrateState({
            id: user.id,
            formData: user.formData,
            formFilled: user.formFilled,
            videoWatched: user.videoWatched,
            quizCompleted: user.quizCompleted,
            talentForm: user.talentForm
          }));
          
          // Save the main user ID for future use
          localStorage.setItem('userId', user.id);
          
          console.log("Redux store successfully rehydrated from backend");
          return { success: true, data: user, rehydrated: true };
        }
      }
    }
    
    console.log("No stored user identifiers found for rehydration");
    return { success: false, message: "No stored user identifiers found", rehydrated: true };
  } catch (error) {
    console.error("Error rehydrating store from backend:", error);
    return { success: false, error: error.message, rehydrated: true };
  }
};

export const asyncUserPersonalInfo = (user) => async (dispatch, getState) => {
  try {
    // First, check if a user with the same email already exists
    const existingUsersRes = await axios.get(`/users?formData.email=${user.email}`);
    const existingUsers = existingUsersRes.data;

    // Check if a user with the same email and name already exists
    const duplicateUser = existingUsers.find(u => 
      u.formData.email === user.email && 
      u.formData.name === user.name
    );

    if (duplicateUser) {
      console.log("User already exists:", duplicateUser);
      // If user already exists, update the existing record instead of creating a new one
      const updatedUser = {
        ...duplicateUser,
        formData: {
          ...duplicateUser.formData,
          ...user
        }
      };

      const updateRes = await axios.put(`/users/${duplicateUser.id}`, updatedUser);
      
      if (updateRes.status >= 200 && updateRes.status < 300) {
        console.log("User updated successfully:", updateRes.data);
        // Use comprehensive rehydration
        dispatch(rehydrateState({
          id: updateRes.data.id,
          formData: updateRes.data.formData,
          formFilled: updateRes.data.formFilled,
          videoWatched: updateRes.data.videoWatched,
          quizCompleted: updateRes.data.quizCompleted,
          talentForm: updateRes.data.talentForm
        }));
        
        // Save user ID to localStorage for rehydration
        localStorage.setItem('userId', updateRes.data.id);
        if (updateRes.data.formData?.id) {
          localStorage.setItem('formId', updateRes.data.formData.id);
        }
        
        return updateRes.data;
      }
    } else {
   
      const newUser = {
        id: nanoid(), // Generate ID if not present
        formData: user, 
        formFilled: true,
        videoWatched: false,
        quizCompleted: false,
        talentForm : {}
      };

      const res = await axios.post("/users", newUser);

      if (res.status >= 200 && res.status < 300) {


        console.log("User successfully added:", res.data);

const savedInRedux = await dispatch(rehydrateState({
          id: res.data.id,
          formData: res.data.formData,
          formFilled: res.data.formFilled,
          videoWatched: res.data.videoWatched,
          quizCompleted: res.data.quizCompleted,
          talentForm: res.data.talentForm
        }));
        // console.log(savedInRedux.payload.formFilled);

localStorage.setItem('userId', savedInRedux.payload.id);
        if (savedInRedux.payload.formData?.id) {
          localStorage.setItem('formId', savedInRedux.payload.formData.id);
        }
        

        // if (savedInRedux.payload.formFilled == true) {
        //   router.push("/video");
        // } else {
        //   router.push("/talenthunt");
        // }

        // dispatch(rehydrateState({
        //   id: res.data.id,
        //   formData: res.data.formData,
        //   formFilled: res.data.formFilled,
        //   videoWatched: res.data.videoWatched,
        //   quizCompleted: res.data.quizCompleted,
        //   talentForm: res.data.talentForm
        // }));
        
        // Save user ID to localStorage for rehydration

        return savedInRedux;
      } else {
        console.error("Unexpected response:", savedInRedux);
      }
    }
  } catch (error) {
    console.error("Error processing user:", error);
  }
};

export const asyncUserVideoWatched = (userId) => async (dispatch, getState) => {
  try {
    console.log("Updating videoWatched for user ID:", userId);
    
    // First, try to get the user to verify it exists
    try {
      const userRes = await axios.get(`/users/${userId}`);
      console.log("Found user:", userRes.data);
    } catch (userError) {
      console.log("User not found with ID, trying to find by formData.id");
      
      // If not found by ID, try to find user by formData.id
      try {
        const allUsersRes = await axios.get(`/users`);
        const allUsers = allUsersRes.data;
        const user = allUsers.find(u => u.formData.id === userId);
        
        if (user) {
          // Update with the correct user ID
          userId = user.id;
          console.log("Found user by formData.id, using ID:", userId);
        } else {
          throw new Error("User not found by formData.id either");
        }
      } catch (findAllError) {
        console.error("Could not find user by any method:", findAllError);
        // Dispatch Redux action anyway to update UI
        dispatch(markVideoWatched());
        return;
      }
    }

    // Find the user by ID and update videoWatched status
    const res = await axios.patch(`/users/${userId}`, {
      videoWatched: true
    });

    if (res.status >= 200 && res.status < 300) {
      dispatch(markVideoWatched());
      console.log("Video watched updated successfully:", res.data);
 
      const currentState = getState().playerReducer;
      dispatch(rehydrateState({
        ...currentState,
        videoWatched: true
      }));
    } else {
      console.error("Unexpected response while updating:", res);
    }

  } catch (error) {
    console.error("Error updating videoWatched:", error);
    // Even if API fails, update Redux state to maintain UI consistency
    dispatch(markVideoWatched());
  }
};

export const asyncUserQuizWatched = (userId) => async (dispatch, getState) => {
  try {
    console.log("Updating quizCompleted for user ID:", userId);
    
    // First, try to get the user to verify it exists
    try {
      const userRes = await axios.get(`/users/${userId}`);
      console.log("Found user:", userRes.data);
    } catch (userError) {
      console.log("User not found with ID, trying to find by formData.id");
      
      // If not found by ID, try to find user by formData.id
      try {
        const allUsersRes = await axios.get(`/users`);
        const allUsers = allUsersRes.data;
        const user = allUsers.find(u => u.formData.id === userId);
        
        if (user) {
          // Update with the correct user ID
          userId = user.id;
          console.log("Found user by formData.id, using ID:", userId);
        } else {
          throw new Error("User not found by formData.id either");
        }
      } catch (findAllError) {
        console.error("Could not find user by any method:", findAllError);
        // Dispatch Redux action anyway to update UI
        dispatch(markQuizCompleted());
        return;
      }
    }

    // Find the user by ID and update quizCompleted status
    const res = await axios.patch(`/users/${userId}`, {
      quizCompleted: true
    });

    if (res.status >= 200 && res.status < 300) {
      console.log("Quiz completed updated successfully:", res.data);
      // Update Redux state
      dispatch(markQuizCompleted());
      
      // Also update the full state to keep it consistent
      const currentState = getState().playerReducer;
      dispatch(rehydrateState({
        ...currentState,
        quizCompleted: true
      }));
    } else {
      console.error("Unexpected response while updating quizCompleted:", res);
    }

  } catch (error) {
    console.error("Error updating quizCompleted:", error);
    // Even if API fails, update Redux state to maintain UI consistency
    dispatch(markQuizCompleted());
  }
};

export const asyncTalentForm = (userId, talentData) => async (dispatch, getState) => {
  try {
    // PATCH only the 'talentForm' field of this user
    const res = await axios.patch(`/users/${userId}`, {
      talentForm: talentData
    });
    
    // Update Redux state
    dispatch(talentForm(talentData));
    
    // Also update the full state to keep it consistent
    const currentState = getState().playerReducer;
    dispatch(rehydrateState({
      ...currentState,
      talentForm: talentData
    }));
    
    if (res.status >= 200 && res.status < 300) {
      console.log("Talent form added successfully:", res.data);
    } else {
      console.error("Unexpected response:", res);
    }

  } catch (error) {
    console.error("Error updating talentForm:", error);
  }
};