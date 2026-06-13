'use client';

import { motion } from 'motion/react';
import {  Mail, Phone, Heart, MessageCircle } from 'lucide-react';
const nav = {
  services: [{ name: 'Wedding Websites', href: '#' }, { name: 'Custom Designs', href: '#' }, { name: '3D Invitations', href: '#' }, { name: 'Premium Templates', href: '#' }],
  company: [{ name: 'About Us', href: '#' }, { name: 'Our Process', href: '#process' }, { name: 'Pricing', href: '#pricing' }, { name: 'Contact', href: '#contact' }],
  support: [{ name: 'FAQ', href: '#faq' }, { name: 'Live Demo', href: '#showcase' }, { name: 'WhatsApp', href: 'https://wa.me/919876543210' }],
};

const social = [
  { name: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/919876543210' },
  { name: 'Email', icon: Mail, href: 'mailto:hello@weddingwebstudio.com' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-warm-50 border-t border-gold-400/15">
      <div className="absolute inset-0 pattern-bg opacity-40" />

      <div className="relative container-custom">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="20" cy="20" r="19" stroke="#D4A017" strokeWidth="1.5" />
                  <path d="M20 8 C14 8, 10 13, 10 18 C10 25, 20 32, 20 32 C20 32, 30 25, 30 18 C30 13, 26 8, 20 8Z" fill="#D4A017" opacity="0.15" />
                  <path d="M20 8 C14 8, 10 13, 10 18 C10 25, 20 32, 20 32 C20 32, 30 25, 30 18 C30 13, 26 8, 20 8Z" stroke="#D4A017" strokeWidth="1.2" fill="none" />
                  <text x="20" y="23" textAnchor="middle" fontFamily="serif" fontSize="13" fontWeight="600" fill="#C08B0C">W</text>
                </svg>
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-brown-800">Wedding Web Studio</p>
                <p className="text-[10px] tracking-[0.25em] text-gold-500 uppercase font-body">Premium Digital Invitations</p>
              </div>
            </div>

            <p className="text-sm text-brown-400 leading-relaxed mb-5 max-w-xs">
              Creating beautiful, animated wedding invitation websites that leave your guests in awe.
            </p>

            {/* Contact */}
            <div className="space-y-2 mb-5">
              <a href="mailto:deowaretechnology@gmail.com" className="flex items-center gap-2 text-sm text-brown-500 hover:text-gold-500 transition-colors">
                <Mail className="w-4 h-4 text-gold-400" />deowaretechnology@gmail.com
              </a>
              <a href="tel:+918969457707" className="flex items-center gap-2 text-sm text-brown-500 hover:text-gold-500 transition-colors">
                <Phone className="w-4 h-4 text-gold-400" />+91 8969457707
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-2">
              {social.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gold-400/20 bg-white flex items-center justify-center hover:bg-haldi-100 hover:border-gold-400/40 transition-all duration-300 shadow-card">
                  <s.icon className="w-4 h-4 text-gold-500" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav columns */}
          {Object.entries(nav).map(([key, items], i) => (
            <motion.div key={key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i + 1) * 0.08 }}>
              <h4 className="font-display text-brown-800 font-semibold mb-4 capitalize">{key === 'company' ? 'Company' : key === 'services' ? 'Services' : 'Support'}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-sm text-brown-400 hover:text-gold-500 transition-colors luxury-link">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-gold-400/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brown-400">&copy; {new Date().getFullYear()} Wedding Web Studio. All rights reserved.</p>
          <p className="text-xs text-brown-400 flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-gold-400 fill-gold-400" /> for couples worldwide
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-gold-gradient shadow-gold flex items-center justify-center hover:shadow-gold-lg hover:scale-110 transition-all duration-300 z-40"
        title="Back to top"
      >
        <div className="w-3 h-3 border-t-2 border-r-2 border-white transform -rotate-45 translate-y-0.5" />
      </motion.button>
    </footer>
  );
}
