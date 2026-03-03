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
    elementDesc: 'Water nourishes flexibility and depth of wisdom. Rats channeling Water energy possess deep intuition, emotional intelligence, and the rare ability to flow around obstacles — finding success through adaptation rather than force.',
    yinYang: 'Yang',
    description: 'The Rat opens the Chinese zodiac cycle as a symbol of cleverness, abundance, and new beginnings. In ancient China, the Rat was considered a sign of prosperity, and its appearance in a home foretold wealth.',
    traits: [
      'Exceptionally clever and quick-witted',
      'Resourceful in overcoming any obstacle',
      'Charming and magnetic in social situations',
      'Deeply loyal to family and trusted friends',
      'Ambitious with a sharp eye for opportunity',
      'Curious and perpetually hungry for knowledge',
      'Thrifty with money yet generous with loved ones',
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
    forecast2026: 'The Year of the Fire Horse creates a challenging yet ultimately transformative dynamic for the Rat, as Horse and Rat stand in ancient opposition. Career disruptions push you toward necessary reinvention — your legendary adaptability is your greatest weapon. Financially, exercise caution in the first half, but watch for a golden window opening in autumn. Your social charm and networking skills open unexpected doors in both love and ambition.',
  },

  ox: {
    key: 'ox',
    name: 'Ox',
    emoji: '🐂',
    chinese: '牛',
    pinyin: 'Niú',
    element: 'Earth',
    elementHex: '#d97706',
    elementDesc: 'Earth represents stability, nourishment, and endurance. Ox souls rooted in Earth energy are the bedrock of society — dependable, patient, and capable of extraordinary sustained effort where others falter.',
    yinYang: 'Yin',
    description: 'The Ox is the second animal of the zodiac and a symbol of diligence, persistence, and honest labor. In Chinese culture, the Ox is revered for its tireless contribution to agriculture and its unwavering reliability.',
    traits: [
      'Dependable and deeply trustworthy',
      'Powerful determination that outlasts all opposition',
      'Methodical with an eye for detail',
      'Honest to the point of bluntness',
      'Patient and slow to anger',
      'Hardworking with exceptional endurance',
      'Loyal to family and traditional values',
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
    forecast2026: 'The steady Ox finds 2026 to be a year of quiet, reliable progress. While the Horse\'s fiery energy may feel restless compared to your methodical nature, your unwavering discipline leads to meaningful career advancement that others overlook. Financially, conservative investments prove far wiser than speculation — build your foundation stone by stone. Love deepens beautifully for those in committed relationships; singles may encounter someone grounded and sincere.',
  },

  tiger: {
    key: 'tiger',
    name: 'Tiger',
    emoji: '🐅',
    chinese: '虎',
    pinyin: 'Hǔ',
    element: 'Wood',
    elementHex: '#4ade80',
    elementDesc: 'Wood energy fuels growth, creativity, and benevolence. Tigers driven by Wood are natural leaders — visionary, compassionate, and capable of inspiring others to rise to their fullest potential.',
    yinYang: 'Yang',
    description: 'The Tiger is the most powerful of all animals in Chinese mythology and the third in the zodiac cycle. A symbol of bravery, power, and authority, the Tiger is considered the true king of the forest — more commanding even than the Dragon.',
    traits: [
      'Courageous with boundless natural confidence',
      'Fiercely competitive with a drive to win',
      'Magnetically charismatic and inspiring',
      'Deeply rebellious against injustice',
      'Passionate and all-consuming in love',
      'Unpredictable and thrilling to be around',
      'Ambitious with grand, world-changing dreams',
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
    forecast2026: 'Magnificent news for Tigers — the Horse forms a powerful resonance within your Fire-Wood energy in 2026! Career opportunities burst open with dramatic flair; a promotion, bold venture, or creative breakthrough is strongly indicated for those who dare to act. Romance is electric and deeply passionate. Travel brings genuinely transformative experiences and life-altering encounters. This is unquestionably one of your most thrilling and rewarding years in a decade.',
  },

  rabbit: {
    key: 'rabbit',
    name: 'Rabbit',
    emoji: '🐇',
    chinese: '兔',
    pinyin: 'Tù',
    element: 'Wood',
    elementHex: '#4ade80',
    elementDesc: 'Wood energy in the Rabbit manifests as creativity, elegance, and compassionate wisdom. Wood Rabbits possess an exquisite aesthetic sense and a deep connection to beauty in all its forms.',
    yinYang: 'Yin',
    description: 'The Rabbit is the fourth animal of the zodiac and is considered the luckiest of all. In Chinese culture, the Rabbit is associated with the Moon, longevity, and good fortune. Rabbits are believed to carry the blessing of the Moon Goddess.',
    traits: [
      'Gentle and genuinely compassionate',
      'Elegant with refined aesthetic taste',
      'Alert and quick to sense subtle changes',
      'Diplomatically skilled at avoiding conflict',
      'Deeply artistic and creatively gifted',
      'Patient and wise in counsel',
      'Responsible and faithful in relationships',
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
    forecast2026: 'The Rabbit navigates 2026 with characteristic grace and diplomatic skill. Though the Horse\'s bold, reckless energy contrasts with your gentle nature, your gift for finding harmony keeps you quietly thriving. Career progress is steady, meaningful, and well-rewarded. Spring brings a particularly fortunate financial moment — be ready to act swiftly. In love, patience and tenderness create deep, lasting bonds that enrich your soul throughout the year.',
  },

  dragon: {
    key: 'dragon',
    name: 'Dragon',
    emoji: '🐉',
    chinese: '龙',
    pinyin: 'Lóng',
    element: 'Earth',
    elementHex: '#d97706',
    elementDesc: 'Earth in the Dragon creates a rare fusion of grand vision and pragmatic power. These Dragons possess the ambition to dream on a cosmic scale while maintaining the groundedness to actually manifest their extraordinary visions.',
    yinYang: 'Yang',
    description: 'The Dragon is the only mythical creature in the Chinese zodiac and the most auspicious of all signs. Emperors claimed descent from the Dragon, and to be born under this sign was considered an extraordinary blessing from heaven.',
    traits: [
      'Magnificently confident and naturally authoritative',
      'Brilliantly intelligent with visionary thinking',
      'Charismatic enough to inspire entire movements',
      'Passionately enthusiastic about their pursuits',
      'Generous to a fault with those they love',
      'Determined with an iron will to succeed',
      'Pioneering and perpetually ahead of the times',
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
    forecast2026: 'Dragons experience a powerfully energizing 2026 as Fire Horse energy amplifies your own passionate, pioneering nature. Your ambitions feel almost unstoppable — pursue your biggest goals with the boldness only a Dragon can summon. Business ventures initiated in mid-year carry exceptional promise. Romantically, your magnetism reaches its zenith — connections formed now are profound. Be mindful of overextension; strategic rest between bold moves ensures that your fire burns all the way through the year.',
  },

  snake: {
    key: 'snake',
    name: 'Snake',
    emoji: '🐍',
    chinese: '蛇',
    pinyin: 'Shé',
    element: 'Fire',
    elementHex: '#f97316',
    elementDesc: 'Fire in the Snake burns with intense, focused intelligence rather than explosive passion. Snake Fire is the steady flame of contemplation — illuminating deep truths, fueling wisdom, and burning away illusion with penetrating clarity.',
    yinYang: 'Yin',
    description: 'The Snake is the sixth animal of the zodiac and is considered the philosopher, the sage, and the seducer. Far from threatening, the Snake in Chinese culture represents wisdom, grace, and a deep connection to the mysteries of existence.',
    traits: [
      'Profoundly wise with extraordinary intuition',
      'Elegant and naturally sophisticated in manner',
      'Deeply analytical and penetratingly observant',
      'Mysterious with carefully guarded private depths',
      'Determined with a silent but unbreakable will',
      'Refined taste in art, beauty, and culture',
      'Intensely loyal once trust is fully earned',
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
    forecast2026: 'After the glorious Snake year of 2025, you enter 2026 carrying hard-won wisdom and rare momentum. The Fire Horse year gently asks you to loosen your legendary grip on control and embrace the unexpected — a profound spiritual lesson that ultimately expands your power. Career advancement arrives through surprising collaborations and unconventional paths. Financially, trust your intuition over spreadsheets this year. In love, true vulnerability creates connections of rare and lasting beauty.',
  },

  horse: {
    key: 'horse',
    name: 'Horse',
    emoji: '🐎',
    chinese: '马',
    pinyin: 'Mǎ',
    element: 'Fire',
    elementHex: '#f97316',
    elementDesc: 'Fire in the Horse ignites an irresistible vitality, a burning love of freedom, and an infectious enthusiasm that draws people from miles around. Horse Fire is the roaring bonfire around which others inevitably gather.',
    yinYang: 'Yang',
    description: 'The Horse is the seventh animal of the zodiac and a universal symbol of freedom, speed, and untamable spirit. Across cultures, the Horse represents travel, adventure, and the indomitable human (and animal) drive toward the horizon.',
    traits: [
      'Brilliantly animated with infectious energy',
      'Fiercely independent and freedom-loving',
      'Quick-witted with a gift for sharp humor',
      'Adventurous with an insatiable wanderlust',
      'Warmly popular and naturally charismatic',
      'Perceptive and fast to read situations',
      'Straightforward with a refreshing directness',
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
    forecast2026: 'Welcome to your own year, noble Horse! The Fire Horse year of 2026 supercharges your natural vitality, freedom-loving spirit, and unstoppable drive to new heights. Career-wise, this is your moment to lead boldly and innovate without apology. Financial luck is genuinely exceptional — particularly in ventures tied to travel, technology, or creative industries. Romance burns with passionate intensity; connections formed this year have the fire to last. Channel your legendary energy with wisdom and 2026 will be truly legendary.',
  },

  goat: {
    key: 'goat',
    name: 'Goat',
    emoji: '🐐',
    chinese: '羊',
    pinyin: 'Yáng',
    element: 'Earth',
    elementHex: '#d97706',
    elementDesc: 'Earth grounds the Goat\'s artistic nature in tangible beauty and heartfelt connection. Goat Earth energy creates individuals who build lasting sanctuaries of warmth, creativity, and genuine care that nourish all who enter their world.',
    yinYang: 'Yin',
    description: 'The Goat is the eighth animal of the zodiac and is associated with art, creativity, and gentle wisdom. In Chinese culture, the Goat (or Sheep) is a symbol of peace, harmony, and the quiet beauty of a life lived with intention and grace.',
    traits: [
      'Deeply gentle with a generous, nurturing spirit',
      'Profoundly creative with a rare artistic vision',
      'Sympathetic and emotionally attuned to others',
      'Thoughtful and unhurried in all decisions',
      'Persevering through challenges with quiet dignity',
      'Romantic with a soul that aches for beauty',
      'Amicable and naturally skilled at creating harmony',
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
    forecast2026: 'The Horse and Goat share a deep natural affinity, making 2026 a genuinely fortunate and fulfilling year for you. Creative endeavors flourish spectacularly — artistic Goats will find their work recognized, celebrated, and rewarded in ways that validate years of quiet dedication. Family harmony is a particularly bright and beautiful spot. Financially, modest but beautifully consistent gains build your long-term security. A romantic partnership deepens to new depths, or a meaningful new connection enters your life.',
  },

  monkey: {
    key: 'monkey',
    name: 'Monkey',
    emoji: '🐒',
    chinese: '猴',
    pinyin: 'Hóu',
    element: 'Metal',
    elementHex: '#94a3b8',
    elementDesc: 'Metal in the Monkey creates a brilliant, incisive intelligence that cuts through complexity and illusion. Metal Monkeys combine sharp analytical thinking with creative inventiveness to produce solutions that leave others genuinely astonished.',
    yinYang: 'Yang',
    description: 'The Monkey is the ninth animal of the zodiac and is celebrated as a symbol of intelligence, ingenuity, and playful brilliance. In Chinese mythology, the Monkey King — the great trickster hero Sun Wukong — embodies the Monkey spirit at its most magnificent.',
    traits: [
      'Brilliantly sharp with a lightning-fast mind',
      'Inventive and endlessly creative in problem-solving',
      'Playfully mischievous with irresistible humor',
      'Deeply curious about virtually everything',
      'Energetic with seemingly inexhaustible vitality',
      'Versatile — able to master multiple fields',
      'Warmly charming with a natural gift for connection',
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
    forecast2026: 'The Monkey\'s sharp mind and legendary adaptability are thoroughly tested and ultimately validated in 2026. Avoid clever shortcuts in professional matters — integrity and transparency bring far more lasting success than any trick. Despite some initial turbulence, your natural wit, flexibility, and charm help you navigate magnificently. A surprising career pivot opening in summer unlocks exciting doors you didn\'t even know existed. Relationships deepen beautifully when you offer patience and genuine honesty.',
  },

  rooster: {
    key: 'rooster',
    name: 'Rooster',
    emoji: '🐓',
    chinese: '鸡',
    pinyin: 'Jī',
    element: 'Metal',
    elementHex: '#94a3b8',
    elementDesc: 'Metal sharpens the Rooster\'s already keen perceptions to extraordinary clarity. Metal Roosters possess a diamond-hard commitment to truth, excellence, and precision — rising each morning with renewed purpose to cut through the world\'s imprecision.',
    yinYang: 'Yin',
    description: 'The Rooster is the tenth animal of the zodiac and has been revered in China since antiquity for its punctuality, courage, and loyalty to its flock. The Rooster\'s morning crow dispels darkness and demons alike — it is the herald of a new and better day.',
    traits: [
      'Keenly observant with hawk-like perception',
      'Hardworking with meticulous attention to detail',
      'Courageously honest even when truth is uncomfortable',
      'Deeply motivated by excellence and high standards',
      'Punctual and reliably well-organized',
      'Proudly confident in their considerable abilities',
      'Loyally devoted to those under their protection',
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
    forecast2026: 'Roosters find 2026 to be a highly productive and genuinely rewarding year. Your legendary work ethic aligns beautifully with the Horse year\'s call for bold, decisive action — step up and let your capabilities shine. Career recognition arrives meaningfully for those who take initiative and lead with confidence. Your exceptional financial management skills are your true superpower this year — channel them to build lasting, generational security. In love, directness and self-confidence prove irresistibly attractive.',
  },

  dog: {
    key: 'dog',
    name: 'Dog',
    emoji: '🐕',
    chinese: '狗',
    pinyin: 'Gǒu',
    element: 'Earth',
    elementHex: '#d97706',
    elementDesc: 'Earth in the Dog creates a soul of profound loyalty, warmth, and reliable strength. Dog Earth energy manifests as a steadfast guardian — someone who builds lasting bonds, defends truth fiercely, and creates a sanctuary of trustworthiness for all who enter their life.',
    yinYang: 'Yang',
    description: 'The Dog is the eleventh animal of the zodiac and is universally beloved as a symbol of loyalty, courage, and unshakeable friendship. The Dog is considered humanity\'s greatest companion across all cultures — and in the Chinese zodiac, this bond runs even deeper.',
    traits: [
      'Fiercely loyal beyond any reasonable expectation',
      'Courageously honest with an inner moral compass',
      'Cleverly perceptive about human character',
      'Warmly caring toward those within their circle',
      'Lively and spirited in spirit',
      'Deeply sensitive to injustice anywhere',
      'Steadfastly responsible in all commitments',
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
    forecast2026: 'Outstanding news for Dogs — the Horse forms the powerful Tiger-Horse-Dog trinity of Heaven, making 2026 one of the most auspicious and transformative years of your life. Career breakthroughs arrive with beautiful, almost cinematic timing. Your financial luck is among the strongest in a full twelve-year cycle — invest boldly in what truly matters. Love and friendship deepen with rare meaning and permanence. Your unwavering loyalty and dedication are finally receiving the recognition they have always deserved. Embrace this golden year with both gratitude and ambition.',
  },

  pig: {
    key: 'pig',
    name: 'Pig',
    emoji: '🐖',
    chinese: '猪',
    pinyin: 'Zhū',
    element: 'Water',
    elementHex: '#38bdf8',
    elementDesc: 'Water in the Pig flows with extraordinary compassion, generosity, and emotional depth. Pig Water energy creates a soul of rare abundance — someone who gives freely, loves without reservation, and creates a world of warmth and plenty around them.',
    yinYang: 'Yin',
    description: 'The Pig is the twelfth and final animal of the zodiac — and far from being a humble ending, the Pig represents abundance, completion, and the fullness of life\'s gifts. The Pig is considered one of the most fortunate signs, blessed with an innate connection to life\'s pleasures and sincere human connection.',
    traits: [
      'Compassionate with a heart that gives without limit',
      'Generous to an almost overwhelming degree',
      'Diligent and surprisingly hard-working',
      'Beautifully optimistic about life\'s possibilities',
      'Sincerely honest — incapable of sustained deception',
      'Indulgent in life\'s finest pleasures',
      'Deeply kind and genuinely helpful to all',
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
    forecast2026: 'The Pig emerges from the complex Snake year with renewed energy, boundless optimism, and a liberating sense of new beginnings. 2026 brings expansion, joyful adventure, and beautiful surprises on multiple fronts. Travel — both physical and philosophical — broadens your horizons magnificently. Career opportunities multiply as your generous, magnetic nature draws the right collaborators into your orbit. In love, open-hearted vulnerability creates connections of rare depth and lasting beauty. Financial prudence in the first quarter rewards you handsomely in autumn.',
  },
};

export function getZodiacData(key: string): ZodiacAnimal | null {
  return ZODIAC_MAP[key as ZodiacKey] ?? null;
}

export function getAllZodiacData(): ZodiacAnimal[] {
  return ZODIAC_ORDER.map(key => ZODIAC_MAP[key]);
}

export default ZODIAC_MAP;
