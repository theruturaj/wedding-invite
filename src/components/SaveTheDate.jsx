import { useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { WEDDING_START } from '../i18n/content.js';
import { getTimeParts, localizeDigits } from '../lib/format.js';
import { downloadCalendar } from '../lib/calendar.js';
import { useNow } from '../lib/hooks.js';
import { Reveal } from './Reveal.jsx';
import { TornEdge } from './ornaments/Paper.jsx';

const TARGET = Date.parse(WEDDING_START);
const REVEAL_AT = 0.35;

function MiniCountdown() {
  const { t, lang } = useLanguage();
  const now = useNow(1000);
  const p = getTimeParts(TARGET, now);
  if (p.done) return null;
  const values = [p.days, p.hours, p.minutes, p.seconds];
  return (
    <div className="mini-countdown" role="timer" aria-live="off">
      {values.map((v, i) => (
        <div key={t.saveDate.units[i]}>
          <span className="mc-num">{localizeDigits(v, lang, 2)}</span>
          <span className="mc-label">{t.saveDate.units[i]}</span>
        </div>
      ))}
    </div>
  );
}

/** Save-the-date card hidden under a sheet of paper the guest peels away. */
export function SaveTheDate() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const s = t.saveDate;
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const [revealed, setRevealed] = useState(false);
  const curlOpacity = useTransform(x, [0, 40], [0.4, 1]);

  const reveal = () => {
    if (revealed) return;
    const width = cardRef.current?.offsetWidth ?? 400;
    animate(x, width * 1.15, { duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }).then(() => setRevealed(true));
  };

  const onDragEnd = (_, info) => {
    const width = cardRef.current?.offsetWidth ?? 400;
    if (x.get() > width * REVEAL_AT || info.velocity.x > 500) reveal();
    else animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 });
  };

  return (
    <section className="v2-section savedate" aria-labelledby="sd-title">
      <Reveal as="p" className="caps-eyebrow">{s.eyebrow}</Reveal>
      <Reveal as="h2" id="sd-title" className="caps-title single" delay={0.1}>{s.title}</Reveal>

      <Reveal className="sd-card" delay={0.2}>
        <div ref={cardRef} className="sd-date">
          <motion.div
            className="sd-date-inner"
            initial={false}
            animate={revealed ? { scale: [0.96, 1], opacity: [0.6, 1] } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="sd-weekday">{s.weekday}</span>
            <span className="sd-day">{s.day}</span>
            <span className="sd-month">{s.month} {s.year}</span>
            <span className="sd-time">{s.time}</span>
          </motion.div>
        </div>

        {!revealed && (
          <motion.div
            className="sd-cover"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: 0, right: 2000 }}
            dragElastic={0.04}
            dragMomentum={false}
            onDragEnd={onDragEnd}
            aria-hidden="true"
          >
            <motion.div className="sd-curl" style={{ opacity: curlOpacity }} />
            <TornEdge side="bottom" className="sd-cover-tear" color="#F4EAD6" seed={5} height={18} />
            <motion.span
              className="sd-hint"
              animate={reduce ? undefined : { x: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              {s.swipe}
              <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </motion.span>
          </motion.div>
        )}
      </Reveal>

      {revealed ? (
        <motion.div className="sd-after" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <MiniCountdown />
          <button type="button" className="btn-outline" onClick={downloadCalendar}>{s.calendar}</button>
        </motion.div>
      ) : (
        <Reveal delay={0.3}>
          <button type="button" className="btn-outline" onClick={reveal}>{s.reveal}</button>
        </Reveal>
      )}
    </section>
  );
}
