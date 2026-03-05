'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { calculate, CalculationResult, getZodiacKey, getYearElement } from '@/lib/calculateZodiac';
import { getZodiacData, ZodiacAnimal } from '@/lib/zodiacData';
import { getCompatibility, CompatResult } from '@/lib/compatibility';
import ZodiacDisplay from '@/components/ZodiacDisplay';
import SiteFooter from '@/components/SiteFooter';

const FONT_DISPLAY = '"Playfair Display", Georgia, serif';
const FONT_SANS = 'Inter, system-ui, sans-serif';

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_ZODIAC_KEY = getZodiacKey(CURRENT_YEAR);
const CURRENT_ELEMENT = getYearElement(CURRENT_YEAR);
const CURRENT_ANIMAL_DATA = getZodiacData(CURRENT_ZODIAC_KEY);

type AmbiguousResult = { ambiguous: true; year: number };

interface CompatState {
  result: CompatResult;
  animal: ZodiacAnimal;
}

// Year dropdown options: current year down to 1924
const YEAR_OPTIONS: number[] = [];
for (let y = CURRENT_YEAR; y >= 1924; y--) YEAR_OPTIONS.push(y);

// Browse grid: 5 recent years per animal
function getYearsStr(offset: number): string {
  const years: number[] = [];
  for (let y = 1900 + offset; y <= CURRENT_YEAR; y += 12) {
    if (y >= 1960) years.push(y);
  }
  return years.slice(-5).join(', ');
}

export default function HomePage() {
  const [input, setInput] = useState('');
  const [yearDrop, setYearDrop] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [ambiguous, setAmbiguous] = useState<AmbiguousResult | null>(null);

  const [compatInput, setCompatInput] = useState('');
  const [compatState, setCompatState] = useState<CompatState | null>(null);
  const [compatError, setCompatError] = useState('');
  const [compatAmbiguous, setCompatAmbiguous] = useState<AmbiguousResult | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Read ?year= param on mount and auto-calculate
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('year');
    if (q) {
      setInput(q);
      if (/^\d{4}$/.test(q.trim())) setYearDrop(q.trim());
      runCalculation(q, false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function runCalculation(val: string, updateUrl = true) {
    setErrorMsg('');
    setAmbiguous(null);
    setCompatState(null);
    setCompatError('');
    setCompatAmbiguous(null);
    setCompatInput('');

    const res = calculate(val);

    if ('error' in res) {
      setErrorMsg(res.error);
      setResult(null);
    } else if ('ambiguous' in res) {
      setAmbiguous(res as AmbiguousResult);
      setResult(null);
    } else {
      setResult(res as CalculationResult);
      if (updateUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set('year', val.trim());
        window.history.replaceState({}, '', url.toString());
      }
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  }

  function handleDropdownChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    setYearDrop(val);
    if (val) {
      setInput(val);
      runCalculation(val);
    }
  }

  function handleCalculate() {
    if (!input.trim()) {
      setErrorMsg('Please enter your birth year or full date of birth.');
      return;
    }
    runCalculation(input.trim());
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
    setYearDrop('');
    const url = new URL(window.location.href);
    url.searchParams.delete('year');
    window.history.replaceState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const zodiacData = result ? getZodiacData(result.zodiacKey) : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

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
        padding: result ? '0 20px 36px' : '0 20px 48px',
        maxWidth: '520px',
        margin: '0 auto',
        transition: 'padding 0.3s ease',
      }}>
        {/* Primary: year dropdown */}
        <label
          htmlFor="yearDropdown"
          style={{
            display: 'block',
            fontFamily: FONT_SANS,
            fontSize: '0.88rem',
            fontWeight: 500,
            color: '#2d2926',
            marginBottom: '10px',
          }}
        >
          Select your birth year
        </label>
        <select
          id="yearDropdown"
          className="zodiac-input"
          style={{ maxWidth: '240px', width: '100%', cursor: 'pointer', display: 'block', margin: '0 auto 18px' }}
          value={yearDrop}
          onChange={handleDropdownChange}
          aria-label="Select birth year"
        >
          <option value="">Select year…</option>
          {YEAR_OPTIONS.map(y => (
            <option key={y} value={String(y)}>{y}</option>
          ))}
        </select>

        {/* Secondary: full date text input */}
        <p style={{
          fontFamily: FONT_SANS,
          color: '#b8aea6',
          fontSize: '0.78rem',
          marginBottom: '8px',
        }}>
          or type a full date for CNY precision
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            id="birthInput"
            type="text"
            className="zodiac-input"
            style={{ maxWidth: '240px' }}
            placeholder="e.g. 15 Jan 1990"
            value={input}
            onChange={e => { setInput(e.target.value); setYearDrop(''); }}
            onKeyDown={handleKeyDown}
            aria-label="Full date of birth"
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

      {/* ── Current year hero callout ── */}
      {!result && CURRENT_ANIMAL_DATA && (
        <div style={{ maxWidth: '520px', margin: '0 auto 2.5rem', padding: '0 20px' }}>
          <Link href={`/zodiac/${CURRENT_ZODIAC_KEY}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div
              style={{
                background: '#fdf6ee',
                border: '1px solid #e8d9c8',
                borderLeft: '4px solid #8b5a2b',
                borderRadius: '8px',
                padding: '1.1rem 1.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                cursor: 'pointer',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#f7ece0';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(139,90,43,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#fdf6ee';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontSize: '2.2rem', lineHeight: 1, flexShrink: 0 }}>
                {CURRENT_ANIMAL_DATA.emoji}
              </span>
              <div style={{ textAlign: 'left' }}>
                <p style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#2d2926',
                  marginBottom: '3px',
                }}>
                  {CURRENT_YEAR} — Year of the {CURRENT_ELEMENT} {CURRENT_ANIMAL_DATA.name}
                </p>
                <p style={{
                  fontFamily: FONT_SANS,
                  fontSize: '0.82rem',
                  color: '#7a6f65',
                  lineHeight: 1.5,
                }}>
                  {CURRENT_ANIMAL_DATA.description}
                </p>
              </div>
            </div>
          </Link>
        </div>
      )}

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
            compatSection={
              <CompatChecker
                primaryAnimal={zodiacData}
                compatInput={compatInput}
                setCompatInput={setCompatInput}
                compatError={compatError}
                compatAmbiguous={compatAmbiguous}
                compatState={compatState}
                onCalc={handleCompatCalc}
                onKeyDown={handleCompatKeyDown}
              />
            }
          />

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
      <SiteFooter />
    </div>
  );
}

/* ─── Compatibility Checker ──────────────────────────────────────────────── */

interface CompatCheckerProps {
  primaryAnimal: ZodiacAnimal;
  compatInput: string;
  setCompatInput: (v: string) => void;
  compatError: string;
  compatAmbiguous: { ambiguous: true; year: number } | null;
  compatState: CompatState | null;
  onCalc: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

function CompatChecker({
  primaryAnimal, compatInput, setCompatInput,
  compatError, compatAmbiguous, compatState,
  onCalc, onKeyDown,
}: CompatCheckerProps) {
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '2rem 1.25rem 0.5rem' }}>
      <div style={{
        background: '#fdf6ee',
        border: '1px solid #e8d9c8',
        borderLeft: '4px solid #8b5a2b',
        borderRadius: '8px',
        padding: '1.75rem 2rem',
      }}>
        <h2 style={{
          fontFamily: FONT_DISPLAY,
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#2d2926',
          marginBottom: '4px',
        }}>
          Check Compatibility
        </h2>
        <p style={{
          fontFamily: FONT_SANS,
          fontSize: '0.82rem',
          color: '#7a6f65',
          marginBottom: '1.25rem',
        }}>
          Compare {primaryAnimal.name}&apos;s compatibility with another sign
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="zodiac-input"
            style={{ maxWidth: '240px', background: '#ffffff' }}
            placeholder="e.g. 1988 or 3 Mar 1988"
            value={compatInput}
            onChange={e => setCompatInput(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Second person's birth year or date"
          />
          <button className="btn-primary" onClick={onCalc}>
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
            animalA={primaryAnimal}
            animalB={compatState.animal}
            compat={compatState.result}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Compatibility Result Card ──────────────────────────────────────────── */

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

const RATING_ICON: Record<string, string> = {
  excellent:   '✓',
  strong:      '✓',
  neutral:     '·',
  difficult:   '✗',
  challenging: '✗',
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
  const icon   = RATING_ICON[compat.rating];

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
        gap: '10px', marginBottom: '1rem', flexWrap: 'wrap',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', lineHeight: 1, marginBottom: '2px' }}>{animalA.emoji}</div>
          <div style={{ fontFamily: FONT_SANS, fontSize: '0.78rem', color: '#7a6f65' }}>{animalA.name}</div>
        </div>
        <span style={{ fontFamily: FONT_SANS, color: '#b8aea6', fontSize: '1.2rem', padding: '0 4px' }}>&amp;</span>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', lineHeight: 1, marginBottom: '2px' }}>{animalB.emoji}</div>
          <div style={{ fontFamily: FONT_SANS, fontSize: '0.78rem', color: '#7a6f65' }}>{animalB.name}</div>
        </div>
      </div>

      {/* Label + stars */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        marginBottom: '0.85rem', justifyContent: 'center', flexWrap: 'wrap',
      }}>
        <StarRow stars={compat.stars} />
        <span style={{
          fontFamily: FONT_SANS, fontSize: '0.85rem', fontWeight: 600,
          color,
          padding: '3px 12px',
          background: 'rgba(255,255,255,0.7)',
          border: `1px solid ${border}`,
          borderRadius: '20px',
        }}>
          {icon} {compat.label}
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

/* ─── Browse Grid ────────────────────────────────────────────────────────── */

const BROWSE_ANIMALS = [
  { key: 'rat',     emoji: '🐀', name: 'Rat',     offset: 0  },
  { key: 'ox',      emoji: '🐂', name: 'Ox',      offset: 1  },
  { key: 'tiger',   emoji: '🐅', name: 'Tiger',   offset: 2  },
  { key: 'rabbit',  emoji: '🐇', name: 'Rabbit',  offset: 3  },
  { key: 'dragon',  emoji: '🐉', name: 'Dragon',  offset: 4  },
  { key: 'snake',   emoji: '🐍', name: 'Snake',   offset: 5  },
  { key: 'horse',   emoji: '🐎', name: 'Horse',   offset: 6  },
  { key: 'goat',    emoji: '🐐', name: 'Goat',    offset: 7  },
  { key: 'monkey',  emoji: '🐒', name: 'Monkey',  offset: 8  },
  { key: 'rooster', emoji: '🐓', name: 'Rooster', offset: 9  },
  { key: 'dog',     emoji: '🐕', name: 'Dog',     offset: 10 },
  { key: 'pig',     emoji: '🐖', name: 'Pig',     offset: 11 },
];

function BrowseGrid() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: '6px',
      maxWidth: '720px',
      margin: '0 auto',
    }}>
      {BROWSE_ANIMALS.map(a => (
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
            <div style={{ fontFamily: FONT_SANS, color: '#2d2926', fontSize: '0.75rem', fontWeight: 500, marginBottom: '3px' }}>
              {a.name}
            </div>
            <div style={{ color: '#b8aea6', fontSize: '0.6rem', lineHeight: 1.5 }}>
              {getYearsStr(a.offset)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

