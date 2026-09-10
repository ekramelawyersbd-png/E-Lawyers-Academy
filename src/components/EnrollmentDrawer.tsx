import React, { useState } from 'react';
import { Course } from '../types';
import {
  X,
  CreditCard,
  CheckCircle2,
  Lock,
  Printer,
  ShieldCheck,
  Building2,
  FileText,
  Smartphone,
} from 'lucide-react';

interface EnrollmentDrawerProps {
  course: Course | null;
  onClose: () => void;
  onEnrollSuccess: (course: Course) => void;
}

export const EnrollmentDrawer: React.FC<EnrollmentDrawerProps> = ({
  course,
  onClose,
  onEnrollSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card'>('bkash');
  const [phone, setPhone] = useState('+880 1711-223344');
  const [trxId, setTrxId] = useState('9A8B7C6D5E');
  const [isSuccess, setIsSuccess] = useState(false);
  const [invoice, setInvoice] = useState<any>(null);

  if (!course) return null;

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const inv = {
      invoiceNo: `INV-ELA-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      courseTitle: course.title,
      amount: course.price,
      method: paymentMethod.toUpperCase(),
      trxId: trxId,
      studentName: 'Ekramul Hoque',
      studentEmail: 'ekram.elawyersbd@gmail.com',
    };

    setInvoice(inv);
    setIsSuccess(true);
    onEnrollSuccess(course);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
      <div className="bg-white border-l border-slate-200 w-full max-w-xl h-full overflow-y-auto p-6 sm:p-8 text-slate-900 flex flex-col justify-between shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-100">
              Online Registration Checkout
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-2">Course Enrollment</h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isSuccess ? (
          <div className="space-y-6 text-xs">
            {/* Selected Course Summary */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-indigo-600 font-bold">{course.category} Practice Module</span>
              <h4 className="text-sm font-bold text-slate-900">{course.title}</h4>
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-slate-600">
                <span>Tuition Fee:</span>
                <span className="text-lg font-extrabold text-indigo-900 font-mono">
                  ৳{course.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-slate-700 font-bold">Select Mobile Banking / Card Payment</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-1 font-bold cursor-pointer transition-all ${
                    paymentMethod === 'bkash'
                      ? 'bg-rose-50 border-rose-500 text-rose-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-rose-600" />
                  <span>bKash</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('nagad')}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-1 font-bold cursor-pointer transition-all ${
                    paymentMethod === 'nagad'
                      ? 'bg-amber-50 border-amber-500 text-amber-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-amber-600" />
                  <span>Nagad</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border flex flex-col items-center justify-center gap-1 font-bold cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                  <span>Card / Net</span>
                </button>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleCompletePayment} className="space-y-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Account Phone Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl font-mono focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Transaction ID (TrxID)</label>
                <input
                  type="text"
                  required
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3 rounded-xl uppercase font-mono focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2.5 text-slate-500 text-[11px]">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Secured 256-bit SSL encrypted checkout with instant digital receipt generation.</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-100 cursor-pointer transition-all"
              >
                Confirm Payment & Unlock Course Portal
              </button>
            </form>
          </div>
        ) : (
          /* Payment Success & Invoice Receipt */
          <div className="space-y-6 text-xs">
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-[28px] text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">Enrollment Confirmed!</h3>
              <p className="text-slate-600">
                You have successfully unlocked access to <strong className="text-indigo-600">{course.title}</strong>.
              </p>
            </div>

            {/* Invoice Printable Receipt */}
            <div className="bg-slate-50 p-6 rounded-[28px] border border-slate-200 space-y-4 font-sans">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-extrabold text-indigo-900 text-xs tracking-wider">E-LAWYERS ACADEMY OFFICIAL INVOICE</span>
                <span className="text-slate-500 font-mono text-[11px]">{invoice?.invoiceNo}</span>
              </div>

              <div className="space-y-1.5 text-slate-600">
                <p>Student Name: <strong className="text-slate-900">{invoice?.studentName}</strong></p>
                <p>Email: {invoice?.studentEmail}</p>
                <p>Date: {invoice?.date}</p>
                <p>Payment Method: <strong className="text-emerald-600">{invoice?.method}</strong> (TrxID: {invoice?.trxId})</p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex justify-between font-bold text-sm">
                <span className="text-slate-700">Total Paid:</span>
                <span className="text-indigo-900 font-mono">৳{invoice?.amount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print Invoice
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer"
              >
                Go To My Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
