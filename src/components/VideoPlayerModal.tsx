import React, { useState } from 'react';
import { RecordedClass } from '../types';
import { PomodoroTimer } from './PomodoroTimer';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Download,
  FileText,
  Bookmark,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  Volume2,
  Brain,
  Timer,
  Flame,
} from 'lucide-react';

interface VideoPlayerModalProps {
  recording: RecordedClass | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  recording,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'notes' | 'resources' | 'transcript' | 'pomodoro'>('notes');
  const [showPomodoroDrawer, setShowPomodoroDrawer] = useState<boolean>(false);
  const [notes, setNotes] = useState<string[]>([
    '08:15 - Income calculation formula for salaried employees.',
    '24:30 - Remember to deduct 15% allowable investment rebate limit.',
    '45:10 - NBR e-Return portal IT-11GA form upload rules.',
  ]);
  const [newNote, setNewNote] = useState('');

  if (!recording) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([...notes, `12:40 - ${newNote}`]);
    setNewNote('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white border border-slate-200 rounded-[32px] max-w-6xl w-full h-[90vh] flex flex-col overflow-hidden shadow-2xl text-slate-900 relative">
        {/* Header */}
        <div className="bg-slate-50 p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
              MODULE {recording.moduleNumber} RECORDING
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-2">
              {recording.sessionTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Pomodoro Focus Toggle Button */}
            <button
              onClick={() => {
                setActiveTab('pomodoro');
                setShowPomodoroDrawer(!showPomodoroDrawer);
              }}
              className="px-3.5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-xs rounded-2xl cursor-pointer shadow-md shadow-amber-400/20 flex items-center gap-1.5 transition-all"
            >
              <Brain className="w-4 h-4 text-slate-950" />
              <span>Pomodoro Study Timer</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video & Controls Layout */}
        <div className="flex-1 grid lg:grid-cols-12 overflow-hidden">
          {/* Left Column: Video Screen */}
          <div className="lg:col-span-8 bg-slate-900 p-4 flex flex-col justify-between border-r border-slate-200">
            <div className="relative aspect-video bg-black rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
              {recording.isIframe || recording.videoUrl.includes('facebook.com') || recording.videoUrl.includes('iframe') ? (
                <iframe
                  src={recording.videoUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="w-full h-full rounded-2xl"
                  title={recording.sessionTitle}
                />
              ) : (
                <video
                  src={recording.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Video Overview Strip */}
            <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-indigo-400">{recording.courseTitle}</p>
                <p className="text-slate-400 mt-0.5">Uploaded on {recording.dateUploaded}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('pomodoro')}
                  className="text-amber-300 hover:text-amber-200 font-extrabold flex items-center gap-1.5 bg-indigo-950/80 px-3 py-1.5 rounded-xl border border-indigo-800 cursor-pointer"
                >
                  <Timer className="w-3.5 h-3.5 text-amber-400" />
                  <span>Activate 25m Focus Sprint</span>
                </button>

                <div className="flex items-center gap-2 text-slate-300 font-mono">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>{recording.duration}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tabbed Notes / Resources / Transcript / Pomodoro */}
          <div className="lg:col-span-4 bg-white flex flex-col justify-between overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center border-b border-slate-200 bg-slate-50 overflow-x-auto">
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-3 px-2 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'notes'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Notes ({notes.length})
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`flex-1 py-3 px-2 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'resources'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Downloads ({recording.resources.length})
              </button>
              <button
                onClick={() => setActiveTab('transcript')}
                className={`flex-1 py-3 px-2 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'transcript'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Transcript
              </button>
              <button
                onClick={() => setActiveTab('pomodoro')}
                className={`flex-1 py-3 px-2 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1 ${
                  activeTab === 'pomodoro'
                    ? 'border-amber-500 text-amber-600 bg-amber-50/50'
                    : 'border-transparent text-amber-700 hover:text-amber-900'
                }`}
              >
                <Brain className="w-3.5 h-3.5 text-amber-500" />
                <span>Timer</span>
              </button>
            </div>

            {/* Pomodoro Tab Content */}
            {activeTab === 'pomodoro' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950">
                <PomodoroTimer embeddedClassTitle={recording.sessionTitle} />
              </div>
            )}

            {/* Notes Tab Content */}
            {activeTab === 'notes' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                <p className="text-[11px] text-slate-500 font-medium">
                  Add timestamped personal study notes while watching.
                </p>

                <div className="space-y-2">
                  {notes.map((note, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-medium">
                      <p>{note}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddNote} className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type note & timestamp..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-600 text-xs text-slate-900 px-3 py-2.5 rounded-xl focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer font-bold shadow-md shadow-indigo-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Resources Tab Content */}
            {activeTab === 'resources' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                {recording.resources.map((res, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="font-bold text-slate-900">{res.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium">{res.size}</p>
                      </div>
                    </div>
                    <button className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl cursor-pointer">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Transcript Tab Content */}
            {activeTab === 'transcript' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs text-slate-700 font-sans leading-relaxed">
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-indigo-600 font-mono">[00:00]</strong> In this session, we begin with calculating tax under salary income according to the latest Finance Act 2026.
                </p>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <strong className="text-indigo-600 font-mono">[15:20]</strong> Basic salary, house rent allowance, and conveyance allowances carry distinct tax-exempt limits.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
