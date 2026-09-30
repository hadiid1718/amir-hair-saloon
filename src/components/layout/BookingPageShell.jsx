import { GlobalHeader } from './GlobalHeader';

/** Page chrome shared by the appointment and payment pages. */
export function BookingPageShell({ children }) {
  return (
    <div className="min-h-screen bg-paper-light">
      <GlobalHeader />
      <main className="min-h-[calc(100vh-72px)] px-[clamp(18px,4.8vw,72px)] pb-7 pt-[94px] max-tablet:pt-[88px] max-mobile:px-[15px] max-mobile:pb-[18px] max-mobile:pt-[82px]">
        {children}
      </main>
      <footer className="mx-auto flex w-[min(1200px,calc(100%-36px))] items-center justify-center gap-1.5 border-t border-ink/6 pb-[23px] pt-4 text-[7px] uppercase tracking-[.08em] text-faint max-mobile:flex-col max-mobile:gap-[3px] max-mobile:text-center">
        <strong className="text-muted">ASAD HAIR SALOON</strong>
        <span>Made with care · Precision grooming for modern men</span>
      </footer>
    </div>
  );
}
