import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

const COLORS = ['#F7A51C', '#F2701A', '#FFCB2E', '#E86A9A', '#C8202E'];

/** Falling marigold and rose petals — pure CSS animation, decorative only. */
export function Petals({ count = 18 }) {
  const reduce = useReducedMotion();
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 97) % 100}%`,
        size: 8 + ((i * 7) % 9),
        duration: 11 + ((i * 13) % 10),
        delay: -((i * 1.7) % 18),
        drift: ((i % 5) - 2) * 40,
        color: COLORS[i % COLORS.length],
      })),
    [count],
  );
  if (reduce) return null;
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.3,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
