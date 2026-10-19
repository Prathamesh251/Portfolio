import React from 'react';
import Tag from '../ui/Tag';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function ProjectCard({ project, id }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <article
      id={id}
      className={`group relative bg-surface border border-border rounded-xl p-8 md:p-10 flex flex-col justify-between transition-all duration-300 scroll-mt-28 ${
        shouldReduceMotion
          ? ''
          : 'hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
      }`}
      data-cursor="arrow"
    >
      <div>
        {/* Top Header: Index & Year */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Project {project.index}
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted">2026</span>
            <span
              className="text-accent text-lg font-mono transition-transform duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
        </div>

        {/* Title in Serif */}
        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-text tracking-tight mb-4 group-hover:text-accent transition-colors duration-200">
          {project.title}
        </h3>

        {/* Problem Statement */}
        <p className="font-sans text-base text-muted leading-relaxed mb-6">
          {project.problem}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="pt-6 border-t border-border/60 flex items-center gap-6 mt-auto">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider text-muted hover:text-text py-2 min-h-[44px] flex items-center gap-1.5 transition-colors focus-visible:outline-none"
            aria-label={`${project.title} GitHub repository`}
            data-cursor="hover"
          >
            <span>GitHub Repository</span>
            <span className="text-accent text-xs">↗</span>
          </a>
        ) : (
          <span className="font-mono text-xs uppercase tracking-wider text-muted/50 py-2 min-h-[44px] flex items-center">
            Private Repository
          </span>
        )}

        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider text-accent hover:underline py-2 min-h-[44px] flex items-center gap-1.5 transition-colors focus-visible:outline-none"
            aria-label={`${project.title} Live Demo`}
            data-cursor="hover"
          >
            <span>Live Demonstration</span>
            <span className="text-xs">↗</span>
          </a>
        ) : (
          <span className="font-mono text-xs uppercase tracking-wider text-muted/50 py-2 min-h-[44px] flex items-center">
            Internal Production
          </span>
        )}
      </div>
    </article>
  );
}
