'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Play } from 'lucide-react';

const STORAGE_KEY = 'mu_guide_submitted';
const API_ENDPOINT = '/api/send-mail';

type Status = 'idle' | 'loading' | 'success' | 'error';

const CLASSES = ['2nde', '1ère', 'Terminale', 'BTS / CPGE', 'Autre'];

export function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [classe, setClasse] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Déclenché uniquement via l'événement custom (bouton "Obtenir gratuitement")
  useEffect(() => {
    const handler = () => {
      if (localStorage.getItem(STORAGE_KEY) !== 'true') setIsOpen(true);
    };
    window.addEventListener('mu:open-popup', handler);
    return () => window.removeEventListener('mu:open-popup', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  function handleClose() { setIsOpen(false); }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) handleClose();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedNom    = nom.trim();
    const trimmedPrenom = prenom.trim();
    const trimmedEmail  = email.trim();

    if (!trimmedNom || !trimmedPrenom || !trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus('error');
      setErrorMessage('Merci de renseigner ton nom, prénom et un email valide.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: trimmedNom, prenom: trimmedPrenom, email: trimmedEmail, telephone: telephone.trim(), classe }),
      });

      const data = await res.json().catch(() => ({})) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) throw new Error(data.message ?? `Erreur ${res.status}`);

      localStorage.setItem(STORAGE_KEY, 'true');
      setStatus('success');
      closeTimerRef.current = setTimeout(() => setIsOpen(false), 3500);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue. Réessaie.');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    border: '2px solid rgba(212,168,83,0.35)',
    borderRadius: 10,
    padding: '10px 14px',
    fontFamily: 'var(--font-baloo)',
    fontSize: 14,
    background: 'rgba(253,251,247,0.6)',
    color: '#1A1A1A',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="popup-backdrop"
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(7,18,41,0.82)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
          }}
        >
          <motion.div
            key="popup-card"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 460,
              background: 'linear-gradient(160deg, #ede5da 0%, #d8ccbc 35%, #e8ddd0 70%, #cfc3b4 100%)',
              border: '3px solid #d4a017',
              borderRadius: 20,
              boxShadow: '8px 8px 0 rgba(42,30,18,0.45), 0 24px 60px rgba(7,18,41,0.4)',
              overflow: 'hidden',
            }}
          >
            {/* Déco grecque */}
            <span style={{ position: 'absolute', top: 10, left: 14, fontSize: 40, fontFamily: 'serif', color: '#D4A853', opacity: 0.12, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>Σ</span>
            <span style={{ position: 'absolute', bottom: 10, right: 14, fontSize: 40, fontFamily: 'serif', color: '#D4A853', opacity: 0.12, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>Ω</span>

            {/* Bouton fermer */}
            <button
              onClick={handleClose}
              aria-label="Fermer"
              onMouseEnter={e => { (e.currentTarget.querySelector('svg') as SVGElement).style.color = '#EC6426'; }}
              onMouseLeave={e => { (e.currentTarget.querySelector('svg') as SVGElement).style.color = '#2a1e12'; }}
              style={{
                position: 'absolute', top: 12, right: 12,
                background: 'none', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', padding: 4,
              }}
            >
              <X size={16} strokeWidth={2.5} style={{ color: '#2a1e12', transition: 'color 0.15s' }} />
            </button>

            {/* Frise dorée haut */}
            <div style={{ height: 4, background: 'linear-gradient(90deg, #D4A853 0%, #F5C842 50%, #D4A853 100%)' }} />

            <div style={{ padding: 'clamp(20px,4vw,28px) clamp(20px,4vw,32px)' }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '12px 0' }}>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle size={52} color="#EC6426" strokeWidth={1.6} style={{ margin: '0 auto 14px' }} />
                  </motion.div>
                  <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 20, fontWeight: 700, color: '#2a1e12', margin: '0 0 10px' }}>
                    Ta vidéo est en route !
                  </h2>
                  <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 14, color: '#5a4e3e', margin: 0, lineHeight: 1.6 }}>
                    Vérifie ta boîte e-mail dans quelques secondes. 📬<br />
                    <span style={{ fontSize: 12, opacity: 0.7 }}>(Pense à vérifier les spams !)</span>
                  </p>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div style={{ textAlign: 'center', marginBottom: 18 }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      background: 'linear-gradient(135deg,#FF8040,#EC6426)',
                      borderRadius: 20, padding: '4px 14px', marginBottom: 10,
                    }}>
                      <Play size={12} color="#fff" fill="#fff" />
                      <span style={{ fontFamily: 'var(--font-baloo)', fontWeight: 700, fontSize: 11, color: '#fff', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                        Vidéo gratuite
                      </span>
                    </div>
                    <h2 style={{
                      fontFamily: 'var(--font-cinzel)',
                      fontSize: 'clamp(16px,3.5vw,20px)',
                      fontWeight: 700,
                      color: '#2a1e12',
                      margin: '0 0 6px',
                      lineHeight: 1.25,
                    }}>
                      Reçois la 1ère vidéo du guide<br />Maths Ultime gratuitement
                    </h2>
                    <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 13, color: '#5a4e3e', margin: 0 }}>
                      Dans ta boîte e-mail en moins d'une minute
                    </p>
                  </div>

                  {/* Frise */}
                  <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#8a7968 30%,#8a7968 70%,transparent)', marginBottom: 16 }} />

                  <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Nom + Prénom */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <input
                        type="text"
                        placeholder="Nom"
                        value={nom}
                        onChange={e => setNom(e.target.value)}
                        disabled={status === 'loading'}
                        autoComplete="family-name"
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#EC6426'; e.target.style.boxShadow = '0 0 0 3px rgba(236,100,38,0.15)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(212,168,83,0.35)'; e.target.style.boxShadow = 'none'; }}
                      />
                      <input
                        type="text"
                        placeholder="Prénom"
                        value={prenom}
                        onChange={e => setPrenom(e.target.value)}
                        disabled={status === 'loading'}
                        autoComplete="given-name"
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#EC6426'; e.target.style.boxShadow = '0 0 0 3px rgba(236,100,38,0.15)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(212,168,83,0.35)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {/* Email */}
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={status === 'loading'}
                      autoComplete="email"
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#EC6426'; e.target.style.boxShadow = '0 0 0 3px rgba(236,100,38,0.15)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(212,168,83,0.35)'; e.target.style.boxShadow = 'none'; }}
                    />

                    {/* Téléphone */}
                    <input
                      type="tel"
                      placeholder="06 12 34 56 78 (facultatif)"
                      value={telephone}
                      onChange={e => setTelephone(e.target.value)}
                      disabled={status === 'loading'}
                      autoComplete="tel"
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#EC6426'; e.target.style.boxShadow = '0 0 0 3px rgba(236,100,38,0.15)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(212,168,83,0.35)'; e.target.style.boxShadow = 'none'; }}
                    />

                    {/* Classe */}
                    <select
                      value={classe}
                      onChange={e => setClasse(e.target.value)}
                      disabled={status === 'loading'}
                      style={{
                        ...inputStyle,
                        color: classe ? '#1A1A1A' : '#888',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238a7968' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                        paddingRight: 36,
                      }}
                      onFocus={e => { e.target.style.borderColor = '#EC6426'; e.target.style.boxShadow = '0 0 0 3px rgba(236,100,38,0.15)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(212,168,83,0.35)'; e.target.style.boxShadow = 'none'; }}
                    >
                      <option value="" disabled>Ta classe l'an prochain</option>
                      {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>

                    {/* Erreur */}
                    {status === 'error' && errorMessage && (
                      <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 12, color: '#c0392b', margin: 0, padding: '6px 10px', background: 'rgba(192,57,43,0.08)', border: '1.5px solid rgba(192,57,43,0.25)', borderRadius: 8 }}>
                        ⚠️ {errorMessage}
                      </p>
                    )}

                    {/* Bouton submit */}
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={status !== 'loading' ? { y: 2, boxShadow: '4px 4px 0 rgba(42,30,18,0.5)' } : {}}
                      whileTap={status !== 'loading' ? { y: 4, boxShadow: '2px 2px 0 rgba(42,30,18,0.5)' } : {}}
                      style={{
                        width: '100%',
                        padding: '13px 20px',
                        background: status === 'loading' ? '#b5a898' : 'linear-gradient(165deg,#FF8040 0%,#EC6426 45%,#E04A10 100%)',
                        border: '3px solid #2a1e12',
                        borderRadius: 12,
                        boxShadow: '6px 6px 0 rgba(42,30,18,0.45)',
                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        fontFamily: 'var(--font-baloo)',
                        fontSize: 15,
                        fontWeight: 900,
                        color: '#fff',
                        textTransform: 'uppercase',
                        letterSpacing: '.05em',
                        marginTop: 2,
                      }}
                    >
                      {status === 'loading' ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                            style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                          />
                          Envoi en cours…
                        </span>
                      ) : (
                        '🎬 Recevoir la vidéo gratuite'
                      )}
                    </motion.button>
                  </form>

                  {/* Legal */}
                  <p style={{ fontFamily: 'var(--font-baloo)', fontSize: 10, color: 'rgba(42,30,18,0.45)', textAlign: 'center', margin: '10px 0 0', lineHeight: 1.5 }}>
                    Vos données sont traitées pour vous envoyer la vidéo.{' '}
                    <a href="/mentions-legales" style={{ color: 'rgba(42,30,18,0.6)', textDecoration: 'underline' }}>Confidentialité</a>
                  </p>
                </>
              )}
            </div>

            {/* Frise dorée bas */}
            <div style={{ height: 4, background: 'linear-gradient(90deg, #D4A853 0%, #F5C842 50%, #D4A853 100%)' }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
