'use client';

import { useRef, useState } from 'react';
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
    <svg viewBox="0 0 220 200" width="220" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="165" height="165" stroke="#1a2d4a" strokeWidth="2.5" />
      <line x1="120" y1="20" x2="120" y2="185" stroke="#1a2d4a" strokeWidth="1.5" strokeDasharray="5 3" />
      <line x1="20" y1="120" x2="185" y2="120" stroke="#1a2d4a" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x="68" y="79" textAnchor="middle" fill="#1a2d4a" fontSize="20" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">a²</text>
      <text x="153" y="79" textAnchor="middle" fill="#d4a017" fontSize="16" fontStyle="italic" fontFamily="Georgia, serif">ab</text>
      <text x="68" y="158" textAnchor="middle" fill="#d4a017" fontSize="16" fontStyle="italic" fontFamily="Georgia, serif">ab</text>
      <text x="153" y="158" textAnchor="middle" fill="#1a2d4a" fontSize="20" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">b²</text>
      <text x="70" y="14" textAnchor="middle" fill="#1a2d4a" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif">a</text>
      <text x="152" y="14" textAnchor="middle" fill="#1a2d4a" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif">b</text>
      <text x="10" y="74" textAnchor="middle" fill="#1a2d4a" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif">a</text>
      <text x="10" y="157" textAnchor="middle" fill="#1a2d4a" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif">b</text>
      <text x="110" y="197" textAnchor="middle" fill="#d4a017" fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="bold">(a+b)² = a² + 2ab + b²</text>
    </svg>
  );
}

function IlluGeometrie() {
  return (
    <svg viewBox="0 0 220 200" width="220" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="110,20 30,170 190,170" stroke="#1a2d4a" strokeWidth="2.5" fill="rgba(26,45,74,0.05)" />
      <line x1="110" y1="20" x2="110" y2="170" stroke="#d4a017" strokeWidth="2" strokeDasharray="6 3" />
      <rect x="110" y="158" width="12" height="12" stroke="#1a2d4a" strokeWidth="1.5" fill="none" />
      <text x="110" y="13" textAnchor="middle" fill="#1a2d4a" fontSize="14" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">A</text>
      <text x="22" y="178" textAnchor="middle" fill="#1a2d4a" fontSize="14" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">B</text>
      <text x="198" y="178" textAnchor="middle" fill="#1a2d4a" fontSize="14" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">C</text>
      <text x="95" y="100" textAnchor="middle" fill="#d4a017" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif">h</text>
      <line x1="68" y1="100" x2="78" y2="96" stroke="#1a2d4a" strokeWidth="1.5" />
      <line x1="148" y1="100" x2="158" y2="96" stroke="#1a2d4a" strokeWidth="1.5" />
      <text x="110" y="197" textAnchor="middle" fill="#d4a017" fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="bold">Aire = ½ × BC × h</text>
    </svg>
  );
}

function IlluProbas() {
  return (
    <svg viewBox="0 0 220 210" width="220" height="210" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="105" r="5" fill="#d4a017" />
      <line x1="33" y1="100" x2="95" y2="62" stroke="#1a2d4a" strokeWidth="2" />
      <line x1="33" y1="110" x2="95" y2="148" stroke="#1a2d4a" strokeWidth="2" />
      <circle cx="100" cy="60" r="5" fill="#1a2d4a" />
      <circle cx="100" cy="150" r="5" fill="#1a2d4a" />
      <text x="100" y="50" textAnchor="middle" fill="#1a2d4a" fontSize="13" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">A</text>
      <text x="100" y="170" textAnchor="middle" fill="#1a2d4a" fontSize="13" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">Ā</text>
      <text x="58" y="72" fill="#d4a017" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic">0,6</text>
      <text x="55" y="140" fill="#d4a017" fontSize="11" fontFamily="Georgia, serif" fontStyle="italic">0,4</text>
      <line x1="105" y1="57" x2="170" y2="33" stroke="#1a2d4a" strokeWidth="1.5" />
      <line x1="105" y1="63" x2="170" y2="87" stroke="#1a2d4a" strokeWidth="1.5" />
      <line x1="105" y1="147" x2="170" y2="123" stroke="#1a2d4a" strokeWidth="1.5" />
      <line x1="105" y1="153" x2="170" y2="177" stroke="#1a2d4a" strokeWidth="1.5" />
      <circle cx="174" cy="31" r="4" fill="#1a2d4a" opacity="0.7" />
      <circle cx="174" cy="89" r="4" fill="#1a2d4a" opacity="0.7" />
      <circle cx="174" cy="121" r="4" fill="#1a2d4a" opacity="0.7" />
      <circle cx="174" cy="179" r="4" fill="#1a2d4a" opacity="0.7" />
      <text x="136" y="36" fill="#1a2d4a" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">B|A  0,7</text>
      <text x="132" y="83" fill="#1a2d4a" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">B̄|A  0,3</text>
      <text x="130" y="118" fill="#1a2d4a" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">B|Ā  0,5</text>
      <text x="130" y="175" fill="#1a2d4a" fontSize="10" fontFamily="Georgia, serif" fontStyle="italic">B̄|Ā  0,5</text>
      <text x="110" y="204" textAnchor="middle" fill="#d4a017" fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="bold">Arbre de probabilités</text>
    </svg>
  );
}

function IlluFormat() {
  return (
    <svg viewBox="0 0 220 200" width="220" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="35" width="150" height="100" rx="6" stroke="#1a2d4a" strokeWidth="2.5" />
      <rect x="25" y="125" width="150" height="8" rx="2" stroke="#1a2d4a" strokeWidth="2" fill="rgba(26,45,74,0.08)" />
      <line x1="75" y1="133" x2="145" y2="133" stroke="#1a2d4a" strokeWidth="2.5" strokeLinecap="round" />
      <text x="100" y="98" textAnchor="middle" fill="#d4a017" fontSize="36" fontFamily="Georgia, serif">★</text>
      <rect x="168" y="100" width="30" height="52" rx="5" stroke="#d4a017" strokeWidth="2" />
      <line x1="168" y1="112" x2="198" y2="112" stroke="#d4a017" strokeWidth="1.5" />
      <line x1="168" y1="143" x2="198" y2="143" stroke="#d4a017" strokeWidth="1.5" />
      <circle cx="183" cy="149" r="3" fill="#d4a017" opacity="0.6" />
      <rect x="5" y="110" width="25" height="38" rx="2" stroke="#1a2d4a" strokeWidth="1.5" />
      <line x1="9" y1="118" x2="26" y2="118" stroke="#1a2d4a" strokeWidth="1" opacity="0.5" />
      <line x1="9" y1="123" x2="26" y2="123" stroke="#1a2d4a" strokeWidth="1" opacity="0.5" />
      <line x1="9" y1="128" x2="26" y2="128" stroke="#1a2d4a" strokeWidth="1" opacity="0.5" />
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
        width: 42, height: 42, background: '#d4a017',
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
  const [activeModule, setActiveModule] = useState(0);

  useGSAP(() => {
    // Les cartes de modules
    const cards = gsap.utils.toArray('.tl-card');
    cards.forEach((card: any, i) => {
      gsap.fromTo(card, { autoAlpha: 0, x: 60, y: 30 }, {
        autoAlpha: 1, x: 0, y: 0, duration: 0.8, ease: 'back.out(1.1)',
        scrollTrigger: {
          trigger: card, start: 'top 78%', toggleActions: 'play none none reverse',
          onEnter: () => i < modules.length && setActiveModule(i),
          onEnterBack: () => i < modules.length && setActiveModule(i),
        }
      });
    });

    // La carte finale (CTA)
    gsap.fromTo('.tl-cta', { autoAlpha: 0, x: 60, y: 30 }, {
      autoAlpha: 1, x: 0, y: 0, duration: 0.8, ease: 'back.out(1.1)',
      scrollTrigger: { trigger: '.tl-cta', start: 'top 85%', toggleActions: 'play none none reverse' }
    });
  }, { scope: containerRef });

  const ActiveIllustration = ILLUSTRATIONS[activeModule];

  return (
    <section ref={containerRef} className="relative overflow-hidden border-t-4 border-[#1a2d4a]" style={{ background: '#d4e8f5' }}>

      {/* ── TITRE ── */}
      <div className="text-center pt-16 pb-10 px-6">
        <h2 style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(26px, 4.5vw, 58px)', color: '#1a2d4a', lineHeight: 1.1, textTransform: 'uppercase' }}>
          Ce que contient le guide
        </h2>
        <p style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(14px, 1.3vw, 17px)', color: 'rgba(26,45,74,0.65)', marginTop: 10, fontWeight: 500 }}>
          4 modules pour tout maîtriser, du sol au sommet
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex gap-8 lg:gap-12 items-start">

          {/* ── PANNEAU ILLUSTRATION GAUCHE — sticky ── */}
          <div className="hidden md:block shrink-0" style={{ width: 240 }}>
            <div className="sticky" style={{ top: '25vh' }}>
              <div className="flex flex-col items-center rounded-2xl overflow-hidden" style={{ background: '#ffffff', border: '4px solid #1a2d4a', boxShadow: '6px 6px 0 #1a2d4a', padding: '24px 16px 16px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeModule}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.96 }}
                    transition={{ duration: 0.38, ease: 'easeOut' }}
                    className="flex items-center justify-center"
                    style={{ minHeight: 180 }}
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
                    transition={{ duration: 0.25 }}
                    style={{ marginTop: 12, borderTop: '2px solid rgba(26,45,74,0.15)', paddingTop: 10, width: '100%', textAlign: 'center' }}
                  >
                    <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: 11, color: '#1a2d4a', letterSpacing: '.15em', textTransform: 'uppercase' }}>
                      {modules[activeModule].illuLabel}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {modules.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ width: i === activeModule ? 22 : 8, background: i === activeModule ? '#d4a017' : 'rgba(26,45,74,0.25)' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{ height: 8, borderRadius: 9999, border: i === activeModule ? '2px solid #1a2d4a' : '2px solid transparent' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── TIMELINE DROITE (Modules + CTA liés) ── */}
          <div className="flex-1 min-w-0">
            <div className="relative">

              {/* Ligne verticale qui descend JUSQU'EN BAS */}
              <div className="absolute top-0 bottom-0 pointer-events-none" style={{
                left: 20, width: 3, borderRadius: 4,
                background: 'linear-gradient(to bottom, #d4a017 0%, #7ec8d8 50%, #d4a017 100%)',
              }} />

              {/* Flex Container Modules + CTA */}
              <div className="flex flex-col gap-12 pb-8">
                {modules.map((mod, i) => (
                  <div key={i} className="tl-card flex items-start gap-6" style={{ paddingLeft: 0 }}>
                    <div className="shrink-0" style={{ marginLeft: 0, marginTop: 20, zIndex: 10 }}>
                      <Diamond level={mod.level} active={activeModule === i} />
                    </div>
                    <div className="flex-1 rounded-2xl transition-all duration-300"
                      style={{
                        background: '#ffffff', border: `3px solid #1a2d4a`,
                        boxShadow: activeModule === i ? '5px 5px 0 #1a2d4a, 0 8px 24px rgba(26,45,74,0.12)' : '4px 4px 0 rgba(26,45,74,0.5)',
                        padding: 'clamp(18px, 2.5vw, 28px)',
                      }}>
                      <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: 10, color: '#d4a017', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 6 }}>
                        Niveau {mod.level} — {mod.label}
                      </p>
                      <h3 style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: 'clamp(18px, 2vw, 26px)', color: '#1a2d4a', marginBottom: 10, lineHeight: 1.2 }}>
                        {mod.title}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(13px, 1.1vw, 15px)', color: 'rgba(26,45,74,0.72)', lineHeight: 1.7, fontWeight: 400 }}>
                        {mod.desc}
                      </p>
                    </div>
                  </div>
                ))}

                {/* ── CTA FINAL (Partie intégrante de la Timeline) ── */}
                <div className="tl-cta flex items-center gap-6 relative" style={{ paddingLeft: 0 }}>
                   {/* Marqueur de fin pour la timeline */}
                   <div className="shrink-0" style={{ marginLeft: 0, zIndex: 10 }}>
                      <div className="flex items-center justify-center transition-all duration-300"
                           style={{ width: 42, height: 42, background: '#1a2d4a', border: '2.5px solid #d4a017', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(212,160,23,0.25), 3px 3px 0 #d4a017', flexShrink: 0 }}>
                          <Unlock className="w-5 h-5 text-[#d4a017]" />
                      </div>
                   </div>

                   {/* Boîte CTA alignée avec les modules */}
                   <div className="flex-1 rounded-2xl transition-all duration-300 flex flex-col items-center text-center"
                        style={{ background: '#ffffff', border: '4px solid #1a2d4a', boxShadow: '6px 6px 0 #1a2d4a', padding: 'clamp(24px, 3vw, 40px)' }}>
                       <h3 style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(20px, 2.5vw, 30px)', color: '#1a2d4a', textTransform: 'uppercase', lineHeight: 1.2, marginBottom: 20 }}>
                         Prêt à plier le<br />prochain DS ?
                       </h3>
                       <GreekCTA size="md" goldBorder={false} showBadges={false} />
                       <div className="mt-4 flex gap-1 justify-center" style={{ color: '#d4a017' }}>
                         {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                       </div>
                       <p style={{ fontFamily: 'var(--font-space)', fontSize: 12, color: 'rgba(26,45,74,0.55)', letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, marginTop: 6 }}>
                         Accès immédiat · {offerConfig.launchPrice}€ offre lancement
                       </p>
                   </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}