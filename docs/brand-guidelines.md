# Brand guidelines: Dr. Mohamed Maghraby

For anyone writing or designing for the website, the share cards, or anything
that sits next to them. The design tokens themselves live in
`src/app/globals.css` (`@theme`); this file explains how to use them.

## Positioning

Dr. Mohamed Maghraby is a neuropsychiatrist (دكتور أمراض نفسية وعصبية). Two
things set him apart, and both can be proven:

1. **He covers both fields.** Psychiatric and neurological symptoms are assessed
   by the same doctor. Proof: his title and the disciplines named on his clinics.
2. **People already know how he explains things.** He publishes Arabic health
   videos followed by millions (5.2M on Facebook, 520K on Instagram).
   Proof: the platforms themselves.

Everything else we say must trace back to `src/content/site.ts`. If a claim is
not in `verified`, it does not go on the site.

**Primary message:** Not sure if it is psychological or neurological? He works
in both.

## Voice

His own video titles are the reference sample. They are direct questions in
plain, often Egyptian, Arabic: *الدكتور النفسي بيفكر إزاي؟*,
*جسمك كله بيوجعك والتحاليل سليمة؟*

| Trait | Means | Do | Don't |
| --- | --- | --- | --- |
| Plain | Short sentences, everyday words | "تترك بياناتك، ويتصل بك فريق العيادة." | "نسعى لتقديم تجربة رعاية متكاملة" |
| Specific | Name the real thing | "القلق واضطراب ثنائي القطب" | "مجموعة واسعة من الحالات" |
| Calm | State facts, don't alarm | "في الحالات الطارئة توجّه إلى أقرب مستشفى." | "لا تدع القلق يدمر حياتك" |
| Honest | Only what can be shown | "له أكثر من ٥٠ فيديو على يوتيوب" | Ratings, patient counts, success rates |

**Register.** Arabic body copy is simple Modern Standard Arabic. Headlines that
speak as him, and his own quotes, keep his Egyptian register (the hero reads
*نفسي ولا عصبي؟*). English is plain British/international English.

**Tone shifts by context.** Booking, privacy and emergency text is the most
formal and the most literal. Headlines can ask a question. Nothing is salesy.

### Never write

- Em dashes (—) or en dashes (–) in page copy. Use a period, comma or colon.
- Slogans and aphorisms ("Two fields, one assessment", "Where science meets care").
- Lists of three for rhythm ("understanding, care and support").
- Anything about the site's own sources ("The specialty named on…").
- Testimonials, ratings, patient numbers, success rates, degrees, awards or
  hospital affiliations, unless the doctor supplies them and they go into `site.ts`.
- Fear-based lines, or examples that could be emergencies presented as
  something to book. A sudden change in behaviour can be a stroke: that goes to
  a hospital, not a waiting list.

### Sample rewrites

| Before | After |
| --- | --- |
| The mind and the brain are not separate cases. | Psychological, or neurological? |
| A psychiatric condition is assessed like any other: by asking, examining, and taking the time it needs. | *(replaced by his own words, quoted and linked)* |
| What shapes the work at this practice | Worth knowing before you book |

## Colour

| Token | Hex | Use | Contrast on ivory |
| --- | --- | --- | --- |
| `ivory` | `#f4f0e8` | Page background | n/a |
| `paper` | `#fbf8f2` | Alternate sections, form surface | n/a |
| `ink` | `#191d18` | Headings, body, primary buttons | 15.0:1 |
| `ink-soft` | `#4d544a` | Secondary body text | 6.9:1 |
| `ink-mute` | `#63695e` | Labels, captions, small print | 5.0:1 |
| `sage-deep` | `#3a4535` | Links, the dark section, focus rings | 9.5:1 |
| `sage` | `#75846a` | Large decorative numerals, thin rules | 3.5:1 (large only) |
| `sage-wash` | `#e6e7dd` | Portrait arch, hover fills | background only |
| `clay` | `#b6a893` | Hairline accents | never for text |

All text meets WCAG AA (4.5:1). `sage` is used only at display sizes, and
`clay` is never used for text.

## Type

| Role | Arabic | Latin |
| --- | --- | --- |
| Display (hero, headings) | IBM Plex Sans Arabic 300 | Source Serif 4, light |
| Body and UI | IBM Plex Sans Arabic 400 / 500 | IBM Plex Sans 400 / 500 |

Two families per language at most. Body text is never below 15px, and labels
never below 12px.

## Imagery

- The only photograph is the doctor's official portrait, from his own website.
  Never an AI-generated image of him, and no stock photos of patients.
- The recurring visual is the "thought field": scattered points that settle into
  a lattice as the page is read. On still media (share cards) it appears settled.
- The portrait always sits on the warm arch, grounded on the bottom edge.

## Share cards

`assets/banners/share-card/share-card.html` is the source for both languages.
Regenerate after changing the name, title or CTA:

```bash
npm run og:export
```

This writes `public/og/editorial-1200x630-{ar,en}.png` at exactly 1200 × 630,
with critical content inside the central 80% and one CTA.
