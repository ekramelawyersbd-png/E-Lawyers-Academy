import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Coffee,
  Brain,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  Clock,
  Flame,
  X,
  Minimize2,
  Maximize2,
  Target,
  Bell,
  Check,
} from 'lucide-react';

export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak';

interface PomodoroTimerProps {
  onSessionComplete?: (mode: PomodoroMode, durationMinutes: number) => void;
  compact?: boolean;
  onClose?: () => void;
  embeddedClassTitle?: string;
}

const DEFAULT_DURATIONS: Record<PomodoroMode, number> = {
  focus: 25 * 60, // 25 minutes in seconds
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
};

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  onSessionComplete,
  compact = false,
  onClose,
  embeddedClassTitle,
}) => {
  const [mode, setMode] = useState<PomodoroMode>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_DURATIONS.focus);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [completedSessions, setCompletedSessions] = useState<number>(2); // starting preset demo
  const [totalFocusMinutes, setTotalFocusMinutes] = useState<number>(50);
  const [dailyGoal] = useState<number>(4);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState<boolean>(compact);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sound chime synthesiser using Web Audio API (no external file dependency needed!)
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.3); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.6); // G5

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch {
      // Audio context fallbacks silently
    }
  };

  // Timer Tick Handler
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            setIsRunning(false);
            playChime();

            const minutesEarned = Math.round(DEFAULT_DURATIONS[mode] / 60);

            if (mode === 'focus') {
              setCompletedSessions((c) => c + 1);
              setTotalFocusMinutes((m) => m + minutesEarned);
              setToastMessage(`🎉 Focus Session Completed! +${minutesEarned} mins focus time logged.`);
              if (onSessionComplete) onSessionComplete('focus', minutesEarned);
              // Switch to break
              setMode('shortBreak');
              return DEFAULT_DURATIONS.shortBreak;
            } else {
              setToastMessage(`☕ Break Finished! Ready to start another focus session?`);
              if (onSessionComplete) onSessionComplete(mode, minutesEarned);
              setMode('focus');
              return DEFAULT_DURATIONS.focus;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, soundEnabled]);

  // Mode change handler
  const handleSwitchMode = (newMode: PomodoroMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(DEFAULT_DURATIONS[newMode]);
  };

  // Preset custom duration setter
  const handleSetCustomFocus = (minutes: number) => {
    setIsRunning(false);
    setMode('focus');
    setTimeLeft(minutes * 60);
  };

  // Reset current timer
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(DEFAULT_DURATIONS[mode]);
  };

  // Formatting MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalModeDuration = DEFAULT_DURATIONS[mode];
  const progressPercent = Math.min(
    100,
    Math.max(0, ((totalModeDuration - timeLeft) / totalModeDuration) * 100)
  );

  // If Minimized Pill View
  if (isMinimized) {
    return (
      <div className="bg-slate-900 text-white border border-indigo-500/40 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in duration-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-black font-mono text-amber-300">{formatTime(timeLeft)}</span>
          <span className="text-[10px] uppercase font-extrabold text-indigo-200 bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-800">
            {mode === 'focus' ? 'Study Focus' : 'Break'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 border-l border-slate-700 pl-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer"
            title={isRunning ? 'Pause' : 'Start'}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          <button
            onClick={() => setIsMinimized(false)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
            title="Expand Timer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-[32px] p-6 text-white shadow-2xl relative overflow-hidden space-y-5">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-indigo-900/60 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-400/20">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <span>Pomodoro Study Focus Timer</span>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                Productivity Boost
              </span>
            </h3>
            {embeddedClassTitle ? (
              <p className="text-[11px] text-indigo-200 font-medium truncate max-w-xs">
                Active Lecture: {embeddedClassTitle}
              </p>
            ) : (
              <p className="text-[11px] text-indigo-200 font-medium">
                25-min study sprints + 5-min rest breaks for maximum retention
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl transition-all cursor-pointer border ${
              soundEnabled
                ? 'bg-indigo-900/60 border-indigo-700 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title={soundEnabled ? 'Mute Alert Chime' : 'Enable Alert Chime'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {compact && (
            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-700 text-indigo-200 rounded-xl cursor-pointer"
              title="Minimize to Pill"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl cursor-pointer"
              title="Close Timer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-indigo-900/60 text-xs font-bold">
        <button
          onClick={() => handleSwitchMode('focus')}
          className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            mode === 'focus'
              ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20'
              : 'text-indigo-200 hover:text-white hover:bg-indigo-900/30'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>Focus (25m)</span>
        </button>

        <button
          onClick={() => handleSwitchMode('shortBreak')}
          className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            mode === 'shortBreak'
              ? 'bg-indigo-500 text-white font-black shadow-md shadow-indigo-500/20'
              : 'text-indigo-200 hover:text-white hover:bg-indigo-900/30'
          }`}
        >
          <Coffee className="w-3.5 h-3.5" />
          <span>Break (5m)</span>
        </button>

        <button
          onClick={() => handleSwitchMode('longBreak')}
          className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            mode === 'longBreak'
              ? 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-600/20'
              : 'text-indigo-200 hover:text-white hover:bg-indigo-900/30'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Rest (15m)</span>
        </button>
      </div>

      {/* Main Timer Display Ring / Counter */}
      <div className="py-2 flex flex-col items-center justify-center space-y-4">
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Circular SVG Progress */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-indigo-950"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className={`transition-all duration-1000 ${
                mode === 'focus' ? 'stroke-amber-400' : 'stroke-indigo-400'
              }`}
              strokeWidth="6"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Time & Controls Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-1">
            <span className="text-4xl font-black font-mono tracking-tight text-white drop-shadow-md">
              {formatTime(timeLeft)}
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-300">
              {mode === 'focus' ? 'Focus Sprint' : 'Rest Break'}
            </span>
            {isRunning && (
              <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Active Session
              </span>
            )}
          </div>
        </div>

        {/* Primary Action Buttons: Start/Pause & Reset */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 cursor-pointer transition-all shadow-xl ${
              isRunning
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/20'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause Session</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current ml-0.5" />
                <span>Start Focus</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-3.5 bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-700 text-indigo-200 rounded-2xl cursor-pointer transition-all"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Sprint Presets */}
      <div className="pt-2 border-t border-indigo-900/60 space-y-2">
        <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">
          Quick Duration Presets:
        </span>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <button
            onClick={() => handleSetCustomFocus(15)}
            className="p-2 bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 rounded-xl text-indigo-200 font-bold cursor-pointer text-center"
          >
            15m Quick
          </button>
          <button
            onClick={() => handleSetCustomFocus(25)}
            className="p-2 bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 rounded-xl text-indigo-200 font-bold cursor-pointer text-center"
          >
            25m Standard
          </button>
          <button
            onClick={() => handleSetCustomFocus(50)}
            className="p-2 bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 rounded-xl text-indigo-200 font-bold cursor-pointer text-center"
          >
            50m Deep Study
          </button>
        </div>
      </div>

      {/* Session Progress Stats Summary */}
      <div className="bg-indigo-950/80 p-4 rounded-2xl border border-indigo-900/80 grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 text-amber-300 flex items-center justify-center shrink-0">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-indigo-300 font-bold block uppercase">Today's Focus</span>
            <span className="font-extrabold text-white text-sm font-mono">{totalFocusMinutes} Mins</span>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-indigo-900 pl-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-indigo-300 font-bold block uppercase">Pomodoro Goal</span>
            <span className="font-extrabold text-white text-sm font-mono">
              {completedSessions}/{dailyGoal} Done
            </span>
          </div>
        </div>
      </div>

      {/* Completion Toast Popup */}
      {toastMessage && (
        <div className="bg-emerald-500 text-slate-950 p-3 rounded-xl font-extrabold text-xs flex items-center justify-between shadow-lg animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-0.5 hover:bg-emerald-600/30 rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
