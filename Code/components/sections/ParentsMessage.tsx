'use client';

import { ShieldCheck, X, Check, ReceiptText } from 'lucide-react';
import { motion } from 'motion/react';
import { offerConfig } from '@/lib/offer';

const DECO_SYMS = [
  { s: 'Φ', top: 6,  left: 2,  sz: 36, op: 0.07, rot: -10 },
  { s: 'Λ', top: 80, left: 5,  sz: 28, op: 0.06, rot: 15  },
  { s: 'Ψ', top: 10, left: 93, sz: 32, op: 0.07, rot: 8   },
  { s: 'Θ', top: 75, left: 90, sz: 26, op: 0.06, rot: -18 },
];

const CONS_LEFT = [
  'Seulement 1h/semaine (rarement la veille du contrôle)',
  "Qualité aléatoire — souvent un étudiant sans vraie pédagogie",
  "L'élève reste passif et attend qu'on fasse l'exercice à sa place",
  "Galère d'organisation (annulations, retards, plannings)",
  "Impossible de revoir l'explication une fois le prof parti",
];

const PROS_RIGHT = [
  'Disponible 24/7, exactement au moment où il bloque',
  'Pédagogie visuelle — communauté YouTube +100k abonnés',
  "Rend l'élève 100% autonome face à sa copie",
  '0 contrainte logistique (PC, tablette, smartphone)',
  "Vidéos rejouables à l'infini jusqu'au déclic",
];

const RULE = <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg,transparent,#8a7968 30%,#8a7968 70%,transparent)', margin: '4px 0' }} />;

export function ParentsMessage() {
  return (
    <section
      className="relative overflow-hidden py-24 px-4 md:px-8"
      style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5EAD8 50%, #EDE0CC 100%)', borderTop: '3px solid rgba(212,168,83,0.35)' }}
    >
      {/* Symboles grecs */}
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
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center rounded-full p-4 mb-6"
            style={{ background: 'linear-gradient(160deg, #ede5da 0%, #d8ccbc 100%)', border: '2.5px solid #8a7968', boxShadow: '4px 4px 0 #5a4e3e', transform: 'rotate(-2deg)' }}>
            <ShieldCheck className="w-7 h-7" style={{ color: '#2a1e12' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(24px, 4vw, 50px)', color: '#1a2d4a', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 12 }}>
            Un mot pour les parents
          </h2>
          <p style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(14px, 1.3vw, 17px)', color: 'rgba(26,45,74,0.6)', fontWeight: 500, maxWidth: 520, margin: '0 auto' }}>
            Pourquoi ce programme est l'investissement le plus rentable pour le dossier Parcoursup de votre enfant.
          </p>
        </motion.div>

        {/* ── COMPARATIF ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">

          {/* Cours classiques — stèle pâle */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <div style={{
              background: 'linear-gradient(160deg, #f2ede6 0%, #e4dcd0 40%, #ede6da 70%, #d8d0c4 100%)',
              border: '2.5px dashed #8a7968',
              borderRadius: 12,
              padding: 'clamp(20px, 2.5vw, 32px)',
              display: 'flex', flexDirection: 'column', gap: 16, height: '100%',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
              position: 'relative',
            }}>
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full"
                style={{ background: 'linear-gradient(160deg, #ede5da 0%, #d8ccbc 100%)', border: '2px solid #8a7968', boxShadow: '2px 2px 0 #5a4e3e' }}>
                <ReceiptText className="w-4 h-4" style={{ color: 'rgba(42,30,18,0.5)' }} />
                <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: 11, color: 'rgba(42,30,18,0.55)', letterSpacing: '.12em', textTransform: 'uppercase' }}>
                  Cours classiques
                </span>
              </div>
              {RULE}
              <ul className="flex flex-col gap-3 mt-4">
                {CONS_LEFT.map((txt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'rgba(192,57,43,0.6)' }} />
                    <span style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(13px, 1vw, 15px)', color: 'rgba(42,30,18,0.65)', fontWeight: 500, lineHeight: 1.5 }}>{txt}</span>
                  </li>
                ))}
              </ul>
              {RULE}
              <div className="flex justify-between items-end">
                <span style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: 12, color: 'rgba(42,30,18,0.5)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Total estimé</span>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(22px, 2.5vw, 30px)', color: 'rgba(42,30,18,0.65)' }}>~800€<span style={{ fontSize: 14 }}>/an</span></span>
              </div>
            </div>
          </motion.div>

          {/* Maths Ultime — stèle premium navy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ transform: 'translateY(-8px)' }}
          >
            <div style={{
              background: 'linear-gradient(160deg, #1e3560 0%, #0d1b3e 50%, #1a2d4a 100%)',
              border: '2.5px solid #d4a017',
              borderRadius: 12,
              padding: 'clamp(20px, 2.5vw, 32px)',
              display: 'flex', flexDirection: 'column', gap: 16, height: '100%',
              boxShadow: '6px 6px 0 #d4a017, 0 20px 50px rgba(13,27,62,0.4)',
              position: 'relative',
            }}>
              {/* Badge Paiement Unique */}
              <div className="absolute -top-4 -right-3 rotate-[4deg] px-3 py-1.5"
                style={{ background: '#EC6426', border: '2px solid #d4a017', boxShadow: '3px 3px 0 #d4a017', borderRadius: 6 }}>
                <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: 11, color: '#fff', letterSpacing: '.1em', textTransform: 'uppercase' }}>Paiement Unique</span>
              </div>
              {/* Titre */}
              <div style={{ borderBottom: '1px solid rgba(212,160,23,0.3)', paddingBottom: 12 }}>
                <h3 style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(16px, 1.6vw, 22px)', color: '#f5ecd4', textTransform: 'uppercase', textAlign: 'center' }}>
                  Le Guide Maths Ultime
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                {PROS_RIGHT.map((txt, i) => (
                  <li key={i} className="flex items-start gap-3 p-2.5 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,160,23,0.15)' }}>
                    <div className="rounded-full p-1 shrink-0 mt-0.5" style={{ background: '#d4a017' }}>
                      <Check className="w-3.5 h-3.5 stroke-[3.5]" style={{ color: '#1a2d4a' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(13px, 1vw, 15px)', color: 'rgba(245,236,212,0.8)', fontWeight: 500, lineHeight: 1.5 }}>{txt}</span>
                  </li>
                ))}
              </ul>
              <div style={{ borderTop: '1px solid rgba(212,160,23,0.3)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-space)', fontWeight: 600, fontSize: 12, color: 'rgba(245,236,212,0.45)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Offre lancement</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: 18, color: 'rgba(245,236,212,0.35)', textDecoration: 'line-through', marginRight: 8 }}>{offerConfig.regularPrice}€</span>
                  <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(26px, 3vw, 36px)', color: '#EC6426' }}>{offerConfig.launchPrice}€</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
