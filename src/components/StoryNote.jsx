import { useLanguage } from '../i18n/LanguageContext.jsx';
import { Reveal } from './Reveal.jsx';
import { Divider, Swastik } from './ornaments/Ornaments.jsx';
import { TornEdge } from './ornaments/Paper.jsx';

function Person({ data }) {
  return (
    <div className="note-person">
      <p className="note-name">{data.name}</p>
      <p className="note-degree">{data.degree}</p>
      <p className="note-family">{data.family}</p>
    </div>
  );
}

/** "Two souls, one destiny" — the formal invitation wording on a torn paper sheet. */
export function StoryNote() {
  const { t } = useLanguage();
  const s = t.story;
  return (
    <section id="story" className="note" aria-labelledby="note-title">
      <div className="note-inner">
        <Reveal as="h2" id="note-title" className="caps-title">
          <span>{s.title[0]}</span>
          <span>{s.title[1]}</span>
        </Reveal>
        <Reveal as="p" className="note-sub" delay={0.15}>{s.sub}</Reveal>
        <Reveal className="note-letter" delay={0.25}>
          <p className="note-greeting">{s.greeting}</p>
          <p>{s.body}</p>
        </Reveal>
        <Reveal className="note-couple" delay={0.1}>
          <Person data={s.groom} />
          <div className="note-and" aria-hidden="true">
            <Swastik />
          </div>
          <Person data={s.bride} />
        </Reveal>
        <Divider className="small" />
      </div>
      <TornEdge side="bottom" color="var(--paper-deep)" seed={23} className="note-tear" />
    </section>
  );
}
