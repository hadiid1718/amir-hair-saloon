// Advance-payment configuration.
//
// IMPORTANT: replace the placeholder account details below with the salon's real
// Habib Bank Limited account before going live. Customers will see these values.

export const ADVANCE_PERCENT = 50;

export const paymentBanks = [
  {
    id: 'hbl',
    name: 'Habib Bank Limited',
    shortName: 'HBL',
    accountTitle: 'Asad Hair Saloon',
    accountNumber: '0000 0000 0000 00',
    iban: 'PK00 HABB 0000 0000 0000 0000',
    branch: 'Main Boulevard Branch'
  }
];

export const SCREENSHOT_RULES = {
  maxBytes: 8 * 1024 * 1024,
  label: 'PNG, JPG or WEBP · up to 8 MB'
};

export const calculateAdvance = (total) => Math.ceil((total * ADVANCE_PERCENT) / 100);
