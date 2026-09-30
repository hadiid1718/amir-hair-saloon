import { useEffect } from 'react';
import { ROUTES } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from '../../hooks/useRouter';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, guest } = useAuth();
  const { navigate } = useRouter();
  const canAccess = isAuthenticated || guest;

  useEffect(() => {
    if (!canAccess) navigate(ROUTES.login, { from: ROUTES.appointments }, true);
  }, [canAccess, navigate]);

  return canAccess ? children : null;
}
