import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { clearedRatio } from '../lib/scratch.js';
import { haptic } from '../lib/haptics.js';

const BRUSH = 44;
const AUTO_REVEAL = 0.3;
const BURST = ['#F7A51C', '#F2701A', '#FFCB2E', '#E86A9A', '#C8202E', '#F7A51C', '#FFCB2E', '#E86A9A'];

function paintCover(canvas, label) {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.globalCompositeOperation = 'source-over';

  // metallic base: several bands of light across brushed gold
  const g = ctx.createLinearGradient(0, 0, width, height * 0.6);
  [['#B8893A', 0], ['#F3DDA0', 0.18], ['#C99A48', 0.34], ['#FBEBC0', 0.5], ['#B98A3B', 0.68], ['#E9CD8A', 0.84], ['#A87A2E', 1]].forEach(
    ([c, o]) => g.addColorStop(o, c),
  );
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);

  // brushed-metal streaks
  ctx.lineWidth = 0.6;
  for (let i = 0; i < height * 1.6; i += 1) {
    const y = (i * 7.3) % height;
    ctx.strokeStyle = i % 3 ? 'rgba(255,255,255,0.10)' : 'rgba(90,60,15,0.10)';
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y + ((i % 5) - 2) * 0.6);
    ctx.stroke();
  }

  // fine grain
  for (let i = 0; i < width * height * 0.06; i += 1) {
    ctx.fillStyle = i % 2 ? 'rgba(255,255,255,0.18)' : 'rgba(70,45,10,0.14)';
    ctx.fillRect((i * 31.7) % width, (i * 17.3) % height, 1, 1);
  }

  // embossed label: dark core, light lower lip
  const size = Math.min(18, height * 0.36);
  ctx.font = `italic 600 ${size}px 'Cormorant Garamond', 'Tiro Devanagari Marathi', serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 246, 220, 0.75)';
  ctx.fillText(label, width / 2 + 0.8, height / 2 + 0.9);
  ctx.fillStyle = 'rgba(92, 60, 18, 0.85)';
  ctx.fillText(label, width / 2, height / 2);
  return ctx;
}

/**
 * Covers its children with a gold foil the guest scratches away.
 * The content stays in the DOM for screen readers; a button reveals it for keyboard users.
 */
export function ScratchCard({ children, label, revealLabel, className = '' }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const last = useRef(null);
  const moves = useRef(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed || !canvasRef.current) return undefined;
    let width = 0;
    const draw = () => {
      ctxRef.current = paintCover(canvasRef.current, label);
      width = canvasRef.current.getBoundingClientRect().width;
    };
    // Phones fire resize when the URL bar hides on scroll; only repaint (and wipe
    // scratch progress) if the card actually changed width.
    const onResize = () => {
      if (canvasRef.current && Math.abs(canvasRef.current.getBoundingClientRect().width - width) > 1) draw();
    };
    draw();
    document.fonts?.ready.then(() => {
      if (moves.current === 0) draw();
    });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [label, revealed]);

  const check = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (clearedRatio(data, 16) > AUTO_REVEAL) {
      haptic('reveal');
      setRevealed(true);
    }
  }, []);

  const scratch = (e) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const p = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    ctx.globalCompositeOperation = 'destination-out';
    // Fully opaque "eraser" — painting the foil leaves a translucent stroke style behind.
    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#000';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = BRUSH;
    ctx.beginPath();
    if (last.current) {
      ctx.moveTo(last.current.x, last.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    } else {
      // first touch: a round dab (zero-length strokes aren't drawn)
      ctx.arc(p.x, p.y, BRUSH / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    last.current = p;
    moves.current += 1;
    if (moves.current % 4 === 0) check();
    if (moves.current % 14 === 0) haptic('tick');
  };

  return (
    <div className={`scratch ${className}`}>
      <div className="scratch-content">{children}</div>
      <AnimatePresence>
        {!revealed && (
          <motion.div className="scratch-layer" exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.45 }}>
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              onPointerDown={(e) => {
                try {
                  e.currentTarget.setPointerCapture(e.pointerId);
                } catch {
                  // Capture is a nicety; scratching still works without it.
                }
                last.current = null;
                scratch(e);
              }}
              onPointerMove={(e) => {
                if (e.buttons || e.pointerType === 'touch') scratch(e);
              }}
              onPointerUp={() => {
                last.current = null;
                check();
              }}
            />
            <button type="button" className="scratch-skip" onClick={() => setRevealed(true)}>
              {revealLabel}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {revealed && (
        <span className="scratch-burst" aria-hidden="true">
          {BURST.map((c, i) => {
            const a = (i / BURST.length) * Math.PI * 2;
            return (
              <motion.i
                key={c + i}
                style={{ background: c }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                animate={{ x: Math.cos(a) * 70, y: Math.sin(a) * 34, opacity: 0, rotate: 200 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            );
          })}
        </span>
      )}
    </div>
  );
}
