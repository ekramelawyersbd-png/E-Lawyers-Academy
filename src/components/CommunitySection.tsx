import React, { useState } from 'react';
import { CommunityPost } from '../types';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Sparkles,
  Share2,
  CheckCircle2,
  PlusCircle,
  Send,
} from 'lucide-react';

export const CommunitySection: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 'post-1',
      author: 'Advocate Mahmudul Hasan',
      authorRole: 'Supreme Court Lawyer',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      date: '2 hours ago',
      category: 'Tax Law Update',
      title: 'NBR Statutory Regulatory Order (SRO) on E-Return Rebate Adjustments 2026',
      content: 'Under the new circular issued yesterday, tax rebate claims on DPS savings are automatically populated on the e-Return portal if linked with e-TIN. Make sure your clients verify their bank statements before final submission!',
      likes: 42,
      commentsCount: 18,
      isLiked: false,
    },
    {
      id: 'post-2',
      author: 'Farhana Rahman, FCS',
      authorRole: 'VAT Auditor & Consultant',
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      date: 'Yesterday',
      category: 'VAT Compliance',
      title: 'Common Mistakes in Mushak 9.1 Monthly VAT Return Submission',
      content: 'Always double-check Section 4 (Input Tax Credit) against Mushak 6.3 invoices from suppliers. Discrepancies between input and output tax are triggering automatic NBR audit notices this month.',
      likes: 68,
      commentsCount: 29,
      isLiked: true,
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);

  const handleLike = (id: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            isLiked: !p.isLiked,
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: 'You (Legal Practitioner)',
      authorRole: 'Academy Member',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      date: 'Just now',
      category: 'General Discussion',
      title: newTitle,
      content: newContent,
      likes: 1,
      commentsCount: 0,
      isLiked: true,
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowPostForm(false);
  };

  return (
    <section id="community" className="py-12 lg:py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-7 space-y-3.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 text-indigo-800 text-[11px] font-black rounded-full uppercase tracking-widest border border-indigo-200/80 shadow-2xs">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Advocate Network & Forum</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Join Our <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Legal Community Forum</span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">
              Connect with Supreme Court advocates, chartered accountants, and tax consultants across Bangladesh for case discussions and statutory updates.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> NBR Directives
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Tax Case Studies
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Practical Q&A
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex lg:justify-end">
            <button
              onClick={() => setShowPostForm(!showPostForm)}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{showPostForm ? 'Close Form' : 'Post Legal Query'}</span>
            </button>
          </div>
        </div>

        {/* Create Post Form */}
        {showPostForm && (
          <form onSubmit={handleCreatePost} className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200 mb-8 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-indigo-900">Post a Query or Statutory Legal Update</h3>
            <input
              type="text"
              placeholder="Title of your post..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 text-xs text-slate-900 px-4 py-3 rounded-xl focus:outline-none"
            />
            <textarea
              rows={3}
              placeholder="Share details or ask a question regarding tax, VAT, or RJSC laws..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 text-xs text-slate-900 px-4 py-3 rounded-xl focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-100 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" /> Publish Post
            </button>
          </form>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((p) => (
            <div key={p.id} className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={p.authorAvatar}
                    alt={p.author}
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{p.author}</h4>
                    <p className="text-[11px] text-indigo-600 font-semibold">{p.authorRole} • {p.date}</p>
                  </div>
                </div>

                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-bold px-3 py-1 rounded-full">
                  {p.category}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.content}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <button
                  onClick={() => handleLike(p.id)}
                  className={`flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
                    p.isLiked ? 'text-indigo-600' : 'hover:text-slate-900'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{p.likes} Likes</span>
                </button>

                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 font-medium">
                    <MessageSquare className="w-4 h-4 text-indigo-600" /> {p.commentsCount} Comments
                  </span>
                  <span className="flex items-center gap-1 hover:text-slate-900 cursor-pointer font-medium">
                    <Share2 className="w-4 h-4" /> Share
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
