import React, { useEffect } from 'react';
import { ToastNotification } from '../types';
import {
  Trophy,
  CheckCircle2,
  Award,
  GraduationCap,
  Sparkles,
  Flame,
  Info,
  X,
  Zap,
  ArrowRight
} from 'lucide-react';

interface NotificationToastSystemProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const NotificationToastSystem: React.FC<NotificationToastSystemProps> = ({
  toasts,
  onDismiss,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm sm:max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: ToastNotification;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5500); // 5.5 seconds auto dismiss

    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const renderIcon = () => {
    switch (toast.type) {
      case 'quiz_complete':
        return (
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-xs">
            <Trophy className="w-5 h-5 text-emerald-600 animate-bounce" />
          </div>
        );
      case 'module_complete':
        return (
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 text-indigo-600 border border-indigo-500/30 flex items-center justify-center shrink-0 shadow-xs">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
          </div>
        );
      case 'badge_earned':
        return (
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-xs animate-pulse">
            <Award className="w-5 h-5 text-amber-600 fill-amber-500/20" />
          </div>
        );
      case 'streak_checkin':
        return (
          <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-600 border border-orange-500/30 flex items-center justify-center shrink-0 shadow-xs">
            <Flame className="w-5 h-5 text-orange-600 fill-orange-500/30" />
          </div>
        );
      case 'info':
      default:
        return (
          <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center shrink-0 shadow-xs">
            <Info className="w-5 h-5 text-slate-700" />
          </div>
        );
    }
  };

  const getBorderHeader = () => {
    switch (toast.type) {
      case 'quiz_complete':
        return 'border-emerald-200 bg-white shadow-emerald-500/10';
      case 'module_complete':
        return 'border-indigo-200 bg-white shadow-indigo-500/10';
      case 'badge_earned':
        return 'border-amber-300 bg-gradient-to-r from-amber-50/90 via-white to-amber-50/60 shadow-amber-500/15';
      case 'streak_checkin':
        return 'border-orange-200 bg-white shadow-orange-500/10';
      case 'info':
      default:
        return 'border-slate-200 bg-white shadow-slate-500/10';
    }
  };

  return (
    <div
      className={`pointer-events-auto relative overflow-hidden rounded-2xl border ${getBorderHeader()} p-4 shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in`}
    >
      {/* Sparkle Banner for Badge Earned */}
      {toast.type === 'badge_earned' && (
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />
      )}

      {/* Progress Bar Timer */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden">
        <div className="h-full bg-indigo-600 animate-[toastProgress_5.5s_linear_forwards]" />
      </div>

      <style>{`
        @keyframes toastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      <div className="flex items-start gap-3.5">
        {renderIcon()}

        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>{toast.title}</span>
            </h4>
            {toast.points && toast.points > 0 && (
              <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                <Zap className="w-3 h-3 text-amber-600 fill-amber-500" />
                <span>+{toast.points} PTS</span>
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed mt-1">
            {toast.message}
          </p>

          {toast.actionLabel && toast.onAction && (
            <button
              onClick={() => {
                toast.onAction?.();
                onDismiss(toast.id);
              }}
              className="mt-2.5 inline-flex items-center gap-1 text-xs font-extrabold text-indigo-700 hover:text-indigo-900 underline underline-offset-2 transition-colors cursor-pointer"
            >
              <span>{toast.actionLabel}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => onDismiss(toast.id)}
          className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
          title="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
