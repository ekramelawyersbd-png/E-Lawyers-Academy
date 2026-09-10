import React, { useState } from 'react';
import { Course, LiveClass, RecordedClass, StudentProfile, CertificateData, DigitalBadge, ForumThread, ForumReply, LeaderboardEntry, ToastNotification } from '../types';
import { INCOME_TAX_QUIZ, ALL_COURSE_QUIZZES, CourseQuiz } from '../data/quizData';
import { DEFAULT_STUDENT_BADGES } from '../data/badgeData';
import { INITIAL_FORUM_THREADS } from '../data/forumData';
import { INITIAL_LEADERBOARD } from '../data/leaderboardData';
import { BadgeDetailModal } from './BadgeDetailModal';
import { BadgeUnlockedModal } from './BadgeUnlockedModal';
import { InvoiceReceiptModal, PaymentItem } from './InvoiceReceiptModal';
import { NotificationToastSystem } from './NotificationToastSystem';
import { PomodoroTimer } from './PomodoroTimer';
import { WeeklyStudyPlanner } from './WeeklyStudyPlanner';
import { DailyStudyPlanner } from './DailyStudyPlanner';
import { StudentLibrary } from './StudentLibrary';
import { CareerPathBuilder } from './CareerPathBuilder';
import { StudentNotebook } from './StudentNotebook';
import {
  BookOpen,
  Video,
  FileCheck,
  FileText,
  FolderDown,
  StickyNote,
  User,
  Compass,
  Briefcase,
  Target,
  CheckCircle2,
  Clock,
  Award,
  CreditCard,
  BarChart3,
  BarChart2,
  Calendar,
  PlayCircle,
  ShieldCheck,
  Search,
  Sparkles,
  Download,
  Printer,
  ChevronRight,
  HelpCircle,
  Flame,
  GraduationCap,
  Trophy,
  Crown,
  Zap,
  Star,
  Lock,
  Medal,
  ChevronDown,
  ChevronUp,
  Check,
  RefreshCw,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Brain,
  Timer,

  CheckCircle,
  MessageSquare,
  MessagesSquare,
  ThumbsUp,
  MessageCircle,
  Send,
  PlusCircle,
  Filter,
  Tag,
  Pin,
  UserCheck,
  Share2,
  MoreHorizontal,
  X,
  MessageSquarePlus,
} from 'lucide-react';

interface StudentDashboardProps {
  courses: Course[];
  liveClasses: LiveClass[];
  recordedClasses: RecordedClass[];
  onWatchRecording: (recording: RecordedClass) => void;
  onOpenCertificateModal: (cert: CertificateData) => void;
  onOpenCertVerifier: () => void;
}

interface CircularProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgressRing: React.FC<CircularProgressRingProps> = ({
  progress,
  size = 64,
  strokeWidth = 6,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="text-slate-100 stroke-current"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="text-indigo-600 stroke-current transition-all duration-700 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      {/* Centered Percentage label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-extrabold text-indigo-950 font-mono leading-none">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  courses,
  liveClasses,
  recordedClasses,
  onWatchRecording,
  onOpenCertificateModal,
  onOpenCertVerifier,
}) => {
  const [activeTab, setActiveTab] = useState<
    'enrolled' | 'classes' | 'planner' | 'career' | 'notebook' | 'library' | 'assessment' | 'badges' | 'leaderboard' | 'forum' | 'account'
  >('enrolled');

  // Planner View State
  const [plannerView, setPlannerView] = useState<'daily' | 'weekly'>('daily');

  // Leaderboard State
  const [leaderboardList, setLeaderboardList] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);
  const [leaderboardCategory, setLeaderboardCategory] = useState<string>('all');
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<'all' | 'monthly'>('all');

  // Quiz System State
  const [selectedQuizId, setSelectedQuizId] = useState<string>('quiz-income-tax');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizAttemptHistory, setQuizAttemptHistory] = useState<Record<string, { score: number; total: number; percentage: number; passed: boolean; date: string }>>({
    'quiz-income-tax': {
      score: 5,
      total: 5,
      percentage: 100,
      passed: true,
      date: 'Aug 04, 2026',
    },
  });
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [quizDisplayMode, setQuizDisplayMode] = useState<'all' | 'single'>('all');

  // Digital Badges & Modals State
  const [studentBadges, setStudentBadges] = useState<DigitalBadge[]>(DEFAULT_STUDENT_BADGES);
  const [selectedDetailBadge, setSelectedDetailBadge] = useState<DigitalBadge | null>(null);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<DigitalBadge | null>(null);
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked' | 'Module' | 'Quiz' | 'Course'>('all');

  // Forum System State
  const [forumThreads, setForumThreads] = useState<ForumThread[]>(INITIAL_FORUM_THREADS);
  const [forumCourseFilter, setForumCourseFilter] = useState<string>('all');
  const [forumCategoryFilter, setForumCategoryFilter] = useState<string>('All');
  const [forumSearchQuery, setForumSearchQuery] = useState<string>('');
  const [dashboardSearchQuery, setDashboardSearchQuery] = useState<string>('');
  const [forumSortBy, setForumSortBy] = useState<'recent' | 'popular' | 'unanswered'>('recent');
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [newThreadModalOpen, setNewThreadModalOpen] = useState<boolean>(false);
  const [newThreadForm, setNewThreadForm] = useState<{
    courseId: string;
    category: ForumThread['category'];
    title: string;
    content: string;
    tagsStr: string;
  }>({
    courseId: 'course-income-tax',
    category: 'Question',
    title: '',
    content: '',
    tagsStr: 'eFiling, TaxAct2023',
  });
  const [replyInputText, setReplyInputText] = useState<string>('');

  // Notification Toast System State
  const [activeToasts, setActiveToasts] = useState<ToastNotification[]>([]);

  const addToast = (toast: Omit<ToastNotification, 'id'>) => {
    const newToast: ToastNotification = {
      ...toast,
      id: `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };
    setActiveToasts((prev) => [newToast, ...prev].slice(0, 4));
  };

  const handleDismissToast = (id: string) => {
    setActiveToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Download Materials & Recorded Classes & Invoice PDF State
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const [selectedInvoicePayment, setSelectedInvoicePayment] = useState<PaymentItem | null>(null);
  const [expandedMaterialsRecId, setExpandedMaterialsRecId] = useState<string | null>('rec-1');
  const [selectedMaterialsModalRec, setSelectedMaterialsModalRec] = useState<RecordedClass | null>(null);
  const [showPomodoroModal, setShowPomodoroModal] = useState<boolean>(false);

  // Daily Study Streak State
  const [streakCount, setStreakCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('bd_tax_student_streak_count');
      return saved ? parseInt(saved, 10) : 5; // Default 5-day active streak
    } catch {
      return 5;
    }
  });

  const [hasCheckedInToday, setHasCheckedInToday] = useState<boolean>(() => {
    try {
      const lastCheckIn = localStorage.getItem('bd_tax_student_last_checkin');
      const todayStr = new Date().toISOString().slice(0, 10);
      return lastCheckIn === todayStr;
    } catch {
      return false;
    }
  });

  const [showStreakModal, setShowStreakModal] = useState<boolean>(false);

  const handleDailyCheckIn = () => {
    if (hasCheckedInToday) return;

    const todayStr = new Date().toISOString().slice(0, 10);
    const newStreak = streakCount + 1;
    setStreakCount(newStreak);
    setHasCheckedInToday(true);

    try {
      localStorage.setItem('bd_tax_student_streak_count', newStreak.toString());
      localStorage.setItem('bd_tax_student_last_checkin', todayStr);
    } catch {
      // ignore
    }

    setDownloadToast('🔥 Daily Study Check-In Complete! +50 PTS Earned & Streak Extended!');

    addToast({
      type: 'streak_checkin',
      title: '🔥 Daily Check-In Completed!',
      message: `Streak extended to ${newStreak} consecutive days! Keep up the study momentum.`,
      points: 50,
    });

    // Automatically check for Consistency Badge unlock (5+ days)
    if (newStreak >= 5) {
      const consistencyBadge = studentBadges.find((b) => b.id === 'badge-consistency-streak');
      if (consistencyBadge && !consistencyBadge.isUnlocked) {
        const todayDateStr = new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });

        const unlockedBadge: DigitalBadge = {
          ...consistencyBadge,
          isUnlocked: true,
          earnedAt: todayDateStr,
        };

        setStudentBadges((prev) =>
          prev.map((b) => (b.id === 'badge-consistency-streak' ? unlockedBadge : b))
        );

        setNewlyUnlockedBadge(unlockedBadge);

        addToast({
          type: 'badge_earned',
          title: '🏆 New Badge Unlocked!',
          message: `Earned "${unlockedBadge.title}" badge for keeping a ${newStreak}-day learning streak!`,
          points: unlockedBadge.points,
          actionLabel: 'View Badge',
          onAction: () => setSelectedDetailBadge(unlockedBadge),
        });
      }
    }
  };

  // Module completion tracking
  const [completedModules, setCompletedModules] = useState<Record<string, number[]>>({
    'course-income-tax': [1, 2],
    'course-vat-compliance': [1],
  });
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>('course-income-tax');

  // Default Student Data
  const [student, setStudent] = useState<StudentProfile>({
    name: 'Ekramul Hoque',
    email: 'ekram.elawyersbd@gmail.com',
    phone: '+880 1711-223344',
    designation: 'Legal Practitioner & Tax Trainee',
    enrolledCourses: ['course-income-tax', 'course-vat-compliance'],
    courseProgress: {
      'course-income-tax': 75,
      'course-vat-compliance': 40,
    },
    completedClassesCount: 14,
    totalHoursWatched: 22.5,
    certificatesEarned: [
      {
        certId: 'ELA-2026-TAX-8912',
        studentName: 'Ekramul Hoque',
        courseTitle: 'Personal Income Tax & E-Return Filing Masterclass',
        issueDate: 'July 15, 2026',
        instructorName: 'Advocate Tanvir Ahmed',
        grade: 'Distinction (94%)',
        verificationUrl: 'https://elawyersacademy.com/verify/ELA-2026-TAX-8912',
      },
    ],
    payments: [
      {
        id: 'PAY-8821',
        date: '10 June 2026',
        amount: 4500,
        courseTitle: 'Personal Income Tax & E-Return Masterclass',
        status: 'Paid (bKash)',
        invoiceNo: 'INV-2026-001',
      },
      {
        id: 'PAY-9012',
        date: '02 July 2026',
        amount: 5500,
        courseTitle: 'VAT & Tax Compliance Professional Training',
        status: 'Paid (Nagad)',
        invoiceNo: 'INV-2026-002',
      },
    ],
  });

  const enrolledCourseObjects = courses.filter((c) =>
    student.enrolledCourses.includes(c.id)
  );

  // Dashboard Universal Search Filtering for Courses, Recorded Classes, and Assignments/Quizzes
  const filteredEnrolledCourses = enrolledCourseObjects.filter((course) => {
    if (!dashboardSearchQuery.trim()) return true;
    const q = dashboardSearchQuery.toLowerCase().trim();
    return (
      course.title.toLowerCase().includes(q) ||
      course.category.toLowerCase().includes(q) ||
      (course.overview && course.overview.toLowerCase().includes(q))
    );
  });

  const filteredRecordedClasses = recordedClasses.filter((rec) => {
    if (!dashboardSearchQuery.trim()) return true;
    const q = dashboardSearchQuery.toLowerCase().trim();
    return (
      rec.sessionTitle.toLowerCase().includes(q) ||
      rec.courseTitle.toLowerCase().includes(q)
    );
  });

  const filteredQuizzes = ALL_COURSE_QUIZZES.filter((quiz) => {
    if (!dashboardSearchQuery.trim()) return true;
    const q = dashboardSearchQuery.toLowerCase().trim();
    return (
      quiz.title.toLowerCase().includes(q) ||
      quiz.category.toLowerCase().includes(q) ||
      quiz.description.toLowerCase().includes(q) ||
      quiz.badgeRewardName.toLowerCase().includes(q)
    );
  });

  // Stats
  const unlockedBadgesCount = studentBadges.filter((b) => b.isUnlocked).length;
  const totalBadgePoints = studentBadges
    .filter((b) => b.isUnlocked)
    .reduce((sum, b) => sum + b.points, 0);

  // Rank title helper
  const getRankTitle = (points: number) => {
    if (points >= 800) return { title: 'Platinum Tax Master', color: 'text-rose-600 bg-rose-50 border-rose-200' };
    if (points >= 500) return { title: 'Gold Legal Scholar', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (points >= 300) return { title: 'Silver Tax Specialist', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    return { title: 'Bronze Practitioner Trainee', color: 'text-slate-700 bg-slate-100 border-slate-200' };
  };

  const currentRank = getRankTitle(totalBadgePoints);

  const getCourseProgress = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course || !course.modules || course.modules.length === 0) return student.courseProgress[courseId] || 0;
    const completed = completedModules[courseId]?.length || 0;
    return Math.round((completed / course.modules.length) * 100);
  };

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

  const activeQuiz: CourseQuiz =
    ALL_COURSE_QUIZZES.find((q) => q.id === selectedQuizId) || ALL_COURSE_QUIZZES[0];

  const handleSelectQuiz = (quizId: string) => {
    setSelectedQuizId(quizId);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setActiveQuestionIdx(0);
  };

  const handleOptionSelect = (qId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateActiveQuizScore = () => {
    let score = 0;
    activeQuiz.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const score = calculateActiveQuizScore();
    const totalQ = activeQuiz.questions.length;
    const pct = Math.round((score / totalQ) * 100);
    const passed = pct >= activeQuiz.passPercentage;

    // Record attempt history
    setQuizAttemptHistory((prev) => ({
      ...prev,
      [activeQuiz.id]: {
        score,
        total: totalQ,
        percentage: pct,
        passed,
        date: 'Today',
      },
    }));

    let unlockedTargetBadge: DigitalBadge | null = null;

    if (passed && activeQuiz.badgeRewardId) {
      setStudentBadges((prevBadges) =>
        prevBadges.map((badge) => {
          if (badge.id === activeQuiz.badgeRewardId && !badge.isUnlocked) {
            unlockedTargetBadge = {
              ...badge,
              isUnlocked: true,
              earnedAt: 'Today',
            };
            return unlockedTargetBadge;
          }
          return badge;
        })
      );
    }

    if (score === totalQ) {
      setStudentBadges((prevBadges) =>
        prevBadges.map((badge) => {
          if (badge.id === 'badge-perfect-score' && !badge.isUnlocked) {
            const unlockedScoreBadge = {
              ...badge,
              isUnlocked: true,
              earnedAt: 'Today',
            };
            if (!unlockedTargetBadge) unlockedTargetBadge = unlockedScoreBadge;
            return unlockedScoreBadge;
          }
          return badge;
        })
      );
    }

    if (unlockedTargetBadge) {
      setNewlyUnlockedBadge(unlockedTargetBadge);
    }

    // Trigger Quiz Completion Toast
    addToast({
      type: 'quiz_complete',
      title: passed ? '🎉 Quiz Mastered Successfully!' : '📊 Quiz Attempt Recorded',
      message: passed
        ? `Outstanding! You scored ${score}/${totalQ} (${pct}%) on "${activeQuiz.title}".`
        : `You scored ${score}/${totalQ} (${pct}%). Pass mark is ${activeQuiz.passPercentage}%. Review statutory guidelines and retry!`,
      points: passed ? 100 : undefined,
    });

    if (unlockedTargetBadge) {
      const b = unlockedTargetBadge as DigitalBadge;
      addToast({
        type: 'badge_earned',
        title: '🏆 New Digital Badge Unlocked!',
        message: `Congratulations! You unlocked the "${b.title}" badge.`,
        points: b.points,
        actionLabel: 'View Badge',
        onAction: () => setSelectedDetailBadge(b),
      });
    }
  };

  const handleToggleModuleComplete = (courseId: string, modNumber: number, totalModules: number) => {
    const currentCompleted = completedModules[courseId] || [];
    const isAlreadyCompleted = currentCompleted.includes(modNumber);

    let updatedCompleted: number[];
    if (isAlreadyCompleted) {
      updatedCompleted = currentCompleted.filter((n) => n !== modNumber);
    } else {
      updatedCompleted = [...currentCompleted, modNumber];
    }

    setCompletedModules({
      ...completedModules,
      [courseId]: updatedCompleted,
    });

    // Update progress percentage
    const newPct = Math.round((updatedCompleted.length / totalModules) * 100);
    setStudent((prev) => ({
      ...prev,
      courseProgress: {
        ...prev.courseProgress,
        [courseId]: newPct,
      },
    }));

    // Check module completion notification and badge unlock
    if (!isAlreadyCompleted) {
      const courseObj = courses.find((c) => c.id === courseId);
      const courseTitle = courseObj ? courseObj.title : 'Course';

      addToast({
        type: 'module_complete',
        title: '✅ Module Completed!',
        message: `Great progress! Finished Module ${modNumber} in "${courseTitle}". Overall completion is now ${newPct}%.`,
        points: 50,
      });

      let targetBadgeId: string | null = null;
      if (courseId === 'course-income-tax' && modNumber === 1) targetBadgeId = 'badge-tax-foundations';
      if (courseId === 'course-income-tax' && modNumber === 2) targetBadgeId = 'badge-ereturn-prodigy';
      if (courseId === 'course-vat-compliance' && modNumber === 1) targetBadgeId = 'badge-vat-act-specialist';

      if (targetBadgeId) {
        let earnedBadge: DigitalBadge | null = null;
        setStudentBadges((prev) =>
          prev.map((b) => {
            if (b.id === targetBadgeId && !b.isUnlocked) {
              earnedBadge = { ...b, isUnlocked: true, earnedAt: 'Today' };
              setNewlyUnlockedBadge(earnedBadge);
              return earnedBadge;
            }
            return b;
          })
        );

        if (earnedBadge) {
          const eb = earnedBadge as DigitalBadge;
          addToast({
            type: 'badge_earned',
            title: '🏆 New Digital Badge Unlocked!',
            message: `Awesome milestone! You earned the "${eb.title}" badge.`,
            points: eb.points,
            actionLabel: 'View Badge',
            onAction: () => setSelectedDetailBadge(eb),
          });
        }
      }
    }
  };


  // Forum Handlers
  const handleToggleThreadUpvote = (threadId: string) => {
    setForumThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === threadId) {
          const isCurrentlyUpvoted = thread.isUpvoted;
          return {
            ...thread,
            isUpvoted: !isCurrentlyUpvoted,
            upvotes: isCurrentlyUpvoted ? thread.upvotes - 1 : thread.upvotes + 1,
          };
        }
        return thread;
      })
    );
  };

  const handleToggleReplyUpvote = (threadId: string, replyId: string) => {
    setForumThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            replies: thread.replies.map((reply) => {
              if (reply.id === replyId) {
                const isCurrentlyUpvoted = reply.isUpvoted;
                return {
                  ...reply,
                  isUpvoted: !isCurrentlyUpvoted,
                  upvotes: isCurrentlyUpvoted ? reply.upvotes - 1 : reply.upvotes + 1,
                };
              }
              return reply;
            }),
          };
        }
        return thread;
      })
    );
  };

  const handleToggleThreadSolved = (threadId: string) => {
    setForumThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            isSolved: !thread.isSolved,
          };
        }
        return thread;
      })
    );
  };

  const handleAddReply = (threadId: string) => {
    if (!replyInputText.trim()) return;

    const newReply: ForumReply = {
      id: `reply-${Date.now()}`,
      threadId,
      authorName: student.name,
      authorRole: 'Student',
      isInstructor: false,
      content: replyInputText.trim(),
      createdAt: 'Just now',
      upvotes: 0,
      isUpvoted: false,
    };

    setForumThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            replies: [...thread.replies, newReply],
          };
        }
        return thread;
      })
    );

    setReplyInputText('');
  };

  const handleCreateNewThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadForm.title.trim() || !newThreadForm.content.trim()) return;

    const courseObj = courses.find((c) => c.id === newThreadForm.courseId);
    const courseTitle = courseObj ? courseObj.title : 'General Discussion';

    const parsedTags = newThreadForm.tagsStr
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    const createdThread: ForumThread = {
      id: `thread-${Date.now()}`,
      courseId: newThreadForm.courseId,
      courseTitle,
      category: newThreadForm.category,
      title: newThreadForm.title.trim(),
      content: newThreadForm.content.trim(),
      authorName: student.name,
      authorRole: `${student.designation || 'Tax Trainee'} & Student`,
      createdAt: 'Just now',
      upvotes: 1,
      isUpvoted: true,
      isPinned: false,
      isSolved: false,
      tags: parsedTags.length > 0 ? parsedTags : ['General'],
      replies: [],
    };

    setForumThreads((prev) => [createdThread, ...prev]);
    setActiveThreadId(createdThread.id);
    setNewThreadModalOpen(false);
    setNewThreadForm({
      courseId: 'course-income-tax',
      category: 'Question',
      title: '',
      content: '',
      tagsStr: 'eFiling, TaxAct2023',
    });
  };

  // Filtered Forum Threads
  const filteredForumThreads = forumThreads
    .filter((thread) => {
      if (forumCourseFilter !== 'all' && thread.courseId !== forumCourseFilter) {
        return false;
      }
      if (forumCategoryFilter !== 'All' && thread.category !== forumCategoryFilter) {
        return false;
      }
      if (forumSearchQuery.trim()) {
        const query = forumSearchQuery.toLowerCase();
        const matchesTitle = thread.title.toLowerCase().includes(query);
        const matchesContent = thread.content.toLowerCase().includes(query);
        const matchesAuthor = thread.authorName.toLowerCase().includes(query);
        const matchesTags = thread.tags.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesContent || matchesAuthor || matchesTags;
      }
      return true;
    })
    .sort((a, b) => {
      if (forumSortBy === 'popular') {
        return b.upvotes - a.upvotes;
      }
      if (forumSortBy === 'unanswered') {
        return a.replies.length - b.replies.length;
      }
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

  const activeThread = forumThreads.find((t) => t.id === activeThreadId);

  // Material File Download Handler
  const handleDownloadMaterialFile = (fileName: string, sessionTitle?: string) => {
    const isDoc = fileName.toLowerCase().endsWith('.docx') || fileName.toLowerCase().endsWith('.doc');
    const isXls = fileName.toLowerCase().endsWith('.xlsx') || fileName.toLowerCase().endsWith('.csv');

    let mimeType = 'application/pdf';
    if (isDoc) mimeType = 'application/msword';
    if (isXls) mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    const dummyContent = `================================================================================
eLawyersBD Legal & Tax Academy - Official Course Lecture Notes & Materials
================================================================================
Material File: ${fileName}
Lesson/Session: ${sessionTitle || 'Recorded Masterclass Lecture'}
Downloaded For: ${student.name} (${student.email})
Date Generated: ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}
Verification ID: ELA-MAT-${Math.floor(100000 + Math.random() * 900000)}
================================================================================

LECTURE NOTES & READING SYLLABUS
--------------------------------------------------------------------------------
1. Statutory Legal Provisions & Section References
2. Key Practical Step-by-Step Filing Procedures
3. Important Case Laws & High Court Circular Precedents
4. Numerical Calculations, Worked Examples, & Formulae
5. Self-Assessment Quiz Questions & Review Checklist

1. STATUTORY LEGAL PROVISIONS
--------------------------------------------------------------------------------
This document contains official lecture notes and reading materials curated by 
Advocate Tanvir Ahmed & Farhana Rahman, FCS for enrolled law students and 
practicing tax professionals.

- Keep this reference material handy during your online e-filing practice.
- For doubts, post your questions in the Student Dashboard Community Forum.

================================================================================
(C) 2026 eLawyersBD Academy. All Rights Reserved. Confidential Student Copy.
================================================================================
`;

    const blob = new Blob([dummyContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadToast(`Downloaded: "${fileName}"`);
    setTimeout(() => {
      setDownloadToast(null);
    }, 4000);
  };

  const handleDownloadAllMaterials = (recording: RecordedClass) => {
    recording.resources.forEach((res, index) => {
      setTimeout(() => {
        handleDownloadMaterialFile(res.name, recording.sessionTitle);
      }, index * 400);
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 py-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Student Portal Welcome Header */}
        <div className="bg-white rounded-[32px] border border-slate-200 p-6 sm:p-8 shadow-sm mb-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* User Profile Avatar & Personalized Greeting */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-indigo-200 shrink-0 border-2 border-indigo-100">
                {student.name
                  ? student.name
                      .split(' ')
                      .filter(Boolean)
                      .map((n) => n[0])
                      .join('')
                      .substring(0, 2)
                      .toUpperCase()
                  : 'ST'}
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Welcome back, <span className="text-indigo-600">{student.name}</span>! 👋
                  </h1>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    Active Student
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 font-medium flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-slate-800 font-bold">{student.designation}</span>
                  <span className="text-slate-300">•</span>
                  <span>{student.email}</span>
                </p>

                {enrolledCourseObjects.length > 0 && (
                  <div className="pt-1 flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Course:</span>
                    <span className="text-xs font-bold text-indigo-950 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-lg flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{enrolledCourseObjects[0].title}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stat & Action Widgets */}
            <div className="flex flex-wrap items-center gap-3 text-xs shrink-0">
              <button
                onClick={() => setActiveTab('badges')}
                className="bg-slate-50 hover:bg-indigo-50/60 px-4 py-2.5 rounded-2xl border border-slate-200 transition-all text-left cursor-pointer group"
              >
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider group-hover:text-indigo-600">BADGES & RANK</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-indigo-900 font-extrabold text-sm">
                    {unlockedBadgesCount}/{studentBadges.length} Earned
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentRank.color}`}>
                    {totalBadgePoints} PTS
                  </span>
                </div>
              </button>

              {/* DAILY STUDY STREAK WIDGET */}
              <button
                onClick={() => setShowStreakModal(true)}
                className="bg-slate-50 hover:bg-amber-50/80 px-4 py-2.5 rounded-2xl border border-slate-200 transition-all text-left cursor-pointer group flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-rose-500 text-white flex items-center justify-center font-extrabold shadow-xs shrink-0">
                  <Flame className="w-4 h-4 fill-white text-white animate-pulse" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider group-hover:text-amber-600">
                    STUDY STREAK
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-amber-950 font-black text-sm">
                      {streakCount} {streakCount === 1 ? 'Day' : 'Days'} 🔥
                    </span>
                    {hasCheckedInToday ? (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Active
                      </span>
                    ) : (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        +50 PTS
                      </span>
                    )}
                  </div>
                </div>
              </button>

              <button
                onClick={() => setShowPomodoroModal(true)}
                className="px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-md shadow-amber-400/20"
              >
                <Brain className="w-4 h-4 text-slate-950" />
                <span>Focus Timer</span>
              </button>

              <button
                onClick={() => setActiveTab('planner')}
                className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl transition-all cursor-pointer flex items-center gap-2 shadow-md shadow-indigo-100"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Study Planner</span>
              </button>
            </div>
          </div>

          {/* STUDENT ACHIEVEMENTS MINI GRID */}
          <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                <Medal className="w-4 h-4 text-amber-500" />
                Student Achievements
              </h3>
              <p className="text-xs text-slate-500 font-medium">Digital badges earned from courses & live sessions.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {studentBadges.filter(b => b.isUnlocked).slice(0, 6).map(badge => {
                const colorClasses = 
                  badge.color === 'amber' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                  badge.color === 'emerald' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
                  badge.color === 'rose' ? 'bg-rose-50 border-rose-200 text-rose-600' :
                  badge.color === 'indigo' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' :
                  badge.color === 'purple' ? 'bg-purple-50 border-purple-200 text-purple-600' :
                  badge.color === 'blue' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                  'bg-slate-50 border-slate-200 text-slate-600';

                return (
                  <button 
                    key={badge.id}
                    onClick={() => {
                      setSelectedDetailBadge(badge);
                      setActiveTab('badges');
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 shadow-sm border hover:shadow-md ${colorClasses}`}
                    title={`${badge.title} - ${badge.description}`}
                  >
                    {renderBadgeIcon(badge.icon, 'w-5 h-5')}
                  </button>
                );
              })}
              
              {studentBadges.filter(b => b.isUnlocked).length > 6 && (
                <button 
                  onClick={() => setActiveTab('badges')}
                  className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center text-[10px] font-black hover:border-indigo-200 hover:text-indigo-600 hover:bg-white transition-colors cursor-pointer shadow-sm"
                  title="View all badges"
                >
                  +{studentBadges.filter(b => b.isUnlocked).length - 6}
                </button>
              )}
              {studentBadges.filter(b => b.isUnlocked).length === 0 && (
                <div className="text-xs text-slate-400 font-medium italic bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                  No badges earned yet.
                </div>
              )}
            </div>
          </div>

          {/* ACTIVE COURSE HIGHLIGHT WELCOME CARD */}
          {enrolledCourseObjects.length > 0 && (
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-2 relative z-10 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Welcome Back • Active Course Highlight</span>
                  </span>
                  <span className="text-xs text-indigo-300 font-mono">
                    {enrolledCourseObjects[0].category}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {enrolledCourseObjects[0].title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-1 font-medium">
                  {enrolledCourseObjects[0].overview || 'Master Bangladesh statutory income tax, corporate return filing, and VAT compliance with practical step-by-step guidance.'}
                </p>

                {/* Course Completion Progress Bar */}
                <div className="pt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-indigo-200 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-amber-400" />
                      <span>Course Progress</span>
                    </span>
                    <span className="text-amber-400 font-mono font-extrabold">
                      {getCourseProgress(enrolledCourseObjects[0].id)}% Complete
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/80 p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 via-indigo-400 to-emerald-400 rounded-full transition-all duration-700"
                      style={{ width: `${getCourseProgress(enrolledCourseObjects[0].id)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 relative z-10 flex items-center gap-3">
                <button
                  onClick={() => {
                    setActiveTab('enrolled');
                    setExpandedCourseId(enrolledCourseObjects[0].id);
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 group"
                >
                  <PlayCircle className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
                  <span>Resume Active Course</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* STUDENT DASHBOARD TOP QUICK SEARCH BAR */}
        <div className="bg-white p-4 sm:p-5 rounded-[28px] border border-slate-200 shadow-sm mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold shrink-0">
                <Search className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span>Dashboard Content Search</span>
                  {dashboardSearchQuery && (
                    <span className="bg-indigo-100 text-indigo-800 text-[10px] font-mono px-2 py-0.2 rounded-full font-bold">
                      Filtering
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Filter enrolled courses, assignments & quizzes, and recorded video classes by title
                </p>
              </div>
            </div>

            {dashboardSearchQuery && (
              <button
                onClick={() => setDashboardSearchQuery('')}
                className="self-start sm:self-auto text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear Search Filter</span>
              </button>
            )}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={dashboardSearchQuery}
              onChange={(e) => setDashboardSearchQuery(e.target.value)}
              placeholder="Search by title (e.g., 'Income Tax', 'VAT', 'E-Filing', 'Module 1')..."
              className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-2xs"
            />
            {dashboardSearchQuery && (
              <button
                onClick={() => setDashboardSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                title="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Match Preview Drawer when typing */}
          {dashboardSearchQuery.trim() !== '' && (
            <div className="bg-indigo-50/70 border border-indigo-100 p-4 rounded-2xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs border-b border-indigo-100 pb-2">
                <span className="font-extrabold text-indigo-950 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Filtered Matches for "{dashboardSearchQuery}"</span>
                </span>
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 border border-indigo-200 px-2.5 py-0.5 rounded-full font-mono">
                  {filteredEnrolledCourses.length + filteredRecordedClasses.length + filteredQuizzes.length} Results
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-3 text-xs">
                {/* Enrolled Courses */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Courses ({filteredEnrolledCourses.length})</span>
                    </span>
                    {filteredEnrolledCourses.length > 0 && (
                      <button
                        onClick={() => setActiveTab('enrolled')}
                        className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer"
                      >
                        View Tab →
                      </button>
                    )}
                  </div>
                  {filteredEnrolledCourses.length === 0 ? (
                    <p className="text-[11px] text-slate-400 italic">No matching enrolled courses</p>
                  ) : (
                    <div className="space-y-1.5">
                      {filteredEnrolledCourses.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => {
                            setActiveTab('enrolled');
                            setExpandedCourseId(c.id);
                          }}
                          className="p-2.5 bg-slate-50 hover:bg-indigo-50/80 rounded-lg cursor-pointer transition-colors border border-slate-100 flex flex-col gap-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 truncate pr-2">{c.title}</span>
                            <span className="text-[10px] font-mono font-extrabold text-indigo-600 shrink-0 bg-indigo-50 px-1.5 py-0.5 rounded">
                              {getCourseProgress(c.id)}%
                            </span>
                          </div>
                          {/* Visual Progress Bar inside Quick Search list */}
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                              style={{ width: `${getCourseProgress(c.id)}%` }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recorded Classes */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                      <PlayCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Recorded Classes ({filteredRecordedClasses.length})</span>
                    </span>
                    {filteredRecordedClasses.length > 0 && (
                      <button
                        onClick={() => setActiveTab('classes')}
                        className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer"
                      >
                        View Tab →
                      </button>
                    )}
                  </div>
                  {filteredRecordedClasses.length === 0 ? (
                    <p className="text-[11px] text-slate-400 italic">No matching recorded classes</p>
                  ) : (
                    <div className="space-y-1.5">
                      {filteredRecordedClasses.map((rec) => (
                        <div
                          key={rec.id}
                          onClick={() => onWatchRecording(rec)}
                          className="p-2.5 bg-slate-50 hover:bg-rose-50/80 rounded-lg cursor-pointer transition-colors border border-slate-100 flex items-center justify-between"
                        >
                          <span className="font-bold text-slate-900 truncate pr-2">{rec.sessionTitle}</span>
                          <span className="text-[10px] text-slate-500 shrink-0 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">
                            {rec.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Quizzes & Assignments */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>Quizzes & Tasks ({filteredQuizzes.length})</span>
                    </span>
                    {filteredQuizzes.length > 0 && (
                      <button
                        onClick={() => setActiveTab('assessment')}
                        className="text-[10px] font-bold text-indigo-600 hover:underline cursor-pointer"
                      >
                        View Tab →
                      </button>
                    )}
                  </div>
                  {filteredQuizzes.length === 0 ? (
                    <p className="text-[11px] text-slate-400 italic">No matching quizzes/tasks</p>
                  ) : (
                    <div className="space-y-1.5">
                      {filteredQuizzes.map((q) => (
                        <div
                          key={q.id}
                          onClick={() => {
                            setActiveTab('assessment');
                            setSelectedQuizId(q.id);
                          }}
                          className="p-2.5 bg-slate-50 hover:bg-amber-50/80 rounded-lg cursor-pointer transition-colors border border-slate-100 flex items-center justify-between"
                        >
                          <span className="font-bold text-slate-900 truncate pr-2">{q.title}</span>
                          <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded shrink-0">
                            {q.questions.length} Qs
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Portal Menu Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 bg-white p-2 rounded-[28px] border border-slate-200 mb-8 shadow-sm">
          <button
            onClick={() => setActiveTab('enrolled')}
            className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'enrolled'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>My Courses</span>
          </button>

          <button
            onClick={() => setActiveTab('classes')}
            className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'classes'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('planner')}
            className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
              activeTab === 'planner'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>Planner</span>
          </button>

          <button
            onClick={() => setActiveTab('career')}
            className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
              activeTab === 'career'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Career</span>
            <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
              GOAL
            </span>
          </button>

          <button
            onClick={() => setActiveTab('notebook')}
            className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
              activeTab === 'notebook'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <StickyNote className="w-4 h-4 text-amber-400" />
            <span>Notebook</span>
            <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
              NOTES
            </span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
              activeTab === 'library'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FolderDown className="w-4 h-4 text-amber-400" />
            <span>Library</span>
          </button>

          <button
            onClick={() => setActiveTab('assessment')}
            className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'assessment'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Quizzes</span>
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
              activeTab === 'badges'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Badges</span>
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {unlockedBadgesCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
              activeTab === 'leaderboard'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Leaderboard</span>
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              Top 5
            </span>
          </button>

          <button
            onClick={() => setActiveTab('forum')}
            className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer relative ${
              activeTab === 'forum'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <MessagesSquare className="w-4 h-4 text-indigo-500" />
            <span>Forum</span>
            <span className="bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full border border-indigo-200">
              {forumThreads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('account')}
            className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'account'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>
        </div>


        {/* TAB 1: MY COURSES */}
        {activeTab === 'enrolled' && (
          <div className="space-y-8">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>Enrolled Courses & Module Completion</span>
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Complete modules to earn digital skill badges!
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredEnrolledCourses.length === 0 ? (
                <div className="col-span-2 bg-white rounded-[32px] border border-slate-200 p-8 text-center space-y-3">
                  <p className="text-sm font-extrabold text-slate-800">
                    No enrolled courses matched "{dashboardSearchQuery}"
                  </p>
                  <p className="text-xs text-slate-500">
                    Try checking spelling or clear your search filter to see all enrolled courses.
                  </p>
                  <button
                    onClick={() => setDashboardSearchQuery('')}
                    className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Clear Search Filter
                  </button>
                </div>
              ) : (
                filteredEnrolledCourses.map((course) => {
                const progress = getCourseProgress(course.id);
                const completedMods = completedModules[course.id] || [];
                const isExpanded = expandedCourseId === course.id;

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-[32px] border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <span className="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-3 py-1 rounded-full border border-indigo-100 inline-block">
                          {course.category}
                        </span>
                        <h3 className="text-lg font-extrabold text-slate-900 leading-snug">{course.title}</h3>
                        <p className="text-xs text-slate-500 font-medium">
                          Instructor: <strong className="text-slate-900">{course.instructorName}</strong>
                        </p>
                      </div>

                      {/* Visual Circular Progress Ring */}
                      <div className="flex flex-col items-center gap-1 shrink-0 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 shadow-2xs">
                        <CircularProgressRing progress={progress} size={64} strokeWidth={6} />
                        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Progress</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {/* Expandable Module Completion Checklist */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
                      <div
                        onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                        className="flex items-center justify-between cursor-pointer select-none"
                      >
                        <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Course Modules ({completedMods.length}/{course.modules.length} Done)</span>
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                      </div>

                      {isExpanded && (
                        <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
                          {course.modules.map((mod) => {
                            const isDone = completedMods.includes(mod.number);
                            return (
                              <div
                                key={mod.id}
                                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                                  isDone
                                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                                    : 'bg-white border-slate-200 text-slate-800'
                                }`}
                              >
                                <div className="space-y-0.5">
                                  <span className="font-bold block text-slate-900">
                                    Module {mod.number}: {mod.title}
                                  </span>
                                  <span className="text-[10px] text-slate-500 block">
                                    Topics: {mod.topics.join(', ')}
                                  </span>
                                </div>

                                <button
                                  onClick={() => handleToggleModuleComplete(course.id, mod.number, course.modules.length)}
                                  className={`px-3 py-1.5 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                                    isDone
                                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                      : 'bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200'
                                  }`}
                                >
                                  {isDone ? (
                                    <>
                                      <Check className="w-3.5 h-3.5" />
                                      <span>Completed</span>
                                    </>
                                  ) : (
                                    <span>Mark Complete</span>
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-500 font-medium">
                        {completedMods.length > 0 ? '🏆 Badge Eligible' : 'Start first module'}
                      </span>
                      <button
                        onClick={() => onWatchRecording(recordedClasses[0])}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-md shadow-indigo-100"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Continue Class</span>
                      </button>
                    </div>
                  </div>
                );
              }))}
            </div>

            {/* TOP 5 PERFORMERS LEADERBOARD PREVIEW WIDGET */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[32px] p-6 sm:p-8 text-white space-y-6 shadow-xl relative overflow-hidden border border-indigo-900/50">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-slate-950" />
                      <span>Academy Honor Roll</span>
                    </span>
                    <span className="text-xs text-indigo-200 font-medium">Updated Weekly</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                    <span>Top 5 Performers Leaderboard</span>
                  </h3>
                  <p className="text-xs text-indigo-200 font-medium">
                    Rankings based on total assignments completed, course progress percentage, and verified skill points.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-400/20 flex items-center gap-1.5 shrink-0"
                >
                  <Trophy className="w-4 h-4 text-slate-950" />
                  <span>View Full Leaderboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Top 5 Performers List */}
              <div className="grid gap-3">
                {leaderboardList.slice(0, 5).map((entry) => {
                  const isCurrent = entry.isCurrentUser;
                  let medalColor = 'bg-slate-800 text-slate-300 border-slate-700';
                  let medalIcon = <span className="font-extrabold font-mono text-xs">#{entry.rank}</span>;

                  if (entry.rank === 1) {
                    medalColor = 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20';
                    medalIcon = <Crown className="w-4 h-4 text-slate-950 fill-amber-300" />;
                  } else if (entry.rank === 2) {
                    medalColor = 'bg-slate-200 text-slate-950 border-slate-300 shadow-sm';
                    medalIcon = <Medal className="w-4 h-4 text-slate-950" />;
                  } else if (entry.rank === 3) {
                    medalColor = 'bg-amber-700/80 text-amber-100 border-amber-600';
                    medalIcon = <Medal className="w-4 h-4 text-amber-200" />;
                  }

                  return (
                    <div
                      key={entry.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isCurrent
                          ? 'bg-indigo-600/30 border-indigo-400 ring-2 ring-indigo-400/40'
                          : 'bg-indigo-950/40 border-indigo-900/60 hover:bg-indigo-900/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Rank Badge */}
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${medalColor}`}>
                          {medalIcon}
                        </div>

                        {/* User Details */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-white truncate">{entry.name}</span>
                            {isCurrent && (
                              <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.2 rounded-full uppercase">
                                You
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-indigo-200 truncate font-medium">{entry.designation}</p>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 text-xs shrink-0">
                        {/* Assignments Completed */}
                        <div className="text-right">
                          <span className="text-[10px] text-indigo-300 block uppercase font-bold">Assignments</span>
                          <span className="font-extrabold text-white font-mono">
                            {entry.assignmentsCompleted}/{entry.totalAssignments} ({Math.round((entry.assignmentsCompleted / entry.totalAssignments) * 100)}%)
                          </span>
                        </div>

                        {/* Course Progress */}
                        <div className="text-right min-w-[90px]">
                          <span className="text-[10px] text-indigo-300 block uppercase font-bold">Progress</span>
                          <div className="flex items-center gap-1.5 justify-end">
                            <div className="w-12 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${entry.courseProgress}%` }} />
                            </div>
                            <span className="font-bold text-emerald-400 font-mono text-xs">{entry.courseProgress}%</span>
                          </div>
                        </div>

                        {/* Points Badge */}
                        <div className="bg-amber-400/10 border border-amber-400/30 px-3 py-1.5 rounded-xl text-center">
                          <span className="text-[9px] text-amber-300 block font-bold uppercase">Points</span>
                          <span className="font-extrabold text-amber-300 font-mono text-xs">{entry.points} XP</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Rank Summary for Current User */}
              <div className="bg-indigo-900/50 p-4 rounded-2xl border border-indigo-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Your Rank: <strong className="text-amber-300 font-extrabold">#2 Silver Leader</strong> • Complete 1 more assignment to challenge Rank #1!
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className="text-amber-300 hover:text-amber-200 font-bold underline cursor-pointer shrink-0"
                >
                  View Rank Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CLASSES & SCHEDULE */}
        {activeTab === 'classes' && (
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200 space-y-4 shadow-sm">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Video className="w-5 h-5 text-rose-600" />
                <span>Upcoming Live Classes Schedule</span>
              </h3>

              <div className="space-y-3">
                {liveClasses.map((lc) => (
                  <div
                    key={lc.id}
                    className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-extrabold border border-indigo-100">
                        {lc.courseTitle}
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900 mt-1.5">{lc.topic}</h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {lc.date} at {lc.time} • Instructor: {lc.instructor}
                      </p>
                    </div>

                    <button
                      onClick={() => onWatchRecording(recordedClasses[0])}
                      className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-md shadow-rose-100"
                    >
                      Join Live Room
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-indigo-600" />
                    <span>My Recorded Video Library & PDF Materials</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Watch recorded masterclass sessions and download associated PDF lecture notes, statutory guides, and worksheets.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => setShowPomodoroModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 px-4 py-2 rounded-2xl text-xs font-black shadow-md shadow-amber-400/20 cursor-pointer transition-all"
                  >
                    <Brain className="w-4 h-4 text-slate-950" />
                    <span>Pomodoro Study Timer</span>
                  </button>

                  <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3.5 py-2 rounded-2xl text-xs font-bold text-indigo-800">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span>{recordedClasses.reduce((acc, r) => acc + r.resources.length, 0)} Materials Ready</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredRecordedClasses.length === 0 ? (
                  <div className="col-span-2 bg-slate-50 rounded-3xl border border-slate-200 p-8 text-center space-y-3">
                    <p className="text-sm font-extrabold text-slate-800">
                      No recorded video classes matched "{dashboardSearchQuery}"
                    </p>
                    <p className="text-xs text-slate-500">
                      Try checking spelling or clear your search filter.
                    </p>
                    <button
                      onClick={() => setDashboardSearchQuery('')}
                      className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Clear Search Filter
                    </button>
                  </div>
                ) : (
                  filteredRecordedClasses.map((rec) => {
                  const isExpanded = expandedMaterialsRecId === rec.id;
                  const hasMaterials = rec.resources && rec.resources.length > 0;

                  return (
                    <div
                      key={rec.id}
                      className={`p-6 bg-slate-50 rounded-3xl border transition-all space-y-4 flex flex-col justify-between ${
                        isExpanded ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/20' : 'border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Tags Header */}
                        <div className="flex items-center justify-between">
                          <span className="bg-indigo-100 text-indigo-900 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border border-indigo-200">
                            Module {rec.moduleNumber} Archive
                          </span>
                          <span className="text-[11px] font-bold text-slate-400 font-mono">
                            Uploaded {rec.dateUploaded}
                          </span>
                        </div>

                        {/* Title & Course */}
                        <div>
                          <h4 className="text-base font-extrabold text-slate-900 leading-snug">{rec.sessionTitle}</h4>
                          <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                            <span>{rec.courseTitle}</span>
                          </p>
                        </div>

                        {/* Duration & Material Count Pills */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                          <span className="flex items-center gap-1 text-slate-600 font-bold font-mono bg-white px-2.5 py-1 rounded-xl border border-slate-200">
                            <Clock className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{rec.duration}</span>
                          </span>

                          <span className="flex items-center gap-1 text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                            <FileText className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{rec.resources.length} Downloadable Materials</span>
                          </span>
                        </div>
                      </div>

                      {/* Attached Materials Expanded Drawer */}
                      {hasMaterials && isExpanded && (
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                              <FolderDown className="w-4 h-4 text-amber-500" />
                              <span>Lecture Notes & PDF Files</span>
                            </span>
                            <button
                              onClick={() => handleDownloadAllMaterials(rec)}
                              className="text-[10px] font-extrabold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download All ({rec.resources.length})</span>
                            </button>
                          </div>

                          <div className="space-y-2">
                            {rec.resources.map((res, i) => {
                              const isPdf = res.name.toLowerCase().endsWith('.pdf');
                              const isDoc = res.name.toLowerCase().endsWith('.docx');
                              const isXls = res.name.toLowerCase().endsWith('.xlsx');

                              let fileBadgeLabel = 'PDF Notes';
                              let fileBadgeBg = 'bg-rose-100 text-rose-800 border-rose-200';
                              if (isDoc) {
                                fileBadgeLabel = 'Word Doc';
                                fileBadgeBg = 'bg-blue-100 text-blue-800 border-blue-200';
                              } else if (isXls) {
                                fileBadgeLabel = 'Excel Sheet';
                                fileBadgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                              }

                              return (
                                <div
                                  key={i}
                                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-indigo-50/50 transition-colors"
                                >
                                  <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                                    <div className={`w-9 h-9 rounded-xl font-extrabold text-[10px] flex items-center justify-center shrink-0 border ${fileBadgeBg}`}>
                                      {isPdf ? 'PDF' : isDoc ? 'DOC' : 'XLS'}
                                    </div>
                                    <div className="truncate">
                                      <p className="text-xs font-bold text-slate-900 truncate">{res.name}</p>
                                      <p className="text-[10px] text-slate-400 font-mono">
                                        {res.size} • {fileBadgeLabel}
                                      </p>
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => handleDownloadMaterialFile(res.name, rec.sessionTitle)}
                                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-xs shrink-0 flex items-center gap-1"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download</span>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Card Action Bar */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 text-xs gap-2">
                        {/* Download Materials Button */}
                        <button
                          onClick={() => setExpandedMaterialsRecId(isExpanded ? null : rec.id)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isExpanded
                              ? 'bg-amber-500 text-slate-950 shadow-sm'
                              : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                          }`}
                        >
                          <Download className="w-3.5 h-3.5 text-amber-700" />
                          <span>{isExpanded ? 'Hide Materials' : 'Download Materials'}</span>
                          <span className="bg-amber-200 text-amber-950 text-[10px] font-black px-1.5 py-0.2 rounded-full ml-0.5">
                            {rec.resources.length}
                          </span>
                        </button>

                        {/* Watch Session Button */}
                        <button
                          onClick={() => onWatchRecording(rec)}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl cursor-pointer shadow-md shadow-indigo-100 transition-all flex items-center gap-1.5 shrink-0"
                        >
                          <PlayCircle className="w-4 h-4 text-amber-300" />
                          <span>Watch Session</span>
                        </button>
                      </div>
                    </div>
                  );
                }))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: STUDY PLANNER */}
        {activeTab === 'planner' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                onClick={() => setPlannerView('daily')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                  plannerView === 'daily'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Daily Schedule
              </button>
              <button
                onClick={() => setPlannerView('weekly')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                  plannerView === 'weekly'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Weekly Goals
              </button>
            </div>
            
            {plannerView === 'daily' ? (
              <DailyStudyPlanner courses={courses} />
            ) : (
              <WeeklyStudyPlanner courses={courses} />
            )}
          </div>
        )}

        {/* TAB: CAREER PATH BUILDER */}
        {activeTab === 'career' && (
          <CareerPathBuilder courses={courses} />
        )}

        {/* TAB: STUDENT CLASS NOTEBOOK */}
        {activeTab === 'notebook' && (
          <StudentNotebook courses={courses} />
        )}

        {/* TAB: COURSE MATERIAL LIBRARY */}
        {activeTab === 'library' && (
          <StudentLibrary courses={courses} />
        )}

        {/* TAB 3: ASSESSMENT & ONLINE QUIZ SYSTEM */}
        {activeTab === 'assessment' && (
          <div className="space-y-8">
            {/* System Overview Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-[32px] p-6 sm:p-8 border border-slate-800 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 text-[11px] font-extrabold px-3 py-1 rounded-full border border-indigo-500/30">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Interactive Practice Test System</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Course Knowledge & Legal Skill Assessments
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                    Test your legal & practical expertise across all your enrolled courses. Score 80% or higher to unlock digital competency badges for your student profile!
                  </p>
                </div>

                {/* Overall Quiz Performance Summary */}
                {(() => {
                  type QuizAttempt = { score: number; total: number; percentage: number; passed: boolean; date: string };
                  const attempts = Object.values(quizAttemptHistory) as QuizAttempt[];
                  const passedCount = attempts.filter((h) => h.passed).length;
                  const avgScore =
                    attempts.length > 0
                      ? Math.round(attempts.reduce((sum, h) => sum + h.percentage, 0) / attempts.length)
                      : 0;

                  return (
                    <div className="grid grid-cols-3 gap-2 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center shrink-0">
                      <div className="p-2 space-y-1">
                        <span className="text-[10px] text-slate-300 uppercase font-extrabold block">Total Quizzes</span>
                        <span className="text-xl font-extrabold text-white font-mono">{ALL_COURSE_QUIZZES.length}</span>
                      </div>
                      <div className="p-2 space-y-1 border-x border-white/10">
                        <span className="text-[10px] text-slate-300 uppercase font-extrabold block">Passed</span>
                        <span className="text-xl font-extrabold text-emerald-400 font-mono">{passedCount}</span>
                      </div>
                      <div className="p-2 space-y-1">
                        <span className="text-[10px] text-slate-300 uppercase font-extrabold block">Avg Score</span>
                        <span className="text-xl font-extrabold text-amber-300 font-mono">{avgScore}%</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Course Quiz Selector Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Select Course Practice Assessment</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">Choose a test below</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {filteredQuizzes.length === 0 ? (
                  <div className="col-span-full bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-2">
                    <p className="text-xs font-extrabold text-slate-800">
                      No quizzes or assignments matched "{dashboardSearchQuery}"
                    </p>
                    <button
                      onClick={() => setDashboardSearchQuery('')}
                      className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] rounded-lg transition-colors cursor-pointer"
                    >
                      Clear Search Filter
                    </button>
                  </div>
                ) : (
                  filteredQuizzes.map((quiz) => {
                  const isSelected = quiz.id === selectedQuizId;
                  const history = quizAttemptHistory[quiz.id];

                  return (
                    <button
                      key={quiz.id}
                      onClick={() => handleSelectQuiz(quiz.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
                        isSelected
                          ? 'bg-indigo-900 text-white border-indigo-800 shadow-md ring-2 ring-indigo-500 ring-offset-2'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase ${
                              isSelected
                                ? 'bg-indigo-800 text-indigo-200 border-indigo-700'
                                : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                            }`}
                          >
                            {quiz.category}
                          </span>

                          {history && (
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                history.passed
                                  ? isSelected
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : isSelected
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              <CheckCircle className="w-3 h-3" />
                              <span>{history.percentage}%</span>
                            </span>
                          )}
                        </div>

                        <h4 className={`text-xs font-extrabold line-clamp-2 leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {quiz.title}
                        </h4>
                      </div>

                      <div className={`pt-2 border-t text-[11px] flex items-center justify-between font-medium ${isSelected ? 'border-indigo-800/80 text-indigo-200' : 'border-slate-100 text-slate-500'}`}>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{quiz.questions.length} Questions</span>
                        </span>
                        <span className="font-bold">{quiz.passPercentage}% Pass</span>
                      </div>
                    </button>
                  );
                }))}
              </div>
            </div>

            {/* Active Quiz Card */}
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200 space-y-6 shadow-sm">
              {/* Active Quiz Title & Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase border border-indigo-100">
                      {activeQuiz.category} Quiz
                    </span>
                    <span className="text-xs text-slate-400 font-medium font-mono">
                      {activeQuiz.durationMinutes} Mins • Pass Mark: {activeQuiz.passPercentage}%
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">{activeQuiz.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">{activeQuiz.description}</p>
                </div>

                {/* Badge Reward Callout */}
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-center gap-3 shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                    <Trophy className="w-5 h-5 text-amber-100" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-amber-800 uppercase block">Reward Badge</span>
                    <span className="text-xs font-extrabold text-amber-950">{activeQuiz.badgeRewardName}</span>
                  </div>
                </div>
              </div>

              {/* View Mode & Question Progress Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-bold text-slate-700">Answer Progress:</span>
                  <div className="flex items-center gap-1.5 font-mono font-extrabold text-indigo-700">
                    <span>{Object.keys(quizAnswers).length}</span>
                    <span className="text-slate-400">/</span>
                    <span>{activeQuiz.questions.length} Answered</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold">
                    <button
                      onClick={() => setQuizDisplayMode('all')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        quizDisplayMode === 'all'
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Show All
                    </button>
                    <button
                      onClick={() => setQuizDisplayMode('single')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        quizDisplayMode === 'single'
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Step-by-Step
                    </button>
                  </div>

                  {quizSubmitted && (
                    <button
                      onClick={() => {
                        setQuizAnswers({});
                        setQuizSubmitted(false);
                        setActiveQuestionIdx(0);
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Question Navigator Palette */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-xs font-extrabold text-slate-400 shrink-0 uppercase tracking-wider">Questions:</span>
                {activeQuiz.questions.map((q, idx) => {
                  const isAnswered = quizAnswers[q.id] !== undefined;
                  const isCurrent = activeQuestionIdx === idx;
                  const isCorrect = quizSubmitted && quizAnswers[q.id] === q.correctAnswer;
                  const isWrong = quizSubmitted && isAnswered && !isCorrect;

                  let paletteStyle = 'bg-white text-slate-700 border-slate-200 hover:border-indigo-400';
                  if (isAnswered && !quizSubmitted) {
                    paletteStyle = 'bg-indigo-50 text-indigo-700 border-indigo-400 font-bold';
                  }
                  if (isCurrent && quizDisplayMode === 'single') {
                    paletteStyle += ' ring-2 ring-indigo-600 ring-offset-1 font-extrabold';
                  }
                  if (quizSubmitted) {
                    if (isCorrect) paletteStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                    else if (isWrong) paletteStyle = 'bg-rose-500 text-white border-rose-600 font-bold';
                    else paletteStyle = 'bg-slate-100 text-slate-400 border-slate-200';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setActiveQuestionIdx(idx);
                        if (quizDisplayMode === 'all') {
                          const el = document.getElementById(`question-card-${q.id}`);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      className={`w-8 h-8 rounded-xl border text-xs font-mono flex items-center justify-center shrink-0 transition-all cursor-pointer ${paletteStyle}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Score Results Card (If Submitted) */}
              {quizSubmitted && (
                <div
                  className={`p-6 sm:p-8 rounded-3xl border space-y-4 transition-all ${
                    calculateActiveQuizScore() / activeQuiz.questions.length >= activeQuiz.passPercentage / 100
                      ? 'bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-950 text-white border-emerald-800 shadow-xl'
                      : 'bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white border-rose-900 shadow-xl'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-md ${
                          calculateActiveQuizScore() / activeQuiz.questions.length >= activeQuiz.passPercentage / 100
                            ? 'bg-emerald-500'
                            : 'bg-rose-500'
                        }`}
                      >
                        {calculateActiveQuizScore() / activeQuiz.questions.length >= activeQuiz.passPercentage / 100 ? (
                          <Trophy className="w-7 h-7 text-white" />
                        ) : (
                          <AlertCircle className="w-7 h-7 text-white" />
                        )}
                      </div>

                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block">
                          Assessment Result
                        </span>
                        <h4 className="text-xl font-extrabold">
                          {calculateActiveQuizScore() / activeQuiz.questions.length >= activeQuiz.passPercentage / 100
                            ? '🎉 Congratulations! You Passed!'
                            : ' Keep Practicing & Retake Test'}
                        </h4>
                        <p className="text-xs text-slate-300 font-medium mt-0.5">
                          Required passing mark is {activeQuiz.passPercentage}%. You answered {calculateActiveQuizScore()} out of {activeQuiz.questions.length} questions correctly.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/10 p-4 rounded-2xl text-center shrink-0 border border-white/10">
                      <span className="text-[10px] font-extrabold text-slate-300 uppercase block">Score Percentage</span>
                      <span className="text-2xl font-extrabold font-mono text-amber-300">
                        {Math.round((calculateActiveQuizScore() / activeQuiz.questions.length) * 100)}%
                      </span>
                    </div>
                  </div>

                  {calculateActiveQuizScore() / activeQuiz.questions.length >= activeQuiz.passPercentage / 100 && (
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-300 shrink-0" />
                        <span>
                          <strong>Badge Unlocked:</strong> You earned the <span className="text-amber-300 font-extrabold">{activeQuiz.badgeRewardName}</span> badge!
                        </span>
                      </div>
                      <button
                        onClick={() => setActiveTab('badges')}
                        className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl transition-colors shrink-0 shadow-md cursor-pointer"
                      >
                        View My Badges
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Questions List (ALL MODE or SINGLE MODE) */}
              <div className="space-y-6">
                {(quizDisplayMode === 'all'
                  ? activeQuiz.questions
                  : [activeQuiz.questions[activeQuestionIdx]]
                ).map((q, idx) => {
                  const actualQuestionIndex = quizDisplayMode === 'all' ? idx : activeQuestionIdx;
                  const selectedOpt = quizAnswers[q.id];
                  const isCorrect = selectedOpt === q.correctAnswer;

                  return (
                    <div
                      id={`question-card-${q.id}`}
                      key={q.id}
                      className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-mono font-extrabold flex items-center justify-center shrink-0">
                            Q{actualQuestionIndex + 1}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 leading-snug">
                            {q.question}
                          </h4>
                        </div>

                        {quizSubmitted && (
                          <span
                            className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border shrink-0 ${
                              isCorrect
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            {isCorrect ? 'Correct' : selectedOpt !== undefined ? 'Incorrect' : 'Unanswered'}
                          </span>
                        )}
                      </div>

                      {/* Options Grid */}
                      <div className="grid sm:grid-cols-2 gap-2.5 text-xs">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = selectedOpt === oIdx;
                          let btnStyle =
                            'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-indigo-300';
                          let optionLetterColor = 'bg-slate-100 text-slate-600';

                          if (isSelected) {
                            btnStyle = 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-1 ring-indigo-500';
                            optionLetterColor = 'bg-indigo-600 text-white';
                          }

                          if (quizSubmitted) {
                            if (oIdx === q.correctAnswer) {
                              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-500';
                              optionLetterColor = 'bg-emerald-600 text-white';
                            } else if (isSelected && !isCorrect) {
                              btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-medium';
                              optionLetterColor = 'bg-rose-600 text-white';
                            }
                          }

                          const letters = ['A', 'B', 'C', 'D'];

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleOptionSelect(q.id, oIdx)}
                              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer font-medium flex items-center gap-3 ${btnStyle}`}
                            >
                              <span className={`w-6 h-6 rounded-lg text-[11px] font-mono font-bold flex items-center justify-center shrink-0 ${optionLetterColor}`}>
                                {letters[oIdx]}
                              </span>
                              <span className="flex-1 leading-snug">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Legal Explanation Callout */}
                      {quizSubmitted && (
                        <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                          <div className="flex items-center gap-1.5 text-indigo-600 font-extrabold uppercase text-[10px]">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Legal & Statutory Explanation</span>
                          </div>
                          <p className="leading-relaxed text-slate-600">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Step-by-Step Navigation Controls */}
              {quizDisplayMode === 'single' && (
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                  <button
                    disabled={activeQuestionIdx === 0}
                    onClick={() => setActiveQuestionIdx((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-extrabold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Question</span>
                  </button>

                  <span className="font-mono font-bold text-slate-500">
                    Question {activeQuestionIdx + 1} of {activeQuiz.questions.length}
                  </span>

                  <button
                    disabled={activeQuestionIdx === activeQuiz.questions.length - 1}
                    onClick={() => setActiveQuestionIdx((prev) => Math.min(activeQuiz.questions.length - 1, prev + 1))}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-extrabold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Final Submission Button */}
              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl text-xs sm:text-sm transition-all cursor-pointer shadow-md shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>Submit Assessment & Calculate Final Score</span>
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                      setActiveQuestionIdx(0);
                    }}
                    className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-2xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retake This Assessment</span>
                  </button>

                  <button
                    onClick={() => {
                      const currentIdx = ALL_COURSE_QUIZZES.findIndex((q) => q.id === selectedQuizId);
                      const nextQuiz = ALL_COURSE_QUIZZES[(currentIdx + 1) % ALL_COURSE_QUIZZES.length];
                      handleSelectQuiz(nextQuiz.id);
                    }}
                    className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-indigo-100"
                  >
                    <span>Try Next Course Practice Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: DIGITAL BADGES & MEDALS */}
        {activeTab === 'badges' && (
          <div className="space-y-8">
            {/* Rank Hero Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-[32px] p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-5 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg border-2 border-amber-400">
                  <Trophy className="w-10 h-10 text-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Learner Level Tier
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif font-extrabold text-white mt-1">
                    {currentRank.title}
                  </h2>
                  <p className="text-xs text-slate-300 font-medium mt-1">
                    Earn digital badges by completing course modules, live sessions, and practical tax quizzes.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 relative z-10 w-full md:w-auto justify-around md:justify-end">
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center min-w-[110px]">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">EARNED BADGES</span>
                  <span className="text-xl font-extrabold text-amber-400 font-mono">
                    {unlockedBadgesCount} / {studentBadges.length}
                  </span>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center min-w-[110px]">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">TOTAL POINTS</span>
                  <span className="text-xl font-extrabold text-emerald-400 font-mono">
                    {totalBadgePoints} PTS
                  </span>
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm text-xs font-bold">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider mr-2 font-bold flex items-center gap-1">
                <Medal className="w-3.5 h-3.5 text-indigo-600" /> Filter:
              </span>

              {(['all', 'unlocked', 'locked', 'Module', 'Quiz', 'Course'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setBadgeFilter(f)}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer capitalize ${
                    badgeFilter === f
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f === 'all' ? 'All Badges' : f}
                </button>
              ))}
            </div>

            {/* Badges Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {studentBadges
                .filter((b) => {
                  if (badgeFilter === 'unlocked') return b.isUnlocked;
                  if (badgeFilter === 'locked') return !b.isUnlocked;
                  if (badgeFilter !== 'all') return b.category === badgeFilter;
                  return true;
                })
                .map((badge) => {
                  return (
                    <div
                      key={badge.id}
                      onClick={() => setSelectedDetailBadge(badge)}
                      className={`bg-white rounded-[28px] border p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all cursor-pointer relative group ${
                        badge.isUnlocked
                          ? 'border-indigo-200 hover:border-indigo-400'
                          : 'border-slate-200 opacity-75 hover:opacity-100'
                      }`}
                    >
                      {/* Top Badging Pill */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                            badge.isUnlocked
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border-slate-200'
                          }`}
                        >
                          {badge.category}
                        </span>

                        <span className="text-[10px] font-black font-mono bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
                          +{badge.points} PTS
                        </span>
                      </div>

                      {/* Icon Circle */}
                      <div className="text-center my-2">
                        <div
                          className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-transform group-hover:scale-105 duration-300 ${
                            badge.isUnlocked
                              ? 'bg-gradient-to-tr from-indigo-50 to-indigo-100 border-2 border-indigo-200 shadow-md'
                              : 'bg-slate-100 border-2 border-slate-200'
                          }`}
                        >
                          {badge.isUnlocked ? (
                            renderBadgeIcon(badge.icon, 'w-10 h-10 text-indigo-600')
                          ) : (
                            <Lock className="w-8 h-8 text-slate-400" />
                          )}
                        </div>
                        <h4 className="text-base font-extrabold text-slate-900 mt-3 group-hover:text-indigo-600 transition-colors">
                          {badge.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1">
                          {badge.description}
                        </p>
                      </div>

                      {/* Footer Info */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        {badge.isUnlocked ? (
                          <>
                            <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Earned
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium">
                              {badge.earnedAt}
                            </span>
                          </>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-medium truncate">
                            🔒 {badge.criteria}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* TAB 5: COURSE DISCUSSION FORUM */}
        {activeTab === 'forum' && (
          <div className="space-y-8">
            {/* Header Hero Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-[32px] p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 text-[11px] font-extrabold px-3 py-1 rounded-full border border-indigo-500/30">
                    <MessagesSquare className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Enrolled Student Community Forum</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Legal Discussion Forum & Peer Community
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                    Ask doubts on statutory provisions, analyze practical tax & legal case studies, share e-filing insights, and learn directly from instructors and fellow tax practitioners.
                  </p>
                </div>

                <button
                  onClick={() => setNewThreadModalOpen(true)}
                  className="px-5 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 border border-indigo-400/30"
                >
                  <PlusCircle className="w-4 h-4 text-amber-300" />
                  <span>Ask Question / Start Discussion</span>
                </button>
              </div>
            </div>

            {/* Filter, Search & Controls Bar */}
            <div className="bg-white p-5 rounded-[28px] border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={forumSearchQuery}
                    onChange={(e) => setForumSearchQuery(e.target.value)}
                    placeholder="Search discussions by keyword, section, or tag (e.g., #eFiling, #Section102)..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                  {forumSearchQuery && (
                    <button
                      onClick={() => setForumSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Course Filter Dropdown */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider hidden sm:inline">
                    Course:
                  </span>
                  <select
                    value={forumCourseFilter}
                    onChange={(e) => setForumCourseFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold px-3 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="all">All Enrolled Courses</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>

                  {/* Sort Selector */}
                  <select
                    value={forumSortBy}
                    onChange={(e) => setForumSortBy(e.target.value as any)}
                    className="bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold px-3 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Upvoted</option>
                    <option value="unanswered">Unanswered First</option>
                  </select>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Filter:
                </span>
                {['All', 'Question', 'Case Study', 'Statutory Update', 'Exam Prep', 'General'].map((cat) => {
                  const isSelected = forumCategoryFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setForumCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Forum Thread Main Grid */}
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Threads List (8 cols or 12 cols if no active detail) */}
              <div className={`${activeThread ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-4`}>
                {filteredForumThreads.length === 0 ? (
                  <div className="bg-white p-12 rounded-[32px] border border-slate-200 text-center space-y-3">
                    <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
                    <h4 className="text-base font-bold text-slate-800">No discussion threads found</h4>
                    <p className="text-xs text-slate-500">
                      Try adjusting your search query or filter tags, or post a new question to start the conversation!
                    </p>
                    <button
                      onClick={() => setNewThreadModalOpen(true)}
                      className="px-4 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 cursor-pointer inline-flex items-center gap-1.5 mt-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Start New Discussion</span>
                    </button>
                  </div>
                ) : (
                  filteredForumThreads.map((thread) => {
                    const isSelected = activeThreadId === thread.id;

                    return (
                      <div
                        key={thread.id}
                        onClick={() => setActiveThreadId(thread.id)}
                        className={`p-5 sm:p-6 rounded-3xl border transition-all cursor-pointer space-y-3 relative ${
                          isSelected
                            ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500 shadow-md'
                            : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                        }`}
                      >
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-indigo-200 uppercase">
                              {thread.category}
                            </span>
                            <span className="text-[11px] font-bold text-slate-500 truncate max-w-[200px]">
                              {thread.courseTitle}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {thread.isPinned && (
                              <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-200">
                                <Pin className="w-3 h-3 text-amber-700" /> Pinned
                              </span>
                            )}
                            {thread.isSolved ? (
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                                <CheckCircle className="w-3 h-3" /> Solved
                              </span>
                            ) : (
                              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                Open
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Excerpt */}
                        <div>
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 hover:text-indigo-600 transition-colors leading-snug">
                            {thread.title}
                          </h3>
                          <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-1.5 leading-relaxed">
                            {thread.content}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {thread.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Footer: Author, Upvotes & Replies */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                              {thread.authorName.charAt(0)}
                            </div>
                            <div>
                              <span className="font-bold text-slate-800 block text-xs leading-none">
                                {thread.authorName}
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">
                                {thread.authorRole} • {thread.createdAt}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Upvote Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleThreadUpvote(thread.id);
                              }}
                              className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                                thread.isUpvoted
                                  ? 'bg-indigo-600 text-white border-indigo-600'
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span className="font-mono">{thread.upvotes}</span>
                            </button>

                            {/* Reply Count */}
                            <div className="flex items-center gap-1 text-slate-600 font-bold font-mono">
                              <MessageCircle className="w-3.5 h-3.5 text-indigo-500" />
                              <span>{thread.replies.length}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Active Thread Details Pane (6 cols when active) */}
              {activeThread && (
                <div className="lg:col-span-6 bg-white rounded-[32px] border border-slate-200 p-6 sm:p-8 space-y-6 shadow-md relative sticky top-6">
                  {/* Pane Close Button */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <span className="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border border-indigo-100">
                      Thread Conversation
                    </span>
                    <button
                      onClick={() => setActiveThreadId(null)}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Full Question Post */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                          {activeThread.category}
                        </span>
                        <span className="text-xs text-slate-500 font-bold truncate max-w-[180px]">{activeThread.courseTitle}</span>
                      </div>

                      <button
                        onClick={() => handleToggleThreadSolved(activeThread.id)}
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border cursor-pointer transition-colors flex items-center gap-1 ${
                          activeThread.isSolved
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>{activeThread.isSolved ? 'Solved' : 'Mark Solved'}</span>
                      </button>
                    </div>

                    <h2 className="text-lg font-extrabold text-slate-900 leading-snug">{activeThread.title}</h2>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                        {activeThread.authorName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">{activeThread.authorName}</h4>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {activeThread.authorRole} • Posted {activeThread.createdAt}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 font-medium leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100 whitespace-pre-line">
                      {activeThread.content}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {activeThread.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => handleToggleThreadUpvote(activeThread.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                          activeThread.isUpvoted
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Upvote ({activeThread.upvotes})</span>
                      </button>
                    </div>
                  </div>

                  {/* Replies List Header */}
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 mb-4">
                      <MessageCircle className="w-4 h-4 text-indigo-600" />
                      <span>{activeThread.replies.length} Responses & Replies</span>
                    </h3>

                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                      {activeThread.replies.length === 0 ? (
                        <p className="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                          No replies yet. Be the first to answer or share your perspective!
                        </p>
                      ) : (
                        activeThread.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className={`p-4 rounded-2xl border space-y-2 text-xs transition-all ${
                              reply.isInstructor
                                ? 'bg-amber-50/60 border-amber-200 ring-1 ring-amber-300'
                                : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                                    reply.isInstructor
                                      ? 'bg-amber-500 text-white'
                                      : 'bg-indigo-600 text-white'
                                  }`}
                                >
                                  {reply.authorName.charAt(0)}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-extrabold text-slate-900">{reply.authorName}</span>
                                    {reply.isInstructor && (
                                      <span className="bg-amber-400 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                                        Instructor
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400 font-medium">
                                    {reply.authorRole} • {reply.createdAt}
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => handleToggleReplyUpvote(activeThread.id, reply.id)}
                                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                                  reply.isUpvoted
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                                }`}
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span className="font-mono">{reply.upvotes}</span>
                              </button>
                            </div>

                            <p className="text-slate-700 font-medium leading-relaxed pl-9">{reply.content}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Add Reply Input Box */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">Post a Reply</label>
                    <div className="flex gap-2">
                      <textarea
                        value={replyInputText}
                        onChange={(e) => setReplyInputText(e.target.value)}
                        placeholder="Write your answer, legal insight, or statutory reference..."
                        rows={2}
                        className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
                      />
                      <button
                        onClick={() => handleAddReply(activeThread.id)}
                        disabled={!replyInputText.trim()}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-extrabold text-xs rounded-2xl transition-all cursor-pointer flex flex-col items-center justify-center gap-1 shrink-0 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: TOP PERFORMERS LEADERBOARD */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* HERO HEADER */}
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 p-8 sm:p-10 rounded-[32px] border border-indigo-800 text-white space-y-6 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-extrabold text-amber-300">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>eLawyersBD Academy Honor Roll</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Top Performers Leaderboard
                  </h2>
                  <p className="text-sm text-indigo-200 font-medium leading-relaxed">
                    Recognizing excellence among enrolled law students, advocates, and tax practitioners. Earn points by completing course assignments, passing module quizzes, and maintaining high progress!
                  </p>
                </div>

                {/* User Quick Rank Badge */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl space-y-2 text-center shrink-0 min-w-[220px] shadow-lg">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-200 block">Your Current Rank</span>
                  <div className="flex items-center justify-center gap-2">
                    <Medal className="w-7 h-7 text-slate-200" />
                    <span className="text-3xl font-black text-amber-300 font-mono">#2</span>
                    <span className="text-xs font-bold text-slate-200">Silver Leader</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between text-[11px] text-indigo-100 font-mono">
                    <span>11/12 Assignments</span>
                    <span>1,320 XP</span>
                  </div>
                </div>
              </div>

              {/* Filters / Timeframe Row */}
              <div className="pt-4 border-t border-indigo-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setLeaderboardCategory('all')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                      leaderboardCategory === 'all'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 border border-indigo-800'
                    }`}
                  >
                    All Courses
                  </button>
                  <button
                    onClick={() => setLeaderboardCategory('income-tax')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                      leaderboardCategory === 'income-tax'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 border border-indigo-800'
                    }`}
                  >
                    Income Tax Practice
                  </button>
                  <button
                    onClick={() => setLeaderboardCategory('vat')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                      leaderboardCategory === 'vat'
                        ? 'bg-amber-400 text-slate-950 shadow-sm'
                        : 'bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 border border-indigo-800'
                    }`}
                  >
                    VAT & Customs
                  </button>
                </div>

                <div className="flex items-center bg-indigo-950 p-1 rounded-2xl border border-indigo-800 text-xs font-bold shrink-0">
                  <button
                    onClick={() => setLeaderboardPeriod('all')}
                    className={`px-3 py-1 rounded-xl cursor-pointer transition-all ${
                      leaderboardPeriod === 'all' ? 'bg-indigo-600 text-white' : 'text-indigo-300 hover:text-white'
                    }`}
                  >
                    All-Time Honor Roll
                  </button>
                  <button
                    onClick={() => setLeaderboardPeriod('monthly')}
                    className={`px-3 py-1 rounded-xl cursor-pointer transition-all ${
                      leaderboardPeriod === 'monthly' ? 'bg-indigo-600 text-white' : 'text-indigo-300 hover:text-white'
                    }`}
                  >
                    August 2026 Term
                  </button>
                </div>
              </div>
            </div>

            {/* TOP 3 PODIUM DISPLAY */}
            <div className="grid md:grid-cols-3 gap-6 items-end pt-2">
              {/* 2ND PLACE PODIUM */}
              {leaderboardList[1] && (
                <div className="bg-white p-6 rounded-[32px] border-2 border-slate-300 shadow-md space-y-4 text-center relative overflow-hidden order-2 md:order-1">
                  <div className="absolute top-0 right-0 bg-slate-200 text-slate-900 font-extrabold text-[10px] px-3 py-1 rounded-bl-2xl uppercase">
                    2nd Place • Silver
                  </div>
                  <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-800 font-black text-xl flex items-center justify-center mx-auto shadow-inner relative">
                    <Medal className="w-8 h-8 text-slate-600" />
                    <span className="absolute -bottom-2 bg-slate-800 text-white text-[10px] px-2 py-0.2 rounded-full">#2</span>
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center justify-center gap-1.5">
                      <span>{leaderboardList[1].name}</span>
                      <span className="bg-indigo-100 text-indigo-900 text-[9px] font-black px-1.5 py-0.2 rounded-full">YOU</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{leaderboardList[1].designation}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-bold">Assignments</span>
                      <span className="font-extrabold text-slate-900 font-mono">{leaderboardList[1].assignmentsCompleted}/{leaderboardList[1].totalAssignments}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-bold">Progress</span>
                      <span className="font-extrabold text-emerald-700 font-mono">{leaderboardList[1].courseProgress}%</span>
                    </div>
                  </div>
                  <div className="bg-amber-400 text-slate-950 font-black text-sm py-2 rounded-xl shadow-xs">
                    {leaderboardList[1].points} XP Points
                  </div>
                </div>
              )}

              {/* 1ST PLACE GOLD PODIUM */}
              {leaderboardList[0] && (
                <div className="bg-gradient-to-b from-amber-500/10 via-amber-50/50 to-white p-7 rounded-[36px] border-2 border-amber-400 shadow-xl space-y-4 text-center relative overflow-hidden order-1 md:order-2 ring-4 ring-amber-400/20">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-black text-[11px] px-4 py-1 rounded-b-2xl uppercase tracking-wider flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Champion • 1st Place</span>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-amber-100 border-4 border-amber-400 text-amber-900 font-black text-2xl flex items-center justify-center mx-auto shadow-md relative mt-3">
                    <Crown className="w-10 h-10 text-amber-600" />
                    <span className="absolute -bottom-2 bg-amber-500 text-slate-950 font-extrabold text-xs px-2.5 py-0.5 rounded-full shadow-xs">#1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{leaderboardList[0].name}</h3>
                    <p className="text-xs text-amber-900 font-bold truncate mt-0.5">{leaderboardList[0].designation}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-200/60 text-xs">
                    <div className="bg-white/80 p-2 rounded-xl border border-amber-200/60">
                      <span className="text-[10px] text-amber-800 block font-bold">Assignments</span>
                      <span className="font-extrabold text-slate-900 font-mono">{leaderboardList[0].assignmentsCompleted}/{leaderboardList[0].totalAssignments}</span>
                    </div>
                    <div className="bg-white/80 p-2 rounded-xl border border-amber-200/60">
                      <span className="text-[10px] text-amber-800 block font-bold">Progress</span>
                      <span className="font-extrabold text-emerald-700 font-mono">{leaderboardList[0].courseProgress}%</span>
                    </div>
                  </div>
                  <div className="bg-amber-400 text-slate-950 font-black text-base py-2.5 rounded-2xl shadow-md">
                    {leaderboardList[0].points} XP Points 👑
                  </div>
                </div>
              )}

              {/* 3RD PLACE PODIUM */}
              {leaderboardList[2] && (
                <div className="bg-white p-6 rounded-[32px] border-2 border-amber-200 shadow-md space-y-4 text-center relative overflow-hidden order-3">
                  <div className="absolute top-0 right-0 bg-amber-100 text-amber-900 font-extrabold text-[10px] px-3 py-1 rounded-bl-2xl uppercase">
                    3rd Place • Bronze
                  </div>
                  <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-300 text-amber-800 font-black text-xl flex items-center justify-center mx-auto shadow-inner relative">
                    <Medal className="w-8 h-8 text-amber-700" />
                    <span className="absolute -bottom-2 bg-amber-800 text-white text-[10px] px-2 py-0.2 rounded-full">#3</span>
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{leaderboardList[2].name}</h3>
                    <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{leaderboardList[2].designation}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-bold">Assignments</span>
                      <span className="font-extrabold text-slate-900 font-mono">{leaderboardList[2].assignmentsCompleted}/{leaderboardList[2].totalAssignments}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-xl">
                      <span className="text-[10px] text-slate-400 block font-bold">Progress</span>
                      <span className="font-extrabold text-emerald-700 font-mono">{leaderboardList[2].courseProgress}%</span>
                    </div>
                  </div>
                  <div className="bg-amber-100 text-amber-950 font-extrabold text-sm py-2 rounded-xl">
                    {leaderboardList[2].points} XP Points
                  </div>
                </div>
              )}
            </div>

            {/* COMPLETE TOP 5 LEADERBOARD TABLE */}
            <div className="bg-white rounded-[32px] border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-indigo-600" />
                    <span>Top 5 Rankings & Performance Metrics</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Complete list of highest-ranking students sorted by assignment score and course completion rate.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>5 Active Top Performers</span>
                </div>
              </div>

              {/* Table / Cards List */}
              <div className="space-y-3">
                {leaderboardList.slice(0, 5).map((studentEntry) => {
                  const isCurrent = studentEntry.isCurrentUser;

                  return (
                    <div
                      key={studentEntry.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                        isCurrent
                          ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                          : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/60'
                      }`}
                    >
                      {/* Left: Rank & Student Profile Info */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-2xl font-black text-sm flex items-center justify-center shrink-0 border ${
                            studentEntry.rank === 1
                              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-sm'
                              : studentEntry.rank === 2
                              ? 'bg-slate-200 text-slate-950 border-slate-300'
                              : studentEntry.rank === 3
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-white text-slate-700 border-slate-200 font-mono'
                          }`}
                        >
                          {studentEntry.rank === 1 ? '🥇 #1' : studentEntry.rank === 2 ? '🥈 #2' : studentEntry.rank === 3 ? '🥉 #3' : `#${studentEntry.rank}`}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-900 text-sm truncate">{studentEntry.name}</span>
                            {isCurrent && (
                              <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.2 rounded-full uppercase">
                                You
                              </span>
                            )}
                            {studentEntry.trend === 'up' && (
                              <span className="text-emerald-600 font-extrabold text-[10px] flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.2 rounded-md border border-emerald-200">
                                <TrendingUp className="w-3 h-3" />
                                <span>Climbing</span>
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{studentEntry.designation}</p>
                          <p className="text-[10px] text-indigo-600 font-extrabold mt-1 truncate">
                            Top Course: {studentEntry.topCourse}
                          </p>
                        </div>
                      </div>

                      {/* Right: Assignments, Course Progress, Badges & Points */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs shrink-0 lg:w-auto w-full pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-200">
                        {/* Assignments Completed */}
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">Assignments</span>
                          <span className="font-extrabold text-slate-900 font-mono text-sm">
                            {studentEntry.assignmentsCompleted} / {studentEntry.totalAssignments}
                          </span>
                        </div>

                        {/* Course Progress */}
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">Progress</span>
                          <span className="font-extrabold text-emerald-700 font-mono text-sm">
                            {studentEntry.courseProgress}%
                          </span>
                        </div>

                        {/* Badges Earned */}
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                          <span className="text-[10px] text-slate-400 block font-bold uppercase">Badges</span>
                          <span className="font-extrabold text-amber-600 font-mono text-sm flex items-center justify-center gap-1">
                            <Award className="w-3.5 h-3.5 text-amber-500" />
                            <span>{studentEntry.badgesEarned}</span>
                          </span>
                        </div>

                        {/* XP Points */}
                        <div className="bg-amber-400 text-slate-950 p-2.5 rounded-xl text-center font-black shadow-xs">
                          <span className="text-[9px] text-slate-950 block font-extrabold uppercase">Total Score</span>
                          <span className="text-sm font-mono">{studentEntry.points} XP</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HOW LEADERBOARD POINTS ARE CALCULATED CARD */}
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200 space-y-4 shadow-sm">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <span>How Leaderboard Points (XP) are Calculated</span>
              </h3>

              <div className="grid sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-slate-900">+100 XP per Assignment</h4>
                  <p className="text-slate-500 text-[11px] leading-snug">
                    Submit practical tax filings or legal drafting assignments verified by your course instructor.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-slate-900">+50 XP per Module</h4>
                  <p className="text-slate-500 text-[11px] leading-snug">
                    Complete all statutory lecture videos and download reading materials for each course module.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-slate-900">+50 XP per Digital Badge</h4>
                  <p className="text-slate-500 text-[11px] leading-snug">
                    Earn skill achievements such as Income Tax Master or VAT Specialist to boost your ranking.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 font-bold flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-slate-900">+20 XP per Perfect Quiz</h4>
                  <p className="text-slate-500 text-[11px] leading-snug">
                    Achieve 100% score on statutory multiple-choice quizzes and exam practice modules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ACCOUNT & PROFILE & CERTIFICATES */}
        {activeTab === 'account' && (
          <div className="space-y-8">
            {/* Personal Profile Settings Card */}
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-600" />
                    <span>Personal Profile Information</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Manage your display name, designation, and official email for certificates & portal greeting.
                  </p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                  Verified Profile
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Full Student Name *</label>
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) => setStudent({ ...student, name: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                  <p className="text-[10px] text-slate-400">Used for official course certificates and personalized greeting.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Professional Title / Designation *</label>
                  <input
                    type="text"
                    value={student.designation}
                    onChange={(e) => setStudent({ ...student, designation: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                  <p className="text-[10px] text-slate-400">e.g., Legal Practitioner, Tax Consultant, Advocate</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Official Email Address *</label>
                  <input
                    type="email"
                    value={student.email}
                    onChange={(e) => setStudent({ ...student, email: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Phone Number</label>
                  <input
                    type="text"
                    value={student.phone}
                    onChange={(e) => setStudent({ ...student, phone: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Badges Row Showcase in Profile */}
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-600" />
                    <span>My Digital Badges & Medals</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Verified skill badges earned through coursework and assessments.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('badges')}
                  className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-100 cursor-pointer"
                >
                  View All Badges ({unlockedBadgesCount})
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {studentBadges
                  .filter((b) => b.isUnlocked)
                  .slice(0, 4)
                  .map((badge) => (
                    <div
                      key={badge.id}
                      onClick={() => setSelectedDetailBadge(badge)}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2 cursor-pointer hover:bg-indigo-50/50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-white border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto shadow-sm">
                        {renderBadgeIcon(badge.icon, 'w-6 h-6')}
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-900 truncate">{badge.title}</h4>
                      <span className="text-[10px] text-emerald-700 font-extrabold block">Verified Badge</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Certificates Section */}
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                    <span>My Professional Certificates</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Official verified certificates issued upon successful course completion.
                  </p>
                </div>

                <button
                  onClick={onOpenCertVerifier}
                  className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-100 cursor-pointer"
                >
                  Verify Certificate ID
                </button>
              </div>

              <div className="space-y-4">
                {student.certificatesEarned.map((cert) => (
                  <div
                    key={cert.certId}
                    className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-3 py-0.5 rounded-full">
                          OFFICIAL CERTIFICATE
                        </span>
                        <span className="text-xs font-mono text-indigo-600 font-bold">
                          ID: {cert.certId}
                        </span>
                      </div>

                      <h4 className="text-base font-extrabold text-slate-900">{cert.courseTitle}</h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Issued To: <strong className="text-slate-900">{cert.studentName}</strong> • Date: {cert.issueDate}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        Instructor: {cert.instructorName} • Grade: <strong className="text-emerald-700">{cert.grade}</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenCertificateModal(cert)}
                      className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>View & Print Certificate</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <span>Payment History & Official Tax Invoices</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Download verified tax receipts and tuition payment invoices as professional PDFs.
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (student.payments.length > 0) {
                      setSelectedInvoicePayment(student.payments[0]);
                    }
                  }}
                  className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs rounded-xl border border-indigo-100 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Export Latest Invoice (PDF)</span>
                </button>
              </div>

              <div className="space-y-3">
                {student.payments.map((p) => (
                  <div
                    key={p.id}
                    className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-2xs hover:bg-white hover:border-indigo-200 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">{p.courseTitle}</span>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2 py-0.2 rounded-full uppercase">
                          {p.status}
                        </span>
                      </div>
                      <p className="text-slate-500 font-medium flex flex-wrap items-center gap-3 text-[11px]">
                        <span>Invoice No: <strong className="text-slate-800 font-mono">{p.invoiceNo}</strong></span>
                        <span>•</span>
                        <span>Date: <strong className="text-slate-800">{p.date}</strong></span>
                        <span>•</span>
                        <span>Payment: <strong className="text-indigo-700">bKash / Digital Banking</strong></span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                      <div className="text-left sm:text-right">
                        <span className="font-extrabold text-indigo-950 text-base block font-mono">
                          ৳{p.amount.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold block">VAT Included (5%)</span>
                      </div>

                      <button
                        onClick={() => setSelectedInvoicePayment(p)}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                        title="Download receipt as PDF invoice"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Export PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODALS */}
        {/* NOTIFICATION TOAST SYSTEM */}
        <NotificationToastSystem toasts={activeToasts} onDismiss={handleDismissToast} />

        <InvoiceReceiptModal
          payment={selectedInvoicePayment}
          student={student}
          onClose={() => setSelectedInvoicePayment(null)}
        />


        <BadgeDetailModal
          badge={selectedDetailBadge}
          studentName={student.name}
          onClose={() => setSelectedDetailBadge(null)}
        />

        <BadgeUnlockedModal
          badge={newlyUnlockedBadge}
          onClose={() => setNewlyUnlockedBadge(null)}
        />

        {/* FLOATING DOWNLOAD TOAST NOTIFICATION */}
        {downloadToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-white">Lecture Material Downloaded</p>
              <p className="text-[11px] text-slate-300 font-medium truncate max-w-xs">{downloadToast}</p>
            </div>
            <button
              onClick={() => setDownloadToast(null)}
              className="text-slate-400 hover:text-white p-1 cursor-pointer ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* NEW DISCUSSION THREAD MODAL */}
        {newThreadModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] border border-slate-200 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <MessageSquarePlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">Start a New Discussion</h3>
                    <p className="text-xs text-slate-500 font-medium">Post a doubt, case study, or legal query to your enrolled course forum.</p>
                  </div>
                </div>
                <button
                  onClick={() => setNewThreadModalOpen(false)}
                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateNewThread} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Select Course */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Course Forum *</label>
                    <select
                      value={newThreadForm.courseId}
                      onChange={(e) => setNewThreadForm({ ...newThreadForm, courseId: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">Category *</label>
                    <select
                      value={newThreadForm.category}
                      onChange={(e) => setNewThreadForm({ ...newThreadForm, category: e.target.value as any })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Question">Question & Doubts</option>
                      <option value="Case Study">Case Study & Practice</option>
                      <option value="Statutory Update">Statutory Update / SRO</option>
                      <option value="Exam Prep">Exam Prep & Practice</option>
                      <option value="General">General Discussion</option>
                    </select>
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Discussion Title *</label>
                  <input
                    type="text"
                    required
                    value={newThreadForm.title}
                    onChange={(e) => setNewThreadForm({ ...newThreadForm, title: e.target.value })}
                    placeholder="e.g. Clarification on Section 138 of Negotiable Instruments Act..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Question / Body Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={newThreadForm.content}
                    onChange={(e) => setNewThreadForm({ ...newThreadForm, content: e.target.value })}
                    placeholder="Describe your legal question, statutory context, or scenario in detail..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    value={newThreadForm.tagsStr}
                    onChange={(e) => setNewThreadForm({ ...newThreadForm, tagsStr: e.target.value })}
                    placeholder="e.g. IncomeTax2023, eFiling, SRO180"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setNewThreadModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl cursor-pointer shadow-md shadow-indigo-100 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Discussion</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* POMODORO FOCUS TIMER MODAL */}
        {showPomodoroModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-md w-full animate-in zoom-in-95 duration-200">
              <PomodoroTimer onClose={() => setShowPomodoroModal(false)} />
            </div>
          </div>
        )}

        {/* DAILY STUDY STREAK MODAL */}
        {showStreakModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="max-w-lg w-full bg-white rounded-[32px] border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200 relative overflow-hidden">
              {/* Top Accent Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 text-white flex items-center justify-center shadow-md shadow-amber-400/30">
                    <Flame className="w-5 h-5 fill-white text-white animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Daily Study Streak</h3>
                    <p className="text-xs text-slate-500 font-medium">Build learning habits & unlock streak badges</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowStreakModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* STREAK STATUS HERO CARD */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                      ACTIVE STREAK
                    </span>
                    <h4 className="text-3xl font-black text-white flex items-center gap-2">
                      <span>{streakCount} Days</span>
                      <Flame className="w-7 h-7 text-amber-400 fill-amber-400 animate-pulse" />
                    </h4>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-300 block uppercase">Daily Bonus</span>
                    <span className="text-emerald-400 font-black text-base font-mono">+50 PTS</span>
                  </div>
                </div>

                {/* TODAY CHECK-IN ACTION BUTTON */}
                {hasCheckedInToday ? (
                  <div className="bg-emerald-500/20 border border-emerald-400/40 p-3 rounded-xl flex items-center gap-2 text-emerald-300 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Checked in for today! Come back tomorrow to extend your streak.</span>
                  </div>
                ) : (
                  <button
                    onClick={handleDailyCheckIn}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 hover:from-amber-500 hover:to-rose-600 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2"
                  >
                    <Flame className="w-4 h-4 fill-slate-950" />
                    <span>Claim Today's Check-In (+50 PTS)</span>
                  </button>
                )}
              </div>

              {/* 7-DAY WEEKLY CALENDAR STREAK TRACKER */}
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block">
                  Current Week Progress
                </span>
                <div className="grid grid-cols-7 gap-1.5 text-center">
                  {[
                    { day: 'Mon', done: true },
                    { day: 'Tue', done: true },
                    { day: 'Wed', done: true },
                    { day: 'Thu', done: true },
                    { day: 'Fri', done: hasCheckedInToday, isToday: true },
                    { day: 'Sat', done: false },
                    { day: 'Sun', done: false },
                  ].map((d, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-xl border text-xs flex flex-col items-center gap-1 ${
                        d.isToday
                          ? 'bg-amber-50 border-amber-400 text-amber-950 font-black ring-2 ring-amber-400/30'
                          : d.done
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-400 font-medium'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold">{d.day}</span>
                      {d.done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* STREAK REWARDS & BADGES MILESTONE */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider block">
                  Consistency Rewards & Badges
                </span>

                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-bold">
                        <Flame className="w-4 h-4 text-amber-600 fill-amber-600" />
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 block">Consistency Champion</span>
                        <span className="text-[10px] text-slate-500">Reach 5-Day Consecutive Streak</span>
                      </div>
                    </div>
                    {streakCount >= 5 ? (
                      <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                        Unlocked (+200 PTS)
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold font-mono">
                        {streakCount}/5 Days
                      </span>
                    )}
                  </div>

                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-900 border border-indigo-300 flex items-center justify-center font-bold">
                        <Trophy className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 block">14-Day Tax Scholar</span>
                        <span className="text-[10px] text-slate-500">Maintain 14-Day Active Streak</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold font-mono">
                      {streakCount}/14 Days
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowStreakModal(false)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-2xl transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
