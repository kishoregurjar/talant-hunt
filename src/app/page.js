"use client"
export default function Home() {
  return <h1>HOME</h1>
}

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import RehydrationTest from "../components/RehydrationTest";

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
//       {/* Rehydration Test Component */}
//       <RehydrationTest />
      
//       {/* ================= HERO SECTION ================= */}
//       <section className="relative h-[80vh] sm:h-[90vh] md:h-screen bg-white flex items-center justify-center">
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-opacity-50 grayscale"
//           style={{ backgroundImage: "url('/images/homeimage.jpg')" }}
//         />
//         <div className="absolute inset-0 bg-black/50 grayscale-opacity-50" />
//         <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
//         <div className="absolute text-center top-22  px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl sm:text-5xl md:text-8xl font-extrabold uppercase mb-2 tracking-wider">
//             The CricketVerse
//           </h1>
//           <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
//             A premier cricket event bringing together top players and clubs from across the nation.
//           </p>
//           {/* <Link
//             href="/contact"
//             className="bg-red-600 hover:bg-red-700 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold rounded-md transition"
//           >
//             Contact Us
//           </Link> */}
//         </div>
//       </section>

//       {/* ================= ABOUT SECTION ================= */}
//       <section className="py-16 sm:py-20 bg-black text-center">
//         <h2 className="text-2xl sm:text-3xl font-bold text-red-500  uppercase  tracking-wide">
//           About
//         </h2>
//         <h2 className="text-3xl sm:text-4xl font-bold uppercase mb-10 text-white tracking-wide">
//           The CricketVerse
//         </h2>
//         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-4 sm:px-6">
//           <div className="relative">
//             <Image
//               src="/images/aboutimage.jpeg"
//               alt="about"
//               width={600}
//               height={400}
//               className=" shadow-lg object-cover w-full h-auto"
//             />
//           </div>
//           <div className="text-left text-gray-300 space-y-6">
//             <p>
//               The Cricket Bowl Series is an annual cricket showcase event that unites
//               top academies and rising players. We aim to build the next generation
//               of cricketing excellence through world-class tournaments and training.
//             </p>
//             <Link
//               href="/about"
//               className="bg-red-600 hover:bg-red-700 px-6 py-2  transition inline-block"
//             >
//               Learn More
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ================= PARTNER CLUBS ================= */}
//       <section className="py-16 sm:py-20 bg-[#111] text-center text-white">
//         <h2 className="text-3xl sm:text-4xl font-bold uppercase mb-12 tracking-wide">
//           Featured Players
//         </h2>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-6">
//           {[
//             {
//               name: "Ritik",
//               img: "/images/player2.png",
//               link: "#",
//             },
//             {
//               name: "Neha",
//               img: "/images/player1.png",
//               link: "#",
//             },
//             {
//               name: "Rohit",
//               img: "/images/player3.png",
//               link: "#",
//             },
//             {
//               name: "Gaurav",
//               img: "/images/player4.png",
//               link: "#",
//             },
//             {
//               name: "Ganesh",
//               img: "/images/player2.png",
//               link: "#",
//             },
//           ].map((club, i) => (
//             <div
//               key={i}
//               className="flex flex-col items-center bg-[#1a1a1a] p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:bg-[#222] hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:-translate-y-1"
//             >
//               <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-4 rounded-full overflow-hidden shadow-lg">
//                 <Image
//                   src={club.img}
//                   alt={club.name}
//                   width={150}
//                   height={150}
//                   className="object-cover w-full h-full rounded-full"
//                 />
//               </div>

//               <h3 className="text-lg sm:text-xl font-semibold">{club.name}</h3>
//               <Link
//                 href={club.link}
//                 className="text-red-500 text-sm sm:text-base mt-2 hover:underline"
//               >
//                 Learn More
//               </Link>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= OUR EVENTS ================= */}
//       <section className="py-16 sm:py-20 bg-black text-center">
//         <h2 className="text-3xl sm:text-4xl font-bold uppercase mb-12 tracking-wide">
//           Our Events
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-6">
//           {[
//             {
//               name: " T20 Tournament",
//               img: "/images/t20.png",
//               link: "#",
//             },
//             {
//               name: "One Day Tournamnet",
//               img: "/images/one-day.png",
//               link: "#",
//             },
//             {
//               name: "Test Championship",
//               img: "/images/test.png",
//               link: "#",
//             },
//             {
//               name: "Inter Club Tournament",
//               img: "/images/interclub.png",
//               link: "#",
//             },
//           ].map((event, i) => (
//             <div
//               key={i}
//               className="bg-[#1a1a1a] rounded-xl p-4 sm:p-6 hover:scale-105 transition shadow-md hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]"
//             >
//               {/* Event Image */}
//               <div className="w-full h-40 sm:h-48 rounded-lg overflow-hidden mb-4">
//                 <Image
//                   src={event.img}
//                   alt={event.name}
//                   width={400}
//                   height={300}
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               {/* Event Title */}
//               <h3 className="text-lg sm:text-xl font-semibold mb-2">
//                 {event.name}
//               </h3>

//               {/* Learn More */}
//               <Link
//                 href={event.link}
//                 className="text-red-500 hover:underline text-xs sm:text-sm"
//               >
//                 Learn More
//               </Link>
//             </div>
//           ))}
//         </div>
//       </section>


//       {/* ================= UPCOMING EVENTS ================= */}
//       <section className="py-16 sm:py-20 bg-[#111] text-center">
//         <h2 className="text-3xl sm:text-4xl font-bold uppercase mb-12 tracking-wide">
//           Upcoming Events
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 sm:px-6">
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="bg-[#1a1a1a] p-4 sm:p-6 rounded-xl hover:bg-[#222] transition"
//             >
//               <Image
//                 src={`/images/summercamp.png`}
//                 alt="event"
//                 width={400}
//                 height={250}
//                 className="rounded-lg mb-4 w-full h-auto"
//               />
//               <h3 className="text-lg sm:text-xl font-semibold mb-2">Summer Championship</h3>
//               <p className="text-gray-400 mb-1 text-sm sm:text-base">
//                 Date: July 11–13, 2025
//               </p>
//               <p className="text-gray-500 text-xs sm:text-sm mb-3">
//                 Venue: National Cricket Ground
//               </p>
//               <Link
//                 href="#"
//                 className="text-red-500 hover:underline text-xs sm:text-sm"
//               >
//                 Learn More
//               </Link>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= GALLERY ================= */}
//       <section className="py-16 sm:py-20 bg-black text-center">
//         <h2 className="text-3xl sm:text-4xl font-bold uppercase mb-12 tracking-wide">
//           Stay Connected
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 max-w-6xl mx-auto px-4 sm:px-6">
//           {[1, 2, 3, 4, 5].map((i) => (
//             <div key={i} className="overflow-hidden rounded-xl">
//               <Image
//                 src="https://images.unsplash.com/photo-1621984693063-3cf1cc9436b5?auto=format&fit=crop&w=800&q=80"
//                 alt="gallery"
//                 width={300}
//                 height={200}
//                 className="object-cover hover:scale-110 transition-transform duration-500 w-full h-full"
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= CTA SECTION ================= */}
//       <section className="py-16 sm:py-20 bg-red-600 text-center relative">
//         <div className="absolute inset-0 bg-black bg-opacity-40" />
//         <div className="relative z-10 max-w-4xl mx-auto px-4">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase mb-6">
//             Interested in Learning More?
//           </h2>
//           <Link
//             href="/contact"
//             className="bg-white text-black font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-md hover:bg-gray-200 transition inline-block"
//           >
//             Contact Us
//           </Link>
//         </div>
//       </section>

//       {/* ================= FOOTER ================= */}

//     </div>
//   );
// }