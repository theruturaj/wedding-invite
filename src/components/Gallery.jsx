import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { Reveal, SectionHeading } from './Reveal.jsx';

function Lightbox({ card, onClose, closeLabel }) {
  const closeRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={card.alt}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.img
        src={card.src}
        alt={card.alt}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: reduce ? 1 : 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: reduce ? 1 : 0.95, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      <button ref={closeRef} type="button" className="lightbox-close" onClick={onClose} aria-label={closeLabel}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </button>
    </motion.div>
  );
}

export function Gallery() {
  const { t } = useLanguage();
  const [active, setActive] = useState(null);
  const reduce = useReducedMotion();

  return (
    <section className="section gallery" aria-labelledby="gallery-title">
      <SectionHeading eyebrow={t.gallery.eyebrow} title={<span id="gallery-title">{t.gallery.title}</span>} />
      <Reveal as="p" className="gallery-hint">{t.gallery.hint}</Reveal>
      <div className="cards">
        {t.gallery.cards.map((card, i) => (
          <Reveal key={card.src} delay={i * 0.15}>
            <motion.button
              type="button"
              className="card-thumb"
              onClick={() => setActive(card)}
              aria-label={card.alt}
              whileHover={reduce ? undefined : { y: -8, rotate: i === 0 ? -1.5 : 1.5 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <img src={card.src} alt="" loading="lazy" />
            </motion.button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {active && <Lightbox card={active} onClose={() => setActive(null)} closeLabel={t.gallery.close} />}
      </AnimatePresence>
    </section>
  );
}
