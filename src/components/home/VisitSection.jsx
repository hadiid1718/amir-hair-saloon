import { ArrowUpRight, Clock3, MapPin, Phone } from 'lucide-react';
import { InstagramIcon } from '../common/icons/InstagramIcon';
import { media, site } from '../../data/siteData';
import { darkPill, monoKicker, outlinePill, referenceSectionY, sectionPad } from '../../utils/ui';
import { useBookingNavigation } from '../../hooks/useBookingNavigation';

export function VisitSection() {
  const goBooking = useBookingNavigation();
  const metaRow = 'flex items-start gap-2 text-[10px] text-secondary';

  return (
    <section
      id="visit"
      className={`${referenceSectionY} ${sectionPad} grid grid-cols-[minmax(0,1fr)_minmax(320px,.85fr)] items-center gap-[clamp(30px,7vw,100px)] bg-paper-soft max-tablet:grid-cols-1`}
    >
      <div>
        <span className={monoKicker}>Come by the studio</span>
        <h2 className="mb-5 mt-[7px] text-[clamp(38px,5.2vw,62px)] font-bold leading-none tracking-[-.055em] max-mobile:text-[36px]">Visit Us</h2>
        <h3 className="m-0 mb-2 text-[12px] font-bold">{site.name}</h3>
        <p className="m-0 max-w-[450px] text-[10px] leading-[1.65] text-muted">{site.description}</p>

        <div className="mt-5 grid gap-2">
          <div className={metaRow}><MapPin size={13} /><span>{site.address}</span></div>
          <div className={metaRow}><Clock3 size={13} /><span>{site.hours}</span></div>
          <div className={metaRow}><Phone size={13} /><span>{site.phone}</span></div>
        </div>

        <div className="mt-[18px] flex flex-wrap items-center gap-[7px]">
          <button className={darkPill} onClick={goBooking}>Book Appointment <ArrowUpRight size={13} /></button>
          <a href={site.instagramUrl} target="_blank" rel="noreferrer" className={outlinePill}>
            <InstagramIcon size={14} /> Instagram
          </a>
        </div>
      </div>

      <div className="relative min-h-[230px] overflow-hidden rounded bg-[#e6e5e3] after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(0,0,0,.15))] after:content-[''] max-tablet:min-h-[260px] max-mobile:min-h-[210px]">
        <img
          className="size-full min-h-[230px] object-cover contrast-[1.02] grayscale-[.15] saturate-[.6] max-tablet:min-h-[260px] max-mobile:min-h-[210px]"
          src={media.map}
          alt="Location map placeholder for Asad Hair Saloon"
          loading="lazy"
        />
        <div className="absolute left-1/2 top-[52%] z-2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-white/93 px-[9px] py-[7px] text-[9px] shadow-[0_8px_25px_rgba(0,0,0,.12)]">
          <span className="size-[7px] rounded-full bg-[#e07a35] shadow-[0_0_0_3px_rgba(224,122,53,.2)]" />
          <span>Asad Hair Saloon</span>
        </div>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-3.5 left-3.5 z-3 inline-flex items-center justify-center gap-[7px] rounded-full bg-white/94 px-[9px] py-[7px] text-[9px] text-ink"
        >
          Open in Maps <ArrowUpRight size={12} />
        </a>
      </div>
    </section>
  );
}
