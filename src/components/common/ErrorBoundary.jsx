import { Component } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { authCard, authH2, authPage, authPanel, authLead } from '../auth/authClasses';
import { bookingButton, emphasis, kicker } from '../../utils/ui';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Replace with a production error-monitoring service when connected.
    console.error('Application error:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className={authPage}>
        <div className={`${authPanel} col-span-full`}>
          <div className={authCard}>
            <div className={kicker}>Something went wrong</div>
            <h2 className={authH2}>Please<br /><em className={emphasis}>reload.</em></h2>
            <p className={authLead}>The page hit an unexpected error. Reload the site to continue browsing.</p>
            <button className={bookingButton} onClick={() => window.location.reload()}>
              Reload site <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
