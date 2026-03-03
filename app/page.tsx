'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { calculate, CalculationResult } from '@/lib/calculateZodiac';
import { getZodiacData, ZodiacAnimal } from '@/lib/zodiacData';
import { getCompatibility, CompatResult } from '@/lib/compatibility';
import ZodiacDisplay from '@/components/ZodiacDisplay';

const FONT_DISPLAY = '"Playfair Display", Georgia, serif';
const FONT_SANS = 'Inter, system-ui, sans-serif';

type AmbiguousResult = { ambiguous: true; year: number };

interface CompatState {
  result: CompatResult;
  animal: ZodiacAnimal;
}

export default function HomePage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [ambiguous, setAmbiguous] = useState<AmbiguousResult | null>(null);

  const [compatInput, setCompatInput] = useState('');
  const [compatState, setCompatState] = useState<CompatState | null>(null);
  const [compatError, setCompatError] = useState('');
  const [compatAmbiguous, setCompatAmbiguous] = useState<AmbiguousResult | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  function handleCalculate() {
    if (!input.trim()) {
      setErrorMsg('Please enter your birth year or full date of birth.');
      return;
    }
    setErrorMsg('');
    setAmbiguous(null);
    // Reset compat when recalculating main result
    setCompatState(null);
    setCompatError('');
    setCompatAmbiguous(null);
    setCompatInput('');

    const res = calculate(input);

    if ('error' in res) {
      setErrorMsg(res.error);
      setResult(null);
    } else if ('ambiguous' in res) {
      setAmbiguous(res as AmbiguousResult);
      setResult(null);
    } else {
      setResult(res as CalculationResult);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleCalculate();
  }

  function handleCompatCalc() {
    if (!result) return;
    if (!compatInput.trim()) {
      setCompatError('Please enter a birth year or date.');
      return;
    }
    setCompatError('');
    setCompatAmbiguous(null);

    const res = calculate(compatInput);

    if ('error' in res) {
      setCompatError(res.error);
      setCompatState(null);
    } else if ('ambiguous' in res) {
      setCompatAmbiguous(res as AmbiguousResult);
      setCompatState(null);
    } else {
      const calc = res as CalculationResult;
      const animal = getZodiacData(calc.zodiacKey);
      if (animal) {
        setCompatState({
          result: getCompatibility(result.zodiacKey, calc.zodiacKey),
          animal,
        });
      }
    }
  }

  function handleCompatKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleCompatCalc();
  }

  function reset() {
    setResult(null);
    setErrorMsg('');
    setAmbiguous(null);
    setCompatState(null);
    setCompatError('');
    setCompatAmbiguous(null);
    setCompatInput('');
    setInput('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const zodiacData = result ? getZodiacData(result.zodiacKey) : null;

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ── Header ── */}
      <header style={{ textAlign: 'center', padding: 'clamp(56px, 10vh, 104px) 20px 44px' }}>
        <h1 style={{
          fontFamily: FONT_DISPLAY,
          fontSize: 'clamp(1.9rem, 4.5vw, 3rem)',
          fontWeight: 700,
          color: '#2d2926',
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
          marginBottom: '10px',
        }}>
          Chinese Animal Year
        </h1>
        <p style={{ fontFamily: FONT_SANS, color: '#7a6f65', fontSize: '1rem' }}>
          Find your Chinese zodiac sign by birth date
        </p>
      </header>

      {/* ── Calculator input ── */}
      <section style={{
        textAlign: 'center',
        padding: result ? '0 20px 36px' : '0 20px 64px',
        maxWidth: '520px',
        margin: '0 auto',
        transition: 'padding 0.3s ease',
      }}>
        <label
          htmlFor="birthInput"
          style={{
            display: 'block',
            fontFamily: FONT_SANS,
            fontSize: '0.88rem',
            fontWeight: 500,
            color: '#2d2926',
            marginBottom: '10px',
          }}
        >
          Birth year or date of birth
        </label>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            id="birthInput"
            type="text"
            className="zodiac-input"
            style={{ maxWidth: '270px' }}
            placeholder="e.g. 1990 or 15 Jan 1990"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Birth year or full date of birth"
          />
          <button className="btn-primary" onClick={handleCalculate}>
            Find My Sign
          </button>
        </div>

        {errorMsg && (
          <p style={{
            fontFamily: FONT_SANS, color: '#991b1b', fontSize: '0.88rem',
            marginTop: '12px', padding: '10px 16px',
            background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px',
          }}>
            {errorMsg}
          </p>
        )}

        {ambiguous && (
          <div style={{
            marginTop: '12px', padding: '14px 18px',
            background: '#fffbeb', border: '1px solid #fde68a',
            borderRadius: '6px', textAlign: 'left',
          }}>
            <p style={{ fontFamily: FONT_SANS, color: '#92400e', lineHeight: 1.6, fontSize: '0.88rem' }}>
              We don&apos;t have a Chinese New Year date for <strong>{ambiguous.year}</strong>.
              Please enter your full date (e.g. <em>15 Feb {ambiguous.year}</em>) for a precise result.
            </p>
          </div>
        )}
      </section>

      {/* ── Results ── */}
      {result && zodiacData && (
        <div
          ref={resultsRef}
          style={{
            animation: 'revealUp 0.45s ease forwards',
            maxWidth: '960px',
            margin: '0 auto',
            padding: '0 0 72px',
          }}
        >
          {result.beforeCNY && result.parsedDate && (
            <div style={{
              maxWidth: '560px', margin: '0 auto 1.5rem',
              padding: '12px 18px', background: '#fffbeb',
              border: '1px solid #fde68a', borderRadius: '6px', textAlign: 'center',
            }}>
              <p style={{ fontFamily: FONT_SANS, color: '#92400e', fontSize: '0.88rem', lineHeight: 1.6 }}>
                You were born <em>before</em> Chinese New Year {result.birthYear}, so your
                zodiac year is <strong>{result.zodiacYear}</strong>.
              </p>
            </div>
          )}

          <ZodiacDisplay
            animal={zodiacData}
            yearElement={result.yearElement}
            zodiacYear={result.zodiacYear}
          />

          {/* ── Compatibility Checker ── */}
          <section style={{
            maxWidth: '680px',
            margin: '0 auto 2rem',
            padding: '0 1.25rem',
          }}>
            <div className="east-card" style={{ padding: '1.5rem 1.75rem' }}>
              <h2 style={{
                fontFamily: FONT_DISPLAY,
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#2d2926',
                marginBottom: '4px',
              }}>
                Check Compatibility
              </h2>
              <p style={{
                fontFamily: FONT_SANS,
                fontSize: '0.82rem',
                color: '#b8aea6',
                marginBottom: '1.1rem',
              }}>
                Enter another person&apos;s birth year or date
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  className="zodiac-input"
                  style={{ maxWidth: '240px' }}
                  placeholder="e.g. 1988 or 3 Mar 1988"
                  value={compatInput}
                  onChange={e => setCompatInput(e.target.value)}
                  onKeyDown={handleCompatKeyDown}
                  aria-label="Second person's birth year or date"
                />
                <button className="btn-primary" onClick={handleCompatCalc}>
                  Compare
                </button>
              </div>

              {compatError && (
                <p style={{
                  fontFamily: FONT_SANS, color: '#991b1b', fontSize: '0.85rem',
                  marginTop: '10px', padding: '9px 14px',
                  background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px',
                }}>
                  {compatError}
                </p>
              )}

              {compatAmbiguous && (
                <div style={{
                  marginTop: '10px', padding: '12px 16px',
                  background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '6px',
                }}>
                  <p style={{ fontFamily: FONT_SANS, color: '#92400e', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    No Chinese New Year date found for <strong>{compatAmbiguous.year}</strong>.
                    Try entering a full date (e.g. <em>15 Feb {compatAmbiguous.year}</em>).
                  </p>
                </div>
              )}

              {compatState && (
                <CompatResultCard
                  animalA={zodiacData}
                  animalB={compatState.animal}
                  compat={compatState.result}
                />
              )}
            </div>
          </section>

          {/* ── Action buttons ── */}
          <div style={{
            textAlign: 'center', padding: '0 1rem 1rem',
            display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <Link
              href={`/zodiac/${result.zodiacKey}`}
              style={{
                display: 'inline-block', padding: '10px 22px',
                background: '#ffffff', border: '1.5px solid #e5dfd7',
                borderRadius: '6px', color: '#2d2926', textDecoration: 'none',
                fontFamily: FONT_SANS, fontSize: '0.9rem', fontWeight: 500,
              }}
            >
              View Full Profile →
            </Link>
            <button
              onClick={reset}
              style={{
                padding: '10px 20px', background: 'transparent',
                border: '1.5px solid #e5dfd7', borderRadius: '6px',
                color: '#7a6f65', cursor: 'pointer',
                fontFamily: FONT_SANS, fontSize: '0.9rem',
              }}
            >
              ← Start Over
            </button>
          </div>
        </div>
      )}

      {/* ── Browse all (subtle secondary) ── */}
      {!result && (
        <section style={{ padding: '0 20px 80px', maxWidth: '760px', margin: '0 auto' }}>
          <hr style={{ border: 'none', borderTop: '1px solid #e5dfd7', marginBottom: '2rem' }} />
          <p style={{
            textAlign: 'center', fontFamily: FONT_SANS,
            fontSize: '0.78rem', color: '#b8aea6',
            marginBottom: '1.25rem', letterSpacing: '0.02em',
          }}>
            Or browse by animal
          </p>
          <BrowseGrid />
        </section>
      )}

      {/* ── Footer ── */}
      <footer style={{
        textAlign: 'center', padding: '20px',
        borderTop: '1px solid #e5dfd7',
        color: '#b8aea6', fontFamily: FONT_SANS, fontSize: '0.78rem',
      }}>
        Chinese Animal Year · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

/* ─── Compatibility Result Card ─────────────────────────────────────────── */

const RATING_COLOR: Record<string, string> = {
  excellent:   '#166534',
  strong:      '#1e40af',
  neutral:     '#7a6f65',
  difficult:   '#92400e',
  challenging: '#991b1b',
};

const RATING_BG: Record<string, string> = {
  excellent:   '#f0fdf4',
  strong:      '#eff6ff',
  neutral:     '#f5f2ec',
  difficult:   '#fffbeb',
  challenging: '#fef2f2',
};

const RATING_BORDER: Record<string, string> = {
  excellent:   '#bbf7d0',
  strong:      '#bfdbfe',
  neutral:     '#e5dfd7',
  difficult:   '#fde68a',
  challenging: '#fecaca',
};

function StarRow({ stars }: { stars: number }) {
  return (
    <span aria-label={`${stars} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{
          fontSize: '1rem',
          color: i < stars ? '#8b5a2b' : '#e5dfd7',
          marginRight: '1px',
        }}>★</span>
      ))}
    </span>
  );
}

function CompatResultCard({ animalA, animalB, compat }: {
  animalA: ZodiacAnimal;
  animalB: ZodiacAnimal;
  compat: CompatResult;
}) {
  const color  = RATING_COLOR[compat.rating];
  const bg     = RATING_BG[compat.rating];
  const border = RATING_BORDER[compat.rating];

  return (
    <div style={{
      marginTop: '1.25rem',
      padding: '1.25rem 1.4rem',
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: '8px',
      animation: 'revealUp 0.3s ease forwards',
    }}>
      {/* Animals side by side */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '8px', marginBottom: '1rem', flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: '1.5rem' }}>{animalA.emoji}</span>
        <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: '1rem', color: '#2d2926' }}>
          {animalA.name}
        </span>
        <span style={{ fontFamily: FONT_SANS, color: '#b8aea6', fontSize: '0.85rem' }}>&amp;</span>
        <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: '1rem', color: '#2d2926' }}>
          {animalB.name}
        </span>
        <span style={{ fontSize: '1.5rem' }}>{animalB.emoji}</span>
      </div>

      {/* Rating row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        marginBottom: '0.85rem', justifyContent: 'center', flexWrap: 'wrap',
      }}>
        <StarRow stars={compat.stars} />
        <span style={{
          fontFamily: FONT_SANS, fontSize: '0.82rem', fontWeight: 500,
          color,
          padding: '2px 10px',
          background: 'rgba(255,255,255,0.6)',
          border: `1px solid ${border}`,
          borderRadius: '20px',
        }}>
          {compat.label}
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontFamily: FONT_SANS,
        fontSize: '0.9rem',
        color: '#4a3f38',
        lineHeight: 1.75,
        textAlign: 'center',
      }}>
        {compat.description}
      </p>
    </div>
  );
}

/* ─── Browse Grid ─────────────────────────────────────────────────────────── */

function BrowseGrid() {
  const animals = [
    { key: 'rat',     emoji: '🐀', name: 'Rat',     years: '2020, 2008, 1996' },
    { key: 'ox',      emoji: '🐂', name: 'Ox',      years: '2021, 2009, 1997' },
    { key: 'tiger',   emoji: '🐅', name: 'Tiger',   years: '2022, 2010, 1998' },
    { key: 'rabbit',  emoji: '🐇', name: 'Rabbit',  years: '2023, 2011, 1999' },
    { key: 'dragon',  emoji: '🐉', name: 'Dragon',  years: '2024, 2012, 2000' },
    { key: 'snake',   emoji: '🐍', name: 'Snake',   years: '2025, 2013, 2001' },
    { key: 'horse',   emoji: '🐎', name: 'Horse',   years: '2026, 2014, 2002' },
    { key: 'goat',    emoji: '🐐', name: 'Goat',    years: '2027, 2015, 2003' },
    { key: 'monkey',  emoji: '🐒', name: 'Monkey',  years: '2028, 2016, 2004' },
    { key: 'rooster', emoji: '🐓', name: 'Rooster', years: '2029, 2017, 2005' },
    { key: 'dog',     emoji: '🐕', name: 'Dog',     years: '2030, 2018, 2006' },
    { key: 'pig',     emoji: '🐖', name: 'Pig',     years: '2031, 2019, 2007' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(108px, 1fr))',
      gap: '6px',
    }}>
      {animals.map(a => (
        <Link key={a.key} href={`/zodiac/${a.key}`} style={{ textDecoration: 'none' }}>
          <div
            style={{
              textAlign: 'center', padding: '14px 8px', cursor: 'pointer',
              borderRadius: '8px', border: '1px solid transparent',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#e5dfd7';
              e.currentTarget.style.background = '#ffffff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <div style={{ fontSize: '1.75rem', marginBottom: '5px' }}>{a.emoji}</div>
            <div style={{ fontFamily: FONT_SANS, color: '#2d2926', fontSize: '0.75rem', fontWeight: 500, marginBottom: '2px' }}>
              {a.name}
            </div>
            <div style={{ color: '#b8aea6', fontSize: '0.62rem' }}>{a.years}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
