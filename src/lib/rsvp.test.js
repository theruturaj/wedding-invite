import { describe, it, expect } from 'vitest';
import { validateRsvp, buildRsvpMessage, buildWhatsAppUrl, clampGuests, MAX_GUESTS } from './rsvp.js';

describe('validateRsvp', () => {
  it('requires a name', () => {
    expect(validateRsvp({ name: '   ', attending: true, guests: 1 })).toEqual({ name: 'required' });
  });
  it('rejects overly long names', () => {
    expect(validateRsvp({ name: 'a'.repeat(81), attending: true, guests: 1 })).toEqual({ name: 'tooLong' });
  });
  it('requires an attendance choice', () => {
    expect(validateRsvp({ name: 'Asha', attending: null, guests: 1 })).toEqual({ attending: 'required' });
  });
  it('passes a complete reply', () => {
    expect(validateRsvp({ name: 'Asha', attending: false, guests: 1 })).toEqual({});
  });
});

describe('clampGuests', () => {
  it('keeps the count between 1 and MAX_GUESTS', () => {
    expect(clampGuests(0)).toBe(1);
    expect(clampGuests(MAX_GUESTS + 5)).toBe(MAX_GUESTS);
    expect(clampGuests(3)).toBe(3);
  });
});

describe('buildRsvpMessage', () => {
  it('writes an English acceptance with guest count', () => {
    const msg = buildRsvpMessage({ name: ' Asha Patil ', attending: true, guests: 3 }, 'en');
    expect(msg).toContain('Asha Patil');
    expect(msg).toContain('will attend');
    expect(msg).toContain('3');
  });
  it('writes a Marathi regret without a guest count', () => {
    const msg = buildRsvpMessage({ name: 'आशा', attending: false, guests: 4 }, 'mr');
    expect(msg).toContain('आशा');
    expect(msg).toContain('उपस्थित राहू शकत नाही');
    expect(msg).not.toContain('४');
  });
});

describe('buildWhatsAppUrl', () => {
  it('targets a number when given and encodes the text', () => {
    expect(buildWhatsAppUrl('+91 98765 43210', 'Hi & bye')).toBe('https://wa.me/919876543210?text=Hi%20%26%20bye');
  });
  it('lets the guest pick a contact when no number is configured', () => {
    expect(buildWhatsAppUrl('', 'Hi')).toBe('https://wa.me/?text=Hi');
  });
});
