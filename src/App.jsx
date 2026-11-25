import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import { SvgDefs } from './components/ornaments/Ornaments.jsx';
import { Envelope } from './components/Envelope.jsx';
import { HeroV2 } from './components/HeroV2.jsx';
import { StoryNote } from './components/StoryNote.jsx';
import { SaveTheDate } from './components/SaveTheDate.jsx';
import { Celebrations } from './components/Celebrations.jsx';
import { PhotoStack } from './components/PhotoStack.jsx';
import { Venue } from './components/Venue.jsx';
import { Footer } from './components/Footer.jsx';
import { LanguageToggle } from './components/LanguageToggle.jsx';
import { MusicToggle } from './components/MusicToggle.jsx';
import { Petals } from './components/Petals.jsx';

export default function App() {
  const [opened, setOpened] = useState(false);
  const music = useRef(null);
  const start = useCallback(() => music.current?.start(), []);
  const open = useCallback(() => setOpened(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <SvgDefs />
        <AnimatePresence>{!opened && <Envelope key="envelope" onStart={start} onOpen={open} />}</AnimatePresence>
        <MusicToggle ref={music} visible={opened} />
        {opened && <LanguageToggle />}
        {opened && <Petals count={12} />}
        <main className="page" aria-hidden={!opened}>
          {opened && (
            <>
              <HeroV2 />
              <StoryNote />
              <SaveTheDate />
              <Celebrations />
              <PhotoStack />
              <Venue />
              <Footer />
            </>
          )}
        </main>
      </LanguageProvider>
    </MotionConfig>
  );
}
