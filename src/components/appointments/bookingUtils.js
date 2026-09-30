export const currency = new Intl.NumberFormat('en-PK');
export const formatPrice = (value) => `Rs. ${currency.format(value)}`;

export const TIME_SLOTS = [
  '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM',
  '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM',
  '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
  '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM',
  '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM',
  '9:30 PM', '10:00 PM', '10:30 PM'
];

// Demo unavailable slots. Replace these with API availability when the booking backend is connected.
export const BOOKED_SLOTS = new Set(['12:30 PM', '3:00 PM', '5:30 PM']);

export const BOOKING_STEPS = ['Professional', 'Service', 'Time', 'Checkout', 'Payment'];

export const formatDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const makeDates = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    return date;
  });
};

export const parseDateKey = (key) => {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const formatMonth = (date) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);

export const formatWeekday = (date) =>
  new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);

export const formatLongDate = (date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const slotToMinutes = (slot) => {
  const [clock, meridiem] = slot.split(' ');
  const [hours, minutes] = clock.split(':').map(Number);
  return ((hours % 12) + (meridiem === 'PM' ? 12 : 0)) * 60 + minutes;
};

/** True when the slot's start time has already passed on the given day (only ever true for today). */
export const isSlotPast = (dateKey, slot, now = new Date()) => {
  if (dateKey !== formatDateKey(now)) return false;
  return slotToMinutes(slot) <= now.getHours() * 60 + now.getMinutes();
};

export const isSlotSelectable = (dateKey, slot, now = new Date()) =>
  TIME_SLOTS.includes(slot) && !BOOKED_SLOTS.has(slot) && !isSlotPast(dateKey, slot, now);

export const countAvailableSlots = (dateKey, now = new Date()) =>
  TIME_SLOTS.filter((slot) => isSlotSelectable(dateKey, slot, now)).length;
