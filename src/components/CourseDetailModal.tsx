import React, { useState } from 'react';
import { Course } from '../types';
import { SocialShareButtons } from './SocialShareButtons';
import {
  X,
  CheckCircle2,
  BookOpen,
  Clock,
  Video,
  Award,
  ChevronDown,
  ChevronUp,
  UserCheck,
  ShieldCheck,
  FileText,
  CreditCard,
  Building2,
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onEnroll,
}) => {
  const [expandedModule, setExpandedModule] = useState<number | null>(1);

  if (!course) return null;

  const toggleModule = (modNumber: number) => {
    setExpandedModule(expandedModule === modNumber ? null : modNumber);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-[32px] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900 relative flex flex-col">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between z-20">
          <div>
            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
              {course.category} Practice Module
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
              {course.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Banner & Overview */}
          <div className="grid md:grid-cols-12 gap-6 items-center bg-slate-50 p-6 rounded-[28px] border border-slate-200">
            <div className="md:col-span-8 space-y-3">
              <h3 className="text-lg font-extrabold text-indigo-900">Course Overview</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {course.overview}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-4 h-4 text-indigo-600" /> {course.duration}
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Video className="w-4 h-4 text-rose-600" /> {course.totalClasses} Live Classes + Recordings
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Award className="w-4 h-4 text-emerald-600" /> Verified Certificate
                </span>
              </div>
            </div>

            <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-3 shadow-sm">
              <div className="text-2xl font-extrabold text-indigo-900 font-mono">
                ৳{course.price.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Full Access to Live & Recorded Modules</p>
              <button
                onClick={() => {
                  onClose();
                  onEnroll(course);
                }}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition-colors cursor-pointer shadow-md shadow-indigo-100"
              >
                Enroll In Course
              </button>
            </div>
          </div>

          {/* What You Will Learn Grid */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>What You Will Master</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              {course.whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Accordion */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>Course Curriculum ({course.modules.length} Modules)</span>
              </h3>
              <span className="text-xs text-slate-500">Click module to inspect topics</span>
            </div>

            <div className="space-y-3">
              {course.modules.map((mod) => {
                const isOpen = expandedModule === mod.number;
                return (
                  <div
                    key={mod.id}
                    className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleModule(mod.number)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-100/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 font-extrabold text-xs flex items-center justify-center">
                          M{mod.number}
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          Module {mod.number}: {mod.title}
                        </span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-indigo-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-slate-200 bg-white space-y-2 text-xs">
                        <p className="text-slate-500 font-bold mb-2">Module Topics & Practical Demos:</p>
                        <ul className="space-y-1.5 pl-4 list-disc text-slate-700 font-medium">
                          {mod.topics.map((topic, tidx) => (
                            <li key={tidx}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Course Includes & Instructor */}
          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
                Course Package Features:
              </h4>
              <div className="space-y-2 text-xs">
                {course.courseIncludes.map((inc, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
                Lead Instructor
              </h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm border border-indigo-100">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{course.instructorName}</p>
                  <p className="text-xs text-indigo-600 font-medium">{course.instructorRole}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Share Buttons */}
          <SocialShareButtons
            title={course.title}
            subtitle={course.category}
            type="course"
          />
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-white flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onEnroll(course);
            }}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl cursor-pointer shadow-md shadow-indigo-100"
          >
            Enroll Now (৳{course.price.toLocaleString()})
          </button>
        </div>
      </div>
    </div>
  );
};
