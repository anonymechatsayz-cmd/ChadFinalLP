import Link from 'next/link';
import Image from 'next/image';

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen" style={{ background: '#FDFBF7' }}>
      <header className="relative overflow-hidden py-12 px-4 text-center"
        style={{ background: 'linear-gradient(180deg, #071229 0%, #0d1b3e 100%)', borderBottom: '3px solid rgba(212,168,83,0.4)' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:'linear-gradient(90deg,transparent,#e8c96a 30%,#EC6426 50%,#e8c96a 70%,transparent)' }} />
        <div className="flex justify-center items-center gap-3 mb-4">
          <Image src="/chadlogo.jpeg" alt="Maths Ultime" width={32} height={32} className="rounded-full" style={{ border:'1px solid rgba(212,168,83,0.4)' }} />
        </div>
        <h1 style={{ fontFamily:'var(--font-cinzel)', fontWeight:900, fontSize:'clamp(22px,4vw,42px)', color:'#f5ecd4', textTransform:'uppercase', letterSpacing:'.08em' }}>
          Mentions Légales
        </h1>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-16">
        <p className="mb-6" style={{ fontFamily:'var(--font-space)', fontSize:16, color:'rgba(26,45,74,0.65)', fontWeight:500, lineHeight:1.7 }}>
          Page à compléter avec les informations légales du client (éditeur, hébergeur, contact, numéros d&apos;identification, etc.).
        </p>
        <Link href="/" style={{ fontFamily:'var(--font-cinzel)', fontWeight:700, color:'#EC6426', fontSize:14, letterSpacing:'.08em', textTransform:'uppercase' }}>
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
