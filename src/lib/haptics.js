// Short vibrations for moments that deserve a physical "click" (seal breaking,
// a card revealed). Only fires where supported and never under reduced motion.
const PATTERNS = { tap: 12, reveal: [10, 40, 18], tick: 4 };

export function haptic(kind = 'tap') {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  // Browsers ignore (and log) vibration before the visitor has interacted with the page.
  if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
  navigator.vibrate(PATTERNS[kind] ?? PATTERNS.tap);
}
