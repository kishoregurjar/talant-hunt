"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <nav className=" fixed top-0 left-0 w-full z-50    backdrop-blur-sm border-gray-200  ">
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
            className="hover:text-gray-700 font-bold  "
          >
            Home
          </Link>
{/* 
          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer">
              <Link href="https://indorecricketclub.com/about/">About Us</Link>

              <ChevronDown size={14} className="mt-0.5" />
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
          </div> */}

           <Link href="https://indorecricketclub.com/about/"
        className="hover:text-gray-700 font-bold  "
           >
            About Us
          </Link>

          <Link href="https://indorecricketclub.com/services/"
           className="hover:text-gray-700 font-bold  ">
            Ground for Hire
          </Link>



          <Link href="https://indorecricketclub.com/events/"  className="hover:text-gray-700 font-bold  "
          >Events and News</Link>
          <Link href="https://indorecricketclub.com/summer-camp/"  className="hover:text-gray-700 font-bold  "
           >
            Summer Camp
          </Link>


          <Link href="https://indorecricketclub.com/course-fee/"  className="hover:text-gray-700 font-bold  ">
            Course & Fee
          </Link>
          <Link href="https://indorecricketclub.com/projects/"  className="hover:text-gray-700 font-bold  ">Gallery</Link>
          
          <Link href="https://indorecricketclub.com/contact/"  className="hover:text-gray-700 font-bold  ">Contact Us</Link>
          <Link href="/talenthunt"  className="hover:text-gray-700 font-bold  ">Talent Hunt</Link>
        </div>

        <button
          className="xl:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={26} color="black" />
          ) : (
            <Menu size={26} color="black" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className=" bg-white text-gray-700 py-5 shadow-xl">
          <div className="flex flex-col space-y-4 text-left p-6">
            <Link
              href="https://indorecricketclub.com/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link href="https://indorecricketclub.com/about/">About Us</Link>
              <Link
              href="https://indorecricketclub.com/contact/"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              href="https://indorecricketclub.com/course-fee/"
              onClick={() => setIsOpen(false)}
            >
              Course & Fee
            </Link>
           
             <Link
              href="https://indorecricketclub.com/events/"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>

             <Link
              href="https://indorecricketclub.com/projects/"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>

             <Link
              href="https://indorecricketclub.com/projects/"
              onClick={() => setIsOpen(false)}
            >
              Ground for Hire
            </Link>


            <Link
              href="https://indorecricketclub.com/summer-camp/"
              onClick={() => setIsOpen(false)}
            >
              Summer Camp
            </Link>
<Link href="/talenthunt" onClick={() => setIsOpen(false)}>
              Talent Hunt
            </Link>
             <Link
              href="https://indorecricketclub.com/terms-and-policy/"
              onClick={() => setIsOpen(false)}
            >
             Terms and Policy
            </Link>



            {/* <Link href="https://indorecricketclub.com/the-icc-academy/">
              The ICC Academy
            </Link>
            <Link href="https://indorecricketclub.com/coches/">Coaches</Link>
            <Link href="https://indorecricketclub.com/facilities/">
              Facilities
            </Link>
            <Link href="https://indorecricketclub.com/acheivments/">
              Achievements
            </Link> */}

           
            
           
          

            
          </div>
        </div>
      )}
    </nav>
  );
}
