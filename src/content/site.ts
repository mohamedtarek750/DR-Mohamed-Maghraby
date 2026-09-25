/**
 * Single source of truth for factual data about the practice.
 *
 * `verified` holds facts from the doctor's own public, first-party sources.
 * `clinic` (further down) holds the clinic's own published contact text.
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
 * Clinic contact details, from the clinic's own published contact text,
 * supplied by the site owner on 2026-09-25. Every number, day and time is
 * reproduced exactly; only spelling was standardised (الجهه → الجهة).
 * Both map links were resolved to confirm where they point:
 *   - Mohandessin: a pin at 30.0571560, 31.2054020
 *   - New Cairo:   Google's listing "Cairo Medical Center (CMC), N Teseen,
 *                  New Cairo 1, Cairo Governorate 11835"
 */
export const clinic = {
  /** For inquiries and booking. */
  phones: ['01142009433', '01055011901', '01020805974', '01035563448'],
  /** Numbers that also take WhatsApp messages. All four, confirmed by the
   *  site owner on 2026-09-26 (the published text itself didn't say). */
  whatsapp: ['01142009433', '01055011901', '01020805974', '01035563448'],
  /** First in the clinic's list; every single-button "call" or WhatsApp CTA
   *  uses it.
   *  Change here if the clinic wants another line to lead. */
  primaryPhone: '01142009433',
  /** Source spelling. Used only in structured data (alternateName); the page
   *  keeps مغربي, the spelling on his verified social accounts. */
  practiceNameAsPublished: 'عيادات د. محمد المغربى',
  /** "مواعيد التواصل": when calls and messages are answered. The source
   *  gives no days, only times. */
  contactHours: {
    ar: 'من ١ مساءً إلى ١١ مساءً',
    en: '1 pm to 11 pm',
    /** Compact form for tight spots (sticky bar, button sublabels). */
    shortAr: 'من ١ إلى ١١ مساءً',
    shortEn: '1 pm to 11 pm',
  },
  branches: [
    {
      id: 'mohandessin',
      area: { ar: 'المهندسين', en: 'Mohandessin' },
      address: {
        ar: '٢٢ شارع جامعة الدول العربية الرئيسي، الدور الثالث',
        en: '22 Gameat El Dewal El Arabia Street (main road), 3rd floor',
      },
      landmark: {
        ar: 'الجهة المقابلة لماكدونالدز وكوستا مباشرة',
        en: 'Directly opposite McDonald’s and Costa',
      },
      days: {
        ar: 'السبت، الأحد، الاثنين، الثلاثاء',
        en: 'Saturday, Sunday, Monday, Tuesday',
      },
      times: {
        ar: 'من ١ إلى ٣ مساءً، ومن ٦ إلى ٨ مساءً',
        en: '1 to 3 pm and 6 to 8 pm',
      },
      mapUrl: 'https://maps.app.goo.gl/C5yDsebMU7fTZDhm9?g_st=iwb',
      /** From the map link itself. */
      geo: { latitude: 30.057156, longitude: 31.205402 },
      /** Machine-readable copy of days/times above, for structured data. */
      openingHours: {
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday'],
        slots: [
          ['13:00', '15:00'],
          ['18:00', '20:00'],
        ],
      },
      postal: {
        streetAddress: '22 Gameat El Dewal El Arabia Street, 3rd floor',
        addressLocality: 'Mohandessin',
        addressCountry: 'EG',
      },
    },
    {
      id: 'new-cairo',
      area: { ar: 'التجمع الخامس', en: 'Fifth Settlement, New Cairo' },
      /** "CMC", exactly as the source writes it. Not expanded on the page:
       *  "Cairo Medical Center" could send people to the unrelated hospital of
       *  that name in Heliopolis. */
      address: {
        ar: 'CMC، الدور الأرضي، عيادة رقم ١',
        en: 'CMC, ground floor, clinic no. 1',
      },
      landmark: null,
      days: { ar: 'الأربعاء', en: 'Wednesday' },
      times: {
        ar: 'من ٢ إلى ٤ مساءً، ومن ٦ إلى ٨ مساءً',
        en: '2 to 4 pm and 6 to 8 pm',
      },
      mapUrl: 'https://maps.app.goo.gl/zC3WKCgA9p9qcY219',
      geo: null,
      openingHours: {
        dayOfWeek: ['Wednesday'],
        slots: [
          ['14:00', '16:00'],
          ['18:00', '20:00'],
        ],
      },
      /** From Google's listing for the clinic's own map link ("Cairo Medical
       *  Center (CMC), N Teseen, New Cairo 1, Cairo Governorate 11835"). Used
       *  only in structured data, to help geocoding. Confirm with the clinic. */
      postal: {
        streetAddress: 'Cairo Medical Center (CMC), North Teseen Street, ground floor, clinic no. 1',
        addressLocality: 'New Cairo',
        addressRegion: 'Cairo',
        postalCode: '11835',
        addressCountry: 'EG',
      },
    },
  ],
  /*
   * Also in the source, and written straight into the copy (dictionary.ts):
   *   - both branches see patients by prior booking (بالحجز المسبق)
   *   - online consultations over Zoom, from anywhere inside or outside Egypt
   *   - "متاح حجز كشف مستعجل بدون حجز مسبق": an urgent CLINIC visit, which is
   *     not the same thing as a medical emergency
   */
} as const;

/**
 * NOT PUBLICLY VERIFIABLE. Left null on purpose.
 * The UI checks each of these and renders nothing when the value is null.
 */
/**
 * The number every single WhatsApp button messages: the lead line when it is
 * on WhatsApp, otherwise the first WhatsApp number. Derived, so editing
 * `primaryPhone` can never point a WhatsApp button at a line without it.
 */
export const whatsappPrimary: string = (clinic.whatsapp as readonly string[]).includes(
  clinic.primaryPhone,
)
  ? clinic.primaryPhone
  : clinic.whatsapp[0];

/** True when every listed number also takes WhatsApp (drives the "all four" note). */
export const allNumbersOnWhatsApp = clinic.phones.every((n) =>
  (clinic.whatsapp as readonly string[]).includes(n),
);

export const pending: {
  credentials: string[] | null;
  yearsOfExperience: number | null;
  /** Areas of care beyond the two disciplines named on his own site. */
  subspecialties: string[] | null;
  articles: { title: string; href: string; date: string }[] | null;
} = {
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
