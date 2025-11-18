"use client";
import { Provider , useSelector } from "react-redux";
import { store } from "../store/store";
import LenisWrapper from "../components/lenis/leniswrapper";
import { useEffect, useState } from "react";
import { rehydrateStoreFromBackend } from "../store/actions/userAction";



export default function Providers({ children }) {
  const [rehydrated, setRehydrated] = useState(false);
//   const { formFilled, videoWatched, } = useSelector((s) => s.playerReducer);

//  useEffect(() => {
//     const timer = setTimeout(() => {
      
//       if (formFilled === false) {
//         router.push("/talenthunt");
//       } else if (formFilled === true && videoWatched === false) {
//         router.push("/video");
//       }else if (formFilled === true && videoWatched === true) {
//         router.push("/quiz");
//       }
//     }, 100);
//     return () => clearTimeout(timer);
//   }, [formFilled, videoWatched]);

 
  useEffect(() => {
 
    store.dispatch(rehydrateStoreFromBackend()).then(() => {
      setRehydrated(true);
    });
  }, []);




  if (!rehydrated) {
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
    <Provider store={store}>
      <LenisWrapper>{children}</LenisWrapper>
    </Provider>
  );
}

// "use client";
// import { store } from "../store/store";
// import { Provider , useSelector } from "react-redux";
// import { rehydrateStoreFromBackend } from "../store/actions/userAction";
// import ProvidersInner from "./pageSwitchHandler";

// import { useEffect, useState } from "react";


// export default function Providers({ children }) {
//   const [rehydrated, setRehydrated] = useState(false);

//   useEffect(() => {
//     store.dispatch(rehydrateStoreFromBackend()).then(() => {
//       setRehydrated(true);
//     });
//   }, []);

//   if (!rehydrated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Provider store={store}>
//       <ProvidersInner>{children}</ProvidersInner>
//     </Provider>
//   );
// }