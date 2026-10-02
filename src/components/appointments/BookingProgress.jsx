import { ChevronRight } from 'lucide-react';
import { BOOKING_STEPS } from './bookingUtils';

export function BookingProgress({ current, canGoTo, onSelect }) {
  return (
    <ol className="flex items-center gap-2.5 text-[14px] text-faint max-mobile:text-[13px]" aria-label="Booking progress">
      {BOOKING_STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const active = stepNumber === current;
        const reached = current >= stepNumber;
        const clickable = Boolean(onSelect) && !active && canGoTo?.(stepNumber);
        const itemClass = `inline-flex items-center whitespace-nowrap ${
          active ? 'font-semibold text-ink' : reached ? 'text-ink/70' : ''
        } ${active ? '' : 'max-mobile:hidden'}`;

        return (
          <li key={label} className="contents" aria-current={active ? 'step' : undefined}>
            {clickable ? (
              <button type="button" className={`${itemClass} underline-offset-4 hover:underline`} onClick={() => onSelect(stepNumber)}>
                {label}
              </button>
            ) : (
              <span className={itemClass}>{label}</span>
            )}
            {stepNumber < BOOKING_STEPS.length && (
              <ChevronRight size={15} className="flex-none text-faint max-mobile:hidden" aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}