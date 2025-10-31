'use client';

import { useState } from 'react';

interface ShareProps {
  title: string;
}

export default function Share({ title }: ShareProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = async () => {
    try {
      if (navigator.share && url) {
        await navigator.share({ title, url });
        return;
      }
    } catch (_err) {
      // fall through to copy
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_err) {
      setCopied(false);
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center px-6 py-3 bg-gray-900 border border-gray-800 text-white rounded-lg hover:bg-gray-800 hover:border-gray-700 transition-colors duration-300"
      >
        {copied ? 'Link copied!' : 'Share this page'}
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v.01M12 20v.01M20 12v.01M12 4v.01M7.76 7.76v.01M16.24 7.76v.01M16.24 16.24v.01M7.76 16.24v.01" />
        </svg>
      </button>
    </div>
  );
}


