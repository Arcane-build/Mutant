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

          {/* Subheading */}
          <p className="text-[#555553] text-base sm:text-lg md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto font-medium px-4">
            Be among the first to battle 100, so we&apos;ll deploy across nearly all agents.
          </p>

          {/* CTA Button */}
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white rounded-lg font-medium hover:bg-black/90 transition-colors text-sm sm:text-base">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
}
