import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

const KINDS = ['p0', 'p1', 'p2', 'p0', 'p1'];

/**
 * Marigold and rose petals drifting down. Each petal falls and sways (outer span)
 * while tumbling in 3D (inner element); a few are larger and blurred as if close
 * to the camera, others small and soft as if far away.
 */
export function Petals({ count = 14 }) {
  const reduce = useReducedMotion();
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const depth = i % 5 === 0 ? 'near' : i % 3 === 0 ? 'far' : '';
        const base = depth === 'near' ? 22 : depth === 'far' ? 9 : 14;
        return {
          id: i,
          kind: KINDS[i % KINDS.length],
          depth,
          left: `${(i * 37 + 11) % 100}%`,
          size: base + ((i * 7) % 5),
          fall: (depth === 'near' ? 9 : depth === 'far' ? 20 : 14) + ((i * 13) % 6),
          flutter: 1.6 + ((i * 7) % 10) / 6,
          delay: -((i * 2.3) % 20),
          drift: ((i % 5) - 2) * 45,
        };
      }),
    [count],
  );
  if (reduce) return null;
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className={`petal ${p.kind} ${p.depth}`}
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.25,
            animationDuration: `${p.fall}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`,
          }}
        >
          <i style={{ animationDuration: `${p.flutter}s` }} />
        </span>
      ))}
    </div>
  );
}
