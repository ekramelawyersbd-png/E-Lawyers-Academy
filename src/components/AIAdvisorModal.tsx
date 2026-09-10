import React, { useState } from 'react';
import { X, Sparkles, Send, Loader2, BookOpen, CheckCircle2 } from 'lucide-react';

interface AIAdvisorModalProps {
  onClose: () => void;
  onSelectRecommendedCourse: (courseTitle: string) => void;
}

export const AIAdvisorModal: React.FC<AIAdvisorModalProps> = ({
  onClose,
  onSelectRecommendedCourse,
}) => {
  const [background, setBackground] = useState('');
  const [goals, setGoals] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleGetRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!background.trim() || !goals.trim()) return;

    setLoading(true);
    setRecommendation(null);

    try {
      const res = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          professionalBackground: background,
          careerGoals: goals,
        }),
      });

      const data = await res.json();
      setRecommendation(data);
    } catch (err) {
      setRecommendation({
        suggestedCourse: 'Personal Income Tax & E-Return Filing Masterclass',
        reasoning: 'Based on your legal and tax practitioner goals in Bangladesh.',
        keyModulesToFocus: ['Income Tax Act 2023', 'E-Return Filing Demo', 'Investment Rebates'],
        estimatedCompletionTime: '6 Weeks',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-[32px] max-w-2xl w-full p-6 sm:p-8 text-slate-900 space-y-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">AI Legal & Tax Advisor</h3>
              <p className="text-[11px] text-slate-500 font-medium">Powered by Gemini AI Engine</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Tell us about your background (e.g., Law Student, Tax Consultant, FCS, Business Owner) and learning objectives to receive a personalized course path recommendation.
        </p>

        <form onSubmit={handleGetRecommendation} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Professional Background *</label>
            <input
              type="text"
              required
              placeholder="e.g. LL.B Graduate / Tax Consultant / Accountant"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 text-slate-900 px-4 py-3 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1.5">Primary Learning Goal *</label>
            <input
              type="text"
              required
              placeholder="e.g. Master E-Return filing for clients / RJSC corporate compliance"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 text-slate-900 px-4 py-3 rounded-xl focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-100 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{loading ? 'Analyzing Profile with Gemini AI...' : 'Generate Recommended Path'}</span>
          </button>
        </form>

        {/* AI Result Box */}
        {recommendation && (
          <div className="bg-indigo-50/70 p-6 rounded-[24px] border border-indigo-200 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>Recommended Course: {recommendation.suggestedCourse}</span>
            </div>

            <p className="text-slate-700 leading-relaxed">
              {recommendation.reasoning}
            </p>

            {recommendation.keyModulesToFocus && (
              <div>
                <p className="font-extrabold text-slate-500 uppercase text-[10px] mb-1.5 tracking-wider">Key Focus Modules:</p>
                <div className="flex flex-wrap gap-2">
                  {recommendation.keyModulesToFocus.map((m: string, idx: number) => (
                    <span key={idx} className="bg-white text-indigo-700 px-3 py-1 rounded-full border border-indigo-100 font-bold text-[11px]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                onClose();
                onSelectRecommendedCourse(recommendation.suggestedCourse);
              }}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer shadow-md shadow-indigo-100"
            >
              View & Enroll In Recommended Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
