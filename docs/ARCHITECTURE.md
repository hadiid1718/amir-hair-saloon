# Architecture

The application uses a lightweight feature-based React structure without a heavy routing dependency.

## Source layout

- `src/app/` — application shell and browser-history router.
- `src/components/common/` — reusable primitives such as brand, error boundary, and route guards.
- `src/components/layout/` — global navigation and shared page chrome.
- `src/components/home/` — homepage sections only.
- `src/components/appointments/` — booking flow: orchestrator (`AppointmentForm`), one component per step in `steps/`, progress bar and order summary.
- `src/components/payment/` — advance-payment page: bank selection, copyable account details, screenshot upload.
- `src/components/auth/` — login/sign-up UI.
- `src/context/` — session state shared across the application.
- `src/hooks/` — focused reusable behavior such as auth, routing, and booking navigation.
- `src/data/` — all editable content and booking catalog data. Components do not own production/dummy content.
- `src/services/` — storage/API boundaries (`bookingService.js` is the seam for a future backend).
- `src/utils/` — constants and small pure navigation helpers.
- `src/styles/index.css` — Tailwind entry: design tokens (`@theme`) and base rules only. All component styling is Tailwind utilities.

## Booking flow

`useBookingNavigation` decides whether a visitor should go to login or directly to appointments. `ProtectedRoute` allows authenticated members and guest sessions to enter `/appointments`.

The appointment builder keeps selection state local to the appointment feature. Provider-specific services live in `src/data/bookingData.js`, so pricing and duration changes do not require component edits.

## Booking → payment flow

1. `AppointmentForm` owns the state for steps 1–4. Choosing a professional or a time slot advances automatically (short delay so the selection registers); services are multi-select and use a Continue button.
2. Each step has a completion check (`stepError`). Incomplete steps show a message and cannot be skipped; the progress bar only lets you jump to a step if all earlier ones are complete. Checkout validates name, email and a Pakistani mobile number (`src/utils/validation.js`). Past time slots on the current day are disabled.
3. "Book appointment" re-validates every step, saves a pending booking (`bookingService.savePendingBooking`) and navigates to `/payment`.
4. `PaymentFlow` reads the pending booking, shows the 50% advance, requires a bank choice and a screenshot (compressed client-side by `src/utils/image.js`), then saves the final record with status `awaiting-payment-verification`. Visiting `/payment` without a pending booking redirects back to `/appointments`; the Back button returns to checkout with the entries preserved.

## Work gallery

The portfolio carousel is limited to five curated studio images. The gallery contains fifteen images, initially rendering eight (4x2 on desktop), with an explicit `View all 15 photos` / `Show less` control.
