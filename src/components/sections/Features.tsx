'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, CalendarDays, Heart, Images, MapPin, Music, Send, Album, Globe, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

const features = [
  { icon: Timer, title: 'Live Countdown', description: 'Build anticipation with a beautiful countdown timer to your wedding day' },
  { icon: CalendarDays, title: 'Wedding Events', description: 'Display all your wedding events with dates, times, and descriptions' },
  { icon: Heart, title: 'Love Story', description: 'Share your journey together with an animated timeline of your relationship' },
  { icon: Images, title: 'Photo Gallery', description: 'Stunning photo galleries with lightbox and smooth transitions' },
  { icon: MapPin, title: 'Venue Location', description: 'Integrated Google Maps to help guests find your venue easily' },
  { icon: Music, title: 'Background Music', description: 'Set the mood with your favorite song playing on website load' },
  { icon: Send, title: 'RSVP Forms', description: 'Collect guest responses, meal preferences, and special requests' },
  { icon: Album, title: 'Photo Albums', description: 'Share pre-wedding photoshoot albums with your guests' },
  { icon: Globe, title: 'Custom Domain', description: 'Get your own custom domain like sarahandmichael.wedding' },
  { icon: Sparkles, title: 'Luxury Animations', description: 'Premium scroll animations and interactive elements throughout' },
];

// ─── 3D Feature Card ────────────────────────────────────────────────────────
function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
      whileHover={{
        rotateX: -6,
        rotateY: 6,
        scale: 1.03,
        boxShadow: '0 20px 35px -10px rgba(201,162,39,0.35)',
      }}
      whileTap={{
        rotateX: -4,
        rotateY: 4,
        scale: 1.02,
        boxShadow: '0 14px 24px -8px rgba(201,162,39,0.3)',
      }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      className="bg-white border border-gold-400/20 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-card transition-shadow duration-300 flex flex-col cursor-default"
    >
      <motion.div
        style={{ transform: 'translateZ(20px)' }}
        className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-haldi-100 flex items-center justify-center shrink-0 mb-3 shadow-sm"
      >
        <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500" />
      </motion.div>
      <h3
        style={{ transform: 'translateZ(12px)' }}
        className="font-display text-sm sm:text-lg text-brown-800 mb-1.5 leading-snug"
      >
        {feature.title}
      </h3>
      <p
        style={{ transform: 'translateZ(6px)' }}
        className="text-xs sm:text-sm text-brown-400 leading-relaxed"
      >
        {feature.description}
      </p>
    </motion.div>
  );
}

export function Features() {
  const [showAll, setShowAll] = useState(false);
  const visibleFeatures = showAll ? features : features.slice(0, 4);

  return (
    <section id="features" className="section-padding relative overflow-hidden bg-white pattern-bg">
      <div className="absolute inset-0 bg-radial-haldi pointer-events-none opacity-50" />

      <div className="relative container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-14 lg:mb-20"
        >
          <span className="section-label">Everything Included</span>
          <h2 className="heading-lg mb-4">
            Packed with <span className="gold-text">Premium Features</span>
          </h2>
          <div className="gold-divider mb-6" />
          <p className="text-body max-w-2xl mx-auto">
            Every website comes with a complete set of features designed to make your wedding invitation extraordinary.
          </p>
        </motion.div>

        {/* ── Mobile / Tablet: 2-column grid, 3D cards ── */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <AnimatePresence initial={false}>
              {visibleFeatures.map((feature, index) => (
                <FeatureCard key={feature.title} feature={feature} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {/* View All / Show Less */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <motion.button
              onClick={() => setShowAll((prev) => !prev)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gold-400/30 text-gold-600 font-medium text-sm hover:bg-gold-400/10 hover:border-gold-400 transition-all duration-300"
            >
              <span>{showAll ? 'Show Less' : 'View All Features'}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        {/* ── Desktop: alternating timeline ── */}
        <div className="relative max-w-4xl mx-auto hidden lg:block">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-400/40 to-transparent" />

          <div className="space-y-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className={`flex items-center gap-6 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className={`bg-white border border-gold-400/20 rounded-2xl p-6 shadow-card hover:shadow-card-lg transition-shadow duration-300 max-w-sm ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                      <div className="w-11 h-11 rounded-xl bg-haldi-100 flex items-center justify-center shrink-0">
                        <feature.icon className="w-5 h-5 text-gold-500" />
                      </div>
                      <h3 className="font-display text-lg text-brown-800">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-brown-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2, type: 'spring' }}
                  className="relative flex items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-gold-400/40 shadow-warm flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-gold-gradient" />
                  </div>
                </motion.div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}