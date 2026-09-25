import { verified } from './site';

export type Locale = 'ar' | 'en';

export const locales: Locale[] = ['ar', 'en'];
export const defaultLocale: Locale = 'ar';

export const dir = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr');

const ar = {
  meta: {
    title: `${verified.name.ar} — ${verified.title.ar}`,
    description:
      'عيادات د. محمد مغربي للأمراض النفسية والعصبية. احجز موعدك عبر قائمة الانتظار ويتواصل معك الفريق لتأكيد الموعد.',
    langName: 'العربية',
    switchTo: 'English',
    switchLabel: 'تغيير اللغة',
    skip: 'تخطي إلى المحتوى',
  },
  nav: {
    about: 'نبذة',
    fields: 'مجالات العمل',
    approach: 'خطوات الحجز',
    awareness: 'محتوى توعوي',
    contact: 'الحجز',
    book: 'احجز موعدك',
    menu: 'القائمة',
    close: 'إغلاق',
  },
  hero: {
    eyebrow: verified.practice.ar as string,
    headline: ['النفس والمخ', 'ليسا مسارين', 'منفصلين.'],
    lead: 'طب الأمراض النفسية والعصبية يتعامل مع الاثنين معًا — الأعراض النفسية والحالات العصبية — في تقييم واحد.',
    primary: 'احجز موعدك',
    secondary: 'تواصل مع العيادة',
    portraitAlt: 'صورة شخصية للدكتور محمد مغربي، دكتور أمراض نفسية وعصبية',
    reachLabel: 'محتوى توعوي يتابعه',
    scroll: 'تابع',
  },
  about: {
    label: 'نبذة',
    heading: 'عن الطبيب',
    body: [
      'د. محمد مغربي دكتور أمراض نفسية وعصبية، ويعمل من خلال عيادات د. محمد مغربي في مجالي المخ والأعصاب والطب النفسي.',
      'إلى جانب عمله في العيادة، ينشر محتوى طبيًا توعويًا بالعربية عبر فيسبوك وإنستجرام ويوتيوب وتيك توك، يتابعه ملايين الأشخاص. محتوى يشرح الحالات النفسية والعصبية بلغة مفهومة، ويتعامل معها كحالات طبية لها تقييم وعلاج.',
      'الحجز يتم عبر قائمة انتظار: تترك بياناتك، ويتواصل معك الفريق لتأكيد الموعد.',
    ],
    statement:
      'الحالة النفسية تُقيَّم مثل أي حالة طبية أخرى: بالسؤال، والفحص، والوقت الكافي.',
  },
  fields: {
    label: 'مجالات العمل',
    heading: 'مجالان، تقييم واحد',
    intro:
      'التخصص المذكور في عيادات د. محمد مغربي هو المخ والأعصاب والطب النفسي. المسار المناسب لكل حالة يُحدَّد في الكشف.',
    items: [
      {
        index: '01',
        name: 'الطب النفسي',
        latin: 'Psychiatry',
        body: 'تشخيص الاضطرابات النفسية وعلاجها من خلال التقييم الإكلينيكي، وخطة علاج تُحدَّد حسب الحالة وتُراجع مع المتابعة.',
        who: 'قد يكون المسار المناسب عند وجود أعراض نفسية مستمرة تؤثر على النوم أو العمل أو العلاقات.',
      },
      {
        index: '02',
        name: 'المخ والأعصاب',
        latin: 'Neurology',
        body: 'تقييم الحالات المتعلقة بالجهاز العصبي، والأعراض العصبية التي قد تتداخل مع أعراض نفسية أو تُفسَّر خطأً على أنها كذلك.',
        who: 'قد يكون المسار المناسب عند وجود أعراض عصبية تحتاج تشخيصًا يفرّق بين السببين.',
      },
    ],
    cta: 'احجز موعدك',
  },
  approach: {
    label: 'خطوات الحجز',
    heading: 'كيف يتم الحجز',
    intro: 'أربع خطوات واضحة، من طلب الموعد إلى المتابعة.',
    steps: [
      { n: '١', title: 'طلب الحجز', body: 'تملأ نموذج قائمة الانتظار ببياناتك الأساسية.' },
      { n: '٢', title: 'تأكيد الموعد', body: 'يتواصل معك فريق العيادة لتأكيد الموعد.' },
      { n: '٣', title: 'الكشف', body: 'تقييم الأعراض والتاريخ الطبي، ومناقشة الصورة كاملة.' },
      { n: '٤', title: 'المتابعة', body: 'خطة تُراجع حسب الاستجابة وما يستجد من أعراض.' },
    ],
  },
  why: {
    label: 'لماذا هنا',
    heading: 'ما الذي يميّز العمل في هذه العيادة',
    items: [
      { title: 'تخصص مزدوج', body: 'الأعراض النفسية والعصبية تُقيَّم معًا، لا كل منها على حدة.' },
      { title: 'خصوصية', body: 'ما يُقال في الكشف يبقى بين المريض والطبيب.' },
      { title: 'لغة مفهومة', body: 'شرح الحالة والخطة بوضوح، دون مصطلحات مغلقة.' },
      { title: 'تواصل مباشر', body: 'فريق العيادة يتواصل معك لتأكيد الموعد بعد طلب الحجز.' },
    ],
  },
  awareness: {
    label: 'محتوى توعوي',
    heading: 'الطب النفسي، مشروحًا للناس',
    body: 'محتوى طبي مفتوح للجميع عن الصحة النفسية والعصبية، ينشره د. محمد مغربي على منصاته بالعربية.',
    followers: 'متابع',
    subscribers: 'مشترك',
    visit: 'زيارة الحساب',
    videosLabel: 'من قناة اليوتيوب',
    videosNote: '',
    channelCta: 'كل الحلقات',
  },
  booking: {
    label: 'الحجز',
    heading: 'احجز موعدك',
    body: 'اترك بياناتك في قائمة الانتظار، وسيتواصل معك فريق العيادة لتأكيد الموعد.',
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
    notesPlaceholder: 'أي معلومة تحب أن يعرفها الفريق قبل التواصل.',
    submit: 'أرسل طلب الحجز',
    sending: 'جارٍ الإرسال…',
    successTitle: 'تم استلام طلبك',
    successBody: 'سيتواصل معك فريق العيادة لتأكيد الموعد.',
    mailtoTitle: 'أرسل الطلب بالبريد',
    mailtoBody:
      'اضغط الزر بالأسفل لفتح بريدك برسالة جاهزة تحتوي بياناتك، ثم أرسلها إلى العيادة.',
    mailtoCta: 'فتح البريد برسالة جاهزة',
    errorRequired: 'من فضلك أكمل الحقول المطلوبة.',
    errorGeneric: 'تعذّر إرسال الطلب. جرّب مرة أخرى أو راسل العيادة بالبريد.',
    emailLabel: 'للاستفسارات',
    disclaimer:
      'هذا النموذج لطلب موعد فقط، وليس بديلًا عن الاستشارة الطبية. في الحالات الطارئة توجّه فورًا إلى أقرب مستشفى.',
    required: 'مطلوب',
  },
  footer: {
    tagline: verified.title.ar as string,
    follow: 'تابع',
    contact: 'تواصل',
    rights: 'جميع الحقوق محفوظة.',
    privacyTitle: 'الخصوصية',
    privacy:
      'البيانات المُرسَلة عبر نموذج الحجز تُستخدم لتأكيد الموعد فقط، ولا تُشارك مع أي جهة أخرى.',
    disclaimer:
      'المحتوى المنشور على هذا الموقع للتوعية العامة ولا يُغني عن الكشف الطبي.',
  },
  countries: [
    'مصر', 'السعودية', 'الإمارات', 'الكويت', 'قطر', 'البحرين', 'عُمان',
    'الأردن', 'لبنان', 'فلسطين', 'سوريا', 'العراق', 'ليبيا', 'السودان',
    'تونس', 'الجزائر', 'المغرب', 'دولة أخرى',
  ],
};

const en: typeof ar = {
  meta: {
    title: `${verified.name.en} — ${verified.title.en}`,
    description:
      'Dr. Mohamed Maghraby Clinics — neurology and psychiatry. Join the waiting list and the team will contact you to confirm your appointment.',
    langName: 'English',
    switchTo: 'العربية',
    switchLabel: 'Change language',
    skip: 'Skip to content',
  },
  nav: {
    about: 'Profile',
    fields: 'Fields of care',
    approach: 'Booking steps',
    awareness: 'Public education',
    contact: 'Booking',
    book: 'Book an appointment',
    menu: 'Menu',
    close: 'Close',
  },
  hero: {
    eyebrow: verified.practice.en,
    headline: ['The mind and', 'the brain are not', 'separate cases.'],
    lead: 'Neuropsychiatry deals with both at once — psychiatric symptoms and neurological conditions — in a single assessment.',
    primary: 'Book an appointment',
    secondary: 'Contact the clinic',
    portraitAlt: 'Portrait of Dr. Mohamed Maghraby, neuropsychiatrist',
    reachLabel: 'Public health education followed by',
    scroll: 'Scroll',
  },
  about: {
    label: 'Profile',
    heading: 'About the doctor',
    body: [
      'Dr. Mohamed Maghraby is a neuropsychiatrist, practising through Dr. Mohamed Maghraby Clinics across neurology and psychiatry.',
      'Alongside clinical work, he publishes Arabic-language medical education on Facebook, Instagram, YouTube and TikTok, followed by millions. The content explains psychiatric and neurological conditions in plain language, and treats them as medical conditions with an assessment and a course of treatment.',
      'Appointments run through a waiting list: you leave your details, and the team contacts you to confirm.',
    ],
    statement:
      'A psychiatric condition is assessed like any other medical condition: by asking, examining, and taking the time it needs.',
  },
  fields: {
    label: 'Fields of care',
    heading: 'Two fields, one assessment',
    intro:
      'The disciplines named by Dr. Mohamed Maghraby Clinics are neurology and psychiatry. The right path for each case is decided in consultation.',
    items: [
      {
        index: '01',
        name: 'Psychiatry',
        latin: 'الطب النفسي',
        body: 'Diagnosis and treatment of psychiatric conditions through clinical assessment, with a plan set according to the case and revisited at follow-up.',
        who: 'May be the right path when persistent psychiatric symptoms affect sleep, work or relationships.',
      },
      {
        index: '02',
        name: 'Neurology',
        latin: 'المخ والأعصاب',
        body: 'Assessment of conditions of the nervous system, including neurological symptoms that overlap with — or are mistaken for — psychiatric ones.',
        who: 'May be the right path when neurological symptoms need a diagnosis that separates the two.',
      },
    ],
    cta: 'Book an appointment',
  },
  approach: {
    label: 'Booking steps',
    heading: 'How booking works',
    intro: 'Four clear steps, from request to follow-up.',
    steps: [
      { n: '1', title: 'Request', body: 'You fill in the waiting-list form with your basic details.' },
      { n: '2', title: 'Confirmation', body: 'The clinic team contacts you to confirm the appointment.' },
      { n: '3', title: 'Consultation', body: 'Symptoms and medical history are assessed, and the full picture discussed.' },
      { n: '4', title: 'Follow-up', body: 'The plan is revisited according to response and any new symptoms.' },
    ],
  },
  why: {
    label: 'Why here',
    heading: 'What shapes the work at this practice',
    items: [
      { title: 'Dual specialty', body: 'Psychiatric and neurological symptoms are assessed together, not in isolation.' },
      { title: 'Privacy', body: 'What is said in consultation stays between patient and doctor.' },
      { title: 'Plain language', body: 'The condition and the plan explained clearly, without closed terminology.' },
      { title: 'Direct contact', body: 'The clinic team contacts you to confirm your appointment after you request it.' },
    ],
  },
  awareness: {
    label: 'Public education',
    heading: 'Psychiatry, explained to people',
    body: 'Open medical content on mental and neurological health, published in Arabic by Dr. Mohamed Maghraby across his platforms.',
    followers: 'followers',
    subscribers: 'subscribers',
    visit: 'Visit profile',
    videosLabel: 'From the YouTube channel',
    videosNote: 'Episodes are in Arabic. English descriptions are ours.',
    channelCta: 'All episodes',
  },
  booking: {
    label: 'Booking',
    heading: 'Book an appointment',
    body: 'Leave your details on the waiting list and the clinic team will contact you to confirm.',
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
    notesPlaceholder: 'Anything you would like the team to know before they call.',
    submit: 'Send booking request',
    sending: 'Sending…',
    successTitle: 'Request received',
    successBody: 'The clinic team will contact you to confirm your appointment.',
    mailtoTitle: 'Send your request by email',
    mailtoBody:
      'Use the button below to open your email client with your details ready, then send it to the clinic.',
    mailtoCta: 'Open email with details',
    errorRequired: 'Please complete the required fields.',
    errorGeneric: 'The request could not be sent. Try again, or email the clinic.',
    emailLabel: 'For inquiries',
    disclaimer:
      'This form requests an appointment only and is not a substitute for medical consultation. In an emergency, go to the nearest hospital immediately.',
    required: 'Required',
  },
  footer: {
    tagline: verified.title.en,
    follow: 'Follow',
    contact: 'Contact',
    rights: 'All rights reserved.',
    privacyTitle: 'Privacy',
    privacy:
      'Details submitted through the booking form are used to confirm your appointment only, and are not shared with anyone else.',
    disclaimer:
      'Content published on this site is for general awareness and does not replace a medical consultation.',
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
