
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, CircleDot } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white
     shadow-sm backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
        {/* ====== Logo ====== */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
            <CircleDot size={22} className="text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl md:text-2xl font-extrabold text-blue-700 tracking-tight">
              ICC
            </span>
            <span className="text-[10px] md:text-xs text-gray-500 tracking-wide">
              Power • Passion • Play
            </span>
          </div>
        </Link>

        {/* ====== Desktop Menu ====== */}
        <div className="hidden md:flex space-x-8 font-medium items-center text-gray-700">
          {[["HOME", "/"]].map(([label, path]) => (
            <Link
              key={label}
              href={path}
              className="hover:text-blue-600 transition-colors duration-300"
            >
              {label}
            </Link>
          ))}

          <Link
            href="/talenthunt"
            className="bg-blue-600 text-white px-4 py-1 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            TALENT HUNT
          </Link>
        </div>

        {/* ====== Mobile Menu Button ====== */}
        <button
          className="md:hidden text-blue-700 hover:text-blue-600 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ====== Mobile Menu ====== */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 py-4 text-center shadow-lg">
          <div className="flex flex-col space-y-3 text-gray-700 font-medium">
            {[["Home", "/"]].map(([label, path]) => (
              <Link
                key={label}
                href={path}
                className="hover:text-blue-600 transition"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/talenthunt"
              className="bg-blue-600 text-white mx-auto px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition-all w-fit shadow-sm hover:shadow-md"
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
