import { describe, it, expect } from 'vitest';
import { toMarathiDigits, localizeDigits, getTimeParts, toIcsDate, buildIcs, dayKey } from './format.js';

describe('toMarathiDigits', () => {
  it('converts ASCII digits to Devanagari', () => {
    expect(toMarathiDigits('29/11/2026')).toBe('२९/११/२०२६');
  });
  it('leaves non-digits untouched', () => {
    expect(toMarathiDigits('सायं. 6')).toBe('सायं. ६');
  });
});

describe('localizeDigits', () => {
  it('pads and localizes for mr', () => {
    expect(localizeDigits(5, 'mr', 2)).toBe('०५');
  });
  it('pads only for en', () => {
    expect(localizeDigits(5, 'en', 2)).toBe('05');
  });
});

describe('getTimeParts', () => {
  const target = Date.parse('2026-11-29T18:30:00+05:30');
  it('splits remaining time', () => {
    const now = target - ((2 * 24 + 3) * 3600 + 4 * 60 + 5) * 1000;
    expect(getTimeParts(target, now)).toEqual({ days: 2, hours: 3, minutes: 4, seconds: 5, done: false });
  });
  it('clamps to zero once passed', () => {
    expect(getTimeParts(target, target + 1000)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, done: true });
  });
});

describe('toIcsDate', () => {
  it('formats as UTC basic format', () => {
    expect(toIcsDate(Date.parse('2026-11-29T18:30:00+05:30'))).toBe('20261129T130000Z');
  });
});

describe('dayKey', () => {
  it('returns the IST calendar day of an ISO string', () => {
    expect(dayKey('2026-11-29T09:30:00+05:30')).toBe('2026-11-29');
  });
});

describe('buildIcs', () => {
  const ics = buildIcs(
    [{ id: 'varmala', title: 'Varmala, Rugved & Gayatri', start: '2026-11-29T18:30:00+05:30', hours: 3 }],
    { location: 'Vitthal Mangalam Lawns, Varye, Satara', stamp: Date.parse('2026-11-01T00:00:00Z') },
  );
  it('wraps events in a VCALENDAR with CRLF line endings', () => {
    expect(ics.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
    expect(ics.trimEnd().endsWith('END:VCALENDAR')).toBe(true);
  });
  it('includes start, end and escaped text', () => {
    expect(ics).toContain('DTSTART:20261129T130000Z');
    expect(ics).toContain('DTEND:20261129T160000Z');
    expect(ics).toContain('SUMMARY:Varmala\\, Rugved & Gayatri');
    expect(ics).toContain('LOCATION:Vitthal Mangalam Lawns\\, Varye\\, Satara');
    expect(ics).toContain('UID:varmala@rugved-gayatri-wedding');
  });
});
