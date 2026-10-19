import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import profile from '../../data/profile';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Lazy load 3D scene
const HeroScene = lazy(() => import('../three/HeroScene'));

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-8 max-w-7xl mx-auto px-6 md:px-10 overflow-hidden"
    >
      {/* Top Banner Display Headline (Matching Pic 1 Shchebet Typography) */}
      <div className="w-full pt-4 md:pt-8 pb-6 border-b border-border/60">
        <Reveal delay={0.05}>
          <div className="flex flex-col">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-normal text-text uppercase tracking-tight leading-[0.9] select-none">
              {profile.name}
            </h1>
            <div className="flex justify-end items-center mt-2">
              <span className="font-serif text-3xl sm:text-5xl md:text-6xl text-muted font-normal uppercase tracking-tight">
                &amp; Developer
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Main Split Body (Matching Pic 1 Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full py-8 md:py-12 my-auto">
        {/* Left Side: 3D Interactive Canvas & Quick Nav Overlay */}
        <div className="lg:col-span-7 relative w-full h-[380px] sm:h-[440px] md:h-[500px] bg-surface/50 border border-border rounded-xl overflow-hidden flex items-center justify-center">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-mono text-xs text-muted tracking-wider animate-pulse">
                  [Loading 3D Canvas]
                </span>
              </div>
            }
          >
            <HeroScene />
          </Suspense>

          {/* Vertical Quick Nav overlay in corner (Matching Pic 1 "HOME / ME / PORTFOLIO / SERVICES / GET IN TOUCH") */}
          <div className="absolute bottom-5 right-6 z-20 flex flex-col items-end gap-1.5 font-mono text-[11px] uppercase tracking-widest bg-bg/85 backdrop-blur-sm border border-border/60 px-4 py-3 rounded-lg select-none">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'home')}
              className="text-muted hover:text-accent transition-colors"
            >
              01 Home
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="text-muted hover:text-accent transition-colors"
            >
              02 About
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, 'projects')}
              className="text-muted hover:text-accent transition-colors"
            >
              03 Works
            </a>
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, 'skills')}
              className="text-muted hover:text-accent transition-colors"
            >
              04 Skills
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="text-muted hover:text-accent transition-colors"
            >
              05 Contact
            </a>
          </div>
        </div>

        {/* Right Side: Bio text with accent dot & CTAs (Matching Pic 1) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <Reveal delay={0.15}>
            <div className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse mt-2 flex-shrink-0" />
              <p className="font-sans text-base md:text-lg text-text leading-relaxed">
                I'm <span className="text-text font-medium">{profile.name}</span>, an Artificial Intelligence &amp; Data Science student and software developer. {profile.intro}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="border border-border/80 bg-surface/40 p-4 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent block">
                  Status &amp; Internship
                </span>
                <span className="font-sans text-sm text-text font-medium">
                  {profile.internship?.role || "Web Developer Intern"} at {profile.internship?.company || "Level Works"}
                </span>
              </div>
              <span className="font-mono text-xs text-muted">
                {profile.internship?.period || "2026"}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                href="#projects"
                onClick={(e) => handleNavClick(e, 'projects')}
                variant="filled"
                data-cursor="hover"
              >
                Selected Works ↗
              </Button>
              <Button
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                variant="outline"
                data-cursor="hover"
              >
                Get in Touch
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom Scroll Bar */}
      <div className="w-full flex justify-between items-center pt-6 border-t border-border/40 font-mono text-[11px] text-muted uppercase tracking-widest select-none">
        <span>Pune, India</span>
        <a
          href="#about"
          onClick={(e) => handleNavClick(e, 'about')}
          className="flex items-center gap-2 hover:text-text transition-colors"
          data-cursor="hover"
        >
          <span>Scroll to explore</span>
          <span className="text-accent">↓</span>
        </a>
      </div>
    </section>
  );
}
