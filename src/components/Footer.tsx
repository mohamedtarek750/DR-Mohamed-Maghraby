import type { Dictionary, Locale } from '@/content/dictionary';
import { clinic, socialList, verified } from '@/content/site';
import { telHref } from '@/lib/phone';
import { MailIcon, PhoneIcon, socialIcons } from './Icons';

export default function Footer({ t, locale }: { t: Dictionary; locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper pt-16 pb-28 sm:pb-16">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="font-display text-[1.4rem] text-ink">{verified.name[locale]}</p>
            <p className="mt-1.5 text-[13.5px] text-ink-mute">{t.footer.tagline}</p>
            <p className="mt-4 max-w-[34ch] text-[13.5px] leading-[1.7] text-ink-soft">
              {verified.practice[locale]}. {verified.disciplines[locale]}.
            </p>

            <p className="eyebrow mt-8">{t.footer.clinicsTitle}</p>
            <ul className="mt-3 space-y-2 text-[13.5px] leading-[1.6]">
              {clinic.branches.map((b) => (
                <li key={b.id}>
                  <a
                    href={`#clinic-${b.id}`}
                    className="text-ink-soft transition-colors hover:text-sage-deep"
                  >
                    <span className="text-ink">{b.area[locale]}:</span> {b.address[locale]}
                  </a>
                </li>
              ))}
              <li>
                <a href="#clinic-online" className="text-ink-soft transition-colors hover:text-sage-deep">
                  {t.footer.online}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow">{t.footer.contact}</p>
            <ul className="mt-3 space-y-1">
              {clinic.phones.map((n) => (
                <li key={n}>
                  <a
                    href={telHref(n)}
                    className="inline-flex items-center gap-2 py-1 text-[14px] text-ink-soft transition-colors hover:text-sage-deep"
                  >
                    <span className="h-3.5 w-3.5 shrink-0">
                      <PhoneIcon />
                    </span>
                    <span dir="ltr" className="tnum">
                      {n}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[12.5px] text-ink-mute">
              {t.footer.callHours} {clinic.contactHours[locale]}
            </p>
            <a
              href={`mailto:${verified.email}`}
              dir="ltr"
              className="mt-4 inline-flex items-center gap-2 text-[13.5px] break-all text-ink-soft transition-colors hover:text-ink"
            >
              <span className="h-3.5 w-3.5 shrink-0">
                <MailIcon />
              </span>
              {verified.email}
            </a>
          </div>

          <div className="lg:col-span-4">
            <p className="eyebrow">{t.footer.follow}</p>
            <ul className="mt-3 flex flex-wrap items-center gap-4">
              {socialList.map((s) => {
                const Icon = socialIcons[s.key];
                return (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 py-1 text-[13.5px] text-ink-soft transition-colors hover:text-sage-deep"
                    >
                      <span className="h-4 w-4">
                        <Icon />
                      </span>
                      {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-line pt-7 sm:grid-cols-2">
          <div>
            <p className="eyebrow">{t.footer.privacyTitle}</p>
            <p className="mt-2 max-w-[44ch] text-[12.5px] leading-[1.7] text-ink-mute">
              {t.footer.privacy}
            </p>
          </div>
          <p className="max-w-[44ch] text-[12.5px] leading-[1.7] text-ink-mute sm:self-end">
            {t.footer.disclaimer}
          </p>
        </div>

        <p className="tnum mt-8 text-[12px] text-ink-mute">
          © {year} {verified.practice[locale]}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
