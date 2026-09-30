import { ArrowUpRight } from 'lucide-react';
import { site } from '../../data/siteData';
import { sectionPad } from '../../utils/ui';
import { useBookingNavigation } from '../../hooks/useBookingNavigation';
import { useRouter } from '../../hooks/useRouter';

const footerLinks = [
  ['Team', 'team'],
  ['Menu', 'menu'],
  ['Work', 'work'],
  ['Visit', 'visit']
];

export function HomeFooter() {
  const { navigate } = useRouter();
  const goBooking = useBookingNavigation();
  const muted = 'text-[9px] text-faint';

  return (
    <footer className="bg-dark text-white">
      <div className={`${sectionPad} grid grid-cols-[1.1fr_.6fr_.9fr] gap-7 pb-[34px] pt-[38px] max-tablet:grid-cols-[1fr_auto] max-mobile:grid-cols-2`}>
        <div>
          <div className="text-[19px] font-extrabold tracking-[-.05em]">ASAD</div>
          <div className="-mt-0.5 text-[9px] tracking-[.18em] text-faint">HAIR SALOON</div>
          <p className="m-0 mt-[13px] text-[10px] leading-[1.7] text-faint">{site.tagline}<br />One cut at a time.</p>
        </div>

        <div className="grid content-start gap-[7px] max-tablet:col-start-1 max-tablet:row-start-2 max-tablet:grid-flow-col max-tablet:justify-start max-mobile:col-span-2 max-mobile:flex max-mobile:gap-3">
          {footerLinks.map(([label, id]) => (
            <button key={id} className={`${muted} justify-self-start hover:text-white`} onClick={() => navigate(`/?section=${id}`)}>
              {label}
            </button>
          ))}
        </div>

        <div className="grid content-start justify-items-end gap-[7px] max-tablet:col-start-2 max-tablet:row-start-1">
          <span className={`${muted} justify-self-start text-right`}>{site.phone}</span>
          <span className={`${muted} justify-self-start text-right`}>{site.bookingEmail}</span>
          <span className={`${muted} justify-self-start text-right`}>{site.hours}</span>
          <button
            className="mt-2 inline-flex items-center gap-[5px] rounded-full bg-white px-2.5 py-[7px] text-[9px] text-ink max-mobile:justify-self-end"
            onClick={goBooking}
          >
            Book <ArrowUpRight size={12} />
          </button>
        </div>
      </div>

      <div className={`${sectionPad} flex justify-between gap-2.5 border-t border-white/9 pb-3.5 pt-3 text-[8px] text-muted max-mobile:flex-col max-mobile:gap-[5px]`}>
        <span>© {new Date().getFullYear()} Asad Hair Saloon</span>
        <span>Built for modern grooming.</span>
      </div>
    </footer>
  );
}
