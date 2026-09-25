import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic, Source_Serif_4 } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import {
  dir,
  getDictionary,
  locales,
  type Locale,
} from '@/content/dictionary';
import { SITE_URL, verified } from '@/content/site';

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-plex-arabic',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const t = getDictionary(locale as Locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.meta.title,
      template: `%s — ${verified.name[locale as Locale]}`,
    },
    description: t.meta.description,
    applicationName: verified.practice[locale as Locale],
    authors: [{ name: verified.name.en, url: SITE_URL }],
    creator: verified.name.en,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ar: `${SITE_URL}/ar`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/ar`,
      },
    },
    openGraph: {
      type: 'profile',
      siteName: verified.practice[locale as Locale],
      title: t.meta.title,
      description: t.meta.description,
      url: `${SITE_URL}/${locale}`,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_EG',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
      apple: '/images/logo.png',
    },
  };
}

export const viewport = {
  themeColor: '#f4f0e8',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const t = getDictionary(locale as Locale);

  return (
    <html
      lang={locale}
      dir={dir(locale as Locale)}
      className={`${plexSans.variable} ${plexArabic.variable} ${sourceSerif.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          {t.meta.skip}
        </a>
        {children}
      </body>
    </html>
  );
}
