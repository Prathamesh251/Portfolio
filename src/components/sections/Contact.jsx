import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import Reveal from '../ui/Reveal';
import profile from '../../data/profile';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('Internship Opportunity');
  const [contactInfo, setContactInfo] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Inquiry from ${name || 'Portfolio Visitor'}: ${topic}`
    );
    const body = encodeURIComponent(
      `Hello Prathamesh,\n\nMy name is ${name || '[Name]'}.\nI would like to discuss: ${topic}.\n\nYou can reach me at: ${contactInfo || '[Contact Info]'}.\n\nBest regards.`
    );

    // Copy email to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Ignore fallback
    }

    // Launch Mailto
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const handleDirectCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Ignore
    }
    window.location.href = `mailto:${profile.email}`;
  };

  const marqueeText = "LET'S BUILD SOMETHING • AVAILABLE FOR COLLABORATION • AI & DATA SCIENCE • PRATHAMESH • ";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="pt-24 pb-12 border-t border-border/50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-3 select-none">
            04 / Contact
          </span>
          <h2
            id="contact-heading"
            className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-text uppercase tracking-tight"
          >
            Start a Conversation
          </h2>
        </div>

        {/* Conversational Editorial Inquiry Form (Matching Pic 4 Layout) */}
        <form onSubmit={handleSendMessage} className="space-y-12 sm:space-y-16 max-w-5xl my-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Input 1: MY NAME IS */}
            <Reveal delay={0.1}>
              <div className="flex flex-col">
                <label
                  htmlFor="user-name"
                  className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-text uppercase tracking-tight mb-3"
                >
                  My name is
                </label>
                <input
                  id="user-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name or company..."
                  className="bg-transparent border-b border-border/80 focus:border-accent text-lg md:text-xl text-text placeholder-muted/60 py-3 focus:outline-none transition-colors duration-200 font-sans"
                  data-cursor="hover"
                />
              </div>
            </Reveal>

            {/* Input 2: LET'S TALK ABOUT */}
            <Reveal delay={0.18}>
              <div className="flex flex-col">
                <label
                  htmlFor="user-topic"
                  className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-text uppercase tracking-tight mb-3"
                >
                  Let's talk about
                </label>
                <select
                  id="user-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="bg-surface/80 border-b border-border/80 focus:border-accent text-lg md:text-xl text-text py-3 px-1 focus:outline-none transition-colors duration-200 font-sans cursor-pointer rounded-t"
                  data-cursor="hover"
                >
                  <option value="Internship Opportunity" className="bg-surface text-text">
                    Internship &amp; Employment Opportunity
                  </option>
                  <option value="Project Collaboration" className="bg-surface text-text">
                    Full-Stack Web App Collaboration
                  </option>
                  <option value="AI / ML Research" className="bg-surface text-text">
                    AI &amp; Data Science Research
                  </option>
                  <option value="General Conversation" className="bg-surface text-text">
                    General Tech Discussion &amp; Coffee
                  </option>
                </select>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-4">
            {/* Input 3: MY CONTACT */}
            <div className="md:col-span-8">
              <Reveal delay={0.25}>
                <div className="flex flex-col">
                  <label
                    htmlFor="user-contact"
                    className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-text uppercase tracking-tight mb-3"
                  >
                    My contact
                  </label>
                  <input
                    id="user-contact"
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="Email address, phone or LinkedIn URL..."
                    className="bg-transparent border-b border-border/80 focus:border-accent text-lg md:text-xl text-text placeholder-muted/60 py-3 focus:outline-none transition-colors duration-200 font-sans"
                    data-cursor="hover"
                  />
                </div>
              </Reveal>
            </div>

            {/* Action Submit Button (Matching Pic 4 "MAKE DESIGN →" style) */}
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <Reveal delay={0.32}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 font-serif text-3xl sm:text-4xl font-normal text-text hover:text-accent border-b border-transparent hover:border-accent transition-all duration-200 focus-visible:outline-none group pb-1"
                  data-cursor="hover"
                >
                  <span>Let's Connect</span>
                  <span className="font-mono text-2xl transition-transform duration-300 transform group-hover:translate-x-2">
                    →
                  </span>
                </button>
              </Reveal>
            </div>
          </div>
        </form>

        {/* Direct Email Link & Socials */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-12 border-t border-border/60">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleDirectCopy}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-accent border border-border px-4 py-3 rounded min-h-[44px] transition-colors"
              data-cursor="hover"
              aria-label="Direct copy email"
            >
              <span>{profile.email}</span>
              <span className="text-accent">↗</span>
            </button>

            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="font-mono text-xs text-accent flex items-center gap-1.5"
                  role="status"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center border border-border text-muted hover:text-text hover:border-accent transition-colors duration-200 focus-visible:outline-none rounded"
              aria-label="GitHub Profile"
              data-cursor="hover"
            >
              <FaGithub className="w-5 h-5" />
            </a>

            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center border border-border text-muted hover:text-text hover:border-accent transition-colors duration-200 focus-visible:outline-none rounded"
              aria-label="LinkedIn Profile"
              data-cursor="hover"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Running Marquee (Matching Pic 4 "LET'S MAKE DESIGN" Marquee) */}
      <div className="w-full pt-16 mt-12 border-t border-border/50 overflow-hidden select-none whitespace-nowrap">
        {shouldReduceMotion ? (
          <div className="font-serif text-4xl sm:text-6xl md:text-8xl font-normal text-border/60 uppercase tracking-tight py-2">
            {marqueeText}
          </div>
        ) : (
          <motion.div
            className="flex font-serif text-4xl sm:text-6xl md:text-8xl font-normal text-border/60 uppercase tracking-tight py-2"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <span>{marqueeText}</span>
            <span>{marqueeText}</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
