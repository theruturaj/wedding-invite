import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { EVENTS } from '../i18n/content.js';
import { dayKey } from '../lib/format.js';
import { SectionHeading, Reveal } from './Reveal.jsx';
import { EventIcon } from './ornaments/EventIcons.jsx';

function groupByDay(events) {
  return events.reduce((acc, ev) => {
    const key = dayKey(ev.start);
    const existing = acc.find((g) => g.key === key);
    return existing
      ? acc.map((g) => (g.key === key ? { ...g, events: [...g.events, ev] } : g))
      : [...acc, { key, events: [ev] }];
  }, []);
}

const DAYS = groupByDay(EVENTS.map((ev, order) => ({ ...ev, order })));

function EventCard({ ev }) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const copy = t.events.items[ev.id];
  const side = ev.order % 2 === 0 ? 'left' : 'right';
  return (
    <motion.li
      className={`event event-${side}${ev.highlight ? ' event-highlight' : ''}`}
      initial={{ opacity: 0, x: reduce ? 0 : side === 'left' ? -36 : 36, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="event-dot" aria-hidden="true" />
      <div className="event-card">
        <div className="event-icon"><EventIcon name={ev.icon} /></div>
        <div className="event-body">
          {ev.highlight && <p className="event-badge">{t.events.muhurt}</p>}
          <h4 className="event-name">{copy.name}</h4>
          <p className="event-time">{copy.time}</p>
          <p className="event-note">{copy.note}</p>
        </div>
      </div>
    </motion.li>
  );
}

export function Events() {
  const { t } = useLanguage();
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 80%', 'end 60%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="section events" aria-labelledby="events-title">
      <SectionHeading eyebrow={t.events.eyebrow} title={<span id="events-title">{t.events.title}</span>} />
      <div className="timeline" ref={listRef}>
        <motion.div className="timeline-line" style={{ scaleY: lineScale }} aria-hidden="true" />
        {DAYS.map((day) => (
          <div key={day.key} className="timeline-day">
            <Reveal as="h3" className="day-label">{t.events.days[day.key]}</Reveal>
            <ol className="event-list">
              {day.events.map((ev) => <EventCard key={ev.id} ev={ev} />)}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
