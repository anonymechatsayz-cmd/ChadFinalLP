'use client';

import { useState, useEffect, useRef } from 'react';
import { Unlock, X, Play, Check, Shield, Video } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { offerConfig, getYouTubeThumbnailUrl } from '@/lib/offer';

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  outline: '#1A1A1A',
  stroke:  '#0a2040',
  orange:  '#EC6426',
  orangeHot:'#E04A10',
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
  { name:'Lucas', text:"J'ai eu 15 au dernier bac blanc. La méthode visuelle m'a aidé à arrêter les erreurs bêtes.", label:'Terminale · Passé de 8 à 15', labelColor:C.green, rot:-4 },
  { name:'Emma', text:"J'ai arrêté d'apprendre des formules par cœur. Je gagne du temps sur chaque DS.", label:'1ère spé maths · Moins de stress', labelColor:C.orange, rot:3 },
];

const SYMS = [
  { s:'+', dx:-220, dy:-55, sz:30, c:'#FF6B35', d:3.0 },
  { s:'%', dx: 215, dy:-60, sz:26, c:'#F5C842', d:3.4 },
  { s:'π', dx:-200, dy:  5, sz:28, c:'#4FC3F7', d:3.8 },
  { s:'Σ', dx: 200, dy: 10, sz:26, c:'#4FC3F7', d:2.8 },
];

// Symboles ciel étoilé — angles uniques, palette dorée/bleutée, dispersion large
// rot = rotation deg, c = couleur, sc = scale min/max pour scintillement
// Deux familles : or chaud (#e8c96a) + blanc ivoire (#f5ecd4) — halo doré sur ciel cartoon
const SKY_SYMS = [
  { s:'∫',  top: 5,  left:  4, sz:22, op:0.60, d:7.2, dy: 9, rot: -22, c:'#e8c96a' },
  { s:'√',  top:14,  left: 11, sz:17, op:0.55, d:9.1, dy: 6, rot:  15, c:'#f5ecd4' },
  { s:'∞',  top: 3,  left: 26, sz:18, op:0.58, d:8.6, dy:10, rot:   8, c:'#e8c96a' },
  { s:'φ',  top:10,  left: 38, sz:15, op:0.52, d:7.9, dy: 5, rot: -34, c:'#f5ecd4' },
  { s:'≈',  top: 2,  left: 52, sz:16, op:0.50, d:9.4, dy: 7, rot:  27, c:'#e8c96a' },
  { s:'∂',  top:17,  left: 44, sz:19, op:0.56, d:6.8, dy: 8, rot: -12, c:'#f5ecd4' },
  { s:'Δ',  top: 7,  left: 61, sz:17, op:0.54, d:8.2, dy: 9, rot:  41, c:'#e8c96a' },
  { s:'θ',  top:13,  left: 70, sz:21, op:0.58, d:7.5, dy:11, rot: -18, c:'#f5ecd4' },
  { s:'λ',  top: 4,  left: 79, sz:16, op:0.52, d:9.7, dy: 6, rot:  29, c:'#e8c96a' },
  { s:'ψ',  top:18,  left: 87, sz:18, op:0.55, d:6.4, dy: 8, rot: -45, c:'#f5ecd4' },
  { s:'∇',  top: 8,  left: 93, sz:16, op:0.53, d:8.9, dy: 7, rot:  16, c:'#e8c96a' },
  { s:'α',  top:16,  left: 22, sz:15, op:0.51, d:7.1, dy: 5, rot: -28, c:'#f5ecd4' },
  { s:'ω',  top: 6,  left: 96, sz:19, op:0.55, d:9.3, dy:10, rot:  33, c:'#e8c96a' },
  { s:'γ',  top:12,  left: 57, sz:16, op:0.52, d:8.0, dy: 6, rot: -52, c:'#f5ecd4' },
  { s:'ε',  top: 1,  left: 86, sz:15, op:0.50, d:7.6, dy: 5, rot:  20, c:'#e8c96a' },
  { s:'σ',  top:19,  left:  2, sz:17, op:0.54, d:9.8, dy: 7, rot: -37, c:'#f5ecd4' },
  { s:'μ',  top: 9,  left: 17, sz:15, op:0.52, d:8.5, dy: 6, rot:  44, c:'#e8c96a' },
  { s:'Ω',  top:15,  left: 33, sz:17, op:0.54, d:7.3, dy: 8, rot: -14, c:'#f5ecd4' },
];

const FEATURES = [
  { icon: Check,  label: 'Accès à vie' },
  { icon: Shield, label: '+300h de travail' },
  { icon: Video,  label: 'PDF + Vidéos' },
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

      {/* ── SYMBOLES CIEL — discrets, esthétiques ── */}
      {SKY_SYMS.map((m, i) => (
        <motion.span key={i}
          className="absolute select-none pointer-events-none font-black z-[2]"
          style={{
            top:`${m.top}%`,
            left:`${m.left}%`,
            fontSize:m.sz,
            color:m.c,
            textShadow:`0 0 12px rgba(232,201,106,0.7), 0 0 24px rgba(232,201,106,0.3)`,
          }}
          initial={{ opacity: m.op * 0.7, rotate:m.rot, scale:1 }}
          animate={{
            y:[0, -m.dy, 0],
            opacity:[m.op * 0.7, m.op, m.op * 0.7],
            scale:[0.92, 1.08, 0.92],
            rotate:m.rot,
          }}
          transition={{ repeat:Infinity, duration:m.d, ease:'easeInOut', delay:i * 0.28 }}
        >
          {m.s}
        </motion.span>
      ))}

      {/* ── SUBTITLE ── */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1, duration:0.5 }}
        className="absolute z-20 w-full flex items-center justify-center gap-2"
        style={{ top:'clamp(8px, 2%, 20px)' }}>
        <Image src="/chadlogo.jpeg" alt="ChadSciences" width={32} height={32}
          className="rounded-full object-cover" style={{ border:'1.5px solid rgba(26,58,92,0.3)' }} />
        <span className="font-semibold tracking-[.25em] uppercase"
          style={{ fontFamily:'var(--font-space)', fontSize:'clamp(12px, 1.5vw, 20px)', color:'#1a3a5c' }}>
          MATHS ULTIME
        </span>
      </motion.div>

      {/* ── TITRE — Montserrat Extra-Bold ── */}
      <motion.h1
        initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:0.15, duration:0.65, type:'spring', stiffness:80 }}
        className="absolute z-20 w-full text-center uppercase leading-[0.95]"
        style={{
          top:'clamp(70px, 3.5%, 45px)',
          fontFamily:'var(--font-montserrat)',
          fontWeight:900,
          fontSize:'clamp(30px, 5.8vw, 78px)',
          color:'#FFF8E8',
          letterSpacing:'.02em',
          lineHeight:0.9,
          WebkitTextStroke:`clamp(2px, 0.35vw, 4px) ${C.stroke}`,
          paintOrder:'stroke fill',
          textShadow:`
            0 0 60px rgba(232,184,72,0.3),
            0 0 30px rgba(79,195,247,0.15),
            0 3px 0 #0a2040,
            0 6px 0 #081830,
            0 9px 0 #061025,
            0 12px 0 #040a1a,
            0 16px 35px rgba(0,0,0,0.5)
          `,
        }}>
        PASSE DE 8 À 15/20<br className="sm:hidden" /> EN MATHS
      </motion.h1>

      {/* ── TESTIMONIALS — repositionnés : plus à droite, plus bas ── */}
      <motion.div
        initial={{ opacity:0, x:-50 }} animate={{ opacity:1, x:0 }}
        transition={{ delay:0.6, duration:0.6, type:'spring', stiffness:90 }}
        className="absolute z-30 hidden lg:flex flex-col gap-3"
        style={{ left:'clamp(20px, 8vw, 68px)', top:'clamp(300px, 30%, 290px)' }}>
        {TESTI.map((t, i) => (
          <div key={i} className="rounded-xl p-3" style={{
            width:'clamp(195px, 16vw, 240px)',
            transform:`rotate(${t.rot}deg)`,
            background:'rgba(255,255,255,0.97)',
            border:`2.5px solid ${C.outline}`,
            boxShadow:`4px 4px 0 rgba(0,0,0,0.25), 0 8px 20px rgba(0,0,0,0.1)`,
          }}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-black"
                style={{ background:'#E8E8E8', border:`2px solid ${C.outline}` }}>{t.name[0]}</div>
              <span className="font-bold" style={{ fontSize:'clamp(11px,0.9vw,13px)', color:C.text }}>{t.name}</span>
            </div>
            <p className="leading-snug mb-1.5" style={{ fontSize:'clamp(11px,0.78vw,13px)', color:C.muted }}>{t.text}</p>
            <span className="font-bold" style={{ fontSize:'clamp(11px,0.78vw,13px)', color:t.labelColor }}>{t.label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── VSL — z-5, derrière le temple ── */}
      <motion.div
        initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:0.25, duration:0.65, type:'spring' }}
        className="absolute z-[5] left-1/2 -translate-x-1/2"
        style={{ top:'clamp(250px, 30%, 220px)', width:'clamp(300px, 58vw, 630px)' }}>
        {/* ── Clip box : rogne la VSL pour qu'elle reste dans l'ouverture du temple.
             Ajuste uniquement "height" ici pour plus ou moins rogner ── */}
        <div style={{ width:'100%', height:'clamp(130px, 20vw, 280px)', overflow:'hidden', position:'relative' }}>
        <div className="relative w-full flex items-center justify-center" style={{ aspectRatio:'16/9' }}>
          <div className="absolute inset-0 z-0 pointer-events-none"
            style={{ background:'radial-gradient(ellipse,rgba(79,195,247,0.15) 0%,transparent 65%)', transform:'scale(2)' }} />
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
          <button type="button" onClick={()=>setVsl(true)} aria-label="Lire la vidéo"
            className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer z-10"
            style={{
              border:`4px solid ${C.outline}`,
              boxShadow:`6px 6px 0 ${C.outline}, 0 16px 40px rgba(0,0,0,0.2)`,
              background:'#1a1a2e',
            }}>
            <Image src={getYouTubeThumbnailUrl(offerConfig.vslYoutubeId)} alt="Présentation" fill
              className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-300" sizes="520px" />
            <div className="absolute inset-0" style={{ background:'linear-gradient(to top, rgba(10,32,64,0.55) 0%, transparent 60%)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div whileHover={{ scale:1.12 }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background:`linear-gradient(135deg,${C.orange},${C.orangeLt})`,
                  border:`3px solid ${C.outline}`,
                  boxShadow:`3px 3px 0 ${C.outline}, 0 6px 20px rgba(236,100,38,0.5)`,
                }}>
                <Play className="w-7 h-7 text-white fill-white ml-0.5" />
              </motion.div>
            </div>
          </button>
        </div>
        </div>{/* fin clip box */}
      </motion.div>

      {/* ── TEMPLE overlay — 21px plus large que background (1365 vs 1344), même hauteur 768 →
           l'offset vertical entre les deux temples est compensé par translateY(-169px) calculé par analyse pixel ── */}
      <div className="absolute inset-0 z-[12] pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0" style={{ transform:'translateY(-93px)' }}>
          <Image src="/temple.png" alt="" fill className="object-cover object-center" priority />
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          COLONNE CENTRALE — spacer VSL + FOMO → CTA → Badges (z-20, au-dessus du temple)
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity:0, y:30, scale:0.95 }}
        animate={{ opacity:1, y:0, scale:1 }}
        transition={{ delay:0.25, duration:0.65, type:'spring' }}
        className="absolute z-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ top:'clamp(195px, 38%, 320px)' }}>

        {/* Spacer — même taille que la VSL pour pousser le CTA en-dessous */}
        <div style={{ width:'clamp(340px, 38vw, 520px)', aspectRatio:'16/9' }} />

        {/* ── Groupe FOMO + CTA + badges — marginTop négatif pour remonter l'ensemble ── */}
        <div style={{ marginTop:'60px', display:'flex', flexDirection:'column', alignItems:'center' }}>

        {/* ── BADGE FOMO — offre de lancement (AU-DESSUS du CTA) ── */}
        <motion.div
          initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.55, duration:0.4, type:'spring', stiffness:260 }}
          className="flex items-center gap-2.5 mt-5 rounded-xl px-4 py-2"
          style={{
            background:`linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,245,235,0.98))`,
            border:`2.5px solid ${C.outline}`,
            boxShadow:`3px 3px 0 ${C.outline}, 0 4px 12px rgba(236,100,38,0.18)`,
          }}>
          <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0 animate-pulse" style={{ background:'#EF4444', boxShadow:'0 0 6px rgba(239,68,68,0.6)' }} />
          <span style={{ fontFamily:'var(--font-montserrat)', fontWeight:800, fontSize:'clamp(10px,0.85vw,13px)', color:C.text, letterSpacing:'.01em' }}>
            OFFRE DE LANCEMENT
          </span>
          <span style={{ width:1, height:14, background:'rgba(0,0,0,0.15)', display:'inline-block' }} />
          <span style={{ fontFamily:'var(--font-montserrat)', fontWeight:900, fontSize:'clamp(13px,1.1vw,16px)', color:C.orange }}>{offerConfig.launchPrice}€</span>
          <span style={{ fontFamily:'var(--font-inter)', fontSize:'clamp(10px,0.78vw,12px)', color:'rgba(0,0,0,0.3)', textDecoration:'line-through' }}>{offerConfig.regularPrice}€</span>
        </motion.div>

        {/* ── CTA ── */}
        <motion.a
          href={offerConfig.checkoutUrl}
          initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.5 }}
          whileHover={{ y:2, boxShadow:`4px 4px 0 ${C.outline}` }}
          whileTap={{ y:4, boxShadow:`2px 2px 0 ${C.outline}` }}
          className="relative flex items-center justify-center gap-3 overflow-hidden font-black uppercase rounded-2xl text-white cursor-pointer mt-3"
          style={{
            background:`linear-gradient(165deg, ${C.orangeLt} 0%, ${C.orange} 45%, ${C.orangeHot} 100%)`,
            border:`4px solid ${C.outline}`,
            boxShadow:`7px 7px 0 ${C.outline}, 0 12px 32px rgba(236,100,38,0.35), inset 0 2px 0 rgba(255,255,255,0.25)`,
            padding:'clamp(18px,2vw,26px) clamp(56px,8vw,120px)',
            fontSize:'clamp(17px,2vw,26px)',
            fontFamily:'var(--font-montserrat)',
            whiteSpace:'nowrap',
            letterSpacing:'.03em',
          }}>
          <span className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shine pointer-events-none" />
          DÉBLOQUER LE GUIDE
          <Unlock className="shrink-0" style={{ width:'clamp(18px,1.4vw,22px)', height:'clamp(18px,1.4vw,22px)' }} strokeWidth={3} />
        </motion.a>

        {/* ── BADGES TRUST — sous le CTA ── */}
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
          className="flex items-center gap-4 mt-3 flex-wrap justify-center">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5"
              style={{
                background:'rgba(255,255,255,0.88)',
                border:`1.5px solid rgba(26,26,26,0.12)`,
                boxShadow:'0 2px 6px rgba(0,0,0,0.06)',
              }}>
              <f.icon className="shrink-0" style={{ width:14, height:14, color:C.orange }} strokeWidth={2.5} />
              <span style={{ fontSize:'clamp(11px,0.85vw,13px)', color:'rgba(20,40,60,0.75)', fontFamily:'var(--font-inter)', fontWeight:500 }}>
                {f.label}
              </span>
            </div>
          ))}
        </motion.div>
        </div>{/* fin groupe CTA */}
      </motion.div>

      {/* ── ZEUS — INTOUCHABLE ── */}
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
