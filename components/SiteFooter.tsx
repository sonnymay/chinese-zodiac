'use client';

import Link from 'next/link';

const FONT_DISPLAY = '"Playfair Display", Georgia, serif';
const FONT_SANS = 'Inter, system-ui, sans-serif';
const CURRENT_YEAR = new Date().getFullYear();

const FOOTER_ANIMALS = [
  { key: 'rat',     emoji: '🐀', name: 'Rat'     },
  { key: 'ox',      emoji: '🐂', name: 'Ox'      },
  { key: 'tiger',   emoji: '🐅', name: 'Tiger'   },
  { key: 'rabbit',  emoji: '🐇', name: 'Rabbit'  },
  { key: 'dragon',  emoji: '🐉', name: 'Dragon'  },
  { key: 'snake',   emoji: '🐍', name: 'Snake'   },
  { key: 'horse',   emoji: '🐎', name: 'Horse'   },
  { key: 'goat',    emoji: '🐐', name: 'Goat'    },
  { key: 'monkey',  emoji: '🐒', name: 'Monkey'  },
  { key: 'rooster', emoji: '🐓', name: 'Rooster' },
  { key: 'dog',     emoji: '🐕', name: 'Dog'     },
  { key: 'pig',     emoji: '🐖', name: 'Pig'     },
];

export default function SiteFooter() {
  return (
    <footer style={{
      borderTop: '1px solid #e5dfd7',
      padding: '3rem 20px 2.5rem',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{
          fontFamily: FONT_DISPLAY,
          fontSize: '1rem',
          fontWeight: 600,
          color: '#2d2926',
          marginBottom: '1.75rem',
        }}>
          Discover your Chinese zodiac sign and what it means for you.
        </p>

        {/* Animal links */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '6px',
          marginBottom: '2rem',
        }}>
          {FOOTER_ANIMALS.map(a => (
            <Link
              key={a.key}
              href={`/zodiac/${a.key}`}
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.82rem',
                color: '#7a6f65',
                textDecoration: 'none',
                padding: '4px 11px',
                borderRadius: '20px',
                border: '1px solid #e5dfd7',
                transition: 'color 0.15s, border-color 0.15s, background 0.15s',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#2d2926';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#c4b8a8';
                (e.currentTarget as HTMLAnchorElement).style.background = '#ffffff';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#7a6f65';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#e5dfd7';
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
              }}
            >
              {a.emoji} {a.name}
            </Link>
          ))}
        </div>

        {/* Lunar calendar note */}
        <p style={{
          fontFamily: FONT_SANS,
          fontSize: '0.78rem',
          color: '#b8aea6',
          lineHeight: 1.7,
          maxWidth: '460px',
          margin: '0 auto 1.5rem',
        }}>
          Chinese zodiac signs change in late January or February with the lunar new year —
          not on January 1. If you were born in January or early February, enter your full
          date of birth above for an accurate result.
        </p>

        <p style={{ fontFamily: FONT_SANS, fontSize: '0.75rem', color: '#c4b8a8' }}>
          Chinese Animal Year · {CURRENT_YEAR}
        </p>
      </div>
    </footer>
  );
}
