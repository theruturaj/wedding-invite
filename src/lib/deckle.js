/** Small deterministic PRNG so edges look the same on every render. */
export function seeded(seed) {
  let s = seed % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const r2 = (n) => Math.round(n * 100) / 100;

/**
 * A CSS clip-path polygon with a rough, hand-torn ("deckled") edge.
 * Coordinates are percentages; `depth` is how far (in %) the edge may bite in.
 * `sides` lists which edges are torn — the others stay straight.
 */
export function deckledPolygon({ seed = 1, depth = 1.2, steps = 28, sides = ['top', 'right', 'bottom', 'left'] } = {}) {
  const rand = seeded(seed);
  const bite = (side) => (sides.includes(side) ? rand() * depth : 0);
  const pts = [];
  for (let i = 0; i < steps; i += 1) pts.push([(i / steps) * 100, bite('top')]);
  for (let i = 0; i < steps; i += 1) pts.push([100 - bite('right'), (i / steps) * 100]);
  for (let i = 0; i < steps; i += 1) pts.push([100 - (i / steps) * 100, 100 - bite('bottom')]);
  for (let i = 0; i < steps; i += 1) pts.push([bite('left'), 100 - (i / steps) * 100]);
  return `polygon(${pts.map(([x, y]) => `${r2(x)}% ${r2(y)}%`).join(', ')})`;
}
