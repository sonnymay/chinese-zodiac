import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getZodiacData } from '@/lib/zodiacData';
import { ZODIAC_ORDER } from '@/lib/zodiacData';
import ZodiacDisplay from '@/components/ZodiacDisplay';
import SiteFooter from '@/components/SiteFooter';

interface Props {
  params: Promise<{ animal: string }>;
}

export async function generateStaticParams() {
  return ZODIAC_ORDER.map(animal => ({ animal }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { animal } = await params;
  const data = getZodiacData(animal);
  if (!data) return { title: 'Not Found' };

  const title = `${data.emoji} ${data.name} Chinese Zodiac — Traits, Lucky Signs & 2026 Horoscope`;
  const description = `Discover the ${data.name} Chinese Zodiac sign. Element: ${data.element}. Lucky colors, compatible signs, famous people, and your 2026 forecast.`;
  const url = `/zodiac/${animal}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: [{ url: '/favicon.ico', width: 256, height: 256, alt: data.name }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: ['/favicon.ico'],
    },
  };
}

export default async function AnimalPage({ params }: Props) {
  const { animal } = await params;
  const data = getZodiacData(animal);

  if (!data) notFound();

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '0 0 60px' }}>
      <ZodiacDisplay animal={data} showBackLink defaultProfileOpen />

      <SiteFooter />
    </main>
  );
}
