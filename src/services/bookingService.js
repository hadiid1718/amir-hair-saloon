import { storage } from './storage';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Booking persistence. Everything is stored in the browser for now; when a
 * backend exists, replace the bodies of these functions and keep the signatures.
 */

export const savePendingBooking = (booking) => storage.set(STORAGE_KEYS.pendingBooking, booking);
export const loadPendingBooking = () => storage.get(STORAGE_KEYS.pendingBooking, null);
export const clearPendingBooking = () => storage.remove(STORAGE_KEYS.pendingBooking);

/** Saves the confirmed request (booking + payment proof). Rejects if it could not be stored. */
export async function submitBooking(record) {
  const saved = storage.set(STORAGE_KEYS.lastAppointment, record);
  if (!saved) throw new Error('storage-failed');
  clearPendingBooking();
  return record;
}
