'use client';

import { useState, useRef, useCallback } from 'react';

export function useTapHover() {
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  hoveredRef.current = hovered;
  const cleanupRef = useRef<(() => void) | null>(null);

  // Callback ref : s'exécute synchronement quand React monte/démonte le nœud DOM.
  // Attache le listener immédiatement — pas de problème de timing avec useEffect.
  const ref = useCallback((el: HTMLElement | null) => {
    // Cleanup du nœud précédent
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    if (!el) return;

    const onDocClick = (e: MouseEvent) => {
      if (e.detail === 0) return; // click synthétique → ignorer
      if (el.contains(e.target as Node)) {
        setHovered(true);
      } else {
        if (hoveredRef.current) setHovered(false);
      }
    };

    document.addEventListener('click', onDocClick);
    cleanupRef.current = () => document.removeEventListener('click', onDocClick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onPointerEnter = () => setHovered(true);
  const onPointerLeave = () => setHovered(false);

  return { hovered, ref, onPointerEnter, onPointerLeave };
}
