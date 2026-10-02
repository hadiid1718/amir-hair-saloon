import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Brand } from '../common/Brand';
import { authBackLink, authCard, authH2, authLead, authPage, authPanel, authPanelTop } from './authClasses';
import { media, site } from '../../data/siteData';
import { ROUTES } from '../../utils/constants';
import { authInput, authLabel, bookingButton, emphasis, kicker } from '../../utils/ui';
import { isValidEmail } from '../../utils/validation';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from '../../hooks/useRouter';

const divider = "mb-2.5 mt-[18px] flex items-center gap-2 text-[12px] text-faint before:h-px before:flex-1 before:bg-line before:content-[''] after:h-px after:flex-1 after:bg-line after:content-['']";

export function AuthPageView({ mode }) {
  const { isAuthenticated, login, signup, continueAsGuest } = useAuth();
  const { navigate } = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const isLogin = mode === 'login';

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.appointments, null, true);
  }, [isAuthenticated, navigate]);

  const submit = (event) => {
    event.preventDefault();
    setError('');
    if (!isLogin && !form.name.trim()) return setError('Please enter your name.');
    if (!isValidEmail(form.email)) return setError('Please enter a valid email address.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    if (isLogin) login(form.email.trim());
    else signup(form.name.trim(), form.email.trim());
    navigate(ROUTES.appointments);
  };

  return (
    <div className={authPage}>
      <div className="relative min-h-screen overflow-hidden bg-dark max-mobile:hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.73))]" />
        <img className="size-full object-cover" src={media.hero} alt={site.name} />
        <div className="absolute bottom-[8vh] left-[clamp(24px,6vw,80px)] right-5 z-2 text-white">
          <div className="font-semibold text-[12px] uppercase tracking-[.16em] opacity-85">{site.name}</div>
          <h1 className="mb-[15px] mt-3 text-[clamp(58px,7.2vw,100px)] font-bold leading-[.88] tracking-[-.07em]">
            Style is<br /><em className={emphasis}>personal.</em>
          </h1>
          <p className="my-[1em] max-w-[360px] text-[12px] leading-[1.7] text-white/75">
            Reserve your chair, choose your service, and make your next visit yours.
          </p>
        </div>
      </div>

      <div className={authPanel}>
        <div className={authPanelTop}>
          <Brand onHome={() => navigate(ROUTES.home)} />
          <button className={authBackLink} onClick={() => navigate(ROUTES.home)}>
            <ArrowLeft size={15} /> Back to site
          </button>
        </div>

        <div className={authCard}>
          <div className={kicker}>{isLogin ? 'Member access' : 'New member'}</div>
          <h2 className={authH2}>{isLogin ? 'Welcome back.' : 'Create your account.'}</h2>
          <p className={authLead}>
            {isLogin
              ? 'Sign in to book and manage your next salon visit.'
              : 'Create a simple salon account so your appointments are linked to you.'}
          </p>

          <form onSubmit={submit} className="mt-[25px] grid gap-3" noValidate>
            {!isLogin && (
              <label className={authLabel}>
                Full name
                <input className={authInput} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" autoComplete="name" />
              </label>
            )}
            <label className={authLabel}>
              Email address
              <input className={authInput} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" autoComplete="email" type="email" />
            </label>
            <label className={authLabel}>
              Password
              <input className={authInput} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="At least 6 characters" autoComplete={isLogin ? 'current-password' : 'new-password'} type="password" />
            </label>
            {error && (
              <div role="alert" className="border border-[rgba(120,40,30,.14)] bg-[rgba(120,40,30,.05)] px-2.5 py-[9px] text-[12px] text-[#7a332a]">
                {error}
              </div>
            )}
            <button className={`${bookingButton} w-full`} type="submit">
              {isLogin ? 'Log in' : 'Create account'} <ArrowUpRight size={16} />
            </button>
          </form>

          <div className={divider}><span>or</span></div>
          <button
            className="flex h-11 w-full items-center justify-between border border-line px-3 text-[12px] hover:border-ink hover:bg-ink hover:text-white"
            onClick={() => { continueAsGuest(); navigate(ROUTES.home); }}
          >
            <span>Explore as a Guest</span>
            <ArrowUpRight size={16} />
          </button>

          <div className="mt-[18px] flex justify-center gap-[5px] text-[12px] text-muted">
            <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
            <button className="underline underline-offset-[3px]" onClick={() => navigate(isLogin ? ROUTES.signup : ROUTES.login)}>
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
