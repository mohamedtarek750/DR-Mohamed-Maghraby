import type { MouseEventHandler } from 'react';
import { clinic } from '@/content/site';
import { formatPhone, telHref } from '@/lib/phone';
import { PhoneIcon } from './Icons';

const variants = {
  solid: 'bg-ink text-paper hover:bg-sage-deep px-6 py-3',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper px-6 py-3',
  // A full-width tap row for listing every number.
  row: 'w-full min-h-[52px] border border-line bg-paper text-ink hover:border-sage-deep px-4 py-2.5',
} as const;

const isNumber = (text?: string) => !!text && /^[\d\s+]+$/.test(text);

/**
 * A tel: link styled as a button. Calling is how most patients book, so this
 * is the site's primary action. `sublabel` usually carries the number itself
 * or the call hours, so nobody taps a dead line at midnight.
 *
 * There is deliberately no aria-label: the accessible name is the visible
 * text, so speech-input users can say what they see (WCAG 2.5.3). When the
 * number isn't on screen, it is added as visually hidden text so screen-reader
 * users still hear which line they are calling.
 */
export default function CallButton({
  variant = 'solid',
  label,
  sublabel,
  phone = clinic.primaryPhone,
  cta,
  className = '',
  tabIndex,
  onClick,
}: {
  variant?: keyof typeof variants;
  label: string;
  sublabel?: string;
  phone?: string;
  /** Names the placement (data-cta) so call taps can be measured later. */
  cta: string;
  className?: string;
  tabIndex?: number;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const isRow = variant === 'row';
  const showsNumber = isNumber(label) || isNumber(sublabel);

  return (
    <a
      href={telHref(phone)}
      data-cta={cta}
      tabIndex={tabIndex}
      onClick={onClick}
      className={`inline-flex items-center gap-3 rounded-sm text-sm transition-colors duration-(--motion-feedback) ${
        isRow ? 'justify-start' : 'justify-center'
      } ${variants[variant]} ${className}`}
    >
      <span className={`shrink-0 ${isRow ? 'h-[18px] w-[18px] text-sage-deep' : 'h-4 w-4'}`}>
        <PhoneIcon />
      </span>
      <span className="flex flex-col items-start leading-tight">
        {/* Numbers stay left-to-right inside Arabic text. */}
        <span dir={isNumber(label) ? 'ltr' : undefined} className={isRow ? 'tnum text-[18px]' : undefined}>
          {label}
        </span>
        {sublabel ? (
          // A bare number has no strong direction for dir="auto" to find, so
          // numbers are pinned LTR explicitly; worded hours follow the page.
          <span
            dir={isNumber(sublabel) ? 'ltr' : undefined}
            className="tnum mt-0.5 text-[12px] opacity-75"
          >
            {sublabel}
          </span>
        ) : null}
        {showsNumber ? null : (
          <span className="sr-only">
            , <span dir="ltr">{formatPhone(phone)}</span>
          </span>
        )}
      </span>
    </a>
  );
}
