'use client';

import { Pi, Unlock } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { offerConfig } from '@/lib/offer';

// ─── CONSTANTES DA ─────────────────────────────────────────────────────────
const C = {
  orange:    '#EC6426',
  orangeHot: '#E04A10',
  orangeLt:  '#FF8040',
  outline:   '#1A1A1A',
  gold:      '#e8c96a',
  navy:      '#1a2d4a',
};

const TRUST_BADGES = [
  { label: 'Accès à vie' },
  { label: '+300h de travail' },
  { label: 'PDF + Vidéos' },
];

// ═══════════════════════════════════════════════════════════════════════════
// CTA GREC UNIFIÉ — composant principal de toute la landing
// ═══════════════════════════════════════════════════════════════════════════
interface GreekCTAProps {
  href?: string;
  label?: string;
  showBadges?: boolean;
  size?: 'sm' | 'md' | 'lg';
  goldBorder?: boolean; // true pour sections navy (border gold), false pour sections claires (border dark)
  className?: string;
}

export function GreekCTA({
  href,
  label = 'DÉBLOQUER LE GUIDE',
  showBadges = true,
  size = 'md',
  goldBorder = false,
  className = '',
}: GreekCTAProps) {
  const pad = size === 'sm'
    ? 'clamp(12px,1.2vw,15px) clamp(20px,4vw,56px)'
    : size === 'lg'
    ? 'clamp(14px,2.2vw,28px) clamp(20px,6vw,96px)'
    : 'clamp(14px,1.8vw,22px) clamp(20px,5vw,80px)';

  const fs = size === 'sm' ? 'clamp(12px,1.1vw,16px)' : size === 'lg' ? 'clamp(16px,2vw,26px)' : 'clamp(14px,1.6vw,20px)';
  const borderCol = goldBorder ? C.gold : C.outline;
  const shadowCol = goldBorder ? C.gold : C.outline;

  return (
    <div className={`flex flex-col items-center gap-3 w-full max-w-[min(100%,480px)] ${className}`}>
      <motion.a
        href={href ?? offerConfig.checkoutUrl}
        animate={{ boxShadow: `6px 6px 0 ${shadowCol}, 0 12px 32px rgba(236,100,38,0.35), inset 0 2px 0 rgba(255,255,255,0.2)` }}
        whileHover={{ y: 2, boxShadow: `4px 4px 0 ${shadowCol}, 0 6px 20px rgba(236,100,38,0.25), inset 0 2px 0 rgba(255,255,255,0.2)` }}
        whileTap={{ y: 4, boxShadow: `2px 2px 0 ${shadowCol}, 0 2px 8px rgba(236,100,38,0.15), inset 0 2px 0 rgba(255,255,255,0.2)` }}
        className="relative flex items-center justify-center gap-3 overflow-hidden font-black uppercase rounded-2xl text-white cursor-pointer w-full"
        style={{
          background: `linear-gradient(165deg, ${C.orangeLt} 0%, ${C.orange} 45%, ${C.orangeHot} 100%)`,
          border: `3px solid ${borderCol}`,
          padding: pad,
          fontSize: fs,
          fontFamily: 'var(--font-montserrat)',
          textAlign: 'center',
          letterSpacing: '.04em',
        }}
      >
        <span className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shine pointer-events-none" />
        {label}
        <Unlock className="shrink-0" style={{ width: size === 'lg' ? 22 : 18, height: size === 'lg' ? 22 : 18 }} strokeWidth={3} />
      </motion.a>

      {showBadges && (
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {TRUST_BADGES.map((b, i) => (
            <div key={i} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5"
              style={{ background: goldBorder ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.88)', border: `1.5px solid ${goldBorder ? 'rgba(232,201,106,0.25)' : 'rgba(26,26,26,0.12)'}`, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <span style={{ fontSize: 'clamp(11px, 0.85vw, 13px)', color: goldBorder ? 'rgba(232,201,106,0.8)' : 'rgba(20,40,60,0.75)', fontFamily: 'var(--font-inter)', fontWeight: 600 }}>{b.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Backward compat shim — remplace BrutalistButton ────────────────────────
export const BrutalistButton = ({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) => (
  <GreekCTA href={href} label="" showBadges={false} className={className} />
);

// ─── MARQUEE AVIS ─────────────────────────────────────────────────────────
export const ReviewMarquee = () => {
  const reviews = [
    "Incroyable, j'ai eu 18 au bac !",
    'Le meilleur guide de maths',
    "J'ai enfin compris les fonctions",
    'Merci ChadSciences !',
    "Je suis passé de 7 à 15 de moyenne",
    'Explications super claires',
  ];
  return (
    <div className="w-full py-3 overflow-hidden flex whitespace-nowrap z-20 relative"
      style={{ background: C.navy, borderTop: `2px solid rgba(212,168,83,0.4)`, borderBottom: `2px solid rgba(212,168,83,0.4)` }}>
      <div className="flex w-max gap-10 items-center animate-marquee" style={{ animationDuration: '80s' }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-10 items-center">
            {reviews.map((review, j) => (
              <div key={j} className="flex gap-10 items-center">
                <span style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: 14, color: 'rgba(245,236,212,0.8)' }}>{review}</span>
                <Pi className="w-4 h-4" style={{ color: C.gold }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const CloudCharacter = ({ src, alt, className = '' }: { src: string; alt: string; className?: string }) => (
  <motion.div className={`absolute flex-col items-center z-0 ${className}`}
    animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
    <Image src={src} alt={alt} width={500} height={500} className="w-full h-auto drop-shadow-2xl relative z-0"
      style={{ transformOrigin: 'bottom center' }} referrerPolicy="no-referrer" unoptimized />
  </motion.div>
);

export const mathPatternBg = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='1200' height='1200' viewBox='0 0 1200 1200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231A1A1A' font-family='serif' font-size='100' font-weight='bold' opacity='0.05'%3E%3Ctext x='150' y='200' transform='rotate(15 150 200)'%3E%E2%88%91%3C/text%3E%3Ctext x='800' y='150' transform='rotate(-20 800 150)'%3E%CF%80%3C/text%3E%3Ctext x='450' y='700' transform='rotate(45 450 700)'%3E%E2%88%AB%3C/text%3E%3Ctext x='1000' y='850' transform='rotate(-15 1000 850)'%3E%E2%88%9A%3C/text%3E%3Ctext x='50' y='900' transform='rotate(70 50 900)'%3E%CE%94%3C/text%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to right, rgba(26,26,26,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,26,0.05) 1px, transparent 1px)`,
  backgroundSize: '1200px 1200px, 40px 40px, 40px 40px',
};
