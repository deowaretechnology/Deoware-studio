'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  { id: 1, name: 'Priya & Rahul Sharma', location: 'Mumbai, India', image: 'https://images.pexels.com/photos/1682206/pexels-photo-1682206.jpeg?auto=compress&cs=tinysrgb&w=400', rating: 5, text: 'We wanted something unique for our wedding and Wedding Web Studio delivered beyond our expectations. Our guests were amazed by the beautiful animations and the 3D invitation card. Highly recommended!' },
  { id: 2, name: 'Sarah & Michael Johnson', location: 'New York, USA', image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400', rating: 5, text: 'The attention to detail is incredible. Every page, every animation was crafted beautifully. Their team understood our vision perfectly and created a website that truly represents our love story.' },
  { id: 3, name: 'Ananya & Vikram Mehta', location: 'Delhi, India', image: 'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=400', rating: 5, text: 'From traditional elements to modern animations, everything was perfect. Our families loved the website and we received so many compliments. Thank you for making our wedding so special!' },
  { id: 4, name: 'Emma & James Williams', location: 'London, UK', image: 'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=400', rating: 5, text: 'Professional, creative, and incredibly responsive. The website was ready before our deadline and looked absolutely stunning on all devices. Worth every single penny!' },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (d: number) => {
    setDirection(d);
    setCurrent((prev) => (prev + d + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const t = setInterval(() => paginate(1), 5500);
    return () => clearInterval(t);
  }, [current]);

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden bg-cream-300 pattern-bg">
      <div className="absolute inset-0 bg-radial-haldi pointer-events-none" />

      <div className="relative container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="section-label">Happy Couples</span>
          <h2 className="heading-lg mb-4">
            What Our <span className="gold-text">Clients Say</span>
          </h2>
          <div className="gold-divider mb-6" />
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Quote Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold">
              <Quote className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card-lg border border-gold-400/15 relative overflow-hidden min-h-[260px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction < 0 ? 80 : -80 }}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-5">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold-400 fill-gold-400" />
                  ))}
                </div>

                <p className="text-lg md:text-xl text-brown-700 leading-relaxed mb-7 font-display italic">
                  "{testimonials[current].text}"
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold-400/30 shadow-warm">
                    <img src={testimonials[current].image} alt={testimonials[current].name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <p className="font-display text-brown-800 font-semibold">{testimonials[current].name}</p>
                    <p className="text-sm text-brown-400">{testimonials[current].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-7">
            <button onClick={() => paginate(-1)} className="w-11 h-11 rounded-full border-2 border-gold-400/30 bg-white flex items-center justify-center hover:bg-haldi-100 hover:border-gold-400 transition-all duration-300 shadow-card">
              <ChevronLeft className="w-5 h-5 text-gold-500" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }} className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-gold-400' : 'w-2 h-2 bg-brown-200 hover:bg-gold-400/50'}`} />
              ))}
            </div>

            <button onClick={() => paginate(1)} className="w-11 h-11 rounded-full border-2 border-gold-400/30 bg-white flex items-center justify-center hover:bg-haldi-100 hover:border-gold-400 transition-all duration-300 shadow-card">
              <ChevronRight className="w-5 h-5 text-gold-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
