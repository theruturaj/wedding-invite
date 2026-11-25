import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { LANGS, content } from '../i18n/content.js';

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="lang-toggle" role="group" aria-label="Language / भाषा">
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={lang === code}
          className={lang === code ? 'active' : ''}
          onClick={() => setLang(code)}
        >
          {lang === code && (
            <motion.span layoutId="lang-pill" className="lang-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
          )}
          <span className="lang-label">{code === 'en' ? 'EN' : 'मराठी'}</span>
          <span className="sr-only">{content[code].langName}</span>
        </button>
      ))}
    </div>
  );
}
