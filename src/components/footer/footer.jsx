import React from 'react'
import Link from 'next/link'

const footer = () => {
  return (
    <footer className=" bg-white py-8 text-center text-gray-400 text-xs sm:text-sm">
        <p className="mb-3  text-blue-700 font-semibold text-base sm:text-lg">
          ICC
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:space-x-6 mb-4">
          <Link href="/about" className="hover:text-black">
            About
          </Link>
          <Link href="/service" className="hover:text-black">
            services
          </Link>
          <Link href="/player" className="hover:text-black">
            players
          </Link>
          <Link href="/contact" className="hover:text-black ">
            Contact
          </Link>
        </div>
        <p>© {new Date().getFullYear()} ICC. All Rights Reserved.</p>
      </footer>
  )
}

export default footer


