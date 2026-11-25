import { motion, useReducedMotion } from 'framer-motion';

/* ---------- Shared gradients (rendered once in App) ---------- */
export function SvgDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="g-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6DC8E" />
          <stop offset="0.45" stopColor="#C9962F" />
          <stop offset="1" stopColor="#8C6118" />
        </linearGradient>
        <linearGradient id="g-gold-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3D27A" />
          <stop offset="0.6" stopColor="#C08A2A" />
          <stop offset="1" stopColor="#7D5414" />
        </linearGradient>
        <linearGradient id="g-leaf" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3F7A2A" />
          <stop offset="0.5" stopColor="#6FAE3B" />
          <stop offset="1" stopColor="#2F6420" />
        </linearGradient>
        <radialGradient id="g-flame" cx="0.5" cy="0.75" r="0.6">
          <stop offset="0" stopColor="#FFF6C8" />
          <stop offset="0.45" stopColor="#FFC23A" />
          <stop offset="1" stopColor="#F2601C" />
        </radialGradient>
        <linearGradient id="g-lotus" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#E86A9A" />
          <stop offset="1" stopColor="#FBD3E2" />
        </linearGradient>

        {/* Watercolour: wobbly edges + pigment granulation, so vector art reads as painted on paper. */}
        <filter id="f-paint" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="3" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="5" xChannelSelector="R" yChannelSelector="G" result="wobbly" />
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="9" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -0.55 1.12" result="grainAlpha" />
          <feComposite in="wobbly" in2="grainAlpha" operator="in" result="grainy" />
          <feGaussianBlur in="grainy" stdDeviation="0.3" result="soft" />
          <feMorphology in="SourceAlpha" operator="erode" radius="1.2" result="inner" />
          <feComposite in="SourceAlpha" in2="inner" operator="out" result="rim" />
          <feDisplacementMap in="rim" in2="warp" scale="5" xChannelSelector="R" yChannelSelector="G" result="rimW" />
          <feFlood floodColor="#3b2410" floodOpacity="0.28" />
          <feComposite in2="rimW" operator="in" result="edge" />
          <feMerge>
            <feMergeNode in="soft" />
            <feMergeNode in="edge" />
          </feMerge>
        </filter>

        {/* Pressed wax / metal relief lit from the top-left. */}
        <filter id="f-relief" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.6" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="3.5" specularConstant="0.75" specularExponent="22" lightingColor="#fff6e6" result="spec">
            <fePointLight x="-60" y="-80" z="140" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
          <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k1="0" k2="1" k3="0.55" k4="0" />
        </filter>
      </defs>
    </svg>
  );
}

/* ---------- Marigold flower ---------- */
const MARIGOLD = [
  ['#F7A51C', '#E0700E'],
  ['#FFCB2E', '#F0A00A'],
  ['#F2701A', '#C8460C'],
];

export function Marigold({ cx, cy, r, tone = 0 }) {
  const [fill, edge] = MARIGOLD[tone % MARIGOLD.length];
  const petals = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return <circle key={i} cx={cx + Math.cos(a) * r * 0.62} cy={cy + Math.sin(a) * r * 0.62} r={r * 0.45} fill={edge} />;
  });
  return (
    <g>
      {petals}
      <circle cx={cx} cy={cy} r={r * 0.8} fill={fill} />
      <circle cx={cx} cy={cy} r={r * 0.32} fill={edge} opacity="0.7" />
    </g>
  );
}

function MangoLeaf({ x, y, rot = 0, size = 1 }) {
  return (
    <path
      transform={`translate(${x} ${y}) rotate(${rot}) scale(${size})`}
      d="M0 0 C8 10 9 26 0 40 C-9 26 -8 10 0 0 Z"
      fill="url(#g-leaf)"
      stroke="#2D5A1C"
      strokeWidth="0.8"
    />
  );
}

/* ---------- Toran: swags of marigolds with mango leaves ---------- */
export function Toran({ swags = 5 }) {
  const width = swags * 240;
  const reduce = useReducedMotion();
  const flowers = [];
  const leaves = [];
  for (let s = 0; s < swags; s += 1) {
    const x0 = s * 240;
    for (let i = 0; i <= 14; i += 1) {
      const t = i / 14;
      const sag = 62 * (1 - (2 * t - 1) ** 2);
      flowers.push({ x: x0 + t * 240, y: 14 + sag, tone: (i + s) % 3, key: `${s}-${i}` });
    }
    leaves.push({ x: x0 + 120, y: 82, key: `l${s}` });
  }
  return (
    <svg className="toran" viewBox={`0 0 ${width} 150`} preserveAspectRatio="xMidYMin meet" aria-hidden="true">
      <rect x="0" y="0" width={width} height="10" fill="url(#g-gold-v)" />
      {leaves.map((l) => (
        <motion.g
          key={l.key}
          style={{ transformOrigin: `${l.x}px ${l.y}px` }}
          animate={reduce ? undefined : { rotate: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MangoLeaf x={l.x - 10} y={l.y} rot={14} />
          <MangoLeaf x={l.x + 10} y={l.y} rot={-14} />
          <Marigold cx={l.x} cy={l.y + 2} r={9} tone={2} />
          <circle cx={l.x} cy={l.y + 50} r={6} fill="#C92A3E" />
        </motion.g>
      ))}
      {flowers.map((f) => (
        <Marigold key={f.key} cx={f.x} cy={f.y} r={10} tone={f.tone} />
      ))}
    </svg>
  );
}

/* ---------- Hanging garland strand ending in a bell ---------- */
export function GarlandStrand({ length = 14, delay = 0, bell = true }) {
  const reduce = useReducedMotion();
  const height = length * 18 + (bell ? 90 : 10);
  return (
    <motion.svg
      className="strand"
      viewBox={`0 0 60 ${height}`}
      style={{ transformOrigin: '50% 0%' }}
      animate={reduce ? undefined : { rotate: [-3, 3, -3] }}
      transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <line x1="30" y1="0" x2="30" y2={length * 18} stroke="#8C6118" strokeWidth="1.5" />
      {Array.from({ length }, (_, i) => (
        <Marigold key={i} cx={30} cy={10 + i * 18} r={10} tone={i % 3} />
      ))}
      {bell && <Bell x={10} y={length * 18 + 2} scale={0.68} delay={delay} />}
    </motion.svg>
  );
}

/* ---------- Temple bell ---------- */
export function Bell({ x = 0, y = 0, scale = 1, delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <motion.g
        style={{ transformOrigin: '30px 0px' }}
        animate={reduce ? undefined : { rotate: [0, 9, -7, 4, 0] }}
        transition={{ duration: 3.2, delay: delay + 0.6, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
      >
        <circle cx="30" cy="6" r="6" fill="none" stroke="url(#g-gold)" strokeWidth="3" />
        <path d="M30 12 C18 14 14 30 13 50 C12 64 6 70 2 76 H58 C54 70 48 64 47 50 C46 30 42 14 30 12 Z" fill="url(#g-gold)" stroke="#7D5414" strokeWidth="1" />
        <path d="M14 40 H46" stroke="#F6DC8E" strokeWidth="1.5" opacity="0.7" />
        <path d="M12 58 H48" stroke="#7D5414" strokeWidth="1" opacity="0.6" />
        <ellipse cx="30" cy="76" rx="28" ry="5" fill="#9B6B1C" />
        <circle cx="30" cy="84" r="6" fill="url(#g-gold)" stroke="#7D5414" strokeWidth="1" />
      </motion.g>
    </g>
  );
}

/* ---------- Diya (oil lamp) with flickering flame ---------- */
export function Diya({ className = '' }) {
  return (
    <svg className={`diya ${className}`} viewBox="0 0 80 80" aria-hidden="true">
      <ellipse cx="40" cy="44" rx="16" ry="10" fill="#FFB43A" opacity="0.25" className="diya-glow" />
      <path className="diya-flame" d="M40 14 C47 26 49 34 40 44 C31 34 33 26 40 14 Z" fill="url(#g-flame)" />
      <path d="M6 48 C14 50 66 50 74 48 C70 66 56 72 40 72 C24 72 10 66 6 48 Z" fill="url(#g-gold)" stroke="#7D5414" strokeWidth="1" />
      <path d="M12 55 C26 60 54 60 68 55" stroke="#F6DC8E" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M30 72 L26 78 H54 L50 72 Z" fill="#9B6B1C" />
    </svg>
  );
}

/* ---------- Lotus ---------- */
export function Lotus({ className = '' }) {
  const petal = 'M50 58 C38 44 38 22 50 6 C62 22 62 44 50 58 Z';
  return (
    <svg className={`lotus ${className}`} viewBox="0 0 100 64" aria-hidden="true">
      {[-62, -34, 34, 62].map((r) => (
        <path key={r} d={petal} transform={`rotate(${r} 50 58)`} fill="url(#g-lotus)" stroke="#C44C7E" strokeWidth="0.8" opacity="0.92" />
      ))}
      <path d={petal} fill="url(#g-lotus)" stroke="#C44C7E" strokeWidth="0.8" />
      <path d="M22 60 C40 54 60 54 78 60" stroke="#3F7A2A" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Banana plant (cluster of leaves) ---------- */
function BananaLeaf({ rot, len, delay }) {
  const reduce = useReducedMotion();
  const veins = Array.from({ length: 9 }, (_, i) => {
    const y = -20 - i * (len / 11);
    return <path key={i} d={`M0 ${y} L-24 ${y + 16} M0 ${y} L24 ${y + 16}`} stroke="#2F6420" strokeWidth="0.8" opacity="0.55" />;
  });
  return (
    <motion.g
      style={{ transformOrigin: '0px 0px' }}
      initial={{ rotate: rot }}
      animate={reduce ? { rotate: rot } : { rotate: [rot - 3, rot + 3, rot - 3] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d={`M0 0 C-30 ${-len * 0.3} -30 ${-len * 0.8} 0 ${-len} C30 ${-len * 0.8} 30 ${-len * 0.3} 0 0 Z`} fill="url(#g-leaf)" />
      {veins}
      <path d={`M0 0 L0 ${-len}`} stroke="#C8D98A" strokeWidth="2" />
    </motion.g>
  );
}

export function BananaPlant({ className = '', flip = false }) {
  return (
    <svg className={`banana ${className}`} viewBox="-120 -330 240 340" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M-10 10 C-8 -60 -6 -120 0 -150 C6 -120 8 -60 10 10 Z" fill="#7A9A3A" />
      <g transform="translate(0 -140)">
        <BananaLeaf rot={-58} len={170} delay={0} />
        <BananaLeaf rot={-24} len={190} delay={0.8} />
        <BananaLeaf rot={8} len={180} delay={1.6} />
        <BananaLeaf rot={44} len={160} delay={0.4} />
      </g>
    </svg>
  );
}

/* ---------- Swastik (auspicious symbol, as on the printed card) ---------- */
export function Swastik({ className = '' }) {
  return (
    <svg className={`swastik ${className}`} viewBox="0 0 100 100" role="img" aria-label="Swastik">
      <path
        d="M50 50 V15 H85 M50 50 H85 V85 M50 50 V85 H15 M50 50 H15 V15"
        fill="none"
        stroke="#C8202E"
        strokeWidth="9"
        strokeLinecap="square"
      />
      {[[67, 33], [67, 67], [33, 67], [33, 33]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="#C8202E" />
      ))}
    </svg>
  );
}

/* ---------- Divider flourish ---------- */
export function Divider({ className = '' }) {
  return (
    <svg className={`divider ${className}`} viewBox="0 0 240 24" aria-hidden="true">
      <path d="M0 12 H92 M148 12 H240" stroke="url(#g-gold)" strokeWidth="1.2" />
      <path d="M92 12 C100 4 108 4 112 12 C108 20 100 20 92 12 Z M148 12 C140 4 132 4 128 12 C132 20 140 20 148 12 Z" fill="url(#g-gold)" />
      <path d="M120 2 L128 12 L120 22 L112 12 Z" fill="url(#g-gold)" />
      <circle cx="120" cy="12" r="2.5" fill="#FBF4E4" />
    </svg>
  );
}

/* ---------- Mughal arch frame, drawn on mount ---------- */
export function ArchFrame({ className = '' }) {
  const reduce = useReducedMotion();
  const d = 'M20 600 V230 C20 150 120 120 160 78 C182 54 194 36 200 12 C206 36 218 54 240 78 C280 120 380 150 380 230 V600';
  const draw = reduce
    ? {}
    : { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { duration: 2.4, ease: 'easeInOut', delay: 0.3 } };
  return (
    <svg className={`arch ${className}`} viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden="true">
      <motion.path d={d} fill="none" stroke="url(#g-gold-v)" strokeWidth="2.4" {...draw} />
      <motion.path
        d={d}
        transform="translate(14 18) scale(0.93 0.97)"
        fill="none"
        stroke="url(#g-gold-v)"
        strokeWidth="1"
        {...draw}
      />
    </svg>
  );
}
