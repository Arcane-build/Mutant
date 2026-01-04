import React from 'react';

export default function EarlyAccess() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-black mb-3 sm:mb-4 text-[#242424]">
            Get Early Access
          </h2>

          {/* CTA Button */}
          <a 
            href="https://x.com/MutantdotApp/status/2001267169774936175"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors text-sm sm:text-base"
          >
            Learn more →
          </a>
        </div>
      </div>
    </section>
  );
}
