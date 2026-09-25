import type { Dictionary, Locale } from '@/content/dictionary';
import { SITE_URL, verified } from '@/content/site';

/**
 * Structured data carries only facts taken from first-party public sources.
 * Deliberately absent: address, telephone, openingHours, aggregateRating,
 * review, award and alumniOf — none of those are published anywhere, and a
 * fabricated value here would be a fabricated claim in search results.
 */
export default function JsonLd({ t, locale }: { t: Dictionary; locale: Locale }) {
  const sameAs = Object.values(verified.social);

  const graph = [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#doctor`,
      name: verified.name[locale],
      alternateName: locale === 'ar' ? verified.name.en : verified.name.ar,
      jobTitle: verified.title[locale],
      email: `mailto:${verified.email}`,
      image: `${SITE_URL}${verified.portrait}`,
      url: `${SITE_URL}/${locale}`,
      knowsAbout: ['Psychiatry', 'Neurology', 'Neuropsychiatry'],
      knowsLanguage: ['ar', 'en'],
      worksFor: { '@id': `${SITE_URL}/#practice` },
      sameAs,
    },
    {
      '@type': ['MedicalBusiness', 'Physician'],
      '@id': `${SITE_URL}/#practice`,
      name: verified.practice[locale],
      url: `${SITE_URL}/${locale}`,
      email: `mailto:${verified.email}`,
      image: `${SITE_URL}${verified.portrait}`,
      medicalSpecialty: ['Psychiatric', 'Neurologic'],
      employee: { '@id': `${SITE_URL}/#doctor` },
      availableLanguage: ['ar', 'en'],
      sameAs,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/${locale}`,
      name: t.meta.title,
      description: t.meta.description,
      inLanguage: locale === 'ar' ? 'ar-EG' : 'en',
      publisher: { '@id': `${SITE_URL}/#practice` },
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Values are authored constants, not user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
      }}
    />
  );
}
