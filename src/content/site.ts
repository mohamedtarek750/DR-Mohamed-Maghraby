/**
 * Single source of truth for factual data about the practice.
 *
 * EVERY value in `verified` was taken from a public, first-party source:
 *   - https://www.mohamedmaghraby.com  (the doctor's own site)
 *   - https://www.instagram.com/mohamed.maghrabyy  (verified account bio)
 *   - https://www.facebook.com/Dr.MohamedMaghraby  (official page + About tab)
 *
 * `pending` holds information that could NOT be verified from any public source.
 * Nothing in `pending` is invented. Fill a value in and the matching section of
 * the site starts rendering it automatically; leave it null and the site simply
 * omits it. Do not guess these — they are contact and credential claims.
 */

export const verified = {
  name: {
    en: 'Dr. Mohamed Maghraby',
    ar: 'د. محمد مغربي',
  },
  /** Exactly as written in his Instagram bio. */
  title: {
    en: 'Neuropsychiatrist',
    ar: 'دكتور أمراض نفسية وعصبية',
  },
  /** Exactly as written on mohamedmaghraby.com. */
  practice: {
    en: 'Dr. Mohamed Maghraby Clinics',
    ar: 'عيادات د. محمد مغربي',
  },
  disciplines: {
    en: 'Neurology & Psychiatry',
    ar: 'المخ والأعصاب والطب النفسي',
  },
  /** Instagram bio: "For all inquiries : doctormohamedmaghraby1@gmail.com" */
  email: 'doctormohamedmaghraby1@gmail.com',
  social: {
    facebookPage: 'https://www.facebook.com/Dr.MohamedMaghraby',
    facebookProfile: 'https://www.facebook.com/mohamed.maghraby.11',
    instagram: 'https://www.instagram.com/mohamed.maghrabyy',
    youtube: 'https://www.youtube.com/@Dr.MohamedMaghraby',
    tiktok: 'https://www.tiktok.com/@mohamed.maghrabyy',
    threads: 'https://www.threads.net/@mohamed.maghrabyy',
  },
  /** His own description of himself, from the YouTube channel. */
  selfDescription: {
    ar: 'دكتور مخ و أعصاب و أمراض نفسية.',
    en: 'Doctor of neurology and psychiatry.',
  },
  /**
   * Public follower counts, read from the platforms themselves.
   * These describe audience reach for his health-education content.
   * They are NOT medical statistics and are never presented as such.
   */
  reach: [
    { platform: 'Facebook', value: '5.2M', href: 'https://www.facebook.com/Dr.MohamedMaghraby' },
    { platform: 'Instagram', value: '520K', href: 'https://www.instagram.com/mohamed.maghrabyy' },
  ],
  /** Per-platform counts, read from each profile. */
  counts: {
    facebook: '5.2M',
    instagram: '520K',
    tiktok: '56.1K',
    youtube: '7.8K',
  },
  /** Video count on the YouTube channel page, read 2026-09-25 (58). The copy
   *  says "more than 50" so it stays true as the channel grows. */
  youtubeVideoCount: 58,
  /**
   * A line in his own words: the title of one of his YouTube Shorts, verbatim,
   * confirmed through YouTube's oEmbed API. `translation` is OUR English
   * rendering and is always labelled as a translation on the page.
   */
  quote: {
    href: 'https://www.youtube.com/shorts/MS5XKNL9bsg',
    text: 'تغيير الشخصية المفاجئ مش دايماً نفسية.. ليه العياط أو التصرفات الغريبة ممكن تكون جلطة؟',
    translation:
      'A sudden change in personality isn’t always psychological. Why can crying or strange behaviour turn out to be a stroke?',
  },
  /**
   * Real videos from his YouTube channel, confirmed via YouTube's oEmbed API.
   * `title` is his published title, verbatim (a trailing emoji dropped). Every
   * video is in Arabic. `gloss` is OUR English description for the English
   * site, shown as a translation and never presented as his title.
   */
  videos: [
    {
      href: 'https://www.youtube.com/watch?v=4O-jUvU_wjc',
      title: 'ما هو اضطراب ثنائي القطب؟',
      gloss: 'What is bipolar disorder?',
    },
    {
      href: 'https://www.youtube.com/watch?v=54PXt3zxRRk',
      title: 'اضطراب القلق العام',
      gloss: 'Generalized anxiety disorder',
    },
    {
      href: 'https://www.youtube.com/shorts/-fpuX6Yp46c',
      title: 'جسمك كله بيوجعك والتحاليل سليمة؟.. السر اللي مخبيه مخك ورا الألم المجهول!',
      gloss: 'Your whole body hurts and your tests are normal?',
    },
    {
      href: 'https://www.youtube.com/watch?v=pegB5pSW0HE',
      title: 'الدكتور النفسي بيفكر إزاي؟',
      gloss: 'How does a psychiatrist think?',
    },
  ],
  portrait: '/images/dr-mohamed-maghraby.png',
  logo: '/images/logo.png',
} as const;

/**
 * NOT PUBLICLY VERIFIABLE. Left null on purpose.
 * The UI checks each of these and renders nothing when the value is null.
 */
export const pending: {
  phone: string | null;
  whatsapp: string | null;
  clinics: { name: string; address: string; mapUrl?: string }[] | null;
  hours: { days: string; time: string }[] | null;
  credentials: string[] | null;
  yearsOfExperience: number | null;
  /** Areas of care beyond the two disciplines named on his own site. */
  subspecialties: string[] | null;
  articles: { title: string; href: string; date: string }[] | null;
} = {
  phone: null,
  whatsapp: null,
  clinics: null,
  hours: null,
  credentials: null,
  yearsOfExperience: null,
  subspecialties: null,
  articles: null,
};

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://dr-mohamed-maghraby.vercel.app';

export const socialList = [
  { key: 'facebook', href: verified.social.facebookPage, label: 'Facebook' },
  { key: 'instagram', href: verified.social.instagram, label: 'Instagram' },
  { key: 'youtube', href: verified.social.youtube, label: 'YouTube' },
  { key: 'tiktok', href: verified.social.tiktok, label: 'TikTok' },
] as const;
