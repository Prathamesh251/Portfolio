import React, { useState } from 'react';
import Preloader from './components/ui/Preloader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CursorFollower from './components/ui/CursorFollower';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-accent/30 selection:text-text relative">
      {/* Jesse Martinez-inspired Minimal Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <div id="top" aria-hidden="true" />
      
      {/* Interactive Cursor Follower with Shchebet soft trail (desktop & motion-enabled only) */}
      <CursorFollower />

      {/* Sticky / Floating Minimal Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
