'use client';

import { useRef, useState, useEffect } from 'react';
import { Star, Unlock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GreekCTA } from '@/components/ui';
import { offerConfig } from '@/lib/offer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const modules = [
  { level: 'I', label: 'Module Fondations', title: 'Algèbre & Calcul', desc: 'Équations, inéquations, fonctions, dérivées. On repart des bases solides et on monte en puissance. Chaque notion est expliquée avec des exemples concrets et des exercices progressifs.', illuLabel: 'Algèbre & Calcul' },
  { level: 'II', label: 'Module Espace', title: 'Géo & Vecteurs', desc: "Géométrie dans l'espace, produit scalaire, vecteurs dans le plan et dans l'espace. On visualise, on comprend et on applique. Les problèmes de géo ne te feront plus peur.", illuLabel: 'Géo & Vecteurs' },
  { level: 'III', label: 'Module Hasard', title: 'Probas & Stats', desc: "Probabilités conditionnelles, lois de distribution, statistiques descriptives. Le module qui fait le plus peur et pourtant le plus rentable en DS.", illuLabel: 'Probas & Stats' },
  { level: 'IV', label: 'Module Boss', title: 'Le Format Ultime', desc: "Vidéos courtes + fiches récap + accès à vie sur tous tes supports. Le guide est conçu pour que tu puisses réviser en 20 minutes avant un DS.", illuLabel: 'Format Ultime' },
];

function IlluAlgebre() {
  return (
    <svg viewBox="0 0 220 200" width="200" height="182" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="165" height="165" stroke="#1a2d4a" strokeWidth="2.5" />
      <line x1="120" y1="20" x2="120" y2="185" stroke="#1a2d4a" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1="20" y1="120" x2="185" y2="120" stroke="#1a2d4a" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="68" y="79" textAnchor="middle" fill="#1a2d4a" fontSize="20" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">a²</text>
      <text x="153" y="79" textAnchor="middle" fill="#d4a017" fontSize="16" fontStyle="italic" fontFamily="Georgia, serif">ab</text>
      <text x="68" y="158" textAnchor="middle" fill="#d4a017" fontSize="16" fontStyle="italic" fontFamily="Georgia, serif">ab</text>
      <text x="153" y="158" textAnchor="middle" fill="#1a2d4a" fontSize="20" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">b²</text>
      <text x="110" y="197" textAnchor="middle" fill="#d4a017" fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="bold">(a+b)² = a² + 2ab + b²</text>
    </svg>
  );
}

function IlluGeometrie() {
  return (
    <svg viewBox="0 0 220 200" width="200" height="182" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="110,20 30,170 190,170" stroke="#1a2d4a" strokeWidth="2.5" fill="rgba(26,45,74,0.05)" />
      <line x1="110" y1="20" x2="110" y2="170" stroke="#d4a017" strokeWidth="2" strokeDasharray="6 3" />
      <rect x="110" y="158" width="12" height="12" stroke="#1a2d4a" strokeWidth="1.5" fill="none" />
      <text x="110" y="13" textAnchor="middle" fill="#1a2d4a" fontSize="14" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">A</text>
      <text x="22" y="178" textAnchor="middle" fill="#1a2d4a" fontSize="14" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">B</text>
      <text x="198" y="178" textAnchor="middle" fill="#1a2d4a" fontSize="14" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">C</text>
      <text x="110" y="197" textAnchor="middle" fill="#d4a017" fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="bold">Aire = ½ × BC × h</text>
    </svg>
  );
}

function IlluProbas() {
  return (
    <svg viewBox="0 0 220 210" width="200" height="191" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="105" r="5" fill="#d4a017" />
      <line x1="33" y1="100" x2="95" y2="62" stroke="#1a2d4a" strokeWidth="2" />
      <line x1="33" y1="110" x2="95" y2="148" stroke="#1a2d4a" strokeWidth="2" />
      <circle cx="100" cy="60" r="5" fill="#1a2d4a" />
      <circle cx="100" cy="150" r="5" fill="#1a2d4a" />
      <text x="58" y="72" fill="#d4a017" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic">0,6</text>
      <text x="55" y="140" fill="#d4a017" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic">0,4</text>
      <line x1="105" y1="57" x2="170" y2="33" stroke="#1a2d4a" strokeWidth="1.5" />
      <line x1="105" y1="63" x2="170" y2="87" stroke="#1a2d4a" strokeWidth="1.5" />
      <line x1="105" y1="147" x2="170" y2="123" stroke="#1a2d4a" strokeWidth="1.5" />
      <line x1="105" y1="153" x2="170" y2="177" stroke="#1a2d4a" strokeWidth="1.5" />
      <text x="110" y="204" textAnchor="middle" fill="#d4a017" fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="bold">Arbre de probabilités</text>
    </svg>
  );
}

function IlluFormat() {
  return (
    <svg viewBox="0 0 220 200" width="200" height="182" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="35" width="150" height="100" rx="6" stroke="#1a2d4a" strokeWidth="2.5" />
      <rect x="25" y="125" width="150" height="8" rx="2" stroke="#1a2d4a" strokeWidth="2" fill="rgba(26,45,74,0.08)" />
      <line x1="75" y1="133" x2="145" y2="133" stroke="#1a2d4a" strokeWidth="2.5" strokeLinecap="round" />
      <text x="100" y="98" textAnchor="middle" fill="#d4a017" fontSize="36" fontFamily="Georgia, serif">★</text>
      <text x="110" y="168" textAnchor="middle" fill="#d4a017" fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="bold">Tous supports · Accès à vie</text>
    </svg>
  );
}

const ILLUSTRATIONS = [IlluAlgebre, IlluGeometrie, IlluProbas, IlluFormat];

function Diamond({ level, active }: { level: string; active: boolean }) {
  return (
    <div
      className="flex items-center justify-center shrink-0 transition-all duration-300"
      style={{
        width: 40, height: 40, background: '#d4a017',
        transform: 'rotate(45deg)', border: '2.5px solid #1a2d4a',
        boxShadow: active ? '0 0 0 4px rgba(212,160,23,0.25), 3px 3px 0 #1a2d4a' : '2px 2px 0 #1a2d4a', flexShrink: 0,
      }}>
      <span style={{ transform: 'rotate(-45deg)', fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: level.length > 2 ? 9 : 11, color: '#1a2d4a', lineHeight: 1 }}>{level}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TIMELINE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeModule, setActiveModule] = useState(0);

  // IntersectionObserver — reliable module tracking (no GSAP closure bugs)
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveModule(i); },
        { threshold: 0.45, rootMargin: '-5% 0px -45% 0px' }
      );
      observer.observe(card);
      observers.push(observer);
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  // GSAP — progress bar only
  useGSAP(() => {
    if (progressBarRef.current) {
      gsap.fromTo(progressBarRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );
    }
  }, { scope: containerRef });

  const ActiveIllustration = ILLUSTRATIONS[activeModule];

  return (
    <section ref={containerRef} className="relative overflow-x-clip border-t-4 border-[#1a2d4a]" style={{ background: '#d4e8f5' }}>

      {/* ── TITRE ── */}
      <div className="text-center pt-14 pb-8 px-6">
        <h2 style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(24px, 4vw, 52px)', color: '#1a2d4a', lineHeight: 1.1, textTransform: 'uppercase' }}>
          Ce que contient le guide
        </h2>
        <p style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(13px, 1.2vw, 16px)', color: 'rgba(26,45,74,0.65)', marginTop: 8, fontWeight: 500 }}>
          4 modules pour tout maîtriser, du sol au sommet
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-14">
        <div className="flex gap-8 lg:gap-12 items-start">

          {/* ── PANNEAU ILLUSTRATION GAUCHE — sticky ── */}
          <div className="hidden md:flex shrink-0 flex-col self-start sticky" style={{ width: 220, top: '20vh' }}>
            <div className="flex flex-col items-center rounded-2xl overflow-hidden" style={{ background: '#ffffff', border: '4px solid #1a2d4a', boxShadow: '6px 6px 0 #1a2d4a', padding: '20px 14px 14px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ duration: 0.32, ease: 'easeOut' }}
                  className="flex items-center justify-center"
                  style={{ minHeight: 160 }}
                >
                  <ActiveIllustration />
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`label-${activeModule}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ marginTop: 10, borderTop: '2px solid rgba(26,45,74,0.15)', paddingTop: 8, width: '100%', textAlign: 'center' }}
                >
                  <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: 10, color: '#1a2d4a', letterSpacing: '.15em', textTransform: 'uppercase' }}>
                    {modules[activeModule].illuLabel}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-center gap-2 mt-3">
              {modules.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ width: i === activeModule ? 20 : 7, background: i === activeModule ? '#d4a017' : 'rgba(26,45,74,0.25)' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ height: 7, borderRadius: 9999, border: i === activeModule ? '2px solid #1a2d4a' : '2px solid transparent' }}
                />
              ))}
            </div>
          </div>

          {/* ── TIMELINE DROITE ── */}
          <div className="flex-1 min-w-0">
            <div className="relative">

              {/* Ligne verticale — Layer 1: fond statique */}
              <div className="absolute top-0 bottom-0 pointer-events-none" style={{
                left: 19, width: 3, borderRadius: 4,
                background: 'rgba(26,45,74,0.18)',
              }} />
              {/* Ligne verticale — Layer 2: progression orange GSAP scrub */}
              <div ref={progressBarRef} className="absolute top-0 pointer-events-none" style={{
                left: 19, width: 3, borderRadius: 4, height: '0%',
                background: 'linear-gradient(to bottom, #EC6426, #d4a017)',
              }} />

              <div className="flex flex-col gap-8 pb-6">
                {modules.map((mod, i) => (
                  <div
                    key={i}
                    ref={el => { cardRefs.current[i] = el; }}
                    className="flex items-start gap-5"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 40, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.6, delay: 0.05, ease: 'backOut' }}
                      className="flex items-start gap-5 w-full"
                    >
                      <div className="shrink-0" style={{ marginTop: 18, zIndex: 10 }}>
                        <Diamond level={mod.level} active={activeModule === i} />
                      </div>
                      <div className="flex-1 rounded-2xl transition-all duration-300"
                        style={{
                          background: '#ffffff', border: `3px solid #1a2d4a`,
                          boxShadow: activeModule === i ? '5px 5px 0 #1a2d4a, 0 8px 24px rgba(26,45,74,0.12)' : '4px 4px 0 rgba(26,45,74,0.5)',
                          padding: 'clamp(16px, 2vw, 24px)',
                        }}>
                        <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: 10, color: '#d4a017', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 5 }}>
                          Niveau {mod.level} — {mod.label}
                        </p>
                        <h3 style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: 'clamp(17px, 1.8vw, 24px)', color: '#1a2d4a', marginBottom: 8, lineHeight: 1.2 }}>
                          {mod.title}
                        </h3>
                        <p style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(13px, 1vw, 15px)', color: 'rgba(26,45,74,0.72)', lineHeight: 1.65, fontWeight: 400 }}>
                          {mod.desc}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}

                {/* ── CTA FINAL ── */}
                <motion.div
                  initial={{ opacity: 0, x: 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, ease: 'backOut' }}
                  className="flex items-center gap-5"
                >
                  <div className="shrink-0" style={{ zIndex: 10 }}>
                    <div className="flex items-center justify-center transition-all duration-300"
                      style={{ width: 40, height: 40, background: '#1a2d4a', border: '2.5px solid #d4a017', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(212,160,23,0.25), 3px 3px 0 #d4a017', flexShrink: 0 }}>
                      <Unlock className="w-4 h-4 text-[#d4a017]" />
                    </div>
                  </div>
                  <div className="flex-1 rounded-2xl flex flex-col items-center text-center"
                    style={{ background: '#ffffff', border: '4px solid #1a2d4a', boxShadow: '6px 6px 0 #1a2d4a', padding: 'clamp(20px, 2.5vw, 36px)' }}>
                    <h3 style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(18px, 2.2vw, 28px)', color: '#1a2d4a', textTransform: 'uppercase', lineHeight: 1.2, marginBottom: 16 }}>
                      Prêt à plier le<br />prochain DS ?
                    </h3>
                    <GreekCTA size="md" goldBorder={false} showBadges={false} />
                    <div className="mt-3 flex gap-1 justify-center" style={{ color: '#d4a017' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p style={{ fontFamily: 'var(--font-space)', fontSize: 11, color: 'rgba(26,45,74,0.55)', letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, marginTop: 5 }}>
                      Accès immédiat · {offerConfig.launchPrice}€ offre lancement
                    </p>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
