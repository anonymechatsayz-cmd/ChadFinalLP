'use client';

import { ShieldCheck, Lock, Zap } from 'lucide-react';
import { GreekCTA } from '@/components/ui';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { faqItems, offerConfig } from '@/lib/offer';

// ─── Icônes SVG programme (aucun emoji) ─────────────────────────────────────
const IconVideo = () => (
  <svg viewBox="0 0 22 22" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="13" height="13" rx="2"/><polygon points="15,7 20,5 20,15 15,13"/>
  </svg>
);
const IconPDF = () => (
  <svg viewBox="0 0 22 22" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z"/><polyline points="13,2 13,8 19,8"/>
    <line x1="7" y1="13" x2="15" y2="13"/><line x1="7" y1="17" x2="11" y2="17"/>
  </svg>
);
const IconPath = () => (
  <svg viewBox="0 0 22 22" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="11" r="2"/><circle cx="17" cy="5" r="2"/><circle cx="17" cy="17" r="2"/>
    <line x1="7" y1="10" x2="15" y2="6"/><line x1="7" y1="12" x2="15" y2="16"/>
  </svg>
);
const IconInfinity = () => (
  <svg viewBox="0 0 22 22" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M11 11c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4z"/>
    <path d="M11 11c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z"/>
  </svg>
);
const IconRefresh = () => (
  <svg viewBox="0 0 22 22" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1,4 1,10 7,10"/>
    <path d="M3.5 15a8 8 0 1 0 .5-4"/>
  </svg>
);

const PROGRAMME = [
  { Icon: IconVideo,    label: 'Guide Vidéo Complet',          desc: '+300h de conception condensées en modules courts et progressifs.' },
  { Icon: IconPDF,      label: 'Fiches PDF récapitulatives',    desc: 'Ressources téléchargeables pour réviser chaque notion en 5 min.' },
  { Icon: IconPath,     label: 'Parcours structuré lycée',       desc: 'Programme réorganisé par logique de compréhension, pas par chapitre.' },
  { Icon: IconInfinity, label: 'Accès à vie',                   desc: 'Disponible sur tous tes supports, pour toujours.' },
  { Icon: IconRefresh,  label: 'Mises à jour futures incluses', desc: 'Nouvelles leçons intégrées sans frais supplémentaire.' },
];

// ─── FAQ ────────────────────────────────────────────────────────────────────
function FAQItem({ faq }: { faq: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background:'linear-gradient(160deg,#ede5da 0%,#d8ccbc 40%,#e8ddd0 70%,#cfc3b4 100%)', border:'2px solid #8a7968', borderRadius:10, boxShadow: open ? '4px 4px 0 #5a4e3e' : '3px 3px 0 #5a4e3e', overflow:'hidden' }}>
      <button onClick={() => setOpen(!open)} className="w-full text-left flex justify-between items-center outline-none" style={{ padding:'clamp(14px,1.5vw,18px) clamp(16px,2vw,22px)', gap:16 }}>
        <span style={{ fontFamily:'var(--font-cinzel)', fontWeight:700, fontSize:'clamp(13px,1.1vw,15px)', color:'#2a1e12', letterSpacing:'.02em' }}>{faq.q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} style={{ color:'#d4a017', fontSize:22, fontFamily:'var(--font-cinzel)', flexShrink:0 }}>+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} className="overflow-hidden">
            <div style={{ padding:'0 clamp(16px,2vw,22px) clamp(14px,1.5vw,18px)', borderTop:'1px solid rgba(138,121,104,0.4)' }}>
              <p style={{ fontFamily:'var(--font-space)', fontSize:'clamp(13px,1vw,15px)', color:'rgba(42,30,18,0.68)', lineHeight:1.65, fontWeight:500, marginTop:12 }}>{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
/** Arsenal pricing section only — without FAQ */
export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 px-4 md:px-8"
        style={{ background:'linear-gradient(180deg,#071229 0%,#0a1628 45%,#0d1b3e 80%,#071229 100%)' }}>

        {/* Ligne dorée haut */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,transparent,#e8c96a 30%,#EC6426 50%,#e8c96a 70%,transparent)' }} />

        {/* Symboles grecs */}
        {[{s:'Σ',t:6,l:3,sz:52,r:-12},{s:'Ω',t:74,l:2,sz:40,r:18},{s:'Δ',t:8,l:92,sz:46,r:8},{s:'π',t:78,l:89,sz:36,r:-20}].map((m,i) => (
          <span key={i} className="absolute select-none pointer-events-none" style={{ top:`${m.t}%`, left:`${m.l}%`, fontSize:m.sz, opacity:0.06, color:'#e8c96a', transform:`rotate(${m.r}deg)`, fontFamily:'var(--font-cinzel)', fontWeight:700 }}>{m.s}</span>
        ))}

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Titre */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center mb-14">
            <p style={{ fontFamily:'var(--font-montserrat)', fontWeight:800, fontSize:10, color:'#EC6426', letterSpacing:'.2em', textTransform:'uppercase', marginBottom:10 }}>Accès complet · Paiement unique</p>
            <h2 style={{ fontFamily:'var(--font-cinzel)', fontWeight:900, fontSize:'clamp(28px,5vw,64px)', color:'#f5ecd4', textTransform:'uppercase', lineHeight:1.05, textShadow:'0 4px 30px rgba(0,0,0,0.3)' }}>L'Arsenal Complet</h2>
          </motion.div>

          {/* ── SPLIT CARD 60/40 ── */}
          <motion.div initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
            className="flex flex-col lg:flex-row rounded-2xl overflow-hidden"
            style={{ border:'2px solid rgba(212,168,83,0.35)', boxShadow:'0 0 0 1px rgba(212,168,83,0.1), 0 40px 100px rgba(7,18,41,0.6)' }}>

            {/* LEFT 60% — Programme */}
            <div className="flex-[3]" style={{ background:'linear-gradient(160deg,#ede5da 0%,#d8ccbc 35%,#e8ddd0 70%,#cfc3b4 100%)', padding:'clamp(28px,3.5vw,48px)' }}>
              <div style={{ borderBottom:'1px solid rgba(138,121,104,0.45)', paddingBottom:16, marginBottom:24 }}>
                <p style={{ fontFamily:'var(--font-montserrat)', fontWeight:800, fontSize:10, color:'#2a1e12', opacity:0.6, letterSpacing:'.18em', textTransform:'uppercase', marginBottom:6 }}>Ce que tu obtiens</p>
                <h3 style={{ fontFamily:'var(--font-cinzel)', fontWeight:900, fontSize:'clamp(16px,1.8vw,22px)', color:'#2a1e12', textTransform:'uppercase' }}>Le Programme Maths Ultime</h3>
              </div>
              <ul className="flex flex-col gap-4">
                {PROGRAMME.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 px-3 py-2.5 rounded-lg"
                    style={{ background:'rgba(236,100,38,0.04)', borderLeft:'3px solid #EC6426' }}>
                    <div className="shrink-0 flex items-center justify-center rounded-full mt-0.5"
                      style={{ width:34, height:34, background:'linear-gradient(135deg,#1a2d4a 0%,#0d1b3e 100%)', border:'1.5px solid #EC6426', color:'#ffffff' }}>
                      <item.Icon />
                    </div>
                    <div>
                      <p style={{ fontFamily:'var(--font-cinzel)', fontWeight:700, fontSize:'clamp(13px,1.1vw,15px)', color:'#1a2d4a', marginBottom:2 }}>{item.label}</p>
                      <p style={{ fontFamily:'var(--font-space)', fontSize:'clamp(12px,0.9vw,13px)', color:'rgba(42,30,18,0.58)', fontWeight:500, lineHeight:1.5 }}>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT 40% — Stèle de prix */}
            <div className="flex-[2] flex flex-col items-center justify-center"
              style={{ background: 'linear-gradient(165deg, #1a2d4a 0%, #071229 100%)', padding: 'clamp(24px,3vw,40px)', borderLeft: '2px solid rgba(212,168,83,0.25)' }}>

              {/* Titre d'accroche */}
              <h3 className="mb-6 text-center" style={{ fontFamily:'var(--font-cinzel)', fontWeight:900, fontSize:'clamp(18px, 2vw, 26px)', color:'#f5ecd4', textTransform:'uppercase', lineHeight:1.2, letterSpacing:'.02em' }}>
                Tout ce dont tu as besoin pour réussir en maths
              </h3>

              {/* STÈLE MARBRE — container prix premium */}
              <div className="w-full relative" style={{
                background:'linear-gradient(160deg,#ede5da 0%,#d8ccbc 35%,#e8ddd0 70%,#cfc3b4 100%)',
                border:'2.5px solid #8a7968',
                borderRadius:14,
                boxShadow:'6px 6px 0 #3d3328, inset 0 1px 0 rgba(255,255,255,0.5)',
                padding:'clamp(20px,2.5vw,32px) clamp(16px,2vw,28px)',
                textAlign:'center',
              }}>
                {/* Badge remise — collé en haut à droite */}
                <div className="absolute -top-3 -right-3 rotate-[6deg]"
                  style={{ background:'#EC6426', border:'2px solid #2a1e12', borderRadius:6, padding:'4px 10px', boxShadow:'2px 2px 0 #2a1e12' }}>
                  <span style={{ fontFamily:'var(--font-montserrat)', fontWeight:900, fontSize:11, color:'#fff', letterSpacing:'.06em' }}>-{offerConfig.discountPercent}%</span>
                </div>

                {/* Frise haut */}
                <div style={{ width:'100%', height:1, background:'linear-gradient(90deg,transparent,#8a7968 30%,#8a7968 70%,transparent)', marginBottom:14 }} />

                {/* Prix barré */}
                <p style={{ fontFamily:'var(--font-cinzel)', fontWeight:600, fontSize:14, color:'rgba(42,30,18,0.35)', textDecoration:'line-through', marginBottom:2 }}>
                  {offerConfig.regularPrice}€
                </p>

                {/* Prix principal — Cinzel massif */}
                <p style={{
                  fontFamily:'var(--font-cinzel)', fontWeight:900,
                  fontSize:'clamp(52px,5.5vw,72px)', color:'#2a1e12',
                  lineHeight:1, letterSpacing:'.02em',
                  textShadow:'0 2px 0 rgba(255,255,255,0.6), 0 -1px 0 rgba(0,0,0,0.1)',
                  marginBottom:4,
                }}>
                  {offerConfig.launchPrice}€
                </p>

                {/* Réassurance */}
                <p style={{ fontFamily:'var(--font-space)', fontSize:11, color:'rgba(42,30,18,0.5)', fontWeight:500, lineHeight:1.5, marginBottom:16 }}>
                  Soit le prix d&apos;1h30 de cours particulier…
                </p>

                {/* Frise bas */}
                <div style={{ width:'100%', height:1, background:'linear-gradient(90deg,transparent,#8a7968 30%,#8a7968 70%,transparent)', marginBottom:16 }} />

                {/* CTA */}
                <GreekCTA size="md" goldBorder={false} showBadges={false} />

                {/* Trust row */}
                <div className="flex items-center justify-center gap-3 flex-wrap mt-4">
                  {[
                    { icon:ShieldCheck, label:`Garantie ${offerConfig.guaranteeDays}j` },
                    { icon:Lock,        label:'Paiement sécurisé' },
                  ].map((b,i) => (
                    <div key={i} className="flex items-center gap-1">
                      <b.icon className="w-3 h-3" style={{ color:'rgba(42,30,18,0.45)' }} />
                      <span style={{ fontFamily:'var(--font-space)', fontWeight:600, fontSize:10, color:'rgba(42,30,18,0.45)', letterSpacing:'.06em' }}>{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
    </section>
  );
}

/** FAQ section — to be placed after CTANavy */
export function FAQSection() {
  const faqSchema = { '@context':'https://schema.org', '@type':'FAQPage', mainEntity: faqItems.map(f => ({ '@type':'Question', name:f.q, acceptedAnswer:{ '@type':'Answer', text:f.a } })) };
  return (
    <>
      <section className="py-20 px-4 md:px-8 relative overflow-hidden"
        style={{ background:'linear-gradient(180deg,#FFF8F0 0%,#FDFBF7 60%,#F0E6D4 100%)', borderTop:'3px solid rgba(212,168,83,0.3)' }}>
        {[{s:'Φ',t:5,l:2,sz:32,r:-10},{s:'Λ',t:80,l:94,sz:28,r:15}].map((m,i) => (
          <span key={i} className="absolute select-none pointer-events-none" style={{ top:`${m.t}%`, left:`${m.l}%`, fontSize:m.sz, opacity:0.06, color:'#1a2d4a', transform:`rotate(${m.r}deg)`, fontFamily:'var(--font-cinzel)', fontWeight:700 }}>{m.s}</span>
        ))}
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }}
            className="text-center mb-12" style={{ fontFamily:'var(--font-cinzel)', fontWeight:900, fontSize:'clamp(24px,4vw,52px)', color:'#1a2d4a', textTransform:'uppercase', lineHeight:1.1 }}>
            Tu hésites encore&nbsp;?
          </motion.h2>
          <div className="flex flex-col gap-3">
            {faqItems.map((faq, i) => (
              <motion.div key={i} initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.35, delay:i*0.07 }}>
                <FAQItem faq={faq} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

/** @deprecated Use PricingSection + FAQSection separately */
export function PricingFAQ() {
  return (
    <>
      <PricingSection />
      <FAQSection />
    </>
  );
}
