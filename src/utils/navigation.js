import { ROUTES } from './constants';

export function getBookingRoute(isAuthenticated, isGuest) {
  return isAuthenticated || isGuest ? ROUTES.appointments : ROUTES.login;
}
