'use client';
import { motion } from 'motion/react';
import { Palette, Smartphone, Music, Timer, Send, Images, MapPin, Sparkles, Zap, Headphones } from 'lucide-react';

const features = [
  { icon: Palette, title: 'Custom Design', description: 'Unique designs tailored to your wedding theme and personal style' },
  { icon: Smartphone, title: 'Mobile Responsive', description: 'Perfect on all devices — phones, tablets, and desktops' },
  { icon: Music, title: 'Background Music', description: 'Add your favorite song to play when guests open the site' },
  { icon: Timer, title: 'Countdown Timer', description: 'Build excitement with a live countdown to your big day' },
  { icon: Send, title: 'RSVP Forms', description: 'Collect guest responses directly through your website' },
  { icon: Images, title: 'Photo Gallery', description: 'Showcase your journey with beautiful animated galleries' },
  { icon: MapPin, title: 'Google Maps', description: 'Help guests find your venue with integrated maps' },
  { icon: Sparkles, title: '3D Animations', description: 'Stunning 3D effects that bring your invitation to life' },
  { icon: Zap, title: 'Fast Delivery', description: 'Get your website ready in as little as 7 days' },
  { icon: Headphones, title: 'Premium Support', description: 'Dedicated support until your wedding day and beyond' },
];

export function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: '#FFFCF5' }}
    >
      {/* Soft gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 0%, rgba(201,162,39,0.1) 0%, transparent 70%)' }}
      />
      {/* Maroon undertone */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 0% 100%, rgba(139,38,53,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2.5 mb-5">
            <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, #8B2635)' }} />
            <span style={{ color: '#8B2635', fontSize: '11px', letterSpacing: '0.22em', fontWeight: 600, textTransform: 'uppercase' }}>
              Premium Features
            </span>
            <div className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, #8B2635)' }} />
          </div>

          <h2
            className="font-display font-semibold leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: '#2B1810' }}
          >
            Everything your{' '}
            <span style={{
              background: 'linear-gradient(100deg, #8B2635 0%, #C9A227 55%, #B8860B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              wedding site
            </span>{' '}
            needs
          </h2>

          <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(43,24,16,0.55)', fontSize: '1.05rem' }}>
            Everything you need to create an unforgettable digital wedding invitation experience
          </p>
        </motion.div>

        {/* Feature grid — 2 cols on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
          {features.map((feature, index) => {
            const isGold = index % 2 === 1;
            const accent = isGold ? '#B8860B' : '#8B2635';
            const tint = isGold ? 'rgba(201,162,39,0.12)' : 'rgba(139,38,53,0.08)';
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (index % 5) * 0.07 }}
                className="group"
              >
                <div
                  className="rounded-2xl p-4 md:p-6 h-full flex flex-col transition-all duration-300"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(139,38,53,0.08)',
                    boxShadow: '0 2px 12px rgba(43,24,16,0.04)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(43,24,16,0.08)';
                    e.currentTarget.style.borderColor = isGold ? 'rgba(201,162,39,0.35)' : 'rgba(139,38,53,0.25)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(43,24,16,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(139,38,53,0.08)';
                  }}
                >
                  <div
                    className="w-11 h-11 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 md:mb-4 transition-transform duration-500 group-hover:scale-110"
                    style={{ background: tint }}
                  >
                    <Icon className="w-5 h-5 md:w-7 md:h-7" style={{ color: accent }} />
                  </div>

                  <h3
                    className="font-display font-semibold mb-1.5 md:mb-2 transition-colors duration-300"
                    style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: '#2B1810' }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="leading-relaxed"
                    style={{ fontSize: '0.8rem', color: 'rgba(43,24,16,0.5)' }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}