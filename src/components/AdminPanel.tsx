import React, { useState } from 'react';
import { Course, LiveClass, RecordedClass } from '../types';
import { WebhookLogsView } from './WebhookLogsView';
import {
  BookOpen,
  Users,
  Video,
  CreditCard,
  Award,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  ShieldCheck,
  PlusCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Activity,
} from 'lucide-react';

interface AdminPanelProps {
  courses: Course[];
  liveClasses: LiveClass[];
  recordedClasses: RecordedClass[];
  onAddCourse: (newCourse: Course) => void;
  onAddLiveClass: (newLive: LiveClass) => void;
  onAddRecordedClass: (newRec: RecordedClass) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  courses,
  liveClasses,
  recordedClasses,
  onAddCourse,
  onAddLiveClass,
  onAddRecordedClass,
}) => {
  const [activeTab, setActiveTab] = useState<
    'courses' | 'students' | 'classes' | 'payments' | 'certs' | 'webhooks'
  >('courses');

  // New Course Form State
  const [courseTitle, setCourseTitle] = useState('');
  const [category, setCategory] = useState<'Taxation' | 'VAT' | 'Corporate' | 'Legal' | 'Business'>('Taxation');
  const [price, setPrice] = useState(4500);

  // New Live Class Form State
  const [liveTopic, setLiveTopic] = useState('');
  const [liveInstructor, setLiveInstructor] = useState('Advocate Tanvir Ahmed');
  const [liveDate, setLiveDate] = useState('15 August 2026');

  // New Certificate Form State
  const [issuedCert, setIssuedCert] = useState<any>(null);
  const [studentName, setStudentName] = useState('');
  const [certCourse, setCertCourse] = useState('Personal Income Tax Masterclass');

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim()) return;

    const newC: Course = {
      id: `course-${Date.now()}`,
      title: courseTitle,
      category: category as any,
      price: price,
      originalPrice: price + 3500,
      duration: '8 Weeks',
      totalClasses: 16,
      level: 'All Levels',
      rating: 5.0,
      enrolledStudents: 1,
      overview: 'Newly published practical legal and tax compliance program.',
      instructorName: liveInstructor,
      instructorRole: 'Supreme Court Advocate',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      whatYouWillLearn: ['Master latest legal guidelines', 'Complete e-filing demos'],
      modules: [
        { id: 'm1', number: 1, title: 'Introduction & Foundations', topics: ['Basic legal frameworks'] },
      ],
      courseIncludes: ['Live Sessions', 'Recorded Library', 'Certificate'],
    };

    onAddCourse(newC);
    setCourseTitle('');
    alert('New Course Published Successfully to Platform Catalog!');
  };

  const handleCreateLiveClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveTopic.trim()) return;

    const newL: LiveClass = {
      id: `live-${Date.now()}`,
      courseTitle: 'Income Tax Practical Training',
      topic: liveTopic,
      date: liveDate,
      time: '8:00 PM',
      instructor: liveInstructor,
      status: 'Upcoming',
      attendeesCount: 0,
      meetingUrl: '#',
    };

    onAddLiveClass(newL);
    setLiveTopic('');
    alert('Upcoming Live Class Scheduled & Notifications Sent!');
  };

  const handleIssueCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    const certId = `ELA-2026-CERT-${Math.floor(1000 + Math.random() * 9000)}`;
    setIssuedCert({
      certId,
      studentName,
      courseTitle: certCourse,
      issueDate: 'August 06, 2026',
      instructorName: 'Advocate Tanvir Ahmed',
      grade: 'Distinction',
    });
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white py-10 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-2xl border border-slate-800 p-6 shadow-2xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-600 rounded-xl text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-white">Academy Admin Control Panel</h1>
              <p className="text-xs text-slate-300">Management interface for Courses, Live Classes, Video Library, and Certificates</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">TOTAL REVENUE</span>
              <span className="text-emerald-400 font-bold font-mono">BDT 12,45,000</span>
            </div>
            <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">TOTAL STUDENTS</span>
              <span className="text-amber-400 font-bold">1,280 Enrolled</span>
            </div>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 mb-8">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'courses' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Course Management
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'classes' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" /> Live & Video Management
          </button>
          <button
            onClick={() => setActiveTab('certs')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'certs' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" /> Certificate Generator
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'students' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" /> Student Roster
          </button>
          <button
            onClick={() => setActiveTab('webhooks')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'webhooks' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" /> Webhook Logs
          </button>
        </div>

        {/* TAB 1: COURSE MANAGEMENT */}
        {activeTab === 'courses' && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <PlusCircle className="w-5 h-5" /> Publish New Course
              </h3>

              <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Banking & Bankruptcy Litigation Law"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-white px-3 py-2 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e: any) => setCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white px-3 py-2 rounded-xl"
                    >
                      <option value="Taxation">Taxation</option>
                      <option value="VAT">VAT Compliance</option>
                      <option value="Corporate">Corporate Law</option>
                      <option value="Legal">Legal Drafting</option>
                      <option value="Business">Business Mgmt</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Fee (BDT)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 text-white px-3 py-2 rounded-xl"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl cursor-pointer"
                >
                  Publish Course To Website
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Active Catalog Courses ({courses.length})</h3>

              <div className="space-y-3 text-xs">
                {courses.map((c) => (
                  <div key={c.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] bg-blue-950 text-blue-300 font-bold px-2 py-0.5 rounded">
                        {c.category}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-1">{c.title}</h4>
                      <p className="text-slate-400">Instructor: {c.instructorName}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-amber-400 font-bold font-mono">BDT {c.price.toLocaleString()}</span>
                      <span className="text-[10px] text-emerald-400 block font-semibold">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE & VIDEO MANAGEMENT */}
        {activeTab === 'classes' && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
                <Video className="w-5 h-5" /> Schedule Live Class
              </h3>

              <form onSubmit={handleCreateLiveClass} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Live Topic</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Land Registry & Conveyancing Practice"
                    value={liveTopic}
                    onChange={(e) => setLiveTopic(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white px-3 py-2 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Instructor</label>
                  <input
                    type="text"
                    value={liveInstructor}
                    onChange={(e) => setLiveInstructor(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white px-3 py-2 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl cursor-pointer"
                >
                  Schedule Live Session
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Scheduled Live Sessions</h3>
              <div className="space-y-3 text-xs">
                {liveClasses.map((lc) => (
                  <div key={lc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{lc.topic}</h4>
                      <p className="text-slate-400">{lc.date} • {lc.time}</p>
                    </div>
                    <span className="text-amber-400 font-bold text-xs">{lc.attendeesCount} Registered</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CERTIFICATE GENERATOR */}
        {activeTab === 'certs' && (
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <Award className="w-5 h-5" /> Issue Official Certificate
              </h3>

              <form onSubmit={handleIssueCert} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nusrat Jahan"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white px-3 py-2 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Course Title</label>
                  <input
                    type="text"
                    value={certCourse}
                    onChange={(e) => setCertCourse(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white px-3 py-2 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl cursor-pointer"
                >
                  Generate Verified Certificate ID
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Generated Certificate Receipt</h3>

              {issuedCert ? (
                <div className="bg-slate-950 p-6 rounded-2xl border-2 border-emerald-500 space-y-3 text-xs text-slate-200">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" /> Certificate Successfully Registry Logged!
                  </div>
                  <p>Certificate ID: <strong className="font-mono text-amber-400">{issuedCert.certId}</strong></p>
                  <p>Student: <strong className="text-white">{issuedCert.studentName}</strong></p>
                  <p>Course: {issuedCert.courseTitle}</p>
                  <p>Issue Date: {issuedCert.issueDate}</p>
                </div>
              ) : (
                <p className="text-xs text-slate-400">Fill form to generate and preview instant verified certificate ID.</p>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: STUDENT ROSTER */}
        {activeTab === 'students' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Enrolled Students Roster (1,280 Total)</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Ekramul Hoque</p>
                  <p className="text-slate-400">ekram.elawyersbd@gmail.com • Legal Practitioner</p>
                </div>
                <span className="text-amber-400 font-bold">2 Enrolled Courses</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Nusrat Jahan</p>
                  <p className="text-slate-400">nusrat@lawfirm.bd • Income Tax Practitioner</p>
                </div>
                <span className="text-amber-400 font-bold">1 Enrolled Course</span>
              </div>
            </div>
          </div>
        )}
        {/* TAB 5: WEBHOOKS LOGS */}
        {activeTab === 'webhooks' && (
          <WebhookLogsView />
        )}
      </div>
    </div>
  );
};
