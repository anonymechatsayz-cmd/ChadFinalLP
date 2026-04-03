'use client';

import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { CloudCharacter } from '@/components/ui';

const testimonials = [
  {
    name: 'Lucas M.',
    role: 'Terminale Générale, Lyon',
    initial: 'L',
    bg: '#EC6426',
    note: 'De 7 à 13 au bac blanc',
    text: "J'étais à 7/20 en début d'année. Avec Maths Ultime j'ai eu 13 au bac blanc. La méthode visuelle c'est vraiment différent des cours normaux.",
  },
  {
    name: 'Sophie L.',
    role: 'Terminale Spé Maths, Paris',
    initial: 'S',
    bg: '#1a2d4a',
    note: 'Enfin les dérivées comprises',
    text: "Je comprenais rien aux dérivées depuis la 1ère. Le module 3 m'a tout expliqué en 2h. J'aurais voulu avoir ça avant.",
  },
  {
    name: 'Emma R.',
    role: 'Première, Bordeaux',
    initial: 'E',
    bg: '#EC6426',
    note: 'Le meilleur investissement',
    text: "Mes parents ont arrêté de payer les cours particuliers. 47€ une fois vs 80€ par semaine... le choix était facile. Et mes notes sont meilleures.",
  },
];

export function Testimonials() {
  return (
    <section className="relative bg-[#FDFBF7] px-4 py-20 text-center md:px-8" style={{ borderTop: '4px solid #1a2d4a' }}>
      <CloudCharacter
        src="/akward.png"
        alt="Personnage ChadScience"
        className="absolute top-10 left-4 z-0 hidden w-64 xl:left-12 xl:flex xl:w-80"
      />
      <div className="relative z-10 mx-auto max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2
            className="text-center uppercase"
            style={{ fontFamily: 'var(--font-cinzel)', color: '#1a2d4a', fontWeight: 900, fontSize: 'clamp(28px, 5vw, 64px)', lineHeight: 1.05, marginBottom: 14 }}
          >
            Ils ont hacké le système
          </h2>
          <p style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(14px, 1.2vw, 17px)', color: 'rgba(26,45,74,0.6)', fontWeight: 500 }}>
            Des élèves qui avaient exactement tes doutes — et qui ont changé leurs notes.
          </p>
        </motion.div>

        <div className="-mx-4 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto px-4 pb-8 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:px-0 [&::-webkit-scrollbar]:hidden">
          {testimonials.map((testi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex min-w-[85vw] snap-center flex-col bg-white text-left h-full transition-transform hover:-translate-y-1 md:min-w-0"
              style={{
                border: '1px solid rgba(26,45,74,0.1)',
                boxShadow: '0 2px 16px rgba(26,45,74,0.08)',
                borderRadius: 16,
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 p-5 pb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" style={{ color: '#d4a017' }} />
                ))}
              </div>

              {/* Quote */}
              <div className="flex-grow px-5">
                <p className="italic leading-relaxed mb-4" style={{ color: 'rgba(26,45,74,0.75)', fontFamily: 'var(--font-space)', fontSize: 'clamp(13px,1vw,15px)', fontWeight: 500 }}>
                  &laquo;&nbsp;{testi.text}&nbsp;&raquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 p-5 pt-3" style={{ borderTop: '1px solid rgba(26,45,74,0.07)' }}>
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                  style={{ background: testi.bg }}
                >
                  {testi.initial}
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: 13, color: '#1a2d4a', fontVariant: 'small-caps', lineHeight: 1.2 }}>{testi.name}</p>
                  <p style={{ fontFamily: 'var(--font-space)', fontSize: 11, color: 'rgba(26,45,74,0.45)', fontWeight: 500, marginTop: 1 }}>{testi.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-xs mt-2" style={{ color: 'rgba(26,45,74,0.3)', fontFamily: 'var(--font-space)', fontWeight: 500 }}>
          Exemples de retours — témoignages non contractuels
        </p>
      </div>
    </section>
  );
}
