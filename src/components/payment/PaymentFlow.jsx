import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Landmark, ShieldCheck } from 'lucide-react';
import { bookingProviders } from '../../data/bookingData';
import { ADVANCE_PERCENT, paymentBanks } from '../../data/paymentData';
import { loadPendingBooking, submitBooking } from '../../services/bookingService';
import { ROUTES } from '../../utils/constants';
import { emphasis } from '../../utils/ui';
import { useRouter } from '../../hooks/useRouter';
import { BookingProgress } from '../appointments/BookingProgress';
import { OrderCta, OrderHint, OrderSummary } from '../appointments/OrderSummary';
import { backLink, card, cardTitleRow, errorNotice, infoNotice, infoNoticeIcon, primaryButton, secondaryButton, stepLabel, stepLead, stepSection, stepTitle } from '../appointments/bookingClasses';
import { formatLongDate, formatPrice, isSlotSelectable, parseDateKey } from '../appointments/bookingUtils';
import { CopyField } from './CopyField';
import { ScreenshotUpload } from './ScreenshotUpload';

const PAYMENT_STEP = 5;
const summaryRow = 'flex justify-between gap-5 pt-[11px] text-[8px]';

export function PaymentFlow() {
  const { navigate } = useRouter();

  const [booking] = useState(loadPendingBooking);
  const [bankId, setBankId] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [completed, setCompleted] = useState(null);

  const bank = useMemo(() => paymentBanks.find((item) => item.id === bankId) ?? null, [bankId]);
  const provider = useMemo(() => bookingProviders.find((item) => item.id === booking?.providerId) ?? null, [booking]);

  // Nothing to pay for (direct visit, refresh after completing) or the slot has since passed: start over.
  const bookingUsable = Boolean(booking) && isSlotSelectable(booking.date, booking.time);
  useEffect(() => {
    if (!bookingUsable && !completed) navigate(ROUTES.appointments, null, true);
  }, [bookingUsable, completed, navigate]);

  const missing = [];
  if (!bank) missing.push('choose your bank');
  if (!screenshot) missing.push('upload your payment screenshot');
  const blocked = missing.length > 0;
  const hint = blocked ? `Still to do: ${missing.join(' and ')}.` : 'All set. Submit your payment proof to request this appointment.';

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    if (blocked) {
      setAttempted(true);
      if (!bank) document.getElementById('bank-options')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else document.getElementById('payment-proof')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitting(true);
    setSubmitError('');
    try {
      const record = await submitBooking({
        ...booking,
        status: 'awaiting-payment-verification',
        payment: {
          bankId: bank.id,
          bankName: bank.name,
          amount: booking.advanceAmount,
          percent: ADVANCE_PERCENT,
          screenshot: screenshot.dataUrl,
          fileName: screenshot.name,
          submittedAt: Date.now()
        }
      });
      setCompleted(record);
    } catch {
      setSubmitError("We couldn't save your payment proof on this device. Try a smaller screenshot or free up browser storage, then submit again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (completed) {
    const when = `${formatLongDate(parseDateKey(completed.date))} at ${completed.time}`;
    return (
      <div className="mx-auto grid min-h-[540px] w-[min(650px,100%)] place-content-center justify-items-center px-5 py-10 text-center">
        <div className="mb-3.5 grid size-12 place-items-center rounded-full border border-line"><Check size={22} /></div>
        <span className={stepLabel}>Payment proof received</span>
        <h2 className="mb-2.5 mt-2 text-[clamp(42px,5.2vw,69px)] font-bold leading-[.9] tracking-[-.06em]">See you at <em className={emphasis}>Asad.</em></h2>
        <p className="my-[1em] max-w-[450px] text-[10px] leading-[1.7] text-muted">
          Thank you, {completed.contact.name}. Your appointment with <strong>{completed.provider}</strong> on <strong>{when}</strong> is
          requested. We'll verify your advance payment of <strong>{formatPrice(completed.payment.amount)}</strong> and confirm by phone or email.
        </p>
        <div className="mt-3 flex gap-2">
          <button className={primaryButton} type="button" onClick={() => navigate(ROUTES.appointments)}>
            Book another <ArrowRight size={15} />
          </button>
          <button className={secondaryButton} type="button" onClick={() => navigate(ROUTES.home)}>Back to home</button>
        </div>
      </div>
    );
  }

  if (!bookingUsable) return null;

  return (
    <form onSubmit={submit} className="mx-auto w-[min(1200px,100%)]" noValidate>
      <div className="mb-[22px] flex min-h-7 items-center justify-between max-mobile:mb-3.5">
        <button className={`${backLink} max-mobile:text-[9px]`} type="button" onClick={() => navigate(ROUTES.appointments, { resume: true })}>
          <ArrowLeft size={13} /> Back
        </button>
        <BookingProgress current={PAYMENT_STEP} />
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_252px] items-start gap-[26px] max-tablet:grid-cols-1">
        <section className={stepSection}>
          <span className={stepLabel}>Step 05 · Advance payment</span>
          <h1 className={stepTitle}>Pay {ADVANCE_PERCENT}% to <em className={emphasis}>secure it.</em></h1>
          <p className={stepLead}>
            To hold your slot we take {ADVANCE_PERCENT}% of the total in advance. Transfer the amount to our bank account, then upload a screenshot of the payment.
          </p>

          {submitError && <div role="alert" className={errorNotice}>{submitError}</div>}

          <div className={card}>
            <div className="flex items-start justify-between gap-3 border-b border-line pb-[13px]">
              <div className="grid gap-1">
                <span className="font-semibold text-[7px] uppercase tracking-[.08em] text-muted">Your appointment</span>
                <strong className="text-[10px]">{booking.provider} · {formatLongDate(parseDateKey(booking.date))} · {booking.time}</strong>
              </div>
              <span className="rounded-full bg-[#f5f5f3] px-[7px] py-[5px] font-semibold text-[7px] text-muted">Awaiting payment</span>
            </div>
            <div className={summaryRow}>
              <span className="text-muted">Total</span>
              <strong>{formatPrice(booking.totalPrice)}</strong>
            </div>
            <div className={`${summaryRow} items-baseline`}>
              <span className="text-muted">Advance to pay now ({ADVANCE_PERCENT}%)</span>
              <strong className="text-[12px]">{formatPrice(booking.advanceAmount)}</strong>
            </div>
            <div className={summaryRow}>
              <span className="text-muted">Balance to pay at the saloon</span>
              <strong>{formatPrice(booking.totalPrice - booking.advanceAmount)}</strong>
            </div>
          </div>

          <div className={`${card} mt-2.5`} id="bank-options">
            <div className={cardTitleRow}>
              <Landmark size={16} className="text-muted" />
              <div className="grid gap-0.5">
                <strong className="text-[9px]">1. Choose your bank</strong>
                <span className="text-[7px] text-faint">Select the bank you'll transfer to.</span>
              </div>
            </div>

            <div className="grid gap-[9px] pt-[13px]" role="radiogroup" aria-label="Bank">
              {paymentBanks.map((item) => {
                const selected = bankId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setBankId(item.id)}
                    className={`flex items-center gap-3 rounded-lg border px-3.5 py-3 text-left transition duration-[180ms] hover:-translate-y-px ${
                      selected ? 'border-navy bg-navy text-white' : attempted && !bank ? 'border-[#c4574a] bg-white' : 'border-ink/[.09] bg-white hover:border-ink/25'
                    }`}
                  >
                    <span className={`grid size-[30px] flex-none place-items-center rounded-full text-[9px] font-bold ${selected ? 'bg-white text-navy' : 'bg-[#f5f5f3] text-muted'}`}>{item.shortName}</span>
                    <span className="grid flex-1 gap-0.5">
                      <strong className="text-[10px]">{item.name}</strong>
                      <span className={`text-[8px] ${selected ? 'text-white/70' : 'text-muted'}`}>Bank transfer · IBAN or account number</span>
                    </span>
                    <span className={`grid size-[19px] place-items-center rounded-full border ${selected ? 'border-white/30 bg-white text-navy' : 'border-faint/50 text-transparent'}`}>
                      <Check size={12} />
                    </span>
                  </button>
                );
              })}
            </div>
            {attempted && !bank && <p role="alert" className="mb-0 mt-2 text-[8px] font-medium text-[#b3382b]">Please choose a bank to see the transfer details.</p>}

            {bank && (
              <div className="mt-3.5 rounded-[5px] border border-line bg-paper-light px-3.5 pb-3.5 pt-1">
                <div className={summaryRow}>
                  <span className="text-muted">Bank</span>
                  <strong>{bank.name}</strong>
                </div>
                <div className={summaryRow}>
                  <span className="text-muted">Account title</span>
                  <strong>{bank.accountTitle}</strong>
                </div>
                <CopyField label="Account number" value={bank.accountNumber} />
                <CopyField label="IBAN" value={bank.iban} />
                <div className={summaryRow}>
                  <span className="text-muted">Branch</span>
                  <strong>{bank.branch}</strong>
                </div>
                <div className={`${summaryRow} mt-[11px] items-baseline border-t border-line`}>
                  <span className="text-muted">Amount to transfer</span>
                  <strong className="text-[11px]">{formatPrice(booking.advanceAmount)}</strong>
                </div>
              </div>
            )}
          </div>

          <div className={`${card} mt-2.5`} id="payment-proof">
            <div className={cardTitleRow}>
              <ShieldCheck size={16} className="text-muted" />
              <div className="grid gap-0.5">
                <strong className="text-[9px]">2. Upload your payment screenshot</strong>
                <span className="text-[7px] text-faint">A screenshot of the successful transfer, showing the amount.</span>
              </div>
            </div>
            <div className="pt-[13px]">
              <ScreenshotUpload
                value={screenshot}
                onChange={setScreenshot}
                error={uploadError || (attempted && !screenshot ? 'Please upload a screenshot of your advance payment.' : '')}
                onError={setUploadError}
              />
            </div>
          </div>

          <div className={`${infoNotice} mb-0 mt-2.5`}>
            <span className={infoNoticeIcon}>!</span>
            Your slot is confirmed once we verify the payment. We'll contact you on the phone number or email you provided.
          </div>

          {/* The order panel (with its button) sits above the form on small screens, so repeat the action here. */}
          <button
            type="submit"
            aria-disabled={blocked || submitting}
            className={`${primaryButton} mt-3 hidden w-full max-tablet:flex ${blocked || submitting ? 'opacity-[.42]' : ''}`}
          >
            {submitting ? 'Submitting…' : 'Submit payment proof'} <ArrowRight size={13} />
          </button>
        </section>

        <OrderSummary
          provider={provider}
          services={booking.services}
          totalPrice={booking.totalPrice}
          totalDuration={booking.totalDuration}
          caption="Appointment in progress"
          advance={{ label: `Advance now (${ADVANCE_PERCENT}%)`, amount: booking.advanceAmount }}
        >
          <OrderCta type="submit" blocked={blocked} busy={submitting}>
            {submitting ? 'Submitting…' : 'Submit payment proof'} <ArrowRight size={14} />
          </OrderCta>
          <OrderHint>{hint}</OrderHint>
        </OrderSummary>
      </div>
    </form>
  );
}
