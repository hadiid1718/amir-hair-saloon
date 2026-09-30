import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { services } from '../../data/siteData';
import { darkPill, emphasis, monoKicker, referenceSectionY, sectionPad } from '../../utils/ui';
import { useBookingNavigation } from '../../hooks/useBookingNavigation';

const filterChip = 'rounded-full border border-line px-3 py-1.5 text-[13px] text-muted';

export function ServicesSection() {
  const goBooking = useBookingNavigation();
  const [openCategory, setOpenCategory] = useState(0);
  let itemNumber = 0;

  return (
    <section id="menu" className={`${referenceSectionY} ${sectionPad} bg-paper-light`}>
      <div className="mx-auto mb-10 max-w-[600px] text-center">
        <span className={monoKicker}>Precision. Detail. Consistency.</span>
        <h2 className="mb-3 mt-2 text-[clamp(36px,4.6vw,56px)] font-bold leading-none tracking-[-.055em] max-mobile:text-[32px]">
          Our <em className={emphasis}>Menu</em>
        </h2>
        <p className="mx-auto max-w-[480px] text-[15px] leading-[1.65] text-muted max-mobile:text-[14px]">
          Simple services, clear pricing, and a clean experience from the first consultation to the final finish.
        </p>
        <div className="mt-4 inline-flex flex-wrap justify-center gap-2" aria-hidden="true">
          <span className={`${filterChip} bg-white text-ink`}>All</span>
          <span className={filterChip}>Hair</span>
          <span className={filterChip}>Beard</span>
          <span className={filterChip}>Care</span>
        </div>
      </div>

      {/* single column */}
      <div className="mx-auto grid w-[min(760px,100%)] gap-4">
        {services.map((group, groupIndex) => {
          const open = openCategory === groupIndex;
          return (
            <div key={group.category}>
              {/* category header card */}
              <button
                type="button"
                onClick={() => setOpenCategory(open ? -1 : groupIndex)}
                aria-expanded={open}
                className={`flex w-full items-center gap-3 rounded-2xl border px-5 py-4 text-left shadow-[0_4px_16px_rgba(17,17,17,.05)] transition duration-200 max-mobile:px-4 ${
                  open ? 'border-navy bg-navy text-white' : 'border-line bg-white hover:border-ink/20'
                }`}
              >
                <span
                  className={`grid size-9 flex-none place-items-center rounded-full border text-[13px] font-bold ${
                    open ? 'border-white/25 text-gold' : 'border-line text-muted'
                  }`}
                >
                  {String(group.items.length).padStart(2, '0')}
                </span>
                <p className="m-0 text-[19px] font-bold tracking-[-.02em] max-mobile:text-[17px]">{group.category}</p>
                <ChevronDown
                  className={`ml-auto flex-none transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  size={20}
                />
              </button>

              {/* item cards */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                  open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
                aria-hidden={!open}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="grid gap-3 px-1 pb-2 pt-3">
                    {group.items.map(([name, price, description]) => {
                      itemNumber += 1;
                      return (
                        <div
                          key={`${group.category}-${name}`}
                          className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-[0_2px_10px_rgba(17,17,17,.04)] transition duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_14px_30px_rgba(17,17,17,.09)] max-mobile:gap-3 max-mobile:p-3.5"
                        >
                          <span className="grid size-12 flex-none place-items-center rounded-xl bg-paper-soft text-[14px] font-bold text-muted transition duration-200 group-hover:bg-navy group-hover:text-gold max-mobile:size-10">
                            {String(itemNumber).padStart(2, '0')}
                          </span>

                          <div className="min-w-0 flex-1">
                            <strong className="block text-[18px] font-semibold leading-tight max-mobile:text-[16px]">{name}</strong>
                            <small className="mt-1 block text-[14px] leading-snug text-muted max-mobile:text-[13px]">{description}</small>
                          </div>

                          <span className="flex-none whitespace-nowrap rounded-full bg-navy px-4 py-2 text-[14px] font-bold text-white max-mobile:px-3 max-mobile:py-1.5 max-mobile:text-[13px]">
                            {price}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-8 flex w-[min(760px,100%)] items-center justify-between gap-5 max-mobile:flex-col max-mobile:items-start">
        <span className="max-w-[470px] text-[13px] leading-[1.6] text-muted">
          Prices are starting rates. Final pricing may vary by hair length, technique, or treatment requirements.
        </span>
        <button className={`${darkPill} max-mobile:self-center`} onClick={goBooking}>
          Book Appointment <ArrowUpRight size={16} />
        </button>
      </div>
    </section>
  );
}