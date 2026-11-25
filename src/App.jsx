import { useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import { SvgDefs } from './components/ornaments/Ornaments.jsx';
import { Gate } from './components/Gate.jsx';
import { Hero } from './components/Hero.jsx';
import { Couple } from './components/Couple.jsx';
import { Countdown } from './components/Countdown.jsx';
import { Events } from './components/Events.jsx';
import { Venue } from './components/Venue.jsx';
import { Gallery } from './components/Gallery.jsx';
import { Footer } from './components/Footer.jsx';
import { LanguageToggle } from './components/LanguageToggle.jsx';
import { Petals } from './components/Petals.jsx';

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <SvgDefs />
        <AnimatePresence>{!opened && <Gate key="gate" onOpen={() => setOpened(true)} />}</AnimatePresence>
        {opened && <LanguageToggle />}
        {opened && <Petals />}
        <main aria-hidden={!opened}>
          <Hero started={opened} />
          {opened && (
            <>
              <Couple />
              <Countdown />
              <Events />
              <Venue />
              <Gallery />
              <Footer />
            </>
          )}
        </main>
      </LanguageProvider>
    </MotionConfig>
  );
}
