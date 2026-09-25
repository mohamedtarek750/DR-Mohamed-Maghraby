import type { MetadataRoute } from 'next';
import { locales } from '@/content/dictionary';
import { SITE_URL } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: locale === 'ar' ? 1 : 0.8,
    alternates: {
      languages: {
        ar: `${SITE_URL}/ar`,
        en: `${SITE_URL}/en`,
      },
    },
  }));
}
