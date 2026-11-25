import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { WEDDING_START } from '../i18n/content.js';
import { getTimeParts, localizeDigits } from '../lib/format.js';
import { useNow } from '../lib/hooks.js';
import { Reveal, SectionHeading } from './Reveal.jsx';

const TARGET = Date.parse(WEDDING_START);

function Tile({ value, label }) {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const text = localizeDigits(value, lang, 2);
  return (
    <div className="tile">
      <div className="tile-num" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            initial={{ y: reduce ? 0 : '-60%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduce ? 0 : '60%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="tile-label">{label}</div>
    </div>
  );
}

export function Countdown() {
  const { t, lang } = useLanguage();
  const now = useNow(1000);
  const parts = getTimeParts(TARGET, now);
  const values = [parts.days, parts.hours, parts.minutes, parts.seconds];
  const srText = t.countdown.units.map((u, i) => `${localizeDigits(values[i], lang)} ${u}`).join(', ');

  return (
    <section className="section countdown" aria-labelledby="countdown-title">
      <SectionHeading eyebrow={t.countdown.eyebrow} title={<span id="countdown-title">{t.countdown.title}</span>} />
      <Reveal as="p" className="countdown-when" delay={0.15}>{t.countdown.when}</Reveal>
      {parts.done ? (
        <Reveal as="p" className="countdown-done">{t.countdown.done}</Reveal>
      ) : (
        <Reveal className="tiles" delay={0.25}>
          <span className="sr-only">{srText}</span>
          {t.countdown.units.map((u, i) => <Tile key={u} value={values[i]} label={u} />)}
        </Reveal>
      )}
    </section>
  );
}
