'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, MessageCircle, Sparkles } from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// ─── Camera ───────────────────────────────────────────────────────────────────
function SceneCamera() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, 5.5);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 48;
      camera.updateProjectionMatrix();
    }
  }, [camera]);
  return null;
}

// ─── Floating invitation card ────────────────────────────────────────────────
function FloatingCard() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.18;
    groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.06;
  });

  const corners: [number, number, number][] = [
    [-1.25,  1.65, 0.07],
    [ 1.25,  1.65, 0.07],
    [-1.25, -1.65, 0.07],
    [ 1.25, -1.65, 0.07],
  ];

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Card base */}
        <RoundedBox args={[3, 4, 0.09]} radius={0.07} smoothness={6}>
          <meshStandardMaterial color="#FFFCF5" metalness={0.05} roughness={0.35} />
        </RoundedBox>

        {/* Maroon rim */}
        <RoundedBox args={[2.88, 3.88, 0.1]} radius={0.065} smoothness={6} position={[0, 0, 0.004]}>
          <meshStandardMaterial color="#8B2635" metalness={0.3} roughness={0.4} transparent opacity={0.35} />
        </RoundedBox>

        {/* Inner frame lines */}
        <mesh position={[0,  1.5, 0.07]}><planeGeometry args={[2.1, 0.016]} /><meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.15} /></mesh>
        <mesh position={[0, -1.5, 0.07]}><planeGeometry args={[2.1, 0.016]} /><meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.15} /></mesh>
        <mesh position={[-1.05, 0, 0.07]} rotation={[0, 0, Math.PI / 2]}><planeGeometry args={[2.6, 0.016]} /><meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.15} /></mesh>
        <mesh position={[ 1.05, 0, 0.07]} rotation={[0, 0, Math.PI / 2]}><planeGeometry args={[2.6, 0.016]} /><meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.15} /></mesh>

        {/* Wax seal outer */}
        <mesh position={[0, 0, 0.08]}>
          <circleGeometry args={[0.32, 48]} />
          <meshStandardMaterial color="#8B2635" metalness={0.2} roughness={0.45} />
        </mesh>
        {/* Wax seal inner */}
        <mesh position={[0, 0, 0.085]}>
          <circleGeometry args={[0.25, 48]} />
          <meshStandardMaterial color="#FFFCF5" metalness={0.05} roughness={0.4} />
        </mesh>
        {/* Seal hex mark */}
        <mesh position={[0, 0, 0.09]}>
          <circleGeometry args={[0.1, 6]} />
          <meshStandardMaterial color="#C9A227" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Corner ornaments */}
        {corners.map((pos, i) => (
          <mesh key={i} position={pos}>
            <circleGeometry args={[0.07, 6]} />
            <meshStandardMaterial color="#C9A227" metalness={0.85} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// ─── Gold particles ───────────────────────────────────────────────────────────
function GoldParticles({ count = 70 }: { count?: number }) {
  const ref    = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    if (!geoRef.current) return;
    const pos  = new Float32Array(count * 3);
    const col  = new Float32Array(count * 3);
    const gold = new THREE.Color('#C9A227');
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 16;
      pos[i*3+1] = (Math.random() - 0.5) * 16;
      pos[i*3+2] = (Math.random() - 0.5) * 8 - 2;
      col[i*3]   = gold.r; col[i*3+1] = gold.g; col[i*3+2] = gold.b;
    }
    geoRef.current.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geoRef.current.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  }, [count]);

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let cur = 0;
    const step  = Math.ceil(to / 60);
    const timer = setInterval(() => {
      cur += step;
      if (cur >= to) { setVal(to); clearInterval(timer); }
      else setVal(cur);
    }, 24);
    return () => clearInterval(timer);
  }, [to]);
  return <>{val}{suffix}</>;
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const cardY   = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textY   = useTransform(scrollYProgress, [0, 1], [0,  40]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FDF8F0 0%, #F8EFDD 45%, #F3E6CE 100%)' }}
    >
      {/* Paper grain texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }}
      />

      {/* Warm gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 65% 50%, rgba(201,162,39,0.16) 0%, transparent 70%)' }}
      />

      {/* Maroon undertone, lower left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 10% 90%, rgba(139,38,53,0.06) 0%, transparent 70%)' }}
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(253,248,240,0.85), transparent)' }}
      />

      {/* ── Main grid ── */}
      <div className="relative flex-1 flex items-center pt-20 pb-10 lg:pt-24 lg:pb-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_460px] gap-8 lg:gap-16 items-center">

            {/* ── Text content — ALWAYS FIRST on mobile & desktop ── */}
            <motion.div style={{ y: textY, opacity }} className="text-center lg:text-left">

              {/* Eyebrow / badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="inline-flex items-center gap-2.5 mb-4 sm:mb-6"
              >
                <div className="h-px w-6 sm:w-8" style={{ background: 'linear-gradient(to right, transparent, #8B2635)' }} />
                <span style={{ color: '#8B2635', fontSize: '10px', letterSpacing: '0.2em', fontWeight: 600, textTransform: 'uppercase' }} className="sm:text-[11px] sm:tracking-[0.22em]">
                  Vivah Cards · Digital Invitations
                </span>
                <div className="h-px w-6 sm:w-8" style={{ background: 'linear-gradient(to left, transparent, #8B2635)' }} />
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="font-display font-semibold leading-[1.1] tracking-tight mb-4 sm:mb-6"
                style={{ fontSize: 'clamp(2.8rem, 9vw, 4.5rem)', color: '#2B1810' }}
              >
                Your wedding,<br />
                <span style={{
                  background: 'linear-gradient(100deg, #8B2635 0%, #C9A227 55%, #B8860B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  finally online.
                </span>
              </motion.h1>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-md lg:mx-0 mx-auto mb-6 sm:mb-8 leading-relaxed"
                style={{ color: 'rgba(43,24,16,0.6)', fontSize: '1rem' }}
              >
                We build live wedding websites not PDFs that guests open,
                feel, and remember. Animated, personal, delivered in 7 days.
              </motion.p>

              {/* CTAs — stacked & full-width on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-3 mb-8"
              >
                {/* Primary CTA */}
                <button
                  onClick={() => scrollTo('contact')}
                  className="group relative overflow-hidden flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-4 sm:py-3.5 rounded-full font-semibold text-sm transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #8B2635, #6E1B29)',
                    color: '#FFF8EC',
                    boxShadow: '0 8px 28px rgba(139,38,53,0.28)',
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Get Your Website
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(135deg, #A33144, #8B2635)' }}
                  />
                </button>

                {/* Secondary CTA */}
                <button
                  onClick={() => scrollTo('showcase')}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 sm:py-3.5 rounded-full font-medium text-sm transition-all duration-300 border"
                  style={{ borderColor: 'rgba(139,38,53,0.22)', color: '#8B2635', background: 'rgba(139,38,53,0.04)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,38,53,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(139,38,53,0.22)'; }}
                >
                  See Live Demos
                </button>

                {/* WhatsApp CTA — full-width visible button on mobile */}
                
               <a   href="https://wa.me/918969457707"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-4 sm:py-3.5 rounded-full font-medium text-sm transition-all duration-300 border sm:border-0 sm:px-5"
                  style={{
                    borderColor: 'rgba(37,211,102,0.3)',
                    background: 'rgba(37,211,102,0.08)',
                    color: '#1FAE54',
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </motion.div>

              {/* Stats — 2-col grid on mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-6 sm:gap-8 max-w-sm mx-auto lg:max-w-none lg:mx-0 lg:justify-start justify-center"
              >
                {[
                  { to: 5, suffix: '+',    label: 'Websites built' },
                  { to: 5, suffix: '%',    label: 'Happy couples'  },
                  { to: 4, suffix: ' days', label: 'Avg delivery'  },
                ].map(({ to, suffix, label }) => (
                  <div key={label} className="text-center lg:text-left">
                    <p
                      className="font-display font-semibold leading-none mb-1"
                      style={{ fontSize: 'clamp(1.5rem,2.5vw,2rem)', color: '#8B2635' }}
                    >
                      <Counter to={to} suffix={suffix} />
                    </p>
                    <p style={{ fontSize: '0.68rem', color: 'rgba(43,24,16,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {label}
                    </p>
                  </div>
                ))}
                <div className="hidden lg:flex flex-col gap-0.5 pl-3 border-l" style={{ borderColor: 'rgba(139,38,53,0.15)' }}>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(43,24,16,0.35)', maxWidth: '140px' }}>
                    Trusted by couples across India
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* ── 3D Card — ALWAYS AFTER text, smaller on mobile ── */}
            <motion.div
              style={{ y: cardY }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mt-10 lg:mt-0"
            >
              {/* Soft glow ring */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: '-15%',
                  background: 'radial-gradient(ellipse at center, rgba(201,162,39,0.18) 0%, transparent 65%)',
                  filter: 'blur(28px)',
                }}
              />

              {/* Reduced size on mobile (60-70% of original), full size on desktop */}
              <div className="relative aspect-[3/4] w-[58%] max-w-[230px] sm:w-[45%] sm:max-w-[280px] lg:w-full lg:max-w-[360px] mx-auto">
                <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
                  <SceneCamera />
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[4, 6, 5]} intensity={1.2} color="#FFF8E7" />
                  <pointLight position={[-4, -4, 4]} intensity={0.5} color="#C9A227" />
                  <spotLight position={[2, 8, 4]} angle={0.25} penumbra={1} intensity={0.8} color="#FFFDF5" />
                  <Suspense fallback={null}>
                    <GoldParticles count={50} />
                    <FloatingCard />
                    <Environment preset="apartment" />
                  </Suspense>
                </Canvas>

                {/* Badge: 3D Animated */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -left-3 sm:-left-5 top-[20%] rounded-xl sm:rounded-2xl px-2.5 sm:px-3.5 py-2 sm:py-2.5 border"
                  style={{
                    background: 'rgba(255,252,245,0.9)',
                    backdropFilter: 'blur(16px)',
                    borderColor: 'rgba(139,38,53,0.12)',
                    boxShadow: '0 8px 28px rgba(139,38,53,0.1)',
                  }}
                >
                  <p className="text-[10px] sm:text-xs font-semibold" style={{ color: '#2B1810' }}>3D Animated</p>
                  <p style={{ fontSize: '9px', color: '#8B2635', marginTop: '2px' }}>Invitation Card</p>
                </motion.div>

                {/* Badge: 7 Days */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  className="absolute -right-3 sm:-right-5 bottom-[22%] rounded-xl sm:rounded-2xl px-2.5 sm:px-3.5 py-2 sm:py-2.5"
                  style={{
                    background: 'linear-gradient(135deg, #8B2635, #6E1B29)',
                    boxShadow: '0 8px 24px rgba(139,38,53,0.3)',
                  }}
                >
                  <p className="text-[10px] sm:text-xs font-bold" style={{ color: '#FFF8EC' }}>7 Days</p>
                  <p style={{ fontSize: '8px', color: 'rgba(255,248,236,0.75)', marginTop: '2px' }}>Delivery</p>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(243,230,206,0.9), transparent)' }}
      />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={() => scrollTo('why-choose-us')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 transition-all duration-300"
          style={{ color: 'rgba(139,38,53,0.4)' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(139,38,53,0.8)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(139,38,53,0.4)'; }}
        >
          <span style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </section>
  );
}