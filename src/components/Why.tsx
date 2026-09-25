import type { Dictionary } from '@/content/dictionary';
import Reveal from './Reveal';

export default function Why({ t }: { t: Dictionary }) {
  return (
    <section className="border-t border-line bg-sage-deep py-20 text-paper sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow text-paper/75">{t.why.label}</p>
              <h2 className="font-display mt-4 text-[2rem] leading-[1.15] sm:text-[2.5rem] rtl:leading-[1.35]">
                {t.why.heading}
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {t.why.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 110}>
                <div className="border-t border-paper/20 pt-5">
                  <h3 className="text-[15.5px] font-medium">{item.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.8] text-paper/80">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
