import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function SectionHeading({
  number,
  title,
  id,
  className = '',
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      {number && (
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3 select-none">
          {number}
        </p>
      )}
      <div className="overflow-hidden">
        {shouldReduceMotion ? (
          <h2
            id={id}
            className="font-serif text-4xl md:text-5xl font-normal text-text tracking-tight"
          >
            {title}
          </h2>
        ) : (
          <motion.h2
            id={id}
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-serif text-4xl md:text-5xl font-normal text-text tracking-tight inline-block"
          >
            {title}
          </motion.h2>
        )}
      </div>
    </div>
  );
}
