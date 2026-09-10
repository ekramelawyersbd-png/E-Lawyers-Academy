import React from 'react';
import {
  FileText,
  Building2,
  Receipt,
  Scale,
  Globe2,
  FileSpreadsheet,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Check,
  Headphones,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const services = [
    {
      id: 'income-tax',
      title: 'Individual E-Return & Tax Planning',
      category: 'Income Tax Act 2023',
      icon: Calculator,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      badge: 'Popular',
      desc: 'Complete assistance for personal income tax calculation, rebate optimization under Section 78, wealth statement preparation, and e-Return portal submission.',
      features: [
        'Section 78 Investment Rebate Maxing',
        'Foreign Asset & Remittance Exemption',
        'Instant NBR Ack Slip & Tax Certificate',
      ],
    },
    {
      id: 'corporate-tax',
      title: 'Corporate Tax & Assessment Defense',
      category: 'Corporate Advisory',
      icon: Building2,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      badge: 'High Demand',
      desc: 'End-to-end corporate tax compliance, audited statement review, TDS deduction returns (Section 75A), and Deputy Commissioner of Taxes (DCT) assessment hearing defense.',
      features: [
        'Audit Defense under Section 93 Notices',
        'Section 30 Disallowance Risk Audit',
        'Advance Tax (Section 89) Calculation',
      ],
    },
    {
      id: 'vat-sd',
      title: 'VAT & Supplementary Duty Compliance',
      category: 'VAT & SD Act 2012',
      icon: Receipt,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      badge: 'NBS Portal',
      desc: 'Monthly Mushak 9.1 return filing, Input Tax Credit (Mushak 6.3) reconciliation, VDS certificate management (Mushak 6.6), and VAT audit defense.',
      features: [
        'Mushak 6.1, 6.2 & 6.3 Invoice Registers',
        'VDS Treasury Reconciliation',
        'Customs & Commercial Import VAT',
      ],
    },
    {
      id: 'high-court-tribunal',
      title: 'Appellate Tribunal & High Court Appeals',
      category: 'Legal Drafting & Appeals',
      icon: Scale,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      badge: 'Legal Defense',
      desc: 'Professional drafting of Grounds of Appeal, Memorandum of Appeal (Section 158), stay of recovery applications, and High Court Writ Petition preparation.',
      features: [
        'Section 154 Appeal before Commissioner',
        'Taxes Appellate Tribunal Bench Briefs',
        'Supreme Court High Court Writ Petitions',
      ],
    },
    {
      id: 'rjsc-secretarial',
      title: 'RJSC Incorporation & Corporate Governance',
      category: 'Company Law',
      icon: FileSpreadsheet,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      badge: 'RJSC Entity',
      desc: 'Private limited company incorporation, name clearance, Form XII director updates, share transfer approval, and annual return submissions to RJSC.',
      features: [
        'Name Clearance & Memorandum (MoA/AoA)',
        'Share Transfer & Winding Up Guidance',
        'Foreign Direct Investment (FDI) & BIDA',
      ],
    },
    {
      id: 'nrb-tax-advisory',
      title: 'NRB & Cross-Border Remittance Tax',
      category: 'International Tax',
      icon: Globe2,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      badge: 'Global NRB',
      desc: 'Specialized tax advisory for Non-Resident Bangladeshis (NRBs), wage earners remittance exemptions, double taxation treaties (DTAA), and offshore property reporting.',
      features: [
        'DTAA Tax Credit Claims',
        'Offshore Wealth & Savings Certificates',
        'Repatriation & Banking Capital Rules',
      ],
    },
  ];

  return (
    <section id="services" className="py-12 lg:py-16 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3.5">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-indigo-50 text-indigo-800 text-[11px] font-black rounded-full uppercase tracking-widest border border-indigo-200/80 shadow-2xs">
            <Scale className="w-3.5 h-3.5 text-indigo-600" />
            <span>Professional Tax & Legal Services</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
            Comprehensive <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Consulting & Advisory</span>
          </h2>
          <p className="text-slate-700 text-base font-medium leading-relaxed">
            Expert solutions for individual taxpayers, corporate enterprises, law practitioners, and Non-Resident Bangladeshis worldwide.
          </p>
        </div>

        {/* 6 Services Cards Grid with Enhanced Lucide Icons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => {
            const IconComponent = svc.icon;
            return (
              <div
                key={svc.id}
                className="bg-slate-50/80 rounded-[32px] border border-slate-200/80 p-8 flex flex-col justify-between hover:bg-white hover:border-indigo-300 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-xs ${svc.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-700 shadow-2xs">
                      {svc.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 block">
                    {svc.category}
                  </span>

                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {svc.desc}
                  </p>

                  <div className="pt-4 border-t border-slate-200/60 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Key Deliverables:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {svc.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 font-medium">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    <span>NBR Compliant</span>
                  </span>

                  <button
                    onClick={() => onSelectService && onSelectService(svc.title)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer group-hover:translate-x-0.5"
                  >
                    <span>Book Advisory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
