import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useMediaQuery } from '../lib/hooks.js';
import { ArchFrame, BananaPlant, Divider, Diya, GarlandStrand, Lotus, Toran } from './ornaments/Ornaments.jsx';

const EASE = [0.22, 1, 0.36, 1];

const item = (delay, reduce) => ({
  initial: { opacity: 0, y: reduce ? 0 : 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay: reduce ? 0 : delay, ease: EASE },
});

export function Hero({ started }) {
  const { t, lang } = useLanguage();
  const reduce = useReducedMotion();
  const isWide = useMediaQuery('(min-width: 760px)');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const plantsY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  if (!started) return <section className="hero" ref={ref} />;

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-names">
      <div className="hero-toran">
        <Toran swags={isWide ? 5 : 3} />
      </div>
      <div className="hero-strands" aria-hidden="true">
        <div className="strand-slot s-left-1"><GarlandStrand length={isWide ? 16 : 9} delay={0} /></div>
        <div className="strand-slot s-left-2"><GarlandStrand length={isWide ? 11 : 6} delay={0.7} /></div>
        <div className="strand-slot s-right-2"><GarlandStrand length={isWide ? 11 : 6} delay={0.4} /></div>
        <div className="strand-slot s-right-1"><GarlandStrand length={isWide ? 16 : 9} delay={1.1} /></div>
      </div>

      <motion.div className="hero-inner" style={{ y: contentY }}>
        <ArchFrame className="hero-arch" />
        <motion.img className="hero-ganesha" src="/img/ganesha.jpg" alt="" width="175" height="190" {...item(0.4, reduce)} />
        <motion.p className="hero-blessing" {...item(0.6, reduce)}>{t.hero.blessing}</motion.p>
        <motion.p className="hero-eyebrow" {...item(0.75, reduce)}>{t.hero.eyebrow}</motion.p>
        <motion.p className="hero-line" {...item(0.9, reduce)}>{t.hero.line}</motion.p>
        <motion.h1 id="hero-names" className="hero-names" {...item(1.1, reduce)} key={lang}>
          <span className="name">{t.hero.groom}</span>
          <motion.span
            className="amp"
            initial={{ scale: reduce ? 1 : 0.4, opacity: 0, rotate: reduce ? 0 : -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12, delay: reduce ? 0 : 1.6 }}
          >
            &amp;
          </motion.span>
          <span className="name">{t.hero.bride}</span>
        </motion.h1>
        <motion.div {...item(1.4, reduce)}><Divider /></motion.div>
        <motion.p className="hero-date" {...item(1.55, reduce)}>{t.hero.date}</motion.p>
        <motion.p className="hero-place" {...item(1.65, reduce)}>{t.hero.place}</motion.p>
        <motion.div className="hero-diyas" {...item(1.8, reduce)}>
          <Diya /><Lotus /><Diya />
        </motion.div>
      </motion.div>

      <motion.div className="hero-plants" style={{ y: plantsY }} aria-hidden="true">
        <BananaPlant className="plant-left" />
        <BananaPlant className="plant-right" flip />
      </motion.div>

      <a className="scroll-cue" href="#couple">
        <span>{t.hero.scroll}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
      </a>
    </section>
  );
}
