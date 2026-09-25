import type { Dictionary, Locale } from '@/content/dictionary';
import { verified } from '@/content/site';
import Reveal from './Reveal';

export default function About({ t, locale }: { t: Dictionary; locale: Locale }) {
  const { quote } = verified;
  const isArabic = locale === 'ar';

  return (
    <section id="about" className="scroll-mt-24 border-t border-line py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">{t.about.label}</p>
              <h2 className="font-display mt-4 text-[2rem] leading-[1.15] text-ink sm:text-[2.5rem] rtl:leading-[1.35]">
                {t.about.heading}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {t.about.body.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 24)} delay={i * 90}>
                <p
                  className={
                    i === 0
                      ? 'text-[17px] leading-[1.8] text-ink sm:text-[19px]'
                      : 'mt-6 text-[15.5px] leading-[1.85] text-ink-soft sm:text-[16.5px]'
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* His own words: the title of one of his videos, verbatim, linked to
            the source. On the English page our translation leads and the
            Arabic original sits underneath, labelled. */}
        <Reveal delay={150}>
          <figure className="mt-16 max-w-[40ch] border-s-2 border-sage ps-6 sm:mt-24 sm:ps-8">
            <blockquote
              lang={isArabic ? 'ar' : 'en'}
              className="font-display text-[1.5rem] leading-[1.4] text-sage-deep sm:text-[2.1rem] rtl:leading-[1.6]"
            >
              <p>{isArabic ? quote.text : quote.translation}</p>
            </blockquote>
            {!isArabic ? (
              <p lang="ar" dir="rtl" className="font-arabic mt-4 text-left text-[15px] leading-[1.7] text-ink-soft">
                {quote.text}
              </p>
            ) : null}
            <figcaption className="mt-5 text-[13px] text-ink-mute">
              {verified.name[locale]},{' '}
              <a
                href={quote.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line underline-offset-4 transition-colors hover:text-sage-deep hover:decoration-sage"
              >
                {t.about.quoteSource}
              </a>
              {t.about.translatedFrom ? <span>. {t.about.translatedFrom}.</span> : null}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
