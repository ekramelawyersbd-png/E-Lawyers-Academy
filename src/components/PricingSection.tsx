import React from 'react';
import { Check, Sparkles, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section className="py-12 lg:py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3.5">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-indigo-50 text-indigo-800 text-[11px] font-black rounded-full uppercase tracking-widest border border-indigo-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Course Packages & Pricing</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            Transparent <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Learning Plans</span>
          </h2>
          <p className="text-slate-700 text-base font-medium leading-relaxed">
            Affordable tuition options tailored for independent advocates, tax consultants, and corporate compliance teams.
          </p>
        </div>

        {/* 2 Plan Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-slate-200 flex flex-col justify-between space-y-6 shadow-sm hover:border-indigo-200 transition-all relative">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                Self-Paced Track
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">Basic Plan</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ideal for self-directed professionals requiring recorded masterclasses and downloadable template files.
              </p>

              <div className="text-3xl font-extrabold font-sans text-indigo-900">
                ৳3,500 <span className="text-xs font-normal text-slate-400">/ per course</span>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-600">
                <p className="font-extrabold text-slate-400 uppercase text-[10px] tracking-wider">Plan Features:</p>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full Recorded Video Masterclasses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Course Case Files & PDF Handouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Email Helpdesk Access</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('Basic Plan')}
              className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Select Basic Track
            </button>
          </div>

          {/* Professional Plan */}
          <div className="bg-indigo-900 p-8 sm:p-10 rounded-[32px] border-2 border-indigo-600 text-white flex flex-col justify-between space-y-6 shadow-xl relative">
            <div className="absolute -top-3.5 right-8 bg-amber-400 text-slate-950 font-extrabold text-[10px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow">
              Recommended Choice
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-200 bg-indigo-800/80 px-3 py-1 rounded-full border border-indigo-700">
                Full Live Workshop
              </span>
              <h3 className="text-2xl font-extrabold text-white">Professional Plan</h3>
              <p className="text-xs text-indigo-200 leading-relaxed">
                Complete interactive masterclass experience with live sessions, case assignment reviews, direct mentor Q&A, and certification.
              </p>

              <div className="text-3xl font-extrabold font-sans text-white">
                ৳4,500 <span className="text-xs font-normal text-indigo-200">/ per course</span>
              </div>

              <div className="pt-4 border-t border-indigo-800 space-y-3 text-xs text-indigo-100">
                <p className="font-extrabold text-amber-300 uppercase text-[10px] tracking-wider">Includes Everything in Basic, Plus:</p>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Live Interactive Classes with Real-Time Q&A</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Lifetime Recorded Class Archives</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Assignment & Tax Return Feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified Course Completion Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Private Advocate Forum & Alumni Group</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('Professional Plan')}
              className="w-full py-3.5 bg-white hover:bg-slate-100 text-indigo-900 font-extrabold text-xs rounded-xl transition-all shadow-md cursor-pointer"
            >
              Enroll in Professional Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
