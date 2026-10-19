import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import Reveal from '../ui/Reveal';
import projects from '../../data/projects';

export default function Projects() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id || '');

  // IntersectionObserver to sync the sticky left index with scroll position (matching Pic 2)
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardId = entry.target.id.replace('card-', '');
          setActiveProjectId(cardId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    });

    projects.forEach((p) => {
      const el = document.getElementById(`card-${p.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleProjectSelect = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(`card-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-24 md:py-36 max-w-7xl mx-auto px-6 md:px-10 border-t border-border/50 relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Sticky Left Column (Matching Pic 2 "SELECTED WORKS") */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col justify-between self-start lg:min-h-[580px]">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent mb-4 block select-none">
              02 / Portfolio
            </span>
            <h2
              id="projects-heading"
              className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-text uppercase tracking-tight leading-[0.95]"
            >
              Selected<br />Works
            </h2>
            <p className="font-sans text-sm md:text-base text-muted mt-6 max-w-sm leading-relaxed">
              Engineered web applications, interactive interfaces, and data architectures built for scale and clarity.
            </p>
          </div>

          {/* Interactive Project Quick Index (Matching Pic 2 Lower-Left Directory) */}
          <div className="pt-10 mt-8 border-t border-border/60">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-4">
              Project Index
            </p>
            <ul className="space-y-3 font-mono text-xs select-none">
              {projects.map((proj, idx) => {
                const isActive = activeProjectId === proj.id;
                const year = idx < 2 ? '2026' : '2025';
                return (
                  <li key={proj.id}>
                    <a
                      href={`#card-${proj.id}`}
                      onClick={(e) => handleProjectSelect(e, proj.id)}
                      className={`flex items-center justify-between py-1 transition-colors duration-200 ${
                        isActive
                          ? 'text-accent font-medium'
                          : 'text-muted hover:text-text'
                      }`}
                      data-cursor="hover"
                    >
                      <span className="flex items-center gap-2">
                        <span>{proj.index}</span>
                        <span className="uppercase">{proj.title}</span>
                      </span>
                      <span className="text-[11px] opacity-70">{year}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Scrolling Right Column (Stacked Cards matching Pic 2) */}
        <div className="lg:col-span-7 flex flex-col gap-10 md:gap-14">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}>
              <ProjectCard project={project} id={`card-${project.id}`} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
