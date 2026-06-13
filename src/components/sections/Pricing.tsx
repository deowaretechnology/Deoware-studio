'use client';

import { motion } from 'motion/react';
import { Check, Star, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '₹2,999',
    description: 'Perfect for intimate celebrations',
    features: ['Premium responsive design', 'Up to 3 pages', 'Photo gallery (20 photos)', 'Countdown timer', 'RSVP form', 'Google Maps', 'Mobile responsive', '5 days delivery'],
    popular: false,
  },
  {
    name: 'Premium',
    price: '₹4,999',
    description: 'Most popular choice for couples',
    features: ['Everything in Starter', 'Up to 6 pages', 'Photo gallery (50 photos)', 'Background music', 'Love story timeline', '3D animations', 'Custom domain setup', '3 revisions', '7 days delivery'],
    popular: true,
  },
  {
    name: 'Luxury',
    price: '₹5,999',
    description: 'For the extraordinary celebration',
    features: ['Everything in Premium', 'Unlimited pages', 'Unlimited photos', 'Interactive 3D card', 'Video background', 'WhatsApp integration', 'Guest book', 'Priority support', 'Unlimited revisions', '10 days delivery'],
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="section-padding relative overflow-hidden bg-white pattern-bg">
      <div className="absolute inset-0 bg-radial-haldi pointer-events-none opacity-60" />

      <div className="relative container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="section-label">Transparent Pricing</span>
          <h2 className="heading-lg mb-4">
            Choose Your <span className="gold-text">Perfect Plan</span>
          </h2>
          <div className="gold-divider mb-6" />
          <p className="text-body max-w-2xl mx-auto">
            No hidden fees, no surprises. Just beautiful wedding websites.
          </p>
        </motion.div>

        {/* items-stretch so all cards in a row are equal height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              /* removed md:-mt-4 — no vertical offset, equal height via flex */
              className="relative flex"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1 bg-gold-gradient text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-gold whitespace-nowrap">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className={`w-full rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? 'bg-gradient-to-b from-amber-50 to-yellow-50 border-2 border-gold-400 shadow-gold-lg pt-10'
                  : 'bg-white border border-gold-400/20 shadow-card hover:shadow-card-lg'
              }`}>
                <div className="text-center mb-7">
                  <h3 className="font-display text-2xl text-brown-800 mb-1">{plan.name}</h3>
                  <p className="text-sm text-brown-400 mb-5">{plan.description}</p>
                  <span className={`text-4xl font-display font-semibold ${plan.popular ? 'text-gold-500' : 'text-brown-800'}`}>
                    {plan.price}
                  </span>
                </div>

                {/* flex-1 pushes button to bottom in all cards equally */}
                <ul className="space-y-3 flex-1 mb-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${plan.popular ? 'bg-gold-400/20' : 'bg-yellow-50'}`}>
                        <Check className="w-3 h-3 text-gold-500" />
                      </div>
                      <span className="text-sm text-brown-500">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gold-gradient text-white shadow-gold hover:shadow-gold-lg hover:scale-[1.02]'
                    : 'border-2 border-gold-400 text-gold-600 hover:bg-gold-400/10'
                }`}>
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
}