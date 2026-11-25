import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { VENUE } from '../i18n/content.js';
import { downloadCalendar } from '../lib/calendar.js';
import { Reveal, SectionHeading } from './Reveal.jsx';
import { Lotus } from './ornaments/Ornaments.jsx';

const mapsQuery = encodeURIComponent(VENUE.mapsQuery);
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
const EMBED_URL = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

export function Venue() {
  const { t } = useLanguage();
  const [added, setAdded] = useState(false);

  const onCalendar = useCallback(() => {
    downloadCalendar();
    setAdded(true);
  }, []);

  return (
    <section className="section venue" aria-labelledby="venue-title">
      <SectionHeading eyebrow={t.venue.eyebrow} title={<span id="venue-title">{t.venue.title}</span>} />
      <div className="venue-grid">
        <Reveal className="venue-card">
          <Lotus className="venue-lotus" />
          <h3 className="venue-name">{t.venue.name}</h3>
          <address>
            {t.venue.address.map((line) => <span key={line}>{line}</span>)}
          </address>
          <div className="venue-actions">
            <motion.a className="btn btn-primary" href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.97 }}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l18-8-8 18-2-8-8-2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
              {t.venue.directions}
            </motion.a>
            <motion.button type="button" className="btn btn-ghost" onClick={onCalendar} whileTap={{ scale: 0.97 }}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {added
                  ? <path d="M5 12l5 5 9-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  : <path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
              </svg>
              {t.venue.calendar}
            </motion.button>
          </div>
        </Reveal>
        <Reveal className="venue-map" delay={0.15}>
          <iframe title={t.venue.mapTitle} src={EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </Reveal>
      </div>
    </section>
  );
}
