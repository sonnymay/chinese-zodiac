import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getZodiacData } from '@/lib/zodiacData';
import { ZODIAC_ORDER } from '@/lib/zodiacData';
import ZodiacDisplay from '@/components/ZodiacDisplay';

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

  return {
    title: `${data.emoji} ${data.name} Chinese Zodiac — Traits, Fortune & 2026 Horoscope`,
    description: `Discover the ${data.name} Chinese Zodiac sign. Element: ${data.element}. Lucky colors, compatible signs, famous people, and your 2026 forecast.`,
  };
}

export default async function AnimalPage({ params }: Props) {
  const { animal } = await params;
  const data = getZodiacData(animal);

  if (!data) notFound();

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '0 0 60px' }}>
      <ZodiacDisplay animal={data} showBackLink />

      <footer style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid #e5dfd7',
        color: '#b8aea6',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '0.78rem',
      }}>
        Chinese Animal Year · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
