import { Brand } from '../common/Brand';
import { ROUTES } from '../../utils/constants';
import { useRouter } from '../../hooks/useRouter';

export const BACK_SLOT_ID = 'booking-header-back';
export const PROGRESS_SLOT_ID = 'booking-header-progress';

export function BookingHeader() {
  const { navigate } = useRouter();

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-[72px] items-center gap-3 border-b border-line bg-paper/96 px-[clamp(16px,4vw,56px)] text-ink backdrop-blur-lg max-mobile:h-[62px] max-mobile:px-4">
      <div id={BACK_SLOT_ID} className="flex flex-none items-center" />
      <Brand onHome={() => navigate(ROUTES.home)} />
      <div id={PROGRESS_SLOT_ID} className="ml-auto flex min-w-0 items-center justify-end" />
    </header>
  );
}