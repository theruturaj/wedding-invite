import { useId, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { RSVP_WHATSAPP } from '../i18n/content.js';
import { localizeDigits } from '../lib/format.js';
import { MAX_GUESTS, buildRsvpMessage, buildWhatsAppUrl, clampGuests, validateRsvp } from '../lib/rsvp.js';
import { WaxSeal } from './ornaments/Paper.jsx';

const EMPTY = { name: '', attending: null, guests: 1 };

export function Rsvp() {
  const { t, lang } = useLanguage();
  const r = t.rsvp;
  const reduce = useReducedMotion();
  const uid = useId();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (patch) => {
    setForm((f) => ({ ...f, ...patch }));
    setErrors({});
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validateRsvp(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      document.getElementById(`${uid}-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    const url = buildWhatsAppUrl(RSVP_WHATSAPP, buildRsvpMessage(form, lang));
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <section className="v2-section rsvp" aria-labelledby="rsvp-title">
      <div className="rsvp-env">
        <motion.div
          className="rsvp-card"
          initial={{ y: reduce ? 0 : 140 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="rsvp-seal"><WaxSeal tone="maroon" monogram="R G" size={78} /></div>
          <p className="caps-eyebrow small">{r.eyebrow}</p>
          <h2 id="rsvp-title" className="serif-title">{r.title}</h2>
          <span className="ev-rule center" aria-hidden="true" />
          <p className="rsvp-sub">{r.sub}</p>

          {sent ? (
            <div className="rsvp-thanks" role="status">
              <p>{r.thanks}</p>
              <button type="button" className="btn-outline" onClick={() => setSent(false)}>{r.again}</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label className="field-label" htmlFor={`${uid}-name`}>{r.name}</label>
              <input
                id={`${uid}-name`}
                className="field-input"
                type="text"
                autoComplete="name"
                maxLength={80}
                placeholder={r.namePh}
                value={form.name}
                onChange={(e) => update({ name: e.target.value })}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${uid}-name-err` : undefined}
              />
              {errors.name && <p id={`${uid}-name-err`} className="field-error">{r.errors[errors.name]}</p>}

              <fieldset className="choice" aria-describedby={errors.attending ? `${uid}-att-err` : undefined}>
                <legend className="sr-only">{r.title}</legend>
                {[[true, r.accept], [false, r.decline]].map(([value, text], i) => (
                  <label key={text} className={`pill${form.attending === value ? ' on' : ''}`}>
                    <input
                      id={i === 0 ? `${uid}-attending` : undefined}
                      type="radio"
                      name={`${uid}-att`}
                      checked={form.attending === value}
                      onChange={() => update({ attending: value })}
                    />
                    {text}
                  </label>
                ))}
              </fieldset>
              {errors.attending && <p id={`${uid}-att-err`} className="field-error">{r.errors.attending}</p>}

              {form.attending && (
                <motion.div className="guests" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <span className="field-label" id={`${uid}-g`}>{r.guests}</span>
                  <div className="stepper" role="group" aria-labelledby={`${uid}-g`}>
                    <button type="button" onClick={() => update({ guests: clampGuests(form.guests - 1) })} disabled={form.guests <= 1} aria-label={r.fewer}>−</button>
                    <output aria-live="polite">{localizeDigits(form.guests, lang)}</output>
                    <button type="button" onClick={() => update({ guests: clampGuests(form.guests + 1) })} disabled={form.guests >= MAX_GUESTS} aria-label={r.more}>+</button>
                  </div>
                </motion.div>
              )}

              <button type="submit" className="btn-outline solid">{r.send}</button>
            </form>
          )}
        </motion.div>
        <div className="rsvp-back" aria-hidden="true" />
        <div className="rsvp-pocket" aria-hidden="true" />
      </div>
    </section>
  );
}
