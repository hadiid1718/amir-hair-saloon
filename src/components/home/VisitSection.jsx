import { ArrowUpRight, Clock3, MapPin, Navigation, Phone } from 'lucide-react';
import { InstagramIcon } from '../common/icons/InstagramIcon';
import { site } from '../../data/siteData';
import { darkPill, monoKicker, outlinePill, referenceSectionY, sectionPad } from '../../utils/ui';
import { useBookingNavigation } from '../../hooks/useBookingNavigation';

export function VisitSection() {
  const goBooking = useBookingNavigation();
  const metaRow = 'flex items-start gap-3 text-[15px] text-secondary';

  return (
    <section
      id="visit"
      className={`${referenceSectionY} ${sectionPad} grid grid-cols-[minmax(0,1fr)_minmax(320px,.95fr)] items-center gap-[clamp(30px,6vw,90px)] bg-paper-soft max-tablet:grid-cols-1`}
    >
      <div>
        <span className={monoKicker}>Come by the studio</span>
        <h2 className="mb-5 mt-2 text-[clamp(40px,5.2vw,64px)] font-bold leading-none tracking-[-.055em] max-mobile:text-[38px]">
          Visit Us
        </h2>
        <h3 className="m-0 mb-2 text-[18px] font-bold">{site.name}</h3>
        <p className="m-0 max-w-[460px] text-[15px] leading-[1.65] text-muted">{site.description}</p>

        <div className="mt-6 grid gap-3">
          <div className={metaRow}><MapPin size={18} className="mt-0.5 flex-none" /><span>{site.address}</span></div>
          <div className={metaRow}><Clock3 size={18} className="mt-0.5 flex-none" /><span>{site.hours}</span></div>
          <div className={metaRow}><Phone size={18} className="mt-0.5 flex-none" /><span>{site.phone}</span></div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <button className={darkPill} onClick={goBooking}>Book Appointment <ArrowUpRight size={16} /></button>
          <a href={site.instagramUrl} target="_blank" rel="noreferrer" className={outlinePill}>
            <InstagramIcon size={16} /> Instagram
          </a>
        </div>
      </div>

      {/* live map */}
      <div className="relative h-[400px] overflow-hidden rounded-2xl border border-line bg-[#e6e5e3] shadow-[0_14px_36px_rgba(17,17,17,.10)] max-mobile:h-[320px]">
        <iframe
          title={`Map showing ${site.name}`}
          src={site.mapEmbedUrl}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-3.5 left-3.5 z-10 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-[14px] font-bold text-white shadow-[0_8px_25px_rgba(0,0,0,.25)] transition hover:-translate-y-px"
        >
          <Navigation size={15} /> Get directions
        </a>
      </div>
    </section>
  );
}