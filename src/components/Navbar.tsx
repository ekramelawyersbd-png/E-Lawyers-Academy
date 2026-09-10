import React, { useState } from 'react';
import {
  Scale,
  GraduationCap,
  Sparkles,
  Search,
  User,
  ShieldCheck,
  Video,
  BookOpen,
  LayoutDashboard,
  Settings,
  PhoneCall,
} from 'lucide-react';

interface NavbarProps {
  currentView: 'public' | 'dashboard' | 'admin';
  setCurrentView: (view: 'public' | 'dashboard' | 'admin') => void;
  onOpenAIAdvisor: () => void;
  onOpenCertVerifier?: () => void;
  onSelectCourse?: (courseId: string) => void;
  activeSection?: string;
  setActiveSection?: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onOpenAIAdvisor,
  onOpenCertVerifier,
  activeSection = 'home',
  setActiveSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSetView = (v: 'public' | 'dashboard' | 'admin') => {
    if (typeof setCurrentView === 'function') {
      setCurrentView(v);
    }
  };

  const scrollToSection = (id: string) => {
    if (currentView !== 'public') {
      handleSetView('public');
    }
    if (typeof setActiveSection === 'function') {
      setActiveSection(id);
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-slate-900 border-b border-slate-200 shadow-sm">
      {/* Top Banner Alert Ticker */}
      <div className="bg-indigo-950 px-4 py-1.5 text-xs text-indigo-100 flex items-center justify-between font-medium">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-indigo-600 text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">
              NEXT LIVE CLASS
            </span>
            <span className="truncate">
              Income Tax Practical Training: Complete E-Return Submission Process (Aug 10, 8:00 PM)
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-indigo-200">
            <button
              onClick={onOpenCertVerifier}
              className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verify Certificate
            </button>
            <span className="text-indigo-800">|</span>
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-indigo-300" /> Helpline: +880 1700-000000
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="hidden w-9 h-9 bg-indigo-900 rounded-xl items-center justify-center text-white font-bold shadow-md shadow-indigo-100 group-hover:bg-indigo-800 transition-colors">
              <span className="text-white font-extrabold text-xl leading-none">E</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                  E-Lawyers <span className="text-indigo-600">Academy</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                Online Legal, Tax & Business Learning
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button
              onClick={() => scrollToSection('home')}
              className={`hidden hover:text-indigo-600 transition-colors ${activeSection === 'home' && currentView === 'public' ? 'text-indigo-600 font-bold' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`hover:text-indigo-600 transition-colors ${activeSection === 'about' && currentView === 'public' ? 'text-indigo-600 font-bold' : ''}`}
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('courses')}
              className={`hover:text-indigo-600 transition-colors ${activeSection === 'courses' && currentView === 'public' ? 'text-indigo-600 font-bold' : ''}`}
            >
              Courses
            </button>
            <button
              onClick={() => scrollToSection('live-classes')}
              className={`hover:text-indigo-600 transition-colors flex items-center gap-1.5 ${activeSection === 'live-classes' && currentView === 'public' ? 'text-indigo-600 font-bold' : ''}`}
            >
              <Video className="w-4 h-4 text-rose-500 animate-pulse" /> Live Classes
            </button>
            <button
              onClick={() => scrollToSection('instructors')}
              className={`hover:text-indigo-600 transition-colors ${activeSection === 'instructors' && currentView === 'public' ? 'text-indigo-600 font-bold' : ''}`}
            >
              Instructors
            </button>
            <button
              onClick={() => scrollToSection('community')}
              className={`hidden hover:text-indigo-600 transition-colors ${activeSection === 'community' && currentView === 'public' ? 'text-indigo-600 font-bold' : ''}`}
            >
              Community
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`hover:text-indigo-600 transition-colors ${activeSection === 'contact' && currentView === 'public' ? 'text-indigo-600 font-bold' : ''}`}
            >
              Contact
            </button>
          </nav>

          {/* Action Tools & View Switcher */}
          <div className="hidden md:flex items-center gap-3">
            {/* AI Advisor Button */}
            <button
              onClick={onOpenAIAdvisor}
              className="hidden flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100 transition-all cursor-pointer shadow-sm"
              title="Get personalized AI course and career advice"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Advisor</span>
            </button>

            {/* Portal Switcher Buttons */}
            <div className="bg-slate-100 p-1 rounded-2xl flex items-center border border-slate-200 text-xs">
              <button
                onClick={() => handleSetView('public')}
                className={`hidden px-3 py-1.5 rounded-xl font-bold items-center gap-1 transition-all ${
                  currentView === 'public'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" /> Public Site
              </button>

              <button
                onClick={() => handleSetView('dashboard')}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition-all ${
                  currentView === 'dashboard'
                    ? 'bg-indigo-900 text-white shadow-md shadow-indigo-100'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> Student Portal
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-indigo-600 rounded-xl focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl text-xs mb-3 border border-slate-200">
            <button
              onClick={() => {
                handleSetView('public');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-center rounded-lg font-bold ${currentView === 'public' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
            >
              Public Site
            </button>
            <button
              onClick={() => {
                handleSetView('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-center rounded-lg font-bold ${currentView === 'dashboard' ? 'bg-indigo-900 text-white' : 'text-slate-600'}`}
            >
              Student Portal
            </button>
          </div>

          <button
            onClick={() => scrollToSection('home')}
            className="block w-full text-left py-2 font-medium text-slate-700 hover:text-indigo-600"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left py-2 font-medium text-slate-700 hover:text-indigo-600"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('courses')}
            className="block w-full text-left py-2 font-medium text-slate-700 hover:text-indigo-600"
          >
            Our Courses
          </button>
          <button
            onClick={() => scrollToSection('live-classes')}
            className="block w-full text-left py-2 font-medium text-slate-700 hover:text-indigo-600"
          >
            Live Classes
          </button>
          <button
            onClick={() => scrollToSection('instructors')}
            className="block w-full text-left py-2 font-medium text-slate-700 hover:text-indigo-600"
          >
            Instructors
          </button>
          <button
            onClick={() => scrollToSection('community')}
            className="block w-full text-left py-2 font-medium text-slate-700 hover:text-indigo-600"
          >
            Community
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="block w-full text-left py-2 font-medium text-slate-700 hover:text-indigo-600"
          >
            Contact
          </button>

          <button
            onClick={onOpenCertVerifier}
            className="w-full text-center py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-indigo-100"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-600" /> Verify Student Certificate
          </button>
        </div>
      )}
    </header>
  );
};
