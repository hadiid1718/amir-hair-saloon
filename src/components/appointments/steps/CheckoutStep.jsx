import { ArrowLeft, ArrowRight, UserRound } from 'lucide-react';
import { ADVANCE_PERCENT } from '../../../data/paymentData';
import { emphasis } from '../../../utils/ui';
import { formatLongDate, formatPrice } from '../bookingUtils';
import { backLink, card, cardTitleRow, errorNotice, infoNotice, infoNoticeIcon, primaryButton, stepLabel, stepSection, stepTitle } from '../bookingClasses';

const fieldLabel = 'grid gap-1.5 text-[12px] font-bold text-secondary';
const fieldInput = 'h-[38px] w-full rounded border bg-paper-light px-2.5 text-[12px] text-ink outline-none focus:bg-white';

function Field({ id, label, error, ...inputProps }) {
  return (
    <label className={fieldLabel} htmlFor={id}>
      {label}
      <input
        id={id}
        className={`${fieldInput} ${error ? 'border-[#c4574a]' : 'border-line focus:border-muted'}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
      {error && <span id={`${id}-error`} className="text-[12px] font-medium text-[#b3382b]">{error}</span>}
    </label>
  );
}

export function CheckoutStep({ provider, services, activeDate, time, totalPrice, totalDuration, advanceAmount, form, errors, onChange, onBlurField, onBack, formError }) {
  const summaryRow = 'flex justify-between gap-5 pt-[11px] text-[12px] max-mobile:flex-col max-mobile:items-start max-mobile:gap-1';
  const rowLabel = 'text-muted';
  const rowValue = 'max-w-[70%] text-right max-mobile:max-w-full max-mobile:text-left';

  return (
    <section className={stepSection}>
      <button className={backLink} type="button" onClick={onBack}>
        <ArrowLeft size={12} /> Back
      </button>

      <div className={`${infoNotice} mt-3`}>
        <span className={infoNoticeIcon}>!</span>
        Please arrive 5–10 minutes early for your appointment. To reschedule, please contact us at least 1 day before your appointment.
      </div>

      <span className={stepLabel}>Step 04 · Checkout</span>
      <h1 className={stepTitle}>Confirm your <em className={emphasis}>booking.</em></h1>
      <p className="mb-5 mt-3 max-w-[520px] text-[12px] leading-[1.7] text-muted">
        Almost there. Add your contact details and review your appointment before booking.
      </p>

      {formError && <div role="alert" className={errorNotice}>{formError}</div>}

      <div className={card}>
        <div className="flex items-start justify-between gap-3 border-b border-line pb-[13px]">
          <div className="grid gap-1">
            <span className="font-semibold text-[12px] uppercase tracking-[.08em] text-muted">Your appointment</span>
            <strong className="text-[12px]">{provider.name}</strong>
          </div>
          <span className="rounded-full bg-[#f5f5f3] px-[7px] py-[5px] font-semibold text-[12px] text-muted">In progress</span>
        </div>
        <div className={summaryRow}>
          <span className={rowLabel}>Services</span>
          <strong className={rowValue}>{services.map((service) => service.name).join(' + ')}</strong>
        </div>
        <div className={summaryRow}>
          <span className={rowLabel}>Date &amp; time</span>
          <strong className={rowValue}>{formatLongDate(activeDate)} · {time}</strong>
        </div>
        <div className={summaryRow}>
          <span className={rowLabel}>Duration</span>
          <strong className={rowValue}>{totalDuration} min</strong>
        </div>
        <div className={`${summaryRow} mt-[11px] border-t border-line`}>
          <span className={rowLabel}>Total</span>
          <strong className={rowValue}>{formatPrice(totalPrice)}</strong>
        </div>
        <div className={summaryRow}>
          <span className={rowLabel}>Advance due next ({ADVANCE_PERCENT}%)</span>
          <strong className={`${rowValue} text-[12px]`}>{formatPrice(advanceAmount)}</strong>
        </div>
      </div>

      <div className={`${card} mt-2.5`}>
        <div className={cardTitleRow}>
          <UserRound size={16} className="text-muted" />
          <div className="grid gap-0.5">
            <strong className="text-[12px]">Your details</strong>
            <span className="text-[12px] text-faint">All fields are required. We'll use them to confirm your appointment.</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 pt-[13px] max-mobile:grid-cols-1">
          <Field
            id="checkout-name"
            label="Full name"
            value={form.name}
            onChange={onChange('name')}
            onBlur={onBlurField('name')}
            error={errors.name}
            placeholder="Your name"
            autoComplete="name"
            required
          />
          <Field
            id="checkout-email"
            label="Email address"
            type="email"
            inputMode="email"
            value={form.email}
            onChange={onChange('email')}
            onBlur={onBlurField('email')}
            error={errors.email}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          <Field
            id="checkout-phone"
            label="Phone number"
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={onChange('phone')}
            onBlur={onBlurField('phone')}
            error={errors.phone}
            placeholder="03xx xxxxxxx"
            autoComplete="tel"
            required
          />
        </div>
      </div>

      {/* The order panel (with its button) sits above the form on small screens, so repeat the action here. */}
      <button type="submit" className={`${primaryButton} mt-3 hidden w-full max-tablet:flex`}>
        Book appointment <ArrowRight size={13} />
      </button>
    </section>
  );
}
