'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { GreekCTA } from '@/components/ui';
import { useState, useEffect } from 'react';
import { offerConfig } from '@/lib/offer';

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden text-white py-14 px-4 md:px-8 text-center"
      style={{ background: 'linear-gradient(180deg, #071229 0%, #050b1a 100%)', borderTop: '4px solid #1a2d4a' }}>
      {/* Symboles grecs très subtils */}
      {(['Σ','Ω'].map((s, i) => (
        <span key={i} className="absolute select-none pointer-events-none"
          style={{ top: i===0?'20%':'55%', left: i===0?'3%':'91%', fontSize:40, opacity:0.06, color:'#e8c96a', fontFamily:'var(--font-cinzel)', fontWeight:700, transform:`rotate(${i===0?-15:18}deg)`, textShadow: '0 0 10px rgba(232,201,106,0.2)' }}>
          {s}
        </span>
      )))}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Logo + nom */}
        <div className="flex justify-center items-center gap-3 mb-4">
          <Image src="/chadlogo.jpeg" alt="Maths Ultime Logo" width={36} height={36} className="rounded-full" style={{ border:'2px solid #d4a017', opacity:0.95 }} />
          <span style={{ fontFamily:'var(--font-cinzel)', fontWeight:900, fontSize:18, color:'#f5ecd4', letterSpacing:'.18em', textTransform:'uppercase' }}>
            Maths Ultime
          </span>
        </div>
        {/* Frise méandre */}
        <div className="flex justify-center mb-6 opacity-20">
          <svg width="160" height="10" viewBox="0 0 160 10" fill="none">
            <polyline points="0,8 5,8 5,2 11,2 11,8 17,8 17,5 23,5 23,8 29,8 29,2 35,2 35,8 41,8 41,5 47,5 47,8 53,8 53,2 59,2 59,8 65,8 65,5 71,5 71,8 77,8 77,2 83,2 83,8 89,8 89,5 95,5 95,8 101,8 101,2 107,2 107,8 113,8 113,5 119,5 119,8 125,8 125,2 131,2 131,8 137,8 137,5 143,5 143,8 149,8 149,2 155,2 155,8 160,8"
              stroke="#e8c96a" strokeWidth="1.2" fill="none" />
          </svg>
        </div>
        {/* Liens */}
        <div className="flex flex-wrap justify-center gap-5 mb-8">
          {[['Mentions légales','/mentions-legales'],['CGV','/cgv'],['Contact','mailto:contact@mathsultime.fr']].map(([label,href])=>(
            <a key={label} href={href} style={{ fontFamily:'var(--font-space)', fontWeight:600, fontSize:12, color:'rgba(245,236,212,0.5)', letterSpacing:'.1em', textTransform:'uppercase' }}
               className="hover:text-[#e8c96a] transition-colors">{label}</a>
          ))}
        </div>
        <p style={{ fontFamily:'var(--font-space)', fontSize:11, color:'rgba(245,236,212,0.2)', fontWeight:500 }}>
          © {new Date().getFullYear()} Maths Ultime · Propriété de ChadSciences · Tous droits réservés
        </p>
      </div>
    </footer>
  );
}

/** Sticky CTA mobile — apparaît après 500px de scroll */
export function StickyMobileCTA() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom = window.scrollY > document.body.scrollHeight - 1000;
      setShowSticky(window.scrollY > 500 && !nearBottom);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showSticky && (
        <motion.div
          initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 p-4 z-50 md:hidden flex justify-center"
          style={{ background: 'rgba(7,18,41,0.98)', backdropFilter: 'blur(12px)', borderTop: '3px solid #d4a017', boxShadow: '0 -10px 30px rgba(0,0,0,0.5)' }}
        >
          <GreekCTA size="md" goldBorder={false} showBadges={false} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
