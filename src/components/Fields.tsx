import type { Dictionary } from '@/content/dictionary';
import { pending } from '@/content/site';
import { ArrowIcon } from './Icons';
import Reveal from './Reveal';

export default function Fields({ t }: { t: Dictionary }) {
  return (
    <section
      id="fields"
      className="scroll-mt-24 border-t border-line bg-paper py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow">{t.fields.label}</p>
          <h2 className="font-display mt-4 max-w-[18ch] text-[2rem] leading-[1.15] text-ink sm:text-[2.7rem] rtl:leading-[1.35]">
            {t.fields.heading}
          </h2>
          <p className="mt-5 max-w-[56ch] text-[15.5px] leading-[1.8] text-ink-soft">
            {t.fields.intro}
          </p>
        </Reveal>

        <div className="mt-14 sm:mt-20">
          {t.fields.items.map((item, i) => (
            <Reveal key={item.index} delay={i * 130}>
              <article className="group grid gap-6 border-t border-line py-10 sm:py-12 lg:grid-cols-12 lg:gap-10">
                <div className="flex items-baseline gap-4 lg:col-span-4">
                  <span className="font-display tnum text-[13px] text-clay">{item.index}</span>
                  <div>
                    <h3 className="font-display text-[1.65rem] leading-tight text-ink sm:text-[2rem]">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] tracking-wide text-ink-mute">{item.latin}</p>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-[15.5px] leading-[1.8] text-ink-soft">{item.body}</p>
                </div>

                <div className="lg:col-span-3">
                  <p className="border-s-2 border-sage-wash ps-4 text-[14px] leading-[1.7] text-ink-mute">
                    {item.who}
                  </p>
                  <a
                    href="#booking"
                    className="mt-5 inline-flex items-center gap-2 text-[13.5px] text-sage-deep transition-colors hover:text-ink"
                  >
                    {t.fields.cta}
                    <span className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
                      <ArrowIcon />
                    </span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}

          {/* Renders only once real sub-specialties are supplied in site.ts.
              Nothing is invented to fill this space. */}
          {pending.subspecialties?.length ? (
            <ul className="flex flex-wrap gap-2 border-t border-line pt-10">
              {pending.subspecialties.map((s) => (
                <li
                  key={s}
                  className="rounded-sm border border-line px-3 py-1.5 text-[13px] text-ink-soft"
                >
                  {s}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
