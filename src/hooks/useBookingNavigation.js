import { ROUTES } from '../utils/constants';
import { getBookingRoute } from '../utils/navigation';
import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { useRouter } from './useRouter';

export function useBookingNavigation() {
  const { isAuthenticated, guest } = useAuth();
  const { navigate } = useRouter();

  return useCallback(() => {
    const destination = getBookingRoute(isAuthenticated, guest);
    navigate(destination, destination === ROUTES.login ? { from: ROUTES.appointments } : null);
  }, [isAuthenticated, guest, navigate]);
}
