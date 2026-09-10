import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Check, X, Info } from 'lucide-react';

export const CookieConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('bd_tax_cookie_consent');
      if (!consent) {
        setShowBanner(true);
      }
    } catch {
      // fallback
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('bd_tax_cookie_consent', 'accepted');
    } catch {
      // ignore
    }
    setShowBanner(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('bd_tax_cookie_consent', 'declined');
    } catch {
      // ignore
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 max-w-3xl mx-auto z-40 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-5 sm:p-6 rounded-[28px] border border-slate-800 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-black text-white">We Value Your Privacy & Preference Data</h4>
                <span className="text-[10px] font-extrabold bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-400/30">
                  Cookie & Privacy Notice
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-xl">
                We use essential cookies and local storage to save your enrolled course progress, study notes, daily streak counters, and portal preferences securely.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              onClick={handleDecline}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              Decline Optional
            </button>

            <button
              onClick={handleAccept}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-amber-400/20 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 text-slate-950" />
              <span>Accept Cookies</span>
            </button>
          </div>
        </div>

        {/* Collapsible Details */}
        {showDetails && (
          <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 text-[11px] text-slate-400 space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Data Usage Transparency</span>
            </div>
            <p>
              • <strong>Essential Storage:</strong> Used strictly to sync your study notes, daily streak data, and certificate verifications locally on your browser.
            </p>
            <p>
              • <strong>Zero Third-Party Tracking:</strong> We never sell or share your personal information or browsing habits with external advertisers.
            </p>
          </div>
        )}

        {/* Footer info link */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="hover:text-amber-300 underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Info className="w-3 h-3 text-slate-400" />
            <span>{showDetails ? 'Hide Details' : 'Learn more about our local storage policy'}</span>
          </button>

          <span className="font-mono text-slate-500">BD Tax & Legal Privacy Standard</span>
        </div>
      </div>
    </div>
  );
};
