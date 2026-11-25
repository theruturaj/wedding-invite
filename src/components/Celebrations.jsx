import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { EVENTS, VENUE } from '../i18n/content.js';
import { Reveal } from './Reveal.jsx';
import { ScratchCard } from './ScratchCard.jsx';
import { EventIcon } from './ornaments/EventIcons.jsx';
import { GarlandStrand, Lotus } from './ornaments/Ornaments.jsx';

const DIRECTIONS_URL = VENUE.mapsUrl;

const NICHE = {
  engagement: ['#F8E3E6', '#E9B7C0'],
  haldi: ['#FCEFB8', '#F2C94C'],
  sangeet: ['#E9E1F5', '#B9A6DD'],
  vidhi: ['#FBE3CB', '#E8A86A'],
  varmala: ['#F7D8D8', '#D9737E'],
};

/** Arched niche artwork for an event: gradient alcove, hanging garlands, gold icon. */
function EventArt({ id, icon }) {
  const [light, deep] = NICHE[id];
  return (
    <div className="ev-art" style={{ '--niche-light': light, '--niche-deep': deep }}>
      <div className="ev-niche">
        <div className="ev-icon"><EventIcon name={icon} /></div>
        <Lotus className="ev-lotus" />
      </div>
      <div className="ev-garland left"><GarlandStrand length={7} bell={false} delay={0.3} /></div>
      <div className="ev-garland right"><GarlandStrand length={7} bell={false} delay={0.9} /></div>
    </div>
  );
}

function EventRow({ ev, flip }) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const c = t.celebrations;
  const copy = c.items[ev.id];
  return (
    <li className={`ev-row${flip ? ' flip' : ''}`}>
      <motion.div
        initial={{ opacity: 0, x: reduce ? 0 : flip ? 40 : -40, rotate: reduce ? 0 : flip ? 3 : -3 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <EventArt id={ev.id} icon={ev.icon} />
      </motion.div>
      <Reveal className="ev-text" delay={0.15}>
        {ev.highlight && <p className="ev-badge">{c.muhurt}</p>}
        <h3 className="ev-name">{copy.name}</h3>
        <span className="ev-rule" aria-hidden="true" />
        <ScratchCard label={c.scratch} revealLabel={c.revealBtn}>
          <p className="ev-when">{copy.when}</p>
        </ScratchCard>
        <p className="ev-sep" aria-hidden="true">— · —</p>
        <p className="ev-label">{c.venueLabel}</p>
        <p className="ev-venue">{c.venue}</p>
        <p className="ev-venue-sub">{c.venueSub}</p>
        <a className="ev-link" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
          {c.directions}
        </a>
      </Reveal>
    </li>
  );
}

function GarlandSwags() {
  const reduce = useReducedMotion();
  const rows = [
    { y: 18, sag: 26, tone: 0 },
    { y: 46, sag: 30, tone: 1 },
  ];
  return (
    <svg className="swags" viewBox="0 0 400 110" aria-hidden="true">
      {rows.map((r, ri) => (
        <motion.g
          key={r.y}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: ri * 0.2 }}
        >
          {Array.from({ length: 31 }, (_, i) => {
            const tt = i / 30;
            const wave = Math.sin(tt * Math.PI * 2 + ri) * 10;
            const cx = tt * 400;
            const cy = r.y + r.sag * Math.sin(tt * Math.PI) * 0.6 + wave;
            const tones = [['#F7A51C', '#E0700E'], ['#FFCB2E', '#F0A00A'], ['#F2701A', '#C8460C']];
            const [fill, edge] = tones[(i + r.tone) % 3];
            return (
              <motion.g
                key={i}
                initial={{ scale: reduce ? 1 : 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: reduce ? 0 : ri * 0.2 + i * 0.02, type: 'spring', stiffness: 260, damping: 14 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                <circle cx={cx} cy={cy} r="8" fill={edge} />
                <circle cx={cx} cy={cy} r="6" fill={fill} />
              </motion.g>
            );
          })}
        </motion.g>
      ))}
    </svg>
  );
}

export function Celebrations() {
  const { t } = useLanguage();
  const c = t.celebrations;
  return (
    <section className="v2-section celebrations" aria-labelledby="cel-title">
      <GarlandSwags />
      <Reveal as="p" className="script-eyebrow">{c.eyebrow}</Reveal>
      <Reveal as="h2" id="cel-title" className="caps-title single" delay={0.1}>{c.title}</Reveal>
      <ol className="ev-list">
        {EVENTS.map((ev, i) => <EventRow key={ev.id} ev={ev} flip={i % 2 === 1} />)}
      </ol>
    </section>
  );
}
