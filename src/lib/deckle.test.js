import { describe, it, expect } from 'vitest';
import { deckledPolygon } from './deckle.js';

describe('deckledPolygon', () => {
  it('returns a CSS polygon()', () => {
    expect(deckledPolygon({ seed: 1 })).toMatch(/^polygon\(.+\)$/);
  });
  it('is deterministic for a seed', () => {
    expect(deckledPolygon({ seed: 5 })).toBe(deckledPolygon({ seed: 5 }));
    expect(deckledPolygon({ seed: 5 })).not.toBe(deckledPolygon({ seed: 6 }));
  });
  it('keeps every point inside the box within the given depth', () => {
    const pts = deckledPolygon({ seed: 3, depth: 1.5 })
      .slice(8, -1)
      .split(',')
      .map((p) => p.trim().split(' ').map((v) => parseFloat(v)));
    expect(pts.length).toBeGreaterThan(40);
    pts.forEach(([x, y]) => {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(100);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(100);
      const nearEdge = x <= 1.5 || x >= 98.5 || y <= 1.5 || y >= 98.5;
      expect(nearEdge).toBe(true);
    });
  });
  it('can leave chosen sides straight', () => {
    const poly = deckledPolygon({ seed: 2, sides: ['left'] });
    expect(poly).toContain('100% 0%');
    expect(poly).toContain('100% 100%');
  });
});
