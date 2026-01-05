'use client';

import React, { useEffect, useRef, useState } from 'react';
import WaitlistPopup from './WaitlistPopup';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isExiting, setIsExiting] = useState(false);

  // Auto-dismiss error after 2 seconds with fade-out animation
  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        // Wait for animation to complete before hiding
        setTimeout(() => {
          setShowError(false);
          setIsExiting(false);
        }, 500); // Match the transition duration
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [showError]);

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
    const video = videoRef.current;
    if (video) {
      video.addEventListener('pause', handlePause);
    }

    // Cleanup
    return () => {
      document.removeEventListener('touchstart', handleFirstTouch);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (video) {
        video.removeEventListener('pause', handlePause);
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

  const [isLoading, setIsLoading] = useState(false);

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim();
    
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email');
      setShowError(true);
      return;
    }

    setIsLoading(true);
    setShowError(false);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowPopup(true);
        setEmail('');
      } else {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage('Failed to join waitlist. Please check your connection.');
      setShowError(true);
    } finally {
      setIsLoading(false);
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
          <div className="relative w-full h-full p-6 sm:p-12 md:p-16 flex items-end pb-20 sm:pb-16">
            <div className="max-w-3xl w-full p-4">
              {/* Main Heading */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                Voice-first AI that acts.
                <br />
                Speak once. It executes.
              </h1>

              {/* Email Input Form - Separate on Mobile, Combined on Desktop */}
              <div className="max-w-[450px] relative">
                {/* Mobile View - Stacked */}
                <form onSubmit={handleJoinWaitlist} className="flex flex-col gap-3 sm:hidden">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setShowError(false);
                    }}
                    autoComplete="off"
                    className="w-full py-4 px-6 bg-white/10 backdrop-blur-md text-white placeholder-white/50 focus:outline-none border border-white/20 outline-none rounded-[100px]"
                    suppressHydrationWarning
                  />
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-[#116DF4] text-white rounded-[100px] font-medium hover:bg-[#0d5dd1] transition-colors disabled:opacity-70 disabled:cursor-not-allowed" 
                    suppressHydrationWarning
                  >
                    {isLoading ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </form>

                {/* Desktop View - Combined Pill */}
                <form onSubmit={handleJoinWaitlist} className="hidden sm:flex items-stretch bg-white/10 backdrop-blur-md border border-white/20 rounded-[100px] pl-[24px] overflow-hidden">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setShowError(false);
                    }}
                    autoComplete="off"
                    className="flex-1 py-[18px] bg-transparent text-white placeholder-white/50 focus:outline-none border-0 outline-none"
                    suppressHydrationWarning
                  />
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-[18px] bg-[#116DF4] text-white rounded-[100px] font-medium hover:bg-[#0d5dd1] transition-colors whitespace-nowrap border-0 disabled:opacity-70 disabled:cursor-not-allowed" 
                    suppressHydrationWarning
                  >
                    {isLoading ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </form>

                {/* Error Message - Absolute positioned to not affect layout */}
                {showError && (
                  <div className={`absolute top-full left-0 right-0 mt-3 flex items-center gap-2 bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-2xl px-4 py-3 transition-all duration-500 ${
                    isExiting ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
                  }`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 text-red-400 flex-shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                    <p className="text-red-200 text-sm font-medium">
                      {errorMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Waitlist Popup */}
      <WaitlistPopup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
      />
    </section>
  );
}
