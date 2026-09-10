import React from 'react';
import { Scale, Facebook, Youtube, Linkedin, ShieldCheck, Settings } from 'lucide-react';

interface FooterProps {
  onOpenCertVerifier: () => void;
  onOpenAIAdvisor?: () => void;
  setCurrentView?: (view: 'public' | 'dashboard' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCertVerifier, setCurrentView }) => {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-sm">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">E-Lawyers Academy</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              Online Legal, Tax & Business Learning Platform designed for advocates, accountants, and business leaders in Bangladesh.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-slate-900 font-extrabold uppercase tracking-wider text-[11px] mb-3">Quick Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-indigo-600 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-indigo-600 transition-colors">About Academy</a></li>
              <li><a href="#courses" className="hover:text-indigo-600 transition-colors">Course Catalog</a></li>
              <li><a href="#instructors" className="hover:text-indigo-600 transition-colors">Faculty Members</a></li>
              <li><a href="#contact" className="hover:text-indigo-600 transition-colors">Support & Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Student Tools */}
          <div className="space-y-2">
            <h4 className="text-slate-900 font-extrabold uppercase tracking-wider text-[11px] mb-3">Student Tools & Access</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenCertVerifier}
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 font-bold text-indigo-600 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verify Certificate
                </button>
              </li>
              <li><a href="#live-classes" className="hover:text-indigo-600 transition-colors">Live Class Schedule</a></li>
              <li><a href="#community" className="hover:text-indigo-600 transition-colors">Advocate Forum</a></li>
              {setCurrentView && (
                <li className="pt-1">
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="hover:text-indigo-900 transition-colors flex items-center gap-1.5 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl border border-slate-200 cursor-pointer text-xs"
                  >
                    <Settings className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Admin Panel Access</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Follow Us */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-extrabold uppercase tracking-wider text-[11px]">Follow Academy</h4>
            <p className="text-xs text-slate-500">Connect with our legal network across Bangladesh.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2.5 bg-slate-100 hover:bg-slate-200 text-indigo-600 rounded-xl transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-slate-100 hover:bg-slate-200 text-rose-600 rounded-xl transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-slate-100 hover:bg-slate-200 text-sky-600 rounded-xl transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p>© 2026 E-Lawyers Academy. All Rights Reserved.</p>
          <div className="flex items-center gap-4 font-medium">
            <span>Bangladesh Tax & Corporate Law Standard</span>
            {setCurrentView && (
              <button
                onClick={() => setCurrentView('admin')}
                className="text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1 font-bold cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-indigo-600" />
                <span>Admin Access</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
