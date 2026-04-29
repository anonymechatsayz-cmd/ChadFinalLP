'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { offerConfig } from '@/lib/offer';
import { GreekCTA } from '@/components/ui';

const NAVY_SYMS = [
  { s:'Ω', top:8,  left:5,  sz:52, op:0.07, rot:-15 },
  { s:'Σ', top:68, left:8,  sz:40, op:0.06, rot:12  },
  { s:'π', top:18, left:88, sz:46, op:0.07, rot:-8  },
  { s:'∞', top:72, left:85, sz:36, op:0.06, rot:20  },
  { s:'Δ', top:14, left:50, sz:28, op:0.04, rot:35  },
  { s:'φ', top:80, left:45, sz:30, op:0.05, rot:-10 },
];

function NavyCountdown() {
  const [timeLeft, setTimeLeft] = useState({ h: 47, m: 59, s: 59 });
  useEffect(() => {
    const target = (offerConfig as any).countdownTarget
      ? new Date((offerConfig as any).countdownTarget).getTime()
      : Date.now() + 48 * 60 * 60 * 1000;
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({ h: Math.floor(diff / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  const segs = [{ val: pad(timeLeft.h), unit: 'h' }, { val: pad(timeLeft.m), unit: 'min' }, { val: pad(timeLeft.s), unit: 'sec' }];

  return (
    <div className="flex flex-col items-center gap-2">
      <p style={{ fontFamily:'var(--font-baloo)', fontWeight:600, fontSize:10, letterSpacing:'.2em', color:'rgba(245,236,212,0.5)', textTransform:'uppercase' }}>
        L&apos;offre expire dans
      </p>
      <div className="flex items-center gap-2">
        {segs.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            {i > 0 && <span style={{ color:'#EC6426', fontSize:20, fontFamily:'var(--font-baloo)', opacity:0.6 }}>·</span>}
            <div className="flex flex-col items-center gap-0.5">
              <div style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(245,236,212,0.2)', borderRadius:8, padding:'7px 13px', minWidth:52 }}>
                <span style={{ fontFamily:'var(--font-baloo)', fontWeight:900, fontSize:28, color:'#ffffff', display:'block', textAlign:'center', letterSpacing:'.04em', textShadow:'0 0 20px rgba(255,255,255,0.2)' }}>{seg.val}</span>
              </div>
              <span style={{ fontFamily:'var(--font-baloo)', fontSize:9, color:'rgba(245,236,212,0.4)', letterSpacing:'.1em', textTransform:'uppercase' }}>{seg.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CTANavy() {
  return (
    <section className="relative overflow-hidden" style={{ background:'linear-gradient(180deg, #071229 0%, #0a1628 50%, #071229 100%)' }}>
      {/* Ligne dorée haut */}
      <div style={{ height:3, background:'linear-gradient(90deg, transparent, #e8c96a 30%, #EC6426 50%, #e8c96a 70%, transparent)' }} />

      {/* Symboles grecs */}
      {NAVY_SYMS.map((m, i) => (
        <span key={i} className="absolute select-none pointer-events-none"
          style={{ top:`${m.top}%`, left:`${m.left}%`, fontSize:m.sz, opacity:m.op, color:'#f5ecd4', transform:`rotate(${m.rot}deg)`, fontFamily:'var(--font-baloo)', fontWeight:700 }}>
          {m.s}
        </span>
      ))}

      {/* Frise méandre décorative */}
      <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none opacity-20">
        <svg width="400" height="12" viewBox="0 0 400 12" fill="none">
          <polyline points="0,9 6,9 6,3 14,3 14,9 22,9 22,6 30,6 30,9 38,9 38,3 46,3 46,9 54,9 54,6 62,6 62,9 70,9 70,3 78,3 78,9 86,9 86,6 94,6 94,9 102,9 102,3 110,3 110,9 118,9 118,6 126,6 126,9 134,9 134,3 142,3 142,9 150,9 150,6 158,6 158,9 166,9 166,3 174,3 174,9 182,9 182,6 190,6 190,9 200,9"
            stroke="#EC6426" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center gap-8">

        {/* Badge urgence */}
        <motion.div initial={{ opacity:0, y:-10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}
          whileHover={{ scale: 1.06, background: 'rgba(236,100,38,0.18)', boxShadow: '0 0 20px rgba(236,100,38,0.3)', transition: { type: 'spring', stiffness: 280, damping: 30 } }}
          whileTap={{ scale: 1.06, background: 'rgba(236,100,38,0.18)', boxShadow: '0 0 20px rgba(236,100,38,0.3)', transition: { type: 'spring', stiffness: 280, damping: 30 } }}
          className="flex items-center gap-2 rounded-full px-5 py-2 cursor-default"
          style={{ background:'rgba(236,100,38,0.08)', border:'1.5px solid rgba(236,100,38,0.3)' }}>
          <span style={{ fontFamily:'var(--font-baloo)', fontWeight:700, fontSize:10, color:'#EC6426', letterSpacing:'.2em', textTransform:'uppercase' }}>
            ✦ Offre de lancement ✦
          </span>
        </motion.div>

        {/* Titre */}
        <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.1 }}
          className="whitespace-nowrap"
          style={{ fontFamily:'var(--font-baloo)', fontWeight:900, fontSize:'clamp(20px, 4vw, 58px)', color:'#f5ecd4', letterSpacing:'.06em', lineHeight:1.1, textTransform:'uppercase', textShadow:'0 4px 30px rgba(0,0,0,0.3)' }}>
          PRÊT À TOUT DONNER <span style={{ color:'#EC6426' }}>EN MATHS&nbsp;?</span>
        </motion.h2>

        {/* Sous-titre */}
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.2 }}
          style={{ fontFamily:'var(--font-baloo)', fontWeight:500, fontSize:'clamp(14px, 1.4vw, 18px)', color:'rgba(245,236,212,0.6)', maxWidth:520, lineHeight:1.6 }}>
          La méthode visuelle ChadSciences — comprends avant d&apos;apprendre. Accès à vie, dès maintenant.
        </motion.p>

        {/* Countdown */}
        <motion.div initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.25 }}>
          <NavyCountdown />
        </motion.div>

        {/* Prix */}
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.3 }}
          whileHover={{ scale: 1.06, transition: { type: 'spring', stiffness: 260, damping: 30 } }}
          whileTap={{ scale: 1.06, transition: { type: 'spring', stiffness: 260, damping: 30 } }}
          className="flex items-center gap-3 cursor-default">
          <span style={{ fontFamily:'var(--font-baloo)', fontWeight:900, fontSize:'clamp(42px, 5.5vw, 68px)', color:'#ffffff', textShadow:'0 0 40px rgba(255,255,255,0.2)', lineHeight:1 }}>
            {offerConfig.launchPrice}€
          </span>
          <div className="flex flex-col items-start gap-0.5">
            <span style={{ fontFamily:'var(--font-baloo)', fontSize:16, color:'rgba(245,236,212,0.35)', textDecoration:'line-through' }}>{offerConfig.regularPrice}€</span>
            <span style={{ fontFamily:'var(--font-baloo)', fontWeight:800, fontSize:11, color:'#EC6426', letterSpacing:'.08em' }}>Prix de lancement</span>
          </div>
        </motion.div>

        {/* CTA unifié gold border */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.35 }}>
          <GreekCTA size="lg" goldBorder={false} showBadges={true} />
        </motion.div>

      </div>

      {/* Ligne dorée bas */}
      <div style={{ height:3, background:'linear-gradient(90deg, transparent, #e8c96a 30%, #EC6426 50%, #e8c96a 70%, transparent)' }} />
    </section>
  );
}
