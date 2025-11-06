import React from 'react'
import Link from 'next/link'

const footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-8 text-center text-gray-400 text-xs sm:text-sm">
        <p className="mb-3 text-red-500 font-semibold text-base sm:text-lg">
          The Cricket verse
        </p>
        <div className="flex flex-wrap justify-center gap-4 sm:space-x-6 mb-4">
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/service" className="hover:text-white">
            services
          </Link>
          <Link href="/player" className="hover:text-white">
            players
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>
        <p>© {new Date().getFullYear()} The Cricket verse. All Rights Reserved.</p>
      </footer>
  )
}

export default footer


