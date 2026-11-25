import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { LANGS, content } from '../i18n/content.js';
import { WaxSeal } from './ornaments/Paper.jsx';

const EASE = [0.65, 0, 0.35, 1];

/** Embossed lotus-and-vine pattern, drawn twice (highlight + shadow) to look pressed into the paper. */
function Emboss() {
  const motif = (
    <>
      <path d="M60 70 C48 56 48 38 60 24 C72 38 72 56 60 70 Z" />
      <path d="M60 70 C44 66 34 54 32 40 C46 42 56 52 60 70 Z" />
      <path d="M60 70 C76 66 86 54 88 40 C74 42 64 52 60 70 Z" />
      <path d="M20 100 C34 92 46 86 60 86 C74 86 86 92 100 100" />
      <path d="M30 96 C26 88 28 80 36 78 C38 86 36 92 30 96 Z" />
      <path d="M90 96 C94 88 92 80 84 78 C82 86 84 92 90 96 Z" />
      <circle cx="60" cy="10" r="3" />
      <circle cx="10" cy="60" r="2" />
      <circle cx="110" cy="60" r="2" />
    </>
  );
  return (
    <svg className="emboss" aria-hidden="true">
      <defs>
        <pattern id="emboss-p" width="120" height="120" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#fff" strokeOpacity="0.9" strokeWidth="1.4" transform="translate(-0.8 -0.8)">{motif}</g>
          <g fill="none" stroke="#A88A5E" strokeOpacity="0.38" strokeWidth="1.2" transform="translate(0.8 0.8)">{motif}</g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#emboss-p)" />
    </svg>
  );
}

/**
 * Sealed envelope intro. Tapping it breaks the seal, folds the flap back and
 * drops the envelope away. `onStart` fires inside the tap (so audio may play);
 * `onOpen` fires once the animation finishes.
 */
export function Envelope({ onStart, onOpen }) {
  const { lang, setLang, t } = useLanguage();
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    buttonRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (!opening) return undefined;
    const id = setTimeout(onOpen, reduce ? 200 : 1900);
    return () => clearTimeout(id);
  }, [opening, onOpen, reduce]);

  const open = () => {
    if (opening) return;
    onStart();
    setOpening(true);
  };

  return (
    <motion.div className="envelope-screen" exit={{ opacity: 0, transition: { duration: 0.5 } }}>
      <motion.button
        ref={buttonRef}
        type="button"
        className="envelope"
        onClick={open}
        aria-label={t.envelope.seal}
        initial={{ opacity: 0, y: reduce ? 0 : 30, scale: 0.97 }}
        animate={opening && !reduce ? { opacity: 1, scale: 1, y: '115vh', rotate: 4, transition: { delay: 1, duration: 0.9, ease: EASE } } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="env-body">
          <Emboss />
          <svg className="env-folds" viewBox="0 0 100 160" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 160 L50 92 L100 160" fill="none" stroke="#C8B08A" strokeOpacity="0.55" strokeWidth="0.4" />
          </svg>
        </span>
        <motion.span
          className="env-flap-wrap"
          animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay: reduce ? 0 : 0.25 }}
        >
          <span className="env-flap"><Emboss /></span>
        </motion.span>
        <motion.span
          className="env-seal"
          animate={opening ? { scale: 1.25, opacity: 0 } : { scale: [1, 1.04, 1] }}
          transition={opening ? { duration: 0.35 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <WaxSeal tone="cream" monogram="R G" size={92} />
        </motion.span>
        <motion.span className="env-tap" animate={{ opacity: opening ? 0 : 1 }}>
          {t.envelope.tap}
        </motion.span>
      </motion.button>

      <motion.div
        className="env-lang"
        role="group"
        aria-label={t.envelope.langHint}
        animate={{ opacity: opening ? 0 : 1 }}
      >
        {LANGS.map((code) => (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={lang === code}
            className={lang === code ? 'active' : ''}
            onClick={() => setLang(code)}
          >
            {content[code].langName}
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
}
