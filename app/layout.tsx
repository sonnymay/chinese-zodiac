import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chinese Animal Year — Zodiac Calculator',
  description: 'Discover your Chinese Zodiac animal. Enter your birth date to reveal your sign, element, lucky charms, compatible partners, and your 2026 horoscope.',
  keywords: 'Chinese zodiac, animal year, horoscope, birth year, lunar calendar, Chinese astrology',
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
