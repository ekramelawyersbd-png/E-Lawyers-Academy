export interface Module {
  id: string;
  number: number;
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  title: string;
  category: 'Taxation' | 'VAT' | 'Corporate' | 'Drafting';
  badge?: string;
  overview: string;
  whatYouWillLearn: string[];
  courseIncludes: string[];
  modules: Module[];
  price: number;
  originalPrice: number;
  duration: string;
  totalClasses: number;
  level: string;
  rating: number;
  enrolledStudents: number;
  instructorName: string;
  instructorRole: string;
  image: string;
}

export interface LiveClass {
  id: string;
  courseTitle: string;
  topic: string;
  date: string;
  time: string;
  instructor: string;
  meetingUrl?: string;
  status: 'Upcoming' | 'Live Now' | 'Completed';
  attendeesCount: number;
}

export interface RecordedClass {
  id: string;
  sessionTitle: string;
  courseTitle: string;
  duration: string;
  status: 'Completed' | 'In Progress';
  videoUrl: string;
  isIframe?: boolean;
  resources: { name: string; url: string; size: string }[];
  dateUploaded: string;
  moduleNumber: number;
}

export interface Instructor {
  id: string;
  isTopRated?: boolean;
  category?: 'Legal' | 'Tax' | 'Business' | 'Other';
  linkedInUrl?: string;
  name: string;
  designation: string;
  experience: string;
  specialization: string;
  image: string;
  bio: string;
  rating: number;
  ratingDistribution?: { 5: number; 4: number; 3: number; 2: number; 1: number };
  studentsTaught: number;
  coursesCount: number;
  certifications?: string[];
  coursesLed?: string[];
  fullBackground?: string[];
  notablePublications?: string[];
  teachingPhilosophy?: string;
  followersCount?: number;
  awardsAndRecognitions?: {
    id: string;
    title: string;
    icon: 'Trophy' | 'Award' | 'Star' | 'Crown' | 'ShieldCheck' | 'Medal';
    color: 'amber' | 'indigo' | 'emerald' | 'rose' | 'blue' | 'purple';
  }[];
  socials?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
    email?: string;
  };
  upcomingClasses?: {
    id: string;
    title: string;
    date: string;
    time: string;
    topic: string;
    mode: 'Live Zoom' | 'NBR Portal Lab' | 'Interactive Workshop';
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  company?: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CertificateData {
  certId: string;
  studentName: string;
  courseTitle: string;
  issueDate: string;
  instructorName: string;
  grade: string;
  verificationUrl: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  category: string;
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
  isLiked?: boolean;
}

export interface DigitalBadge {
  id: string;
  title: string;
  description: string;
  category: 'Module' | 'Quiz' | 'Course' | 'Milestone';
  icon: 'Award' | 'CheckCircle2' | 'Zap' | 'Flame' | 'GraduationCap' | 'ShieldCheck' | 'BookOpen' | 'Star' | 'Trophy' | 'Sparkles' | 'Target' | 'Crown';
  earnedAt?: string;
  isUnlocked: boolean;
  criteria: string;
  color: 'indigo' | 'amber' | 'emerald' | 'rose' | 'blue' | 'purple';
  points: number;
  skillsUnlocked?: string[];
}

export interface StudentProfile {
  name: string;
  email: string;
  phone: string;
  designation: string;
  enrolledCourses: string[];
  courseProgress: Record<string, number>; // courseId -> percentage
  completedClassesCount: number;
  totalHoursWatched: number;
  certificatesEarned: CertificateData[];
  payments: { id: string; date: string; amount: number; courseTitle: string; status: string; invoiceNo: string }[];
  badges?: DigitalBadge[];
  totalBadgePoints?: number;
}

export interface ForumReply {
  id: string;
  threadId: string;
  authorName: string;
  authorRole: 'Student' | 'Instructor' | 'Tax Specialist' | 'Admin';
  authorAvatar?: string;
  isInstructor: boolean;
  content: string;
  createdAt: string;
  upvotes: number;
  isUpvoted?: boolean;
}

export interface ForumThread {
  id: string;
  courseId: string;
  courseTitle: string;
  category: 'Question' | 'Case Study' | 'Statutory Update' | 'Exam Prep' | 'General';
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  createdAt: string;
  upvotes: number;
  isUpvoted?: boolean;
  isPinned?: boolean;
  isSolved?: boolean;
  tags: string[];
  replies: ForumReply[];
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  designation: string;
  avatarUrl?: string;
  assignmentsCompleted: number;
  totalAssignments: number;
  courseProgress: number; // overall percentage
  badgesEarned: number;
  points: number;
  isCurrentUser?: boolean;
  trend?: 'up' | 'down' | 'same';
  topCourse?: string;
}

export interface ToastNotification {
  id: string;
  type: 'quiz_complete' | 'module_complete' | 'badge_earned' | 'streak_checkin' | 'info';
  title: string;
  message: string;
  points?: number;
  badgeIcon?: string;
  actionLabel?: string;
  onAction?: () => void;
  timestamp?: number;
}


