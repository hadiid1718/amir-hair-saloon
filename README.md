# Asad Hair Saloon

Reference-inspired React + Vite + Tailwind CSS website for Asad Hair Saloon.

## Features

- Responsive premium barbershop homepage
- Hero booking CTA with login/guest routing
- Login and signup flows with guest mode
- Accordion service/menu categories (first category open by default)
- Team cards with hover booking actions
- Five-image studio carousel above the portfolio
- Portfolio starts with 8 photos and expands to all 15
- FAQ accordion
- Five-step booking flow: professional → service → date & time → checkout → advance payment
- Selecting a professional, or a time slot, moves to the next step automatically; services are multi-select so they use a Continue button
- Every step is validated (nothing can be skipped) with inline messages; checkout collects name, email and phone
- Advance payment page: 50% of the total, Habib Bank Limited transfer details, and a payment screenshot upload
- Guest and member appointment flow
- Lazy-loaded pages and browser-history route handling
- Hostinger SPA fallback configuration

## Styling

All styling is Tailwind CSS v4 utilities inside the components. `src/styles/index.css` only holds the design tokens (`@theme`: colours, fonts, breakpoints) and a few base rules. Shared class recipes live in `src/utils/ui.js` and `src/components/appointments/bookingClasses.js`. Responsive variants use `max-tablet:` (≤900px), `max-mobile:` (≤620px) and `max-tiny:` (≤380px).

## Payment configuration

Edit `src/data/paymentData.js` — **replace the placeholder Habib Bank Limited account title, account number, IBAN and branch before going live**. The advance percentage (`ADVANCE_PERCENT`) and screenshot rules are configured there too.

Bookings and the uploaded screenshot are currently saved in the browser only (`src/services/bookingService.js`). To receive them at the salon, replace `submitBooking` with a call to your backend or a form/email service.

## Content configuration

Edit salon content in:

- `src/data/siteData.js`
- `src/data/bookingData.js`
- `src/data/paymentData.js`

Do not place content catalogs directly inside components.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deployment

The `public/.htaccess` file supports SPA fallback for Apache/Hostinger deployments.
