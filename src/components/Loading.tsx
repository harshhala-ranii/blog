'use client';

import { useState, useEffect } from 'react';

interface LoadingProps {
  message?: string;
}

export default function Loading({ message }: LoadingProps) {
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const loadingMessages = [
    "Loading truth...",
    "Loading chaos...",
    "Loading me...",
    "Loading thoughts...",
    "Loading reality...",
    "Loading words...",
    "Loading moments..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 4000); // Changed from 2000ms to 4000ms (4 seconds)

    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Hourglass Animation */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto relative">
            {/* Hourglass Shape */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                className="w-16 h-16 text-yellow-400 animate-pulse" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M6 2h12v2H6V2zm0 2v6h.01L6 10.01 10 14l4-3.99-.01-.01H18V4H6zm12 14.01L17.99 18 14 14l-4 3.99.01.01H6v-6h12v6z"/>
              </svg>
            </div>
            
            {/* Sand falling animation */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-1 h-8 bg-yellow-400 opacity-60 animate-ping"></div>
            </div>
            
            {/* Slow rotating border */}
            <div className="absolute inset-0 border-4 border-gray-800 border-t-yellow-400 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="h-8 mb-4">
          <div 
            key={currentMessage}
            className="text-white text-xl font-medium transition-all duration-500 ease-in-out transform"
          >
            {message || loadingMessages[currentMessage]}
          </div>
        </div>

        {/* Slow Dots Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDuration: '2s' }}></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2s' }}></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '2s' }}></div>
        </div>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm mt-6 animate-pulse">
          Preparing something meaningful...
        </p>
      </div>

    </div>
  );
}
