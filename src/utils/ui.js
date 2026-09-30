/**
 * Shared Tailwind class recipes. Tailwind scans this file, so these strings are
 * compiled like any other utility usage. They exist so the same pill / label /
 * heading pattern is written once instead of copy-pasted across sections.
 */

export const sectionPad = 'px-[clamp(18px,5vw,72px)] max-mobile:px-4';
export const referenceSectionY = 'py-[clamp(58px,8vw,105px)] max-mobile:py-[52px]';

const pill = 'inline-flex items-center justify-center gap-[7px] rounded-full transition duration-200';

/** Solid black pill – "Book Appointment" in the nav / mobile menu. */
export const bookingButton = `${pill} bg-navy text-white px-3.5 py-2.5 text-[11px] font-bold hover:-translate-y-px disabled:opacity-[.38] disabled:hover:translate-y-0`;
export const darkPill = `${pill} bg-navy text-white px-3 py-[9px] text-[10px] font-bold whitespace-nowrap hover:-translate-y-px`;
export const outlinePill = `${pill} border border-line text-ink px-[11px] py-2 text-[10px] hover:bg-ink/4`;

export const monoKicker = 'font-semibold text-[10px] tracking-[.16em] uppercase';
export const kicker = 'font-semibold text-[9px] tracking-[.16em] uppercase text-muted';

export const authInput = 'h-11 w-full border border-line bg-transparent text-ink px-[11px] text-[11px] outline-none focus:border-ink';
export const authLabel = 'grid gap-1.5 text-[9px] uppercase tracking-[.08em] font-bold';

export const emphasis = 'not-italic';
