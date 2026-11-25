import { useMemo } from 'react';

/** Deterministic pseudo-random so torn edges look identical on every render. */
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/** A torn-paper edge, drawn as a filled strip. `side` is the edge the tear sits on. */
export function TornEdge({ side = 'bottom', color = 'var(--paper-deep)', seed = 7, height = 22, className = '' }) {
  const d = useMemo(() => {
    const rand = seeded(seed);
    const pts = [];
    for (let x = 0; x <= 400; x += 8) pts.push(`${x},${4 + rand() * (height - 6)}`);
    return `M0,0 L${pts.join(' L')} L400,0 Z`;
  }, [seed, height]);
  const flip = side === 'top' ? 'scale(1,-1)' : undefined;
  return (
    <svg
      className={`torn-edge torn-${side} ${className}`}
      viewBox={`0 0 400 ${height}`}
      preserveAspectRatio="none"
      style={{ transform: flip }}
      aria-hidden="true"
    >
      <path d={d} fill={color} />
    </svg>
  );
}

/** Wax seal with a monogram. `tone` is 'cream' (envelope) or 'maroon'. */
export function WaxSeal({ tone = 'maroon', monogram = 'R G', size = 96, className = '' }) {
  const id = `seal-${tone}`;
  const [light, mid, dark] = tone === 'cream' ? ['#F6E7CF', '#E5CBA4', '#B99467'] : ['#B23A48', '#7E1A2B', '#4A0A14'];
  return (
    <svg className={`wax-seal ${className}`} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor={light} />
          <stop offset="0.55" stopColor={mid} />
          <stop offset="1" stopColor={dark} />
        </radialGradient>
      </defs>
      <path
        d="M50 3 C62 2 70 8 78 12 C88 17 96 28 97 40 C99 52 95 60 96 68 C95 80 85 90 74 94 C64 98 56 96 48 97 C36 98 26 94 17 87 C8 79 3 68 4 56 C4 46 1 38 5 28 C10 16 22 8 34 5 C40 3 45 4 50 3 Z"
        fill={`url(#${id})`}
      />
      <circle cx="50" cy="50" r="31" fill="none" stroke={dark} strokeOpacity="0.45" strokeWidth="2" />
      <circle cx="50" cy="50" r="27" fill="none" stroke={light} strokeOpacity="0.35" strokeWidth="1" />
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="'Great Vibes', cursive"
        fontSize="26"
        fill={dark}
        fillOpacity="0.75"
        style={{ paintOrder: 'stroke' }}
        stroke={light}
        strokeOpacity="0.35"
        strokeWidth="0.6"
      >
        {monogram}
      </text>
    </svg>
  );
}
