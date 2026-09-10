import React, { useState } from 'react';
import { DigitalBadge } from '../types';
import {
  Award,
  CheckCircle2,
  Sparkles,
  Flame,
  GraduationCap,
  ShieldCheck,
  BookOpen,
  Star,
  Trophy,
  Target,
  Crown,
  Zap,
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Lock,
  Download,
} from 'lucide-react';

interface BadgeDetailModalProps {
  badge: DigitalBadge | null;
  studentName: string;
  onClose: () => void;
}

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  badge,
  studentName,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

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

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'indigo':
        return {
          bg: 'bg-indigo-50',
          border: 'border-indigo-200',
          text: 'text-indigo-700',
          accentBg: 'bg-indigo-600',
          lightBg: 'bg-indigo-500/10',
          ring: 'ring-indigo-300',
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          text: 'text-emerald-700',
          accentBg: 'bg-emerald-600',
          lightBg: 'bg-emerald-500/10',
          ring: 'ring-emerald-300',
        };
      case 'amber':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          accentBg: 'bg-amber-500',
          lightBg: 'bg-amber-500/10',
          ring: 'ring-amber-300',
        };
      case 'rose':
        return {
          bg: 'bg-rose-50',
          border: 'border-rose-200',
          text: 'text-rose-700',
          accentBg: 'bg-rose-600',
          lightBg: 'bg-rose-500/10',
          ring: 'ring-rose-300',
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-700',
          accentBg: 'bg-purple-600',
          lightBg: 'bg-purple-500/10',
          ring: 'ring-purple-300',
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700',
          accentBg: 'bg-blue-600',
          lightBg: 'bg-blue-500/10',
          ring: 'ring-blue-300',
        };
    }
  };

  const theme = getColorClasses(badge.color);
  const shareUrl = `https://elawyersacademy.com/badges/verify/${badge.id}?student=${encodeURIComponent(studentName)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-[32px] max-w-lg w-full overflow-hidden shadow-2xl text-slate-900 relative flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 pb-0 flex items-center justify-between">
          <span className="text-[10px] bg-slate-100 text-slate-600 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-slate-200">
            Digital Credential Badge
          </span>
          <button
            onClick={onClose}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badge Card Hero */}
        <div className="p-6 sm:p-8 text-center space-y-4">
          <div className="relative inline-block">
            {/* Outer Ring & Glow */}
            <div
              className={`w-28 h-28 rounded-full ${
                badge.isUnlocked
                  ? `${theme.bg} ${theme.border} border-4 shadow-xl ring-4 ${theme.ring}`
                  : 'bg-slate-100 border-4 border-slate-300 opacity-60'
              } flex items-center justify-center mx-auto transition-transform hover:scale-105 duration-300`}
            >
              {badge.isUnlocked ? (
                renderBadgeIcon(badge.icon, `w-12 h-12 ${theme.text}`)
              ) : (
                <Lock className="w-10 h-10 text-slate-400" />
              )}
            </div>

            {badge.isUnlocked && (
              <span className="absolute -bottom-1 right-1 bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full border border-amber-300 shadow-sm">
                +{badge.points} PTS
              </span>
            )}
          </div>

          <div>
            <span
              className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                badge.isUnlocked
                  ? `${theme.bg} ${theme.text} ${theme.border}`
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              {badge.category} Badge • {badge.isUnlocked ? 'Unlocked' : 'Locked'}
            </span>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
              {badge.title}
            </h3>
            <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-sm mx-auto mt-2">
              {badge.description}
            </p>
          </div>

          {/* Student & Date Info */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-left">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Issued To:</span>
              <strong className="text-slate-900 font-bold">{studentName}</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Status:</span>
              <span className={`font-bold ${badge.isUnlocked ? 'text-emerald-700' : 'text-slate-500'}`}>
                {badge.isUnlocked ? `Earned on ${badge.earnedAt}` : 'In Progress'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Requirement:</span>
              <span className="text-slate-800 font-medium text-right max-w-[200px] truncate">
                {badge.criteria}
              </span>
            </div>
          </div>

          {/* Unlocked Skill Chips */}
          {badge.skillsUnlocked && badge.skillsUnlocked.length > 0 && (
            <div className="space-y-2 text-left">
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">
                Skills Validated:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {badge.skillsUnlocked.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[11px] font-bold px-2.5 py-1 rounded-lg"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
          {badge.isUnlocked ? (
            <>
              <button
                onClick={handleCopyLink}
                className="w-full sm:flex-1 py-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copied ? 'Link Copied!' : 'Copy Share Link'}</span>
              </button>

              <button
                onClick={() => {
                  alert(`Digital Credential Badge "${badge.title}" exported!`);
                }}
                className="w-full sm:flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-indigo-100"
              >
                <Download className="w-4 h-4" />
                <span>Download Medal</span>
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl cursor-pointer"
            >
              Continue Learning to Unlock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
