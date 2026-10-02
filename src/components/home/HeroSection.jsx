import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { media, site } from '../../data/siteData';
import { monoKicker, sectionPad } from '../../utils/ui';
import { useBookingNavigation } from '../../hooks/useBookingNavigation';

export function HeroSection() {
  const goBooking = useBookingNavigation();

  return (
    <section
      className="relative min-h-[min(820px,88vh)] overflow-hidden bg-navy max-tablet:min-h-[650px] max-mobile:min-h-[560px] max-tiny:min-h-[520px]"
      aria-labelledby="hero-title"
    >
      <img
        className="absolute inset-0 size-full scale-[1.015] object-cover object-center contrast-[1.02] saturate-[.84]"
        src={media.hero}
        alt="Asad Hair Saloon studio interior"
      />
      <div className="absolute inset-0 size-full bg-[linear-gradient(90deg,rgba(8,8,8,.76)_0%,rgba(8,8,8,.38)_46%,rgba(8,8,8,.12)_100%),linear-gradient(0deg,rgba(8,8,8,.62)_0%,rgba(8,8,8,0)_55%)]" />

      <div className={`${sectionPad} relative z-2 flex min-h-[inherit] max-w-[460px] flex-col justify-end pb-[72px] pt-[120px] text-white max-tablet:pb-[54px] max-mobile:pb-11 max-mobile:pt-[90px] max-[520px]:max-w-[540px]`}>
        <div className={`${monoKicker} flex items-center gap-[7px] opacity-[.86]`}>
          <span className="size-1.5 rounded-full border border-current" /> Premium Men's Grooming
        </div>
        <h1
          id="hero-title"
          className="mb-[15px] mt-2.5 max-w-[560px] text-[clamp(40px,5.4vw,72px)] font-extrabold leading-[.84] tracking-[-.07em] max-[520px]:text-[56px]"
        >
          Redefining<br />Men's<br />Grooming
        </h1>
        <p className="mb-[18px] max-w-[350px] text-[13px] leading-[1.65] text-white/74 max-mobile:text-[14px]">
          {site.description}
        </p>
        <button
          className="inline-flex items-center justify-center gap-[7px] self-start rounded-full bg-white px-[13px] py-[9px] text-[12px] font-bold text-ink transition duration-200 hover:-translate-y-px max-mobile:px-2.5 max-mobile:py-2 max-mobile:text-[12px]"
          onClick={goBooking}
        >
          Book an Appointment <ArrowUpRight size={14} />
        </button>
      </div>

      <button
        className="absolute bottom-[26px] right-[clamp(18px,5vw,72px)] z-2 grid size-7 place-items-center rounded-full border border-white/35 text-white opacity-80 max-mobile:bottom-[18px] max-mobile:right-4"
        onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll to team"
      >
        <ChevronDown size={15} />
      </button>
    </section>
  );
}
