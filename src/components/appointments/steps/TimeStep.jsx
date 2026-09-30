import { ArrowLeft, ChevronLeft, ChevronRight, Clock3 } from 'lucide-react';
import { emphasis } from '../../../utils/ui';
import {
  BOOKED_SLOTS,
  TIME_SLOTS,
  countAvailableSlots,
  formatDateKey,
  formatMonth,
  formatWeekday,
  isSlotPast
} from '../bookingUtils';
import { backLink, errorNotice, infoNotice, infoNoticeIcon, stepLabel, stepSection, stepTitle } from '../bookingClasses';

const VISIBLE_DAYS = 7;

export function TimeStep({ dates, dateOffset, onOffsetChange, selectedDate, activeDate, selectedTime, onSelectDate, onSelectTime, onBack, error }) {
  const visibleDates = dates.slice(dateOffset, dateOffset + VISIBLE_DAYS);
  const now = new Date();
  const availableCount = countAvailableSlots(selectedDate, now);
  const lastOffset = dates.length - VISIBLE_DAYS;

  return (
    <section className={stepSection}>
      <button className={backLink} type="button" onClick={onBack}>
        <ArrowLeft size={12} /> Back
      </button>

      <div className={`${infoNotice} mt-3`}>
        <span className={infoNoticeIcon}>!</span>
        Please arrive 5–10 minutes early for your appointment. To reschedule, please contact us at least 1 day before your appointment.
      </div>

      <div className="mb-[21px] flex items-end justify-between gap-5 max-mobile:flex-col max-mobile:items-start max-mobile:gap-[7px]">
        <div>
          <span className={stepLabel}>Step 03 · Date &amp; time</span>
          <h1 className={stepTitle}>Choose a <em className={emphasis}>time.</em></h1>
        </div>
        <span className="mb-1 text-[8px] text-muted max-mobile:mb-0">
          {availableCount} {availableCount === 1 ? 'slot' : 'slots'} available
        </span>
      </div>

      {error && <div role="alert" className={errorNotice}>{error}</div>}

      <div className="max-w-[720px] border-y border-line pb-3.5 pt-3">
        <div className="mb-3 flex items-center gap-[5px]">
          <strong className="mr-auto text-[10px]">{formatMonth(activeDate)}</strong>
          <button
            type="button"
            aria-label="Previous days"
            className="grid size-[25px] place-items-center rounded-full border border-line disabled:opacity-35"
            onClick={() => onOffsetChange(Math.max(0, dateOffset - 1))}
            disabled={dateOffset === 0}
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            aria-label="Next days"
            className="grid size-[25px] place-items-center rounded-full border border-line disabled:opacity-35"
            onClick={() => onOffsetChange(Math.min(lastOffset, dateOffset + 1))}
            disabled={dateOffset >= lastOffset}
          >
            <ChevronRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1.5 max-mobile:gap-[3px]">
          {visibleDates.map((date) => {
            const key = formatDateKey(date);
            const selected = selectedDate === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelectDate(date)}
                className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-[5px] border border-transparent max-mobile:min-h-[45px] ${selected ? 'bg-navy text-white' : 'text-muted hover:bg-[#f5f5f3]'}`}
              >
                <span className="font-semibold text-[7px] uppercase">{formatWeekday(date)}</span>
                <strong className="text-[11px]">{date.getDate()}</strong>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-2.5 mt-[19px] flex max-w-[720px] items-center justify-between">
        <span className="inline-flex items-center gap-[5px] text-[9px] font-bold">
          <Clock3 size={14} /> {activeDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
        <small className="text-[8px] text-faint">Choose an available time</small>
      </div>

      <div className="grid max-w-[720px] grid-cols-5 gap-[7px] max-mobile:grid-cols-3 max-tiny:grid-cols-2" role="group" aria-label="Available times">
        {TIME_SLOTS.map((time) => {
          const booked = BOOKED_SLOTS.has(time);
          const past = !booked && isSlotPast(selectedDate, time, now);
          const unavailable = booked || past;
          const selected = selectedTime === time;

          return (
            <button
              key={time}
              type="button"
              disabled={unavailable}
              aria-pressed={selected}
              onClick={() => onSelectTime(time)}
              className={`relative min-h-[34px] rounded-[5px] border text-[8px] transition duration-[180ms] ${
                selected
                  ? 'border-navy bg-navy text-white'
                  : unavailable
                    ? 'border-line bg-[#f5f5f3] text-faint'
                    : 'border-line bg-white text-secondary hover:border-muted'
              }`}
            >
              <span className={unavailable ? 'line-through' : ''}>{time}</span>
              {unavailable && <small className="absolute bottom-0.5 right-1 text-[6px] opacity-70">{booked ? 'Booked' : 'Passed'}</small>}
            </button>
          );
        })}
      </div>

      <div className="mt-2.5 flex gap-[15px] text-[7px] text-muted">
        <span className="inline-flex items-center gap-[5px]"><i className="block size-1.5 rounded-full border border-faint" /> Available</span>
        <span className="inline-flex items-center gap-[5px]"><i className="block size-1.5 rounded-full bg-faint" /> Booked</span>
      </div>
    </section>
  );
}
