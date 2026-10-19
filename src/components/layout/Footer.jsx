import React from 'react';
import profile from '../../data/profile';

export default function Footer() {
  const handleBackToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted">
        <p>
          &copy; {currentYear} {profile.name}. Minimal &amp; quiet.
        </p>

        <a
          href="#top"
          onClick={handleBackToTop}
          className="hover:text-text transition-colors py-2 min-h-[44px] flex items-center gap-1.5 focus-visible:outline-none"
          data-cursor="hover"
          aria-label="Back to top of page"
        >
          <span>Back to top</span>
          <span className="text-accent text-[11px]" aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
