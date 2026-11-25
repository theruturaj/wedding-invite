import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { STORY_PHOTOS } from '../i18n/content.js';
import { Reveal } from './Reveal.jsx';
import { WaxSeal } from './ornaments/Paper.jsx';
import { deckledPolygon } from '../lib/deckle.js';

const CLIPS = STORY_PHOTOS.map((_, i) => deckledPolygon({ seed: 40 + i * 7, depth: 1.4, steps: 34 }));

const TILT = [-2, 4, -5, 3, -3];
const THRESHOLD = 90;

/** A pile of keepsake photos; swipe the top one away and it slides to the bottom. */
export function PhotoStack() {
  const { t } = useLanguage();
  const p = t.photos;
  const reduce = useReducedMotion();
  const [order, setOrder] = useState(() => STORY_PHOTOS.map((_, i) => i));

  const cycle = () => setOrder(([first, ...rest]) => [...rest, first]);

  return (
    <section className="v2-section photos" aria-labelledby="ph-title">
      <Reveal as="p" className="caps-eyebrow">{p.eyebrow}</Reveal>
      <Reveal as="h2" id="ph-title" className="serif-title" delay={0.1}>{p.title}</Reveal>
      <Reveal as="p" className="script-eyebrow small" delay={0.2}>{p.hint}</Reveal>

      <div className="stack">
        <div className="stack-seal"><WaxSeal tone="maroon" monogram="R G" size={72} /></div>
        {order.map((photoIndex, depth) => {
          const photo = STORY_PHOTOS[photoIndex];
          const top = depth === 0;
          return (
            <motion.figure
              key={photo.key}
              className="frame"
              style={{ zIndex: STORY_PHOTOS.length - depth }}
              initial={false}
              animate={{
                x: 0,
                rotate: TILT[photoIndex % TILT.length],
                scale: 1 - depth * 0.04,
                y: depth * 10,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              drag={top ? 'x' : false}
              dragSnapToOrigin={false}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > THRESHOLD || Math.abs(info.velocity.x) > 600) cycle();
              }}
              whileDrag={reduce ? undefined : { scale: 1.03, rotate: 0 }}
              aria-hidden={!top}
            >
              <span className="deckle" style={{ clipPath: CLIPS[photoIndex] }} />
              <span className="frame-photo">
                <img src={photo.src} alt={p.alts[photo.key]} draggable="false" loading="lazy" />
              </span>
            </motion.figure>
          );
        })}
      </div>
      <button type="button" className="btn-outline" onClick={cycle}>{p.next}</button>
    </section>
  );
}
