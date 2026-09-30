import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { services } from '../../data/siteData';
import { darkPill, emphasis, monoKicker, referenceSectionY, sectionPad } from '../../utils/ui';
import { useBookingNavigation } from '../../hooks/useBookingNavigation';

const filterChip = 'rounded-full border border-line px-2 py-1 text-[9px] text-muted';

export function ServicesSection() {
  const goBooking = useBookingNavigation();
  const [openCategory, setOpenCategory] = useState(0);
  let itemNumber = 0;

  return (
    <section id="menu" className={`${referenceSectionY} ${sectionPad} bg-paper-light`}>
      <div className="mx-auto mb-[34px] max-w-[560px] text-center">
        <span className={monoKicker}>Precision. Detail. Consistency.</span>
        <h2 className="mb-2 mt-1.5 text-[clamp(34px,4.2vw,52px)] font-bold leading-none tracking-[-.055em] max-mobile:text-[30px]">
          Our <em className={emphasis}>Menu</em>
        </h2>
        <p className="mx-auto max-w-[430px] text-[11px] leading-[1.65] text-muted max-mobile:max-w-[290px] max-mobile:text-[9px]">
          Simple services, clear pricing, and a clean experience from the first consultation to the final finish.
        </p>
        <div className="mt-[13px] inline-flex gap-[5px]" aria-hidden="true">
          <span className={`${filterChip} bg-[#f5f5f3] text-ink`}>All</span>
          <span className={filterChip}>Hair</span>
          <span className={filterChip}>Beard</span>
          <span className={filterChip}>Care</span>
        </div>
      </div>

      <div className="mx-auto w-[min(790px,100%)]">
        {services.map((group, groupIndex) => {
          const open = openCategory === groupIndex;
          return (
            <div className="mb-6 max-mobile:mb-[18px]" key={group.category}>
              <button
                type="button"
                className="flex w-full items-center gap-2 border-b border-line pb-2 text-left"
                onClick={() => setOpenCategory(open ? -1 : groupIndex)}
                aria-expanded={open}
              >
                <span className="grid size-[22px] place-items-center rounded-full border border-line text-[8px] text-muted">
                  {String(group.items.length).padStart(2, '0')}
                </span>
                <h3 className="m-0 text-[12px] font-bold tracking-[-.02em]">{group.category}</h3>
                <ChevronDown className={`ml-auto flex-none transition-transform duration-200 ${open ? 'rotate-180' : ''}`} size={14} />
              </button>

              <div
                className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-[.42]'}`}
                aria-hidden={!open}
              >
                <div className={`min-h-0 overflow-hidden ${open ? 'pt-px' : ''}`}>
                  {group.items.map(([name, price, description]) => {
                    itemNumber += 1;
                    return (
                      <div
                        className="grid min-h-[42px] grid-cols-[28px_1fr_auto] items-center gap-2.5 border-b border-ink/[.065] py-1.5 max-mobile:min-h-[39px] max-mobile:grid-cols-[22px_1fr_auto] max-mobile:gap-1.5 max-tiny:min-h-9"
                        key={`${group.category}-${name}`}
                      >
                        <span className="text-[8px] text-faint">{String(itemNumber).padStart(2, '0')}</span>
                        <div>
                          <strong className="block text-[11px] font-semibold max-mobile:text-[10px]">{name}</strong>
                          <small className="mt-px block text-[9px] text-muted max-mobile:text-[8px]">{description}</small>
                        </div>
                        <span className="whitespace-nowrap font-semibold text-[9px] max-mobile:text-[8px]">{price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-[7px] flex w-[min(790px,100%)] items-center justify-between gap-[18px] max-mobile:flex-col max-mobile:items-start">
        <span className="max-w-[470px] text-[8px] leading-[1.6] text-muted">
          Prices are starting rates. Final pricing may vary by hair length, technique, or treatment requirements.
        </span>
        <button className={`${darkPill} max-mobile:self-center`} onClick={goBooking}>
          Book Appointment <ArrowUpRight size={13} />
        </button>
      </div>
    </section>
  );
}
