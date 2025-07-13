'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const navigateWithTransition = async (path: string, delay: number = 500) => {
    setIsTransitioning(true);

    // Add transition effect
    await new Promise(resolve => setTimeout(resolve, delay));

    router.push(path);

    // Reset transition state after navigation
    setTimeout(() => setIsTransitioning(false), 100);
  };

  return {
    isTransitioning,
    navigateWithTransition
  };
};
