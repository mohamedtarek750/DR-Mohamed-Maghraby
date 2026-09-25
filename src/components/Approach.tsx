import type { Dictionary } from '@/content/dictionary';
import CallButton from './CallButton';
import Reveal from './Reveal';

export default function Approach({ t }: { t: Dictionary }) {
  return (
    <section
      id="approach"
      className="scroll-mt-24 border-t border-line py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">{t.approach.label}</p>
          <h2 className="font-display mt-4 text-[2rem] leading-[1.15] text-ink sm:text-[2.7rem] rtl:leading-[1.35]">
            {t.approach.heading}
          </h2>
          <p className="mt-5 max-w-[50ch] text-[15.5px] leading-[1.8] text-ink-soft">
            {t.approach.intro}
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-sm bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {t.approach.steps.map((step, i) => (
            <Reveal key={step.title} as="li" delay={i * 110} className="flex flex-col bg-ivory p-7 sm:p-8">
              <span
                aria-hidden="true"
                className="font-display tnum text-[2.4rem] leading-none text-sage"
              >
                {step.n}
              </span>
              <h3 className="mt-5 text-[15px] font-medium text-ink">{step.title}</h3>
              <p className="mt-2.5 text-[14px] leading-[1.75] text-ink-soft">{step.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <CallButton
              label={t.nav.call}
              sublabel={t.nav.callHoursShort}
              cta="approach"
            />
            <a
              href="#booking-form"
              className="text-[14px] text-sage-deep underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-sage"
            >
              {t.approach.formLink}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
