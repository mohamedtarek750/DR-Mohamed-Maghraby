/**
 * Booking-form validation, shared by the browser (instant, inline feedback)
 * and the server action (the check that actually counts). Keeping one copy
 * means the two can never disagree about what a valid request is.
 */

/** Also the order of the error summary. */
export const BOOKING_FIELDS = [
  'firstName',
  'lastName',
  'phone',
  'country',
  'place',
  'gender',
  'dob',
] as const;

/** Where the visitor wants to be seen: the clinic's own question,
 *  "تحب احجز لحضرتك في فرع ايه؟". */
export const PLACE_VALUES = ['mohandessin', 'new-cairo', 'online', 'undecided'] as const;
export type Place = (typeof PLACE_VALUES)[number];

export type BookingField = (typeof BOOKING_FIELDS)[number];

/** Keys into `booking.errors` in the dictionary. */
export type BookingErrorKey =
  | BookingField
  | 'phoneShort'
  | 'dobFuture';

export type BookingErrors = Partial<Record<BookingField, BookingErrorKey>>;

const text = (value: FormDataEntryValue | null) =>
  typeof value === 'string' ? value.trim() : '';

/** Validates a single field. Returns the error key, or null when it is fine. */
export function validateField(field: BookingField, raw: string): BookingErrorKey | null {
  const value = raw.trim();
  if (!value) return field;

  if (field === 'place' && !(PLACE_VALUES as readonly string[]).includes(value)) return 'place';

  if (field === 'phone') {
    // Numbers are written many ways (+20, spaces, dashes); count digits only.
    const digits = value.replace(/\D/g, '');
    if (digits.length < 7) return 'phoneShort';
  }

  if (field === 'dob') {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'dob';
    if (date.getTime() > Date.now()) return 'dobFuture';
  }

  return null;
}

export function validateBooking(formData: FormData): BookingErrors {
  const errors: BookingErrors = {};
  for (const field of BOOKING_FIELDS) {
    const error = validateField(field, text(formData.get(field)));
    if (error) errors[field] = error;
  }
  return errors;
}
