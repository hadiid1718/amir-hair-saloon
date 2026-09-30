# Latest UI Updates

## Booking flow, payment page and Tailwind migration

- Migrated every page and component from the single `main.css` stylesheet to Tailwind CSS v4 utilities; layout, spacing, colours and typography are unchanged.
- Fixed the production build under Vite 8 (`manualChunks` must be a function).
- Selecting a professional now moves to the service step automatically; selecting a time slot moves to checkout automatically.
- No step is pre-filled any more: the professional must be chosen. Every step has a completion check with inline messages, and the progress bar cannot skip ahead.
- Checkout now collects full name, email and phone number with validation (Pakistani mobile format). Past time slots on today's date are disabled.
- "Book appointment" now leads to a new `/payment` page: 50% advance summary, Habib Bank Limited transfer details with copy buttons, and a payment screenshot upload (type/size checks, preview, replace/remove).
- Progress bar gained a fifth "Payment" step. Going Back from payment restores the checkout entries.
- Fixed the portfolio hover overlay so "View" is centred beside its arrow instead of overlapping the photo number.

## Booking and portfolio refinement

- Service/menu categories now behave as accordions; the first category is open by default and closes on click.
- Team shows Asad plus a black Stylist card with hover booking CTAs.
- Team cards are slightly larger with hover reveal interactions.
- Studio carousel above Our Work is limited to 5 images and supports arrows plus autoplay.
- Portfolio starts with 8 images in a 4-column desktop grid and expands to all 15 with `View all 15 photos` / `Show less`.
- Portfolio tiles now use hover overlays.
- Appointment page now supports provider selection (Stylist / Yaseen), provider-specific service catalogs, service durations, multi-service selection, live order summary, total price, and total estimated time.
- Selected appointment services turn black.
- Booking content is stored in `src/data/bookingData.js`; homepage content remains in `src/data/siteData.js`.
