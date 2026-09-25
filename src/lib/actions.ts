'use server';

import { verified } from '@/content/site';
import { validateBooking, type BookingErrors } from './booking';

export type BookingState =
  | { status: 'idle' }
  | { status: 'invalid'; errors: BookingErrors }
  | { status: 'error' }
  | { status: 'sent' }
  /** No delivery endpoint is configured, so the request is handed back to the
   *  visitor as a pre-filled email to the clinic's published address. */
  | { status: 'mailto'; href: string };

const clean = (value: FormDataEntryValue | null) =>
  typeof value === 'string' ? value.trim().slice(0, 400) : '';

export async function submitBooking(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  // Honeypot: real visitors never fill this.
  if (clean(formData.get('company'))) return { status: 'sent' };

  const data = {
    firstName: clean(formData.get('firstName')),
    lastName: clean(formData.get('lastName')),
    gender: clean(formData.get('gender')),
    country: clean(formData.get('country')),
    phone: clean(formData.get('phone')),
    dob: clean(formData.get('dob')),
    notes: clean(formData.get('notes')),
    locale: clean(formData.get('locale')) || 'ar',
  };

  const errors = validateBooking(formData);
  if (Object.keys(errors).length) return { status: 'invalid', errors };

  const webhook = process.env.BOOKING_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
      });
      if (!response.ok) return { status: 'error' };
      return { status: 'sent' };
    } catch {
      return { status: 'error' };
    }
  }

  const isArabic = data.locale === 'ar';
  const subject = isArabic ? 'طلب حجز موعد' : 'Appointment request';
  const lines = isArabic
    ? [
        `الاسم: ${data.firstName} ${data.lastName}`,
        `النوع: ${data.gender}`,
        `الدولة: ${data.country}`,
        `رقم الهاتف: ${data.phone}`,
        `تاريخ الميلاد: ${data.dob}`,
        data.notes ? `ملاحظة: ${data.notes}` : '',
      ]
    : [
        `Name: ${data.firstName} ${data.lastName}`,
        `Gender: ${data.gender}`,
        `Country: ${data.country}`,
        `Phone: ${data.phone}`,
        `Date of birth: ${data.dob}`,
        data.notes ? `Note: ${data.notes}` : '',
      ];

  const href = `mailto:${verified.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(lines.filter(Boolean).join('\n'))}`;

  return { status: 'mailto', href };
}
