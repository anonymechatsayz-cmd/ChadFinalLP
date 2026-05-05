'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle } from 'lucide-react';

const STORAGE_KEY = 'mu_guide_submitted';
const API_ENDPOINT = '/api/send-mail';

type Status = 'idle' | 'loading' | 'success' | 'error';

const CLASSES = [
  '2nde',
  '1ère',
  'Terminale',
  'BTS / CPGE',
  'Autre',
];

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

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORAGE_KEY) === 'true') return;
    const timer = setTimeout(() => setIsOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = () => setIsOpen(true);
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

  function handleClose() {
    setIsOpen(false);
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) handleClose();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedNom    = nom.trim();
    const trimmedPrenom = prenom.trim();
    const trimmedEmail  = email.trim();
    const emailRegex    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedNom || !trimmedPrenom || !trimmedEmail || !emailRegex.test(trimmedEmail)) {
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
        body: JSON.stringify({
          nom: trimmedNom,
          prenom: trimmedPrenom,
          email: trimmedEmail,
          telephone: telephone.trim(),
          classe,
        }),
      });

      const data = await res.json().catch(() => ({})) as { success?: boolean; message?: string };

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? `Erreur ${res.status}`);
      }

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
    border: '1.5px solid #D1C9BE',
    borderRadius: 12,
    padding: '13px 16px',
    fontFamily: 'var(--font-baloo)',
    fontSize: 15,
    background: '#fff',
    color: '#1A1A1A',
    outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-baloo)',
    fontSize: 12,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '.07em',
    color: '#1A1A1A',
    marginBottom: 5,
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
          transition={{ duration: 0.22 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(7, 18, 41, 0.72)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <motion.div
            key="popup-card"
            initial={{ opacity: 0, scale: 0.93, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 28 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            style={{
              position: 'relative',
              background: '#ffffff',
              borderRadius: 20,
              boxShadow: '0 24px 80px rgba(7,18,41,0.35)',
              padding: 'clamp(28px, 5vw, 44px) clamp(24px, 5vw, 40px)',
              width: '100%',
              maxWidth: 480,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Bouton fermer */}
            <button
              onClick={handleClose}
              aria-label="Fermer"
              style={{
                position: 'absolute', top: 16, right: 16,
                background: 'none', border: 'none',
                cursor: 'pointer', color: '#888',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 4,
              }}
            >
              <X size={20} strokeWidth={2} />
            </button>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <CheckCircle size={60} color="#EC6426" strokeWidth={1.6} style={{ margin: '0 auto 20px' }} />
                </motion.div>
                <h2 style={{
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: 'clamp(18px, 4vw, 22px)',
                  fontWeight: 700,
                  color: '#1A1A1A',
                  margin: '0 0 12px',
                }}>
                  Ton guide vidéo est en route !
                </h2>
                <p style={{
                  fontFamily: 'var(--font-baloo)',
                  fontSize: 15,
                  color: '#555',
                  margin: 0,
                  lineHeight: 1.6,
                }}>
                  Vérifie ta boîte e-mail dans quelques secondes. 📬<br />
                  <span style={{ fontSize: 13, color: '#888' }}>(Pense aussi à vérifier les spams !)</span>
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🎬</div>
                  <h2 style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: 'clamp(19px, 4vw, 24px)',
                    fontWeight: 700,
                    color: '#1A1A1A',
                    margin: '0 0 10px',
                    lineHeight: 1.25,
                  }}>
                    Reçois ton guide vidéo pour avoir 20/20 en mathématiques
                  </h2>
                  <p style={{
                    fontFamily: 'var(--font-baloo)',
                    fontSize: 'clamp(13px, 2vw, 15px)',
                    color: '#888',
                    margin: 0,
                  }}>
                    Dans ta boîte e-mail dans 10 secondes
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* Nom + Prénom côte à côte */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label htmlFor="mu-nom" style={labelStyle}>Nom</label>
                      <input
                        id="mu-nom"
                        type="text"
                        placeholder="Ton nom"
                        value={nom}
                        onChange={e => setNom(e.target.value)}
                        disabled={status === 'loading'}
                        autoComplete="family-name"
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#EC6426'; e.target.style.boxShadow = '0 0 0 3px rgba(236,100,38,0.12)'; }}
                        onBlur={e => { e.target.style.borderColor = '#D1C9BE'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                    <div>
                      <label htmlFor="mu-prenom" style={labelStyle}>Prénom</label>
                      <input
                        id="mu-prenom"
                        type="text"
                        placeholder="Ton prénom"
                        value={prenom}
                        onChange={e => setPrenom(e.target.value)}
                        disabled={status === 'loading'}
                        autoComplete="given-name"
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#EC6426'; e.target.style.boxShadow = '0 0 0 3px rgba(236,100,38,0.12)'; }}
                        onBlur={e => { e.target.style.borderColor = '#D1C9BE'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="mu-email" style={labelStyle}>Email</label>
                    <input
                      id="mu-email"
                      type="email"
                      placeholder="ton@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={status === 'loading'}
                      autoComplete="email"
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#EC6426'; e.target.style.boxShadow = '0 0 0 3px rgba(236,100,38,0.12)'; }}
                      onBlur={e => { e.target.style.borderColor = '#D1C9BE'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label htmlFor="mu-tel" style={labelStyle}>Téléphone <span style={{ fontWeight: 400, opacity: 0.6 }}>(facultatif)</span></label>
                    <input
                      id="mu-tel"
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={telephone}
                      onChange={e => setTelephone(e.target.value)}
                      disabled={status === 'loading'}
                      autoComplete="tel"
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#EC6426'; e.target.style.boxShadow = '0 0 0 3px rgba(236,100,38,0.12)'; }}
                      onBlur={e => { e.target.style.borderColor = '#D1C9BE'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  {/* Classe */}
                  <div>
                    <label htmlFor="mu-classe" style={labelStyle}>Ta classe l'an prochain</label>
                    <select
                      id="mu-classe"
                      value={classe}
                      onChange={e => setClasse(e.target.value)}
                      disabled={status === 'loading'}
                      style={{
                        ...inputStyle,
                        color: classe ? '#1A1A1A' : '#999',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 14px center',
                        paddingRight: 40,
                      }}
                      onFocus={e => { e.target.style.borderColor = '#EC6426'; e.target.style.boxShadow = '0 0 0 3px rgba(236,100,38,0.12)'; }}
                      onBlur={e => { e.target.style.borderColor = '#D1C9BE'; e.target.style.boxShadow = 'none'; }}
                    >
                      <option value="" disabled>Ta classe l'an prochain</option>
                      {CLASSES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {status === 'error' && errorMessage && (
                    <p style={{
                      fontFamily: 'var(--font-baloo)',
                      fontSize: 13,
                      color: '#D63031',
                      margin: 0,
                      padding: '8px 12px',
                      background: '#FFF5F5',
                      border: '1.5px solid #FFBDBD',
                      borderRadius: 8,
                    }}>
                      ⚠️ {errorMessage}
                    </p>
                  )}

                  {/* Bouton submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={status !== 'loading' ? { scale: 1.01 } : {}}
                    whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                    style={{
                      width: '100%',
                      padding: '15px 20px',
                      background: status === 'loading'
                        ? '#ccc'
                        : 'linear-gradient(135deg, #F5C842 0%, #E8A800 100%)',
                      border: 'none',
                      borderRadius: 14,
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      fontFamily: 'var(--font-baloo)',
                      fontSize: 'clamp(15px, 2.5vw, 17px)',
                      fontWeight: 800,
                      color: '#1A1A1A',
                      letterSpacing: '.02em',
                      marginTop: 4,
                      boxShadow: status === 'loading' ? 'none' : '0 4px 18px rgba(232,168,0,0.35)',
                    }}
                  >
                    {status === 'loading' ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(0,0,0,0.2)', borderTopColor: '#1A1A1A', borderRadius: '50%' }}
                        />
                        Envoi en cours…
                      </span>
                    ) : (
                      '🎬 Recevoir le guide vidéo'
                    )}
                  </motion.button>
                </form>

                <p style={{
                  fontFamily: 'var(--font-baloo)',
                  fontSize: 11,
                  color: '#aaa',
                  textAlign: 'center',
                  margin: '14px 0 0',
                  lineHeight: 1.5,
                }}>
                  Vos données sont traitées pour vous envoyer le guide.{' '}
                  <a href="/mentions-legales" style={{ color: '#888', textDecoration: 'underline' }}>
                    Confidentialité
                  </a>
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
