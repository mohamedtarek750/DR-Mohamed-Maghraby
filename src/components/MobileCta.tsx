'use client';

import { useEffect, useState } from 'react';
import type { Dictionary } from '@/content/dictionary';
import ContactButton from './ContactButton';

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
        {/* The two ways most patients book. The hours sit on the call
            button so nobody dials outside them. */}
        <ContactButton
          label={t.nav.call}
          sublabel={t.nav.callHoursShort}
          cta="sticky"
          size="compact"
          tabIndex={visible ? 0 : -1}
          className="min-w-0 flex-1"
        />
        <ContactButton
          channel="whatsapp"
          variant="outline"
          label={t.nav.whatsapp}
          prefill={t.whatsappPrefill}
          cta="sticky"
          size="compact"
          tabIndex={visible ? 0 : -1}
          className="shrink-0 self-stretch"
        />
      </div>
    </div>
  );
}
