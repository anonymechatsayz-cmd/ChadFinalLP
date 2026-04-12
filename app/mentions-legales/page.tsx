import Link from 'next/link';
import Image from 'next/image';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 style={{
      fontFamily: 'var(--font-cinzel)', fontWeight: 700,
      fontSize: 'clamp(13px, 1.5vw, 17px)', color: '#071229',
      textTransform: 'uppercase', letterSpacing: '.1em',
      borderBottom: '2px solid rgba(212,168,83,0.35)',
      paddingBottom: 8, marginBottom: 16,
    }}>
      {title}
    </h2>
    <div style={{ fontFamily: 'var(--font-baloo)', fontSize: 15, color: '#2a3a55', lineHeight: 1.8, fontWeight: 500 }}>
      {children}
    </div>
  </section>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3">{children}</p>
);

export default function MentionsLegalesPage() {
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
          Mentions Légales
        </h1>
        <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 13, color: 'rgba(245,236,212,0.55)', marginTop: 8 }}>
          Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique
        </p>
      </header>

      <div className="mx-auto max-w-2xl px-5 py-14">

        <Section title="Éditeur du site">
          <P>Le site est édité par :</P>
          <ul className="list-none space-y-1 mb-3" style={{ paddingLeft: 16 }}>
            <li>• <strong>Dénomination sociale :</strong> ChadScience</li>
            <li>• <strong>Forme juridique :</strong> Entreprise individuelle (micro-entreprise)</li>
            <li>• <strong>SIREN :</strong> XXX</li>
            <li>• <strong>SIRET :</strong> XXX</li>
            <li>• <strong>TVA :</strong> Non applicable, article 293 B du Code général des impôts (franchise en base de TVA)</li>
            <li>• <strong>Siège social :</strong> 327 Route de la Vallée, 49150 Baugé-en-Anjou – France</li>
            <li>• <strong>Adresse email de contact :</strong> <a href="mailto:support@bonzai.pro" style={{ color: '#EC6426' }}>support@bonzai.pro</a></li>
          </ul>
        </Section>

        <Section title="Directeur de la publication">
          <P><strong>Nom :</strong> Lou Dolbeau</P>
          <P><strong>Qualité :</strong> Entrepreneur individuel, exploitant de la micro-entreprise ChadScience</P>
        </Section>

        <Section title="Hébergement">
          <P>Le site est hébergé par :</P>
          <ul className="list-none space-y-1 mb-3" style={{ paddingLeft: 16 }}>
            <li>• <strong>Société :</strong> Vercel Inc.</li>
            <li>• <strong>Adresse :</strong> 440 N Barranca Avenue #4133, Covina, CA 91723 – États-Unis</li>
            <li>• <strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: '#EC6426' }}>vercel.com</a></li>
          </ul>
        </Section>

        <Section title="Propriété intellectuelle">
          <P>L&apos;ensemble du contenu présent sur ce site (textes, vidéos, images, graphismes, logos, marques, contenus pédagogiques, exercices, cours, supports de formation, plateformes, etc.), et notamment l&apos;ensemble des éléments composant le produit MATHS ULTIME, est la propriété exclusive de l&apos;entreprise ChadScience, sauf mention contraire.</P>
          <P>Toute reproduction, représentation, modification, publication, adaptation ou exploitation, totale ou partielle, de ces éléments, par quelque procédé que ce soit, sans autorisation écrite préalable de l&apos;entreprise ChadScience, est strictement interdite.</P>
          <P>Le non-respect de cette interdiction constitue une contrefaçon susceptible d&apos;engager la responsabilité civile et pénale de son auteur.</P>
        </Section>

        <Section title="Responsabilité">
          <P>Les informations diffusées sur ce site sont fournies à titre indicatif. L&apos;entreprise ChadScience s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations publiées, mais ne saurait garantir leur exactitude, exhaustivité ou actualité.</P>
          <P>L&apos;entreprise ChadScience décline toute responsabilité :</P>
          <ul className="list-none space-y-1 mb-3" style={{ paddingLeft: 16 }}>
            <li>• En cas d&apos;erreurs ou omissions</li>
            <li>• En cas d&apos;indisponibilité temporaire du site</li>
            <li>• Pour tout dommage résultant de l&apos;utilisation des informations disponibles</li>
          </ul>
        </Section>

        <Section title="Liens hypertextes">
          <P>Le site peut contenir des liens hypertextes vers des sites tiers. L&apos;entreprise ChadScience n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, fonctionnement ou disponibilité.</P>
          <P>La création de liens hypertextes vers le présent site est soumise à l&apos;autorisation préalable écrite de l&apos;entreprise ChadScience.</P>
        </Section>

        <Section title="Droit applicable">
          <P>Les présentes mentions légales sont soumises au droit français.</P>
          <P>En cas de litige, les tribunaux français seront seuls compétents.</P>
        </Section>

        <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 12, color: 'rgba(26,45,74,0.45)', marginBottom: 8 }}>
          Dernière mise à jour : Avril 2026
        </p>
        <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 12, color: 'rgba(26,45,74,0.45)', marginBottom: 24 }}>
          © ChadScience – Tous droits réservés
        </p>

        <Link href="/" style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, color: '#EC6426', fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase' }}>
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
