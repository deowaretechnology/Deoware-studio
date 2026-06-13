'use client';

import { motion } from 'motion/react';
import { Eye, ExternalLink } from 'lucide-react';

const demos = [
  { id: 1, title: 'Royal Wedding Theme', description: 'Opulent design with rich gold accents and classical elegance', image: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800', features: ['Gold animations', 'Classical borders', '3D card'] },
  { id: 2, title: 'Modern Luxury Theme', description: 'Contemporary design with sleek lines and sophisticated styling', image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800', features: ['Minimalist', 'Smooth transitions', 'Gradients'] },
  { id: 3, title: 'Minimal Elegant Theme', description: 'Clean and refined design focusing on essential beauty', image: 'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=800', features: ['Clean typography', 'Subtle animations', 'Whitespace'] },
  { id: 4, title: 'Traditional Indian Theme', description: 'Vibrant colors with intricate patterns celebrating Indian heritage', image: 'https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?auto=compress&cs=tinysrgb&w=800', features: ['Mandala patterns', 'Rich colors', 'Festive decor'] },
];

export function DemoShowcase() {
  return (
    <section id="showcase" className="section-padding relative overflow-hidden bg-cream-300 pattern-bg">
      <div className="absolute inset-0 bg-radial-haldi pointer-events-none opacity-60" />

      <div className="relative container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <span className="section-label">Live Previews</span>
          <h2 className="heading-lg mb-4">
            <span className="gold-text">Live Demo</span> Showcase
          </h2>
          <div className="gold-divider mb-6" />
          <p className="text-body max-w-2xl mx-auto">
            Explore our stunning wedding invitation website themes. Each design is fully customizable.
          </p>
        </motion.div>

        {/* 2 cols on mobile/tablet, 4 cols on laptop+ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group"
            >
              <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-card hover:shadow-card-lg transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={demo.image}
                    alt={demo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay — visible on hover (desktop) and always-on-bottom (mobile) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-900/70 via-brown-900/0 to-transparent sm:bg-brown-900/0 sm:group-hover:bg-brown-900/40 transition-all duration-500 flex items-end sm:items-center justify-center pb-3 sm:pb-0">
                    <button className="opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 btn-primary py-2 px-3.5 sm:py-2.5 sm:px-5 text-xs sm:text-sm">
                      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>View Demo</span>
                    </button>
                  </div>

                 
                </div>

                <div className="p-3 sm:p-5 flex flex-col flex-1">
                  <h3 className="font-display text-sm sm:text-lg text-brown-800 mb-1 sm:mb-1.5 group-hover:text-gold-500 transition-colors duration-300 leading-snug">
                    {demo.title}
                  </h3>
                  <p className="hidden sm:block text-sm text-brown-400 mb-4 leading-relaxed">
                    {demo.description}
                  </p>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                    {demo.features.slice(0, 2).map((f) => (
                      <span
                        key={f}
                        className="text-[9px] sm:text-xs py-0.5 px-1.5 sm:px-2.5 rounded-full bg-haldi-100 text-gold-600 border border-gold-400/20 whitespace-nowrap"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <button className="mt-auto w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-gold-400/30 text-gold-600 font-medium text-xs sm:text-sm hover:bg-gold-400/10 hover:border-gold-400 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 group/btn">
                    <span>Preview</span>
                    <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}