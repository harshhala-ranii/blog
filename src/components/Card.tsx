'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface CardProps {
  title: string;
  description: string;
  image: string;
  date: string;
  slug: string;
  type?: 'reviews' | 'blogs';
  aspectRatio?: 'square' | 'wide' | 'tall';
}

export default function Card({ title, description, image, date, slug, type = 'reviews', aspectRatio = 'square' }: CardProps) {
  const [imageAspectRatio, setImageAspectRatio] = useState<'square' | 'wide' | 'tall'>('square');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (image && image.trim() !== '') {
      const img = new window.Image();
      img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight;
        if (ratio > 1.2) {
          setImageAspectRatio('wide');
        } else if (ratio < 0.8) {
          setImageAspectRatio('tall');
        } else {
          setImageAspectRatio('square');
        }
        setImageLoaded(true);
      };
      img.src = image;
    } else {
      setImageAspectRatio(aspectRatio);
      setImageLoaded(true);
    }
  }, [image, aspectRatio]);

  // Use detected image aspect ratio, fallback to prop
  const finalAspectRatio = imageLoaded ? imageAspectRatio : aspectRatio;

  return (
    <Link href={`/${type}/${slug}`} className="group">
      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        {/* Image */}
        <div 
          className="relative w-full overflow-hidden" 
          style={{ 
            aspectRatio: finalAspectRatio === 'tall' ? '2/3' : 
                        finalAspectRatio === 'wide' ? '4/3' : 
                        '1/1'
          }}
        >
          {image && image.trim() !== '' ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Date */}
          <p className="text-sm text-gray-400 mb-2">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
            {description}
          </p>

          {/* Read More */}
          <div className="mt-4 flex items-center text-white text-sm font-medium group-hover:text-gray-300 transition-colors duration-300">
            Read More
            <svg
              className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
