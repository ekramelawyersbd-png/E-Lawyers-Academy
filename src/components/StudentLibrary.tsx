import React, { useState } from 'react';
import { Course } from '../types';
import {
  FileText,
  Download,
  Search,
  Filter,
  BookOpen,
  FileSpreadsheet,
  FileCode,
  Sparkles,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Eye,
  X,
  Share2,
  Clock,
  ArrowUpRight,
  Grid,
  List,
  FolderDown,
  ShieldCheck,
  TrendingUp,
  SlidersHorizontal,
  Check,
} from 'lucide-react';

export interface LibraryItem {
  id: string;
  title: string;
  description: string;
  category: 'Taxation' | 'VAT' | 'Corporate' | 'Drafting';
  courseTitle: string;
  type: 'PDF' | 'XLSX' | 'DOCX' | 'PPTX';
  fileSize: string;
  dateUploaded: string;
  downloadCount: number;
  tags: string[];
  isFeatured?: boolean;
  downloadUrl?: string;
  previewExcerpt?: string;
}

const INITIAL_LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: 'lib-1',
    title: 'Income Tax Return Filing Checklist & Step-by-Step Guide 2026',
    description: 'Comprehensive checklist for individual, salaried, and business income tax return submission under NBR e-Filing system.',
    category: 'Taxation',
    courseTitle: 'Personal Income Tax & E-Return Masterclass',
    type: 'PDF',
    fileSize: '2.4 MB',
    dateUploaded: '05 Aug 2026',
    downloadCount: 420,
    tags: ['NBR e-Filing', 'Checklist', 'Salaried Tax', '2026 Act'],
    isFeatured: true,
    previewExcerpt: 'Section 1: Documents required for salaried assessment: Salary Certificate, Provident Fund statement, Investment Rebate Proofs, House Property Rent Agreements.',
  },
  {
    id: 'lib-2',
    title: 'Automated Personal Income Tax Slab Calculator 2026',
    description: 'Ready-to-use Excel model with built-in formulas for investment rebate calculation, minimum tax, and net payable tax.',
    category: 'Taxation',
    courseTitle: 'Personal Income Tax & E-Return Masterclass',
    type: 'XLSX',
    fileSize: '1.2 MB',
    dateUploaded: '02 Aug 2026',
    downloadCount: 615,
    tags: ['Excel Model', 'Tax Calculator', 'Rebate Formula'],
    isFeatured: true,
    previewExcerpt: 'Cell A1-D20: Formula powered rebate matrix. Enter gross salary, provident fund, DPS, savings certificates to automatically generate net tax liability.',
  },
  {
    id: 'lib-3',
    title: 'Mushak 9.1 Monthly VAT Return Submission Template & Practice Sheet',
    description: 'Official NBR Mushak 9.1 return form in Excel format with input-output tax credit reconciliation worksheet.',
    category: 'VAT',
    courseTitle: 'VAT & Tax Compliance Professional Training',
    type: 'XLSX',
    fileSize: '1.8 MB',
    dateUploaded: '04 Aug 2026',
    downloadCount: 380,
    tags: ['Mushak 9.1', 'VAT Return', 'Input Tax Credit'],
    isFeatured: true,
    previewExcerpt: 'Sub-form 1 to Sub-form 13 mapped according to VAT & SD Act 2012. Includes automated Treasury Chalan calculation formulas.',
  },
  {
    id: 'lib-4',
    title: 'VAT Rate Schedule & Exemptions Reference Book 2026',
    description: 'Full reference guide detailing standard 15%, reduced 5%/7.5%/10% VAT rates, and specific SRO exemptions.',
    category: 'VAT',
    courseTitle: 'VAT & Tax Compliance Professional Training',
    type: 'PDF',
    fileSize: '4.1 MB',
    dateUploaded: '01 Aug 2026',
    downloadCount: 290,
    tags: ['VAT Rates', 'SRO Exemptions', 'NBR Circulars'],
    previewExcerpt: 'Schedule 1 & 2 breakdown of exempted goods and services under the Value Added Tax and Supplementary Duty Act.',
  },
  {
    id: 'lib-5',
    title: 'Corporate Tax Assessment Hearing & Defense Playbook',
    description: 'Strategic guide for handling DCT (Deputy Commissioner of Taxes) audit hearings, notice response, and appeal drafting.',
    category: 'Corporate',
    courseTitle: 'Corporate Tax & Assessment Procedure',
    type: 'PDF',
    fileSize: '3.2 MB',
    dateUploaded: '28 Jul 2026',
    downloadCount: 195,
    tags: ['Audit Defense', 'DCT Hearing', 'Appeal Notes'],
    previewExcerpt: 'Drafting response to Section 93 notice: Key grounds for objection, burden of proof guidelines, and precedent case citations.',
  },
  {
    id: 'lib-6',
    title: 'Corporate Tax Computation & Minimum Tax Sheet',
    description: 'Worksheet for calculating gross receipts tax, allowable expenses, non-allowable deductions, and corporate tax liability.',
    category: 'Corporate',
    courseTitle: 'Corporate Tax & Assessment Procedure',
    type: 'XLSX',
    fileSize: '1.5 MB',
    dateUploaded: '25 Jul 2026',
    downloadCount: 310,
    tags: ['Corporate Tax', 'Minimum Tax', 'Allowable Expenses'],
    previewExcerpt: 'Worksheet 1: Disallowance under Section 30. Worksheet 2: Capital Allowances and Depreciation Schedule calculation.',
  },
  {
    id: 'lib-7',
    title: 'High Court & Appellate Tribunal Tax Appeal Deed Drafts',
    description: 'Editable Word document templates for Tax Appeal Petitions, Stay of Demand Applications, and Writ Petitions.',
    category: 'Drafting',
    courseTitle: 'Legal Drafting for Tax Practitioners',
    type: 'DOCX',
    fileSize: '850 KB',
    dateUploaded: '30 Jul 2026',
    downloadCount: 450,
    tags: ['Legal Drafts', 'Appeal Petition', 'High Court'],
    isFeatured: true,
    previewExcerpt: 'IN THE TAXES APPELLATE TRIBUNAL, BENCH-1, DHAKA. Memorandum of Appeal under Section 158 of Income Tax Act.',
  },
  {
    id: 'lib-8',
    title: 'VDS & TDS Withholding Tax Certificate Forms (Mushak 6.3 & 6.6)',
    description: 'Standardized forms for Tax Deducted at Source (TDS) and Value Added Tax Deducted at Source (VDS) certificates.',
    category: 'Drafting',
    courseTitle: 'Legal Drafting for Tax Practitioners',
    type: 'PDF',
    fileSize: '1.1 MB',
    dateUploaded: '22 Jul 2026',
    downloadCount: 520,
    tags: ['Mushak 6.3', 'Mushak 6.6', 'TDS Certificate'],
    previewExcerpt: 'Certificate of Tax Deduction at Source issued under Rule 16 of VAT Rules. Includes verified signature block layout.',
  },
  {
    id: 'lib-9',
    title: 'Finance Act 2026 Key Amendments & Comparative Summary',
    description: 'Executive summary highlight deck comparing old Income Tax Act clauses against new Finance Act 2026 updates.',
    category: 'Taxation',
    courseTitle: 'Personal Income Tax & E-Return Masterclass',
    type: 'PPTX',
    fileSize: '5.6 MB',
    dateUploaded: '03 Aug 2026',
    downloadCount: 340,
    tags: ['Finance Act 2026', 'Law Updates', 'Presentation Slide'],
    previewExcerpt: 'Slide 4: Major shift in wealth statement disclosure threshold. Slide 12: E-return filing mandatory requirement changes.',
  },
];

interface StudentLibraryProps {
  courses?: Course[];
}

export const StudentLibrary: React.FC<StudentLibraryProps> = ({ courses = [] }) => {
  const [items] = useState<LibraryItem[]>(INITIAL_LIBRARY_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['lib-1', 'lib-7']);
  const [selectedPreviewItem, setSelectedPreviewItem] = useState<LibraryItem | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Filter Logic
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = selectedType === 'All' || item.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  // Bookmark Toggle
  const toggleBookmark = (id: string, title: string) => {
    setBookmarkedIds((prev) => {
      const isBookmarked = prev.includes(id);
      if (isBookmarked) {
        triggerToast(`Removed "${title.substring(0, 30)}..." from saved items.`);
        return prev.filter((bId) => bId !== id);
      } else {
        triggerToast(`Saved "${title.substring(0, 30)}..." to offline library!`);
        return [...prev, id];
      }
    });
  };

  // Download Trigger
  const handleDownload = (item: LibraryItem) => {
    triggerToast(`⬇️ Downloading "${item.title.substring(0, 35)}..." (${item.fileSize})`);
  };

  // Batch Download Course Materials
  const handleBatchDownloadCourse = (categoryName: string) => {
    triggerToast(`📦 Preparing ZIP package of all ${categoryName} lecture notes & templates...`);
  };

  const triggerToast = (msg: string) => {
    setDownloadToast(msg);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  // Helper for format badge styling
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'PDF':
        return { bg: 'bg-rose-100 text-rose-800 border-rose-200', icon: <FileText className="w-3.5 h-3.5 text-rose-600" /> };
      case 'XLSX':
        return { bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> };
      case 'DOCX':
        return { bg: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: <FileCode className="w-3.5 h-3.5 text-indigo-600" /> };
      case 'PPTX':
        return { bg: 'bg-amber-100 text-amber-800 border-amber-200', icon: <Sparkles className="w-3.5 h-3.5 text-amber-600" /> };
      default:
        return { bg: 'bg-slate-100 text-slate-800 border-slate-200', icon: <FileText className="w-3.5 h-3.5 text-slate-600" /> };
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* LIBRARY HERO BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-[32px] border border-indigo-900 text-white relative overflow-hidden shadow-xl space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 rounded-full text-xs font-extrabold text-indigo-300">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Central Resource & Document Library</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Course Material Library
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium leading-relaxed">
              Access and download official NBR tax return forms, automated Excel calculators, High Court legal appeal draft deeds, and verified lecture notes across all enrolled programs.
            </p>
          </div>

          {/* Quick Batch Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => handleBatchDownloadCourse('Taxation')}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-2xl transition-all cursor-pointer shadow-md shadow-amber-400/20 flex items-center gap-1.5"
            >
              <FolderDown className="w-4 h-4 text-slate-950" />
              <span>Download Tax Kit (ZIP)</span>
            </button>
          </div>
        </div>

        {/* LIBRARY STATS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-indigo-900/80 text-xs">
          <div className="bg-indigo-950/70 p-3.5 rounded-2xl border border-indigo-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 text-amber-300 flex items-center justify-center font-bold shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-indigo-300 font-bold block uppercase">Total Materials</span>
              <span className="font-extrabold text-white text-sm font-mono">{items.length} Files</span>
            </div>
          </div>

          <div className="bg-indigo-950/70 p-3.5 rounded-2xl border border-indigo-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold shrink-0">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-indigo-300 font-bold block uppercase">Excel Models</span>
              <span className="font-extrabold text-emerald-400 text-sm font-mono">
                {items.filter((i) => i.type === 'XLSX').length} Calculators
              </span>
            </div>
          </div>

          <div className="bg-indigo-950/70 p-3.5 rounded-2xl border border-indigo-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center font-bold shrink-0">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-indigo-300 font-bold block uppercase">Draft Templates</span>
              <span className="font-extrabold text-white text-sm font-mono">
                {items.filter((i) => i.type === 'DOCX').length} Legal Deeds
              </span>
            </div>
          </div>

          <div className="bg-indigo-950/70 p-3.5 rounded-2xl border border-indigo-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 flex items-center justify-center font-bold shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-indigo-300 font-bold block uppercase">Total Downloads</span>
              <span className="font-extrabold text-amber-300 text-sm font-mono">
                {items.reduce((acc, i) => acc + i.downloadCount, 0)}+
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="bg-white rounded-[28px] border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents by title, keyword, NBR form, course..."
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

          {/* Format Selector & View Mode Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-700">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 ml-2" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-transparent border-none text-xs font-bold text-slate-800 focus:outline-none cursor-pointer pr-2"
              >
                <option value="All">All Formats</option>
                <option value="PDF">PDF Books</option>
                <option value="XLSX">Excel Sheets</option>
                <option value="DOCX">Word Drafts</option>
                <option value="PPTX">Presentations</option>
              </select>
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'list' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
          <span className="text-slate-400 font-extrabold text-[11px] uppercase shrink-0">Filter Subject:</span>
          {['All', 'Taxation', 'VAT', 'Corporate', 'Drafting'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white font-extrabold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat === 'All' ? 'All Subjects' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURED QUICK COLLECTIONS BANNER */}
      {selectedCategory === 'All' && !searchQuery && (
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Recommended Featured Downloads</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {items
              .filter((i) => i.isFeatured)
              .slice(0, 3)
              .map((item) => {
                const badgeStyle = getTypeBadge(item.type);
                const isSaved = bookmarkedIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-5 rounded-[24px] border border-indigo-800 shadow-md relative overflow-hidden flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2 relative z-10">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border flex items-center gap-1 ${badgeStyle.bg}`}>
                          {badgeStyle.icon}
                          <span>{item.type}</span>
                        </span>

                        <button
                          onClick={() => toggleBookmark(item.id, item.title)}
                          className="text-indigo-200 hover:text-amber-400 transition-colors p-1 cursor-pointer"
                        >
                          {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                      </div>

                      <h4 className="text-sm font-black text-white leading-snug line-clamp-2">{item.title}</h4>
                      <p className="text-[11px] text-indigo-200 font-medium line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-indigo-800/80 text-[11px]">
                      <span className="text-indigo-300 font-mono">{item.fileSize}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedPreviewItem(item)}
                          className="p-1.5 bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 rounded-lg cursor-pointer"
                          title="Preview document"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDownload(item)}
                          className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-lg cursor-pointer flex items-center gap-1 shadow-xs"
                        >
                          <Download className="w-3 h-3 text-slate-950" />
                          <span>Get</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* RESULTS HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
          <span>Available Course Documents</span>
          <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-0.5 rounded-full font-bold">
            {filteredItems.length}
          </span>
        </h3>
      </div>

      {/* DOCUMENT ITEMS: GRID OR LIST VIEW */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-[32px] border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-extrabold text-slate-900">No matching library files found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
            Try resetting your search filter or selecting a different subject category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedType('All');
            }}
            className="px-4 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const badgeStyle = getTypeBadge(item.type);
            const isSaved = bookmarkedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-[28px] border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${badgeStyle.bg}`}>
                      {badgeStyle.icon}
                      <span>{item.type}</span>
                    </span>

                    <button
                      onClick={() => toggleBookmark(item.id, item.title)}
                      className="text-slate-400 hover:text-amber-500 transition-colors p-1 cursor-pointer"
                      title={isSaved ? 'Remove Bookmark' : 'Bookmark File'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  <h4 className="text-xs font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="bg-slate-100 text-slate-600 text-[9px] font-bold px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Meta & Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-mono block">{item.fileSize}</span>
                    <span className="text-[10px] text-indigo-600 font-bold truncate max-w-[120px] block">
                      {item.courseTitle.split(' ')[0]}...
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedPreviewItem(item)}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-600" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => handleDownload(item)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] rounded-xl transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="bg-white rounded-[28px] border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
          {filteredItems.map((item) => {
            const badgeStyle = getTypeBadge(item.type);
            const isSaved = bookmarkedIds.includes(item.id);

            return (
              <div key={item.id} className="p-4 sm:p-5 hover:bg-slate-50/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`p-2.5 rounded-2xl border shrink-0 ${badgeStyle.bg}`}>
                    {badgeStyle.icon}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-indigo-600 uppercase">{item.category}</span>
                      <span className="text-[10px] text-slate-400 font-mono">• {item.fileSize}</span>
                      <span className="text-[10px] text-slate-400 font-mono">• Uploaded {item.dateUploaded}</span>
                    </div>

                    <h4 className="text-xs font-black text-slate-900 truncate">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => toggleBookmark(item.id, item.title)}
                    className="p-2 text-slate-400 hover:text-amber-500 rounded-xl cursor-pointer"
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-500" /> : <Bookmark className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setSelectedPreviewItem(item)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Preview
                  </button>

                  <button
                    onClick={() => handleDownload(item)}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {selectedPreviewItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] border border-slate-200 max-w-xl w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl border ${getTypeBadge(selectedPreviewItem.type).bg}`}>
                  {getTypeBadge(selectedPreviewItem.type).icon}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-600">
                    {selectedPreviewItem.category} • {selectedPreviewItem.type}
                  </span>
                  <h3 className="text-sm font-black text-slate-900 line-clamp-1">{selectedPreviewItem.title}</h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedPreviewItem(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Overview & Excerpt */}
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase block">Document Summary:</span>
                <p className="text-slate-700 font-medium leading-relaxed">{selectedPreviewItem.description}</p>
              </div>

              {selectedPreviewItem.previewExcerpt && (
                <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-1.5 font-mono text-[11px] text-indigo-950">
                  <span className="text-[9px] font-black uppercase text-indigo-600 block">
                    📄 Verified Excerpt / Key Clause Preview:
                  </span>
                  <p className="italic leading-relaxed">{selectedPreviewItem.previewExcerpt}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-[11px] font-bold text-slate-600 pt-2">
                <div>
                  <span className="text-[10px] text-slate-400 block">Enrolled Course:</span>
                  <span className="text-slate-900">{selectedPreviewItem.courseTitle}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">File Details:</span>
                  <span className="text-slate-900">
                    {selectedPreviewItem.fileSize} • {selectedPreviewItem.downloadCount} Downloads
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedPreviewItem(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  handleDownload(selectedPreviewItem);
                  setSelectedPreviewItem(null);
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-100"
              >
                <Download className="w-4 h-4" />
                <span>Download File ({selectedPreviewItem.fileSize})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-indigo-500/40 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-300">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{downloadToast}</span>
        </div>
      )}
    </div>
  );
};
