const common = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const ICONS = {
  ring: (
    <>
      <circle cx="24" cy="30" r="12" />
      <path d="M18 12 L24 6 L30 12 L24 18 Z" />
      <path d="M21 12 H27" />
    </>
  ),
  haldi: (
    <>
      <path d="M8 24 H40 C40 34 33 40 24 40 C15 40 8 34 8 24 Z" />
      <path d="M14 24 C16 20 20 19 24 21 C28 19 32 20 34 24" />
      <path d="M24 6 C27 10 27 13 24 15 C21 13 21 10 24 6 Z" />
    </>
  ),
  music: (
    <>
      <path d="M18 34 V10 L38 6 V30" />
      <circle cx="13" cy="34" r="5" />
      <circle cx="33" cy="30" r="5" />
      <path d="M18 16 L38 12" />
    </>
  ),
  kalash: (
    <>
      <path d="M16 18 H32 L34 22 C40 26 40 38 32 42 H16 C8 38 8 26 14 22 Z" />
      <circle cx="24" cy="11" r="5" />
      <path d="M19 15 C14 13 11 15 9 18 M29 15 C34 13 37 15 39 18" />
      <path d="M12 30 H36" />
    </>
  ),
  garland: (
    <>
      <path d="M8 8 C8 30 16 40 24 40 C32 40 40 30 40 8" />
      {[[9, 16], [11, 25], [16, 33], [24, 40], [32, 33], [37, 25], [39, 16]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="currentColor" stroke="none" />
      ))}
    </>
  ),
};

export function EventIcon({ name }) {
  return <svg {...common}>{ICONS[name]}</svg>;
}
