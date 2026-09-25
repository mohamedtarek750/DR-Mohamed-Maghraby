import type { Dictionary } from '@/content/dictionary';
import Reveal from './Reveal';

export default function About({ t }: { t: Dictionary }) {
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
              <Reveal key={paragraph.slice(0, 24)} delay={i * 110}>
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

        {/* A statement in the site's own voice. Deliberately not presented as a
            quotation from the doctor, since no such quote is on public record. */}
        <Reveal delay={200}>
          <p className="font-display mt-16 max-w-[26ch] text-[1.65rem] leading-[1.3] text-sage-deep sm:mt-24 sm:max-w-[34ch] sm:text-[2.35rem] rtl:leading-[1.5]">
            {t.about.statement}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
