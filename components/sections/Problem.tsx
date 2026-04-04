'use client';

import { motion } from 'motion/react';
import { useIsMobile } from '@/hooks/use-mobile';
import { offerConfig } from '@/lib/offer';

// ─── Symboles grecs déco ────────────────────────────────────────────────────
const DECO_SYMS = [
  { s: 'Σ', top: 8,  left: 3,  sz: 38, op: 0.07, rot: -12 },
  { s: 'Δ', top: 72, left: 6,  sz: 30, op: 0.06, rot: 18  },
  { s: 'Ω', top: 15, left: 91, sz: 34, op: 0.07, rot: 8   },
  { s: 'π', top: 78, left: 88, sz: 28, op: 0.06, rot: -20 },
];

// ─── Icônes SVG minimalistes (style DA grecque) ──────────────────────────────
function IconBlankPage() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
      <rect x="8" y="4" width="28" height="36" rx="2" stroke="#1a2d4a" strokeWidth="2.5" fill="rgba(26,45,74,0.04)" />
      <rect x="20" y="4" width="16" height="10" rx="1" stroke="#1a2d4a" strokeWidth="2" fill="rgba(26,45,74,0.08)" />
      <line x1="14" y1="22" x2="30" y2="22" stroke="#1a2d4a" strokeWidth="1.8" opacity="0.3" />
      <line x1="14" y1="28" x2="26" y2="28" stroke="#1a2d4a" strokeWidth="1.8" opacity="0.3" />
      <text x="38" y="42" textAnchor="middle" fill="#d4a017" fontSize="18" fontWeight="bold" fontFamily="Georgia,serif">?</text>
    </svg>
  );
}

function IconChute() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
      <polyline points="6,10 16,14 26,20 36,32 42,40" stroke="#c0392b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polygon points="42,40 34,36 38,30" fill="#c0392b" />
      <line x1="6" y1="40" x2="42" y2="40" stroke="rgba(26,45,74,0.2)" strokeWidth="1.5" />
      <line x1="6" y1="10" x2="6" y2="40" stroke="rgba(26,45,74,0.2)" strokeWidth="1.5" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" fill="none">
      <rect x="6" y="6" width="36" height="36" rx="2" stroke="#1a2d4a" strokeWidth="2.2" fill="rgba(26,45,74,0.04)" />
      <line x1="6" y1="14" x2="42" y2="14" stroke="#1a2d4a" strokeWidth="1.2" opacity="0.15" />
      <line x1="6" y1="20" x2="42" y2="20" stroke="#1a2d4a" strokeWidth="1.2" opacity="0.15" />
      <line x1="6" y1="26" x2="42" y2="26" stroke="#1a2d4a" strokeWidth="1.2" opacity="0.15" />
      <line x1="6" y1="32" x2="42" y2="32" stroke="#1a2d4a" strokeWidth="1.2" opacity="0.15" />
      <line x1="6" y1="38" x2="42" y2="38" stroke="#1a2d4a" strokeWidth="1.2" opacity="0.15" />
      {/* Gribouillis illisible */}
      <path d="M10,17 Q14,15 18,17 Q22,19 26,17 Q30,15 34,17" stroke="rgba(26,45,74,0.35)" strokeWidth="1" fill="none" />
      <path d="M10,23 Q15,21 20,23 Q25,25 30,23 Q35,21 38,23" stroke="rgba(26,45,74,0.35)" strokeWidth="1" fill="none" />
      <path d="M10,29 Q14,27 22,29 Q28,31 36,29" stroke="rgba(26,45,74,0.35)" strokeWidth="1" fill="none" />
      {/* Croix rouge d'incompréhension */}
      <line x1="30" y1="34" x2="38" y2="42" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="38" y1="34" x2="30" y2="42" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

const CARDS = [
  {
    Icon: IconBlankPage,
    title: 'Je connais mon cours, mais…',
    text: "Tu as passé une heure à relire tes fiches. Tu penses avoir tout compris. Mais face à l'énoncé du contrôle, c'est le trou noir. Impossible de savoir par où commencer ni quelle formule utiliser.",
    rot: -1.5,
  },
  {
    Icon: IconChute,
    title: 'Des heures de révision pour un 8/20',
    text: "Tu as l'impression de bosser deux fois plus que les autres, de passer tes soirées sur les DM, mais la note ne décolle jamais. C'est démotivant et tu finis par te dire que \"tu n'as pas la bosse des maths\".",
    rot: 0,
  },
  {
    Icon: IconBook,
    title: 'Le manuel est un labyrinthe',
    text: "Entre le prof qui va trop vite au tableau et le livre scolaire rempli de blocs de texte gris et de démonstrations illisibles, tu as l'impression qu'il te manque le décodeur pour suivre.",
    rot: 1.5,
  },
];

const STELE_BG = 'linear-gradient(160deg, #ede5da 0%, #d8ccbc 40%, #e8ddd0 70%, #cfc3b4 100%)';
const RULE = <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg,transparent,#8a7968 30%,#8a7968 70%,transparent)', marginBottom: 4 }} />;

export function Problem() {
  const isMobile = useIsMobile();
  return (
    <section
      className="relative overflow-hidden py-12 md:py-24 px-4 md:px-8"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #FDFBF7 60%, #F0E6D4 100%)', borderTop: '3px solid rgba(212,168,83,0.35)' }}
    >
      {/* Symboles grecs décoratifs */}
      {DECO_SYMS.map((m, i) => (
        <span key={i} className="absolute select-none pointer-events-none"
          style={{ top: `${m.top}%`, left: `${m.left}%`, fontSize: m.sz, opacity: m.op, color: '#1a2d4a', transform: `rotate(${m.rot}deg)`, fontFamily: 'var(--font-cinzel)', fontWeight: 700 }}>
          {m.s}
        </span>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── TITRE ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: 11, color: '#d4a017', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 12 }}>
            Tu n'es pas seul
          </p>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(26px, 4.2vw, 54px)', color: '#1a2d4a', lineHeight: 1.1, textTransform: 'uppercase' }}>
            Si tu ressens ça aujourd'hui,
          </h2>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(26px, 4.2vw, 54px)', color: '#1a2d4a', lineHeight: 1.1, textTransform: 'uppercase', marginBottom: 12 }}>
            <span style={{ color: '#EC6426' }}>c'est normal.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(14px, 1.3vw, 17px)', color: 'rgba(26,45,74,0.6)', fontWeight: 500, maxWidth: 480, margin: '0 auto' }}>
            Et devine quoi ? Ce n'est pas une fatalité.
          </p>
        </motion.div>

        {/* ── 3 STÈLES ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: 'backOut' }}
              style={{ transform: isMobile ? 'none' : `rotate(${card.rot}deg)` }}
            >
              <div style={{
                background: STELE_BG,
                border: '2.5px solid #8a7968',
                borderRadius: 12,
                boxShadow: '5px 5px 0 #5a4e3e, inset 0 1px 0 rgba(255,255,255,0.45)',
                padding: '28px 26px 32px',
                display: 'flex', flexDirection: 'column', gap: 14,
              }}>
                {RULE}
                {/* Icône — plus grande */}
                <div className="flex justify-center pt-2 pb-1" style={{ transform: 'scale(1.25)', transformOrigin: 'center' }}>
                  <card.Icon />
                </div>
                {/* Titre */}
                <p style={{
                  fontFamily: 'var(--font-cinzel)', fontWeight: 900,
                  fontSize: 'clamp(15px, 1.4vw, 19px)', color: '#1a2d4a',
                  textAlign: 'center', lineHeight: 1.35,
                  textShadow: '0 1px 0 rgba(255,255,255,0.6)',
                }}>
                  {card.title}
                </p>
                <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#8a7968 30%,#8a7968 70%,transparent)' }} />
                {/* Corps — plus grand, plus contrasté */}
                <p style={{
                  fontFamily: 'var(--font-space)', fontSize: 'clamp(13.5px, 1.1vw, 15.5px)',
                  color: 'rgba(30,18,8,0.92)', lineHeight: 1.7, fontWeight: 600, textAlign: 'center',
                }}>
                  {card.text}
                </p>
                {RULE}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── PONT SOLUTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center text-center gap-4"
        >
          {/* Frise méandre décorative */}
          <svg width="200" height="16" viewBox="0 0 200 16" fill="none" className="opacity-40">
            <polyline points="0,12 6,12 6,4 14,4 14,12 22,12 22,8 30,8 30,12 38,12 38,4 46,4 46,12 54,12 54,8 62,8 62,12 70,12 70,4 78,4 78,12 86,12 86,8 94,8 94,12 102,12 102,4 110,4 110,12 118,12 118,8 126,8 126,12 134,12 134,4 142,4 142,12 150,12 150,8 158,8 158,12 166,12 166,4 174,4 174,12 182,12 182,8 190,8 190,12 200,12"
              stroke="#D4A853" strokeWidth="1.5" fill="none" />
          </svg>
          <p style={{
            fontFamily: 'var(--font-space)', fontWeight: 600,
            fontSize: 'clamp(14px, 1.3vw, 17px)', color: 'rgba(26,45,74,0.7)',
            maxWidth: 540,
          }}>
            Le problème n'est pas ton cerveau — c'est la méthode qu'on t'a apprise.{' '}
            <span style={{ color: '#1a2d4a', fontWeight: 800 }}>
              Comprendre avant d'apprendre change tout.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
