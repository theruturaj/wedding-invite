import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { GarlandStrand } from './ornaments/Ornaments.jsx';
import { Mandap } from './ornaments/Mandap.jsx';
import { TornEdge } from './ornaments/Paper.jsx';

const EASE = [0.22, 1, 0.36, 1];

export function HeroV2() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);
  const mandapScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  const fade = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18, filter: reduce ? 'none' : 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 1.1, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <section className="v2-hero" ref={ref} aria-labelledby="v2-names">
      <div className="v2-strands left" aria-hidden="true">
        <GarlandStrand length={6} bell={false} delay={0} />
        <GarlandStrand length={9} delay={0.6} />
        <GarlandStrand length={4} bell={false} delay={1.1} />
      </div>
      <div className="v2-strands right" aria-hidden="true">
        <GarlandStrand length={4} bell={false} delay={0.9} />
        <GarlandStrand length={9} delay={0.3} />
        <GarlandStrand length={6} bell={false} delay={1.4} />
      </div>

      <motion.div className="v2-hero-text" style={{ y: textY, opacity: textOpacity }}>
        <motion.p className="v2-blessing" {...fade(0.2)}>{t.hero.blessing}</motion.p>
        <motion.p className="caps-eyebrow" {...fade(0.4)}>{t.hero.eyebrow}</motion.p>
        <h1 id="v2-names" className="v2-names">
          <motion.span className="v2-name" {...fade(0.6)}>{t.hero.groom}</motion.span>
          <motion.span className="v2-weds" {...fade(0.9)}>{t.hero.weds}</motion.span>
          <motion.span className="v2-name" {...fade(1.1)}>{t.hero.bride}</motion.span>
        </h1>
        <motion.a className="v2-scroll" href="#story" {...fade(1.5)}>
          <span className="caps-eyebrow small">{t.hero.scroll}</span>
          <span className="mouse" aria-hidden="true"><span /></span>
        </motion.a>
      </motion.div>

      <motion.div className="v2-mandap" style={{ scale: mandapScale }}>
        <Mandap label={t.hero.mandapAlt} />
      </motion.div>
      <TornEdge side="top" color="var(--paper-deep)" seed={11} className="v2-hero-tear" />
    </section>
  );
}
