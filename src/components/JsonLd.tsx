import type { Dictionary, Locale } from '@/content/dictionary';
import { clinic, SITE_URL, verified } from '@/content/site';

/**
 * Structured data, built only from verified facts in site.ts. Address,
 * telephone and opening hours come from the clinic's own published contact
 * text (`clinic`), the same object the page renders, so the two can't drift.
 *
 * Deliberately absent: aggregateRating, review, award, alumniOf, priceRange,
 * availableLanguage on the phones (the source doesn't say which languages),
 * isAcceptingNewPatients, any EmergencyService (an urgent clinic visit is not
 * emergency care), any WhatsApp contact (not confirmed), and hoursAvailable
 * on the phones (the 1 pm to 11 pm call window has no days in the source).
 */
export default function JsonLd({ t, locale }: { t: Dictionary; locale: Locale }) {
  const other: Locale = locale === 'ar' ? 'en' : 'ar';
  const sameAs = Object.values(verified.social);
  const intl = (n: string) => `+2${n}`;
  const clinicId = (id: string) => `${SITE_URL}/#clinic-${id}`;
  // Branch names follow each language's punctuation.
  const branchName = (area: string) =>
    locale === 'ar' ? `${verified.practice.ar}، ${area}` : `${verified.practice.en}, ${area}`;

  const branches = clinic.branches.map((b) => ({
    '@type': 'MedicalClinic',
    '@id': clinicId(b.id),
    name: branchName(b.area[locale]),
    parentOrganization: { '@id': `${SITE_URL}/#practice` },
    medicalSpecialty: ['Psychiatric', 'Neurologic'],
    telephone: intl(clinic.primaryPhone),
    url: `${SITE_URL}/${locale}#clinic-${b.id}`,
    hasMap: b.mapUrl,
    address: { '@type': 'PostalAddress', ...b.postal },
    ...(b.geo ? { geo: { '@type': 'GeoCoordinates', ...b.geo } } : {}),
    openingHoursSpecification: b.openingHours.slots.map(([opens, closes]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: b.openingHours.dayOfWeek,
      opens,
      closes,
    })),
  }));

  const graph = [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#doctor`,
      name: verified.name[locale],
      alternateName: [verified.name[other], 'د. محمد المغربى'],
      jobTitle: verified.title[locale],
      email: `mailto:${verified.email}`,
      image: `${SITE_URL}${verified.portrait}`,
      url: `${SITE_URL}/${locale}`,
      knowsAbout: ['Psychiatry', 'Neurology', 'Neuropsychiatry'],
      knowsLanguage: ['ar', 'en'],
      worksFor: { '@id': `${SITE_URL}/#practice` },
      workLocation: clinic.branches.map((b) => ({ '@id': clinicId(b.id) })),
      sameAs,
    },
    {
      // The umbrella practice has no single address (each branch has its own),
      // so it is an organization, not a LocalBusiness that would need one.
      '@type': 'MedicalOrganization',
      '@id': `${SITE_URL}/#practice`,
      name: verified.practice[locale],
      alternateName: [verified.practice[other], clinic.practiceNameAsPublished],
      description: t.meta.description,
      url: `${SITE_URL}/${locale}`,
      email: `mailto:${verified.email}`,
      telephone: intl(clinic.primaryPhone),
      contactPoint: clinic.phones.map((n) => ({
        '@type': 'ContactPoint',
        telephone: intl(n),
        contactType: 'reservations',
      })),
      image: `${SITE_URL}${verified.portrait}`,
      medicalSpecialty: ['Psychiatric', 'Neurologic'],
      employee: { '@id': `${SITE_URL}/#doctor` },
      department: clinic.branches.map((b) => ({ '@id': clinicId(b.id) })),
      sameAs,
    },
    ...branches,
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/${locale}`,
      // The site's name, matching og:site_name; the page title stays in <title>.
      name: verified.practice[locale],
      alternateName: verified.practice[other],
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
