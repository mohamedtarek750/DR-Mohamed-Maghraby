import { clinic, verified } from './site';

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
    title: `${verified.name.ar} | ${verified.title.ar} في المهندسين والتجمع الخامس`,
    description: `د. محمد مغربي، دكتور أمراض نفسية وعصبية. عيادات في المهندسين والتجمع الخامس، وكشف أونلاين عبر Zoom. للحجز اتصل أو راسل العيادة على واتساب ${clinic.contactHours.ar}.`,
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
    clinics: 'الفروع',
    call: 'اتصل للحجز',
    whatsapp: 'واتساب',
    callHoursShort: clinic.contactHours.shortAr as string,
    menu: 'القائمة',
    close: 'إغلاق',
  },
  /** Typed into WhatsApp in advance, so sending takes one tap. */
  whatsappPrefill: 'مرحبًا، أريد حجز موعد مع د. محمد مغربي.',
  hero: {
    eyebrow: verified.practice.ar as string,
    headline: ['نفسي', 'ولا عصبي؟'],
    lead: 'بعض الأعراض تقع بين الاثنين، ويصعب أن تعرف وحدك من أين تبدأ. د. محمد مغربي دكتور أمراض نفسية وعصبية، وعياداته تعمل في المجالين.',
    primary: 'اتصل للحجز',
    secondary: 'الفروع والمواعيد',
    whatsapp: 'احجز عبر واتساب',
    callNote: `مواعيد التواصل: ${clinic.contactHours.ar}.`,
    portraitAlt: 'صورة د. محمد مغربي بالمعطف الأبيض',
    reachLabel: 'المتابعون',
  },
  about: {
    label: 'نبذة',
    heading: 'عن د. محمد مغربي',
    body: [
      'د. محمد مغربي دكتور أمراض نفسية وعصبية. يستقبل المرضى في عيادات د. محمد مغربي، في تخصصي المخ والأعصاب والطب النفسي.',
      'ويعرفه كثيرون من فيديوهاته. ينشر بالعربية على فيسبوك وإنستجرام ويوتيوب وتيك توك عن أمراض مثل القلق واضطراب ثنائي القطب والزهايمر واضطرابات الشخصية، وعن الحالات التي يبدو فيها العرض نفسيًا وسببه في المخ.',
      'يستقبل المرضى في فرعين، في المهندسين والتجمع الخامس. ويمكن الكشف معه أونلاين عبر Zoom من أي مكان داخل مصر أو خارجها.',
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
    intro: 'الحجز بالهاتف أو واتساب، سواء للكشف في أحد الفرعين أو أونلاين.',
    formLink: 'لا تستطيع الاتصال الآن؟ اترك بياناتك.',
    steps: [
      {
        n: '١',
        title: 'الاتصال أو واتساب',
        body: `اتصل بأحد أرقام العيادة أو راسلها على واتساب، ${clinic.contactHours.ar}.`,
      },
      { n: '٢', title: 'المكان', body: 'تختار أحد الفرعين، أو الكشف أونلاين عبر Zoom.' },
      { n: '٣', title: 'الكشف', body: 'يسألك الطبيب عن الأعراض وتاريخك المرضي، ويشرح لك ما يراه.' },
      { n: '٤', title: 'المتابعة', body: 'تُراجَع الخطة في مواعيد المتابعة حسب استجابتك.' },
    ],
  },
  clinics: {
    label: 'الفروع',
    heading: 'الفروع والمواعيد',
    intro: 'يستقبل د. محمد مغربي المرضى في فرعين، بالحجز المسبق. والكشف أونلاين متاح أيضًا.',
    daysLabel: 'الأيام',
    hoursLabel: 'المواعيد',
    byAppointment: 'بالحجز المسبق',
    map: 'افتح الخريطة',
    online: {
      title: 'الكشف أونلاين',
      body: 'متاح لأي مكان داخل مصر أو خارجها، عبر برنامج Zoom.',
      book: 'للحجز، اتصل بالعيادة أو راسلها على واتساب. مواعيد التواصل بتوقيت مصر.',
      abroadBefore: 'من خارج مصر: اطلب',
      abroadAfter: 'ثم الرقم بدون الصفر الأول.',
    },
    urgent: {
      title: 'كشف مستعجل',
      body: 'يتاح كشف مستعجل بدون حجز مسبق. اتصل بالعيادة واسأل عنه.',
      safety:
        'الكشف المستعجل زيارة للعيادة، وليس رعاية طوارئ. إن كانت الأعراض مفاجئة أو شديدة، أو كنت تظن أنها جلطة، أو تخشى أن تؤذي نفسك أو غيرك، فتوجّه فورًا إلى أقرب مستشفى.',
    },
    callRow: `للحجز في أي فرع أو أونلاين، اتصل أو راسل العيادة على واتساب، ${clinic.contactHours.ar}.`,
    allNumbers: 'كل الأرقام',
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
        body: 'ما تكتبه في نموذج الحجز يُستخدم للرد عليك بخصوص موعدك فقط.',
      },
      {
        title: 'الكشف المستعجل والطوارئ',
        body: 'للكشف المستعجل، اتصل بالعيادة. وفي الحالات الطارئة، توجّه فورًا إلى أقرب مستشفى.',
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
    body: 'اتصل بأي رقم من هذه الأرقام أو راسله على واتساب، وأخبر فريق العيادة أي فرع يناسبك، أو أنك تريد الكشف أونلاين.',
    phonesLabel: 'للاستفسار والحجز',
    whatsappNote: 'كل الأرقام متاحة على واتساب.',
    hoursLine: 'مواعيد التواصل:',
    busyHint: 'إن كان الخط مشغولًا، جرّب رقمًا آخر.',
    formTitle: 'لا تستطيع الاتصال الآن؟',
    formBody: 'اترك بياناتك، ويرد عليك فريق العيادة في أقرب وقت.',
    formHint: 'إن كنت تحجز لشخص آخر، اكتب بيانات المريض ورقم هاتفك أنت.',
    phoneHint: 'إن كان رقمك خارج مصر، اكتبه مع كود الدولة.',
    place: 'أين تفضّل الكشف؟',
    placeOptions: {
      mohandessin: 'فرع المهندسين',
      'new-cairo': 'فرع التجمع الخامس (CMC)',
      online: 'أونلاين عبر Zoom',
      undecided: 'لم أقرر بعد',
    },
    formUrgent: 'للكشف المستعجل، اتصل بالعيادة ولا تستخدم هذا النموذج.',
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
    notesPlaceholder: 'أي شيء تحب أن يعرفه الفريق قبل أن يرد عليك.',
    submit: 'أرسل الطلب',
    sending: 'جارٍ الإرسال…',
    successTitle: 'وصل طلبك',
    successBody: 'يرد عليك فريق العيادة في أقرب وقت.',
    successCall: `وإن أردت ألا تنتظر، اتصل أو راسل العيادة على واتساب، ${clinic.contactHours.ar}.`,
    mailtoOr: 'أو تواصل مع العيادة مباشرة.',
    mailtoTitle: 'خطوة أخيرة: أرسل الطلب بالبريد',
    mailtoBody:
      'اضغط الزر ليفتح بريدك برسالة فيها بياناتك، ثم أرسلها إلى العيادة.',
    mailtoCta: 'افتح البريد',
    summaryTitle: 'راجع هذه البيانات:',
    errors: {
      firstName: 'اكتب الاسم الأول.',
      lastName: 'اكتب اسم العائلة.',
      gender: 'اختر النوع.',
      country: 'اختر الدولة.',
      phone: 'اكتب رقم هاتف يمكن الاتصال بك عليه.',
      place: 'اختر مكان الكشف.',
      phoneShort: 'رقم الهاتف يبدو ناقصًا.',
      dob: 'اختر تاريخ الميلاد.',
      dobFuture: 'تاريخ الميلاد لا يمكن أن يكون في المستقبل.',
    },
    errorGeneric: 'لم يُرسَل الطلب. جرّب مرة أخرى، أو تواصل مع العيادة بالهاتف أو واتساب.',
    emailLabel: 'للاستفسار بالبريد',
    disclaimer:
      'هذا النموذج لطلب موعد، وليس للاستشارة الطبية ولا للكشف المستعجل. في الحالات الطارئة توجّه فورًا إلى أقرب مستشفى.',
  },
  footer: {
    tagline: verified.title.ar as string,
    follow: 'تابعه',
    contact: 'تواصل',
    rights: 'جميع الحقوق محفوظة.',
    privacyTitle: 'الخصوصية',
    privacy:
      'بيانات نموذج الحجز تُستخدم للرد عليك بخصوص موعدك فقط، ولا تُعطى لأي جهة أخرى.',
    clinicsTitle: 'الفروع',
    online: 'أونلاين عبر Zoom',
    callHours: 'مواعيد التواصل:',
    whatsapp: 'واتساب',
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
    title: `${verified.name.en} | ${verified.title.en} in Mohandessin and New Cairo`,
    description: `Dr. Mohamed Maghraby, neuropsychiatrist in Mohandessin and the Fifth Settlement, plus online Zoom consultations. Call or WhatsApp to book, ${clinic.contactHours.en}.`,
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
    clinics: 'Clinics',
    call: 'Call to book',
    whatsapp: 'WhatsApp',
    callHoursShort: clinic.contactHours.shortEn,
    menu: 'Menu',
    close: 'Close',
  },
  whatsappPrefill: 'Hello, I would like to book an appointment with Dr. Mohamed Maghraby.',
  hero: {
    eyebrow: verified.practice.en,
    headline: ['Psychological,', 'or neurological?'],
    lead: 'Some symptoms fall somewhere between the two, and it is hard to know on your own where to start. Dr. Mohamed Maghraby is a neuropsychiatrist, and his clinics work in both fields.',
    primary: 'Call to book',
    secondary: 'Clinics and hours',
    whatsapp: 'Book on WhatsApp',
    callNote: `Contact hours: ${clinic.contactHours.en}.`,
    portraitAlt: 'Dr. Mohamed Maghraby in a white coat',
    reachLabel: 'Followers',
  },
  about: {
    label: 'Profile',
    heading: 'About Dr. Maghraby',
    body: [
      'Dr. Mohamed Maghraby is a neuropsychiatrist. He sees patients at Dr. Mohamed Maghraby Clinics, which cover neurology and psychiatry.',
      'Many people know him from his videos. He posts in Arabic on Facebook, Instagram, YouTube and TikTok about conditions such as anxiety, bipolar disorder, Alzheimer’s and personality disorders, and about cases where a symptom looks psychological but the cause is in the brain.',
      'He sees patients at two branches, in Mohandessin and the Fifth Settlement. Consultations are also available online over Zoom, from anywhere inside or outside Egypt.',
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
    heading: 'Booking, step by step',
    intro: 'You book by phone or WhatsApp, for either branch or an online consultation.',
    formLink: 'Can’t call right now? Leave your details.',
    steps: [
      {
        n: '1',
        title: 'Call or WhatsApp',
        body: `Call one of the clinic’s numbers or message it on WhatsApp, ${clinic.contactHours.en}.`,
      },
      { n: '2', title: 'Where', body: 'You choose one of the branches, or an online consultation over Zoom.' },
      { n: '3', title: 'Consultation', body: 'The doctor asks about your symptoms and medical history, and explains what he finds.' },
      { n: '4', title: 'Follow-up', body: 'The plan is reviewed at follow-up visits, depending on how you respond.' },
    ],
  },
  clinics: {
    label: 'Clinics',
    heading: 'Clinics and hours',
    intro: 'Dr. Mohamed Maghraby sees patients at two branches, by prior booking. Online consultations are also available.',
    daysLabel: 'Days',
    hoursLabel: 'Hours',
    byAppointment: 'By prior booking',
    map: 'Open in Google Maps',
    online: {
      title: 'Online consultation',
      body: 'Available anywhere, inside or outside Egypt, over Zoom.',
      book: 'To book, call the clinic or message it on WhatsApp. Contact hours are Egypt time.',
      abroadBefore: 'From outside Egypt: dial',
      abroadAfter: 'then the number without the first 0.',
    },
    urgent: {
      title: 'Urgent consultation',
      body: 'An urgent consultation is available without prior booking. Call the clinic and ask about it.',
      safety:
        'An urgent consultation is a clinic visit, not emergency care. If symptoms are sudden or severe, if you think it may be a stroke, or if you are afraid you might harm yourself or someone else, go to the nearest hospital straight away.',
    },
    callRow: `To book at either branch or online, call or message on WhatsApp, ${clinic.contactHours.en}.`,
    allNumbers: 'All numbers',
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
        body: 'What you write in the booking form is used only to get back to you about your appointment.',
      },
      {
        title: 'Urgent visits and emergencies',
        body: 'For an urgent consultation, call the clinic. In an emergency, go to the nearest hospital straight away.',
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
    body: 'Call or WhatsApp any of these numbers and tell the clinic team which branch suits you, or that you would like an online consultation.',
    phonesLabel: 'Inquiries and booking',
    whatsappNote: 'All four numbers are on WhatsApp.',
    hoursLine: 'Contact hours:',
    busyHint: 'If one line is busy, try another.',
    formTitle: 'Can’t call right now?',
    formBody: 'Leave your details and the clinic team will get back to you as soon as possible.',
    formHint: 'Booking for someone else? Enter the patient’s details and your own phone number.',
    phoneHint: 'If your number is outside Egypt, include the country code.',
    place: 'Where would you like to be seen?',
    placeOptions: {
      mohandessin: 'Mohandessin branch',
      'new-cairo': 'Fifth Settlement branch (CMC)',
      online: 'Online over Zoom',
      undecided: 'Not sure yet',
    },
    formUrgent: 'For an urgent consultation, call the clinic. Don’t use this form.',
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
    notesPlaceholder: 'Anything you’d like the team to know before they get back to you.',
    submit: 'Send request',
    sending: 'Sending…',
    successTitle: 'Request received',
    successBody: 'The clinic team will get back to you as soon as possible.',
    successCall: `If you would rather not wait, call or message on WhatsApp, ${clinic.contactHours.en}.`,
    mailtoOr: 'Or contact the clinic directly.',
    mailtoTitle: 'One last step: send it by email',
    mailtoBody:
      'The button opens your email with your details already filled in. Send it to the clinic from there.',
    mailtoCta: 'Open email',
    summaryTitle: 'Please check the following:',
    errors: {
      firstName: 'Enter the first name.',
      lastName: 'Enter the last name.',
      gender: 'Choose a gender.',
      country: 'Choose a country.',
      phone: 'Enter a phone number the clinic can call.',
      place: 'Choose where you would like to be seen.',
      phoneShort: 'This phone number looks too short.',
      dob: 'Enter the date of birth.',
      dobFuture: 'Date of birth can’t be in the future.',
    },
    errorGeneric: 'The request didn’t go through. Try again, or reach the clinic by phone or WhatsApp.',
    emailLabel: 'Inquiries by email',
    disclaimer:
      'This form is for requesting an appointment. It is not for medical advice or urgent consultations. In an emergency, go to the nearest hospital straight away.',
  },
  footer: {
    tagline: verified.title.en,
    follow: 'Follow',
    contact: 'Contact',
    rights: 'All rights reserved.',
    privacyTitle: 'Privacy',
    privacy:
      'Details from the booking form are used only to get back to you about your appointment and are not passed to anyone else.',
    clinicsTitle: 'Clinics',
    online: 'Online over Zoom',
    callHours: 'Contact hours:',
    whatsapp: 'WhatsApp',
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
