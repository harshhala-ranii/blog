'use client';

import { useEffect, useState } from 'react';
import Highlight from './Highlight';

interface BlogContentProps {
  contentHtml: string;
  className?: string;
}

export default function BlogContent({ contentHtml, className = "" }: BlogContentProps) {
  const [processedContent, setProcessedContent] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Split content by highlight placeholders and process
    const parts = contentHtml.split(/<span class="highlight-placeholder">([^<]+)<\/span>/g);
    
    const processed = parts.map((part, index) => {
      // Odd indices are highlighted content
      if (index % 2 === 1) {
        return (
          <Highlight key={index}>
            {part}
          </Highlight>
        );
      }
      // Even indices are regular HTML content
      return (
        <span 
          key={index} 
          dangerouslySetInnerHTML={{ __html: part }}
        />
      );
    });

    setProcessedContent(processed);
  }, [contentHtml]);

  // Show loading state during hydration
  if (processedContent.length === 0) {
    return (
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: contentHtml.replace(/<span class="highlight-placeholder">([^<]+)<\/span>/g, '$1') }}
      />
    );
  }

  return (
    <div className={className}>
      {processedContent}
    </div>
  );
}
