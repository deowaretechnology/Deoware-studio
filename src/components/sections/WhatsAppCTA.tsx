'use client';

import { motion } from 'motion/react';
import { MessageCircle, Calendar, ArrowRight, Users, Smile, Clock, Smartphone } from 'lucide-react';



export function WhatsAppCTA() {
  const phone = '918969457707';
  const msg = encodeURIComponent('Hi! I am interested in creating a wedding invitation website. Can you please share more details?');

  return (
    <section id="whatsapp-cta" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Layered gold-haldi mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-haldi-200 via-cream-400 to-haldi-100" />
      <div className="absolute inset-0 pattern-bg opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,162,39,0.18) 0%, transparent 70%)' }}
      />

      {/* Floating decorative orbs with depth */}
      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-16 -left-16 w-64 h-64 bg-gold-400/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 22, 0], x: [0, -14, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-20 -right-20 w-80 h-80 bg-haldi-400/15 rounded-full blur-3xl"
      />

      {/* Subtle floating gold dots */}
      {[
        { top: '15%', left: '8%', size: 10, delay: 0 },
        { top: '70%', left: '12%', size: 6, delay: 0.5 },
        { top: '25%', left: '90%', size: 8, delay: 1.2 },
        { top: '75%', left: '88%', size: 6, delay: 0.8 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -14, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: dot.delay }}
          className="absolute rounded-full bg-gold-400 hidden sm:block"
          style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
        />
      ))}

      <div className="relative container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Floral decorator */}
          <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
            <div className="h-px w-12 sm:w-16 bg-gold-400/50" />
            <span className="text-gold-500 text-xl">✦</span>
            <div className="h-px w-12 sm:w-16 bg-gold-400/50" />
          </div>

          <h2 className="font-display font-semibold text-brown-900 mb-5 sm:mb-6 leading-[1.15]" style={{ fontSize: 'clamp(2.2rem, 6vw, 3.75rem)' }}>
            Ready to create your{' '}
            <span className="gold-text">dream wedding website?</span>
          </h2>

          <p className="text-brown-600 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s transform your wedding invitation into a stunning digital experience
            that your guests will remember forever.
          </p>

          {/* CTA Buttons — 3D press effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
          >
            <motion.a
              href={`https://wa.me/${phone}?text=${msg}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97, y: 0 }}
              className="flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-semibold rounded-full transition-shadow duration-300 w-full sm:w-auto justify-center"
              style={{ boxShadow: '0 10px 24px -6px rgba(34,197,94,0.45)' }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Now</span>
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97, y: 0 }}
              className="flex items-center gap-2 px-8 py-4 bg-gold-gradient text-white font-semibold rounded-full transition-shadow duration-300 w-full sm:w-auto justify-center"
              style={{ boxShadow: '0 10px 24px -6px rgba(201,162,39,0.45)' }}
            >
              <Calendar className="w-5 h-5" />
              <span>Book Consultation</span>
            </motion.a>

            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.04, x: 2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-4 text-brown-700 font-medium hover:text-gold-500 transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              <span>View Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          
        </motion.div>
      </div>
    </section>
  );
}