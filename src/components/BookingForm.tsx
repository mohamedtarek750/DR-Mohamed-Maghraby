'use client';

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import type { Dictionary, Locale } from '@/content/dictionary';
import { clinic } from '@/content/site';
import { submitBooking, type BookingState } from '@/lib/actions';
import {
  BOOKING_FIELDS,
  PLACE_VALUES,
  validateBooking,
  validateField,
  type BookingErrors,
  type BookingField,
} from '@/lib/booking';
import ContactButton from './ContactButton';

const control =
  'w-full scroll-mt-28 rounded-sm border bg-paper px-3.5 py-3 text-[15px] text-ink outline-none transition-colors duration-(--motion-feedback) placeholder:text-ink-mute/80 focus:border-sage-deep aria-invalid:border-[#8a3b32]';

const errorId = (field: string) => `${field}-error`;

/** One labelled field with its own error line, wired up for screen readers. */
function Field({
  id,
  label,
  error,
  hint,
  children,
  wide = false,
}: {
  id: string;
  label: string;
  error?: string;
  /** Always-visible help. Its id is `${id}-hint`; the control must list it
   *  in aria-describedby. */
  hint?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={wide ? 'sm:col-span-2' : undefined}>
      <label className="mb-1.5 block text-[13px] text-ink-soft" htmlFor={id}>
        {label}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[12.5px] text-ink-mute">
          {hint}
        </p>
      ) : null}
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

  const a11y = (field: BookingField, hintId?: string) => {
    const describedBy = [errors[field] ? errorId(field) : null, hintId ?? null].filter(Boolean);
    return {
      'aria-invalid': errors[field] ? true : undefined,
      'aria-describedby': describedBy.length ? describedBy.join(' ') : undefined,
      onBlur,
    };
  };

  // Radios can't use onBlur: a radio's value is its own even when unchecked,
  // so leaving one would look like a valid answer. Validate on change instead.
  const onPlaceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const error = validateField('place', event.target.value);
    setErrors((current) => {
      const next = { ...current };
      if (error) next.place = error;
      else delete next.place;
      return next;
    });
  };


  if (state.status === 'sent' || state.status === 'mailto') {
    const sent = state.status === 'sent';
    return (
      <div role="status" className="rounded-sm border border-sage-deep/25 bg-sage-wash/60 p-7 sm:p-9">
        <h3 className="font-display text-[1.5rem] text-sage-deep">
          {sent ? t.booking.successTitle : t.booking.mailtoTitle}
        </h3>
        <p className="mt-3 text-[15px] leading-[1.75] text-ink-soft">
          {sent ? t.booking.successBody : t.booking.mailtoBody}
        </p>
        {state.status === 'mailto' ? (
          <a
            href={state.href}
            className="mt-6 inline-flex rounded-sm bg-ink px-6 py-3.5 text-sm text-paper transition-colors duration-(--motion-feedback) hover:bg-sage-deep"
          >
            {t.booking.mailtoCta}
          </a>
        ) : null}
        {/* Calling or WhatsApp is always faster than waiting for a reply. */}
        <p className="mt-6 text-[14px] text-ink-soft">
          {sent ? t.booking.successCall : t.booking.mailtoOr}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <ContactButton
            variant={sent ? 'solid' : 'outline'}
            label={t.nav.call}
            sublabel={clinic.primaryPhone}
            cta={sent ? 'success' : 'mailto'}
          />
          <ContactButton
            channel="whatsapp"
            variant="outline"
            label={t.hero.whatsapp}
            prefill={t.whatsappPrefill}
            cta={sent ? 'success' : 'mailto'}
          />
        </div>
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

      <Field id="phone" label={t.booking.phone} error={message('phone')} hint={t.booking.phoneHint}>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          dir="ltr"
          className={`${control} tnum text-start`}
          {...a11y('phone', 'phone-hint')}
        />
      </Field>

      <Field id="country" label={t.booking.country} error={message('country')}>
        {/* Most patients are in Egypt, so it is preselected. */}
        <select
          id="country"
          name="country"
          required
          defaultValue={t.countries[0]}
          className={control}
          {...a11y('country')}
        >
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

      {/* The clinic's own question: which branch, or online? */}
      <fieldset
        className="sm:col-span-2"
        aria-invalid={errors.place ? true : undefined}
        aria-describedby={errors.place ? errorId('place') : undefined}
      >
        <legend className="mb-2 text-[13px] text-ink-soft">{t.booking.place}</legend>
        <div className="grid grid-cols-2 gap-2">
          {PLACE_VALUES.map((value, i) => (
            <label
              key={value}
              className={`flex min-h-[48px] cursor-pointer items-center gap-2.5 rounded-sm border bg-paper px-3.5 py-2.5 text-[14px] text-ink transition-colors duration-(--motion-feedback) has-checked:border-sage-deep has-checked:bg-sage-wash has-focus-visible:ring-2 has-focus-visible:ring-sage-deep ${
                errors.place ? 'border-[#8a3b32]' : 'border-line'
              }`}
            >
              <input
                // The first radio carries id="place" so the error summary can
                // move focus to the group.
                id={i === 0 ? 'place' : undefined}
                type="radio"
                name="place"
                required
                value={value}
                onChange={onPlaceChange}
                className="h-4 w-4 shrink-0 accent-sage-deep"
              />
              {t.booking.placeOptions[value]}
            </label>
          ))}
        </div>
        {errors.place ? (
          <p id={errorId('place')} className="mt-1.5 text-[13px] text-[#8a3b32]">
            {message('place')}
          </p>
        ) : null}
      </fieldset>

      <Field id="gender" label={t.booking.gender} error={message('gender')}>
        <select id="gender" name="gender" required defaultValue="" className={control} {...a11y('gender')}>
          <option value="" disabled>
            {t.booking.genderChoose}
          </option>
          <option value={t.booking.male}>{t.booking.male}</option>
          <option value={t.booking.female}>{t.booking.female}</option>
        </select>
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
        <div role="alert" className="sm:col-span-2">
          <p className="text-[13.5px] text-[#8a3b32]">{t.booking.errorGeneric}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <ContactButton
              variant="outline"
              label={t.nav.call}
              sublabel={clinic.primaryPhone}
              cta="error"
            />
            <ContactButton
              channel="whatsapp"
              variant="outline"
              label={t.hero.whatsapp}
              prefill={t.whatsappPrefill}
              cta="error"
            />
          </div>
        </div>
      ) : null}

      <div className="sm:col-span-2">
        {/* Urgent cases go by phone, never through a form that waits. */}
        <p className="mb-4 text-[13px] leading-[1.7] text-ink-mute">
          {t.booking.formUrgent} {t.clinics.urgent.safety}
        </p>
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
