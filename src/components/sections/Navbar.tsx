'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#why-choose-us' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-warm border-b border-gold-400/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 group"
            >
              {/* Logo Icon */}
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="20" cy="20" r="19" stroke="#D4A017" strokeWidth="1.5" />
                  <path d="M20 8 C14 8, 10 13, 10 18 C10 25, 20 32, 20 32 C20 32, 30 25, 30 18 C30 13, 26 8, 20 8Z" fill="#D4A017" opacity="0.15" />
                  <path d="M20 8 C14 8, 10 13, 10 18 C10 25, 20 32, 20 32 C20 32, 30 25, 30 18 C30 13, 26 8, 20 8Z" stroke="#D4A017" strokeWidth="1.2" fill="none" />
                  <text x="20" y="23" textAnchor="middle" fontFamily="serif" fontSize="13" fontWeight="600" fill="#C08B0C">W</text>
                </svg>
              </div>

              {/* Logo Text */}
              <div className="leading-none">
                <p className="font-display text-lg font-semibold text-brown-800 group-hover:text-gold-500 transition-colors duration-300">
                  Deoware Technology
                </p>
                <p className="text-[10px] tracking-[0.25em] text-gold-500 uppercase font-body">
                  Studio
                </p>
              </div>
            </motion.a>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm font-medium text-brown-600 hover:text-gold-500 transition-colors duration-300 luxury-link"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://wa.me/918969457707"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => scrollTo('#contact')}
                className="px-5 py-2.5 rounded-full bg-gold-gradient text-white text-sm font-semibold shadow-gold hover:shadow-gold-lg hover:scale-105 transition-all duration-300"
              >
                Get Quote
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-cream-300 text-brown-700 hover:bg-gold-400/20 transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/98 backdrop-blur-xl shadow-card-lg border-b border-gold-400/20 md:hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-2 text-brown-700 font-medium border-b border-cream-400 hover:text-gold-500 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex gap-3 pt-2">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 rounded-full bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
                >
                  WhatsApp
                </a>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="flex-1 py-3 rounded-full bg-gold-gradient text-white font-semibold"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}