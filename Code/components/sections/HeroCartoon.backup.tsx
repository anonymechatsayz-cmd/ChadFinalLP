'use client';

import { useState, useEffect, useRef } from 'react';
import { Unlock, X, Play } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { offerConfig, getYouTubeThumbnailUrl } from '@/lib/offer';

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  outline: '#1A1A1A',
  stroke:  '#0a2040',
  orange:  '#EC6426',
  orangeLt:'#FF8040',
  white:   '#FFFFFF',
  text:    '#1A1A1A',
  muted:   '#555',
  green:   '#27AE60',
};

// ─── UTILS ────────────────────────────────────────────────────────────────────
const getEmbed = (url: string) => {
  const id = url.match(/[?&]v=([^&]+)/)?.[1];
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : '';
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const TESTI = [
  { name:'Nonen', text:'La méthode reste un succès, même pour les 3e. En maths, tout à réaliser !', label:'Savoir · 2023', labelColor:C.green, rot:-5 },
  { name:'Joshan', text:'Graduation réussie ! De 8 à 14 en maths en 2 mois, sans cours particuliers.', label:'Étudiant · 2023', labelColor:C.orange, rot:3 },
];

const SYMS = [
  { s:'+', dx:-200, dy:-55, sz:30, c:'#FF6B35', d:3.0 },
  { s:'%', dx: 195, dy:-60, sz:26, c:'#F5C842', d:3.4 },
  { s:'π', dx:-185, dy:  5, sz:28, c:'#4FC3F7', d:3.8 },
  { s:'Σ', dx: 185, dy: 10, sz:26, c:'#4FC3F7', d:2.8 },
  { s:'−', dx:-160, dy: 55, sz:24, c:'#FF6B35', d:4.2 },
  { s:'÷', dx: 165, dy: 50, sz:22, c:'#F5C842', d:3.6 },
];

// ════════════════════════════════════════════════════════════════════════════
// VSL MODAL
// ════════════════════════════════════════════════════════════════════════════
function VSLModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', h);
    btn.current?.focus();
    return () => { document.documentElement.style.overflow = ''; window.removeEventListener('keydown', h); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 px-4" role="dialog" aria-modal="true">
      <button type="button" className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden"
        style={{ border:`4px solid ${C.outline}`, boxShadow:`8px 8px 0 ${C.outline}` }}>
        <button ref={btn} type="button" onClick={onClose} aria-label="Fermer"
          className="absolute -right-2 -top-2 z-20 rounded-full p-1.5"
          style={{ background:C.orange, border:`3px solid ${C.outline}`, boxShadow:`3px 3px 0 ${C.outline}` }}>
          <X className="h-5 w-5 text-white" />
        </button>
        <div className="aspect-video w-full bg-black">
          <iframe className="h-full w-full" src={getEmbed(offerConfig.vslUrl)} title="VSL"
            allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowFullScreen />
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// HERO CARTOON
// ════════════════════════════════════════════════════════════════════════════
export function HeroCartoon() {
  const [vsl, setVsl] = useState(false);

  return (
    <section className="relative w-full overflow-hidden" style={{ height:'100svh', minHeight:700 }}>

      {/* BG */}
      <Image src="/background.png" alt="" fill className="object-cover object-center z-0" priority sizes="100vw" />

      {/* ── SUBTITLE ── top 2% */}
      <motion.p
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1, duration:0.5 }}
        className="absolute z-20 w-full text-center font-bold tracking-[.25em] uppercase"
        style={{
          top:'clamp(8px, 2%, 20px)',
          fontFamily:'var(--font-cinzel)',
          fontSize:'clamp(9px, 1.1vw, 15px)',
          color:'#1a3a5c',
        }}>
        LE GUIDE ULTIME DU LYCÉE
      </motion.p>

      {/* ── TITRE ── top 5-15% */}
      <motion.h1
        initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:0.15, duration:0.65, type:'spring', stiffness:80 }}
        className="absolute z-20 w-full text-center font-black uppercase leading-none"
        style={{
          top:'clamp(28px, 5%, 60px)',
          fontFamily:'var(--font-cinzel)',
          fontSize:'clamp(26px, 5.5vw, 75px)',
          color:C.white,
          WebkitTextStroke:`clamp(1.5px, 0.3vw, 3px) ${C.stroke}`,
          paintOrder:'stroke fill',
          textShadow:`
            0 0 40px rgba(79,195,247,0.25),
            0 2px 0 ${C.stroke},
            0 4px 0 #061830,
            0 6px 0 #040e20,
            0 8px 16px rgba(0,0,0,0.3)
          `,
          letterSpacing:'-.015em',
        }}>
        PASSE DE 8 À 15/20 EN MATHS
      </motion.h1>

      {/* ── TESTIMONIALS — groupés à gauche, empilés ── */}
      <motion.div
        initial={{ opacity:0, x:-60 }} animate={{ opacity:1, x:0 }}
        transition={{ delay:0.6, duration:0.6, type:'spring', stiffness:90 }}
        className="absolute z-30 hidden lg:flex flex-col gap-3"
        style={{ left:'clamp(14px, 2.5vw, 36px)', top:'clamp(180px, 26%, 260px)' }}>
        {TESTI.map((t, i) => (
          <div key={i} className="rounded-xl p-3" style={{
            width:'clamp(170px, 14vw, 210px)',
            transform:`rotate(${t.rot}deg)`,
            background:'rgba(255,255,255,0.95)',
            border:`2.5px solid ${C.outline}`,
            boxShadow:`4px 4px 0 rgba(0,0,0,0.3), 0 6px 16px rgba(0,0,0,0.08)`,
          }}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black"
                style={{ background:'#E0E0E0', border:`2px solid ${C.outline}` }}>{t.name[0]}</div>
              <span className="font-bold" style={{ fontSize:'clamp(10px,0.85vw,12px)', color:C.text }}>{t.name}</span>
            </div>
            <p className="leading-snug mb-1.5" style={{ fontSize:'clamp(8px,0.68vw,10px)', color:C.muted }}>{t.text}</p>
            <span className="font-bold" style={{ fontSize:'clamp(8px,0.68vw,10px)', color:t.labelColor }}>{t.label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── DEVICE CENTRAL — 16:9 landscape ── */}
      <motion.div
        initial={{ opacity:0, y:25, scale:0.9 }}
        animate={{ opacity:1, y:0, scale:1 }}
        transition={{ delay:0.3, duration:0.6, type:'spring' }}
        className="absolute z-20 left-1/2 -translate-x-1/2"
        style={{ top:'clamp(270px, 36%, 340px)' }}>

        {/* Conteneur device + symboles — 16:9 strict */}
        <div className="relative flex items-center justify-center"
          style={{ width:'clamp(360px, 38vw, 540px)', height:'clamp(203px, 21.4vw, 304px)' }}>

          {/* Glow */}
          <div className="absolute inset-0 z-0 pointer-events-none"
            style={{ background:'radial-gradient(ellipse,rgba(79,195,247,0.2) 0%,transparent 65%)', transform:'scale(2.5)' }} />

          {/* Symboles */}
          {SYMS.map((m, i) => (
            <motion.span key={i}
              className="absolute select-none pointer-events-none font-black z-[15]"
              style={{
                left:'50%', top:'50%',
                marginLeft:m.dx, marginTop:m.dy,
                fontSize:m.sz, color:m.c,
                WebkitTextStroke:`1.5px ${C.outline}`, paintOrder:'stroke fill',
              }}
              animate={{ y:[0,-8,0], rotate:[0,i%2===0?8:-8,0] }}
              transition={{ repeat:Infinity, duration:m.d, ease:'easeInOut', delay:i*0.2 }}>
              {m.s}
            </motion.span>
          ))}

          {/* Tablette */}
          <button type="button" onClick={()=>setVsl(true)} aria-label="Lire la vidéo"
            className="relative w-full h-full rounded-xl overflow-hidden group cursor-pointer z-10"
            style={{
              border:`4px solid ${C.outline}`,
              boxShadow:`6px 8px 0 rgba(0,0,0,0.35), 0 20px 50px rgba(0,0,0,0.2)`,
              background:'#111',
              transform:'perspective(800px) rotateY(-3deg) rotateX(2deg)',
            }}>
            <Image src={getYouTubeThumbnailUrl(offerConfig.vslYoutubeId)} alt="Présentation" fill
              className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-300" sizes="280px" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div whileHover={{ scale:1.15 }}
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background:`linear-gradient(135deg,${C.orange},${C.orangeLt})`,
                  border:`3px solid ${C.outline}`,
                  boxShadow:`3px 3px 0 ${C.outline}, 0 4px 16px rgba(236,100,38,0.4)`,
                }}>
                <Play className="w-6 h-6 text-white fill-white ml-0.5" />
              </motion.div>
            </div>
          </button>
        </div>
      </motion.div>

      {/* ── PRICING — centré à 68% ── */}
      <motion.div
        initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
        transition={{ delay:0.55, duration:0.4, type:'spring' }}
        className="absolute z-20 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-xl px-5 py-2"
        style={{
          top:'clamp(510px, 72%, 660px)',
          background:'rgba(255,255,255,0.92)',
          border:`3px solid ${C.outline}`,
          boxShadow:`4px 4px 0 rgba(0,0,0,0.3)`,
        }}>
        <span className="font-black" style={{ fontSize:'clamp(20px,2vw,28px)', color:C.text }}>{offerConfig.launchPrice}€</span>
        <span className="line-through" style={{ fontSize:'clamp(11px,1vw,14px)', color:'rgba(0,0,0,0.35)' }}>{offerConfig.regularPrice}€</span>
        <motion.span initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.9, type:'spring', stiffness:350 }}
          className="font-bold text-white rounded-md"
          style={{ fontSize:'clamp(10px,0.8vw,12px)', padding:'2px 8px', background:C.orange, border:`2px solid ${C.outline}` }}>
          −{offerConfig.regularPrice - offerConfig.launchPrice}€
        </motion.span>
      </motion.div>

      {/* ── FEATURES — 70% ── */}
      <motion.p
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
        className="absolute z-20 left-1/2 -translate-x-1/2 text-center font-medium w-full"
        style={{ top:'clamp(560px, 79%, 720px)', fontSize:'clamp(11px,1vw,14px)', color:'rgba(20,40,60,0.8)', lineHeight:1.5 }}>
        Accès à vie · {offerConfig.guaranteeDays}j remboursé · PDF + Vidéos<br />
        Déjà + de 20 000 élèves
      </motion.p>

      {/* ── CTA — 78% du viewport ── */}
      <motion.a
        href={offerConfig.checkoutUrl}
        initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7, duration:0.5 }}
        whileHover={{ y:2, boxShadow:`4px 4px 0 ${C.outline}` }}
        whileTap={{ y:4, boxShadow:`2px 2px 0 ${C.outline}` }}
        className="absolute z-20 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2.5 overflow-hidden font-black uppercase rounded-xl text-white cursor-pointer"
        style={{
          top:'clamp(620px, 86%, 780px)',
          background:`linear-gradient(135deg,${C.orange},${C.orangeLt})`,
          border:`3.5px solid ${C.outline}`,
          boxShadow:`6px 6px 0 ${C.outline}, 0 8px 24px rgba(236,100,38,0.3)`,
          padding:'clamp(15px,1.8vw,22px) clamp(48px,6vw,90px)',
          fontSize:'clamp(15px,1.8vw,23px)',
          fontFamily:'var(--font-space)',
          whiteSpace:'nowrap',
          letterSpacing:'.02em',
        }}>
        <span className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] animate-shine pointer-events-none" />
        DÉBLOQUER LE GUIDE
        <Unlock className="shrink-0" style={{ width:'clamp(16px,1.3vw,20px)', height:'clamp(16px,1.3vw,20px)' }} strokeWidth={3} />
      </motion.a>

      {/* ── ZEUS — grand, remonté ── */}
      <motion.div
        initial={{ opacity:0, x:80 }} animate={{ opacity:1, x:0 }}
        transition={{ delay:0.4, duration:0.85, type:'spring', stiffness:60 }}
        className="absolute z-30 hidden md:block"
        style={{
          right:'-2vw',
          bottom:0,
          width:'clamp(300px, 38vw, 550px)',
          height:'clamp(500px, 95vh, 850px)',
        }}>
        <Image src="/zeuf.png" alt="Zeus chibi" fill className="object-contain object-bottom"
          style={{ filter:'drop-shadow(4px 6px 0px rgba(26,26,26,0.2)) drop-shadow(0 12px 30px rgba(0,0,0,0.15))' }}
          sizes="440px" priority />
      </motion.div>

      {/* Transition bas */}
      <div className="absolute bottom-0 left-0 right-0 z-[25] h-[6%] pointer-events-none"
        style={{ background:'linear-gradient(to top,#FDFBF7,transparent)' }} />

      <VSLModal open={vsl} onClose={()=>setVsl(false)} />
    </section>
  );
}
