'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

/**
 * Fades content up once, the first time it enters the viewport.
 * The CSS in globals.css neutralises this entirely under reduced motion,
 * so nothing here needs to branch on the media query.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.shown = 'true';
        io.disconnect();
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
