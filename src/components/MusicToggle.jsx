import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { MUSIC_SRC } from '../i18n/content.js';

/**
 * Background music button. Only appears if an audio file actually exists at MUSIC_SRC
 * (the dev server answers missing files with HTML, so the content type is checked).
 * The parent calls ref.start() inside the envelope tap so browsers allow playback.
 */
export const MusicToggle = forwardRef(function MusicToggle({ visible }, ref) {
  const { t } = useLanguage();
  const audioRef = useRef(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(MUSIC_SRC, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled && res.ok && res.headers.get('content-type')?.startsWith('audio')) setAvailable(true);
      })
      .catch(() => {
        // No music configured — the button simply stays hidden.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.5;
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  useImperativeHandle(ref, () => ({ start: () => available && play() }), [available]);

  if (!available) return null;

  const toggle = () => {
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      play();
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
      {visible && (
        <motion.button
          type="button"
          className="music-btn"
          onClick={toggle}
          aria-label={playing ? t.music.pause : t.music.play}
          aria-pressed={playing}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" fill="currentColor" /></svg>
          )}
        </motion.button>
      )}
    </>
  );
});
