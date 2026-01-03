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
            <button className="text-black text-base hover:text-black/70 transition-colors font-medium">
              Contact Us
            </button>
            <button className="bg-black text-white px-6 py-2 rounded-md text-base font-medium hover:bg-black/90 transition-colors">
              Sign In
            </button>
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
              <button className="text-black text-base hover:text-black/70 transition-colors font-medium text-left py-2">
                Contact Us
              </button>
              <button className="bg-black text-white px-6 py-2 rounded-md text-base font-medium hover:bg-black/90 transition-colors">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
