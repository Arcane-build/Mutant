import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 h-auto min-h-[360px] md:h-[360px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 h-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-20 lg:gap-28">
          {/* Logo */}
          <div className="flex items-center">
            <Image 
              src="/footerLogo.svg" 
              alt="Mutant Logo" 
              width={140} 
              height={21}
            />
          </div>

          {/* Footer Links */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-20 lg:gap-28 w-full md:w-auto">
            {/* Column 1 */}
            <div className="flex flex-col gap-3 mt-0 sm:mt-8">
              <a href="#" className="text-white/80 hover:text-white text-sm sm:text-base font-normal transition-colors">
                Twitter
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm sm:text-base font-normal transition-colors">
                Discord
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm sm:text-base font-normal transition-colors">
                Medium
              </a>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3 mt-0 sm:mt-8">
              <a href="#" className="text-white/80 hover:text-white text-sm sm:text-base font-normal transition-colors">
                Blog
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm sm:text-base font-normal transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm sm:text-base font-normal transition-colors">
                Terms & Condition
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
