'use client';

import Image from 'next/image';
import { Zap } from 'lucide-react';
import { motion } from 'motion/react';

const cardSpring = { type: 'spring' as const, stiffness: 65, damping: 18 };

export function Creator() {
  return (
    <section className="py-24 px-4 md:px-8 text-white overflow-visible relative" style={{ background: '#1a2d4a', borderTop: '4px solid #d4a017' }}>

      {/* Symboles grecs décoratifs */}
      {[
        { s: 'Ω', top: 6,  left: 4,  sz: 54, op: 0.07, rot: -15 },
        { s: 'Σ', top: 72, left: 6,  sz: 40, op: 0.06, rot: 12  },
        { s: '∫', top: 15, left: 88, sz: 50, op: 0.07, rot: -8  },
        { s: 'Δ', top: 78, left: 86, sz: 36, op: 0.06, rot: 20  },
        { s: 'φ', top: 40, left: 2,  sz: 30, op: 0.05, rot: 30  },
        { s: '√', top: 55, left: 92, sz: 34, op: 0.05, rot: -18 },
      ].map((m, i) => (
        <span key={i} className="absolute select-none pointer-events-none"
          style={{ top: `${m.top}%`, left: `${m.left}%`, fontSize: m.sz, opacity: m.op, color: '#e8c96a', transform: `rotate(${m.rot}deg)`, fontFamily: 'var(--font-baloo)', fontWeight: 700 }}>
          {m.s}
        </span>
      ))}

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">

        {/* ── GAUCHE : bloc illustré avec avatar ── */}
        <motion.div
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...cardSpring, delay: 0.1 }}
          className="w-full md:w-1/2 relative"
        >
          {/* Fond décalé or */}
          <div
            className="absolute inset-0 rounded-[3rem] transform -rotate-6"
            style={{ background: '#d4a017', border: '3px solid #071229', boxShadow: '6px 6px 0 rgba(7,18,41,0.5)' }}
          />

          {/* Carte principale */}
          <a
            href="https://www.youtube.com/@ChadSciences"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square rounded-[3rem] overflow-hidden flex flex-col items-center justify-center p-8 text-center group"
            style={{ background: '#FDFBF7', border: '3px solid #d4a017', display: 'flex', textDecoration: 'none' }}
          >
            {/* Symboles math en fond */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" style={{ color: '#d4a017', opacity: 0.1 }}>
              <div className="absolute top-10 left-10 text-6xl font-extrabold rotate-12">∑</div>
              <div className="absolute top-20 right-20 text-6xl font-extrabold -rotate-12">∫</div>
              <div className="absolute bottom-20 left-20 text-6xl font-extrabold rotate-45">π</div>
              <div className="absolute bottom-10 right-10 text-6xl font-extrabold -rotate-12">√</div>
              <div className="absolute top-1/2 left-1/2 text-8xl font-extrabold -translate-x-1/2 -translate-y-1/2">∞</div>
            </div>

            {/* Avatar */}
            <div
              className="flex items-center justify-center mb-6 relative z-10 overflow-hidden group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out"
              style={{ width: 160, height: 160, borderRadius: '50%', border: '4px solid #d4a017', boxShadow: '0 0 0 6px rgba(212,160,23,0.15), 4px 4px 0 rgba(7,18,41,0.3)', background: '#FDFBF7' }}
            >
              <Image
                src="/chadlogo.jpeg"
                alt="ChadSciences Logo"
                width={160}
                height={160}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Nom */}
            <h3
              className="relative z-10 uppercase tracking-tight"
              style={{ fontFamily: 'var(--font-baloo)', fontWeight: 900, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#1a2d4a' }}
            >
              ChadSciences
            </h3>

            {/* Badge rôle */}
            <p
              className="mt-2 relative z-10 px-3 py-1 rounded-full cursor-default"
              style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 12, color: 'rgba(26,45,74,0.6)', textTransform: 'uppercase', letterSpacing: '.1em', background: 'rgba(212,160,23,0.15)', border: '2px solid rgba(212,160,23,0.4)' }}
            >
              Créateur du Guide
            </p>

            {/* Icône zap flottante */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="absolute top-12 right-12 rounded-full p-3"
              style={{ background: '#e8b520', border: '3px solid #1a2d4a', boxShadow: '3px 3px 0 rgba(7,18,41,0.4)' }}
            >
              <Zap className="w-8 h-8" style={{ color: '#1a2d4a' }} fill="currentColor" />
            </motion.div>
          </a>
        </motion.div>

        {/* ── DROITE : titre + bloc citation + bio + stats ── */}
        <motion.div
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...cardSpring, delay: 0.2 }}
          className="flex-1 min-w-0 w-full md:w-1/2"
        >
          {/* Titre avec badge incliné */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...cardSpring, delay: 0.25 }}
            className="flex flex-wrap justify-start items-center gap-x-3 gap-y-4 mb-8 uppercase"
            style={{ fontFamily: 'var(--font-baloo)', fontWeight: 900, fontSize: 'clamp(22px, 3vw, 42px)', color: '#f5ecd4', lineHeight: 1.1 }}
          >
            <span>QUI</span>
            <span
              className="transform -rotate-2 inline-block"
              style={{ background: '#d4a017', color: '#1a2d4a', padding: '4px 18px', border: '3px solid #071229', boxShadow: '6px 6px 0 rgba(7,18,41,0.5)', fontFamily: 'var(--font-baloo)', fontWeight: 900 }}
            >
              SUIS-JE
            </span>
            <span>?</span>
          </motion.h2>

          {/* Bloc citation */}
          <motion.div
            initial={{ opacity: 0, rotate: 2, y: 16 }}
            whileInView={{ opacity: 1, rotate: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...cardSpring, delay: 0.3 }}
            whileHover={{ rotate: -1, y: -4, boxShadow: '6px 6px 0 rgba(212,160,23,0.6)', transition: { type: 'spring', stiffness: 250, damping: 28 } }}
            style={{ background: '#071229', border: '3px solid #d4a017', boxShadow: '4px 4px 0 rgba(212,160,23,0.4)', transform: 'rotate(1deg)' }}
            className="mb-8 p-6 rounded-2xl cursor-default"
          >
            <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 'clamp(14px, 1.3vw, 18px)', color: '#f5ecd4', lineHeight: 1.65 }}>
              Depuis toujours, je vois mes camarades galérer en maths à cause d&apos;un système scolaire qui explique mal.
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...cardSpring, delay: 0.38 }}
            className="mb-10"
            style={{ fontFamily: 'var(--font-baloo)', fontSize: 'clamp(14px, 1.2vw, 17px)', color: 'rgba(245,236,212,0.82)', lineHeight: 1.7, fontWeight: 500 }}
          >
            ➜ <strong>Sur YouTube</strong>, on est plus de 100 000.<br/>
            Mon super-pouvoir&nbsp;?<br/>
            Prendre les concepts les plus éclatés au sol, les rendre logiques, simples et même (parfois) fun.
          </motion.p>

          {/* Stats avec hover */}
          <div className="flex flex-col sm:flex-row gap-4">
            {[
              { value: '100k+', label: 'Abonnés' },
              { value: '20M+',  label: 'Vues' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...cardSpring, delay: 0.45 + i * 0.1 }}
              >
              <motion.div
                animate={{ y: 0 }}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 260, damping: 26 } }}
                transition={{ type: 'spring', stiffness: 220, damping: 30 }}
                className="flex-1 text-center"
                style={{
                  background: '#FDFBF7',
                  border: '3px solid #d4a017',
                  borderRadius: 16,
                  padding: 'clamp(16px, 2vw, 24px)',
                  boxShadow: '4px 4px 0 rgba(212,160,23,0.35)',
                  cursor: 'default',
                }}
              >
                <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 900, fontSize: 'clamp(28px, 3vw, 40px)', color: '#EC6426', lineHeight: 1 }}>
                  {s.value}
                </p>
                <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 'clamp(10px, 0.9vw, 13px)', color: 'rgba(26,45,74,0.6)', marginTop: 6, textTransform: 'uppercase', letterSpacing: '.1em' }}>
                  {s.label}
                </p>
              </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Chibi nerd-eureka — bas gauche, juste au-dessus de la bordure de fin, taille +50% vs CS MS w-72 → ~w-108 */}
      <motion.div
        className="hidden xl:flex absolute z-10 pointer-events-none flex-col items-center"
        style={{ left: '3rem', bottom: 0, width: '18rem', transform: 'rotate(6deg)', transformOrigin: 'bottom center' }}
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
      >
        <Image src="/nerd-eureka.png" alt="" width={500} height={500} className="w-full h-auto drop-shadow-2xl" />
      </motion.div>
    </section>
  );
}
