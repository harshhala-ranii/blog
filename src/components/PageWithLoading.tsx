'use client';

import { useState, useEffect, ReactNode } from 'react';
import SlowLoading from './SlowLoading';

interface PageWithLoadingProps {
  children: ReactNode;
  loadingMessage?: string;
  minLoadingTime: number;
}

export default function PageWithLoading({ children, loadingMessage, minLoadingTime }: PageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force minimum loading time regardless of page load speed
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [minLoadingTime]);

  if (isLoading) {
    return <SlowLoading message={loadingMessage} minLoadingTime={minLoadingTime} />;
  }

  return <>{children}</>;
}
