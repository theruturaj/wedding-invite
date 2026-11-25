import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 28, as = 'div', className, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: reduce ? 0.2 : 0.9, delay: reduce ? 0 : delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title }) {
  return (
    <header className="section-heading">
      <Reveal as="p" className="eyebrow">{eyebrow}</Reveal>
      <Reveal as="h2" delay={0.1}>{title}</Reveal>
    </header>
  );
}
