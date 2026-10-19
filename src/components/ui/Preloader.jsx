import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import profile from '../../data/profile';

export default function Preloader({ onComplete }) {
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      onComplete?.();
      return;
    }

    // Smooth counter animation from 0 to 100
    const duration = 1400; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);
      
      // Quartic ease out for a sleek deceleration
      const ease = 1 - Math.pow(1 - progressFraction, 3);
      const currentCount = Math.floor(ease * 100);

      setProgress(currentCount);

      if (progressFraction < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete?.();
          }, 800);
        }, 200);
      }
    };

    const animFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animFrame);
  }, [shouldReduceMotion, onComplete]);

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-50 bg-bg flex flex-col justify-between p-8 md:p-14 select-none pointer-events-auto"
        >
          {/* Top Info Bar */}
          <div className="flex items-center justify-between text-muted font-mono text-xs uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>{profile.name}</span>
            </span>
            <span className="hidden sm:inline-block">
              {profile.role}
            </span>
          </div>

          {/* Central Counter Display (Jesse Martinez minimal style) */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-6xl sm:text-8xl md:text-9xl font-light text-text tracking-tighter">
                {String(progress).padStart(2, '0')}
              </span>
              <span className="text-xl sm:text-2xl text-accent font-light">
                %
              </span>
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted mt-4">
              Loading Portfolio
            </p>
          </div>

          {/* Bottom Thin Progress Bar */}
          <div className="w-full">
            <div className="w-full h-[1px] bg-border relative overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-muted font-mono text-[10px] uppercase tracking-widest mt-3">
              <span>Pune, India</span>
              <span>2026 Edition</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
