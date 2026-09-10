import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import {
  StickyNote,
  Plus,
  Search,
  Filter,
  Pin,
  Trash2,
  Edit3,
  Copy,
  Download,
  BookOpen,
  Tag,
  Clock,
  Sparkles,
  Check,
  X,
  FileText,
  ChevronRight,
  Bookmark,
  Share2,
} from 'lucide-react';

export interface NoteItem {
  id: string;
  title: string;
  courseTitle: string;
  moduleOrClassTitle: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  updatedAt: string;
  color: 'amber' | 'indigo' | 'emerald' | 'rose' | 'slate';
}

const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'note-1',
    title: 'Investment Rebate Limit Formula under Section 78',
    courseTitle: 'Personal Income Tax & E-Return Masterclass',
    moduleOrClassTitle: 'Module 3: Tax Rebates & Exemptions',
    content: `Rebate allowed on eligible investment amount:
1. Maximum eligible investment = 20% of Total Income (excluding tax-exempt income) or ৳ 1,00,00,000 (1 Crore), whichever is lower.
2. Rebate Rate = 15% on eligible investment.
3. Allowed sectors: DPS up to ৳ 1,20,000/yr, Government Savings Certificates, Life Insurance Premium, Stock Market Mutual Funds.

*Tip for Assessment:* Always attach Provident Fund certificate and Bank DPS statements in e-Return portal as PDF attachment.`,
    tags: ['Income Tax', 'Rebate Formula', 'Section 78', 'e-Filing'],
    isPinned: true,
    updatedAt: '05 Aug 2026, 04:30 PM',
    color: 'amber',
  },
  {
    id: 'note-2',
    title: 'Mushak 9.1 Monthly VAT Return Treasury Reconciliation',
    courseTitle: 'VAT & Tax Compliance Professional Training',
    moduleOrClassTitle: 'Class 4: Mushak 9.1 Return Preparation',
    content: `Key reconciliation steps before submitting Mushak 9.1 on NBR online portal:
- Match Sub-form 1 (Output Tax) against sales register (Mushak 6.1).
- Sub-form 4 (Input Tax Credit) must have verified Mushak 6.3 invoices from registered suppliers.
- Ensure Treasury Chalan Code for VAT payment: 1/1133/0010/0311 (or local tax zone code).
- Keep VDS Certificates (Mushak 6.6) issued to buyers ready for audit check.`,
    tags: ['VAT', 'Mushak 9.1', 'Treasury Chalan', 'Input Tax Credit'],
    isPinned: true,
    updatedAt: '03 Aug 2026, 11:15 AM',
    color: 'emerald',
  },
  {
    id: 'note-3',
    title: 'Defending Section 93 Income Escaping Assessment Notice',
    courseTitle: 'Corporate Tax & Assessment Procedure',
    moduleOrClassTitle: 'Module 2: Audit & Reassessment Defense',
    content: `When Deputy Commissioner of Taxes (DCT) issues Section 93 Notice:
1. Verify if 6 years time bar limit has passed (Section 93 restriction).
2. Ground for objection: DCT must have tangible new material evidence, not just change of opinion.
3. Prepare step-by-step reply within 15 days requesting full copy of audit report.
4. Precedent Supreme Court Judgment: Civil Appeal No. 142/2018 (NBR vs Apex Ltd).`,
    tags: ['Corporate Tax', 'Section 93', 'Audit Defense', 'Legal Precedent'],
    isPinned: false,
    updatedAt: '28 Jul 2026, 02:45 PM',
    color: 'indigo',
  },
  {
    id: 'note-4',
    title: 'Appellate Tribunal Memorandum Drafting Key Clauses',
    courseTitle: 'Legal Drafting for Tax Practitioners',
    moduleOrClassTitle: 'Module 5: Appeals & Tribunal Petitions',
    content: `Structure of Appeal Memorandum under Section 158:
- Heading: IN THE TAXES APPELLATE TRIBUNAL, BENCH-1, DHAKA.
- Statement of Facts: Clearly summarize assessment order additions made under Section 30.
- Grounds of Appeal: Point out errors in law, violation of natural justice, and misinterpretation of SRO.
- Prayer Clause: Request setting aside disputed addition and stay of recovery proceedings.`,
    tags: ['Legal Drafting', 'Appellate Tribunal', 'Stay Application'],
    isPinned: false,
    updatedAt: '22 Jul 2026, 09:20 AM',
    color: 'rose',
  },
];

interface StudentNotebookProps {
  courses?: Course[];
}

export const StudentNotebook: React.FC<StudentNotebookProps> = ({ courses = [] }) => {
  // Load initial notes from LocalStorage or default fallback
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('bd_tax_student_notes');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_NOTES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('All');
  const [activeNote, setActiveNote] = useState<NoteItem | null>(notes[0] || null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);

  // Form states for create/edit
  const [formTitle, setFormTitle] = useState('');
  const [formCourse, setFormCourse] = useState('');
  const [formModule, setFormModule] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formTagInput, setFormTagInput] = useState('');
  const [formTags, setFormTags] = useState<string[]>([]);
  const [formColor, setFormColor] = useState<'amber' | 'indigo' | 'emerald' | 'rose' | 'slate'>('amber');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync with LocalStorage whenever notes change
  useEffect(() => {
    try {
      localStorage.setItem('bd_tax_student_notes', JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Unique course list for filtering
  const courseOptions = [
    'All',
    'Personal Income Tax & E-Return Masterclass',
    'VAT & Tax Compliance Professional Training',
    'Corporate Tax & Assessment Procedure',
    'Legal Drafting for Tax Practitioners',
  ];

  // Filter notes
  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCourse = selectedCourseFilter === 'All' || n.courseTitle === selectedCourseFilter;

    return matchesSearch && matchesCourse;
  });

  // Sort pinned first
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const handleStartCreateNote = () => {
    setIsCreatingNew(true);
    setIsEditing(false);
    setFormTitle('');
    setFormCourse(courseOptions[1] || 'Personal Income Tax & E-Return Masterclass');
    setFormModule('Module 1: Statutory Basics');
    setFormContent('');
    setFormTags(['Tax Study', 'Lecture Notes']);
    setFormTagInput('');
    setFormColor('amber');
  };

  const handleStartEditNote = (note: NoteItem) => {
    setIsEditing(true);
    setIsCreatingNew(false);
    setActiveNote(note);
    setFormTitle(note.title);
    setFormCourse(note.courseTitle);
    setFormModule(note.moduleOrClassTitle);
    setFormContent(note.content);
    setFormTags([...note.tags]);
    setFormTagInput('');
    setFormColor(note.color);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast('⚠️ Please enter a note title.');
      return;
    }

    const formattedDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    if (isCreatingNew) {
      const newNoteItem: NoteItem = {
        id: `note-${Date.now()}`,
        title: formTitle.trim(),
        courseTitle: formCourse,
        moduleOrClassTitle: formModule.trim() || 'General Notes',
        content: formContent,
        tags: formTags,
        isPinned: false,
        updatedAt: formattedDate,
        color: formColor,
      };

      setNotes([newNoteItem, ...notes]);
      setActiveNote(newNoteItem);
      setIsCreatingNew(false);
      showToast('📝 New lecture note created and saved!');
    } else if (isEditing && activeNote) {
      const updatedList = notes.map((n) => {
        if (n.id === activeNote.id) {
          return {
            ...n,
            title: formTitle.trim(),
            courseTitle: formCourse,
            moduleOrClassTitle: formModule.trim() || 'General Notes',
            content: formContent,
            tags: formTags,
            color: formColor,
            updatedAt: formattedDate,
          };
        }
        return n;
      });

      setNotes(updatedList);
      const updatedNote = updatedList.find((n) => n.id === activeNote.id) || null;
      setActiveNote(updatedNote);
      setIsEditing(false);
      showToast('✅ Note updated successfully!');
    }
  };

  const handleDeleteNote = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete note "${title}"?`)) {
      const updated = notes.filter((n) => n.id !== id);
      setNotes(updated);
      if (activeNote?.id === id) {
        setActiveNote(updated[0] || null);
      }
      showToast('🗑️ Note deleted.');
    }
  };

  const handleTogglePin = (id: string) => {
    const updated = notes.map((n) => {
      if (n.id === id) {
        const nextState = !n.isPinned;
        showToast(nextState ? '📌 Note pinned to top!' : 'Unpinned note.');
        return { ...n, isPinned: nextState };
      }
      return n;
    });
    setNotes(updated);
    if (activeNote?.id === id) {
      setActiveNote((prev) => (prev ? { ...prev, isPinned: !prev.isPinned } : null));
    }
  };

  const handleAddTag = () => {
    if (formTagInput.trim() && !formTags.includes(formTagInput.trim())) {
      setFormTags([...formTags, formTagInput.trim()]);
      setFormTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormTags(formTags.filter((t) => t !== tagToRemove));
  };

  const handleCopyNote = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('📋 Note content copied to clipboard!');
  };

  const handleExportTxt = (note: NoteItem) => {
    const fileData = `TITLE: ${note.title}\nCOURSE: ${note.courseTitle}\nMODULE: ${note.moduleOrClassTitle}\nDATE: ${note.updatedAt}\nTAGS: ${note.tags.join(', ')}\n\n${note.content}`;
    const blob = new Blob([fileData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_note.txt`;
    link.click();
    showToast(`⬇️ Exported "${note.title}" as TXT file!`);
  };

  // Badge Color Styles
  const getColorClasses = (color: NoteItem['color']) => {
    switch (color) {
      case 'amber':
        return {
          bg: 'bg-amber-500/10 border-amber-400/30 text-amber-900',
          activeBg: 'bg-gradient-to-br from-amber-500/20 to-amber-500/5 border-amber-400 text-slate-900',
          badge: 'bg-amber-100 text-amber-900 border-amber-300',
          accent: 'text-amber-600',
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-500/10 border-emerald-400/30 text-emerald-900',
          activeBg: 'bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border-emerald-400 text-slate-900',
          badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          accent: 'text-emerald-600',
        };
      case 'indigo':
        return {
          bg: 'bg-indigo-500/10 border-indigo-400/30 text-indigo-900',
          activeBg: 'bg-gradient-to-br from-indigo-500/20 to-indigo-500/5 border-indigo-400 text-slate-900',
          badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
          accent: 'text-indigo-600',
        };
      case 'rose':
        return {
          bg: 'bg-rose-500/10 border-rose-400/30 text-rose-900',
          activeBg: 'bg-gradient-to-br from-rose-500/20 to-rose-500/5 border-rose-400 text-slate-900',
          badge: 'bg-rose-100 text-rose-900 border-rose-300',
          accent: 'text-rose-600',
        };
      default:
        return {
          bg: 'bg-slate-500/10 border-slate-400/30 text-slate-900',
          activeBg: 'bg-gradient-to-br from-slate-200 to-slate-100 border-slate-400 text-slate-900',
          badge: 'bg-slate-100 text-slate-900 border-slate-300',
          accent: 'text-slate-600',
        };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-[32px] border border-indigo-900 text-white relative overflow-hidden shadow-xl space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-extrabold text-indigo-300">
              <StickyNote className="w-4 h-4 text-amber-400" />
              <span>Personal Study Repository</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Student Class Notebook
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium leading-relaxed">
              Organize, pin, and search your personal study notes, legal case precedents, and statutory formulas tied directly to specific recorded live sessions and course modules.
            </p>
          </div>

          <button
            onClick={handleStartCreateNote}
            className="px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-2xl transition-all cursor-pointer shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>Create New Note</span>
          </button>
        </div>

        {/* STATS BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-indigo-900/80 text-xs">
          <div className="bg-indigo-950/70 p-3.5 rounded-2xl border border-indigo-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 text-amber-300 flex items-center justify-center font-bold shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-indigo-300 font-bold block uppercase">Saved Notes</span>
              <span className="font-extrabold text-white text-sm font-mono">{notes.length} Entries</span>
            </div>
          </div>

          <div className="bg-indigo-950/70 p-3.5 rounded-2xl border border-indigo-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold shrink-0">
              <Pin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-indigo-300 font-bold block uppercase">Pinned Notes</span>
              <span className="font-extrabold text-emerald-400 text-sm font-mono">
                {notes.filter((n) => n.isPinned).length} Important
              </span>
            </div>
          </div>

          <div className="bg-indigo-950/70 p-3.5 rounded-2xl border border-indigo-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center font-bold shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-indigo-300 font-bold block uppercase">Courses Covered</span>
              <span className="font-extrabold text-white text-sm font-mono">
                {new Set(notes.map((n) => n.courseTitle)).size} Subjects
              </span>
            </div>
          </div>

          <div className="bg-indigo-950/70 p-3.5 rounded-2xl border border-indigo-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 flex items-center justify-center font-bold shrink-0">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-indigo-300 font-bold block uppercase">Topic Tags</span>
              <span className="font-extrabold text-amber-300 text-sm font-mono">
                {new Set(notes.flatMap((n) => n.tags)).size} Keywords
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* NOTEBOOK WORKSPACE: SIDEBAR & MAIN EDITOR */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: NOTES LIST & FILTERS */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-[28px] border border-slate-200 p-4 space-y-3 shadow-xs">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes by keyword, tag, or statutory section..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Course Dropdown Filter */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <select
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                {courseOptions.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All Enrolled Courses' : c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* LIST OF NOTE CARDS */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {sortedNotes.length === 0 ? (
              <div className="bg-white rounded-[28px] border border-slate-200 p-8 text-center space-y-2">
                <StickyNote className="w-8 h-8 text-slate-300 mx-auto" />
                <h4 className="text-xs font-extrabold text-slate-800">No study notes found</h4>
                <p className="text-[11px] text-slate-500 font-medium">Try clearing your search filter or add a new note.</p>
              </div>
            ) : (
              sortedNotes.map((note) => {
                const isSelected = activeNote?.id === note.id && !isCreatingNew;
                const style = getColorClasses(note.color);

                return (
                  <div
                    key={note.id}
                    onClick={() => {
                      setActiveNote(note);
                      setIsCreatingNew(false);
                      setIsEditing(false);
                    }}
                    className={`p-4 rounded-[24px] border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-3 group ${
                      isSelected
                        ? `${style.activeBg} shadow-md ring-2 ring-indigo-500/30`
                        : 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase text-indigo-600 truncate max-w-[200px]">
                          {note.courseTitle.split(' ')[0]} • {note.moduleOrClassTitle}
                        </span>

                        <div className="flex items-center gap-1 shrink-0">
                          {note.isPinned && <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                          <span className="text-[9px] text-slate-400 font-mono">{note.updatedAt.split(',')[0]}</span>
                        </div>
                      </div>

                      <h4 className="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {note.title}
                      </h4>

                      <p className="text-[11px] text-slate-600 font-medium line-clamp-2 leading-relaxed">
                        {note.content}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[10px]">
                      <div className="flex flex-wrap gap-1">
                        {note.tags.slice(0, 2).map((t) => (
                          <span key={t} className="bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <span className="text-indigo-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                        <span>Read</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: MAIN EDITOR OR NOTE VIEW */}
        <div className="lg:col-span-7">
          {isCreatingNew || isEditing ? (
            /* CREATE / EDIT FORM BUILDER */
            <form
              onSubmit={handleSaveNote}
              className="bg-white rounded-[32px] border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm animate-in zoom-in-95 duration-200"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-950 flex items-center justify-center font-bold">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-black text-slate-900">
                    {isCreatingNew ? 'Create New Class Note' : 'Edit Study Note'}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingNew(false);
                    setIsEditing(false);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-bold text-slate-700">
                {/* Note Title */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">
                    Note Title *
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Section 78 Rebate Formulas or Mushak 9.1 Verification Notes"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                {/* Course Selection & Module */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Target Course
                    </label>
                    <select
                      value={formCourse}
                      onChange={(e) => setFormCourse(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-600"
                    >
                      {courseOptions
                        .filter((c) => c !== 'All')
                        .map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">
                      Module / Class Session
                    </label>
                    <input
                      type="text"
                      value={formModule}
                      onChange={(e) => setFormModule(e.target.value)}
                      placeholder="e.g. Module 3 or Class 4 Recorded Stream"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                {/* Note Content Textarea */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">
                    Personal Study Notes & Key Takeaways
                  </label>
                  <textarea
                    rows={8}
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Write key statutory sections, audit defense tips, excel formulas, or live class lecturer quotes..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 leading-relaxed focus:outline-none focus:border-indigo-600 focus:bg-white font-mono"
                  />
                </div>

                {/* Tags Management */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">
                    Topic Keywords & Tags
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formTagInput}
                      onChange={(e) => setFormTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="Add tag (press Enter)"
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs"
                    >
                      Add Tag
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {formTags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-indigo-50 border border-indigo-200 text-indigo-900 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Note Color Accent */}
                <div className="space-y-1 pt-2">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500">
                    Card Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    {(['amber', 'emerald', 'indigo', 'rose', 'slate'] as const).map((color) => (
                      <button
                        type="button"
                        key={color}
                        onClick={() => setFormColor(color)}
                        className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-transform ${
                          color === 'amber'
                            ? 'bg-amber-400'
                            : color === 'emerald'
                            ? 'bg-emerald-500'
                            : color === 'indigo'
                            ? 'bg-indigo-600'
                            : color === 'rose'
                            ? 'bg-rose-500'
                            : 'bg-slate-700'
                        } ${formColor === color ? 'scale-125 border-slate-900 ring-2 ring-offset-2 ring-indigo-500' : 'border-transparent'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingNew(false);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-100"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Note</span>
                </button>
              </div>
            </form>
          ) : activeNote ? (
            /* ACTIVE NOTE READ VIEW */
            <div className="bg-white rounded-[32px] border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                      {activeNote.courseTitle}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">• {activeNote.moduleOrClassTitle}</span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900">{activeNote.title}</h3>
                  <span className="text-[11px] text-slate-400 font-mono block">Last modified: {activeNote.updatedAt}</span>
                </div>

                {/* Toolbar Actions */}
                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleTogglePin(activeNote.id)}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      activeNote.isPinned
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                    }`}
                    title={activeNote.isPinned ? 'Unpin Note' : 'Pin Note to Top'}
                  >
                    <Pin className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleCopyNote(activeNote.content)}
                    className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 cursor-pointer"
                    title="Copy to Clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleExportTxt(activeNote)}
                    className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 cursor-pointer"
                    title="Export as TXT"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleStartEditNote(activeNote)}
                    className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl border border-indigo-200 cursor-pointer"
                    title="Edit Note"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteNote(activeNote.id, activeNote.title)}
                    className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl border border-rose-200 cursor-pointer"
                    title="Delete Note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Note Body Text */}
              <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed whitespace-pre-wrap min-h-[220px]">
                {activeNote.content}
              </div>

              {/* Topic Tags */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  Associated Tags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeNote.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-indigo-50 text-indigo-900 border border-indigo-200 text-[11px] font-bold px-3 py-1 rounded-xl"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[32px] border border-slate-200 p-12 text-center space-y-3">
              <StickyNote className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-sm font-extrabold text-slate-900">Select a note to view details</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Choose a note from the left sidebar or create a new note tied to your enrolled courses.
              </p>
            </div>
          )}
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
