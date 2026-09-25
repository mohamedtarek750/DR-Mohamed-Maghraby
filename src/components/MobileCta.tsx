'use client';

import { useEffect, useState } from 'react';
import type { Dictionary } from '@/content/dictionary';
import CallButton from './CallButton';

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
        {/* Call first: it is how most patients book. The hours sit on the
            button so nobody dials outside them. */}
        <CallButton
          label={t.nav.call}
          sublabel={t.nav.callHoursShort}
          cta="sticky"
          tabIndex={visible ? 0 : -1}
          className="flex-1"
        />
        <a
          href="#clinics"
          tabIndex={visible ? 0 : -1}
          className="flex min-h-[48px] items-center justify-center rounded-sm border border-ink/25 px-4 text-[14px] text-ink"
        >
          {t.nav.clinics}
        </a>
      </div>
    </div>
  );
}
