import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { Divider } from './ornaments/Ornaments.jsx';

const EASE = [0.65, 0, 0.35, 1];

function Door({ side }) {
  return (
    <div className={`door door-${side}`}>
      <div className="door-panel">
        <svg viewBox="0 0 200 500" preserveAspectRatio="none" aria-hidden="true">
          <path d="M20 480 V140 C20 90 70 70 100 30 C130 70 180 90 180 140 V480 Z" fill="none" stroke="url(#g-gold-v)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M40 470 V150 C40 110 80 92 100 62 C120 92 160 110 160 150 V470 Z" fill="none" stroke="url(#g-gold-v)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
}

/**
 * Full-screen "temple doors" that open when the guest picks a language.
 * Scroll is locked while the gate is shown.
 */
export function Gate({ onOpen }) {
  const { lang, setLang, t } = useLanguage();
  const reduce = useReducedMotion();
  const primaryRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    primaryRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const open = (next) => {
    setLang(next);
    onOpen();
  };

  const other = lang === 'en' ? 'mr' : 'en';
  const otherLabel = lang === 'en' ? t.gate.openMr : t.gate.openEn;

  return (
    <motion.div
      className="gate"
      role="dialog"
      aria-modal="true"
      aria-label={t.gate.invited}
      exit={{ opacity: 0, transition: { duration: reduce ? 0.2 : 0.6, delay: reduce ? 0 : 1.1 } }}
    >
      <motion.div className="gate-doors" exit={reduce ? undefined : 'open'} initial={false}>
        <motion.div variants={{ open: { rotateY: 105, transition: { duration: 1.4, ease: EASE } } }} style={{ transformOrigin: 'left center' }} className="door-wrap">
          <Door side="left" />
        </motion.div>
        <motion.div variants={{ open: { rotateY: -105, transition: { duration: 1.4, ease: EASE } } }} style={{ transformOrigin: 'right center' }} className="door-wrap">
          <Door side="right" />
        </motion.div>
      </motion.div>

      <motion.div
        className="gate-content"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.4 } }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <img className="gate-ganesha" src="/img/ganesha.jpg" alt="" width="175" height="190" />
        <p className="gate-blessing">{t.gate.blessing}</p>
        <p className="gate-invited">{t.gate.invited}</p>
        <p className="gate-to">{t.gate.to}</p>
        <p className="gate-names">
          <span>{t.gate.names[0]}</span>
          <span className="amp">&amp;</span>
          <span>{t.gate.names[1]}</span>
        </p>
        <Divider />
        <div className="gate-actions">
          <button ref={primaryRef} type="button" className="btn btn-primary" onClick={() => open(lang)}>
            {t.gate.open}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => open(other)} lang={other}>
            {otherLabel}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
