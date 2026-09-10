import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-12 lg:py-16 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-indigo-50 text-indigo-800 text-[11px] font-black rounded-full uppercase tracking-widest border border-indigo-200/80 shadow-2xs">
              <Phone className="w-3.5 h-3.5 text-indigo-600" />
              <span>Admission Helpline</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              Get in Touch with Our <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Legal Advisors</span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed">
              Our academic counselors are available to answer course questions, assist with online enrollment, or schedule corporate team training.
            </p>

            <div className="space-y-4 pt-2 text-xs sm:text-sm">
              <div className="flex items-start gap-4 bg-white p-5 rounded-[24px] border border-slate-200 shadow-sm">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Phone / Helpline:</p>
                  <p className="text-slate-600 font-mono mt-0.5">+880 1700-000000 / +880 1800-112233</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-5 rounded-[24px] border border-slate-200 shadow-sm">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Email Address:</p>
                  <p className="text-slate-600 font-mono mt-0.5">info@elawyersacademy.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-5 rounded-[24px] border border-slate-200 shadow-sm">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Academy Address:</p>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">Supreme Court Bar Annex, Segunbagicha, Dhaka-1000, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-2xl font-extrabold text-slate-900">Submit Course Inquiry</h3>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-[28px] text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">Inquiry Received Successfully!</h4>
                <p className="text-xs text-slate-600">
                  Thank you, <strong className="text-indigo-600">{formData.name}</strong>. Our counselor will contact you via email or phone within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', message: '' });
                  }}
                  className="px-5 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl hover:bg-indigo-700 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Advocate / Professional Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 text-slate-900 px-4 py-3 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 text-slate-900 px-4 py-3 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+880 1711-XXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 text-slate-900 px-4 py-3 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Message / Course Inquiry</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us which course or guidance you need..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-600 text-slate-900 px-4 py-3 rounded-xl focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-100 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
