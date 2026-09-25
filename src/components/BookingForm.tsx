'use client';

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import type { Dictionary, Locale } from '@/content/dictionary';
import { submitBooking, type BookingState } from '@/lib/actions';
import {
  BOOKING_FIELDS,
  validateBooking,
  validateField,
  type BookingErrors,
  type BookingField,
} from '@/lib/booking';

const control =
  'w-full scroll-mt-28 rounded-sm border bg-paper px-3.5 py-3 text-[15px] text-ink outline-none transition-colors duration-(--motion-feedback) placeholder:text-ink-mute/80 focus:border-sage-deep aria-invalid:border-[#8a3b32]';

const errorId = (field: string) => `${field}-error`;

/** One labelled field with its own error line, wired up for screen readers. */
function Field({
  id,
  label,
  error,
  children,
  wide = false,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? 'sm:col-span-2' : undefined}>
      <label className="mb-1.5 block text-[13px] text-ink-soft" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId(id)} className="mt-1.5 text-[13px] text-[#8a3b32]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function BookingForm({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [state, formAction, pending] = useActionState<BookingState, FormData>(submitBooking, {
    status: 'idle',
  });
  const [localErrors, setErrors] = useState<BookingErrors>({});
  const summaryRef = useRef<HTMLDivElement | null>(null);
  // Bumped on every failed submit, so focus moves to the summary even when
  // the same errors come up twice in a row.
  const [failedAttempts, setFailedAttempts] = useState(0);

  // Focus after React has committed the summary to the DOM. (Doing it in a
  // requestAnimationFrame raced the render, and never fires in hidden tabs.)
  useEffect(() => {
    if (failedAttempts) summaryRef.current?.focus();
  }, [failedAttempts]);

  // The server re-checks everything with the same rules. Its verdict only
  // shows when the browser had none of its own (e.g. JavaScript was off).
  const errors =
    state.status === 'invalid' && !Object.keys(localErrors).length ? state.errors : localErrors;

  /*
   * Submitting is handled here rather than by the form's own action: React
   * resets a form after an action runs, which wiped every field whenever
   * validation failed. Validating first, and calling the action ourselves
   * inside a transition, keeps the visitor's input on every outcome. The
   * `action` attribute stays on the form so it still posts without JavaScript.
   */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const found = validateBooking(formData);
    setErrors(found);

    if (Object.keys(found).length) {
      setFailedAttempts((n) => n + 1);
      return;
    }
    startTransition(() => formAction(formData));
  };

  // Re-check a field when the visitor leaves it, but only once it has content
  // or is already flagged: no scolding for simply tabbing through.
  const onBlur = (event: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const field = event.target.name as BookingField;
    if (!BOOKING_FIELDS.includes(field)) return;
    if (!event.target.value && !errors[field]) return;
    const error = validateField(field, event.target.value);
    setErrors((current) => {
      const next = { ...current };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  };

  const message = (field: BookingField) => {
    const key = errors[field];
    return key ? t.booking.errors[key] : undefined;
  };

  const a11y = (field: BookingField) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? errorId(field) : undefined,
    onBlur,
  });

  if (state.status === 'sent' || state.status === 'mailto') {
    return (
      <div role="status" className="rounded-sm border border-sage-deep/25 bg-sage-wash/60 p-7 sm:p-9">
        <h3 className="font-display text-[1.5rem] text-sage-deep">
          {state.status === 'sent' ? t.booking.successTitle : t.booking.mailtoTitle}
        </h3>
        <p className="mt-3 text-[15px] leading-[1.75] text-ink-soft">
          {state.status === 'sent' ? t.booking.successBody : t.booking.mailtoBody}
        </p>
        {state.status === 'mailto' ? (
          <a
            href={state.href}
            className="mt-6 inline-flex rounded-sm bg-ink px-6 py-3.5 text-sm text-paper transition-colors duration-(--motion-feedback) hover:bg-sage-deep"
          >
            {t.booking.mailtoCta}
          </a>
        ) : null}
      </div>
    );
  }

  const invalid = BOOKING_FIELDS.filter((field) => errors[field]);

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot, hidden from people and assistive tech alike. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Error summary: focused after a failed submit so keyboard and screen
          reader users land on it; each item jumps to its field. */}
      {invalid.length ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          aria-labelledby="booking-errors-title"
          className="rounded-sm border border-[#8a3b32]/30 bg-[#8a3b32]/[0.04] p-4 outline-none focus-visible:ring-2 focus-visible:ring-[#8a3b32]/40 sm:col-span-2"
        >
          <p id="booking-errors-title" className="text-[14px] font-medium text-[#8a3b32]">
            {t.booking.summaryTitle}
          </p>
          <ul className="mt-2 space-y-1">
            {invalid.map((field) => (
              <li key={field}>
                <a
                  href={`#${field}`}
                  onClick={(event) => {
                    event.preventDefault();
                    document.getElementById(field)?.focus();
                  }}
                  className="text-[13.5px] text-[#8a3b32] underline underline-offset-4"
                >
                  {message(field)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Field id="firstName" label={t.booking.firstName} error={message('firstName')}>
        <input
          id="firstName"
          name="firstName"
          type="text"
          required
          autoComplete="given-name"
          className={control}
          {...a11y('firstName')}
        />
      </Field>

      <Field id="lastName" label={t.booking.lastName} error={message('lastName')}>
        <input
          id="lastName"
          name="lastName"
          type="text"
          required
          autoComplete="family-name"
          className={control}
          {...a11y('lastName')}
        />
      </Field>

      <Field id="gender" label={t.booking.gender} error={message('gender')}>
        <select id="gender" name="gender" required defaultValue="" className={control} {...a11y('gender')}>
          <option value="" disabled>
            {t.booking.genderChoose}
          </option>
          <option value={t.booking.male}>{t.booking.male}</option>
          <option value={t.booking.female}>{t.booking.female}</option>
        </select>
      </Field>

      <Field id="country" label={t.booking.country} error={message('country')}>
        <select id="country" name="country" required defaultValue="" className={control} {...a11y('country')}>
          <option value="" disabled>
            {t.booking.countryChoose}
          </option>
          {t.countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </Field>

      <Field id="phone" label={t.booking.phone} error={message('phone')}>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          dir="ltr"
          className={`${control} tnum text-start`}
          {...a11y('phone')}
        />
      </Field>

      <Field id="dob" label={t.booking.dob} error={message('dob')}>
        <input
          id="dob"
          name="dob"
          type="date"
          required
          autoComplete="bday"
          dir="ltr"
          className={`${control} tnum text-start`}
          {...a11y('dob')}
        />
      </Field>

      <Field id="notes" label={t.booking.notes} wide>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder={t.booking.notesPlaceholder}
          className={`${control} resize-y border-line`}
        />
      </Field>

      {state.status === 'error' ? (
        <p role="alert" className="text-[13.5px] text-[#8a3b32] sm:col-span-2">
          {t.booking.errorGeneric}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-sm bg-ink px-6 py-3.5 text-sm text-paper transition-colors duration-(--motion-feedback) hover:bg-sage-deep disabled:opacity-60 sm:w-auto"
        >
          {pending ? t.booking.sending : t.booking.submit}
        </button>
      </div>
    </form>
  );
}
