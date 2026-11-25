import { EVENTS, VENUE, content } from '../i18n/content.js';
import { buildIcs } from './format.js';

/** Downloads all wedding events as an .ics file the guest's calendar app can import. */
export function downloadCalendar() {
  const names = content.en.celebrations.items;
  const ics = buildIcs(
    EVENTS.map((ev) => ({ ...ev, title: `${names[ev.id].name} · Rugved & Gayatri` })),
    { location: VENUE.calendarLocation },
  );
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'rugved-gayatri-wedding.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
