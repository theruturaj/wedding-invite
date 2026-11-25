/**
 * Fraction of sampled pixels that are (nearly) transparent in RGBA data.
 * Used to decide when a scratch card has been scratched enough to auto-reveal.
 */
export function clearedRatio(data, step = 8) {
  const total = Math.floor(data.length / 4);
  if (total === 0) return 0;
  let sampled = 0;
  let cleared = 0;
  for (let i = 0; i < total; i += step) {
    sampled += 1;
    if (data[i * 4 + 3] < 32) cleared += 1;
  }
  return cleared / sampled;
}
