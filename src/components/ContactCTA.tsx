'use client';

import { useState } from 'react';

interface ContactCTAProps {
  email: string;
  subject?: string;
  body?: string;
}

export default function ContactCTA({ email, subject, body }: ContactCTAProps) {
  const [copied, setCopied] = useState(false);

  const mailto = `mailto:${email}` +
    (subject || body
      ? `?${[
          subject ? `subject=${encodeURIComponent(subject)}` : '',
          body ? `body=${encodeURIComponent(body)}` : '',
        ].filter(Boolean).join('&')}`
      : '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_e) {
      setCopied(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 inline-flex items-center gap-4">
      <a
        href={mailto}
        className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
      >
        Email me
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 hover:bg-gray-750 transition-colors duration-300"
      >
        {copied ? 'Copied!' : 'Copy email'}
      </button>
    </div>
  );
}


