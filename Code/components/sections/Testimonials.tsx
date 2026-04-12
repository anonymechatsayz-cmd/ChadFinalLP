import { Star } from 'lucide-react';
import { CloudCharacter } from '@/components/ui';
import { offerConfig } from '@/lib/offer';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Lucas',
      role: 'Terminale spé maths',
      initial: 'L',
      bg: '#EC6426',
      note: 'Passé de 8 à 15',
      text: "Je bloquais à 8 de moyenne depuis la seconde. J'ai eu 15 au dernier bac blanc. La méthode visuelle de Chad m'a aidé à arrêter les erreurs bêtes.",
    },
    {
      name: 'Sophie',
      role: 'Maman de Thomas (1ère)',
      initial: 'S',
      bg: '#1a2d4a',
      note: 'Autonomie retrouvée',
      text: 'Mon fils a repris confiance et travaille plus en autonomie le week-end. Le format vidéo rejouable aide beaucoup.',
    },
    {
      name: 'Emma',
      role: '1ère spé maths',
      initial: 'E',
      bg: '#EC6426',
      note: 'Moins de stress',
      text: "J'ai arrêté d'apprendre des formules par cœur sans les comprendre. Je gagne du temps sur chaque DS.",
    },
  ];

  return (
    <section className="relative bg-[#FDFBF7] px-4 py-24 text-center md:px-8" style={{ borderTop: '4px solid #1a2d4a' }}>
      <CloudCharacter
        src="/akward.png"
        alt="Personnage ChadScience"
        className="absolute top-10 left-4 z-0 hidden w-64 xl:left-12 xl:flex xl:w-80"
      />
      <div className="relative z-10 mx-auto max-w-6xl">

        <h2
          className="mb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-6 text-center text-5xl font-black tracking-tight uppercase md:text-7xl"
          style={{ fontFamily: 'var(--font-cinzel)', color: '#1a2d4a' }}
        >
          <span>Ils ont</span>
          <span
            className="rotate-[-2deg] text-white px-6 py-2"
            style={{ background: '#EC6426', border: '4px solid #1a2d4a', boxShadow: '6px 6px 0 #1a2d4a' }}
          >
            HACKÉ
          </span>
          <span>le système</span>
        </h2>

        <div className="mb-16 flex justify-center">
          <div
            className="inline-flex items-center gap-3 bg-white px-4 py-2 md:px-6 md:py-3"
            style={{ border: '4px solid #1a2d4a', boxShadow: '4px 4px 0 #1a2d4a', borderRadius: 12 }}
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current md:h-6 md:w-6" style={{ color: '#d4a017' }} />
              ))}
            </div>
            <span className="text-left text-base font-black uppercase md:text-lg" style={{ color: '#1a2d4a', fontFamily: 'var(--font-montserrat)' }}>
              {offerConfig.ratingDisplay} — {offerConfig.trustSocialProofLine}
            </span>
          </div>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto px-4 pb-8 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:px-0 [&::-webkit-scrollbar]:hidden">
          {testimonials.map((testi, i) => (
            <div
              key={i}
              className="flex min-w-[85vw] snap-center flex-col bg-white text-left h-full transition-transform hover:-translate-y-1 md:min-w-0"
              style={{ border: '4px solid #1a2d4a', boxShadow: '6px 6px 0 #1a2d4a', borderRadius: 16 }}
            >
              <div
                className="flex items-center gap-4 p-6"
                style={{ background: '#f5f0e8', borderBottom: '4px solid #1a2d4a', borderRadius: '12px 12px 0 0' }}
              >
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-black text-white"
                  style={{ background: testi.bg, border: '4px solid #1a2d4a' }}
                >
                  {testi.initial}
                </div>
                <div>
                  <p className="text-lg font-black leading-none" style={{ fontFamily: 'var(--font-cinzel)', color: '#1a2d4a' }}>{testi.name}</p>
                  <p className="mt-1 text-base font-bold" style={{ color: 'rgba(26,45,74,0.55)', fontFamily: 'var(--font-space)' }}>{testi.role}</p>
                </div>
              </div>

              <div className="flex flex-grow flex-col p-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-current" style={{ color: '#d4a017' }} />
                  ))}
                </div>
                <p className="mb-3 text-xl font-black uppercase" style={{ color: '#1a2d4a', fontFamily: 'var(--font-cinzel)' }}>&quot;{testi.note}&quot;</p>
                <p className="flex-grow text-lg font-bold leading-relaxed" style={{ color: 'rgba(26,45,74,0.7)', fontFamily: 'var(--font-space)' }}>{testi.text}</p>

                <div className="mt-6 pt-4" style={{ borderTop: '2px dashed rgba(26,45,74,0.2)' }}>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(26,45,74,0.4)', fontFamily: 'var(--font-space)' }}>
                    Exemples de retours — témoignages non contractuels
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
