// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-gradient-to-r from-green-700 to-green-500 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <Link href="/" className="text-2xl font-bold tracking-wide">
//           Cricket Club
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-6 text-lg">
//           <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
//           <Link href="/player" className="hover:text-yellow-300 transition">Players</Link>
//           <Link href="/service" className="hover:text-yellow-300 transition">Services</Link>
//           <Link href="/about" className="hover:text-yellow-300 transition">About</Link>
//           <Link href="/login" className="hover:bg-yellow-400 hover:text-black px-3 py-1 rounded-md transition">Login</Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-green-600 px-4 py-3 space-y-3">
//           <Link href="/" className="block hover:text-yellow-300">Home</Link>
//           <Link href="/players" className="block hover:text-yellow-300">Players</Link>
//           <Link href="/services" className="block hover:text-yellow-300">Services</Link>
//           <Link href="/about" className="block hover:text-yellow-300">About</Link>
//           <Link href="/login" className="block hover:bg-yellow-400 hover:text-black px-3 py-1 rounded-md">Login</Link>
//         </div>
//       )}
//     </nav>
//   );
// }

// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0 border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <span className="text-2xl font-bold text-green-700">Cricket Verse</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-8 font-medium">
//           <Link href="/" className="text-gray-700 hover:text-green-600 transition">
//             Home
//           </Link>
//           <Link href="/player" className="text-gray-700 hover:text-green-600 transition">
//             Players
//           </Link>
//           <Link href="/service" className="text-gray-700 hover:text-green-600 transition">
//             Services
//           </Link>
//           <Link href="/about" className="text-gray-700 hover:text-green-600 transition">
//             About
//           </Link>
//           <Link
//             href="/login"
//             className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition"
//           >
//             Login
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-green-700 hover:text-green-900 transition"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white shadow-lg border-t border-gray-200 py-3">
//           <div className="flex flex-col items-center space-y-3 font-medium">
//             <Link href="/" className="text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
//               Home
//             </Link>
//             <Link href="/player" className="text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
//               Players
//             </Link>
//             <Link href="/service" className="text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
//               Services
//             </Link>
//             <Link href="/about" className="text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
//               About
//             </Link>
//             <Link
//               href="/login"
//               className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition"
//               onClick={() => setIsOpen(false)}
//             >
//               Login
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
// import { Menu, X } from "lucide-react";
// import { CircleDot } from "lucide-react"; // cricket ball icon feel

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0 border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
//         {/* ====== Logo ====== */}
//         <Link href="/" className="flex items-center gap-2 group">
//           <div className="relative flex items-center justify-center">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-600 to-green-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
//               <CircleDot size={22} className="text-white" />
//             </div>
//           </div>
//           <div className="flex flex-col leading-tight">
//             <span className="text-xl md:text-2xl font-extrabold text-green-700 tracking-tight">
//               Cricket<span className="text-green-500">Verse</span>
//             </span>
//             <span className="text-[10px] md:text-xs text-gray-500 tracking-wide">
//               Play. Passion. Power.
//             </span>
//           </div>
//         </Link>

//         {/* ====== Desktop Menu ====== */}
//         <div className="hidden md:flex space-x-8 font-medium">
//           <Link href="/" className="text-gray-700 hover:text-green-600 transition">
//             Home
//           </Link>
//           <Link href="/player" className="text-gray-700 hover:text-green-600 transition">
//             Players
//           </Link>
//           <Link href="/service" className="text-gray-700 hover:text-green-600 transition">
//             Services
//           </Link>
//           <Link href="/about" className="text-gray-700 hover:text-green-600 transition">
//             About
//           </Link>
//           <Link href="/talentform" className="text-gray-700 hover:text-green-600 transition">
//             Talentform
//           </Link>
//           <Link
//             href="/login"
//             className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition"
//           >
//             Login
//           </Link>
//         </div>

//         {/* ====== Mobile Menu Button ====== */}
//         <button
//           className="md:hidden text-green-700 hover:text-green-900 transition"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* ====== Mobile Menu ====== */}
//       {isOpen && (
//         <div className="md:hidden bg-white shadow-lg border-t border-gray-200 py-3">
//           <div className="flex flex-col items-center space-y-3 font-medium">
//             <Link href="/" className="text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
//               Home
//             </Link>
//             <Link href="/player" className="text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
//               Players
//             </Link>
//             <Link href="/service" className="text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
//               Services
//             </Link>
//             <Link href="/about" className="text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
//               About
//             </Link>
//             <Link
//               href="/login"
//               className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition"
//               onClick={() => setIsOpen(false)}
//             >
//               Login
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, CircleDot } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/90 backdrop-blur-md fixed top-0 left-0 w-full z-50  ">
      <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
        {/* ====== Logo ====== */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <CircleDot size={22} className="text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              Cricket<span className="text-red-500">Verse</span>
            </span>
            <span className="text-[10px] md:text-xs text-gray-400 tracking-wide">
              Power • Passion • Play
            </span>
          </div>
        </Link>

        {/* ====== Desktop Menu ====== */}
        <div className="hidden md:flex space-x-8 font-medium items-center text-gray-300">
          {[
            ["HOME", "/"],
            ["PLAYERS", "/player"],
            ["SERVICES", "/service"],
            ["ABOUT", "/about"],
            ["TALENT HUNT", "/talentform"],
          ].map(([label, path]) => (
            <Link
              key={label}
              href={path}
              className="hover:text-red-500 transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/signup"
            className="bg-red-600 text-white px-4 py-1  hover:bg-red-700 transition"
          >
            SIGN UP
          </Link>
             {/* <Link
            href="/login"
            className="bg-red-600 text-white px-4 py-1  hover:bg-red-700 transition"
          >
            LOGIN
          </Link>
             <Link
            href="/payment"
            className="bg-red-600 text-white px-4 py-1  hover:bg-red-700 transition"
          >
            payment
          </Link>
        </div>

        {/* ====== Mobile Menu Button ====== */}
        <button
          className="md:hidden text-red-500 hover:text-red-400 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ====== Mobile Menu ====== */}
      {isOpen && (
        <div className="md:hidden bg-black/95 border-t border-red-700/40 py-4 text-center">
          <div className="flex flex-col space-y-3 text-gray-300 font-medium">
            {[
              ["Home", "/"],
              ["Players", "/player"],
              ["Events", "/events"],
              ["About", "/about"],
              ["Talent Form", "/talentform"],
            ].map(([label, path]) => (
              <Link
                key={label}
                href={path}
                className="hover:text-red-500 transition"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/login"
              className="bg-red-600 text-white mx-auto px-6 py-2 rounded-md hover:bg-red-700 transition w-fit"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

