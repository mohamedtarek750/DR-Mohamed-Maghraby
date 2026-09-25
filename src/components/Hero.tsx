import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { Dictionary, Locale } from '@/content/dictionary';
import { clinic, socialList, verified } from '@/content/site';
import CallButton from './CallButton';
import { socialIcons } from './Icons';
import ThoughtField from './ThoughtField';

/** Staggered entrance that runs from CSS on first paint (see animate-rise in
 *  globals.css). Unlike <Reveal>, it never waits for hydration, so the hero,
 *  which holds the page's largest element, is visible as early as possible. */
const rise = (delay: number): CSSProperties => ({ animationDelay: `${delay}ms` });

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
            <p className="eyebrow animate-rise" style={rise(0)}>
              {t.hero.eyebrow}
            </p>

            <h1 className="font-display mt-5 text-[2.6rem] leading-[1.05] text-ink sm:text-[3.6rem] lg:text-[4.1rem] xl:text-[4.4rem] rtl:text-[3.3rem] rtl:leading-[1.3] sm:rtl:text-[4.4rem] lg:rtl:text-[5.2rem]">
              {t.hero.headline.map((line, i) => (
                <span key={line} className="block animate-rise" style={rise(90 + i * 110)}>
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="mt-7 max-w-[46ch] text-[15.5px] leading-[1.75] text-ink-soft animate-rise sm:text-[17px]"
              style={rise(320)}
            >
              {t.hero.lead}
            </p>

            {/* Full-width and stacked on phones (equal, generous tap targets),
                then side by side once there is room. */}
            <div
              className="mt-9 grid gap-3 animate-rise sm:flex sm:flex-wrap sm:items-center"
              style={rise(420)}
            >
              <CallButton
                label={t.hero.primary}
                sublabel={clinic.primaryPhone}
                cta="hero"
              />
              <a
                href="#clinics"
                className="flex items-center justify-center rounded-sm border border-ink/25 px-6 py-3.5 text-center text-sm text-ink transition-colors duration-(--motion-feedback) hover:border-ink hover:bg-ink hover:text-paper"
              >
                {t.hero.secondary}
              </a>
            </div>
            <p className="mt-3 text-[13px] text-ink-mute animate-rise" style={rise(470)}>
              {t.hero.callNote}
            </p>

            {/* Public follower counts: who watches his videos. Never framed as
                clinical outcomes. */}
            <div
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6 animate-rise"
              style={rise(520)}
            >
              <span className="text-[12px] tracking-[0.12em] text-ink-mute uppercase rtl:text-[12.5px] rtl:tracking-normal rtl:normal-case">
                {t.hero.reachLabel}
              </span>
              <div className="flex items-center gap-7">
                {verified.reach.map((r) => (
                  <a
                    key={r.platform}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${r.value} ${t.awareness.followers} ${t.meta.onPlatform} ${r.platform}`}
                    className="group"
                  >
                    <span className="font-display tnum block text-2xl text-ink transition-colors group-hover:text-sage-deep sm:text-[1.7rem]">
                      {r.value}
                    </span>
                    <span className="text-[12px] text-ink-mute">{r.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ---- Portrait ---- */}
          <div className="lg:col-span-5 xl:col-span-6">
            <div
              className="relative mx-auto max-w-[400px] animate-rise lg:ms-auto lg:me-0 lg:max-w-[440px]"
              style={rise(160)}
            >
              <div className="relative">
                {/* Warm arch, offset behind the cut-out portrait. */}
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

              {/* Caption card: carries the social links as part of the
                  portrait's furniture rather than a loose row of icons. */}
              <div className="relative -mt-4 mx-auto flex max-w-[340px] items-center justify-between gap-3 rounded-sm border border-line bg-paper/90 py-2 ps-4 pe-2 backdrop-blur-sm">
                <div className="min-w-0">
                  <p className="truncate font-display text-[15px] text-ink">
                    {verified.name[locale]}
                  </p>
                  <p className="truncate text-[12px] text-ink-mute">{verified.title[locale]}</p>
                </div>
                <div className="flex shrink-0 items-center">
                  {socialList.map((s) => {
                    const Icon = socialIcons[s.key];
                    return (
                      <a
                        key={s.key}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${verified.name[locale]} ${t.meta.onPlatform} ${s.label}`}
                        // 32px hit area around a 15px glyph: clears WCAG 2.2's
                        // 24px target minimum with room to spare on phones.
                        className="flex h-8 w-8 items-center justify-center rounded-sm text-ink-mute transition-colors duration-(--motion-feedback) hover:bg-sage-wash hover:text-sage-deep"
                      >
                        <span className="h-[15px] w-[15px]">
                          <Icon />
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
