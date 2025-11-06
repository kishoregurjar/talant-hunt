

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
            // ["PLAYERS", "/player"],
            // ["SERVICES", "/service"],
            // ["ABOUT", "/about"],
            // ["TALENT HUNT", "/talentform"],
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
            href="/talenthunt"
            className="bg-red-600 text-white px-4 py-1  hover:bg-red-700 transition"
          >
            TALENT HUNT
          </Link>
         
          {/* <Link
            href="/payment"
            className="bg-red-600 text-white px-4 py-1  hover:bg-red-700 transition"
          >
            payment
          </Link> */}
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
              // ["Players", "/player"],
              // ["Events", "/events"],
              // ["About", "/about"],
                    // ["TALENT HUNT", "/talentform"],

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
              href="/talenthunt"
              className="bg-red-600 text-white mx-auto px-6 py-2 rounded-md hover:bg-red-700 transition w-fit"
              onClick={() => setIsOpen(false)}
            >
              TALENT HUNT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

