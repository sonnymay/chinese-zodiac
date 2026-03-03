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
        {/* Fonts loaded at runtime — no build-time fetch required */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
