import React, { useState, useEffect } from 'react';
import { Course, Module } from '../types';
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  BookOpen,
  AlertCircle,
  PlayCircle,
  Target
} from 'lucide-react';

interface DailyStudyPlannerProps {
  courses: Course[];
}

interface PlannedSession {
  id: string;
  hour: number;
  timeLabel: string;
  courseId: string;
  moduleId: string;
  isCompleted: boolean;
}

const TIME_SLOTS = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 7; // 7 AM to 10 PM
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour;
  return {
    hour,
    label: `${displayHour}:00 ${ampm}`,
  };
});

export const DailyStudyPlanner: React.FC<DailyStudyPlannerProps> = ({ courses }) => {
  const [sessions, setSessions] = useState<PlannedSession[]>([
    {
      id: 'session-1',
      hour: 9,
      timeLabel: '9:00 AM',
      courseId: courses[0]?.id || '',
      moduleId: courses[0]?.modules[0]?.id || '',
      isCompleted: true,
    },
    {
      id: 'session-2',
      hour: 14,
      timeLabel: '2:00 PM',
      courseId: courses[0]?.id || '',
      moduleId: courses[0]?.modules[1]?.id || '',
      isCompleted: false,
    }
  ]);
  
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [isEditingSlot, setIsEditingSlot] = useState<number | null>(null);
  
  const [editCourseId, setEditCourseId] = useState('');
  const [editModuleId, setEditModuleId] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenEdit = (hour: number) => {
    const existing = sessions.find(s => s.hour === hour);
    if (existing) {
      setEditCourseId(existing.courseId);
      setEditModuleId(existing.moduleId);
    } else {
      setEditCourseId(courses[0]?.id || '');
      setEditModuleId(courses[0]?.modules[0]?.id || '');
    }
    setIsEditingSlot(hour);
  };

  const handleSaveSlot = (hour: number, timeLabel: string) => {
    if (!editCourseId || !editModuleId) return;
    
    setSessions(prev => {
      const filtered = prev.filter(s => s.hour !== hour);
      return [...filtered, {
        id: `session-${Date.now()}`,
        hour,
        timeLabel,
        courseId: editCourseId,
        moduleId: editModuleId,
        isCompleted: false
      }];
    });
    setIsEditingSlot(null);
  };

  const handleDeleteSlot = (hour: number) => {
    setSessions(prev => prev.filter(s => s.hour !== hour));
    setIsEditingSlot(null);
  };

  const toggleComplete = (id: string) => {
    setSessions(prev => prev.map(s => 
      s.id === id ? { ...s, isCompleted: !s.isCompleted } : s
    ));
  };

  const todayStr = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', month: 'long', day: 'numeric' 
  }).format(new Date());

  const progressPct = sessions.length > 0 
    ? Math.round((sessions.filter(s => s.isCompleted).length / sessions.length) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[32px] border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Target className="w-6 h-6 text-indigo-600" />
              Daily Study Planner
            </h2>
            <p className="text-sm font-medium text-slate-500">
              {todayStr} • Schedule your modules by the hour
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Daily Progress</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-indigo-950">{progressPct}%</span>
              </div>
            </div>
            <div className="w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="pt-6 relative before:absolute before:inset-0 before:left-12 sm:before:left-[4.5rem] before:w-px before:bg-slate-100 before:-z-0">
          <div className="space-y-6">
            {TIME_SLOTS.map((slot) => {
              const session = sessions.find(s => s.hour === slot.hour);
              const isCurrentHour = currentHour === slot.hour;
              const isPastHour = currentHour > slot.hour;
              const isEditing = isEditingSlot === slot.hour;

              let statusClasses = 'bg-white border-slate-200';
              if (isCurrentHour) statusClasses = 'bg-indigo-50 border-indigo-200 shadow-md shadow-indigo-100/50';
              else if (isPastHour && !session?.isCompleted) statusClasses = 'bg-rose-50/50 border-rose-100 opacity-70';
              else if (session?.isCompleted) statusClasses = 'bg-emerald-50 border-emerald-200 opacity-80';

              return (
                <div key={slot.hour} className="relative z-10 flex gap-4 sm:gap-6 group">
                  {/* Timeline Time */}
                  <div className="w-16 sm:w-20 shrink-0 text-right pt-4">
                    <span className={`text-[11px] font-extrabold ${isCurrentHour ? 'text-indigo-600' : 'text-slate-400'}`}>
                      {slot.label}
                    </span>
                  </div>

                  {/* Timeline Dot */}
                  <div className={`w-4 h-4 rounded-full mt-4 shrink-0 border-4 outline outline-4 outline-white ${
                    isCurrentHour ? 'bg-indigo-600 border-indigo-200 animate-pulse' : 
                    session?.isCompleted ? 'bg-emerald-500 border-emerald-100' :
                    'bg-slate-300 border-slate-100'
                  }`} />

                  {/* Slot Content */}
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="bg-white p-4 rounded-2xl border-2 border-indigo-500 shadow-lg space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Select Course</label>
                            <select 
                              value={editCourseId}
                              onChange={(e) => {
                                setEditCourseId(e.target.value);
                                const c = courses.find(c => c.id === e.target.value);
                                if (c && c.modules.length > 0) setEditModuleId(c.modules[0].id);
                              }}
                              className="w-full text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                            >
                              {courses.map(c => (
                                <option key={c.id} value={c.id}>{c.title}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Select Module</label>
                            <select 
                              value={editModuleId}
                              onChange={(e) => setEditModuleId(e.target.value)}
                              className="w-full text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-indigo-500"
                            >
                              {courses.find(c => c.id === editCourseId)?.modules.map(m => (
                                <option key={m.id} value={m.id}>Module {m.number}: {m.title}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                          {session && (
                            <button 
                              onClick={() => handleDeleteSlot(slot.hour)}
                              className="px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer mr-auto flex items-center gap-1.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Remove
                            </button>
                          )}
                          <button 
                            onClick={() => setIsEditingSlot(null)}
                            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => handleSaveSlot(slot.hour, slot.label)}
                            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl transition-colors cursor-pointer shadow-md shadow-indigo-100"
                          >
                            Save Session
                          </button>
                        </div>
                      </div>
                    ) : session ? (
                      <div 
                        onClick={() => handleOpenEdit(slot.hour)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer group/card flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${statusClasses}`}
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-lg ${
                              isCurrentHour ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {courses.find(c => c.id === session.courseId)?.category}
                            </span>
                            {isCurrentHour && (
                              <span className="flex items-center gap-1 text-[10px] font-black text-rose-600 uppercase bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">
                                <Clock className="w-3 h-3" /> Upcoming / Now
                              </span>
                            )}
                          </div>
                          <h4 className={`text-sm font-extrabold ${session.isCompleted ? 'text-emerald-950 line-through decoration-emerald-300' : 'text-slate-900'}`}>
                            {courses.find(c => c.id === session.courseId)?.title}
                          </h4>
                          <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                            Module {courses.find(c => c.id === session.courseId)?.modules.find(m => m.id === session.moduleId)?.number}: {courses.find(c => c.id === session.courseId)?.modules.find(m => m.id === session.moduleId)?.title}
                          </p>
                        </div>
                        
                        <div className="shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleComplete(session.id);
                            }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border cursor-pointer ${
                              session.isCompleted 
                                ? 'bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600' 
                                : 'bg-white text-slate-400 border-slate-200 hover:border-emerald-300 hover:text-emerald-500'
                            }`}
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={() => handleOpenEdit(slot.hour)}
                        className={`h-full min-h-[4rem] rounded-2xl border-2 border-dashed flex items-center justify-center transition-all cursor-pointer group/add ${
                          isCurrentHour ? 'border-indigo-300 bg-indigo-50/50 hover:bg-indigo-50' : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`text-xs font-extrabold flex items-center gap-1.5 transition-colors ${
                          isCurrentHour ? 'text-indigo-500' : 'text-slate-400 group-hover/add:text-indigo-500'
                        }`}>
                          <Plus className="w-4 h-4" />
                          Schedule Study Session
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
