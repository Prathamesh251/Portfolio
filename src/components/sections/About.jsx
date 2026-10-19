import React from 'react';
import Reveal from '../ui/Reveal';
import profile from '../../data/profile';

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 md:py-36 max-w-7xl mx-auto px-6 md:px-10 border-t border-border/50"
    >
      {/* Editorial Header */}
      <div className="mb-14">
        <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-3 select-none">
          01 / About Me
        </span>
        <h2
          id="about-heading"
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-text uppercase tracking-tight leading-none"
        >
          Background &amp;<br />Philosophy
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Bio Narrative & Internship Highlight */}
        <div className="lg:col-span-7 space-y-8">
          <Reveal delay={0.1}>
            <div className="space-y-5 text-base sm:text-lg md:text-xl leading-relaxed text-muted font-sans font-light">
              {profile.about.map((paragraph, idx) => (
                <p key={idx} className="first:text-text first:font-normal">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          {/* Current Role / Internship Spotlight Card */}
          {profile.internship && (
            <Reveal delay={0.2}>
              <div
                className="border border-border p-6 sm:p-8 bg-surface/50 rounded-xl transition-all duration-300 hover:border-accent/50"
                data-cursor="hover"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-widest text-accent font-medium">
                      Current Internship
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted">
                    {profile.internship.period}
                  </span>
                </div>
                <h4 className="font-serif text-2xl sm:text-3xl text-text font-normal mb-1">
                  {profile.internship.role}
                </h4>
                <p className="font-mono text-xs text-muted uppercase tracking-wider">
                  at {profile.internship.company}
                </p>
              </div>
            </Reveal>
          )}
        </div>

        {/* Right Column: 3 Thin-Bordered Stat Blocks */}
        <div className="lg:col-span-5">
          <Reveal delay={0.25}>
            <div className="border border-border divide-y divide-border bg-surface/30 rounded-xl overflow-hidden">
              {profile.stats.map((stat, idx) => (
                <div key={idx} className="p-6 sm:p-8 flex flex-col justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted mb-3 select-none">
                    {stat.label}
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl text-text font-normal">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
