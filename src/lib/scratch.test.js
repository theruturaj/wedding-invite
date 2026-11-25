import { describe, it, expect } from 'vitest';
import { clearedRatio } from './scratch.js';

const pixels = (alphas) => {
  const data = new Uint8ClampedArray(alphas.length * 4);
  alphas.forEach((a, i) => { data[i * 4 + 3] = a; });
  return data;
};

describe('clearedRatio', () => {
  it('is 0 for a fully covered layer', () => {
    expect(clearedRatio(pixels([255, 255, 255, 255]), 1)).toBe(0);
  });
  it('counts transparent pixels', () => {
    expect(clearedRatio(pixels([0, 0, 255, 255]), 1)).toBe(0.5);
  });
  it('samples every nth pixel', () => {
    expect(clearedRatio(pixels([0, 255, 0, 255]), 2)).toBe(1);
  });
  it('handles empty input', () => {
    expect(clearedRatio(new Uint8ClampedArray(0), 1)).toBe(0);
  });
});
