import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Eye, EyeOff } from 'lucide-react';
import { media } from '../../data/siteData';
import { darkPill, monoKicker, outlinePill, sectionPad } from '../../utils/ui';
import { useBookingNavigation } from '../../hooks/useBookingNavigation';

const INITIAL_VISIBLE_PHOTOS = 8;

export function WorkSection() {
  const goBooking = useBookingNavigation();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (media.workCarousel.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setCarouselIndex((current) => (current + 1) % media.workCarousel.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const visiblePhotos = showAll ? media.gallery : media.gallery.slice(0, INITIAL_VISIBLE_PHOTOS);

  const moveCarousel = (direction) => {
    setCarouselIndex((current) => {
      const count = media.workCarousel.length;
      return (current + direction + count) % count;
    });
  };

  const arrow = 'grid size-[30px] place-items-center rounded-full border border-white/50 bg-black/10 text-white backdrop-blur-[6px] hover:bg-white hover:text-ink';

  return (
    <section id="work" className="bg-paper-soft">
      <div className="relative h-[clamp(215px,28vw,395px)] w-full overflow-hidden bg-[#e6e5e3] max-[520px]:h-[200px]" aria-label="Studio highlights">
        {media.workCarousel.map((src, index) => (
          <img
            key={src}
            className={`absolute inset-0 size-full object-cover object-center [transition:opacity_.65s_ease,transform_1.1s_ease] ${index === carouselIndex ? 'scale-100 opacity-100' : 'scale-[1.035] opacity-0'}`}
            src={src}
            alt={`Asad Hair Saloon studio highlight ${index + 1}`}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.34))]" />
        <div className="absolute bottom-3.5 right-[clamp(14px,4vw,56px)] z-3 flex items-center gap-[7px] text-[12px] text-white max-[520px]:bottom-2.5 max-[520px]:right-2.5">
          <button type="button" className={arrow} onClick={() => moveCarousel(-1)} aria-label="Previous studio image">
            <ArrowLeft size={14} />
          </button>
          <span>{String(carouselIndex + 1).padStart(2, '0')} / {String(media.workCarousel.length).padStart(2, '0')}</span>
          <button type="button" className={arrow} onClick={() => moveCarousel(1)} aria-label="Next studio image">
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className={`${sectionPad} pb-[clamp(60px,7vw,85px)] pt-[22px]`}>
        <div className="mb-[15px] flex items-end justify-between gap-2.5">
          <div>
            <span className={monoKicker}>Portfolio</span>
            <h2 className="m-0 mt-1 text-[clamp(27px,3.2vw,46px)] font-bold leading-none tracking-[-.055em] max-mobile:text-[24px]">Our Work</h2>
          </div>
          <span className="block h-px w-11 bg-line" />
        </div>

        <div className="grid grid-cols-4 gap-[5px] max-[520px]:grid-cols-2">
          {visiblePhotos.map((src, index) => (
            <figure className="group relative m-0 aspect-[1/1.16] overflow-hidden rounded-[5px] bg-[#e6e5e3]" key={`${src}-${index}`}>
              <img className="size-full object-cover transition-transform duration-[450ms] group-hover:scale-[1.035]" src={src} alt={`Asad Hair Saloon haircut ${index + 1}`} loading="lazy" />
              <div className="absolute inset-0 flex scale-[.98] items-center justify-center gap-[5px] bg-black/40 text-white opacity-0 transition duration-[280ms] group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100">
                <span className="text-[12px] font-bold">View</span>
                <ArrowUpRight size={13} />
              </div>
              <span className="absolute bottom-[7px] left-2 text-[12px] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.45)]">
                {String(index + 1).padStart(2, '0')}
              </span>
            </figure>
          ))}
        </div>

        <div className="mt-[15px] flex justify-center gap-[7px] max-mobile:flex-wrap">
          <button className={outlinePill} type="button" onClick={() => setShowAll((current) => !current)}>
            {showAll ? <EyeOff size={13} /> : <Eye size={13} />}
            {showAll ? 'Show less' : `View all ${media.gallery.length} photos`}
          </button>
          <button className={darkPill} type="button" onClick={goBooking}>
            Book Appointment <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}
