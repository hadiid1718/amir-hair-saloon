import { lazy, Suspense } from 'react';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { ROUTES } from '../utils/constants';
import { useRouter } from '../hooks/useRouter';

const HomePage = lazy(() => import('../pages/HomePage').then((module) => ({ default: module.HomePage })));
const LoginPage = lazy(() => import('../pages/LoginPage').then((module) => ({ default: module.LoginPage })));
const SignupPage = lazy(() => import('../pages/SignupPage').then((module) => ({ default: module.SignupPage })));
const AppointmentPage = lazy(() => import('../pages/AppointmentPage').then((module) => ({ default: module.AppointmentPage })));
const PaymentPage = lazy(() => import('../pages/PaymentPage').then((module) => ({ default: module.PaymentPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

function LoadingScreen() {
  return <div className="grid min-h-screen place-items-center bg-paper font-semibold text-[12px] uppercase tracking-[.12em] text-muted" role="status" aria-live="polite">Loading…</div>;
}

export function AppRouter() {
  const { pathname } = useRouter();

  const page = (() => {
    switch (pathname) {
      case ROUTES.login: return <LoginPage />;
      case ROUTES.signup: return <SignupPage />;
      case ROUTES.appointments: return <ProtectedRoute><AppointmentPage /></ProtectedRoute>;
      case ROUTES.payment: return <ProtectedRoute><PaymentPage /></ProtectedRoute>;
      case ROUTES.home: return <HomePage />;
      default: return <NotFoundPage />;
    }
  })();

  return <Suspense fallback={<LoadingScreen />}>{page}</Suspense>;
}
