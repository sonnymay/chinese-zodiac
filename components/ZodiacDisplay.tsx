'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ZodiacAnimal, ANIMAL_EMOJIS, ELEMENT_COLORS } from '@/lib/zodiacData';
import { getRecentYears, YearElement } from '@/lib/calculateZodiac';

const FONT_DISPLAY = '"Playfair Display", Georgia, serif';
const FONT_SANS = 'Inter, system-ui, sans-serif';

interface Props {
  animal: ZodiacAnimal;
  yearElement?: YearElement;
  zodiacYear?: number;
  showBackLink?: boolean;
  compact?: boolean;
}

const ELEMENT_SYMBOLS: Record<string, string> = {
  Wood: '木', Fire: '火', Earth: '土', Metal: '金', Water: '水',
};

// Darker tints of the element palette for readability on white
const ELEMENT_TEXT: Record<string, string> = {
  Wood:  '#2d6a2d',
  Fire:  '#b84b0a',
  Earth: '#8a5a00',
  Metal: '#475569',
  Water: '#0369a1',
};
const ELEMENT_BG: Record<string, string> = {
  Wood:  '#f0fdf4',
  Fire:  '#fff7ed',
  Earth: '#fefce8',
  Metal: '#f1f5f9',
  Water: '#f0f9ff',
};
const ELEMENT_BORDER: Record<string, string> = {
  Wood:  '#bbf7d0',
  Fire:  '#fed7aa',
  Earth: '#fde68a',
  Metal: '#cbd5e1',
  Water: '#bae6fd',
};

export default function ZodiacDisplay({ animal, yearElement, zodiacYear, showBackLink, compact }: Props) {
  const [profileOpen, setProfileOpen] = useState(!!showBackLink);
  const years = getRecentYears(animal.key);
  const elemText = ELEMENT_TEXT[animal.element];
  const elemBg   = ELEMENT_BG[animal.element];
  const elemBorder = ELEMENT_BORDER[animal.element];
  const yearElemText = yearElement ? ELEMENT_TEXT[yearElement] : null;
  const yearElemBg   = yearElement ? ELEMENT_BG[yearElement] : null;
  const yearElemBorder = yearElement ? ELEMENT_BORDER[yearElement] : null;

  return (
    <article style={{ position: 'relative' }}>

      {showBackLink && (
        <div style={{ padding: '2rem 1.5rem 0' }}>
          <Link
            href="/"
            style={{
              fontFamily: FONT_SANS,
              color: '#7a6f65',
              fontSize: '0.85rem',
              textDecoration: 'none',
            }}
          >
            ← Back to calculator
          </Link>
        </div>
      )}

      {/* ── Hero ── */}
      <section style={{ textAlign: 'center', padding: '3rem 1.5rem 2.5rem' }}>
        <div
          style={{ fontSize: 'clamp(80px, 14vw, 120px)', lineHeight: 1, marginBottom: '1.25rem' }}
          aria-hidden="true"
        >
          {animal.emoji}
        </div>

        <h1 style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700,
          color: '#2d2926',
          letterSpacing: '-0.01em',
          marginBottom: '0.75rem',
        }}>
          {animal.name}
        </h1>

        <p style={{
          fontFamily: FONT_SANS,
          fontSize: '1rem',
          color: '#7a6f65',
          lineHeight: 1.7,
          maxWidth: '520px',
          margin: '0 auto 1.5rem',
        }}>
          {animal.description}
        </p>

        {/* Meta badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Badge bg={elemBg} border={elemBorder} text={elemText}>
            {ELEMENT_SYMBOLS[animal.element]} {animal.element}
          </Badge>
          <Badge bg="#f5f2ec" border="#e5dfd7" text="#7a6f65">
            {animal.pinyin}
          </Badge>
          <Badge bg="#f5f2ec" border="#e5dfd7" text="#7a6f65">
            {animal.yinYang}
          </Badge>
          {yearElement && zodiacYear && (
            <Badge
              bg={yearElemBg ?? elemBg}
              border={yearElemBorder ?? elemBorder}
              text={yearElemText ?? elemText}
            >
              {ELEMENT_SYMBOLS[yearElement]} {yearElement} {animal.name} ({zodiacYear})
            </Badge>
          )}
        </div>

        <p style={{
          fontFamily: FONT_SANS,
          color: '#b8aea6',
          fontSize: '0.8rem',
          letterSpacing: '0.02em',
        }}>
          Years: {years.join(', ')}
        </p>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #e5dfd7', maxWidth: '800px', margin: '0 auto' }} />

      {/* ── Core info (always visible) ── */}
      {!compact && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '1rem',
          padding: '2rem 1.25rem 1.5rem',
          maxWidth: '960px',
          margin: '0 auto',
        }}>
          {/* Element & Nature */}
          <InfoCard title="Element & Nature">
            <p style={{
              fontFamily: FONT_SANS,
              color: elemText,
              fontWeight: 500,
              fontSize: '0.95rem',
              marginBottom: '0.5rem',
            }}>
              {ELEMENT_SYMBOLS[animal.element]} {animal.element}
            </p>
            <p style={{ fontFamily: FONT_SANS, color: '#7a6f65', lineHeight: 1.7, fontSize: '0.92rem' }}>
              {animal.elementDesc}
            </p>
          </InfoCard>

          {/* Personality Traits */}
          <InfoCard title="Personality">
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {animal.traits.map((trait, i) => (
                <li key={i} style={{
                  fontFamily: FONT_SANS,
                  padding: '6px 0 6px 18px',
                  position: 'relative',
                  borderBottom: i < animal.traits.length - 1 ? '1px solid #f0ece4' : 'none',
                  color: '#2d2926',
                  fontSize: '0.92rem',
                  lineHeight: 1.5,
                }}>
                  <span style={{ position: 'absolute', left: 0, color: '#8b5a2b', fontSize: '0.6rem', top: '9px' }}>●</span>
                  {trait}
                </li>
              ))}
            </ul>
          </InfoCard>

          {/* Best Matches */}
          <InfoCard title="Best Matches">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {animal.compatible.map(key => (
                <Link key={key} href={`/zodiac/${key}`} style={{ textDecoration: 'none' }}>
                  <div className="animal-chip compatible">
                    <span style={{ fontSize: '1.2em' }}>{ANIMAL_EMOJIS[key]}</span>
                    <span style={{ textTransform: 'capitalize' }}>{key}</span>
                  </div>
                </Link>
              ))}
            </div>
          </InfoCard>

          {/* Clash Signs */}
          <InfoCard title="Clash Signs">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {animal.incompatible.map(key => (
                <Link key={key} href={`/zodiac/${key}`} style={{ textDecoration: 'none' }}>
                  <div className="animal-chip incompatible">
                    <span style={{ fontSize: '1.2em' }}>{ANIMAL_EMOJIS[key]}</span>
                    <span style={{ textTransform: 'capitalize' }}>{key}</span>
                  </div>
                </Link>
              ))}
            </div>
          </InfoCard>
        </div>
      )}

      {/* ── Full Profile toggle ── */}
      {!compact && (
        <div style={{ textAlign: 'center', padding: '0 1rem 2rem' }}>
          <button
            onClick={() => setProfileOpen(o => !o)}
            style={{
              fontFamily: FONT_SANS,
              fontSize: '0.88rem',
              fontWeight: 500,
              color: '#7a6f65',
              background: 'transparent',
              border: '1.5px solid #e5dfd7',
              borderRadius: '6px',
              padding: '9px 20px',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#c4b8a8';
              e.currentTarget.style.color = '#2d2926';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#e5dfd7';
              e.currentTarget.style.color = '#7a6f65';
            }}
          >
            {profileOpen ? 'Hide full profile ↑' : 'Show full profile ↓'}
          </button>
        </div>
      )}

      {/* ── Full Profile (collapsible) ── */}
      {!compact && profileOpen && (
        <div style={{ animation: 'revealUp 0.3s ease forwards' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #e5dfd7', maxWidth: '800px', margin: '0 auto 2rem' }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1rem',
            padding: '0 1.25rem 1.5rem',
            maxWidth: '960px',
            margin: '0 auto',
          }}>
            {/* Lucky Colors */}
            <InfoCard title="Lucky Colors">
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                {animal.luckyColors.map(c => (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: 26, height: 26,
                      borderRadius: '50%',
                      backgroundColor: c.hex,
                      border: '1.5px solid rgba(0,0,0,0.08)',
                      flexShrink: 0,
                    }} />
                    <span style={{ fontFamily: FONT_SANS, color: '#2d2926', fontSize: '0.9rem' }}>{c.name}</span>
                  </div>
                ))}
              </div>
            </InfoCard>

            {/* Lucky Numbers */}
            <InfoCard title="Lucky Numbers">
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {animal.luckyNumbers.map(n => (
                  <div key={n} className="lucky-number-badge">{n}</div>
                ))}
              </div>
            </InfoCard>

            {/* Lucky Flowers & Gems */}
            <InfoCard title="Flowers & Gems">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <p style={{ fontFamily: FONT_SANS, fontSize: '0.72rem', fontWeight: 500, color: '#b8aea6', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '3px' }}>Flowers</p>
                  <p style={{ fontFamily: FONT_SANS, color: '#2d2926', fontSize: '0.92rem' }}>{animal.luckyFlowers}</p>
                </div>
                <div style={{ borderTop: '1px solid #f0ece4', paddingTop: '10px' }}>
                  <p style={{ fontFamily: FONT_SANS, fontSize: '0.72rem', fontWeight: 500, color: '#b8aea6', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '3px' }}>Gemstones</p>
                  <p style={{ fontFamily: FONT_SANS, color: '#2d2926', fontSize: '0.92rem' }}>{animal.luckyGems}</p>
                </div>
              </div>
            </InfoCard>
          </div>

          {/* Famous Souls — full width */}
          <div style={{ padding: '0 1.25rem 1.5rem', maxWidth: '960px', margin: '0 auto' }}>
            <InfoCard title={`Famous People — Year of the ${animal.name}`}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '8px',
              }}>
                {animal.famous.map((person, i) => (
                  <div key={i} style={{
                    padding: '8px 10px',
                    background: '#faf8f4',
                    borderRadius: '6px',
                    border: '1px solid #f0ece4',
                  }}>
                    <p style={{ fontFamily: FONT_SANS, color: '#2d2926', fontSize: '0.88rem', lineHeight: 1.3 }}>{person.name}</p>
                    <p style={{ fontFamily: FONT_SANS, color: '#b8aea6', fontSize: '0.78rem', marginTop: '2px' }}>{person.born}</p>
                  </div>
                ))}
              </div>
            </InfoCard>
          </div>

          {/* 2026 Forecast */}
          <div style={{ maxWidth: '800px', margin: '0 auto 2.5rem', padding: '0 1.25rem' }}>
            <div style={{
              background: '#ffffff',
              border: '1px solid #e5dfd7',
              borderRadius: '8px',
              padding: '2rem 2rem',
            }}>
              <h2 style={{
                fontFamily: FONT_DISPLAY,
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#2d2926',
                marginBottom: '1rem',
              }}>
                2026 — Year of the Fire Horse
              </h2>
              <p style={{
                fontFamily: FONT_SANS,
                lineHeight: 1.8,
                fontSize: '0.95rem',
                color: '#7a6f65',
              }}>
                {animal.forecast2026}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── All Animals (subtle) ── */}
      {!compact && (
        <div style={{ padding: '1rem 1rem 2.5rem' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #e5dfd7', maxWidth: '800px', margin: '0 auto 1.75rem' }} />
          <p style={{
            textAlign: 'center',
            fontFamily: FONT_SANS,
            fontSize: '0.75rem',
            color: '#b8aea6',
            marginBottom: '1.25rem',
            letterSpacing: '0.02em',
          }}>
            All twelve animals
          </p>
          <AllAnimalsRow active={animal.key} />
        </div>
      )}
    </article>
  );
}

/* ─── Sub-components ─── */

function Badge({ bg, border, text, children }: {
  bg: string; border: string; text: string; children: React.ReactNode;
}) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '20px',
      border: `1px solid ${border}`,
      color: text,
      fontSize: '0.82rem',
      fontFamily: FONT_SANS,
      background: bg,
    }}>
      {children}
    </span>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="east-card" style={{ padding: '1.25rem 1.4rem' }}>
      <p style={{
        fontFamily: FONT_SANS,
        fontSize: '0.72rem',
        fontWeight: 500,
        color: '#b8aea6',
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        marginBottom: '0.85rem',
      }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function AllAnimalsRow({ active }: { active: string }) {
  const animals = [
    { key: 'rat',     emoji: '🐀', name: 'Rat' },
    { key: 'ox',      emoji: '🐂', name: 'Ox' },
    { key: 'tiger',   emoji: '🐅', name: 'Tiger' },
    { key: 'rabbit',  emoji: '🐇', name: 'Rabbit' },
    { key: 'dragon',  emoji: '🐉', name: 'Dragon' },
    { key: 'snake',   emoji: '🐍', name: 'Snake' },
    { key: 'horse',   emoji: '🐎', name: 'Horse' },
    { key: 'goat',    emoji: '🐐', name: 'Goat' },
    { key: 'monkey',  emoji: '🐒', name: 'Monkey' },
    { key: 'rooster', emoji: '🐓', name: 'Rooster' },
    { key: 'dog',     emoji: '🐕', name: 'Dog' },
    { key: 'pig',     emoji: '🐖', name: 'Pig' },
  ];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '4px',
      flexWrap: 'wrap',
      maxWidth: '680px',
      margin: '0 auto',
    }}>
      {animals.map(a => (
        <Link key={a.key} href={`/zodiac/${a.key}`} style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            padding: '7px 9px',
            borderRadius: '6px',
            transition: 'background 0.2s',
            opacity: a.key === active ? 1 : 0.45,
            background: a.key === active ? '#f5f2ec' : 'transparent',
            border: a.key === active ? '1px solid #e5dfd7' : '1px solid transparent',
          }}>
            <span style={{ fontSize: '1.4rem' }}>{a.emoji}</span>
            <span style={{
              fontFamily: FONT_SANS,
              fontSize: '0.6rem',
              color: '#7a6f65',
              letterSpacing: '0.04em',
            }}>
              {a.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
