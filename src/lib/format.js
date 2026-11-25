const MR_DIGITS = '०१२३४५६७८९';
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const toMarathiDigits = (value) =>
  String(value).replace(/\d/g, (d) => MR_DIGITS[Number(d)]);

export const localizeDigits = (value, lang, pad = 0) => {
  const text = String(value).padStart(pad, '0');
  return lang === 'mr' ? toMarathiDigits(text) : text;
};

export function getTimeParts(target, now) {
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
    done: diff === 0,
  };
}

/** ISO date strings in content are written with an IST offset; the day part is the local day. */
export const dayKey = (iso) => iso.slice(0, 10);

export const toIcsDate = (ms) =>
  new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

const escapeIcs = (text) =>
  String(text).replace(/\\/g, '\\\\').replace(/[,;]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');

export function buildIcs(events, { location, stamp = Date.now() }) {
  const vevents = events.flatMap((ev) => {
    const start = Date.parse(ev.start);
    return [
      'BEGIN:VEVENT',
      `UID:${ev.id}@rugved-gayatri-wedding`,
      `DTSTAMP:${toIcsDate(stamp)}`,
      `DTSTART:${toIcsDate(start)}`,
      `DTEND:${toIcsDate(start + ev.hours * HOUR)}`,
      `SUMMARY:${escapeIcs(ev.title)}`,
      `LOCATION:${escapeIcs(location)}`,
      'END:VEVENT',
    ];
  });
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Rugved & Gayatri//Wedding//EN',
    'CALSCALE:GREGORIAN',
    ...vevents,
    'END:VCALENDAR',
  ].join('\r\n') + '\r\n';
}
