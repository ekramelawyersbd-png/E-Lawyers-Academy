import React from 'react';
import {
  BookOpen,
  Video,
  Award,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileCheck,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreCourses: () => void;
  onJoinFreeSession: () => void;
  onOpenAIAdvisor: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCourses,
  onJoinFreeSession,
  onOpenAIAdvisor,
}) => {
  return (
    <section id="home" className="py-8 lg:py-12 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Area */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Hero & Mission + Features */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-slate-200/90 shadow-sm flex-1 flex flex-col justify-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-indigo-50 text-indigo-800 text-[11px] font-black rounded-full mb-5 w-fit uppercase tracking-widest border border-indigo-200/80 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Professional Learning Platform</span>
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.12] text-slate-950 mb-5 tracking-tight">
                Empowering Legal, Tax & <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 bg-clip-text text-transparent">Business Professionals</span>
              </h1>

              <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed mb-8 max-w-xl">
                Practical online learning from experienced Supreme Court advocates and industry experts. Access recorded sessions anytime after interactive live masterclasses.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={onExploreCourses}
                  className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-colors flex items-center gap-2 text-sm cursor-pointer"
                >
                  <BookOpen className="w-5 h-5 text-indigo-100" />
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onJoinFreeSession}
                  className="px-7 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl shadow-sm transition-colors flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Video className="w-5 h-5 text-rose-500 animate-pulse" />
                  <span>Join Free Session</span>
                </button>

                <button
                  onClick={onOpenAIAdvisor}
                  className="px-5 py-3.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 font-bold rounded-2xl transition-colors flex items-center gap-2 text-xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>AI Advisor</span>
                </button>
              </div>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-3 text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">Practical Focus</h3>
                <p className="text-xs text-slate-500 mt-1">Real-world case studies & NBR filings</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3 text-blue-600">
                  <Video className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">Live Interactive</h3>
                <p className="text-xs text-slate-500 mt-1">Ask questions live during sessions</p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-3 text-amber-600">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">Certification</h3>
                <p className="text-xs text-slate-500 mt-1">Verified professional accreditation</p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Card & Featured Courses Preview */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Upcoming Live Class Card */}
            <div className="bg-indigo-900 rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl flex flex-col justify-between">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-indigo-800 rounded-full blur-3xl opacity-50 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-3 py-1 bg-red-500 text-[10px] font-bold rounded-full uppercase tracking-wider mb-2 inline-block">
                      Upcoming Live
                    </span>
                    <h2 className="text-xl font-bold leading-tight">Income Tax Practical Training</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-amber-300">8:00 PM</div>
                    <div className="text-xs text-indigo-200 font-medium">10 Aug 2026</div>
                  </div>
                </div>

                <div className="p-4 bg-indigo-800/60 rounded-2xl border border-indigo-700/60 mb-6">
                  <div className="text-xs text-indigo-300 font-medium mb-1">Current Topic</div>
                  <div className="font-semibold text-white">Complete E-Return Submission & Tax Rebate Calculation</div>
                </div>

                <button
                  onClick={onJoinFreeSession}
                  className="w-full py-3.5 bg-white text-indigo-900 font-bold rounded-2xl hover:bg-slate-100 transition-colors shadow-md text-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4 text-indigo-900" />
                  <span>Join Live Session</span>
                </button>
              </div>
            </div>

            {/* Courses Preview Box */}
            <div className="flex-1 bg-white rounded-[32px] border border-slate-200 p-6 flex flex-col shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-extrabold text-slate-900 text-base">Featured Programs</h2>
                <button
                  onClick={onExploreCourses}
                  className="text-indigo-600 text-xs font-bold hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-colors">
                  <div className="w-11 h-11 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-slate-900 truncate">Personal Income Tax Masterclass</div>
                    <div className="text-[11px] text-slate-400 truncate">Practical E-Return Filing</div>
                  </div>
                  <div className="ml-auto font-bold text-slate-900 text-sm">৳6,500</div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-100 transition-colors">
                  <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-slate-900 truncate">VAT & Tax Compliance</div>
                    <div className="text-[11px] text-slate-400 truncate">Advanced Documentation Training</div>
                  </div>
                  <div className="ml-auto font-bold text-slate-900 text-sm">৳7,500</div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 hover:border-amber-100 transition-colors">
                  <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-slate-900 truncate">Corporate Legal Compliance</div>
                    <div className="text-[11px] text-slate-400 truncate">RJSC & Company Formation</div>
                  </div>
                  <div className="ml-auto font-bold text-slate-900 text-sm">৳8,000</div>
                </div>
              </div>

              <div className="mt-5 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-3">
                <div className="flex -space-x-2 shrink-0">
                  <div className="w-7 h-7 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-700">TA</div>
                  <div className="w-7 h-7 rounded-full bg-indigo-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-900">SR</div>
                  <div className="w-7 h-7 rounded-full bg-emerald-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-900">MH</div>
                </div>
                <p className="text-xs text-indigo-800 font-semibold">
                  Join 5,000+ legal and tax professionals learning today.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Global Statistics Strip */}
        <div className="mt-8 bg-white rounded-[32px] border border-slate-200 p-6 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-600">100%</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Practical Case Studies</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">15+</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Expert Lawyers & Consultants</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600">24/7</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Dashboard & Video Access</p>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-900">2026</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Finance Act & NBR Compliant</p>
          </div>
        </div>

      </div>
    </section>
  );
};
