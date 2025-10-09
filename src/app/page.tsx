'use client';

import PageWithLoading from '../components/PageWithLoading';

export default function Home() {
  return (
    <PageWithLoading 
      minLoadingTime={3000}
    >
      <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/home.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-16">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Welcome to 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              No Offense, But
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            No offense, but this is basically my diary I left unlocked on the internet.
             Raw, unfiltered, and sometimes too much — just a young adult trying to figure life out.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/blogs"
              className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold text-base hover:bg-white hover:text-black hover:text-lg transition-all duration-300 transform hover:scale-105"
            >
              Read Latest Posts
            </a>
            <a 
              href="/about"
              className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold text-base hover:bg-white hover:text-black hover:text-lg transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </a>
          </div>

        </div>
      </div>
      </div>
    </PageWithLoading>
  );
}
