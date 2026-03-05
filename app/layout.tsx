import type { Metadata } from 'next';
import './globals.css';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://chineseanimalyear.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Chinese Animal Year — Zodiac Calculator',
  description: 'Discover your Chinese Zodiac animal. Enter your birth date to reveal your sign, element, lucky charms, compatible partners, and your 2026 horoscope.',
  keywords: 'Chinese zodiac, animal year, horoscope, birth year, lunar calendar, Chinese astrology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Chinese Animal Year',
    title: 'Chinese Animal Year — Zodiac Calculator',
    description: 'Find your Chinese zodiac sign by birth year or full date. Discover your element, lucky signs, compatibility, and 2026 horoscope.',
    images: [{ url: '/favicon.ico', width: 256, height: 256, alt: 'Chinese Animal Year' }],
  },
  twitter: {
    card: 'summary',
    title: 'Chinese Animal Year — Zodiac Calculator',
    description: 'Find your Chinese zodiac sign by birth year or full date. Discover your element, lucky signs, compatibility, and 2026 horoscope.',
    images: ['/favicon.ico'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
