import React, { useState } from 'react';
import { INSTRUCTORS_DATA } from '../data/instructorsData';
import { Instructor } from '../types';
import {
  Award,
  Star,
  Users,
  CheckCircle2,
  X,
  Briefcase,
  BookOpen,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  Lightbulb,
  Calendar,
  Clock,
  Video,
  Sparkles,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Search,
  Camera,
  Share2,
  MessageSquare,
  Trophy,
  Crown,
  Medal,
  Scale
} from 'lucide-react';

import { RatingDistributionChart } from './RatingDistributionChart';

interface InstructorsSectionProps {
  onSelectCourseByTitle?: (title: string) => void;
}

const getBadgeIcon = (iconName: string) => {
  switch (iconName) {
    case 'Trophy': return Trophy;
    case 'Award': return Award;
    case 'Star': return Star;
    case 'Crown': return Crown;
    case 'ShieldCheck': return ShieldCheck;
    case 'Medal': return Medal;
    default: return Award;
  }
};

const getBadgeColorClasses = (color: string) => {
  switch (color) {
    case 'amber': return 'bg-amber-50 text-amber-600 border-amber-200';
    case 'indigo': return 'bg-indigo-50 text-indigo-600 border-indigo-200';
    case 'emerald': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
    case 'rose': return 'bg-rose-50 text-rose-600 border-rose-200';
    case 'blue': return 'bg-blue-50 text-blue-600 border-blue-200';
    case 'purple': return 'bg-purple-50 text-purple-600 border-purple-200';
    default: return 'bg-slate-50 text-slate-600 border-slate-200';
  }
};

export const InstructorsSection: React.FC<InstructorsSectionProps> = ({ onSelectCourseByTitle }) => {
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [bookingInstructor, setBookingInstructor] = useState<Instructor | null>(null);
  const [shareInstructor, setShareInstructor] = useState<Instructor | null>(null);
  const [messageInstructor, setMessageInstructor] = useState<Instructor | null>(null);
  const [selectedForComparison, setSelectedForComparison] = useState<Instructor[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [instructorsList, setInstructorsList] = useState<Instructor[]>(INSTRUCTORS_DATA);

  const toggleComparison = (instructor: Instructor) => {
    setSelectedForComparison(prev => {
      const exists = prev.find(i => i.id === instructor.id);
      if (exists) {
        return prev.filter(i => i.id !== instructor.id);
      }
      if (prev.length < 2) {
        return [...prev, instructor];
      }
      return prev;
    });
  };

  const handlePhotoUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInstructorsList((prev) =>
          prev.map((inst) =>
            inst.id === id ? { ...inst, image: reader.result as string } : inst
          )
        );
        // Also update selectedInstructor if it's currently open
        if (selectedInstructor?.id === id) {
          setSelectedInstructor((prev) => (prev ? { ...prev, image: reader.result as string } : null));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filters = ['All', 'Legal', 'Tax', 'Business'];

  const filteredInstructors = instructorsList.filter((inst) => {
    const matchesFilter = activeFilter === 'All' || inst.category === activeFilter;
    const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="instructors" className="py-12 lg:py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3.5">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-indigo-50 text-indigo-800 text-[11px] font-black rounded-full uppercase tracking-widest border border-indigo-200/80 shadow-2xs">
            <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>Senior Faculty Members</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            Learn From <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Supreme Court Practitioners</span>
          </h2>
          <p className="text-slate-700 text-base font-medium leading-relaxed">
            Our faculty members are practicing advocates, senior tax lawyers, and chartered secretaries who bring frontline legal field expertise to every module.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col items-center justify-center gap-6 mb-10 max-w-2xl mx-auto">
          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search instructors by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm shadow-sm"
            />
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center justify-center p-1.5 bg-slate-200/50 rounded-2xl w-fit mx-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeFilter === filter
                    ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Instructors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredInstructors.map((inst) => (
            <div
              key={inst.id}
              className="relative bg-white rounded-[32px] border border-slate-200 hover:border-indigo-200 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg p-6 sm:p-8 flex flex-col justify-between shadow-sm group text-center space-y-4"
            >
              <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none z-10">
                {(inst.rating >= 4.9 || (inst.certifications && inst.certifications.length > 0)) ? (
                  <div className="bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg border border-indigo-200 flex items-center gap-1 shadow-sm">
                    <Award className="w-3 h-3" />
                    Awarded
                  </div>
                ) : <div />}
                
                <div className="flex items-center gap-2 pointer-events-auto">
                  <label
                    onClick={(e) => e.stopPropagation()}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg backdrop-blur-sm border shadow-sm transition-all cursor-pointer ${
                      selectedForComparison.find(i => i.id === inst.id) 
                        ? 'bg-indigo-50 border-indigo-200'
                        : 'bg-white/80 hover:bg-white border-slate-200'
                    } ${(selectedForComparison.length >= 2 && !selectedForComparison.find(i => i.id === inst.id)) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={selectedForComparison.find(i => i.id === inst.id) ? "Remove from comparison" : "Select for comparison"}
                  >
                    <input
                      type="checkbox"
                      checked={!!selectedForComparison.find(i => i.id === inst.id)}
                      onChange={() => toggleComparison(inst)}
                      disabled={selectedForComparison.length >= 2 && !selectedForComparison.find(i => i.id === inst.id)}
                      className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider hidden sm:inline-block">
                      Compare
                    </span>
                  </label>
                  <button
                    onClick={() => setShareInstructor(inst)}
                    className="p-1.5 bg-white/80 hover:bg-white text-slate-600 hover:text-indigo-600 rounded-lg backdrop-blur-sm border border-slate-200 shadow-sm transition-all cursor-pointer"
                    title="Share Profile"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  {inst.isTopRated && (
                    <div className="bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg border border-amber-200 flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3" fill="currentColor" />
                      Expert
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                {/* Avatar */}
                <div className="relative w-24 h-24 mx-auto">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-indigo-100 p-1 bg-indigo-50 shadow-sm">
                    <img
                      src={inst.image}
                      alt={inst.name}
                      className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <label 
                    htmlFor={`photo-upload-${inst.id}`} 
                    className="absolute bottom-0 right-0 p-1.5 bg-white border border-slate-200 rounded-full shadow-md cursor-pointer hover:bg-indigo-50 transition-colors z-10"
                    title="Update Profile Picture"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Camera className="w-3.5 h-3.5 text-indigo-600" />
                    <input 
                      id={`photo-upload-${inst.id}`} 
                      type="file" 
                      accept="image/*" 
                      capture="environment" 
                      className="hidden" 
                      onChange={(e) => handlePhotoUpload(inst.id, e)} 
                    />
                  </label>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center justify-center gap-1.5">
                    {inst.name}
                    {inst.linkedInUrl && (
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <a href={inst.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-[#0a66c2] hover:text-[#004182] transition-colors flex items-center" title="LinkedIn Profile">
                          <Linkedin className="w-4 h-4" />
                        </a>
                        {inst.followersCount && (
                          <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200" title={`${inst.followersCount.toLocaleString()} Followers`}>
                            {inst.followersCount >= 1000 ? `${(inst.followersCount / 1000).toFixed(1)}k` : inst.followersCount}
                          </span>
                        )}
                      </div>
                    )}
                  </h3>
                  <p className="text-xs text-indigo-600 font-bold mt-0.5">{inst.designation}</p>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-extrabold uppercase">Experience</span>
                    <strong className="text-slate-900 font-mono">{inst.experience}</strong>
                  </div>
                  <div className="w-px h-6 bg-slate-200" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-extrabold uppercase">Courses</span>
                    <strong className="text-indigo-600 font-mono flex items-center justify-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> {inst.coursesCount}
                    </strong>
                  </div>
                  <div className="w-px h-6 bg-slate-200" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-extrabold uppercase">Rating</span>
                    <strong className="text-amber-500 font-mono flex items-center justify-center gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {inst.rating}
                    </strong>
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {inst.specialization}
                </p>

                {inst.awardsAndRecognitions && inst.awardsAndRecognitions.length > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                    {inst.awardsAndRecognitions.map((award) => {
                      const Icon = getBadgeIcon(award.icon);
                      const colorClasses = getBadgeColorClasses(award.color);
                      return (
                        <div
                          key={award.id}
                          className={`flex items-center gap-1 px-2 py-1 rounded-md border ${colorClasses} shadow-sm`}
                          title={award.title}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold whitespace-nowrap">{award.title}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {inst.ratingDistribution && (
                  <RatingDistributionChart distribution={inst.ratingDistribution} />
                )}

                {/* Social media links preview */}
                {inst.socials && (
                  <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-100 mt-4">
                    {inst.socials.linkedin && (
                      <a
                        href={inst.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-50 hover:bg-[#0a66c2]/10 text-slate-400 hover:text-[#0a66c2] rounded-full transition-all duration-300 hover:scale-110"
                        title="Connect on LinkedIn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="w-4 h-4" fill="currentColor" />
                      </a>
                    )}
                    {inst.socials.twitter && (
                      <a
                        href={inst.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-50 hover:bg-slate-200 text-slate-400 hover:text-slate-900 rounded-full transition-all duration-300 hover:scale-110"
                        title="Twitter / X Profile"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {inst.socials.website && (
                      <a
                        href={inst.socials.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-50 hover:bg-indigo-100 text-slate-400 hover:text-indigo-600 rounded-full transition-all duration-300 hover:scale-110"
                        title="Faculty Webpage"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                    {inst.socials.email && (
                      <a
                        href={`mailto:${inst.socials.email}`}
                        className="p-2 bg-slate-50 hover:bg-amber-100 text-slate-400 hover:text-amber-600 rounded-full transition-all duration-300 hover:scale-110"
                        title="Direct Email"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <button
                  onClick={() => setBookingInstructor(inst)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book 1-on-1</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMessageInstructor(inst)}
                    className="flex-1 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-extrabold rounded-xl transition-all cursor-pointer border border-slate-200 flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                    <span>Message</span>
                  </button>
                  <button
                    onClick={() => setSelectedInstructor(inst)}
                    className="flex-1 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-extrabold rounded-xl transition-all cursor-pointer border border-indigo-100 flex items-center justify-center gap-1.5"
                  >
                    <span>Expand Bio</span>
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Profile Modal */}
      {selectedInstructor && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-[32px] max-w-2xl w-full text-slate-900 shadow-2xl overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <button
                onClick={() => setSelectedInstructor(null)}
                className="absolute top-5 right-5 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
                <img
                  src={selectedInstructor.image}
                  alt={selectedInstructor.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-indigo-400/30 shadow-xl shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    <UserCheck className="w-3 h-3 text-amber-400" />
                    <span>Verified Supreme Court Faculty</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white">{selectedInstructor.name}</h3>
                  <p className="text-xs sm:text-sm font-bold text-indigo-300">{selectedInstructor.designation}</p>

                  <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs">
                    <span className="bg-white/10 text-slate-200 px-3 py-1 rounded-xl border border-white/10 font-medium">
                      🎯 <strong className="text-white font-bold">{selectedInstructor.experience}</strong> Practice
                    </span>
                    <span className="bg-amber-400/20 text-amber-300 px-3 py-1 rounded-xl border border-amber-400/30 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{selectedInstructor.rating} Rating</span>
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-xl border border-emerald-400/30 font-bold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{selectedInstructor.studentsTaught.toLocaleString()}+ Trained</span>
                    </span>
                  </div>

                  {/* Social Profiles Connect Strip */}
                  {selectedInstructor.socials && (
                    <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="text-[10px] font-extrabold uppercase text-indigo-300 tracking-wider mr-1">Connect:</span>
                      {selectedInstructor.socials.linkedin && (
                        <a
                          href={selectedInstructor.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-white/10 hover:bg-sky-600 text-white rounded-lg transition-all text-xs font-bold border border-white/10 flex items-center gap-1.5 shadow-xs"
                          title="Connect on LinkedIn"
                        >
                          <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {selectedInstructor.socials.twitter && (
                        <a
                          href={selectedInstructor.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-white/10 hover:bg-slate-800 text-white rounded-lg transition-all text-xs font-bold border border-white/10 flex items-center gap-1.5 shadow-xs"
                          title="Follow on Twitter / X"
                        >
                          <Twitter className="w-3.5 h-3.5 text-sky-300" />
                          <span>Twitter/X</span>
                        </a>
                      )}
                      {selectedInstructor.socials.website && (
                        <a
                          href={selectedInstructor.socials.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-white/10 hover:bg-indigo-600 text-white rounded-lg transition-all text-xs font-bold border border-white/10 flex items-center gap-1.5 shadow-xs"
                          title="Faculty Webpage"
                        >
                          <Globe className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Webpage</span>
                        </a>
                      )}
                      {selectedInstructor.socials.email && (
                        <a
                          href={`mailto:${selectedInstructor.socials.email}`}
                          className="px-2.5 py-1 bg-white/10 hover:bg-amber-600 text-white rounded-lg transition-all text-xs font-bold border border-white/10 flex items-center gap-1.5 shadow-xs"
                          title="Direct Email Contact"
                        >
                          <Mail className="w-3.5 h-3.5 text-amber-300" />
                          <span>Email</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Full Background Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span>Full Background & Field Practice</span>
                </h4>

                <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-2.5">
                  {selectedInstructor.fullBackground && selectedInstructor.fullBackground.length > 0 ? (
                    selectedInstructor.fullBackground.map((bg, idx) => (
                      <p key={idx} className="text-xs text-slate-700 leading-relaxed font-medium flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-1.5" />
                        <span>{bg}</span>
                      </p>
                    ))
                  ) : (
                    <p className="text-xs text-slate-700 leading-relaxed">{selectedInstructor.bio}</p>
                  )}
                </div>
              </div>

              {/* Professional Certifications & Credentials */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Professional Certifications & Degrees</span>
                </h4>

                <div className="grid sm:grid-cols-2 gap-2.5">
                  {(selectedInstructor.certifications || [
                    'Advocate, Supreme Court of Bangladesh',
                    'Certified Legal Practitioner',
                    'Master of Laws (LL.M.)'
                  ]).map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl flex items-center gap-2.5 text-xs text-emerald-950 font-bold"
                    >
                      <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notable Publications */}
              {selectedInstructor.notablePublications && selectedInstructor.notablePublications.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-sky-600" />
                    <span>Notable Publications</span>
                  </h4>
                  <div className="bg-sky-50/50 p-4 sm:p-5 rounded-2xl border border-sky-100 space-y-2.5">
                    {selectedInstructor.notablePublications.map((pub, idx) => (
                      <p key={idx} className="text-xs text-sky-900 leading-relaxed font-medium flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                        <span>{pub}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Teaching Philosophy */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Teaching Philosophy</span>
                </h4>

                <div className="bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-50/30 p-4 sm:p-5 rounded-2xl border border-amber-200/80 shadow-xs relative overflow-hidden">
                  <div className="absolute -right-2 -bottom-2 text-amber-200/40 pointer-events-none">
                    <Sparkles className="w-16 h-16" />
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed font-semibold italic relative z-10">
                    "{selectedInstructor.teachingPhilosophy || 'Focusing on actionable legal field experience, step-by-step NBR portal mastery, and empowering students to solve real-world tax and corporate challenges with confidence.'}"
                  </p>
                </div>
              </div>

              {/* Upcoming Live Classes Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span>Upcoming Classes Led by {selectedInstructor.name.split(' ')[0]}</span>
                  </h4>
                  <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                    Live Interactive
                  </span>
                </div>

                {selectedInstructor.upcomingClasses && selectedInstructor.upcomingClasses.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedInstructor.upcomingClasses.map((cls) => (
                      <div
                        key={cls.id}
                        className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-4 space-y-3 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                              <Video className="w-3 h-3 text-indigo-600" />
                              <span>{cls.mode}</span>
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{cls.time}</span>
                            </span>
                          </div>

                          <h5 className="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                            {cls.title}
                          </h5>

                          <p className="text-[11px] text-slate-600 font-medium line-clamp-2 leading-relaxed">
                            {cls.topic}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>{cls.date}</span>
                          </span>

                          {onSelectCourseByTitle && (
                            <button
                              onClick={() => {
                                setSelectedInstructor(null);
                                onSelectCourseByTitle(cls.title);
                              }}
                              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 cursor-pointer"
                            >
                              <span>Enroll / Join</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs text-slate-500 font-medium">
                    No upcoming live classes currently scheduled. Check back soon!
                  </div>
                )}
              </div>

              {/* Courses Currently Led */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Courses Currently Led ({selectedInstructor.coursesCount})</span>
                </h4>

                <div className="space-y-2.5">
                  {(selectedInstructor.coursesLed || [selectedInstructor.specialization]).map((courseTitle, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                          {idx + 1}
                        </div>
                        <div>
                          <h5 className="text-xs font-extrabold text-slate-900">{courseTitle}</h5>
                          <p className="text-[10px] font-bold text-indigo-600">Lead Instructor • Interactive Live & Recorded</p>
                        </div>
                      </div>

                      {onSelectCourseByTitle && (
                        <button
                          onClick={() => {
                            setSelectedInstructor(null);
                            onSelectCourseByTitle(courseTitle);
                          }}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] rounded-xl transition-all shrink-0 cursor-pointer shadow-xs"
                        >
                          View Course
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] text-slate-500 font-medium text-center sm:text-left">
                Questions about mentorship? Ask in our student discussion forum!
              </p>
              <button
                onClick={() => setSelectedInstructor(null)}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingInstructor && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-[32px] max-w-lg w-full text-slate-900 shadow-2xl overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">
                    Book a Session
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Select an available time to meet with <span className="font-semibold text-slate-700">{bookingInstructor.name}</span>.
                  </p>
                </div>
                <button
                  onClick={() => setBookingInstructor(null)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {['Mon 10:00 AM', 'Mon 2:00 PM', 'Tue 11:30 AM', 'Wed 9:00 AM', 'Thu 3:00 PM', 'Fri 1:00 PM'].map((slot) => (
                  <button
                    key={slot}
                    className="p-3 border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                    onClick={() => {
                      alert(`Mock booking confirmed for ${slot}`);
                      setBookingInstructor(null);
                    }}
                  >
                    <div className="flex flex-col items-center justify-center gap-1">
                      <Clock className="w-4 h-4 opacity-50" />
                      <span>{slot.split(' ')[0]}</span>
                      <span className="text-[10px] uppercase">{slot.split(' ')[1]} {slot.split(' ')[2]}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <button
                onClick={() => setBookingInstructor(null)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Share Profile Modal */}
      {shareInstructor && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-[32px] max-w-sm w-full text-slate-900 shadow-2xl overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-black tracking-tight text-slate-900">
                    Share Profile
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Share <span className="font-semibold text-slate-700">{shareInstructor.name}</span>'s profile with your network.
                  </p>
                </div>
                <button
                  onClick={() => setShareInstructor(null)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-[#0a66c2] hover:bg-[#0a66c2]/5 transition-colors group cursor-pointer"
                  onClick={() => setShareInstructor(null)}
                >
                  <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-[#0a66c2]" />
                  <span className="text-xs font-bold text-slate-600 group-hover:text-[#0a66c2]">LinkedIn</span>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out ${shareInstructor.name}'s profile!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition-colors group cursor-pointer"
                  onClick={() => setShareInstructor(null)}
                >
                  <Twitter className="w-6 h-6 text-slate-400 group-hover:text-slate-900" />
                  <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">Twitter / X</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Message Instructor Modal */}
      {messageInstructor && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-[32px] max-w-lg w-full text-slate-900 shadow-2xl overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">
                    Message Instructor
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Send a direct inquiry to <span className="font-semibold text-slate-700">{messageInstructor.name}</span>.
                  </p>
                </div>
                <button
                  onClick={() => setMessageInstructor(null)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); setMessageInstructor(null); }}>
                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    placeholder="e.g. Question about upcoming course"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm shadow-sm resize-none"
                  ></textarea>
                </div>
                
                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setMessageInstructor(null)}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Floating Bar */}
      {selectedForComparison.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-4 animate-in slide-in-from-bottom-10">
          <div className="flex items-center gap-2">
            {selectedForComparison.map(inst => (
              <div key={inst.id} className="relative">
                <img src={inst.image} alt={inst.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                <button 
                  onClick={() => toggleComparison(inst)} 
                  className="absolute -top-1 -right-1 bg-rose-500 rounded-full p-0.5 cursor-pointer hover:bg-rose-600 transition-colors"
                  title="Remove"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            {selectedForComparison.length < 2 && (
              <div className="w-8 h-8 rounded-full border border-dashed border-slate-600 flex items-center justify-center bg-slate-800">
                <span className="text-xs text-slate-400 font-bold">?</span>
              </div>
            )}
          </div>
          <div className="w-px h-6 bg-slate-700" />
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold whitespace-nowrap">
              {selectedForComparison.length === 1 ? 'Select 1 more' : 'Ready to compare'}
            </span>
            <button
              onClick={() => setShowComparisonModal(true)}
              disabled={selectedForComparison.length < 2}
              className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-colors ${
                selectedForComparison.length === 2
                  ? 'bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              Compare
            </button>
            <button
              onClick={() => setSelectedForComparison([])}
              className="text-xs text-slate-400 hover:text-white transition-colors underline cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparisonModal && selectedForComparison.length === 2 && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-[32px] max-w-4xl w-full text-slate-900 shadow-2xl overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 sm:p-8 space-y-6">
               <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                    <Scale className="w-6 h-6 text-indigo-600" />
                    Compare Instructors
                  </h3>
                  <button onClick={() => setShowComparisonModal(false)} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors cursor-pointer shrink-0">
                    <X className="w-5 h-5" />
                  </button>
               </div>
               
               <div className="grid grid-cols-2 gap-6 md:gap-8 divide-x divide-slate-100">
                 {selectedForComparison.map((inst, idx) => (
                   <div key={inst.id} className={`flex flex-col h-full ${idx === 1 ? 'pl-6 md:pl-8' : ''}`}>
                     <div className="text-center space-y-3 mb-6">
                       <img src={inst.image} alt={inst.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto object-cover border-2 border-indigo-100 p-1 shadow-sm" />
                       <div>
                         <h4 className="text-lg font-black text-slate-900">{inst.name}</h4>
                         <p className="text-indigo-600 text-xs sm:text-sm font-bold mt-0.5">{inst.designation}</p>
                       </div>
                     </div>

                     <div className="space-y-5 flex-1">
                       <div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Specialization</span>
                         <p className="text-sm text-slate-700 leading-relaxed font-medium">{inst.specialization}</p>
                       </div>
                       
                       <div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Experience</span>
                         <p className="text-sm font-mono font-bold text-slate-900">{inst.experience}</p>
                       </div>

                       <div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Student Rating</span>
                         <div className="flex items-center gap-1.5">
                           <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                           <span className="font-mono font-bold text-slate-900">{inst.rating}</span>
                           <span className="text-xs text-slate-500 font-medium">({inst.studentsTaught} students)</span>
                         </div>
                       </div>

                       <div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Courses Led</span>
                         <p className="text-sm font-mono font-bold text-slate-900 flex items-center gap-1.5">
                           <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                           {inst.coursesCount} Courses
                         </p>
                       </div>
                     </div>
                     
                     <div className="mt-8 pt-6 border-t border-slate-100">
                       <button
                          onClick={() => {
                            setShowComparisonModal(false);
                            setBookingInstructor(inst);
                          }}
                          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Book {inst.name.split(' ')[0]}</span>
                       </button>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
