
"use client"
export default function Home() {
  return <h1>ABOUT</h1>
}




// // import React from 'react'

// // const page = () => {
// //   return (

// //     <div>
// //       <h1>about page</h1>
// //     </div>
// //   )
// // }

// "use client";

// import Image from "next/image";
// import React from "react";

// export default function about() {
//   return (
//     <div className="bg-black text-white">
//       {/* Hero Section */}
//       <section className="pt-28 pb-16 text-center border-b border-red-600">
//         <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-3">
//           About Us
//         </h1>
//         <p className="text-gray-400">Home / About Us</p>
//       </section>

//       {/* Intro Section */}
//       <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
//         <div>
//           <p className="text-sm text-red-500 mb-2">WHAT WE DO</p>
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             We teach cricket for all skill levels
//           </h2>
//           <p className="text-gray-300 mb-6">
//             Cricket coaching focused on developing talent, enhancing life skills
//             and improving fitness. Cricket for life.
//           </p>

//           <div className="flex items-center space-x-3">
//             <Image
//               src="/images/coach4.jfif"
//               alt="Coach"
//               width={50}
//               height={50}
//               className="rounded-full"
//             />
//             <div>
//               <h4 className="font-semibold text-red-400">Sumit Panda</h4>
//               <p className="text-gray-400 text-sm">Cricket Coach</p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <p className="text-gray-300 leading-relaxed">
//             At CricketVerse Academy, we provide a dynamic environment for
//             aspiring cricketers to learn, grow, and excel. Our training focuses
//             on physical fitness, tactical understanding, and mental strength.
//             <br />
//             <br />
//             We cater to players from beginners to advanced professionals,
//             ensuring every student achieves their full potential both on and off
//             the field.
//           </p>
//         </div>
//       </section>

//       {/* Mini Gallery */}
//       <section className="max-w-6xl mx-auto px-4 py-12 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {[
//           {
//             img: "/images/coaching-for-everyone.jpeg",
//             title: "Coaching for Everyone",
//           },
//           {
//             img: "/images/coaching-for-everyone.jfif",
//             title: "Elite Sessions",
//           },
//           {
//             img: "/images/personal-coaching.jfif",
//             title: "One-on-One Coaching",
//           },
//         ].map((item, i) => (
//           <div
//           key={i}
//           className="rounded-xl overflow-hidden group bg-zinc-900 p-3 shadow-md hover:shadow-red-600/30 transition-all duration-300"
//         >
//           <div className="relative w-full h-60 rounded-xl overflow-hidden">
//             <Image
//               src={item.img}
//               alt={item.title}
//               width={400}
//               height={300}
//               className="object-cover w-full h-full rounded-xl transform transition-transform duration-500 group-hover:scale-110"
//             />
        
//             {/* Optional overlay for hover effect */}
//             <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//           </div>
        
//           <h3 className="mt-4 text-center text-lg font-semibold text-white group-hover:text-red-500 transition-colors duration-300">
//             {item.title}
//           </h3>
//         </div>
        
//         ))}
//       </section>

//       {/* Team Photo */}
//       <section className="max-w-6xl mx-auto px-4 py-12">
//         <Image
//           src="/images/aboutimage.jpeg"
//           alt="Team photo"
//           width={1200}
//           height={600}
//           className="rounded-2xl object-cover w-full"
//         />
//       </section>

//       {/* Coaches Section */}
//       <section className="max-w-6xl mx-auto px-4 py-16">
//         <div className="text-center mb-10">
//           <p className="text-sm text-red-500 mb-2">COACHES</p>
//           <h2 className="text-3xl md:text-4xl font-bold">Meet Our Coaches</h2>
//           <p className="text-gray-400 mt-3">
//             Our experienced coaches are passionate about helping players reach
//             their potential.
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {[
//             {
//               name: "Umar Muneer",
//               role: "Coach",
//               img: "/images/coach2.jfif",
//             },
//             {
//               name: "Sumit Panda",
//               role: "Head Coach",
//               img: "/images/coach1.jfif",
//             },
//             {
//               name: "Craig Wilson",
//               role: "Coach",
//               img: "/images/coach4.jfif",
//             },
//           ].map((coach, i) => (
//             <div
//               key={i}
//               className="text-center bg-zinc-900 p-6 rounded-xl shadow-md hover:shadow-red-600/20 transition-all duration-300"
//             >
//               <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4  shadow-lg">
//                 <Image
//                   src={coach.img}
//                   alt={coach.name}
//                   width={200}
//                   height={200}
//                   className="object-cover w-full h-full"
//                 />
//               </div>

//               <h3 className="font-semibold text-xl text-white">{coach.name}</h3>
//               <p className="text-gray-400">{coach.role}</p>
//             </div>

//           ))}


//         </div>
//       </section>

//       {/* Testimonial + Stats Section */}
//       <section className="bg-zinc-950 py-16">
//         <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
//           <Image
//             src="/images/experience-image.jfif"
//             alt="Testimonial"
//             width={500}
//             height={400}
//             className="rounded-xl object-cover w-full"
//           />

//           <div>
//             <blockquote className="text-gray-300 italic mb-6">
//               "CricketVerse Academy truly transformed my cricketing skills and
//               confidence. The coaches provide personal attention and make every
//               session enjoyable."
//             </blockquote>
//             <p className="font-semibold text-red-400">– Kiran Sharma</p>

//             <div className="grid grid-cols-3 gap-4 mt-8 text-center">
//               <div>
//                 <h3 className="text-3xl font-bold text-red-500">95+</h3>
//                 <p className="text-gray-400 text-sm">Players</p>
//               </div>
//               <div>
//                 <h3 className="text-3xl font-bold text-red-500">10+</h3>
//                 <p className="text-gray-400 text-sm">Years</p>
//               </div>
//               <div>
//                 <h3 className="text-3xl font-bold text-red-500">15+</h3>
//                 <p className="text-gray-400 text-sm">Clubs</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Latest News */}
//       <section className="max-w-6xl mx-auto px-4 py-16">
//         <div className="text-center mb-10">
//           <p className="text-sm text-red-500 mb-2">NEWS</p>
//           <h2 className="text-3xl md:text-4xl font-bold">Latest News</h2>
//         </div>

//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {[
//             {
//               title: "SCPA selects XI vs Scindia School",
//               img: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
//             },
//             {
//               title:
//                 "Unleash your inner champion – Learn to play like a pro!",
//               img: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
//             },
//             {
//               title:
//                 "Path to becoming a world-class cricketer starts here!",
//               img: "https://images.unsplash.com/photo-1617196036738-9d4e3b9db93b",
//             },
//           ].map((news, i) => (
//             <div
//               key={i}
//               className="rounded-xl overflow-hidden bg-zinc-900 hover:bg-zinc-800 transition-all duration-300"
//             >
//               <Image
//                 src={news.img}
//                 alt={news.title}
//                 width={400}
//                 height={250}
//                 className="object-cover w-full h-52"
//               />
//               <div className="p-4">
//                 <h4 className="font-semibold mb-2">{news.title}</h4>
//                 <button className="text-red-500 text-sm hover:underline">
//                   Read More →
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }




