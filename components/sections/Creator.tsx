'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

const stats = [
  { value: '2 000+', label: 'Élèves accompagnés' },
  { value: '+6 PTS', label: 'Moyenne gagnée en avg' },
  { value: '4.9/5', label: 'Note moyenne' },
];

const bullets = [
  "J'ai galéré en maths jusqu'en Terminale — j'ai compris que le problème était la méthode, pas le cerveau.",
  "J'ai développé une approche visuelle qui fait comprendre avant de faire mémoriser.",
  "Plus de 2 000 élèves ont suivi cette méthode. Les résultats parlent d'eux-mêmes.",
  "Ce guide, c'est tout ce que j'aurais voulu avoir quand j'étais lycéen.",
  "Je continue à mettre à jour le contenu chaque année selon les nouveaux programmes.",
];

const cardSpring = { type: 'spring' as const, stiffness: 65, damping: 18 };

export function Creator() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-8 text-white overflow-x-clip" style={{ background: '#1a2d4a', borderTop: '4px solid #d4a017' }}>
      <div className="max-w-5xl mx-auto">

        {/* ── TITRE CENTRÉ ── */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ ...cardSpring, delay: 0.05 }}
          className="text-center mb-4"
          style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 52px)', color: '#f5ecd4', textTransform: 'uppercase', lineHeight: 1.1 }}
        >
          Pourquoi tu devrais m'écouter&nbsp;?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ ...cardSpring, delay: 0.15 }}
          className="text-center mb-12"
          style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(13px, 1.2vw, 17px)', color: 'rgba(245,236,212,0.62)', maxWidth: 560, margin: '0 auto 52px' }}
        >
          Pas un prof. Quelqu&apos;un qui a vécu les mêmes galères que toi — et trouvé comment les surmonter.
        </motion.p>

        {/* ── LAYOUT DEUX COLONNES ── */}
        <div className="flex flex-col md:flex-row gap-10 items-start">

          {/* ── GAUCHE : avatar + nom ── */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ ...cardSpring, delay: 0.2 }}
            className="flex flex-col items-center mx-auto md:mx-0"
            style={{ width: 200, flexShrink: 0 }}
          >
            {/* Avatar circulaire */}
            <div style={{
              width: 180, height: 180, borderRadius: '50%',
              border: '4px solid #d4a017',
              overflow: 'hidden',
              boxShadow: '0 0 0 6px rgba(212,160,23,0.15), 6px 6px 0 rgba(212,160,23,0.3)',
              background: '#f5ecd4',
            }}>
              <Image
                src="/chadlogo.jpeg"
                alt="ChadSciences"
                width={180}
                height={180}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Nom */}
            <p className="mt-5 text-center" style={{
              fontFamily: 'var(--font-cinzel)', fontWeight: 700,
              fontSize: 14, color: '#d4a017',
              textTransform: 'uppercase', letterSpacing: '.06em',
            }}>
              ChadSciences
            </p>
            <p className="mt-1 text-center" style={{
              fontFamily: 'var(--font-space)', fontSize: 13,
              color: 'rgba(245,236,212,0.45)', fontWeight: 500,
            }}>
              Créateur — Maths Ultime
            </p>
          </motion.div>

          {/* ── DROITE : stats + bullets ── */}
          <div className="flex-1 min-w-0">

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ ...cardSpring, delay: 0.25 }}
              className="grid grid-cols-3 gap-2 sm:gap-3 mb-8"
            >
              {stats.map((s, i) => (
                <div key={i} style={{
                  border: '2px solid rgba(212,160,23,0.45)',
                  borderRadius: 8,
                  padding: 'clamp(8px, 1.5vw, 18px) clamp(6px, 1vw, 14px)',
                  textAlign: 'center',
                  background: 'rgba(212,160,23,0.06)',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-cinzel)', fontWeight: 900,
                    fontSize: 'clamp(16px, 2.2vw, 24px)', color: '#d4a017', lineHeight: 1,
                  }}>
                    {s.value}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-space)', fontSize: 'clamp(10px, 0.85vw, 12px)',
                    color: 'rgba(245,236,212,0.5)', marginTop: 6, fontWeight: 500, lineHeight: 1.3,
                  }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Bullets */}
            <ul className="flex flex-col gap-4">
              {bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ ...cardSpring, delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <span style={{ color: '#d4a017', fontSize: 14, flexShrink: 0, marginTop: 3, lineHeight: 1 }}>♦</span>
                  <p style={{
                    fontFamily: 'var(--font-space)',
                    fontSize: 'clamp(13px, 1.1vw, 15px)',
                    color: 'rgba(245,236,212,0.82)',
                    lineHeight: 1.65, fontWeight: 500,
                  }}>
                    {b}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
