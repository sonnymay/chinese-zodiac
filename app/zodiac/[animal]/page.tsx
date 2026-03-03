import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getZodiacData } from '@/lib/zodiacData';
import { ZODIAC_ORDER } from '@/lib/zodiacData';
import ZodiacDisplay from '@/components/ZodiacDisplay';
import ClientParticle from '@/components/ClientParticle';

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
    <>
      <ClientParticle />
      <main style={{ position: 'relative', zIndex: 1, maxWidth: '960px', margin: '0 auto', padding: '0 0 60px' }}>
        <ZodiacDisplay animal={data} showBackLink />

        <footer style={{
          textAlign: 'center', padding: '24px 20px',
          borderTop: '1px solid rgba(201,168,76,0.1)',
          color: 'rgba(196,168,130,0.3)',
          fontSize: '0.78rem', letterSpacing: '0.08em',
        }}>
          Chinese Animal Year · Crafted with Ancient Wisdom · {new Date().getFullYear()}
        </footer>
      </main>
    </>
  );
}
