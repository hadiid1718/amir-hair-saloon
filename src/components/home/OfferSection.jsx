import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import { sectionPad } from '../../utils/ui';
import { useRouter } from '../../hooks/useRouter';

export function OfferSection() {
  const { navigate } = useRouter();

  return (
    <section
      className={`${sectionPad} flex justify-center bg-paper pb-[clamp(62px,8vw,96px)] pt-[30px] max-mobile:pb-[58px] max-mobile:pt-6`}
      aria-label="Member offer"
    >
      <div className="w-[min(430px,100%)] rounded-[7px] bg-[linear-gradient(145deg,#262221,#1d1916)] px-6 pb-5 pt-[22px] text-center text-white shadow-[0_14px_35px_rgba(17,17,17,.12)] max-mobile:px-[18px] max-mobile:py-[19px]">
        <span className="mx-auto mb-[9px] grid size-[22px] place-items-center rounded-full border border-white/25">
          <Sparkles size={13} />
        </span>
        <span className="font-semibold text-[8px] uppercase tracking-[.17em] text-gold">New guest offer</span>
        <h2 className="my-2 text-lg font-bold tracking-[-.04em]">Exclusive Offers Waiting</h2>
        <p className="mx-auto mb-3 mt-0 max-w-[290px] text-[9px] leading-[1.6] text-white/65">
          Create an account and get access to salon-only offers, booking history and easier appointments.
        </p>
        <button
          className="inline-flex items-center gap-1.5 rounded-full border border-white/18 bg-gold px-3 py-[7px] text-[9px] font-extrabold text-dark"
          onClick={() => navigate(ROUTES.signup)}
        >
          Sign up <ArrowUpRight size={13} />
        </button>
      </div>
    </section>
  );
}
