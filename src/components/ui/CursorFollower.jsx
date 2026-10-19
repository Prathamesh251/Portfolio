import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useIsTouch } from '../../hooks/useIsTouch';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function CursorFollower() {
  const isTouch = useIsTouch();
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState('default'); // 'default', 'hover', 'arrow'

  const rawMouseX = useMotionValue(-100);
  const rawMouseY = useMotionValue(-100);

  // Responsive spring for primary 36px ring
  const ringX = useSpring(rawMouseX, { stiffness: 150, damping: 18, mass: 0.6 });
  const ringY = useSpring(rawMouseY, { stiffness: 150, damping: 18, mass: 0.6 });

  // Soft secondary follower trail inspired by shchebet.design
  const trailX = useSpring(rawMouseX, { stiffness: 90, damping: 22, mass: 0.8 });
  const trailY = useSpring(rawMouseY, { stiffness: 90, damping: 22, mass: 0.8 });

  useEffect(() => {
    // Never show on touch devices or if user prefers reduced motion
    if (isTouch || shouldReduceMotion) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      if (target.closest('[data-cursor="arrow"]') || target.closest('article')) {
        setCursorType('arrow');
      } else if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="hover"]') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea')
      ) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouch, shouldReduceMotion, isVisible, rawMouseX, rawMouseY]);

  if (isTouch || shouldReduceMotion || !isVisible) {
    return null;
  }

  const isArrow = cursorType === 'arrow';
  const isHovered = cursorType === 'hover' || isArrow;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Soft lagging cursor trail (Shchebet style) */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-accent/15 pointer-events-none"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          opacity: isHovered ? 0.35 : 0.2,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* 8px accent core dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none"
        style={{
          x: rawMouseX,
          y: rawMouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isArrow ? 0 : 1,
        }}
      />

      {/* 36px ring that morphs into Shchebet's arrow when over projects/cards */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-accent/60 pointer-events-none flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isArrow ? 44 : 36,
          height: isArrow ? 44 : 36,
        }}
        animate={{
          scale: isArrow ? 1.2 : isHovered ? 1.5 : 1,
          borderColor: isHovered ? '#7C8CFF' : 'rgba(124, 140, 255, 0.5)',
          backgroundColor: isArrow
            ? 'rgba(124, 140, 255, 0.95)'
            : isHovered
            ? 'rgba(124, 140, 255, 0.12)'
            : 'transparent',
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      >
        {isArrow && (
          <span className="text-bg text-sm font-bold leading-none select-none">
            ↗
          </span>
        )}
      </motion.div>
    </div>
  );
}
