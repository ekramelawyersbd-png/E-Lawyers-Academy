import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 350px (past hero section)
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="scroll-to-top fixed bottom-6 left-6 z-40 p-3 bg-indigo-900/90 hover:bg-indigo-600 text-white rounded-2xl border border-indigo-500/40 shadow-xl backdrop-blur-md transition-all duration-300 cursor-pointer group hover:scale-110 animate-in fade-in zoom-in-75"
    >
      <ArrowUp className="w-5 h-5 text-amber-300 group-hover:text-white transition-colors" />
    </button>
  );
};
