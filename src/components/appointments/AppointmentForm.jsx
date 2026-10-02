import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {  ArrowRight, ChevronLeft } from 'lucide-react';
import { bookingProviders } from '../../data/bookingData';
import { ADVANCE_PERCENT, calculateAdvance } from '../../data/paymentData';
import { loadPendingBooking, savePendingBooking } from '../../services/bookingService';
import { ROUTES } from '../../utils/constants';
import { validateContact } from '../../utils/validation';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from '../../hooks/useRouter';
import { BookingProgress } from './BookingProgress';
import { OrderCta, OrderHint, OrderSummary } from './OrderSummary';
import { ProfessionalStep } from './steps/ProfessionalStep';
import { ServiceStep } from './steps/ServiceStep';
import { TimeStep } from './steps/TimeStep';
import { CheckoutStep } from './steps/CheckoutStep';
import { backLink } from './bookingClasses';
import { formatDateKey, isSlotSelectable, makeDates } from './bookingUtils';
import { HeaderPortal } from '../layout/HeaderPortal';
import { BACK_SLOT_ID, PROGRESS_SLOT_ID } from '../layout/BookingHeader';
/** Delay before an automatic step change, so the person sees their selection register first. */
const AUTO_ADVANCE_MS = 260;
const LAST_BOOKING_STEP = 4;

const NEXT_LABELS = { 1: 'Choose a service', 2: 'Choose a time', 3: 'Proceed to checkout' };

const findProvider = (id) => bookingProviders.find((item) => item.id === id) ?? null;

/** Builds the first-render state. When returning from the payment page the saved draft is restored. */
function getInitialState({ resume, dates, auth }) {
  const base = {
    step: 1,
    providerId: '',
    serviceIds: [],
    date: formatDateKey(dates[0]),
    time: '',
    form: { name: auth?.name || '', email: auth?.email || '', phone: '' }
  };
  if (!resume) return base;

  const draft = loadPendingBooking();
  const provider = findProvider(draft?.providerId);
  if (!draft || !provider) return base;

  const servicesValid = draft.serviceIds?.length > 0 && draft.serviceIds.every((id) => provider.services.some((service) => service.id === id));
  const dateValid = dates.some((date) => formatDateKey(date) === draft.date);
  if (!servicesValid || !dateValid || !isSlotSelectable(draft.date, draft.time)) return base;

  return {
    step: LAST_BOOKING_STEP,
    providerId: draft.providerId,
    serviceIds: draft.serviceIds,
    date: draft.date,
    time: draft.time,
    form: { name: draft.contact?.name || '', email: draft.contact?.email || '', phone: draft.contact?.phone || '' }
  };
}

export function AppointmentForm() {
  const { auth, guest } = useAuth();
  const { navigate, state: routeState } = useRouter();

  const dates = useMemo(makeDates, []);
  const [initial] = useState(() => getInitialState({ resume: routeState?.resume, dates, auth }));

  const [step, setStep] = useState(initial.step);
  const [providerId, setProviderId] = useState(initial.providerId);
  const [selectedServices, setSelectedServices] = useState(initial.serviceIds);
  const [selectedDate, setSelectedDate] = useState(initial.date);
  const [selectedTime, setSelectedTime] = useState(initial.time);
  const [dateOffset, setDateOffset] = useState(0);
  const [form, setForm] = useState(initial.form);
  const [touched, setTouched] = useState({});
  // Steps the person has tried to leave while incomplete; only then do we show error banners.
  const [attempted, setAttempted] = useState({});

  const topRef = useRef(null);
  const advanceTimer = useRef(null);
  const firstRender = useRef(true);

  const provider = useMemo(() => findProvider(providerId), [providerId]);

  const selectedDetails = useMemo(
    () => (provider ? selectedServices.map((id) => provider.services.find((service) => service.id === id)).filter(Boolean) : []),
    [provider, selectedServices]
  );

  const totalPrice = selectedDetails.reduce((total, service) => total + service.price, 0);
  const totalDuration = selectedDetails.reduce((total, service) => total + service.duration, 0);
  const advanceAmount = calculateAdvance(totalPrice);
  const activeDate = dates.find((date) => formatDateKey(date) === selectedDate) || dates[0];

  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  // Bring the top of the flow into view whenever the step changes (long mobile pages).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  /* ---------- validation ---------- */

  const contactErrors = useMemo(() => validateContact(form), [form]);

  /** Returns the message explaining what is missing on a step, or null when the step is complete. */
  const stepError = useCallback((target) => {
    switch (target) {
      case 1:
        return provider ? null : 'Please choose a professional to continue.';
      case 2:
        return selectedDetails.length > 0 ? null : 'Select at least one service to continue.';
      case 3:
        if (!selectedDate) return 'Please pick a date.';
        if (!selectedTime) return 'Please pick an available time slot.';
        if (!isSlotSelectable(selectedDate, selectedTime)) return 'That time is no longer available. Please choose another slot.';
        return null;
      case 4: {
        const missing = Object.keys(contactErrors);
        return missing.length === 0 ? null : 'Please complete your name, email and phone number.';
      }
      default:
        return null;
    }
  }, [provider, selectedDetails.length, selectedDate, selectedTime, contactErrors]);

  const firstIncompleteStep = (upTo) => {
    for (let target = 1; target <= upTo; target += 1) {
      if (stepError(target)) return target;
    }
    return null;
  };

  const markAttempted = (target) => setAttempted((current) => ({ ...current, [target]: true }));

  /* ---------- navigation ---------- */

  const advanceFrom = (from) => {
    window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => {
      // Only move if the person is still on the step that triggered the auto-advance.
      setStep((current) => (current === from ? from + 1 : current));
    }, AUTO_ADVANCE_MS);
  };

  const previousStep = () => {
    window.clearTimeout(advanceTimer.current);
    setStep((current) => Math.max(current - 1, 1));
  };

  const goBackFromFirst = () => navigate(ROUTES.home);

  const nextStep = () => {
    if (stepError(step)) {
      markAttempted(step);
      return;
    }
    window.clearTimeout(advanceTimer.current);
    setStep((current) => Math.min(current + 1, LAST_BOOKING_STEP));
  };

  /** A step can be opened if every step before it is complete. */
  const canGoTo = (target) => target <= LAST_BOOKING_STEP && (target <= step || firstIncompleteStep(target - 1) === null);

  const goToStep = (target) => {
    if (!canGoTo(target)) return;
    window.clearTimeout(advanceTimer.current);
    setStep(target);
  };

  /* ---------- selections ---------- */

  const selectProvider = (nextProviderId) => {
    if (nextProviderId !== providerId) {
      setProviderId(nextProviderId);
      setSelectedServices([]);
      setSelectedTime('');
    }
    // Choosing a professional moves straight on to the services.
    advanceFrom(1);
  };

  const toggleService = (serviceId) => {
    setSelectedServices((current) => (
      current.includes(serviceId) ? current.filter((id) => id !== serviceId) : [...current, serviceId]
    ));
  };

  const selectDate = (date) => {
    window.clearTimeout(advanceTimer.current);
    setSelectedDate(formatDateKey(date));
    setSelectedTime('');
  };

  const selectTime = (time) => {
    setSelectedTime(time);
    // Date is always set, so a chosen time completes this step: continue to checkout.
    advanceFrom(3);
  };

  const setField = (field) => (event) => {
    const { value } = event.target;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const blurField = (field) => () => setTouched((current) => ({ ...current, [field]: true }));

  const visibleContactErrors = Object.fromEntries(
    Object.entries(contactErrors).filter(([field]) => attempted[4] || touched[field])
  );

  /* ---------- submit ---------- */

  const submit = (event) => {
    event.preventDefault();

    const incomplete = firstIncompleteStep(3);
    if (incomplete) {
      markAttempted(incomplete);
      setStep(incomplete);
      return;
    }

    const failing = Object.keys(contactErrors);
    if (failing.length > 0) {
      markAttempted(4);
      setTouched({ name: true, email: true, phone: true });
      document.getElementById(`checkout-${failing[0]}`)?.focus();
      return;
    }

    const saved = savePendingBooking({
      providerId: provider.id,
      provider: provider.name,
      serviceIds: selectedServices,
      services: selectedDetails,
      date: selectedDate,
      time: selectedTime,
      totalPrice,
      totalDuration,
      advancePercent: ADVANCE_PERCENT,
      advanceAmount,
      contact: { name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() },
      guest,
      createdAt: Date.now()
    });

    if (!saved) {
      markAttempted(4);
      return;
    }

    navigate(ROUTES.payment);
  };

  /* ---------- sidebar ---------- */

  const blocked = Boolean(stepError(step));
  const showStepError = attempted[step] ? stepError(step) : null;
  const sidebarHint = blocked
    ? stepError(step)
    : step === LAST_BOOKING_STEP
      ? `Next, you'll pay ${ADVANCE_PERCENT}% in advance by bank transfer to secure this slot.`
      : null;

  return (
    <form onSubmit={submit} className="mx-auto w-[min(1200px,100%)]" noValidate>
<div ref={topRef} className="h-2 scroll-mt-[90px]" />

<HeaderPortal slotId={BACK_SLOT_ID}>
  <button
    type="button"
    aria-label="Back"
    className="grid size-9 place-items-center rounded-full hover:bg-ink/5"
    onClick={step === 1 ? goBackFromFirst : previousStep}
  >
    <ChevronLeft size={24} />
  </button>
</HeaderPortal>

<HeaderPortal slotId={PROGRESS_SLOT_ID}>
  <BookingProgress current={step} canGoTo={canGoTo} onSelect={goToStep} />
</HeaderPortal>

      <div className="grid grid-cols-[minmax(0,1fr)_252px] items-start gap-[26px] max-tablet:grid-cols-1">
        <div className="min-w-0">
          {step === 1 && <ProfessionalStep providerId={providerId} onSelect={selectProvider} />}

          {step === 2 && provider && (
            <ServiceStep
              provider={provider}
              selectedIds={selectedServices}
              onToggle={toggleService}
              onBack={previousStep}
              onContinue={nextStep}
              error={showStepError}
            />
          )}

          {step === 3 && (
            <TimeStep
              dates={dates}
              dateOffset={dateOffset}
              onOffsetChange={setDateOffset}
              selectedDate={selectedDate}
              activeDate={activeDate}
              selectedTime={selectedTime}
              onSelectDate={selectDate}
              onSelectTime={selectTime}
              onBack={previousStep}
              error={showStepError}
            />
          )}

          {step === 4 && provider && (
            <CheckoutStep
              provider={provider}
              services={selectedDetails}
              activeDate={activeDate}
              time={selectedTime}
              totalPrice={totalPrice}
              totalDuration={totalDuration}
              advanceAmount={advanceAmount}
              form={form}
              errors={visibleContactErrors}
              onChange={setField}
              onBlurField={blurField}
              onBack={previousStep}
              formError={attempted[4] && Object.keys(contactErrors).length > 0 ? 'Please fix the highlighted details below to continue.' : null}
            />
          )}
        </div>

        <OrderSummary
          provider={provider}
          services={selectedDetails}
          totalPrice={totalPrice}
          totalDuration={totalDuration}
          caption={step === 1 ? 'Selected professional' : 'Appointment in progress'}
          advance={step === LAST_BOOKING_STEP ? { label: `Advance now (${ADVANCE_PERCENT}%)`, amount: advanceAmount } : null}
        >
          {step < LAST_BOOKING_STEP ? (
            <OrderCta type="button" blocked={blocked} onClick={nextStep}>
              {NEXT_LABELS[step]} <ArrowRight size={14} />
            </OrderCta>
          ) : (
            <OrderCta type="submit" blocked={blocked}>
              Book appointment <ArrowRight size={14} />
            </OrderCta>
          )}
          <OrderHint>{sidebarHint}</OrderHint>
        </OrderSummary>
      </div>
    </form>
  );
}
