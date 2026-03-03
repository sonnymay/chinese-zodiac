import Link from 'next/link';
import { ZodiacAnimal, ANIMAL_EMOJIS, ELEMENT_COLORS } from '@/lib/zodiacData';
import { getRecentYears, YearElement } from '@/lib/calculateZodiac';

const FONT_CINZEL = '"Cinzel Decorative", serif';
const FONT_CORMORANT = '"Cormorant Garamond", Georgia, serif';

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

export default function ZodiacDisplay({ animal, yearElement, zodiacYear, showBackLink, compact }: Props) {
  const years = getRecentYears(animal.key);
  const elementColor = ELEMENT_COLORS[animal.element];
  const yearElemColor = yearElement ? ELEMENT_COLORS[yearElement] : null;

  return (
    <article style={{ position: 'relative', zIndex: 1 }}>

      {showBackLink && (
        <div style={{ textAlign: 'center', paddingTop: '2rem', marginBottom: '1rem' }}>
          <Link
            href="/"
            style={{
              color: 'rgba(201,168,76,0.65)',
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            ← Back to Calculator
          </Link>
        </div>
      )}

      {/* ── Hero ── */}
      <section style={{ textAlign: 'center', padding: '3rem 1rem 2rem' }}>
        <div
          style={{
            fontSize: 'clamp(90px, 15vw, 140px)',
            lineHeight: 1,
            marginBottom: '1.2rem',
            display: 'block',
            filter: 'drop-shadow(0 0 30px rgba(201,168,76,0.45))',
            animation: 'floatY 4s ease-in-out infinite',
          }}
          aria-hidden="true"
        >
          {animal.emoji}
        </div>

        <p style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          color: '#c9a84c',
          marginBottom: '0.2rem',
          fontFamily: FONT_CINZEL,
          letterSpacing: '0.05em',
        }}>
          {animal.chinese}
        </p>

        <h1 style={{
          fontFamily: FONT_CINZEL,
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: '#f5efe0',
          textShadow: '0 0 30px rgba(255,255,255,0.12)',
          letterSpacing: '0.08em',
          marginBottom: '0.4rem',
        }}>
          The {animal.name}
        </h1>

        <p style={{ color: '#c4a882', fontSize: '1rem', letterSpacing: '0.12em', marginBottom: '1.2rem' }}>
          {animal.pinyin} · {animal.yinYang} · {animal.element} Element
        </p>

        {/* Element + Year Element badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 20px',
            borderRadius: '20px',
            border: `1px solid ${elementColor}55`,
            color: elementColor,
            fontSize: '0.9rem',
            letterSpacing: '0.12em',
            background: `${elementColor}11`,
          }}>
            {ELEMENT_SYMBOLS[animal.element]} {animal.element} Sign
          </span>

          {yearElement && zodiacYear && (
            <span style={{
              display: 'inline-block',
              padding: '6px 20px',
              borderRadius: '20px',
              border: `1px solid ${yearElemColor ?? elementColor}55`,
              color: yearElemColor ?? '#c9a84c',
              fontSize: '0.9rem',
              letterSpacing: '0.12em',
              background: `${yearElemColor ?? elementColor}11`,
            }}>
              {ELEMENT_SYMBOLS[yearElement]} {yearElement} {animal.name} ({zodiacYear})
            </span>
          )}
        </div>

        {/* Recent years */}
        <p style={{ color: 'rgba(196,168,130,0.5)', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
          Recent years: {years.join(' · ')}
        </p>
      </section>

      {/* ── Divider ── */}
      <Divider />

      {/* ── Description ── */}
      {!compact && (
        <section style={{ maxWidth: '700px', margin: '0 auto 2rem', padding: '0 1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.85, color: '#c4a882', fontStyle: 'italic' }}>
            {animal.description}
          </p>
        </section>
      )}

      {/* ── Info grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
        gap: '1.25rem',
        padding: '0 1rem 1rem',
        maxWidth: '960px',
        margin: '0 auto',
      }}>

        {/* Element description */}
        <InfoCard title="Element & Nature" icon="☯">
          <p style={{ color: elementColor, fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            {ELEMENT_SYMBOLS[animal.element]} {animal.element}
          </p>
          <p style={{ color: '#c4a882', lineHeight: 1.75, fontSize: '0.97rem', fontStyle: 'italic' }}>
            {animal.elementDesc}
          </p>
        </InfoCard>

        {/* Personality — spans 2 rows */}
        <InfoCard title="Personality Traits" icon="✦" style={{ gridRow: 'span 2' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {animal.traits.map((trait, i) => (
              <li key={i} style={{
                padding: '7px 0 7px 22px',
                position: 'relative',
                borderBottom: i < animal.traits.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                color: '#f5efe0',
                fontSize: '1rem',
                lineHeight: 1.5,
              }}>
                <span style={{ position: 'absolute', left: 0, color: '#c9a84c', fontSize: '0.65rem', top: '10px' }}>✦</span>
                {trait}
              </li>
            ))}
          </ul>
        </InfoCard>

        {/* Lucky Colors */}
        <InfoCard title="Lucky Colors" icon="◈">
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            {animal.luckyColors.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: 30, height: 30,
                  borderRadius: '50%',
                  backgroundColor: c.hex,
                  border: '2px solid rgba(255,255,255,0.18)',
                  boxShadow: `0 0 10px ${c.hex}55`,
                  flexShrink: 0,
                }} />
                <span style={{ color: '#c4a882', fontSize: '0.9rem' }}>{c.name}</span>
              </div>
            ))}
          </div>
        </InfoCard>

        {/* Lucky Numbers */}
        <InfoCard title="Lucky Numbers" icon="◎">
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {animal.luckyNumbers.map(n => (
              <div key={n} className="lucky-number-badge">{n}</div>
            ))}
          </div>
        </InfoCard>

        {/* Lucky Flowers & Gems */}
        <InfoCard title="Lucky Flowers & Gems" icon="❧">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <span style={{ color: '#c9a84c', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Flowers
              </span>
              <p style={{ color: '#f5efe0', marginTop: '2px' }}>{animal.luckyFlowers}</p>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '8px' }}>
              <span style={{ color: '#c9a84c', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Gemstones
              </span>
              <p style={{ color: '#f5efe0', marginTop: '2px' }}>{animal.luckyGems}</p>
            </div>
          </div>
        </InfoCard>

        {/* Compatible */}
        <InfoCard title="Best Matches ♥" icon="♡">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {animal.compatible.map(key => (
              <Link key={key} href={`/zodiac/${key}`} style={{ textDecoration: 'none' }}>
                <div className="animal-chip compatible">
                  <span style={{ fontSize: '1.3em' }}>{ANIMAL_EMOJIS[key]}</span>
                  <span style={{ textTransform: 'capitalize' }}>{key}</span>
                </div>
              </Link>
            ))}
          </div>
        </InfoCard>

        {/* Incompatible */}
        <InfoCard title="Clash Signs ⚡" icon="⚡">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {animal.incompatible.map(key => (
              <Link key={key} href={`/zodiac/${key}`} style={{ textDecoration: 'none' }}>
                <div className="animal-chip incompatible">
                  <span style={{ fontSize: '1.3em' }}>{ANIMAL_EMOJIS[key]}</span>
                  <span style={{ textTransform: 'capitalize' }}>{key}</span>
                </div>
              </Link>
            ))}
          </div>
        </InfoCard>

        {/* Famous People — full width */}
        <InfoCard title="Famous Souls" icon="★" style={{ gridColumn: '1 / -1' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '10px',
          }}>
            {animal.famous.map((person, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                padding: '8px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '4px',
                border: '1px solid rgba(201,168,76,0.1)',
              }}>
                <span style={{ color: '#c9a84c', fontSize: '1rem', marginTop: '1px', flexShrink: 0 }}>✦</span>
                <div>
                  <p style={{ color: '#f5efe0', fontSize: '0.95rem', lineHeight: 1.3 }}>{person.name}</p>
                  <p style={{ color: 'rgba(107,80,14,0.9)', fontSize: '0.8rem' }}>{person.born}</p>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* ── 2026 Forecast ── */}
      <Divider />

      <section style={{ maxWidth: '800px', margin: '0 auto 3rem', padding: '0 1rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(139,0,0,0.15), rgba(201,168,76,0.05))',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '8px',
          padding: '2rem 2.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative corner glyphs */}
          <span style={{
            position: 'absolute', top: 12, left: 16,
            color: 'rgba(201,168,76,0.12)', fontSize: '2rem',
            fontFamily: FONT_CINZEL,
          }}>龍</span>
          <span style={{
            position: 'absolute', bottom: 12, right: 16,
            color: 'rgba(201,168,76,0.12)', fontSize: '2rem',
            fontFamily: FONT_CINZEL,
          }}>馬</span>

          <h2 style={{
            fontFamily: FONT_CINZEL,
            fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
            color: '#c9a84c',
            textAlign: 'center',
            marginBottom: '1.2rem',
            letterSpacing: '0.08em',
          }}>
            🐎 2026 — Year of the Fire Horse
          </h2>

          <p style={{
            lineHeight: 2,
            fontSize: '1.07rem',
            color: '#c4a882',
            fontStyle: 'italic',
            textAlign: 'justify',
          }}>
            {animal.forecast2026}
          </p>
        </div>
      </section>

      {/* ── All Animals Reference ── */}
      {!compact && (
        <>
          <Divider />
          <section style={{ textAlign: 'center', padding: '1rem 1rem 3rem' }}>
            <p style={{
              fontSize: '0.73rem',
              letterSpacing: '0.25em',
              color: 'rgba(201,168,76,0.55)',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              Explore All Twelve Animals
            </p>
            <AllAnimalsRow active={animal.key} />
          </section>
        </>
      )}
    </article>
  );
}

/* ─── Sub-components ─── */

function InfoCard({
  title, icon, children, style,
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="east-card" style={{ padding: '1.4rem 1.6rem', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
        {icon && <span style={{ color: '#c9a84c', fontSize: '0.85rem' }}>{icon}</span>}
        <span style={{
          fontSize: '0.72rem',
          letterSpacing: '0.2em',
          color: '#c9a84c',
          textTransform: 'uppercase',
          flex: 1,
        }}>
          {title}
        </span>
        <div style={{
          flex: 2,
          height: '1px',
          background: 'linear-gradient(90deg, rgba(201,168,76,0.25), transparent)',
        }} />
      </div>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div className="gold-divider" style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <span style={{ color: '#c9a84c', fontSize: '1.1rem', opacity: 0.6 }}>✦</span>
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
      gap: '8px',
      flexWrap: 'wrap',
      maxWidth: '700px',
      margin: '0 auto',
    }}>
      {animals.map(a => (
        <Link key={a.key} href={`/zodiac/${a.key}`} style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 10px',
            borderRadius: '6px',
            transition: 'opacity 0.25s, background 0.25s',
            opacity: a.key === active ? 1 : 0.5,
            background: a.key === active ? 'rgba(201,168,76,0.08)' : 'transparent',
            border: a.key === active ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent',
          }}>
            <span style={{ fontSize: '1.6rem' }}>{a.emoji}</span>
            <span style={{
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
              color: '#c9a84c',
              textTransform: 'uppercase',
            }}>
              {a.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
