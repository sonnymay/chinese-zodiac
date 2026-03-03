import { ZodiacKey } from './zodiacData';

export type CompatRating = 'excellent' | 'strong' | 'neutral' | 'difficult' | 'challenging';

export interface CompatResult {
  rating: CompatRating;
  stars: number; // 1–5
  label: string;
  description: string;
}

// ── Six Harmonious Pairs (六合, Liú hé) ──────────────────────────────────────
// Highest natural affinity — complementary energies.
const HARMONIOUS_DESC: Partial<Record<string, string>> = {
  'rat-ox':
    "The Rat's quick wit and the Ox's steady patience form a natural division of labour — one supplies the ideas, the other sees them through. A deeply grounding and surprisingly durable bond.",
  'tiger-pig':
    "The Tiger's boldness finds genuine warmth in the Pig's generous spirit. One brings courage; the other brings heart. Together they balance action with compassion and make each other braver.",
  'rabbit-dog':
    "Both signs prize loyalty and a peaceful home above almost everything else. The Dog's protectiveness gives the Rabbit security to thrive, while the Rabbit's gentleness soothes the Dog's anxious streak.",
  'dragon-rooster':
    "The Dragon's grand ambitions are met by the Rooster's meticulous precision. Each deeply admires what the other brings, and when they work together, they accomplish things neither could alone.",
  'snake-monkey':
    "The Snake's depth and the Monkey's inventiveness create a stimulating partnership. They keep each other endlessly curious — rarely running out of things to discover, debate, or build.",
  'horse-goat':
    "The Horse's love of freedom and the Goat's creativity feed one another perfectly. They share a taste for beauty, wandering, and open possibilities — building a warm and imaginative life.",
};

// ── Three Harmony Trines (三合, Sān hé) ─────────────────────────────────────
// Deep shared values and compatible temperaments.
const TRINES: ZodiacKey[][] = [
  ['rat', 'dragon', 'monkey'],
  ['ox', 'snake', 'rooster'],
  ['tiger', 'horse', 'dog'],
  ['rabbit', 'goat', 'pig'],
];

// ── Six Clash Pairs (六冲, Liú chōng) ───────────────────────────────────────
// Directly opposing energies — high friction by default.
const CLASH_DESC: Partial<Record<string, string>> = {
  'rat-horse':
    "Rat and Horse are direct opposites — both independent and self-willed, each convinced their way is right. The friction can generate real energy if channelled well, but it demands that neither competes for centre stage.",
  'ox-goat':
    "Ox and Goat clash in rhythm: the Ox is structured and resolute; the Goat is fluid and feeling-led. They can build something meaningful together, but it takes genuine patience from both sides.",
  'tiger-monkey':
    "Tiger and Monkey are each other's most persistent rivals. The Tiger charges forward; the Monkey outmanoeuvres. Real mutual respect — more than just tolerance — turns this rivalry into productive creative tension.",
  'rabbit-rooster':
    "The Rabbit's quiet sensitivity sits uncomfortably against the Rooster's blunt, exacting standards. Both care deeply about quality and doing things right; finding that shared ground is the key to this pairing.",
  'dragon-dog':
    "Dragon and Dog are equally stubborn and equally certain of their own worldview. They challenge each other relentlessly — which can forge growth, but only if both are genuinely willing to listen.",
  'snake-pig':
    "Snake and Pig sit at opposite poles of instinct: the Snake is calculating and guarded; the Pig is open and trusting. Honest, patient communication is essential to bridge their natural wariness of each other.",
};

// ── Six Harm Pairs (六害, Liú hài) ──────────────────────────────────────────
// Subtle, persistent friction — not a direct clash but an ongoing misalignment.
const HARM_DESC: Partial<Record<string, string>> = {
  'rat-goat':
    "Rat and Goat rarely see the world through the same lens — the Rat's pragmatism can feel cold to the Goat's emotional nature. A conscious effort to appreciate each other's very different sensibilities goes a long way.",
  'ox-horse':
    "Both Ox and Horse are hardworking, but they disagree on almost everything beyond that. The Horse craves freedom and spontaneity; the Ox craves structure and routine. Genuine compromise — not just endurance — is what makes this work.",
  'tiger-snake':
    "Tiger and Snake approach life through opposite lenses: action versus contemplation, instinct versus calculation. They can intrigue each other deeply, but slow-building trust is essential before either truly lowers their guard.",
  'rabbit-dragon':
    "The Rabbit's gentle approach can be overwhelmed by the Dragon's intensity. The Dragon must learn to soften; the Rabbit must find more confidence to step forward. When both adjust, the pairing becomes surprisingly complementary.",
  'monkey-pig':
    "The Monkey's clever manoeuvring can unsettle the Pig's open-hearted trust. The Pig may feel manipulated; the Monkey may feel underappreciated. Genuine sincerity from the Monkey changes the dynamic entirely.",
  'rooster-dog':
    "Rooster and Dog are both principled and quick to voice criticism — often of each other. Their standards rarely align on the surface, but a shared sense of purpose and honest mutual appreciation quiets most of the noise.",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const ZODIAC_ORDER = [
  'rat','ox','tiger','rabbit','dragon','snake',
  'horse','goat','monkey','rooster','dog','pig',
];

function pairKey(a: ZodiacKey, b: ZodiacKey): string {
  const ai = ZODIAC_ORDER.indexOf(a);
  const bi = ZODIAC_ORDER.indexOf(b);
  return ai <= bi ? `${a}-${b}` : `${b}-${a}`;
}

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ── Main export ───────────────────────────────────────────────────────────────

export function getCompatibility(a: ZodiacKey, b: ZodiacKey): CompatResult {
  // Same sign
  if (a === b) {
    return {
      rating: 'neutral',
      stars: 3,
      label: 'Kindred Spirits',
      description: `Two ${cap(a)}s understand each other deeply — sometimes too well. You share the same strengths, the same blind spots, and the same drives. This can be beautifully harmonious or quietly competitive depending on how well each of you knows yourself.`,
    };
  }

  const key = pairKey(a, b);

  // Six Harmonious Pairs
  const HARMONIOUS = ['rat-ox','tiger-pig','rabbit-dog','dragon-rooster','snake-monkey','horse-goat'];
  if (HARMONIOUS.includes(key)) {
    return {
      rating: 'excellent',
      stars: 5,
      label: 'Excellent Match',
      description: HARMONIOUS_DESC[key] ?? "A naturally harmonious pairing — these signs complement each other's strengths and ease each other's weaknesses with very little effort.",
    };
  }

  // Three Harmony Trines
  for (const trine of TRINES) {
    if (trine.includes(a) && trine.includes(b)) {
      return {
        rating: 'strong',
        stars: 4,
        label: 'Strong Affinity',
        description: "You share the same celestial trine — a deep-rooted kinship that makes mutual understanding come naturally. Your core values and life rhythms align, and you tend to draw out each other's best qualities without having to try.",
      };
    }
  }

  // Six Clash Pairs
  const CLASH = ['rat-horse','ox-goat','tiger-monkey','rabbit-rooster','dragon-dog','snake-pig'];
  if (CLASH.includes(key)) {
    return {
      rating: 'challenging',
      stars: 1,
      label: 'Challenging Pairing',
      description: CLASH_DESC[key] ?? "These signs sit in direct opposition in the Chinese zodiac. The tension can be turned into something productive, but it calls for real patience, self-awareness, and a genuine willingness to meet halfway.",
    };
  }

  // Six Harm Pairs
  const HARM = ['rat-goat','ox-horse','tiger-snake','rabbit-dragon','monkey-pig','rooster-dog'];
  if (HARM.includes(key)) {
    return {
      rating: 'difficult',
      stars: 2,
      label: 'Requires Effort',
      description: HARM_DESC[key] ?? "There's a persistent subtle friction between these signs — not outright conflict, but a tendency to misread each other's intentions. Awareness and honest dialogue smooth most of the rough edges over time.",
    };
  }

  // Neutral
  return {
    rating: 'neutral',
    stars: 3,
    label: 'Neutral',
    description: "No special affinity, no inherent friction — this relationship is shaped entirely by the people involved. With patience and genuine communication it can become something strong.",
  };
}
