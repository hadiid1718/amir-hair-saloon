import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Scissors } from 'lucide-react';

import { services, team } from '../../data/siteData';

import {
  darkPill,
  emphasis,
  monoKicker,
  referenceSectionY,
  sectionPad,
} from '../../utils/ui';

import { useBookingNavigation } from '../../hooks/useBookingNavigation';

const filterChip =
  'rounded-full border border-line px-3 py-1.5 text-[13px] text-muted';

export function ServicesSection() {
  const goBooking = useBookingNavigation();

  // First menu is open by default
  const [openCategory, setOpenCategory] = useState(0);

  return (
    <section
      id="menu"
      className={`${referenceSectionY} ${sectionPad} bg-paper-light`}
    >
      {/* =========================================================
          SECTION HEADER
      ========================================================== */}
      <div className="mx-auto mb-10 max-w-[600px] text-center">
        <span className={monoKicker}>
          Precision. Detail. Consistency.
        </span>

        <h2 className="mb-3 mt-2 text-[clamp(36px,4.6vw,56px)] font-bold leading-none tracking-[-.055em] max-mobile:text-[32px]">
          Our <em className={emphasis}>Menu</em>
        </h2>

        <p className="mx-auto max-w-[480px] text-[15px] leading-[1.65] text-muted max-mobile:text-[14px]">
          Simple services, clear pricing, and a clean experience from the
          first consultation to the final finish.
        </p>

        {/* Category Chips */}
     <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
  <div className="inline-flex items-center gap-2.5">
    <span className="rounded-lg bg-navy px-3 py-1.5 text-[12px] font-bold uppercase tracking-[.04em] text-white">
      {team[0].name}
    </span>
    <span className="text-[15px] text-muted max-mobile:text-[14px]">Premium service by {team[0].name}</span>
  </div>

  <div className="inline-flex items-center gap-2.5">
    <span className="rounded-lg bg-paper-soft px-3 py-1.5 text-[12px] font-bold uppercase tracking-[.04em] text-ink">
      Stylist
    </span>
    <span className="text-[15px] text-muted max-mobile:text-[14px]">Performed by our stylists</span>
  </div>
</div>
      </div>

      {/* =========================================================
          SERVICES ACCORDION
      ========================================================== */}
      <div className="mx-auto grid w-[min(1000px,100%)] gap-4">
        {services.map((group, groupIndex) => {
          const open = openCategory === groupIndex;

          return (
            <div
              key={group.category}
              className={`
                overflow-hidden
                rounded-[20px]
                border
                bg-white
                transition-all
                duration-300
                ${
                  open
                    ? 'border-[#dedbd6]'
                    : 'border-line'
                }
              `}
            >
              {/* =================================================
                  CATEGORY HEADER
              ================================================== */}
              <button
                type="button"
                onClick={() =>
                  setOpenCategory(open ? -1 : groupIndex)
                }
                aria-expanded={open}
                aria-controls={`service-panel-${groupIndex}`}
                className="
                  flex
                  w-full
                  items-center
                  gap-4
                  px-7
                  py-6
                  text-left
                  transition-colors
                  duration-200
                  hover:bg-[#fafafa]
                  max-mobile:px-4
                  max-mobile:py-5
                "
              >
                {/* Category Icon */}
                <span
                  className="
                    grid
                    size-12
                    flex-none
                    place-items-center
                    rounded-xl
                    bg-paper-soft
                    text-muted
                    max-mobile:size-10
                  "
                >
                  <Scissors
                    size={21}
                    strokeWidth={1.8}
                  />
                </span>

                {/* Category Name + Count */}
                <div className="min-w-0">
                  <div className="flex items-center gap-3 max-mobile:gap-2">
                    <h3
                      className="
                        m-0
                        text-[20px]
                        font-bold
                        tracking-[-.02em]
                        max-mobile:text-[15px]
                      "
                    >
                      {group.category}
                    </h3>

                    <span
                      className="
                        text-[12px]
                        font-medium
                        text-[#a49e96]
                        max-mobile:text-[12px]
                      "
                    >
                      {group.items.length}{' '}
                      {group.items.length === 1
                        ? 'service'
                        : 'services'}
                    </span>
                  </div>
                </div>

                {/* Open / Close Chevron */}
                <ChevronDown
                  size={20}
                  className={`
                    ml-auto
                    flex-none
                    text-[#9d9891]
                    transition-transform
                    duration-300
                    ${open ? 'rotate-180' : 'rotate-0'}
                  `}
                />
              </button>

              {/* =================================================
                  EXPANDABLE SERVICE LIST
              ================================================== */}
              <div
                id={`service-panel-${groupIndex}`}
                className={`
                  grid
                  transition-[grid-template-rows,opacity]
                  duration-300
                  ease-in-out
                  ${
                    open
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }
                `}
                aria-hidden={!open}
              >
                <div className="min-h-0 overflow-hidden">
                  <div
                    className="
                      px-7
                      pb-6
                      max-mobile:px-4
                      max-mobile:pb-4
                    "
                  >
                    {/* =================================================
                        SERVICE ROWS
                    ================================================== */}
                    <div
                      className="
                        border-t
                        border-[#f0efed]
                      "
                    >
                      {group.items.map(
                        ([name, price, description], index) => (
                          <div
                            key={`${group.category}-${name}`}
                            className="
                              flex
                              items-center
                              justify-between
                              gap-6
                              border-b
                              border-[#f0efed]
                              py-4
                              transition-colors
                              duration-200
                              hover:bg-[#fafafa]
                              max-mobile:gap-3
                              max-mobile:py-3.5
                            "
                          >
                            {/* Service Name */}
                            <div className="min-w-0">
                              <span
                                className="
                                  block
                                  text-[15px]
                                  font-medium
                                  text-ink
                                  max-mobile:text-[14px]
                                "
                              >
                                {name}
                              </span>
                            </div>

                            {/* Price */}
                            <span
                              className="
                                flex-none
                                whitespace-nowrap
                                text-[15px]
                                font-semibold
                                text-ink
                                max-mobile:text-[13px]
                              "
                            >
                              {price}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================
          BOTTOM CTA
      ========================================================== */}
      <div
        className="
          mx-auto
          mt-8
          flex
          w-[min(1000px,100%)]
          items-center
          justify-between
          gap-5
          max-mobile:flex-col
          max-mobile:items-start
        "
      >
        <span
          className="
            max-w-[470px]
            text-[13px]
            leading-[1.6]
            text-muted
          "
        >
          Prices are starting rates. Final pricing may vary by hair
          length, technique, or treatment requirements.
        </span>

        <button
          type="button"
          className={`${darkPill} max-mobile:self-center`}
          onClick={goBooking}
        >
          Book Appointment

          <ArrowUpRight size={16} />
        </button>
      </div>
    </section>
  );
}