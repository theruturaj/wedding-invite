import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { DRESS_CODES } from '../i18n/content.js';
import { Reveal } from './Reveal.jsx';

function Lehenga({ cx, body, accent, delay }) {
  return (
    <motion.g
      initial={{ y: -14, opacity: 0, rotate: -4 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ delay, type: 'spring', stiffness: 160, damping: 12 }}
      style={{ transformOrigin: `${cx}px 52px` }}
    >
      <path d={`M${cx} 52 L${cx - 16} 66 H${cx + 16} Z`} fill="none" stroke="#9B6B1C" strokeWidth="2" />
      <path d={`M${cx - 18} 66 H${cx + 18} L${cx + 14} 102 H${cx - 14} Z`} fill={body} />
      <path d={`M${cx - 14} 102 H${cx + 14} L${cx + 40} 222 Q${cx} 232 ${cx - 40} 222 Z`} fill={body} />
      <path d={`M${cx - 38} 214 Q${cx} 224 ${cx + 38} 214 L${cx + 40} 222 Q${cx} 232 ${cx - 40} 222 Z`} fill={accent} />
      <path d={`M${cx + 16} 68 L${cx - 30} 180 L${cx - 20} 186 L${cx + 20} 80 Z`} fill={accent} opacity="0.85" />
      <path d={`M${cx - 8} 120 L${cx - 18} 200 M${cx + 8} 120 L${cx + 18} 200`} stroke="#fff" strokeOpacity="0.18" strokeWidth="2" />
    </motion.g>
  );
}

function Kurta({ cx, body, under, vest, delay }) {
  return (
    <motion.g
      initial={{ y: -14, opacity: 0, rotate: 4 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ delay, type: 'spring', stiffness: 160, damping: 12 }}
      style={{ transformOrigin: `${cx}px 52px` }}
    >
      <path d={`M${cx} 52 L${cx - 16} 66 H${cx + 16} Z`} fill="none" stroke="#9B6B1C" strokeWidth="2" />
      <rect x={cx - 12} y="186" width="10" height="42" fill={under} />
      <rect x={cx + 2} y="186" width="10" height="42" fill={under} />
      <path d={`M${cx - 16} 66 H${cx + 16} L${cx + 30} 80 L${cx + 26} 140 L${cx + 18} 140 L${cx + 20} 192 H${cx - 20} L${cx - 18} 140 L${cx - 26} 140 L${cx - 30} 80 Z`} fill={body} />
      {vest && <path d={`M${cx - 16} 66 H${cx - 4} L${cx} 76 L${cx + 4} 66 H${cx + 16} L${cx + 18} 130 H${cx - 18} Z`} fill={vest} />}
      <path d={`M${cx} 66 V120`} stroke="#000" strokeOpacity="0.15" strokeWidth="1.2" />
      {[78, 90, 102].map((y) => <circle key={y} cx={cx + 2} cy={y} r="1.6" fill="#E8C873" />)}
    </motion.g>
  );
}

/** Gold clothing rack with outfits drawn in the event's palette. */
function Rack({ palette, slideKey }) {
  const [a, b, c, d] = palette;
  return (
    <svg className="rack" viewBox="0 0 320 250" aria-hidden="true" key={slideKey}>
      <path d="M36 240 V56 C36 26 70 18 160 18 C250 18 284 26 284 56 V240" fill="none" stroke="url(#g-gold)" strokeWidth="5" />
      <path d="M36 52 H284" stroke="url(#g-gold)" strokeWidth="4" />
      <circle cx="160" cy="14" r="6" fill="url(#g-gold)" />
      <rect x="26" y="236" width="268" height="8" rx="4" fill="url(#g-gold)" />
      <Lehenga cx={80} body={a} accent={c} delay={0.05} />
      <Kurta cx={136} body={d} under={d} vest={b} delay={0.15} />
      <Lehenga cx={190} body={b} accent={a} delay={0.25} />
      <Kurta cx={244} body={c} under={d} delay={0.35} />
    </svg>
  );
}

export function DressCode() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const d = t.dress;
  const [[index, dir], setState] = useState([0, 0]);
  const go = (step) => setState(([i]) => [(i + step + DRESS_CODES.length) % DRESS_CODES.length, step]);
  const slide = DRESS_CODES[index];
  const copy = d.items[slide.id];

  return (
    <section className="v2-section dress" aria-labelledby="dress-title" aria-roledescription="carousel">
      <Reveal as="p" className="caps-eyebrow">{d.eyebrow}</Reveal>
      <Reveal as="h2" id="dress-title" className="serif-title" delay={0.1}>{d.title}</Reveal>
      <span className="ev-rule center" aria-hidden="true" />

      <div className="dress-stage">
        <button type="button" className="dress-arrow prev" onClick={() => go(-1)} aria-label={d.prev}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={slide.id}
            className="dress-slide"
            custom={dir}
            initial={{ opacity: 0, x: reduce ? 0 : dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : dir * -60 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${DRESS_CODES.length}: ${copy.name}`}
          >
            <p className="dress-name">{copy.name}</p>
            <span className="ev-rule center" aria-hidden="true" />
            <Rack palette={slide.palette} slideKey={slide.id} />
            <dl className="dress-lines">
              <div><dt>{d.women}</dt><dd>{copy.women}</dd></div>
              <div><dt>{d.men}</dt><dd>{copy.men}</dd></div>
            </dl>
            <div className="swatches" aria-hidden="true">
              {slide.palette.map((c) => <span key={c} style={{ background: c }} />)}
            </div>
          </motion.div>
        </AnimatePresence>
        <button type="button" className="dress-arrow next" onClick={() => go(1)} aria-label={d.next}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
      </div>

      <div className="dots">
        {DRESS_CODES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={d.items[s.id].name}
            aria-current={i === index}
            className={i === index ? 'active' : ''}
            onClick={() => setState([i, i > index ? 1 : -1])}
          />
        ))}
      </div>
      <p className="caps-eyebrow small muted">{d.swipe}</p>
    </section>
  );
}
