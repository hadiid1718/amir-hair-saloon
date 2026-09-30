import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Brand } from '../components/common/Brand';
import { authBackLink, authCard, authH2, authLead, authPage, authPanel, authPanelTop } from '../components/auth/authClasses';
import { ROUTES } from '../utils/constants';
import { bookingButton, emphasis, kicker } from '../utils/ui';
import { useRouter } from '../hooks/useRouter';

export function NotFoundPage() {
  const { navigate } = useRouter();
  return (
    <div className={authPage}>
      <div className={`${authPanel} col-span-full`}>
        <div className={authPanelTop}>
          <Brand onHome={() => navigate(ROUTES.home)} />
          <button className={authBackLink} onClick={() => navigate(ROUTES.home)}>
            <ArrowLeft size={15} /> Back to site
          </button>
        </div>
        <div className={authCard}>
          <div className={kicker}>404 / Not found</div>
          <h2 className={authH2}>That page<br /><em className={emphasis}>isn't here.</em></h2>
          <p className={authLead}>The address may be incorrect or the page may have moved. Return to the salon home page to keep exploring.</p>
          <button className={bookingButton} onClick={() => navigate(ROUTES.home)}>
            Return home <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
