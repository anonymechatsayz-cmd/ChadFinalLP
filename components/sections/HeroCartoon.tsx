'use client';

import { useState, useEffect } from 'react';

import Image from 'next/image';
import { motion } from 'motion/react';
import { offerConfig } from '@/lib/offer';
import { GreekCTA } from '@/components/ui';

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  outline: '#1A1A1A',
  stroke:  '#0a2040',
  orange:  '#EC6426',
  orangeHot:'#E04A10',
  orangeLt:'#FF8040',
  white:   '#FFFFFF',
};

// ─── UTILS ────────────────────────────────────────────────────────────────────
const getEmbed = (url: string) => {
  const id = url?.match(/[?&]v=([^&]+)/)?.[1] || url?.match(/youtu\.be\/([^?]+)/)?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : ''; 
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SKY_SYMS = [
  // --- GRANDE OURSE (Positions 0-6) - Plus compacte et lumineuse
  { s:'Σ', top:8,  left:7,  sz:22, op:0.35, d:6, dy:0, rot:0,   c:'#f5ecd4' }, // Ivoire Étoilé
  { s:'Δ', top:12, left:11, sz:14, op:0.25, d:7, dy:0, rot:10,  c:'#f5ecd4' },
  { s:'Ω', top:15, left:15, sz:18, op:0.25, d:8, dy:0, rot:-5,  c:'#f5ecd4' },
  { s:'π', top:20, left:19, sz:16, op:0.30, d:6, dy:0, rot:12,  c:'#f5ecd4' },
  { s:'Φ', top:26, left:17, sz:20, op:0.25, d:9, dy:0, rot:-20, c:'#f5ecd4' },
  { s:'Λ', top:28, left:23, sz:14, op:0.25, d:7, dy:0, rot:25,  c:'#f5ecd4' },
  { s:'∫', top:23, left:25, sz:20, op:0.35, d:8, dy:0, rot:8,   c:'#f5ecd4' },
  // --- CASSIOPÉE (Positions 7-11) - Resserrée
  { s:'θ', top:7,  left:80, sz:18, op:0.30, d:6, dy:0, rot:-10, c:'#f5ecd4' },
  { s:'φ', top:13, left:84, sz:16, op:0.35, d:7, dy:0, rot:15,  c:'#f5ecd4' },
  { s:'∞', top:9,  left:88, sz:20, op:0.30, d:8, dy:0, rot:-5,  c:'#f5ecd4' },
  { s:'∂', top:15, left:92, sz:16, op:0.35, d:9, dy:0, rot:20,  c:'#f5ecd4' },
  { s:'√', top:11, left:96, sz:18, op:0.30, d:7, dy:0, rot:-8,  c:'#f5ecd4' },
  // --- ÉTOILES ISOLÉES ---
  
];

const GO_EDGES = [[0,1], [1,2], [2,3], [3,4], [4,5], [5,6], [6,3]];
const CAS_EDGES = [[7,8], [8,9], [9,10], [10,11]];


// ════════════════════════════════════════════════════════════════════════════
// STÈLES GAUCHE — Deux tablettes marbre posées sur les nuages
// ════════════════════════════════════════════════════════════════════════════
const STELE_BG = 'linear-gradient(160deg, #ede5da 0%, #d8ccbc 40%, #e8ddd0 70%, #cfc3b4 100%)';
const STELE_BD = '2.5px solid #8a7968';
const STELE_SH = '4px 4px 0 #5a4e3e, inset 0 1px 0 rgba(255,255,255,0.45)';
const STELE_TXT = '#2a1e12';
const cn: React.CSSProperties = { fontFamily: 'var(--font-cinzel)' };
const RULE = <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg,transparent,#8a7968 30%,#8a7968 70%,transparent)' }} />;

function LeftStelesStack() {
  const sBase: React.CSSProperties = {
    background: STELE_BG, border: STELE_BD, boxShadow: STELE_SH,
    borderRadius: 10, padding: '14px 18px', textAlign: 'center',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* Stèle 1 — inclinée gauche */}
      <div style={{ transform: 'rotate(-2deg)', zIndex: 2, marginBottom: -10 }}>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          style={{ ...sBase, width: 205 }}
        >
          {RULE}
          <p style={{ ...cn, fontSize: 12, fontWeight: 700, color: STELE_TXT, lineHeight: 1.35, textTransform: 'uppercase', letterSpacing: '.08em', margin: 0,
            textShadow: '0 1px 2px rgba(255,255,255,0.55), 0 -1px 1px rgba(0,0,0,0.12)' }}>
            Le meilleur guide<br/>de maths en France
          </p>
          {RULE}
        </motion.div>
      </div>

      {/* Stèle 2 — inclinée droite */}
      <div style={{ transform: 'rotate(1.5deg)', zIndex: 1, marginBottom: -6 }}>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 5.8, ease: 'easeInOut', delay: 0.5 }}
          style={{ ...sBase, width: 188 }}
        >
          {RULE}
          <p style={{ ...cn, fontSize: 12, fontWeight: 700, color: STELE_TXT, lineHeight: 1.35, textTransform: 'uppercase', letterSpacing: '.08em', margin: 0,
            textShadow: '0 1px 2px rgba(255,255,255,0.55), 0 -1px 1px rgba(0,0,0,0.12)' }}>
            Ton guide de survie<br/>pour le bac
          </p>
          {RULE}
        </motion.div>
      </div>

      {/* Nuages */}
      <div style={{ position: 'relative', width: 270, height: 44, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)',
          width: 250, height: 50, borderRadius: '50%',
          background: 'radial-gradient(ellipse 95% 75% at 50% 100%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.55) 55%, transparent 80%)',
          filter: 'blur(10px)' }} />
        <div style={{ position: 'absolute', left: '6%', bottom: 3, width: 70, height: 32,
          background: 'radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.88) 0%, transparent 70%)',
          filter: 'blur(7px)' }} />
        <div style={{ position: 'absolute', right: '6%', bottom: 6, width: 78, height: 36,
          background: 'radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.82) 0%, transparent 70%)',
          filter: 'blur(8px)' }} />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// COUNTDOWN MARBRE
// ════════════════════════════════════════════════════════════════════════════
function CountdownMarble() {
  const [timeLeft, setTimeLeft] = useState({ h: 47, m: 59, s: 59 });

  useEffect(() => {
    const target = (offerConfig as any).countdownTarget
      ? new Date((offerConfig as any).countdownTarget).getTime()
      : Date.now() + 48 * 60 * 60 * 1000;

    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000)
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-1">
      <span style={{
        fontFamily: 'var(--font-space)', fontWeight: 800, fontSize: 'clamp(10px, 0.85vw, 10px)',
        letterSpacing: '.12em', color: 'rgba(26,58,92,1)', textTransform: 'uppercase', 
      }}>
        L&apos;offre expire dans
      </span>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'linear-gradient(135deg, #ede5da 0%, #d8ccbc 40%, #e8ddd0 70%, #cfc3b4 100%)',
        border: '2.5px solid #8a7968', borderRadius: 10, padding: '9px 18px',
        boxShadow: '3px 3px 0 #5a4e3e, inset 0 1px 0 rgba(255,255,255,0.45)',
      }}>
        {[
          { val: pad(timeLeft.h), unit: 'h' },
          { val: pad(timeLeft.m), unit: 'm' },
          { val: pad(timeLeft.s), unit: 's' },
        ].map((seg, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            {i > 0 && <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '16px', color: '#8a7968', margin: '0 4px' }}>·</span>}
            <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: '20px', color: '#2a1e12' }}>{seg.val}</span>
            <span style={{ fontFamily: 'var(--font-space)', fontWeight: 700, fontSize: '10px', color: '#6a5e4e' }}>{seg.unit}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// HERO CARTOON
// ════════════════════════════════════════════════════════════════════════════
export function HeroCartoon() {
  return (
    <section className="relative w-full overflow-x-clip" style={{ height:'100svh', minHeight:'min(600px, 100svh)', maxHeight:'100svh' }}>

      {/* VSL (Background Auto-play) — desktop uniquement */}
      <div
        className="absolute z-[2] left-1/2 -translate-x-1/2 hidden sm:block"
        style={{ top:'clamp(175px, 31%, 610px)', width:'min(clamp(320px, 58vw, 700px), calc(38svh * 16 / 9))' }}>
        <div className="relative w-full overflow-hidden" style={{ aspectRatio:'16/9' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`${getEmbed(offerConfig.vslUrl)}?autoplay=1`}
            title="VSL"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* BACKGROUND IMAGE */}
      <Image
        src="/background-sans-fond (1).webp"
        alt=""
        fill
        className="object-cover object-center object-top sm:object-center z-[10] pointer-events-none"
        priority
        quality={100}
        sizes="100vw"
      />

      {/* LIGNES DE CONSTELLATIONS */}
      <svg className="absolute inset-0 z-[2] pointer-events-none w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {GO_EDGES.map(([a, b], idx) => (
          <line key={`go-${idx}`} 
            x1={SKY_SYMS[a].left} y1={SKY_SYMS[a].top} 
            x2={SKY_SYMS[b].left} y2={SKY_SYMS[b].top} 
            stroke={SKY_SYMS[a].c} strokeWidth="0.03" opacity="0.12" strokeDasharray="0.2 0.5" 
          />
        ))}
        {CAS_EDGES.map(([a, b], idx) => (
          <line key={`cas-${idx}`} 
            x1={SKY_SYMS[a].left} y1={SKY_SYMS[a].top} 
            x2={SKY_SYMS[b].left} y2={SKY_SYMS[b].top} 
            stroke={SKY_SYMS[a].c} strokeWidth="0.03" opacity="0.12" strokeDasharray="0.2 0.5" 
          />
        ))}
      </svg>

      {/* SYMBOLES (ÉTOILES) */}
      {SKY_SYMS.map((m, i) => (
        <motion.div key={`sym-${i}`}
          className="absolute select-none pointer-events-none"
          style={{ 
            top: `${m.top}%`, 
            left: `${m.left}%`, 
            fontSize: `${m.sz}px`, 
            color: m.c, 
            fontFamily: 'var(--font-cinzel), Arial, sans-serif', // Fallback universel
            fontWeight: 900, 
            zIndex: 11,
            // Effet "Étoile Réelle" : Noyau brillant + Bloom diffus
            textShadow: `0 0 2px #fff, 0 0 8px ${m.c}aa, 0 0 20px ${m.c}44`
          }}
          initial={{ opacity: m.op, rotate: m.rot }}
          animate={{ 
            y: [0, -m.dy, 0], 
            opacity: [m.op, m.op * 1.6, m.op] // Scintillement (twinkling)
          }}
          transition={{ 
            repeat: Infinity, 
            duration: m.d, 
            ease: 'easeInOut', 
            delay: i * 0.5 
          }}>
          {m.s}
        </motion.div>
      ))}
      {/* SUBTITLE */}
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1, duration:0.5 }}
        className="absolute z-20 w-full flex items-center justify-center gap-2 pointer-events-none"
        style={{ top:'clamp(10px, 2%, 22px)' }}>
        <Image src="/chadlogo.jpeg" alt="ChadSciences" width={48} height={48} className="rounded-full object-cover border-2 border-white/50" style={{ width: 'clamp(28px, 3.5vw, 48px)', height: 'clamp(28px, 3.5vw, 48px)' }} />
        <span className="font-bold tracking-[.18em] uppercase" style={{ fontFamily:'var(--font-space)', fontSize:'clamp(16px, 2.8vw, 34px)', color:'#1a3a5c' }}>
          MATHS ULTIME
        </span>
      </motion.div>

      {/* TITRE PRINCIPAL */}
      <motion.h1
        initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.8, ease:'easeOut' }}
        className="absolute z-20 w-full text-center pointer-events-none uppercase px-4"
        style={{
          top: 'clamp(46px, 8%, 88px)',
          fontFamily: 'var(--font-cinzel)',
          fontWeight: 900,
          fontSize: 'clamp(20px, 4.5vw, 62px)',
          letterSpacing: '0.04em',
          color: '#FFE234',
          wordBreak: 'break-word',
          lineHeight: 1.15,
          textShadow: `
            0 1px 0 rgba(0,0,0,0.95),
            0 2px 0 rgba(0,0,0,0.85),
            0 4px 0 rgba(0,0,0,0.6),
            0 0 30px rgba(0,0,0,0.7)
          `
        }}>
        PASSE DE 8 À 15/20 EN MATHS
      </motion.h1>

      {/* ── STÈLES SUR NUAGES (Zone Gauche) ── */}
      <div className="absolute z-30 hidden xl:block" style={{ left: 'max(24px, calc(50vw - 660px))', top: 'clamp(300px, 36%, 430px)' }}>
        <LeftStelesStack />
      </div>

      {/* COLONNE CENTRALE — Desktop : après le VSL | Mobile : centrée */}
      <motion.div
        initial={{ opacity:0, y:30, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }} transition={{ delay:0.25, duration:0.65, type:'spring' }}
        className="absolute z-20 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none w-full px-4"
        style={{ top:'clamp(150px, 27%, 580px)' }}>

        {/* Espace VSL (desktop uniquement — sm:) */}
        <div className="hidden sm:block" style={{ width:'min(clamp(320px, 58vw, 700px), calc(38svh * 16 / 9))', aspectRatio:'16/9' }} />

        {/* VSL mobile — dans le flux, taille réduite pour tout faire tenir */}
        <div className="sm:hidden w-full overflow-hidden rounded-xl pointer-events-auto" style={{ aspectRatio:'16/9', maxWidth: 'min(100%, 360px)', marginTop: 2 }}>
          <iframe
            className="w-full h-full"
            src={`${getEmbed(offerConfig.vslUrl)}?autoplay=1`}
            title="VSL"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="pointer-events-auto flex flex-col items-center w-full" style={{ marginTop: 'clamp(0px, 4vh, 48px)' }}>
          <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.55, duration:0.4 }} className="mt-2">
            <CountdownMarble />
          </motion.div>
          <motion.div initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.5 }} className="mt-3 w-full flex justify-center px-2">
            <div className="flex flex-col items-center w-full max-w-[min(100%,480px)]">
              <GreekCTA size="md" goldBorder={false} showBadges={false} />
              <div className="flex items-center gap-3 flex-wrap justify-center mt-3">
                {['Accès à vie', '+300h de travail', 'PDF + Vidéos'].map((label, i) => (
                  <div key={i} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5"
                    style={{ background: 'rgba(255,255,255,0.97)', border: '1.5px solid rgba(26,26,26,0.3)', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
                    <span style={{ fontSize: 'clamp(11px, 0.85vw, 13px)', color: 'rgba(20,40,60,0.92)', fontFamily: 'var(--font-inter)', fontWeight: 600 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ZEUS (Droite) */}
      <motion.div
        initial={{ opacity:0, x:80 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4, duration:0.85, type:'spring', stiffness:60 }}
        className="absolute z-30 hidden lg:block pointer-events-none"
        style={{ right:'0', bottom:0, width:'clamp(280px, 36vw, 520px)', height:'clamp(480px, 92vh, 820px)' }}>
        <Image src="/zeuf_4x.png" alt="Zeus chibi" fill className="object-contain object-bottom" quality={100} unoptimized sizes="(max-width: 768px) 0px, (max-width: 1440px) 36vw, 520px" priority />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-[25] h-[6%] pointer-events-none" style={{ background:'linear-gradient(to top,#FDFBF7,transparent)' }} />
    </section>
  );
}