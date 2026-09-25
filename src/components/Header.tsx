'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Dictionary, Locale } from '@/content/dictionary';
import { verified } from '@/content/site';
import { CloseIcon, MenuIcon } from './Icons';

export default function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the mobile sheet, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#fields', label: t.nav.fields },
    { href: '#approach', label: t.nav.approach },
    { href: '#awareness', label: t.nav.awareness },
  ];

  const other: Locale = locale === 'ar' ? 'en' : 'ar';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          lifted
            ? 'border-b border-line/70 bg-ivory/85 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-5 sm:h-20 sm:px-8">
          <Link
            href={`/${locale}`}
            className="group flex min-w-0 flex-col leading-none"
            aria-label={verified.name[locale]}
          >
            <span className="font-display truncate text-[15px] text-ink sm:text-[17px]">
              {verified.name[locale]}
            </span>
            <span className="mt-1 truncate text-[10px] tracking-[0.14em] text-ink-mute uppercase sm:text-[11px] rtl:tracking-normal rtl:text-[11px] rtl:normal-case">
              {verified.title[locale]}
            </span>
          </Link>

          <nav aria-label={t.nav.menu} className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13.5px] text-ink-soft transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:start-0 after:h-px after:w-0 after:bg-sage-deep after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={`/${other}`}
              hrefLang={other}
              lang={other}
              aria-label={t.meta.switchLabel}
              className={`rounded-sm border border-line px-2.5 py-1.5 text-ink-soft transition-colors hover:border-ink-mute hover:text-ink sm:px-3 ${
                other === 'ar' ? 'font-arabic text-[13px]' : 'text-[11px] tracking-wide sm:text-xs'
              }`}
            >
              {t.meta.switchTo}
            </Link>

            <a
              href="#booking"
              className="hidden rounded-sm bg-ink px-4 py-2.5 text-[13px] text-paper transition-colors hover:bg-sage-deep sm:inline-flex"
            >
              {t.nav.book}
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.nav.menu}
              aria-expanded={open}
              className="h-9 w-9 p-1.5 text-ink lg:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet: full-bleed, calm, one tap to anywhere. */}
      {/* `inert` while closed keeps the off-screen links out of the tab order
          and the accessibility tree, not just out of sight. */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${open ? '' : 'pointer-events-none'}`}
        inert={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/20 transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-x-0 top-0 bg-paper px-5 pt-5 pb-10 shadow-[0_24px_60px_-30px_rgba(25,29,24,0.4)] transition-transform duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-[17px]">{verified.name[locale]}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.nav.close}
              className="h-9 w-9 p-1.5 text-ink"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="mt-8 flex flex-col" aria-label={t.nav.menu}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-t border-line py-4 font-display text-xl text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-sm bg-ink px-5 py-3.5 text-center text-sm text-paper"
            >
              {t.nav.book}
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
