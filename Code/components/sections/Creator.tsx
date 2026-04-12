'use client';

import { Youtube, Eye } from 'lucide-react';
import Image from 'next/image';

export function Creator() {
  return (
    <section className="py-24 px-4 md:px-8 text-white" style={{ background: '#1a2d4a', borderTop: '4px solid #d4a017' }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Photo */}
        <div className="w-full md:w-5/12">
          <div
            className="relative rounded-3xl overflow-hidden aspect-square flex items-center justify-center"
            style={{ background: '#f5ecd4', border: '4px solid #d4a017', boxShadow: '8px 8px 0 #d4a017' }}
          >
            <Image src="/chadlogo.jpeg" alt="Maths Ultime" width={400} height={400} className="object-cover w-full h-full" />
            <div
              className="absolute bottom-4 left-4 right-4 p-3 text-center font-black uppercase text-xl"
              style={{ background: '#f5ecd4', border: '4px solid #1a2d4a', boxShadow: '4px 4px 0 #1a2d4a', color: '#1a2d4a', fontFamily: 'var(--font-cinzel)' }}
            >
              Maths Ultime
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="w-full md:w-7/12">
          <h2
            className="text-4xl md:text-6xl font-black uppercase mb-8 tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-cinzel)', color: '#f5ecd4' }}
          >
            <span style={{ whiteSpace:'nowrap', position: 'relative', top: '-0.12em' }}>Pourquoi je suis ton</span>{' '}
            <span style={{ whiteSpace:'nowrap' }}>
              <span
                className="inline-block rotate-[-2deg] px-4 py-1"
                style={{ background: '#EC6426', color: '#fff', border: '4px solid #d4a017', boxShadow: '4px 4px 0 #d4a017' }}
              >meilleur atout</span>&nbsp;?
            </span>
          </h2>

          <div className="space-y-6 text-xl md:text-2xl font-bold mb-12" style={{ color: 'rgba(245,236,212,0.8)', fontFamily: 'var(--font-space)' }}>
            <p>J&apos;étais nul en maths. Je bloquais devant ma copie pendant des heures.</p>
            <p>
              J&apos;ai fini par comprendre que{' '}
              <span style={{ textDecoration: 'underline', textDecorationColor: '#d4a017', textDecorationThickness: '3px' }}>
                le problème venait de l&apos;explication
              </span>
              , pas de mon cerveau.
            </p>
            <p>J&apos;ai créé la méthode visuelle. 5 millions de vues plus tard, voici le programme complet pour structurer tes révisions.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div
              className="flex items-center gap-4 flex-1 p-4"
              style={{ background: '#f5ecd4', border: '4px solid #d4a017', boxShadow: '4px 4px 0 #d4a017' }}
            >
              <Youtube className="w-10 h-10" style={{ color: '#c0392b' }} />
              <div>
                <div className="text-3xl font-black leading-none" style={{ fontFamily: 'var(--font-bebas)', color: '#1a2d4a' }}>100k+</div>
                <div className="text-base font-bold uppercase" style={{ color: 'rgba(26,45,74,0.6)', fontFamily: 'var(--font-space)' }}>Abonnés</div>
              </div>
            </div>

            <div
              className="flex items-center gap-4 flex-1 p-4"
              style={{ background: '#1a2d4a', border: '4px solid #d4a017', boxShadow: '4px 4px 0 #d4a017' }}
            >
              <Eye className="w-10 h-10" style={{ color: '#EC6426' }} />
              <div>
                <div className="text-3xl font-black leading-none" style={{ fontFamily: 'var(--font-bebas)', color: '#f5ecd4' }}>5M+</div>
                <div className="text-base font-bold uppercase" style={{ color: 'rgba(245,236,212,0.6)', fontFamily: 'var(--font-space)' }}>Vues Cumulées</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
