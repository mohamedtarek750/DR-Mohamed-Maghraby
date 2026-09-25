# Dr. Mohamed Maghraby — Website

The bilingual (Arabic / English) website for **Dr. Mohamed Maghraby, Neuropsychiatrist** —
_دكتور أمراض نفسية وعصبية_ — and Dr. Mohamed Maghraby Clinics.

Arabic is the default and is served right-to-left at `/ar`; English is left-to-right at `/en`.
Visitors arriving at `/` are sent to Arabic unless their browser asks only for English.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript**
- **Tailwind CSS 4** — design tokens live in `src/app/globals.css` under `@theme`
- Fonts via `next/font`: IBM Plex Sans Arabic, IBM Plex Sans, Source Serif 4
- No UI or icon libraries — icons are inline SVG in `src/components/Icons.tsx`

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run typecheck
npm run og:export  # re-render the share cards (needs Chrome or Edge installed)
```

Voice, colour, type and imagery rules for anyone editing the site are in
[`docs/brand-guidelines.md`](docs/brand-guidelines.md).

## Content policy: verified facts only

This is a medical website, so **nothing on it is invented.** Every fact comes from a
first-party public source and is recorded in one place:

| File | What it holds |
| --- | --- |
| `src/content/site.ts` → `verified` | Facts confirmed from the doctor's own site, Instagram bio, Facebook page, TikTok and YouTube |
| `src/content/site.ts` → `clinic` | Phones, call times, branches, clinic hours, online and urgent visits, from the clinic's own published contact text |
| `src/content/site.ts` → `pending` | Information that could **not** be verified publicly — every value is `null` |
| `src/content/dictionary.ts` | All Arabic and English copy |

### Sources used

- `mohamedmaghraby.com` — title "Neuropsychiatrist", "Dr. Mohamed Maghraby Clinics", Neurology & Psychiatry, waiting-list booking flow, portrait and logo
- Instagram `@mohamed.maghrabyy` (verified) — "Neuropsychiatrist - دكتور أمراض نفسيه و عصبيه", inquiry email, 520K followers
- Facebook page `Dr.MohamedMaghraby` — category "Doctor", 5.2M followers
- TikTok `@mohamed.maghrabyy` — "Doctor / Neuropsychiatrist", 56.1K followers
- YouTube `@Dr.MohamedMaghraby` — "دكتور مخ و أعصاب و أمراض نفسية.", 7.8K subscribers; featured episodes confirmed through YouTube's oEmbed API with their exact published titles

- The clinic's own published contact text, supplied by the site owner on 2026-09-25: the four
  phone numbers, the 1 pm to 11 pm call window, the Mohandessin and Fifth Settlement (CMC)
  branches with their addresses, days, hours and map links, online consultations over Zoom,
  and urgent visits without prior booking. Both map links were resolved to confirm where they
  point.

Follower counts are shown as the reach of his public health education — never as clinical statistics.

### What still needs the doctor's input

These are deliberately left out of the site because no public source confirms them.
Fill any value in `pending` inside `src/content/site.ts` and the matching part of the page
appears automatically — no component changes needed.

| Field | Where it appears once filled |
| --- | --- |
| `whatsapp` | Nowhere yet. The published text lists the numbers for calls only |
| `subspecialties` | Fields of care |
| `articles` | Public education |
| `credentials`, `yearsOfExperience` | Reserved for the profile section |

### Please confirm with the clinic

- **Which number should lead.** Every single "Call to book" button dials `clinic.primaryPhone`
  (01142009433, the first in the clinic's list). All four are listed in the booking section
  and the footer.
- **How an urgent visit works** (call first or walk in, and at which branch). The source only
  says one is available without prior booking, so the site says to call and ask.
- **The safety wording** in the urgent note: "if you think it may be a stroke" and "if you are
  afraid you might harm yourself or someone else, go to the nearest hospital".
- **The CMC address in structured data.** The page says "CMC" exactly as the clinic does. The
  street, postcode and "Cairo Medical Center" come from Google's listing for the clinic's own
  map link and are used only in search data.
- **Whether gender and date of birth can become optional** in the form. They are still
  required, as on the original booking form.
- **Google Business Profiles** for each branch, using the same name, address and number.

The site intentionally shows **no** testimonials, ratings, patient numbers, success rates,
degrees, hospital affiliations or awards. Please add only what can be confirmed.

## Booking

Calling is the main way to book: the hero, the sticky mobile bar, the menu, the booking
steps and the clinics section all dial the clinic, with the 1 pm to 11 pm call window shown
next to the button. The booking section lists all four numbers.

The form is the fallback for anyone who can't call right now. It asks for name, phone,
where the visitor wants to be seen (Mohandessin, Fifth Settlement, online, or not sure yet),
country, gender, date of birth and an optional note, and is handled by a server action in
`src/lib/actions.ts`:

- **With `BOOKING_WEBHOOK_URL` set**, each request is POSTed there as JSON — point it at
  Zapier, Make, n8n, a CRM, or any endpoint that accepts JSON.
- **Without it**, the visitor is handed a pre-filled email addressed to the clinic's
  published inquiry address. Nothing is lost, and no secret is needed to deploy.

Fields are checked in the browser as the visitor leaves them and again on
submit, with an error under each field and a summary that receives focus. The
server runs the same rules (`src/lib/booking.ts`). What the visitor typed is
never cleared by a failed submit. A honeypot field filters basic spam.

## Environment variables

See `.env.example`. Both are optional; the site builds and runs without either.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and Open Graph. Set this to the custom domain once one is attached. |
| `BOOKING_WEBHOOK_URL` | Where booking requests are delivered (server-side only, never exposed to the browser). |

## SEO

Per-locale titles and descriptions, canonical URLs, `hreflang` alternates (`ar`, `en`,
`x-default`), Open Graph and Twitter cards with a share image per language, `robots.txt`,
`sitemap.xml`, and JSON-LD (`Person`, `MedicalOrganization`, one `MedicalClinic` per branch,
`WebSite`). The structured data uses only facts from `verified` and `clinic`: the four phone
numbers, each branch's address and clinic hours, and the Mohandessin map pin. The one exception
is the CMC street and postcode, taken from Google's listing for the clinic's own map link (see
"Please confirm with the clinic" above). There are no ratings or reviews.

## Share cards

`public/og/editorial-1200x630-{ar,en}.png` are exported from
`assets/banners/share-card/share-card.html` by `npm run og:export`, which drives
a local Chrome or Edge. A real browser is used because it shapes Arabic
correctly, and most links to the site are shared in Arabic.

## Accessibility & motion

All text meets WCAG AA contrast (4.5:1), and nothing is set below 12px. Semantic
landmarks, a skip link, one `h1` per page, labelled form fields, visible focus
states, 32px or larger touch targets, and a mobile menu that is `inert` when
closed.

The hero enters with a CSS animation that runs on first paint, so it never waits
for JavaScript. Lower sections fade in as they scroll into view, and a `<noscript>`
rule shows them when JavaScript is off. All motion, including the background
"thought field", is disabled under `prefers-reduced-motion`, and the canvas pauses
whenever it is off screen.
