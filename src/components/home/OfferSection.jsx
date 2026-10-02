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
<div className="w-[min(640px,100%)] rounded-3xl bg-[linear-gradient(145deg,#262221,#1d1916)] px-12 pb-11 pt-12 text-center text-white shadow-[0_20px_50px_rgba(17,17,17,.18)] max-mobile:px-6 max-mobile:pb-8 max-mobile:pt-9">
  <span className="mx-auto mb-4 grid size-11 place-items-center rounded-full border border-white/25">
    <Sparkles size={20} />
  </span>
  <span className="font-semibold text-[12px] uppercase tracking-[.17em] text-gold">New guest offer</span>
  <h2 className="my-4 text-[28px] font-bold tracking-[-.04em] max-mobile:text-[24px]">Exclusive Offers Waiting</h2>
  <p className="mx-auto mb-7 mt-0 max-w-[440px] text-[15px] leading-[1.7] text-white/65 max-mobile:text-[14px]">
    Create an account and get access to salon-only offers, booking history and easier appointments.
  </p>
  <button
    className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-gold px-6 py-3 text-[14px] font-extrabold text-dark transition hover:-translate-y-px"
    onClick={() => navigate(ROUTES.signup)}
  >
    Sign up <ArrowUpRight size={16} />
  </button>
</div>
    </section>
  );
}
