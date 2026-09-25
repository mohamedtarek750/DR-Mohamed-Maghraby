'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import type { Dictionary, Locale } from '@/content/dictionary';
import { submitBooking, type BookingState } from '@/lib/actions';

const field =
  'w-full rounded-sm border border-line bg-paper px-3.5 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-mute/70 focus:border-sage-deep';

const labelClass = 'mb-1.5 block text-[12.5px] text-ink-soft';

function Submit({ t }: { t: Dictionary }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-sm bg-ink px-6 py-3.5 text-sm text-paper transition-colors duration-300 hover:bg-sage-deep disabled:opacity-60 sm:w-auto"
    >
      {pending ? t.booking.sending : t.booking.submit}
    </button>
  );
}

export default function BookingForm({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [state, action] = useActionState<BookingState, FormData>(submitBooking, {
    status: 'idle',
  });

  if (state.status === 'sent') {
    return (
      <div
        role="status"
        className="rounded-sm border border-sage-deep/25 bg-sage-wash/60 p-7 sm:p-9"
      >
        <h3 className="font-display text-[1.5rem] text-sage-deep">{t.booking.successTitle}</h3>
        <p className="mt-3 text-[15px] leading-[1.75] text-ink-soft">{t.booking.successBody}</p>
      </div>
    );
  }

  if (state.status === 'mailto') {
    return (
      <div
        role="status"
        className="rounded-sm border border-sage-deep/25 bg-sage-wash/60 p-7 sm:p-9"
      >
        <h3 className="font-display text-[1.5rem] text-sage-deep">{t.booking.mailtoTitle}</h3>
        <p className="mt-3 text-[15px] leading-[1.75] text-ink-soft">{t.booking.mailtoBody}</p>
        <a
          href={state.href}
          className="mt-6 inline-flex rounded-sm bg-ink px-6 py-3.5 text-sm text-paper transition-colors hover:bg-sage-deep"
        >
          {t.booking.mailtoCta}
        </a>
      </div>
    );
  }

  return (
    // React sets method="POST" itself for a server action; declaring it here
    // too renders as lowercase on the client and trips hydration.
    <form action={action} noValidate className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot — visually and semantically hidden from real users. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className={labelClass} htmlFor="firstName">
          {t.booking.firstName}
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          required
          autoComplete="given-name"
          className={field}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="lastName">
          {t.booking.lastName}
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          required
          autoComplete="family-name"
          className={field}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="gender">
          {t.booking.gender}
        </label>
        <select id="gender" name="gender" required defaultValue="" className={field}>
          <option value="" disabled>
            {t.booking.genderChoose}
          </option>
          <option value={t.booking.male}>{t.booking.male}</option>
          <option value={t.booking.female}>{t.booking.female}</option>
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="country">
          {t.booking.country}
        </label>
        <select id="country" name="country" required defaultValue="" className={field}>
          <option value="" disabled>
            {t.booking.countryChoose}
          </option>
          {t.countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="phone">
          {t.booking.phone}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          dir="ltr"
          className={`${field} tnum text-start`}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="dob">
          {t.booking.dob}
        </label>
        <input
          id="dob"
          name="dob"
          type="date"
          required
          autoComplete="bday"
          dir="ltr"
          className={`${field} tnum text-start`}
        />
      </div>

      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor="notes">
          {t.booking.notes}
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder={t.booking.notesPlaceholder}
          className={`${field} resize-y`}
        />
      </div>

      {(state.status === 'invalid' || state.status === 'error') && (
        <p role="alert" className="text-[13.5px] text-[#8a3b32] sm:col-span-2">
          {state.status === 'invalid' ? t.booking.errorRequired : t.booking.errorGeneric}
        </p>
      )}

      <div className="sm:col-span-2">
        <Submit t={t} />
      </div>
    </form>
  );
}
