'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = true;
          await videoRef.current.play();
          console.log('Video is playing');
        } catch (error) {
          console.log('Video play was interrupted, will retry when visible');
        }
      }
    };

    // Play video on mount
    playVideo();

    // iOS-specific: Handle first touch to ensure video plays
    const handleFirstTouch = () => {
      if (videoRef.current && videoRef.current.paused) {
        playVideo();
      }
      // Remove listener after first touch
      document.removeEventListener('touchstart', handleFirstTouch);
    };

    // Handle visibility change - resume video when tab becomes active
    const handleVisibilityChange = () => {
      if (!document.hidden && videoRef.current && videoRef.current.paused) {
        playVideo();
      }
    };

    // Handle video pause events - auto-resume
    const handlePause = () => {
      if (videoRef.current && !document.hidden) {
        videoRef.current.play().catch(() => {
          // Silently handle any play errors
        });
      }
    };

    // Add event listeners
    document.addEventListener('touchstart', handleFirstTouch, { once: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    if (videoRef.current) {
      videoRef.current.addEventListener('pause', handlePause);
    }

    // Cleanup
    return () => {
      document.removeEventListener('touchstart', handleFirstTouch);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (videoRef.current) {
        videoRef.current.removeEventListener('pause', handlePause);
      }
    };
  }, []);

  const handleToggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <section className="pt-4 sm:pt-8 px-4 sm:px-6 pb-8 sm:pb-0">
      <div className="w-full max-w-[1400px] h-auto min-h-[500px] sm:h-[800px] mx-auto">
        <div className="w-full h-full bg-[#0f0f0f] rounded-[16px] sm:rounded-[24px] border border-white/5 relative overflow-hidden">
          {/* Video Background */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            x5-playsinline="true"
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ pointerEvents: 'none' }}
          >
            <source src="/From KlickPin CF Pinterest Pin-645351821629461194.mp4" type="video/mp4" />
          </video>

          {/* Hover Area for Mute/Unmute Button */}
          <div className="absolute top-0 right-0 w-32 h-32 z-10 group">
            <button
              onClick={handleToggleMute}
              className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 sm:p-4 hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                // Muted Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:scale-110 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
                  />
                </svg>
              ) : (
                // Unmuted Icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white hover:scale-110 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Overlay for better text readability */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>

          {/* Content */}
          <div className="relative w-full h-full p-6 sm:p-12 md:p-16 flex items-end pb-8 sm:pb-16">
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
                    className="w-full py-4 px-6 bg-white/10 backdrop-blur-md text-white placeholder-white/50 focus:outline-none border border-white/20 outline-none rounded-[100px]"
                    suppressHydrationWarning
                  />
                  <button className="w-full py-4 bg-[#116DF4] text-white rounded-[100px] font-medium hover:bg-[#0d5dd1] transition-colors" suppressHydrationWarning>
                    Join Waitlist
                  </button>
                </div>

                {/* Desktop View - Combined Pill */}
                <div className="hidden sm:flex items-stretch bg-white/10 backdrop-blur-md border border-white/20 rounded-[100px] pl-[24px] overflow-hidden">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="flex-1 py-[18px] bg-transparent text-white placeholder-white/50 focus:outline-none border-0 outline-none"
                    suppressHydrationWarning
                  />
                  <button className="px-8 py-[18px] bg-[#116DF4] text-white rounded-[100px] font-medium hover:bg-[#0d5dd1] transition-colors whitespace-nowrap border-0" suppressHydrationWarning>
                    Join Waitlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
