import React, { useState } from 'react';
import { LiveClass } from '../types';
import {
  X,
  Send,
  Users,
  Hand,
  MessageSquare,
  FileText,
  Video,
  Mic,
  MicOff,
  ScreenShare,
  Sparkles,
  Radio,
  Download,
} from 'lucide-react';

interface LiveClassRoomModalProps {
  liveClass: LiveClass | null;
  onClose: () => void;
}

export const LiveClassRoomModal: React.FC<LiveClassRoomModalProps> = ({
  liveClass,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'qna' | 'materials'>('chat');
  const [chatInput, setChatInput] = useState('');
  const [handRaised, setHandRaised] = useState(false);
  const [viewMode, setViewMode] = useState<'portal' | 'instructor'>('portal');

  const [chatMessages, setChatMessages] = useState([
    { sender: 'Advocate Tanvir Ahmed', role: 'Instructor', text: 'Welcome everyone! Today we are demonstrating line-by-line E-Return filing on the etaxnbr portal.', time: '8:01 PM' },
    { sender: 'Nusrat Jahan', role: 'Student', text: 'Sir, how do we adjust DPS tax rebate on the online portal?', time: '8:03 PM' },
    { sender: 'Shafiqul Islam', role: 'Student', text: 'Is the salary certificate mandatory to upload as PDF?', time: '8:05 PM' },
  ]);

  if (!liveClass) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages([
      ...chatMessages,
      { sender: 'You (Student)', role: 'Student', text: chatInput, time: 'Just now' },
    ]);
    setChatInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white border border-slate-200 rounded-[32px] max-w-6xl w-full h-[90vh] flex flex-col overflow-hidden shadow-2xl text-slate-900">
        {/* Top Header Bar */}
        <div className="bg-slate-50 p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span className="text-[10px] font-extrabold uppercase text-rose-700 tracking-wider">LIVE CLASS</span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                {liveClass.topic}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {liveClass.courseTitle} • Instructor: {liveClass.instructor}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 font-bold">
              <Users className="w-3.5 h-3.5" /> 342 Active Students
            </span>
            <button
              onClick={onClose}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Grid: Video Screen Left, Chat Panel Right */}
        <div className="flex-1 grid lg:grid-cols-12 overflow-hidden">
          {/* Left: Video & Screen Share Box */}
          <div className="lg:col-span-8 bg-slate-900 p-4 flex flex-col justify-between border-r border-slate-200 relative">
            {/* View Mode Toggle Controls */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md p-1 rounded-2xl border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('portal')}
                className={`px-3 py-1 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'portal' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ScreenShare className="w-3.5 h-3.5" /> Portal Screen Share
              </button>
              <button
                onClick={() => setViewMode('instructor')}
                className={`px-3 py-1 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === 'instructor' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" /> Instructor Camera
              </button>
            </div>

            {/* Video Canvas Simulation */}
            <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative flex items-center justify-center my-2">
              {viewMode === 'portal' ? (
                <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-100">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="font-mono text-xs text-emerald-400">etaxnbr.gov.bd - Live E-Return Demo</span>
                    </div>
                    <span className="text-[10px] bg-indigo-900 text-indigo-200 px-2.5 py-0.5 rounded-full border border-indigo-700 font-bold">
                      Step 5: Salary & Asset Declaration
                    </span>
                  </div>

                  <div className="space-y-3 my-auto max-w-lg mx-auto bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-indigo-400">NBR Income Tax Form IT-11GA</span>
                      <span className="text-[10px] text-slate-400">Assessment Year 2026-2027</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between bg-slate-950 p-2.5 rounded-xl">
                        <span className="text-slate-400">Gross Salary Income:</span>
                        <span className="font-mono font-bold text-white">BDT 12,00,000</span>
                      </div>
                      <div className="flex justify-between bg-slate-950 p-2.5 rounded-xl">
                        <span className="text-slate-400">Exempted Allowance:</span>
                        <span className="font-mono text-emerald-400">BDT (3,00,000)</span>
                      </div>
                      <div className="flex justify-between bg-slate-950 p-2.5 rounded-xl">
                        <span className="text-slate-400">Allowable Investment Rebate (15%):</span>
                        <span className="font-mono text-indigo-400">BDT 45,000</span>
                      </div>
                      <div className="flex justify-between bg-indigo-950 p-3 rounded-xl font-bold border border-indigo-800">
                        <span className="text-indigo-200">Net Tax Payable:</span>
                        <span className="font-mono text-indigo-300">BDT 38,500</span>
                      </div>
                    </div>
                  </div>

                  {/* Instructor Picture-in-Picture */}
                  <div className="absolute bottom-4 right-4 w-36 h-28 bg-slate-900 rounded-2xl border border-indigo-500/50 overflow-hidden shadow-2xl flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
                      alt="Advocate Tanvir Ahmed"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-1 left-1 bg-slate-950/80 px-2 py-0.5 rounded-md text-[9px] text-indigo-300 font-bold">
                      Advocate Tanvir
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
                    alt="Instructor"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-4">
                    <div className="bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800">
                      <p className="font-bold text-sm text-white">{liveClass.instructor}</p>
                      <p className="text-xs text-indigo-400 font-medium">Senior Supreme Court Advocate & Tax Master</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Stream Controls */}
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setHandRaised(!handRaised)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    handRaised
                      ? 'bg-indigo-600 text-white animate-bounce'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Hand className="w-4 h-4" />
                  <span>{handRaised ? 'Hand Raised!' : 'Raise Hand'}</span>
                </button>

                <span className="text-xs text-slate-400 hidden sm:inline font-medium">
                  Interactive Q&A Session Active
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  1080p Stream
                </span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Chat / Q&A Panel */}
          <div className="lg:col-span-4 bg-white flex flex-col justify-between overflow-hidden">
            {/* Panel Tabs */}
            <div className="flex items-center border-b border-slate-200 bg-slate-50">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'chat'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Live Chat ({chatMessages.length})
              </button>
              <button
                onClick={() => setActiveTab('qna')}
                className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'qna'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Ask Q&A
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'materials'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Docs (2)
              </button>
            </div>

            {/* Chat Body */}
            {activeTab === 'chat' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3.5 rounded-2xl border ${
                      msg.role === 'Instructor'
                        ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`font-extrabold ${
                          msg.role === 'Instructor' ? 'text-indigo-700' : 'text-slate-900'
                        }`}
                      >
                        {msg.sender}
                      </span>
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                    </div>
                    <p className="leading-relaxed font-medium">{msg.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Q&A Body */}
            {activeTab === 'qna' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs text-slate-700">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <p className="font-extrabold text-indigo-900">Q: Can a non-resident Bangladeshi file e-Return?</p>
                  <p className="text-slate-600 leading-relaxed font-medium">A: Yes! NBR has introduced a dedicated NRB tab on etaxnbr.gov.bd requiring passport & foreign TIN verification.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <p className="font-extrabold text-indigo-900">Q: What is the deadline for individual returns in 2026?</p>
                  <p className="text-slate-600 leading-relaxed font-medium">A: Standard tax day is November 30, 2026 (or extended per NBR notification).</p>
                </div>
              </div>
            )}

            {/* Materials Body */}
            {activeTab === 'materials' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="font-bold text-slate-900">IT-11GA_Return_Guide.pdf</p>
                      <p className="text-[10px] text-slate-500 font-medium">Official NBR Template • 2.4 MB</p>
                    </div>
                  </div>
                  <button className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl cursor-pointer">
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-bold text-slate-900">Tax_Slab_Calculator_2026.xlsx</p>
                      <p className="text-[10px] text-slate-500 font-medium">Excel Worksheet • 1.1 MB</p>
                    </div>
                  </div>
                  <button className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl cursor-pointer">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask instructor or comment..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-white border border-slate-200 focus:border-indigo-600 text-xs text-slate-900 px-4 py-2.5 rounded-xl focus:outline-none"
              />
              <button
                type="submit"
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl cursor-pointer shadow-md shadow-indigo-100"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
