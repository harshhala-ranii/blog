'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface SlowLoadingProps {
  message?: string;
  minLoadingTime?: number; // Minimum loading time in milliseconds
}

export default function SlowLoading({ message, minLoadingTime = 3000 }: SlowLoadingProps) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const loadingMessages = [
    "Loading thoughts...",
    "Loading reality...",
    "Loading words...",
    "Loading moments..."
  ];

  useEffect(() => {
    // Force minimum loading time - this will always wait the full time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [minLoadingTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 1000); // 1.5 seconds per message - fast rotation

    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  if (!isLoading) {
    return null; // This will be replaced by the actual content
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        {/* Proper Hourglass Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            {/* Rotating Custom Hourglass */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/hourglass.svg"
                alt="Loading"
                width={80}
                height={80}
                className="animate-spin text-blue-400"
                style={{ 
                  animationDuration: '3s',
                  filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(202deg) brightness(100%) contrast(101%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="h-8 mb-4">
          <div 
            key={currentMessage}
            className="text-white text-xl font-medium transition-all duration-1000 ease-in-out transform"
          >
            {message || loadingMessages[currentMessage]}
          </div>
        </div>

        {/* Blue Dots Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDuration: '4s' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '4s' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1.6s', animationDuration: '4s' }}></div>
        </div>

      </div>
    </div>
  );
}
