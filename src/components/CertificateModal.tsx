import React from 'react';
import { CertificateData } from '../types';
import { SocialShareButtons } from './SocialShareButtons';
import { X, Printer, ShieldCheck, Scale, Award, Download } from 'lucide-react';

interface CertificateModalProps {
  certificate: CertificateData | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-[32px] max-w-4xl w-full p-6 sm:p-8 text-slate-900 space-y-6 relative shadow-2xl">
        {/* Actions Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 print:hidden">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs">
            <ShieldCheck className="w-5 h-5" />
            <span>Official Digital Certificate</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-100"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Render Frame (Printable Area) */}
        <div id="printable-certificate" className="bg-white p-8 sm:p-12 rounded-[28px] border-4 border-indigo-600 relative text-center space-y-6 shadow-md overflow-hidden">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-indigo-600 pointer-events-none" />
          <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-indigo-600 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-indigo-600 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-indigo-600 pointer-events-none" />

          {/* Certificate Header */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
              <Scale className="w-10 h-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
              E-Lawyers Academy
            </h1>
            <p className="text-xs text-indigo-600 font-sans tracking-widest uppercase font-extrabold">
              Professional Online Legal & Business Learning Platform
            </p>
          </div>

          <div className="py-2">
            <p className="text-xs font-serif italic text-slate-500 uppercase tracking-widest">
              This is to certify that
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-indigo-900 mt-2 tracking-wide border-b-2 border-indigo-100 pb-2 inline-block px-8">
              {certificate.studentName}
            </h2>
          </div>

          <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed font-sans">
            has successfully completed the comprehensive training program and satisfied all course requirements, assignments, and assessments for:
          </p>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 max-w-2xl mx-auto">
            "{certificate.courseTitle}"
          </h3>

          <div className="pt-4 grid grid-cols-3 gap-4 items-end max-w-2xl mx-auto text-xs text-slate-600 border-t border-slate-100">
            <div className="text-center space-y-1">
              <span className="font-extrabold text-slate-900 block text-sm">
                {certificate.issueDate}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Date of Issuance</span>
            </div>

            <div className="text-center space-y-1">
              <div className="w-14 h-14 mx-auto rounded-full bg-indigo-50 border-2 border-indigo-600 flex items-center justify-center text-indigo-600 shadow-sm">
                <Award className="w-7 h-7" />
              </div>
              <span className="text-[10px] text-indigo-600 font-mono font-bold block uppercase mt-1">
                ID: {certificate.certId}
              </span>
            </div>

            <div className="text-center space-y-1">
              <span className="font-extrabold text-indigo-900 block text-sm">
                {certificate.instructorName}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Course Director</span>
            </div>
          </div>
        </div>

        {/* Social Sharing Section (Hidden when printing) */}
        <div className="print:hidden">
          <SocialShareButtons
            title={certificate.courseTitle}
            type="certificate"
            certId={certificate.certId}
          />
        </div>
      </div>
    </div>
  );
};
