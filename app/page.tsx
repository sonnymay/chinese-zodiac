'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { calculate, CalculationResult } from '@/lib/calculateZodiac';
import { getZodiacData } from '@/lib/zodiacData';
import ZodiacDisplay from '@/components/ZodiacDisplay';
import ClientParticle from '@/components/ClientParticle';

const FONT_CINZEL = '"Cinzel Decorative", serif';
const FONT_CORMORANT = '"Cormorant Garamond", Georgia, serif';

type AmbiguousResult = { ambiguous: true; year: number };

export default function HomePage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [ambiguous, setAmbiguous] = useState<AmbiguousResult | null>(null);
  const [showBirthdayNote, setShowBirthdayNote] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  function handleCalculate() {
    if (!input.trim()) {
      setErrorMsg('Please enter your birth year or full date of birth.');
      return;
    }
    setErrorMsg('');
    setAmbiguous(null);

    const res = calculate(input);

    if ('error' in res) {
      setErrorMsg(res.error);
      setResult(null);
    } else if ('ambiguous' in res) {
      setAmbiguous(res as AmbiguousResult);
      setResult(null);
    } else {
      setResult(res as CalculationResult);
      setShowBirthdayNote((res as CalculationResult).yearOnly);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleCalculate();
  }

  function reset() {
    setResult(null);
    setErrorMsg('');
    setAmbiguous(null);
    setInput('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const zodiacData = result ? getZodiacData(result.zodiacKey) : null;

  return (
    <>
      <ClientParticle />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <header style={{ textAlign: 'center', padding: 'clamp(40px, 8vh, 80px) 20px 30px' }}>

          <p style={{
            fontFamily: FONT_CORMORANT,
            color: '#c9a84c',
            fontSize: '0.95rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginBottom: '12px',
            opacity: 0.85,
            animation: 'goldShimmer 3s ease-in-out infinite',
          }}>
            ✦ Ancient Wisdom · Modern Revelation ✦
          </p>

          <h1 style={{
            fontFamily: FONT_CINZEL,
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            color: '#c9a84c',
            textShadow: '0 0 50px rgba(201,168,76,0.35), 0 2px 4px rgba(0,0,0,0.8)',
            letterSpacing: '0.05em',
            lineHeight: 1.15,
            marginBottom: '10px',
          }}>
            Chinese Animal Year
          </h1>

          <p style={{
            fontFamily: FONT_CORMORANT,
            color: '#c4a882',
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            fontStyle: 'italic',
            letterSpacing: '0.12em',
          }}>
            Discover Your Zodiac Destiny
          </p>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            maxWidth: '400px', margin: '20px auto',
          }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4))' }} />
            <span style={{ color: '#c9a84c', fontSize: '1.4rem' }}>龍</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(201,168,76,0.4), transparent)' }} />
          </div>

          <div style={{
            display: 'flex', justifyContent: 'center', gap: '6px',
            flexWrap: 'wrap', opacity: 0.4, marginBottom: '4px',
          }}>
            {['🐀','🐂','🐅','🐇','🐉','🐍','🐎','🐐','🐒','🐓','🐕','🐖'].map((e, i) => (
              <span key={i} style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>{e}</span>
            ))}
          </div>
        </header>

        {/* ── Calculator input ── */}
        <section style={{
          textAlign: 'center',
          padding: '10px 20px 50px',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          <label
            htmlFor="birthInput"
            style={{
              display: 'block',
              fontFamily: FONT_CORMORANT,
              fontSize: '1.15rem',
              color: '#e8d5a3',
              letterSpacing: '0.08em',
              marginBottom: '14px',
            }}
          >
            Enter your birth year or date of birth
          </label>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              id="birthInput"
              type="text"
              className="zodiac-input"
              style={{ maxWidth: '310px' }}
              placeholder="e.g. 1990  or  15 Jan 1990"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Birth year or full date of birth"
            />
            <button className="btn-primary" onClick={handleCalculate}>
              Reveal My Sign
            </button>
          </div>

          <p style={{ color: 'rgba(196,168,130,0.45)', fontSize: '0.82rem', marginTop: '10px', fontStyle: 'italic' }}>
            Accepts: 1990 &nbsp;·&nbsp; Jan 15 1990 &nbsp;·&nbsp; 1990-01-15 &nbsp;·&nbsp; 15/01/1990
          </p>

          {errorMsg && (
            <p style={{
              color: '#fca5a5', fontSize: '0.95rem', marginTop: '12px',
              padding: '10px 16px',
              background: 'rgba(220,38,38,0.08)',
              border: '1px solid rgba(220,38,38,0.2)',
              borderRadius: '4px',
            }}>
              {errorMsg}
            </p>
          )}

          {ambiguous && (
            <div style={{
              marginTop: '14px', padding: '16px 20px',
              background: 'rgba(201,168,76,0.07)',
              border: '1px solid rgba(139,105,20,0.4)',
              borderRadius: '6px', textAlign: 'left',
            }}>
              <p style={{ color: '#e8d5a3', lineHeight: 1.7, fontSize: '0.95rem' }}>
                ⚠ We don&apos;t have a Chinese New Year date stored for <strong>{ambiguous.year}</strong>.
                For a precise result, please enter your full date (e.g. <em>15 Feb {ambiguous.year}</em>).
              </p>
            </div>
          )}
        </section>

        {/* ── Results ── */}
        {result && zodiacData && (
          <div
            ref={resultsRef}
            style={{
              animation: 'revealUp 0.8s ease forwards',
              maxWidth: '960px',
              margin: '0 auto',
              padding: '0 0 60px',
            }}
          >
            {showBirthdayNote && (
              <div style={{
                maxWidth: '640px', margin: '0 auto 1.5rem',
                padding: '11px 18px',
                background: 'rgba(201,168,76,0.07)',
                border: '1px solid rgba(201,168,76,0.18)',
                borderRadius: '4px', textAlign: 'center',
              }}>
                <p style={{ color: '#c4a882', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  ✦ If you were born in <strong>January or February</strong>, your sign may differ —
                  enter your full date for a precise result.
                </p>
              </div>
            )}

            {result.beforeCNY && result.parsedDate && (
              <div style={{
                maxWidth: '640px', margin: '0 auto 1.5rem',
                padding: '11px 18px',
                background: 'rgba(201,168,76,0.07)',
                border: '1px solid rgba(201,168,76,0.18)',
                borderRadius: '4px', textAlign: 'center',
              }}>
                <p style={{ color: '#c4a882', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  ✦ You were born <em>before</em> Chinese New Year {result.birthYear}, so your
                  zodiac year is <strong>{result.zodiacYear}</strong>.
                </p>
              </div>
            )}

            <ZodiacDisplay
              animal={zodiacData}
              yearElement={result.yearElement}
              zodiacYear={result.zodiacYear}
            />

            <div style={{
              textAlign: 'center', padding: '1rem',
              display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap',
            }}>
              <Link
                href={`/zodiac/${result.zodiacKey}`}
                style={{
                  display: 'inline-block',
                  padding: '11px 26px',
                  background: 'rgba(201,168,76,0.07)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  borderRadius: '4px',
                  color: '#c9a84c',
                  textDecoration: 'none',
                  fontFamily: FONT_CORMORANT,
                  fontSize: '1rem',
                  letterSpacing: '0.1em',
                }}
              >
                View Full Profile →
              </Link>
              <button
                onClick={reset}
                style={{
                  padding: '11px 22px',
                  background: 'transparent',
                  border: '1px solid rgba(201,168,76,0.18)',
                  borderRadius: '4px',
                  color: '#c4a882',
                  cursor: 'pointer',
                  fontFamily: FONT_CORMORANT,
                  fontSize: '1rem',
                  letterSpacing: '0.1em',
                }}
              >
                ↩ Calculate Again
              </button>
            </div>
          </div>
        )}

        {/* ── Browse all ── */}
        {!result && (
          <section style={{ padding: '0 20px 80px', maxWidth: '820px', margin: '0 auto' }}>
            <div className="gold-divider">
              <span style={{ color: '#c9a84c', opacity: 0.45, fontSize: '1rem' }}>✦</span>
            </div>
            <p style={{
              textAlign: 'center',
              fontSize: '0.73rem', letterSpacing: '0.25em',
              color: 'rgba(201,168,76,0.5)',
              textTransform: 'uppercase', marginBottom: '1.5rem',
            }}>
              Or browse directly
            </p>
            <BrowseGrid />
          </section>
        )}

        {/* ── Footer ── */}
        <footer style={{
          textAlign: 'center', padding: '24px 20px',
          borderTop: '1px solid rgba(201,168,76,0.1)',
          color: 'rgba(196,168,130,0.3)',
          fontSize: '0.78rem', letterSpacing: '0.08em',
        }}>
          Chinese Animal Year · Crafted with Ancient Wisdom · {new Date().getFullYear()}
        </footer>
      </div>
    </>
  );
}

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
      gridTemplateColumns: 'repeat(auto-fill, minmax(116px, 1fr))',
      gap: '12px',
    }}>
      {animals.map(a => (
        <Link key={a.key} href={`/zodiac/${a.key}`} style={{ textDecoration: 'none' }}>
          <div
            className="east-card"
            style={{ textAlign: 'center', padding: '16px 8px', cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '5px' }}>{a.emoji}</div>
            <div style={{
              fontFamily: FONT_CINZEL,
              color: '#c9a84c', fontSize: '0.72rem', letterSpacing: '0.06em', marginBottom: '3px',
            }}>
              {a.name}
            </div>
            <div style={{ color: 'rgba(196,168,130,0.4)', fontSize: '0.62rem' }}>{a.years}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
