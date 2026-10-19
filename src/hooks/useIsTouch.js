import { useState, useEffect } from 'react';

/**
 * Custom hook to detect touch / mobile devices without fine pointer control.
 * Safely handles SSR / initial hydration.
 */
export function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none) and (pointer: coarse)').matches
      );
      setIsTouch(hasTouch);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch, { passive: true });
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  return isTouch;
}
