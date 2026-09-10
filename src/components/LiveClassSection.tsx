import React from 'react';
import { LiveClass } from '../types';
import {
  Video,
  Calendar,
  Clock,
  UserCheck,
  Users,
  Play,
  Sparkles,
  Radio,
} from 'lucide-react';

interface LiveClassSectionProps {
  liveClasses: LiveClass[];
  onJoinLiveClass: (liveClass: LiveClass) => void;
}

export const LiveClassSection: React.FC<LiveClassSectionProps> = ({
  liveClasses,
  onJoinLiveClass,
}) => {
  return (
    <section id="live-classes" className="py-12 lg:py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 text-rose-800 text-[11px] font-black uppercase tracking-widest border border-rose-200/80 shadow-2xs">
              <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>Interactive Live Sessions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Upcoming Live <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Masterclasses</span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base font-medium max-w-xl leading-relaxed">
              Interact directly with senior Supreme Court advocates and tax consultants in real time. Ask live questions, view NBR e-Return portal walkthroughs, and receive instant feedback.
            </p>
          </div>
        </div>

        {/* Next Live Session Spotlight Banner */}
        <div className="bg-indigo-900 rounded-[32px] p-8 sm:p-10 text-white relative overflow-hidden shadow-xl mb-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-800 rounded-full blur-3xl opacity-50 pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-red-500 text-white font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                  Next Live Workshop
                </span>
                <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                  <Users className="w-4 h-4" /> 340+ Registered
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Income Tax Practical Training
              </h3>

              <div className="bg-indigo-800/60 p-5 rounded-2xl border border-indigo-700/60 space-y-1">
                <p className="text-xs text-indigo-300 uppercase font-extrabold tracking-widest">
                  LIVE WORKSHOP TOPIC:
                </p>
                <p className="font-bold text-white text-base sm:text-lg">
                  Complete E-Return Submission Process & NBR Portal Demo
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-indigo-100 pt-2">
                <div className="flex items-center gap-2 bg-indigo-950/80 px-4 py-2.5 rounded-xl border border-indigo-800/80">
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>Date: <strong>10 August 2026</strong></span>
                </div>
                <div className="flex items-center gap-2 bg-indigo-950/80 px-4 py-2.5 rounded-xl border border-indigo-800/80">
                  <Clock className="w-4 h-4 text-indigo-300" />
                  <span>Time: <strong>8:00 PM (BST)</strong></span>
                </div>
                <div className="flex items-center gap-2 bg-indigo-950/80 px-4 py-2.5 rounded-xl border border-indigo-800/80">
                  <UserCheck className="w-4 h-4 text-emerald-300" />
                  <span>Instructor: <strong>Advocate Tanvir Ahmed</strong></span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center bg-indigo-950/90 p-8 rounded-[28px] border border-indigo-800 space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center animate-bounce">
                <Video className="w-8 h-8" />
              </div>

              <div>
                <p className="text-sm font-bold text-white">Live Classroom Portal</p>
                <p className="text-xs text-indigo-200 mt-0.5">HD Video, Screen Share & Real-Time Q&A</p>
              </div>

              <button
                onClick={() => onJoinLiveClass(liveClasses[0])}
                className="w-full py-4 bg-white text-indigo-900 font-bold text-sm rounded-2xl hover:bg-slate-100 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-indigo-900 text-indigo-900" />
                <span>Join Live Workshop</span>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Live Schedule Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {liveClasses.slice(1).map((lc) => (
            <div
              key={lc.id}
              className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200 shadow-sm hover:border-indigo-200 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-full border border-indigo-100">
                    {lc.courseTitle}
                  </span>
                  <span className="text-slate-500 font-semibold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-indigo-600" /> {lc.attendeesCount} Registered
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 mt-2">
                  {lc.topic}
                </h4>

                <p className="text-xs text-slate-500">
                  Instructor: <strong className="text-slate-800">{lc.instructor}</strong>
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">Scheduled Time</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {lc.date} • {lc.time}
                  </span>
                </div>

                <button
                  onClick={() => onJoinLiveClass(lc)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Session</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
