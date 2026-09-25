import { notFound } from 'next/navigation';
import About from '@/components/About';
import Approach from '@/components/Approach';
import Awareness from '@/components/Awareness';
import Booking from '@/components/Booking';
import Fields from '@/components/Fields';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import JsonLd from '@/components/JsonLd';
import MobileCta from '@/components/MobileCta';
import Why from '@/components/Why';
import { getDictionary, locales, type Locale } from '@/content/dictionary';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const typed = locale as Locale;
  const t = getDictionary(typed);

  return (
    <>
      <JsonLd t={t} locale={typed} />
      <Header t={t} locale={typed} />
      <main id="main">
        <Hero t={t} locale={typed} />
        <About t={t} />
        <Fields t={t} />
        <Approach t={t} />
        <Why t={t} />
        <Awareness t={t} locale={typed} />
        <Booking t={t} locale={typed} />
      </main>
      <Footer t={t} locale={typed} />
      <MobileCta t={t} />
    </>
  );
}
