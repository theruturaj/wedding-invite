import { useLanguage } from '../i18n/LanguageContext.jsx';
import { Reveal } from './Reveal.jsx';
import { Divider, Diya, Toran } from './ornaments/Ornaments.jsx';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="footer-toran"><Toran swags={3} /></div>
      <Reveal as="p" className="footer-presence">{t.footer.presence}</Reveal>
      <Reveal className="footer-inviter" delay={0.1}>
        <Diya />
        <div>
          <p className="eyebrow">{t.footer.inviter}</p>
          <p className="footer-family">{t.footer.family}</p>
        </div>
        <Diya />
      </Reveal>
      <Divider />
    </footer>
  );
}
