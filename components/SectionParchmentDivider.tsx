'use client';
import { useId } from 'react';

interface SectionParchmentDividerProps {
  /** 'olympus' : navy → cream (après section navy)
   *  'cream'   : cream → cream avec frise méandre dorée (entre sections claires)
   *  'hero'    : gradient blanc adouci pour sortir du hero (fondu + frise) */
  variant?: 'olympus' | 'cream' | 'hero';
}

/** Séparateur de section — trois variantes selon le contexte de couleur. */
export function SectionParchmentDivider({ variant = 'olympus' }: SectionParchmentDividerProps) {
  const uid = useId().replace(/:/g, '');
  const patternId = `meander-${uid}`;

  if (variant === 'hero') {
    return (
      <div aria-hidden className="relative w-full overflow-hidden" style={{ height: '40px', background: '#FDFBF7' }}>
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 40">
          <defs>
            <pattern id={patternId} x="0" y="0" width="32" height="20" patternUnits="userSpaceOnUse">
              <polyline
                points="0,16 4,16 4,4 12,4 12,16 20,16 20,8 28,8 28,16 32,16"
                fill="none" stroke="#D4A853" strokeWidth="1.2" opacity="0.5"
              />
            </pattern>
          </defs>
          <rect y="10" width="100%" height="20" fill={`url(#${patternId})`} />
          <line x1="0" y1="20" x2="1440" y2="20" stroke="#D4A853" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>
    );
  }

  if (variant === 'cream') {
    return (
      <div aria-hidden className="relative w-full overflow-hidden" style={{ height: '40px' }}>
        <div className="absolute inset-0" style={{ background: '#FDFBF7' }} />
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 40">
          <defs>
            <pattern id={patternId} x="0" y="0" width="32" height="20" patternUnits="userSpaceOnUse">
              <polyline
                points="0,16 4,16 4,4 12,4 12,16 20,16 20,8 28,8 28,16 32,16"
                fill="none" stroke="#D4A853" strokeWidth="1.2" opacity="0.45"
              />
            </pattern>
          </defs>
          <rect y="10" width="100%" height="20" fill={`url(#${patternId})`} />
          <line x1="0" y1="20" x2="1440" y2="20" stroke="#D4A853" strokeWidth="0.5" opacity="0.25" />
        </svg>
      </div>
    );
  }

  return (
    <div aria-hidden className="relative w-full overflow-hidden" style={{ height: '56px' }}>
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #071229 0%, #0D1B3E 35%, #1A3060 58%, #F5E6D0 100%)'
      }} />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 56">
        <defs>
          <pattern id={patternId} x="0" y="0" width="32" height="20" patternUnits="userSpaceOnUse">
            <polyline
              points="0,16 4,16 4,4 12,4 12,16 20,16 20,8 28,8 28,16 32,16"
              fill="none" stroke="#D4A853" strokeWidth="1.4" opacity="0.65"
            />
          </pattern>
        </defs>
        <rect y="8" width="100%" height="20" fill={`url(#${patternId})`} />
        <line x1="0" y1="18" x2="1440" y2="18" stroke="#D4A853" strokeWidth="0.6" opacity="0.3" />
      </svg>
    </div>
  );
}
