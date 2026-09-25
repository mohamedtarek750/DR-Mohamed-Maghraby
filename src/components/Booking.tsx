import type { Dictionary, Locale } from '@/content/dictionary';
import { pending, verified } from '@/content/site';
import BookingForm from './BookingForm';
import { MailIcon } from './Icons';
import Reveal from './Reveal';
import ThoughtField from './ThoughtField';

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
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">{t.booking.label}</p>
              <h2 className="font-display mt-4 text-[2rem] leading-[1.15] text-ink sm:text-[2.7rem] rtl:leading-[1.35]">
                {t.booking.heading}
              </h2>
              <p className="mt-5 max-w-[42ch] text-[15.5px] leading-[1.8] text-ink-soft">
                {t.booking.body}
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-9 border-t border-line pt-6">
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

            {/* Clinic addresses and hours render only when supplied in site.ts.
                They are not published anywhere public, so nothing is guessed. */}
            {pending.clinics?.length ? (
              <div className="mt-8 border-t border-line pt-6">
                {pending.clinics.map((clinic) => (
                  <div key={clinic.name} className="mb-5 last:mb-0">
                    <p className="text-[14.5px] font-medium text-ink">{clinic.name}</p>
                    <p className="mt-1 text-[14px] text-ink-soft">{clinic.address}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {pending.hours?.length ? (
              <dl className="mt-8 border-t border-line pt-6">
                {pending.hours.map((slot) => (
                  <div key={slot.days} className="flex justify-between gap-6 py-1.5 text-[14px]">
                    <dt className="text-ink-soft">{slot.days}</dt>
                    <dd className="tnum text-ink">{slot.time}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <Reveal delay={220}>
              <p className="mt-9 max-w-[44ch] border-s-2 border-clay/50 ps-4 text-[13px] leading-[1.7] text-ink-mute">
                {t.booking.disclaimer}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={120}>
              <div className="rounded-sm border border-line bg-paper/85 p-6 backdrop-blur-sm sm:p-9">
                <BookingForm t={t} locale={locale} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
