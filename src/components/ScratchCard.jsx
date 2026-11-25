import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { clearedRatio } from '../lib/scratch.js';

const BRUSH = 28;
const AUTO_REVEAL = 0.45;
const BURST = ['#F7A51C', '#F2701A', '#FFCB2E', '#E86A9A', '#C8202E', '#F7A51C', '#FFCB2E', '#E86A9A'];

function paintCover(canvas, label) {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
  const g = ctx.createLinearGradient(0, 0, width, height);
  g.addColorStop(0, '#E8D3A2');
  g.addColorStop(0.5, '#D2AE69');
  g.addColorStop(1, '#E3C88E');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);
  // a little sparkle
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  for (let i = 0; i < 40; i += 1) {
    ctx.beginPath();
    ctx.arc((i * 53) % width, (i * 29) % height, (i % 3) * 0.6 + 0.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = 'rgba(90, 55, 20, 0.85)';
  ctx.font = `italic 500 ${Math.min(18, height * 0.36)}px 'Cormorant Garamond', 'Tiro Devanagari Marathi', serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
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
    const draw = () => {
      ctxRef.current = paintCover(canvasRef.current, label);
    };
    draw();
    document.fonts?.ready.then(draw);
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [label, revealed]);

  const check = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    if (clearedRatio(data, 16) > AUTO_REVEAL) setRevealed(true);
  }, []);

  const scratch = (e) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const p = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = BRUSH;
    ctx.beginPath();
    ctx.moveTo((last.current ?? p).x, (last.current ?? p).y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    moves.current += 1;
    if (moves.current % 10 === 0) check();
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
                e.currentTarget.setPointerCapture(e.pointerId);
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
