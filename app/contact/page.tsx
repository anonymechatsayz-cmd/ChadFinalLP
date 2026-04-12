import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ background: '#FDFBF7' }}>
      {/* Header */}
      <header className="relative overflow-hidden py-14 px-4 text-center"
        style={{ background: 'linear-gradient(180deg, #071229 0%, #0d1b3e 100%)', borderBottom: '3px solid rgba(212,168,83,0.4)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,transparent,#e8c96a 30%,#EC6426 50%,#e8c96a 70%,transparent)' }} />
        <div className="flex justify-center mb-4">
          <Image src="/chadlogo.jpeg" alt="Maths Ultime" width={40} height={40} className="rounded-full" style={{ border: '2px solid rgba(212,168,83,0.5)' }} />
        </div>
        <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: 11, letterSpacing: '.25em', color: '#D4A853', textTransform: 'uppercase', marginBottom: 8 }}>
          ★ Maths Ultime ★
        </p>
        <h1 style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 900, fontSize: 'clamp(22px,4vw,42px)', color: '#f5ecd4', textTransform: 'uppercase', letterSpacing: '.06em' }}>
          Contact
        </h1>
        <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 13, color: 'rgba(245,236,212,0.55)', marginTop: 8 }}>
          Une question ? On répond sous 48h.
        </p>
      </header>

      <div className="mx-auto max-w-xl px-5 py-16">

        {/* Card principale */}
        <div style={{
          background: '#fff',
          border: '2px solid rgba(212,168,83,0.3)',
          borderRadius: 18,
          padding: 'clamp(24px,5vw,48px)',
          boxShadow: '0 4px 32px rgba(7,18,41,0.07)',
          marginBottom: 32,
        }}>
          <div className="flex justify-center mb-6">
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(135deg, #EC6426, #ff9a6c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(236,100,38,0.35)',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: 'clamp(15px,2vw,20px)', color: '#071229', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>
            Écrire un email
          </h2>
          <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 15, color: 'rgba(26,45,74,0.65)', textAlign: 'center', lineHeight: 1.7, marginBottom: 24 }}>
            Pour toute question concernant le guide, un accès, une commande ou un remboursement.
          </p>

          <a
            href="mailto:contact@mathsultime.fr"
            style={{
              display: 'block',
              background: 'linear-gradient(135deg, #EC6426, #ff7a3d)',
              color: '#fff',
              fontFamily: 'var(--font-cinzel)',
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              textAlign: 'center',
              textDecoration: 'none',
              padding: '14px 28px',
              borderRadius: 10,
              boxShadow: '0 4px 16px rgba(236,100,38,0.4), 4px 4px 0 rgba(0,0,0,0.15)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
          >
            contact@mathsultime.fr
          </a>
        </div>

        {/* Délai de réponse */}
        <div style={{
          background: 'rgba(212,168,83,0.08)',
          border: '1.5px solid rgba(212,168,83,0.25)',
          borderRadius: 12,
          padding: '16px 20px',
          marginBottom: 32,
        }}>
          <div className="flex gap-3 items-start">
            <span style={{ fontSize: 20 }}>⏱</span>
            <div>
              <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 14, color: '#071229', marginBottom: 4 }}>
                Délai de réponse
              </p>
              <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 14, color: 'rgba(26,45,74,0.65)', lineHeight: 1.6 }}>
                Nous répondons sous <strong>48h ouvrées</strong>, du lundi au vendredi. Pensez à vérifier vos spams si vous ne recevez pas de réponse.
              </p>
            </div>
          </div>
        </div>

        {/* Sujets fréquents */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: 12, color: '#071229', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 14 }}>
            Sujets fréquents
          </p>
          {[
            { emoji: '🔑', titre: 'Problème d\'accès au contenu', desc: 'Mentionnez l\'email utilisé lors de l\'achat.' },
            { emoji: '💳', titre: 'Remboursement', desc: 'Garantie satisfait ou remboursé 14 jours. Indiquez votre numéro de commande.' },
            { emoji: '📚', titre: 'Question sur le contenu', desc: 'Précisez le module ou la notion concernée.' },
            { emoji: '🤝', titre: 'Partenariat', desc: 'Indiquez votre projet et vos coordonnées.' },
          ].map(({ emoji, titre, desc }) => (
            <div key={titre} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
              <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>{emoji}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 14, color: '#071229', marginBottom: 2 }}>{titre}</p>
                <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 13, color: 'rgba(26,45,74,0.6)', lineHeight: 1.5 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* YouTube */}
        <div style={{
          background: 'rgba(255,0,0,0.04)',
          border: '1.5px solid rgba(255,0,0,0.15)',
          borderRadius: 12,
          padding: '16px 20px',
          marginBottom: 40,
        }}>
          <div className="flex gap-3 items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF0000">
              <path d="M23.5 6.2a3.01 3.01 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3.01 3.01 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3.01 3.01 0 0 0 2.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.5a3.01 3.01 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
            </svg>
            <div>
              <p style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 14, color: '#071229', marginBottom: 2 }}>
                Suivre sur YouTube
              </p>
              <a href="https://www.youtube.com/@ChadSciences" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-baloo)', fontSize: 13, color: '#EC6426', textDecoration: 'none' }}>
                youtube.com/@ChadSciences
              </a>
            </div>
          </div>
        </div>

        <Link href="/" style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, color: '#EC6426', fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase' }}>
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
