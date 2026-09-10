import React from 'react';
import {
  CheckCircle2,
  Scale,
  Briefcase,
  FileText,
  ShieldAlert,
  Award,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: 'Practical Knowledge',
      desc: 'Hands-on focus on real E-Return filings, VAT book maintenance, and RJSC forms rather than abstract theory.',
    },
    {
      title: 'Industry Experience',
      desc: 'Learn directly from senior Supreme Court lawyers, chartered accountants, and VAT auditors with 10+ years field experience.',
    },
    {
      title: 'Updated Laws & Regulations',
      desc: 'Syllabus revised continuously according to the Finance Act 2026, NBR statutory orders, and RJSC digital guidelines.',
    },
    {
      title: 'Real Case Studies',
      desc: 'Analyze actual corporate disputes, tax audit notices, and draft binding contracts during live workshops.',
    },
    {
      title: 'Professional Skill Development',
      desc: 'Equip yourself with marketable legal skills to serve clients, grow your legal practice, or advance your corporate career.',
    },
  ];

  return (
    <section id="about" className="py-12 lg:py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Mission & Pillars */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest border border-indigo-100">
              <Scale className="w-4 h-4 text-indigo-600" />
              <span>About E-Lawyers Academy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Bridging Legal Theory & <span className="text-indigo-600">Real Professional Skill</span>
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              <strong className="text-indigo-900 font-bold">E-Lawyers Academy</strong> is Bangladesh’s premier professional online learning platform dedicated to delivering practical training in Legal Practice, Taxation, VAT, Corporate Compliance, and Business Administration.
            </p>

            <div className="bg-indigo-50/70 p-5 rounded-2xl border border-indigo-100 text-indigo-950 italic text-sm font-medium leading-relaxed">
              "Our mission is to bridge the gap between academic legal knowledge and daily procedural execution by offering step-by-step masterclasses led by active practitioners."
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">
                WHY OUR CURRICULUM IS UNMATCHED:
              </h3>
              <div className="space-y-3">
                {pillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{pillar.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Audience Target Cards */}
          <div className="lg:col-span-5 bg-white p-8 sm:p-10 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Professional LMS Platform</h3>
                <p className="text-xs text-slate-500">Tailored training for every legal role</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                <Briefcase className="w-5 h-5 text-indigo-600 mb-2" />
                <p className="font-bold text-slate-900 text-sm">Lawyers & Advocates</p>
                <p className="text-slate-500 mt-1 leading-normal">Enhance tax court filings, drafting, and client retainers.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                <FileText className="w-5 h-5 text-amber-600 mb-2" />
                <p className="font-bold text-slate-900 text-sm">Tax Consultants</p>
                <p className="text-slate-500 mt-1 leading-normal">Master E-Return submission & VAT book audits.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                <ShieldAlert className="w-5 h-5 text-emerald-600 mb-2" />
                <p className="font-bold text-slate-900 text-sm">Business Owners</p>
                <p className="text-slate-500 mt-1 leading-normal">Protect your company with RJSC & statutory compliance.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                <Scale className="w-5 h-5 text-purple-600 mb-2" />
                <p className="font-bold text-slate-900 text-sm">Law Students</p>
                <p className="text-slate-500 mt-1 leading-normal">Gain job-ready practical skills for chamber practice.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-semibold text-indigo-100">Live Learning Portal & Portal Sync</span>
              </div>
              <span className="text-xs text-amber-300 font-bold">2026 Edition</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
