import { ZODIAC_ORDER, ZodiacKey } from './zodiacData';

// Chinese New Year dates [month, day] indexed by year
// Month is 1-indexed, Day is 1-indexed
export const CNY_DATES: Record<number, [number, number]> = {
  1924: [2, 5],  1925: [1, 24], 1926: [2, 13], 1927: [2, 2],  1928: [1, 23],
  1929: [2, 10], 1930: [1, 30], 1931: [2, 17], 1932: [2, 6],  1933: [1, 26],
  1934: [2, 14], 1935: [2, 4],  1936: [1, 24], 1937: [2, 11], 1938: [1, 31],
  1939: [2, 19], 1940: [2, 8],  1941: [1, 27], 1942: [2, 15], 1943: [2, 5],
  1944: [1, 25], 1945: [2, 13], 1946: [2, 2],  1947: [1, 22], 1948: [2, 10],
  1949: [1, 29], 1950: [2, 17], 1951: [2, 6],  1952: [1, 27], 1953: [2, 14],
  1954: [2, 3],  1955: [1, 24], 1956: [2, 12], 1957: [1, 31], 1958: [2, 18],
  1959: [2, 8],  1960: [1, 28], 1961: [2, 15], 1962: [2, 5],  1963: [1, 25],
  1964: [2, 13], 1965: [2, 2],  1966: [1, 21], 1967: [2, 9],  1968: [1, 30],
  1969: [2, 17], 1970: [2, 6],  1971: [1, 27], 1972: [2, 15], 1973: [2, 3],
  1974: [1, 23], 1975: [2, 11], 1976: [1, 31], 1977: [2, 18], 1978: [2, 7],
  1979: [1, 28], 1980: [2, 16], 1981: [2, 5],  1982: [1, 25], 1983: [2, 13],
  1984: [2, 2],  1985: [2, 20], 1986: [2, 9],  1987: [1, 29], 1988: [2, 17],
  1989: [2, 6],  1990: [1, 27], 1991: [2, 15], 1992: [2, 4],  1993: [1, 23],
  1994: [2, 10], 1995: [1, 31], 1996: [2, 19], 1997: [2, 7],  1998: [1, 28],
  1999: [2, 16], 2000: [2, 5],  2001: [1, 24], 2002: [2, 12], 2003: [2, 1],
  2004: [1, 22], 2005: [2, 9],  2006: [1, 29], 2007: [2, 18], 2008: [2, 7],
  2009: [1, 26], 2010: [2, 14], 2011: [2, 3],  2012: [1, 23], 2013: [2, 10],
  2014: [1, 31], 2015: [2, 19], 2016: [2, 8],  2017: [1, 28], 2018: [2, 16],
  2019: [2, 5],  2020: [1, 25], 2021: [2, 12], 2022: [2, 1],  2023: [1, 22],
  2024: [2, 10], 2025: [1, 29], 2026: [2, 17], 2027: [2, 6],  2028: [1, 26],
  2029: [2, 13], 2030: [2, 3],
};

export type YearElement = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';

export function getYearElement(year: number): YearElement {
  const elements: YearElement[] = ['Metal', 'Metal', 'Water', 'Water', 'Wood', 'Wood', 'Fire', 'Fire', 'Earth', 'Earth'];
  const lastDigit = ((year % 10) + 10) % 10;
  return elements[lastDigit];
}

export function getZodiacKey(year: number): ZodiacKey {
  const index = ((year - 1900) % 12 + 12) % 12;
  return ZODIAC_ORDER[index];
}

export interface ParsedDate {
  year: number;
  month: number;  // 1-indexed
  day: number;
}

export interface CalculationResult {
  zodiacKey: ZodiacKey;
  zodiacYear: number;   // The Chinese zodiac year (may differ from birth year for Jan/Feb)
  birthYear: number;    // The actual birth year entered
  yearElement: YearElement;
  yearOnly: boolean;    // true if user only provided a year
  parsedDate: ParsedDate | null;
  beforeCNY: boolean;   // true if born before CNY that year
}

/** Attempts to parse a date string in various formats.
 *  Returns null if unparseable. */
export function parseDate(input: string): ParsedDate | null {
  const s = input.trim();

  const monthNames = [
    'january','february','march','april','may','june',
    'july','august','september','october','november','december',
  ];
  const monthAbbr = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

  // ISO: YYYY-MM-DD
  let m = s.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})$/);
  if (m) return { year: +m[1], month: +m[2], day: +m[3] };

  // US: MM/DD/YYYY or MM-DD-YYYY
  m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (m) {
    const a = +m[1], b = +m[2], year = +m[3];
    if (a <= 12) return { year, month: a, day: b };
    return { year, month: b, day: a };
  }

  // "15 Jan 1990" or "Jan 15 1990" or "January 15, 1990"
  const wordMatch = s.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/) ||
                    s.match(/^([A-Za-z]+)\s+(\d{1,2})[,\s]+(\d{4})$/);
  if (wordMatch) {
    let day: number, monthStr: string, year: number;
    if (/^\d/.test(wordMatch[1])) {
      [, day, monthStr, year] = [0, +wordMatch[1], wordMatch[2], +wordMatch[3]];
    } else {
      [, monthStr, day, year] = [0, wordMatch[1], +wordMatch[2], +wordMatch[3]];
    }
    const mIdx = monthNames.indexOf(monthStr.toLowerCase());
    const mAbbIdx = monthAbbr.indexOf(monthStr.toLowerCase().slice(0, 3));
    const month = mIdx !== -1 ? mIdx + 1 : mAbbIdx !== -1 ? mAbbIdx + 1 : -1;
    if (month !== -1) return { year, month, day };
  }

  return null;
}

export function calculate(input: string): CalculationResult | { error: string } | { ambiguous: true; year: number } {
  const s = input.trim();
  if (!s) return { error: 'Please enter your birth year or date of birth.' };

  // Pure year
  if (/^\d{4}$/.test(s)) {
    const year = +s;
    if (year < 100 || year > 2100) return { error: 'Please enter a valid year between 100 and 2100.' };
    return {
      zodiacKey: getZodiacKey(year),
      zodiacYear: year,
      birthYear: year,
      yearElement: getYearElement(year),
      yearOnly: true,
      parsedDate: null,
      beforeCNY: false,
    };
  }

  const date = parseDate(s);
  if (!date) return { error: 'Could not parse the date. Try formats like "1990", "15 Jan 1990", or "1990-01-15".' };

  const { year, month, day } = date;
  if (year < 100 || year > 2100) return { error: 'Please enter a valid year between 100 and 2100.' };

  // For Jan or Feb, check if we need the previous year's animal
  if (month === 1 || month === 2) {
    const cny = CNY_DATES[year];
    if (cny) {
      const [cnyMonth, cnyDay] = cny;
      const beforeCNY = month < cnyMonth || (month === cnyMonth && day < cnyDay);
      const zodiacYear = beforeCNY ? year - 1 : year;
      return {
        zodiacKey: getZodiacKey(zodiacYear),
        zodiacYear,
        birthYear: year,
        yearElement: getYearElement(zodiacYear),
        yearOnly: false,
        parsedDate: date,
        beforeCNY,
      };
    }
    // No CNY data for this year — flag as ambiguous
    return { ambiguous: true, year };
  }

  return {
    zodiacKey: getZodiacKey(year),
    zodiacYear: year,
    birthYear: year,
    yearElement: getYearElement(year),
    yearOnly: false,
    parsedDate: date,
    beforeCNY: false,
  };
}

/** Returns recent years for a given zodiac key */
export function getRecentYears(zodiacKey: string): number[] {
  const baseYears: number[] = [];
  // Find years from 1900 to 2032 for this sign
  const index = ZODIAC_ORDER.indexOf(zodiacKey as ZodiacKey);
  for (let y = 1900 + index; y <= 2032; y += 12) {
    baseYears.push(y);
  }
  return baseYears.filter(y => y >= 1924).slice(-8);
}
