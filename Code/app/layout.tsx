import type {Metadata} from 'next';
import { Space_Grotesk, Inter, Cinzel, Montserrat, Bebas_Neue, Oswald } from 'next/font/google';
import './globals.css'; // Global styles

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '700', '900'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['700', '800', '900'],
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  weight: '400',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['700'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mathsultime.fr';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Maths Ultime | Objectif notes en maths — ChadSciences',
  description:
    'Guide vidéo premium : comprends ton cours avant de l\'apprendre. Méthode visuelle ChadSciences pour le lycée. Offre de lancement 47 € (au lieu de 67 €).',
  openGraph: {
    title: 'Maths Ultime — Guide vidéo ChadSciences',
    description:
      'Méthode visuelle pour le lycée : parcours structuré, vidéos et fiches. Offre de lancement 47 €.',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/chadlogo.jpeg', width: 1200, height: 1200, alt: 'Maths Ultime — ChadSciences' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maths Ultime — ChadSciences',
    description: 'Méthode visuelle pour viser de meilleures notes en maths au lycée.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${inter.variable} ${cinzel.variable} ${montserrat.variable} ${bebasNeue.variable} ${oswald.variable} scroll-smooth`}>
      <body className="antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
