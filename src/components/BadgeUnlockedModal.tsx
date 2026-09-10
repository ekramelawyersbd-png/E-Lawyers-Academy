import React from 'react';
import { DigitalBadge } from '../types';
import {
  Award,
  Sparkles,
  Flame,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Crown,
  Trophy,
  Target,
  Zap,
  Star,
  BookOpen,
  ArrowRight,
  X,
} from 'lucide-react';

interface BadgeUnlockedModalProps {
  badge: DigitalBadge | null;
  onClose: () => void;
}

export const BadgeUnlockedModal: React.FC<BadgeUnlockedModalProps> = ({
  badge,
  onClose,
}) => {
  if (!badge) return null;

  const renderBadgeIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Crown':
        return <Crown className={className} />;
      case 'Trophy':
        return <Trophy className={className} />;
      case 'Target':
        return <Target className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Star':
        return <Star className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      default:
        return <CheckCircle2 className={className} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-2 border-amber-400 rounded-[32px] max-w-md w-full p-6 sm:p-8 text-center text-white relative shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Decorative Sparkle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative space-y-5">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" /> NEW BADGE UNLOCKED!
          </div>

          {/* Badge Medal Emblem */}
          <div className="relative inline-block my-2">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-indigo-400 p-1.5 shadow-2xl shadow-amber-500/30">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center border-2 border-amber-400/80">
                {renderBadgeIcon(badge.icon, 'w-12 h-12 text-amber-400 animate-bounce')}
              </div>
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg border border-amber-200">
              +{badge.points} PTS
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-extrabold text-white">
              {badge.title}
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {badge.description}
            </p>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-amber-400/30 text-left text-xs space-y-1">
            <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider block">
              Criteria Fulfilled:
            </span>
            <p className="text-slate-200 font-medium">{badge.criteria}</p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Claim & View In My Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
