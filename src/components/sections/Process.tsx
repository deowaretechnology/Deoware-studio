'use client';

import { motion } from 'motion/react';
import { FileText, Palette, Code2, Eye, Rocket } from 'lucide-react';

const steps = [
  { icon: FileText, number: '01', title: 'Share Wedding Details', description: 'Tell us about your theme, colors, story, and all important details.' },
  { icon: Palette, number: '02', title: 'Choose Design', description: 'Browse templates or request a fully custom design tailored to your vision.' },
  { icon: Code2, number: '03', title: 'We Build It', description: 'Our expert team brings your vision to life with premium animations.' },
  { icon: Eye, number: '04', title: 'Review & Revise', description: 'Preview your website and request any changes until it is perfect.' },
  { icon: Rocket, number: '05', title: 'Launch!', description: 'Your beautiful wedding invitation website goes live for the world to see.' },
];

export function Process() {
  return (
    <section id="process" className="section-padding relative overflow-hidden bg-cream-300 pattern-bg">
      <div className="absolute inset-0 bg-radial-haldi pointer-events-none" />

      <div className="relative container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14 lg:mb-20"
        >
          <span className="section-label">Simple &amp; Seamless</span>
          <h2 className="heading-lg mb-4">
            How It <span className="gold-text">Works</span>
          </h2>
          <div className="gold-divider mb-6" />
          <p className="text-body max-w-2xl mx-auto">
            From idea to launch in just a few simple steps. We handle everything so you can focus on your wedding.
          </p>
        </motion.div>

        {/* ── Mobile / Tablet: vertical stepper, 3D cards ── */}
        <div className="lg:hidden relative max-w-md mx-auto">
          {/* Connector line */}
          <div className="absolute left-[27px] sm:left-[31px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-gold-400/0 via-gold-400/40 to-gold-400/0" />

          <div className="space-y-5 sm:space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative flex gap-4 sm:gap-5"
              >
                {/* Icon circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 + 0.15, type: 'spring' }}
                  className="relative shrink-0"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-gold-400/30 shadow-card flex items-center justify-center">
                    <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gold-500" />
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gold-gradient flex items-center justify-center text-white font-bold text-[10px] shadow-gold">
                    {step.number}
                  </div>
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gold-400/15 blur-lg -z-10" />
                </motion.div>

                {/* 3D Card */}
                <motion.div
                  whileHover={{
                    rotateX: -4,
                    rotateY: 4,
                    scale: 1.02,
                    boxShadow: '0 16px 28px -10px rgba(201,162,39,0.3)',
                  }}
                  whileTap={{
                    rotateX: -3,
                    rotateY: 3,
                    scale: 1.015,
                    boxShadow: '0 12px 20px -8px rgba(201,162,39,0.28)',
                  }}
                  style={{ perspective: 800, transformStyle: 'preserve-3d' }}
                  className="flex-1 bg-white border border-gold-400/20 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-card transition-shadow duration-300"
                >
                  <h3
                    style={{ transform: 'translateZ(12px)' }}
                    className="font-display text-sm sm:text-base text-brown-800 mb-1.5"
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{ transform: 'translateZ(6px)' }}
                    className="text-xs sm:text-sm text-brown-400 leading-relaxed"
                  >
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Desktop: 5-column grid with connector ── */}
        <div className="relative hidden lg:block">
          <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-gold-400/0 via-gold-400/40 to-gold-400/0" />

          <div className="grid grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring' }}
                  className="relative mb-5"
                >
                  <div className="w-20 h-20 rounded-2xl bg-white border border-gold-400/30 shadow-card flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-gold-500" />
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-white font-bold text-sm shadow-gold">
                    {step.number}
                  </div>
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gold-400/15 blur-xl -z-10" />
                </motion.div>

                <h3 className="font-display text-base text-brown-800 mb-2">{step.title}</h3>
                <p className="text-sm text-brown-400 leading-relaxed">{step.description}</p>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 right-0 translate-x-1/2 w-4 h-4">
                    <div className="w-3 h-3 border-r-2 border-b-2 border-gold-400/40 transform rotate-[-45deg]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}