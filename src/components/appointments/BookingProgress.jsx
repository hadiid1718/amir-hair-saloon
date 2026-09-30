import { BOOKING_STEPS } from './bookingUtils';

/**
 * Breadcrumb-style progress. `current` is 1-based. When `canGoTo` and `onSelect`
 * are supplied, steps that may be revisited render as buttons.
 */
export function BookingProgress({ current, canGoTo, onSelect }) {
  return (
    <ol
      className="flex items-center gap-[7px] text-[8px] tracking-[.02em] text-faint max-mobile:gap-[3px] max-mobile:text-[7px]"
      aria-label="Booking progress"
    >
      {BOOKING_STEPS.map((label, index) => {
        const stepNumber = index + 1;
        const reached = current >= stepNumber;
        const clickable = Boolean(onSelect) && stepNumber !== current && canGoTo?.(stepNumber);
        const itemClass = `inline-flex items-center gap-[7px] whitespace-nowrap max-mobile:gap-[3px] ${reached ? 'text-ink' : ''} ${index < BOOKING_STEPS.length - 1 ? 'max-tiny:max-w-[45px] max-tiny:overflow-hidden max-tiny:text-ellipsis' : ''}`;

        return (
          <li key={label} className="contents" aria-current={stepNumber === current ? 'step' : undefined}>
            {clickable ? (
              <button type="button" className={`${itemClass} underline-offset-2 hover:underline`} onClick={() => onSelect(stepNumber)}>
                {label}
              </button>
            ) : (
              <span className={itemClass}>{label}</span>
            )}
            {stepNumber < BOOKING_STEPS.length && (
              <b className="text-[12px] font-normal text-faint max-mobile:text-[10px]" aria-hidden="true">›</b>
            )}
          </li>
        );
      })}
    </ol>
  );
}
