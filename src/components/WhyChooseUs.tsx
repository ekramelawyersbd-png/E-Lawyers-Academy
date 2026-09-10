import React from 'react';
import {
  UserCheck,
  BookOpenCheck,
  Video,
  PlayCircle,
  RefreshCw,
  Award,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: UserCheck,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      title: 'Expert Practitioners',
      desc: 'Learn directly from senior Supreme Court advocates, tax lawyers, and chartered accountants who bring real field experience to every class.',
    },
    {
      icon: BookOpenCheck,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      title: 'Practical Learning Approach',
      desc: 'Gain hands-on experience through real tax return filings, statutory drafting, NBR audits, and case study walk-throughs.',
    },
    {
      icon: Video,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
      title: 'Live Interactive Workshops',
      desc: 'Attend live sessions, interact directly with lead instructors, ask questions, and receive instant personalized guidance.',
    },
    {
      icon: PlayCircle,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      title: 'Recorded Class Access',
      desc: 'Never miss a lesson. Full high-definition class recordings are archived in your student dashboard for lifetime revision.',
    },
    {
      icon: RefreshCw,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      title: 'Updated Law & NBR Directives',
      desc: 'Syllabus continuously updated to align with the Finance Act 2026, latest SROs, income tax circulars, and RJSC portal changes.',
    },
    {
      icon: Award,
      color: 'text-purple-600 bg-purple-50 border-purple-100',
      title: 'Verified Certificate',
      desc: 'Earn an official, digital certificate featuring a unique QR verification code to showcase your professional qualification.',
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3.5">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-indigo-50 text-indigo-800 text-[11px] font-black rounded-full uppercase tracking-widest border border-indigo-200/80 shadow-2xs">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>Why Choose E-Lawyers Academy</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            Learn Practical Skills. <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Advance Your Career.</span>
          </h2>
          <p className="text-slate-700 text-base font-medium leading-relaxed">
            We deliver everything required to master legal practice, taxation, and corporate compliance with absolute confidence.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group"
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 ${feat.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {feat.title}
                </h3>

                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
