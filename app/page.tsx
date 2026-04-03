import { HeroCartoon } from '@/components/sections/HeroCartoon';
import { Timeline } from '@/components/sections/Timeline';
import { Problem } from '@/components/sections/Problem';
import { Testimonials } from '@/components/sections/Testimonials';
import { Creator } from '@/components/sections/Creator';
import { ParentsMessage } from '@/components/sections/ParentsMessage';
import { PricingSection, FAQSection } from '@/components/sections/PricingFAQ';
import { SiteFooter, StickyMobileCTA } from '@/components/sections/CTA';
import { SectionParchmentDivider } from '@/components/SectionParchmentDivider';
import { MidPageCta } from '@/components/MidPageCta';

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#FDFBF7] text-[#1A1A1A] selection:bg-[#EC6426] selection:text-white">
      <HeroCartoon />
      <Timeline />
      {/* Timeline (#d4e8f5) → Testimonials (#FDFBF7) : légère transition cream */}
      <SectionParchmentDivider variant="cream" />
      <Testimonials />
      {/* cream → cream */}
      <SectionParchmentDivider variant="cream" />
      <Problem />
      {/* cream → Creator navy : pas de divider, Creator a son propre border-top */}
      <Creator />
      <MidPageCta />
      {/* cream → cream */}
      <SectionParchmentDivider variant="cream" />
      <ParentsMessage />
      {/* cream → Pricing : aura son propre border */}
      <SectionParchmentDivider variant="cream" />
      <PricingSection />
      <FAQSection />
      <SiteFooter />
      <StickyMobileCTA />
    </main>
  );
}
