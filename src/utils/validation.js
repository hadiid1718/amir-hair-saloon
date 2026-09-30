// Small, dependency-free validators used by the booking checkout and auth forms.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (value) => EMAIL_PATTERN.test(String(value ?? '').trim());

/** Strips spaces, dashes and brackets so "0300 123-4567" and "03001234567" compare equal. */
export const normalizePhone = (value) => String(value ?? '').replace(/[\s\-()]/g, '');

/** Accepts Pakistani mobile numbers: 03XXXXXXXXX, +923XXXXXXXXX or 923XXXXXXXXX. */
export const isValidPkMobile = (value) => /^(?:\+?92|0)3\d{9}$/.test(normalizePhone(value));

export function validateContact({ name, email, phone }) {
  const errors = {};
  const trimmed = String(name ?? '').trim();

  if (!trimmed) errors.name = 'Please enter your full name.';
  else if (trimmed.length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!String(email ?? '').trim()) errors.email = 'Please enter your email address.';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email, e.g. you@example.com.';

  if (!String(phone ?? '').trim()) errors.phone = 'Please enter your phone number.';
  else if (!isValidPkMobile(phone)) errors.phone = 'Enter a valid mobile number, e.g. 0300 1234567.';

  return errors;
}
