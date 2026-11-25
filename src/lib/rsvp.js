import { toMarathiDigits } from './format.js';

export const MAX_GUESTS = 10;
const MAX_NAME = 80;

export const clampGuests = (n) => Math.min(MAX_GUESTS, Math.max(1, Math.round(Number(n) || 1)));

/** Returns a map of field -> error code; empty object means valid. */
export function validateRsvp({ name, attending }) {
  const trimmed = String(name ?? '').trim();
  if (!trimmed) return { name: 'required' };
  if (trimmed.length > MAX_NAME) return { name: 'tooLong' };
  if (typeof attending !== 'boolean') return { attending: 'required' };
  return {};
}

export function buildRsvpMessage({ name, attending, guests }, lang) {
  const who = String(name).trim();
  const count = clampGuests(guests);
  if (lang === 'mr') {
    return attending
      ? `नमस्कार! मी ${who}, ऋग्वेद व गायत्री यांच्या विवाहास ${toMarathiDigits(count)} जणांसह आनंदाने उपस्थित राहीन. 🙏`
      : `नमस्कार! मी ${who}. क्षमस्व, मी विवाहास उपस्थित राहू शकत नाही. नवदांपत्यास हार्दिक शुभेच्छा! 🙏`;
  }
  return attending
    ? `Namaskar! This is ${who} — I will attend Rugved & Gayatri's wedding with a party of ${count}. 🙏`
    : `Namaskar! This is ${who} — with regret, I won't be able to attend. Warmest wishes to the couple! 🙏`;
}

export function buildWhatsAppUrl(number, text) {
  const digits = String(number ?? '').replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
