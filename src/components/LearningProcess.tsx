import React from 'react';
import {
  BookOpen,
  CreditCard,
  Video,
  PlayCircle,
  Award,
  ChevronRight,
} from 'lucide-react';

export const LearningProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: BookOpen,
      title: 'Choose Course',
      desc: 'Select the course matching your career goals in Tax, VAT, or Corporate practice.',
    },
    {
      num: '02',
      icon: CreditCard,
      title: 'Enroll Online',
      desc: 'Complete instant online enrollment via bKash, Nagad, Rocket, or cards.',
    },
    {
      num: '03',
      icon: Video,
      title: 'Live Workshops',
      desc: 'Join interactive live masterclasses with Supreme Court advocates.',
    },
    {
      num: '04',
      icon: PlayCircle,
      title: 'Class Archives',
      desc: 'Watch recordings, download case files, and take timestamped notes anytime.',
    },
    {
      num: '05',
      icon: Award,
      title: 'Get Certified',
      desc: 'Complete course assignments and earn your verifiable digital certificate.',
    },
  ];

  return (
    <section className="py-12 lg:py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3.5">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-indigo-50 text-indigo-800 text-[11px] font-black rounded-full uppercase tracking-widest border border-indigo-200/80 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Student Journey</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            How E-Lawyers Academy <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-slate-700 text-base font-medium leading-relaxed">
            A simple 5-step process designed to elevate your legal expertise from enrollment to certificate.
          </p>
        </div>

        {/* 5 Steps Timeline */}
        <div className="grid md:grid-cols-5 gap-4 relative">
          {steps.map((s, idx) => {
            const IconComponent = s.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-[28px] border border-slate-200 p-6 space-y-3 shadow-sm hover:border-indigo-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-extrabold text-indigo-600 font-mono">
                      {s.num}
                    </span>
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {s.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
