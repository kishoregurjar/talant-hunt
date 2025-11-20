// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X, CircleDot } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-white
//      shadow-sm backdrop-blur-md transition-all duration-300">
//       <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
//         {/* ====== Logo ====== */}
//         <Link href="/" className="flex items-center gap-2 group">
//           {/* <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
//             <CircleDot size={22} className="text-white" />
//           </div> */}
//           {/* <div className="flex flex-col leading-tight">
//             <span className="text-xl md:text-2xl font-extrabold text-blue-700 tracking-tight">
//               ICC
//             </span>
//             <span className="text-[10px] md:text-xs text-gray-500 tracking-wide">
//               Power • Passion • Play
//             </span>
//           </div> */}
//         </Link>

//         {/* ====== Desktop Menu ====== */}
//         <div className="hidden md:flex space-x-8 font-medium items-center text-gray-700">
//           {[["HOME", "/"]].map(([label, path]) => (
//             <Link
//               key={label}
//               href={path}
//               className="hover:text-blue-600 transition-colors duration-300"
//             >
//               {label}
//             </Link>
//           ))}

//           <Link
//             href="/talenthunt"
//             className="bg-blue-600 text-white px-4 py-1 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
//           >
//             TALENT HUNT
//           </Link>
//         </div>

//         {/* ====== Mobile Menu Button ====== */}
//         <button
//           className="md:hidden text-blue-700 hover:text-blue-600 transition"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* ====== Mobile Menu ====== */}
//       {isOpen && (
//         <div className="md:hidden bg-white border-t border-blue-100 py-4 text-center shadow-lg">
//           <div className="flex flex-col space-y-3 text-gray-700 font-medium">
//             {[["Home", "/"]].map(([label, path]) => (
//               <Link
//                 key={label}
//                 href={path}
//                 className="hover:text-blue-600 transition"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {label}
//               </Link>
//             ))}
//             <Link
//               href="/talenthunt"
//               className="bg-blue-600 text-white mx-auto px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-all w-fit shadow-sm hover:shadow-md"
//               onClick={() => setIsOpen(false)}
//             >
//               TALENT HUNT
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X, ChevronDown } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [aboutOpen, setAboutOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm shadow-md">
//       <div className="max-w-7xl mx-auto px-5 py-8 flex justify-between items-center">

//         {/* ====== LOGO ====== */}
//         <Link href="/" className="flex items-center gap-2">
//           <img
//             src="images/icc-logo.png"
//             alt="Logo"
//             className="w-12 h-auto"
//           />
//         </Link>

//         {/* ====== Desktop Menu ====== */}
//         <div className="hidden md:flex space-x-8 text-white justify-center  items-center">

//           <Link href="/" className="hover:text-blue-300 transition">Home</Link>

//           {/* ==== About Us + Dropdown ==== */}
//           <div
//             className="relative group cursor-pointer"
//             onMouseEnter={() => setAboutOpen(true)}
//             onMouseLeave={() => setAboutOpen(false)}
//           >
//             <div className="flex items-center gap-1 hover:text-blue-300 transition">
//               About Us <ChevronDown size={18} />
//             </div>

//             {aboutOpen && (
//               <div className="absolute top-6 left-0 bg-white text-gray-700 shadow-lg rounded-md w-40 py-2 z-50">
//                 <Link href="/about/mission" className="block px-4 py-2 hover:bg-gray-100">Mission</Link>
//                 <Link href="/about/team" className="block px-4 py-2 hover:bg-gray-100">Team</Link>
//                 <Link href="/about/history" className="block px-4 py-2 hover:bg-gray-100">History</Link>
//               </div>
//             )}
//           </div>

//           <Link href="/ground" className="hover:text-blue-300 transition">Ground for Hire</Link>
//           <Link href="/summercamp" className="hover:text-blue-300 transition">Summer Camp</Link>
//           <Link href="/coursefee" className="hover:text-blue-300 transition">Course & Fee</Link>
//           <Link href="/gallery" className="hover:text-blue-300 transition">Gallery</Link>
//           <Link href="/events" className="hover:text-blue-300 transition">Events</Link>
//           <Link href="/contact" className="hover:text-blue-300 transition">Contact Us</Link>

//           <Link
//             href="/talenthunt"
//           >
//             Talent Hunt
//           </Link>
//         </div>

//         {/* ====== Mobile Menu Button ====== */}
//         <button
//           className="md:hidden text-white"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* ====== Mobile Menu ====== */}
//       {isOpen && (
//         <div className="md:hidden bg-white text-gray-700 py-5 shadow-xl">
//           <div className="flex flex-col space-y-4 text-center font-medium">

//             <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>

//             {/* About Dropdown Mobile */}
//             <div>
//               <div
//                 className="flex justify-center items-center gap-1 cursor-pointer"
//                 onClick={() => setAboutOpen(!aboutOpen)}
//               >
//                 About Us <ChevronDown size={18} />
//               </div>

//               {aboutOpen && (
//                 <div className="mt-2 space-y-2">
//                   <Link href="/about/mission" onClick={() => setIsOpen(false)}>Mission</Link>
//                   <Link href="/about/team" onClick={() => setIsOpen(false)}>Team</Link>
//                   <Link href="/about/history" onClick={() => setIsOpen(false)}>History</Link>
//                 </div>
//               )}
//             </div>

//             <Link href="/ground" onClick={() => setIsOpen(false)}>Ground for Hire</Link>
//             <Link href="/summercamp" onClick={() => setIsOpen(false)}>Summer Camp</Link>
//             <Link href="/coursefee" onClick={() => setIsOpen(false)}>Course & Fee</Link>
//             <Link href="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
//             <Link href="/events" onClick={() => setIsOpen(false)}>Events</Link>
//             <Link href="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>

//             <Link
//               href="/talenthunt"
//               onClick={() => setIsOpen(false)}
//             >
//               Talent Hunt
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X, ChevronDown } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [aboutOpen, setAboutOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm shadow-md">
//       <div className="max-w-7xl mx-auto px-5 py-8 grid grid-cols-3 gap-4">

//       <div>
//    <Link href="/" className="flex items-center">
//           <img
//             src="images/icc-logo.png"
//             alt="Logo"
//             className="w-12 h-auto"
//           />
//         </Link>
//       </div>

//         {/* ====== Desktop Menu ====== */}
//         <div className="hidden md:flex space-x-8 text-white justify-center  items-center">

//           <Link href="/" className="hover:text-blue-300 transition">Home</Link>

//           {/* ==== About Us + Dropdown ==== */}
//           <div
//             className="relative group cursor-pointer"
//             onMouseEnter={() => setAboutOpen(true)}
//             onMouseLeave={() => setAboutOpen(false)}
//           >
//             <div className="flex items-center gap-1 hover:text-blue-300 transition">
//               About Us <ChevronDown size={18} />
//             </div>

//             {aboutOpen && (
//               <div className="absolute top-6 left-0 bg-white text-gray-700 shadow-lg rounded-md w-40 py-2 z-50">
//                 <Link href="/about/mission" className="block px-4 py-2 hover:bg-gray-100">Mission</Link>
//                 <Link href="/about/team" className="block px-4 py-2 hover:bg-gray-100">Team</Link>
//                 <Link href="/about/history" className="block px-4 py-2 hover:bg-gray-100">History</Link>
//               </div>
//             )}
//           </div>

//           <Link href="/ground" className="hover:text-blue-300 transition">Ground for Hire</Link>
//           <Link href="/summercamp" className="hover:text-blue-300 transition">Summer Camp</Link>
//           <Link href="/coursefee" className="hover:text-blue-300 transition">Course & Fee</Link>
//           <Link href="/gallery" className="hover:text-blue-300 transition">Gallery</Link>
//           <Link href="/events" className="hover:text-blue-300 transition">Events</Link>
//           <Link href="/contact" className="hover:text-blue-300 transition">Contact Us</Link>

//           <Link
//             href="/talenthunt"
//           >
//             Talent Hunt
//           </Link>
//         </div>

//         {/* ====== Mobile Menu Button ====== */}
//         <button
//           className="md:hidden text-white"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* ====== Mobile Menu ====== */}
//       {isOpen && (
//         <div className="md:hidden bg-white text-gray-700 py-5 shadow-xl">
//           <div className="flex flex-col space-y-4 text-center font-medium">

//             <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>

//             {/* About Dropdown Mobile */}
//             <div>
//               <div
//                 className="flex justify-center items-center gap-1 cursor-pointer"
//                 onClick={() => setAboutOpen(!aboutOpen)}
//               >
//                 About Us <ChevronDown size={18} />
//               </div>

//               {aboutOpen && (
//                 <div className="mt-2 space-y-2">
//                   <Link href="/about/mission" onClick={() => setIsOpen(false)}>Mission</Link>
//                   <Link href="/about/team" onClick={() => setIsOpen(false)}>Team</Link>
//                   <Link href="/about/history" onClick={() => setIsOpen(false)}>History</Link>
//                 </div>
//               )}
//             </div>

//             <Link href="/ground" onClick={() => setIsOpen(false)}>Ground for Hire</Link>
//             <Link href="/summercamp" onClick={() => setIsOpen(false)}>Summer Camp</Link>
//             <Link href="/coursefee" onClick={() => setIsOpen(false)}>Course & Fee</Link>
//             <Link href="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
//             <Link href="/events" onClick={() => setIsOpen(false)}>Events</Link>
//             <Link href="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>

//             <Link
//               href="/talenthunt"
//               onClick={() => setIsOpen(false)}
//             >
//               Talent Hunt
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X, ChevronDown } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [aboutOpen, setAboutOpen] = useState(false);

//   return (
//    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm shadow-md">

//   {/* ==== MAIN GRID (1200px width, 113px height) ==== */}
//   <div className="w-[1200px] h-[113px] mx-auto grid grid-cols-3 items-center  ">

//     {/* ===== Column 1 — LOGO ===== */}
//     <div className="flex items-center mr-4 ">
//       <img
//         src="/images/icc-logo.png"
//         alt="ICC Logo"
//         className="w-20 h-auto "
//       />
//     </div>

//     {/* ===== Column 2 — CENTER MENU ===== */}
//     <div className="flex justify-center items-center gap-2 text-white whitespace-nowrap ml-25   ">

//       <Link href="/" className="hover:text-blue-200 transition block px-4 py-2">Home</Link>

//       <div className="relative group">
//         <div className="flex items-center gap-1 hover:text-blue-200 cursor-pointer">
//           About Us <ChevronDown size={16} />
//         </div>

//         {/* About Us Dropdown */}
//         <div className="hidden group-hover:block absolute top-6 left-0 w-40 bg-white text-gray-700 shadow-lg rounded-md py-2">
//           <Link href="/about/mission" className="block px-4 py-2">Mission</Link>
//           <Link href="/about/team" className="block px-4 py-2 ">Team</Link>
//           <Link href="/about/history" className="block px-4 py-2 ">History</Link>
//         </div>
//       </div>

//       <Link href="/ground" className=" block px-4 py-2">Ground for Hire</Link>
//       <Link href="/summercamp" className="block px-4 py-2">Summer Camp</Link>
//       <Link href="/coursefee" className="block px-4 py-2" >Course & Fee</Link>
//       <Link href="/gallery"  className="block px-4 py-2" >Gallery</Link>
//       <Link href="/events"   className="block px-4 py-2">Events</Link>
//       <Link href="/contact"  className="block px-4 py-2" >Contact Us</Link>
//       <Link href="/talenthunt"  className="block px-4 py-2" >Talent Hunt</Link>

//     </div>

//     {/* ===== Column 3 — BLANK ===== */}
//     <div></div>

//   </div>
// </nav>

//   );
// }

// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X, ChevronDown } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [aboutOpen, setAboutOpen] = useState(false);

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm shadow-md">

//       {/* GRID MAIN */}
//       <div className="w-[1200px] h-[113px] mx-auto grid grid-cols-[1fr_2fr_1fr] items-center px-4">

//         {/* ==== LOGO ==== */}
//         <div className="flex items-center">
//           <img src="/images/icc-logo.png" className="w-20" />
//         </div>

//         {/* ==== DESKTOP MENU ==== */}
//         <div className="hidden md:flex justify-center items-center gap-6 text-white whitespace-nowrap">

//           <Link href="/" className="hover:text-blue-200">Home</Link>

//           <div className="relative group">
//             <div className="flex items-center gap-1 hover:text-blue-200 cursor-pointer">
//               About Us <ChevronDown size={14} />
//             </div>

//             <div className="hidden group-hover:block absolute top-6 left-0 w-40 bg-white text-gray-800 rounded shadow-lg py-2">
//               <Link href="/about/mission" className="block px-4 py-2">Mission</Link>
//               <Link href="/about/team" className="block px-4 py-2">Team</Link>
//               <Link href="/about/history" className="block px-4 py-2">History</Link>
//             </div>
//           </div>

//           <Link href="/ground">Ground for Hire</Link>
//           <Link href="/summercamp">Summer Camp</Link>
//           <Link href="/coursefee">Course & Fee</Link>
//           <Link href="/gallery">Gallery</Link>
//           <Link href="/events">Events</Link>
//           <Link href="/contact">Contact Us</Link>
//           <Link href="/talenthunt">Talent Hunt</Link>
//         </div>

//         {/* ==== MOBILE BURGER BUTTON (VISIBLE ONLY ON MOBILE) ==== */}
//         <div className="flex justify-end md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)} className="text-white">
//             {isOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//       </div>

//       {/* ==== MOBILE MENU OPEN ==== */}
//       {isOpen && (
//         <div className="md:hidden bg-white text-gray-800 shadow-xl py-4">

//           <div className="flex flex-col space-y-3 text-center text-lg font-medium">

//             <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>

//             {/* About Dropdown (Mobile) */}
//             <div className="cursor-pointer" onClick={() => setAboutOpen(!aboutOpen)}>
//               About Us
//             </div>

//             {aboutOpen && (
//               <div className="space-y-2">
//                 <Link href="/about/mission" onClick={() => setIsOpen(false)}>Mission</Link>
//                 <Link href="/about/team" onClick={() => setIsOpen(false)}>Team</Link>
//                 <Link href="/about/history" onClick={() => setIsOpen(false)}>History</Link>
//               </div>
//             )}

//             <Link href="/ground" onClick={() => setIsOpen(false)}>Ground for Hire</Link>
//             <Link href="/summercamp" onClick={() => setIsOpen(false)}>Summer Camp</Link>
//             <Link href="/coursefee" onClick={() => setIsOpen(false)}>Course & Fee</Link>
//             <Link href="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
//             <Link href="/events" onClick={() => setIsOpen(false)}>Events</Link>
//             <Link href="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
//             <Link href="/talenthunt" onClick={() => setIsOpen(false)}>Talent Hunt</Link>
//           </div>

//         </div>
//       )}

//     </nav>
//   );
// }

"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <nav className=" fixed top-0 left-0 w-full z-50    border backdrop-blur-sm border-gray-200  ">
      {/* ==== RESPONSIVE GRID ==== */}
      <div
        className="
          xl:w-[1200px] h-[110px] mx-auto 
          xl:grid 
          flex        /* Mobile: 2 cols → Logo + Burger */
          xl:grid-cols-[1fr_2fr_1fr]  /* Desktop: 3 cols */
          items-center 
          justify-between
          px-4
          
     
        "
      >
        {/* === LOGO === */}
        <div className="items-center xl:w-40">
          {/* <img src="/images/icc-logo.png" className="w-20" /> */}
          <Image
            src="/images/icc-logo.png"
            alt="ICC Logo"
            width={80}
            height={80}
          />
        </div>

        {/* === DESKTOP MENU === */}
        <div className="hidden xl:flex justify-center items-center gap-8 text-black whitespace-nowrap ">
          <Link
            href="https://indorecricketclub.com/"
            className="hover:text-blue-200   "
          >
            Home
          </Link>

          {/* <div className="relative group">
            <div className="flex items-center  hover:text-blue-200 cursor-pointer whitespace-nowrap ">
            <Link href="https://indorecricketclub.com/about/" className="hover:text-blue-200  ">
            About Us <ChevronDown size={14} />
          </Link>
            
            </div>

            <div className="hidden group-hover:block absolute top-6 left-0 w-40 bg-white text-gray-800 rounded shadow-lg py-2">
              <Link href="https://indorecricketclub.com/the-icc-academy/" className="block px-4 py-2">
            The ICC Academy
              </Link>
              <Link href="https://indorecricketclub.com/coches/" className="block px-4 py-2">
               Coaches
              </Link>
              <Link href="https://indorecricketclub.com/facilities/" className="block px-4 py-2">
              Facilities
              </Link>
              <Link href="https://indorecricketclub.com/acheivments/" className="block px-4 py-2">
              Acheivments
              </Link>
            </div>
          </div> */}

          <div className="relative group">
            {/* FIXED: About Us + Arrow same flex container */}
            <div className="flex items-center gap-1 cursor-pointer">
              <Link
                href="https://indorecricketclub.com/about/"
              >
                About Us
              </Link>

              <ChevronDown size={14} className="mt-[2px]" />
            </div>

            <div className="hidden group-hover:block absolute top-6 left-0 w-48 bg-white text-gray-800 rounded shadow-lg py-2">
              <Link
                href="https://indorecricketclub.com/the-icc-academy/"
                className="block px-4 py-2"
              >
                The ICC Academy
              </Link>
              <Link
                href="https://indorecricketclub.com/coches/"
                className="block px-4 py-2"
              >
                Coaches
              </Link>
              <Link
                href="https://indorecricketclub.com/facilities/"
                className="block px-4 py-2"
              >
                Facilities
              </Link>
              <Link
                href="https://indorecricketclub.com/acheivments/"
                className="block px-4 py-2"
              >
                Achievements
              </Link>
            </div>
          </div>

          <Link href="https://indorecricketclub.com/services/">
            Ground for Hire
          </Link>
          <Link href="https://indorecricketclub.com/summer-camp/">
            Summer Camp
          </Link>
          <Link href="https://indorecricketclub.com/course-fee/">
            Course & Fee
          </Link>
          <Link href="https://indorecricketclub.com/projects/">Gallery</Link>
          <Link href="https://indorecricketclub.com/events/">Events</Link>
          <Link href="https://indorecricketclub.com/contact/">Contact Us</Link>
          <Link href="/talenthunt">Talent Hunt</Link>
        </div>

        <button
          className="xl:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} color="black" /> : <Menu size={26} color="black" />}
        </button>
      </div>

      {isOpen && (
        <div className=" bg-white text-gray-700 py-5 shadow-xl">
          <div className="flex flex-col space-y-4 text-left p-6">
            <Link href="https://indorecricketclub.com/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link
               href="https://indorecricketclub.com/about/"
              
            >
              About Us
            </Link>
            <Link
              href="https://indorecricketclub.com/the-icc-academy/"

            >
              The ICC Academy
            </Link>
            <Link
              href="https://indorecricketclub.com/coches/"
              
            >
              Coaches
            </Link>
            <Link
              href="https://indorecricketclub.com/facilities/"
              
            >
              Facilities
            </Link>
            <Link
              href="https://indorecricketclub.com/acheivments/"
            >
              Achievements
            </Link>

            <Link href="https://indorecricketclub.com/projects/" onClick={() => setIsOpen(false)}>
              Ground for Hire
            </Link>
            <Link href="https://indorecricketclub.com/summer-camp/" onClick={() => setIsOpen(false)}>
              Summer Camp
            </Link>
            <Link href="https://indorecricketclub.com/course-fee/" onClick={() => setIsOpen(false)}>
              Course & Fee
            </Link>
            <Link href="https://indorecricketclub.com/projects/" onClick={() => setIsOpen(false)}>
              Gallery
            </Link>
            <Link href="https://indorecricketclub.com/events/" onClick={() => setIsOpen(false)}>
              Events
            </Link>
            <Link href="https://indorecricketclub.com/contact/" onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>

            <Link href="/talenthunt" onClick={() => setIsOpen(false)}>
              Talent Hunt
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
