import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { LANGS, content } from '../i18n/content.js';
import { deckledPolygon } from '../lib/deckle.js';
import { haptic } from '../lib/haptics.js';
import { PaperGrain, WaxSeal } from './ornaments/Paper.jsx';

const EASE = [0.65, 0, 0.35, 1];
const SOFT = [0.22, 1, 0.36, 1];

// Timeline (seconds) of the opening sequence.
const T = { crack: 0, flap: 0.3, flapDur: 0.85, flapBehind: 1.0, card: 1.15, cardDur: 0.9, drop: 2.05, done: 2.75 };

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
          <g fill="none" stroke="#fff" strokeOpacity="0.95" strokeWidth="1.5" transform="translate(-0.9 -0.9)">{motif}</g>
          <g fill="none" stroke="#9C7E52" strokeOpacity="0.4" strokeWidth="1.2" transform="translate(0.9 0.9)">{motif}</g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#emboss-p)" />
    </svg>
  );
}

/** Maroon-and-gold paisley liner seen on the inside of the flap once it opens. */
function Liner() {
  return (
    <svg className="env-liner-art" aria-hidden="true">
      <defs>
        <pattern id="liner-p" width="44" height="44" patternUnits="userSpaceOnUse">
          <rect width="44" height="44" fill="#6E1424" />
          <path d="M22 6 C30 10 32 22 24 28 C18 32 12 26 16 20 C19 16 24 18 22 22" fill="none" stroke="#D9B46A" strokeWidth="1" opacity="0.8" />
          <circle cx="8" cy="36" r="1.6" fill="#D9B46A" opacity="0.7" />
          <circle cx="38" cy="8" r="1.2" fill="#D9B46A" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#liner-p)" />
    </svg>
  );
}

/**
 * Sealed envelope intro. Tapping it cracks the wax seal, folds the flap back to
 * show the liner, slides the invitation card out and drops the envelope away.
 * `onStart` fires inside the tap (so audio may play); `onOpen` fires at the end.
 */
export function Envelope({ onStart, onOpen }) {
  const { lang, setLang, t } = useLanguage();
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const [flapBehind, setFlapBehind] = useState(false);
  const [flapInside, setFlapInside] = useState(false);
  const buttonRef = useRef(null);
  const cardClip = useMemo(() => deckledPolygon({ seed: 21, depth: 0.9 }), []);

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
    const ids = [
      setTimeout(() => setFlapInside(true), reduce ? 0 : (T.flap + T.flapDur / 2) * 1000),
      setTimeout(() => setFlapBehind(true), reduce ? 0 : T.flapBehind * 1000),
      setTimeout(onOpen, reduce ? 200 : T.done * 1000),
    ];
    return () => ids.forEach(clearTimeout);
  }, [opening, onOpen, reduce]);

  const open = () => {
    if (opening) return;
    haptic('tap');
    onStart();
    setOpening(true);
  };

  const at = (delay, duration, ease = EASE) => ({ delay: reduce ? 0 : delay, duration: reduce ? 0 : duration, ease });

  return (
    <motion.div className="envelope-screen" exit={{ opacity: 0, transition: { duration: 0.6 } }}>
      <PaperGrain />
      <div className="envelope-wrap">
        <motion.button
          ref={buttonRef}
          type="button"
          className="envelope"
          onClick={open}
          aria-label={t.envelope.seal}
          initial={{ opacity: 0, y: reduce ? 0 : 26, rotate: reduce ? 0 : -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          whileHover={opening || reduce ? undefined : { y: -4, rotate: -0.4 }}
          whileTap={opening || reduce ? undefined : { scale: 0.985 }}
          transition={{ duration: 1, ease: SOFT }}
        >
          {/* the invitation card tucked inside */}
          <motion.span
            className="env-card"
            style={{ clipPath: cardClip, zIndex: 2 }}
            initial={false}
            animate={opening ? { y: '-40%' } : { y: '2%' }}
            transition={at(T.card, T.cardDur, SOFT)}
          >
            <PaperGrain />
            <span className="env-card-blessing">|| श्री गणेशाय नमः ||</span>
            <span className="env-card-names">{t.hero.groom} <i>&amp;</i> {t.hero.bride}</span>
            <span className="env-card-date">{t.saveDate.weekday} · {t.saveDate.day} {t.saveDate.month} {t.saveDate.year}</span>
          </motion.span>

          {/* the front pocket — what you see of the envelope's back */}
          <motion.span
            className={`env-body${opening ? ' open' : ''}`}
            style={{ zIndex: 3 }}
            animate={opening && !reduce ? { y: '120vh', rotate: 5 } : { y: 0, rotate: 0 }}
            transition={at(T.drop, 0.8, [0.55, 0, 0.8, 0.2])}
          >
            <PaperGrain />
            <Emboss />
            <svg className="env-folds" viewBox="0 0 100 160" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 160 L50 90 L100 160" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="0.5" transform="translate(-0.3 -0.3)" />
              <path d="M0 160 L50 90 L100 160" fill="none" stroke="#B49668" strokeOpacity="0.55" strokeWidth="0.4" />
              <defs>
                <filter id="flap-blur" x="-10%" y="-10%" width="120%" height="130%">
                  <feGaussianBlur stdDeviation="1.4" />
                </filter>
              </defs>
              {/* soft shadow the closed flap casts on the pocket */}
              <path className="flap-shadow" d="M0 0 L50 86 L100 0 Z" fill="#5a3a14" opacity="0.22" filter="url(#flap-blur)" />
            </svg>
          </motion.span>

          {/* the flap: cream outside, paisley liner inside */}
          <motion.span
            className="env-flap-wrap"
            style={{ zIndex: flapBehind ? 1 : 4 }}
            initial={false}
            animate={opening && !reduce ? { rotateX: 180, y: 0 } : { rotateX: 0 }}
            transition={at(T.flap, T.flapDur)}
          >
            {/* one flap; past 90° we're looking at its inside, so swap to the liner */}
            {flapInside ? (
              <span className="env-flap face-in"><Liner /></span>
            ) : (
              <span className="env-flap face-out"><PaperGrain /><Emboss /></span>
            )}
          </motion.span>

          {/* wax seal that cracks in two */}
          {['left', 'right'].map((half) => (
            <motion.span
              key={half}
              className={`env-seal half-${half}`}
              style={{ zIndex: 5 }}
              initial={false}
              animate={
                opening
                  ? { x: half === 'left' ? -26 : 26, y: 60, rotate: half === 'left' ? -24 : 22, opacity: 0 }
                  : { x: 0, y: 0, rotate: 0, opacity: 1 }
              }
              transition={at(T.crack, 0.7, [0.4, 0, 1, 1])}
            >
              <WaxSeal tone="cream" monogram="R G" size={94} />
            </motion.span>
          ))}

          <motion.span className="env-tap" animate={{ opacity: opening ? 0 : 1 }} style={{ zIndex: 5 }}>
            {t.envelope.tap}
          </motion.span>
        </motion.button>
        <motion.span
          className="env-shadow"
          aria-hidden="true"
          animate={opening && !reduce ? { opacity: 0, scaleX: 0.6 } : { opacity: 1, scaleX: 1 }}
          transition={at(T.drop, 0.5)}
        />
      </div>

      <motion.div className="env-lang" role="group" aria-label={t.envelope.langHint} animate={{ opacity: opening ? 0 : 1 }}>
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
