'use client';

import { useRef, useState, useEffect } from 'react';
import { Star, Unlock, Lock } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, Variants } from 'motion/react';

const modules = [
  { level: 'I', symbol: 'Ω', label: 'OMEGA · LA BASE ABSOLUE', title: 'Mindset, Attitude & Prérequis', desc: "Le module le plus important. Avant même d'ouvrir un manuel, tu dois adopter la bonne vision des maths : comment ton cerveau apprend, comment maximiser chaque cours, les automatismes à avoir et les prérequis indispensables. Sans ça, tout le reste est fragile.", illuLabel: 'Mindset & Prérequis' },
  { level: 'II', symbol: 'Σ', label: 'SIGMA · LE CALCUL', title: 'Algèbre & Calcul', desc: "Équations, inéquations, fonctions, dérivées. On repart des bases solides et on monte en puissance. Chaque notion est expliquée avec des exemples concrets et des exercices progressifs — zéro bourrage de crâne.", illuLabel: 'Algèbre & Calcul' },
  { level: 'III', symbol: 'Δ', label: 'DELTA · LA GÉOMÉTRIE', title: 'Géo & Vecteurs', desc: "Géométrie dans l'espace, produit scalaire, vecteurs dans le plan et dans l'espace. On visualise, on comprend et on applique. Les problèmes de géo ne te feront plus jamais peur.", illuLabel: 'Géo & Vecteurs' },
  { level: 'IV', symbol: 'α', label: 'ALPHA · LES PROBABILITÉS', title: 'Probas & Stats', desc: "Probabilités conditionnelles, lois de distribution, statistiques descriptives. Le module qui fait le plus peur — et pourtant le plus rentable en DS. On démonte la peur de l'aléatoire une bonne fois pour toutes.", illuLabel: 'Probas & Stats' },
];

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.05, type: "spring", duration: 0.5, bounce: 0 },
      opacity: { delay: i * 0.05, duration: 0.01 }
    }
  })
};

function IlluMindset() {
  return (
    <svg viewBox="0 0 220 200" className="w-full h-full max-w-[200px] mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── Hémisphère gauche ── */}
      <motion.path custom={0} variants={draw} initial="hidden" animate="visible"
        d="M110 24 C96 24, 75 30, 58 46 C41 62, 32 82, 32 97 C32 112, 38 134, 56 149 C72 163, 92 171, 110 171 Z"
        stroke="#1a2d4a" strokeWidth="2.5" fill="rgba(26,45,74,0.07)"
      />
      {/* ── Hémisphère droit ── */}
      <motion.path custom={1} variants={draw} initial="hidden" animate="visible"
        d="M110 24 C124 24, 145 30, 162 46 C179 62, 188 82, 188 97 C188 112, 182 134, 164 149 C148 163, 128 171, 110 171 Z"
        stroke="#1a2d4a" strokeWidth="2.5" fill="rgba(26,45,74,0.07)"
      />

      {/* ── Fissure longitudinale ── */}
      <motion.line custom={2} variants={draw} initial="hidden" animate="visible"
        x1="110" y1="24" x2="110" y2="171"
        stroke="#1a2d4a" strokeWidth="1.5" strokeDasharray="5 3"
      />

      {/* ── Gyrus gauche haut — courbe élégante ── */}
      <motion.path custom={3} variants={draw} initial="hidden" animate="visible"
        d="M58 62 C62 50, 76 42, 88 50 C100 58, 100 76, 88 86 C76 96, 60 94, 54 108"
        stroke="#1a2d4a" strokeWidth="2" fill="none"
      />
      {/* ── Gyrus gauche bas ── */}
      <motion.path custom={4} variants={draw} initial="hidden" animate="visible"
        d="M42 114 C44 130, 56 144, 72 148 C84 151, 96 145, 100 152"
        stroke="#1a2d4a" strokeWidth="2" fill="none"
      />

      {/* ── Gyrus droit haut — miroir ── */}
      <motion.path custom={5} variants={draw} initial="hidden" animate="visible"
        d="M162 62 C158 50, 144 42, 132 50 C120 58, 120 76, 132 86 C144 96, 160 94, 166 108"
        stroke="#1a2d4a" strokeWidth="2" fill="none"
      />
      {/* ── Gyrus droit bas ── */}
      <motion.path custom={6} variants={draw} initial="hidden" animate="visible"
        d="M178 114 C176 130, 164 144, 148 148 C136 151, 124 145, 120 152"
        stroke="#1a2d4a" strokeWidth="2" fill="none"
      />

      {/* ── Connexions neurales dorées (hub→nœuds) ── */}
      <motion.line custom={7}  variants={draw} initial="hidden" animate="visible" x1="74" y1="66"  x2="110" y2="97" stroke="#d4a017" strokeWidth="1.2" opacity="0.55" />
      <motion.line custom={8}  variants={draw} initial="hidden" animate="visible" x1="48" y1="110" x2="110" y2="97" stroke="#d4a017" strokeWidth="1.2" opacity="0.55" />
      <motion.line custom={9}  variants={draw} initial="hidden" animate="visible" x1="80" y1="150" x2="110" y2="97" stroke="#d4a017" strokeWidth="1.2" opacity="0.55" />
      <motion.line custom={10} variants={draw} initial="hidden" animate="visible" x1="146" y1="66"  x2="110" y2="97" stroke="#d4a017" strokeWidth="1.2" opacity="0.55" />
      <motion.line custom={11} variants={draw} initial="hidden" animate="visible" x1="172" y1="110" x2="110" y2="97" stroke="#d4a017" strokeWidth="1.2" opacity="0.55" />
      <motion.line custom={12} variants={draw} initial="hidden" animate="visible" x1="140" y1="150" x2="110" y2="97" stroke="#d4a017" strokeWidth="1.2" opacity="0.55" />

      {/* ── Nœuds neuronaux ── */}
      <motion.g initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.68, type:"spring", stiffness:260, damping:16 }}>
        <circle cx="74"  cy="66"  r="4"   fill="#d4a017" opacity="0.90" />
        <circle cx="48"  cy="110" r="3.5" fill="#d4a017" opacity="0.78" />
        <circle cx="80"  cy="150" r="3"   fill="#d4a017" opacity="0.70" />
        <circle cx="146" cy="66"  r="4"   fill="#d4a017" opacity="0.90" />
        <circle cx="172" cy="110" r="3.5" fill="#d4a017" opacity="0.78" />
        <circle cx="140" cy="150" r="3"   fill="#d4a017" opacity="0.70" />
      </motion.g>

      {/* ── Halo + Ω central ── */}
      <motion.g initial={{ opacity:0, scale:0.3 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.88, type:"spring", bounce:0.30 }}>
        <circle cx="110" cy="97" r="24" fill="rgba(212,160,23,0.13)" stroke="#d4a017" strokeWidth="1.2" />
        <text x="110" y="107" textAnchor="middle" fill="#d4a017" fontSize="32" fontFamily="Georgia, serif" fontWeight="bold">Ω</text>
      </motion.g>

      {/* ── Label ── */}
      <motion.g initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.08, duration:0.4 }}>
        <text x="110" y="192" textAnchor="middle" fill="#d4a017" fontSize="11.5" fontStyle="italic" fontFamily="Georgia, serif">Mindset &amp; Prérequis</text>
      </motion.g>
    </svg>
  );
}

function IlluAlgebre() {
  return (
    <svg viewBox="0 0 220 200" className="w-full h-full max-w-[200px] mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.rect custom={0} variants={draw} initial="hidden" animate="visible" x="20" y="20" width="165" height="165" stroke="#1a2d4a" strokeWidth="2.5" />
      <motion.line custom={1} variants={draw} initial="hidden" animate="visible" x1="120" y1="20" x2="120" y2="185" stroke="#1a2d4a" strokeWidth="1.5" strokeDasharray="5 3" />
      <motion.line custom={2} variants={draw} initial="hidden" animate="visible" x1="20" y1="120" x2="185" y2="120" stroke="#1a2d4a" strokeWidth="1.5" strokeDasharray="5 3" />
      <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
        <text x="68" y="79" textAnchor="middle" fill="#1a2d4a" fontSize="20" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">a²</text>
        <text x="153" y="79" textAnchor="middle" fill="#d4a017" fontSize="16" fontStyle="italic" fontFamily="Georgia, serif">ab</text>
        <text x="68" y="158" textAnchor="middle" fill="#d4a017" fontSize="16" fontStyle="italic" fontFamily="Georgia, serif">ab</text>
        <text x="153" y="158" textAnchor="middle" fill="#1a2d4a" fontSize="20" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">b²</text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
        <text x="70" y="14" textAnchor="middle" fill="#1a2d4a" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif">a</text>
        <text x="152" y="14" textAnchor="middle" fill="#1a2d4a" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif">b</text>
        <text x="10" y="74" textAnchor="middle" fill="#1a2d4a" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif">a</text>
        <text x="10" y="157" textAnchor="middle" fill="#1a2d4a" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif">b</text>
        <text x="110" y="197" textAnchor="middle" fill="#d4a017" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">(a+b)² = a² + 2ab + b²</text>
      </motion.g>
    </svg>
  );
}

function IlluGeometrie() {
  return (
    <svg viewBox="0 0 220 200" className="w-full h-full max-w-[200px] mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.polygon custom={0} variants={draw} initial="hidden" animate="visible" points="110,20 30,170 190,170" stroke="#1a2d4a" strokeWidth="2.5" fill="rgba(26,45,74,0.05)" />
      <motion.line custom={1} variants={draw} initial="hidden" animate="visible" x1="110" y1="20" x2="110" y2="170" stroke="#d4a017" strokeWidth="2" strokeDasharray="6 3" />
      <motion.rect custom={2} variants={draw} initial="hidden" animate="visible" x="110" y="158" width="12" height="12" stroke="#1a2d4a" strokeWidth="1.5" fill="none" />
      <motion.g initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
        <text x="110" y="13" textAnchor="middle" fill="#1a2d4a" fontSize="14" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">A</text>
        <text x="22" y="178" textAnchor="middle" fill="#1a2d4a" fontSize="14" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">B</text>
        <text x="198" y="178" textAnchor="middle" fill="#1a2d4a" fontSize="14" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">C</text>
        <text x="95" y="100" textAnchor="middle" fill="#d4a017" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif">h</text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
        <line x1="68" y1="100" x2="78" y2="96" stroke="#1a2d4a" strokeWidth="1.5" />
        <line x1="148" y1="100" x2="158" y2="96" stroke="#1a2d4a" strokeWidth="1.5" />
        <text x="110" y="197" textAnchor="middle" fill="#d4a017" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">Aire = ½ × BC × h</text>
      </motion.g>
    </svg>
  );
}

function IlluProbas() {
  return (
    <svg viewBox="0 0 220 210" className="w-full h-full max-w-[200px] mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} cx="28" cy="105" r="5" fill="#d4a017" />
      <motion.line custom={0} variants={draw} initial="hidden" animate="visible" x1="33" y1="100" x2="95" y2="62" stroke="#1a2d4a" strokeWidth="2" />
      <motion.line custom={1} variants={draw} initial="hidden" animate="visible" x1="33" y1="110" x2="95" y2="148" stroke="#1a2d4a" strokeWidth="2" />
      <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} cx="100" cy="60" r="5" fill="#1a2d4a" />
      <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} cx="100" cy="150" r="5" fill="#1a2d4a" />
      <motion.line custom={2} variants={draw} initial="hidden" animate="visible" x1="105" y1="57" x2="170" y2="33" stroke="#1a2d4a" strokeWidth="1.5" />
      <motion.line custom={3} variants={draw} initial="hidden" animate="visible" x1="105" y1="63" x2="170" y2="87" stroke="#1a2d4a" strokeWidth="1.5" />
      <motion.line custom={4} variants={draw} initial="hidden" animate="visible" x1="105" y1="147" x2="170" y2="123" stroke="#1a2d4a" strokeWidth="1.5" />
      <motion.line custom={5} variants={draw} initial="hidden" animate="visible" x1="105" y1="153" x2="170" y2="177" stroke="#1a2d4a" strokeWidth="1.5" />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
        <circle cx="174" cy="31" r="4" fill="#1a2d4a" opacity="0.7" />
        <circle cx="174" cy="89" r="4" fill="#1a2d4a" opacity="0.7" />
        <circle cx="174" cy="121" r="4" fill="#1a2d4a" opacity="0.7" />
        <circle cx="174" cy="179" r="4" fill="#1a2d4a" opacity="0.7" />
        <text x="100" y="50" textAnchor="middle" fill="#1a2d4a" fontSize="13" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">A</text>
        <text x="100" y="170" textAnchor="middle" fill="#1a2d4a" fontSize="13" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">Ā</text>
        <text x="58" y="72" fill="#d4a017" fontSize="11" fontStyle="italic" fontFamily="Georgia, serif">0,6</text>
        <text x="55" y="140" fill="#d4a017" fontSize="11" fontStyle="italic" fontFamily="Georgia, serif">0,4</text>
        <text x="136" y="36" fill="#1a2d4a" fontSize="10" fontStyle="italic" fontFamily="Georgia, serif">B|A  0,7</text>
        <text x="132" y="83" fill="#1a2d4a" fontSize="10" fontStyle="italic" fontFamily="Georgia, serif">B̄|A  0,3</text>
        <text x="130" y="118" fill="#1a2d4a" fontSize="10" fontStyle="italic" fontFamily="Georgia, serif">B|Ā  0,5</text>
        <text x="130" y="175" fill="#1a2d4a" fontSize="10" fontStyle="italic" fontFamily="Georgia, serif">B̄|Ā  0,5</text>
        <text x="110" y="204" textAnchor="middle" fill="#d4a017" fontSize="12" fontStyle="italic" fontFamily="Georgia, serif" fontWeight="bold">Arbre de probabilités</text>
      </motion.g>
    </svg>
  );
}

const ILLUSTRATIONS = [IlluMindset, IlluAlgebre, IlluGeometrie, IlluProbas];

function Diamond({ symbol, active, isPast }: { symbol: string; active: boolean; isPast: boolean }) {
  return (
    <div className="relative w-[42px] h-[42px] flex items-center justify-center">
      <motion.div
        animate={{
          scale: active ? 1.1 : 1,
          backgroundColor: active || isPast ? '#d4a017' : '#f8fafc',
          boxShadow: active
            ? '0 0 15px rgba(212,160,23,0.5), 4px 4px 0 #1a2d4a'
            : '4px 4px 0 #1a2d4a',
          borderColor: '#1a2d4a'
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 border-[2.5px] rotate-45"
      />
      <motion.span
        animate={{ color: active || isPast ? '#1a2d4a' : '#1a2d4a' }}
        className="relative z-10 font-cinzel font-black flex items-center justify-center leading-none text-[16px]"
      >
        {symbol}
      </motion.span>
    </div>
  );
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const modulesEndRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardPositions = useRef<number[]>([]);
  const [activeModule, setActiveModule] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const updatePositions = () => {
      if (!cardRefs.current.length) return;
      cardPositions.current = cardRefs.current.map(ref => {
        if (!ref) return 0;
        const rect = ref.getBoundingClientRect();
        return rect.top + window.scrollY + rect.height / 2;
      });
    };

    setTimeout(updatePositions, 100);
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  // Limit left panel height to modules section so sticky stops before the CTA
  useEffect(() => {
    const syncHeight = () => {
      if (!leftPanelRef.current || !modulesEndRef.current) return;
      const panelTop = leftPanelRef.current.getBoundingClientRect().top + window.scrollY;
      const modulesBottom = modulesEndRef.current.getBoundingClientRect().top + window.scrollY;
      leftPanelRef.current.style.height = `${modulesBottom - panelTop}px`;
    };

    setTimeout(syncHeight, 200);
    window.addEventListener('resize', syncHeight);
    return () => window.removeEventListener('resize', syncHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!cardPositions.current.length) return;
    const viewportCenter = latest + window.innerHeight * 0.5;
    let closestIdx = activeModule;
    let minDistance = Infinity;

    cardPositions.current.forEach((cardCenter, i) => {
      const distance = Math.abs(viewportCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = i;
      }
    });

    if (closestIdx !== activeModule) {
      setActiveModule(closestIdx);
    }
  });

  useEffect(() => {
    if (activeModule >= modules.length) setIsUnlocked(true);
  }, [activeModule]);

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const ActiveIllustration = ILLUSTRATIONS[Math.min(activeModule, modules.length - 1)];

  return (
    <section ref={containerRef} className="relative border-t-4 border-[#1a2d4a] bg-[#d4e8f5]">

      {/* BACKGROUND ACCENTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#d4a017] to-transparent blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-[#1a2d4a] to-transparent blur-3xl" />
      </div>

      {/* TITRE */}
      <div className="relative z-10 text-center pt-12 pb-10 md:pt-20 md:pb-16 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-cinzel font-black text-[clamp(26px,4.5vw,58px)] text-[#1a2d4a] leading-[1.1] uppercase"
        >
          Ce que contient le guide
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="font-inter text-[clamp(14px,1.3vw,17px)] text-[#1a2d4a]/75 mt-3 font-medium"
        >
          4 modules pour tout maîtriser, du sol au sommet
        </motion.p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-28">
        <div className="flex gap-8 lg:gap-16">

          {/* PANNEAU ILLUSTRATION GAUCHE — sticky (Desktop Only) */}
          {/* Height is set dynamically to stop sticky before the CTA */}
          <div ref={leftPanelRef} className="hidden md:block shrink-0 w-[280px]">
            <div className="sticky top-[25vh]">
              <motion.div
                className="flex flex-col items-center rounded-2xl overflow-hidden bg-white border-4 border-[#1a2d4a] shadow-[8px_8px_0_#1a2d4a] p-8 pb-5"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="relative flex items-center justify-center h-[200px] w-full">
                  <AnimatePresence>
                    <motion.div
                      key={activeModule}
                      initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <ActiveIllustration />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="relative w-full h-[40px] mt-4 border-t-2 border-[#1a2d4a]/10">
                  <AnimatePresence>
                    <motion.div
                      key={`label-${activeModule}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-x-0 top-3 text-center"
                    >
                      <span className="font-cinzel font-bold text-xs text-[#1a2d4a] tracking-[0.15em] uppercase">
                        {modules[Math.min(activeModule, modules.length - 1)].illuLabel}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-3 mt-6">
                {modules.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: i === activeModule ? 28 : 10,
                      backgroundColor: i === activeModule ? '#d4a017' : 'rgba(26,45,74,0.2)'
                    }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                    className={`h-2.5 rounded-full border-2 ${i === activeModule ? 'border-[#1a2d4a]' : 'border-transparent'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* TIMELINE DROITE (Modules + CTA liés) */}
          <div ref={timelineRef} className="flex-1 min-w-0 relative">

            {/* Ligne verticale de base (grisée) */}
            <div className="absolute top-0 bottom-0 left-[21px] w-[3px] bg-[#1a2d4a]/10 rounded-full" />

            {/* Ligne verticale de progression (Or/Bleu) */}
            <motion.div
              className="absolute top-0 bottom-0 left-[21px] w-[3px] rounded-full origin-top bg-gradient-to-b from-[#d4a017] via-[#7ec8d8] to-[#d4a017] shadow-[0_0_12px_rgba(212,160,23,0.8)]"
              style={{ scaleY: lineHeight }}
            />

            {/* Flex Container Modules + CTA */}
            <div className="flex flex-col gap-12 pb-8">
              {modules.map((mod, i) => {
                const isActive = activeModule === i;
                const isPast = i < activeModule;
                const MobileIllu = ILLUSTRATIONS[i];

                return (
                  <motion.div
                    key={i}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className="flex items-start gap-6 lg:gap-8 relative"
                  >
                    <div className="shrink-0 mt-5 z-10">
                      <Diamond symbol={mod.symbol} active={isActive} isPast={isPast} />
                    </div>

                    <motion.div
                      className="flex-1 rounded-2xl bg-white cursor-default border-[3px] p-[clamp(24px,2.5vw,32px)] relative overflow-hidden"
                      animate={{
                        backgroundColor: isActive || isPast ? '#ffffff' : '#f8fafc',
                        opacity: isActive ? 1 : isPast ? 0.85 : 0.4,
                        scale: isActive ? 1 : 0.98,
                        boxShadow: isActive
                          ? '6px 6px 0 #1a2d4a, 0 12px 30px rgba(212,160,23,0.15)'
                          : isPast
                            ? '4px 4px 0 rgba(212,160,23,0.2)'
                            : '4px 4px 0 rgba(26,45,74,0.05)',
                        borderColor: isActive ? '#1a2d4a' : isPast ? 'rgba(212,160,23,0.4)' : 'rgba(26,45,74,0.15)'
                      }}
                      whileHover={{
                        scale: isActive ? 1.02 : 0.99,
                        opacity: 1,
                        boxShadow: isActive ? '8px 8px 0 #1a2d4a, 0 15px 35px rgba(212,160,23,0.2)' : isPast ? '4px 4px 0 rgba(212,160,23,0.4)' : '4px 4px 0 rgba(26,45,74,0.1)',
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {/* Mobile Illustration (Thumbnail) */}
                      <div className="md:hidden absolute top-6 right-6 w-16 h-16 opacity-10 pointer-events-none">
                        <MobileIllu />
                      </div>

                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="font-montserrat font-extrabold text-[11px] text-[#997300] tracking-[0.18em] uppercase mb-2 relative z-10"
                      >
                        MODULE {mod.level} — {mod.label}
                      </motion.p>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-cinzel font-bold text-[clamp(20px,2.2vw,26px)] text-[#1a2d4a] mb-2.5 leading-[1.2] relative z-10"
                      >
                        {mod.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="font-inter text-[clamp(14px,1.2vw,15px)] text-[#1a2d4a]/75 leading-[1.65] font-normal relative z-10"
                      >
                        {mod.desc}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Sentinel: sticky panel height stops here, before the CTA */}
              <div ref={modulesEndRef} />

              {/* CTA FINAL */}
              <div ref={(el) => { cardRefs.current[4] = el; }}>
              <motion.div
                className="flex items-center gap-6 lg:gap-8 relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "0px 0px -10% 0px", amount: 0.2, once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                 <div className="shrink-0 z-10 w-[42px] flex justify-center">
                    <motion.div
                      className="flex items-center justify-center w-[42px] h-[42px] rounded-full relative z-20 bg-[#1a2d4a] border-[2.5px] border-[#d4a017]"
                      animate={{
                        boxShadow: isUnlocked
                          ? '0 0 18px rgba(212,160,23,0.45)'
                          : '0 0 0px rgba(212,160,23,0)',
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <AnimatePresence mode="wait">
                        {isUnlocked ? (
                          <motion.div
                            key="unlock"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <Unlock className="w-5 h-5 text-[#d4a017]" />
                          </motion.div>
                        ) : (
                          <motion.div key="lock" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                            <Lock className="w-4 h-4 text-[#d4a017]/70" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                 </div>

                 <div className="flex-1 rounded-xl flex flex-col items-center text-center bg-white relative overflow-hidden border-[3px] border-[#1a2d4a] shadow-[6px_6px_0_#1a2d4a] py-8 px-6 sm:px-10">
                     <div className="relative z-10 flex flex-col items-center w-full">
                         <h3 className="font-cinzel font-black text-[clamp(22px,3vw,28px)] text-[#1a2d4a] uppercase leading-[1.2] mb-5">
                           PRÊT À PLIER LE PROCHAIN DS ?
                         </h3>

                         <div className="relative z-10 w-full max-w-[90%] sm:max-w-[440px] mb-4">
                           <div className="absolute inset-0 bg-[#e85d04] blur-2xl opacity-30 rounded-xl translate-y-3" />
                           <a
                             href="#pricing"
                             className="relative flex items-center justify-center gap-3 w-full bg-[#e85d04] text-white font-montserrat font-black text-[15px] sm:text-[16px] uppercase tracking-wider py-3.5 sm:py-4 px-6 rounded-xl border-[3px] border-[#1a2d4a] shadow-[5px_5px_0_#1a2d4a] transition-all hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[3px_3px_0_#1a2d4a] active:translate-y-[5px] active:translate-x-[5px] active:shadow-none"
                           >
                             DÉBLOQUER LE GUIDE <Unlock className="w-5 h-5" />
                           </a>
                         </div>

                         <div className="flex gap-1.5 justify-center mb-2">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} className="w-4 h-4 fill-[#d4a017] text-[#d4a017]" />
                           ))}
                         </div>
                         <p className="font-montserrat text-[10px] sm:text-[11px] text-[#1a2d4a]/40 tracking-[0.1em] uppercase font-bold">
                           ACCÈS IMMÉDIAT · 47€ OFFRE LANCEMENT
                         </p>
                     </div>
                 </div>
              </motion.div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
