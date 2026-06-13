'use client';

import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle, Calendar, Mail, Phone, User, MessageSquare, Crown } from 'lucide-react';

const plans = [
  { id: 'starter',  label: 'Starter',  price: '₹2,999' },
  { id: 'premium',  label: 'Premium',  price: '₹4,999' },
  { id: 'luxury',   label: 'Luxury',   price: '₹5,999' },
  { id: 'custom',   label: 'Custom',   price: 'Let\'s Talk' },
];

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess]       = useState(false);
  const [isError, setIsError]           = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', weddingDate: '', plan: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', weddingDate: '', plan: '', message: '' });
      setTimeout(() => setIsSuccess(false), 6000);
    } catch {
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full pl-12 pr-4 py-3.5 bg-cream-300/50 border border-gold-400/20 rounded-xl text-brown-800 placeholder:text-brown-300 focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400/20 transition-all duration-300 text-sm';

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-cream-300 pattern-bg">
      <div className="absolute inset-0 bg-radial-haldi pointer-events-none" />

      <div className="relative container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">Get In Touch</span>
            <h2 className="heading-lg mb-4">
              Let's Create Your <span className="gold-text">Dream Website</span>
            </h2>
            <div className="gold-divider mb-6 mx-0" />
            <p className="text-body mb-8">
              Ready to transform your wedding invitation into a stunning digital experience?
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-5">
              {[
                { icon: Mail,     label: 'Email Us',        value: 'deowaretechnology@gmail.com' },
                { icon: Phone,    label: 'Call / WhatsApp', value: '+91 8969457707' },
                { icon: Calendar, label: 'Response Time',   value: 'Within 24 hours' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-haldi-100 border border-gold-400/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-xs text-brown-400 uppercase tracking-wide">{label}</p>
                    <p className="text-brown-800 font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-card-lg border border-gold-400/15">
              <h3 className="font-display text-xl text-brown-800 mb-6">Send Us a Message</h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-300" />
                  <input
                    type="text" name="name" placeholder="Your Full Name"
                    value={formData.name} onChange={handleChange} required
                    className={inputClass}
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-300" />
                    <input
                      type="email" name="email" placeholder="Email Address"
                      value={formData.email} onChange={handleChange} required
                      className={inputClass}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-300" />
                    <input
                      type="tel" name="phone" placeholder="Phone Number"
                      value={formData.phone} onChange={handleChange} required
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Wedding Date */}
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-300" />
                  <input
                    type="date" name="weddingDate"
                    value={formData.weddingDate} onChange={handleChange} required
                    className={inputClass}
                  />
                </div>

                {/* ── Plan Selector ── */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-4 h-4 text-gold-500" />
                    <span className="text-sm font-medium text-brown-700">Choose Your Plan</span>
                    {formData.plan === '' && (
                      <span className="text-xs text-red-400 ml-auto">* required</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {plans.map((p) => {
                      const selected = formData.plan === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, plan: p.id }))}
                          className={`flex flex-col items-start px-4 py-3 rounded-xl border-2 text-left transition-all duration-200 ${
                            selected
                              ? 'border-gold-400 bg-amber-50 shadow-gold'
                              : 'border-gold-400/20 bg-cream-300/40 hover:border-gold-400/50 hover:bg-amber-50/50'
                          }`}
                        >
                          <span className={`text-sm font-semibold ${selected ? 'text-gold-600' : 'text-brown-700'}`}>
                            {p.label}
                          </span>
                          <span className={`text-xs mt-0.5 ${selected ? 'text-gold-500' : 'text-brown-400'}`}>
                            {p.price}
                          </span>
                          {selected && (
                            <span className="mt-1.5 text-[10px] bg-gold-400 text-white px-2 py-0.5 rounded-full font-medium">
                              Selected ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {/* hidden input so form validation knows plan is required */}
                  <input
                    type="text" name="plan" value={formData.plan}
                    onChange={() => {}} required
                    className="sr-only"
                    aria-hidden="true"
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-brown-300" />
                  <textarea
                    name="message" placeholder="Tell us about your wedding vision..."
                    value={formData.message} onChange={handleChange} rows={4}
                    className="w-full pl-12 pr-4 py-3.5 bg-cream-300/50 border border-gold-400/20 rounded-xl text-brown-800 placeholder:text-brown-300 focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400/20 transition-all duration-300 text-sm resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || formData.plan === ''}
                  className="w-full btn-primary justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting
                    ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Sending...</span></>
                    : <><Send className="w-5 h-5" /><span>Send Message</span></>}
                </button>

                {/* Success */}
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <p className="text-green-700 text-sm">
                      Message sent! We will contact you within 24 hours.
                    </p>
                  </motion.div>
                )}

                {/* Error */}
                {isError && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-red-700 text-sm">Something went wrong. Please try again.</p>
                  </motion.div>
                )}

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}