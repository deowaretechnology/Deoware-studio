'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { question: 'How long does it take to create my wedding website?', answer: 'Our standard delivery time is 5-10 days depending on the package. Starter plan: 5 days. Premium: 7 days. Luxury: 10 days. We also offer rush delivery options if you need it sooner.' },
  { question: 'Can I customize the design completely?', answer: 'Absolutely! While we offer beautiful pre-designed templates, we also provide fully custom designs. With our Luxury and Enterprise packages, you get unlimited customization options.' },
  { question: 'Do you provide the domain name?', answer: 'We help you set up a custom domain with Premium and higher packages. We can guide you through purchasing your own domain like yourname.wedding, or handle the entire setup process for you.' },
  { question: 'Can I update the content after the website is live?', answer: 'Yes! We provide easy-to-use instructions for minor updates. For more significant changes, our team is always available to help. Premium and Luxury packages include ongoing support.' },
  { question: 'Is mobile responsiveness included?', answer: 'Yes, every website we create is fully responsive and looks stunning on all devices — smartphones, tablets, and desktops. We test extensively across multiple screen sizes.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, debit cards, UPI, net banking, and international payment methods. Flexible payment plans available — 50% advance and 50% before launch.' },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding relative overflow-hidden bg-white pattern-bg">
      <div className="absolute inset-0 bg-radial-haldi pointer-events-none opacity-50" />

      <div className="relative container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label">Got Questions?</span>
          <h2 className="heading-lg mb-4">
            Frequently Asked <span className="gold-text">Questions</span>
          </h2>
          <div className="gold-divider mb-6" />
          <p className="text-body max-w-2xl mx-auto">
            Find answers to common questions about our wedding invitation website services.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className={`rounded-2xl overflow-hidden border transition-all duration-300 ${openIndex === index ? 'border-gold-400/40 shadow-warm' : 'border-gold-400/15 bg-white shadow-card'}`}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors duration-300 ${openIndex === index ? 'bg-haldi-50' : 'bg-white hover:bg-cream-300/50'}`}
                >
                  <span className="font-display text-base sm:text-lg text-brown-800">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${openIndex === index ? 'bg-gold-gradient shadow-gold' : 'bg-haldi-100'}`}>
                    {openIndex === index
                      ? <Minus className="w-4 h-4 text-white" />
                      : <Plus className="w-4 h-4 text-gold-500" />
                    }
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 bg-haldi-50 border-t border-gold-400/10">
                        <p className="text-brown-500 leading-relaxed pt-3">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
