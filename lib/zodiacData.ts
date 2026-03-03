export type Element = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';

export interface LuckyColor {
  name: string;
  hex: string;
}

export interface FamousPerson {
  name: string;
  born: string;
}

export interface ZodiacAnimal {
  key: string;
  name: string;
  emoji: string;
  chinese: string;
  pinyin: string;
  element: Element;
  elementHex: string;
  elementDesc: string;
  yinYang: 'Yin' | 'Yang';
  description: string;
  traits: string[];
  luckyColors: LuckyColor[];
  luckyNumbers: number[];
  luckyFlowers: string;
  luckyGems: string;
  compatible: string[];
  incompatible: string[];
  famous: FamousPerson[];
  forecast2026: string;
}

export const ANIMAL_EMOJIS: Record<string, string> = {
  rat: '🐀', ox: '🐂', tiger: '🐅', rabbit: '🐇',
  dragon: '🐉', snake: '🐍', horse: '🐎', goat: '🐐',
  monkey: '🐒', rooster: '🐓', dog: '🐕', pig: '🐖',
};

export const ELEMENT_COLORS: Record<Element, string> = {
  Wood: '#4ade80',
  Fire: '#f97316',
  Earth: '#d97706',
  Metal: '#94a3b8',
  Water: '#38bdf8',
};

export const ZODIAC_ORDER = [
  'rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake',
  'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig',
] as const;

export type ZodiacKey = typeof ZODIAC_ORDER[number];

const ZODIAC_MAP: Record<ZodiacKey, ZodiacAnimal> = {
  rat: {
    key: 'rat',
    name: 'Rat',
    emoji: '🐀',
    chinese: '鼠',
    pinyin: 'Shǔ',
    element: 'Water',
    elementHex: '#38bdf8',
    elementDesc: 'Water signs tend to be flexible, intuitive, and good at reading people. They adapt well to changing situations and often have strong emotional intelligence.',
    yinYang: 'Yang',
    description: 'The Rat is known for being clever, quick-thinking, and resourceful — the first sign in the zodiac and often one of the sharpest.',
    traits: [
      'Quick-witted and clever',
      'Good at finding solutions under pressure',
      'Charming and easy to talk to',
      'Loyal to family and close friends',
      'Ambitious and good at spotting opportunities',
      'Curious and loves learning new things',
      'Careful with money but generous with people they care about',
    ],
    luckyColors: [
      { name: 'Gold', hex: '#FFD700' },
      { name: 'Sapphire Blue', hex: '#3B82F6' },
      { name: 'Jade Green', hex: '#22C55E' },
    ],
    luckyNumbers: [2, 3],
    luckyFlowers: 'Lily, African Violet',
    luckyGems: 'Garnet, Amber',
    compatible: ['dragon', 'monkey', 'ox'],
    incompatible: ['horse', 'goat'],
    famous: [
      { name: 'Katy Perry', born: 'Oct 1984' },
      { name: 'Prince Harry', born: 'Sep 1984' },
      { name: 'LeBron James', born: 'Dec 1984' },
      { name: 'Eminem', born: 'Oct 1972' },
      { name: 'Ben Affleck', born: 'Aug 1972' },
      { name: 'Wolfgang Mozart', born: 'Jan 1756' },
    ],
    forecast2026: '2026 is a year of adjustment for Rats. Horse and Rat are opposing signs, so this year brings some friction — especially around big decisions and financial risk. Stay flexible, play it conservatively in the first half, and lean on your social connections. Things improve noticeably from autumn onwards.',
  },

  ox: {
    key: 'ox',
    name: 'Ox',
    emoji: '🐂',
    chinese: '牛',
    pinyin: 'Niú',
    element: 'Earth',
    elementHex: '#d97706',
    elementDesc: 'Earth signs are practical and steady. They tend to be reliable, patient, and good at seeing things through — even when it takes a long time.',
    yinYang: 'Yin',
    description: 'The Ox is known for being hardworking, reliable, and patient — one of the most dependable signs in the zodiac.',
    traits: [
      'Reliable and trustworthy',
      'Determined — rarely gives up',
      'Methodical and detail-oriented',
      'Honest and direct',
      'Patient and slow to anger',
      'Hard worker with real stamina',
      'Loyal to family and values',
    ],
    luckyColors: [
      { name: 'Pearl White', hex: '#F8FAFC' },
      { name: 'Sunflower Yellow', hex: '#FBBF24' },
      { name: 'Forest Green', hex: '#10B981' },
    ],
    luckyNumbers: [1, 4],
    luckyFlowers: 'Tulip, Peach Blossom',
    luckyGems: 'Aquamarine, Lapis Lazuli',
    compatible: ['rat', 'snake', 'rooster'],
    incompatible: ['tiger', 'dragon', 'goat'],
    famous: [
      { name: 'Barack Obama', born: 'Aug 1961' },
      { name: 'George Clooney', born: 'May 1961' },
      { name: 'Jim Carrey', born: 'Jan 1962' },
      { name: 'Walt Disney', born: 'Dec 1901' },
      { name: 'Napoleon Bonaparte', born: 'Aug 1769' },
      { name: 'Vincent van Gogh', born: 'Mar 1853' },
    ],
    forecast2026: '2026 is a quietly productive year for Oxen. The Horse year\'s pace can feel restless compared to your style, but your steady approach pays off. Career progress is gradual but solid. Stick to safe financial choices and avoid speculation. Relationships strengthen, particularly for those already in committed partnerships.',
  },

  tiger: {
    key: 'tiger',
    name: 'Tiger',
    emoji: '🐅',
    chinese: '虎',
    pinyin: 'Hǔ',
    element: 'Wood',
    elementHex: '#4ade80',
    elementDesc: 'Wood signs tend to be growth-oriented, creative, and good with people. They\'re natural motivators who enjoy helping others develop and succeed.',
    yinYang: 'Yang',
    description: 'The Tiger is known for being bold, confident, and competitive — one of the most powerful signs in the zodiac.',
    traits: [
      'Confident and decisive',
      'Competitive and driven to win',
      'Naturally charismatic',
      'Stands up against unfairness',
      'Passionate and intense in relationships',
      'Spontaneous and exciting to be around',
      'Ambitious with big goals',
    ],
    luckyColors: [
      { name: 'Royal Blue', hex: '#3B82F6' },
      { name: 'Slate Grey', hex: '#9CA3AF' },
      { name: 'Ember Orange', hex: '#F97316' },
    ],
    luckyNumbers: [1, 3, 4],
    luckyFlowers: 'Yellow Lily, Cineraria',
    luckyGems: 'Sapphire, Amber',
    compatible: ['horse', 'dog', 'pig'],
    incompatible: ['ox', 'snake', 'monkey'],
    famous: [
      { name: 'Marilyn Monroe', born: 'Jun 1926' },
      { name: 'Leonardo DiCaprio', born: 'Nov 1974' },
      { name: 'Tom Cruise', born: 'Jul 1962' },
      { name: 'Lady Gaga', born: 'Mar 1986' },
      { name: 'Queen Elizabeth II', born: 'Apr 1926' },
      { name: 'Jodie Foster', born: 'Nov 1962' },
    ],
    forecast2026: '2026 is a strong year for Tigers. The Horse year aligns well with Tiger energy, so expect real opportunities — a promotion, a new venture, or a project that gains traction. Romance is active and exciting. Travel goes well. This is one of the better years in your twelve-year cycle, so make the most of it.',
  },

  rabbit: {
    key: 'rabbit',
    name: 'Rabbit',
    emoji: '🐇',
    chinese: '兔',
    pinyin: 'Tù',
    element: 'Wood',
    elementHex: '#4ade80',
    elementDesc: 'Wood signs tend to be growth-oriented, creative, and good with people. They\'re natural motivators who enjoy helping others develop and succeed.',
    yinYang: 'Yin',
    description: 'The Rabbit is known for being calm, gentle, and good at keeping the peace — considered one of the luckiest signs in the zodiac.',
    traits: [
      'Calm and kind',
      'Has a good eye for beauty and style',
      'Perceptive — notices things others miss',
      'Good at avoiding unnecessary conflict',
      'Creative and artistically inclined',
      'Thoughtful and a good listener',
      'Reliable in relationships',
    ],
    luckyColors: [
      { name: 'Crimson', hex: '#EF4444' },
      { name: 'Rose Pink', hex: '#EC4899' },
      { name: 'Violet', hex: '#9333EA' },
    ],
    luckyNumbers: [3, 4, 6],
    luckyFlowers: 'Foxglove, Plantain Lily',
    luckyGems: 'Pearl, Moonstone',
    compatible: ['goat', 'pig', 'dog'],
    incompatible: ['snake', 'rooster', 'dragon'],
    famous: [
      { name: 'Angelina Jolie', born: 'Jun 1975' },
      { name: 'Brad Pitt', born: 'Dec 1963' },
      { name: 'Johnny Depp', born: 'Jun 1963' },
      { name: 'Tiger Woods', born: 'Dec 1975' },
      { name: 'David Beckham', born: 'May 1975' },
      { name: 'Albert Einstein', born: 'Mar 1879' },
    ],
    forecast2026: '2026 is a steady year for Rabbits. The Horse year\'s bold energy isn\'t quite your style, but you navigate it well. Career progress is consistent. Spring is a good time for financial decisions — act on opportunities when they appear. In relationships, patience and thoughtfulness go a long way.',
  },

  dragon: {
    key: 'dragon',
    name: 'Dragon',
    emoji: '🐉',
    chinese: '龙',
    pinyin: 'Lóng',
    element: 'Earth',
    elementHex: '#d97706',
    elementDesc: 'Earth signs are practical and steady. They tend to be reliable, patient, and good at seeing things through — even when it takes a long time.',
    yinYang: 'Yang',
    description: 'The Dragon is the only mythical animal in the zodiac and the most auspicious sign — known for being ambitious, confident, and larger than life.',
    traits: [
      'Self-confident and naturally authoritative',
      'Smart and forward-thinking',
      'Charismatic — people are naturally drawn to them',
      'Passionate about what they care about',
      'Generous with the people they love',
      'Determined and hard to stop once decided',
      'Tends to be ahead of the curve',
    ],
    luckyColors: [
      { name: 'Imperial Gold', hex: '#FFD700' },
      { name: 'Moonlit Silver', hex: '#D1D5DB' },
      { name: 'Dragon Crimson', hex: '#DC2626' },
    ],
    luckyNumbers: [1, 6, 7],
    luckyFlowers: 'Snapdragon, Bleeding Heart',
    luckyGems: 'Amethyst, Ruby',
    compatible: ['rat', 'tiger', 'monkey'],
    incompatible: ['ox', 'goat', 'dog'],
    famous: [
      { name: 'Bruce Lee', born: 'Nov 1940' },
      { name: 'Rihanna', born: 'Feb 1988' },
      { name: 'Adele', born: 'May 1988' },
      { name: 'John Lennon', born: 'Oct 1940' },
      { name: 'Keanu Reeves', born: 'Sep 1964' },
      { name: 'Frank Lloyd Wright', born: 'Jun 1867' },
    ],
    forecast2026: '2026 is a high-energy year for Dragons. The Fire Horse amplifies your drive, making it a good time to push on big goals. Mid-year looks particularly strong for career and business moves. Romantically, you\'re at your most magnetic. Watch for burnout — you\'ll be tempted to take on too much at once.',
  },

  snake: {
    key: 'snake',
    name: 'Snake',
    emoji: '🐍',
    chinese: '蛇',
    pinyin: 'Shé',
    element: 'Fire',
    elementHex: '#f97316',
    elementDesc: 'Fire signs tend to be energetic, passionate, and enthusiastic. They bring warmth and excitement to the people around them.',
    yinYang: 'Yin',
    description: 'The Snake is known for being wise, perceptive, and private — a sign associated with deep intelligence and quiet confidence.',
    traits: [
      'Wise and highly intuitive',
      'Composed and graceful under pressure',
      'Analytical and observant',
      'Private — doesn\'t open up easily',
      'Quietly determined',
      'Has refined taste in art and culture',
      'Deeply loyal once trust is earned',
    ],
    luckyColors: [
      { name: 'Dragon Red', hex: '#DC2626' },
      { name: 'Gold Silk', hex: '#FBBF24' },
      { name: 'Ink Black', hex: '#1F2937' },
    ],
    luckyNumbers: [2, 8, 9],
    luckyFlowers: 'Orchid, Cactus Bloom',
    luckyGems: 'Opal, Black Pearl',
    compatible: ['ox', 'rooster'],
    incompatible: ['tiger', 'pig'],
    famous: [
      { name: 'Taylor Swift', born: 'Dec 1989' },
      { name: 'Oprah Winfrey', born: 'Jan 1954' },
      { name: 'J.K. Rowling', born: 'Jul 1965' },
      { name: 'Muhammad Ali', born: 'Jan 1942' },
      { name: 'Pablo Picasso', born: 'Oct 1881' },
      { name: 'Abraham Lincoln', born: 'Feb 1809' },
    ],
    forecast2026: '2026 asks Snakes to be more flexible than usual. The Horse year rewards action and spontaneity — not your natural mode, but stepping out of your comfort zone pays off. Interesting career paths open through unexpected collaborations. Trust your instincts on financial choices. Letting your guard down a little leads to stronger relationships.',
  },

  horse: {
    key: 'horse',
    name: 'Horse',
    emoji: '🐎',
    chinese: '马',
    pinyin: 'Mǎ',
    element: 'Fire',
    elementHex: '#f97316',
    elementDesc: 'Fire signs tend to be energetic, passionate, and enthusiastic. They bring warmth and excitement to the people around them.',
    yinYang: 'Yang',
    description: 'The Horse is known for being energetic, independent, and always on the move — a sign associated with freedom, travel, and a love of life.',
    traits: [
      'Full of energy',
      'Values freedom and independence',
      'Quick-witted with a good sense of humor',
      'Loves to travel and explore',
      'Popular and easy to be around',
      'Good at reading people and situations',
      'Says what they think',
    ],
    luckyColors: [
      { name: 'Chestnut Brown', hex: '#92400E' },
      { name: 'Saffron Yellow', hex: '#FBBF24' },
      { name: 'Royal Purple', hex: '#7C3AED' },
    ],
    luckyNumbers: [2, 3, 7],
    luckyFlowers: 'Calla Lily, Jasmine',
    luckyGems: 'Topaz, Citrine',
    compatible: ['tiger', 'goat', 'dog'],
    incompatible: ['rat', 'ox'],
    famous: [
      { name: 'Neil Armstrong', born: 'Aug 1930' },
      { name: 'Paul McCartney', born: 'Jun 1942' },
      { name: 'Denzel Washington', born: 'Dec 1954' },
      { name: 'Kobe Bryant', born: 'Aug 1978' },
      { name: 'Emma Watson', born: 'Apr 1990' },
      { name: 'Rembrandt', born: 'Jul 1606' },
    ],
    forecast2026: '2026 is your year — Horse years are your strongest, and this one is particularly good. Now is the time to take initiative at work and go after what you want. Financial opportunities are real, especially in areas you\'re already passionate about. Romance is exciting and active. Use the momentum well.',
  },

  goat: {
    key: 'goat',
    name: 'Goat',
    emoji: '🐐',
    chinese: '羊',
    pinyin: 'Yáng',
    element: 'Earth',
    elementHex: '#d97706',
    elementDesc: 'Earth signs are practical and steady. They tend to be reliable, patient, and good at seeing things through — even when it takes a long time.',
    yinYang: 'Yin',
    description: 'The Goat is known for being gentle, creative, and empathetic — a sign associated with art, harmony, and a quiet inner life.',
    traits: [
      'Kind and caring toward others',
      'Creative with a strong artistic sense',
      'Emotionally in tune with the people around them',
      'Thoughtful — doesn\'t rush into decisions',
      'Persistent through difficulties',
      'Appreciates beauty in everyday life',
      'Good at keeping the peace',
    ],
    luckyColors: [
      { name: 'Warm Brown', hex: '#78350F' },
      { name: 'Temple Red', hex: '#B91C1C' },
      { name: 'Deep Amethyst', hex: '#6D28D9' },
    ],
    luckyNumbers: [2, 7],
    luckyFlowers: 'Carnation, Primrose',
    luckyGems: 'Emerald, Aquamarine',
    compatible: ['rabbit', 'horse', 'pig'],
    incompatible: ['ox', 'dog', 'rat'],
    famous: [
      { name: 'Steve Jobs', born: 'Feb 1955' },
      { name: 'Mick Jagger', born: 'Jul 1943' },
      { name: 'Julia Roberts', born: 'Oct 1967' },
      { name: 'Coco Chanel', born: 'Aug 1883' },
      { name: 'Michelangelo', born: 'Mar 1475' },
      { name: 'Mark Twain', born: 'Nov 1835' },
    ],
    forecast2026: '2026 is a good year for Goats. Horse years suit you, particularly when it comes to creative work — your efforts are more likely to get noticed and rewarded. Home and family life are a highlight. Financial progress is slow and steady, which suits you fine. A relationship deepens, or a meaningful new one begins.',
  },

  monkey: {
    key: 'monkey',
    name: 'Monkey',
    emoji: '🐒',
    chinese: '猴',
    pinyin: 'Hóu',
    element: 'Metal',
    elementHex: '#94a3b8',
    elementDesc: 'Metal signs tend to be sharp, decisive, and principled. They hold high standards for themselves and others, and work hard to meet them.',
    yinYang: 'Yang',
    description: 'The Monkey is known for being clever, inventive, and quick on its feet — a sign associated with wit, adaptability, and a playful intelligence.',
    traits: [
      'Smart and fast-thinking',
      'Creative and good at solving problems',
      'Funny and entertaining to be around',
      'Genuinely curious about everything',
      'Energetic and hard to slow down',
      'Picks up new skills quickly',
      'Warm and good at connecting with people',
    ],
    luckyColors: [
      { name: 'Porcelain White', hex: '#F8FAFC' },
      { name: 'Azure Blue', hex: '#2563EB' },
      { name: 'Burnished Gold', hex: '#D97706' },
    ],
    luckyNumbers: [1, 7, 8],
    luckyFlowers: 'Chrysanthemum, Allium',
    luckyGems: 'Peridot, Aquamarine',
    compatible: ['rat', 'dragon', 'snake'],
    incompatible: ['tiger', 'pig'],
    famous: [
      { name: 'Will Smith', born: 'Sep 1968' },
      { name: 'Tom Hanks', born: 'Jul 1956' },
      { name: 'Daniel Craig', born: 'Mar 1968' },
      { name: 'Jennifer Aniston', born: 'Feb 1969' },
      { name: 'Justin Timberlake', born: 'Jan 1981' },
      { name: 'Leonardo da Vinci', born: 'Apr 1452' },
    ],
    forecast2026: '2026 calls for Monkeys to play it straight. The Horse year rewards honesty and consistent effort over clever shortcuts — keep that in mind professionally. There may be some friction early on, but your natural adaptability carries you through. A career change or new direction opens up mid-year and is worth taking seriously. Relationships improve when you\'re more open and consistent.',
  },

  rooster: {
    key: 'rooster',
    name: 'Rooster',
    emoji: '🐓',
    chinese: '鸡',
    pinyin: 'Jī',
    element: 'Metal',
    elementHex: '#94a3b8',
    elementDesc: 'Metal signs tend to be sharp, decisive, and principled. They hold high standards for themselves and others, and work hard to meet them.',
    yinYang: 'Yin',
    description: 'The Rooster is known for being hardworking, observant, and direct — a sign associated with punctuality, high standards, and honest communication.',
    traits: [
      'Observant — notices everything',
      'Hardworking and detail-oriented',
      'Honest, even when the truth is uncomfortable',
      'Holds high standards for themselves and others',
      'Punctual and well-organized',
      'Confident in their abilities',
      'Loyal to the people they care about',
    ],
    luckyColors: [
      { name: 'Imperial Gold', hex: '#D97706' },
      { name: 'Walnut Brown', hex: '#713F12' },
      { name: 'Bright Yellow', hex: '#FDE047' },
    ],
    luckyNumbers: [5, 7, 8],
    luckyFlowers: 'Gladiola, Cockscomb',
    luckyGems: 'Citrine, Topaz',
    compatible: ['ox', 'snake', 'dragon'],
    incompatible: ['rat', 'rabbit', 'dog'],
    famous: [
      { name: 'Beyoncé', born: 'Sep 1981' },
      { name: 'Britney Spears', born: 'Dec 1981' },
      { name: 'Roger Federer', born: 'Aug 1981' },
      { name: 'Catherine Zeta-Jones', born: 'Sep 1969' },
      { name: 'Cate Blanchett', born: 'May 1969' },
      { name: 'Serena Williams', born: 'Sep 1981' },
    ],
    forecast2026: '2026 is a productive year for Roosters. Your work ethic fits well with the Horse year\'s emphasis on action — step up and take initiative where you can. Career recognition comes to those who put themselves forward. Your financial discipline is a real asset this year. In relationships, confidence and directness tend to be attractive qualities.',
  },

  dog: {
    key: 'dog',
    name: 'Dog',
    emoji: '🐕',
    chinese: '狗',
    pinyin: 'Gǒu',
    element: 'Earth',
    elementHex: '#d97706',
    elementDesc: 'Earth signs are practical and steady. They tend to be reliable, patient, and good at seeing things through — even when it takes a long time.',
    yinYang: 'Yang',
    description: 'The Dog is known for being loyal, honest, and protective — considered one of the most trustworthy signs in the zodiac.',
    traits: [
      'Deeply loyal — one of the most dependable signs',
      'Honest with a strong moral compass',
      'Good judge of character',
      'Caring and warm with the people close to them',
      'Lively and good company',
      'Sensitive to injustice',
      'Responsible and follows through on commitments',
    ],
    luckyColors: [
      { name: 'Dragon Red', hex: '#B91C1C' },
      { name: 'Jade Green', hex: '#15803D' },
      { name: 'Royal Purple', hex: '#7E22CE' },
    ],
    luckyNumbers: [3, 4, 9],
    luckyFlowers: 'Rose, Oncidium Orchid',
    luckyGems: 'Diamond, Ruby',
    compatible: ['rabbit', 'tiger', 'horse'],
    incompatible: ['dragon', 'goat', 'rooster'],
    famous: [
      { name: 'Madonna', born: 'Aug 1958' },
      { name: 'Michael Jackson', born: 'Aug 1958' },
      { name: 'Justin Bieber', born: 'Mar 1994' },
      { name: 'Winston Churchill', born: 'Nov 1874' },
      { name: 'Freddie Mercury', born: 'Sep 1946' },
      { name: 'Voltaire', born: 'Nov 1694' },
    ],
    forecast2026: '2026 is one of the strongest years for Dogs in over a decade. The Tiger-Horse-Dog trine makes Horse years genuinely good for this sign. Career breakthroughs come at well-timed moments. Financially, it\'s a good year to invest in things that matter long-term. Relationships are rewarding and meaningful. Make the most of it.',
  },

  pig: {
    key: 'pig',
    name: 'Pig',
    emoji: '🐖',
    chinese: '猪',
    pinyin: 'Zhū',
    element: 'Water',
    elementHex: '#38bdf8',
    elementDesc: 'Water signs tend to be flexible, intuitive, and good at reading people. They adapt well to changing situations and often have strong emotional intelligence.',
    yinYang: 'Yin',
    description: 'The Pig is known for being generous, optimistic, and sincere — the last sign in the zodiac cycle, associated with abundance and a genuine good nature.',
    traits: [
      'Genuinely kind and caring',
      'Very generous',
      'A harder worker than people expect',
      'Optimistic about life',
      'Honest — not good at pretending',
      'Enjoys good food, comfort, and the finer things',
      'Helpful and good-natured with everyone',
    ],
    luckyColors: [
      { name: 'Saffron Yellow', hex: '#FBBF24' },
      { name: 'Silver Grey', hex: '#6B7280' },
      { name: 'Dark Mahogany', hex: '#7C2D12' },
    ],
    luckyNumbers: [2, 5, 8],
    luckyFlowers: 'Hydrangea, Daisy',
    luckyGems: 'Ruby, Rose Quartz',
    compatible: ['tiger', 'rabbit', 'goat'],
    incompatible: ['snake', 'monkey'],
    famous: [
      { name: 'Arnold Schwarzenegger', born: 'Jul 1947' },
      { name: 'Hillary Clinton', born: 'Oct 1947' },
      { name: 'Elton John', born: 'Mar 1947' },
      { name: 'Kendall Jenner', born: 'Nov 1995' },
      { name: 'Bryan Cranston', born: 'Mar 1956' },
      { name: 'Thomas Jefferson', born: 'Apr 1743' },
    ],
    forecast2026: '2026 brings good energy for Pigs after the more complicated Snake year. It\'s a good time for travel, new experiences, and broadening your world in some way. Career opportunities come through your social connections. Be sensible with money in the first quarter, and things open up nicely from spring onwards.',
  },
};

export function getZodiacData(key: string): ZodiacAnimal | null {
  return ZODIAC_MAP[key as ZodiacKey] ?? null;
}

export function getAllZodiacData(): ZodiacAnimal[] {
  return ZODIAC_ORDER.map(key => ZODIAC_MAP[key]);
}

export default ZODIAC_MAP;
