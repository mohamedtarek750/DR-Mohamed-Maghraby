'use client';

import { useEffect, useState } from 'react';
import type { Dictionary } from '@/content/dictionary';
import { verified } from '@/content/site';
import { MailIcon } from './Icons';

/**
 * Booking is the point of the site, so on phones it stays one thumb-tap away.
 * It appears once the hero is behind you and steps aside when the real booking
 * section is on screen, so it never covers the form it points at.
 */
export default function MobileCta({ t }: { t: Dictionary }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const booking = document.getElementById('booking');
    let pastHero = false;
    let atBooking = false;

    const sync = () => setVisible(pastHero && !atBooking);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.7;
      sync();
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    let io: IntersectionObserver | undefined;
    if (booking) {
      io = new IntersectionObserver(
        ([entry]) => {
          atBooking = entry.isIntersecting;
          sync();
        },
        { rootMargin: '0px 0px -30% 0px' },
      );
      io.observe(booking);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 px-4 py-3 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] sm:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center gap-2.5">
        <a
          href="#booking"
          className="flex-1 rounded-sm bg-ink py-3 text-center text-[14px] text-paper"
          tabIndex={visible ? 0 : -1}
        >
          {t.nav.book}
        </a>
        <a
          href={`mailto:${verified.email}`}
          aria-label={t.hero.secondary}
          tabIndex={visible ? 0 : -1}
          className="flex h-[44px] w-[44px] items-center justify-center rounded-sm border border-ink/25 p-3 text-ink"
        >
          <MailIcon />
        </a>
      </div>
    </div>
  );
}
