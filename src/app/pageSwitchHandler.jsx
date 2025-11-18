// "use client";

// import LenisWrapper from "../components/lenis/leniswrapper";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {  useSelector } from "react-redux";



// export default function ProvidersInner({ children }) {
//   const { formFilled, videoWatched } = useSelector((s) => s.playerReducer);
//   const router = useRouter();

//   useEffect(() => {
//     const timer = setTimeout(() => {
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

//   return <LenisWrapper>{children}</LenisWrapper>;
// }
