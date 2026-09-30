import { ArrowUpRight } from 'lucide-react';
import { team } from '../../data/siteData';
import { referenceSectionY, sectionPad } from '../../utils/ui';
import { useBookingNavigation } from '../../hooks/useBookingNavigation';

const photoLabel = 'absolute bottom-2 left-[9px] font-semibold text-[9px] uppercase tracking-[.08em] [text-shadow:0_1px_10px_rgba(0,0,0,.6)]';

export function TeamSection() {
  const goBooking = useBookingNavigation();

  return (
    <section id="team" className={`${referenceSectionY} ${sectionPad} bg-paper`}>
      <div className="mb-[18px] flex items-baseline justify-between gap-2.5 max-mobile:mb-[15px]">
        <h2 className="m-0 text-[clamp(27px,3.2vw,46px)] font-bold leading-none tracking-[-.055em] max-mobile:text-[24px]">Meet the Team</h2>
        <span className="block h-px w-11 bg-line" />
      </div>

      <div className="grid grid-cols-[repeat(2,minmax(0,175px))] gap-3.5 max-[760px]:max-w-[360px] max-[760px]:grid-cols-[repeat(2,minmax(0,1fr))] max-[520px]:max-w-full max-[520px]:gap-2">
        {team.map((person, index) => {
          const featured = index === 0 && !person.placeholder;
          return (
            <article
              key={person.id}
              className={`group overflow-hidden rounded-md border border-[rgba(17,17,17,.08)] ${
                person.placeholder ? 'bg-navy text-white' : featured ? 'bg-paper-soft text-ink' : 'bg-navy text-white'
              }`}
            >
              <div className="relative aspect-[.82/1] overflow-hidden">
                {person.placeholder ? (
                  <div className="grid size-full place-items-center bg-navy">
                    <span className={photoLabel}>Stylist</span>
                  </div>
                ) : (
                  <img className="size-full object-cover" src={person.image} alt={`${person.name}, ${person.role}`} loading="lazy" />
                )}

                <div className="absolute inset-0 z-3 flex translate-y-1.5 items-center justify-center bg-[linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.72))] opacity-0 transition duration-[280ms] group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={goBooking}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-black/20 px-[11px] py-[9px] text-[9px] font-bold text-white backdrop-blur-[7px] hover:border-white hover:bg-white hover:text-ink"
                  >
                    {person.actionLabel}
                    <ArrowUpRight size={13} />
                  </button>
                </div>

                {!person.placeholder && <span className={photoLabel}>{person.name}</span>}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
