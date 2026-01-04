'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image 
              src="/navLogo.svg" 
              alt="Mutant Logo" 
              width={120} 
              height={18}
              priority
            />
          </div>

          {/* Desktop buttons - hidden on mobile */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://x.com/MutantdotApp"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Follow us on X"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-full h-0.5 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-black/10">
            <div className="flex flex-col gap-3 pt-4">
              <a 
                href="https://x.com/MutantdotApp"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black p-2 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
                aria-label="Follow us on X"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
