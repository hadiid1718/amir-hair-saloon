import { useEffect, useState } from 'react';
import { ArrowUpRight, LogIn, LogOut, Menu, X } from 'lucide-react';
import { Brand } from '../common/Brand';
import { navigationSections } from '../../data/siteData';
import { ROUTES } from '../../utils/constants';
import { bookingButton } from '../../utils/ui';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from '../../hooks/useRouter';
import { useBookingNavigation } from '../../hooks/useBookingNavigation';

const pill = 'rounded-full border border-current px-2 py-1.5 font-semibold text-[12px] uppercase tracking-[.08em] opacity-80';

export function GlobalHeader() {
  const { auth, guest, logout } = useAuth();
  const { pathname, navigate } = useRouter();
  const goBooking = useBookingNavigation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === ROUTES.home;
  const solid = scrolled || !isHome;
  const darkMenu = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const goSection = (id) => {
    setOpen(false);
    if (!isHome) {
      navigate(`${ROUTES.home}?section=${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const menuRow = `flex w-full items-center justify-between border-b px-0.5 py-3 text-[13px] ${darkMenu ? 'border-white/12' : 'border-line'}`;

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-40 grid h-[72px] grid-cols-[1fr_auto_1fr] items-center px-[clamp(16px,4vw,56px)]',
          'transition-[background-color,color,border-color] duration-200',
          'max-tablet:grid-cols-[1fr_auto] max-mobile:h-[62px] max-mobile:px-4',
          solid
  ? 'border-b border-line bg-paper/96 text-ink backdrop-blur-lg'
  : 'bg-[linear-gradient(180deg,rgba(8,8,8,.65)_0%,rgba(8,8,8,.3)_60%,rgba(8,8,8,0)_100%)] text-white [text-shadow:0_1px_8px_rgba(0,0,0,.55)]'
        ].join(' ')}
      >
        <Brand onHome={() => navigate(ROUTES.home)} />

        <nav className="flex items-center justify-center gap-[clamp(14px,2vw,28px)] max-tablet:hidden" aria-label="Primary navigation">
          {navigationSections.map((item) => (
            <button
              key={item.id}
              onClick={() => goSection(item.id)}
              className="relative py-[5px] text-[12px] opacity-90 after:absolute after:bottom-0 after:left-0 after:right-full after:h-px after:bg-current after:transition-[right] after:duration-200 after:content-[''] hover:after:right-0"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 justify-self-end max-mobile:gap-1.5">
          {guest && <span className={pill}>Guest</span>}
          {auth && <span className={pill}>Member</span>}

          {auth ? (
            <button
              className="inline-flex items-center gap-[5px] text-[12px] opacity-[.82] max-tablet:hidden"
              onClick={() => { logout(); navigate(ROUTES.home); }}
            >
              Log out <LogOut size={13} />
            </button>
          ) : (
            <button
              className="inline-flex items-center gap-[5px] text-[12px] opacity-[.82] max-tablet:hidden"
              onClick={() => navigate(ROUTES.login)}
            >
              Log in <LogIn size={13} />
            </button>
          )}

          <button
            className={`${bookingButton} min-h-8 max-mobile:min-h-[29px] max-mobile:px-2.5 max-mobile:py-2 max-mobile:text-[12px] max-tiny:hidden`}
            onClick={goBooking}
          >
            Book Appointment <ArrowUpRight size={14} />
          </button>

          <button
            className="hidden size-8 place-items-center rounded-full border border-current max-tablet:grid"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {open && (
        <div
          className={[
            'fixed inset-x-0 top-[72px] z-35 border-b px-4 pb-4 pt-3 max-mobile:top-[62px]',
            darkMenu ? 'border-white/12 bg-[rgba(17,17,17,.97)] text-white' : 'border-line bg-paper/99'
          ].join(' ')}
        >
          {navigationSections.map((item) => (
            <button key={item.id} className={menuRow} onClick={() => goSection(item.id)}>
              {item.label} <ArrowUpRight size={14} />
            </button>
          ))}
          <button
            className={menuRow}
            onClick={() => {
              setOpen(false);
              if (auth) {
                logout();
                navigate(ROUTES.home);
              } else {
                navigate(ROUTES.login);
              }
            }}
          >
            {auth ? 'Log out' : 'Log in'} {auth ? <LogOut size={14} /> : <LogIn size={14} />}
          </button>
          <button
            className="mt-3 flex w-full items-center justify-center gap-[7px] rounded-full bg-navy px-0.5 py-3 text-[13px] font-bold text-white"
            onClick={() => { setOpen(false); goBooking(); }}
          >
            Book Appointment <ArrowUpRight size={15} />
          </button>
        </div>
      )}
    </>
  );
}
