# Lessons Learned

> Format : [date] | ce qui a mal tourné | règle pour l'éviter

<!-- Les leçons seront ajoutées ici au fil du temps -->

[2026-04-24] | Calcul VSL HeroCartoon — ne jamais modifier les constantes ZONE_* ni le calcul compute() sans d'abord vérifier la version de référence "ChadFinalLP-main version avec interface youtube fonctionnelle". Le `fixedH` anti-saut mobile cassait le calcul sur PC. La version correcte utilise `window.innerHeight` directement à chaque appel de compute(), sans rien geler. ZONE_TOP_PX=850/2233, ZONE_H_PX=580/2233, ZONE_W_PX=1120/4000, SCALE=1.20, T_FRAC=0.44, calcul width-first (zoneW puis zoneH=zoneW*9/16).
