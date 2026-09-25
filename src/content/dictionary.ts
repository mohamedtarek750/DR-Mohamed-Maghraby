import { verified } from './site';

export type Locale = 'ar' | 'en';

export const locales: Locale[] = ['ar', 'en'];
export const defaultLocale: Locale = 'ar';

export const dir = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr');

/*
 * Voice notes (see docs/brand-guidelines.md):
 * - Plain words and short sentences. Say what happens, not how it feels.
 * - Arabic body copy is simple Modern Standard Arabic. The hero question and
 *   his own quotes keep his Egyptian register, the way his video titles do.
 * - No em dashes, no slogans, no "why choose us". Every claim traces back to
 *   src/content/site.ts.
 */

const ar = {
  meta: {
    title: `${verified.name.ar} | ${verified.title.ar}`,
    description:
      'د. محمد مغربي، دكتور أمراض نفسية وعصبية. احجز في قائمة الانتظار، ويتصل بك فريق العيادة لتأكيد الموعد.',
    langName: 'العربية',
    switchTo: 'English',
    switchLabel: 'تغيير اللغة',
    skip: 'تخطي إلى المحتوى',
    onPlatform: 'على',
  },
  nav: {
    about: 'نبذة',
    fields: 'مجالات العمل',
    approach: 'طريقة الحجز',
    awareness: 'فيديوهات',
    contact: 'الحجز',
    book: 'احجز موعدك',
    menu: 'القائمة',
    close: 'إغلاق',
  },
  hero: {
    eyebrow: verified.practice.ar as string,
    headline: ['نفسي', 'ولا عصبي؟'],
    lead: 'بعض الأعراض تقع بين الاثنين، ويصعب أن تعرف وحدك من أين تبدأ. د. محمد مغربي دكتور أمراض نفسية وعصبية، وعياداته تعمل في المجالين.',
    primary: 'احجز موعدك',
    secondary: 'راسل العيادة',
    portraitAlt: 'صورة د. محمد مغربي بالمعطف الأبيض',
    reachLabel: 'المتابعون',
  },
  about: {
    label: 'نبذة',
    heading: 'عن د. محمد مغربي',
    body: [
      'د. محمد مغربي دكتور أمراض نفسية وعصبية. يستقبل المرضى في عيادات د. محمد مغربي، في تخصصي المخ والأعصاب والطب النفسي.',
      'ويعرفه كثيرون من فيديوهاته. ينشر بالعربية على فيسبوك وإنستجرام ويوتيوب وتيك توك عن أمراض مثل القلق واضطراب ثنائي القطب والزهايمر واضطرابات الشخصية، وعن الحالات التي يبدو فيها العرض نفسيًا وسببه في المخ.',
      'الحجز عن طريق قائمة انتظار. تترك بياناتك، ويتصل بك فريق العيادة لتأكيد الموعد.',
    ],
    quoteSource: 'من فيديو على قناته في يوتيوب',
    translatedFrom: '',
  },
  fields: {
    label: 'مجالات العمل',
    // Non-breaking space: "المخ والأعصاب" is one term and must not split.
    heading: 'الطب النفسي، والمخ والأعصاب',
    intro:
      'لا يلزمك أن تعرف قبل الحجز إن كانت حالتك نفسية أو عصبية. تحديد ذلك جزء من الكشف نفسه.',
    items: [
      {
        index: '01',
        name: 'الطب النفسي',
        latin: 'Psychiatry',
        body: 'تشخيص الاضطرابات النفسية وعلاجها. الخطة تُبنى على الكشف، وتُعدَّل في المتابعة إن احتاجت.',
        who: 'مثلًا عند قلق أو تقلبات مزاجية مستمرة بدأت تؤثر على نومك أو عملك.',
      },
      {
        index: '02',
        name: 'المخ والأعصاب',
        latin: 'Neurology',
        body: 'تقييم حالات الجهاز العصبي، ومنها أعراض عصبية قد تتشابه مع أعراض نفسية.',
        who: 'مثلًا عند أعراض عصبية مستمرة، أو أعراض لا يتضح معها إن كان السبب عصبيًا أم نفسيًا.',
      },
    ],
    cta: 'احجز موعدك',
  },
  approach: {
    label: 'طريقة الحجز',
    heading: 'كيف تحجز',
    intro: 'تترك بياناتك مرة واحدة، وفريق العيادة يتصل بك.',
    steps: [
      { n: '١', title: 'طلب الحجز', body: 'تملأ النموذج في أسفل الصفحة.' },
      { n: '٢', title: 'تأكيد الموعد', body: 'يتصل بك فريق العيادة لتأكيد الموعد.' },
      { n: '٣', title: 'الكشف', body: 'يسألك الطبيب عن الأعراض وتاريخك المرضي، ويشرح لك ما يراه.' },
      { n: '٤', title: 'المتابعة', body: 'تُراجَع الخطة في مواعيد المتابعة حسب استجابتك.' },
    ],
  },
  why: {
    label: 'قبل الحجز',
    heading: 'أشياء تفيد معرفتها قبل أن تحجز',
    items: [
      {
        title: 'طبيب واحد للجانبين',
        body: 'الأعراض النفسية والعصبية يقيّمها الطبيب نفسه.',
      },
      {
        title: 'اسمع شرحه أولًا',
        body: 'له أكثر من ٥٠ فيديو على يوتيوب، فتستطيع أن تعرف طريقته في الشرح قبل الحجز.',
      },
      {
        title: 'بياناتك',
        body: 'ما تكتبه في نموذج الحجز يُستخدم لتأكيد موعدك فقط.',
      },
      {
        title: 'الحالات الطارئة',
        body: 'قائمة الانتظار ليست للطوارئ. إن كانت الأعراض مفاجئة أو شديدة، توجّه إلى أقرب مستشفى.',
      },
    ],
  },
  awareness: {
    label: 'فيديوهات',
    heading: 'شاهده وهو يشرح',
    body: 'ينشر د. محمد مغربي فيديوهات بالعربية عن الأمراض النفسية والعصبية على فيسبوك وإنستجرام ويوتيوب وتيك توك. هذه بعضها.',
    followers: 'متابع',
    subscribers: 'مشترك',
    visit: 'زيارة الحساب',
    videosLabel: 'من يوتيوب',
    videosNote: '',
    channelCta: 'كل الفيديوهات',
  },
  booking: {
    label: 'الحجز',
    heading: 'احجز موعدك',
    body: 'اترك بياناتك، وسيتصل بك فريق العيادة لتأكيد الموعد.',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    gender: 'النوع',
    genderChoose: 'اختر',
    male: 'ذكر',
    female: 'أنثى',
    country: 'الدولة',
    countryChoose: 'اختر الدولة',
    phone: 'رقم الهاتف',
    dob: 'تاريخ الميلاد',
    notes: 'ملاحظة (اختياري)',
    notesPlaceholder: 'أي شيء تحب أن يعرفه الفريق قبل أن يتصل بك.',
    submit: 'أرسل طلب الحجز',
    sending: 'جارٍ الإرسال…',
    successTitle: 'وصل طلبك',
    successBody: 'سيتصل بك فريق العيادة لتأكيد الموعد.',
    mailtoTitle: 'خطوة أخيرة: أرسل الطلب بالبريد',
    mailtoBody:
      'اضغط الزر ليفتح بريدك برسالة فيها بياناتك، ثم أرسلها إلى العيادة.',
    mailtoCta: 'افتح البريد',
    summaryTitle: 'راجع هذه البيانات:',
    errors: {
      firstName: 'اكتب اسمك الأول.',
      lastName: 'اكتب اسم العائلة.',
      gender: 'اختر النوع.',
      country: 'اختر الدولة.',
      phone: 'اكتب رقم هاتف يمكن الاتصال بك عليه.',
      phoneShort: 'رقم الهاتف يبدو ناقصًا.',
      dob: 'اختر تاريخ ميلادك.',
      dobFuture: 'تاريخ الميلاد لا يمكن أن يكون في المستقبل.',
    },
    errorGeneric: 'لم يُرسَل الطلب. جرّب مرة أخرى، أو راسل العيادة بالبريد.',
    emailLabel: 'للاستفسارات',
    disclaimer:
      'هذا النموذج لطلب موعد، وليس للاستشارة الطبية. في الحالات الطارئة توجّه فورًا إلى أقرب مستشفى.',
  },
  footer: {
    tagline: verified.title.ar as string,
    follow: 'تابعه',
    contact: 'تواصل',
    rights: 'جميع الحقوق محفوظة.',
    privacyTitle: 'الخصوصية',
    privacy:
      'بيانات نموذج الحجز تُستخدم لتأكيد الموعد فقط، ولا تُعطى لأي جهة أخرى.',
    disclaimer: 'ما يُنشر هنا للتوعية، ولا يغني عن الكشف.',
  },
  countries: [
    'مصر', 'السعودية', 'الإمارات', 'الكويت', 'قطر', 'البحرين', 'عُمان',
    'الأردن', 'لبنان', 'فلسطين', 'سوريا', 'العراق', 'ليبيا', 'السودان',
    'تونس', 'الجزائر', 'المغرب', 'دولة أخرى',
  ],
};

const en: typeof ar = {
  meta: {
    title: `${verified.name.en} | ${verified.title.en}`,
    description:
      'Dr. Mohamed Maghraby is a neuropsychiatrist. Join the waiting list and the clinic team will call you to confirm your appointment.',
    langName: 'English',
    switchTo: 'العربية',
    switchLabel: 'Change language',
    skip: 'Skip to content',
    onPlatform: 'on',
  },
  nav: {
    about: 'Profile',
    fields: 'Fields of care',
    approach: 'How to book',
    awareness: 'Videos',
    contact: 'Booking',
    book: 'Book an appointment',
    menu: 'Menu',
    close: 'Close',
  },
  hero: {
    eyebrow: verified.practice.en,
    headline: ['Psychological,', 'or neurological?'],
    lead: 'Some symptoms fall somewhere between the two, and it is hard to know on your own where to start. Dr. Mohamed Maghraby is a neuropsychiatrist, and his clinics work in both fields.',
    primary: 'Book an appointment',
    secondary: 'Email the clinic',
    portraitAlt: 'Dr. Mohamed Maghraby in a white coat',
    reachLabel: 'Followers',
  },
  about: {
    label: 'Profile',
    heading: 'About Dr. Maghraby',
    body: [
      'Dr. Mohamed Maghraby is a neuropsychiatrist. He sees patients at Dr. Mohamed Maghraby Clinics, which cover neurology and psychiatry.',
      'Many people know him from his videos. He posts in Arabic on Facebook, Instagram, YouTube and TikTok about conditions such as anxiety, bipolar disorder, Alzheimer’s and personality disorders, and about cases where a symptom looks psychological but the cause is in the brain.',
      'Appointments go through a waiting list. You leave your details, and the clinic team calls you to confirm.',
    ],
    quoteSource: 'From a video on his YouTube channel',
    translatedFrom: 'Translated from Arabic',
  },
  fields: {
    label: 'Fields of care',
    heading: 'Psychiatry and neurology',
    intro:
      'You don’t need to know before booking whether your problem is psychological or neurological. Working that out is part of the consultation.',
    items: [
      {
        index: '01',
        name: 'Psychiatry',
        latin: 'الطب النفسي',
        body: 'Diagnosis and treatment of psychiatric conditions. The plan is based on the consultation and adjusted at follow-up if it needs to be.',
        who: 'For example, anxiety or mood swings that have lasted a while and are starting to affect your sleep or work.',
      },
      {
        index: '02',
        name: 'Neurology',
        latin: 'المخ والأعصاب',
        body: 'Assessment of conditions of the nervous system, including neurological symptoms that can look like psychiatric ones.',
        who: 'For example, ongoing neurological symptoms, or symptoms where it isn’t clear whether the cause is neurological or psychiatric.',
      },
    ],
    cta: 'Book an appointment',
  },
  approach: {
    label: 'How to book',
    heading: 'How to book',
    intro: 'You leave your details once, and the clinic team calls you.',
    steps: [
      { n: '1', title: 'Request', body: 'You fill in the form at the bottom of this page.' },
      { n: '2', title: 'Confirmation', body: 'The clinic team calls you to confirm the appointment.' },
      { n: '3', title: 'Consultation', body: 'The doctor asks about your symptoms and medical history, and explains what he finds.' },
      { n: '4', title: 'Follow-up', body: 'The plan is reviewed at follow-up visits, depending on how you respond.' },
    ],
  },
  why: {
    label: 'Before you book',
    heading: 'Worth knowing before you book',
    items: [
      {
        title: 'One doctor for both',
        body: 'Psychiatric and neurological symptoms are assessed by the same doctor.',
      },
      {
        title: 'Hear him explain first',
        body: 'He has more than 50 videos on YouTube, so you can get a sense of how he explains things before you book.',
      },
      {
        title: 'Your details',
        body: 'What you write in the booking form is used only to confirm your appointment.',
      },
      {
        title: 'Emergencies',
        body: 'The waiting list is not for emergencies. If symptoms are sudden or severe, go to the nearest hospital.',
      },
    ],
  },
  awareness: {
    label: 'Videos',
    heading: 'Watch him explain it',
    body: 'Dr. Mohamed Maghraby posts videos in Arabic about psychiatric and neurological conditions on Facebook, Instagram, YouTube and TikTok. Here are a few.',
    followers: 'followers',
    subscribers: 'subscribers',
    visit: 'Visit profile',
    videosLabel: 'From YouTube',
    videosNote: 'The videos are in Arabic. The English descriptions are ours.',
    channelCta: 'All videos',
  },
  booking: {
    label: 'Booking',
    heading: 'Book an appointment',
    body: 'Leave your details and the clinic team will call you to confirm.',
    firstName: 'First name',
    lastName: 'Last name',
    gender: 'Gender',
    genderChoose: 'Choose',
    male: 'Male',
    female: 'Female',
    country: 'Country',
    countryChoose: 'Choose country',
    phone: 'Phone number',
    dob: 'Date of birth',
    notes: 'Note (optional)',
    notesPlaceholder: 'Anything you’d like the team to know before they call.',
    submit: 'Send booking request',
    sending: 'Sending…',
    successTitle: 'Request received',
    successBody: 'The clinic team will call you to confirm your appointment.',
    mailtoTitle: 'One last step: send it by email',
    mailtoBody:
      'The button opens your email with your details already filled in. Send it to the clinic from there.',
    mailtoCta: 'Open email',
    summaryTitle: 'Please check the following:',
    errors: {
      firstName: 'Enter your first name.',
      lastName: 'Enter your last name.',
      gender: 'Choose an option.',
      country: 'Choose your country.',
      phone: 'Enter a phone number the clinic can call.',
      phoneShort: 'This phone number looks too short.',
      dob: 'Enter your date of birth.',
      dobFuture: 'Date of birth can’t be in the future.',
    },
    errorGeneric: 'The request didn’t go through. Try again, or email the clinic.',
    emailLabel: 'For inquiries',
    disclaimer:
      'This form is for requesting an appointment, not for medical advice. In an emergency, go to the nearest hospital straight away.',
  },
  footer: {
    tagline: verified.title.en,
    follow: 'Follow',
    contact: 'Contact',
    rights: 'All rights reserved.',
    privacyTitle: 'Privacy',
    privacy:
      'Details from the booking form are used to confirm your appointment and are not passed to anyone else.',
    disclaimer: 'What is published here is for general awareness and does not replace a consultation.',
  },
  countries: [
    'Egypt', 'Saudi Arabia', 'United Arab Emirates', 'Kuwait', 'Qatar', 'Bahrain', 'Oman',
    'Jordan', 'Lebanon', 'Palestine', 'Syria', 'Iraq', 'Libya', 'Sudan',
    'Tunisia', 'Algeria', 'Morocco', 'Other country',
  ],
};

export const dictionaries = { ar, en } as const;
export type Dictionary = typeof ar;

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
