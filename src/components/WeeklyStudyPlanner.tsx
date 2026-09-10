import React, { useState } from 'react';
import { Course } from '../types';
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  BookOpen,
  GripVertical,
  RotateCcw,
  Save,
  Check,
  AlertCircle,
  Brain,
  Zap,
  Target,
  ArrowRight,
} from 'lucide-react';

interface WeeklyStudyPlannerProps {
  courses: Course[];
}

export interface PlannedSlot {
  id: string; // e.g. "Mon-08:00"
  day: string;
  slotId: string;
  slotLabel: string;
  courseId: string;
  courseTitle: string;
  category: string;
  completed: boolean;
  notes?: string;
}

const DAYS = [
  { id: 'Mon', name: 'Monday', short: 'MON' },
  { id: 'Tue', name: 'Tuesday', short: 'TUE' },
  { id: 'Wed', name: 'Wednesday', short: 'WED' },
  { id: 'Thu', name: 'Thursday', short: 'THU' },
  { id: 'Fri', name: 'Friday', short: 'FRI' },
  { id: 'Sat', name: 'Saturday', short: 'SAT' },
  { id: 'Sun', name: 'Sunday', short: 'SUN' },
];

const TIME_SLOTS = [
  { id: 'slot-1', label: '08:00 AM - 10:00 AM', timeRange: 'Morning Focus', hours: 2 },
  { id: 'slot-2', label: '10:00 AM - 12:00 PM', timeRange: 'Mid-day Sprint', hours: 2 },
  { id: 'slot-3', label: '02:00 PM - 04:00 PM', timeRange: 'Afternoon Practice', hours: 2 },
  { id: 'slot-4', label: '05:00 PM - 07:00 PM', timeRange: 'Evening Lecture', hours: 2 },
  { id: 'slot-5', label: '08:00 PM - 10:00 PM', timeRange: 'Night Revision', hours: 2 },
];

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  Taxation: { bg: 'bg-indigo-50/90', border: 'border-indigo-300', text: 'text-indigo-950', badge: 'bg-indigo-600 text-white' },
  VAT: { bg: 'bg-emerald-50/90', border: 'border-emerald-300', text: 'text-emerald-950', badge: 'bg-emerald-600 text-white' },
  Corporate: { bg: 'bg-amber-50/90', border: 'border-amber-300', text: 'text-amber-950', badge: 'bg-amber-500 text-slate-950' },
  Drafting: { bg: 'bg-rose-50/90', border: 'border-rose-300', text: 'text-rose-950', badge: 'bg-rose-600 text-white' },
};

export const WeeklyStudyPlanner: React.FC<WeeklyStudyPlannerProps> = ({ courses }) => {
  // Pre-populate demo weekly schedule
  const [schedule, setSchedule] = useState<Record<string, PlannedSlot>>({
    'Mon-slot-1': {
      id: 'Mon-slot-1',
      day: 'Mon',
      slotId: 'slot-1',
      slotLabel: '08:00 AM - 10:00 AM',
      courseId: courses[0]?.id || 'course-1',
      courseTitle: courses[0]?.title || 'Personal Income Tax & E-Return Masterclass',
      category: courses[0]?.category || 'Taxation',
      completed: true,
      notes: 'Module 1: Income Tax Basics',
    },
    'Wed-slot-3': {
      id: 'Wed-slot-3',
      day: 'Wed',
      slotId: 'slot-3',
      slotLabel: '02:00 PM - 04:00 PM',
      courseId: courses[1]?.id || 'course-2',
      courseTitle: courses[1]?.title || 'VAT & Tax Compliance Professional Training',
      category: courses[1]?.category || 'VAT',
      completed: false,
      notes: 'Mushak 9.1 Return Drafting',
    },
    'Fri-slot-4': {
      id: 'Fri-slot-4',
      day: 'Fri',
      slotId: 'slot-4',
      slotLabel: '05:00 PM - 07:00 PM',
      courseId: courses[0]?.id || 'course-1',
      courseTitle: courses[0]?.title || 'Personal Income Tax & E-Return Masterclass',
      category: courses[0]?.category || 'Taxation',
      completed: false,
      notes: 'Salary Tax Calculation Practice',
    },
    'Sat-slot-2': {
      id: 'Sat-slot-2',
      day: 'Sat',
      slotId: 'slot-2',
      slotLabel: '10:00 AM - 12:00 PM',
      courseId: courses[2]?.id || 'course-3',
      courseTitle: courses[2]?.title || 'Corporate Tax & Assessment Procedure',
      category: courses[2]?.category || 'Corporate',
      completed: false,
      notes: 'Tax Assessment Hearing Prep',
    },
  });

  const [draggedCourseId, setDraggedCourseId] = useState<string | null>(null);
  const [selectedCourseForAssign, setSelectedCourseForAssign] = useState<Course | null>(null);
  const [activeSlotTarget, setActiveSlotTarget] = useState<{ day: string; slotId: string; slotLabel: string } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [weeklyTargetHours] = useState<number>(14);

  // Drag Handlers
  const handleDragStart = (e: React.DragEvent, course: Course) => {
    setDraggedCourseId(course.id);
    e.dataTransfer.setData('text/plain', course.id);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent, dayId: string, slotId: string, slotLabel: string) => {
    e.preventDefault();
    const courseId = e.dataTransfer.getData('text/plain') || draggedCourseId;
    if (!courseId) return;

    const course = courses.find((c) => c.id === courseId) || courses[0];
    if (!course) return;

    const key = `${dayId}-${slotId}`;
    setSchedule((prev) => ({
      ...prev,
      [key]: {
        id: key,
        day: dayId,
        slotId: slotId,
        slotLabel: slotLabel,
        courseId: course.id,
        courseTitle: course.title,
        category: course.category,
        completed: false,
      },
    }));

    setDraggedCourseId(null);
    showToast(`Assigned "${course.title}" to ${DAYS.find((d) => d.id === dayId)?.name} (${slotLabel})`);
  };

  // Click-based Assign Handler (for mobile/touch support)
  const handleAssignToSlot = (course: Course) => {
    if (!activeSlotTarget) return;

    const { day, slotId, slotLabel } = activeSlotTarget;
    const key = `${day}-${slotId}`;

    setSchedule((prev) => ({
      ...prev,
      [key]: {
        id: key,
        day: day,
        slotId: slotId,
        slotLabel: slotLabel,
        courseId: course.id,
        courseTitle: course.title,
        category: course.category,
        completed: false,
      },
    }));

    setActiveSlotTarget(null);
    setSelectedCourseForAssign(null);
    showToast(`Assigned "${course.title}" to ${DAYS.find((d) => d.id === day)?.name} (${slotLabel})`);
  };

  // Remove Slot Handler
  const handleRemoveSlot = (dayId: string, slotId: string) => {
    const key = `${dayId}-${slotId}`;
    setSchedule((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    showToast('Removed study session slot.');
  };

  // Toggle Slot Completion
  const handleToggleComplete = (dayId: string, slotId: string) => {
    const key = `${dayId}-${slotId}`;
    setSchedule((prev) => {
      if (!prev[key]) return prev;
      return {
        ...prev,
        [key]: {
          ...prev[key],
          completed: !prev[key].completed,
        },
      };
    });
  };

  // Smart Auto-Fill Schedule Generator
  const handleAutoFill = () => {
    if (courses.length === 0) return;

    const newSchedule: Record<string, PlannedSlot> = {};
    const daysToFill = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const slotsToFill = ['slot-1', 'slot-3', 'slot-5'];

    let courseIdx = 0;
    daysToFill.forEach((day) => {
      slotsToFill.forEach((slotId) => {
        const course = courses[courseIdx % courses.length];
        const slotObj = TIME_SLOTS.find((s) => s.id === slotId);
        const key = `${day}-${slotId}`;

        newSchedule[key] = {
          id: key,
          day,
          slotId,
          slotLabel: slotObj?.label || '',
          courseId: course.id,
          courseTitle: course.title,
          category: course.category,
          completed: false,
          notes: 'Auto-balanced weekly study block',
        };

        courseIdx++;
      });
    });

    setSchedule(newSchedule);
    showToast('✨ Smart Auto-Fill completed! 18 hours of balanced study planned for this week.');
  };

  // Clear Schedule
  const handleClearAll = () => {
    setSchedule({});
    showToast('Schedule cleared.');
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Calculated Stats
  const totalPlannedSessions = Object.keys(schedule).length;
  const totalPlannedHours = totalPlannedSessions * 2; // Each slot is 2 hours
  const completedSessionsCount = (Object.values(schedule) as PlannedSlot[]).filter((s) => s.completed).length;
  const completedHours = completedSessionsCount * 2;
  const progressPercent = Math.min(100, Math.round((totalPlannedHours / weeklyTargetHours) * 100));

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* HEADER HERO BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-[32px] border border-indigo-900 text-white relative overflow-hidden shadow-xl space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-extrabold text-amber-300">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Interactive Drag & Drop Weekly Planner</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Weekly Study Schedule
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium leading-relaxed">
              Drag your enrolled tax & law courses into daily time slots to structure your study routine and achieve your weekly learning target!
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleAutoFill}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-2xl transition-all cursor-pointer shadow-md shadow-amber-400/20 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Auto-Fill Schedule</span>
            </button>

            <button
              onClick={handleClearAll}
              className="px-4 py-2.5 bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-indigo-200 font-extrabold text-xs rounded-2xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* STATS PROGRESS BAR */}
        <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-indigo-900/80 text-xs">
          <div className="bg-indigo-950/70 p-4 rounded-2xl border border-indigo-900 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-indigo-300 font-bold uppercase block">Weekly Target</span>
              <span className="font-extrabold text-white text-base font-mono">
                {totalPlannedHours} / {weeklyTargetHours} Hours
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 text-amber-300 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-indigo-950/70 p-4 rounded-2xl border border-indigo-900 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-indigo-300 font-bold uppercase block">Completed Sessions</span>
              <span className="font-extrabold text-emerald-400 text-base font-mono">
                {completedSessionsCount} / {totalPlannedSessions} Sessions
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-indigo-950/70 p-4 rounded-2xl border border-indigo-900 space-y-1.5 flex flex-col justify-center">
            <div className="flex justify-between font-bold text-[11px]">
              <span className="text-indigo-200">Study Goal Target</span>
              <span className="text-amber-300 font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-indigo-900">
              <div
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT: COURSES SIDEBAR + WEEKLY GRID */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: ENROLLED COURSES (DRAGGABLE PALETTE) */}
        <div className="lg:col-span-4 bg-white rounded-[32px] border border-slate-200 p-6 space-y-5 shadow-sm sticky top-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Draggable Courses</span>
              </h3>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Drag a course card into any time slot on the right, or tap to assign.
              </p>
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-indigo-200">
              {courses.length} Available
            </span>
          </div>

          {/* List of Draggable Course Cards */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {courses.map((course) => {
              const catTheme = CATEGORY_COLORS[course.category] || CATEGORY_COLORS.Taxation;

              return (
                <div
                  key={course.id}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, course)}
                  className={`p-4 rounded-2xl border transition-all cursor-grab active:cursor-grabbing hover:shadow-md ${catTheme.bg} ${catTheme.border}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-slate-400 shrink-0 pt-0.5">
                      <GripVertical className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[9px] font-black px-2 py-0.2 rounded-full uppercase ${catTheme.badge}`}>
                          {course.category}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono font-extrabold">2 hrs/session</span>
                      </div>

                      <h4 className={`text-xs font-black truncate ${catTheme.text}`}>{course.title}</h4>
                      <p className="text-[11px] text-slate-600 font-medium line-clamp-1">
                        Instructor: {course.instructorName}
                      </p>
                    </div>
                  </div>

                  {/* Assign Button for Mobile / Touch Users */}
                  <button
                    onClick={() => setSelectedCourseForAssign(course)}
                    className="w-full mt-3 py-1.5 bg-white/90 hover:bg-white text-slate-900 border border-slate-200 font-extrabold text-[11px] rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Quick Assign to Slot</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Quick Study Tip Card */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-amber-900 font-extrabold">
              <Brain className="w-4 h-4 text-amber-600" />
              <span>Study Tip for Tax Practice</span>
            </div>
            <p className="text-amber-900/90 text-[11px] leading-relaxed">
              Spacing study sessions across 3 to 4 days per week improves long-term memory recall for statutory tax laws by up to 65%!
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: WEEKLY SCHEDULE GRID */}
        <div className="lg:col-span-8 bg-white rounded-[32px] border border-slate-200 p-6 space-y-6 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <span>Weekly Time Slot Grid</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Drop courses directly onto target slots below to update your study calendar.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Completed</span>
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 ml-2" />
              <span>Scheduled</span>
            </div>
          </div>

          {/* WEEKLY GRID TABLE */}
          <div className="overflow-x-auto">
            <div className="min-w-[700px] space-y-4">
              {DAYS.map((day) => {
                // Count slots in this day
                const daySlots = TIME_SLOTS.map((slot) => schedule[`${day.id}-${slot.id}`]).filter(Boolean);

                return (
                  <div key={day.id} className="bg-slate-50/80 rounded-2xl border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-900 text-white font-black text-xs px-3 py-1 rounded-xl">
                          {day.name}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {daySlots.length === 0 ? 'No sessions scheduled' : `${daySlots.length * 2} hours scheduled`}
                        </span>
                      </div>
                    </div>

                    {/* Time Slots Row for this Day */}
                    <div className="grid grid-cols-5 gap-2.5">
                      {TIME_SLOTS.map((slot) => {
                        const slotKey = `${day.id}-${slot.id}`;
                        const planned = schedule[slotKey];

                        return (
                          <div
                            key={slot.id}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, day.id, slot.id, slot.label)}
                            className={`min-h-[110px] p-2.5 rounded-2xl border transition-all flex flex-col justify-between relative ${
                              planned
                                ? planned.completed
                                  ? 'bg-emerald-50/90 border-emerald-300'
                                  : 'bg-indigo-50/90 border-indigo-300 shadow-xs'
                                : 'bg-white border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30'
                            }`}
                          >
                            {/* Slot Time Label */}
                            <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-500 border-b border-slate-200/60 pb-1">
                              <span className="font-mono">{slot.label.split(' - ')[0]}</span>
                              <span className="text-[9px] text-slate-400 uppercase">{slot.timeRange.split(' ')[0]}</span>
                            </div>

                            {/* Slot Content */}
                            {planned ? (
                              <div className="my-1.5 space-y-1">
                                <span className="bg-indigo-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded uppercase inline-block">
                                  {planned.category}
                                </span>
                                <h5 className="text-[11px] font-black text-slate-900 line-clamp-2 leading-tight">
                                  {planned.courseTitle}
                                </h5>
                                {planned.notes && (
                                  <p className="text-[9px] text-slate-500 font-medium line-clamp-1 italic">
                                    {planned.notes}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <button
                                onClick={() =>
                                  setActiveSlotTarget({ day: day.id, slotId: slot.id, slotLabel: slot.label })
                                }
                                className="my-auto text-center py-3 text-slate-400 hover:text-indigo-600 font-bold text-[11px] flex flex-col items-center justify-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-4 h-4" />
                                <span>Drop Course</span>
                              </button>
                            )}

                            {/* Slot Footer Controls */}
                            {planned && (
                              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px]">
                                <button
                                  onClick={() => handleToggleComplete(day.id, slot.id)}
                                  className={`font-black flex items-center gap-1 cursor-pointer transition-colors ${
                                    planned.completed ? 'text-emerald-700' : 'text-indigo-600 hover:text-indigo-800'
                                  }`}
                                  title={planned.completed ? 'Mark Incomplete' : 'Mark Completed'}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>{planned.completed ? 'Done' : 'Mark'}</span>
                                </button>

                                <button
                                  onClick={() => handleRemoveSlot(day.id, slot.id)}
                                  className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer"
                                  title="Remove Slot"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL FOR TOUCH / QUICK ASSIGNMENT */}
      {(selectedCourseForAssign || activeSlotTarget) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] border border-slate-200 p-6 max-w-md w-full space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <span>Assign Course to Time Slot</span>
              </h3>
              <button
                onClick={() => {
                  setSelectedCourseForAssign(null);
                  setActiveSlotTarget(null);
                }}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {selectedCourseForAssign && (
              <div className="p-3 bg-indigo-50 rounded-2xl border border-indigo-200 space-y-1">
                <span className="text-[10px] text-indigo-600 font-extrabold uppercase">Selected Course</span>
                <h4 className="font-extrabold text-xs text-slate-900">{selectedCourseForAssign.title}</h4>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-xs font-extrabold text-slate-700 block">Select Day & Slot:</label>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
                {DAYS.map((d) =>
                  TIME_SLOTS.map((s) => (
                    <button
                      key={`${d.id}-${s.id}`}
                      onClick={() => {
                        setActiveSlotTarget({ day: d.id, slotId: s.id, slotLabel: s.label });
                        if (selectedCourseForAssign) {
                          handleAssignToSlot(selectedCourseForAssign);
                        }
                      }}
                      className="p-2.5 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-xl border border-slate-200 text-left transition-all cursor-pointer text-xs font-bold"
                    >
                      <span className="block text-[10px] opacity-75">{d.name}</span>
                      <span className="font-mono text-[11px]">{s.label.split(' - ')[0]}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-indigo-500/40 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-300">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
