import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profile from '../../data/profile';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll detection for background styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for tracking active section
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -55% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        isScrolled
          ? 'bg-bg/85 backdrop-blur-sm border-b border-border py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between"
        aria-label="Main Navigation"
      >
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          className="font-serif text-2xl font-normal text-text hover:text-accent transition-colors duration-200"
          aria-label={`${profile.name} - Home`}
        >
          {profile.name}
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`font-mono text-xs uppercase tracking-widest transition-colors duration-200 py-1 relative ${
                    isActive ? 'text-accent' : 'text-muted hover:text-text'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-11 h-11 text-text border border-border/60 rounded focus-visible:outline-none"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span
            className={`block w-5 h-[1.5px] bg-current transition-transform duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : '-translate-y-1'
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-current transition-transform duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-[2px]' : 'translate-y-1'
            }`}
          />
        </button>
      </nav>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 left-0 w-screen h-screen bg-bg/95 backdrop-blur-md z-40 flex flex-col justify-center px-8 md:hidden"
          >
            <div className="absolute top-6 right-6">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-11 h-11 flex items-center justify-center font-mono text-sm text-muted hover:text-text border border-border/80 rounded"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <ul className="flex flex-col gap-6">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.08 * index,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`block font-serif text-3xl font-normal py-2 ${
                        isActive ? 'text-accent' : 'text-text'
                      }`}
                    >
                      <span className="font-mono text-xs uppercase tracking-widest text-muted mr-3">
                        0{index + 1}
                      </span>
                      {item.label}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
