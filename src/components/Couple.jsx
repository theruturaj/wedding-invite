import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { Reveal, SectionHeading } from './Reveal.jsx';
import { Divider, Swastik } from './ornaments/Ornaments.jsx';

function Person({ data, side }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className={`person person-${side}`}
      initial={{ opacity: 0, x: reduce ? 0 : side === 'groom' ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="person-role">{data.role}</p>
      <p className="person-prefix">{data.prefix}</p>
      <h3 className="person-name">{data.name}</h3>
      <p className="person-degree">{data.degree}</p>
      <Divider className="small" />
      <div className="person-family">
        {data.family.map((line) => <p key={line}>{line}</p>)}
      </div>
    </motion.article>
  );
}

export function Couple() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  return (
    <section id="couple" className="section couple">
      <SectionHeading eyebrow={t.couple.eyebrow} title={t.couple.title} />
      <div className="couple-grid">
        <Person data={t.couple.groom} side="groom" />
        <div className="couple-center">
          <motion.div
            className="couple-art"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="/img/couple.jpg" alt={t.couple.artAlt} loading="lazy" width="610" height="710" />
          </motion.div>
          <Reveal delay={0.3} className="couple-swastik">
            <Swastik />
          </Reveal>
        </div>
        <Person data={t.couple.bride} side="bride" />
      </div>
    </section>
  );
}
