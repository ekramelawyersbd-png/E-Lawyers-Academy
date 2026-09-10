import React from 'react';
import { TESTIMONIALS_DATA } from '../data/instructorsData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-12 lg:py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-block px-3.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-widest border border-indigo-100">
            Alumni Reviews & Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved By <span className="text-indigo-600">5,000+ Legal & Tax Professionals</span>
          </h2>
          <p className="text-slate-500 text-base">
            Read how practicing advocates, tax consultants, and corporate lawyers accelerated their careers with E-Lawyers Academy.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200 flex flex-col justify-between space-y-4 shadow-sm hover:border-indigo-200 transition-all relative"
            >
              <div className="space-y-3">
                <Quote className="w-8 h-8 text-indigo-200" />

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-indigo-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                    <span>{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <p className="text-[11px] text-indigo-600 font-bold">{t.designation}</p>
                  {t.company && <p className="text-[10px] text-slate-400">{t.company}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
