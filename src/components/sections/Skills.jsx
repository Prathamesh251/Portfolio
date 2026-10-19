import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '../ui/Reveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const SKILL_DOMAINS = [
  {
    id: 'ai-data',
    title: 'AI & Machine Learning',
    summary: 'Predictive modeling, data telemetry, and neural network prototyping.',
    bullets: [
      'Neural network architectures & Deep Learning workflows with TensorFlow & PyTorch',
      'Data extraction, pipeline cleaning & exploratory analysis with Pandas & NumPy',
      'Real-time sensor telemetry dashboards & predictive risk computation',
      'Mathematical modeling & regression analysis with Scikit-Learn',
    ],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Web Development',
    summary: 'End-to-end web applications with reactive frontends and resilient backends.',
    bullets: [
      'Modern Single Page Applications built with React 18, Vite & Component-Driven UI',
      'RESTful microservice architecture and API gateways using Node.js & Express',
      'Relational and document database schema design (PostgreSQL, MariaDB, MongoDB)',
      'Enterprise inventory proxy integration, Docker containers & environment isolation',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering & Motion',
    summary: 'Accessible, responsive digital surfaces with fluid interactions.',
    bullets: [
      'Fluid physics-based cursor interactions, page transitions & Framer Motion animation',
      'Strict mobile-first responsive architecture without horizontal overflow',
      'Accessible semantic HTML5, WCAG color contrast standards & keyboard navigation',
      'Tailwind CSS design token systems with minimal readable utility structures',
    ],
  },
  {
    id: 'ux-ui',
    title: 'UI/UX Interface Design',
    summary: 'User flow definition, wireframing, and interactive design systems.',
    bullets: [
      'User flows, information architecture & product logic definition',
      'High-contrast minimalist dark layouts focused on typographic hierarchy',
      '3D WebGL element integration with Three.js & React Three Fiber',
      'Component design systems with predictable state management',
    ],
  },
  {
    id: 'tools',
    title: 'DevOps & Development Tooling',
    summary: 'Continuous development, version control, and production workflows.',
    bullets: [
      'Git & GitHub team workflows, branch rebasing & pull request reviews',
      'Automated Vite production bundling, dynamic code splitting & tree-shaking',
      'Postman API endpoint testing, mock servers & header verification',
      'Linux shell scripting & local server environments',
    ],
  },
];

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();
  // Keep first one or user-selected open
  const [activeDomain, setActiveDomain] = useState('ai-data');

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 md:py-36 max-w-7xl mx-auto px-6 md:px-10 border-t border-border/50"
    >
      {/* Top Mono Label (Matching Pic 3 "Services" style) */}
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-3 select-none">
          03 / Services &amp; Capabilities
        </span>
        <h2
          id="skills-heading"
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-text uppercase tracking-tight"
        >
          Technical Arsenal
        </h2>
      </div>

      {/* Stacked Accordion Rows (Matching Pic 3 Layout) */}
      <div className="border-t border-border/70 divide-y divide-border/70">
        {SKILL_DOMAINS.map((domain, index) => {
          const isOpen = activeDomain === domain.id;

          return (
            <Reveal key={domain.id} delay={index * 0.06}>
              <div
                className={`py-6 md:py-8 transition-colors duration-300 ${
                  isOpen ? 'bg-surface/30 px-4 md:px-6' : 'hover:bg-surface/15'
                }`}
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => setActiveDomain(isOpen ? '' : domain.id)}
                  className="w-full flex items-center justify-between text-left group focus-visible:outline-none"
                  data-cursor="hover"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 sm:gap-8">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted group-hover:text-accent transition-colors select-none">
                      0{index + 1}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl md:text-5xl font-normal text-text uppercase tracking-tight group-hover:text-accent transition-colors">
                      {domain.title}
                    </h3>
                  </div>

                  <span
                    className={`font-mono text-xl sm:text-2xl text-muted group-hover:text-accent transition-transform duration-300 ${
                      isOpen ? 'rotate-45 text-accent' : ''
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {/* Expandable Bullet Details (Matching Pic 3) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={
                        shouldReduceMotion
                          ? { opacity: 1 }
                          : { height: 0, opacity: 0 }
                      }
                      animate={
                        shouldReduceMotion
                          ? { opacity: 1 }
                          : { height: 'auto', opacity: 1 }
                      }
                      exit={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 pb-2 pl-8 sm:pl-16 max-w-4xl">
                        <p className="font-sans text-sm md:text-base text-muted mb-4 font-light">
                          {domain.summary}
                        </p>

                        <ul className="space-y-2.5">
                          {domain.bullets.map((bullet, idx) => (
                            <li
                              key={idx}
                              className="font-sans text-sm md:text-base text-text/80 flex items-start gap-3"
                            >
                              <span className="text-accent font-mono text-xs mt-1">
                                —
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
