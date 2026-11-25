import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { content, LANGS } from './content.js';

const STORAGE_KEY = 'wedding-lang';
const LanguageContext = createContext(null);

function readInitialLang() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {
    // Storage can be blocked (private mode); fall back to browser language.
  }
  return navigator.language?.toLowerCase().startsWith('mr') ? 'mr' : 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang);

  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Non-fatal: the choice just won't persist.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: content[lang] }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
