import React, { useState } from 'react';
import { X, ShieldCheck, Search, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface CertificateVerifierModalProps {
  onClose: () => void;
}

export const CertificateVerifierModal: React.FC<CertificateVerifierModalProps> = ({
  onClose,
}) => {
  const [certInput, setCertInput] = useState('ELA-2026-TAX-8912');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certInput.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/certificates/verify/${encodeURIComponent(certInput.trim())}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({
        verified: false,
        message: 'Network error or system busy. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-[32px] max-w-lg w-full p-6 sm:p-8 text-slate-900 space-y-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-extrabold text-slate-900">Certificate Verification</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Enter the unique Certificate ID printed on your official E-Lawyers Academy certificate to verify authenticity against our central registry.
        </p>

        <form onSubmit={handleVerify} className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. ELA-2026-TAX-8912"
            value={certInput}
            onChange={(e) => setCertInput(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-600 text-xs text-slate-900 px-4 py-3 rounded-xl uppercase font-mono tracking-wider focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-100 shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Verify</span>
          </button>
        </form>

        {/* Verification Result Display */}
        {result && (
          <div className="pt-2">
            {result.verified ? (
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-[24px] space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Valid & Authenticated Certificate</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700 font-sans border-t border-emerald-200/80 pt-3">
                  <p>Certificate ID: <strong className="font-mono text-indigo-900">{result.certificateId}</strong></p>
                  <p>Student Name: <strong className="text-slate-900">{result.studentName}</strong></p>
                  <p>Course: <strong className="text-slate-900">{result.courseTitle}</strong></p>
                  <p>Issued Date: {result.issueDate}</p>
                  <p>Director: {result.instructorName}</p>
                  <p>Result: <strong className="text-emerald-700 font-bold">{result.grade}</strong></p>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 border border-rose-200 p-5 rounded-[24px] space-y-2">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>Verification Failed</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{result.message}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
