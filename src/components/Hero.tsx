import Image from 'next/image';
import type { Dictionary, Locale } from '@/content/dictionary';
import { socialList, verified } from '@/content/site';
import { socialIcons } from './Icons';
import Reveal from './Reveal';
import ThoughtField from './ThoughtField';

export default function Hero({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section className="grain relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28">
      {/* The settling field sits behind everything, at low contrast. */}
      <div className="absolute inset-0 -z-10 opacity-70">
        <ThoughtField />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(120%_90%_at_50%_0%,rgba(230,231,221,0.85),transparent_70%)]"
      />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ---- Words ---- */}
          <div className="lg:col-span-7 xl:col-span-6">
            <Reveal>
              <p className="eyebrow">{t.hero.eyebrow}</p>
            </Reveal>

            <h1 className="font-display mt-5 text-[2.6rem] leading-[1.05] text-ink sm:text-[3.6rem] lg:text-[4.1rem] xl:text-[4.5rem] rtl:leading-[1.25]">
              {t.hero.headline.map((line, i) => (
                <Reveal as="span" key={line} delay={120 + i * 110} className="block">
                  {line}
                </Reveal>
              ))}
            </h1>

            <Reveal delay={460}>
              <p className="mt-7 max-w-[46ch] text-[15.5px] leading-[1.75] text-ink-soft sm:text-[17px]">
                {t.hero.lead}
              </p>
            </Reveal>

            <Reveal delay={560}>
              {/* Full-width and stacked on phones — equal, generous tap targets —
                  then side by side once there is room. */}
              <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
                <a
                  href="#booking"
                  className="rounded-sm bg-ink px-6 py-3.5 text-center text-sm text-paper transition-colors duration-300 hover:bg-sage-deep"
                >
                  {t.hero.primary}
                </a>
                <a
                  href={`mailto:${verified.email}`}
                  className="rounded-sm border border-ink/25 px-6 py-3.5 text-center text-sm text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {t.hero.secondary}
                </a>
              </div>
            </Reveal>

            {/* Audience reach. Public follower counts — explicitly framed as
                who reads his health education, never as clinical outcomes. */}
            <Reveal delay={660}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
                <span className="text-[11px] tracking-[0.12em] text-ink-mute uppercase rtl:text-[12px] rtl:tracking-normal rtl:normal-case">
                  {t.hero.reachLabel}
                </span>
                <div className="flex items-center gap-7">
                  {verified.reach.map((r) => (
                    <a
                      key={r.platform}
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <span className="font-display tnum block text-2xl text-ink transition-colors group-hover:text-sage-deep sm:text-[1.7rem]">
                        {r.value}
                      </span>
                      <span className="text-[11px] text-ink-mute">{r.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---- Portrait ---- */}
          <div className="lg:col-span-5 xl:col-span-6">
            <Reveal delay={260} className="relative mx-auto max-w-[400px] lg:ms-auto lg:me-0 lg:max-w-[440px]">
              <div className="relative">
                {/* Warm panel, offset behind the cut-out portrait. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-4 bottom-0 top-10 rounded-t-[200px] bg-[linear-gradient(180deg,var(--color-sage-wash),var(--color-paper-deep))]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-4 bottom-0 top-10 rounded-t-[200px] ring-1 ring-inset ring-clay/30"
                />
                <Image
                  src={verified.portrait}
                  alt={t.hero.portraitAlt}
                  width={529}
                  height={743}
                  priority
                  sizes="(max-width: 1024px) 400px, 440px"
                  className="relative w-full object-contain drop-shadow-[0_28px_44px_rgba(25,29,24,0.16)]"
                />
              </div>

              {/* Caption card — a small piece of editorial furniture that also
                  carries the social links without a row of loose icons. */}
              <div className="relative -mt-4 mx-auto flex max-w-[330px] items-center justify-between gap-4 rounded-sm border border-line bg-paper/90 px-4 py-3 backdrop-blur-sm">
                <div className="min-w-0">
                  <p className="truncate font-display text-[15px] text-ink">
                    {verified.name[locale]}
                  </p>
                  <p className="truncate text-[11.5px] text-ink-mute">
                    {verified.title[locale]}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2.5">
                  {socialList.map((s) => {
                    const Icon = socialIcons[s.key];
                    return (
                      <a
                        key={s.key}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${verified.name[locale]} — ${s.label}`}
                        className="h-[15px] w-[15px] text-ink-mute transition-colors hover:text-sage-deep"
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
