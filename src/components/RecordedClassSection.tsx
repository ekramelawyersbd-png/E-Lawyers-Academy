import React from 'react';
import { RecordedClass } from '../types';
import {
  PlayCircle,
  Clock,
  Download,
  FileText,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface RecordedClassSectionProps {
  recordedClasses: RecordedClass[];
  onWatchRecording: (recording: RecordedClass) => void;
}

export const RecordedClassSection: React.FC<RecordedClassSectionProps> = ({
  recordedClasses,
  onWatchRecording,
}) => {
  return (
    <section className="py-12 lg:py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 text-indigo-800 text-[11px] font-black rounded-full uppercase tracking-widest border border-indigo-200/80 shadow-2xs">
              <PlayCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>Recorded Masterclass Vault</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Class Archives & <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Replays</span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base font-medium max-w-xl leading-relaxed">
              Access completed live masterclasses anytime from your student dashboard. Rewatch, practice, take notes, and download official case files.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-slate-200 text-xs text-emerald-600 font-bold shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>24/7 On-Demand Access</span>
          </div>
        </div>

        {/* Recorded Classes Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {recordedClasses.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-[32px] border border-slate-200 hover:border-indigo-200 transition-all p-6 sm:p-8 flex flex-col justify-between shadow-sm group space-y-6"
            >
              <div className="space-y-4">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-indigo-100">
                    Module {rec.moduleNumber} Archive
                  </span>
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> {rec.status}
                  </span>
                </div>

                {/* Video Title */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {rec.sessionTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{rec.courseTitle}</p>
                </div>

                {/* Features List */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Watch Anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Resume Learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Download Files</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Add Personal Notes</span>
                  </div>
                </div>

                {/* Attachments Preview */}
                {rec.resources.length > 0 && (
                  <div className="pt-1">
                    <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                      Class Documents & Spreadsheets:
                    </p>
                    <div className="space-y-2 text-xs">
                      {rec.resources.map((res, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-100"
                        >
                          <span className="text-slate-700 font-medium truncate">{res.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{res.size}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Duration: <strong>{rec.duration}</strong></span>
                </div>

                <button
                  onClick={() => onWatchRecording(rec)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Watch Video</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
