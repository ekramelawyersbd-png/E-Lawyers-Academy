import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, FileText } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What happens if I miss a live class?',
      a: 'All live sessions are recorded and automatically uploaded to your student dashboard within 2 hours after class completes, so you can watch and revise anytime at your convenience.',
    },
    {
      q: 'How long will I have access to recorded class archives?',
      a: 'Access duration depends on your selected course package. Professional Plan students enjoy lifetime access to recorded classes, statutory templates, and downloadable resources.',
    },
    {
      q: 'Will I receive a verified certificate upon completion?',
      a: 'Yes! Students who successfully complete the course requirements, case assignments, and final assessments will receive an official verifiable digital certificate featuring a unique QR verification code from E-Lawyers Academy.',
    },
    {
      q: 'Who can join these legal and tax masterclasses?',
      a: 'Our courses are specifically structured for Advocates & Law Students, Tax Practitioners & Accountants, Business Owners & Entrepreneurs, and Corporate Managers & Compliance Officers.',
    },
    {
      q: 'Can I access classes and submit e-Returns from my mobile device?',
      a: 'Yes! Our portal is 100% mobile-responsive. You can attend live Zoom/portal classes, stream high-definition recorded videos, and manage personal study notes seamlessly from your smartphone, tablet, or laptop.',
    },
    {
      q: 'How do I get consultation for corporate tax assessment defense?',
      a: 'You can book direct legal tax advisory through our Services section or contact our legal desk via WhatsApp / phone to schedule a remote or in-person consultation with senior Supreme Court tax advocates.',
    },
  ];

  // JSON-LD Structured Data Schema for Search Engine SEO
  const jsonLdFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.a,
      },
    })),
  };

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-12 lg:py-16 bg-slate-50 text-slate-900 border-t border-slate-200/80">
      {/* Inject JSON-LD Schema Markup into Document for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3.5">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-indigo-50 text-indigo-800 text-[11px] font-black rounded-full uppercase tracking-widest border border-indigo-200/80 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span>Common Inquiries & FAQs</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            Frequently Asked <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">
            Everything you need to know about live workshops, recorded archives, verified certificates, and legal consultation services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-[24px] border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer gap-4"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/60 faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
