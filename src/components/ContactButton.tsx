import type { MouseEventHandler } from 'react';
import { clinic, whatsappPrimary } from '@/content/site';
import { formatPhone, telHref, waHref } from '@/lib/phone';
import { PhoneIcon, WhatsAppIcon } from './Icons';

const variants = {
  solid: 'bg-ink text-paper hover:bg-sage-deep',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  // A full-width tap row for listing every number.
  row: 'w-full min-h-[52px] border border-line bg-paper text-ink hover:border-sage-deep px-4 py-2.5',
  // A compact companion that sits beside a row.
  chip: 'min-h-[52px] border border-line bg-paper text-ink hover:border-sage-deep px-3 py-2.5',
} as const;

/* Padding lives here, not in `variants`, so a size can change it without two
   conflicting px- utilities on one element (Tailwind orders those by its own
   stylesheet, not by class order). Rows and chips carry their own padding. */
const sizes = {
  regular: 'px-6 py-3 gap-3',
  // Tight spots such as the sticky phone bar.
  compact: 'px-3 py-2.5 gap-2',
} as const;

const isNumber = (text?: string) => !!text && /^[\d\s+]+$/.test(text);

/**
 * A phone call or a WhatsApp chat, styled as a button. These are how most
 * patients book, so they are the site's primary actions. `sublabel` usually
 * carries the number itself or the contact hours.
 *
 * There is deliberately no aria-label: the accessible name is the visible
 * text, so speech-input users can say what they see (WCAG 2.5.3). When the
 * number isn't on screen, it is added as visually hidden text so screen-reader
 * users still hear which line they are reaching.
 */
export default function ContactButton({
  channel = 'call',
  variant = 'solid',
  size = 'regular',
  label,
  sublabel,
  phone,
  prefill,
  cta,
  className = '',
  tabIndex,
  onClick,
}: {
  channel?: 'call' | 'whatsapp';
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  label: string;
  sublabel?: string;
  phone?: string;
  /** WhatsApp only: a message typed in advance, so sending takes one tap. */
  prefill?: string;
  /** Names the placement (data-cta) so taps can be measured later. */
  cta: string;
  className?: string;
  tabIndex?: number;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const whatsapp = channel === 'whatsapp';
  const number = phone ?? (whatsapp ? whatsappPrimary : clinic.primaryPhone);
  const isChip = variant === 'chip';
  const isRow = variant === 'row';
  const onDark = variant === 'solid';
  const showsNumber = isNumber(label) || isNumber(sublabel);
  const Icon = whatsapp ? WhatsAppIcon : PhoneIcon;

  // WhatsApp's teal (#128C7E) clears 3:1 on every light surface the site uses;
  // its brighter green does not. On the dark solid button the glyph follows
  // the text colour instead.
  const iconColour = !whatsapp
    ? isRow
      ? 'text-sage-deep'
      : ''
    : onDark
      ? ''
      : variant === 'outline'
        ? 'text-[#128C7E] group-hover:text-current'
        : 'text-[#128C7E]';

  return (
    <a
      href={whatsapp ? waHref(number, prefill) : telHref(number)}
      {...(whatsapp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      data-cta={`${whatsapp ? 'wa' : 'call'}-${cta}`}
      tabIndex={tabIndex}
      onClick={onClick}
      className={`group inline-flex items-center rounded-sm text-sm transition-colors duration-(--motion-feedback) ${
        isRow ? 'justify-start' : 'justify-center'
      } ${variants[variant]} ${isRow || isChip ? 'gap-3' : sizes[size]} ${className}`}
    >
      <span className={`shrink-0 ${isRow ? 'h-[18px] w-[18px]' : 'h-4 w-4'} ${iconColour}`}>
        <Icon />
      </span>
      <span className="flex flex-col items-start leading-tight">
        {/* Numbers stay left-to-right inside Arabic text. */}
        {/* On very narrow phones a chip shows only its icon; the word stays
            in the accessible name, read with the hidden number below. */}
        <span
          dir={isNumber(label) ? 'ltr' : undefined}
          className={isRow ? 'tnum text-[18px]' : isChip ? 'max-[359px]:sr-only' : undefined}
        >
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
            , <span dir="ltr">{formatPhone(number)}</span>
          </span>
        )}
      </span>
    </a>
  );
}
