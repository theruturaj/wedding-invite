import { motion, useReducedMotion } from 'framer-motion';
import { Marigold } from './Ornaments.jsx';

const EASE = [0.22, 1, 0.36, 1];

function Pillar({ x, top, bottom, w, shade }) {
  return (
    <g>
      <rect x={x - w / 2} y={top} width={w} height={bottom - top} fill={shade} />
      <rect x={x - w / 2} y={top} width={w * 0.28} height={bottom - top} fill="#fff" opacity="0.12" />
      {[0.18, 0.5, 0.82].map((t) => (
        <rect key={t} x={x - w / 2 - 2} y={top + (bottom - top) * t} width={w + 4} height="5" rx="2" fill="#8A5A2B" />
      ))}
      <rect x={x - w / 2 - 5} y={top - 8} width={w + 10} height="10" rx="3" fill="#7A4B22" />
      <rect x={x - w / 2 - 6} y={bottom - 6} width={w + 12} height="10" rx="3" fill="#6B3F1A" />
      {/* garland wound round the pillar */}
      {Array.from({ length: Math.floor((bottom - top) / 16) }, (_, i) => (
        <Marigold key={i} cx={x + (i % 2 ? w / 2 : -w / 2)} cy={top + 10 + i * 16} r={4.5} tone={i % 3} />
      ))}
    </g>
  );
}

function LeafFringe({ x0, x1, y }) {
  const leaves = [];
  for (let x = x0; x <= x1; x += 9) {
    leaves.push(
      <path key={x} d={`M${x} ${y} C${x + 5} ${y + 7} ${x + 5} ${y + 16} ${x} ${y + 22} C${x - 5} ${y + 16} ${x - 5} ${y + 7} ${x} ${y} Z`} fill={x % 18 ? '#4E8A2E' : '#6FAE3B'} />,
    );
  }
  return <g>{leaves}</g>;
}

function Swag({ x0, x1, y, sag, count = 9 }) {
  return (
    <g>
      {Array.from({ length: count + 1 }, (_, i) => {
        const t = i / count;
        return <Marigold key={i} cx={x0 + (x1 - x0) * t} cy={y + sag * (1 - (2 * t - 1) ** 2)} r={4.2} tone={i % 3} />;
      })}
    </g>
  );
}

/** Illustrated mandap: carved pillars, leaf canopy, marigold swags and a sacred fire. */
export function Mandap({ className = '', label }) {
  const reduce = useReducedMotion();
  const rise = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <svg className={`mandap ${className}`} viewBox="0 0 400 380" role="img" aria-label={label}>
      <defs>
        <linearGradient id="m-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3EADB" stopOpacity="0" />
          <stop offset="1" stopColor="#E9DEC4" />
        </linearGradient>
        <linearGradient id="m-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9DBF6A" />
          <stop offset="1" stopColor="#5E8A3A" />
        </linearGradient>
        <linearGradient id="m-wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8E5B2C" />
          <stop offset="0.5" stopColor="#B07A40" />
          <stop offset="1" stopColor="#7A4B22" />
        </linearGradient>
        <linearGradient id="m-stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E6D3B3" />
          <stop offset="1" stopColor="#C9B08A" />
        </linearGradient>
      </defs>

      <rect width="400" height="380" fill="url(#m-sky)" />

      {/* hills, trees and garden */}
      <motion.g {...rise(0)} filter="url(#f-paint)">
        <path d="M0 250 C60 225 120 236 200 240 C280 236 340 222 400 246 V380 H0 Z" fill="url(#m-grass)" />
        {[[34, 228, 20], [70, 238, 14], [356, 226, 22], [322, 238, 13]].map(([cx, cy, r]) => (
          <g key={cx}>
            <rect x={cx - 2} y={cy} width="4" height={r + 8} fill="#6B4A2A" />
            <circle cx={cx} cy={cy} r={r} fill="#5E8A3A" />
            <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.55} fill="#7FAE4E" />
          </g>
        ))}
        {[[20, 300], [60, 318], [340, 304], [380, 322], [100, 340], [300, 344]].map(([x, y], i) => (
          <g key={x}>
            <circle cx={x} cy={y} r="14" fill="#4E7A2E" />
            <circle cx={x - 4} cy={y - 6} r="3.4" fill={['#E86A9A', '#F7A51C', '#C8202E', '#F2C4E0'][i % 4]} />
            <circle cx={x + 6} cy={y - 2} r="3" fill={['#F7A51C', '#E86A9A', '#F2C4E0', '#C8202E'][i % 4]} />
          </g>
        ))}
      </motion.g>

      {/* stone steps leading up */}
      <motion.g {...rise(0.15)} filter="url(#f-paint)">
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${150 - i * 14} ${300 + i * 20} H${250 + i * 14} L${256 + i * 16} ${318 + i * 20} H${144 - i * 16} Z`}
            fill="url(#m-stone)"
            stroke="#B49A74"
            strokeWidth="0.8"
          />
        ))}
      </motion.g>

      {/* mandap structure */}
      <motion.g {...rise(0.35)} filter="url(#f-paint)">
        <rect x="70" y="282" width="260" height="18" rx="3" fill="#C9B08A" stroke="#A88B62" />
        <rect x="80" y="276" width="240" height="8" fill="#B5986F" />
        <Pillar x={122} top={142} bottom={278} w={12} shade="#9C6A36" />
        <Pillar x={278} top={142} bottom={278} w={12} shade="#9C6A36" />
        <Pillar x={92} top={120} bottom={288} w={18} shade="url(#m-wood)" />
        <Pillar x={308} top={120} bottom={288} w={18} shade="url(#m-wood)" />

        {/* canopy */}
        <path d="M70 112 L200 70 L330 112 Z" fill="#8E5B2C" />
        <path d="M84 110 L200 76 L316 110 Z" fill="#B07A40" />
        <rect x="64" y="108" width="272" height="14" rx="3" fill="url(#m-wood)" />
        <LeafFringe x0={68} x1={332} y={120} />
        <Swag x0={68} x1={332} y={104} sag={-2} count={30} />
        <Swag x0={100} x1={200} y={142} sag={20} />
        <Swag x0={200} x1={300} y={142} sag={20} />
        <circle cx="200" cy="66" r="6" fill="url(#g-gold)" />
      </motion.g>

      {/* hanging strands */}
      <motion.g {...rise(0.55)}>
        {[100, 140, 260, 300].map((x, i) => (
          <motion.g
            key={x}
            style={{ transformOrigin: `${x}px 142px` }}
            animate={reduce ? undefined : { rotate: [-3, 3, -3] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {Array.from({ length: 6 }, (_, j) => <Marigold key={j} cx={x} cy={146 + j * 9} r={4} tone={(j + i) % 3} />)}
          </motion.g>
        ))}
      </motion.g>

      {/* seats, kalash and the sacred fire */}
      <motion.g {...rise(0.75)}>
        <rect x="138" y="246" width="34" height="26" rx="4" fill="#B5442E" />
        <rect x="138" y="242" width="34" height="8" rx="3" fill="#D8A23A" />
        <rect x="228" y="246" width="34" height="26" rx="4" fill="#B5442E" />
        <rect x="228" y="242" width="34" height="8" rx="3" fill="#D8A23A" />
        <path d="M180 264 H220 L216 278 H184 Z" fill="#9A4A2A" />
        <rect x="178" y="258" width="44" height="7" fill="#C2643A" />
        <g className="mandap-fire">
          <path d="M200 226 C210 238 214 248 206 260 C202 254 200 250 200 246 C198 252 196 256 192 260 C186 248 190 238 200 226 Z" fill="url(#g-flame)" />
        </g>
        <ellipse cx="200" cy="246" rx="26" ry="18" fill="#FFB43A" opacity="0.18" className="diya-glow" />
        {/* kalash */}
        <path d="M110 262 C102 266 102 276 110 280 H126 C134 276 134 266 126 262 Z" fill="url(#g-gold)" />
        <circle cx="118" cy="257" r="5" fill="#8A5A2B" />
        <path d="M112 259 C106 252 104 254 102 250 M124 259 C130 252 132 254 134 250" stroke="#4E8A2E" strokeWidth="2.5" fill="none" />
        {/* diya stand */}
        <rect x="285" y="250" width="4" height="28" fill="url(#g-gold)" />
        <ellipse cx="287" cy="250" rx="9" ry="3" fill="url(#g-gold)" />
        <path className="diya-flame" d="M287 238 C290 243 291 246 287 249 C283 246 284 243 287 238 Z" fill="url(#g-flame)" />
      </motion.g>
    </svg>
  );
}
