'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { GreekCTA } from '@/components/ui';

// ─── Piliers de marbre ──────────────────────────────────────────────────────
function MarblePillar({ side }: { side: 'left' | 'right' }) {
  return (
    <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, [side]: 0, width: 'clamp(48px, 4.5vw, 72px)', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none', zIndex: 0 }}>
      <div style={{ width: '100%', height: 'clamp(22px, 2.5vw, 36px)', background: 'linear-gradient(180deg, #f0e8d8 0%, #d6c9b0 50%, #c4b49a 100%)', borderRadius: '6px 6px 0 0', border: '1.5px solid #a89070', borderBottom: 'none', boxShadow: '0 -3px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.5)', flexShrink: 0 }} />
      <div style={{ flex: 1, width: '78%', background: 'linear-gradient(90deg, #c8b898 0%, #e8dcc8 12%, #f4ece0 28%, #faf4ea 50%, #f2e8d6 68%, #ddd0b8 84%, #c0ae90 100%)', border: '1px solid #b0a080', borderTop: 'none', borderBottom: 'none', boxShadow: 'inset 2px 0 6px rgba(0,0,0,0.08), inset -2px 0 6px rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden' }}>
        {[18, 36, 54, 72].map((pct) => (
          <div key={pct} style={{ position: 'absolute', top: 0, bottom: 0, left: `${pct}%`, width: 1, background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.10) 20%, rgba(0,0,0,0.10) 80%, transparent)' }} />
        ))}
      </div>
      <div style={{ width: '100%', height: 'clamp(18px, 2vw, 28px)', background: 'linear-gradient(0deg, #c4b49a 0%, #d6c9b0 50%, #e8dcc8 100%)', borderRadius: '0 0 6px 6px', border: '1.5px solid #a89070', borderTop: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.18), inset 0 -1px 0 rgba(255,255,255,0.3)', flexShrink: 0 }} />
    </div>
  );
}

// ─── Symboles grecs déco ────────────────────────────────────────────────────
const DECO_SYMS = [
  { s: 'Σ', top: 8,  left: 3,  sz: 38, op: 0.07, rot: -12 },
  { s: 'Δ', top: 72, left: 6,  sz: 30, op: 0.06, rot: 18  },
  { s: 'Ω', top: 15, left: 91, sz: 34, op: 0.07, rot: 8   },
  { s: 'π', top: 78, left: 88, sz: 28, op: 0.06, rot: -20 },
];

// ─── Icônes SVG ──────────────────────────────────────────────────────────────

/** Livre ouvert avec pages et lignes de texte */
function IconOpenBook() {
  return (
    <svg viewBox="0 0 56 48" width="52" height="44" fill="none">
      {/* Reliure centrale */}
      <line x1="28" y1="6" x2="28" y2="44" stroke="#8a7968" strokeWidth="2" strokeLinecap="round" />
      {/* Page gauche */}
      <path d="M28,6 Q16,4 6,8 L6,42 Q16,38 28,42 Z" fill="#fff8f0" stroke="#8a7968" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Page droite */}
      <path d="M28,6 Q40,4 50,8 L50,42 Q40,38 28,42 Z" fill="#fff8f0" stroke="#8a7968" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Lignes page gauche */}
      <line x1="10" y1="16" x2="25" y2="14" stroke="#1a2d4a" strokeWidth="1.2" opacity="0.3" />
      <line x1="10" y1="21" x2="25" y2="19" stroke="#1a2d4a" strokeWidth="1.2" opacity="0.3" />
      <line x1="10" y1="26" x2="25" y2="24" stroke="#1a2d4a" strokeWidth="1.2" opacity="0.3" />
      <line x1="10" y1="31" x2="22" y2="29" stroke="#1a2d4a" strokeWidth="1.2" opacity="0.3" />
      {/* Lignes page droite */}
      <line x1="31" y1="14" x2="46" y2="16" stroke="#1a2d4a" strokeWidth="1.2" opacity="0.3" />
      <line x1="31" y1="19" x2="46" y2="21" stroke="#1a2d4a" strokeWidth="1.2" opacity="0.3" />
      <line x1="31" y1="24" x2="46" y2="26" stroke="#1a2d4a" strokeWidth="1.2" opacity="0.3" />
      <line x1="31" y1="29" x2="42" y2="31" stroke="#1a2d4a" strokeWidth="1.2" opacity="0.3" />
      {/* Marque-page */}
      <line x1="44" y1="4" x2="44" y2="16" stroke="#EC6426" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="41,15 44,20 47,15" fill="#EC6426" />
    </svg>
  );
}

/** Gros plan tête de prof diabolique — sourcils en V Satan, yeux rouges, rictus */
function IconDevilTeacher() {
  return (
    <svg viewBox="0 0 56 56" width="56" height="56" fill="none">
      {/* Cornes DERRIÈRE la tête */}
      <path d="M15,20 L9,2 L20,16" fill="#c0392b" stroke="#7a0000" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M41,20 L47,2 L36,16" fill="#c0392b" stroke="#7a0000" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Tête */}
      <circle cx="28" cy="32" r="20" fill="#f2dfc8" stroke="#1a2d4a" strokeWidth="2" />
      {/* Sourcils en V diabolique très prononcé — intérieur haut, extérieur bas */}
      <path d="M13,23 L22,28" stroke="#1a2d4a" strokeWidth="3" strokeLinecap="round" />
      <path d="M43,23 L34,28" stroke="#1a2d4a" strokeWidth="3" strokeLinecap="round" />
      {/* Ombre sous les sourcils pour l'effet cave */}
      <path d="M14,24 L22,28.5" stroke="rgba(0,0,0,0.15)" strokeWidth="2" strokeLinecap="round" />
      <path d="M42,24 L34,28.5" stroke="rgba(0,0,0,0.15)" strokeWidth="2" strokeLinecap="round" />
      {/* Yeux — iris rouge sang, plissés */}
      <ellipse cx="22" cy="33" rx="4.5" ry="3.5" fill="#8a0000" stroke="#1a2d4a" strokeWidth="1.5" />
      <ellipse cx="34" cy="33" rx="4.5" ry="3.5" fill="#8a0000" stroke="#1a2d4a" strokeWidth="1.5" />
      {/* Pupilles noires fendues (comme un serpent/démon) */}
      <ellipse cx="22" cy="33" rx="1.2" ry="2.8" fill="#0a0a0a" />
      <ellipse cx="34" cy="33" rx="1.2" ry="2.8" fill="#0a0a0a" />
      {/* Reflets */}
      <ellipse cx="20.5" cy="31.5" rx="0.8" ry="0.6" fill="white" opacity="0.6" />
      <ellipse cx="32.5" cy="31.5" rx="0.8" ry="0.6" fill="white" opacity="0.6" />
      {/* Sourire diabolique — large, coins bien remontés */}
      <path d="M16,44 Q28,54 40,44" stroke="#1a2d4a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Gros plan tête d'élève triste avec une larme */
function IconCryingStudent() {
  return (
    <svg viewBox="0 0 56 56" width="56" height="56" fill="none">
      {/* Tête parfaitement ronde, sans cheveux */}
      <circle cx="28" cy="28" r="22" fill="#f5ede0" stroke="#1a2d4a" strokeWidth="2" />
      {/* Sourcils tristes (inclinés vers le haut au centre) */}
      <path d="M17,22 Q21,19 25,21" stroke="#1a2d4a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M31,21 Q35,19 39,22" stroke="#1a2d4a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Yeux tristes mi-fermés */}
      <ellipse cx="22" cy="27" rx="3" ry="2.5" fill="#1a2d4a" />
      <ellipse cx="34" cy="27" rx="3" ry="2.5" fill="#1a2d4a" />
      <ellipse cx="23" cy="26" rx="1" ry="0.8" fill="white" />
      <ellipse cx="35" cy="26" rx="1" ry="0.8" fill="white" />
      {/* Bouche triste */}
      <path d="M20,38 Q28,34 36,38" stroke="#1a2d4a" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Larme gauche */}
      <ellipse cx="21" cy="32" rx="1.8" ry="2.8" fill="#4FC3F7" opacity="0.9" />
      <path d="M19.5,34 Q21,38 21,40" stroke="#4FC3F7" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      {/* Petite larme droite */}
      <ellipse cx="35" cy="31" rx="1.2" ry="1.8" fill="#4FC3F7" opacity="0.6" />
    </svg>
  );
}

// Hover rotate : stèle 1 → -5°, stèle 2 → 0°, stèle 3 → +5°
const CARDS = [
  {
    Icon: IconOpenBook,
    title: '"Je connais mon cours, mais…"',
    text: "Tu révises des heures pour l'éval, tu relis tes fiches, tu penses avoir compris… et tu te prends un 10/20. Apprendre par cœur, ça ne suffit pas. Avec Maths Ultime, tu comprends ton cours avant de l'apprendre, et tes notes font ×2.",
    baseRot: -1.5,
    hoverRot: -5,
    accent: '#EC6426',
    accentBg: 'rgba(236,100,38,0.08)',
  },
  {
    Icon: IconDevilTeacher,
    title: '"Le prof explique mal"',
    text: "T'as beau écouter le cours, t'as l'impression que ça sert à rien, le prof explique mal et tous tes potes sont largués. La vérité : avec 25 élèves, le prof peut pas s'adapter à toi. Maths Ultime corrige ça.",
    baseRot: 0,
    hoverRot: 0,
    accent: '#c0392b',
    accentBg: 'rgba(192,57,43,0.06)',
  },
  {
    Icon: IconCryingStudent,
    title: '"Je comprends rien en cours"',
    text: "T'as l'impression que tout le monde avance plus vite, que le programme est trop dur et tu penses juste que t'es \"nul en maths\". Avec MATHS ULTIME, chaque cours est expliqué pour qu'un enfant de 5 ans puisse le comprendre.",
    baseRot: 1.5,
    hoverRot: 5,
    accent: '#d4a017',
    accentBg: 'rgba(212,160,23,0.1)',
  },
];

const STELE_BG = 'linear-gradient(160deg, #f5e9d0 0%, #eedfc0 40%, #f2e4c8 70%, #e8d5b0 100%)';
const RULE = <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg,transparent,#8a7968 30%,#8a7968 70%,transparent)', marginBottom: 4 }} />;

function SteleCard({ card, delay, active, onRef }: {
  card: typeof CARDS[number];
  delay: number;
  active: boolean;
  onRef: (node: HTMLDivElement | null) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.7, delay, type: 'spring', stiffness: 90, damping: 12 }}
    >
      <motion.div
        ref={onRef}
        animate={{ rotate: card.baseRot, scale: 1, y: 0 }}
        whileHover={{
          rotate: card.hoverRot,
          scale: 1.04,
          y: -8,
          transition: { type: 'spring', stiffness: 280, damping: 28 },
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 30 }}
        style={{ cursor: 'default', transformOrigin: 'bottom center' }}
      >
        <div style={{
          background: STELE_BG,
          border: active ? '2.5px solid #d4a017' : '2.5px solid #8a7968',
          borderRadius: 12,
          boxShadow: active
            ? '0 8px 24px rgba(212,160,23,0.35), inset 0 1px 0 rgba(255,255,255,0.55)'
            : '5px 5px 0 #5a4e3e, inset 0 1px 0 rgba(255,255,255,0.45)',
          transition: 'border-color 0.28s ease, box-shadow 0.28s ease',
          padding: '28px 26px 32px', display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {RULE}
          <div className="flex justify-center items-center pt-2 pb-1 rounded-lg"
            style={{ background: card.accentBg, transform: 'scale(1.2)', transformOrigin: 'center', padding: '12px 0' }}>
            <card.Icon />
          </div>
          <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 900, fontSize: 'clamp(15px, 1.4vw, 19px)', color: card.accent, textAlign: 'center', lineHeight: 1.35, textShadow: '0 1px 3px rgba(255,255,255,0.8)' }}>
            {card.title}
          </p>
          <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${card.accent}66 30%,${card.accent}66 70%,transparent)` }} />
          <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 'clamp(13.5px, 1.1vw, 15.5px)', color: 'rgba(30,18,8,0.88)', lineHeight: 1.72, fontWeight: 600, textAlign: 'center' }}>
            {card.text}
          </p>
          {RULE}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Problem() {
  // Index de la stèle active (-1 = aucune)
  const [activeIdx, setActiveIdx] = useState(-1);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([null, null, null]);
  const activeIdxRef = useRef(-1);
  activeIdxRef.current = activeIdx;

  useEffect(() => {
    // touchstart sur document :
    // - si le target est dans une stèle → active cette stèle (désactive l'autre)
    // - si le target est hors de toutes les stèles → désactive
    const onTouchStart = (e: TouchEvent) => {
      const target = e.target as Node;
      let hitIdx = -1;
      for (let i = 0; i < cardRefs.current.length; i++) {
        const el = cardRefs.current[i];
        if (el && el.contains(target)) { hitIdx = i; break; }
      }
      if (hitIdx !== -1) {
        // Contact sur une stèle → active
        setActiveIdx(hitIdx);
      } else {
        // Contact hors de toutes les stèles → désactive
        if (activeIdxRef.current !== -1) setActiveIdx(-1);
      }
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    return () => document.removeEventListener('touchstart', onTouchStart);
  }, []);

  return (
    <section
      className="relative overflow-hidden py-12 md:py-24 px-4 md:px-8"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FDFBF7 60%, #F0E6D4 100%)', borderTop: '3px solid rgba(212,168,83,0.35)' }}
    >
      {/* Piliers de marbre */}
      <MarblePillar side="left" />
      <MarblePillar side="right" />

      {/* Chibi innocent souriant — droite, paramètres CS MS (miroir du left-12 top-10 w-72) */}
      <motion.div
        className="hidden xl:flex absolute z-10 pointer-events-none flex-col items-center"
        style={{ right: '3rem', top: '5rem', width: '16rem', transform: 'rotate(6deg)' }}
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
        >
          <Image src="/innocent souriant.png" alt="" width={500} height={500} className="w-full h-auto drop-shadow-2xl" />
        </motion.div>
      </motion.div>

      {/* Symboles grecs décoratifs */}
      {DECO_SYMS.map((m, i) => (
        <span key={i} className="absolute select-none pointer-events-none"
          style={{ top: `${m.top}%`, left: `${m.left}%`, fontSize: m.sz, opacity: m.op, color: '#1a2d4a', transform: `rotate(${m.rot}deg)`, fontFamily: 'var(--font-baloo)', fontWeight: 700 }}>
          {m.s}
        </span>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── TITRE ── ligne par ligne avec montée */}
        <div className="text-center mb-16">
          <h2 className="uppercase text-center" style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(20px, 3.5vw, 50px)', color: '#1a2d4a', lineHeight: 1.35, marginBottom: 12 }}>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -60px 0px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'block' }}
            >
              TU N&apos;ES PAS NUL EN MATHS,
            </motion.span>
            <span style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.4em' }}>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              >TU N&apos;AS JUSTE PAS</motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                transition={{ duration: 0.5, delay: 0.28, type: 'spring', stiffness: 200, damping: 18 }}
                className="transform -rotate-1 inline-block"
                style={{ background: '#EC6426', color: '#fff', padding: '2px 16px', border: '3px solid #1a2d4a', boxShadow: '6px 6px 0 #1a2d4a', fontFamily: 'var(--font-cinzel)', fontWeight: 900 }}
              >
                LA MÉTHODE
              </motion.span>
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.45, delay: 0.42 }}
            style={{ fontFamily: 'var(--font-baloo)', fontSize: 'clamp(14px, 1.3vw, 17px)', color: 'rgba(26,45,74,0.6)', fontWeight: 500, maxWidth: 480, margin: '0 auto' }}
          >
            Et devine quoi&nbsp;? Tu peux changer ça.
          </motion.p>
        </div>

        {/* ── 3 STÈLES ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {CARDS.map((card, i) => (
            <SteleCard
              key={i}
              card={card}
              delay={i * 0.12}
              active={activeIdx === i}
              onRef={(node) => { cardRefs.current[i] = node; }}
            />
          ))}
        </div>

        {/* ── PONT SOLUTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -40px 0px' }} transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center text-center gap-4"
        >
          {/* Frise méandre */}
          <svg width="200" height="16" viewBox="0 0 200 16" fill="none" className="opacity-40">
            <polyline points="0,12 6,12 6,4 14,4 14,12 22,12 22,8 30,8 30,12 38,12 38,4 46,4 46,12 54,12 54,8 62,8 62,12 70,12 70,4 78,4 78,12 86,12 86,8 94,8 94,12 102,12 102,4 110,4 110,12 118,12 118,8 126,8 126,12 134,12 134,4 142,4 142,12 150,12 150,8 158,8 158,12 166,12 166,4 174,4 174,12 182,12 182,8 190,8 190,12 200,12"
              stroke="#D4A853" strokeWidth="1.5" fill="none" />
          </svg>
          <p style={{
            fontFamily: 'var(--font-baloo)', fontWeight: 600,
            fontSize: 'clamp(14px, 1.3vw, 17px)', color: 'rgba(26,45,74,0.7)',
            maxWidth: 540,
            marginBottom: 24,
          }}>
            Le problème n&apos;est pas ton cerveau — c&apos;est la méthode qu&apos;on t&apos;a apprise.{' '}
            <span style={{ color: '#1a2d4a', fontWeight: 800 }}>
              Comprendre avant d&apos;apprendre change tout.
            </span>
          </p>
          <GreekCTA size="md" goldBorder={false} showBadges={false} />
        </motion.div>

      </div>
    </section>
  );
}
