import React from 'react';

export default function Hero() {
  return (
    <section className="pt-4 sm:pt-8 px-4 sm:px-6 pb-8 sm:pb-0">
      <div className="w-full max-w-[1400px] h-auto min-h-[500px] sm:h-[800px] mx-auto">
        <div className="w-full h-full bg-[#0f0f0f] rounded-[16px] sm:rounded-[24px] p-6 sm:p-12 md:p-16 border border-white/5 flex items-end pb-8 sm:pb-16">
          <div className="max-w-3xl w-full p-4">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              Voice-first AI that acts.
              <br />
              Speak once. It executes.
            </h1>

            {/* Email Input Form - Separate on Mobile, Combined on Desktop */}
            <div className="max-w-[450px]">
              {/* Mobile View - Stacked */}
              <div className="flex flex-col gap-3 sm:hidden">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full py-4 px-6 bg-[#2a2a2a] text-white placeholder-white/50 focus:outline-none border-0 outline-none rounded-[100px]"
                />
                <button className="w-full py-4 bg-[#116DF4] text-white rounded-[100px] font-medium hover:bg-[#0d5dd1] transition-colors">
                  Join Waitlist
                </button>
              </div>

              {/* Desktop View - Combined Pill */}
              <div className="hidden sm:flex items-stretch bg-[#2a2a2a] rounded-[100px] pl-[24px] overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="flex-1 py-[18px] bg-transparent text-white placeholder-white/50 focus:outline-none border-0 outline-none"
                />
                <button className="px-8 py-[18px] bg-[#116DF4] text-white rounded-[100px] font-medium hover:bg-[#0d5dd1] transition-colors whitespace-nowrap border-0">
                  Join Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
