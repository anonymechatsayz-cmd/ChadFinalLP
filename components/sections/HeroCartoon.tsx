'use client';

import { useState, useEffect, useRef } from 'react';

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
const cn: React.CSSProperties = { fontFamily: 'var(--font-baloo)' };
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
          <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: 11, fontWeight: 700, color: STELE_TXT, lineHeight: 1.35, textTransform: 'uppercase', letterSpacing: '.06em', margin: 0,
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
          <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: 11, fontWeight: 700, color: STELE_TXT, lineHeight: 1.35, textTransform: 'uppercase', letterSpacing: '.06em', margin: 0,
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
  const [timeLeft, setTimeLeft] = useState({ d: 2, h: 23, m: 59, s: 59 });

  useEffect(() => {
    const target = (offerConfig as any).countdownTarget
      ? new Date((offerConfig as any).countdownTarget).getTime()
      : Date.now() + 48 * 60 * 60 * 1000;

    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const segments = [
    { val: pad(timeLeft.d), unit: 'j' },
    { val: pad(timeLeft.h), unit: 'h' },
    { val: pad(timeLeft.m), unit: 'm' },
    { val: pad(timeLeft.s), unit: 's' },
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: 'linear-gradient(135deg, #ede5da 0%, #d8ccbc 40%, #e8ddd0 70%, #cfc3b4 100%)',
      border: '2.5px solid #8a7968', borderRadius: 10,
      boxShadow: '3px 3px 0 #5a4e3e, inset 0 1px 0 rgba(255,255,255,0.45)',
      padding: '7px 18px 9px',
      gap: 4,
    }}>
      <span style={{
        fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 'clamp(8px, 1vw, 11px)',
        letterSpacing: '.14em', color: '#c0392b', textTransform: 'uppercase', lineHeight: 1,
      }}>
        Offre de lancement — expire dans
      </span>
      <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, #8a7968 30%, #8a7968 70%, transparent)', opacity: 0.5 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {segments.map((seg, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            {i > 0 && <span style={{ fontFamily: 'var(--font-baloo)', fontSize: '16px', color: '#8a7968', margin: '0 4px' }}>·</span>}
            <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 900, fontSize: 'clamp(16px, 4.5vw, 20px)', color: '#2a1e12' }}>{seg.val}</span>
            <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: '10px', color: '#6a5e4e' }}>{seg.unit}</span>
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
  // embedUrl défini une fois — une seule iframe dans le DOM (pas de double audio)
  const embedUrl = `${getEmbed(offerConfig.vslUrl)}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&enablejsapi=1&vq=hd1080`;

  // ── Positionnement JS de la VSL ────────────────────────────────────────────
  // Le PNG (4000×2233, ratio 1.791) est en object-cover sur la section (100svh).
  // Zone transparente dans le PNG :
  //   top=850px (38.07%), height=580px (25.97%), width=1120px (28%), centrée H
  // On calcule la position en pixels réels → fiable sur toutes les résolutions.
  const [vslStyle, setVslStyle] = useState<React.CSSProperties>({});
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleSound = () => {
    const w = iframeRef.current?.contentWindow;
    if (!w) return;
    w.postMessage(
      JSON.stringify({ event: 'command', func: isMuted ? 'unMute' : 'mute', args: [] }),
      '*'
    );
    setIsMuted(m => !m);
  };

  useEffect(() => {
    const checkLandscape = () => setIsLandscape(window.innerHeight < 500 && window.innerWidth >= 640);
    checkLandscape();
    window.addEventListener('resize', checkLandscape);
    return () => window.removeEventListener('resize', checkLandscape);
  }, []);

  useEffect(() => {
    const IMG_RATIO  = 4000 / 2233;  // 1.7912… ratio du PNG
    // Dimensions réelles de la zone transparente du temple dans le PNG
    const ZONE_TOP_PX = 850  / 2233;   // top   (fraction de hauteur PNG)
    const ZONE_H_PX   = 580  / 2233;   // hauteur (fraction)
    const ZONE_W_PX   = 1120 / 4000;   // largeur (fraction)

    const compute = () => {
      const svh = window.innerHeight;
      const vw  = window.innerWidth;
      const vpRatio = vw / svh;

      let imgH: number, imgW: number, imgTop: number;

      if (vpRatio >= IMG_RATIO) {
        imgW   = vw;
        imgH   = vw / IMG_RATIO;
        imgTop = (svh - imgH) / 2;
      } else {
        imgH   = svh;
        imgW   = svh * IMG_RATIO;
        imgTop = 0;
      }

      // ── SIZING WIDTH-FIRST ───────────────────────────────────────────────────
      // La vidéo occupe toute la largeur de la zone du temple.
      // La zone fait ratio 1.93, le 16:9 fait 1.78 → la hauteur dépasse de ~8.5%,
      // les bords haut/bas sont couverts par le cadre du temple (rognage minimal, acceptable).
      const zoneW = ZONE_W_PX * imgW * 1.08; // +8% pour remplir la zone
      const zoneH = zoneW * (9 / 16);

      // Centre vertical ancré sur le centre réel de la zone transparente
      const zoneCenter = imgTop + ZONE_TOP_PX * imgH + (ZONE_H_PX * imgH) / 2;

      setVslStyle({
        top:    zoneCenter - zoneH / 2,
        height: zoneH,
        width:  zoneW,
      });
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return (
    <section className="relative w-full overflow-x-clip" style={{ minHeight:'min(760px, 100svh)', height:'100svh' }}>

      <div
        className="absolute z-[2] left-1/2 -translate-x-1/2 overflow-hidden pointer-events-auto"
        style={{
          ...vslStyle,
          opacity: vslStyle.top !== undefined ? 1 : 0,
          transition: 'opacity 0.55s ease 0.65s',
        }}>
        <iframe
          ref={iframeRef}
          className="w-full h-full"
          src={embedUrl}
          title="VSL"
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {/* Barre de contrôles custom — centrée en bas de la vidéo */}
        <div style={{
          position: 'absolute', bottom: 10, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: 8,
          zIndex: 10, pointerEvents: 'auto',
        }}>
          <button onClick={toggleSound} style={{
            background: 'rgba(0,0,0,0.72)', color: '#fff',
            border: '1.5px solid rgba(255,255,255,0.22)', borderRadius: 8,
            padding: '6px 14px', fontSize: 12, fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
            whiteSpace: 'nowrap', fontFamily: 'var(--font-baloo)',
            opacity: isMuted ? 1 : 0.6,
          }}>
            {isMuted ? '🔇 Activer le son' : '🔊 Son activé'}
          </button>
          <button onClick={() => iframeRef.current?.requestFullscreen()} aria-label="Plein écran" style={{
            background: 'rgba(0,0,0,0.72)', color: '#fff',
            border: '1.5px solid rgba(255,255,255,0.22)', borderRadius: 8,
            padding: '6px 12px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5,
            backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
            fontFamily: 'var(--font-baloo)', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
              <path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
            </svg>
            Plein écran
          </button>
        </div>
      </div>

      {/* BACKGROUND IMAGE */}
      <motion.div
        initial={{ opacity:0, scale:1.04 }} animate={{ opacity:1, scale:1 }}
        transition={{ opacity: { duration:0.4, ease:'easeOut' }, scale: { duration:1.1, ease:[0.25, 0.46, 0.45, 0.94] } }}
        className="absolute inset-0 z-[10] pointer-events-none overflow-hidden">
        <Image
          src="/background-sans-fond (1).webp"
          alt=""
          fill
          className="object-cover object-center object-top sm:object-center"
          priority
          quality={100}
          sizes="100vw"
        />
      </motion.div>

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
            fontFamily: 'var(--font-baloo), Arial, sans-serif', // Fallback universel
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
      {/* LOGO + HEADLINE — empilés verticalement, sans chevauchement */}
      <motion.div
        initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.6, ease:'easeOut' }}
        className="absolute z-20 w-full flex flex-col items-center pointer-events-none hero-headline-top"
        style={{ gap: 'clamp(8px, 0.8vw, 16px)' }}>

        {/* LOGO — ★ MATHS ULTIME ★ */}
        <div className="flex items-center justify-center gap-3">
          <span style={{
            fontSize: 'clamp(14px, 2vw, 20px)', lineHeight: 1,
            color: '#FFE234',
            textShadow: '0 0 8px rgba(255,226,52,0.9), 0 0 20px rgba(255,200,0,0.6)',
          }}>★</span>
          <span style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 800,
            fontSize: 'clamp(20px, 2.8vw, 32px)',
            color: '#0d0d0d',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            MATHS ULTIME
          </span>
          <span style={{
            fontSize: 'clamp(14px, 2vw, 20px)', lineHeight: 1,
            color: '#FFE234',
            textShadow: '0 0 8px rgba(255,226,52,0.9), 0 0 20px rgba(255,200,0,0.6)',
          }}>★</span>
        </div>

        {/* HEADLINE — 2 lignes mobile / 1 ligne desktop */}
        <h1
          className="w-full text-center uppercase px-4 hero-h1-size"
          style={{
            fontFamily: 'var(--font-cinzel), serif',
            fontWeight: 900,
            letterSpacing: '0.04em',
            color: '#FFE234',
            lineHeight: 1.2,
            textShadow: [
              '0 2px 10px rgba(0,0,0,0.85)',
              '0 5px 25px rgba(0,0,0,0.6)',
              '0 10px 50px rgba(0,0,0,0.4)',
              '0 0 18px rgba(255,225,60,0.9)',
              '0 0 40px rgba(255,200,0,0.55)',
              '0 0 70px rgba(255,180,0,0.3)',
            ].join(', '),
          }}>
          PASSE DE 8 A 15/20 EN MATHS AU LYCÉE
        </h1>
      </motion.div>

      {/* ── STÈLES SUR NUAGES (Zone Gauche) ── */}
      <motion.div
        initial={{ opacity:0, x:-70 }} animate={{ opacity:1, x:0 }}
        transition={{ delay:0.45, duration:0.9, type:'spring', stiffness:55, damping:18 }}
        className="absolute z-30 hidden xl:block"
        style={{ left: 'max(24px, calc(50vw - 660px))', top: 'clamp(300px, 36%, 430px)' }}>
        <LeftStelesStack />
      </motion.div>


      {/* ── COLONNE CENTRALE — Desktop/Tablette portrait (sm+) ── */}
      {!isLandscape && (
        <motion.div
          initial={{ opacity:0, y:30, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }} transition={{ delay:0.25, duration:0.65, type:'spring' }}
          className="hidden sm:flex absolute z-20 left-1/2 -translate-x-1/2 flex-col items-center pointer-events-none w-full px-4"
          style={{ bottom: 'clamp(18px, 4%, 52px)' }}>
          <div className="pointer-events-auto flex flex-col items-center w-full">
            <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.55, duration:0.4 }} className="mt-2">
              <CountdownMarble />
            </motion.div>
            <motion.div initial={{ opacity:0, y:15 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65, duration:0.5 }} className="mt-3 w-full flex justify-center px-2">
              <div className="flex flex-col items-center w-full max-w-[min(100%,480px)]">
                <GreekCTA size="md" goldBorder={false} showBadges={false} label="JE VEUX 15/20 EN MATHS" />
                <div className="flex items-center gap-3 flex-wrap justify-center mt-3">
                  {['Accès à vie', '+300h de travail', 'PDF + Vidéos'].map((label, i) => (
                    <div key={i} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5"
                      style={{ background: 'rgba(255,255,255,0.97)', border: '1.5px solid rgba(26,26,26,0.3)', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
                      <span style={{ fontSize: 'clamp(11px, 0.85vw, 13px)', color: 'rgba(20,40,60,0.92)', fontFamily: 'var(--font-baloo)', fontWeight: 600 }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ── LANDSCAPE MOBILE — countdown + CTA + badges à droite de la VSL ── */}
      {isLandscape && (
        <div className="hidden sm:flex absolute z-20 flex-col items-center pointer-events-none"
          style={{ right: 20, top: '50%', transform: 'translateY(-50%)', width: 210 }}>
          <div className="pointer-events-auto flex flex-col items-center w-full gap-2">
            <CountdownMarble />
            <div className="w-full">
              <GreekCTA size="md" goldBorder={false} showBadges={false} label="JE VEUX 15/20 EN MATHS" />
            </div>
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {['Accès à vie', '+300h', 'PDF + Vidéos'].map((label, i) => (
                <div key={i} className="flex items-center rounded-lg px-2 py-1"
                  style={{ background: 'rgba(255,255,255,0.97)', border: '1.5px solid rgba(26,26,26,0.3)', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
                  <span style={{ fontSize: 10, color: 'rgba(20,40,60,0.92)', fontFamily: 'var(--font-baloo)', fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MOBILE CONTENU — countdown + CTA + badges, sous l'écran du temple ── */}
      <motion.div
        initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4, duration:0.55, type:'spring' }}
        className="sm:hidden absolute z-20 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none w-full px-5"
        style={{ top: 'calc(64svh + 12px)' }}>
        <CountdownMarble />
        <div className="mt-3 w-full flex justify-center pointer-events-auto">
          <div className="flex flex-col items-center w-full">
            <GreekCTA size="md" goldBorder={false} showBadges={false} label="JE VEUX 15/20 EN MATHS" />
            <div className="hidden min-[375px]:flex items-center gap-2 flex-nowrap justify-center mt-3">
              {['Accès à vie', '+300h de travail', 'PDF + Vidéos'].map((label, i) => (
                <div key={i} className="flex items-center gap-1 rounded-lg px-2.5 py-1.5"
                  style={{ background: 'rgba(255,255,255,0.97)', border: '1.5px solid rgba(26,26,26,0.3)', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
                  <span style={{ fontSize: 'clamp(10px, 2.8vw, 13px)', color: 'rgba(20,40,60,0.92)', fontFamily: 'var(--font-baloo)', fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ZEUS (Droite) */}
      <motion.div
        initial={{ opacity:0, x:80 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4, duration:0.85, type:'spring', stiffness:60 }}
        className="absolute z-30 hidden lg:block pointer-events-none"
        style={{ right:'0', bottom:0, width:'clamp(228px, 35vw, 655px)', height:'clamp(403px, 101vh, 1033px)' }}>
        <Image src="/zeuf_4x.png" alt="Zeus chibi" fill className="object-contain object-bottom" quality={100} unoptimized sizes="(max-width: 768px) 0px, (max-width: 1440px) 36vw, 520px" priority />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-[25] h-[4%] pointer-events-none" style={{ background:'linear-gradient(to top,#FDFBF7,transparent)' }} />
    </section>
  );
}