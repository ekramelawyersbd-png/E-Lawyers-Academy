import React from 'react';
import { Download, Printer, X, ShieldCheck, CheckCircle2, Building2, CreditCard, FileText } from 'lucide-react';

export interface PaymentItem {
  id: string;
  date: string;
  amount: number;
  courseTitle: string;
  status: string;
  invoiceNo: string;
  paymentMethod?: string;
  transactionId?: string;
}

interface InvoiceReceiptModalProps {
  payment: PaymentItem | null;
  student: {
    name: string;
    email: string;
    phone: string;
    designation: string;
  };
  onClose: () => void;
}

export const InvoiceReceiptModal: React.FC<InvoiceReceiptModalProps> = ({
  payment,
  student,
  onClose,
}) => {
  if (!payment) return null;

  const subtotal = Math.round(payment.amount / 1.05);
  const vatAmount = payment.amount - subtotal;
  const paymentMethod = payment.paymentMethod || 'bKash / Digital Banking';
  const transactionId = payment.transactionId || `TXN-${payment.invoiceNo.replace('INV-', '')}-BD`;

  const handlePrintPDF = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Generate styled print preview & call window.print() which allows direct "Save as PDF"
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Print Specific CSS to ensure clean 1-page PDF export */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible !important;
          }
          #printable-invoice {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            box-shadow: none !important;
            border: none !important;
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="bg-white rounded-[32px] border border-slate-200 max-w-2xl w-full my-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col">
        {/* Modal Action Header (Hidden during Print) */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 no-print">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Payment Receipt & Tax Invoice</h3>
              <p className="text-xs text-slate-300">Invoice #{payment.invoiceNo}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintPDF}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Export as PDF using browser print engine"
            >
              <Printer className="w-4 h-4" />
              <span>Export to PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE INVOICE CARD */}
        <div id="printable-invoice" className="p-8 sm:p-10 space-y-8 bg-white text-slate-900">
          {/* Header Brand & Status */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-900 text-white font-extrabold text-lg flex items-center justify-center">
                  E
                </div>
                <span className="text-xl font-black text-slate-900 tracking-tight">
                  eLawyers<span className="text-indigo-600">BD</span>
                </span>
                <span className="bg-indigo-100 text-indigo-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Academy
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Bangladesh's Premier E-Learning Portal for Tax & Corporate Law
              </p>
              <p className="text-[11px] text-slate-400">
                Supreme Court Bar Annex, Level 5, Dhaka-1000 • Reg No: NBR-EDU-88492
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>{payment.status}</span>
              </span>
              <h2 className="text-xl font-mono font-black text-slate-900 mt-2">{payment.invoiceNo}</h2>
              <p className="text-xs text-slate-500 font-medium">Date: {payment.date}</p>
            </div>
          </div>

          {/* Customer & Transaction Info */}
          <div className="grid sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs">
            {/* Customer Information */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider block">
                Billed To (Student)
              </span>
              <h4 className="font-extrabold text-slate-900 text-sm">{student.name}</h4>
              <p className="text-slate-600 font-medium">{student.designation || 'Enrolled Advocate / Tax Practitioner'}</p>
              <p className="text-slate-500">{student.email}</p>
              <p className="text-slate-500">{student.phone || '+880 1700-000000'}</p>
            </div>

            {/* Payment Gateway Information */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase text-indigo-600 tracking-wider block">
                Payment Method & Reference
              </span>
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                <span>{paymentMethod}</span>
              </p>
              <p className="text-slate-600 font-mono">
                Transaction ID: <strong className="text-slate-900">{transactionId}</strong>
              </p>
              <p className="text-slate-500">Currency: BDT (Bangladeshi Taka - ৳)</p>
              <p className="text-slate-500">NBR VAT Reg: 002938142-0101</p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-extrabold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Course Description</th>
                  <th className="p-3.5 text-center">Qty</th>
                  <th className="p-3.5 text-right">Tuition Fee (BDT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                <tr>
                  <td className="p-3.5">
                    <p className="font-extrabold text-slate-900">{payment.courseTitle}</p>
                    <p className="text-[11px] text-slate-500">
                      Full Course Enrolment + Interactive Live Sessions + Lifetime Recording Access + Official Certificate
                    </p>
                  </td>
                  <td className="p-3.5 text-center font-mono">1</td>
                  <td className="p-3.5 text-right font-mono font-bold">৳{subtotal.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Calculation */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-2">
            <div className="space-y-2 max-w-xs">
              <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl text-[11px] font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified NBR Digital Tax Invoice</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                This receipt is computer-generated and constitutes official proof of tuition payment for eLawyersBD Academy legal programs.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-2 border-t border-slate-200 pt-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Course Subtotal:</span>
                <span className="font-mono font-bold">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Statutory VAT (5%):</span>
                <span className="font-mono font-bold">৳{vatAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-300">
                <span>Total Amount Paid:</span>
                <span className="font-mono text-indigo-700">৳{payment.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Official Stamp & Sign */}
          <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-[11px] text-slate-500">
            <div>
              <p className="font-bold text-slate-800">eLawyersBD Accounts & Finance Department</p>
              <p>Email: billing@elawyersbd.com • Support: +880 1700-000000</p>
            </div>

            <div className="text-center space-y-1">
              <div className="w-32 h-10 border-b border-slate-400 mx-auto flex items-end justify-center pb-1">
                <span className="font-serif italic text-indigo-900 font-bold text-xs">Adv. Tanvir Ahmed</span>
              </div>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Authorized Signature</p>
            </div>
          </div>
        </div>

        {/* Modal Footer (Hidden in Print) */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <p className="text-xs text-slate-500 font-medium">
            Click "Export to PDF" to save or print a PDF receipt copy directly.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handlePrintPDF}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Export / Print PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
