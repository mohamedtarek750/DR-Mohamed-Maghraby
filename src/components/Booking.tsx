import type { Dictionary, Locale } from '@/content/dictionary';
import { allNumbersOnWhatsApp, clinic, verified } from '@/content/site';
import BookingForm from './BookingForm';
import ContactButton from './ContactButton';
import { MailIcon } from './Icons';
import Reveal from './Reveal';
import ThoughtField from './ThoughtField';

/**
 * The contact hub. Phones first, because calling is how most patients book;
 * the form second, for anyone who can't call right now.
 */
export default function Booking({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section
      id="booking"
      className="grain relative isolate scroll-mt-24 overflow-hidden border-t border-line py-20 sm:py-28 lg:py-32"
    >
      <div className="absolute inset-0 -z-10 opacity-45">
        <ThoughtField />
      </div>

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">{t.booking.label}</p>
              <h2 className="font-display mt-4 text-[2rem] leading-[1.15] text-ink sm:text-[2.7rem] rtl:leading-[1.35]">
                {t.booking.heading}
              </h2>
              <p className="mt-5 max-w-[44ch] text-[15.5px] leading-[1.8] text-ink-soft">
                {t.booking.body}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-8">
                <p className="eyebrow">{t.booking.phonesLabel}</p>
                {allNumbersOnWhatsApp ? (
                  <p className="mt-1.5 text-[13px] text-ink-mute">{t.booking.whatsappNote}</p>
                ) : null}
                <ul className="mt-3 grid gap-2">
                  {clinic.phones.map((n, i) => (
                    <li key={n} className="flex gap-2">
                      <ContactButton
                        variant="row"
                        phone={n}
                        label={n}
                        cta={`booking-${i + 1}`}
                        className="flex-1"
                      />
                      {/* The same line on WhatsApp. Its visible word plus the
                          hidden number give it a distinct accessible name. */}
                      {(clinic.whatsapp as readonly string[]).includes(n) ? (
                        <ContactButton
                          channel="whatsapp"
                          variant="chip"
                          phone={n}
                          label={t.nav.whatsapp}
                          prefill={t.whatsappPrefill}
                          cta={`booking-${i + 1}`}
                        />
                      ) : null}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[14px] text-ink">
                  {t.booking.hoursLine} {clinic.contactHours[locale]}
                </p>
                <p className="mt-1 text-[13px] text-ink-mute">{t.booking.busyHint}</p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-8 border-t border-line pt-6">
                <p className="eyebrow">{t.booking.emailLabel}</p>
                <a
                  href={`mailto:${verified.email}`}
                  dir="ltr"
                  className="mt-3 inline-flex items-center gap-2.5 text-[14.5px] break-all text-ink transition-colors hover:text-sage-deep"
                >
                  <span className="h-4 w-4 shrink-0 text-sage-deep">
                    <MailIcon />
                  </span>
                  {verified.email}
                </a>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-8 max-w-[44ch] border-s-2 border-clay/50 ps-4 text-[13px] leading-[1.7] text-ink-mute">
                {t.booking.disclaimer}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={120}>
              <div
                id="booking-form"
                className="scroll-mt-24 rounded-sm border border-line bg-paper/85 p-6 backdrop-blur-sm sm:p-9"
              >
                <h3 className="font-display text-[1.4rem] text-ink">{t.booking.formTitle}</h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-ink-soft">{t.booking.formBody}</p>
                <p className="mt-2 mb-7 text-[13px] leading-[1.7] text-ink-mute">{t.booking.formHint}</p>
                <BookingForm t={t} locale={locale} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
