"use client";
import { Provider , useSelector } from "react-redux";
import { store } from "../store/store";
import LenisWrapper from "../components/lenis/leniswrapper";
import { useEffect, useState } from "react";
import { rehydrateStoreFromBackend } from "../store/actions/userAction";
import Loader from "../components/loader/Loader";


export default function Providers({ children }) {
  const [rehydrated, setRehydrated] = useState(false);
 
  useEffect(() => {
 
    store.dispatch(rehydrateStoreFromBackend()).then(() => {
      setRehydrated(true);
    });
  }, []);




  if (!rehydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-5  border-dotted border-[#352E74] mx-auto"></div>
          <p className="mt-4 text-gray-600 uppercase font-bold">Loading...</p>
        </div>
      </div>
    );
  }


  //   if (!rehydrated) {
  //   return <Loader/>
    
  // }

  return (  
    <Provider store={store}>
      <LenisWrapper>{children}</LenisWrapper>
    </Provider>
  );
}

