import type { Dictionary, Locale } from '@/content/dictionary';
import { clinic } from '@/content/site';
import ContactButton from './ContactButton';
import { ArrowIcon, PinIcon } from './Icons';
import Reveal from './Reveal';

/**
 * Branches, hours and the online option. Every value comes from `clinic` in
 * site.ts, the same object the structured data reads, so the page and the
 * search listing can never disagree about an address or a time.
 */
export default function Clinics({ t, locale }: { t: Dictionary; locale: Locale }) {
  const c = t.clinics;

  return (
    <section
      id="clinics"
      className="scroll-mt-24 border-t border-line bg-paper py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">{c.label}</p>
          <h2 className="font-display mt-4 text-[2rem] leading-[1.15] text-ink sm:text-[2.7rem] rtl:leading-[1.35]">
            {c.heading}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[15.5px] leading-[1.8] text-ink-soft">{c.intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {clinic.branches.map((b, i) => (
            <Reveal key={b.id} delay={i * 110} className="bg-ivory">
              <article id={`clinic-${b.id}`} className="flex h-full scroll-mt-24 flex-col p-7 sm:p-8">
                <h3 className="font-display text-[1.6rem] leading-tight text-ink">{b.area[locale]}</h3>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-ink-soft">{b.address[locale]}</p>
                {b.landmark ? (
                  <p className="mt-1 text-[13.5px] leading-[1.7] text-ink-mute">{b.landmark[locale]}</p>
                ) : null}

                <dl className="mt-6 space-y-3 border-t border-line pt-5">
                  <div>
                    <dt className="text-[12.5px] text-ink-mute">{c.daysLabel}</dt>
                    <dd className="mt-0.5 text-[14.5px] text-ink">{b.days[locale]}</dd>
                  </div>
                  <div>
                    <dt className="text-[12.5px] text-ink-mute">{c.hoursLabel}</dt>
                    <dd className="tnum mt-0.5 text-[15.5px] text-ink">{b.times[locale]}</dd>
                  </div>
                </dl>

                <p className="mt-5 inline-flex self-start rounded-sm bg-sage-wash px-2.5 py-1 text-[12.5px] text-sage-deep">
                  {c.byAppointment}
                </p>

                <a
                  href={b.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-auto inline-flex items-center gap-2 pt-6 text-[13.5px] text-sage-deep transition-colors hover:text-ink"
                >
                  <span className="h-4 w-4">
                    <PinIcon />
                  </span>
                  {/* Visible words first, then which branch, so each link has
                      a distinct accessible name that still matches its label. */}
                  <span>
                    {c.map}
                    <span className="sr-only"> ({b.area[locale]})</span>
                  </span>
                  <span className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
                    <ArrowIcon />
                  </span>
                </a>
              </article>
            </Reveal>
          ))}

          {/* Spans the row on two-column tablets so no empty cell shows. */}
          <Reveal delay={clinic.branches.length * 110} className="bg-ivory sm:col-span-2 lg:col-span-1">
            <article id="clinic-online" className="flex h-full scroll-mt-24 flex-col p-7 sm:p-8">
              <h3 className="font-display text-[1.6rem] leading-tight text-ink">{c.online.title}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-ink-soft">{c.online.body}</p>
              <p className="mt-4 text-[14px] leading-[1.7] text-ink-soft">{c.online.book}</p>
              <p className="mt-auto pt-6 text-[13px] leading-[1.7] text-ink-mute">
                {c.online.abroadBefore}{' '}
                <bdi dir="ltr" className="tnum text-ink">
                  +20
                </bdi>{' '}
                {c.online.abroadAfter}
              </p>
            </article>
          </Reveal>
        </div>

        {/* Urgent visits. The safety sentence below must stay in the same
            block as the urgent one: an urgent CLINIC visit is not emergency
            care, and the two must never be read apart. */}
        <Reveal delay={120}>
          <div className="mt-10 max-w-[62ch] border-s-2 border-clay/60 ps-5">
            <h3 className="text-[15.5px] font-medium text-ink">{c.urgent.title}</h3>
            <p className="mt-2 text-[14.5px] leading-[1.8] text-ink-soft">{c.urgent.body}</p>
            <p className="mt-2 text-[14.5px] leading-[1.8] text-ink">{c.urgent.safety}</p>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-8">
            <p className="text-[15px] text-ink-soft">{c.callRow}</p>
            {/* Equal-height pair, stacked full width on phones (as in the hero). */}
            <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-stretch">
              <ContactButton
                label={t.nav.call}
                sublabel={clinic.primaryPhone}
                cta="clinics"
              />
              <ContactButton
                channel="whatsapp"
                variant="outline"
                label={t.hero.whatsapp}
                prefill={t.whatsappPrefill}
                cta="clinics"
              />
            </div>
            <a
              href="#booking"
              className="text-[13.5px] text-sage-deep underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-sage"
            >
              {c.allNumbers}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
