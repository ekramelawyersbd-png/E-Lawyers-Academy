import React, { useState } from 'react';
import { Course } from '../types';
import {
  Briefcase,
  Compass,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  DollarSign,
  Clock,
  TrendingUp,
  ShieldCheck,
  Building2,
  Scale,
  GraduationCap,
  ChevronRight,
  FileText,
  Target,
  Zap,
  Check,
} from 'lucide-react';

import { CareerRoadmapVisualizer } from './CareerRoadmapVisualizer';

export interface CareerMilestone {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  recommendedCourseIds: string[];
  recommendedCourseTitles: string[];
  skillsAcquired: string[];
  statutoryFocus: string;
  estimatedDuration: string;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export interface CareerPath {
  id: string;
  title: string;
  roleType: 'Taxation' | 'VAT' | 'Legal' | 'Corporate';
  iconName: 'tax' | 'vat' | 'legal' | 'corporate';
  salaryRange: string;
  demandRating: string;
  estimatedTimeToGoal: string;
  summary: string;
  keyResponsibility: string;
  milestones: CareerMilestone[];
}

const CAREER_PATHS: CareerPath[] = [
  {
    id: 'path-tax-consultant',
    title: 'Certified Income Tax Practitioner (ITP)',
    roleType: 'Taxation',
    iconName: 'tax',
    salaryRange: '৳ 8,00,000 - ৳ 25,00,000 / yr',
    demandRating: '🔥 Very High (NBR Licensed)',
    estimatedTimeToGoal: '4 to 6 Months',
    summary: 'Master personal & corporate tax return filings, statutory tax exemptions, wealth statements, and NBR e-Filing representation.',
    keyResponsibility: 'Represent corporate clients and high-net-worth individuals before Taxes Zones, handle assessment hearings under Section 180.',
    milestones: [
      {
        stepNumber: 1,
        title: 'Personal Tax Assessment & E-Filing Mastery',
        subtitle: 'Foundation Level',
        description: 'Understand salary income, house property, investment rebate formulas, and individual wealth statement preparation.',
        recommendedCourseIds: ['course-1'],
        recommendedCourseTitles: ['Personal Income Tax & E-Return Masterclass'],
        skillsAcquired: ['NBR E-Filing Portal', 'Investment Rebates', 'Section 166 Returns'],
        statutoryFocus: 'Income Tax Act 2023 - Sections 1 to 75',
        estimatedDuration: '4 Weeks',
        isUnlocked: true,
        isCompleted: true,
      },
      {
        stepNumber: 2,
        title: 'Corporate Tax Computation & Minimum Tax',
        subtitle: 'Intermediate Practitioner',
        description: 'Master allowable business deductions, disallowance rules under Section 55, depreciation schedules, and corporate tax returns.',
        recommendedCourseIds: ['course-3'],
        recommendedCourseTitles: ['Corporate Tax & Assessment Procedure'],
        skillsAcquired: ['Corporate Tax Returns', 'Section 55 Disallowances', 'Minimum Tax (Sec 163)'],
        statutoryFocus: 'Income Tax Act 2023 - Corporate Rates & Schedules',
        estimatedDuration: '6 Weeks',
        isUnlocked: true,
        isCompleted: false,
      },
      {
        stepNumber: 3,
        title: 'Tax Assessment Hearings & DCT Defense',
        subtitle: 'Advanced Advocate Level',
        description: 'Prepare written arguments for DCT audit hearings, draft responses to Section 93 notice, and handle penalty proceedings.',
        recommendedCourseIds: ['course-3', 'course-4'],
        recommendedCourseTitles: ['Corporate Tax & Assessment Procedure', 'Legal Drafting for Tax Practitioners'],
        skillsAcquired: ['Notice Defense', 'Hearing Representation', 'Penalty Mitigation'],
        statutoryFocus: 'Tax Assessment & Audit Chapter - Sections 170 to 195',
        estimatedDuration: '6 Weeks',
        isUnlocked: false,
        isCompleted: false,
      },
      {
        stepNumber: 4,
        title: 'Taxes Appellate Tribunal & High Court Appeals',
        subtitle: 'Expert Consultant',
        description: 'Master memorandum of appeal drafting, Stay of Demand petitions, and Appellate Tribunal representation.',
        recommendedCourseIds: ['course-4'],
        recommendedCourseTitles: ['Legal Drafting for Tax Practitioners'],
        skillsAcquired: ['Appellate Tribunal Petitions', 'Stay Applications', 'Writ Petitions'],
        statutoryFocus: 'Appeals & Revisions - Sections 280 to 320',
        estimatedDuration: '8 Weeks',
        isUnlocked: false,
        isCompleted: false,
      },
    ],
  },
  {
    id: 'path-vat-specialist',
    title: 'Corporate VAT & Tax Compliance Director',
    roleType: 'VAT',
    iconName: 'vat',
    salaryRange: '৳ 12,00,000 - ৳ 35,00,000 / yr',
    demandRating: '⚡ High Demand in MNCs & FMCGs',
    estimatedTimeToGoal: '5 to 7 Months',
    summary: 'Lead enterprise VAT compliance, input-output coefficient declarations (Mushak 4.3), VDS withholdings, and VAT audit audits.',
    keyResponsibility: 'Manage monthly Mushak 9.1 return filings, input tax credit claims, and defend company against VAT evasion allegations.',
    milestones: [
      {
        stepNumber: 1,
        title: 'VAT & SD Act 2012 Core Principles',
        subtitle: 'Compliance Associate',
        description: 'Learn VAT registration thresholds, Mushak 6.3 tax invoices, standard vs reduced rates, and SRO exemptions.',
        recommendedCourseIds: ['course-2'],
        recommendedCourseTitles: ['VAT & Tax Compliance Professional Training'],
        skillsAcquired: ['Mushak 6.3 Invoicing', 'VDS Withholding', 'SRO Analysis'],
        statutoryFocus: 'VAT & SD Act 2012 - Sections 1 to 40',
        estimatedDuration: '4 Weeks',
        isUnlocked: true,
        isCompleted: false,
      },
      {
        stepNumber: 2,
        title: 'Mushak 9.1 Return Filing & Treasury Reconciliations',
        subtitle: 'VAT Manager Level',
        description: 'Execute monthly Mushak 9.1 filing, input tax credit claims, AT & AIT adjustments, and Treasury Chalan matching.',
        recommendedCourseIds: ['course-2'],
        recommendedCourseTitles: ['VAT & Tax Compliance Professional Training'],
        skillsAcquired: ['Mushak 9.1 Return', 'Input Tax Reconciliation', 'Treasury Payments'],
        statutoryFocus: 'VAT Rules 2016 - Return Filing & Rebate Rules',
        estimatedDuration: '6 Weeks',
        isUnlocked: false,
        isCompleted: false,
      },
      {
        stepNumber: 3,
        title: 'Mushak 4.3 Input-Output Price Declaration',
        subtitle: 'Enterprise Cost Specialist',
        description: 'Draft and submit factory raw material consumption formulas (Mushak 4.3) to VAT Divisional Officer.',
        recommendedCourseIds: ['course-2', 'course-3'],
        recommendedCourseTitles: ['VAT & Tax Compliance Professional Training', 'Corporate Tax & Assessment Procedure'],
        skillsAcquired: ['Mushak 4.3 Declaration', 'Raw Material Costing', 'VAT Audit Defense'],
        statutoryFocus: 'Section 46 Input Tax Credit & Declared Ratios',
        estimatedDuration: '5 Weeks',
        isUnlocked: false,
        isCompleted: false,
      },
    ],
  },
  {
    id: 'path-legal-advisor',
    title: 'Corporate Lawyer & Supreme Court Advisor',
    roleType: 'Legal',
    iconName: 'legal',
    salaryRange: '৳ 15,00,000 - ৳ 50,00,000 / yr',
    demandRating: '💎 Prestige Corporate & Court Practice',
    estimatedTimeToGoal: '6 to 8 Months',
    summary: 'Master statutory interpretation, High Court Writ petitions, commercial contract drafting, and revenue dispute litigation.',
    keyResponsibility: 'Advise multinational boards on legal risks, draft High Court pleadings, and represent clients in tax arbitration.',
    milestones: [
      {
        stepNumber: 1,
        title: 'Legal Drafting & Pleadings Fundamentals',
        subtitle: 'Associate Counsel',
        description: 'Draft flawless notices of demand, legal opinions, commercial agreements, and formal response letters.',
        recommendedCourseIds: ['course-4'],
        recommendedCourseTitles: ['Legal Drafting for Tax Practitioners'],
        skillsAcquired: ['Contract Drafting', 'Statutory Notices', 'Legal Opinion Writing'],
        statutoryFocus: 'Code of Civil Procedure & Specific Relief Act',
        estimatedDuration: '5 Weeks',
        isUnlocked: true,
        isCompleted: false,
      },
      {
        stepNumber: 2,
        title: 'Taxation & Regulatory Disputes',
        subtitle: 'Senior Litigation Associate',
        description: 'Handle statutory appeals under Income Tax Act and VAT Act, draft Tribunal grounds of appeal and stay motions.',
        recommendedCourseIds: ['course-3', 'course-4'],
        recommendedCourseTitles: ['Corporate Tax & Assessment Procedure', 'Legal Drafting for Tax Practitioners'],
        skillsAcquired: ['Appellate Grounds', 'Statutory Stays', 'Hearing Briefs'],
        statutoryFocus: 'Tribunal Practice Rules & Evidence Act',
        estimatedDuration: '7 Weeks',
        isUnlocked: false,
        isCompleted: false,
      },
      {
        stepNumber: 3,
        title: 'High Court Writ Jurisdiction & Constitutional Remedies',
        subtitle: 'Supreme Court Partner / Advisor',
        description: 'Prepare Article 102 Writ Petitions against ultra vires NBR notices, illegal tax seizures, and unconstitutional demands.',
        recommendedCourseIds: ['course-4'],
        recommendedCourseTitles: ['Legal Drafting for Tax Practitioners'],
        skillsAcquired: ['Article 102 Writs', 'Constitutional Law', 'High Court Bench Filings'],
        statutoryFocus: 'Constitution of Bangladesh - Writs & Tax Remedies',
        estimatedDuration: '8 Weeks',
        isUnlocked: false,
        isCompleted: false,
      },
    ],
  },
];

interface CareerPathBuilderProps {
  courses?: Course[];
}

export const CareerPathBuilder: React.FC<CareerPathBuilderProps> = ({ courses = [] }) => {
  const [selectedPathId, setSelectedPathId] = useState<string>('path-tax-consultant');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activePath = CAREER_PATHS.find((p) => p.id === selectedPathId) || CAREER_PATHS[0];

  // Calculate Overall Path Completion Progress
  const completedMilestones = activePath.milestones.filter((m) => m.isCompleted).length;
  const pathProgressPercent = Math.round((completedMilestones / activePath.milestones.length) * 100);

  const handleEnrollInPath = () => {
    showToast(`🎯 Enrolled in Career Goal: "${activePath.title}". Path milestones added to your study schedule!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
      case 'Taxation':
        return <Building2 className="w-5 h-5 text-amber-400" />;
      case 'VAT':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'Legal':
        return <Scale className="w-5 h-5 text-indigo-400" />;
      default:
        return <Briefcase className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-[32px] border border-indigo-900 text-white relative overflow-hidden shadow-xl space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-extrabold text-amber-300">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Interactive Professional Roadmap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Career Path Builder
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium leading-relaxed">
              Select your career goal (Income Tax Practitioner, VAT Compliance Director, or High Court Advisor) to visualize the step-by-step course sequence, statutory competencies, and target salary scale.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleEnrollInPath}
              className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-2xl transition-all cursor-pointer shadow-md shadow-amber-400/20 flex items-center justify-center gap-2"
            >
              <Target className="w-4 h-4 text-slate-950" />
              <span>Set as Active Career Goal</span>
            </button>
          </div>
        </div>

        {/* ACTIVE GOAL METRICS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-indigo-900/80 text-xs">
          <div className="bg-indigo-950/70 p-3.5 rounded-2xl border border-indigo-900">
            <span className="text-[10px] text-indigo-300 font-bold uppercase block">Market Valuation</span>
            <span className="font-extrabold text-amber-300 text-sm font-mono block mt-0.5">
              {activePath.salaryRange}
            </span>
          </div>

          <div className="bg-indigo-950/70 p-3.5 rounded-2xl border border-indigo-900">
            <span className="text-[10px] text-indigo-300 font-bold uppercase block">Market Demand</span>
            <span className="font-extrabold text-emerald-400 text-xs block mt-0.5">
              {activePath.demandRating}
            </span>
          </div>

          <div className="bg-indigo-950/70 p-3.5 rounded-2xl border border-indigo-900">
            <span className="text-[10px] text-indigo-300 font-bold uppercase block">Timeline to Completion</span>
            <span className="font-extrabold text-white text-xs font-mono block mt-0.5">
              {activePath.estimatedTimeToGoal}
            </span>
          </div>

          <div className="bg-indigo-950/70 p-3.5 rounded-2xl border border-indigo-900 space-y-1">
            <div className="flex justify-between font-bold text-[10px]">
              <span className="text-indigo-300">Milestone Progress</span>
              <span className="text-amber-300 font-mono">{pathProgressPercent}%</span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-indigo-900">
              <div
                className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${pathProgressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CAREER PATH SELECTOR TABS */}
      <div className="grid md:grid-cols-3 gap-4">
        {CAREER_PATHS.map((path) => {
          const isSelected = path.id === selectedPathId;

          return (
            <button
              key={path.id}
              onClick={() => setSelectedPathId(path.id)}
              className={`p-5 rounded-[28px] border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-900 text-white border-amber-400/80 shadow-lg ring-2 ring-amber-400/30'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-300 hover:shadow-sm'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-2xl border ${isSelected ? 'bg-indigo-900/60 border-indigo-700' : 'bg-indigo-50 border-indigo-100'}`}>
                    {getRoleIcon(path.roleType)}
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'}`}>
                    {path.roleType}
                  </span>
                </div>

                <h3 className="text-sm font-black leading-snug">{path.title}</h3>
                <p className={`text-[11px] font-medium line-clamp-2 ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {path.summary}
                </p>
              </div>

              <div className={`pt-3 border-t text-[11px] font-mono font-bold flex items-center justify-between ${isSelected ? 'border-indigo-800 text-amber-300' : 'border-slate-100 text-indigo-600'}`}>
                <span>{path.milestones.length} Step Sequence</span>
                <span className="flex items-center gap-1">
                  <span>View Roadmap</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* VISUAL MILESTONE ROADMAP STEP-BY-STEP */}
      <div className="bg-white rounded-[32px] border border-slate-200 p-6 sm:p-8 space-y-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Goal Sequencing Roadmap</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              {activePath.title} Progression
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Complete each level in order to unlock advanced statutory defense, tribunal petitions, and board advisory skills.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-xs font-extrabold text-amber-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Key Practice: {activePath.keyResponsibility.substring(0, 50)}...</span>
          </div>
        </div>
        
        {/* INTERACTIVE D3 VISUAL ROADMAP */}
        <div className="pt-2 pb-6">
          <CareerRoadmapVisualizer activePath={activePath} />
        </div>

        {/* SEQUENTIAL STEPS NODE TRACK */}
        <div className="relative space-y-8 before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-1 before:bg-indigo-100 before:-z-0">
          {activePath.milestones.map((milestone, idx) => (
            <div key={milestone.stepNumber} className="relative z-10 flex items-start gap-4 sm:gap-6 group">
              {/* Node Icon Badge */}
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 border-2 transition-all shadow-md ${
                  milestone.isCompleted
                    ? 'bg-emerald-500 text-white border-emerald-400'
                    : milestone.isUnlocked
                    ? 'bg-slate-900 text-amber-300 border-amber-400'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}
              >
                {milestone.isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                ) : milestone.isUnlocked ? (
                  <span>STEP {milestone.stepNumber}</span>
                ) : (
                  <Lock className="w-5 h-5 text-slate-400" />
                )}
              </div>

              {/* Milestone Card Content */}
              <div
                className={`flex-1 rounded-[28px] border p-5 sm:p-6 space-y-4 transition-all ${
                  milestone.isUnlocked
                    ? 'bg-white border-slate-200 shadow-sm hover:border-indigo-300'
                    : 'bg-slate-50/80 border-slate-200 opacity-75'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                        {milestone.subtitle}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Est. {milestone.estimatedDuration}</span>
                    </div>
                    <h4 className="text-base font-black text-slate-900 mt-1">{milestone.title}</h4>
                  </div>

                  {milestone.isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Level Mastered</span>
                    </span>
                  ) : milestone.isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-xs font-black text-amber-950 bg-amber-400 px-3 py-1 rounded-full shadow-xs">
                      <Zap className="w-3.5 h-3.5 text-slate-950" />
                      <span>Ready to Start</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-500 bg-slate-200 px-3 py-1 rounded-full">
                      <Lock className="w-3 h-3 text-slate-500" />
                      <span>Prerequisite Locked</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">{milestone.description}</p>

                {/* Statutory Focus & Skills Chips */}
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-indigo-50/80 rounded-2xl border border-indigo-100 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-indigo-600 block">
                      📜 Statutory Focus
                    </span>
                    <span className="font-bold text-slate-900 text-[11px] block">{milestone.statutoryFocus}</span>
                  </div>

                  <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-100 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-amber-800 block">
                      🛠️ Practical Competencies
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {milestone.skillsAcquired.map((skill) => (
                        <span key={skill} className="bg-white text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recommended Enrolled Courses */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Mapped Course: {milestone.recommendedCourseTitles.join(', ')}</span>
                  </div>

                  <button
                    onClick={() =>
                      showToast(
                        `Added "${milestone.recommendedCourseTitles[0]}" modules to your Weekly Study Planner!`
                      )
                    }
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl cursor-pointer transition-colors flex items-center gap-1.5 shrink-0 self-end sm:self-auto"
                  >
                    <span>View Course Modules</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400/40 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-300">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
