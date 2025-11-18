

"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { rehydrateStoreFromBackend } from "../store/actions/userAction";

const RehydrationTest = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrateStoreFromBackend());
  }, [dispatch]);

  return null; 
};

export default RehydrationTest;
