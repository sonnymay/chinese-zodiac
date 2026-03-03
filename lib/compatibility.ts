import { ZodiacKey } from './zodiacData';

export type CompatRating = 'excellent' | 'strong' | 'neutral' | 'difficult' | 'challenging';

export interface CompatResult {
  rating: CompatRating;
  stars: number; // 1–5
  label: string;
  description: string;
}

// ── Six Harmonious Pairs (六合, Liú hé) ──────────────────────────────────────
const HARMONIOUS_DESC: Partial<Record<string, string>> = {
  'rat-ox':
    "Rat and Ox are a natural team. The Rat comes up with ideas; the Ox has the patience and follow-through to make them happen. They balance each other well and tend to build something solid together.",
  'tiger-pig':
    "Tiger and Pig complement each other well. The Tiger brings confidence and drive; the Pig brings warmth and support. Together they tend to be braver and kinder than they are on their own.",
  'rabbit-dog':
    "Rabbit and Dog want the same things from a relationship: loyalty, stability, and a peaceful home. The Dog's protectiveness puts the Rabbit at ease; the Rabbit's calm helps the Dog relax.",
  'dragon-rooster':
    "Dragon and Rooster work well together. The Dragon has the vision; the Rooster has the precision to execute it. Each respects what the other brings, and they tend to accomplish a lot as a pair.",
  'snake-monkey':
    "Snake and Monkey make a sharp, stimulating pair. The Snake thinks deeply; the Monkey thinks quickly. They keep each other interested and tend to push each other further than they'd go alone.",
  'horse-goat':
    "Horse and Goat are an easy, natural fit. Both value freedom and enjoy life at their own pace. They give each other space without it feeling like distance, and rarely run out of things to enjoy together.",
};

// ── Three Harmony Trines (三合, Sān hé) ─────────────────────────────────────
const TRINES: ZodiacKey[][] = [
  ['rat', 'dragon', 'monkey'],
  ['ox', 'snake', 'rooster'],
  ['tiger', 'horse', 'dog'],
  ['rabbit', 'goat', 'pig'],
];

// ── Six Clash Pairs (六冲, Liú chōng) ───────────────────────────────────────
const CLASH_DESC: Partial<Record<string, string>> = {
  'rat-horse':
    "Rat and Horse are opposing signs. Both are independent and like doing things their own way, which creates friction. It can work, but it takes a lot of give and take — neither should expect the other to simply fall in line.",
  'ox-goat':
    "Ox and Goat move at different speeds and care about different things. The Ox wants structure and consistency; the Goat wants flexibility and room to feel. Patience with each other's very different approaches is the key.",
  'tiger-monkey':
    "Tiger and Monkey tend to compete. The Tiger is direct and forceful; the Monkey prefers to outthink and outmanoeuvre. Genuine mutual respect — not just tolerance — is what makes this work.",
  'rabbit-rooster':
    "Rabbit and Rooster can rub each other the wrong way. The Rabbit is sensitive and avoids conflict; the Rooster is blunt and exacting. Both care about doing things well, and that shared value is the best place to start.",
  'dragon-dog':
    "Dragon and Dog are both strong-willed and confident in their own views. They can spend a lot of energy disagreeing. It works when both are genuinely willing to listen — not just wait for the other to finish talking.",
  'snake-pig':
    "Snake and Pig are quite different at their core. The Snake is guarded and deliberate; the Pig is open and trusting. It takes time to understand each other's approach, and honest communication is what gets them there.",
};

// ── Six Harm Pairs (六害, Liú hài) ──────────────────────────────────────────
const HARM_DESC: Partial<Record<string, string>> = {
  'rat-goat':
    "Rat and Goat see the world differently. The Rat is practical and analytical; the Goat is more emotional and feeling-led. It's not a natural fit, but with patience and real effort it can work.",
  'ox-horse':
    "Ox and Horse are both hardworking, but they clash on almost everything else. The Horse wants freedom and spontaneity; the Ox wants structure and routine. Both have to give ground for this to work.",
  'tiger-snake':
    "Tiger and Snake operate at different speeds. The Tiger acts fast; the Snake moves carefully and deliberately. They can find each other interesting, but trust takes time and neither should rush it.",
  'rabbit-dragon':
    "The Rabbit can find the Dragon's intensity a bit much, and the Dragon may lose patience with the Rabbit's caution. It works when the Dragon dials it back and the Rabbit steps up — both need to meet in the middle.",
  'monkey-pig':
    "Monkey's cleverness can make the Pig feel like they're being outmanoeuvred. The Pig needs honesty from the Monkey; the Monkey needs to appreciate the Pig's straightforwardness. Open communication fixes most of the friction.",
  'rooster-dog':
    "Rooster and Dog are both principled but often disagree on how things should be done. They can be critical of each other. A shared goal and genuine appreciation for what the other does well makes a real difference.",
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
      description: `Two ${cap(a)}s understand each other well — sometimes too well. You share the same strengths and the same blind spots. That can be a real bond, or it can lead to butting heads. Depends on how self-aware you each are.`,
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
      description: HARMONIOUS_DESC[key] ?? "A naturally good pairing. These signs complement each other's strengths and tend to get along without much effort.",
    };
  }

  // Three Harmony Trines
  for (const trine of TRINES) {
    if (trine.includes(a) && trine.includes(b)) {
      return {
        rating: 'strong',
        stars: 4,
        label: 'Strong Affinity',
        description: "You share the same trine in the Chinese zodiac, which means your values and personalities naturally align. You tend to understand each other without much effort and bring out each other's strengths.",
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
      description: CLASH_DESC[key] ?? "These signs are directly opposing in the Chinese zodiac. It can work, but it takes real effort, patience, and a genuine willingness to meet halfway.",
    };
  }

  // Six Harm Pairs
  const HARM = ['rat-goat','ox-horse','tiger-snake','rabbit-dragon','monkey-pig','rooster-dog'];
  if (HARM.includes(key)) {
    return {
      rating: 'difficult',
      stars: 2,
      label: 'Requires Effort',
      description: HARM_DESC[key] ?? "These signs don't naturally click. There's no major conflict, but there's a tendency to misread each other. Awareness and honest communication smooth most of the rough edges.",
    };
  }

  // Neutral
  return {
    rating: 'neutral',
    stars: 3,
    label: 'Neutral',
    description: "No special connection, no natural conflict — it depends entirely on the people involved. With good communication and mutual respect, this can grow into a strong relationship.",
  };
}
