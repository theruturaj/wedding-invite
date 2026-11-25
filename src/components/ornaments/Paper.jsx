import { useId, useMemo } from 'react';
import { seeded } from '../../lib/deckle.js';

/** A torn-paper edge, drawn as a filled strip. `side` is the edge the tear sits on. */
export function TornEdge({ side = 'bottom', color = 'var(--paper-deep)', seed = 7, height = 22, className = '' }) {
  const d = useMemo(() => {
    const rand = seeded(seed);
    const pts = [];
    for (let x = 0; x <= 400; x += 6) pts.push(`${x},${4 + rand() * (height - 6)}`);
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
      <path d={d} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const SEAL_TONES = {
  cream: { light: '#FBEFD9', mid: '#E2C69C', dark: '#A88257', ink: '#8C6638' },
  maroon: { light: '#C2505D', mid: '#86202F', dark: '#4A0A14', ink: '#3A060F' },
};

// Irregular wax blob with little overflow lobes where the wax spread.
const BLOB =
  'M50 2 C58 1 63 5 70 6 C79 7 86 13 91 21 C95 27 99 33 98 41 C97 47 100 53 98 60 C96 69 93 76 87 83 C81 90 73 95 64 97 C58 98 53 99 47 98 C38 97 29 95 21 89 C13 83 7 76 4 67 C2 60 0 54 2 47 C3 40 1 33 5 26 C10 17 17 10 26 6 C34 3 42 3 50 2 Z';

/** Wax seal with a pressed rim and monogram, lit from the top-left. */
export function WaxSeal({ tone = 'maroon', monogram = 'R G', size = 96, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const c = SEAL_TONES[tone];
  return (
    <svg className={`wax-seal ${className}`} width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id={`${uid}-w`} cx="0.36" cy="0.3" r="0.8">
          <stop offset="0" stopColor={c.light} />
          <stop offset="0.5" stopColor={c.mid} />
          <stop offset="1" stopColor={c.dark} />
        </radialGradient>
        <radialGradient id={`${uid}-well`} cx="0.6" cy="0.65" r="0.7">
          <stop offset="0" stopColor={c.light} stopOpacity="0.35" />
          <stop offset="1" stopColor={c.dark} stopOpacity="0.35" />
        </radialGradient>
      </defs>
      <g filter="url(#f-relief)">
        <path d={BLOB} fill={`url(#${uid}-w)`} />
        {/* raised rim of the stamp impression */}
        <circle cx="50" cy="50" r="33" fill="none" stroke={c.mid} strokeWidth="6" />
        {/* the pressed well */}
        <circle cx="50" cy="50" r="29" fill={`url(#${uid}-well)`} />
      </g>
      <circle cx="50" cy="50" r="29.5" fill="none" stroke={c.dark} strokeOpacity="0.55" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="36.5" fill="none" stroke={c.light} strokeOpacity="0.5" strokeWidth="0.8" />
      {/* debossed monogram: dark core with a light lower-right lip */}
      <g fontFamily="'Great Vibes', cursive" fontSize="25" textAnchor="middle">
        <text x="50.7" y="58.7" fill={c.light} fillOpacity="0.55">{monogram}</text>
        <text x="50" y="58" fill={c.ink} fillOpacity="0.8">{monogram}</text>
      </g>
      {/* glossy highlight */}
      <ellipse cx="34" cy="24" rx="12" ry="5" transform="rotate(-28 34 24)" fill="#fff" opacity="0.28" />
    </svg>
  );
}

/** Paper texture + light, applied as a background layer inside any paper surface. */
export function PaperGrain({ className = '' }) {
  return <span className={`paper-grain ${className}`} aria-hidden="true" />;
}
