import type { Dictionary, Locale } from '@/content/dictionary';
import { socialList, verified } from '@/content/site';
import { ArrowIcon, socialIcons } from './Icons';
import Reveal from './Reveal';

export default function Awareness({ t, locale }: { t: Dictionary; locale: Locale }) {
  const isArabic = locale === 'ar';

  return (
    <section
      id="awareness"
      className="scroll-mt-24 border-t border-line bg-paper py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">{t.awareness.label}</p>
              <h2 className="font-display mt-4 max-w-[16ch] text-[2rem] leading-[1.15] text-ink sm:text-[2.7rem] rtl:leading-[1.35]">
                {t.awareness.heading}
              </h2>
              <p className="mt-5 max-w-[46ch] text-[15.5px] leading-[1.8] text-ink-soft">
                {t.awareness.body}
              </p>
            </Reveal>

            {/* Real episodes from his channel, titled exactly as published. */}
            <Reveal delay={140}>
              <div className="mt-10 border-t border-line pt-6">
                <p className="eyebrow">{t.awareness.videosLabel}</p>
                {t.awareness.videosNote ? (
                  <p className="mt-2 text-[12.5px] text-ink-mute">{t.awareness.videosNote}</p>
                ) : null}
                <ul className="mt-3">
                  {verified.videos.map((video) => (
                    <li key={video.href}>
                      <a
                        href={video.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-baseline gap-3 border-b border-line py-3.5 text-[14.5px] leading-[1.6] text-ink transition-colors hover:text-sage-deep"
                      >
                        <span className="mt-1 h-3.5 w-3.5 shrink-0 text-clay transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
                          <ArrowIcon />
                        </span>
                        {isArabic ? (
                          video.title
                        ) : (
                          <span>
                            {video.gloss}
                            {/* His real title, verbatim, under our translation. */}
                            <span lang="ar" dir="rtl" className="font-arabic mt-0.5 block text-left text-[13px] text-ink-mute">
                              {video.title}
                            </span>
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href={verified.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[13.5px] text-sage-deep underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  {t.awareness.channelCta}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="grid gap-px overflow-hidden rounded-sm bg-line sm:grid-cols-2">
              {socialList.map((s, i) => {
                const Icon = socialIcons[s.key];
                const count = verified.counts[s.key];
                return (
                  <Reveal key={s.key} delay={i * 90} className="bg-paper">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors hover:bg-sage-wash/50 sm:p-7"
                    >
                      <span className="h-5 w-5 text-sage-deep">
                        <Icon />
                      </span>
                      <span>
                        <span className="font-display tnum block text-[1.75rem] leading-none text-ink">
                          {count}
                        </span>
                        <span className="mt-2 flex items-center gap-1.5 text-[13px] text-ink-mute">
                          {s.label} ·{' '}
                          {s.key === 'youtube' ? t.awareness.subscribers : t.awareness.followers}
                          <span className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5">
                            <ArrowIcon />
                          </span>
                        </span>
                      </span>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
